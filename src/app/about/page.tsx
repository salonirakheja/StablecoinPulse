import type { Metadata } from 'next';
import Link from 'next/link';
import Collapsible from './Collapsible';
import CountUpStats from './CountUpStats';
import HoverCard from './HoverCard';

export const metadata: Metadata = {
  title: 'About — Stablecoin Pulse',
  description:
    'Stablecoin Pulse is a real-time 3D visualization of global stablecoin trading volume and regulation status. Live data from 500+ exchanges, 6 blockchains, and government sources across 45+ countries.',
};

const regulationCategories = [
  { label: 'Regulated', color: '#39FF14', description: 'Clear legal framework for stablecoin usage and exchange operations.' },
  { label: 'Partial', color: '#FFD700', description: 'Some regulation exists but gaps remain. Exchanges operate in a gray area.' },
  { label: 'Restricted', color: '#FF4444', description: 'Significant restrictions on crypto trading or stablecoin usage.' },
  { label: 'Unclear', color: '#7070AA', description: 'No official stance or legislation is pending. Regulatory status is ambiguous.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#030308]">
      {/* Header */}
      <header className="border-b border-[rgba(0,245,255,0.1)] px-6 py-6 md:px-16 lg:px-24">
        <div className="flex items-center justify-between">
          <div>
            <h1
              className="text-sm font-bold tracking-[0.25em] text-[#E0E0FF]"
              style={{ textShadow: '0 0 20px rgba(0,245,255,0.4), 0 0 40px rgba(0,245,255,0.15)' }}
            >
              STABLECOIN PULSE
            </h1>
            <p className="text-[10px] font-mono tracking-[0.15em] text-[#7070AA] mt-0.5">ABOUT</p>
          </div>
          <Link
            href="/"
            className="px-4 py-2 rounded-xl text-xs font-mono tracking-wider backdrop-blur-md border border-[rgba(0,245,255,0.3)] text-[#00F5FF] transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,245,255,0.3)]"
            style={{ background: 'rgba(5, 5, 25, 0.75)' }}
          >
            &larr; BACK TO GLOBE
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative px-6 pt-20 pb-16 md:px-16 lg:px-24 overflow-hidden">
        {/* Gradient accent */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-30 blur-[100px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(0,245,255,0.4) 0%, rgba(77,77,255,0.2) 50%, transparent 70%)' }}
        />
        <div className="relative">
          <p className="text-[13px] font-mono tracking-[0.25em] text-[#00F5FF] mb-4">REAL-TIME GLOBAL DATA</p>
          <h2
            className="text-2xl md:text-4xl font-bold tracking-tight text-[#E0E0FF] max-w-xl leading-tight"
            style={{ textShadow: '0 0 30px rgba(0,245,255,0.2)' }}
          >
            The world&apos;s stablecoin activity, visualized in real time.
          </h2>
          <p className="text-sm text-[#7070AA] mt-4 max-w-lg leading-relaxed">
            Track where crypto dollars move across 80+ countries. Live volume data, regulation status, and on-chain supply on a single interactive globe.
          </p>
          <div
            className="inline-flex items-center gap-1.5 mt-5 px-3 py-1.5 rounded-full border border-[rgba(0,245,255,0.25)] text-[10px] font-mono tracking-wider text-[#7070AA]"
            style={{ background: 'rgba(0,245,255,0.04)' }}
          >
            <span className="text-[#00F5FF]">&#10022;</span>
            Data refreshes every 15 minutes
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="px-6 md:px-16 lg:px-24 pb-16">
        <CountUpStats />
      </section>

      {/* Content */}
      <main className="px-6 md:px-16 lg:px-24 space-y-10 pb-16">
        {/* What is this */}
        <section>
          <SectionLabel>What is this</SectionLabel>
          <p className="text-sm text-[#B0B0DD] leading-relaxed max-w-2xl">
            Stablecoin Pulse is a real-time 3D visualization of global stablecoin trading volume and regulation status.
            It shows where crypto dollars (USDT, USDC, and DAI) are being traded right now, aggregated from
            over 500 exchanges and 6 blockchains, and mapped onto an interactive globe. You can explore which countries
            move the most stablecoin volume, how each region regulates digital assets, and how on-chain supply
            distributes across the world.
          </p>
          <p className="text-sm text-[#7070AA] leading-relaxed max-w-2xl mt-3">
            Built for crypto traders tracking cross-border flows, researchers studying adoption patterns,
            regulators monitoring market activity, and emerging market users looking for access to stable digital dollars.
          </p>
        </section>

        <SectionDivider />

        {/* Why this matters */}
        <section>
          <SectionLabel>Why this matters</SectionLabel>
          <p className="text-sm text-[#B0B0DD] leading-relaxed max-w-2xl">
            Stablecoins are the most widely used crypto asset in emerging markets, yet there is no single place
            to see where they flow globally. Billions of dollars move through exchanges every day with no clear
            visibility into regional patterns. Stablecoin Pulse makes this activity visible so anyone can
            understand how digital dollars actually move around the world.
          </p>
        </section>

        <SectionDivider />

        {/* How it works */}
        <section>
          <SectionLabel>How it works</SectionLabel>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
            <HoverCard
              title="Exchange Volume"
              source="CoinGecko"
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#00F5FF]">
                  <path d="M3 3v18h18" />
                  <path d="M7 16l4-6 4 4 5-8" />
                </svg>
              }
            >
              Real-time 24h trading volume from ~500 exchanges worldwide. Each exchange is mapped to its
              headquarters country. Covers USDT, USDC, and DAI spot pairs across all major and regional platforms.
            </HoverCard>
            <HoverCard
              title="On-Chain Supply"
              source="DefiLlama"
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#00F5FF]">
                  <rect x="2" y="7" width="6" height="10" rx="1" />
                  <rect x="9" y="4" width="6" height="16" rx="1" />
                  <rect x="16" y="10" width="6" height="7" rx="1" />
                  <path d="M5 5V4M12 2V1M19 8V7" strokeLinecap="round" />
                </svg>
              }
            >
              Total circulating supply tracked across 6 chains: Ethereum, Tron, BSC, Solana, Avalanche, and Polygon.
              Provides market cap and chain-level breakdown for each stablecoin.
            </HoverCard>
            <HoverCard
              title="Regional Modeling"
              source="Chainalysis Patterns"
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#00F5FF]">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20" />
                  <ellipse cx="12" cy="12" rx="4" ry="10" />
                </svg>
              }
            >
              Country-level volume estimates use exchange headquarters data combined with Chainalysis regional
              adoption patterns. Tax-haven exchanges are redistributed to actual user countries for accuracy.
            </HoverCard>
          </div>
        </section>

        <SectionDivider />

        {/* Regulation Map */}
        <section>
          <SectionLabel>Regulation Map</SectionLabel>
          <p className="text-sm text-[#B0B0DD] leading-relaxed max-w-2xl mb-3">
            The regulation view categorizes each country into one of four statuses based on their official
            stance toward stablecoins and cryptocurrency.
          </p>
          <p className="text-sm text-[#7070AA] leading-relaxed max-w-2xl mb-6">
            Understanding regulation status is critical for anyone making cross-border decisions, whether
            you are choosing an exchange, evaluating compliance risk, or moving funds between jurisdictions.
          </p>
          <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
            {regulationCategories.map((cat) => (
              <div
                key={cat.label}
                className="rounded-xl border border-[rgba(0,245,255,0.1)] backdrop-blur-md px-4 py-3 flex items-start gap-3"
                style={{ background: 'rgba(5, 5, 25, 0.85)' }}
              >
                <span
                  className="mt-0.5 block h-3 w-3 rounded-full shrink-0"
                  style={{ background: cat.color, boxShadow: `0 0 8px ${cat.color}44` }}
                />
                <div>
                  <span className="text-xs font-mono tracking-wider text-[#E0E0FF]">{cat.label.toUpperCase()}</span>
                  <p className="text-xs text-[#7070AA] mt-1 leading-relaxed">{cat.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <SectionDivider />

        {/* Data Sources */}
        <section>
          <SectionLabel>Data Sources</SectionLabel>
          <ul className="space-y-3">
            <SourceItem name="CoinGecko">Exchange metadata, real-time stablecoin trading volumes</SourceItem>
            <SourceItem name="DefiLlama">On-chain stablecoin supply, market caps, chain breakdown</SourceItem>
            <SourceItem name="Chainalysis">Regional crypto adoption patterns for volume modeling</SourceItem>
            <SourceItem name="Government Sources">Official regulatory publications and legal frameworks</SourceItem>
          </ul>
        </section>

        <SectionDivider />

        {/* Disclaimer (collapsible) */}
        <section>
          <Collapsible title="Disclaimer">
            <div
              className="rounded-xl border border-[rgba(255,255,255,0.06)] backdrop-blur-md px-5 py-4 text-xs text-[#7070AA] leading-relaxed space-y-2 max-w-2xl"
              style={{ background: 'rgba(5, 5, 25, 0.6)' }}
            >
              <p>
                This tool is for informational and educational purposes only. It does not constitute financial,
                legal, or investment advice.
              </p>
              <p>
                Data refreshes approximately every 15 minutes. Volume figures are estimates based on available
                exchange and on-chain data and may not capture all activity.
              </p>
              <p>
                Regulation statuses are based on publicly available information and are subject to change.
                Always verify current regulations through official government sources before making decisions.
              </p>
            </div>
          </Collapsible>
        </section>

        {/* CTA */}
        <section className="flex justify-center pt-4">
          <Link
            href="/"
            className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-mono tracking-wider text-[#030308] font-bold transition-all duration-200"
            style={{
              background: 'linear-gradient(135deg, #00F5FF 0%, #4D4DFF 100%)',
              boxShadow: '0 0 30px rgba(0,245,255,0.3), 0 0 60px rgba(0,245,255,0.1)',
            }}
          >
            EXPLORE THE GLOBE
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover:translate-x-1">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </section>

        {/* Footer */}
        <footer className="border-t border-[rgba(0,245,255,0.1)] pt-8 pb-4">
          <p className="text-[10px] font-mono tracking-[0.15em] text-[#7070AA]">STABLECOIN PULSE</p>
        </footer>
      </main>
    </div>
  );
}

function SectionDivider() {
  return <hr className="border-0 h-px bg-[rgba(255,255,255,0.08)]" />;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[13px] font-mono tracking-[0.25em] text-[#00F5FF] uppercase mb-5">
      {children}
    </h2>
  );
}

function SourceItem({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-2 text-sm text-[#B0B0DD]">
      <span className="text-[#00F5FF]">&bull;</span>
      <span><strong className="text-[#E0E0FF] font-mono text-xs">{name}</strong> / {children}</span>
    </li>
  );
}
