import type { Metadata } from 'next';
import Link from 'next/link';
import PageNavHeader from '@/components/PageNavHeader';

export const metadata: Metadata = {
  title: 'Stablecoin Ratings: A Scoring System You Can Actually Check | Stablecoin Pulse',
  description:
    'We rated 14 stablecoins across 6 pillars with every score explained and every claim linked to its source. Here\'s how the system works and what we found.',
  openGraph: {
    title: 'Stablecoin Ratings: A Scoring System You Can Actually Check',
    description:
      'We rated 14 stablecoins across 6 pillars. Every score explained. Every claim sourced. USDC got an A-. USDT got a C. Here\'s why.',
    type: 'article',
  },
  keywords: [
    'stablecoin ratings',
    'stablecoin risk',
    'USDT rating',
    'USDC rating',
    'stablecoin safety',
    'stablecoin scoring',
    'stablecoin comparison',
    'pulse score',
    'stablecoin audit',
    'stablecoin reserves',
    'stablecoin transparency',
    'GENIUS Act stablecoins',
  ],
};

type RatingRow = {
  ticker: string;
  score: number;
  grade: string;
  issuer: string;
  highlight: string;
};

const tier1: RatingRow[] = [
  { ticker: 'USDC', score: 84, grade: 'A-', issuer: 'Circle', highlight: 'Strongest all-around. Deloitte attestation, clean reserves, MiCA-compliant.' },
  { ticker: 'RLUSD', score: 68, grade: 'B-', issuer: 'Ripple', highlight: 'NYDFS-approved, BNY Mellon custody, Deloitte attestation. But no published smart contract audit.' },
  { ticker: 'PYUSD', score: 69, grade: 'B-', issuer: 'Paxos / PayPal', highlight: 'Big Four (KPMG) attestation, NYDFS-regulated. Low adoption holds it back.' },
  { ticker: 'DAI', score: 61, grade: 'C+', issuer: 'Sky (MakerDAO)', highlight: 'Most battle-tested DeFi stablecoin. Fully on-chain, but unclear regulatory future.' },
  { ticker: 'USDS', score: 60, grade: 'C+', issuer: 'Sky (MakerDAO)', highlight: 'DAI successor. Same transparency strengths, same regulatory uncertainty.' },
  { ticker: 'USDT', score: 58, grade: 'C', issuer: 'Tether', highlight: 'Most used stablecoin globally. Transparency and regulatory gaps keep the score low.' },
  { ticker: 'FDUSD', score: 52, grade: 'C-', issuer: 'First Digital Labs', highlight: 'Clean reserves but narrow adoption. Heavily dependent on Binance.' },
  { ticker: 'USDe', score: 43, grade: 'D', issuer: 'Ethena Labs', highlight: 'Synthetic model with exchange counterparty risk. Novel but unproven under stress.' },
  { ticker: 'USD1', score: 42, grade: 'D', issuer: 'World Liberty Financial', highlight: 'Fast-growing but too new. Political ties and no regulatory clarity.' },
];

const tier2: RatingRow[] = [
  { ticker: 'EURC', score: 73, grade: 'B', issuer: 'Circle', highlight: 'Best-regulated EUR stablecoin. MiCA-compliant. Small but growing.' },
  { ticker: 'GUSD', score: 65, grade: 'B-', issuer: 'Gemini', highlight: 'Pristine reserves (State Street custody, NYDFS-regulated). Almost no adoption.' },
  { ticker: 'FRAX', score: 53, grade: 'C-', issuer: 'Frax Finance', highlight: 'Evolved from risky fractional model to fully collateralized. Improving.' },
  { ticker: 'USDD', score: 24, grade: 'F', issuer: 'Tron DAO Reserve', highlight: 'Unverified reserves, disputed collateral ratios, no regulation.' },
  { ticker: 'TUSD', score: 9, grade: 'F', issuer: 'Techteryx', highlight: 'Effectively bankrupt. Reserve mismanagement, halted audits. Avoid.' },
];

