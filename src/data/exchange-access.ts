// Exchange details for "How to Buy" sections on country pages.
// Availability per country is derived from global-exchange-redistribution.ts distributions.

export interface ExchangeInfo {
  id: string;
  name: string;
  url: string;
  paymentMethods: string[];
  stablecoins: string[];
  hasP2P: boolean;
  type: 'global' | 'local';
}

// Global exchanges (available in many countries)
export const EXCHANGES: ExchangeInfo[] = [
  {
    id: 'binance',
    name: 'Binance',
    url: 'https://www.binance.com',
    paymentMethods: ['Bank Transfer', 'Card', 'P2P'],
    stablecoins: ['USDT', 'USDC', 'DAI', 'FDUSD'],
    hasP2P: true,
    type: 'global',
  },
  {
    id: 'bybit',
    name: 'Bybit',
    url: 'https://www.bybit.com',
    paymentMethods: ['Bank Transfer', 'Card', 'P2P'],
    stablecoins: ['USDT', 'USDC'],
    hasP2P: true,
    type: 'global',
  },
  {
    id: 'okx',
    name: 'OKX',
    url: 'https://www.okx.com',
    paymentMethods: ['Bank Transfer', 'Card', 'P2P'],
    stablecoins: ['USDT', 'USDC', 'DAI'],
    hasP2P: true,
    type: 'global',
  },
  {
    id: 'kucoin',
    name: 'KuCoin',
    url: 'https://www.kucoin.com',
    paymentMethods: ['Bank Transfer', 'Card', 'P2P'],
    stablecoins: ['USDT', 'USDC', 'DAI'],
    hasP2P: true,
    type: 'global',
  },
  {
    id: 'mexc',
    name: 'MEXC',
    url: 'https://www.mexc.com',
    paymentMethods: ['Card', 'P2P'],
    stablecoins: ['USDT', 'USDC'],
    hasP2P: true,
    type: 'global',
  },
  {
    id: 'gate',
    name: 'Gate.io',
    url: 'https://www.gate.io',
    paymentMethods: ['Card', 'P2P'],
    stablecoins: ['USDT', 'USDC'],
    hasP2P: true,
    type: 'global',
  },
  {
    id: 'bitget',
    name: 'Bitget',
    url: 'https://www.bitget.com',
    paymentMethods: ['Card', 'P2P'],
    stablecoins: ['USDT', 'USDC'],
    hasP2P: true,
    type: 'global',
  },
  {
    id: 'coinbase',
    name: 'Coinbase',
    url: 'https://www.coinbase.com',
    paymentMethods: ['Bank Transfer', 'Card'],
    stablecoins: ['USDC', 'USDT', 'DAI'],
    hasP2P: false,
    type: 'global',
  },
  {
    id: 'kraken',
    name: 'Kraken',
    url: 'https://www.kraken.com',
    paymentMethods: ['Bank Transfer', 'Card'],
    stablecoins: ['USDT', 'USDC', 'DAI'],
    hasP2P: false,
    type: 'global',
  },
  {
    id: 'crypto_com',
    name: 'Crypto.com',
    url: 'https://crypto.com',
    paymentMethods: ['Bank Transfer', 'Card'],
    stablecoins: ['USDT', 'USDC'],
    hasP2P: false,
    type: 'global',
  },
  {
    id: 'bitstamp',
    name: 'Bitstamp',
    url: 'https://www.bitstamp.net',
    paymentMethods: ['Bank Transfer', 'Card'],
    stablecoins: ['USDT', 'USDC'],
    hasP2P: false,
    type: 'global',
  },
  {
    id: 'huobi',
    name: 'HTX',
    url: 'https://www.htx.com',
    paymentMethods: ['Card', 'P2P'],
    stablecoins: ['USDT', 'USDC'],
    hasP2P: true,
    type: 'global',
  },
  {
    id: 'bitfinex',
    name: 'Bitfinex',
    url: 'https://www.bitfinex.com',
    paymentMethods: ['Bank Transfer'],
    stablecoins: ['USDT', 'USDC', 'DAI'],
    hasP2P: false,
    type: 'global',
  },
];

