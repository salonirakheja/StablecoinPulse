import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Stablecoin Pulse — Global Volume Heatmap';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #030308 0%, #0a0a2e 40%, #030308 100%)',
          fontFamily: 'monospace',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Grid pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(0,245,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.03) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Glow orbs */}
        <div
          style={{
            position: 'absolute',
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,245,255,0.15) 0%, transparent 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,0,255,0.08) 0%, transparent 70%)',
            top: '30%',
            left: '30%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Globe circle representation */}
        <div
          style={{
            width: 220,
            height: 220,
            borderRadius: '50%',
            border: '2px solid rgba(0,245,255,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            background: 'radial-gradient(circle at 40% 40%, rgba(0,245,255,0.08) 0%, rgba(5,5,25,0.9) 70%)',
            boxShadow: '0 0 60px rgba(0,245,255,0.2), 0 0 120px rgba(0,245,255,0.1), inset 0 0 40px rgba(0,245,255,0.05)',
            marginBottom: 32,
          }}
        >
          {/* Dot cluster representing data points */}
          {[
            { x: 70, y: 60, s: 14, c: '#FF00FF' },
            { x: 130, y: 80, s: 10, c: '#00F5FF' },
            { x: 100, y: 120, s: 12, c: '#00F5FF' },
            { x: 60, y: 100, s: 8, c: '#4D4DFF' },
            { x: 150, y: 110, s: 6, c: '#4D4DFF' },
            { x: 110, y: 70, s: 16, c: '#FFFFFF' },
            { x: 85, y: 140, s: 7, c: '#00F5FF' },
            { x: 140, y: 140, s: 9, c: '#FF00FF' },
          ].map((dot, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: dot.x - dot.s / 2,
                top: dot.y - dot.s / 2,
                width: dot.s,
                height: dot.s,
                borderRadius: '50%',
                background: dot.c,
                boxShadow: `0 0 ${dot.s * 2}px ${dot.c}40, 0 0 ${dot.s * 4}px ${dot.c}20`,
              }}
            />
          ))}
        </div>

        {/* Title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <div
            style={{
              fontSize: 48,
              fontWeight: 800,
              letterSpacing: '0.15em',
              color: '#E0E0FF',
              textShadow: '0 0 30px rgba(0,245,255,0.4)',
            }}
          >
            STABLECOIN PULSE
          </div>
          <div
            style={{
              fontSize: 20,
              letterSpacing: '0.25em',
              color: '#7070AA',
            }}
          >
            GLOBAL VOLUME HEATMAP
          </div>
        </div>

        {/* Bottom stats row */}
        <div
          style={{
            display: 'flex',
            gap: 40,
            marginTop: 40,
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#39FF14',
                boxShadow: '0 0 8px #39FF14',
              }}
            />
            <span style={{ fontSize: 14, color: '#39FF14', letterSpacing: '0.1em' }}>LIVE DATA</span>
          </div>
          <span style={{ fontSize: 14, color: '#7070AA' }}>500+ Exchanges</span>
          <span style={{ fontSize: 14, color: '#7070AA' }}>45+ Countries</span>
          <span style={{ fontSize: 14, color: '#7070AA' }}>6 Blockchains</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
