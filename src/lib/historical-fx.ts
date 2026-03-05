import { redis } from './redis';

interface HistoricalRates {
  rates: Record<string, number>;
  date: string;
}

/**
 * Fetch historical FX rates (USD base) for a specific date from fawazahmed0/exchange-api.
 * Returns lowercase currency codes (e.g., 'ngn', 'ars').
 * Uses Redis cache with 24h TTL. Falls back to Cloudflare Pages endpoint.
 */
export async function fetchHistoricalFXRates(dateStr: string): Promise<HistoricalRates | null> {
  const cacheKey = `fx-historical:${dateStr}`;

  // Check Redis cache
  if (redis) {
    try {
      const cached = await redis.get(cacheKey);
      if (cached) {
        return typeof cached === 'string' ? JSON.parse(cached) : cached as HistoricalRates;
      }
    } catch (e) {
      console.warn('Redis read failed for historical FX:', e);
    }
  }

  // Primary: jsDelivr CDN
  const primary = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${dateStr}/v1/currencies/usd.min.json`;
  // Fallback: Cloudflare Pages
  const fallback = `https://${dateStr}.currency-api.pages.dev/v1/currencies/usd.min.json`;

  for (const url of [primary, fallback]) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
      if (!res.ok) continue;
      const data = await res.json();
      if (data?.usd) {
        const result: HistoricalRates = {
          rates: data.usd,
          date: data.date || dateStr,
        };

        // Cache for 24 hours
        if (redis) {
          try {
            await redis.set(cacheKey, JSON.stringify(result), { ex: 86400 });
          } catch (e) {
            console.warn('Redis write failed for historical FX:', e);
          }
        }

        return result;
      }
    } catch (e) {
      console.warn(`Historical FX fetch failed (${url}):`, e);
    }
  }

  return null;
}

/**
 * Get the date string for 12 months ago in YYYY-MM-DD format.
 */
export function getDateOneYearAgo(): string {
  const d = new Date();
  d.setFullYear(d.getFullYear() - 1);
  return d.toISOString().split('T')[0];
}
