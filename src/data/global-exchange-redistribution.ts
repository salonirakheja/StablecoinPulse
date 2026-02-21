// Global exchanges registered in tax havens have users worldwide.
// Instead of attributing all their volume to Seychelles/Cayman Islands/BVI,
// we redistribute based on known user demographics from:
// - Chainalysis 2024 Global Crypto Adoption Index (151 countries ranked)
// - Company reports & investor presentations
// - SimilarWeb/app store geographic data
// - Known regulatory actions (which reveal where users are)
//
// Country share weights are tiered by Chainalysis adoption rank:
//   Tier A (#1-20):  0.02-0.08  — core markets with confirmed high activity
//   Tier B (#21-30): 0.005-0.012 — high adoption, strong P2P or DeFi presence
//   Tier C (#31-45): 0.003-0.005 — moderate adoption, growing markets
//   Tier D (#46-70): 0.001-0.003 — lower but real crypto activity
//
// Each exchange distribution sums to 1.000.
// Exchanges NOT in this map have their volume attributed to their registered country.

export interface UserDistribution {
  country: string;
  share: number;
}

export interface GlobalExchangeProfile {
  name: string;
  distributions: UserDistribution[];
}

// Binance: world's largest exchange. Broadest global reach.
// ~35% Asia, ~20% Europe, ~15% LatAm, ~12% ME/Africa, ~10% NA, ~8% other
const BINANCE: UserDistribution[] = [
  // Tier A — Chainalysis top 20
  { country: 'India', share: 0.068 },
  { country: 'Nigeria', share: 0.036 },
  { country: 'Indonesia', share: 0.026 },
  { country: 'United States', share: 0.042 },
  { country: 'Vietnam', share: 0.036 },
  { country: 'Ukraine', share: 0.026 },
  { country: 'Russia', share: 0.042 },
  { country: 'Philippines', share: 0.019 },
  { country: 'Pakistan', share: 0.019 },
  { country: 'Brazil', share: 0.042 },
  { country: 'Turkey', share: 0.052 },
  { country: 'United Kingdom', share: 0.031 },
  { country: 'Venezuela', share: 0.010 },
  { country: 'Mexico', share: 0.019 },
  { country: 'Argentina', share: 0.026 },
  { country: 'Thailand', share: 0.026 },
  { country: 'Cambodia', share: 0.008 },
  { country: 'Canada', share: 0.019 },
  { country: 'South Korea', share: 0.026 },
  { country: 'China', share: 0.062 },
  // Tier B — Chainalysis ~21-30
  { country: 'Bangladesh', share: 0.008 },
  { country: 'Nepal', share: 0.006 },
  { country: 'Morocco', share: 0.005 },
  { country: 'Kazakhstan', share: 0.005 },
  { country: 'Ghana', share: 0.005 },
  { country: 'Saudi Arabia', share: 0.005 },
  // Tier C — Chainalysis ~31-45
  { country: 'Peru', share: 0.004 },
  { country: 'Chile', share: 0.004 },
  { country: 'Ecuador', share: 0.004 },
  { country: 'Sri Lanka', share: 0.004 },
  { country: 'Tanzania', share: 0.004 },
  { country: 'Ethiopia', share: 0.003 },
  { country: 'El Salvador', share: 0.003 },
  { country: 'Georgia', share: 0.003 },
  { country: 'Czech Republic', share: 0.003 },
  { country: 'Bolivia', share: 0.003 },
  // Existing Tier A continued
  { country: 'Japan', share: 0.019 },
  { country: 'South Africa', share: 0.019 },
  { country: 'Colombia', share: 0.019 },
  { country: 'United Arab Emirates', share: 0.026 },
  { country: 'Germany', share: 0.026 },
  { country: 'France', share: 0.021 },
  { country: 'Spain', share: 0.016 },
  { country: 'Italy', share: 0.016 },
  { country: 'Singapore', share: 0.019 },
  { country: 'Australia', share: 0.019 },
  { country: 'Egypt', share: 0.016 },
  { country: 'Kenya', share: 0.008 },
  { country: 'Poland', share: 0.008 },
  { country: 'Romania', share: 0.005 },
  { country: 'Netherlands', share: 0.008 },
  { country: 'Taiwan', share: 0.005 },
  { country: 'Hong Kong', share: 0.005 },
  { country: 'Malaysia', share: 0.005 },
  // Tier D — Chainalysis ~46-70
  { country: 'New Zealand', share: 0.003 },
  { country: 'Dominican Republic', share: 0.002 },
  { country: 'Qatar', share: 0.002 },
  { country: 'Bahrain', share: 0.002 },
  { country: 'Jordan', share: 0.002 },
  { country: 'Austria', share: 0.002 },
  { country: 'Portugal', share: 0.002 },
  { country: 'Ireland', share: 0.002 },
  { country: 'Sweden', share: 0.002 },
  { country: 'Serbia', share: 0.002 },
  { country: 'Bulgaria', share: 0.002 },
  { country: 'Croatia', share: 0.002 },
  { country: 'Hungary', share: 0.002 },
  { country: 'Uruguay', share: 0.002 },
  { country: 'Kuwait', share: 0.001 },
  { country: 'Costa Rica', share: 0.001 },
  { country: 'Guatemala', share: 0.001 },
  { country: 'Belarus', share: 0.002 },
  { country: 'Uganda', share: 0.001 },
  { country: 'Uzbekistan', share: 0.001 },
];

