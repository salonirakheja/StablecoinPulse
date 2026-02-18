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

        {/* Glow orb */}
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

        {/* Globe */}
        <div
          style={{
            width: 200,
            height: 200,
            borderRadius: '50%',
            border: '2px solid rgba(0,245,255,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            background: 'radial-gradient(circle at 40% 40%, rgba(0,245,255,0.08) 0%, rgba(5,5,25,0.9) 70%)',
            boxShadow: '0 0 60px rgba(0,245,255,0.2), 0 0 120px rgba(0,245,255,0.1)',
            marginBottom: 28,
          }}
        >
          {[
            { x: 65, y: 55, s: 13, c: '#FF00FF' },
            { x: 120, y: 75, s: 9, c: '#00F5FF' },
            { x: 95, y: 110, s: 11, c: '#00F5FF' },
            { x: 55, y: 95, s: 7, c: '#4D4DFF' },
            { x: 140, y: 100, s: 6, c: '#4D4DFF' },
            { x: 105, y: 65, s: 15, c: '#FFFFFF' },
            { x: 80, y: 130, s: 7, c: '#00F5FF' },
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
                boxShadow: `0 0 ${dot.s * 2}px ${dot.c}40`,
              }}
            />
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{ fontSize: 44, fontWeight: 800, letterSpacing: '0.15em', color: '#E0E0FF', textShadow: '0 0 30px rgba(0,245,255,0.4)' }}>
            STABLECOIN PULSE
          </div>
          <div style={{ fontSize: 18, letterSpacing: '0.25em', color: '#7070AA' }}>
            GLOBAL VOLUME HEATMAP
          </div>
        </div>

        <div style={{ display: 'flex', gap: 32, marginTop: 36, alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#39FF14', boxShadow: '0 0 8px #39FF14' }} />
            <span style={{ fontSize: 13, color: '#39FF14', letterSpacing: '0.1em' }}>LIVE DATA</span>
          </div>
          <span style={{ fontSize: 13, color: '#7070AA' }}>500+ Exchanges</span>
          <span style={{ fontSize: 13, color: '#7070AA' }}>45+ Countries</span>
          <span style={{ fontSize: 13, color: '#7070AA' }}>6 Blockchains</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
