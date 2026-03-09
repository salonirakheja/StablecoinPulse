import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { STABLECOIN_REGULATIONS, REGULATION_COLORS, REGULATION_LABELS } from '@/data/stablecoin-regulations';
import { PREMIUM_COUNTRIES } from '@/data/premium-countries';
import { PREMIUM_DRIVERS } from '@/data/premium-drivers';
import { CHAIN_DISTRIBUTIONS } from '@/data/chain-country-distribution';
import { REGULATORY_TIMELINES } from '@/data/regulatory-timelines';
import { getExchangesForCountry } from '@/data/exchange-access';
import { COUNTRY_CENTROIDS } from '@/data/country-centroids';
import { PREMIUM_COUNTRIES as ALL_PREMIUM_COUNTRIES } from '@/data/premium-countries';
import { fetchFXRates } from '@/lib/exchange-rates';
import { fetchAllP2PPrices } from '@/lib/binance-p2p';
import { fetchHistoricalFXRates, getDateOneYearAgo } from '@/lib/historical-fx';
import { fetchExchanges, fetchBtcPrice, fetchStablecoinVolumes } from '@/lib/coingecko';
import { fetchLiveStablecoinData } from '@/lib/defillama';
import { aggregateByCountry } from '@/lib/aggregator';
import { calibrateWithLiveData } from '@/data/stablecoin-weights';
import type { CountryVolume } from '@/lib/types';
import BackgroundGrid from '@/components/BackgroundGrid';

export const revalidate = 900;

// Pre-generate pages for all countries in centroids (covers every country on the globe)
export function generateStaticParams() {
  return COUNTRY_CENTROIDS.map((c) => ({ iso2: c.iso2 }));
}

// Dynamic metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ iso2: string }> }): Promise<Metadata> {
  const { iso2 } = await params;
  const code = iso2.toUpperCase();
  const regulation = STABLECOIN_REGULATIONS.find((r) => r.iso2 === code);
  const premium = PREMIUM_COUNTRIES.find((c) => c.iso2 === code);
  const centroid = COUNTRY_CENTROIDS.find((c) => c.iso2 === code);
  const name = regulation?.country || premium?.name || centroid?.name || code;

  return {
    title: `Stablecoin Data for ${name} — Premium, Volume, Regulation | Stablecoin Pulse`,
    description: `Live stablecoin data for ${name}: P2P premium vs official FX rate, 24h trading volume, regulation status, currency depreciation, and on-chain breakdown.`,
    openGraph: {
      title: `${name} — Stablecoin Data | Stablecoin Pulse`,
      description: `Stablecoin premium, volume, and regulation data for ${name}.`,
    },
  };
}

// Compute on-chain share for a country
function getChainShares(countryName: string): { chain: string; share: number }[] {
  const chains = ['tron', 'ethereum', 'bsc', 'solana', 'base', 'arbitrum'];
  const shares: { chain: string; share: number }[] = [];

  for (const chain of chains) {
    const dist = CHAIN_DISTRIBUTIONS[chain];
    if (!dist) continue;
    for (const region of dist) {
      if (region.countries.includes(countryName)) {
        // Share within region is split equally among countries
        const countryShare = region.share / region.countries.length;
        shares.push({ chain, share: countryShare });
        break;
      }
    }
  }

  // Normalize to percentages
  const total = shares.reduce((s, c) => s + c.share, 0);
  if (total === 0) return [];
  return shares
    .map((s) => ({ chain: s.chain, share: (s.share / total) * 100 }))
    .sort((a, b) => b.share - a.share);
}

const CHAIN_COLORS: Record<string, string> = {
  tron: '#FF0600',
  ethereum: '#627EEA',
  bsc: '#F0B90B',
  solana: '#9945FF',
  base: '#0052FF',
  arbitrum: '#28A0F0',
};

const CHAIN_LABELS: Record<string, string> = {
  tron: 'Tron',
  ethereum: 'Ethereum',
  bsc: 'BNB Chain',
  solana: 'Solana',
  base: 'Base',
  arbitrum: 'Arbitrum',
};