// OKX: originally Chinese, now global. Strong Asia + Europe presence
const OKX: UserDistribution[] = [
  // Tier A — Chainalysis top 20
  { country: 'China', share: 0.134 },
  { country: 'India', share: 0.043 },
  { country: 'Vietnam', share: 0.037 },
  { country: 'Turkey', share: 0.053 },
  { country: 'Russia', share: 0.043 },
  { country: 'United States', share: 0.043 },
  { country: 'United Kingdom', share: 0.037 },
  { country: 'Nigeria', share: 0.037 },
  { country: 'Brazil', share: 0.037 },
  { country: 'South Korea', share: 0.043 },
  { country: 'Indonesia', share: 0.027 },
  { country: 'Philippines', share: 0.019 },
  { country: 'Ukraine', share: 0.027 },
  { country: 'Venezuela', share: 0.009 },
  { country: 'Mexico', share: 0.011 },
  { country: 'Argentina', share: 0.019 },
  { country: 'Thailand', share: 0.027 },
  { country: 'Cambodia', share: 0.006 },
  { country: 'Pakistan', share: 0.019 },
  { country: 'Hong Kong', share: 0.043 },
  // Tier B
  { country: 'Bangladesh', share: 0.006 },
  { country: 'Nepal', share: 0.004 },
  { country: 'Morocco', share: 0.004 },
  { country: 'Kazakhstan', share: 0.004 },
  { country: 'Ghana', share: 0.003 },
  { country: 'Saudi Arabia', share: 0.003 },
  // Tier C
  { country: 'Peru', share: 0.003 },
  { country: 'Chile', share: 0.003 },
  { country: 'Ecuador', share: 0.003 },
  { country: 'Sri Lanka', share: 0.003 },
  { country: 'Ethiopia', share: 0.002 },
  { country: 'Tanzania', share: 0.002 },
  { country: 'Georgia', share: 0.002 },
  // Existing continued
  { country: 'Germany', share: 0.027 },
  { country: 'France', share: 0.019 },
  { country: 'Spain', share: 0.016 },
  { country: 'Singapore', share: 0.027 },
  { country: 'Japan', share: 0.027 },
  { country: 'Taiwan', share: 0.019 },
  { country: 'Malaysia', share: 0.016 },
  { country: 'Australia', share: 0.016 },
  { country: 'Canada', share: 0.011 },
  { country: 'United Arab Emirates', share: 0.027 },
  { country: 'South Africa', share: 0.011 },
  { country: 'Egypt', share: 0.011 },
  { country: 'Colombia', share: 0.009 },
  // Tier D
  { country: 'Czech Republic', share: 0.002 },
  { country: 'Bolivia', share: 0.002 },
  { country: 'Bahrain', share: 0.001 },
  { country: 'Qatar', share: 0.001 },
  { country: 'New Zealand', share: 0.002 },
];

