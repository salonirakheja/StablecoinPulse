import type { Metadata } from 'next';
import Link from 'next/link';
import PageNavHeader from '@/components/PageNavHeader';
import {
  STABLECOIN_REGULATIONS,
  REGULATION_COLORS,
  getRegulationStats,
  type RegulationStatus,
  type CountryRegulation,
} from '@/data/stablecoin-regulations';

export const metadata: Metadata = {
  title: 'Stablecoin Regulations by Country (2025) — Stablecoin Pulse',
  description:
    'A comprehensive guide to stablecoin regulation across 80+ countries in 2025. See which nations have clear crypto frameworks, which restrict stablecoins, and where the rules are still unclear.',
  openGraph: {
    title: 'Stablecoin Regulations by Country (2025)',
    description:
      'Comprehensive guide to stablecoin regulation across 80+ countries. Clear frameworks, restrictions, and gray areas.',
    type: 'article',
  },
  keywords: [
    'stablecoin regulations',
    'stablecoin regulations by country',
    'crypto regulation 2025',
    'USDT legal',
    'USDC regulation',
    'stablecoin law',
    'crypto legal status',
  ],
};

const stats = getRegulationStats();

const sections: {
  status: RegulationStatus;
  title: string;
  description: string;
}[] = [
  {
    status: 'regulated',
    title: 'Regulated Countries',
    description:
      'These countries have clear legal frameworks governing stablecoin issuance, trading, and usage. Exchanges operate under defined licenses, and users have regulatory protections.',
  },
  {
    status: 'partial',
    title: 'Partially Regulated Countries',
    description:
      'These countries have some crypto regulation but lack a comprehensive stablecoin-specific framework. Exchanges operate legally, but rules are evolving and gaps remain.',
  },
  {
    status: 'restricted',
    title: 'Restricted Countries',
    description:
      'These countries have banned or significantly restricted cryptocurrency trading and stablecoin usage. Users in these regions often rely on P2P markets and VPNs to access stablecoins.',
  },
  {
    status: 'unclear',
    title: 'Unclear Regulation',
    description:
      'These countries have no formal crypto legislation. Stablecoins exist in a legal gray area — not explicitly banned, but not authorized either. Regulatory frameworks are being discussed or drafted.',
  },
];

function getCountriesByStatus(status: RegulationStatus): CountryRegulation[] {
  return STABLECOIN_REGULATIONS.filter((r) => r.status === status);
}

