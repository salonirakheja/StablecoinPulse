export type StablecoinFilter = 'all' | 'usdt' | 'usdc' | 'dai';
export type TimePeriod = '24h' | '7d' | '30d';
export type ViewMode = 'volume' | 'regulation';
export type RegulationStatus = 'regulated' | 'partial' | 'restricted' | 'unclear';

export interface CoinGeckoExchange {
  id: string;
  name: string;
  country: string | null;
  trust_score: number | null;
  trust_score_rank: number | null;
  trade_volume_24h_btc: number;
}

export interface CountryVolume {
  country: string;
  iso2: string;
  iso3: string;
  lat: number;
  lng: number;
  volumeUsd: number;
  volumeBtc: number;
  exchangeCount: number;
  topExchange: string;
  volumeNormalized: number;
}

export interface VolumeFeatureProperties {
  country: string;
  volume_usd: number;
  volume_normalized: number;
  exchange_count: number;
  top_exchange: string;
}

export interface StablecoinStats {
  usdtMarketCap: number;
  usdcMarketCap: number;
  daiMarketCap: number;
  totalMarketCap: number;
  usdtDominance: string;
  usdcDominance: string;
  daiDominance: string;
}

export interface VolumeApiResponse {
  geojson: GeoJSON.FeatureCollection;
  globalVolume: number;
  countryCount: number;
  topCountries: CountryVolume[];
  lastUpdated: string;
  btcPrice: number;
  stablecoinStats: StablecoinStats | null;
}
