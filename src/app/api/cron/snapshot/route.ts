import { NextResponse } from 'next/server';
import { redis } from '@/lib/redis';
import { PREMIUM_COUNTRIES } from '@/data/premium-countries';
import { STABLECOIN_RATINGS } from '@/data/stablecoin-ratings';
import { fetchFXRates } from '@/lib/exchange-rates';
import { fetchAllP2PPrices } from '@/lib/binance-p2p';
import { fetchHistoricalFXRates, getDateOneYearAgo } from '@/lib/historical-fx';
import { fetchExchanges, fetchBtcPrice, fetchStablecoinVolumes } from '@/lib/coingecko';
import { fetchLiveStablecoinData } from '@/lib/defillama';
import { aggregateByCountry } from '@/lib/aggregator';
import { calibrateWithLiveData } from '@/data/stablecoin-weights';

export const dynamic = 'force-dynamic';
export const maxDuration = 60; // Allow up to 60s for all fetches

// Vercel cron security: verify the request is from Vercel
function isAuthorized(request: Request): boolean {
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  // If CRON_SECRET is set, require it
  if (cronSecret) {
    return authHeader === `Bearer ${cronSecret}`;
  }

  // In development or if no secret configured, allow
  return true;
}

function getDateKey(): string {
  // UTC date string: 2026-03-18
  return new Date().toISOString().split('T')[0];
}

interface VolumeSnapshot {
  country: string;
  iso2: string;
  volumeUsd: number;
  exchangeCount: number;
  topExchange: string;
}

interface PremiumSnapshot {
  iso2: string;
  fiat: string;
  officialRate: number;
  usdtP2PPrice: number | null;
  usdcP2PPrice: number | null;
  usdtPremiumPct: number | null;
  usdcPremiumPct: number | null;
  depreciation12m: number | null;
}

interface RatingSnapshot {
  id: string;
  ticker: string;
  totalScore: number;
  grade: string;
}

