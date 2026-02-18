import { CoinGeckoExchange } from './types';

const BASE_URL = 'https://api.coingecko.com/api/v3';
const MIN_INTERVAL_MS = 2000; // 2s between requests (safe for free tier)

let lastRequestTime = 0;

async function throttledFetch(url: string): Promise<Response> {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  if (timeSinceLastRequest < MIN_INTERVAL_MS) {
    await new Promise(resolve => setTimeout(resolve, MIN_INTERVAL_MS - timeSinceLastRequest));
  }
  lastRequestTime = Date.now();

  const response = await fetch(url, {
    headers: { Accept: 'application/json' },
    next: { revalidate: 900 },
  });

  if (response.status === 429) {
    // Rate limited — wait and retry once
    await new Promise(resolve => setTimeout(resolve, 5000));
    lastRequestTime = Date.now();
    const retry = await fetch(url, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 900 },
    });
    if (!retry.ok) {
      throw new Error(`CoinGecko API error after retry: ${retry.status} ${retry.statusText}`);
    }
    return retry;
  }

  if (!response.ok) {
    throw new Error(`CoinGecko API error: ${response.status} ${response.statusText}`);
  }

  return response;
}

export async function fetchExchanges(): Promise<CoinGeckoExchange[]> {
  const allExchanges: CoinGeckoExchange[] = [];

  // Fetch 2 pages (500 exchanges, covers 99%+ of volume)
  for (let page = 1; page <= 2; page++) {
    const response = await throttledFetch(
      `${BASE_URL}/exchanges?per_page=250&page=${page}`
    );
    const data = await response.json();
    if (!Array.isArray(data)) {
      console.warn(`CoinGecko page ${page} returned non-array:`, JSON.stringify(data).slice(0, 200));
      continue; // Skip this page instead of crashing
    }
    allExchanges.push(...data);
  }

  return allExchanges;
}

export async function fetchBtcPrice(): Promise<number> {
  const response = await throttledFetch(
    `${BASE_URL}/simple/price?ids=bitcoin&vs_currencies=usd`
  );
  const data = await response.json();
  return data.bitcoin.usd;
}

export interface StablecoinVolumes {
  usdt: number;
  usdc: number;
  dai: number;
  total: number; // USDT + USDC + DAI + estimated others
}

export async function fetchStablecoinVolumes(): Promise<StablecoinVolumes> {
  const response = await throttledFetch(
    `${BASE_URL}/simple/price?ids=tether,usd-coin,dai&vs_currencies=usd&include_24hr_vol=true`
  );
  const data = await response.json();

  const usdt = data.tether?.usd_24h_vol || 0;
  const usdc = data['usd-coin']?.usd_24h_vol || 0;
  const dai = data.dai?.usd_24h_vol || 0;

  // "ALL" includes other stablecoins (FDUSD, PYUSD, TUSD, USDe, etc.)
  // USDT+USDC+DAI ≈ 88% of stablecoin volume; scale up ~12% for others
  const total = (usdt + usdc + dai) * 1.12;

  console.log(`[CoinGecko] Stablecoin 24h volumes — USDT: $${(usdt / 1e9).toFixed(1)}B | USDC: $${(usdc / 1e9).toFixed(1)}B | DAI: $${(dai / 1e9).toFixed(2)}B | Total (incl others): $${(total / 1e9).toFixed(1)}B`);

  return { usdt, usdc, dai, total };
}
