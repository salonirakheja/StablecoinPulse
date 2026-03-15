import type { Metadata } from 'next';
import Link from 'next/link';
import PageNavHeader from '@/components/PageNavHeader';

export const metadata: Metadata = {
  title: 'How to Buy USDT in Nigeria, Argentina, and Turkey | Stablecoin Pulse',
  description:
    'A practical guide to buying USDT and other stablecoins in Nigeria, Argentina, and Turkey. Local exchanges, P2P options, payment methods, and what to watch out for.',
  openGraph: {
    title: 'How to Buy USDT in Nigeria, Argentina, and Turkey',
    description:
      'Local exchanges, P2P options, and what to watch out for in three of the world\'s biggest stablecoin markets.',
    type: 'article',
  },
  keywords: [
    'buy USDT Nigeria',
    'buy USDT Argentina',
    'buy USDT Turkey',
    'buy stablecoin Nigeria',
    'buy USDC Nigeria',
    'buy DAI Argentina',
    'Binance P2P Nigeria',
    'Quidax',
    'BtcTurk',
    'Ripio',
    'Lemon Cash',
    'Paribu',
    'stablecoin emerging markets',
    'how to buy stablecoins',
    'USDT premium Nigeria',
    'USDT premium Turkey',
  ],
};

type ExchangeInfo = {
  name: string;
  url: string;
  type: 'local' | 'global';
  stablecoins: string[];
  paymentMethods: string[];
  hasP2P: boolean;
  note: string;
};

type CountryGuide = {
  name: string;
  iso2: string;
  fiat: string;
  fiatSymbol: string;
  regulation: string;
  context: string;
  exchanges: ExchangeInfo[];
  tips: string[];
  warning: string;
};

