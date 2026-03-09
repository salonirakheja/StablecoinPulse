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
    { id: 'foxbit', name: 'Foxbit', url: 'https://foxbit.com.br', paymentMethods: ['Bank Transfer', 'PIX'], stablecoins: ['USDT', 'USDC'], hasP2P: false, type: 'local' },
  ],
  IN: [
    { id: 'coindcx', name: 'CoinDCX', url: 'https://coindcx.com', paymentMethods: ['Bank Transfer', 'UPI'], stablecoins: ['USDT', 'USDC'], hasP2P: false, type: 'local' },
  ],
  AR: [
    { id: 'ripio', name: 'Ripio', url: 'https://www.ripio.com', paymentMethods: ['Bank Transfer'], stablecoins: ['USDT', 'USDC', 'DAI'], hasP2P: false, type: 'local' },
    { id: 'lemon', name: 'Lemon Cash', url: 'https://www.lemon.me', paymentMethods: ['Bank Transfer'], stablecoins: ['USDT', 'USDC', 'DAI'], hasP2P: false, type: 'local' },
  ],
  KE: [
    { id: 'yellow_card_ke', name: 'Yellow Card', url: 'https://yellowcard.io', paymentMethods: ['M-Pesa', 'Bank Transfer'], stablecoins: ['USDT', 'USDC'], hasP2P: false, type: 'local' },
  ],
  PK: [],
  EG: [],
  US: [
    { id: 'gemini', name: 'Gemini', url: 'https://www.gemini.com', paymentMethods: ['ACH', 'Wire Transfer', 'Card'], stablecoins: ['USDT', 'USDC', 'DAI'], hasP2P: false, type: 'local' },
  ],
  MX: [
    { id: 'bitso', name: 'Bitso', url: 'https://bitso.com', paymentMethods: ['Bank Transfer', 'SPEI'], stablecoins: ['USDT', 'USDC'], hasP2P: false, type: 'local' },
  ],
  KR: [
    { id: 'upbit', name: 'Upbit', url: 'https://upbit.com', paymentMethods: ['Bank Transfer'], stablecoins: ['USDT', 'USDC'], hasP2P: false, type: 'local' },
  ],
  JP: [
    { id: 'bitflyer', name: 'bitFlyer', url: 'https://bitflyer.com', paymentMethods: ['Bank Transfer'], stablecoins: ['USDC'], hasP2P: false, type: 'local' },
    { id: 'sbi_vc_trade', name: 'SBI VC Trade', url: 'https://www.sbivc.co.jp', paymentMethods: ['Bank Transfer'], stablecoins: ['USDC'], hasP2P: false, type: 'local' },
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
    { id: 'pdax', name: 'PDAX', url: 'https://pdax.ph', paymentMethods: ['Bank Transfer', 'GCash', 'GrabPay'], stablecoins: ['USDT', 'USDC'], hasP2P: false, type: 'local' },
  ],
  TH: [
    { id: 'bitkub', name: 'Bitkub', url: 'https://www.bitkub.com', paymentMethods: ['Bank Transfer'], stablecoins: ['USDT', 'USDC'], hasP2P: false, type: 'local' },
  ],
  GH: [
    { id: 'yellow_card_gh', name: 'Yellow Card', url: 'https://yellowcard.io', paymentMethods: ['Mobile Money', 'Bank Transfer'], stablecoins: ['USDT', 'USDC'], hasP2P: false, type: 'local' },
  ],
  SG: [
    { id: 'coinhako', name: 'Coinhako', url: 'https://www.coinhako.com', paymentMethods: ['Bank Transfer', 'PayNow'], stablecoins: ['USDT', 'USDC'], hasP2P: false, type: 'local' },
    { id: 'independent_reserve', name: 'Independent Reserve', url: 'https://www.independentreserve.com', paymentMethods: ['Bank Transfer'], stablecoins: ['USDT', 'USDC'], hasP2P: false, type: 'local' },
  ],
  AE: [
    { id: 'rain_ae', name: 'Rain', url: 'https://www.rain.com', paymentMethods: ['Bank Transfer'], stablecoins: ['USDT', 'USDC'], hasP2P: false, type: 'local' },
    { id: 'bitoasis', name: 'BitOasis', url: 'https://bitoasis.net', paymentMethods: ['Bank Transfer'], stablecoins: ['USDT', 'USDC'], hasP2P: false, type: 'local' },
  ],
  GB: [
    { id: 'revolut', name: 'Revolut', url: 'https://www.revolut.com', paymentMethods: ['Bank Transfer', 'Card'], stablecoins: ['USDT', 'USDC'], hasP2P: false, type: 'local' },
  ],
  DE: [
    { id: 'bitvavo', name: 'Bitvavo', url: 'https://bitvavo.com', paymentMethods: ['Bank Transfer', 'SEPA'], stablecoins: ['USDT', 'USDC'], hasP2P: false, type: 'local' },
  ],
  VN: [
    { id: 'remitano', name: 'Remitano', url: 'https://remitano.com', paymentMethods: ['Bank Transfer', 'P2P'], stablecoins: ['USDT', 'USDC'], hasP2P: true, type: 'local' },
  ],
  UA: [
    { id: 'whitebit', name: 'WhiteBIT', url: 'https://whitebit.com', paymentMethods: ['Bank Transfer', 'Card'], stablecoins: ['USDT', 'USDC'], hasP2P: false, type: 'local' },
  ],
  CO: [
    { id: 'buda_co', name: 'Buda.com', url: 'https://www.buda.com', paymentMethods: ['Bank Transfer'], stablecoins: ['USDT', 'USDC'], hasP2P: false, type: 'local' },
  ],
  // Americas
  CA: [
    { id: 'newton', name: 'Newton', url: 'https://www.newton.co', paymentMethods: ['Interac e-Transfer', 'Wire Transfer'], stablecoins: ['USDC'], hasP2P: false, type: 'local' },
    { id: 'ndax', name: 'NDAX', url: 'https://ndax.io', paymentMethods: ['Interac e-Transfer', 'Wire Transfer'], stablecoins: ['USDC'], hasP2P: false, type: 'local' },
  ],
  PE: [
    { id: 'buda_pe', name: 'Buda.com', url: 'https://www.buda.com', paymentMethods: ['Bank Transfer'], stablecoins: ['USDT', 'USDC'], hasP2P: false, type: 'local' },
  ],
  CL: [
    { id: 'buda_cl', name: 'Buda.com', url: 'https://www.buda.com', paymentMethods: ['Bank Transfer'], stablecoins: ['USDT', 'USDC'], hasP2P: false, type: 'local' },
  ],
  UY: [
    { id: 'ripio_uy', name: 'Ripio', url: 'https://www.ripio.com', paymentMethods: ['Bank Transfer'], stablecoins: ['USDT', 'USDC'], hasP2P: false, type: 'local' },
  ],
  // Europe
  ES: [
    { id: 'bit2me', name: 'Bit2Me', url: 'https://bit2me.com', paymentMethods: ['SEPA', 'Card'], stablecoins: ['USDT', 'USDC'], hasP2P: false, type: 'local' },
  ],
  PT: [
    { id: 'bit2me_pt', name: 'Bit2Me', url: 'https://bit2me.com', paymentMethods: ['SEPA', 'Card'], stablecoins: ['USDT', 'USDC'], hasP2P: false, type: 'local' },
  ],
  IT: [
    { id: 'young_platform', name: 'Young Platform', url: 'https://youngplatform.com', paymentMethods: ['SEPA', 'Card'], stablecoins: ['USDC'], hasP2P: false, type: 'local' },
  ],
  NL: [
    { id: 'bitvavo_nl', name: 'Bitvavo', url: 'https://bitvavo.com', paymentMethods: ['SEPA', 'iDEAL', 'Card'], stablecoins: ['USDC'], hasP2P: false, type: 'local' },
  ],
  FR: [
    { id: 'paymium', name: 'Paymium', url: 'https://www.paymium.com', paymentMethods: ['SEPA', 'Card'], stablecoins: ['USDC'], hasP2P: false, type: 'local' },
  ],
  AT: [
    { id: 'bitpanda', name: 'Bitpanda', url: 'https://www.bitpanda.com', paymentMethods: ['SEPA', 'Card', 'SOFORT'], stablecoins: ['USDT', 'USDC'], hasP2P: false, type: 'local' },
  ],
  CH: [
    { id: 'bitcoin_suisse', name: 'Bitcoin Suisse', url: 'https://bitcoinsuisse.com', paymentMethods: ['Bank Transfer', 'SEPA'], stablecoins: ['USDT', 'USDC'], hasP2P: false, type: 'local' },
  ],
  PL: [
    { id: 'zondacrypto', name: 'zondacrypto', url: 'https://zondacrypto.com', paymentMethods: ['Bank Transfer', 'Card', 'SEPA'], stablecoins: ['USDT', 'USDC'], hasP2P: false, type: 'local' },
  ],
  SE: [
    { id: 'firi_se', name: 'Firi', url: 'https://firi.com', paymentMethods: ['Bank Transfer'], stablecoins: ['USDT'], hasP2P: false, type: 'local' },
  ],
  NO: [
    { id: 'firi_no', name: 'Firi', url: 'https://firi.com', paymentMethods: ['Bank Transfer'], stablecoins: ['USDT'], hasP2P: false, type: 'local' },
  ],
  DK: [
    { id: 'firi_dk', name: 'Firi', url: 'https://firi.com', paymentMethods: ['Bank Transfer'], stablecoins: ['USDT'], hasP2P: false, type: 'local' },
  ],
  FI: [
    { id: 'coinmotion', name: 'Coinmotion', url: 'https://coinmotion.com', paymentMethods: ['Bank Transfer', 'SEPA'], stablecoins: ['USDC'], hasP2P: false, type: 'local' },
  ],
  CZ: [
    { id: 'anycoin', name: 'Anycoin', url: 'https://anycoin.cz', paymentMethods: ['Bank Transfer', 'Card'], stablecoins: ['USDT'], hasP2P: false, type: 'local' },
  ],
  BY: [
    { id: 'bynex', name: 'BYNEX', url: 'https://bynex.io', paymentMethods: ['Bank Transfer', 'Card'], stablecoins: ['USDT'], hasP2P: false, type: 'local' },
  ],
  IL: [
    { id: 'bits_of_gold', name: 'Bits of Gold', url: 'https://www.bitsofgold.co.il', paymentMethods: ['Bank Transfer', 'Card'], stablecoins: ['USDC'], hasP2P: false, type: 'local' },
  ],
  GE: [
    { id: 'cryptal', name: 'Cryptal', url: 'https://cryptal.com', paymentMethods: ['Bank Transfer', 'Card'], stablecoins: ['USDT'], hasP2P: false, type: 'local' },
  ],
  // Asia-Pacific
  HK: [
    { id: 'hashkey', name: 'HashKey Exchange', url: 'https://www.hashkey.com', paymentMethods: ['Bank Transfer', 'FPS'], stablecoins: ['USDT', 'USDC'], hasP2P: false, type: 'local' },
  ],
  TW: [
    { id: 'max_exchange', name: 'MAX Exchange', url: 'https://max.maicoin.com', paymentMethods: ['Bank Transfer'], stablecoins: ['USDT'], hasP2P: false, type: 'local' },
    { id: 'bitopro', name: 'BitoPro', url: 'https://www.bitopro.com', paymentMethods: ['Bank Transfer'], stablecoins: ['USDT'], hasP2P: false, type: 'local' },
  ],
  NZ: [
    { id: 'swyftx', name: 'Swyftx', url: 'https://swyftx.com/nz', paymentMethods: ['Bank Transfer', 'Card'], stablecoins: ['USDC'], hasP2P: false, type: 'local' },
  ],
  KZ: [
    { id: 'intebix', name: 'Intebix', url: 'https://intebix.kz', paymentMethods: ['Bank Transfer', 'Card'], stablecoins: ['USDT'], hasP2P: false, type: 'local' },
  ],
  // Middle East
  SA: [
    { id: 'rain_sa', name: 'Rain', url: 'https://www.rain.com', paymentMethods: ['Bank Transfer', 'Card'], stablecoins: ['USDT', 'USDC'], hasP2P: false, type: 'local' },
  ],
  BH: [
    { id: 'rain_bh', name: 'Rain', url: 'https://www.rain.com', paymentMethods: ['Bank Transfer', 'Card'], stablecoins: ['USDT', 'USDC'], hasP2P: false, type: 'local' },
  ],
  QA: [
    { id: 'rain_qa', name: 'Rain', url: 'https://www.rain.com', paymentMethods: ['Bank Transfer', 'Card'], stablecoins: ['USDT', 'USDC'], hasP2P: false, type: 'local' },
  ],
  KW: [
    { id: 'rain_kw', name: 'Rain', url: 'https://www.rain.com', paymentMethods: ['Bank Transfer', 'Card', 'KNET'], stablecoins: ['USDT', 'USDC'], hasP2P: false, type: 'local' },
  ],
  JO: [
    { id: 'rain_jo', name: 'Rain', url: 'https://www.rain.com', paymentMethods: ['Bank Transfer', 'Card'], stablecoins: ['USDT', 'USDC'], hasP2P: false, type: 'local' },
  ],
  // Africa
  TZ: [
    { id: 'yellow_card_tz', name: 'Yellow Card', url: 'https://yellowcard.io', paymentMethods: ['Mobile Money', 'Bank Transfer'], stablecoins: ['USDT', 'USDC'], hasP2P: false, type: 'local' },
  ],
  UG: [
    { id: 'yellow_card_ug', name: 'Yellow Card', url: 'https://yellowcard.io', paymentMethods: ['Mobile Money', 'Bank Transfer'], stablecoins: ['USDT', 'USDC'], hasP2P: false, type: 'local' },
  ],
};

// Given a country name, find which global exchanges serve it
// (from redistribution data — if an exchange has a distribution entry for a country, it serves users there)
import { GLOBAL_EXCHANGE_REDISTRIBUTION } from './global-exchange-redistribution';

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
