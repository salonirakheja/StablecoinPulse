import { NextResponse } from 'next/server';
import { fetchExchanges, fetchBtcPrice, fetchStablecoinVolumes } from '@/lib/coingecko';
import { fetchLiveStablecoinData } from '@/lib/defillama';
import { aggregateByCountry } from '@/lib/aggregator';
import { calibrateWithLiveData } from '@/data/stablecoin-weights';
import { StablecoinFilter } from '@/lib/types';

export const revalidate = 900; // ISR: revalidate every 15 minutes

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const filter = (searchParams.get('filter') || 'all') as StablecoinFilter;

    // Fetch all data sources in parallel
    const [exchanges, btcPrice, liveStablecoins, stablecoinVolumes] = await Promise.all([
      fetchExchanges(),
      fetchBtcPrice(),
      fetchLiveStablecoinData().catch(() => null), // Don't fail if DefiLlama is down
      fetchStablecoinVolumes().catch(() => null),  // Don't fail if CoinGecko volume fetch fails
    ]);

    // Calibrate country weights with live market share data
    if (liveStablecoins) {
      calibrateWithLiveData({
        usdtShare: liveStablecoins.usdtShare,
        usdcShare: liveStablecoins.usdcShare,
        daiShare: liveStablecoins.daiShare,
      });
    }

    const result = aggregateByCountry(exchanges, btcPrice, filter, liveStablecoins, stablecoinVolumes);

    return NextResponse.json({
      ...result,
      lastUpdated: new Date().toISOString(),
      btcPrice,
      // Include live stablecoin market data for the UI
      stablecoinStats: liveStablecoins ? {
        usdtMarketCap: liveStablecoins.usdtMarketCap,
        usdcMarketCap: liveStablecoins.usdcMarketCap,
        daiMarketCap: liveStablecoins.daiMarketCap,
        totalMarketCap: liveStablecoins.totalStablecoinMarketCap,
        usdtDominance: (liveStablecoins.usdtShare * 100).toFixed(1),
        usdcDominance: (liveStablecoins.usdcShare * 100).toFixed(1),
        daiDominance: (liveStablecoins.daiShare * 100).toFixed(1),
      } : null,
    });
  } catch (error) {
    console.error('Volume API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch volume data' },
      { status: 500 }
    );
  }
}