const countries: CountryGuide[] = [
  {
    name: 'Nigeria',
    iso2: 'NG',
    fiat: 'NGN',
    fiatSymbol: '₦',
    regulation: 'Restricted. The CBN lifted its direct banking ban but heavy restrictions remain. The SEC is now licensing VASPs, creating a parallel regulatory track.',
    context: 'Nigeria is the largest stablecoin market in Africa and ranks #10 globally by volume. USDT is the dominant stablecoin, used as a savings vehicle and for cross-border payments. P2P trading is how most Nigerians access stablecoins because direct bank-to-exchange connections are limited.',
    exchanges: [
      { name: 'Quidax', url: 'https://www.quidax.com', type: 'local', stablecoins: ['USDT', 'USDC'], paymentMethods: ['Bank Transfer'], hasP2P: false, note: 'Nigerian-founded exchange. Supports NGN deposits directly. One of the few local platforms with regulatory engagement.' },
      { name: 'Binance', url: 'https://www.binance.com', type: 'global', stablecoins: ['USDT', 'USDC'], paymentMethods: ['P2P (Bank Transfer)'], hasP2P: true, note: 'Most popular option for Nigerians. P2P marketplace connects you with local traders who accept bank transfers in NGN. Watch for premium markups.' },
      { name: 'Bybit', url: 'https://www.bybit.com', type: 'global', stablecoins: ['USDT'], paymentMethods: ['P2P (Bank Transfer)'], hasP2P: true, note: 'Growing P2P market in Nigeria. Often has competitive rates vs. Binance.' },
      { name: 'KuCoin', url: 'https://www.kucoin.com', type: 'global', stablecoins: ['USDT', 'USDC'], paymentMethods: ['P2P (Bank Transfer)'], hasP2P: true, note: 'Another P2P option. Compare rates across platforms before buying.' },
    ],
    tips: [
      'P2P is the main on-ramp. Direct bank deposits to exchanges are unreliable because Nigerian banks sometimes block crypto-related transfers.',
      'Always compare P2P prices across Binance, Bybit, and KuCoin. The USDT premium in Nigeria fluctuates and you can often save 1-2% by checking multiple platforms.',
      'Use only verified P2P traders with high completion rates (95%+) and many trades.',
      'Keep records of every transaction. The SEC is building a regulatory framework and documentation will matter.',
    ],
    warning: 'Nigerian banks have historically frozen accounts linked to crypto transactions. While the CBN has softened its stance, some banks still flag crypto-related transfers. Using P2P and keeping your exchange activities separate from your primary bank account is common practice.',
  },
  {
    name: 'Argentina',
    iso2: 'AR',
    fiat: 'ARS',
    fiatSymbol: '$',
    regulation: 'Partial. No specific crypto law, but the CNV (securities regulator) regulates crypto service providers under General Resolution 994. Stablecoin adoption is massive.',
    context: 'Argentina has one of the highest per-capita stablecoin usage rates in the world. With the peso losing 50%+ of its value in 2023-2024, Argentines use USDT and DAI as a savings tool. The country has a strong local exchange ecosystem that makes buying stablecoins straightforward.',
    exchanges: [
      { name: 'Ripio', url: 'https://www.ripio.com', type: 'local', stablecoins: ['USDT', 'USDC', 'DAI'], paymentMethods: ['Bank Transfer'], hasP2P: false, note: 'One of Latin America\'s largest crypto platforms. Founded in Argentina. Supports ARS deposits and has a user-friendly mobile app.' },
      { name: 'Lemon Cash', url: 'https://www.lemon.me', type: 'local', stablecoins: ['USDT', 'USDC', 'DAI'], paymentMethods: ['Bank Transfer'], hasP2P: false, note: 'Popular Argentine fintech app. Offers a crypto debit card and cashback in crypto. Easy ARS on-ramp.' },
      { name: 'Binance', url: 'https://www.binance.com', type: 'global', stablecoins: ['USDT', 'USDC', 'DAI'], paymentMethods: ['P2P (Bank Transfer, Mercado Pago)'], hasP2P: true, note: 'P2P market accepts Mercado Pago (Argentina\'s most popular payment app) and bank transfers. High liquidity.' },
      { name: 'Bitget', url: 'https://www.bitget.com', type: 'global', stablecoins: ['USDT'], paymentMethods: ['P2P (Bank Transfer)'], hasP2P: true, note: 'Growing presence in Latin America. P2P available in ARS.' },
    ],
    tips: [
      'Local exchanges (Ripio, Lemon Cash) are the easiest option. They accept ARS bank transfers directly and are regulated by the CNV.',
      'DAI is uniquely popular in Argentina because it\'s decentralized. Many Argentines prefer it over USDT because no single company can freeze it.',
      'Compare the "dollar blue" rate (informal exchange rate) with what you\'re paying on exchanges. The effective USDT price should be close to the blue dollar, not the official rate.',
      'Lemon Cash\'s crypto debit card lets you spend stablecoins directly at stores, which is useful for everyday purchases.',
    ],
    warning: 'Argentina\'s currency controls mean the official ARS/USD rate is very different from the market rate ("dollar blue"). When buying USDT, you\'re effectively paying the blue dollar rate, not the official one. This is normal and expected. The 30% "crypto tax" on foreign currency purchases was removed in late 2024, making stablecoin purchases cheaper.',
  },
  {
    name: 'Turkey',
    iso2: 'TR',
    fiat: 'TRY',
    fiatSymbol: '₺',
    regulation: 'Partial. Crypto payments have been banned since 2021 (you can\'t pay for goods with USDT), but trading is legal. A comprehensive crypto law is expected soon.',
    context: 'Turkey ranks #4 globally in stablecoin volume, ahead of the UK. The lira has lost roughly 40% against the dollar over the past year, making USDT a popular savings tool. Turkey has strong local exchanges that make buying stablecoins with TRY simple.',
    exchanges: [
      { name: 'BtcTurk', url: 'https://www.btcturk.com', type: 'local', stablecoins: ['USDT', 'USDC'], paymentMethods: ['Bank Transfer'], hasP2P: false, note: 'Turkey\'s oldest and largest crypto exchange. Supports TRY deposits via bank transfer (EFT/Havale). Regulated under Turkish financial law.' },
      { name: 'Paribu', url: 'https://www.paribu.com', type: 'local', stablecoins: ['USDT'], paymentMethods: ['Bank Transfer'], hasP2P: false, note: 'Second-largest Turkish exchange. Simple interface, good for beginners. TRY deposits via bank transfer.' },
      { name: 'Binance', url: 'https://www.binance.com', type: 'global', stablecoins: ['USDT', 'USDC'], paymentMethods: ['Bank Transfer, P2P (Bank Transfer)'], hasP2P: true, note: 'Largest exchange by volume in Turkey. Supports direct TRY deposits and P2P trading. Licensed by Turkey\'s Capital Markets Board.' },
      { name: 'OKX', url: 'https://www.okx.com', type: 'global', stablecoins: ['USDT', 'USDC'], paymentMethods: ['P2P (Bank Transfer)'], hasP2P: true, note: 'P2P marketplace available in TRY. Another option for comparing rates.' },
    ],
    tips: [
      'Local exchanges (BtcTurk, Paribu) are the easiest starting point. Bank transfers in TRY are fast and well-supported.',
      'Binance is licensed in Turkey and supports direct TRY deposits, making it nearly as easy as a local exchange.',
      'The USDT premium in Turkey is usually 2-5% above the official USD/TRY rate. This reflects demand, not a scam. Compare across exchanges to get the best rate.',
      'You can buy USDT but you can\'t use it to pay at stores (crypto payments are banned). It\'s used as a savings and transfer tool.',
    ],
    warning: 'Crypto payments are banned in Turkey since 2021. You can legally buy, hold, and trade USDT, but you cannot use it to pay for goods and services. This law is enforced, so keep stablecoins as savings or transfer tools, not payment instruments.',
  },
];

