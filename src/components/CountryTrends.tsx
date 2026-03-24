'use client';

import { useEffect, useState } from 'react';

interface HistoryPoint {
  date: string;
  volumeUsd: number | null;
  usdtPremiumPct: number | null;
  usdcPremiumPct: number | null;
  officialRate: number | null;
  depreciation12m: number | null;
}

interface TrendData {
  points: HistoryPoint[];
  volumeTrend: number | null;   // % change over period
  premiumTrend: number | null;
  usdcPremiumTrend: number | null;
}

function Sparkline({ values, color, height = 32, width = 80 }: { values: number[]; color: string; height?: number; width?: number }) {
  if (values.length < 2) return null;

  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const points = values.map((v, i) => {
    const x = (i / (values.length - 1)) * width;
    const y = height - ((v - min) / range) * (height - 4) - 2;
    return `${x},${y}`;
  });

  return (
    <svg width={width} height={height} className="overflow-visible">
      {/* Gradient fill */}
      <defs>
        <linearGradient id={`grad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Fill area */}
      <polygon
        points={`0,${height} ${points.join(' ')} ${width},${height}`}
        fill={`url(#grad-${color.replace('#', '')})`}
      />
      {/* Line */}
      <polyline
        points={points.join(' ')}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* End dot */}
      {(() => {
        const lastPoint = points[points.length - 1].split(',');
        return (
          <circle
            cx={lastPoint[0]}
            cy={lastPoint[1]}
            r="2"
            fill={color}
            style={{ filter: `drop-shadow(0 0 3px ${color})` }}
          />
        );
      })()}
    </svg>
  );
}

function TrendArrow({ pct }: { pct: number }) {
  const isUp = pct > 0;
  const color = isUp ? '#00E5A0' : '#FF6B6B';
  const arrow = isUp ? '↑' : '↓';

  return (
    <span className="text-[9px] font-mono" style={{ color }}>
      {arrow} {Math.abs(pct).toFixed(1)}%
    </span>
  );
}

export default function CountryTrends({ iso2 }: { iso2: string }) {
  const [data, setData] = useState<TrendData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await fetch(`/api/history?iso2=${iso2}&days=7`);
        if (!res.ok) throw new Error('Failed');
        const json = await res.json();

        const points: HistoryPoint[] = json.data || [];
        if (points.length < 2) {
          setData(null);
          setLoading(false);
          return;
        }

        // Volume trend: compare latest to earliest
        const volumeValues = points.filter((p: HistoryPoint) => p.volumeUsd !== null).map((p: HistoryPoint) => p.volumeUsd as number);
        let volumeTrend: number | null = null;
        if (volumeValues.length >= 2) {
          const first = volumeValues[0];
          const last = volumeValues[volumeValues.length - 1];
          if (first > 0) volumeTrend = ((last - first) / first) * 100;
        }

        // USDT Premium trend
        const premiumValues = points.filter((p: HistoryPoint) => p.usdtPremiumPct !== null).map((p: HistoryPoint) => p.usdtPremiumPct as number);
        let premiumTrend: number | null = null;
        if (premiumValues.length >= 2) {
          premiumTrend = premiumValues[premiumValues.length - 1] - premiumValues[0];
        }

        // USDC Premium trend
        const usdcValues = points.filter((p: HistoryPoint) => p.usdcPremiumPct !== null).map((p: HistoryPoint) => p.usdcPremiumPct as number);
        let usdcPremiumTrend: number | null = null;
        if (usdcValues.length >= 2) {
          usdcPremiumTrend = usdcValues[usdcValues.length - 1] - usdcValues[0];
        }

        setData({ points, volumeTrend, premiumTrend, usdcPremiumTrend });
      } catch {
        setData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchHistory();
  }, [iso2]);

  if (loading || !data || data.points.length < 2) return null;

  const volumeValues = data.points
    .filter((p) => p.volumeUsd !== null)
    .map((p) => p.volumeUsd as number);

  const premiumValues = data.points
    .filter((p) => p.usdtPremiumPct !== null)
    .map((p) => p.usdtPremiumPct as number);

  const usdcPremiumValues = data.points
    .filter((p) => p.usdcPremiumPct !== null)
    .map((p) => p.usdcPremiumPct as number);

  const hasVolume = volumeValues.length >= 2;
  const hasPremium = premiumValues.length >= 2;
  const hasUsdcPremium = usdcPremiumValues.length >= 2;

  if (!hasVolume && !hasPremium && !hasUsdcPremium) return null;

  return (
    <div
      className="rounded-xl px-4 py-3 md:px-5 md:py-4 mb-6 border border-[rgba(0,245,255,0.12)]"
      style={{ background: 'rgba(5, 5, 25, 0.8)' }}
    >
      <h2 className="text-[10px] font-mono tracking-[0.2em] text-[#7070AA] uppercase mb-3">
        7-Day Trends
      </h2>
      <div className={`grid grid-cols-1 ${hasVolume && (hasPremium || hasUsdcPremium) ? 'md:grid-cols-3' : hasPremium && hasUsdcPremium ? 'md:grid-cols-2' : ''} gap-4`}>
        {hasVolume && (
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono text-[#7070AA]">24h Volume</span>
              {data.volumeTrend !== null && <TrendArrow pct={data.volumeTrend} />}
            </div>
            <Sparkline values={volumeValues} color="#00F5FF" />
            <div className="flex justify-between mt-1">
              <span className="text-[8px] font-mono text-[#7070AA]">{data.points[0].date.slice(5)}</span>
              <span className="text-[8px] font-mono text-[#7070AA]">{data.points[data.points.length - 1].date.slice(5)}</span>
            </div>
          </div>
        )}
        {hasPremium && (
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono text-[#7070AA]">USDT Premium</span>
              {data.premiumTrend !== null && <TrendArrow pct={data.premiumTrend} />}
            </div>
            <Sparkline values={premiumValues} color="#FFB800" />
            <div className="flex justify-between mt-1">
              <span className="text-[8px] font-mono text-[#7070AA]">{data.points[0].date.slice(5)}</span>
              <span className="text-[8px] font-mono text-[#7070AA]">{data.points[data.points.length - 1].date.slice(5)}</span>
            </div>
          </div>
        )}
        {hasUsdcPremium && (
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono text-[#7070AA]">USDC Premium</span>
              {data.usdcPremiumTrend !== null && <TrendArrow pct={data.usdcPremiumTrend} />}
            </div>
            <Sparkline values={usdcPremiumValues} color="#627EEA" />
            <div className="flex justify-between mt-1">
              <span className="text-[8px] font-mono text-[#7070AA]">{data.points[0].date.slice(5)}</span>
              <span className="text-[8px] font-mono text-[#7070AA]">{data.points[data.points.length - 1].date.slice(5)}</span>
            </div>
          </div>
        )}
      </div>
      <p className="text-[8px] font-mono text-[#7070AA] mt-2">
        Based on {data.points.length} daily snapshots. Updates daily.
      </p>
    </div>
  );
}