// MEXC: Asian-focused, strong China/Vietnam/India presence
const MEXC: UserDistribution[] = [
  // Tier A
  { country: 'China', share: 0.164 },
  { country: 'Vietnam', share: 0.077 },
  { country: 'India', share: 0.055 },
  { country: 'Indonesia', share: 0.044 },
  { country: 'South Korea', share: 0.044 },
  { country: 'Turkey', share: 0.044 },
  { country: 'Russia', share: 0.044 },
  { country: 'Thailand', share: 0.027 },
  { country: 'Philippines', share: 0.027 },
  { country: 'Brazil', share: 0.038 },
  { country: 'Nigeria', share: 0.038 },
  { country: 'United States', share: 0.038 },
  { country: 'United Kingdom', share: 0.027 },
  { country: 'Ukraine', share: 0.027 },
  { country: 'Venezuela', share: 0.009 },
  { country: 'Argentina', share: 0.020 },
  { country: 'Cambodia', share: 0.007 },
  { country: 'Pakistan', share: 0.020 },
  // Tier B
  { country: 'Bangladesh', share: 0.005 },
  { country: 'Nepal', share: 0.004 },
  { country: 'Morocco', share: 0.003 },
  { country: 'Kazakhstan', share: 0.003 },
  { country: 'Ghana', share: 0.003 },
  { country: 'Saudi Arabia', share: 0.003 },
  // Tier C
  { country: 'Peru', share: 0.003 },
  { country: 'Chile', share: 0.003 },
  { country: 'Sri Lanka', share: 0.003 },
  { country: 'Ecuador', share: 0.002 },
  { country: 'Tanzania', share: 0.002 },
  { country: 'Bolivia', share: 0.002 },
  // Existing continued
  { country: 'Japan', share: 0.027 },
  { country: 'Germany', share: 0.020 },
  { country: 'Taiwan', share: 0.027 },
  { country: 'Hong Kong', share: 0.027 },
  { country: 'Singapore', share: 0.020 },
  { country: 'Malaysia', share: 0.016 },
  { country: 'United Arab Emirates', share: 0.020 },
  { country: 'Colombia', share: 0.011 },
  { country: 'Egypt', share: 0.016 },
  { country: 'South Africa', share: 0.011 },
  { country: 'Mexico', share: 0.009 },
  // Tier D
  { country: 'Georgia', share: 0.002 },
  { country: 'Ethiopia', share: 0.002 },
  { country: 'Czech Republic', share: 0.006 },
];

// Bybit: originally Singapore, moved to BVI. Strong Asia + Europe
const BYBIT: UserDistribution[] = [
  // Tier A
  { country: 'China', share: 0.091 },
  { country: 'India', share: 0.054 },
  { country: 'South Korea', share: 0.054 },
  { country: 'Vietnam', share: 0.043 },
  { country: 'Turkey', share: 0.054 },
  { country: 'Russia', share: 0.054 },
  { country: 'Indonesia', share: 0.032 },
  { country: 'Thailand', share: 0.027 },
  { country: 'Philippines', share: 0.019 },
  { country: 'United Kingdom', share: 0.043 },
  { country: 'Brazil', share: 0.038 },
  { country: 'Nigeria', share: 0.027 },
  { country: 'United States', share: 0.038 },
  { country: 'Ukraine', share: 0.027 },
  { country: 'Venezuela', share: 0.009 },
  { country: 'Argentina', share: 0.019 },
  { country: 'Cambodia', share: 0.006 },
  { country: 'Pakistan', share: 0.019 },
  // Tier B
  { country: 'Bangladesh', share: 0.006 },
  { country: 'Nepal', share: 0.004 },
  { country: 'Morocco', share: 0.004 },
  { country: 'Kazakhstan', share: 0.004 },
  { country: 'Ghana', share: 0.003 },
  { country: 'Saudi Arabia', share: 0.003 },
  // Tier C
  { country: 'Peru', share: 0.003 },
  { country: 'Chile', share: 0.003 },
  { country: 'Ecuador', share: 0.003 },
  { country: 'Sri Lanka', share: 0.003 },
  { country: 'Tanzania', share: 0.002 },
  { country: 'Ethiopia', share: 0.002 },
  { country: 'Georgia', share: 0.002 },
  { country: 'Czech Republic', share: 0.002 },
  { country: 'Bolivia', share: 0.002 },
  // Existing continued
  { country: 'Japan', share: 0.032 },
  { country: 'Germany', share: 0.032 },
  { country: 'France', share: 0.027 },
  { country: 'Spain', share: 0.019 },
  { country: 'Netherlands', share: 0.016 },
  { country: 'Singapore', share: 0.027 },
  { country: 'Taiwan', share: 0.016 },
  { country: 'Australia', share: 0.019 },
  { country: 'Canada', share: 0.019 },
  { country: 'United Arab Emirates', share: 0.027 },
  { country: 'Hong Kong', share: 0.016 },
  { country: 'Mexico', share: 0.011 },
  { country: 'Colombia', share: 0.009 },
  { country: 'South Africa', share: 0.011 },
  { country: 'Egypt', share: 0.009 },
  // Tier D
  { country: 'New Zealand', share: 0.002 },
  { country: 'Portugal', share: 0.002 },
  { country: 'Austria', share: 0.002 },
  { country: 'Qatar', share: 0.001 },
  { country: 'Bahrain', share: 0.003 },
];

