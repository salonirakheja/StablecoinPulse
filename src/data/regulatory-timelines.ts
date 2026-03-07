// Regulatory timeline events for key stablecoin/crypto markets.
// Each event has been verified via web search (as of March 2026).
// Dates use YYYY-MM format where month is confirmed, YYYY otherwise.

export const REGULATORY_TIMELINES: Record<string, { date: string; event: string }[]> = {
  NG: [
    { date: '2021-02', event: 'CBN bans banks from processing crypto transactions; exchange accounts frozen' },
    { date: '2022-05', event: 'SEC introduces regulatory framework for digital assets' },
    { date: '2023-12', event: 'CBN lifts banking ban, shifts stance from prohibition to regulation' },
    { date: '2024-02', event: 'NCC directs telecoms to block access to Binance, Coinbase, OKX, and other exchanges' },
    { date: '2024-03', event: 'SEC launches Accelerated Regulatory Incubation Programme (ARIP) for crypto firms' },
    { date: '2025-03', event: 'President Tinubu signs Investments and Securities Act 2025, recognizing digital assets as securities' },
    { date: '2025-06', event: 'SEC VASP licensing framework takes effect; all platforms serving Nigerian users must obtain a license' },
  ],
  AR: [
    { date: '2023-12', event: 'President Milei signs deregulation decree allowing Bitcoin and crypto in contract settlements' },
    { date: '2024-03', event: 'Law 27,739 enacted, creating mandatory VASP registry under the CNV (securities regulator)' },
    { date: '2024-03', event: 'CNV issues General Resolution 994, establishing VASP registration requirements' },
    { date: '2025-04', event: 'CNV launches tokenization sandbox for on-chain securities pilots' },
    { date: '2025-12', event: 'Full VASP regulatory framework takes effect' },
  ],
  TR: [
    { date: '2021-04', event: 'CBRT bans use of crypto assets for payments (Regulation on Disuse of Crypto-Assets in Payments)' },
    { date: '2021-04', event: 'First crypto regulation published: allows buying/selling/custody but not payment use' },
    { date: '2024-07', event: 'Law No. 7518 passed, creating first legal framework for Crypto Asset Service Providers (CASPs)' },
    { date: '2025-03', event: 'Capital Markets Board publishes CASP licensing rules (minimum capital TRY 100M for platforms)' },
    { date: '2025-06', event: 'Most CASP licensing regulations take effect' },
  ],
  IN: [
    { date: '2018-04', event: 'RBI bans banks and regulated entities from facilitating crypto transactions' },
    { date: '2020-03', event: 'Supreme Court overturns RBI banking ban, restores crypto exchange access' },
    { date: '2022-04', event: 'Budget 2022: 30% flat tax on crypto gains (Section 115BBH) takes effect' },
    { date: '2022-07', event: '1% TDS on crypto transactions above Rs 50,000 (Section 194S) takes effect' },
    { date: '2023-03', event: 'Virtual digital assets brought under Prevention of Money Laundering Act (PMLA); exchanges must register with FIU-IND' },
    { date: '2024', event: 'SEBI proposes multi-regulator framework for cryptocurrency oversight' },
  ],
  BR: [
    { date: '2022-12', event: 'Law 14,478 signed, establishing crypto asset definitions and designating BCB as VASP regulator' },
    { date: '2023-06', event: 'Law 14,478 enters into force; Decree 11,563 grants BCB authority to issue specific rules' },
    { date: '2024-11', event: 'BCB publishes three public consultations on VASP authorization, operations, and FX rules' },
    { date: '2025-02', event: 'BCB chief notes 90% of crypto volume is stablecoins, signals stablecoin-specific rules' },
    { date: '2025-11', event: 'BCB Resolutions 519, 520, 521 published — comprehensive VASP framework including stablecoin FX rules' },
  ],
  PK: [
    { date: '2023', event: 'FIA issues notices to crypto traders; questions Binance representatives over fraud probe' },
    { date: '2024', event: 'SBP reaffirms crypto ban, declares digital currencies illegal' },
    { date: '2024-09', event: 'SECP drafts framework for regulating crypto activities and ICOs' },
    { date: '2025-02', event: 'Federal Government forms Pakistan Crypto Council (PCC)' },
    { date: '2025-07', event: 'Pakistan Virtual Assets Ordinance 2025 promulgated, creating PVARA as independent regulator' },
    { date: '2025-12', event: 'PVARA issues NOCs to Binance and HTX to set up local operations' },
  ],
  EG: [
    { date: '2018-01', event: 'Central Bank of Egypt issues first formal warning against cryptocurrency trading' },
    { date: '2018', event: 'Dar al-Ifta issues fatwa classifying Bitcoin transactions as haram (prohibited under Islamic law)' },
    { date: '2020-09', event: 'Central Bank and Banking Sector Law No. 194 enters force; Article 206 bans crypto issuance/trading without CBE license' },
    { date: '2023-03', event: 'CBE issues fourth warning statement on cryptocurrency risks' },
    { date: '2025', event: 'CBE issues fresh warning amid rise in local crypto investment ads; no licenses have been granted' },
  ],
  KE: [
    { date: '2023-09', event: 'Government completes money laundering risk assessment for virtual assets' },
    { date: '2023', event: 'Finance Act 2023 introduces 3% Digital Asset Tax (DAT) on gross value of all crypto transfers' },
    { date: '2023-11', event: 'National Treasury directs development of comprehensive crypto regulatory framework' },
    { date: '2024-12', event: 'National Treasury unveils Draft National Policy on Virtual Assets and VASP Bill' },
    { date: '2025-10', event: 'Parliament passes Virtual Asset Service Providers Bill 2025; assented by President on Oct 15' },
    { date: '2025', event: 'Finance Act 2025 replaces 3% DAT with 10% excise duty on VASP service fees' },
  ],
  ZA: [
    { date: '2022-10', event: 'FSCA declares crypto assets as financial products under FAIS Act' },
    { date: '2022-12', event: 'CASPs added as accountable institutions under FICA (AML obligations)' },
    { date: '2023-06', event: 'FSCA CASP licensing window opens' },
    { date: '2023-11', event: 'Deadline for existing crypto firms to submit CASP license applications' },
    { date: '2024-04', event: 'VALR becomes one of first platforms to secure both Category I and II FSCA licenses' },
    { date: '2025-04', event: 'Travel Rule (Directive 9) takes effect for all licensed CASPs' },
  ],
  US: [
    { date: '2023-07', event: 'House Financial Services Committee approves Clarity for Payment Stablecoins Act' },
    { date: '2025-01', event: 'President Trump signs Executive Order "Strengthening American Leadership in Digital Financial Technology"' },
    { date: '2025-02', event: 'GENIUS Act (stablecoin regulation bill) introduced in the Senate' },
    { date: '2025-06', event: 'Senate passes GENIUS Act with bipartisan support (68-30)' },
    { date: '2025-07', event: 'GENIUS Act signed into law — first comprehensive US stablecoin legislation; requires 1:1 reserves' },
    { date: '2027-01', event: 'GENIUS Act effective date (or 120 days after final regulations, whichever is earlier)' },
  ],
};
