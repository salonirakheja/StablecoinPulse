'use client';

import { motion } from 'framer-motion';
import { ViewMode } from '@/lib/types';

interface ViewModeToggleProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export default function ViewModeToggle({ viewMode, onViewModeChange }: ViewModeToggleProps) {
  return (
    <motion.div
      className="flex items-center gap-1 p-1 rounded-lg backdrop-blur-md
        border border-[rgba(0,245,255,0.15)]"
      style={{ background: 'rgba(5, 5, 25, 0.75)' }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      {(['volume', 'regulation'] as const).map((mode) => (
        <button
          key={mode}
          onClick={() => onViewModeChange(mode)}
          className={`relative px-3 py-1.5 rounded-md text-[10px] font-mono tracking-wider transition-colors duration-200
            max-md:px-2 max-md:py-1
            ${viewMode === mode
              ? 'text-[#00F5FF]'
              : 'text-[#7070AA] hover:text-[#E0E0FF]'
            }`}
        >
          {viewMode === mode && (
            <motion.div
              layoutId="viewmode-active"
              className="absolute inset-0 rounded-md border border-[rgba(0,245,255,0.4)]"
              style={{
                background: 'rgba(0, 245, 255, 0.08)',
                boxShadow: '0 0 12px rgba(0,245,255,0.15), inset 0 0 12px rgba(0,245,255,0.05)',
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">
            {mode === 'volume' ? 'VOLUME' : 'REGULATION'}
          </span>
        </button>
      ))}
    </motion.div>
  );
}