function formatVolume(v: number): string {
  if (v >= 1e9) return `$${(v / 1e9).toFixed(1)}B`;
  if (v >= 1e6) return `$${(v / 1e6).toFixed(0)}M`;
  if (v >= 1e3) return `$${(v / 1e3).toFixed(0)}K`;
  return `$${v.toFixed(0)}`;
}

function formatPremium(pct: number | null): string {
  if (pct === null) return 'N/A';
  const sign = pct >= 0 ? '+' : '';
  return `${sign}${pct.toFixed(1)}%`;
}

function getPremiumColor(pct: number | null): string {
  if (pct === null) return '#7070AA';
  if (pct <= 0) return '#A0A0B8';
  if (pct < 2) return '#00F5FF';
  if (pct < 5) return '#FFB800';
  return '#FF1493';
}

function getDepreciationColor(pct: number | null): string {
  if (pct === null) return '#7070AA';
  if (pct >= 30) return '#FF1493';
  if (pct >= 10) return '#FF6B6B';
  if (pct > 0) return '#FFB800';
  return '#00E5A0';
}

interface CountryPremiumData {
  usdtPremiumPct: number | null;
  usdcPremiumPct: number | null;
  usdtP2PPrice: number | null;
  usdcP2PPrice: number | null;
  officialRate: number;
  fiat: string;
  depreciation12m: number | null;
}

async function fetchCountryData(iso2: string) {
  let premiumData: CountryPremiumData | null = null;
  let volumeData: CountryVolume | null = null;

  // Fetch premium data directly
  const premiumCountry = ALL_PREMIUM_COUNTRIES.find((c) => c.iso2 === iso2);
  if (premiumCountry) {
    try {
      const oneYearAgo = getDateOneYearAgo();
      const [fxData, p2pPrices, historicalFX] = await Promise.all([
        fetchFXRates(),
        fetchAllP2PPrices([premiumCountry]),
        fetchHistoricalFXRates(oneYearAgo),
      ]);

      const officialRate = fxData.rates[premiumCountry.fiat] || 0;
      const p2p = p2pPrices.get(iso2);
      const usdtP2P = p2p?.usdt?.price ?? null;
      const usdcP2P = p2p?.usdc?.price ?? null;
      const usdtPremiumPct = usdtP2P && officialRate
        ? parseFloat((((usdtP2P / officialRate) - 1) * 100).toFixed(2))
        : null;
      const usdcPremiumPct = usdcP2P && officialRate
        ? parseFloat((((usdcP2P / officialRate) - 1) * 100).toFixed(2))
        : null;
      const historicalRate = historicalFX?.rates[premiumCountry.fiat.toLowerCase()] ?? null;
      const depreciation12m = historicalRate && officialRate
        ? parseFloat((((officialRate - historicalRate) / historicalRate) * 100).toFixed(1))
        : null;

      premiumData = {
        usdtPremiumPct, usdcPremiumPct,
        usdtP2PPrice: usdtP2P, usdcP2PPrice: usdcP2P,
        officialRate, fiat: premiumCountry.fiat, depreciation12m,
      };
    } catch (e) {
      console.warn('Premium data fetch failed for country page:', e);
    }
  }

  // Fetch volume data directly
  try {
    const [exchanges, btcPrice, liveStablecoins, stablecoinVolumes] = await Promise.all([
      fetchExchanges(),
      fetchBtcPrice(),
      fetchLiveStablecoinData().catch(() => null),
      fetchStablecoinVolumes().catch(() => null),
    ]);
    if (liveStablecoins) {
      calibrateWithLiveData({
        usdtShare: liveStablecoins.usdtShare,
        usdcShare: liveStablecoins.usdcShare,
        daiShare: liveStablecoins.daiShare,
      });
    }
    const result = aggregateByCountry(exchanges, btcPrice, 'all', liveStablecoins, stablecoinVolumes);
    // Find in topCountries or geojson
    volumeData = result.topCountries.find((c) => c.iso2 === iso2) || null;
    if (!volumeData && result.geojson?.features) {
      const feature = result.geojson.features.find(
        (f) => f.properties && (f.properties as Record<string, unknown>).iso2 === iso2
      );
      if (feature?.properties) {
        const p = feature.properties as Record<string, unknown>;
        volumeData = {
          country: p.country as string, iso2, iso3: '', lat: 0, lng: 0,
          volumeUsd: p.volume_usd as number, volumeBtc: 0,
          exchangeCount: p.exchange_count as number,
          topExchange: p.top_exchange as string,
          volumeNormalized: p.volume_normalized as number,
        };
      }
    }
  } catch (e) {
    console.warn('Volume data fetch failed for country page:', e);
  }

  return { premiumData, volumeData };
}

