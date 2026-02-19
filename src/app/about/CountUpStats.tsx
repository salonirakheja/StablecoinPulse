'use client';

import { useEffect, useRef, useState } from 'react';

const stats = [
  { target: 500, suffix: '+', label: 'Exchanges' },
  { target: 6, suffix: '', label: 'Blockchains' },
  { target: 80, suffix: '+', label: 'Countries' },
  { target: 3, suffix: '', label: 'Stablecoins' },
];

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function CountUpNumber({ target, suffix }: { target: number; suffix: string }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const duration = 1500;
          const start = performance.now();

          function tick(now: number) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeOutCubic(progress);
            setValue(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          }

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref}>
      <p
        className="text-2xl font-bold text-[#E0E0FF] font-mono"
        style={{ textShadow: '0 0 20px rgba(0,245,255,0.3)' }}
      >
        {value}{suffix}
      </p>
    </div>
  );
}

export default function CountUpStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border border-[rgba(0,245,255,0.1)] px-5 py-4 text-center"
          style={{ background: 'rgba(5, 5, 25, 0.6)' }}
        >
          <CountUpNumber target={stat.target} suffix={stat.suffix} />
          <p className="text-[10px] font-mono tracking-[0.15em] text-[#7070AA] mt-1">{stat.label.toUpperCase()}</p>
        </div>
      ))}
    </div>
  );
}