// KuCoin: global, Asian-heavy
const KUCOIN: UserDistribution[] = [
  // Tier A
  { country: 'China', share: 0.111 },
  { country: 'Vietnam', share: 0.055 },
  { country: 'India', share: 0.055 },
  { country: 'Indonesia', share: 0.033 },
  { country: 'Turkey', share: 0.044 },
  { country: 'Russia', share: 0.039 },
  { country: 'Nigeria', share: 0.044 },
  { country: 'Brazil', share: 0.039 },
  { country: 'South Korea', share: 0.039 },
  { country: 'United States', share: 0.044 },
  { country: 'United Kingdom', share: 0.033 },
  { country: 'Philippines', share: 0.028 },
  { country: 'Ukraine', share: 0.028 },
  { country: 'Venezuela', share: 0.009 },
  { country: 'Thailand', share: 0.028 },
  { country: 'Cambodia', share: 0.007 },
  { country: 'Argentina', share: 0.020 },
  { country: 'Pakistan', share: 0.020 },
  // Tier B
  { country: 'Bangladesh', share: 0.006 },
  { country: 'Nepal', share: 0.004 },
  { country: 'Morocco', share: 0.003 },
  { country: 'Kazakhstan', share: 0.003 },
  { country: 'Ghana', share: 0.003 },
  { country: 'Saudi Arabia', share: 0.003 },
  // Tier C
  { country: 'Peru', share: 0.003 },
  { country: 'Chile', share: 0.003 },
  { country: 'Ecuador', share: 0.003 },
  { country: 'Sri Lanka', share: 0.003 },
  { country: 'Tanzania', share: 0.002 },
  { country: 'Ethiopia', share: 0.002 },
  { country: 'Georgia', share: 0.002 },
  { country: 'Bolivia', share: 0.002 },
  // Existing continued
  { country: 'Japan', share: 0.028 },
  { country: 'Germany', share: 0.028 },
  { country: 'Colombia', share: 0.017 },
  { country: 'Singapore', share: 0.020 },
  { country: 'Taiwan', share: 0.020 },
  { country: 'Hong Kong', share: 0.028 },
  { country: 'United Arab Emirates', share: 0.028 },
  { country: 'Canada', share: 0.020 },
  { country: 'South Africa', share: 0.020 },
  { country: 'Malaysia', share: 0.017 },
  { country: 'Australia', share: 0.020 },
  { country: 'Egypt', share: 0.017 },
  { country: 'Mexico', share: 0.011 },
  // Tier D
  { country: 'Czech Republic', share: 0.002 },
  { country: 'New Zealand', share: 0.002 },
  { country: 'Bahrain', share: 0.001 },
  { country: 'Qatar', share: 0.003 },
];

// Gate.io: Chinese roots, global
const GATE: UserDistribution[] = [
  // Tier A
  { country: 'China', share: 0.189 },
  { country: 'Vietnam', share: 0.056 },
  { country: 'India', share: 0.044 },
  { country: 'South Korea', share: 0.039 },
  { country: 'Turkey', share: 0.044 },
  { country: 'Russia', share: 0.044 },
  { country: 'Indonesia', share: 0.033 },
  { country: 'United States', share: 0.039 },
  { country: 'Nigeria', share: 0.039 },
  { country: 'Brazil', share: 0.028 },
  { country: 'United Kingdom', share: 0.028 },
  { country: 'Ukraine', share: 0.028 },
  { country: 'Venezuela', share: 0.009 },
  { country: 'Philippines', share: 0.020 },
  { country: 'Thailand', share: 0.028 },
  { country: 'Cambodia', share: 0.006 },
  { country: 'Argentina', share: 0.017 },
  { country: 'Pakistan', share: 0.017 },
  // Tier B
  { country: 'Bangladesh', share: 0.006 },
  { country: 'Nepal', share: 0.004 },
  { country: 'Morocco', share: 0.003 },
  { country: 'Kazakhstan', share: 0.003 },
  { country: 'Ghana', share: 0.003 },
  { country: 'Saudi Arabia', share: 0.003 },
  // Tier C
  { country: 'Peru', share: 0.003 },
  { country: 'Chile', share: 0.003 },
  { country: 'Sri Lanka', share: 0.003 },
  { country: 'Ecuador', share: 0.002 },
  { country: 'Tanzania', share: 0.002 },
  { country: 'Ethiopia', share: 0.002 },
  { country: 'Bolivia', share: 0.002 },
  { country: 'Georgia', share: 0.002 },
  // Existing continued
  { country: 'Japan', share: 0.028 },
  { country: 'Taiwan', share: 0.039 },
  { country: 'Hong Kong', share: 0.039 },
  { country: 'Singapore', share: 0.028 },
  { country: 'Germany', share: 0.020 },
  { country: 'Malaysia', share: 0.017 },
  { country: 'United Arab Emirates', share: 0.020 },
  { country: 'South Africa', share: 0.017 },
  { country: 'Colombia', share: 0.011 },
  { country: 'Egypt', share: 0.017 },
  { country: 'Mexico', share: 0.009 },
  // Tier D
  { country: 'Czech Republic', share: 0.002 },
  { country: 'El Salvador', share: 0.001 },
  { country: 'Qatar', share: 0.003 },
];