interface DailySnapshot {
  date: string;
  timestamp: string;
  volumes: VolumeSnapshot[];
  premiums: PremiumSnapshot[];
  fxRates: Record<string, number>;
  ratings: RatingSnapshot[];
  meta: {
    countriesWithVolume: number;
    countriesWithPremium: number;
    totalGlobalVolume: number;
  };
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!redis) {
    return NextResponse.json({ error: 'Redis not configured' }, { status: 500 });
  }

  const dateKey = getDateKey();
  const snapshotKey = `snapshot:${dateKey}`;

  // Check if we already snapshotted today (idempotent)
  try {
    const existing = await redis.get(snapshotKey);
    if (existing) {
      return NextResponse.json({
        status: 'already_exists',
        date: dateKey,
        message: 'Snapshot already taken today',
      });
    }
  } catch {
    // Continue even if check fails
  }

  try {
    // Fetch all data in parallel
    const oneYearAgo = getDateOneYearAgo();
    const [fxData, p2pPrices, historicalFX, exchanges, btcPrice, liveStablecoins, stablecoinVolumes] =
      await Promise.all([
        fetchFXRates(),
        fetchAllP2PPrices(PREMIUM_COUNTRIES),
        fetchHistoricalFXRates(oneYearAgo),
        fetchExchanges(),
        fetchBtcPrice(),
        fetchLiveStablecoinData().catch(() => null),
        fetchStablecoinVolumes().catch(() => null),
      ]);

    // --- Volume data ---
    if (liveStablecoins) {
      calibrateWithLiveData({
        usdtShare: liveStablecoins.usdtShare,
        usdcShare: liveStablecoins.usdcShare,
        daiShare: liveStablecoins.daiShare,
      });
    }
    const volumeResult = aggregateByCountry(exchanges, btcPrice, 'all', liveStablecoins, stablecoinVolumes);
    // Extract all countries from geojson (not just top 10)
    const volumes: VolumeSnapshot[] = [];
    if (volumeResult.geojson?.features) {
      for (const feature of volumeResult.geojson.features) {
        const p = feature.properties as Record<string, unknown> | null;
        if (p && p.iso2 && p.volume_usd) {
          volumes.push({
            country: p.country as string,
            iso2: p.iso2 as string,
            volumeUsd: p.volume_usd as number,
            exchangeCount: (p.exchange_count as number) || 0,
            topExchange: (p.top_exchange as string) || '',
          });
        }
      }
    }
    // Sort by volume descending
    volumes.sort((a, b) => b.volumeUsd - a.volumeUsd);

    // --- Premium data ---
    const premiums: PremiumSnapshot[] = PREMIUM_COUNTRIES.map((country) => {
      const officialRate = fxData.rates[country.fiat] || 0;
      const p2p = p2pPrices.get(country.iso2);
      const usdtP2P = p2p?.usdt?.price ?? null;
      const usdcP2P = p2p?.usdc?.price ?? null;
      const usdtPremiumPct =
        usdtP2P && officialRate
          ? parseFloat((((usdtP2P / officialRate) - 1) * 100).toFixed(2))
          : null;
      const usdcPremiumPct =
        usdcP2P && officialRate
          ? parseFloat((((usdcP2P / officialRate) - 1) * 100).toFixed(2))
          : null;
      const historicalRate = historicalFX?.rates[country.fiat.toLowerCase()] ?? null;
      const depreciation12m =
        historicalRate && officialRate
          ? parseFloat((((officialRate - historicalRate) / historicalRate) * 100).toFixed(1))
          : null;

      return {
        iso2: country.iso2,
        fiat: country.fiat,
        officialRate,
        usdtP2PPrice: usdtP2P,
        usdcP2PPrice: usdcP2P,
        usdtPremiumPct,
        usdcPremiumPct,
        depreciation12m,
      };
    });

    // --- FX rates ---
    const fxRates: Record<string, number> = {};
    for (const c of PREMIUM_COUNTRIES) {
      if (fxData.rates[c.fiat]) {
        fxRates[c.fiat] = fxData.rates[c.fiat];
      }
    }

    // --- Ratings snapshot ---
    const ratings: RatingSnapshot[] = STABLECOIN_RATINGS.map((r) => ({
      id: r.id,
      ticker: r.ticker,
      totalScore: r.totalScore,
      grade: r.grade,
    }));

    // --- Build snapshot ---
    const totalGlobalVolume = volumes.reduce((sum, v) => sum + v.volumeUsd, 0);
    const countriesWithPremium = premiums.filter(
      (p) => p.usdtPremiumPct !== null || p.usdcPremiumPct !== null
    ).length;

    const snapshot: DailySnapshot = {
      date: dateKey,
      timestamp: new Date().toISOString(),
      volumes,
      premiums,
      fxRates,
      ratings,
      meta: {
        countriesWithVolume: volumes.length,
        countriesWithPremium,
        totalGlobalVolume,
      },
    };

    // Store snapshot — no expiry (permanent historical data)
    await redis.set(snapshotKey, JSON.stringify(snapshot));

    // Also maintain an index of all snapshot dates
    const indexKey = 'snapshot:index';
    const existingIndex = await redis.get<string[]>(indexKey);
    const index = existingIndex || [];
    if (!index.includes(dateKey)) {
      index.push(dateKey);
      await redis.set(indexKey, JSON.stringify(index));
    }

    return NextResponse.json({
      status: 'success',
      date: dateKey,
      meta: snapshot.meta,
      message: `Snapshot saved: ${volumes.length} countries volume, ${countriesWithPremium} countries premium, ${Object.keys(fxRates).length} FX rates, ${ratings.length} ratings`,
    });
  } catch (error) {
    console.error('Snapshot cron error:', error);
    return NextResponse.json(
      {
        status: 'error',
        date: dateKey,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
