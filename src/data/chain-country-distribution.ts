// Which countries/regions use which blockchains for stablecoin transfers.
// Based on: Chainalysis Geography of Crypto reports, Tron/Ethereum usage patterns,
// exchange default withdrawal chains, and P2P platform chain preferences.
//
// Each chain's distribution sums to 1.0 across all regions.
// Countries within a region split proportionally to their exchange volume.

export interface RegionShare {
  region: string;
  countries: string[];
  share: number;
}

// Tron: dominant in emerging markets, P2P trading, remittances
// Tron has lowest fees, most used for USDT transfers in developing economies
export const TRON_DISTRIBUTION: RegionShare[] = [
  {
    region: 'East & Southeast Asia',
    countries: ['China', 'Vietnam', 'Thailand', 'Philippines', 'Indonesia', 'Malaysia',
      'Cambodia', 'Myanmar', 'Laos', 'Singapore', 'Hong Kong', 'Taiwan', 'South Korea', 'Japan'],
    share: 0.35,
  },
  {
    region: 'South Asia & Middle East',
    countries: ['India', 'Pakistan', 'Bangladesh', 'Sri Lanka', 'Nepal', 'Turkey',
      'United Arab Emirates', 'Saudi Arabia', 'Iran', 'Iraq', 'Lebanon', 'Jordan'],
    share: 0.22,
  },
  {
    region: 'Africa',
    countries: ['Nigeria', 'South Africa', 'Kenya', 'Ghana', 'Egypt', 'Morocco',
      'Tanzania', 'Uganda', 'Senegal', 'Cameroon', 'Ethiopia'],
    share: 0.15,
  },
  {
    region: 'Eastern Europe & CIS',
    countries: ['Russia', 'Ukraine', 'Kazakhstan', 'Belarus', 'Georgia', 'Armenia',
      'Azerbaijan', 'Uzbekistan', 'Kyrgyzstan', 'Moldova'],
    share: 0.13,
  },
  {
    region: 'Latin America',
    countries: ['Brazil', 'Argentina', 'Mexico', 'Colombia', 'Venezuela', 'Peru',
      'Chile', 'Ecuador', 'Bolivia', 'Paraguay', 'Uruguay'],
    share: 0.08,
  },
  {
    region: 'Western Markets',
    countries: ['United States', 'United Kingdom', 'Germany', 'France', 'Canada',
      'Australia', 'Netherlands', 'Switzerland', 'Spain', 'Italy'],
    share: 0.04,
  },
  {
    region: 'Crypto Hubs',
    countries: ['Cayman Islands', 'British Virgin Islands', 'Seychelles', 'Bermuda',
      'Gibraltar', 'Curacao', 'Malta', 'Estonia', 'Lithuania'],
    share: 0.03,
  },
];

// Ethereum: DeFi, institutional, Western-heavy, higher fees = larger transactions
export const ETHEREUM_DISTRIBUTION: RegionShare[] = [
  {
    region: 'North America',
    countries: ['United States', 'Canada'],
    share: 0.30,
  },
  {
    region: 'Western Europe',
    countries: ['United Kingdom', 'Germany', 'France', 'Netherlands', 'Switzerland',
      'Spain', 'Italy', 'Ireland', 'Austria', 'Belgium', 'Luxembourg',
      'Sweden', 'Denmark', 'Norway', 'Finland', 'Portugal'],
    share: 0.22,
  },
  {
    region: 'East Asia',
    countries: ['China', 'South Korea', 'Japan', 'Hong Kong', 'Taiwan', 'Singapore'],
    share: 0.20,
  },
  {
    region: 'Crypto Hubs',
    countries: ['Cayman Islands', 'British Virgin Islands', 'Seychelles', 'Bermuda',
      'Gibraltar', 'Malta', 'Cyprus'],
    share: 0.12,
  },
  {
    region: 'Emerging Markets',
    countries: ['Turkey', 'Brazil', 'India', 'Nigeria', 'Argentina', 'Mexico',
      'South Africa', 'Thailand', 'Indonesia', 'Vietnam', 'Philippines', 'Ukraine', 'Russia'],
    share: 0.12,
  },
  {
    region: 'Other',
    countries: ['Australia', 'New Zealand', 'Israel', 'United Arab Emirates'],
    share: 0.04,
  },
];