export default async function CountryPage({ params }: { params: Promise<{ iso2: string }> }) {
  const { iso2 } = await params;
  const code = iso2.toUpperCase();

  // Find the country in our data sources
  const regulation = STABLECOIN_REGULATIONS.find((r) => r.iso2 === code);
  const premiumCountry = PREMIUM_COUNTRIES.find((c) => c.iso2 === code);
  const driver = PREMIUM_DRIVERS[code];
  const timeline = REGULATORY_TIMELINES[code] || [];

  // Must exist in at least one data source (centroids covers all 155 countries on the globe)
  const centroid = COUNTRY_CENTROIDS.find((c) => c.iso2 === code);
  const countryName = regulation?.country || premiumCountry?.name || centroid?.name;
  if (!countryName) notFound();

  const { premiumData, volumeData } = await fetchCountryData(code);
  const chainShares = getChainShares(countryName);
  const exchanges = getExchangesForCountry(countryName, code);

  const flagCode = code.toLowerCase();

  return (
    <div className="min-h-screen bg-[#030308] text-[#E0E0FF] relative">
      <BackgroundGrid />

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-6 md:px-8 md:py-10">
        {/* Navigation links */}
        <div className="flex items-center gap-4 mb-6">
          <Link
            href="/?view=premium"
            className="inline-flex items-center gap-2 text-[11px] font-mono tracking-wider text-[#7070AA] hover:text-[#00F5FF] transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            PREMIUM
          </Link>
          <span className="text-[#7070AA]/30">|</span>
          <Link
            href={`/?fly=${code}`}
            className="inline-flex items-center gap-2 text-[11px] font-mono tracking-wider text-[#7070AA] hover:text-[#00F5FF] transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            VIEW ON GLOBE
          </Link>
        </div>

        {/* Country header */}
        <div className="flex items-center gap-4 mb-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://flagcdn.com/w80/${flagCode}.png`}
            srcSet={`https://flagcdn.com/w160/${flagCode}.png 2x`}
            alt={countryName}
            width={48}
            height={36}
            className="rounded-md object-cover shadow-lg"
          />
          <div>
            <h1
              className="text-2xl md:text-3xl font-bold tracking-tight"
              style={{ textShadow: '0 0 20px rgba(0,245,255,0.3)' }}
            >
              {countryName}
            </h1>
            <div className="flex items-center gap-3 mt-1">
              {regulation && (
                <span
                  className="text-[10px] font-mono tracking-wider px-2 py-0.5 rounded-md border"
                  style={{
                    color: REGULATION_COLORS[regulation.status],
                    borderColor: `${REGULATION_COLORS[regulation.status]}40`,
                    backgroundColor: `${REGULATION_COLORS[regulation.status]}12`,
                  }}
                >
                  {REGULATION_LABELS[regulation.status].toUpperCase()}
                </span>
              )}
              {premiumCountry && (
                <span className="text-[10px] font-mono text-[#7070AA]">{premiumCountry.fiat}</span>
              )}
            </div>
          </div>
        </div>

        {/* Stat cards — show premium/FX cards only when we have premium data */}
        <div className={`grid grid-cols-2 ${premiumData ? 'md:grid-cols-4' : 'md:grid-cols-2'} gap-3 mb-8`}>
          {/* Volume */}
          <div
            className="rounded-xl px-4 py-3 border border-[rgba(0,245,255,0.12)]"
            style={{ background: 'rgba(5, 5, 25, 0.8)' }}
          >
            <div className="text-[9px] font-mono tracking-wider text-[#7070AA] uppercase mb-1">24h Volume</div>
            <div className="text-lg font-mono font-bold text-[#00F5FF]">
              {volumeData ? formatVolume(volumeData.volumeUsd) : '—'}
            </div>
            {volumeData && (
              <div className="text-[9px] font-mono text-[#7070AA] mt-0.5">
                {volumeData.topExchange} + {volumeData.exchangeCount - 1} more
              </div>
            )}
          </div>

          {/* Regulation status card (only when no premium data — fills the second slot) */}
          {!premiumData && regulation && (
            <div
              className="rounded-xl px-4 py-3 border border-[rgba(0,245,255,0.12)]"
              style={{ background: 'rgba(5, 5, 25, 0.8)' }}
            >
              <div className="text-[9px] font-mono tracking-wider text-[#7070AA] uppercase mb-1">Regulation</div>
              <div
                className="text-lg font-mono font-bold"
                style={{ color: REGULATION_COLORS[regulation.status] }}
              >
                {REGULATION_LABELS[regulation.status]}
              </div>
              {regulation.keyLaw && (
                <div className="text-[9px] font-mono text-[#7070AA] mt-0.5 truncate">
                  {regulation.keyLaw}
                </div>
              )}
            </div>
          )}

          {/* USDT premium — only when we have data */}
          {premiumData && (
            <div
              className="rounded-xl px-4 py-3 border border-[rgba(0,245,255,0.12)]"
              style={{ background: 'rgba(5, 5, 25, 0.8)' }}
            >
              <div className="text-[9px] font-mono tracking-wider text-[#7070AA] uppercase mb-1">USDT Premium</div>
              <div
                className="text-lg font-mono font-bold"
                style={{ color: getPremiumColor(premiumData.usdtPremiumPct) }}
              >
                {formatPremium(premiumData.usdtPremiumPct)}
              </div>
              {premiumData.usdtP2PPrice && (
                <div className="text-[9px] font-mono text-[#7070AA] mt-0.5">
                  P2P: {premiumData.usdtP2PPrice.toLocaleString('en-US', { maximumFractionDigits: 2 })} {premiumData.fiat}
                </div>
              )}
            </div>
          )}

          {/* USDC premium — only when we have data */}
          {premiumData && (
            <div
              className="rounded-xl px-4 py-3 border border-[rgba(0,245,255,0.12)]"
              style={{ background: 'rgba(5, 5, 25, 0.8)' }}
            >
              <div className="text-[9px] font-mono tracking-wider text-[#7070AA] uppercase mb-1">USDC Premium</div>
              <div
                className="text-lg font-mono font-bold"
                style={{ color: getPremiumColor(premiumData.usdcPremiumPct) }}
              >
                {formatPremium(premiumData.usdcPremiumPct)}
              </div>
              {premiumData.usdcP2PPrice && (
                <div className="text-[9px] font-mono text-[#7070AA] mt-0.5">
                  P2P: {premiumData.usdcP2PPrice.toLocaleString('en-US', { maximumFractionDigits: 2 })} {premiumData.fiat}
                </div>
              )}
            </div>
          )}

          {/* Currency depreciation — only when we have data */}
          {premiumData && (
            <div
              className="rounded-xl px-4 py-3 border border-[rgba(0,245,255,0.12)]"
              style={{ background: 'rgba(5, 5, 25, 0.8)' }}
            >
              <div className="text-[9px] font-mono tracking-wider text-[#7070AA] uppercase mb-1">FX vs USD (12M)</div>
              <div
                className="text-lg font-mono font-bold"
                style={{ color: getDepreciationColor(premiumData.depreciation12m) }}
              >
                {premiumData.depreciation12m !== null && premiumData.depreciation12m !== undefined
                  ? `${premiumData.depreciation12m > 0 ? '↓' : '↑'} ${Math.abs(premiumData.depreciation12m).toFixed(1)}%`
                  : '—'}
              </div>
              {premiumData.officialRate && premiumCountry && (
                <div className="text-[9px] font-mono text-[#7070AA] mt-0.5">
                  $1 = {premiumData.officialRate.toLocaleString('en-US', { maximumFractionDigits: premiumData.officialRate >= 100 ? 0 : 2 })} {premiumCountry.fiat}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Regulation section */}
        {regulation && (
          <section
            className="rounded-xl px-5 py-4 mb-6 border border-[rgba(0,245,255,0.12)]"
            style={{ background: 'rgba(5, 5, 25, 0.8)' }}
          >
            <h2 className="text-[10px] font-mono tracking-[0.2em] text-[#7070AA] uppercase mb-3">Regulation</h2>
            <p className="text-sm leading-relaxed text-[#C0C0E0] mb-3">{regulation.summary}</p>
            {regulation.keyLaw && (
              <div className="flex items-center gap-2 text-xs font-mono text-[#7070AA] mb-2">
                <span className="text-[#E0E0FF]">Key law:</span> {regulation.keyLaw}
              </div>
            )}
            {regulation.stablecoinsAllowed && regulation.stablecoinsAllowed.length > 0 && (
              <div className="flex items-center gap-2 text-xs font-mono text-[#7070AA]">
                <span className="text-[#E0E0FF]">{regulation.status === 'restricted' ? 'Most used:' : 'Allowed:'}</span>
                <div className="flex gap-1.5">
                  {regulation.stablecoinsAllowed.map((coin) => (
                    <span
                      key={coin}
                      className="px-2 py-0.5 rounded text-[10px] border border-[rgba(0,245,255,0.2)] text-[#00F5FF]"
                      style={{ background: 'rgba(0,245,255,0.06)' }}
                    >
                      {coin}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {regulation.notes && (
              <p className="text-[11px] font-mono text-[#7070AA] mt-3 leading-relaxed">{regulation.notes}</p>
            )}
          </section>
        )}

        {/* Regulatory timeline */}
        {timeline.length > 0 && (
          <section
            className="rounded-xl px-5 py-4 mb-6 border border-[rgba(0,245,255,0.12)]"
            style={{ background: 'rgba(5, 5, 25, 0.8)' }}
          >
            <h2 className="text-[10px] font-mono tracking-[0.2em] text-[#7070AA] uppercase mb-4">
              Regulatory Timeline
            </h2>
            <div className="relative pl-4 border-l border-[rgba(0,245,255,0.15)]">
              {timeline.map((evt, i) => {
                const isFuture = evt.date > '2026-03';
                return (
                  <div key={i} className="relative mb-4 last:mb-0">
                    {/* Dot on the line */}
                    <div
                      className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full border-2"
                      style={{
                        borderColor: isFuture ? '#7070AA' : '#00F5FF',
                        backgroundColor: isFuture ? 'transparent' : '#00F5FF',
                        boxShadow: isFuture ? 'none' : '0 0 6px rgba(0,245,255,0.5)',
                      }}
                    />
                    <div className="text-[10px] font-mono tracking-wider text-[#7070AA] mb-0.5">
                      {evt.date.length === 7
                        ? new Date(evt.date + '-01').toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
                        : evt.date}
                    </div>
                    <p className={`text-sm leading-relaxed ${isFuture ? 'text-[#7070AA]' : 'text-[#C0C0E0]'}`}>
                      {evt.event}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Why this matters (premium driver) */}
        {driver && (
          <section
            className="rounded-xl px-5 py-4 mb-6 border"
            style={{
              background: `${driver.color}08`,
              borderColor: `${driver.color}25`,
            }}
          >
            <h2 className="text-[10px] font-mono tracking-[0.2em] uppercase mb-2" style={{ color: driver.color }}>
              Why This Matters
            </h2>
            <div className="flex items-center gap-2 mb-2">
              <span
                className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wider border"
                style={{ color: driver.color, borderColor: `${driver.color}40`, background: `${driver.color}15` }}
              >
                {driver.label}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-[#C0C0E0]">{driver.explanation}</p>
          </section>
        )}

        {/* How to buy stablecoins */}
        {exchanges.length > 0 && (
          <section
            className="rounded-xl px-5 py-4 mb-6 border border-[rgba(0,245,255,0.12)]"
            style={{ background: 'rgba(5, 5, 25, 0.8)' }}
          >
            <h2 className="text-[10px] font-mono tracking-[0.2em] text-[#7070AA] uppercase mb-4">
              How to Buy Stablecoins in {countryName}
            </h2>
            <div className="space-y-3">
              {exchanges.map((ex) => (
                <a
                  key={ex.id}
                  href={ex.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 p-3 rounded-lg border border-[rgba(0,245,255,0.08)] hover:border-[rgba(0,245,255,0.25)] transition-colors group"
                  style={{ background: 'rgba(0,245,255,0.02)' }}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-sm font-mono font-bold text-[#E0E0FF] group-hover:text-[#00F5FF] transition-colors">
                        {ex.name}
                      </span>
                      {ex.type === 'local' && (
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded border border-[rgba(0,229,160,0.3)] text-[#00E5A0]" style={{ background: 'rgba(0,229,160,0.08)' }}>
                          LOCAL
                        </span>
                      )}
                      {ex.hasP2P && (
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded border border-[rgba(255,184,0,0.3)] text-[#FFB800]" style={{ background: 'rgba(255,184,0,0.08)' }}>
                          P2P
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-1.5">
                      {ex.stablecoins.map((coin) => (
                        <span
                          key={coin}
                          className="text-[9px] font-mono px-1.5 py-0.5 rounded border border-[rgba(0,245,255,0.15)] text-[#00F5FF]"
                          style={{ background: 'rgba(0,245,255,0.05)' }}
                        >
                          {coin}
                        </span>
                      ))}
                    </div>
                    <div className="text-[10px] font-mono text-[#7070AA]">
                      {ex.paymentMethods.join(' · ')}
                    </div>
                  </div>
                  <svg
                    width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    className="text-[#7070AA] group-hover:text-[#00F5FF] transition-colors mt-1 flex-shrink-0"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </a>
              ))}
            </div>
            <p className="text-[9px] font-mono text-[#7070AA] mt-3">
              Exchange availability may vary. Always verify directly with the exchange. Not financial advice.
            </p>
          </section>
        )}

        {/* On-chain breakdown */}
        {chainShares.length > 0 && (
          <section
            className="rounded-xl px-5 py-4 mb-6 border border-[rgba(0,245,255,0.12)]"
            style={{ background: 'rgba(5, 5, 25, 0.8)' }}
          >
            <h2 className="text-[10px] font-mono tracking-[0.2em] text-[#7070AA] uppercase mb-4">
              Estimated On-Chain Breakdown
            </h2>
            <div className="space-y-3">
              {chainShares.map((cs) => (
                <div key={cs.chain}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono text-[#E0E0FF]">{CHAIN_LABELS[cs.chain] || cs.chain}</span>
                    <span className="text-xs font-mono" style={{ color: CHAIN_COLORS[cs.chain] || '#7070AA' }}>
                      {cs.share.toFixed(1)}%
                    </span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(112,112,170,0.15)' }}>
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${cs.share}%`,
                        background: CHAIN_COLORS[cs.chain] || '#7070AA',
                        boxShadow: `0 0 8px ${CHAIN_COLORS[cs.chain] || '#7070AA'}60`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[9px] font-mono text-[#7070AA] mt-3">
              Estimated based on regional chain usage patterns. Not exact per-country data.
            </p>
          </section>
        )}


        {/* Footer disclaimer */}
        <div className="text-[10px] font-mono text-[#7070AA] leading-relaxed mt-8 border-t border-[rgba(0,245,255,0.08)] pt-4">
          Data from CoinGecko, DefiLlama, and Binance P2P. Premium = P2P median price vs official FX rate.
          Volume is estimated based on exchange country attribution. Not financial advice.
        </div>
      </div>
    </div>
  );
}
