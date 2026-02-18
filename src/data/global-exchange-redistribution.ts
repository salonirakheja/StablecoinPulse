// Global exchanges registered in tax havens have users worldwide.
// Instead of attributing all their volume to Seychelles/Cayman Islands/BVI,
// we redistribute based on known user demographics from:
// - Company reports & investor presentations
// - SimilarWeb/app store geographic data
// - Chainalysis geographic crypto adoption reports
// - Known regulatory actions (which reveal where users are)
//
// Exchanges NOT in this map have their volume attributed to their registered country.

export interface UserDistribution {
  country: string;
  share: number;
}

export interface GlobalExchangeProfile {
  name: string;
  distributions: UserDistribution[];
}

// Binance: world's largest exchange. ~40% Asia, ~25% Europe, ~15% LatAm, ~10% ME/Africa, ~10% NA
const BINANCE: UserDistribution[] = [
  { country: 'China', share: 0.08 },
  { country: 'India', share: 0.08 },
  { country: 'Vietnam', share: 0.04 },
  { country: 'Thailand', share: 0.03 },
  { country: 'Indonesia', share: 0.03 },
  { country: 'Philippines', share: 0.02 },
  { country: 'South Korea', share: 0.03 },
  { country: 'Japan', share: 0.02 },
  { country: 'Turkey', share: 0.06 },
  { country: 'Russia', share: 0.05 },
  { country: 'Ukraine', share: 0.03 },
  { country: 'Nigeria', share: 0.04 },
  { country: 'South Africa', share: 0.02 },
  { country: 'Brazil', share: 0.05 },
  { country: 'Argentina', share: 0.03 },
  { country: 'Mexico', share: 0.02 },
  { country: 'Colombia', share: 0.02 },
  { country: 'United Kingdom', share: 0.04 },
  { country: 'Germany', share: 0.03 },
  { country: 'France', share: 0.03 },
  { country: 'Spain', share: 0.02 },
  { country: 'Italy', share: 0.02 },
  { country: 'Netherlands', share: 0.01 },
  { country: 'United States', share: 0.05 },
  { country: 'Canada', share: 0.02 },
  { country: 'United Arab Emirates', share: 0.03 },
  { country: 'Pakistan', share: 0.02 },
  { country: 'Singapore', share: 0.02 },
  { country: 'Australia', share: 0.02 },
  { country: 'Egypt', share: 0.02 },
  { country: 'Kenya', share: 0.01 },
  { country: 'Poland', share: 0.01 },
  { country: 'Romania', share: 0.01 },
];

// OKX: originally Chinese, now global. Strong Asia + Europe presence
const OKX: UserDistribution[] = [
  { country: 'China', share: 0.15 },
  { country: 'Hong Kong', share: 0.05 },
  { country: 'South Korea', share: 0.05 },
  { country: 'Vietnam', share: 0.04 },
  { country: 'Indonesia', share: 0.03 },
  { country: 'India', share: 0.05 },
  { country: 'Turkey', share: 0.06 },
  { country: 'Russia', share: 0.05 },
  { country: 'Ukraine', share: 0.03 },
  { country: 'Nigeria', share: 0.04 },
  { country: 'Brazil', share: 0.04 },
  { country: 'Argentina', share: 0.02 },
  { country: 'United Kingdom', share: 0.04 },
  { country: 'Germany', share: 0.03 },
  { country: 'France', share: 0.02 },
  { country: 'Spain', share: 0.02 },
  { country: 'United States', share: 0.05 },
  { country: 'Singapore', share: 0.03 },
  { country: 'Thailand', share: 0.03 },
  { country: 'Philippines', share: 0.02 },
  { country: 'United Arab Emirates', share: 0.03 },
  { country: 'Pakistan', share: 0.02 },
  { country: 'Japan', share: 0.03 },
  { country: 'Taiwan', share: 0.02 },
  { country: 'Malaysia', share: 0.02 },
  { country: 'Australia', share: 0.02 },
  { country: 'Canada', share: 0.01 },
];

