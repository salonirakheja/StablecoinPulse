'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CountryVolume } from '@/lib/types';

interface ShareButtonProps {
  topCountries: CountryVolume[];
  globalVolume: number;
}

function formatVolume(usd: number): string {
  if (usd >= 1e12) return `$${(usd / 1e12).toFixed(1)}T`;
  if (usd >= 1e9) return `$${(usd / 1e9).toFixed(1)}B`;
  if (usd >= 1e6) return `$${(usd / 1e6).toFixed(1)}M`;
  return `$${(usd / 1e3).toFixed(0)}K`;
}

export default function ShareButton({ topCountries, globalVolume }: ShareButtonProps) {
  const [status, setStatus] = useState<'idle' | 'capturing' | 'done'>('idle');

  const handleShare = useCallback(async () => {
    setStatus('capturing');

    const shareText = [
      `Global stablecoin volume right now: ${formatVolume(globalVolume)}`,
      '',
      ...topCountries.slice(0, 5).map((c, i) => `${i + 1}. ${c.country}: ${formatVolume(c.volumeUsd)}`),
      '',
      '#StablecoinPulse #Crypto',
    ].join('\n');

    try {
      // Try screenshot first
      const { toPng } = await import('html-to-image');
      const node = document.getElementById('globe-container');
      if (node) {
        const dataUrl = await toPng(node, {
          backgroundColor: '#030308',
          pixelRatio: 2,
        });

        // Try Web Share API (mobile)
        if (navigator.share && navigator.canShare) {
          const blob = await (await fetch(dataUrl)).blob();
          const file = new File([blob], 'stablecoin-pulse.png', { type: 'image/png' });
          if (navigator.canShare({ files: [file] })) {
            await navigator.share({
              text: shareText,
              files: [file],
            });
            setStatus('done');
            setTimeout(() => setStatus('idle'), 2000);
            return;
          }
        }

        // Fallback: download image + copy text
        const link = document.createElement('a');
        link.download = 'stablecoin-pulse.png';
        link.href = dataUrl;
        link.click();
      }

      // Copy share text
      await navigator.clipboard.writeText(shareText);
      setStatus('done');
    } catch {
      // If screenshot fails, just copy text
      try {
        await navigator.clipboard.writeText(shareText);
      } catch { /* ignore */ }
      setStatus('done');
    }

    setTimeout(() => setStatus('idle'), 2000);
  }, [topCountries, globalVolume]);

  return (
    <motion.button
      onClick={handleShare}
      disabled={status === 'capturing'}
      className="relative px-4 py-2 rounded-xl text-xs font-mono tracking-wider
        backdrop-blur-md border border-[rgba(0,245,255,0.3)]
        transition-all duration-200 active:scale-95 disabled:opacity-50"
      style={{
        background: 'rgba(5, 5, 25, 0.75)',
        color: '#00F5FF',
      }}
      whileHover={{
        boxShadow: '0 0 20px rgba(0,245,255,0.3), 0 0 40px rgba(0,245,255,0.1)',
      }}
    >
      <AnimatePresence mode="wait">
        {status === 'idle' && (
          <motion.span
            key="share"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
            SHARE
          </motion.span>
        )}
        {status === 'capturing' && (
          <motion.span
            key="capturing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            CAPTURING...
          </motion.span>
        )}
        {status === 'done' && (
          <motion.span
            key="done"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-[#39FF14]"
          >
            COPIED!
          </motion.span>
        )}
      </AnimatePresence>

      {/* Pulse animation border */}
      <motion.div
        className="absolute inset-0 rounded-xl border border-[rgba(0,245,255,0.2)]"
        animate={{
          boxShadow: [
            '0 0 10px rgba(0,245,255,0.1)',
            '0 0 20px rgba(0,245,255,0.2)',
            '0 0 10px rgba(0,245,255,0.1)',
          ],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.button>
  );
}
