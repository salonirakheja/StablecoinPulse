// Per-country stablecoin share estimates based on:
// - Chainalysis Geography of Crypto reports
// - On-chain transfer data patterns
// - Regional exchange pair availability
// - Known regulatory/market dynamics
//
// Format: { usdt, usdc, dai } as fraction of total spot volume
// "all" = usdt + usdc + dai + other stablecoins ≈ total stablecoin share

interface StablecoinShares {
  usdt: number;
  usdc: number;
  dai: number;
  all: number;
}

// Regional defaults (used when no country-specific data exists)
const REGION_DEFAULTS: Record<string, StablecoinShares> = {
  // USDT-dominant regions
  EAST_ASIA:        { usdt: 0.80, usdc: 0.10, dai: 0.02, all: 0.92 },
  SOUTHEAST_ASIA:   { usdt: 0.85, usdc: 0.07, dai: 0.01, all: 0.93 },
  SOUTH_ASIA:       { usdt: 0.82, usdc: 0.08, dai: 0.01, all: 0.91 },
  MIDDLE_EAST:      { usdt: 0.83, usdc: 0.08, dai: 0.01, all: 0.92 },
  EASTERN_EUROPE:   { usdt: 0.78, usdc: 0.10, dai: 0.02, all: 0.90 },
  AFRICA:           { usdt: 0.80, usdc: 0.10, dai: 0.01, all: 0.91 },
  LATIN_AMERICA:    { usdt: 0.70, usdc: 0.18, dai: 0.03, all: 0.91 },
  // USDC-stronger regions
  NORTH_AMERICA:    { usdt: 0.40, usdc: 0.38, dai: 0.05, all: 0.83 },
  WESTERN_EUROPE:   { usdt: 0.50, usdc: 0.30, dai: 0.05, all: 0.85 },
  OCEANIA:          { usdt: 0.50, usdc: 0.30, dai: 0.04, all: 0.84 },
  // Offshore/crypto hubs
  CRYPTO_HUB:       { usdt: 0.75, usdc: 0.15, dai: 0.02, all: 0.92 },
};

