export type RegulationStatus = 'regulated' | 'partial' | 'restricted' | 'unclear';

export interface CountryRegulation {
  country: string;
  iso2: string;
  status: RegulationStatus;
  summary: string;
  keyLaw?: string;
  stablecoinsAllowed?: string[];
  notes?: string;
}

export const REGULATION_COLORS: Record<RegulationStatus, string> = {
  regulated: '#39FF14',
  partial: '#FFB800',
  restricted: '#FF1493',
  unclear: '#7070AA',
};

export const REGULATION_LABELS: Record<RegulationStatus, string> = {
  regulated: 'Regulated',
  partial: 'Partial',
  restricted: 'Restricted',
  unclear: 'Unclear',
};

export const STABLECOIN_REGULATIONS: CountryRegulation[] = [
  // ===== REGULATED (Green) =====
  {
    country: 'Germany',
    iso2: 'DE',
    status: 'regulated',
    summary: 'Full MiCA framework in effect. BaFin oversees stablecoin issuance and reserves.',
    keyLaw: 'MiCA (2024)',
    stablecoinsAllowed: ['USDC', 'EURC'],
  },
  {
    country: 'France',
    iso2: 'FR',
    status: 'regulated',
    summary: 'MiCA implemented via AMF. Licensed CASPs can offer stablecoins to retail users.',
    keyLaw: 'MiCA (2024)',
    stablecoinsAllowed: ['USDC', 'EURC'],
  },
  {
    country: 'Italy',
    iso2: 'IT',
    status: 'regulated',
    summary: 'MiCA in force. Consob and Bank of Italy jointly supervise stablecoin issuers.',
    keyLaw: 'MiCA (2024)',
    stablecoinsAllowed: ['USDC', 'EURC'],
  },
  {
    country: 'Spain',
    iso2: 'ES',
    status: 'regulated',
    summary: 'MiCA framework active. CNMV registers crypto service providers including stablecoin platforms.',
    keyLaw: 'MiCA (2024)',
    stablecoinsAllowed: ['USDC', 'EURC'],
  },
  {
    country: 'Netherlands',
    iso2: 'NL',
    status: 'regulated',
    summary: 'MiCA applied via DNB. One of the earliest EU countries to enforce crypto registration.',
    keyLaw: 'MiCA (2024)',
    stablecoinsAllowed: ['USDC', 'EURC'],
  },
  {
    country: 'Ireland',
    iso2: 'IE',
    status: 'regulated',
    summary: 'MiCA in effect. Central Bank of Ireland supervises e-money token issuers.',
    keyLaw: 'MiCA (2024)',
    stablecoinsAllowed: ['USDC', 'EURC'],
  },
  {
    country: 'Portugal',
    iso2: 'PT',
    status: 'regulated',
    summary: 'MiCA framework active. Banco de Portugal registers virtual asset service providers.',
    keyLaw: 'MiCA (2024)',
    stablecoinsAllowed: ['USDC', 'EURC'],
  },
  {
    country: 'Austria',
    iso2: 'AT',
    status: 'regulated',
    summary: 'MiCA implemented. FMA oversees crypto assets including stablecoins.',
    keyLaw: 'MiCA (2024)',
    stablecoinsAllowed: ['USDC', 'EURC'],
  },
  {
    country: 'Singapore',
    iso2: 'SG',
    status: 'regulated',
    summary: 'MAS regulates stablecoins under the Payment Services Act. SG-dollar stablecoins must meet reserve requirements.',
    keyLaw: 'Payment Services Act (2020, amended 2023)',
    stablecoinsAllowed: ['USDT', 'USDC', 'XSGD'],
  },
  {
    country: 'Japan',
    iso2: 'JP',
    status: 'regulated',
    summary: 'Only bank-issued or trust-backed stablecoins permitted. USDT not available on licensed exchanges.',
    keyLaw: 'Payment Services Act (revised 2023)',
    stablecoinsAllowed: ['USDC', 'JPYC'],
    notes: 'Foreign stablecoins must partner with local banks.',
  },
  {
    country: 'United Arab Emirates',
    iso2: 'AE',
    status: 'regulated',
    summary: 'VARA in Dubai and ADGM in Abu Dhabi provide comprehensive crypto frameworks. Stablecoins widely used.',
    keyLaw: 'VARA Regulations (2023)',
    stablecoinsAllowed: ['USDT', 'USDC', 'AED-backed'],
  },
  {
    country: 'Hong Kong',
    iso2: 'HK',
    status: 'regulated',
    summary: 'HKMA licensing regime for stablecoin issuers. Only licensed platforms can offer to retail.',
    keyLaw: 'Stablecoin Bill (2024)',
    stablecoinsAllowed: ['USDT', 'USDC'],
  },
  {
    country: 'Switzerland',
    iso2: 'CH',
    status: 'regulated',
    summary: 'FINMA treats stablecoins as deposits or collective investment schemes. Clear framework since 2019.',
    keyLaw: 'DLT Act (2021)',
    stablecoinsAllowed: ['USDT', 'USDC'],
  },
  {
    country: 'Bahrain',
    iso2: 'BH',
    status: 'regulated',
    summary: 'CBB regulates crypto under its sandbox and full license regime. Stablecoins explicitly covered.',
    keyLaw: 'CBB Crypto-Asset Module (2022)',
    stablecoinsAllowed: ['USDT', 'USDC'],
  },
  {
    country: 'Australia',
    iso2: 'AU',
    status: 'regulated',
    summary: 'Treasury mapping stablecoins to existing e-money framework. ASIC enforces licensing requirements.',
    keyLaw: 'Payment Systems (Regulation) Act reform (2024)',
    stablecoinsAllowed: ['USDT', 'USDC'],
  },
  {
    country: 'United Kingdom',
    iso2: 'GB',
    status: 'regulated',
    summary: 'FCA authorizes crypto firms. Stablecoins recognized as regulated payment instruments under new legislation.',
    keyLaw: 'Financial Services & Markets Act (2023)',
    stablecoinsAllowed: ['USDC', 'GBP-backed'],
    notes: 'Tether (USDT) faces additional scrutiny.',
  },
  {
    country: 'Brazil',
    iso2: 'BR',
    status: 'regulated',
    summary: 'Central Bank regulates crypto including stablecoins. Heavy USDT usage for cross-border payments.',
    keyLaw: 'Legal Framework for Virtual Assets (2022)',
    stablecoinsAllowed: ['USDT', 'USDC', 'BRZ'],
  },
  {
    country: 'South Korea',
    iso2: 'KR',
    status: 'regulated',
    summary: 'Virtual Asset User Protection Act in force. Exchanges must register, stablecoins subject to AML rules.',
    keyLaw: 'Virtual Asset User Protection Act (2024)',
    stablecoinsAllowed: ['USDT', 'USDC'],
    notes: 'Won-denominated stablecoins under development.',
  },

  // ===== PARTIAL (Yellow) =====
  {
    country: 'United States',
    iso2: 'US',
    status: 'partial',
    summary: 'No federal stablecoin law yet. SEC and CFTC both claim jurisdiction. State-by-state patchwork.',
    keyLaw: 'Pending stablecoin legislation (2025)',
    stablecoinsAllowed: ['USDC', 'USDT', 'PYUSD', 'DAI'],
    notes: 'Circle (USDC) operates under state money transmitter licenses.',
  },
  {
    country: 'Canada',
    iso2: 'CA',
    status: 'partial',
    summary: 'CSA treats stablecoins as securities/derivatives in some cases. Value-referenced crypto assets restricted on exchanges.',
    keyLaw: 'CSA Staff Notice 21-332',
    stablecoinsAllowed: ['USDC'],
    notes: 'Major exchanges delisted USDT for Canadian users.',
  },
  {
    country: 'India',
    iso2: 'IN',
    status: 'partial',
    summary: '30% crypto tax + 1% TDS on transactions. No stablecoin-specific law, but heavy monitoring by RBI.',
    keyLaw: 'Finance Act crypto tax provisions (2022)',
    stablecoinsAllowed: ['USDT', 'USDC'],
    notes: 'RBI has pushed back on stablecoins threatening INR sovereignty.',
  },
  {
    country: 'Thailand',
    iso2: 'TH',
    status: 'partial',
    summary: 'SEC regulates crypto exchanges. Stablecoins usable for trading but not as payment for goods/services.',
    keyLaw: 'Digital Asset Business Decree (2018)',
    stablecoinsAllowed: ['USDT', 'USDC'],
    notes: 'Payment use banned since 2022.',
  },
  {
    country: 'Philippines',
    iso2: 'PH',
    status: 'partial',
    summary: 'BSP licenses crypto exchanges as VASPs. Stablecoins used heavily for remittances but no specific framework.',
    keyLaw: 'BSP Circular 1108 (2021)',
    stablecoinsAllowed: ['USDT', 'USDC'],
  },
  {
    country: 'Indonesia',
    iso2: 'ID',
    status: 'partial',
    summary: 'Crypto traded as commodities under Bappebti. Stablecoins allowed for trading, not payments.',
    keyLaw: 'Bappebti Regulation 8 (2021)',
    stablecoinsAllowed: ['USDT', 'USDC'],
    notes: 'Regulatory oversight moving to OJK (financial authority).',
  },
  {
    country: 'Malaysia',
    iso2: 'MY',
    status: 'partial',
    summary: 'SC Malaysia regulates digital asset exchanges. Stablecoins not explicitly classified but tradeable on licensed platforms.',
    keyLaw: 'Capital Markets and Services (Prescription of Securities) Order',
    stablecoinsAllowed: ['USDT', 'USDC'],
  },
  {
    country: 'Mexico',
    iso2: 'MX',
    status: 'partial',
    summary: 'Fintech Law covers virtual assets. Stablecoins not specifically regulated but exchanges must register.',
    keyLaw: 'Ley Fintech (2018)',
    stablecoinsAllowed: ['USDT', 'USDC'],
    notes: 'Banxico restricts bank involvement with crypto.',
  },
  {
    country: 'Argentina',
    iso2: 'AR',
    status: 'partial',
    summary: 'No specific crypto law but CNV regulates providers. Massive USDT adoption as inflation hedge.',
    keyLaw: 'CNV General Resolution 994 (2024)',
    stablecoinsAllowed: ['USDT', 'USDC', 'DAI'],
    notes: 'One of highest per-capita stablecoin usage globally.',
  },
  {
    country: 'Colombia',
    iso2: 'CO',
    status: 'partial',
    summary: 'Crypto in regulatory sandbox. SFC monitoring stablecoins, no explicit ban or authorization.',
    keyLaw: 'Sandbox framework (2021)',
    stablecoinsAllowed: ['USDT', 'USDC'],
  },
  {
    country: 'South Africa',
    iso2: 'ZA',
    status: 'partial',
    summary: 'FSCA declared crypto as financial products. Licensed exchanges can offer stablecoins.',
    keyLaw: 'Financial Sector Regulation Act (crypto declaration 2022)',
    stablecoinsAllowed: ['USDT', 'USDC'],
  },
  {
    country: 'Israel',
    iso2: 'IL',
    status: 'partial',
    summary: 'ISA regulates crypto platforms. Stablecoins treated as financial assets, AML requirements apply.',
    keyLaw: 'Financial Asset Service Providers Law (2023)',
    stablecoinsAllowed: ['USDT', 'USDC'],
  },
  {
    country: 'Turkey',
    iso2: 'TR',
    status: 'partial',
    summary: 'Crypto payment ban in effect since 2021, but trading remains legal. Very high USDT usage as lira hedge.',
    keyLaw: 'CBRT Payment Services Regulation (2021)',
    stablecoinsAllowed: ['USDT', 'USDC'],
    notes: 'New comprehensive crypto law expected 2025.',
  },
  {
    country: 'Taiwan',
    iso2: 'TW',
    status: 'partial',
    summary: 'FSC issued self-regulatory guidelines for VASPs. Stablecoins tradeable but no issuance framework.',
    keyLaw: 'FSC VASP Guidelines (2023)',
    stablecoinsAllowed: ['USDT', 'USDC'],
  },

  // ===== RESTRICTED (Red) =====
  {
    country: 'China',
    iso2: 'CN',
    status: 'restricted',
    summary: 'All crypto transactions banned since 2021. Stablecoins explicitly prohibited. CBDC (e-CNY) promoted instead.',
    keyLaw: 'PBoC/CBIRC Joint Notice (2021)',
    notes: 'OTC and VPN usage persists despite ban.',
  },
  {
    country: 'Russia',
    iso2: 'RU',
    status: 'restricted',
    summary: 'Crypto payments banned domestically. Mining legal but stablecoin use restricted. Digital ruble in development.',
    keyLaw: 'Digital Financial Assets Law (2020)',
    notes: 'Cross-border crypto payments allowed in limited cases.',
  },
  {
    country: 'Nigeria',
    iso2: 'NG',
    status: 'restricted',
    summary: 'CBN lifted direct banking ban but heavy restrictions remain. Peer-to-peer stablecoin usage extremely high despite barriers.',
    keyLaw: 'CBN Circular (2024 update)',
    stablecoinsAllowed: ['USDT'],
    notes: 'SEC Nigeria licensing VASPs, creating parallel regulatory track.',
  },
  {
    country: 'Egypt',
    iso2: 'EG',
    status: 'restricted',
    summary: 'Central Bank prohibits banks from crypto dealings. No licensed exchanges. Underground USDT market active.',
    keyLaw: 'CBE Banking Law (2020)',
    notes: 'New fintech regulations being considered.',
  },
  {
    country: 'Morocco',
    iso2: 'MA',
    status: 'restricted',
    summary: 'Complete crypto ban since 2017. Central bank and foreign exchange office prohibit all virtual currencies.',
    keyLaw: 'BAM/Office des Changes Circular (2017)',
    notes: 'Draft crypto bill under consideration since 2022.',
  },
  {
    country: 'Algeria',
    iso2: 'DZ',
    status: 'restricted',
    summary: 'Finance Law prohibits purchase, sale, and holding of all virtual currencies including stablecoins.',
    keyLaw: 'Finance Law Article 117 (2018)',
  },
  {
    country: 'Bangladesh',
    iso2: 'BD',
    status: 'restricted',
    summary: 'Bangladesh Bank bans all crypto transactions. Penalties for trading or holding digital assets.',
    keyLaw: 'Bangladesh Bank Circular (2017)',
  },
  {
    country: 'Nepal',
    iso2: 'NP',
    status: 'restricted',
    summary: 'Nepal Rastra Bank prohibits crypto trading and mining. Arrests made for crypto-related activities.',
    keyLaw: 'Foreign Exchange Act enforcement',
  },
  {
    country: 'Vietnam',
    iso2: 'VN',
    status: 'restricted',
    summary: 'Crypto not recognized as legal payment. SBV restricts banking services for crypto but trading exists in gray area.',
    keyLaw: 'SBV Directive 02 (2014, reinforced 2018)',
    notes: 'High DeFi usage despite restrictions. New framework being drafted.',
  },

  // ===== UNCLEAR (Gray) =====
  {
    country: 'Pakistan',
    iso2: 'PK',
    status: 'unclear',
    summary: 'SBP has not formally legalized or banned crypto. FATF pressure driving regulatory discussions.',
    notes: 'Growing P2P USDT usage despite ambiguity.',
  },
  {
    country: 'Kenya',
    iso2: 'KE',
    status: 'unclear',
    summary: 'No crypto-specific legislation. Central Bank warns against but has not banned. Capital Markets Authority exploring framework.',
    notes: 'Active crypto community, M-Pesa integration drives adoption.',
  },
  {
    country: 'Ukraine',
    iso2: 'UA',
    status: 'unclear',
    summary: 'Virtual Assets Law passed in 2022 but full implementation delayed by war. Crypto widely used for donations and transfers.',
    keyLaw: 'Virtual Assets Law (2022, not fully implemented)',
  },
  {
    country: 'Saudi Arabia',
    iso2: 'SA',
    status: 'unclear',
    summary: 'No formal crypto regulation. SAMA has warned against trading but no explicit ban. Cautious approach amid CBDC exploration.',
    notes: 'Institutional interest growing via NEOM and economic diversification.',
  },
  {
    country: 'Ghana',
    iso2: 'GH',
    status: 'unclear',
    summary: 'Bank of Ghana exploring digital cedi. No crypto regulation in place, neither banned nor explicitly allowed.',
    notes: 'SEC Ghana considering licensing framework.',
  },
  {
    country: 'Tanzania',
    iso2: 'TZ',
    status: 'unclear',
    summary: 'Bank of Tanzania warns against crypto but no law passed. Government exploring regulatory options.',
  },
  {
    country: 'Ethiopia',
    iso2: 'ET',
    status: 'unclear',
    summary: 'No crypto legislation. National Bank of Ethiopia has issued warnings but no formal ban or framework exists.',
  },
  {
    country: 'Peru',
    iso2: 'PE',
    status: 'unclear',
    summary: 'No specific crypto regulation. SBS does not recognize virtual assets as financial products. Growing usage.',
  },
  {
    country: 'Chile',
    iso2: 'CL',
    status: 'unclear',
    summary: 'Fintech Law (2023) provides some framework but stablecoins not specifically addressed. CMF working on detailed rules.',
    keyLaw: 'Fintech Law (2023)',
  },
  {
    country: 'Qatar',
    iso2: 'QA',
    status: 'unclear',
    summary: 'QFC Digital Assets framework launched but retail crypto trading remains restricted. Stablecoin regulation pending.',
    keyLaw: 'QFC Digital Assets Framework (2024)',
  },
];

// Helper: get regulation data by ISO2 code
export function getRegulationByIso2(iso2: string): CountryRegulation | undefined {
  return STABLECOIN_REGULATIONS.find(r => r.iso2 === iso2);
}

// Helper: get regulation summary stats
export function getRegulationStats() {
  const byStatus = {
    regulated: STABLECOIN_REGULATIONS.filter(r => r.status === 'regulated').length,
    partial: STABLECOIN_REGULATIONS.filter(r => r.status === 'partial').length,
    restricted: STABLECOIN_REGULATIONS.filter(r => r.status === 'restricted').length,
    unclear: STABLECOIN_REGULATIONS.filter(r => r.status === 'unclear').length,
  };
  return {
    total: STABLECOIN_REGULATIONS.length,
    ...byStatus,
  };
}
