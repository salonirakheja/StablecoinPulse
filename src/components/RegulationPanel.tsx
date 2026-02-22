'use client';

import { motion } from 'framer-motion';
import {
  STABLECOIN_REGULATIONS,
  REGULATION_COLORS,
  REGULATION_LABELS,
  getRegulationStats,
} from '@/data/stablecoin-regulations';
import type { RegulationStatus } from '@/lib/types';

interface RegulationPanelProps {
  isOpen: boolean;
  onToggle: () => void;
}

const FLAG_EMOJI: Record<string, string> = {
  US: '\u{1F1FA}\u{1F1F8}', KR: '\u{1F1F0}\u{1F1F7}', JP: '\u{1F1EF}\u{1F1F5}',
  SG: '\u{1F1F8}\u{1F1EC}', GB: '\u{1F1EC}\u{1F1E7}', TR: '\u{1F1F9}\u{1F1F7}',
  BR: '\u{1F1E7}\u{1F1F7}', IN: '\u{1F1EE}\u{1F1F3}', DE: '\u{1F1E9}\u{1F1EA}',
  AU: '\u{1F1E6}\u{1F1FA}', CA: '\u{1F1E8}\u{1F1E6}', HK: '\u{1F1ED}\u{1F1F0}',
  NL: '\u{1F1F3}\u{1F1F1}', FR: '\u{1F1EB}\u{1F1F7}', IT: '\u{1F1EE}\u{1F1F9}',
  MX: '\u{1F1F2}\u{1F1FD}', ZA: '\u{1F1FF}\u{1F1E6}', PH: '\u{1F1F5}\u{1F1ED}',
  TH: '\u{1F1F9}\u{1F1ED}', ID: '\u{1F1EE}\u{1F1E9}', NG: '\u{1F1F3}\u{1F1EC}',
  AR: '\u{1F1E6}\u{1F1F7}', UA: '\u{1F1FA}\u{1F1E6}', MY: '\u{1F1F2}\u{1F1FE}',
  TW: '\u{1F1F9}\u{1F1FC}', VN: '\u{1F1FB}\u{1F1F3}', EG: '\u{1F1EA}\u{1F1EC}',
  KE: '\u{1F1F0}\u{1F1EA}', CH: '\u{1F1E8}\u{1F1ED}', AE: '\u{1F1E6}\u{1F1EA}',
  BH: '\u{1F1E7}\u{1F1ED}', ES: '\u{1F1EA}\u{1F1F8}', IE: '\u{1F1EE}\u{1F1EA}',
  PT: '\u{1F1F5}\u{1F1F9}', AT: '\u{1F1E6}\u{1F1F9}', CN: '\u{1F1E8}\u{1F1F3}',
  RU: '\u{1F1F7}\u{1F1FA}', MA: '\u{1F1F2}\u{1F1E6}', DZ: '\u{1F1E9}\u{1F1FF}',
  BD: '\u{1F1E7}\u{1F1E9}', NP: '\u{1F1F3}\u{1F1F5}', PK: '\u{1F1F5}\u{1F1F0}',
  SA: '\u{1F1F8}\u{1F1E6}', GH: '\u{1F1EC}\u{1F1ED}', TZ: '\u{1F1F9}\u{1F1FF}',
  ET: '\u{1F1EA}\u{1F1F9}', PE: '\u{1F1F5}\u{1F1EA}', CL: '\u{1F1E8}\u{1F1F1}',
  QA: '\u{1F1F6}\u{1F1E6}', CO: '\u{1F1E8}\u{1F1F4}', IL: '\u{1F1EE}\u{1F1F1}',
};

function getFlag(iso2: string): string {
  return FLAG_EMOJI[iso2] || '\u{1F30D}';
}

const STATUS_ORDER: RegulationStatus[] = ['regulated', 'partial', 'restricted', 'unclear'];