function ExchangeCard({ exchange }: { exchange: ExchangeInfo }) {
  return (
    <div
      className="rounded-lg border border-[rgba(0,245,255,0.08)] px-4 py-3"
      style={{ background: 'rgba(0,245,255,0.02)' }}
    >
      <div className="flex items-center gap-2 mb-1.5">
        <a href={exchange.url} target="_blank" rel="noopener noreferrer" className="text-sm font-mono font-bold text-[#00F5FF] hover:text-[#E0E0FF] transition-colors">{exchange.name} {'\u2197'}</a>
        {exchange.type === 'local' && (
          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded border border-[rgba(0,229,160,0.3)] text-[#00E5A0]" style={{ background: 'rgba(0,229,160,0.08)' }}>
            LOCAL
          </span>
        )}
        {exchange.hasP2P && (
          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded border border-[rgba(255,184,0,0.3)] text-[#FFB800]" style={{ background: 'rgba(255,184,0,0.08)' }}>
            P2P
          </span>
        )}
      </div>
      <div className="flex flex-wrap gap-1.5 mb-1.5">
        {exchange.stablecoins.map((coin) => (
          <span
            key={coin}
            className="text-[9px] font-mono px-1.5 py-0.5 rounded border border-[rgba(0,245,255,0.15)] text-[#00F5FF]"
            style={{ background: 'rgba(0,245,255,0.05)' }}
          >
            {coin}
          </span>
        ))}
      </div>
      <p className="text-[10px] font-mono text-[#7070AA] mb-1">{exchange.paymentMethods.join(' · ')}</p>
      <p className="text-[11px] text-[#7070AA] leading-relaxed">{exchange.note}</p>
    </div>
  );
}

function CountrySection({ country }: { country: CountryGuide }) {
  return (
    <section className="max-w-2xl mb-14">
      <div className="flex items-center gap-3 mb-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://flagcdn.com/w40/${country.iso2.toLowerCase()}.png`}
          srcSet={`https://flagcdn.com/w80/${country.iso2.toLowerCase()}.png 2x`}
          alt={country.name}
          width={28}
          height={20}
          className="rounded-sm"
        />
        <h3
          className="text-xl font-bold text-[#E0E0FF]"
          style={{ textShadow: '0 0 15px rgba(0,245,255,0.15)' }}
        >
          {country.name}
        </h3>
        <span className="text-[10px] font-mono text-[#7070AA]">{country.fiat}</span>
      </div>

      <p className="text-sm text-[#C0C0E0] leading-relaxed mb-3">{country.context}</p>

      <div
        className="rounded-lg border border-[rgba(0,245,255,0.1)] px-4 py-2.5 mb-4"
        style={{ background: 'rgba(5, 5, 25, 0.8)' }}
      >
        <span className="text-[9px] font-mono tracking-wider text-[#7070AA] uppercase">Regulation: </span>
        <span className="text-[11px] text-[#C0C0E0]">{country.regulation}</span>
      </div>

      <h4 className="text-[10px] font-mono tracking-[0.2em] text-[#7070AA] uppercase mb-3">Where to Buy</h4>
      <div className="space-y-2 mb-5">
        {country.exchanges.map((ex) => (
          <ExchangeCard key={ex.name} exchange={ex} />
        ))}
      </div>

      <h4 className="text-[10px] font-mono tracking-[0.2em] text-[#7070AA] uppercase mb-2">Tips</h4>
      <ul className="space-y-2 mb-5">
        {country.tips.map((tip, i) => (
          <li key={i} className="flex items-start gap-2 text-[11px] text-[#C0C0E0] leading-relaxed">
            <span className="text-[#00F5FF] mt-0.5 flex-shrink-0">{i + 1}.</span>
            <span>{tip}</span>
          </li>
        ))}
      </ul>

      <div
        className="rounded-lg border px-4 py-3"
        style={{ background: 'rgba(255,107,107,0.05)', borderColor: 'rgba(255,107,107,0.2)' }}
      >
        <span className="text-[9px] font-mono tracking-wider text-[#FF6B6B] uppercase">Watch out </span>
        <p className="text-[11px] text-[#C0C0E0] leading-relaxed mt-1">{country.warning}</p>
      </div>

      <Link
        href={`/country/${country.iso2}`}
        className="inline-flex items-center gap-1.5 text-[11px] font-mono tracking-wider text-[#00F5FF] hover:text-[#E0E0FF] transition-colors mt-4"
      >
        Full data for {country.name}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </Link>
    </section>
  );
}

export default function HowToBuyPostPage() {
  return (
    <div className="min-h-screen bg-[#030308]">
      <PageNavHeader activePage="blog" />

      <article className="px-6 md:px-16 lg:px-24 pb-20">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-[11px] font-mono tracking-wider text-[#7070AA] hover:text-[#00F5FF] transition-colors mt-6"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          ALL POSTS
        </Link>

        {/* Title block */}
        <header className="relative pt-8 pb-12 overflow-hidden">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-30 blur-[100px] pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(0,245,255,0.4) 0%, rgba(77,77,255,0.2) 50%, transparent 70%)' }}
          />
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <time className="text-[11px] font-mono tracking-wider text-[#7070AA]">March 14, 2026</time>
              <span className="text-[10px] text-[#7070AA]">&bull;</span>
              <span className="text-[11px] font-mono tracking-wider text-[#7070AA]">10 min read</span>
            </div>
            <h2
              className="text-2xl md:text-4xl font-bold tracking-tight text-[#E0E0FF] max-w-2xl leading-tight"
              style={{ textShadow: '0 0 30px rgba(0,245,255,0.2)' }}
            >
              How to Buy USDT in Nigeria, Argentina, and Turkey
            </h2>
            <p className="text-base text-[#7070AA] mt-4 max-w-xl leading-relaxed">
              A practical guide to buying stablecoins in three of the world&apos;s biggest stablecoin markets. Local exchanges, P2P options, payment methods, and what to watch out for.
            </p>
          </div>
        </header>

        {/* Intro */}
        <section className="max-w-2xl mb-12">
          <p className="text-sm text-[#C0C0E0] leading-relaxed mb-4">
            Nigeria, Argentina, and Turkey are among the top 10 countries for stablecoin trading volume globally. In all three, stablecoins serve the same purpose: a way to hold dollars when the local currency is losing value.
          </p>
          <p className="text-sm text-[#C0C0E0] leading-relaxed mb-4">
            But buying USDT in Lagos is very different from buying it in Istanbul or Buenos Aires. Each country has different exchanges, different regulations, and different gotchas. This guide covers the practical details: where to buy, how to pay, and what to watch out for.
          </p>
          <p className="text-sm text-[#C0C0E0] leading-relaxed">
            We focus on USDT because it&apos;s the most widely available stablecoin in these markets, but we also cover USDC and DAI where relevant. For how we rate these stablecoins on safety, see our <Link href="/ratings" className="text-[#00F5FF] hover:underline">ratings page</Link> (USDT scores a C, USDC scores an A-).
          </p>
        </section>

        {/* Country guides */}
        {countries.map((country) => (
          <CountrySection key={country.iso2} country={country} />
        ))}

        {/* General tips */}
        <section className="max-w-2xl mb-12">
          <h3
            className="text-lg font-bold text-[#E0E0FF] mb-3"
            style={{ textShadow: '0 0 15px rgba(0,245,255,0.15)' }}
          >
            General Tips for All Three Countries
          </h3>
          <ul className="space-y-3 text-sm text-[#C0C0E0] leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-[#00F5FF] font-bold mt-0.5 flex-shrink-0">1.</span>
              <span><strong className="text-[#E0E0FF]">Compare prices across platforms.</strong> The USDT premium varies between exchanges and P2P platforms. Checking 2-3 options before buying can save you 1-3%.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#00F5FF] font-bold mt-0.5 flex-shrink-0">2.</span>
              <span><strong className="text-[#E0E0FF]">Start small.</strong> Your first purchase should be a small amount to test the process. Make sure deposits, purchases, and withdrawals all work before moving larger amounts.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#00F5FF] font-bold mt-0.5 flex-shrink-0">3.</span>
              <span><strong className="text-[#E0E0FF]">Use a self-custody wallet.</strong> Once you buy stablecoins, consider moving them to a wallet you control (MetaMask, Trust Wallet, etc.). Exchange hacks and freezes happen.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#00F5FF] font-bold mt-0.5 flex-shrink-0">4.</span>
              <span><strong className="text-[#E0E0FF]">Pick the right network.</strong> When withdrawing USDT, choose TRC-20 (Tron) for the lowest fees, or ERC-20 (Ethereum) for the widest compatibility. Never send to the wrong network.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#00F5FF] font-bold mt-0.5 flex-shrink-0">5.</span>
              <span><strong className="text-[#E0E0FF]">Understand what you&apos;re holding.</strong> USDT is the most popular but scores a C on our Pulse Score due to transparency concerns. USDC (A-) has stronger reserves and audits. DAI (C+) is decentralized and can&apos;t be frozen. Each has trade-offs. See our <Link href="/ratings" className="text-[#00F5FF] hover:underline">full ratings</Link>.</span>
            </li>
          </ul>
        </section>

        {/* Premium tracking */}
        <section className="max-w-2xl mb-12">
          <div
            className="rounded-xl border border-[rgba(0,245,255,0.2)] px-6 py-6"
            style={{ background: 'rgba(0,245,255,0.04)' }}
          >
            <h3 className="text-lg font-bold text-[#E0E0FF] mb-2">Track the premium before you buy</h3>
            <p className="text-sm text-[#C0C0E0] leading-relaxed mb-4">
              We track the real-time USDT and USDC premium in 16 emerging markets, including all three countries in this guide. Check the current premium before buying so you know what the &ldquo;real&rdquo; price is.
            </p>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/country/NG"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-mono tracking-wider border border-[rgba(0,245,255,0.3)] text-[#00F5FF] hover:bg-[rgba(0,245,255,0.08)] transition-colors"
              >
                Nigeria
              </Link>
              <Link
                href="/country/AR"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-mono tracking-wider border border-[rgba(0,245,255,0.3)] text-[#00F5FF] hover:bg-[rgba(0,245,255,0.08)] transition-colors"
              >
                Argentina
              </Link>
              <Link
                href="/country/TR"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-mono tracking-wider border border-[rgba(0,245,255,0.3)] text-[#00F5FF] hover:bg-[rgba(0,245,255,0.08)] transition-colors"
              >
                Turkey
              </Link>
              <Link
                href="/?view=premium"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-mono tracking-wider border border-[rgba(0,245,255,0.15)] text-[#7070AA] hover:text-[#00F5FF] hover:border-[rgba(0,245,255,0.3)] transition-colors"
              >
                All 16 countries
              </Link>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="max-w-2xl">
          <p className="text-[10px] font-mono text-[#7070AA] leading-relaxed">
            Exchange availability and regulations change frequently. Always verify directly with the exchange before depositing funds.
            This is informational content based on publicly available data, not financial advice.
            Stablecoin ratings from <Link href="/ratings" className="text-[#00F5FF] hover:underline">Stablecoin Pulse</Link>.
          </p>
        </section>
      </article>

      {/* Footer */}
      <footer className="border-t border-[rgba(0,245,255,0.1)] px-6 md:px-16 lg:px-24 py-8">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-mono tracking-[0.15em] text-[#7070AA]">STABLECOIN PULSE</p>
          <Link href="/blog" className="text-[10px] font-mono tracking-wider text-[#7070AA] hover:text-[#00F5FF] transition-colors">
            ALL POSTS &rarr;
          </Link>
        </div>
      </footer>
    </div>
  );
}
