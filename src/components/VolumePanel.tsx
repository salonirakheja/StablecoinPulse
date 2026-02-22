'use client';

import { motion } from 'framer-motion';
import { CountryVolume, StablecoinStats } from '@/lib/types';

interface VolumePanelProps {
  topCountries: CountryVolume[];
  globalVolume: number;
  lastUpdated: string;
  isOpen: boolean;
  onToggle: () => void;
  stablecoinStats: StablecoinStats | null;
}

function formatVolume(usd: number): string {
  if (usd >= 1e12) return `$${(usd / 1e12).toFixed(1)}T`;
  if (usd >= 1e9) return `$${(usd / 1e9).toFixed(1)}B`;
  if (usd >= 1e6) return `$${(usd / 1e6).toFixed(1)}M`;
  if (usd >= 1e3) return `$${(usd / 1e3).toFixed(0)}K`;
  return `$${usd.toFixed(0)}`;
}

const FLAG_EMOJI: Record<string, string> = {
  US: '\u{1F1FA}\u{1F1F8}', KR: '\u{1F1F0}\u{1F1F7}', JP: '\u{1F1EF}\u{1F1F5}',
  SG: '\u{1F1F8}\u{1F1EC}', GB: '\u{1F1EC}\u{1F1E7}', TR: '\u{1F1F9}\u{1F1F7}',
  BR: '\u{1F1E7}\u{1F1F7}', IN: '\u{1F1EE}\u{1F1F3}', DE: '\u{1F1E9}\u{1F1EA}',
  KY: '\u{1F1F0}\u{1F1FE}', SC: '\u{1F1F8}\u{1F1E8}', VG: '\u{1F1FB}\u{1F1EC}',
  AU: '\u{1F1E6}\u{1F1FA}', CA: '\u{1F1E8}\u{1F1E6}', HK: '\u{1F1ED}\u{1F1F0}',
  NL: '\u{1F1F3}\u{1F1F1}', FR: '\u{1F1EB}\u{1F1F7}', IT: '\u{1F1EE}\u{1F1F9}',
  MX: '\u{1F1F2}\u{1F1FD}', ZA: '\u{1F1FF}\u{1F1E6}', PH: '\u{1F1F5}\u{1F1ED}',
  TH: '\u{1F1F9}\u{1F1ED}', ID: '\u{1F1EE}\u{1F1E9}', NG: '\u{1F1F3}\u{1F1EC}',
  AR: '\u{1F1E6}\u{1F1F7}', PL: '\u{1F1F5}\u{1F1F1}', UA: '\u{1F1FA}\u{1F1E6}',
  CL: '\u{1F1E8}\u{1F1F1}', LU: '\u{1F1F1}\u{1F1FA}', MY: '\u{1F1F2}\u{1F1FE}',
  TW: '\u{1F1F9}\u{1F1FC}', VN: '\u{1F1FB}\u{1F1F3}', EG: '\u{1F1EA}\u{1F1EC}',
  KE: '\u{1F1F0}\u{1F1EA}', MT: '\u{1F1F2}\u{1F1F9}', EE: '\u{1F1EA}\u{1F1EA}',
  LT: '\u{1F1F1}\u{1F1F9}', BG: '\u{1F1E7}\u{1F1EC}', CY: '\u{1F1E8}\u{1F1FE}',
};

function getFlag(iso2: string): string {
  return FLAG_EMOJI[iso2] || '\u{1F30D}';
}

