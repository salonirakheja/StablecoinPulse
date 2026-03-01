'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { StablecoinFilter, ViewMode, ChainBreakdown } from '@/lib/types';
import { REGULATION_COLORS, REGULATION_LABELS } from '@/data/stablecoin-regulations';
import type { RegulationStatus } from '@/lib/types';

interface GlobeControlsProps {
  filter: StablecoinFilter;
  onFilterChange: (f: StablecoinFilter) => void;
  viewMode: ViewMode;
  chainBreakdown?: ChainBreakdown | null;
}

const STABLECOIN_FILTERS: { label: string; value: StablecoinFilter }[] = [
  { label: 'ALL', value: 'all' },
  { label: 'USDT', value: 'usdt' },
  { label: 'USDC', value: 'usdc' },
  { label: 'DAI', value: 'dai' },
];

const CHAINS: { key: keyof ChainBreakdown; label: string; color: string }[] = [
  { key: 'ethereum', label: 'ETH', color: '#627EEA' },
  { key: 'tron',     label: 'TRX', color: '#FF0013' },
  { key: 'solana',   label: 'SOL', color: '#9945FF' },
  { key: 'bsc',      label: 'BSC', color: '#F0B90B' },
  { key: 'base',     label: 'BASE', color: '#0052FF' },
  { key: 'arbitrum', label: 'ARB', color: '#28A0F0' },
];

const ALL_CHAIN_KEYS = new Set(CHAINS.map(c => c.key));

const STATUS_ORDER: RegulationStatus[] = ['regulated', 'partial', 'restricted', 'unclear'];

function fmt(usd: number): string {
  if (usd >= 1e12) return `$${(usd / 1e12).toFixed(1)}T`;
  if (usd >= 1e9) return `$${(usd / 1e9).toFixed(1)}B`;
  if (usd >= 1e6) return `$${(usd / 1e6).toFixed(0)}M`;
  if (usd >= 1e3) return `$${(usd / 1e3).toFixed(0)}K`;
  return '$0';
}

function chainVal(bd: ChainBreakdown, k: keyof ChainBreakdown, sf: StablecoinFilter): number {
  const c = bd[k];
  if (sf === 'usdt') return c.usdt;
  if (sf === 'usdc') return c.usdc;
  if (sf === 'dai') return 0;
  return c.usdt + c.usdc;
}

