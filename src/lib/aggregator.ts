import { CoinGeckoExchange, CountryVolume, StablecoinFilter } from './types';
import { EXCHANGE_COUNTRY_OVERRIDES } from '@/data/exchange-country-map';
import { findCentroid } from '@/data/country-centroids';
import { getCountryWeights } from '@/data/stablecoin-weights';
import { LiveStablecoinData } from './defillama';
import { distributeOnChainToCountries, computeBlendedWeights, OnChainCountryEstimate } from './onchain-distributor';
import { GLOBAL_EXCHANGE_REDISTRIBUTION, TAX_HAVEN_COUNTRIES, DEFAULT_GLOBAL_DISTRIBUTION } from '@/data/global-exchange-redistribution';
import { StablecoinVolumes } from './coingecko';

interface AggregationResult {
  geojson: GeoJSON.FeatureCollection;
  globalVolume: number;
  countryCount: number;
  topCountries: CountryVolume[];
}

interface CountryAccumulator {
  volumeBtc: number;
  exchangeCount: number;
  topExchange: string;
  topExchangeVolume: number;
}

function addToCountryMap(
  map: Map<string, CountryAccumulator>,
  country: string,
  volumeBtc: number,
  exchangeName: string,
) {
  const existing = map.get(country);
  if (existing) {
    existing.volumeBtc += volumeBtc;
    existing.exchangeCount++;
    if (volumeBtc > existing.topExchangeVolume) {
      existing.topExchange = exchangeName;
      existing.topExchangeVolume = volumeBtc;
    }
  } else {
    map.set(country, {
      volumeBtc,
      exchangeCount: 1,
      topExchange: exchangeName,
      topExchangeVolume: volumeBtc,
    });
  }
}