// Bitget: Singapore-based, Asian-focused
const BITGET: UserDistribution[] = [
  // Tier A
  { country: 'China', share: 0.111 },
  { country: 'Vietnam', share: 0.056 },
  { country: 'India', share: 0.056 },
  { country: 'Turkey', share: 0.056 },
  { country: 'Indonesia', share: 0.045 },
  { country: 'South Korea', share: 0.045 },
  { country: 'Russia', share: 0.039 },
  { country: 'Nigeria', share: 0.045 },
  { country: 'Brazil', share: 0.039 },
  { country: 'United States', share: 0.039 },
  { country: 'United Kingdom', share: 0.028 },
  { country: 'Ukraine', share: 0.028 },
  { country: 'Philippines', share: 0.028 },
  { country: 'Venezuela', share: 0.009 },
  { country: 'Argentina', share: 0.020 },
  { country: 'Thailand', share: 0.028 },
  { country: 'Cambodia', share: 0.006 },
  { country: 'Pakistan', share: 0.020 },
  // Tier B
  { country: 'Bangladesh', share: 0.006 },
  { country: 'Nepal', share: 0.004 },
  { country: 'Morocco', share: 0.003 },
  { country: 'Kazakhstan', share: 0.003 },
  { country: 'Ghana', share: 0.003 },
  { country: 'Saudi Arabia', share: 0.003 },
  // Tier C
  { country: 'Peru', share: 0.003 },
  { country: 'Chile', share: 0.003 },
  { country: 'Sri Lanka', share: 0.003 },
  { country: 'Ecuador', share: 0.002 },
  { country: 'Tanzania', share: 0.002 },
  { country: 'Ethiopia', share: 0.002 },
  { country: 'Bolivia', share: 0.002 },
  { country: 'Georgia', share: 0.002 },
  // Existing continued
  { country: 'Japan', share: 0.033 },
  { country: 'Germany', share: 0.020 },
  { country: 'Taiwan', share: 0.028 },
  { country: 'Hong Kong', share: 0.028 },
  { country: 'Singapore', share: 0.028 },
  { country: 'Malaysia', share: 0.020 },
  { country: 'United Arab Emirates', share: 0.028 },
  { country: 'Colombia', share: 0.017 },
  { country: 'Egypt', share: 0.017 },
  { country: 'South Africa', share: 0.017 },
  { country: 'Canada', share: 0.011 },
  { country: 'Mexico', share: 0.009 },
  // Tier D
  { country: 'Czech Republic', share: 0.002 },
  { country: 'El Salvador', share: 0.001 },
  { country: 'New Zealand', share: 0.002 },
];

