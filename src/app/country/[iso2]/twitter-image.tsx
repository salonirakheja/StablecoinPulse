import { ImageResponse } from 'next/og';
import { STABLECOIN_REGULATIONS } from '@/data/stablecoin-regulations';
import { PREMIUM_COUNTRIES } from '@/data/premium-countries';
import { COUNTRY_CENTROIDS } from '@/data/country-centroids';

export const runtime = 'edge';
export const alt = 'Stablecoin country data';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const STATUS_COLORS: Record<string, string> = {
  regulated: '#39FF14',
  partial: '#FFB800',
  restricted: '#FF6B6B',
  banned: '#FF0040',
  unclear: '#7070AA',
};

const STATUS_LABELS: Record<string, string> = {
  regulated: 'REGULATED',
  partial: 'PARTIALLY REGULATED',
  restricted: 'RESTRICTED',
  banned: 'BANNED',
  unclear: 'UNCLEAR',
};

export default async function Image({ params }: { params: Promise<{ iso2: string }> }) {
  const { iso2 } = await params;
  const code = iso2.toUpperCase();

  const regulation = STABLECOIN_REGULATIONS.find((r) => r.iso2 === code);
  const premium = PREMIUM_COUNTRIES.find((c) => c.iso2 === code);
  const centroid = COUNTRY_CENTROIDS.find((c) => c.iso2 === code);
  const name = regulation?.country || premium?.name || centroid?.name || code;
  const status = regulation?.status || 'unclear';
  const statusColor = STATUS_COLORS[status] || '#7070AA';
  const statusLabel = STATUS_LABELS[status] || 'UNCLEAR';

  const flagUrl = `https://flagcdn.com/w160/${code.toLowerCase()}.png`;

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
          padding: '50px 80px',
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

        {/* Glow orb behind flag */}
        <div
          style={{
            position: 'absolute',
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,245,255,0.15) 0%, transparent 70%)',
            top: '20%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Top branding */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 36,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#00F5FF',
              boxShadow: '0 0 12px #00F5FF',
            }}
          />
          <span style={{ fontSize: 14, letterSpacing: '0.3em', color: '#7070AA' }}>
            STABLECOIN PULSE
          </span>
        </div>

        {/* Flag */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={flagUrl}
          alt={name}
          width={96}
          height={67}
          style={{
            borderRadius: 10,
            border: '2px solid rgba(0,245,255,0.2)',
            boxShadow: '0 0 30px rgba(0,245,255,0.15)',
            marginBottom: 20,
          }}
        />

        {/* Country name */}
        <span
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: '#E0E0FF',
            textShadow: '0 0 40px rgba(0,245,255,0.3)',
            lineHeight: 1.1,
            marginBottom: 12,
            textAlign: 'center',
          }}
        >
          {name}
        </span>

        {/* Regulation badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 40,
            padding: '8px 20px',
            borderRadius: 8,
            border: `1px solid ${statusColor}40`,
            background: `${statusColor}10`,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: statusColor,
              boxShadow: `0 0 8px ${statusColor}`,
            }}
          />
          <span style={{ fontSize: 16, letterSpacing: '0.2em', color: statusColor, fontWeight: 700 }}>
            {statusLabel}
          </span>
        </div>

        {/* Data row */}
        <div
          style={{
            display: 'flex',
            gap: 20,
            alignItems: 'center',
          }}
        >
          {[
            { label: 'VOLUME', icon: true },
            { label: 'PREMIUM', icon: true },
            { label: 'ON-CHAIN', icon: true },
            { label: 'REGULATION', icon: true },
            { label: 'FX RATE', icon: true },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 18px',
                borderRadius: 8,
                border: '1px solid rgba(0,245,255,0.12)',
                background: 'rgba(0,245,255,0.04)',
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: '#00F5FF',
                }}
              />
              <span style={{ fontSize: 13, letterSpacing: '0.15em', color: '#C0C0E0' }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom URL */}
        <span
          style={{
            position: 'absolute',
            bottom: 30,
            fontSize: 13,
            letterSpacing: '0.15em',
            color: '#7070AA',
          }}
        >
          stablecoinpulse.app/country/{code}
        </span>
      </div>
    ),
    { ...size }
  );
}