export function aggregateByCountry(
  exchanges: CoinGeckoExchange[],
  btcPrice: number,
  filter: StablecoinFilter = 'all',
  liveStablecoins?: LiveStablecoinData | null,
  stablecoinVolumes?: StablecoinVolumes | null,
): AggregationResult {
  // Step 1: Aggregate exchange volume by country
  // Global exchanges in tax havens get redistributed to where their users actually are
  const countryMap = new Map<string, CountryAccumulator>();
  let totalRawBtc = 0;
  let redistributedBtc = 0;
  let directBtc = 0;
  let skippedBtc = 0;

  for (const exchange of exchanges) {
    if (exchange.trust_score === null && exchange.trade_volume_24h_btc === 0) continue;

    const registeredCountry = exchange.country || EXCHANGE_COUNTRY_OVERRIDES[exchange.id];
    if (!registeredCountry) {
      skippedBtc += exchange.trade_volume_24h_btc;
      continue;
    }
    totalRawBtc += exchange.trade_volume_24h_btc;

    // Check if this exchange should be redistributed
    const redistribution = GLOBAL_EXCHANGE_REDISTRIBUTION[exchange.id];

    if (redistribution) {
      // Global exchange: distribute volume to user countries
      redistributedBtc += exchange.trade_volume_24h_btc;
      for (const { country, share } of redistribution) {
        addToCountryMap(
          countryMap,
          country,
          exchange.trade_volume_24h_btc * share,
          exchange.name,
        );
      }
    } else if (TAX_HAVEN_COUNTRIES.has(registeredCountry)) {
      // Unknown exchange in a tax haven — redistribute using generic global distribution
      redistributedBtc += exchange.trade_volume_24h_btc;
      for (const { country, share } of DEFAULT_GLOBAL_DISTRIBUTION) {
        addToCountryMap(
          countryMap,
          country,
          exchange.trade_volume_24h_btc * share,
          exchange.name,
        );
      }
    } else {
      // Normal exchange with a real country — attribute directly
      directBtc += exchange.trade_volume_24h_btc;
      addToCountryMap(
        countryMap,
        registeredCountry,
        exchange.trade_volume_24h_btc,
        exchange.name,
      );
    }
  }

  console.log(`[Aggregator] ${exchanges.length} exchanges | Raw: ${totalRawBtc.toFixed(0)} BTC | Redistributed: ${redistributedBtc.toFixed(0)} BTC | Direct: ${directBtc.toFixed(0)} BTC | No country: ${skippedBtc.toFixed(0)} BTC`);

  // Step 2: Distribute on-chain stablecoin data to countries (if available)
  let onChainEstimates: Map<string, OnChainCountryEstimate> | null = null;
  if (liveStablecoins) {
    onChainEstimates = distributeOnChainToCountries(liveStablecoins);
  }

  // Step 3: Compute weighted scores for each country
  // Score = exchange volume × stablecoin bias (how stablecoin-heavy this country is)
  interface CountryScore {
    name: string;
    iso2: string;
    iso3: string;
    lat: number;
    lng: number;
    score: number;
    exchangeCount: number;
    topExchange: string;
  }

  const countryScores: CountryScore[] = [];
  let totalScore = 0;

  for (const [country, data] of countryMap) {
    const centroid = findCentroid(country);
    if (!centroid) continue;

    const exchangeVolumeUsd = data.volumeBtc * btcPrice;

    // Get stablecoin bias for this country (how much of its trading is in the selected stablecoin)
    let bias: number;
    if (onChainEstimates) {
      const blended = computeBlendedWeights(
        exchangeVolumeUsd,
        centroid.name,
        onChainEstimates,
      );
      bias = blended ? blended[filter] : getCountryWeights(centroid.name)[filter];
    } else {
      bias = getCountryWeights(centroid.name)[filter];
    }

    // Score = raw exchange volume × stablecoin bias
    // This gives higher-volume countries AND more stablecoin-heavy countries bigger shares
    const score = exchangeVolumeUsd * bias;
    totalScore += score;

    countryScores.push({
      name: centroid.name,
      iso2: centroid.iso2,
      iso3: centroid.iso3,
      lat: centroid.lat,
      lng: centroid.lng,
      score,
      exchangeCount: data.exchangeCount,
      topExchange: data.topExchange,
    });
  }

  // Step 4: Distribute real stablecoin volume across countries proportionally
  // Instead of estimating volumes, we use verified market totals and distribute geographically
  let targetVolume: number;
  if (stablecoinVolumes) {
    targetVolume = filter === 'all' ? stablecoinVolumes.total
      : filter === 'usdt' ? stablecoinVolumes.usdt
      : filter === 'usdc' ? stablecoinVolumes.usdc
      : stablecoinVolumes.dai;
  } else {
    // Fallback: use raw weighted scores if real volumes unavailable
    targetVolume = totalScore;
  }

  const countries: CountryVolume[] = countryScores.map(cs => {
    const share = totalScore > 0 ? cs.score / totalScore : 0;
    const volumeUsd = targetVolume * share;
    return {
      country: cs.name,
      iso2: cs.iso2,
      iso3: cs.iso3,
      lat: cs.lat,
      lng: cs.lng,
      volumeUsd,
      volumeBtc: btcPrice > 0 ? volumeUsd / btcPrice : 0,
      exchangeCount: cs.exchangeCount,
      topExchange: cs.topExchange,
      volumeNormalized: 0,
    };
  });

  countries.sort((a, b) => b.volumeUsd - a.volumeUsd);

  const maxVolume = countries[0]?.volumeUsd || 1;
  for (const c of countries) {
    c.volumeNormalized = c.volumeUsd / maxVolume;
  }

  const globalVolume = countries.reduce((sum, c) => sum + c.volumeUsd, 0);
  console.log(`[Aggregator] Filter: ${filter} | Target: $${(targetVolume / 1e9).toFixed(1)}B | Final: $${(globalVolume / 1e9).toFixed(1)}B | ${countries.length} countries`);

  const geojson: GeoJSON.FeatureCollection = {
    type: 'FeatureCollection',
    features: countries.map(c => ({
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [c.lng, c.lat],
      },
      properties: {
        country: c.country,
        iso2: c.iso2,
        volume_usd: c.volumeUsd,
        volume_normalized: c.volumeNormalized,
        exchange_count: c.exchangeCount,
        top_exchange: c.topExchange,
      },
    })),
  };

  return {
    geojson,
    globalVolume,
    countryCount: countries.length,
    topCountries: countries.slice(0, 10),
  };
}