// Bitfinex: institutional, Western + Asia
const BITFINEX: UserDistribution[] = [
  // Tier A — skewed institutional/Western
  { country: 'United States', share: 0.132 },
  { country: 'United Kingdom', share: 0.072 },
  { country: 'China', share: 0.072 },
  { country: 'Hong Kong', share: 0.055 },
  { country: 'Germany', share: 0.044 },
  { country: 'Singapore', share: 0.044 },
  { country: 'South Korea', share: 0.044 },
  { country: 'Japan', share: 0.044 },
  { country: 'Switzerland', share: 0.039 },
  { country: 'Turkey', share: 0.039 },
  { country: 'Russia', share: 0.039 },
  { country: 'France', share: 0.028 },
  { country: 'Netherlands', share: 0.028 },
  { country: 'Brazil', share: 0.028 },
  { country: 'Taiwan', share: 0.033 },
  { country: 'India', share: 0.028 },
  { country: 'Canada', share: 0.028 },
  { country: 'Australia', share: 0.028 },
  { country: 'Italy', share: 0.020 },
  { country: 'Spain', share: 0.020 },
  { country: 'United Arab Emirates', share: 0.020 },
  { country: 'Argentina', share: 0.017 },
  { country: 'Thailand', share: 0.011 },
  { country: 'Venezuela', share: 0.006 },
  { country: 'Ukraine', share: 0.011 },
  { country: 'Nigeria', share: 0.009 },
  // Tier B/C — institutional markets
  { country: 'Saudi Arabia', share: 0.004 },
  { country: 'South Africa', share: 0.006 },
  { country: 'Mexico', share: 0.006 },
  // Tier D — Western/institutional footprint
  { country: 'Portugal', share: 0.004 },
  { country: 'Austria', share: 0.003 },
  { country: 'Ireland', share: 0.003 },
  { country: 'Sweden', share: 0.003 },
  { country: 'Norway', share: 0.003 },
  { country: 'Denmark', share: 0.002 },
  { country: 'Finland', share: 0.002 },
  { country: 'Greece', share: 0.002 },
  { country: 'New Zealand', share: 0.003 },
  { country: 'Czech Republic', share: 0.003 },
  { country: 'Poland', share: 0.003 },
  { country: 'Israel', share: 0.003 },
  { country: 'Qatar', share: 0.002 },
  { country: 'Bahrain', share: 0.002 },
  { country: 'Chile', share: 0.003 },
  { country: 'Peru', share: 0.002 },
  { country: 'Colombia', share: 0.002 },
];

// HTX (formerly Huobi): Chinese roots
const HUOBI: UserDistribution[] = [
  // Tier A
  { country: 'China', share: 0.235 },
  { country: 'South Korea', share: 0.055 },
  { country: 'Japan', share: 0.038 },
  { country: 'Vietnam', share: 0.044 },
  { country: 'Russia', share: 0.044 },
  { country: 'Turkey', share: 0.044 },
  { country: 'India', share: 0.038 },
  { country: 'Indonesia', share: 0.027 },
  { country: 'Thailand', share: 0.027 },
  { country: 'Hong Kong', share: 0.044 },
  { country: 'Taiwan', share: 0.038 },
  { country: 'Singapore', share: 0.027 },
  { country: 'Nigeria', share: 0.027 },
  { country: 'Brazil', share: 0.027 },
  { country: 'United States', share: 0.027 },
  { country: 'United Kingdom', share: 0.027 },
  { country: 'Ukraine', share: 0.020 },
  { country: 'Philippines', share: 0.020 },
  { country: 'Venezuela', share: 0.007 },
  { country: 'Argentina', share: 0.016 },
  { country: 'Cambodia', share: 0.005 },
  { country: 'Pakistan', share: 0.016 },
  // Tier B
  { country: 'Bangladesh', share: 0.004 },
  { country: 'Nepal', share: 0.003 },
  { country: 'Kazakhstan', share: 0.003 },
  { country: 'Morocco', share: 0.003 },
  { country: 'Ghana', share: 0.003 },
  { country: 'Saudi Arabia', share: 0.003 },
  // Tier C
  { country: 'Peru', share: 0.002 },
  { country: 'Chile', share: 0.002 },
  { country: 'Sri Lanka', share: 0.002 },
  { country: 'Ecuador', share: 0.002 },
  { country: 'Tanzania', share: 0.002 },
  { country: 'Bolivia', share: 0.002 },
  // Existing continued
  { country: 'Germany', share: 0.020 },
  { country: 'Malaysia', share: 0.020 },
  { country: 'United Arab Emirates', share: 0.020 },
  { country: 'South Africa', share: 0.016 },
  { country: 'Egypt', share: 0.011 },
  { country: 'Colombia', share: 0.009 },
  { country: 'Mexico', share: 0.009 },
  // Tier D
  { country: 'Georgia', share: 0.002 },
  { country: 'Ethiopia', share: 0.002 },
  { country: 'Czech Republic', share: 0.007 },
];