// MEXC: Asian-focused, strong China/Vietnam/India presence
const MEXC: UserDistribution[] = [
  { country: 'China', share: 0.18 },
  { country: 'Vietnam', share: 0.08 },
  { country: 'India', share: 0.06 },
  { country: 'Indonesia', share: 0.05 },
  { country: 'South Korea', share: 0.05 },
  { country: 'Turkey', share: 0.05 },
  { country: 'Russia', share: 0.05 },
  { country: 'Thailand', share: 0.03 },
  { country: 'Philippines', share: 0.03 },
  { country: 'Brazil', share: 0.04 },
  { country: 'Nigeria', share: 0.04 },
  { country: 'Japan', share: 0.03 },
  { country: 'United Kingdom', share: 0.03 },
  { country: 'Germany', share: 0.02 },
  { country: 'United States', share: 0.04 },
  { country: 'Ukraine', share: 0.03 },
  { country: 'Argentina', share: 0.02 },
  { country: 'Taiwan', share: 0.03 },
  { country: 'Hong Kong', share: 0.03 },
  { country: 'Singapore', share: 0.02 },
  { country: 'Malaysia', share: 0.02 },
  { country: 'United Arab Emirates', share: 0.02 },
  { country: 'Pakistan', share: 0.02 },
  { country: 'Colombia', share: 0.01 },
  { country: 'Egypt', share: 0.02 },
];

// Bybit: originally Singapore, moved to BVI. Strong Asia + Europe
const BYBIT: UserDistribution[] = [
  { country: 'China', share: 0.10 },
  { country: 'South Korea', share: 0.06 },
  { country: 'Vietnam', share: 0.05 },
  { country: 'India', share: 0.06 },
  { country: 'Turkey', share: 0.06 },
  { country: 'Russia', share: 0.06 },
  { country: 'Indonesia', share: 0.04 },
  { country: 'Thailand', share: 0.03 },
  { country: 'Japan', share: 0.04 },
  { country: 'United Kingdom', share: 0.05 },
  { country: 'Germany', share: 0.04 },
  { country: 'France', share: 0.03 },
  { country: 'Spain', share: 0.02 },
  { country: 'Netherlands', share: 0.02 },
  { country: 'Brazil', share: 0.04 },
  { country: 'Nigeria', share: 0.03 },
  { country: 'United States', share: 0.04 },
  { country: 'Ukraine', share: 0.03 },
  { country: 'Singapore', share: 0.03 },
  { country: 'Philippines', share: 0.02 },
  { country: 'Argentina', share: 0.02 },
  { country: 'Taiwan', share: 0.02 },
  { country: 'Australia', share: 0.02 },
  { country: 'Canada', share: 0.02 },
  { country: 'United Arab Emirates', share: 0.03 },
  { country: 'Pakistan', share: 0.02 },
  { country: 'Hong Kong', share: 0.02 },
];

// KuCoin: global, Asian-heavy
const KUCOIN: UserDistribution[] = [
  { country: 'China', share: 0.12 },
  { country: 'Vietnam', share: 0.06 },
  { country: 'India', share: 0.06 },
  { country: 'Indonesia', share: 0.04 },
  { country: 'Turkey', share: 0.05 },
  { country: 'Russia', share: 0.04 },
  { country: 'Nigeria', share: 0.05 },
  { country: 'Brazil', share: 0.04 },
  { country: 'South Korea', share: 0.04 },
  { country: 'Japan', share: 0.03 },
  { country: 'Thailand', share: 0.03 },
  { country: 'Philippines', share: 0.03 },
  { country: 'United Kingdom', share: 0.04 },
  { country: 'Germany', share: 0.03 },
  { country: 'United States', share: 0.05 },
  { country: 'Ukraine', share: 0.03 },
  { country: 'Argentina', share: 0.02 },
  { country: 'Colombia', share: 0.02 },
  { country: 'Singapore', share: 0.02 },
  { country: 'Taiwan', share: 0.02 },
  { country: 'Hong Kong', share: 0.03 },
  { country: 'United Arab Emirates', share: 0.03 },
  { country: 'Pakistan', share: 0.02 },
  { country: 'Canada', share: 0.02 },
  { country: 'South Africa', share: 0.02 },
  { country: 'Malaysia', share: 0.02 },
  { country: 'Australia', share: 0.02 },
  { country: 'Egypt', share: 0.02 },
];

