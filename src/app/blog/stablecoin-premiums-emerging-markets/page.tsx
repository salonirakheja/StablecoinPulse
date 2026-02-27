import type { Metadata } from 'next';
import Link from 'next/link';
import PageNavHeader from '@/components/PageNavHeader';

export const metadata: Metadata = {
  title: 'The Real Price of $1: Stablecoin Premiums Across Emerging Markets | Stablecoin Pulse',
  description:
    'In Turkey, $1 of USDC costs $1.18. In India, $1.13. We tracked USDT and USDC premiums across 16 emerging markets to measure the real cost of accessing dollar-pegged stablecoins.',
  openGraph: {
    title: 'The Real Price of $1: Stablecoin Premiums Across Emerging Markets',
    description:
      'USDT and USDC premiums tracked across 16 emerging markets. See what $1 really costs in Turkey, India, Nigeria, and more.',
    type: 'article',
  },
  keywords: [
    'stablecoin premium',
    'USDT premium',
    'USDC premium',
    'dollar premium index',
    'stablecoin price emerging markets',
    'P2P stablecoin price',
    'USDT Turkey',
    'USDC premium India',
    'stablecoin cost by country',
    'dollar access emerging markets',
  ],
};

type CountryPremium = {
  name: string;
  iso2: string;
  usdt: string;
  usdc: string | null;
  note: string;
};

const highPremium: CountryPremium[] = [
  { name: 'India', iso2: 'IN', usdt: '+6.1%', usdc: '+13.0%', note: 'The 30% crypto tax and 1% TDS push users toward P2P, where premiums absorb the regulatory overhead. India has the highest USDT premium of any country we track.' },
  { name: 'South Africa', iso2: 'ZA', usdt: '+5.5%', usdc: null, note: 'Rand volatility and exchange withdrawal limits sustain elevated USDT premiums. USDC has no P2P liquidity on major platforms.' },
  { name: 'Turkey', iso2: 'TR', usdt: '+5.2%', usdc: '+18.5%', note: 'Capital controls and lira depreciation drive the widest USDC spread globally. The 13-point gap between USDT and USDC reflects how thin P2P liquidity is for Circle\'s stablecoin.' },
];

const moderatePremium: CountryPremium[] = [
  { name: 'Ghana', iso2: 'GH', usdt: '+5.0%', usdc: null, note: 'Cedi weakness and limited exchange access push premiums to the edge of the high tier. No USDC liquidity on P2P platforms.' },
  { name: 'Pakistan', iso2: 'PK', usdt: '+3.4%', usdc: '+4.1%', note: 'No legal crypto framework and strict FX controls create persistent demand for dollar-pegged assets on P2P markets.' },
  { name: 'Vietnam', iso2: 'VN', usdt: '+2.2%', usdc: '+2.5%', note: 'Crypto is not recognized as legal tender but trading is widespread. Moderate premiums reflect a liquid but unofficial market.' },
];

const lowPremium: CountryPremium[] = [
  { name: 'Argentina', iso2: 'AR', usdt: '+1.3%', usdc: '+1.7%', note: 'Despite heavy stablecoin adoption, deep P2P liquidity and competition among sellers keep premiums low relative to inflation.' },
  { name: 'Nigeria', iso2: 'NG', usdt: '+1.2%', usdc: '+2.6%', note: 'Despite an outright ban, Nigeria has the deepest P2P market in Africa. Competition among sellers compresses USDT premiums.' },
  { name: 'Mexico', iso2: 'MX', usdt: '+0.4%', usdc: '+1.0%', note: 'Proximity to the US and regulated exchanges like Bitso ensure tight spreads.' },
  { name: 'Colombia', iso2: 'CO', usdt: '+0.3%', usdc: '+1.2%', note: 'Growing crypto adoption and competitive P2P market keep premiums minimal.' },
  { name: 'Brazil', iso2: 'BR', usdt: '+0.3%', usdc: '+3.0%', note: 'Well-regulated market with deep real/USDT liquidity. USDC spread is notably wider due to fewer sellers.' },
  { name: 'Philippines', iso2: 'PH', usdt: '+0.3%', usdc: '+1.1%', note: 'BSP-regulated exchanges and strong remittance corridors keep stablecoin prices close to parity.' },
  { name: 'Ukraine', iso2: 'UA', usdt: '+0.1%', usdc: '+2.9%', note: 'Crypto-friendly regulation and strong demand for dollar savings keep USDT markets liquid. USDC liquidity is thinner.' },
  { name: 'Indonesia', iso2: 'ID', usdt: '+0.1%', usdc: '+1.3%', note: 'Bappebti-regulated futures market and growing adoption keep premiums near zero.' },
  { name: 'Egypt', iso2: 'EG', usdt: '0.0%', usdc: '+0.5%', note: 'Despite currency devaluation, P2P prices currently track the official rate closely for USDT.' },
  { name: 'Kenya', iso2: 'KE', usdt: '-0.9%', usdc: '+3.1%', note: 'USDT trades slightly below official rate due to seller competition, while limited USDC liquidity pushes that premium above 3%.' },
];

