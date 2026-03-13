'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  STABLECOIN_RATINGS,
  PILLAR_INFO,
  getGradeColor,
  type StablecoinRating,
  type PillarKey,
  type PillarDetail,
} from '@/data/stablecoin-ratings';
import BackgroundGrid from '@/components/BackgroundGrid';

type SortKey = 'score' | 'marketCap' | 'name';

const TYPE_LABELS: Record<string, string> = {
  'fiat-backed': 'Fiat-Backed',
  'crypto-collateralized': 'Crypto-Collateralized',
  'synthetic': 'Synthetic',
  'algorithmic': 'Algorithmic',
};

function PillarBar({ pillarKey, score, max }: { pillarKey: PillarKey; score: number; max: number }) {
  const pct = (score / max) * 100;
  const info = PILLAR_INFO[pillarKey];
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] font-mono text-[#C0C0E0]">{info.label}</span>
        <span className="text-[10px] font-mono text-[#7070AA]">{score}/{max}</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(112,112,170,0.15)' }}>
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${pct}%`,
            background: pct >= 70 ? '#00E5A0' : pct >= 50 ? '#00F5FF' : pct >= 30 ? '#FFB800' : '#FF6B6B',
            boxShadow: `0 0 6px ${pct >= 70 ? '#00E5A060' : pct >= 50 ? '#00F5FF60' : pct >= 30 ? '#FFB80060' : '#FF6B6B60'}`,
          }}
        />
      </div>
    </div>
  );
}

function RatingCard({ rating, onExpand, isExpanded }: {
  rating: StablecoinRating;
  onExpand: () => void;
  isExpanded: boolean;
}) {
  const gradeColor = getGradeColor(rating.grade);
  const pillarKeys: PillarKey[] = ['reserve', 'transparency', 'peg', 'regulatory', 'smartContract', 'adoption'];

  return (
    <div
      className="rounded-xl border transition-all duration-300"
      style={{
        background: 'rgba(5, 5, 25, 0.85)',
        borderColor: isExpanded ? `${gradeColor}40` : 'rgba(0,245,255,0.1)',
      }}
    >
      {/* Header — always visible */}
      <button
        onClick={onExpand}
        className="w-full px-3 py-3 md:px-5 md:py-4 flex items-center gap-3 md:gap-4 cursor-pointer text-left"
      >
        {/* Grade badge */}
        <div
          className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center flex-shrink-0 border"
          style={{
            background: `${gradeColor}12`,
            borderColor: `${gradeColor}30`,
          }}
        >
          <span
            className="text-xl font-mono font-bold"
            style={{ color: gradeColor }}
          >
            {rating.grade}
          </span>
        </div>

        {/* Name + metadata */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-base font-bold text-[#E0E0FF]">{rating.ticker}</span>
            <span className="text-xs text-[#7070AA]">{rating.name}</span>
          </div>
          <div className="text-[10px] font-mono text-[#7070AA] truncate">
            {rating.issuer} · {TYPE_LABELS[rating.type]} · {rating.marketCap}
          </div>
        </div>

        {/* Score */}
        <div className="text-right flex-shrink-0">
          <div className="text-lg font-mono font-bold" style={{ color: gradeColor }}>
            {rating.totalScore}
          </div>
          <div className="text-[9px] font-mono text-[#7070AA]">/100</div>
        </div>

        {/* Expand arrow */}
        <svg
          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          className={`text-[#7070AA] flex-shrink-0 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {/* Expanded details */}
      {isExpanded && (
        <div className="px-3 pb-4 md:px-5 md:pb-5 border-t border-[rgba(0,245,255,0.06)]">
          {/* Summary */}
          <p className="text-sm text-[#C0C0E0] leading-relaxed mt-4 mb-4">
            {rating.summary}
          </p>

          {/* Pillar bars */}
          <div className="space-y-3 mb-4">
            {pillarKeys.map((key) => (
              <PillarBar
                key={key}
                pillarKey={key}
                score={rating.pillars[key].score}
                max={rating.pillars[key].max}
              />
            ))}
          </div>

          {/* Pillar details */}
          <div className="space-y-4 mt-5">
            {pillarKeys.map((key) => {
              const pillar = rating.pillars[key];
              const info = PILLAR_INFO[key];
              const pct = (pillar.score / pillar.max) * 100;
              return (
                <div key={key}>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[11px] font-mono font-bold text-[#E0E0FF]">{info.label}</span>
                    <span
                      className="text-[10px] font-mono font-bold"
                      style={{ color: pct >= 70 ? '#00E5A0' : pct >= 50 ? '#00F5FF' : pct >= 30 ? '#FFB800' : '#FF6B6B' }}
                    >
                      {pillar.score}/{pillar.max}
                    </span>
                  </div>
                  <ul className="space-y-1">
                    {pillar.details.map((d, i) => (
                      <li key={i} className="flex items-start gap-2 text-[11px] text-[#7070AA] leading-relaxed">
                        <span className="text-[#7070AA]/40 mt-0.5 flex-shrink-0">·</span>
                        <span>
                          {d.text}
                          {d.source && (
                            <a
                              href={d.source}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="ml-1.5 text-[#00F5FF]/60 hover:text-[#00F5FF] transition-colors"
                              title="Verify source"
                            >
                              ↗
                            </a>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Chains + metadata footer */}
          <div className="mt-5 pt-4 border-t border-[rgba(0,245,255,0.06)] flex flex-wrap items-center gap-2">
            {rating.chains.map((chain) => (
              <span
                key={chain}
                className="text-[9px] font-mono px-2 py-0.5 rounded border border-[rgba(0,245,255,0.15)] text-[#00F5FF]"
                style={{ background: 'rgba(0,245,255,0.05)' }}
              >
                {chain}
              </span>
            ))}
            <span className="text-[9px] font-mono text-[#7070AA] ml-auto">
              Updated {rating.lastUpdated}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function RatingsPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortKey>('score');
  const [showTier2, setShowTier2] = useState(false);
  const [showRubric, setShowRubric] = useState(false);

  const sorted = [...STABLECOIN_RATINGS]
    .filter((r) => showTier2 || r.tier === 1)
    .sort((a, b) => {
      if (sortBy === 'score') return b.totalScore - a.totalScore;
      if (sortBy === 'marketCap') return b.marketCapUsd - a.marketCapUsd;
      return a.name.localeCompare(b.name);
    });

  const tier1Count = STABLECOIN_RATINGS.filter((r) => r.tier === 1).length;
  const tier2Count = STABLECOIN_RATINGS.filter((r) => r.tier === 2).length;

  return (
    <div className="min-h-screen bg-[#030308] text-[#E0E0FF] relative">
      <BackgroundGrid />

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-6 md:px-8 md:py-10">
        {/* Back nav */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[11px] font-mono tracking-wider text-[#7070AA] hover:text-[#00F5FF] transition-colors mb-6"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          BACK TO GLOBE
        </Link>

        {/* Title */}
        <h1
          className="text-2xl md:text-3xl font-bold tracking-tight mb-2"
          style={{ textShadow: '0 0 20px rgba(0,245,255,0.3)' }}
        >
          Stablecoin Ratings
        </h1>
        <p className="text-sm text-[#C0C0E0] leading-relaxed mb-2 max-w-xl">
          The most transparent stablecoin scoring on the internet. Every point explained, every data source cited. No signup required.
        </p>
        <p className="text-[10px] font-mono text-[#7070AA] mb-6">
          {tier1Count + tier2Count} stablecoins rated across 6 pillars, 100 points
        </p>

        {/* Controls */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          {/* Sort */}
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] font-mono text-[#7070AA] uppercase tracking-wider">Sort:</span>
            {([['score', 'Score'], ['marketCap', 'Market Cap'], ['name', 'Name']] as [SortKey, string][]).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSortBy(key)}
                className={`px-2.5 py-1 rounded text-[10px] font-mono tracking-wider border transition-colors cursor-pointer ${
                  sortBy === key
                    ? 'border-[rgba(0,245,255,0.4)] text-[#00F5FF]'
                    : 'border-[rgba(0,245,255,0.12)] text-[#7070AA] hover:text-[#00F5FF]'
                }`}
                style={{ background: sortBy === key ? 'rgba(0,245,255,0.06)' : 'transparent' }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Tier 2 toggle */}
          <button
            onClick={() => setShowTier2(!showTier2)}
            className={`px-2.5 py-1 rounded text-[10px] font-mono tracking-wider border transition-colors cursor-pointer ml-auto ${
              showTier2
                ? 'border-[rgba(0,245,255,0.4)] text-[#00F5FF]'
                : 'border-[rgba(0,245,255,0.12)] text-[#7070AA] hover:text-[#00F5FF]'
            }`}
            style={{ background: showTier2 ? 'rgba(0,245,255,0.06)' : 'transparent' }}
          >
            {showTier2 ? `SHOWING ALL ${tier1Count + tier2Count}` : `+ ${tier2Count} MORE`}
          </button>
        </div>

        {/* Rating cards */}
        <div className="space-y-3">
          {sorted.map((rating) => (
            <RatingCard
              key={rating.id}
              rating={rating}
              isExpanded={expandedId === rating.id}
              onExpand={() => setExpandedId(expandedId === rating.id ? null : rating.id)}
            />
          ))}
        </div>

        {/* Methodology section */}
        <section
          className="mt-10 rounded-xl px-5 py-5 border border-[rgba(0,245,255,0.12)]"
          style={{ background: 'rgba(5, 5, 25, 0.8)' }}
        >
          <h2
            className="text-lg font-bold tracking-tight mb-3"
            style={{ textShadow: '0 0 15px rgba(0,245,255,0.2)' }}
          >
            Methodology
          </h2>
          <p className="text-sm text-[#C0C0E0] leading-relaxed mb-4">
            The Pulse Score rates stablecoins across 6 pillars on a 100-point scale. Each pillar score is based on verifiable data — we show our work so you can check it.
          </p>

          <div className="space-y-4">
            {(Object.entries(PILLAR_INFO) as [PillarKey, typeof PILLAR_INFO[PillarKey]][]).map(([key, info]) => (
              <div key={key}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono font-bold text-[#E0E0FF]">{info.label}</span>
                  <span className="text-[10px] font-mono text-[#7070AA]">({info.max} points)</span>
                </div>
                <p className="text-[11px] text-[#7070AA] leading-relaxed">{info.description}</p>
              </div>
            ))}
          </div>

          {/* Scoring Rubric — collapsible */}
          <div className="mt-5 pt-4 border-t border-[rgba(0,245,255,0.06)]">
            <button
              onClick={() => setShowRubric(!showRubric)}
              className="w-full flex items-center justify-between cursor-pointer"
            >
              <div>
                <h3 className="text-[11px] font-mono font-bold text-[#E0E0FF]">Scoring Rubric</h3>
                <p className="text-[9px] text-[#7070AA] mt-0.5 text-left">
                  Sub-criteria and tier definitions — check our math
                </p>
              </div>
              <svg
                width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                className={`text-[#7070AA] flex-shrink-0 transition-transform duration-300 ${showRubric ? 'rotate-180' : ''}`}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {showRubric && (
              <div className="space-y-3 mt-3">
                {[
                  { pillar: 'Reserve Quality', max: 25, criteria: [
                    { name: 'Composition', pts: 10, tiers: '10: 100% cash/T-bills · 7: Mix w/ some crypto · 4: Mostly crypto · 0: No reserves' },
                    { name: 'Custodian', pts: 8, tiers: '8: Top-tier bank (BNY, State Street) · 5: Regulated trust · 3: Crypto custodian · 0: Undisclosed' },
                    { name: 'Buffer', pts: 4, tiers: '4: >5% buffer · 2: 1-5% buffer · 0: No buffer or undisclosed' },
                    { name: 'Track Record', pts: 3, tiers: '3: 3+ years clean · 2: 1-3 years · 1: <1 year · 0: Reserve failures' },
                  ]},
                  { pillar: 'Transparency & Audit', max: 20, criteria: [
                    { name: 'Attestation Quality', pts: 8, tiers: '8: Big Four audit · 6: Big Four attestation · 4: Mid-tier attestation · 2: On-chain only · 0: None' },
                    { name: 'Reporting Frequency', pts: 4, tiers: '4: Monthly · 3: Quarterly · 1: Annual · 0: None' },
                    { name: 'Report Detail', pts: 4, tiers: '4: Full breakdown · 2: Summary only · 0: No detail' },
                    { name: 'On-chain Verifiability', pts: 4, tiers: '4: Full on-chain · 2: Proof of Reserve · 0: Off-chain only' },
                  ]},
                  { pillar: 'Peg Stability', max: 20, criteria: [
                    { name: 'Historical Deviation', pts: 8, tiers: '8: <0.1% max · 6: <0.5% max · 4: <2% max · 2: <5% · 0: >5% depeg' },
                    { name: 'Recovery Speed', pts: 4, tiers: '4: <1hr recovery · 3: <24hr · 2: <1 week · 0: Persistent depeg' },
                    { name: 'DEX Liquidity', pts: 4, tiers: '4: >$500M TVL · 3: $100-500M · 2: $10-100M · 0: <$10M' },
                    { name: 'CEX Coverage', pts: 4, tiers: '4: Listed on 50+ exchanges · 3: 20-50 · 2: 5-20 · 0: <5' },
                  ]},
                  { pillar: 'Regulatory', max: 15, criteria: [
                    { name: 'US Licensing', pts: 5, tiers: '5: NYDFS or federal · 3: State MTL · 1: Offshore license · 0: None' },
                    { name: 'MiCA Status', pts: 4, tiers: '4: MiCA authorized · 2: In progress · 0: Non-compliant' },
                    { name: 'Multi-Jurisdiction', pts: 3, tiers: '3: 3+ jurisdictions · 2: 2 jurisdictions · 1: Single · 0: None' },
                    { name: 'Compliance Record', pts: 3, tiers: '3: Clean record · 1: Minor issues · 0: Under investigation' },
                  ]},
                  { pillar: 'Smart Contract', max: 10, criteria: [
                    { name: 'Audit Coverage', pts: 4, tiers: '4: Multiple top-tier audits · 2: Single audit · 1: Internal only · 0: None' },
                    { name: 'Battle-Testing', pts: 3, tiers: '3: 3+ years live · 2: 1-3 years · 1: <1 year · 0: Untested' },
                    { name: 'Upgradeability', pts: 3, tiers: '3: Immutable/DAO-governed · 2: Timelock upgrades · 1: Admin upgradeable · 0: Single owner' },
                  ]},
                  { pillar: 'Adoption', max: 10, criteria: [
                    { name: 'Market Cap', pts: 3, tiers: '3: >$10B · 2: $1-10B · 1: $100M-1B · 0: <$100M' },
                    { name: 'DeFi Integration', pts: 3, tiers: '3: Core DeFi primitive · 2: Moderate integration · 1: Limited · 0: None' },
                    { name: 'Cross-Chain', pts: 2, tiers: '2: 5+ chains · 1: 2-4 chains · 0: Single chain' },
                    { name: 'Geographic Breadth', pts: 2, tiers: '2: Global usage · 1: Regional · 0: Niche' },
                  ]},
                ].map((section) => (
                  <div key={section.pillar}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[10px] font-mono font-bold text-[#C0C0E0]">{section.pillar}</span>
                      <span className="text-[9px] font-mono text-[#7070AA]">({section.max} pts)</span>
                    </div>
                    <div className="space-y-1">
                      {section.criteria.map((c) => (
                        <div key={c.name} className="text-[9px] text-[#7070AA] leading-relaxed">
                          <span className="text-[#C0C0E0] font-mono">{c.name}</span>
                          <span className="text-[#7070AA]/60"> ({c.pts}pts)</span>
                          <span className="text-[#7070AA]/40"> — </span>
                          <span>{c.tiers}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-5 pt-4 border-t border-[rgba(0,245,255,0.06)]">
            <h3 className="text-[11px] font-mono font-bold text-[#E0E0FF] mb-2">Grading Scale</h3>
            <div className="grid grid-cols-5 gap-2">
              {[
                { grade: 'A', range: '80-100', label: 'Institutional grade', color: '#00E5A0' },
                { grade: 'B', range: '65-79', label: 'Strong', color: '#00F5FF' },
                { grade: 'C', range: '50-64', label: 'Adequate', color: '#FFB800' },
                { grade: 'D', range: '35-49', label: 'Elevated risk', color: '#FF6B6B' },
                { grade: 'F', range: '<35', label: 'High risk', color: '#FF1493' },
              ].map((g) => (
                <div key={g.grade} className="text-center">
                  <div className="text-lg font-mono font-bold" style={{ color: g.color }}>{g.grade}</div>
                  <div className="text-[9px] font-mono text-[#7070AA]">{g.range}</div>
                  <div className="text-[8px] text-[#7070AA]/60">{g.label}</div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[9px] font-mono text-[#7070AA] mt-5">
            Ratings are updated when material changes occur (reserve reports, regulatory decisions, depeg events).
            Data sources: issuer attestation reports, CoinGecko, DeFi Llama, on-chain data, regulatory filings.
            Not financial advice.
          </p>
        </section>

        {/* Footer */}
        <div className="text-[10px] font-mono text-[#7070AA] leading-relaxed mt-8 border-t border-[rgba(0,245,255,0.08)] pt-4">
          Stablecoin Pulse Ratings are independent assessments based on publicly available data.
          They are not credit ratings and should not be used as the sole basis for financial decisions.
        </div>
      </div>
    </div>
  );
}