export default function RegulationsPostPage() {
  return (
    <div className="min-h-screen bg-[#030308]">
      <PageNavHeader activePage="blog" />

      {/* Article */}
      <article className="px-6 md:px-16 lg:px-24 pb-20">
        {/* Title block */}
        <header className="relative pt-20 pb-12 overflow-hidden">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-30 blur-[100px] pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(0,245,255,0.4) 0%, rgba(77,77,255,0.2) 50%, transparent 70%)' }}
          />
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <time className="text-[11px] font-mono tracking-wider text-[#7070AA]">February 20, 2025</time>
              <span className="text-[10px] text-[#7070AA]">&bull;</span>
              <span className="text-[11px] font-mono tracking-wider text-[#7070AA]">12 min read</span>
            </div>
            <h2
              className="text-2xl md:text-4xl font-bold tracking-tight text-[#E0E0FF] max-w-2xl leading-tight"
              style={{ textShadow: '0 0 30px rgba(0,245,255,0.2)' }}
            >
              Stablecoin Regulations by Country (2025)
            </h2>
            <p className="text-sm text-[#7070AA] mt-4 max-w-2xl leading-relaxed">
              A comprehensive guide to how {stats.total} countries regulate stablecoins — from full legal frameworks to outright bans.
            </p>
          </div>
        </header>

        {/* Intro */}
        <section className="max-w-2xl mb-12">
          <p className="text-sm text-[#B0B0DD] leading-relaxed mb-4">
            Stablecoins have become the most widely used crypto asset in emerging markets. From a
            freelancer in Nigeria receiving USDT for contract work, to a family in Argentina hedging
            against peso devaluation with DAI, to a remittance from Dubai to the Philippines settled
            in USDC — stablecoins are the bridge between traditional finance and crypto.
          </p>
          <p className="text-sm text-[#B0B0DD] leading-relaxed mb-4">
            But regulation varies wildly. In the EU, stablecoins operate under MiCA with clear rules
            for issuers and exchanges. In China, all crypto transactions are banned. In Kenya, there
            are simply no rules at all.
          </p>
          <p className="text-sm text-[#B0B0DD] leading-relaxed">
            This guide covers the regulatory status of stablecoins in {stats.total} countries, organized into
            four categories: <strong className="text-[#39FF14]">Regulated</strong>,{' '}
            <strong className="text-[#FFB800]">Partially Regulated</strong>,{' '}
            <strong className="text-[#FF1493]">Restricted</strong>, and{' '}
            <strong className="text-[#7070AA]">Unclear</strong>. All data is sourced from official
            government publications, central bank statements, and regulatory agency announcements.
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
              {stats.total} countries analyzed across all major economic regions.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard
                label="Regulated"
                count={stats.regulated}
                color={REGULATION_COLORS.regulated}
              />
              <StatCard
                label="Partial"
                count={stats.partial}
                color={REGULATION_COLORS.partial}
              />
              <StatCard
                label="Restricted"
                count={stats.restricted}
                color={REGULATION_COLORS.restricted}
              />
              <StatCard
                label="Unclear"
                count={stats.unclear}
                color={REGULATION_COLORS.unclear}
              />
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
              <strong className="text-[#E0E0FF]">Europe leads on clarity.</strong>{' '}
              The EU&apos;s MiCA framework gives 20+ member states a unified rulebook for stablecoins.
              This is the most comprehensive regulatory approach globally.
            </Takeaway>
            <Takeaway>
              <strong className="text-[#E0E0FF]">Bans don&apos;t stop usage.</strong>{' '}
              In restricted markets like Nigeria, Egypt, and China, P2P stablecoin trading thrives
              despite official prohibitions. Demand for stable digital dollars persists regardless of
              legal status.
            </Takeaway>
            <Takeaway>
              <strong className="text-[#E0E0FF]">The biggest markets are in limbo.</strong>{' '}
              The United States still lacks federal stablecoin legislation. India taxes crypto at 30%
              but has no stablecoin-specific rules. These regulatory gray areas create uncertainty
              for billions of potential users.
            </Takeaway>
            <Takeaway>
              <strong className="text-[#E0E0FF]">USDT dominates emerging markets.</strong>{' '}
              In Latin America, Southeast Asia, and Africa, Tether (USDT) is the primary stablecoin.
              USDC is more common in regulated Western markets where compliance matters more.
            </Takeaway>
          </ul>
        </section>

        {/* Country sections */}
        {sections.map((section) => {
          const countries = getCountriesByStatus(section.status);
          const color = REGULATION_COLORS[section.status];
          return (
            <section key={section.status} className="mb-16">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="block h-3 w-3 rounded-full shrink-0"
                  style={{ background: color, boxShadow: `0 0 10px ${color}66` }}
                />
                <h3
                  className="text-[13px] font-mono tracking-[0.25em] uppercase"
                  style={{ color }}
                >
                  {section.title}
                </h3>
                <span className="text-[11px] font-mono text-[#7070AA]">
                  ({countries.length})
                </span>
              </div>
              <p className="text-sm text-[#7070AA] leading-relaxed max-w-2xl mb-6">
                {section.description}
              </p>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {countries.map((country) => (
                  <CountryCard key={country.iso2} country={country} color={color} />
                ))}
              </div>
            </section>
          );
        })}

        <hr className="border-0 h-px bg-[rgba(255,255,255,0.08)] mb-12" />

        {/* CTA */}
        <section className="flex flex-col items-center text-center pt-4 pb-8">
          <p className="text-sm text-[#7070AA] mb-6 max-w-md">
            See how regulation status maps onto real trading volume. Explore the interactive globe
            with the regulation layer enabled.
          </p>
          <Link
            href="/?view=regulation"
            className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-mono tracking-wider text-[#030308] font-bold transition-all duration-200"
            style={{
              background: 'linear-gradient(135deg, #00F5FF 0%, #4D4DFF 100%)',
              boxShadow: '0 0 30px rgba(0,245,255,0.3), 0 0 60px rgba(0,245,255,0.1)',
            }}
          >
            EXPLORE THE REGULATION MAP
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

function StatCard({ label, count, color }: { label: string; count: number; color: string }) {
  return (
    <div
      className="rounded-lg border px-4 py-3 text-center"
      style={{
        borderColor: `${color}33`,
        background: `${color}08`,
      }}
    >
      <p className="text-2xl font-bold" style={{ color }}>
        {count}
      </p>
      <p className="text-[10px] font-mono tracking-wider text-[#7070AA] mt-1">
        {label.toUpperCase()}
      </p>
    </div>
  );
}

function CountryCard({ country, color }: { country: CountryRegulation; color: string }) {
  return (
    <div
      className="rounded-xl border border-[rgba(0,245,255,0.1)] backdrop-blur-md px-5 py-4"
      style={{ background: 'rgba(5, 5, 25, 0.85)' }}
    >
      <div className="flex items-center gap-2.5 mb-2.5">
        <span
          className="block h-2 w-2 rounded-full shrink-0"
          style={{ background: color, boxShadow: `0 0 6px ${color}66` }}
        />
        <h4 className="text-sm font-bold text-[#E0E0FF]">{country.country}</h4>
        <span className="text-[10px] font-mono text-[#7070AA] ml-auto">{country.iso2}</span>
      </div>
      <p className="text-xs text-[#B0B0DD] leading-relaxed mb-3">{country.summary}</p>
      {country.keyLaw && (
        <div className="flex items-center gap-1.5 mb-2">
          <span className="text-[10px] font-mono text-[#7070AA]">LAW:</span>
          <span className="text-[11px] font-mono text-[#E0E0FF]">{country.keyLaw}</span>
        </div>
      )}
      {country.stablecoinsAllowed && country.stablecoinsAllowed.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {country.stablecoinsAllowed.map((coin) => (
            <span
              key={coin}
              className="px-2 py-0.5 rounded-full text-[10px] font-mono border border-[rgba(0,245,255,0.2)] text-[#00F5FF]"
              style={{ background: 'rgba(0,245,255,0.06)' }}
            >
              {coin}
            </span>
          ))}
        </div>
      )}
      {country.notes && (
        <p className="text-[11px] text-[#7070AA] mt-2.5 leading-relaxed italic">
          {country.notes}
        </p>
      )}
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