// Country → region mapping
const COUNTRY_REGION: Record<string, string> = {
  // East Asia
  'China': 'EAST_ASIA', 'Japan': 'EAST_ASIA', 'South Korea': 'EAST_ASIA',
  'Hong Kong': 'EAST_ASIA', 'Taiwan': 'EAST_ASIA', 'Macau': 'EAST_ASIA',
  'Mongolia': 'EAST_ASIA',

  // Southeast Asia
  'Singapore': 'SOUTHEAST_ASIA', 'Thailand': 'SOUTHEAST_ASIA',
  'Vietnam': 'SOUTHEAST_ASIA', 'Philippines': 'SOUTHEAST_ASIA',
  'Indonesia': 'SOUTHEAST_ASIA', 'Malaysia': 'SOUTHEAST_ASIA',
  'Cambodia': 'SOUTHEAST_ASIA', 'Myanmar': 'SOUTHEAST_ASIA',
  'Laos': 'SOUTHEAST_ASIA', 'Brunei': 'SOUTHEAST_ASIA',

  // South Asia
  'India': 'SOUTH_ASIA', 'Pakistan': 'SOUTH_ASIA', 'Bangladesh': 'SOUTH_ASIA',
  'Sri Lanka': 'SOUTH_ASIA', 'Nepal': 'SOUTH_ASIA',

  // Middle East
  'Turkey': 'MIDDLE_EAST', 'United Arab Emirates': 'MIDDLE_EAST',
  'Saudi Arabia': 'MIDDLE_EAST', 'Bahrain': 'MIDDLE_EAST',
  'Kuwait': 'MIDDLE_EAST', 'Qatar': 'MIDDLE_EAST', 'Oman': 'MIDDLE_EAST',
  'Jordan': 'MIDDLE_EAST', 'Lebanon': 'MIDDLE_EAST', 'Israel': 'MIDDLE_EAST',
  'Iran': 'MIDDLE_EAST', 'Iraq': 'MIDDLE_EAST',

  // Africa
  'Nigeria': 'AFRICA', 'South Africa': 'AFRICA', 'Kenya': 'AFRICA',
  'Ghana': 'AFRICA', 'Egypt': 'AFRICA', 'Morocco': 'AFRICA',
  'Tanzania': 'AFRICA', 'Uganda': 'AFRICA', 'Senegal': 'AFRICA',
  'Cameroon': 'AFRICA', 'Mozambique': 'AFRICA', 'Zimbabwe': 'AFRICA',
  'Zambia': 'AFRICA', 'Rwanda': 'AFRICA', 'Madagascar': 'AFRICA',
  'Malawi': 'AFRICA', 'Namibia': 'AFRICA', 'Botswana': 'AFRICA',
  'Mauritius': 'AFRICA', 'Tunisia': 'AFRICA', 'Algeria': 'AFRICA',
  'Ethiopia': 'AFRICA', 'Sierra Leone': 'AFRICA',

  // Eastern Europe
  'Russia': 'EASTERN_EUROPE', 'Ukraine': 'EASTERN_EUROPE',
  'Poland': 'EASTERN_EUROPE', 'Romania': 'EASTERN_EUROPE',
  'Czech Republic': 'EASTERN_EUROPE', 'Hungary': 'EASTERN_EUROPE',
  'Bulgaria': 'EASTERN_EUROPE', 'Serbia': 'EASTERN_EUROPE',
  'Croatia': 'EASTERN_EUROPE', 'Slovakia': 'EASTERN_EUROPE',
  'Slovenia': 'EASTERN_EUROPE', 'Lithuania': 'EASTERN_EUROPE',
  'Latvia': 'EASTERN_EUROPE', 'Estonia': 'EASTERN_EUROPE',
  'Belarus': 'EASTERN_EUROPE', 'Moldova': 'EASTERN_EUROPE',
  'Georgia': 'EASTERN_EUROPE', 'Armenia': 'EASTERN_EUROPE',
  'Azerbaijan': 'EASTERN_EUROPE', 'Kazakhstan': 'EASTERN_EUROPE',
  'Uzbekistan': 'EASTERN_EUROPE', 'Kyrgyzstan': 'EASTERN_EUROPE',
  'Bosnia and Herzegovina': 'EASTERN_EUROPE', 'Montenegro': 'EASTERN_EUROPE',
  'North Macedonia': 'EASTERN_EUROPE', 'Albania': 'EASTERN_EUROPE',

  // Western Europe
  'United Kingdom': 'WESTERN_EUROPE', 'Germany': 'WESTERN_EUROPE',
  'France': 'WESTERN_EUROPE', 'Netherlands': 'WESTERN_EUROPE',
  'Switzerland': 'WESTERN_EUROPE', 'Austria': 'WESTERN_EUROPE',
  'Belgium': 'WESTERN_EUROPE', 'Luxembourg': 'WESTERN_EUROPE',
  'Ireland': 'WESTERN_EUROPE', 'Spain': 'WESTERN_EUROPE',
  'Portugal': 'WESTERN_EUROPE', 'Italy': 'WESTERN_EUROPE',
  'Greece': 'WESTERN_EUROPE', 'Denmark': 'WESTERN_EUROPE',
  'Sweden': 'WESTERN_EUROPE', 'Norway': 'WESTERN_EUROPE',
  'Finland': 'WESTERN_EUROPE', 'Iceland': 'WESTERN_EUROPE',
  'Malta': 'WESTERN_EUROPE', 'Cyprus': 'WESTERN_EUROPE',
  'Liechtenstein': 'WESTERN_EUROPE', 'Monaco': 'WESTERN_EUROPE',
  'Andorra': 'WESTERN_EUROPE', 'Jersey': 'WESTERN_EUROPE',

  // North America
  'United States': 'NORTH_AMERICA', 'Canada': 'NORTH_AMERICA',

  // Latin America
  'Brazil': 'LATIN_AMERICA', 'Mexico': 'LATIN_AMERICA',
  'Argentina': 'LATIN_AMERICA', 'Colombia': 'LATIN_AMERICA',
  'Chile': 'LATIN_AMERICA', 'Peru': 'LATIN_AMERICA',
  'Venezuela': 'LATIN_AMERICA', 'Ecuador': 'LATIN_AMERICA',
  'Bolivia': 'LATIN_AMERICA', 'Paraguay': 'LATIN_AMERICA',
  'Uruguay': 'LATIN_AMERICA', 'Costa Rica': 'LATIN_AMERICA',
  'Panama': 'LATIN_AMERICA', 'Guatemala': 'LATIN_AMERICA',
  'Honduras': 'LATIN_AMERICA', 'El Salvador': 'LATIN_AMERICA',
  'Nicaragua': 'LATIN_AMERICA', 'Dominican Republic': 'LATIN_AMERICA',
  'Jamaica': 'LATIN_AMERICA', 'Trinidad and Tobago': 'LATIN_AMERICA',
  'Cuba': 'LATIN_AMERICA', 'Belize': 'LATIN_AMERICA',
  'Bahamas': 'LATIN_AMERICA',

  // Oceania
  'Australia': 'OCEANIA', 'New Zealand': 'OCEANIA',

  // Crypto hubs (offshore jurisdictions)
  'Cayman Islands': 'CRYPTO_HUB', 'British Virgin Islands': 'CRYPTO_HUB',
  'Seychelles': 'CRYPTO_HUB', 'Bermuda': 'CRYPTO_HUB',
  'Gibraltar': 'CRYPTO_HUB', 'Curacao': 'CRYPTO_HUB',
};

