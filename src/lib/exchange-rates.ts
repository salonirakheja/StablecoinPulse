interface FXResponse {
  rates: Record<string, number>;
  lastUpdated: string;
}

export async function fetchFXRates(): Promise<FXResponse> {
  // Primary: open.er-api.com (free, no auth)
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/USD', {
      next: { revalidate: 900 },
    });
    if (res.ok) {
      const data = await res.json();
      if (data.rates) {
        return {
          rates: data.rates,
          lastUpdated: data.time_last_update_utc || new Date().toISOString(),
        };
      }
    }
  } catch (e) {
    console.warn('Primary FX API failed, trying fallback:', e);
  }

  // Fallback: exchangerate-api.com
  try {
    const res = await fetch('https://api.exchangerate-api.com/v4/latest/USD', {
      next: { revalidate: 900 },
    });
    if (res.ok) {
      const data = await res.json();
      if (data.rates) {
        return {
          rates: data.rates,
          lastUpdated: data.date || new Date().toISOString(),
        };
      }
    }
  } catch (e) {
    console.warn('Fallback FX API also failed:', e);
  }

  throw new Error('All FX rate sources failed');
}