// Coinbase: US-based, publicly traded (COIN). Available in 100+ countries.
// Sources: Coinbase 10-K filings, SimilarWeb traffic data, app store rankings
// ~65% US, ~20% EU/UK, ~15% rest of world
const COINBASE: UserDistribution[] = [
  { country: 'United States', share: 0.640 },
  { country: 'United Kingdom', share: 0.075 },
  { country: 'Germany', share: 0.055 },
  { country: 'France', share: 0.025 },
  { country: 'Spain', share: 0.015 },
  { country: 'Italy', share: 0.015 },
  { country: 'Netherlands', share: 0.015 },
  { country: 'Ireland', share: 0.010 },
  { country: 'Canada', share: 0.035 },
  { country: 'Australia', share: 0.025 },
  { country: 'Japan', share: 0.015 },
  { country: 'Singapore', share: 0.015 },
  { country: 'India', share: 0.020 },
  { country: 'Brazil', share: 0.015 },
  { country: 'South Korea', share: 0.010 },
  { country: 'Turkey', share: 0.005 },
  { country: 'Switzerland', share: 0.005 },
  { country: 'Poland', share: 0.005 },
];

// Kraken: US-headquartered, very strong European presence (especially DACH region).
// Sources: Kraken regional availability pages, SimilarWeb traffic
// ~45% US, ~35% EU/UK, ~20% rest
const KRAKEN: UserDistribution[] = [
  { country: 'United States', share: 0.440 },
  { country: 'Germany', share: 0.085 },
  { country: 'United Kingdom', share: 0.065 },
  { country: 'Canada', share: 0.055 },
  { country: 'France', share: 0.035 },
  { country: 'Netherlands', share: 0.030 },
  { country: 'Spain', share: 0.025 },
  { country: 'Italy', share: 0.020 },
  { country: 'Australia', share: 0.040 },
  { country: 'Japan', share: 0.040 },
  { country: 'Switzerland', share: 0.025 },
  { country: 'Austria', share: 0.020 },
  { country: 'Singapore', share: 0.015 },
  { country: 'South Korea', share: 0.015 },
  { country: 'India', share: 0.015 },
  { country: 'Brazil', share: 0.010 },
  { country: 'Ireland', share: 0.010 },
  { country: 'Portugal', share: 0.010 },
  { country: 'Sweden', share: 0.010 },
  { country: 'Poland', share: 0.010 },
  { country: 'Turkey', share: 0.010 },
  { country: 'Belgium', share: 0.005 },
  { country: 'Norway', share: 0.005 },
  { country: 'Finland', share: 0.005 },
];

// Crypto.com: Singapore HQ, global brand. Massive US marketing (Crypto.com Arena, F1).
// Sources: SimilarWeb traffic, app store rankings, sponsorship market focus
// ~25% Singapore/Asia, ~30% US, ~25% EU/UK, ~20% rest
const CRYPTO_COM: UserDistribution[] = [
  { country: 'United States', share: 0.290 },
  { country: 'Singapore', share: 0.110 },
  { country: 'United Kingdom', share: 0.085 },
  { country: 'Australia', share: 0.070 },
  { country: 'France', share: 0.055 },
  { country: 'Canada', share: 0.050 },
  { country: 'Germany', share: 0.045 },
  { country: 'Brazil', share: 0.040 },
  { country: 'South Korea', share: 0.035 },
  { country: 'India', share: 0.035 },
  { country: 'Italy', share: 0.025 },
  { country: 'Turkey', share: 0.025 },
  { country: 'Spain', share: 0.020 },
  { country: 'Netherlands', share: 0.015 },
  { country: 'Thailand', share: 0.015 },
  { country: 'Philippines', share: 0.015 },
  { country: 'Indonesia', share: 0.015 },
  { country: 'Japan', share: 0.015 },
  { country: 'Hong Kong', share: 0.010 },
  { country: 'Switzerland', share: 0.010 },
  { country: 'Vietnam', share: 0.010 },
  { country: 'Malaysia', share: 0.005 },
  { country: 'Nigeria', share: 0.005 },
];

