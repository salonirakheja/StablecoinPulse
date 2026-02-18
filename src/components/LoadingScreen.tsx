'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  isLoading: boolean;
}

export default function LoadingScreen({ isLoading }: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ background: '#030308' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {/* Pulsing circle */}
          <div className="relative mb-8">
            <motion.div
              className="w-20 h-20 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(0,245,255,0.4) 0%, transparent 70%)',
                boxShadow: '0 0 40px rgba(0,245,255,0.3), 0 0 80px rgba(0,245,255,0.1)',
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="absolute inset-0 m-auto w-4 h-4 rounded-full bg-[#00F5FF]"
              style={{
                boxShadow: '0 0 10px #00F5FF, 0 0 20px rgba(0,245,255,0.5)',
              }}
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>

          {/* Title with letter-by-letter reveal */}
          <motion.h1
            className="text-2xl md:text-4xl font-bold tracking-[0.3em] mb-4"
            style={{
              color: '#E0E0FF',
              textShadow: '0 0 20px rgba(0,245,255,0.5), 0 0 40px rgba(0,245,255,0.2)',
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            STABLECOIN PULSE
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-sm tracking-widest"
            style={{ color: '#7070AA' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Mapping global stablecoin flows...
          </motion.p>

          {/* Scanning line */}
          <motion.div
            className="absolute left-0 right-0 h-[1px]"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(0,245,255,0.3), transparent)',
            }}
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