export default function PremiumsPostPage() {
  return (
    <div className="min-h-screen bg-[#030308]">
      <PageNavHeader activePage="blog" />

      {/* Article */}
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
              <time className="text-[11px] font-mono tracking-wider text-[#7070AA]">February 26, 2026</time>
              <span className="text-[10px] text-[#7070AA]">&bull;</span>
              <span className="text-[11px] font-mono tracking-wider text-[#7070AA]">8 min read</span>
            </div>
            <h2
              className="text-2xl md:text-4xl font-bold tracking-tight text-[#E0E0FF] max-w-2xl leading-tight"
              style={{ textShadow: '0 0 30px rgba(0,245,255,0.2)' }}
            >
              The Real Price of $1: Stablecoin Premiums Across Emerging Markets
            </h2>
            <p className="text-sm text-[#7070AA] mt-4 max-w-2xl leading-relaxed">
              USDT and USDC premiums tracked across 16 emerging markets. What does a dollar-pegged stablecoin actually cost?
            </p>
          </div>
        </header>

        {/* Intro */}
        <section className="max-w-2xl mb-12">
          <p className="text-sm text-[#B0B0DD] leading-relaxed mb-4">
            $1 doesn&apos;t cost $1 everywhere. In Turkey, $1 of USDC costs <strong className="text-[#E0E0FF]">$1.18</strong> on
            peer to peer markets. In India, it&apos;s <strong className="text-[#E0E0FF]">$1.13</strong>. In Pakistan,{' '}
            <strong className="text-[#E0E0FF]">$1.04</strong>. These aren&apos;t transaction fees, they&apos;re the premium
            people pay just to hold a dollar pegged stablecoin.
          </p>
          <p className="text-sm text-[#B0B0DD] leading-relaxed mb-4">
            These premiums are the market pricing for capital controls, inflation, regulatory friction, and the raw demand to exit
            a weakening local currency into something that holds its value. They&apos;re an invisible tax on the people who need
            dollar stability the most.
          </p>
          <p className="text-sm text-[#B0B0DD] leading-relaxed">
            We built a{' '}
            <Link href="/?view=premium" className="text-[#00F5FF] hover:underline">
              Dollar Premium Index
            </Link>{' '}
            that monitors USDT and USDC premiums across 16 emerging markets in real time, using P2P exchange data from Binance
            and Bybit. Here&apos;s what the data shows.
          </p>
        </section>

        {/* Overview stats */}
        <section className="mb-16">
          <div
            className="rounded-xl border border-[rgba(0,245,255,0.15)] backdrop-blur-md px-6 py-6"
            style={{ background: 'rgba(5, 5, 25, 0.85)' }}
          >
            <h3 className="text-[13px] font-mono tracking-[0.25em] text-[#00F5FF] uppercase mb-5">
              Overview
            </h3>
            <p className="text-sm text-[#B0B0DD] mb-6">
              Premium data across 16 emerging markets, as of February 2026.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard label="Countries Tracked" value="16" color="#00F5FF" />
              <StatCard label="Avg USDT Premium" value="+1.9%" color="#39FF14" />
              <StatCard label="Highest Premium" value="+18.5%" color="#FF1493" sub="Turkey USDC" />
              <StatCard label="High Demand (5%+)" value="3" color="#FFB800" sub="countries" />
            </div>
          </div>
        </section>

        {/* Key Takeaways */}
        <section className="max-w-2xl mb-16">
          <h3 className="text-[13px] font-mono tracking-[0.25em] text-[#00F5FF] uppercase mb-5">
            Key Takeaways
          </h3>
          <ul className="space-y-4">
            <Takeaway>
              <strong className="text-[#E0E0FF]">Turkey&apos;s USDC premium of +18.5% is a trust tax on the lira.</strong>{' '}
              The wide gap between USDT (+5.2%) and USDC (+18.5%) reflects how much thinner P2P liquidity
              is for Circle&apos;s stablecoin in a market desperate for dollar exposure.
            </Takeaway>
            <Takeaway>
              <strong className="text-[#E0E0FF]">USDC consistently trades higher than USDT.</strong>{' '}
              Across nearly every country we track, USDC commands a wider premium. Fewer P2P sellers,
              lower liquidity, and higher perceived quality all contribute.
            </Takeaway>
            <Takeaway>
              <strong className="text-[#E0E0FF]">Bans don&apos;t mean high premiums.</strong>{' '}
              Nigeria has banned crypto but its USDT premium is just +1.2%, the deepest P2P market in
              Africa keeps prices competitive. Meanwhile, Turkey&apos;s legal market carries a +5.2% USDT premium.
            </Takeaway>
            <Takeaway>
              <strong className="text-[#E0E0FF]">The premium measures demand to exit local currency into dollars.</strong>{' '}
              It&apos;s a real-time signal of how badly people want to hold a stable asset, filtered through
              the friction of their local financial system.
            </Takeaway>
          </ul>
        </section>

        {/* USDT vs USDC spread */}
        <section className="max-w-2xl mb-16">
          <h3 className="text-[13px] font-mono tracking-[0.25em] text-[#00F5FF] uppercase mb-5">
            Why USDC Almost Always Trades at a Higher Premium Than USDT
          </h3>
          <p className="text-sm text-[#B0B0DD] leading-relaxed mb-4">
            In almost every country we track, USDC commands a wider premium than USDT, sometimes dramatically so.
            Turkey&apos;s USDT premium is +5.2%, but USDC is +18.5%. India shows +6.1% for USDT vs +13.0% for USDC.
          </p>
          <p className="text-sm text-[#B0B0DD] leading-relaxed mb-4">
            Three factors explain the gap:
          </p>
          <ul className="space-y-3 mb-4">
            <li className="flex items-start gap-2.5 text-sm text-[#B0B0DD] leading-relaxed">
              <span className="text-[#00F5FF] mt-0.5 shrink-0">1.</span>
              <span><strong className="text-[#E0E0FF]">Fewer sellers.</strong> USDT dominates P2P markets. USDC sellers are rarer, so buyers pay more for the convenience of finding one.</span>
            </li>
            <li className="flex items-start gap-2.5 text-sm text-[#B0B0DD] leading-relaxed">
              <span className="text-[#00F5FF] mt-0.5 shrink-0">2.</span>
              <span><strong className="text-[#E0E0FF]">Lower liquidity.</strong> Less competition among USDC sellers means wider bid-ask spreads. The median of the top 5 ads is higher because there are simply fewer competitive offers.</span>
            </li>
            <li className="flex items-start gap-2.5 text-sm text-[#B0B0DD] leading-relaxed">
              <span className="text-[#00F5FF] mt-0.5 shrink-0">3.</span>
              <span><strong className="text-[#E0E0FF]">Perceived quality premium.</strong> Some buyers prefer USDC for its transparency and US-regulated reserves. In markets with deep distrust of opaque institutions, that perception commands a price.</span>
            </li>
          </ul>
          <p className="text-sm text-[#B0B0DD] leading-relaxed">
            The USDT-USDC spread within a country is itself a signal, it reveals how deep the local P2P market is
            and how much buyers value regulatory backing in a stablecoin.
          </p>
        </section>

        {/* Country breakdown intro */}
        <section className="max-w-2xl mb-12">
          <h3 className="text-[13px] font-mono tracking-[0.25em] text-[#00F5FF] uppercase mb-5">
            Country Breakdown
          </h3>
          <p className="text-sm text-[#B0B0DD] leading-relaxed mb-4">
            The{' '}
            <Link href="/?view=premium" className="text-[#00F5FF] hover:underline">Dollar Premium Index</Link>{' '}
            tracks the numbers, but numbers alone don&apos;t explain why premiums exist. Below we break down all 16 countries
            with the context behind each, capital controls, tax policy, P2P liquidity, and local currency dynamics that
            drive the cost of $1 in each market. Premiums shown are as of <strong className="text-[#E0E0FF]">February 26, 2026</strong> and
            are grouped by USDT premium: high (5%+), moderate (2–5%), and low (&lt;2%).
          </p>
        </section>

        {/* High Premium Countries */}
        <PremiumSection
          title="High Premium Countries"
          description="These countries have stablecoin premiums above 5% for at least one stablecoin. Capital controls, currency weakness, and regulatory friction drive persistent demand for dollar-pegged assets."
          color="#FF1493"
          threshold="5%+"
          countries={highPremium}
        />

        {/* Moderate Premium Countries */}
        <PremiumSection
          title="Moderate Premium Countries"
          description="Premiums between 2% and 5%. These markets have meaningful demand for dollar stablecoins but more liquid P2P markets or fewer regulatory barriers keep spreads tighter."
          color="#FFB800"
          threshold="2–5%"
          countries={moderatePremium}
        />

        {/* Low Premium Countries */}
        <PremiumSection
          title="Low Premium Countries"
          description="Premiums below 2%. Deep liquidity, regulated exchanges, or strong competition among P2P sellers keep stablecoin prices close to the official dollar rate."
          color="#39FF14"
          threshold="<2%"
          countries={lowPremium}
        />

        {/* Methodology */}
        <section className="max-w-2xl mb-16">
          <h3 className="text-[13px] font-mono tracking-[0.25em] text-[#00F5FF] uppercase mb-5">
            Methodology
          </h3>
          <div
            className="rounded-xl border border-[rgba(0,245,255,0.1)] backdrop-blur-md px-6 py-5"
            style={{ background: 'rgba(5, 5, 25, 0.85)' }}
          >
            <div className="space-y-4 text-sm text-[#B0B0DD] leading-relaxed">
              <div>
                <p className="text-[11px] font-mono tracking-wider text-[#7070AA] mb-1">DATA SOURCES</p>
                <p>
                  P2P prices from <strong className="text-[#E0E0FF]">Binance P2P</strong> (primary) and{' '}
                  <strong className="text-[#E0E0FF]">Bybit P2P</strong> (fallback). Official exchange rates from{' '}
                  <strong className="text-[#E0E0FF]">open.er-api.com</strong>.
                </p>
              </div>
              <div>
                <p className="text-[11px] font-mono tracking-wider text-[#7070AA] mb-1">CALCULATION</p>
                <p>
                  We take the <strong className="text-[#E0E0FF]">median of the top 5 P2P sell ads</strong> (minimum
                  3 ads required) and compare it to the official USD exchange rate for the local currency.
                </p>
              </div>
              <div>
                <p className="text-[11px] font-mono tracking-wider text-[#7070AA] mb-1">FORMULA</p>
                <p className="font-mono text-[#E0E0FF] text-xs">
                  Premium = ((P2P median price / official FX rate) - 1) &times; 100
                </p>
              </div>
              <div>
                <p className="text-[11px] font-mono tracking-wider text-[#7070AA] mb-1">REFRESH RATE</p>
                <p>
                  Data is refreshed every <strong className="text-[#E0E0FF]">15 minutes</strong> and cached via Redis.
                  Premiums shown in this article reflect values at time of writing and will fluctuate.
                </p>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-0 h-px bg-[rgba(255,255,255,0.08)] mb-12" />

        {/* CTA */}
        <section className="flex flex-col items-center text-center pt-4 pb-8">
          <p className="text-sm text-[#7070AA] mb-6 max-w-md">
            See live premiums across all 16 countries. Track how the cost of $1 changes in real time.
          </p>
          <Link
            href="/?view=premium"
            className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-mono tracking-wider text-[#030308] font-bold transition-all duration-200"
            style={{
              background: 'linear-gradient(135deg, #00F5FF 0%, #4D4DFF 100%)',
              boxShadow: '0 0 30px rgba(0,245,255,0.3), 0 0 60px rgba(0,245,255,0.1)',
            }}
          >
            EXPLORE THE PREMIUM INDEX
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover:translate-x-1">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </section>
      </article>

      {/* Footer */}
      <footer className="border-t border-[rgba(0,245,255,0.1)] px-6 md:px-16 lg:px-24 py-8">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-mono tracking-[0.15em] text-[#7070AA]">STABLECOIN PULSE</p>
          <Link
            href="/blog"
            className="text-[11px] font-mono tracking-wider text-[#7070AA] hover:text-[#00F5FF] transition-colors"
          >
            &larr; ALL POSTS
          </Link>
        </div>
      </footer>
    </div>
  );
}

function StatCard({ label, value, color, sub }: { label: string; value: string; color: string; sub?: string }) {
  return (
    <div
      className="rounded-lg border px-4 py-3 text-center"
      style={{
        borderColor: `${color}33`,
        background: `${color}08`,
      }}
    >
      <p className="text-2xl font-bold" style={{ color }}>
        {value}
      </p>
      <p className="text-[10px] font-mono tracking-wider text-[#7070AA] mt-1">
        {label.toUpperCase()}
      </p>
      {sub && (
        <p className="text-[9px] font-mono text-[#7070AA] mt-0.5">{sub}</p>
      )}
    </div>
  );
}

function PremiumSection({
  title,
  description,
  color,
  threshold,
  countries,
}: {
  title: string;
  description: string;
  color: string;
  threshold: string;
  countries: CountryPremium[];
}) {
  return (
    <section className="mb-16">
      <div className="flex items-center gap-3 mb-4">
        <span
          className="block h-3 w-3 rounded-full shrink-0"
          style={{ background: color, boxShadow: `0 0 10px ${color}66` }}
        />
        <h3
          className="text-[13px] font-mono tracking-[0.25em] uppercase"
          style={{ color }}
        >
          {title}
        </h3>
        <span className="text-[11px] font-mono text-[#7070AA]">
          ({threshold})
        </span>
      </div>
      <p className="text-sm text-[#7070AA] leading-relaxed max-w-2xl mb-6">
        {description}
      </p>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {countries.map((country) => (
          <PremiumCountryCard key={country.iso2} country={country} color={color} />
        ))}
      </div>
    </section>
  );
}

function PremiumCountryCard({ country, color }: { country: CountryPremium; color: string }) {
  return (
    <div
      className="rounded-xl border border-[rgba(0,245,255,0.1)] backdrop-blur-md px-5 py-4"
      style={{ background: 'rgba(5, 5, 25, 0.85)' }}
    >
      <div className="flex items-center gap-2.5 mb-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://flagcdn.com/20x15/${country.iso2.toLowerCase()}.png`}
          alt={`${country.name} flag`}
          width={20}
          height={15}
          className="rounded-sm"
        />
        <h4 className="text-sm font-bold text-[#E0E0FF]">{country.name}</h4>
        <span className="text-[10px] font-mono text-[#7070AA] ml-auto">{country.iso2}</span>
      </div>
      <div className="flex items-center gap-4 mb-3">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-mono text-[#7070AA]">USDT</span>
          <span className="text-sm font-bold font-mono" style={{ color }}>
            {country.usdt}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-mono text-[#7070AA]">USDC</span>
          <span className="text-sm font-bold font-mono" style={{ color: country.usdc ? color : '#7070AA' }}>
            {country.usdc ?? '—'}
          </span>
        </div>
      </div>
      <p className="text-xs text-[#B0B0DD] leading-relaxed">{country.note}</p>
    </div>
  );
}

function Takeaway({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5 text-sm text-[#B0B0DD] leading-relaxed">
      <span className="text-[#00F5FF] mt-0.5 shrink-0">&#9670;</span>
      <span>{children}</span>
    </li>
  );
}
