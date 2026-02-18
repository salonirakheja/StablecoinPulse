// DefiLlama Stablecoins API — free, no key, no rate limits

interface DefiLlamaStablecoin {
  id: number;
  name: string;
  symbol: string;
  circulating: { peggedUSD: number };
  chainCirculating: Record<string, { current: { peggedUSD: number } }>;
  chains: string[];
}

interface DefiLlamaResponse {
  peggedAssets: DefiLlamaStablecoin[];
}

interface DefiLlamaChain {
  name: string;
  totalCirculatingUSD: { peggedUSD: number };
}

export interface LiveStablecoinData {
  // Global market caps
  usdtMarketCap: number;
  usdcMarketCap: number;
  daiMarketCap: number;
  totalStablecoinMarketCap: number;

  // Live global shares (replaces hardcoded defaults)
  usdtShare: number; // e.g., 0.65
  usdcShare: number; // e.g., 0.22
  daiShare: number;  // e.g., 0.03

  // Per-chain stablecoin distribution (for regional signal)
  chainBreakdown: {
    tron: { usdt: number; usdc: number };      // Tron = Asia/EM signal
    ethereum: { usdt: number; usdc: number };   // Ethereum = Western/DeFi signal
    solana: { usdt: number; usdc: number };     // Solana = growing everywhere
    bsc: { usdt: number; usdc: number };        // BSC = Asia signal
    arbitrum: { usdt: number; usdc: number };   // L2s = Western/DeFi signal
    base: { usdt: number; usdc: number };       // Base = US/Coinbase signal
  };
}

export async function fetchLiveStablecoinData(): Promise<LiveStablecoinData> {
  const res = await fetch('https://stablecoins.llama.fi/stablecoins?includePrices=false', {
    next: { revalidate: 900 },
  });

  if (!res.ok) throw new Error(`DefiLlama API error: ${res.status}`);

  const data: DefiLlamaResponse = await res.json();
  const assets = data.peggedAssets;

  // Find the big three
  const usdt = assets.find(a => a.symbol === 'USDT');
  const usdc = assets.find(a => a.symbol === 'USDC');
  const dai = assets.find(a => a.symbol === 'DAI');

  const usdtMcap = usdt?.circulating?.peggedUSD || 0;
  const usdcMcap = usdc?.circulating?.peggedUSD || 0;
  const daiMcap = dai?.circulating?.peggedUSD || 0;

  // Total stablecoin market cap (all USD-pegged assets)
  const totalMcap = assets.reduce((sum, a) => sum + (a.circulating?.peggedUSD || 0), 0);

  // Global shares based on market cap (proxy for volume share)
  const usdtShare = totalMcap > 0 ? usdtMcap / totalMcap : 0.65;
  const usdcShare = totalMcap > 0 ? usdcMcap / totalMcap : 0.22;
  const daiShare = totalMcap > 0 ? daiMcap / totalMcap : 0.03;

  // Extract per-chain breakdown for USDT and USDC
  function getChainAmount(asset: DefiLlamaStablecoin | undefined, chain: string): number {
    if (!asset?.chainCirculating?.[chain]) return 0;
    return asset.chainCirculating[chain].current?.peggedUSD || 0;
  }

  const chains = ['Tron', 'Ethereum', 'Solana', 'BSC', 'Arbitrum', 'Base'] as const;
  const chainBreakdown = {
    tron: {
      usdt: getChainAmount(usdt, 'Tron'),
      usdc: getChainAmount(usdc, 'Tron'),
    },
    ethereum: {
      usdt: getChainAmount(usdt, 'Ethereum'),
      usdc: getChainAmount(usdc, 'Ethereum'),
    },
    solana: {
      usdt: getChainAmount(usdt, 'Solana'),
      usdc: getChainAmount(usdc, 'Solana'),
    },
    bsc: {
      usdt: getChainAmount(usdt, 'BSC'),
      usdc: getChainAmount(usdc, 'BSC'),
    },
    arbitrum: {
      usdt: getChainAmount(usdt, 'Arbitrum'),
      usdc: getChainAmount(usdc, 'Arbitrum'),
    },
    base: {
      usdt: getChainAmount(usdt, 'Base'),
      usdc: getChainAmount(usdc, 'Base'),
    },
  };

  return {
    usdtMarketCap: usdtMcap,
    usdcMarketCap: usdcMcap,
    daiMarketCap: daiMcap,
    totalStablecoinMarketCap: totalMcap,
    usdtShare,
    usdcShare,
    daiShare,
    chainBreakdown,
  };
}