// Country-specific overrides where data is well-known to differ from regional defaults
const COUNTRY_OVERRIDES: Record<string, Partial<StablecoinShares>> = {
  // South Korea: heavily USDT but some local pairs, lower overall stablecoin share
  'South Korea':    { usdt: 0.55, usdc: 0.05, dai: 0.01, all: 0.61 },
  // Japan: regulated, more JPY pairs, lower stablecoin dominance
  'Japan':          { usdt: 0.45, usdc: 0.08, dai: 0.02, all: 0.55 },
  // Turkey: extremely USDT heavy due to lira devaluation
  'Turkey':         { usdt: 0.88, usdc: 0.05, dai: 0.01, all: 0.94 },
  // Nigeria: USDT dominant for P2P, very little USDC
  'Nigeria':        { usdt: 0.88, usdc: 0.05, dai: 0.01, all: 0.94 },
  // Argentina: USDT dominant due to peso, but some USDC/DAI in DeFi
  'Argentina':      { usdt: 0.75, usdc: 0.15, dai: 0.04, all: 0.94 },
  // Brazil: more sophisticated market, meaningful USDC presence
  'Brazil':         { usdt: 0.60, usdc: 0.25, dai: 0.03, all: 0.88 },
  // India: USDT dominant, WazirX/CoinDCX pairs
  'India':          { usdt: 0.85, usdc: 0.07, dai: 0.01, all: 0.93 },
  // Vietnam: massive crypto adoption, almost all USDT
  'Vietnam':        { usdt: 0.90, usdc: 0.04, dai: 0.01, all: 0.95 },
  // Singapore: hub market, more balanced
  'Singapore':      { usdt: 0.65, usdc: 0.20, dai: 0.03, all: 0.88 },
  // Hong Kong: regulated, similar to Singapore
  'Hong Kong':      { usdt: 0.65, usdc: 0.20, dai: 0.03, all: 0.88 },
  // US: most balanced market, strong USDC
  'United States':  { usdt: 0.38, usdc: 0.40, dai: 0.06, all: 0.84 },
  // UK: leaning USDT but significant USDC
  'United Kingdom': { usdt: 0.48, usdc: 0.32, dai: 0.05, all: 0.85 },
  // Germany: similar to UK
  'Germany':        { usdt: 0.50, usdc: 0.30, dai: 0.06, all: 0.86 },
  // Ukraine: war economy, USDT dominant for remittances
  'Ukraine':        { usdt: 0.88, usdc: 0.07, dai: 0.01, all: 0.96 },
  // Russia: USDT for sanctions circumvention
  'Russia':         { usdt: 0.85, usdc: 0.05, dai: 0.01, all: 0.91 },
  // Philippines: remittance corridor, USDT dominant
  'Philippines':    { usdt: 0.85, usdc: 0.08, dai: 0.01, all: 0.94 },
  // Thailand: Bitkub dominant, mixed stablecoin usage
  'Thailand':       { usdt: 0.75, usdc: 0.10, dai: 0.02, all: 0.87 },
  // Mexico: Bitso heavy, growing USDC
  'Mexico':         { usdt: 0.65, usdc: 0.22, dai: 0.03, all: 0.90 },
  // South Africa: Luno-dominated, moderate stablecoin share
  'South Africa':   { usdt: 0.70, usdc: 0.15, dai: 0.02, all: 0.87 },
  // Australia: regulated, balanced like UK
  'Australia':      { usdt: 0.48, usdc: 0.32, dai: 0.04, all: 0.84 },
  // Canada: similar to US
  'Canada':         { usdt: 0.42, usdc: 0.35, dai: 0.05, all: 0.82 },
  // Netherlands: Bitvavo, European mix
  'Netherlands':    { usdt: 0.52, usdc: 0.28, dai: 0.05, all: 0.85 },
};

