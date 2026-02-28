export interface PremiumDriver {
  label: string;
  explanation: string;
  color: string;
}

export const PREMIUM_DRIVERS: Record<string, PremiumDriver> = {
  NG: {
    label: 'Capital controls',
    explanation: 'CBN restricts forex access for individuals and businesses. Most dollar demand is pushed to the informal P2P market, inflating stablecoin prices.',
    color: '#FF6B6B',
  },
  AR: {
    label: 'Capital controls',
    explanation: 'Argentina\'s "cepo" limits dollar purchases to $200/month. The gap between official and parallel ("blue dollar") rates drives massive P2P stablecoin demand.',
    color: '#FF6B6B',
  },
  TR: {
    label: 'Currency crisis',
    explanation: 'The lira has lost 80%+ of its value since 2020. Citizens buy stablecoins to preserve savings in dollars as inflation exceeds 60%.',
    color: '#FF8C42',
  },
  BR: {
    label: 'Crypto tax',
    explanation: 'Brazil taxes crypto gains at 15-22.5%. Despite regulation, stablecoin demand is high for cross-border payments and hedging the real.',
    color: '#C4A35A',
  },
  IN: {
    label: 'Crypto tax',
    explanation: 'India imposes a 30% tax on crypto gains plus 1% TDS on every transaction. High taxes push some activity to P2P where premiums emerge.',
    color: '#C4A35A',
  },
  KE: {
    label: 'Limited on-ramps',
    explanation: 'Banks have been warned against crypto services, leaving few fiat on-ramps. Most stablecoin buying happens via mobile money on P2P platforms.',
    color: '#9B59B6',
  },
  PK: {
    label: 'Crypto ban',
    explanation: 'The State Bank of Pakistan has banned crypto transactions through banks. All stablecoin trading is informal P2P, creating wide spreads.',
    color: '#FF4757',
  },
  EG: {
    label: 'Capital controls',
    explanation: 'The Central Bank of Egypt restricts foreign currency access. A persistent gap between official and black market rates drives stablecoin demand.',
    color: '#FF6B6B',
  },
  VN: {
    label: 'Legal gray area',
    explanation: 'Vietnam doesn\'t recognize crypto as legal tender or payment, but hasn\'t banned trading. High adoption with limited regulated exchanges creates P2P premiums.',
    color: '#A0A0B8',
  },
  PH: {
    label: 'Remittances',
    explanation: 'The Philippines receives $35B+ in annual remittances. Stablecoins offer cheaper, faster transfers than traditional channels like Western Union.',
    color: '#3498DB',
  },
  CO: {
    label: 'Remittances',
    explanation: 'Large Colombian diaspora uses stablecoins for cross-border transfers. P2P platforms are popular due to limited exchange availability.',
    color: '#3498DB',
  },
  MX: {
    label: 'Remittances',
    explanation: 'Mexico receives $60B+ in annual remittances from the US. Stablecoins are increasingly used as a faster, cheaper alternative to traditional rails.',
    color: '#3498DB',
  },
  ZA: {
    label: 'Forex limits',
    explanation: 'South Africa limits individual forex allowances to R1M/year. Stablecoins offer a way to hold dollar exposure beyond these limits.',
    color: '#E67E22',
  },
  GH: {
    label: 'Currency depreciation',
    explanation: 'The Ghanaian cedi has lost over 50% of its value since 2022. Citizens buy stablecoins to protect savings from continued depreciation.',
    color: '#FF8C42',
  },
  ID: {
    label: 'Regulated market',
    explanation: 'Indonesia regulates crypto as a commodity under Bappebti. Growing adoption with a developing exchange ecosystem — premiums reflect market maturity.',
    color: '#2ECC71',
  },
  UA: {
    label: 'War economy',
    explanation: 'The ongoing conflict drives demand for portable, censorship-resistant value. Capital controls and banking disruptions push Ukrainians toward stablecoins.',
    color: '#FF4757',
  },
};