// Gate.io: Chinese roots, global
const GATE: UserDistribution[] = [
  { country: 'China', share: 0.20 },
  { country: 'Vietnam', share: 0.06 },
  { country: 'India', share: 0.05 },
  { country: 'South Korea', share: 0.04 },
  { country: 'Turkey', share: 0.05 },
  { country: 'Russia', share: 0.05 },
  { country: 'Indonesia', share: 0.04 },
  { country: 'Japan', share: 0.03 },
  { country: 'Thailand', share: 0.03 },
  { country: 'Nigeria', share: 0.04 },
  { country: 'Brazil', share: 0.03 },
  { country: 'United Kingdom', share: 0.03 },
  { country: 'Germany', share: 0.02 },
  { country: 'United States', share: 0.04 },
  { country: 'Ukraine', share: 0.03 },
  { country: 'Taiwan', share: 0.04 },
  { country: 'Hong Kong', share: 0.04 },
  { country: 'Singapore', share: 0.03 },
  { country: 'Philippines', share: 0.02 },
  { country: 'Malaysia', share: 0.02 },
  { country: 'Argentina', share: 0.02 },
  { country: 'United Arab Emirates', share: 0.02 },
  { country: 'Pakistan', share: 0.02 },
  { country: 'South Africa', share: 0.02 },
  { country: 'Colombia', share: 0.01 },
  { country: 'Egypt', share: 0.02 },
];

// Bitget: Singapore-based, Asian-focused
const BITGET: UserDistribution[] = [
  { country: 'China', share: 0.12 },
  { country: 'Vietnam', share: 0.06 },
  { country: 'India', share: 0.06 },
  { country: 'Turkey', share: 0.06 },
  { country: 'Indonesia', share: 0.05 },
  { country: 'South Korea', share: 0.05 },
  { country: 'Russia', share: 0.04 },
  { country: 'Japan', share: 0.04 },
  { country: 'Thailand', share: 0.03 },
  { country: 'Philippines', share: 0.03 },
  { country: 'Nigeria', share: 0.05 },
  { country: 'Brazil', share: 0.04 },
  { country: 'United Kingdom', share: 0.03 },
  { country: 'Germany', share: 0.02 },
  { country: 'United States', share: 0.04 },
  { country: 'Ukraine', share: 0.03 },
  { country: 'Argentina', share: 0.02 },
  { country: 'Taiwan', share: 0.03 },
  { country: 'Hong Kong', share: 0.03 },
  { country: 'Singapore', share: 0.03 },
  { country: 'Malaysia', share: 0.02 },
  { country: 'United Arab Emirates', share: 0.03 },
  { country: 'Pakistan', share: 0.02 },
  { country: 'Colombia', share: 0.02 },
  { country: 'Egypt', share: 0.02 },
  { country: 'South Africa', share: 0.02 },
  { country: 'Canada', share: 0.01 },
];

// Bitfinex: institutional, Western + Asia
const BITFINEX: UserDistribution[] = [
  { country: 'United States', share: 0.15 },
  { country: 'United Kingdom', share: 0.08 },
  { country: 'China', share: 0.08 },
  { country: 'Hong Kong', share: 0.06 },
  { country: 'Germany', share: 0.05 },
  { country: 'Singapore', share: 0.05 },
  { country: 'South Korea', share: 0.05 },
  { country: 'Japan', share: 0.05 },
  { country: 'Switzerland', share: 0.04 },
  { country: 'Turkey', share: 0.04 },
  { country: 'Russia', share: 0.04 },
  { country: 'France', share: 0.03 },
  { country: 'Netherlands', share: 0.03 },
  { country: 'Brazil', share: 0.03 },
  { country: 'Taiwan', share: 0.04 },
  { country: 'India', share: 0.03 },
  { country: 'Canada', share: 0.03 },
  { country: 'Australia', share: 0.03 },
  { country: 'Italy', share: 0.02 },
  { country: 'Spain', share: 0.02 },
  { country: 'United Arab Emirates', share: 0.02 },
  { country: 'Argentina', share: 0.02 },
  { country: 'Thailand', share: 0.01 },
];

