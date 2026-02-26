'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { PremiumApiResponse } from '@/app/api/premium/route';
import type { CountryPremium } from '@/app/api/premium/route';

interface PremiumPanelProps {
  isOpen: boolean;
  onToggle: () => void;
  data: PremiumApiResponse | null;
  loading: boolean;
}

function FlagImg({ iso2 }: { iso2: string }) {
  const code = iso2.toLowerCase();
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://flagcdn.com/w40/${code}.png`}
      srcSet={`https://flagcdn.com/w80/${code}.png 2x`}
      alt={iso2}
      width={20}
      height={15}
      className="rounded-sm object-cover"
      loading="lazy"
    />
  );
}

// --- Region mapping ---
type Region = 'africa' | 'asia' | 'latam' | 'europe';

const COUNTRY_REGION: Record<string, Region> = {
  NG: 'africa', KE: 'africa', ZA: 'africa', GH: 'africa', EG: 'africa',
  IN: 'asia', PK: 'asia', VN: 'asia', PH: 'asia', ID: 'asia', TR: 'asia',
  AR: 'latam', BR: 'latam', CO: 'latam', MX: 'latam',
  UA: 'europe',
};

const REGION_CHIPS: { key: Region; label: string }[] = [
  { key: 'africa', label: 'Africa' },
  { key: 'asia', label: 'Asia' },
  { key: 'latam', label: 'Latin America' },
  { key: 'europe', label: 'Europe' },
];

// --- Premium tier logic ---
type PremiumTier = 'low' | 'moderate' | 'high';

const TIER_CHIPS: { key: PremiumTier; label: string; color: string }[] = [
  { key: 'high', label: 'HIGH 5%+', color: '#FF1493' },
  { key: 'moderate', label: 'MODERATE 2-5%', color: '#FFB800' },
  { key: 'low', label: 'LOW <2%', color: '#00F5FF' },
];

function getPremiumTier(pct: number | null): PremiumTier | null {
  if (pct === null) return null;
  if (pct >= 5) return 'high';
  if (pct >= 2) return 'moderate';
  return 'low';
}

function getPremiumColor(pct: number | null): string {
  if (pct === null) return '#7070AA';
  if (pct <= 0) return '#A0A0B8';
  if (pct < 2) return '#00F5FF';
  if (pct < 5) return '#FFB800';
  return '#FF1493';
}

function formatPremium(pct: number | null): string {
  if (pct === null) return '';
  const sign = pct >= 0 ? '+' : '';
  return `${sign}${pct.toFixed(1)}%`;
}

// --- Sort logic ---
type SortKey = 'country' | 'usdt' | 'usdc';
type SortDir = 'asc' | 'desc';

function getSortValue(p: CountryPremium, key: SortKey): number | string {
  if (key === 'country') return p.country;
  if (key === 'usdt') return p.usdtPremiumPct ?? -Infinity;
  return p.usdcPremiumPct ?? -Infinity;
}

function SortArrow({ active, dir }: { active: boolean; dir: SortDir }) {
  if (active) {
    return (
      <span className="ml-1 inline-block text-[9px]" style={{ color: '#00F5FF' }}>
        {dir === 'desc' ? '▼' : '▲'}
      </span>
    );
  }
  return (
    <span className="ml-1 inline-flex flex-col leading-none text-[6px]" style={{ color: '#555' }}>
      <span>▲</span>
      <span>▼</span>
    </span>
  );
}