// BSC (BNB Chain): Asian retail, Binance ecosystem
export const BSC_DISTRIBUTION: RegionShare[] = [
  {
    region: 'East & Southeast Asia',
    countries: ['China', 'Vietnam', 'Thailand', 'Philippines', 'Indonesia', 'Malaysia',
      'South Korea', 'Japan', 'Singapore', 'Hong Kong', 'Taiwan', 'Cambodia'],
    share: 0.45,
  },
  {
    region: 'South Asia & Middle East',
    countries: ['India', 'Pakistan', 'Bangladesh', 'Turkey', 'United Arab Emirates',
      'Saudi Arabia', 'Iran'],
    share: 0.18,
  },
  {
    region: 'Africa & EM',
    countries: ['Nigeria', 'South Africa', 'Kenya', 'Ghana', 'Egypt'],
    share: 0.12,
  },
  {
    region: 'Eastern Europe',
    countries: ['Russia', 'Ukraine', 'Kazakhstan', 'Belarus', 'Georgia'],
    share: 0.10,
  },
  {
    region: 'Latin America',
    countries: ['Brazil', 'Argentina', 'Mexico', 'Colombia', 'Venezuela'],
    share: 0.08,
  },
  {
    region: 'Western Markets',
    countries: ['United States', 'United Kingdom', 'Germany', 'France', 'Canada', 'Australia'],
    share: 0.05,
  },
  {
    region: 'Crypto Hubs',
    countries: ['Cayman Islands', 'British Virgin Islands', 'Seychelles'],
    share: 0.02,
  },
];

// Solana: growing everywhere, strong US presence (FTX legacy, Jupiter, Phantom)
export const SOLANA_DISTRIBUTION: RegionShare[] = [
  {
    region: 'North America',
    countries: ['United States', 'Canada'],
    share: 0.32,
  },
  {
    region: 'East & Southeast Asia',
    countries: ['South Korea', 'China', 'Vietnam', 'Thailand', 'Philippines',
      'Singapore', 'Hong Kong', 'Japan', 'Indonesia', 'Malaysia', 'Taiwan'],
    share: 0.25,
  },
  {
    region: 'Western Europe',
    countries: ['United Kingdom', 'Germany', 'France', 'Netherlands', 'Switzerland',
      'Spain', 'Italy', 'Portugal', 'Sweden'],
    share: 0.18,
  },
  {
    region: 'Emerging Markets',
    countries: ['Turkey', 'Brazil', 'India', 'Nigeria', 'Argentina', 'Mexico',
      'South Africa', 'Ukraine', 'Russia'],
    share: 0.15,
  },
  {
    region: 'Crypto Hubs',
    countries: ['Cayman Islands', 'British Virgin Islands', 'Seychelles'],
    share: 0.05,
  },
  {
    region: 'Other',
    countries: ['Australia', 'New Zealand', 'Israel', 'United Arab Emirates'],
    share: 0.05,
  },
];

// Base: Coinbase ecosystem, heavily US-centric
export const BASE_DISTRIBUTION: RegionShare[] = [
  {
    region: 'North America',
    countries: ['United States', 'Canada'],
    share: 0.45,
  },
  {
    region: 'Western Europe',
    countries: ['United Kingdom', 'Germany', 'France', 'Netherlands', 'Switzerland',
      'Spain', 'Italy', 'Ireland'],
    share: 0.25,
  },
  {
    region: 'East Asia',
    countries: ['South Korea', 'Japan', 'Singapore', 'Hong Kong', 'Australia'],
    share: 0.15,
  },
  {
    region: 'Emerging Markets',
    countries: ['Brazil', 'India', 'Nigeria', 'Turkey', 'Argentina', 'Mexico'],
    share: 0.10,
  },
  {
    region: 'Other',
    countries: ['Cayman Islands', 'British Virgin Islands', 'Seychelles',
      'United Arab Emirates', 'Israel'],
    share: 0.05,
  },
];

// Arbitrum: DeFi-heavy L2, similar to Ethereum but more retail
export const ARBITRUM_DISTRIBUTION: RegionShare[] = [
  {
    region: 'North America',
    countries: ['United States', 'Canada'],
    share: 0.28,
  },
  {
    region: 'Western Europe',
    countries: ['United Kingdom', 'Germany', 'France', 'Netherlands', 'Switzerland',
      'Spain', 'Italy', 'Portugal'],
    share: 0.22,
  },
  {
    region: 'East & Southeast Asia',
    countries: ['South Korea', 'China', 'Japan', 'Vietnam', 'Singapore',
      'Hong Kong', 'Taiwan', 'Thailand'],
    share: 0.22,
  },
  {
    region: 'Emerging Markets',
    countries: ['Turkey', 'Brazil', 'India', 'Argentina', 'Nigeria', 'Russia', 'Ukraine'],
    share: 0.15,
  },
  {
    region: 'Crypto Hubs',
    countries: ['Cayman Islands', 'British Virgin Islands', 'Seychelles', 'Malta'],
    share: 0.08,
  },
  {
    region: 'Other',
    countries: ['Australia', 'United Arab Emirates', 'Israel', 'Mexico', 'South Africa'],
    share: 0.05,
  },
];

export const CHAIN_DISTRIBUTIONS: Record<string, RegionShare[]> = {
  tron: TRON_DISTRIBUTION,
  ethereum: ETHEREUM_DISTRIBUTION,
  bsc: BSC_DISTRIBUTION,
  solana: SOLANA_DISTRIBUTION,
  base: BASE_DISTRIBUTION,
  arbitrum: ARBITRUM_DISTRIBUTION,
};
