'use client';

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ViewMode } from '@/lib/types';
import { getRegulationStats } from '@/data/stablecoin-regulations';

interface VolumeTickerProps {
  globalVolume: number;
  viewMode: ViewMode;
}

function AnimatedNumber({ value }: { value: number }) {
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 40, damping: 20 });
  const display = useTransform(spring, (v) => {
    if (v >= 1e12) return `$${(v / 1e12).toFixed(2)}T`;
    if (v >= 1e9) return `$${(v / 1e9).toFixed(2)}B`;
    if (v >= 1e6) return `$${(v / 1e6).toFixed(2)}M`;
    return `$${v.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
  });

  useEffect(() => {
    motionValue.set(value);
  }, [value, motionValue]);

  return <motion.span>{display}</motion.span>;
}

export default function VolumeTicker({ globalVolume, viewMode }: VolumeTickerProps) {
  const [showMethodology, setShowMethodology] = useState(false);
  const [showRegAbout, setShowRegAbout] = useState(false);
  const regulationStats = viewMode === 'regulation' ? getRegulationStats() : null;

  return (
    <>
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-20 flex items-center justify-center
          py-3 px-4 backdrop-blur-md border-t border-[rgba(0,245,255,0.08)]
          max-md:py-2"
        style={{ background: 'rgba(3, 3, 8, 0.8)' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="flex items-center gap-3">
          {/* Pulse dot */}
          <div className="relative">
            <div
              className="w-2 h-2 rounded-full bg-[#00F5FF]"
              style={{ boxShadow: '0 0 6px #00F5FF, 0 0 12px rgba(0,245,255,0.4)' }}
            />
            <motion.div
              className="absolute inset-0 w-2 h-2 rounded-full bg-[#00F5FF]"
              animate={{ scale: [1, 2.5, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          {viewMode === 'volume' ? (
            <>
              <span className="text-[10px] tracking-[0.2em] text-[#7070AA] uppercase max-md:hidden">
                Est. Global 24H Stablecoin Volume
              </span>
              <span className="text-[10px] tracking-[0.15em] text-[#7070AA] uppercase md:hidden">
                Est. 24H Volume
              </span>

              <span
                className="text-lg md:text-xl font-mono font-bold text-[#00F5FF]"
                style={{
                  textShadow: '0 0 10px rgba(0,245,255,0.8), 0 0 30px rgba(0,245,255,0.4), 0 0 60px rgba(0,245,255,0.2)',
                }}
              >
                <AnimatedNumber value={globalVolume} />
              </span>

              {/* Live indicator */}
              <div className="flex items-center gap-1">
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-[#39FF14]"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="text-[9px] text-[#39FF14] tracking-wider font-mono">LIVE</span>
              </div>

              {/* Methodology button */}
              <button
                onClick={() => setShowMethodology(true)}
                className="text-[9px] text-[#7070AA] hover:text-[#00F5FF] transition-colors
                  tracking-wider font-mono underline underline-offset-2 decoration-[rgba(112,112,170,0.3)]
                  max-md:hidden"
              >
                HOW?
              </button>
            </>
          ) : (
            /* Regulation summary stats */
            regulationStats && (
              <>
                <span className="text-[10px] tracking-[0.15em] text-[#7070AA] uppercase max-md:hidden">
                  {regulationStats.total} countries tracked
                </span>
                <span className="text-[10px] tracking-[0.15em] text-[#7070AA] uppercase md:hidden">
                  {regulationStats.total} tracked
                </span>
                <span className="text-[10px] font-mono text-[#7070AA]">|</span>
                <div className="flex items-center gap-3 max-md:gap-2">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14] inline-block" />
                    <span className="text-[10px] font-mono text-[#39FF14]">{regulationStats.regulated}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFB800] inline-block" />
                    <span className="text-[10px] font-mono text-[#FFB800]">{regulationStats.partial}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF1493] inline-block" />
                    <span className="text-[10px] font-mono text-[#FF1493]">{regulationStats.restricted}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7070AA] inline-block" />
                    <span className="text-[10px] font-mono text-[#7070AA]">{regulationStats.unclear}</span>
                  </span>
                </div>

                {/* About button */}
                <button
                  onClick={() => setShowRegAbout(true)}
                  className="text-[9px] text-[#7070AA] hover:text-[#00F5FF] transition-colors
                    tracking-wider font-mono underline underline-offset-2 decoration-[rgba(112,112,170,0.3)]
                    max-md:hidden"
                >
                  ABOUT
                </button>
              </>
            )
          )}
        </div>
      </motion.div>

      {/* Methodology modal */}
      <AnimatePresence>
        {showMethodology && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-[rgba(3,3,8,0.85)]"
              onClick={() => setShowMethodology(false)}
            />

            {/* Modal */}
            <motion.div
              className="relative w-full max-w-md p-4 md:p-6 rounded-xl backdrop-blur-xl
                border border-[rgba(0,245,255,0.2)]
                shadow-[0_0_40px_rgba(0,245,255,0.1)]
                overflow-y-auto max-h-[85vh] mx-2 md:mx-0"
              style={{ background: 'rgba(5, 5, 25, 0.95)' }}
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
            >
              <button
                onClick={() => setShowMethodology(false)}
                className="absolute top-2 right-2 w-9 h-9 flex items-center justify-center
                  rounded-full text-[#7070AA] hover:text-[#00F5FF] hover:bg-[rgba(0,245,255,0.1)]
                  transition-colors text-sm"
              >
                ✕
              </button>

              <h2
                className="text-sm font-bold tracking-[0.15em] text-[#E0E0FF] mb-4"
                style={{ textShadow: '0 0 10px rgba(0,245,255,0.3)' }}
              >
                METHODOLOGY
              </h2>

              <div className="space-y-4 text-xs leading-relaxed text-[#7070AA]">
                <p>
                  We combine <span className="text-[#E0E0FF]">three live data sources</span> to build the most comprehensive free picture of global stablecoin activity.
                </p>

                <div>
                  <h3 className="text-[10px] tracking-widest text-[#00F5FF] uppercase mb-1">
                    Exchange Volume
                  </h3>
                  <p>
                    Real 24h trading volume from <span className="text-[#E0E0FF]">~500 exchanges</span> via CoinGecko, grouped by country of registration. Refreshed every 15 minutes.
                  </p>
                </div>

                <div>
                  <h3 className="text-[10px] tracking-widest text-[#00F5FF] uppercase mb-1">
                    On-Chain Supply
                  </h3>
                  <p>
                    Actual USDT, USDC, and DAI supply across <span className="text-[#E0E0FF]">6 major blockchains</span> (Tron, Ethereum, Solana, BSC, Base, Arbitrum) via DefiLlama. This calibrates the stablecoin mix per region in real time.
                  </p>
                </div>

                <div>
                  <h3 className="text-[10px] tracking-widest text-[#00F5FF] uppercase mb-1">
                    Regional Modeling
                  </h3>
                  <p>
                    Each blockchain has distinct geographic usage patterns — Tron dominates emerging markets, Base skews US/Coinbase, Ethereum is institutional/Western. We use these patterns, informed by <span className="text-[#E0E0FF]">Chainalysis geographic reports</span>, to distribute on-chain data across countries.
                  </p>
                </div>

                <div className="p-3 rounded-lg border border-[rgba(0,245,255,0.1)]"
                  style={{ background: 'rgba(0,245,255,0.03)' }}>
                  <h3 className="text-[10px] tracking-widest text-[#E0E0FF] uppercase mb-1">
                    Accuracy
                  </h3>
                  <p>
                    Country rankings and relative volumes are reliable. The USDT vs USDC breakdown per country is modeled using live on-chain ratios — not guessed. Global totals are within range of industry estimates.
                  </p>
                </div>

                <div className="pt-2 border-t border-[rgba(0,245,255,0.08)]">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#39FF14]" />
                      <span className="text-[9px] text-[#39FF14]">CoinGecko</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#39FF14]" />
                      <span className="text-[9px] text-[#39FF14]">DefiLlama</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#39FF14]" />
                      <span className="text-[9px] text-[#39FF14]">Chainalysis Models</span>
                    </div>
                  </div>
                  <p className="text-[9px] text-[#7070AA]/60 mt-1.5">All data refreshes automatically every 15 min</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Regulation about/disclaimer modal */}
      <AnimatePresence>
        {showRegAbout && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-[rgba(3,3,8,0.85)]"
              onClick={() => setShowRegAbout(false)}
            />

            {/* Modal */}
            <motion.div
              className="relative w-full max-w-md p-4 md:p-6 rounded-xl backdrop-blur-xl
                border border-[rgba(0,245,255,0.2)]
                shadow-[0_0_40px_rgba(0,245,255,0.1)]
                overflow-y-auto max-h-[85vh] mx-2 md:mx-0"
              style={{ background: 'rgba(5, 5, 25, 0.95)' }}
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
            >
              <button
                onClick={() => setShowRegAbout(false)}
                className="absolute top-2 right-2 w-9 h-9 flex items-center justify-center
                  rounded-full text-[#7070AA] hover:text-[#00F5FF] hover:bg-[rgba(0,245,255,0.1)]
                  transition-colors text-sm"
              >
                ✕
              </button>

              <h2
                className="text-sm font-bold tracking-[0.15em] text-[#E0E0FF] mb-4"
                style={{ textShadow: '0 0 10px rgba(0,245,255,0.3)' }}
              >
                ABOUT THIS MAP
              </h2>

              <div className="space-y-4 text-xs leading-relaxed text-[#7070AA]">
                <p>
                  This map shows the <span className="text-[#E0E0FF]">regulatory status of stablecoins</span> across {regulationStats?.total || 50} countries, based on publicly available laws, central bank directives, and regulatory guidance.
                </p>

                <div>
                  <h3 className="text-[10px] tracking-widest text-[#00F5FF] uppercase mb-1">
                    Classification
                  </h3>
                  <div className="space-y-1.5">
                    <div className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#39FF14] mt-1 flex-shrink-0" style={{ boxShadow: '0 0 4px #39FF1460' }} />
                      <p><span className="text-[#39FF14]">Regulated</span> — Explicit legal framework for stablecoins or crypto assets with licensing requirements</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#FFB800] mt-1 flex-shrink-0" style={{ boxShadow: '0 0 4px #FFB80060' }} />
                      <p><span className="text-[#FFB800]">Partial</span> — Some rules exist but stablecoins not specifically addressed, or patchwork regulation</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#FF1493] mt-1 flex-shrink-0" style={{ boxShadow: '0 0 4px #FF149360' }} />
                      <p><span className="text-[#FF1493]">Restricted</span> — Outright bans, banking prohibitions, or severe limitations on crypto/stablecoin usage</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#7070AA] mt-1 flex-shrink-0" style={{ boxShadow: '0 0 4px #7070AA60' }} />
                      <p><span className="text-[#E0E0FF]">Unclear</span> — No formal position taken, or legislation announced but not yet implemented</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-[10px] tracking-widest text-[#00F5FF] uppercase mb-1">
                    Sources
                  </h3>
                  <p>
                    Data compiled from official government publications, central bank circulars, financial authority announcements, and reputable legal analyses including <span className="text-[#E0E0FF]">Library of Congress crypto surveys</span>, <span className="text-[#E0E0FF]">FATF mutual evaluations</span>, and regional regulatory trackers.
                  </p>
                </div>

                <div className="p-3 rounded-lg border border-[rgba(0,245,255,0.1)]"
                  style={{ background: 'rgba(0,245,255,0.03)' }}>
                  <h3 className="text-[10px] tracking-widest text-[#E0E0FF] uppercase mb-1">
                    Volume vs. Regulation
                  </h3>
                  <p>
                    High trading volume in restricted countries is common. Bans often drive usage underground via <span className="text-[#E0E0FF]">P2P and OTC markets</span> rather than eliminating it. Countries like China, Russia, and Nigeria rank among the highest in stablecoin volume despite official restrictions — people need stablecoins to bypass broken banking systems, capital controls, or inflation.
                  </p>
                </div>

                <div className="p-3 rounded-lg border border-[rgba(255,184,0,0.15)]"
                  style={{ background: 'rgba(255,184,0,0.04)' }}>
                  <h3 className="text-[10px] tracking-widest text-[#FFB800] uppercase mb-1">
                    Disclaimer
                  </h3>
                  <p>
                    This map is for <span className="text-[#E0E0FF]">informational purposes only</span> and does not constitute legal advice. Regulatory landscapes change frequently — a country&apos;s status may have shifted since last update. Always consult local legal counsel before making decisions based on this data.
                  </p>
                </div>

                <div className="pt-2 border-t border-[rgba(0,245,255,0.08)]">
                  <p className="text-[9px] text-[#7070AA]/60">Last curated: Feb 2025. Regulations evolve — verify before relying on this data.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