// --- Notable spread badge with tooltip ---
function SpreadBadge() {
  const [show, setShow] = useState(false);
  return (
    <div className="relative inline-flex items-center ml-1.5">
      <div
        className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[8px] font-mono tracking-wider
          text-[#FFB800] bg-[rgba(255,184,0,0.1)] border border-[rgba(255,184,0,0.25)] cursor-default"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        Notable spread
      </div>
      <AnimatePresence>
        {show && (
          <motion.div
            className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-50
              px-3 py-2 rounded-lg text-[10px] leading-relaxed text-[#E0E0FF] font-mono
              whitespace-nowrap backdrop-blur-xl border border-[rgba(0,245,255,0.15)]"
            style={{ background: 'rgba(5, 5, 25, 0.95)', boxShadow: '0 0 15px rgba(0,245,255,0.1)' }}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
          >
            USDC trades at a significantly higher premium
            <br />
            than USDT — may indicate limited USDC liquidity.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- High demand stat card with tooltip ---
function HighDemandCard({ count, names }: { count: number; names: string[] }) {
  const [show, setShow] = useState(false);
  return (
    <div
      className="relative rounded-lg px-3 py-2 border border-[rgba(0,245,255,0.1)]"
      style={{ background: 'rgba(0,245,255,0.04)' }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <div className="text-[9px] font-mono tracking-wider text-[#7070AA] uppercase mb-0.5">High Demand</div>
      <div className="text-sm font-mono font-bold cursor-default" style={{ color: count > 0 ? '#FF1493' : '#7070AA' }}>
        {count} {count === 1 ? 'country' : 'countries'}
      </div>
      <AnimatePresence>
        {show && count > 0 && (
          <motion.div
            className="absolute bottom-full mb-2 right-0 z-50
              px-3 py-2 rounded-lg text-[10px] leading-relaxed text-[#E0E0FF] font-mono
              backdrop-blur-xl border border-[rgba(0,245,255,0.15)]"
            style={{ background: 'rgba(5, 5, 25, 0.95)', boxShadow: '0 0 15px rgba(0,245,255,0.1)', maxWidth: '200px' }}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
          >
            {names.join(', ')}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- No data badge with tooltip ---
function NoDataBadge() {
  const [show, setShow] = useState(false);
  return (
    <div className="relative flex items-center justify-center">
      <div
        className="inline-flex items-center justify-center gap-1 w-full py-1.5 rounded text-[9px] font-mono cursor-default"
        style={{
          color: '#666',
          background: 'transparent',
          border: '1px solid #444',
        }}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        N/A
        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2.5">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="8" strokeLinecap="round" />
          <line x1="12" y1="12" x2="12" y2="16" strokeLinecap="round" />
        </svg>
      </div>
      <AnimatePresence>
        {show && (
          <motion.div
            className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-50
              px-3 py-2 rounded-lg text-[10px] leading-relaxed text-[#E0E0FF] font-mono
              whitespace-nowrap backdrop-blur-xl border border-[rgba(0,245,255,0.15)]"
            style={{ background: 'rgba(5, 5, 25, 0.95)', boxShadow: '0 0 15px rgba(0,245,255,0.1)' }}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
          >
            No P2P market data available
            <br />
            for this stablecoin in this country.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function PremiumPanel({ data, loading }: PremiumPanelProps) {
  const [search, setSearch] = useState('');
  const [activeRegions, setActiveRegions] = useState<Set<Region>>(new Set());
  const [activeTiers, setActiveTiers] = useState<Set<PremiumTier>>(new Set());
  const [sortKey, setSortKey] = useState<SortKey>('usdt');
  const [sortDir, setSortDir] = useState<SortDir>('desc');

  const toggleRegion = (region: Region) => {
    setActiveRegions(prev => {
      const next = new Set(prev);
      if (next.has(region)) next.delete(region);
      else next.add(region);
      return next;
    });
  };

  const toggleTier = (tier: PremiumTier) => {
    setActiveTiers(prev => {
      const next = new Set(prev);
      if (next.has(tier)) next.delete(tier);
      else next.add(tier);
      return next;
    });
  };

  const clearAllFilters = () => {
    setActiveRegions(new Set());
    setActiveTiers(new Set());
    setSearch('');
  };

  const hasFilters = activeRegions.size > 0 || activeTiers.size > 0 || search.length > 0;

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(d => d === 'desc' ? 'asc' : 'desc');
    } else {
      setSortKey(key);
      setSortDir(key === 'country' ? 'asc' : 'desc');
    }
  };

  const filtered = useMemo(() => {
    const query = search.toLowerCase().trim();
    let items = data?.premiums.filter((p) => {
      if (query && !p.country.toLowerCase().includes(query)) return false;
      if (activeRegions.size > 0) {
        const region = COUNTRY_REGION[p.iso2];
        if (!region || !activeRegions.has(region)) return false;
      }
      if (activeTiers.size > 0) {
        const tier = getPremiumTier(p.usdtPremiumPct);
        if (!tier || !activeTiers.has(tier)) return false;
      }
      return true;
    }) ?? [];

    // Sort
    items = [...items].sort((a, b) => {
      const aVal = getSortValue(a, sortKey);
      const bVal = getSortValue(b, sortKey);
      let cmp: number;
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        cmp = aVal.localeCompare(bVal);
      } else {
        cmp = (aVal as number) - (bVal as number);
      }
      return sortDir === 'desc' ? -cmp : cmp;
    });

    return items;
  }, [data, search, activeRegions, activeTiers, sortKey, sortDir]);

  // --- Computed summary stats ---
  const stats = useMemo(() => {
    if (!data?.premiums) return null;
    const withUsdt = data.premiums.filter(p => p.usdtPremiumPct !== null);
    const avgUsdt = withUsdt.length > 0
      ? withUsdt.reduce((sum, p) => sum + p.usdtPremiumPct!, 0) / withUsdt.length
      : null;
    // Highest premium across either USDT or USDC
    let highestCountry: string | null = null;
    let highestPct: number | null = null;
    let highestAsset: string | null = null;
    for (const p of data.premiums) {
      if (p.usdtPremiumPct !== null && (highestPct === null || p.usdtPremiumPct > highestPct)) {
        highestPct = p.usdtPremiumPct; highestCountry = p.country; highestAsset = 'USDT';
      }
      if (p.usdcPremiumPct !== null && (highestPct === null || p.usdcPremiumPct > highestPct)) {
        highestPct = p.usdcPremiumPct; highestCountry = p.country; highestAsset = 'USDC';
      }
    }
    const highDemandCountries = data.premiums.filter(p =>
      (p.usdtPremiumPct !== null && p.usdtPremiumPct >= 5) ||
      (p.usdcPremiumPct !== null && p.usdcPremiumPct >= 5)
    );
    const highDemand = highDemandCountries.length;
    const highDemandNames = highDemandCountries.map(p => p.country);
    return { avgUsdt, highestCountry, highestPct, highestAsset, highDemand, highDemandNames };
  }, [data]);

  const headerBtnClass = "flex items-center justify-center gap-0.5 text-[10px] font-mono tracking-wider uppercase cursor-pointer transition-colors hover:text-[#00F5FF] border-none bg-transparent outline-none p-0";

  return (
    <motion.div
      className="w-full max-w-2xl mx-4 backdrop-blur-md border border-[rgba(0,245,255,0.12)] rounded-xl
        overflow-hidden flex flex-col max-h-full"
      style={{ background: 'rgba(5, 5, 25, 0.85)', boxShadow: '0 0 40px rgba(0,245,255,0.08)' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Loading skeleton */}
      {loading && (
        <div className="px-6 py-8 flex-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-2 w-2 rounded-full bg-[#00F5FF] animate-pulse" style={{ boxShadow: '0 0 8px #00F5FF' }} />
            <div className="text-xs font-mono text-[#7070AA] tracking-wider animate-pulse">
              SCANNING 16 COUNTRIES ACROSS BINANCE & BYBIT P2P...
            </div>
          </div>
          <p className="text-xs leading-relaxed text-[#7070AA] mb-6">
            How much more people pay for <span className="text-[#E0E0FF]">1 USDT or USDC</span> vs the official dollar rate in their country.
          </p>
          {/* Skeleton rows */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-4 py-3" style={{ opacity: 1 - i * 0.1 }}>
              <div className="w-7 h-7 rounded-full bg-[rgba(112,112,170,0.1)] animate-pulse" />
              <div className="flex-1 space-y-1.5">
                <div className="h-3 w-24 rounded bg-[rgba(112,112,170,0.1)] animate-pulse" />
                <div className="h-2 w-16 rounded bg-[rgba(112,112,170,0.06)] animate-pulse" />
              </div>
              <div className="w-20 h-7 rounded bg-[rgba(112,112,170,0.08)] animate-pulse" />
              <div className="w-20 h-7 rounded bg-[rgba(112,112,170,0.08)] animate-pulse" />
            </div>
          ))}
        </div>
      )}

      {/* Loaded content */}
      {!loading && (
        <>
          {/* Header */}
          <div className="px-6 pt-6 pb-4 border-b border-[rgba(0,245,255,0.08)]">
            <h2 className="text-xs tracking-[0.2em] text-[#7070AA] uppercase mb-1">
              Dollar Premium Index
            </h2>
            <p
              className="text-lg font-mono font-bold text-[#E0E0FF] mb-1"
              style={{ textShadow: '0 0 10px rgba(0,245,255,0.3)' }}
            >
              {`${data?.countriesWithData ?? 0} of ${data?.countriesTracked ?? 16} countries with data`}
            </p>
            {data?.lastUpdated && (
              <p className="text-[10px] font-mono text-[#7070AA] mb-2">
                Last updated: {new Date(data.lastUpdated).toLocaleString('en-US', {
                  month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true,
                })}
              </p>
            )}
            <p className="text-xs leading-relaxed text-[#7070AA]">
              How much more people pay for <span className="text-[#E0E0FF]">1 USDT or USDC</span> vs the official dollar rate in their country.
              A <span className="text-[#FFB800]">+5%</span> premium means $1 of stablecoin costs $1.05 in local currency — a signal of real demand.
            </p>
          </div>

          {/* Search */}
          <div className="px-6 py-2.5">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search country..."
              className="w-full bg-[rgba(0,245,255,0.04)] border border-[rgba(0,245,255,0.12)] rounded-lg
                px-3 py-1.5 text-xs font-mono text-[#E0E0FF] placeholder-[#7070AA]/50
                outline-none focus:border-[rgba(0,245,255,0.3)] transition-colors"
            />
          </div>

          {/* Filter chips — two labeled rows */}
          <div className="px-6 py-3 space-y-2"
            style={{ borderTop: '1px solid rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            {/* Row 1: Region */}
            <div className="flex items-center gap-2">
              <span className="text-[8px] font-mono tracking-widest text-[#7070AA] uppercase w-14 flex-shrink-0">Region</span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={clearAllFilters}
                  className="px-2.5 py-1 rounded-md text-[10px] font-mono tracking-wider uppercase transition-all duration-200"
                  style={{
                    color: !hasFilters ? '#E0E0FF' : '#7070AA',
                    background: !hasFilters ? 'rgba(0,245,255,0.12)' : 'transparent',
                    border: `1px solid ${!hasFilters ? 'rgba(0,245,255,0.3)' : 'rgba(112,112,170,0.2)'}`,
                  }}
                >
                  All
                </button>
                {REGION_CHIPS.map((r) => {
                  const isActive = activeRegions.has(r.key);
                  return (
                    <button
                      key={r.key}
                      onClick={() => toggleRegion(r.key)}
                      className="px-2.5 py-1 rounded-md text-[10px] font-mono tracking-wider uppercase transition-all duration-200"
                      style={{
                        color: isActive ? '#E0E0FF' : '#7070AA',
                        background: isActive ? 'rgba(0,245,255,0.12)' : 'transparent',
                        border: `1px solid ${isActive ? 'rgba(0,245,255,0.3)' : 'rgba(112,112,170,0.2)'}`,
                      }}
                    >
                      {r.label}
                    </button>
                  );
                })}
              </div>
            </div>
            {/* Row 2: Demand */}
            <div className="flex items-center gap-2">
              <span className="text-[8px] font-mono tracking-widest text-[#7070AA] uppercase w-14 flex-shrink-0">Demand</span>
              <div className="flex flex-wrap gap-1.5">
                {TIER_CHIPS.map((t) => {
                  const isActive = activeTiers.has(t.key);
                  return (
                    <button
                      key={t.key}
                      onClick={() => toggleTier(t.key)}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono tracking-wider uppercase transition-all duration-200"
                      style={{
                        color: isActive ? t.color : '#7070AA',
                        background: isActive ? `${t.color}15` : 'transparent',
                        border: `1px solid ${isActive ? `${t.color}40` : 'rgba(112,112,170,0.2)'}`,
                      }}
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{
                          backgroundColor: t.color,
                          boxShadow: isActive ? `0 0 6px ${t.color}80` : 'none',
                          opacity: isActive ? 1 : 0.5,
                        }}
                      />
                      {t.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Summary stats bar */}
          {stats && (
            <div className="grid grid-cols-3 gap-3 px-6 py-3 border-b border-[rgba(0,245,255,0.08)]">
              <div className="rounded-lg px-3 py-2 border border-[rgba(0,245,255,0.1)]"
                style={{ background: 'rgba(0,245,255,0.04)' }}>
                <div className="text-[9px] font-mono tracking-wider text-[#7070AA] uppercase mb-0.5">Avg USDT Premium</div>
                <div className="text-sm font-mono font-bold"
                  style={{ color: stats.avgUsdt !== null ? getPremiumColor(stats.avgUsdt) : '#7070AA' }}>
                  {stats.avgUsdt !== null ? `${stats.avgUsdt >= 0 ? '+' : ''}${stats.avgUsdt.toFixed(1)}%` : '—'}
                </div>
              </div>
              <div className="rounded-lg px-3 py-2 border border-[rgba(0,245,255,0.1)]"
                style={{ background: 'rgba(0,245,255,0.04)' }}>
                <div className="text-[9px] font-mono tracking-wider text-[#7070AA] uppercase mb-0.5">Highest Premium</div>
                <div className="text-sm font-mono font-bold"
                  style={{ color: stats.highestPct !== null ? getPremiumColor(stats.highestPct) : '#7070AA' }}>
                  {stats.highestCountry && stats.highestPct !== null
                    ? `${stats.highestCountry} ${stats.highestPct >= 0 ? '+' : ''}${stats.highestPct.toFixed(1)}%`
                    : '—'}
                </div>
                {stats.highestAsset && (
                  <div className="text-[8px] font-mono text-[#7070AA] mt-0.5">{stats.highestAsset}</div>
                )}
              </div>
              <HighDemandCard count={stats.highDemand} names={stats.highDemandNames} />
            </div>
          )}

          {/* Column headers — clickable for sorting */}
          <div className="flex items-center gap-4 px-10 py-2 border-b border-[rgba(0,245,255,0.08)]">
            <button
              onClick={() => handleSort('country')}
              className={`flex-1 text-left ${headerBtnClass} justify-start ${sortKey === 'country' ? 'text-[#00F5FF]' : 'text-[#7070AA]'}`}
            >
              Country
              <SortArrow active={sortKey === 'country'} dir={sortDir} />
            </button>
            <button
              onClick={() => handleSort('usdt')}
              className={`w-20 ${headerBtnClass} ${sortKey === 'usdt' ? 'text-[#00F5FF]' : 'text-[#7070AA]'}`}
            >
              USDT
              <SortArrow active={sortKey === 'usdt'} dir={sortDir} />
            </button>
            <button
              onClick={() => handleSort('usdc')}
              className={`w-20 ${headerBtnClass} ${sortKey === 'usdc' ? 'text-[#00F5FF]' : 'text-[#7070AA]'}`}
            >
              USDC
              <SortArrow active={sortKey === 'usdc'} dir={sortDir} />
            </button>
          </div>

          {/* Country list */}
          <div
            className="p-3 overflow-y-auto flex-1 min-h-0"
            style={{ WebkitOverflowScrolling: 'touch', overscrollBehavior: 'contain' }}
          >
            {filtered.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-xs font-mono text-[#7070AA] tracking-wider">
              No results
            </div>
          </div>
        ) : (
          filtered.map((premium, i) => {
            const usdtColor = getPremiumColor(premium.usdtPremiumPct);
            const usdcColor = getPremiumColor(premium.usdcPremiumPct);
            const hasNotableSpread = premium.usdtPremiumPct !== null
              && premium.usdcPremiumPct !== null
              && (premium.usdcPremiumPct - premium.usdtPremiumPct) >= 5;

            return (
              <motion.div
                key={premium.iso2}
                className="flex items-center gap-4 px-4 py-3 rounded-lg
                  hover:bg-[rgba(0,245,255,0.05)] transition-colors"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + i * 0.02 }}
              >
                {/* Flag */}
                <div className="w-6 flex-shrink-0 flex items-center justify-center">
                  <FlagImg iso2={premium.iso2} />
                </div>

                {/* Country + fiat */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center">
                    <span className="text-sm text-[#E0E0FF]">{premium.country}</span>
                    {hasNotableSpread && <SpreadBadge />}
                  </div>
                  <span className="text-[10px] font-mono text-[#7070AA]/70">
                    {premium.officialRate
                      ? `$1 = ${premium.officialRate.toLocaleString('en-US', { maximumFractionDigits: premium.officialRate >= 100 ? 0 : 2 })} ${premium.fiat}`
                      : premium.fiat}
                  </span>
                </div>

                {/* USDT premium badge or No data */}
                {premium.usdtPremiumPct !== null ? (
                  <div
                    className="flex-shrink-0 w-20 py-1.5 rounded text-xs font-mono tracking-wider text-center"
                    style={{
                      color: usdtColor,
                      backgroundColor: `${usdtColor}15`,
                      border: `1px solid ${usdtColor}30`,
                    }}
                  >
                    {formatPremium(premium.usdtPremiumPct)}
                  </div>
                ) : (
                  <div className="flex-shrink-0 w-20" style={{ border: 'none', background: 'transparent' }}><NoDataBadge /></div>
                )}

                {/* USDC premium badge or No data */}
                {premium.usdcPremiumPct !== null ? (
                  <div
                    className="flex-shrink-0 w-20 py-1.5 rounded text-xs font-mono tracking-wider text-center"
                    style={{
                      color: usdcColor,
                      backgroundColor: `${usdcColor}15`,
                      border: `1px solid ${usdcColor}30`,
                    }}
                  >
                    {formatPremium(premium.usdcPremiumPct)}
                  </div>
                ) : (
                  <div className="flex-shrink-0 w-20" style={{ border: 'none', background: 'transparent' }}><NoDataBadge /></div>
                )}
              </motion.div>
            );
          })
        )}

            {/* Disclaimer footer */}
            <div className="px-2 py-3 mt-2 border-t border-[rgba(0,245,255,0.1)]">
              <p className="text-[10px] text-[#7070AA] leading-relaxed">
                Binance/Bybit P2P median price vs official FX rate. Not financial advice. Refreshed every 15 min.
              </p>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}