export default function VolumePanel({ topCountries, globalVolume, lastUpdated, isOpen, onToggle, stablecoinStats }: VolumePanelProps) {
  const timeSince = getTimeSince(lastUpdated);

  return (
    <>
      {/* Mobile toggle button — hidden when panel is open */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="md:hidden fixed bottom-16 right-3 z-50 px-4 py-3 rounded-xl
            text-xs font-mono tracking-wider text-[#00F5FF]
            backdrop-blur-md border border-[rgba(0,245,255,0.3)]
            transition-all duration-200 active:scale-95"
          style={{
            background: 'rgba(5, 5, 25, 0.85)',
            boxShadow: '0 0 15px rgba(0,245,255,0.15)',
          }}
        >
          RANKINGS
        </button>
      )}

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
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-[10px] tracking-[0.2em] text-[#7070AA] uppercase">
              Top Countries by Volume
            </h2>
            <button
              onClick={onToggle}
              className="md:hidden w-8 h-8 flex items-center justify-center rounded-full
                text-[#7070AA] hover:text-[#00F5FF] hover:bg-[rgba(0,245,255,0.1)]
                transition-colors text-sm"
            >
              ✕
            </button>
          </div>
          <div className="flex items-baseline gap-2">
            <span
              className="text-lg font-mono font-bold text-[#00F5FF]"
              style={{ textShadow: '0 0 10px rgba(0,245,255,0.4)' }}
            >
              {formatVolume(globalVolume)}
            </span>
            <span className="text-[10px] text-[#7070AA]">24h global</span>
          </div>
          <p className="text-[9px] text-[#7070AA] mt-1">Updated {timeSince}</p>
        </div>

        {/* Live stablecoin market data from DefiLlama */}
        {stablecoinStats && (
          <div className="px-4 py-2.5 border-b border-[rgba(0,245,255,0.08)]">
            <p className="text-[8px] tracking-[0.2em] text-[#7070AA] uppercase mb-1.5">
              Live Market Cap
            </p>
            <div className="flex gap-2">
              {[
                { label: 'USDT', value: stablecoinStats.usdtMarketCap, pct: stablecoinStats.usdtDominance },
                { label: 'USDC', value: stablecoinStats.usdcMarketCap, pct: stablecoinStats.usdcDominance },
                { label: 'DAI', value: stablecoinStats.daiMarketCap, pct: stablecoinStats.daiDominance },
              ].map((s) => (
                <div key={s.label} className="flex-1 p-1.5 rounded-md bg-[rgba(0,245,255,0.03)] border border-[rgba(0,245,255,0.06)]">
                  <p className="text-[8px] text-[#7070AA]">{s.label}</p>
                  <p className="text-[10px] font-mono text-[#E0E0FF]">{formatVolume(s.value)}</p>
                  <p className="text-[8px] font-mono text-[#00F5FF]">{s.pct}%</p>
                </div>
              ))}
            </div>
            <p className="text-[8px] text-[#7070AA]/50 mt-1">via DefiLlama</p>
          </div>
        )}

        {/* Country list */}
        <div className="p-2 max-h-[400px] overflow-y-auto max-md:max-h-[45vh] max-md:pb-14">
          {topCountries.map((country, i) => (
            <motion.div
              key={country.iso2}
              className="flex items-center gap-2 px-2 py-2 rounded-lg
                hover:bg-[rgba(0,245,255,0.05)] transition-colors"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.5 + i * 0.05 }}
            >
              {/* Rank */}
              <span className="text-[10px] font-mono text-[#7070AA] w-4 text-right">
                {i + 1}
              </span>

              {/* Flag */}
              <span className="text-base">{getFlag(country.iso2)}</span>

              {/* Country name + exchange */}
              <div className="flex-1 min-w-0">
                <div className="text-xs text-[#E0E0FF] truncate">{country.country}</div>
                <div className="text-[9px] text-[#7070AA] truncate">{country.topExchange}</div>
              </div>

              {/* Volume bar + amount */}
              <div className="flex flex-col items-end gap-0.5">
                <span className="text-xs font-mono text-[#00F5FF]">
                  {formatVolume(country.volumeUsd)}
                </span>
                <div className="w-16 h-1 rounded-full bg-[rgba(0,245,255,0.1)] overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, #4D4DFF, #00F5FF, ${country.volumeNormalized > 0.7 ? '#FF00FF' : '#00F5FF'})`,
                      boxShadow: '0 0 4px rgba(0,245,255,0.4)',
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.max(country.volumeNormalized * 100, 5)}%` }}
                    transition={{ duration: 0.8, delay: 0.6 + i * 0.05, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </motion.div>
    </>
  );
}

function getTimeSince(isoString: string): string {
  const diff = Date.now() - new Date(isoString).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ago`;
}
