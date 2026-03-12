// Stablecoin Pulse Score — Rating System
// 6 pillars, 100 points total, letter grades A-F
// Methodology: docs/plans/2026-03-11-stablecoin-ratings-design.md

export interface PillarDetail {
  text: string;
  source?: string;  // URL to verify this claim
}

export interface PillarScore {
  score: number;
  max: number;
  details: PillarDetail[];  // bullet points explaining the score
}

export interface StablecoinRating {
  id: string;
  name: string;
  ticker: string;
  issuer: string;
  type: 'fiat-backed' | 'crypto-collateralized' | 'synthetic' | 'algorithmic';
  tier: 1 | 2;
  marketCap: string;        // human-readable, e.g. "$183B"
  marketCapUsd: number;     // raw number for sorting
  chains: string[];
  website: string;
  pillars: {
    reserve: PillarScore;       // 25 points
    transparency: PillarScore;  // 20 points
    peg: PillarScore;           // 20 points
    regulatory: PillarScore;    // 15 points
    smartContract: PillarScore; // 10 points
    adoption: PillarScore;      // 10 points
  };
  totalScore: number;
  grade: string;
  summary: string;           // 1-2 sentence plain-English takeaway
  lastUpdated: string;       // YYYY-MM-DD
}

export type PillarKey = keyof StablecoinRating['pillars'];

export const PILLAR_INFO: Record<PillarKey, { label: string; max: number; description: string }> = {
  reserve: {
    label: 'Reserve Quality',
    max: 25,
    description: 'What backs the stablecoin, how liquid are the reserves, custodian quality, and GENIUS Act compliance.',
  },
  transparency: {
    label: 'Transparency & Audit',
    max: 20,
    description: 'Audit type and frequency, on-chain proof of reserves, and detail level of public reports.',
  },
  peg: {
    label: 'Peg Stability',
    max: 20,
    description: 'Historical peg deviation, worst depeg events, DEX liquidity depth, and CEX pair coverage.',
  },
  regulatory: {
    label: 'Regulatory Standing',
    max: 15,
    description: 'US licensing status (GENIUS Act), EU MiCA compliance, number of jurisdictions, and sanctions track record.',
  },
  smartContract: {
    label: 'Smart Contract Risk',
    max: 10,
    description: 'Contract audit history, upgradeability risk, freeze/blacklist scope, and admin key security.',
  },
  adoption: {
    label: 'Market Adoption',
    max: 10,
    description: 'Geographic breadth of usage, DeFi integration depth, and cross-chain presence.',
  },
};

export function getGrade(score: number): string {
  if (score >= 85) return 'A';
  if (score >= 80) return 'A-';
  if (score >= 75) return 'B+';
  if (score >= 70) return 'B';
  if (score >= 65) return 'B-';
  if (score >= 60) return 'C+';
  if (score >= 55) return 'C';
  if (score >= 50) return 'C-';
  if (score >= 45) return 'D+';
  if (score >= 40) return 'D';
  if (score >= 35) return 'D-';
  return 'F';
}

export function getGradeColor(grade: string): string {
  if (grade.startsWith('A')) return '#00E5A0';
  if (grade.startsWith('B')) return '#00F5FF';
  if (grade.startsWith('C')) return '#FFB800';
  if (grade.startsWith('D')) return '#FF6B6B';
  return '#FF1493';
}

// --- TIER 1 RATINGS (>$1B market cap) ---