function GradeChip({ grade }: { grade: string }) {
  const color = grade.startsWith('A') ? '#00E5A0'
    : grade.startsWith('B') ? '#00F5FF'
    : grade.startsWith('C') ? '#FFB800'
    : grade.startsWith('D') ? '#FF6B6B'
    : '#FF1493';
  return (
    <span
      className="inline-flex items-center justify-center w-8 h-6 rounded text-[11px] font-mono font-bold border"
      style={{ color, borderColor: `${color}40`, background: `${color}12` }}
    >
      {grade}
    </span>
  );
}

function RatingTable({ rows, label }: { rows: RatingRow[]; label: string }) {
  return (
    <div className="mb-8">
      <h3 className="text-[10px] font-mono tracking-[0.2em] text-[#7070AA] uppercase mb-3">{label}</h3>
      <div className="space-y-2">
        {rows.map((r) => (
          <div
            key={r.ticker}
            className="flex items-start gap-3 rounded-lg border border-[rgba(0,245,255,0.08)] px-4 py-3"
            style={{ background: 'rgba(5, 5, 25, 0.8)' }}
          >
            <GradeChip grade={r.grade} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-sm font-mono font-bold text-[#E0E0FF]">{r.ticker}</span>
                <span className="text-[10px] font-mono text-[#7070AA]">{r.score}/100</span>
                <span className="text-[10px] text-[#7070AA]">· {r.issuer}</span>
              </div>
              <p className="text-[11px] text-[#7070AA] leading-relaxed">{r.highlight}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Pillar({ name, pts, description }: { name: string; pts: number; description: string }) {
  return (
    <div className="flex items-start gap-3">
      <span
        className="text-[11px] font-mono font-bold text-[#00F5FF] bg-[rgba(0,245,255,0.08)] border border-[rgba(0,245,255,0.2)] rounded px-2 py-0.5 flex-shrink-0 mt-0.5"
      >
        {pts}
      </span>
      <div>
        <span className="text-sm font-bold text-[#E0E0FF]">{name}</span>
        <p className="text-[11px] text-[#7070AA] leading-relaxed mt-0.5">{description}</p>
      </div>
    </div>
  );
}

export default function RatingsPostPage() {
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
              <time className="text-[11px] font-mono tracking-wider text-[#7070AA]">March 13, 2026</time>
              <span className="text-[10px] text-[#7070AA]">&bull;</span>
              <span className="text-[11px] font-mono tracking-wider text-[#7070AA]">8 min read</span>
            </div>
            <h2
              className="text-2xl md:text-4xl font-bold tracking-tight text-[#E0E0FF] max-w-2xl leading-tight"
              style={{ textShadow: '0 0 30px rgba(0,245,255,0.2)' }}
            >
              Stablecoin Ratings: A Scoring System You Can Actually Check
            </h2>
            <p className="text-base text-[#7070AA] mt-4 max-w-xl leading-relaxed">
              We rated 14 stablecoins across 6 pillars. Every score explained. Every claim linked to its source. Here&apos;s how the system works and what we found.
            </p>
          </div>
        </header>

        {/* Intro */}
        <section className="max-w-2xl mb-12">
          <h3
            className="text-lg font-bold text-[#E0E0FF] mb-3"
            style={{ textShadow: '0 0 15px rgba(0,245,255,0.15)' }}
          >
            The Problem
          </h3>
          <p className="text-sm text-[#C0C0E0] leading-relaxed mb-4">
            Most stablecoin analysis gives you a letter grade and asks you to trust it. You get &ldquo;A&rdquo; or &ldquo;High Risk&rdquo; with no way to verify how they got there. The methodology is vague, the data sources are unlisted, and the scores feel arbitrary.
          </p>
          <p className="text-sm text-[#C0C0E0] leading-relaxed mb-4">
            This matters because people are storing real savings in stablecoins. In Nigeria, Turkey, and Argentina, USDT is a lifeline against currency depreciation. In DeFi, stablecoin choice determines protocol risk. The question &ldquo;is this stablecoin safe?&rdquo; deserves a better answer than &ldquo;trust us.&rdquo;
          </p>
          <p className="text-sm text-[#C0C0E0] leading-relaxed">
            So we built a scoring system where every point is explained, every claim links to its source, and the full rubric is published so anyone can reproduce our scores or disagree with them.
          </p>
        </section>

        {/* How it works */}
        <section className="max-w-2xl mb-12">
          <h3
            className="text-lg font-bold text-[#E0E0FF] mb-3"
            style={{ textShadow: '0 0 15px rgba(0,245,255,0.15)' }}
          >
            How It Works
          </h3>
          <p className="text-sm text-[#C0C0E0] leading-relaxed mb-6">
            The Pulse Score rates stablecoins on a 100-point scale across 6 pillars. Each pillar has sub-criteria with defined scoring tiers, so you can trace exactly why a coin scored what it did.
          </p>
          <div className="space-y-4">
            <Pillar
              name="Reserve Quality"
              pts={25}
              description="What actually backs the stablecoin? We score composition (cash/T-bills vs. crypto), custodian quality (BNY Mellon vs. undisclosed), reserve buffer, and track record."
            />
            <Pillar
              name="Transparency & Audit"
              pts={20}
              description="Who checks the reserves and how often? Big Four attestation scores higher than mid-tier firms. Monthly reports beat quarterly. On-chain verifiability adds points."
            />
            <Pillar
              name="Peg Stability"
              pts={20}
              description="Does it actually stay at $1? We look at historical deviation, recovery speed after stress events, DEX liquidity depth, and CEX exchange coverage."
            />
            <Pillar
              name="Regulatory Standing"
              pts={15}
              description="Is it legal? US licensing (NYDFS is the gold standard), MiCA status in Europe, multi-jurisdiction presence, and compliance record."
            />
            <Pillar
              name="Smart Contract Risk"
              pts={10}
              description="Can the code be exploited? Audit coverage, years of battle-testing, and whether upgrades require governance approval or a single admin key."
            />
            <Pillar
              name="Market Adoption"
              pts={10}
              description="Does anyone actually use it? Market cap, DeFi integration depth, cross-chain presence, and geographic breadth of usage."
            />
          </div>
        </section>

        {/* Why these weights */}
        <section className="max-w-2xl mb-12">
          <h3
            className="text-lg font-bold text-[#E0E0FF] mb-3"
            style={{ textShadow: '0 0 15px rgba(0,245,255,0.15)' }}
          >
            Why These Weights?
          </h3>
          <p className="text-sm text-[#C0C0E0] leading-relaxed mb-4">
            Reserve quality gets the most points (25) because it&apos;s the most fundamental question: if everyone redeemed at once, would there be enough money? This is what killed UST and is currently killing TUSD.
          </p>
          <p className="text-sm text-[#C0C0E0] leading-relaxed mb-4">
            Transparency gets 20 because reserves are only as credible as the evidence behind them. Tether claims $102B in US Treasuries, but without a full audit, you&apos;re taking their word for it.
          </p>
          <p className="text-sm text-[#C0C0E0] leading-relaxed mb-4">
            Peg stability gets 20 because it&apos;s the whole point. A stablecoin that depegs under stress has failed its core promise, regardless of what backs it.
          </p>
          <p className="text-sm text-[#C0C0E0] leading-relaxed">
            Regulatory standing (15), smart contract risk (10), and adoption (10) matter but are secondary. A well-regulated stablecoin with bad reserves is still unsafe. A widely adopted stablecoin with no audit is still risky.
          </p>
        </section>

        {/* Results */}
        <section className="max-w-2xl mb-12">
          <h3
            className="text-lg font-bold text-[#E0E0FF] mb-4"
            style={{ textShadow: '0 0 15px rgba(0,245,255,0.15)' }}
          >
            The Scores
          </h3>
          <RatingTable rows={tier1} label="Major stablecoins" />
          <RatingTable rows={tier2} label="Other rated stablecoins" />
        </section>

        {/* Surprises */}
        <section className="max-w-2xl mb-12">
          <h3
            className="text-lg font-bold text-[#E0E0FF] mb-3"
            style={{ textShadow: '0 0 15px rgba(0,245,255,0.15)' }}
          >
            What Surprised Us
          </h3>
          <div className="space-y-4">
            <div
              className="rounded-xl border border-[rgba(0,245,255,0.12)] px-5 py-4"
              style={{ background: 'rgba(5, 5, 25, 0.8)' }}
            >
              <p className="text-sm font-bold text-[#E0E0FF] mb-1">USDT scores a C despite being the most used stablecoin</p>
              <p className="text-[11px] text-[#7070AA] leading-relaxed">
                $183B in circulation and ~70% market share, but it scores 58/100. The gap is transparency: quarterly attestations by BDO Italia (not Big Four), no full audit despite $10B+ annual profit, and non-traditional reserve assets (Bitcoin, gold, secured loans) that add volatility. It also scored just 2/15 on regulatory: not MiCA-compliant, delisted from EU exchanges, and under DOJ investigation. Being popular doesn&apos;t mean being safe.
              </p>
            </div>
            <div
              className="rounded-xl border border-[rgba(0,245,255,0.12)] px-5 py-4"
              style={{ background: 'rgba(5, 5, 25, 0.8)' }}
            >
              <p className="text-sm font-bold text-[#E0E0FF] mb-1">GUSD (Gemini) nearly matches PYUSD (PayPal) despite having 0.1% of its reach</p>
              <p className="text-[11px] text-[#7070AA] leading-relaxed">
                Gemini Dollar has an $80M market cap and almost nobody uses it. PayPal USD has 400M+ PayPal users as a distribution channel. Yet GUSD scores 65 (B-) vs. PYUSD&apos;s 69 (B-). The gap is just 4 points. GUSD&apos;s pristine reserves (100% cash and T-bills at State Street Bank) and its 23/25 reserve score nearly close the gap that PayPal&apos;s brand and KPMG attestation create. Reserve quality and regulation can carry a stablecoin even without adoption.
              </p>
            </div>
            <div
              className="rounded-xl border border-[rgba(0,245,255,0.12)] px-5 py-4"
              style={{ background: 'rgba(5, 5, 25, 0.8)' }}
            >
              <p className="text-sm font-bold text-[#E0E0FF] mb-1">Decentralized stablecoins score lower than you&apos;d expect</p>
              <p className="text-[11px] text-[#7070AA] leading-relaxed">
                DAI and USDS both score C+ (61 and 60). They&apos;re the most transparent stablecoins: fully on-chain collateral, public governance, years of battle-testing. But the rubric penalizes them on regulation (no licenses, unclear GENIUS Act status) and on transparency&apos;s attestation sub-criterion (on-chain verifiability scores well, but there&apos;s no formal audit of off-chain RWA positions). Decentralization is a feature, but it doesn&apos;t solve regulatory risk.
              </p>
            </div>
            <div
              className="rounded-xl border border-[rgba(0,245,255,0.12)] px-5 py-4"
              style={{ background: 'rgba(5, 5, 25, 0.8)' }}
            >
              <p className="text-sm font-bold text-[#E0E0FF] mb-1">TUSD is a 9/100</p>
              <p className="text-[11px] text-[#7070AA] leading-relaxed">
                TrueUSD scored the lowest of all 14 stablecoins. $456M stuck in illiquid investments, attestation reports halted, delisted from major exchanges, frequent depegs below $0.98, no active regulatory licenses, and under investigation. It&apos;s a cautionary example of what happens when a stablecoin issuer fails, and why ratings matter.
              </p>
            </div>
          </div>
        </section>

        {/* GENIUS Act */}
        <section className="max-w-2xl mb-12">
          <h3
            className="text-lg font-bold text-[#E0E0FF] mb-3"
            style={{ textShadow: '0 0 15px rgba(0,245,255,0.15)' }}
          >
            The GENIUS Act Changes Everything
          </h3>
          <p className="text-sm text-[#C0C0E0] leading-relaxed mb-4">
            The GENIUS Act (Guiding and Establishing National Innovation for US Stablecoins), currently moving through Congress, would create the first comprehensive US regulatory framework for stablecoins. If passed, it would require issuers to hold 1:1 reserves in high-quality liquid assets, submit to regular audits, and register with federal or state regulators.
          </p>
          <p className="text-sm text-[#C0C0E0] leading-relaxed mb-4">
            This would fundamentally reshape the landscape. Stablecoins that already meet these standards (USDC, PYUSD, GUSD, RLUSD) are well-positioned. Stablecoins that don&apos;t (USDT, decentralized issuers, synthetic models like USDe) face hard choices: comply, relocate, or lose US market access.
          </p>
          <p className="text-sm text-[#C0C0E0] leading-relaxed">
            Our regulatory pillar already factors in GENIUS Act readiness. As the legislation evolves, so will our scores.
          </p>
        </section>

        {/* What we got wrong */}
        <section className="max-w-2xl mb-12">
          <h3
            className="text-lg font-bold text-[#E0E0FF] mb-3"
            style={{ textShadow: '0 0 15px rgba(0,245,255,0.15)' }}
          >
            What We Might Be Getting Wrong
          </h3>
          <p className="text-sm text-[#C0C0E0] leading-relaxed mb-4">
            No rating system is perfect. Here&apos;s where ours has known limitations:
          </p>
          <ul className="space-y-2 text-sm text-[#C0C0E0] leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-[#7070AA] mt-1 flex-shrink-0">1.</span>
              <span><strong className="text-[#E0E0FF]">Adoption is underweighted.</strong> A stablecoin that millions of people depend on daily (USDT) gets the same 10 adoption points as one nobody uses. You could argue that real-world dependency should count for more.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#7070AA] mt-1 flex-shrink-0">2.</span>
              <span><strong className="text-[#E0E0FF]">Decentralization isn&apos;t a pillar.</strong> We score decentralized and centralized stablecoins on the same rubric. This means DAI&apos;s censorship resistance doesn&apos;t get explicit credit, while its lack of formal regulation gets penalized.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#7070AA] mt-1 flex-shrink-0">3.</span>
              <span><strong className="text-[#E0E0FF]">Point-in-time data.</strong> Ratings reflect current state, not trajectory. FRAX has improved dramatically (fractional to fully collateralized), but its score doesn&apos;t capture momentum.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#7070AA] mt-1 flex-shrink-0">4.</span>
              <span><strong className="text-[#E0E0FF]">US-centric regulatory bias.</strong> NYDFS licensing is the gold standard in our rubric. This favors US-regulated issuers over equally rigorous frameworks in Singapore (MAS) or Switzerland (FINMA).</span>
            </li>
          </ul>
          <p className="text-sm text-[#C0C0E0] leading-relaxed mt-4">
            We publish the rubric so you can weigh these trade-offs yourself. If you think adoption should be 20 points instead of 10, you can rescore every stablecoin using our own criteria.
          </p>
        </section>

        {/* CTA */}
        <section className="max-w-2xl mb-12">
          <div
            className="rounded-xl border border-[rgba(0,245,255,0.2)] px-6 py-6"
            style={{ background: 'rgba(0,245,255,0.04)' }}
          >
            <h3 className="text-lg font-bold text-[#E0E0FF] mb-2">See the full ratings</h3>
            <p className="text-sm text-[#C0C0E0] leading-relaxed mb-4">
              Every stablecoin. Every pillar score. Every source link. The full scoring rubric. No signup required.
            </p>
            <Link
              href="/ratings"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-mono tracking-wider border border-[rgba(0,245,255,0.4)] text-[#00F5FF] hover:bg-[rgba(0,245,255,0.08)] transition-colors"
            >
              VIEW RATINGS
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>

        {/* Methodology note */}
        <section className="max-w-2xl">
          <p className="text-[10px] font-mono text-[#7070AA] leading-relaxed">
            Ratings are updated when material changes occur (reserve reports, regulatory decisions, depeg events).
            Data sources: issuer attestation reports, CoinGecko, DeFi Llama, on-chain data, regulatory filings.
            The full scoring rubric with sub-criteria is published on the <Link href="/ratings" className="text-[#00F5FF] hover:underline">ratings page</Link>.
            Not financial advice.
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