// Local/regional exchanges mapped to their home country (iso2)
export const LOCAL_EXCHANGES: Record<string, ExchangeInfo[]> = {
  NG: [
    { id: 'quidax', name: 'Quidax', url: 'https://www.quidax.com', paymentMethods: ['Bank Transfer'], stablecoins: ['USDT', 'USDC'], hasP2P: false, type: 'local' },
  ],
  ZA: [
    { id: 'luno', name: 'Luno', url: 'https://www.luno.com', paymentMethods: ['Bank Transfer'], stablecoins: ['USDT', 'USDC'], hasP2P: false, type: 'local' },
    { id: 'valr', name: 'VALR', url: 'https://www.valr.com', paymentMethods: ['Bank Transfer'], stablecoins: ['USDT', 'USDC'], hasP2P: false, type: 'local' },
  ],
  TR: [
    { id: 'btcturk', name: 'BtcTurk', url: 'https://www.btcturk.com', paymentMethods: ['Bank Transfer'], stablecoins: ['USDT', 'USDC'], hasP2P: false, type: 'local' },
    { id: 'paribu', name: 'Paribu', url: 'https://www.paribu.com', paymentMethods: ['Bank Transfer'], stablecoins: ['USDT'], hasP2P: false, type: 'local' },
  ],
  BR: [
    { id: 'mercado_bitcoin', name: 'Mercado Bitcoin', url: 'https://www.mercadobitcoin.com.br', paymentMethods: ['Bank Transfer', 'PIX'], stablecoins: ['USDT', 'USDC'], hasP2P: false, type: 'local' },
    { id: 'foxbit', name: 'Foxbit', url: 'https://foxbit.com.br', paymentMethods: ['Bank Transfer', 'PIX'], stablecoins: ['USDT'], hasP2P: false, type: 'local' },
  ],
  IN: [
    { id: 'wazirx', name: 'WazirX', url: 'https://wazirx.com', paymentMethods: ['Bank Transfer', 'UPI'], stablecoins: ['USDT', 'USDC'], hasP2P: false, type: 'local' },
    { id: 'coindcx', name: 'CoinDCX', url: 'https://coindcx.com', paymentMethods: ['Bank Transfer', 'UPI'], stablecoins: ['USDT', 'USDC'], hasP2P: false, type: 'local' },
  ],
  AR: [
    { id: 'ripio', name: 'Ripio', url: 'https://www.ripio.com', paymentMethods: ['Bank Transfer'], stablecoins: ['USDT', 'USDC', 'DAI'], hasP2P: false, type: 'local' },
    { id: 'lemon', name: 'Lemon Cash', url: 'https://www.lemon.me', paymentMethods: ['Bank Transfer'], stablecoins: ['USDT', 'USDC', 'DAI'], hasP2P: false, type: 'local' },
  ],
  KE: [
    { id: 'yellowcard', name: 'Yellow Card', url: 'https://yellowcard.io', paymentMethods: ['Bank Transfer', 'Mobile Money'], stablecoins: ['USDT', 'USDC'], hasP2P: false, type: 'local' },
  ],
  PK: [
    { id: 'rainpk', name: 'Rain', url: 'https://www.rain.com', paymentMethods: ['Bank Transfer'], stablecoins: ['USDT', 'USDC'], hasP2P: false, type: 'local' },
  ],
  EG: [
    { id: 'yellowcard_eg', name: 'Yellow Card', url: 'https://yellowcard.io', paymentMethods: ['Bank Transfer'], stablecoins: ['USDT', 'USDC'], hasP2P: false, type: 'local' },
  ],
  US: [
    { id: 'coinbase_us', name: 'Coinbase', url: 'https://www.coinbase.com', paymentMethods: ['Bank Transfer', 'Card', 'ACH'], stablecoins: ['USDC', 'USDT', 'DAI'], hasP2P: false, type: 'local' },
    { id: 'kraken_us', name: 'Kraken', url: 'https://www.kraken.com', paymentMethods: ['Bank Transfer', 'ACH', 'Wire'], stablecoins: ['USDT', 'USDC', 'DAI'], hasP2P: false, type: 'local' },
  ],
  MX: [
    { id: 'bitso', name: 'Bitso', url: 'https://bitso.com', paymentMethods: ['Bank Transfer', 'SPEI'], stablecoins: ['USDT', 'USDC'], hasP2P: false, type: 'local' },
  ],
  KR: [
    { id: 'upbit', name: 'Upbit', url: 'https://upbit.com', paymentMethods: ['Bank Transfer'], stablecoins: ['USDT'], hasP2P: false, type: 'local' },
    { id: 'bithumb', name: 'Bithumb', url: 'https://www.bithumb.com', paymentMethods: ['Bank Transfer'], stablecoins: ['USDT', 'USDC'], hasP2P: false, type: 'local' },
  ],
  JP: [
    { id: 'bitflyer', name: 'bitFlyer', url: 'https://bitflyer.com', paymentMethods: ['Bank Transfer'], stablecoins: ['USDT'], hasP2P: false, type: 'local' },
  ],
  AU: [
    { id: 'coinspot', name: 'CoinSpot', url: 'https://www.coinspot.com.au', paymentMethods: ['Bank Transfer', 'Card', 'PayID'], stablecoins: ['USDT', 'USDC'], hasP2P: false, type: 'local' },
  ],
  ID: [
    { id: 'indodax', name: 'Indodax', url: 'https://indodax.com', paymentMethods: ['Bank Transfer'], stablecoins: ['USDT', 'USDC'], hasP2P: false, type: 'local' },
    { id: 'tokocrypto', name: 'Tokocrypto', url: 'https://www.tokocrypto.com', paymentMethods: ['Bank Transfer'], stablecoins: ['USDT', 'USDC'], hasP2P: false, type: 'local' },
  ],
  PH: [
    { id: 'coins_ph', name: 'Coins.ph', url: 'https://coins.ph', paymentMethods: ['Bank Transfer', 'GCash', 'Mobile Money'], stablecoins: ['USDT', 'USDC'], hasP2P: false, type: 'local' },
  ],
  TH: [
    { id: 'bitkub', name: 'Bitkub', url: 'https://www.bitkub.com', paymentMethods: ['Bank Transfer'], stablecoins: ['USDT'], hasP2P: false, type: 'local' },
  ],
  GH: [
    { id: 'yellowcard_gh', name: 'Yellow Card', url: 'https://yellowcard.io', paymentMethods: ['Bank Transfer', 'Mobile Money'], stablecoins: ['USDT', 'USDC'], hasP2P: false, type: 'local' },
  ],
};