export const STABLECOIN_RATINGS: StablecoinRating[] = [
  {
    id: 'usdc',
    name: 'USD Coin',
    ticker: 'USDC',
    issuer: 'Circle',
    type: 'fiat-backed',
    tier: 1,
    marketCap: '$75B',
    marketCapUsd: 75e9,
    chains: ['Ethereum', 'Solana', 'Base', 'Arbitrum', 'Polygon', 'Avalanche'],
    website: 'https://www.circle.com/usdc',
    pillars: {
      reserve: {
        score: 22,
        max: 25,
        details: [
          { text: 'Reserves held in US Treasuries, Treasury repos, and cash at regulated banks', source: 'https://www.circle.com/blog/how-the-usdc-reserve-is-structured-and-managed' },
          { text: 'Custodied at BNY Mellon (largest global custodian)', source: 'https://www.circle.com/pressroom/circle-selects-bny-mellon-to-custody-usdc-reserves' },
          { text: 'On track for GENIUS Act compliance — Circle received conditional OCC charter approval', source: 'https://www.circle.com/pressroom/circle-receives-conditional-approval-from-occ-for-national-trust-charter' },
          { text: 'Slight concentration risk: SVB incident (Mar 2023) showed single-bank exposure danger', source: 'https://www.cnbc.com/2023/03/11/stablecoin-usdc-breaks-dollar-peg-after-firm-reveals-it-has-3point3-billion-in-svb-exposure.html' },
        ],
      },
      transparency: {
        score: 16,
        max: 20,
        details: [
          { text: 'Monthly attestation by Deloitte (Big Four)', source: 'https://www.circle.com/transparency' },
          { text: 'Full asset breakdown published monthly', source: 'https://www.circle.com/blog/new-levels-of-detail-in-the-monthly-usdc-attestation' },
          { text: 'No real-time on-chain proof of reserve yet' },
          { text: 'Most detailed public reports of any major stablecoin', source: 'https://www.circle.com/blog/circle-continues-to-enhance-details-in-the-usdc-reserve-attestations' },
        ],
      },
      peg: {
        score: 15,
        max: 20,
        details: [
          { text: 'Generally tight peg (<0.1% deviation)', source: 'https://coinmarketcap.com/currencies/usd-coin/' },
          { text: 'Depegged to $0.87 during SVB crisis (Mar 2023) — worst event', source: 'https://decrypt.co/123211/usdc-stablecoin-depegs-90-cents-circle-exposure-silicon-valley-bank' },
          { text: 'Deep DEX liquidity across Curve and Uniswap pools', source: 'https://defillama.com/' },
          { text: 'Listed on 200+ centralized exchanges', source: 'https://coinranking.com/coin/aKzUVe4Hh_CON+usdc-usdc/exchanges' },
        ],
      },
      regulatory: {
        score: 14,
        max: 15,
        details: [
          { text: 'First major stablecoin to achieve MiCA compliance in EU', source: 'https://www.circle.com/pressroom/circle-is-first-global-stablecoin-issuer-to-comply-with-mica-eus-landmark-crypto-law' },
          { text: 'State money transmitter licenses across US', source: 'https://www.circle.com/legal/licenses' },
          { text: 'Conditional OCC national trust charter approval', source: 'https://www.circle.com/pressroom/circle-receives-conditional-approval-from-occ-for-national-trust-charter' },
          { text: 'Active freeze/blacklist compliance — 372 addresses, ~$109M frozen', source: 'https://blog.amlbot.com/stablecoin-freezes-2023-2025-a-data-backed-analysis-of-usdt-vs-usdc-by-amlbot/' },
        ],
      },
      smartContract: {
        score: 7,
        max: 10,
        details: [
          { text: 'Security audits from Halborn and others', source: 'https://www.circle.com/blog/announcing-usdc-v2-2' },
          { text: 'Upgradeable proxy contracts (issuer can change logic)', source: 'https://www.circle.com/legal/usdc-risk-factors' },
          { text: 'Freeze/blacklist function active — ~$109M frozen total', source: 'https://blog.amlbot.com/stablecoin-freezes-2023-2025-a-data-backed-analysis-of-usdt-vs-usdc-by-amlbot/' },
          { text: 'Native CCTP for cross-chain transfers (no bridge risk)', source: 'https://www.circle.com/cross-chain-transfer-protocol' },
        ],
      },
      adoption: {
        score: 10,
        max: 10,
        details: [
          { text: 'Available in 180+ countries with 1,100+ enterprise partners', source: 'https://www.circle.com/reports/state-of-the-usdc-economy/how-usdc-is-used-today' },
          { text: 'Deeply integrated across DeFi — Aave, Compound, Curve, Uniswap', source: 'https://www.circle.com/reports/state-of-the-usdc-economy/how-usdc-is-used-today' },
          { text: 'Native on 28+ chains', source: 'https://www.circle.com/multi-chain-usdc' },
          { text: 'Preferred stablecoin for regulated/institutional use in US and EU', source: 'https://www.circle.com/reports/state-of-the-usdc-economy' },
        ],
      },
    },
    totalScore: 84,
    grade: 'A-',
    summary: 'The most transparent and well-regulated major stablecoin. Strong reserves, Big Four audits, and MiCA compliance. SVB depeg was the main blemish.',
    lastUpdated: '2026-03-11',
  },
  {
    id: 'usdt',
    name: 'Tether',
    ticker: 'USDT',
    issuer: 'Tether Limited',
    type: 'fiat-backed',
    tier: 1,
    marketCap: '$183B',
    marketCapUsd: 183e9,
    chains: ['Tron', 'Ethereum', 'Solana', 'BNB Chain', 'Arbitrum', 'Avalanche'],
    website: 'https://tether.to',
    pillars: {
      reserve: {
        score: 12,
        max: 25,
        details: [
          { text: 'Majority in US Treasuries (~$102B in Q3 2024), but also holds Bitcoin, gold, and secured loans', source: 'https://tether.io/news/tether-hits-7-7-billion-2024-nine-month-profits-102-5-billion-in-u-s-treasury-holdings-almost-120-billion-usd%E2%82%AE-circulation-and-an-over-6-billion-reserve-buffer-in-q3-2024-attestation/' },
          { text: 'Non-traditional reserve assets (BTC, gold, precious metals) add volatility risk', source: 'https://tether.to/en/transparency/' },
          { text: 'Custodian details not fully disclosed', source: 'https://www.coindesk.com/policy/2021/01/26/what-tether-means-when-it-says-its-regulated' },
          { text: 'Moving to US jurisdiction may improve reserve structure', source: 'https://tether.io/news/tether-licensed-in-el-salvador-strengthening-focus-on-emerging-markets-and-innovation/' },
        ],
      },
      transparency: {
        score: 9,
        max: 20,
        details: [
          { text: 'Quarterly attestation by BDO Italia — not a full audit', source: 'https://tether.io/news/tether-announces-alignment-with-top-five-accounting-firm-and-confirms-attestations-will-now-be-completed-by-bdo-italia/' },
          { text: 'Attestations are point-in-time snapshots, not comprehensive audits', source: 'https://www.dlnews.com/articles/markets/tether-ceo-just-told-us-why-the-big-4-wont-audit-its-books/' },
          { text: 'Has not committed to a full Big Four audit despite $10B+ annual profit', source: 'https://www.blakeoliver.com/blog/tethers-109-billion-question-wheres-the-audit' },
          { text: 'Summary-level reserve breakdown only — less detail than Circle', source: 'https://tether.to/en/transparency/' },
        ],
      },
      peg: {
        score: 18,
        max: 20,
        details: [
          { text: 'Remarkably stable peg despite FUD — rarely deviates >0.2%', source: 'https://coinmarketcap.com/currencies/tether/' },
          { text: 'Brief depeg to ~$0.95 in May 2022 during UST contagion', source: 'https://cryptobriefing.com/tethers-usdt-stablecoin-loses-peg-amid-ust-disaster/' },
          { text: 'Most liquid stablecoin globally — dominant on CEXs and DEXs', source: 'https://www.coingecko.com/en/coins/tether' },
          { text: 'Listed on virtually every exchange globally', source: 'https://coinmarketcap.com/currencies/tether/' },
        ],
      },
      regulatory: {
        score: 2,
        max: 15,
        details: [
          { text: 'Not MiCA-compliant — delisted from EU exchanges in 2025', source: 'https://www.theblock.co/post/344182/binance-delist-tether-other-non-mica-compliant-stablecoins' },
          { text: 'Licensed in El Salvador — offshore jurisdiction', source: 'https://tether.io/news/tether-licensed-in-el-salvador-strengthening-focus-on-emerging-markets-and-innovation/' },
          { text: 'Under DOJ investigation for sanctions violations (Oct 2024 reports)', source: 'https://fortune.com/crypto/2024/10/25/tether-department-justice-probe-money-laundering-sanctions-binance-crypto/' },
          { text: 'Active law enforcement cooperation — 275+ agencies, 59 countries, $3.3B+ frozen', source: 'https://tether.to/en/transparency/' },
        ],
      },
      smartContract: {
        score: 7,
        max: 10,
        details: [
          { text: 'OpenZeppelin audit found no critical issues', source: 'https://blog.openzeppelin.com/tether-token-audit-438d561a380' },
          { text: 'Upgradeable contracts with centralized control', source: 'https://blog.openzeppelin.com/tether-token-audit-438d561a380' },
          { text: 'Aggressive freeze/blacklist usage — $1.75B+ frozen on Tron alone', source: 'https://blog.amlbot.com/stablecoin-freezes-2023-2025-a-data-backed-analysis-of-usdt-vs-usdc-by-amlbot/' },
          { text: 'Single-owner mint/burn model raises concentration concerns', source: 'https://blog.openzeppelin.com/tether-token-audit-438d561a380' },
        ],
      },
      adoption: {
        score: 10,
        max: 10,
        details: [
          { text: 'Dominant stablecoin in emerging markets (LatAm, Africa, SEA)', source: 'https://themerkle.com/stablecoin-adoption-surges-in-emerging-markets-tron-leads-the-way/' },
          { text: '~70% of stablecoin market cap, ~83% of stablecoin trading volume', source: 'https://blockapps.net/blog/understanding-tethers-market-cap-the-role-of-usdt-in-the-crypto-ecosystem/' },
          { text: 'De facto dollar substitute in countries with capital controls' },
          { text: 'Native on 12+ chains', source: 'https://tether.to/en/supported-protocols/' },
        ],
      },
    },
    totalScore: 58,
    grade: 'C',
    summary: 'The world\'s most used stablecoin, but transparency and regulatory gaps keep the score low. Users trust it with their money — auditors haven\'t verified why they should.',
    lastUpdated: '2026-03-11',
  },
  {
    id: 'usds',
    name: 'USDS',
    ticker: 'USDS',
    issuer: 'Sky (f.k.a. MakerDAO)',
    type: 'crypto-collateralized',
    tier: 1,
    marketCap: '$8B',
    marketCapUsd: 8e9,
    chains: ['Ethereum', 'Base'],
    website: 'https://sky.money',
    pillars: {
      reserve: {
        score: 14,
        max: 25,
        details: [
          { text: 'Overcollateralized (>150%) — crypto assets + real-world assets (RWA)', source: 'https://makerdao.com/en/whitepaper/' },
          { text: 'RWA exposure includes tokenized T-bills via BlackRock BUIDL and others', source: 'https://www.coindesk.com/business/2025/03/18/blackrock-s-buidl-superstate-and-centrifuge-win-spark-s-usd1b-tokenized-asset-windfall-report' },
          { text: 'Crypto collateral (ETH, stETH) adds volatility but is transparent on-chain', source: 'https://github.com/makerdao/dss' },
          { text: 'Automated liquidation system reduces insolvency risk', source: 'https://makerdao.com/en/whitepaper/' },
        ],
      },
      transparency: {
        score: 14,
        max: 20,
        details: [
          { text: 'Fully on-chain — all collateral positions verifiable in real-time', source: 'https://github.com/makerdao/dss' },
          { text: 'Most transparent reserve structure in the industry' },
          { text: 'All governance decisions public and on-chain', source: 'https://vote.makerdao.com/' },
          { text: 'No off-chain trust required for crypto collateral (RWA allocations require it)', source: 'https://makerdao.com/en/whitepaper/' },
        ],
      },
      peg: {
        score: 12,
        max: 20,
        details: [
          { text: 'Generally stable peg with occasional minor deviations' },
          { text: 'Depegged during SVB crisis due to USDC exposure in PSM', source: 'https://www.federalreserve.gov/econres/notes/feds-notes/in-the-shadow-of-bank-run-lessons-from-the-silicon-valley-bank-failure-and-its-impact-on-stablecoins-20251217.html' },
          { text: 'Good DEX liquidity but not as deep as USDT/USDC' },
          { text: 'Listed on 30+ exchanges' },
        ],
      },
      regulatory: {
        score: 3,
        max: 15,
        details: [
          { text: 'Decentralized governance — unclear how GENIUS Act applies' },
          { text: 'No single jurisdiction or license' },
          { text: 'DAO structure may not fit regulatory frameworks designed for corporate issuers' },
          { text: 'No sanctions compliance mechanism (by design)' },
        ],
      },
      smartContract: {
        score: 10,
        max: 10,
        details: [
          { text: 'Extensively audited by multiple top firms over 5+ years' },
          { text: 'Battle-tested since 2017 (single-collateral DAI), multi-collateral since 2019', source: 'https://en.wikipedia.org/wiki/Dai_(cryptocurrency)' },
          { text: 'No centralized freeze function — censorship resistant' },
          { text: 'Complex smart contract system increases attack surface but governance can change parameters', source: 'https://github.com/makerdao/dss' },
        ],
      },
      adoption: {
        score: 7,
        max: 10,
        details: [
          { text: 'Deep DeFi integration (lending, DEXs, yield protocols)' },
          { text: 'Primarily Ethereum-native, limited cross-chain presence' },
          { text: 'DAI → USDS migration still in progress', source: 'https://app.sky.money/?widget=upgrade' },
          { text: 'Active governance community', source: 'https://vote.makerdao.com/' },
        ],
      },
    },
    totalScore: 60,
    grade: 'C+',
    summary: 'The most transparent stablecoin thanks to fully on-chain collateral. Strong DeFi roots but unclear regulatory future under the GENIUS Act.',
    lastUpdated: '2026-03-11',
  },
  {
    id: 'usde',
    name: 'USDe',
    ticker: 'USDe',
    issuer: 'Ethena Labs',
    type: 'synthetic',
    tier: 1,
    marketCap: '$6B',
    marketCapUsd: 6e9,
    chains: ['Ethereum', 'Arbitrum', 'BNB Chain'],
    website: 'https://ethena.fi',
    pillars: {
      reserve: {
        score: 8,
        max: 25,
        details: [
          { text: 'No traditional reserves — uses delta-neutral hedging strategy', source: 'https://docs.ethena.fi/solution-overview/usde-overview' },
          { text: 'Holds stETH/ETH + short perpetual futures to maintain $1 value', source: 'https://docs.ethena.fi/solution-overview/usde-overview/delta-neutral-stability' },
          { text: 'Counterparty risk: depends on exchanges (Binance, Bybit) not going down' },
          { text: 'Negative funding rates could drain reserves over time', source: 'https://docs.ethena.fi/solution-overview/risks/funding-risk' },
        ],
      },
      transparency: {
        score: 10,
        max: 20,
        details: [
          { text: 'On-chain transparency dashboard with position data', source: 'https://app.ethena.fi/dashboards/transparency' },
          { text: 'Reserve fund (insurance) details published', source: 'https://docs.ethena.fi/solution-design/reserve-fund' },
          { text: 'Custodied via institutional platforms (Copper, Ceffu, Cobo)', source: 'https://docs.ethena.fi/backing-custody-and-security/overview/off-exchange-settlement-in-detail' },
          { text: 'Novel model means less audit precedent exists' },
        ],
      },
      peg: {
        score: 13,
        max: 20,
        details: [
          { text: 'Generally held peg since launch' },
          { text: 'Flash depeg event in Oct 2025 raised concerns' },
          { text: 'Redemption via sUSDe unstaking has a cooldown period' },
          { text: 'Growing but still limited DEX liquidity compared to majors' },
        ],
      },
      regulatory: {
        score: 3,
        max: 15,
        details: [
          { text: 'Unclear regulatory classification — not fiat-backed, not clearly crypto-collateralized' },
          { text: 'May not qualify as "stablecoin" under GENIUS Act' },
          { text: 'No jurisdiction-specific licenses' },
          { text: 'Derivatives-based model may attract securities regulation' },
        ],
      },
      smartContract: {
        score: 4,
        max: 10,
        details: [
          { text: 'Audited by reputable firms', source: 'https://docs.ethena.fi/resources/audits' },
          { text: 'Relatively new contracts (less battle-testing)' },
          { text: 'Centralized admin functions for rebalancing' },
          { text: 'No freeze function on USDe itself' },
        ],
      },
      adoption: {
        score: 5,
        max: 10,
        details: [
          { text: 'Growing DeFi presence, especially in yield protocols' },
          { text: 'sUSDe (staked version) offers yield — drives adoption' },
          { text: 'Limited geographic adoption outside DeFi-native users' },
          { text: 'Present on 3 major chains' },
        ],
      },
    },
    totalScore: 43,
    grade: 'D',
    summary: 'A novel synthetic stablecoin that works until it doesn\'t. High yield attracts capital, but the delta-neutral model has exchange counterparty risk that traditional stablecoins don\'t.',
    lastUpdated: '2026-03-11',
  },
  {
    id: 'dai',
    name: 'DAI',
    ticker: 'DAI',
    issuer: 'Sky (f.k.a. MakerDAO)',
    type: 'crypto-collateralized',
    tier: 1,
    marketCap: '$5B',
    marketCapUsd: 5e9,
    chains: ['Ethereum', 'Arbitrum', 'Optimism', 'Polygon'],
    website: 'https://sky.money',
    pillars: {
      reserve: {
        score: 14,
        max: 25,
        details: [
          { text: 'Same overcollateralized model as USDS', source: 'https://makerdao.com/en/whitepaper/' },
          { text: 'Legacy version — gradually migrating to USDS', source: 'https://app.sky.money/?widget=upgrade' },
          { text: 'Proven track record since 2017 (single-collateral), 2019 (multi-collateral)', source: 'https://en.wikipedia.org/wiki/Dai_(cryptocurrency)' },
          { text: 'PSM (Peg Stability Module) provides USDC backstop', source: 'https://github.com/makerdao/dss-psm' },
        ],
      },
      transparency: {
        score: 14,
        max: 20,
        details: [
          { text: 'Fully on-chain collateral — anyone can verify', source: 'https://github.com/makerdao/dss' },
          { text: 'All governance proposals and votes are public', source: 'https://vote.makerdao.com/' },
          { text: 'Real-time collateralization ratio visible on-chain' },
          { text: 'One of the most audited DeFi protocols in history' },
        ],
      },
      peg: {
        score: 13,
        max: 20,
        details: [
          { text: 'Long track record of peg stability' },
          { text: 'SVB-related depeg via USDC PSM exposure (Mar 2023)', source: 'https://www.federalreserve.gov/econres/notes/feds-notes/in-the-shadow-of-bank-run-lessons-from-the-silicon-valley-bank-failure-and-its-impact-on-stablecoins-20251217.html' },
          { text: 'Deep DEX liquidity (Curve, Uniswap)' },
          { text: 'Listed on most major exchanges' },
        ],
      },
      regulatory: {
        score: 3,
        max: 15,
        details: [
          { text: 'Same DAO governance challenges as USDS' },
          { text: 'No licenses or jurisdiction' },
          { text: 'Being phased out in favor of USDS', source: 'https://blockworks.co/news/sky-dao-adoption' },
          { text: 'Governance attack surface — MKR holders can change parameters', source: 'https://chainflow.io/makerdao-governance-attack/' },
        ],
      },
      smartContract: {
        score: 10,
        max: 10,
        details: [
          { text: 'Most battle-tested stablecoin smart contracts (since 2017)', source: 'https://en.wikipedia.org/wiki/Dai_(cryptocurrency)' },
          { text: 'No centralized freeze function' },
          { text: 'Multiple audits from Trail of Bits, OpenZeppelin, others' },
          { text: 'Complex but proven liquidation mechanism' },
        ],
      },
      adoption: {
        score: 7,
        max: 10,
        details: [
          { text: 'Established DeFi building block' },
          { text: 'Declining as users migrate to USDS', source: 'https://blockworks.co/news/sky-dao-adoption' },
          { text: 'Multi-chain but primarily Ethereum' },
          { text: 'Used across lending, DEXs, and yield protocols' },
        ],
      },
    },
    totalScore: 61,
    grade: 'C+',
    summary: 'The original decentralized stablecoin with the longest track record. Being phased out in favor of USDS, but still one of the most transparent and battle-tested options.',
    lastUpdated: '2026-03-11',
  },
  {
    id: 'fdusd',
    name: 'First Digital USD',
    ticker: 'FDUSD',
    issuer: 'First Digital Labs',
    type: 'fiat-backed',
    tier: 1,
    marketCap: '$2B',
    marketCapUsd: 2e9,
    chains: ['Ethereum', 'BNB Chain'],
    website: 'https://firstdigitallabs.com',
    pillars: {
      reserve: {
        score: 16,
        max: 25,
        details: [
          { text: 'Reserves in US Treasury bills and cash equivalents', source: 'https://www.firstdigitallabs.com/fdusd' },
          { text: 'Custodied at First Digital Trust (Hong Kong)', source: 'https://www.firstdigitallabs.com/fdusd' },
          { text: 'Clean reserve composition but limited transparency on custodian details' },
          { text: 'Not yet GENIUS Act compliant' },
        ],
      },
      transparency: {
        score: 10,
        max: 20,
        details: [
          { text: 'Monthly attestation by Prescient Assurance', source: 'https://www.firstdigitallabs.com/transparency' },
          { text: 'Not audited by Big Four' },
          { text: 'Moderate detail level in public reports' },
          { text: 'No on-chain proof of reserve' },
        ],
      },
      peg: {
        score: 13,
        max: 20,
        details: [
          { text: 'Generally stable peg since launch' },
          { text: 'Lower DEX liquidity than top 3 stablecoins' },
          { text: 'Strong CEX presence (Binance is primary venue)' },
          { text: 'Limited secondary market depth outside Binance' },
        ],
      },
      regulatory: {
        score: 4,
        max: 15,
        details: [
          { text: 'Licensed under Hong Kong trust company framework' },
          { text: 'Not MiCA-compliant' },
          { text: 'No US regulatory status' },
          { text: 'Limited jurisdictional footprint' },
        ],
      },
      smartContract: {
        score: 5,
        max: 10,
        details: [
          { text: 'Audited smart contracts' },
          { text: 'Standard upgradeable design' },
          { text: 'Freeze functionality available' },
          { text: 'Relatively newer contracts (less battle-testing)' },
        ],
      },
      adoption: {
        score: 4,
        max: 10,
        details: [
          { text: 'Primarily used on Binance ecosystem' },
          { text: 'Limited geographic distribution — concentrated in Asia' },
          { text: 'Moderate DeFi integration' },
          { text: 'Only on 2 chains' },
        ],
      },
    },
    totalScore: 52,
    grade: 'C-',
    summary: 'A clean fiat-backed stablecoin with decent reserves but limited transparency and narrow adoption. Heavily dependent on the Binance ecosystem.',
    lastUpdated: '2026-03-11',
  },
  {
    id: 'pyusd',
    name: 'PayPal USD',
    ticker: 'PYUSD',
    issuer: 'Paxos (for PayPal)',
    type: 'fiat-backed',
    tier: 1,
    marketCap: '$500M',
    marketCapUsd: 500e6,
    chains: ['Ethereum', 'Solana'],
    website: 'https://www.paypal.com/pyusd',
    pillars: {
      reserve: {
        score: 20,
        max: 25,
        details: [
          { text: 'Reserves 100% in cash equivalents — US Treasuries, cash deposits, money market funds', source: 'https://www.paxos.com/pyusd' },
          { text: 'Issued by Paxos, regulated by NYDFS (one of strictest US regulators)', source: 'https://www.paxos.com/pyusd' },
          { text: 'Clean reserve composition — no crypto, no exotic assets' },
          { text: 'Strong GENIUS Act compliance position' },
        ],
      },
      transparency: {
        score: 15,
        max: 20,
        details: [
          { text: 'Monthly attestation by KPMG LLP (Big Four)', source: 'https://www.paxos.com/pyusd-transparency' },
          { text: 'Paxos publishes reserve breakdown', source: 'https://www.paxos.com/pyusd-transparency' },
          { text: 'KPMG is Big Four — strong attestation credibility' },
          { text: 'No on-chain proof of reserve' },
        ],
      },
      peg: {
        score: 14,
        max: 20,
        details: [
          { text: 'Stable peg since launch' },
          { text: 'Limited DEX liquidity relative to market cap' },
          { text: 'PayPal integration provides fiat on/off ramp liquidity' },
          { text: 'Listed on fewer exchanges than major stablecoins' },
        ],
      },
      regulatory: {
        score: 10,
        max: 15,
        details: [
          { text: 'Paxos is NYDFS-regulated — highest US state regulatory standard' },
          { text: 'Strong GENIUS Act compliance position' },
          { text: 'PayPal regulated as money transmitter in all 50 states', source: 'https://www.paypal.com/us/webapps/mpp/licenses' },
          { text: 'Not yet MiCA-authorized' },
        ],
      },
      smartContract: {
        score: 6,
        max: 10,
        details: [
          { text: 'Audited contracts' },
          { text: 'Standard upgradeable design' },
          { text: 'Freeze functionality available' },
          { text: 'Paxos has track record from USDP' },
        ],
      },
      adoption: {
        score: 4,
        max: 10,
        details: [
          { text: 'PayPal distribution channel is massive but adoption has been slow' },
          { text: 'Limited DeFi integration' },
          { text: 'Only on 2 chains (Ethereum, Solana)', source: 'https://newsroom.paypal-corp.com/2024-05-29-PayPal-USD-Stablecoin-Now-Available-on-Solana-Blockchain,-Providing-Faster,-Cheaper-Transactions-for-Consumers' },
          { text: 'Narrow geographic adoption — primarily US' },
        ],
      },
    },
    totalScore: 69,
    grade: 'B-',
    summary: 'Excellent reserves and regulation with Big Four (KPMG) attestation. Held back by low adoption and limited DeFi presence. PayPal distribution is an untapped advantage.',
    lastUpdated: '2026-03-11',
  },
  {
    id: 'usd1',
    name: 'USD1',
    ticker: 'USD1',
    issuer: 'World Liberty Financial (WLFI)',
    type: 'fiat-backed',
    tier: 1,
    marketCap: '$4.7B',
    marketCapUsd: 4.7e9,
    chains: ['Ethereum', 'BNB Chain'],
    website: 'https://worldlibertyfinancial.com',
    pillars: {
      reserve: {
        score: 17,
        max: 25,
        details: [
          { text: 'Reserves in US Treasuries and cash equivalents', source: 'https://www.bitgo.com/usd1' },
          { text: 'Custodied by BitGo (institutional-grade custody)', source: 'https://www.bitgo.com/usd1' },
          { text: 'Relatively new — limited track record of reserve management' },
          { text: 'Political ties to Trump family raise governance questions', source: 'https://en.wikipedia.org/wiki/World_Liberty_Financial' },
        ],
      },
      transparency: {
        score: 5,
        max: 20,
        details: [
          { text: 'Real-time reserve feed via Chainlink Proof of Reserve (updated every second)' },
          { text: 'Limited published reports beyond PoR feed' },
          { text: 'New issuer — attestation track record not established' },
          { text: 'PoR is strong but only covers total reserve balance, not composition breakdown' },
        ],
      },
      peg: {
        score: 10,
        max: 20,
        details: [
          { text: 'Too new for meaningful peg stability history' },
          { text: 'Growing but still limited liquidity' },
          { text: 'Listed on select exchanges' },
          { text: 'Rapid growth ($0 to $4.7B quickly) untested under stress' },
        ],
      },
      regulatory: {
        score: 2,
        max: 15,
        details: [
          { text: 'No specific regulatory licenses disclosed' },
          { text: 'Political connections create unique regulatory dynamics' },
          { text: 'GENIUS Act compliance status unclear' },
          { text: 'Potential conflicts of interest with US policy makers' },
        ],
      },
      smartContract: {
        score: 4,
        max: 10,
        details: [
          { text: 'Initial security audits completed' },
          { text: 'Very new contracts — minimal battle-testing' },
          { text: 'Standard centralized controls' },
          { text: 'Chainlink PoR integration is a positive' },
        ],
      },
      adoption: {
        score: 4,
        max: 10,
        details: [
          { text: 'Rapid market cap growth but concentrated holders' },
          { text: 'Limited DeFi integration so far' },
          { text: 'Only on 2 chains' },
          { text: 'Geographic adoption data too limited to assess' },
        ],
      },
    },
    totalScore: 42,
    grade: 'D',
    summary: 'Fast-growing with Chainlink PoR integration, but too new to have a real track record. Political ties and lack of regulatory clarity are concerns.',
    lastUpdated: '2026-03-11',
  },

  {
    id: 'rlusd',
    name: 'Ripple USD',
    ticker: 'RLUSD',
    issuer: 'Ripple (Standard Custody & Trust)',
    type: 'fiat-backed',
    tier: 1,
    marketCap: '$1.6B',
    marketCapUsd: 1.6e9,
    chains: ['Ethereum', 'XRP Ledger'],
    website: 'https://ripple.com/solutions/stablecoin/',
    pillars: {
      reserve: {
        score: 21,
        max: 25,
        details: [
          { text: 'Backed 1:1 by USD deposits, US Treasuries, and government money-market funds', source: 'https://ripple.com/solutions/stablecoin/' },
          { text: 'Reserves held in segregated accounts at BNY Mellon', source: 'https://www.bny.com/corporate/global/en/about-us/newsroom/press-release/ripple-selects-bny-to-custody-ripple-usd-reserves.html' },
          { text: 'NYDFS-regulated reserve requirements (June 2022 guidance)', source: 'https://ripple.com/solutions/stablecoin/transparency/' },
          { text: 'No exposure to crypto assets or exotic collateral' },
        ],
      },
      transparency: {
        score: 15,
        max: 20,
        details: [
          { text: 'Monthly attestation reports by Deloitte & Touche LLP (transitioned from BPM in Aug 2025)', source: 'https://ripple.com/solutions/stablecoin/transparency/' },
          { text: 'Published within 30 days of month-end per AICPA standards', source: 'https://ripple.com/solutions/stablecoin/transparency/' },
          { text: 'Public transparency page with downloadable reports', source: 'https://ripple.com/solutions/stablecoin/transparency/' },
          { text: 'Reports attest circulating supply vs. reserve composition and value' },
        ],
      },
      peg: {
        score: 14,
        max: 20,
        details: [
          { text: 'Tight trading range $0.9998-$1.002 since launch', source: 'https://coinmarketcap.com/currencies/ripple-usd/' },
          { text: 'Only 15 months of history (launched Dec 17, 2024)', source: 'https://fortune.com/crypto/2024/12/16/ripple-announces-launch-rlusd-stablecoin/' },
          { text: 'Minor volatility in early days due to thin liquidity' },
          { text: 'No significant depeg events' },
        ],
      },
      regulatory: {
        score: 10,
        max: 15,
        details: [
          { text: 'Approved by NYDFS (Dec 10, 2024)', source: 'https://finance.yahoo.com/news/ripple-secures-nydfs-approval-rlusd-065226515.html' },
          { text: 'Issued by Standard Custody & Trust — NYDFS-chartered trust company', source: 'https://www.businesswire.com/news/home/20241216911945/en/Raising-the-Standard-for-Stablecoins-Ripple-USD-Launches-Globally-with-Unmatched-Utility-Experience-and-Compliance' },
          { text: 'Expanding to Japan via SBI Holdings partnership', source: 'https://ripple.com/ripple-press/ripple-and-sbi-plan-to-distribute-rlusd-in-japan/' },
          { text: 'One of the most regulated stablecoins at launch' },
        ],
      },
      smartContract: {
        score: 3,
        max: 10,
        details: [
          { text: 'ERC-20 with ERC-2612 Permit extension on Ethereum', source: 'https://github.com/ripple/RLUSD-Implementation/blob/main/doc/rlusd-ethereum-design.md' },
          { text: 'Built on OpenZeppelin contracts (UUPS proxy pattern)', source: 'https://github.com/ripple/RLUSD-Implementation' },
          { text: 'Open-source code on GitHub', source: 'https://github.com/ripple/RLUSD-Implementation' },
          { text: 'No published independent smart contract security audit — notable gap' },
        ],
      },
      adoption: {
        score: 5,
        max: 10,
        details: [
          { text: '$1.6B market cap — fast growth from zero in 15 months', source: 'https://coinmarketcap.com/currencies/ripple-usd/' },
          { text: 'Only on 2 chains (Ethereum, XRP Ledger) — L2 expansion planned' },
          { text: 'Listed on Binance, Bitstamp, Kraken, Bybit, and others', source: 'https://finance.yahoo.com/news/binance-exchange-lists-ripple-rlusd-123441948.html' },
          { text: 'DeFi integration still limited' },
        ],
      },
    },
    totalScore: 68,
    grade: 'B-',
    summary: 'Strong regulatory foundation with NYDFS approval and BNY Mellon custody. Clean reserves and Deloitte attestations. Main weaknesses: no published smart contract audit and only 15 months of track record.',
    lastUpdated: '2026-03-11',
  },

  // --- TIER 2 RATINGS ---

  {
    id: 'tusd',
    name: 'TrueUSD',
    ticker: 'TUSD',
    issuer: 'Techteryx',
    type: 'fiat-backed',
    tier: 2,
    marketCap: '$500M',
    marketCapUsd: 500e6,
    chains: ['Ethereum', 'Tron', 'BNB Chain'],
    website: 'https://trueusd.com',
    pillars: {
      reserve: {
        score: 0,
        max: 25,
        details: [
          { text: '$456M stuck in illiquid investments' },
          { text: 'Effectively bankrupt — reserves cannot cover all outstanding tokens' },
          { text: 'Previous management misappropriated reserve funds' },
          { text: 'No credible path to full reserve restoration' },
        ],
      },
      transparency: {
        score: 0,
        max: 20,
        details: [
          { text: 'Attestation reports halted' },
          { text: 'No current audit or attestation from any firm' },
          { text: 'Previous Chainlink PoR showed discrepancies' },
          { text: 'Near-zero transparency on current reserve state' },
        ],
      },
      peg: {
        score: 2,
        max: 20,
        details: [
          { text: 'Frequent depegs — traded below $0.98 multiple times' },
          { text: 'Rapidly declining liquidity on all venues' },
          { text: 'Delisted from major exchanges', source: 'https://cointelegraph.com/news/binance-trueusd-stablecoin-trading-pair-delisting' },
          { text: 'Active trading volume approaching zero' },
        ],
      },
      regulatory: {
        score: 0,
        max: 15,
        details: [
          { text: 'No active regulatory licenses' },
          { text: 'Under investigation in multiple jurisdictions' },
          { text: 'Techteryx entity structure is opaque' },
          { text: 'Complete regulatory failure' },
        ],
      },
      smartContract: {
        score: 5,
        max: 10,
        details: [
          { text: 'Contracts still functional but unmaintained' },
          { text: 'Freeze function exists' },
          { text: 'No recent security updates' },
          { text: 'Legacy code from earlier management' },
        ],
      },
      adoption: {
        score: 2,
        max: 10,
        details: [
          { text: 'Rapidly declining usage across all metrics' },
          { text: 'Being dropped by exchanges and DeFi protocols' },
          { text: 'Minimal geographic adoption remaining' },
          { text: 'Included as a cautionary example' },
        ],
      },
    },
    totalScore: 9,
    grade: 'F',
    summary: 'Effectively bankrupt. Reserve mismanagement, halted audits, and exchange delistings make this a textbook example of stablecoin failure. Avoid.',
    lastUpdated: '2026-03-11',
  },
  {
    id: 'usdd',
    name: 'USDD',
    ticker: 'USDD',
    issuer: 'Tron DAO Reserve',
    type: 'algorithmic',
    tier: 2,
    marketCap: '$1.1B',
    marketCapUsd: 1.1e9,
    chains: ['Tron', 'Ethereum', 'BNB Chain'],
    website: 'https://usdd.io',
    pillars: {
      reserve: {
        score: 4,
        max: 25,
        details: [
          { text: 'Claims 230%+ collateralization but independent analysis found only ~53%' },
          { text: 'Collateral includes TRX and BTC — correlated to crypto market' },
          { text: 'Reserve claims are unverified by independent auditors' },
          { text: 'Algorithmic elements add depegging risk (same model family as UST)', source: 'https://docs.usdd.network/tdr/tdr-tron-dao-reserve' },
        ],
      },
      transparency: {
        score: 3,
        max: 20,
        details: [
          { text: 'Reserve dashboard exists but data accuracy disputed' },
          { text: 'No independent attestation or audit' },
          { text: 'Methodology for collateral valuation is unclear' },
          { text: 'Significant discrepancy between claimed and verified reserves' },
        ],
      },
      peg: {
        score: 9,
        max: 20,
        details: [
          { text: 'Multiple minor depegs in history' },
          { text: 'Peg maintained through market intervention rather than robust mechanism' },
          { text: 'Moderate DEX liquidity on Tron' },
          { text: 'Limited CEX presence outside Tron ecosystem' },
        ],
      },
      regulatory: {
        score: 0,
        max: 15,
        details: [
          { text: 'No regulatory licenses in any jurisdiction' },
          { text: 'Justin Sun (associated founder) faces legal issues in multiple jurisdictions' },
          { text: 'DAO structure provides no regulatory accountability' },
          { text: 'Zero compliance infrastructure' },
        ],
      },
      smartContract: {
        score: 4,
        max: 10,
        details: [
          { text: 'Basic smart contract audits' },
          { text: 'Tron-native — different risk profile than EVM chains' },
          { text: 'Centralized controls via Tron DAO Reserve' },
          { text: 'Limited independent security review' },
        ],
      },
      adoption: {
        score: 4,
        max: 10,
        details: [
          { text: 'Used primarily within Tron ecosystem' },
          { text: 'Limited DeFi integration outside Tron' },
          { text: 'Narrow geographic distribution' },
          { text: 'Declining market confidence' },
        ],
      },
    },
    totalScore: 24,
    grade: 'F',
    summary: 'Unverified reserve claims, disputed collateral ratios, and no regulatory standing. The algorithmic component carries UST-style risk. Proceed with extreme caution.',
    lastUpdated: '2026-03-11',
  },
  {
    id: 'frax',
    name: 'Frax',
    ticker: 'FRAX',
    issuer: 'Frax Finance',
    type: 'crypto-collateralized',
    tier: 2,
    marketCap: '$350M',
    marketCapUsd: 350e6,
    chains: ['Ethereum', 'Arbitrum', 'Optimism'],
    website: 'https://frax.finance',
    pillars: {
      reserve: {
        score: 14,
        max: 25,
        details: [
          { text: 'Transitioned from fractional-algorithmic to fully collateralized (v3)', source: 'https://docs.frax.finance/frax-v3-100-cr-and-more/overview' },
          { text: 'sFRAX backed by US Treasuries via FinresPBC', source: 'https://docs.frax.finance/frax-v3-100-cr-and-more/sfrax' },
          { text: 'FXS token backing adds crypto volatility risk' },
          { text: 'Improving reserve quality over time' },
        ],
      },
      transparency: {
        score: 13,
        max: 20,
        details: [
          { text: 'On-chain collateral positions visible' },
          { text: 'Active governance discussions are public' },
          { text: 'No traditional attestation reports' },
          { text: 'Community can verify most positions directly' },
        ],
      },
      peg: {
        score: 10,
        max: 20,
        details: [
          { text: 'Improved peg stability after v3 transition' },
          { text: 'Historical depeg events during fractional era' },
          { text: 'Moderate DEX liquidity' },
          { text: 'Limited CEX listings' },
        ],
      },
      regulatory: {
        score: 3,
        max: 15,
        details: [
          { text: 'No regulatory licenses' },
          { text: 'Decentralized governance structure' },
          { text: 'GENIUS Act classification unclear' },
          { text: 'No compliance infrastructure' },
        ],
      },
      smartContract: {
        score: 9,
        max: 10,
        details: [
          { text: 'Multiple audits from reputable firms' },
          { text: 'Complex protocol with many attack surfaces' },
          { text: 'No centralized freeze function' },
          { text: 'Active development and improvements' },
        ],
      },
      adoption: {
        score: 4,
        max: 10,
        details: [
          { text: 'Niche DeFi presence' },
          { text: 'frxETH and sFRAX products drive some adoption' },
          { text: 'Limited geographic adoption' },
          { text: 'Primarily Ethereum ecosystem' },
        ],
      },
    },
    totalScore: 53,
    grade: 'C-',
    summary: 'Evolved from risky fractional model to fully collateralized. Improving trajectory but small scale, limited adoption, and no regulatory standing hold it back.',
    lastUpdated: '2026-03-11',
  },
  {
    id: 'gusd',
    name: 'Gemini Dollar',
    ticker: 'GUSD',
    issuer: 'Gemini Trust Company',
    type: 'fiat-backed',
    tier: 2,
    marketCap: '$80M',
    marketCapUsd: 80e6,
    chains: ['Ethereum'],
    website: 'https://www.gemini.com/dollar',
    pillars: {
      reserve: {
        score: 23,
        max: 25,
        details: [
          { text: 'Reserves 100% in cash and US Treasuries', source: 'https://www.gemini.com/dollar' },
          { text: 'Held at State Street Bank and FDIC-insured banks', source: 'https://www.gemini.com/dollar' },
          { text: 'NYDFS-regulated trust company — highest US state standard', source: 'https://www.gemini.com/dollar' },
          { text: 'Clean, simple reserve structure' },
        ],
      },
      transparency: {
        score: 13,
        max: 20,
        details: [
          { text: 'Monthly attestation by BPM LLP (independent, reputable)', source: 'https://www.gemini.com/dollar' },
          { text: 'Not Big Four, but consistent reporting' },
          { text: 'Clear reserve breakdown' },
          { text: 'No on-chain proof of reserve' },
        ],
      },
      peg: {
        score: 13,
        max: 20,
        details: [
          { text: 'Stable peg when traded, but very thin liquidity' },
          { text: 'Minimal DEX presence' },
          { text: 'Limited CEX listings outside Gemini' },
          { text: 'Low volume means peg is untested under stress' },
        ],
      },
      regulatory: {
        score: 9,
        max: 15,
        details: [
          { text: 'NYDFS-regulated (same as Paxos)' },
          { text: 'Strong US regulatory standing' },
          { text: 'Not MiCA-compliant' },
          { text: 'Limited to one jurisdiction' },
        ],
      },
      smartContract: {
        score: 7,
        max: 10,
        details: [
          { text: 'Audited contracts' },
          { text: 'Upgradeable proxy pattern' },
          { text: 'Standard freeze functionality' },
          { text: 'Only on Ethereum — no cross-chain complexity' },
        ],
      },
      adoption: {
        score: 0,
        max: 10,
        details: [
          { text: 'Tiny market cap — $80M' },
          { text: 'Almost no DeFi integration' },
          { text: 'Single chain (Ethereum only)' },
          { text: 'Negligible geographic adoption' },
        ],
      },
    },
    totalScore: 65,
    grade: 'B-',
    summary: 'One of the safest reserve structures and strongest US regulation — but almost nobody uses it. A well-regulated stablecoin that failed to find product-market fit.',
    lastUpdated: '2026-03-11',
  },
  {
    id: 'eurc',
    name: 'Euro Coin',
    ticker: 'EURC',
    issuer: 'Circle',
    type: 'fiat-backed',
    tier: 2,
    marketCap: '$200M',
    marketCapUsd: 200e6,
    chains: ['Ethereum', 'Solana', 'Base', 'Avalanche'],
    website: 'https://www.circle.com/eurc',
    pillars: {
      reserve: {
        score: 20,
        max: 25,
        details: [
          { text: 'Same reserve standard as USDC — Euro-denominated cash and equivalents', source: 'https://www.circle.com/eurc' },
          { text: 'Custodied at regulated European banks', source: 'https://developers.circle.com/stablecoins/what-is-eurc' },
          { text: 'Circle\'s institutional reserve management track record' },
          { text: 'Clean, simple reserve composition' },
        ],
      },
      transparency: {
        score: 15,
        max: 20,
        details: [
          { text: 'Attestation by Deloitte (Big Four)', source: 'https://www.circle.com/transparency' },
          { text: 'Regular reporting consistent with USDC practices' },
          { text: 'Good detail level' },
          { text: 'No on-chain proof of reserve' },
        ],
      },
      peg: {
        score: 15,
        max: 20,
        details: [
          { text: 'Stable peg to EUR' },
          { text: 'Limited but growing liquidity' },
          { text: 'Fewer DEX pools than USDC' },
          { text: 'Growing CEX support post-MiCA' },
        ],
      },
      regulatory: {
        score: 13,
        max: 15,
        details: [
          { text: 'MiCA-authorized — fully compliant with EU stablecoin regulation', source: 'https://www.circle.com/pressroom/circle-is-first-global-stablecoin-issuer-to-comply-with-mica-eus-landmark-crypto-law' },
          { text: 'Strongest regulatory standing in EU of any stablecoin' },
          { text: 'Circle\'s global compliance infrastructure' },
          { text: 'Positioned to benefit from EU regulatory clarity' },
        ],
      },
      smartContract: {
        score: 6,
        max: 10,
        details: [
          { text: 'Same contract architecture as USDC' },
          { text: 'Audited by same firms' },
          { text: 'Standard freeze functionality' },
          { text: 'Multi-chain with native CCTP support', source: 'https://www.circle.com/cross-chain-transfer-protocol' },
        ],
      },
      adoption: {
        score: 4,
        max: 10,
        details: [
          { text: 'Small market cap — $200M' },
          { text: 'Growing post-MiCA as EU exchanges need compliant options' },
          { text: 'EUR stablecoins are a small market overall' },
          { text: 'Limited DeFi integration' },
        ],
      },
    },
    totalScore: 73,
    grade: 'B',
    summary: 'Arguably the best-regulated stablecoin in Europe — MiCA-compliant with Circle\'s reserve standards. Small market but positioned to grow as EU compliance requirements kick in.',
    lastUpdated: '2026-03-11',
  },
];