// Bitstamp: registered in Luxembourg for EU licensing. Oldest EU exchange.
// Users are primarily UK/EU/US, not Luxembourg.
// Sources: company history, SimilarWeb traffic data
// ~35% UK, ~35% EU, ~20% US, ~10% rest
const BITSTAMP: UserDistribution[] = [
  { country: 'United Kingdom', share: 0.200 },
  { country: 'United States', share: 0.195 },
  { country: 'Germany', share: 0.100 },
  { country: 'France', share: 0.060 },
  { country: 'Netherlands', share: 0.055 },
  { country: 'Spain', share: 0.035 },
  { country: 'Italy', share: 0.035 },
  { country: 'Switzerland', share: 0.035 },
  { country: 'Canada', share: 0.035 },
  { country: 'Australia', share: 0.030 },
  { country: 'Sweden', share: 0.020 },
  { country: 'Austria', share: 0.020 },
  { country: 'Ireland', share: 0.020 },
  { country: 'Belgium', share: 0.015 },
  { country: 'Portugal', share: 0.015 },
  { country: 'Poland', share: 0.015 },
  { country: 'Singapore', share: 0.015 },
  { country: 'Japan', share: 0.015 },
  { country: 'South Korea', share: 0.010 },
  { country: 'Norway', share: 0.010 },
  { country: 'Denmark', share: 0.010 },
  { country: 'Luxembourg', share: 0.010 },
  { country: 'Finland', share: 0.005 },
  { country: 'India', share: 0.010 },
  { country: 'Brazil', share: 0.010 },
  { country: 'Turkey', share: 0.005 },
  { country: 'Hong Kong', share: 0.005 },
  { country: 'Czech Republic', share: 0.005 },
  { country: 'Greece', share: 0.005 },
];

// Map CoinGecko exchange IDs to their user distributions
// Includes both tax-haven exchanges and global exchanges with multinational user bases
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

  // Global exchanges with multinational user bases
  coinbase: COINBASE,
  coinbase_exchange: COINBASE,
  kraken: KRAKEN,
  crypto_com: CRYPTO_COM,
  bitstamp: BITSTAMP,
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
  // Tier A — Chainalysis top 20
  { country: 'India', share: 0.072 },
  { country: 'Nigeria', share: 0.045 },
  { country: 'Indonesia', share: 0.039 },
  { country: 'United States', share: 0.056 },
  { country: 'Vietnam', share: 0.050 },
  { country: 'Ukraine', share: 0.028 },
  { country: 'Russia', share: 0.039 },
  { country: 'Philippines', share: 0.028 },
  { country: 'Pakistan', share: 0.028 },
  { country: 'Brazil', share: 0.045 },
  { country: 'Turkey', share: 0.045 },
  { country: 'United Kingdom', share: 0.033 },
  { country: 'Venezuela', share: 0.011 },
  { country: 'Mexico', share: 0.020 },
  { country: 'Argentina', share: 0.028 },
  { country: 'Thailand', share: 0.028 },
  { country: 'Cambodia', share: 0.009 },
  { country: 'Canada', share: 0.020 },
  { country: 'South Korea', share: 0.033 },
  { country: 'China', share: 0.056 },
  // Tier B — Chainalysis ~21-30
  { country: 'Bangladesh', share: 0.009 },
  { country: 'Nepal', share: 0.006 },
  { country: 'Morocco', share: 0.006 },
  { country: 'Kazakhstan', share: 0.004 },
  { country: 'Ghana', share: 0.004 },
  { country: 'Saudi Arabia', share: 0.004 },
  // Tier C — Chainalysis ~31-45
  { country: 'Peru', share: 0.003 },
  { country: 'Chile', share: 0.003 },
  { country: 'Ecuador', share: 0.003 },
  { country: 'Sri Lanka', share: 0.003 },
  { country: 'Tanzania', share: 0.003 },
  { country: 'Ethiopia', share: 0.003 },
  { country: 'El Salvador', share: 0.003 },
  { country: 'Georgia', share: 0.002 },
  { country: 'Czech Republic', share: 0.002 },
  { country: 'Bolivia', share: 0.002 },
  // Existing core markets
  { country: 'Germany', share: 0.020 },
  { country: 'Japan', share: 0.028 },
  { country: 'Singapore', share: 0.020 },
  { country: 'United Arab Emirates', share: 0.020 },
  { country: 'Colombia', share: 0.017 },
  { country: 'South Africa', share: 0.020 },
  { country: 'Australia', share: 0.017 },
  { country: 'Egypt', share: 0.017 },
  { country: 'Kenya', share: 0.009 },
  { country: 'France', share: 0.017 },
  { country: 'Hong Kong', share: 0.011 },
  { country: 'Taiwan', share: 0.009 },
  { country: 'Malaysia', share: 0.009 },
  // Tier D
  { country: 'Bahrain', share: 0.002 },
  { country: 'Qatar', share: 0.002 },
  { country: 'New Zealand', share: 0.002 },
  { country: 'Portugal', share: 0.002 },
  { country: 'Ireland', share: 0.001 },
  { country: 'Sweden', share: 0.001 },
  { country: 'Austria', share: 0.001 },
  { country: 'Uganda', share: 0.001 },
  { country: 'Uzbekistan', share: 0.001 },
];
