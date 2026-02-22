'use client';

import { motion } from 'framer-motion';
import { StablecoinFilter, ViewMode } from '@/lib/types';
import { REGULATION_COLORS, REGULATION_LABELS } from '@/data/stablecoin-regulations';
import type { RegulationStatus } from '@/lib/types';

interface GlobeControlsProps {
  filter: StablecoinFilter;
  onFilterChange: (f: StablecoinFilter) => void;
  viewMode: ViewMode;
}

const FILTERS: { label: string; value: StablecoinFilter }[] = [
  { label: 'ALL', value: 'all' },
  { label: 'USDT', value: 'usdt' },
  { label: 'USDC', value: 'usdc' },
  { label: 'DAI', value: 'dai' },
];

const STATUS_ORDER: RegulationStatus[] = ['regulated', 'partial', 'restricted', 'unclear'];

export default function GlobeControls({ filter, onFilterChange, viewMode }: GlobeControlsProps) {
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
          {/* Stablecoin filter */}
          <div
            className="flex flex-col gap-1.5 p-3 rounded-xl backdrop-blur-md
              max-md:flex-row max-md:p-2 max-md:items-center
              border border-[rgba(0,245,255,0.12)]"
            style={{ background: 'rgba(5, 5, 25, 0.75)' }}
          >
            <span className="text-[10px] tracking-widest text-[#7070AA] uppercase px-1 max-md:hidden">
              Stablecoin
            </span>
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => onFilterChange(f.value)}
                className={`relative px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all duration-200
                  max-md:px-2.5
                  ${filter === f.value
                    ? 'text-[#00F5FF]'
                    : 'text-[#7070AA] hover:text-[#E0E0FF]'
                  }`}
              >
                {filter === f.value && (
                  <motion.div
                    layoutId="filter-active"
                    className="absolute inset-0 rounded-lg border border-[rgba(0,245,255,0.4)]"
                    style={{
                      background: 'rgba(0, 245, 255, 0.08)',
                      boxShadow: '0 0 15px rgba(0,245,255,0.15), inset 0 0 15px rgba(0,245,255,0.05)',
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{f.label}</span>
              </button>
            ))}
          </div>

          {/* 24H indicator badge */}
          <div
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl backdrop-blur-md
              max-md:px-2 max-md:py-1.5
              border border-[rgba(0,245,255,0.12)]"
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
      ) : (
        /* Regulation legend */
        <div
          className="flex flex-col gap-2 p-3 rounded-xl backdrop-blur-md
            max-md:hidden
            border border-[rgba(0,245,255,0.12)]"
          style={{ background: 'rgba(5, 5, 25, 0.75)' }}
        >
          <span className="text-[10px] tracking-widest text-[#7070AA] uppercase px-1 max-md:hidden">
            Status
          </span>
          {STATUS_ORDER.map((status) => (
            <div key={status} className="flex items-center gap-2 px-1">
              <div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{
                  backgroundColor: REGULATION_COLORS[status],
                  boxShadow: `0 0 6px ${REGULATION_COLORS[status]}60`,
                }}
              />
              <span className="text-[10px] font-mono text-[#E0E0FF] tracking-wider uppercase">
                {REGULATION_LABELS[status]}
              </span>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
