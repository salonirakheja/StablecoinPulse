import { PremiumCountry } from '@/data/premium-countries';

export interface P2PPrice {
  fiat: string;
  asset: string;
  price: number;
  adCount: number;
  source: 'binance' | 'bybit';
}

const BINANCE_ENDPOINT = 'https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search';
const BYBIT_ENDPOINT = 'https://api2.bybit.com/fiat/otc/item/online';

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function median(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

async function fetchBinanceP2P(asset: string, fiat: string): Promise<P2PPrice | null> {
  try {
    const res = await fetch(BINANCE_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        page: 1,
        rows: 10,
        asset,
        tradeType: 'BUY',
        fiat,
        payTypes: [],
        publisherType: null,
      }),
      cache: 'no-store',
    });

    if (!res.ok) return null;

    const data = await res.json();
    const ads = data?.data;
    if (!Array.isArray(ads) || ads.length === 0) return null;

    // Require at least 3 ads for a reliable median
    if (ads.length < 3) return null;

    const prices = ads
      .slice(0, 5)
      .map((ad: { adv?: { price?: string } }) => parseFloat(ad.adv?.price || '0'))
      .filter((p: number) => p > 0);

    if (prices.length < 3) return null;

    return {
      fiat,
      asset,
      price: median(prices),
      adCount: ads.length,
      source: 'binance',
    };
  } catch (e) {
    console.warn(`Binance P2P failed for ${asset}/${fiat}:`, e);
    return null;
  }
}

async function fetchBybitP2P(asset: string, fiat: string): Promise<P2PPrice | null> {
  try {
    const res = await fetch(BYBIT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tokenId: asset,
        currencyId: fiat,
        side: '1', // Buy
        size: '10',
        page: '1',
        payment: [],
      }),
      cache: 'no-store',
    });

    if (!res.ok) return null;

    const data = await res.json();
    const items = data?.result?.items;
    if (!Array.isArray(items) || items.length === 0) return null;

    // Require at least 3 ads for a reliable median
    if (items.length < 3) return null;

    const prices = items
      .slice(0, 5)
      .map((item: { price?: string }) => parseFloat(item.price || '0'))
      .filter((p: number) => p > 0);

    if (prices.length < 3) return null;

    return {
      fiat,
      asset,
      price: median(prices),
      adCount: items.length,
      source: 'bybit',
    };
  } catch (e) {
    console.warn(`Bybit P2P failed for ${asset}/${fiat}:`, e);
    return null;
  }
}

async function fetchP2PWithFallback(asset: string, fiat: string): Promise<P2PPrice | null> {
  const binance = await fetchBinanceP2P(asset, fiat);
  if (binance) return binance;
  return fetchBybitP2P(asset, fiat);
}

export async function fetchAllP2PPrices(
  countries: PremiumCountry[]
): Promise<Map<string, { usdt: P2PPrice | null; usdc: P2PPrice | null }>> {
  const results = new Map<string, { usdt: P2PPrice | null; usdc: P2PPrice | null }>();

  // Process in batches of 4 countries, each fetching USDT+USDC in parallel
  const BATCH_SIZE = 4;
  for (let i = 0; i < countries.length; i += BATCH_SIZE) {
    const batch = countries.slice(i, i + BATCH_SIZE);

    const batchResults = await Promise.all(
      batch.map(async (country) => {
        const [usdt, usdc] = await Promise.all([
          fetchP2PWithFallback('USDT', country.fiat),
          fetchP2PWithFallback('USDC', country.fiat),
        ]);
        return { iso2: country.iso2, usdt, usdc };
      })
    );

    for (const r of batchResults) {
      results.set(r.iso2, { usdt: r.usdt, usdc: r.usdc });
    }

    // Brief pause between batches to avoid rate-limiting
    if (i + BATCH_SIZE < countries.length) {
      await sleep(300);
    }
  }

  return results;
}