// HTX (formerly Huobi): Chinese roots
const HUOBI: UserDistribution[] = [
  { country: 'China', share: 0.25 },
  { country: 'South Korea', share: 0.06 },
  { country: 'Japan', share: 0.04 },
  { country: 'Vietnam', share: 0.05 },
  { country: 'Russia', share: 0.05 },
  { country: 'Turkey', share: 0.05 },
  { country: 'India', share: 0.04 },
  { country: 'Indonesia', share: 0.03 },
  { country: 'Thailand', share: 0.03 },
  { country: 'Hong Kong', share: 0.05 },
  { country: 'Taiwan', share: 0.04 },
  { country: 'Singapore', share: 0.03 },
  { country: 'Nigeria', share: 0.03 },
  { country: 'Brazil', share: 0.03 },
  { country: 'United States', share: 0.03 },
  { country: 'United Kingdom', share: 0.03 },
  { country: 'Germany', share: 0.02 },
  { country: 'Ukraine', share: 0.02 },
  { country: 'Philippines', share: 0.02 },
  { country: 'Malaysia', share: 0.02 },
  { country: 'Argentina', share: 0.02 },
  { country: 'United Arab Emirates', share: 0.02 },
  { country: 'Pakistan', share: 0.02 },
  { country: 'South Africa', share: 0.02 },
];

// Map CoinGecko exchange IDs to their user distributions
// Only includes exchanges registered in tax havens that need redistribution
export const GLOBAL_EXCHANGE_REDISTRIBUTION: Record<string, UserDistribution[]> = {
  // Cayman Islands registered
  binance: BINANCE,
  gate: GATE,

  // Seychelles registered
  okx: OKX,
  huobi: HUOBI,
  htx: HUOBI,
  kucoin: KUCOIN,
  mexc: MEXC,
  bitget: BITGET,

  // BVI registered
  bybit: BYBIT,
  bitfinex: BITFINEX,
  bitfinex2: BITFINEX,
};

// Tax haven countries whose exchange volume should be redistributed
export const TAX_HAVEN_COUNTRIES = new Set([
  'Seychelles',
  'Cayman Islands',
  'British Virgin Islands',
  'Bermuda',
  'Gibraltar',
  'Curacao',
]);

// Default global distribution for unknown exchanges in tax havens
// Based on Chainalysis Global Crypto Adoption Index 2024
// Used when we don't have a specific user profile for the exchange
export const DEFAULT_GLOBAL_DISTRIBUTION: UserDistribution[] = [
  { country: 'India', share: 0.08 },
  { country: 'China', share: 0.07 },
  { country: 'Vietnam', share: 0.05 },
  { country: 'United States', share: 0.06 },
  { country: 'Nigeria', share: 0.05 },
  { country: 'Turkey', share: 0.05 },
  { country: 'Indonesia', share: 0.04 },
  { country: 'Brazil', share: 0.05 },
  { country: 'Russia', share: 0.04 },
  { country: 'United Kingdom', share: 0.04 },
  { country: 'South Korea', share: 0.04 },
  { country: 'Philippines', share: 0.03 },
  { country: 'Ukraine', share: 0.03 },
  { country: 'Thailand', share: 0.03 },
  { country: 'Pakistan', share: 0.03 },
  { country: 'Argentina', share: 0.03 },
  { country: 'Germany', share: 0.02 },
  { country: 'Japan', share: 0.03 },
  { country: 'Singapore', share: 0.02 },
  { country: 'United Arab Emirates', share: 0.02 },
  { country: 'Mexico', share: 0.02 },
  { country: 'Colombia', share: 0.02 },
  { country: 'South Africa', share: 0.02 },
  { country: 'Canada', share: 0.02 },
  { country: 'Australia', share: 0.02 },
  { country: 'Egypt', share: 0.02 },
  { country: 'Kenya', share: 0.01 },
  { country: 'France', share: 0.02 },
  { country: 'Hong Kong', share: 0.01 },
  { country: 'Taiwan', share: 0.01 },
  { country: 'Malaysia', share: 0.01 },
];