export default function RegulationPanel({ isOpen, onToggle }: RegulationPanelProps) {
  const stats = getRegulationStats();
  const grouped = STATUS_ORDER.map(status => ({
    status,
    label: REGULATION_LABELS[status],
    color: REGULATION_COLORS[status],
    countries: STABLECOIN_REGULATIONS.filter(r => r.status === status),
  }));

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={onToggle}
        className="md:hidden fixed bottom-16 right-3 z-30 px-4 py-3 rounded-xl
          text-xs font-mono tracking-wider text-[#00F5FF]
          backdrop-blur-md border border-[rgba(0,245,255,0.3)]
          transition-all duration-200 active:scale-95"
        style={{
          background: 'rgba(5, 5, 25, 0.85)',
          boxShadow: '0 0 15px rgba(0,245,255,0.15)',
        }}
      >
        {isOpen ? 'CLOSE' : 'REGULATIONS'}
      </button>

      {/* Panel */}
      <motion.div
        className={`fixed z-40 backdrop-blur-md border border-[rgba(0,245,255,0.12)] rounded-xl overflow-hidden
          md:top-20 md:right-6 md:w-72
          max-md:bottom-0 max-md:left-0 max-md:right-0 max-md:rounded-b-none max-md:max-h-[50vh]
          ${!isOpen ? 'max-md:translate-y-full' : 'max-md:translate-y-0'}`}
        style={{ background: 'rgba(5, 5, 25, 0.85)' }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {/* Header */}
        <div className="px-4 pt-4 pb-2 border-b border-[rgba(0,245,255,0.08)]">
          <h2 className="text-[10px] tracking-[0.2em] text-[#7070AA] uppercase mb-1">
            Stablecoin Regulations
          </h2>
          <p
            className="text-sm font-mono font-bold text-[#E0E0FF]"
            style={{ textShadow: '0 0 10px rgba(0,245,255,0.3)' }}
          >
            {stats.total} countries tracked
          </p>
        </div>

        {/* Legend */}
        <div className="px-4 py-2.5 border-b border-[rgba(0,245,255,0.08)]">
          <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
            {STATUS_ORDER.map(status => (
              <div key={status} className="flex items-center gap-1.5">
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{
                    backgroundColor: REGULATION_COLORS[status],
                    boxShadow: `0 0 6px ${REGULATION_COLORS[status]}60`,
                  }}
                />
                <span className="text-[9px] font-mono text-[#E0E0FF] tracking-wider uppercase">
                  {REGULATION_LABELS[status]}
                </span>
                <span className="text-[9px] font-mono text-[#7070AA]">
                  {stats[status]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Country list grouped by status */}
        <div className="p-2 max-h-[400px] overflow-y-auto max-md:max-h-[45vh] max-md:pb-14">
          {grouped.map((group) => (
            <div key={group.status} className="mb-2">
              {/* Group header */}
              <div className="flex items-center gap-1.5 px-2 py-1.5">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    backgroundColor: group.color,
                    boxShadow: `0 0 4px ${group.color}60`,
                  }}
                />
                <span
                  className="text-[9px] tracking-[0.15em] font-mono uppercase"
                  style={{ color: group.color }}
                >
                  {group.label}
                </span>
              </div>

              {/* Countries in group */}
              {group.countries.map((reg, i) => (
                <motion.div
                  key={reg.iso2}
                  className="flex items-start gap-2 px-2 py-1.5 rounded-lg
                    hover:bg-[rgba(0,245,255,0.05)] transition-colors"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + i * 0.02 }}
                >
                  {/* Flag */}
                  <span className="text-sm flex-shrink-0 mt-0.5">{getFlag(reg.iso2)}</span>

                  {/* Country info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-[#E0E0FF] truncate">{reg.country}</span>
                      {reg.keyLaw && (
                        <span className="text-[8px] font-mono text-[#7070AA] truncate flex-shrink-0">
                          {reg.keyLaw}
                        </span>
                      )}
                    </div>
                    <p className="text-[9px] text-[#7070AA] leading-relaxed line-clamp-2 mt-0.5">
                      {reg.summary}
                    </p>
                  </div>

                  {/* Status badge */}
                  <div
                    className="flex-shrink-0 px-1.5 py-0.5 rounded text-[8px] font-mono tracking-wider uppercase mt-0.5"
                    style={{
                      color: group.color,
                      backgroundColor: `${group.color}15`,
                      border: `1px solid ${group.color}30`,
                    }}
                  >
                    {group.label}
                  </div>
                </motion.div>
              ))}
            </div>
          ))}

          {/* Disclaimer footer */}
          <div className="px-2 py-2 mt-1 border-t border-[rgba(0,245,255,0.06)]">
            <p className="text-[8px] text-[#7070AA]/50 leading-relaxed">
              For informational purposes only — not legal advice. Regulations change frequently. Last curated Feb 2025.
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
}