// Global fallback (used when country has no region mapping)
const GLOBAL_DEFAULT: StablecoinShares = { usdt: 0.65, usdc: 0.22, dai: 0.03, all: 0.90 };

// These are the baseline assumptions our static weights were built against.
// When live data comes in, we compute a drift ratio to adjust.
const BASELINE_GLOBAL = { usdt: 0.65, usdc: 0.22, dai: 0.03 };

// Live calibration data (set by calibrateWithLiveData)
let liveCalibration: { usdtRatio: number; usdcRatio: number; daiRatio: number } | null = null;

/**
 * Calibrate static weights using live DefiLlama market share data.
 * Call this once when data is fetched — it adjusts all country weights proportionally.
 *
 * Example: if our baseline assumed USDT = 65% globally, but live data shows 68%,
 * every country's USDT weight gets multiplied by 68/65 = 1.046 (capped at 0.95).
 */
export function calibrateWithLiveData(liveShares: {
  usdtShare: number;
  usdcShare: number;
  daiShare: number;
}) {
  liveCalibration = {
    usdtRatio: BASELINE_GLOBAL.usdt > 0 ? liveShares.usdtShare / BASELINE_GLOBAL.usdt : 1,
    usdcRatio: BASELINE_GLOBAL.usdc > 0 ? liveShares.usdcShare / BASELINE_GLOBAL.usdc : 1,
    daiRatio: BASELINE_GLOBAL.dai > 0 ? liveShares.daiShare / BASELINE_GLOBAL.dai : 1,
  };
}

function applyCalibration(weights: StablecoinShares): StablecoinShares {
  if (!liveCalibration) return weights;

  // Apply drift ratios, cap individual coins at 0.95
  const usdt = Math.min(weights.usdt * liveCalibration.usdtRatio, 0.95);
  const usdc = Math.min(weights.usdc * liveCalibration.usdcRatio, 0.95);
  const dai = Math.min(weights.dai * liveCalibration.daiRatio, 0.95);
  const all = Math.min(usdt + usdc + dai + 0.05, 0.98); // +0.05 for other stablecoins

  return { usdt, usdc, dai, all };
}

export function getCountryWeights(countryName: string): StablecoinShares {
  let base: StablecoinShares;

  // Check country-specific override first
  const override = COUNTRY_OVERRIDES[countryName];
  if (override && override.all !== undefined) {
    base = override as StablecoinShares;
  } else {
    // Check region mapping
    const region = COUNTRY_REGION[countryName];
    if (region) {
      const regionDefault = REGION_DEFAULTS[region];
      base = override ? { ...regionDefault, ...override } : regionDefault;
    } else {
      base = GLOBAL_DEFAULT;
    }
  }

  return applyCalibration(base);
}