export default function GlobeControls({ filter, onFilterChange, viewMode, chainBreakdown }: GlobeControlsProps) {
  const [activeChains, setActiveChains] = useState<Set<keyof ChainBreakdown>>(new Set(ALL_CHAIN_KEYS));

  const allChainsActive = activeChains.size === CHAINS.length;

  const handleChainToggle = (key: keyof ChainBreakdown) => {
    setActiveChains(prev => {
      const next = new Set(prev);
      if (next.has(key)) {
        if (next.size > 1) next.delete(key); // don't allow empty
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const handleChainAll = () => setActiveChains(new Set(ALL_CHAIN_KEYS));

  // Sort chains by supply descending
  const sortedChains = useMemo(() => {
    if (!chainBreakdown) return CHAINS;
    return [...CHAINS].sort((a, b) => chainVal(chainBreakdown, b.key, filter) - chainVal(chainBreakdown, a.key, filter));
  }, [chainBreakdown, filter]);

  // Total supply based on active filters
  const totalSupply = useMemo(() => {
    if (!chainBreakdown) return 0;
    let sum = 0;
    for (const { key } of CHAINS) {
      if (activeChains.has(key)) {
        sum += chainVal(chainBreakdown, key, filter);
      }
    }
    return sum;
  }, [chainBreakdown, activeChains, filter]);

  return (
    <motion.div
      className="absolute bottom-6 left-6 z-30 flex flex-col gap-3
        max-md:bottom-20 max-md:left-3 max-md:right-auto max-md:flex-row max-md:gap-2"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {viewMode === 'volume' ? (
        <>
          {/* Unified filter panel */}
          <div
            className="flex flex-col p-4 rounded-xl backdrop-blur-md
              border border-[rgba(0,245,255,0.08)]
              max-md:p-2"
            style={{ background: 'rgba(5, 5, 25, 0.78)' }}
          >
            {/* Total supply — desktop only */}
            {chainBreakdown && filter !== 'dai' && (
              <div className="max-md:hidden">
                {/* Total */}
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-[10px] tracking-[0.15em] text-[#7070AA] uppercase font-medium">
                    {filter === 'usdt' ? 'USDT Supply' : filter === 'usdc' ? 'USDC Supply' : 'USDT + USDC Supply'}
                  </span>
                  <span
                    className="text-sm font-mono font-bold text-[#00F5FF]"
                    style={{ textShadow: '0 0 8px rgba(0,245,255,0.3)' }}
                  >
                    {fmt(totalSupply)}
                  </span>
                </div>

                {/* Chain section */}
                <div className="flex items-center gap-2 mb-2">
                  <button
                    onClick={handleChainAll}
                    className={`text-[10px] font-mono px-2 py-0.5 rounded transition-all duration-150 cursor-pointer
                      ${allChainsActive
                        ? 'text-[#00F5FF] bg-[rgba(0,245,255,0.1)] border border-[rgba(0,245,255,0.4)]'
                        : 'text-[#7070AA] hover:text-[#E0E0FF] border border-[rgba(0,245,255,0.1)]'
                      }`}
                  >
                    ALL CHAINS
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-1.5">
                  {sortedChains.map(({ key, label, color }) => {
                    const supply = chainVal(chainBreakdown, key, filter);
                    const isActive = activeChains.has(key);

                    return (
                      <button
                        key={key}
                        onClick={() => handleChainToggle(key)}
                        className="flex items-center gap-1 px-2 py-1 rounded-md transition-all duration-150 cursor-pointer"
                        style={{
                          background: isActive ? `${color}18` : 'rgba(255,255,255,0.02)',
                          border: `1px solid ${isActive ? `${color}60` : 'rgba(255,255,255,0.06)'}`,
                          opacity: isActive ? 1 : 0.35,
                        }}
                      >
                        <span className="text-[11px] font-mono font-medium leading-none" style={{ color: isActive ? color : '#7070AA' }}>{label}</span>
                        <span className="text-[10px] font-mono text-[#9090BB] leading-none ml-auto">{fmt(supply)}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Divider */}
                <div className="h-px bg-[rgba(0,245,255,0.06)] my-3" />
              </div>
            )}

            {/* Stablecoin section */}
            <span className="text-[10px] tracking-[0.15em] text-[#7070AA] uppercase font-medium max-md:hidden mb-2">
              Stablecoin
            </span>
            <div className="flex gap-1.5 max-md:gap-1">
              {STABLECOIN_FILTERS.map((f) => {
                const isActive = filter === f.value;

                return (
                  <button
                    key={f.value}
                    onClick={() => onFilterChange(f.value)}
                    className={`relative px-2.5 py-1 rounded-md text-[11px] font-mono font-medium tracking-wider transition-all duration-200 cursor-pointer
                      max-md:px-2
                      ${isActive
                        ? 'text-[#00F5FF]'
                        : 'text-[#7070AA] hover:text-[#E0E0FF]'
                      }`}
                    style={{
                      background: isActive ? 'rgba(0, 245, 255, 0.08)' : 'rgba(255,255,255,0.02)',
                      border: `1px solid ${isActive ? 'rgba(0,245,255,0.45)' : 'rgba(255,255,255,0.06)'}`,
                      boxShadow: isActive ? '0 0 10px rgba(0,245,255,0.1)' : 'none',
                    }}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 24H indicator badge */}
          <div
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl backdrop-blur-md
              max-md:hidden
              border border-[rgba(0,245,255,0.08)]"
            style={{ background: 'rgba(5, 5, 25, 0.75)' }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full bg-[#00F5FF]"
              style={{ boxShadow: '0 0 6px #00F5FF' }}
            />
            <span className="text-[10px] tracking-widest text-[#7070AA] uppercase font-mono">
              24H Rolling
            </span>
          </div>
        </>
      ) : viewMode === 'regulation' ? (
        <div
          className="flex flex-col gap-2 p-3 rounded-xl backdrop-blur-md
            max-md:flex-row max-md:flex-wrap max-md:gap-x-3 max-md:gap-y-1 max-md:p-2 max-md:items-center
            border border-[rgba(0,245,255,0.08)]"
          style={{ background: 'rgba(5, 5, 25, 0.75)' }}
        >
          <span className="text-[10px] tracking-widest text-[#7070AA] uppercase px-1 max-md:hidden">
            Status
          </span>
          {STATUS_ORDER.map((status) => (
            <div key={status} className="flex items-center gap-2 px-1 max-md:gap-1 max-md:px-0">
              <div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{
                  backgroundColor: REGULATION_COLORS[status],
                  boxShadow: `0 0 6px ${REGULATION_COLORS[status]}60`,
                }}
              />
              <span className="text-[10px] font-mono text-[#E0E0FF] tracking-wider uppercase max-md:text-[8px]">
                {REGULATION_LABELS[status]}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div
          className="flex flex-col gap-2 p-3 rounded-xl backdrop-blur-md
            max-md:flex-row max-md:flex-wrap max-md:gap-x-3 max-md:gap-y-1 max-md:p-2 max-md:items-center
            border border-[rgba(0,245,255,0.08)]"
          style={{ background: 'rgba(5, 5, 25, 0.75)' }}
        >
          <span className="text-[10px] tracking-widest text-[#7070AA] uppercase px-1 max-md:hidden">
            Premium
          </span>
          {[
            { label: 'At Par', color: '#A0A0B8' },
            { label: 'Low', color: '#00F5FF' },
            { label: 'Moderate', color: '#FFB800' },
            { label: 'High', color: '#FF1493' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2 px-1 max-md:gap-1 max-md:px-0">
              <div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{
                  backgroundColor: item.color,
                  boxShadow: `0 0 6px ${item.color}60`,
                }}
              />
              <span className="text-[10px] font-mono text-[#E0E0FF] tracking-wider uppercase max-md:text-[8px]">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