// Given a country name, find which global exchanges serve it
// (from redistribution data — if an exchange has a distribution entry for a country, it serves users there)
import { GLOBAL_EXCHANGE_REDISTRIBUTION } from './global-exchange-redistribution';
import { STABLECOIN_REGULATIONS } from './stablecoin-regulations';

export function getExchangesForCountry(countryName: string, iso2: string): ExchangeInfo[] {
  const results: ExchangeInfo[] = [];
  const seen = new Set<string>();

  // Add local exchanges first
  const locals = LOCAL_EXCHANGES[iso2] || [];
  for (const ex of locals) {
    results.push(ex);
    seen.add(ex.id);
  }

  // Check global exchanges
  for (const exchange of EXCHANGES) {
    if (seen.has(exchange.id)) continue;
    const dists = GLOBAL_EXCHANGE_REDISTRIBUTION[exchange.id];
    if (!dists) continue;
    if (dists.some((d) => d.country === countryName)) {
      results.push(exchange);
      seen.add(exchange.id);
    }
  }

  // Also check aliased IDs (htx -> huobi, coinbase_exchange -> coinbase)
  const aliases: Record<string, string> = { htx: 'huobi', coinbase_exchange: 'coinbase', bitfinex2: 'bitfinex' };
  for (const [aliasId, canonicalId] of Object.entries(aliases)) {
    if (seen.has(canonicalId)) continue;
    const dists = GLOBAL_EXCHANGE_REDISTRIBUTION[aliasId];
    if (!dists) continue;
    const exchange = EXCHANGES.find((e) => e.id === canonicalId);
    if (exchange && dists.some((d) => d.country === countryName)) {
      results.push(exchange);
      seen.add(canonicalId);
    }
  }

  return results;
}
