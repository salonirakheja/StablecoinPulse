import { NextResponse } from 'next/server';
import { PREMIUM_COUNTRIES } from '@/data/premium-countries';
import { fetchFXRates } from '@/lib/exchange-rates';
import { fetchAllP2PPrices } from '@/lib/binance-p2p';
import { redis } from '@/lib/redis';

export const dynamic = 'force-dynamic';

export interface CountryPremium {
  country: string;
  iso2: string;
  fiat: string;
  fiatSymbol: string;
  officialRate: number;
  usdtP2PPrice: number | null;
  usdcP2PPrice: number | null;
  usdtPremiumPct: number | null;
  usdcPremiumPct: number | null;
  usdtAdCount: number;
  usdcAdCount: number;
}

export interface PremiumApiResponse {
  premiums: CountryPremium[];
  countriesTracked: number;
  countriesWithData: number;
  lastUpdated: string;
}

export async function GET() {
  try {
    // Check Redis cache
    const cacheKey = 'premium:all';
    if (redis) {
      try {
        const cached = await redis.get(cacheKey);
        if (cached) {
          return NextResponse.json(cached);
        }
      } catch (e) {
        console.warn('Redis read failed, falling through to fresh fetch:', e);
      }
    }

    // Fetch FX rates and P2P prices in parallel
    const [fxData, p2pPrices] = await Promise.all([
      fetchFXRates(),
      fetchAllP2PPrices(PREMIUM_COUNTRIES),
    ]);

    // Compute premium for each country
    const premiums: CountryPremium[] = PREMIUM_COUNTRIES.map((country) => {
      const officialRate = fxData.rates[country.fiat] || 0;
      const p2p = p2pPrices.get(country.iso2);
      const usdtP2P = p2p?.usdt?.price ?? null;
      const usdcP2P = p2p?.usdc?.price ?? null;

      // Premium formula: ((p2p_price / official_rate) - 1) * 100
      const usdtPremiumPct = usdtP2P && officialRate
        ? parseFloat((((usdtP2P / officialRate) - 1) * 100).toFixed(2))
        : null;
      const usdcPremiumPct = usdcP2P && officialRate
        ? parseFloat((((usdcP2P / officialRate) - 1) * 100).toFixed(2))
        : null;

      return {
        country: country.name,
        iso2: country.iso2,
        fiat: country.fiat,
        fiatSymbol: country.fiatSymbol,
        officialRate,
        usdtP2PPrice: usdtP2P,
        usdcP2PPrice: usdcP2P,
        usdtPremiumPct,
        usdcPremiumPct,
        usdtAdCount: p2p?.usdt?.adCount ?? 0,
        usdcAdCount: p2p?.usdc?.adCount ?? 0,
      };
    });

    // Sort by highest USDT premium (nulls last)
    premiums.sort((a, b) => {
      if (a.usdtPremiumPct === null && b.usdtPremiumPct === null) return 0;
      if (a.usdtPremiumPct === null) return 1;
      if (b.usdtPremiumPct === null) return -1;
      return b.usdtPremiumPct - a.usdtPremiumPct;
    });

    const countriesWithData = premiums.filter(
      (p) => p.usdtPremiumPct !== null || p.usdcPremiumPct !== null
    ).length;

    const responseData: PremiumApiResponse = {
      premiums,
      countriesTracked: PREMIUM_COUNTRIES.length,
      countriesWithData,
      lastUpdated: new Date().toISOString(),
    };

    // Store in Redis with 15-minute TTL
    if (redis) {
      try {
        await redis.set(cacheKey, JSON.stringify(responseData), { ex: 900 });
      } catch (e) {
        console.warn('Redis write failed:', e);
      }
    }

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Premium API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch premium data' },
      { status: 500 }
    );
  }
}
