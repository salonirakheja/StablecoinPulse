'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { STABLECOIN_REGULATIONS, REGULATION_COLORS, REGULATION_LABELS } from '@/data/stablecoin-regulations';
import { COUNTRY_CENTROIDS } from '@/data/country-centroids';
import { PREMIUM_COUNTRIES } from '@/data/premium-countries';
import { getExchangesForCountry } from '@/data/exchange-access';
import BackgroundGrid from '@/components/BackgroundGrid';
import type { VolumeApiResponse } from '@/lib/types';
import type { PremiumApiResponse } from '@/app/api/premium/route';

interface CountrySnapshot {
  name: string;
  iso2: string;
  flag: string;
  regulation: typeof STABLECOIN_REGULATIONS[number] | null;
  premium: PremiumApiResponse['premiums'][number] | null;
  volumeUsd: number | null;
  exchangeCount: number | null;
  topExchange: string | null;
  exchangesAvailable: number;
  hasPremiumData: boolean;
}

function formatVolume(v: number): string {
  if (v >= 1e9) return `$${(v / 1e9).toFixed(1)}B`;
  if (v >= 1e6) return `$${(v / 1e6).toFixed(0)}M`;
  if (v >= 1e3) return `$${(v / 1e3).toFixed(0)}K`;
  return `$${v.toFixed(0)}`;
}

function formatPremium(pct: number | null | undefined): string {
  if (pct === null || pct === undefined) return '—';
  const sign = pct >= 0 ? '+' : '';
  return `${sign}${pct.toFixed(1)}%`;
}

function getPremiumColor(pct: number | null | undefined): string {
  if (pct === null || pct === undefined) return '#7070AA';
  if (pct <= 0) return '#A0A0B8';
  if (pct < 2) return '#00F5FF';
  if (pct < 5) return '#FFB800';
  return '#FF1493';
}

// All countries available for selection, sorted alphabetically
const ALL_COUNTRIES = COUNTRY_CENTROIDS
  .map((c) => ({ iso2: c.iso2, name: c.name }))
  .sort((a, b) => a.name.localeCompare(b.name));

export default function ComparePage() {
  const [countryA, setCountryA] = useState('NG');
  const [countryB, setCountryB] = useState('AR');
  const [volumeData, setVolumeData] = useState<VolumeApiResponse | null>(null);
  const [premiumData, setPremiumData] = useState<PremiumApiResponse | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch data once
  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      try {
        const [volRes, premRes] = await Promise.all([
          fetch('/api/volume').then((r) => r.json()),
          fetch('/api/premium').then((r) => r.json()),
        ]);
        if (volRes.geojson) setVolumeData(volRes);
        if (premRes.premiums) setPremiumData(premRes);
      } catch (e) {
        console.error('Failed to fetch comparison data:', e);
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  // Update URL when countries change
  useEffect(() => {
    const url = `/compare?a=${countryA}&b=${countryB}`;
    window.history.replaceState(null, '', url);
  }, [countryA, countryB]);

  // Read initial countries from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const a = params.get('a')?.toUpperCase();
    const b = params.get('b')?.toUpperCase();
    if (a && ALL_COUNTRIES.find((c) => c.iso2 === a)) setCountryA(a);
    if (b && ALL_COUNTRIES.find((c) => c.iso2 === b)) setCountryB(b);
  }, []);

  function buildSnapshot(iso2: string): CountrySnapshot {
    const centroid = COUNTRY_CENTROIDS.find((c) => c.iso2 === iso2);
    const name = centroid?.name || iso2;
    const regulation = STABLECOIN_REGULATIONS.find((r) => r.iso2 === iso2) || null;
    const premiumCountry = PREMIUM_COUNTRIES.find((c) => c.iso2 === iso2);

    // Volume from API
    let volumeUsd: number | null = null;
    let exchangeCount: number | null = null;
    let topExchange: string | null = null;

    if (volumeData) {
      const vol = volumeData.topCountries?.find((c) => c.iso2 === iso2);
      if (vol) {
        volumeUsd = vol.volumeUsd;
        exchangeCount = vol.exchangeCount;
        topExchange = vol.topExchange;
      } else if (volumeData.geojson?.features) {
        const feat = volumeData.geojson.features.find(
          (f) => f.properties && (f.properties as Record<string, unknown>).iso2 === iso2
        );
        if (feat?.properties) {
          const p = feat.properties as Record<string, unknown>;
          volumeUsd = p.volume_usd as number;
          exchangeCount = p.exchange_count as number;
          topExchange = p.top_exchange as string;
        }
      }
    }

    // Premium from API
    const premium = premiumData?.premiums?.find((p) => p.iso2 === iso2) || null;

    // Exchanges available
    const exchanges = getExchangesForCountry(name, iso2);

    return {
      name,
      iso2,
      flag: iso2.toLowerCase(),
      regulation,
      premium,
      volumeUsd,
      exchangeCount,
      topExchange,
      exchangesAvailable: exchanges.length,
      hasPremiumData: !!premiumCountry,
    };
  }

  const snapA = useMemo(() => buildSnapshot(countryA), [countryA, volumeData, premiumData]); // eslint-disable-line react-hooks/exhaustive-deps
  const snapB = useMemo(() => buildSnapshot(countryB), [countryB, volumeData, premiumData]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="min-h-screen bg-[#030308] text-[#E0E0FF] relative">
      <BackgroundGrid />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-6 md:px-8 md:py-10">
        {/* Back nav */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[11px] font-mono tracking-wider text-[#7070AA] hover:text-[#00F5FF] transition-colors mb-6"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          BACK TO GLOBE
        </Link>

        {/* Title */}
        <h1
          className="text-xl md:text-2xl font-bold tracking-tight mb-1"
          style={{ textShadow: '0 0 20px rgba(0,245,255,0.3)' }}
        >
          Compare Countries
        </h1>
        <p className="text-[11px] font-mono text-[#7070AA] tracking-wider mb-6">
          Side-by-side stablecoin data
        </p>

        {/* Country selectors */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <CountrySelector
            value={countryA}
            onChange={setCountryA}
            label="Country A"
            otherValue={countryB}
          />
          <CountrySelector
            value={countryB}
            onChange={setCountryB}
            label="Country B"
            otherValue={countryA}
          />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-3">
              <div
                className="w-10 h-10 rounded-full animate-pulse"
                style={{ background: 'radial-gradient(circle, rgba(0,245,255,0.3) 0%, transparent 70%)' }}
              />
              <p className="text-[10px] font-mono tracking-widest text-[#7070AA]">LOADING DATA...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Country headers */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <CountryHeader snap={snapA} />
              <CountryHeader snap={snapB} />
            </div>

            {/* Comparison rows */}
            <div className="space-y-3">
              <CompareRow
                label="24h Volume"
                valueA={snapA.volumeUsd !== null ? formatVolume(snapA.volumeUsd) : '—'}
                valueB={snapB.volumeUsd !== null ? formatVolume(snapB.volumeUsd) : '—'}
                highlightA={snapA.volumeUsd !== null && snapB.volumeUsd !== null && snapA.volumeUsd > snapB.volumeUsd}
                highlightB={snapA.volumeUsd !== null && snapB.volumeUsd !== null && snapB.volumeUsd > snapA.volumeUsd}
              />
              <CompareRow
                label="Regulation"
                valueA={snapA.regulation ? REGULATION_LABELS[snapA.regulation.status] : '—'}
                valueB={snapB.regulation ? REGULATION_LABELS[snapB.regulation.status] : '—'}
                colorA={snapA.regulation ? REGULATION_COLORS[snapA.regulation.status] : '#7070AA'}
                colorB={snapB.regulation ? REGULATION_COLORS[snapB.regulation.status] : '#7070AA'}
              />
              {(snapA.premium || snapB.premium) && (
                <>
                  <CompareRow
                    label="USDT Premium"
                    valueA={formatPremium(snapA.premium?.usdtPremiumPct)}
                    valueB={formatPremium(snapB.premium?.usdtPremiumPct)}
                    colorA={getPremiumColor(snapA.premium?.usdtPremiumPct)}
                    colorB={getPremiumColor(snapB.premium?.usdtPremiumPct)}
                  />
                  <CompareRow
                    label="USDC Premium"
                    valueA={formatPremium(snapA.premium?.usdcPremiumPct)}
                    valueB={formatPremium(snapB.premium?.usdcPremiumPct)}
                    colorA={getPremiumColor(snapA.premium?.usdcPremiumPct)}
                    colorB={getPremiumColor(snapB.premium?.usdcPremiumPct)}
                  />
                  <CompareRow
                    label="FX vs USD (12M)"
                    valueA={
                      snapA.premium?.depreciation12m !== null && snapA.premium?.depreciation12m !== undefined
                        ? `${snapA.premium.depreciation12m > 0 ? '↓' : '↑'} ${Math.abs(snapA.premium.depreciation12m).toFixed(1)}%`
                        : '—'
                    }
                    valueB={
                      snapB.premium?.depreciation12m !== null && snapB.premium?.depreciation12m !== undefined
                        ? `${snapB.premium.depreciation12m > 0 ? '↓' : '↑'} ${Math.abs(snapB.premium.depreciation12m).toFixed(1)}%`
                        : '—'
                    }
                  />
                </>
              )}
              <CompareRow
                label="Exchanges*"
                valueA={snapA.exchangeCount !== null ? String(snapA.exchangeCount) : '—'}
                valueB={snapB.exchangeCount !== null ? String(snapB.exchangeCount) : '—'}
                sublabelA={`${snapA.exchangesAvailable} available`}
                sublabelB={`${snapB.exchangesAvailable} available`}
              />
              <CompareRow
                label="Top Exchange"
                valueA={snapA.topExchange || '—'}
                valueB={snapB.topExchange || '—'}
              />
              {(snapA.regulation?.keyLaw || snapB.regulation?.keyLaw) && (
                <CompareRow
                  label="Key Law"
                  valueA={snapA.regulation?.keyLaw || '—'}
                  valueB={snapB.regulation?.keyLaw || '—'}
                  small
                />
              )}
            </div>

            {/* Regulation summaries */}
            {(snapA.regulation || snapB.regulation) && (
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div
                  className="rounded-xl px-4 py-3 border border-[rgba(0,245,255,0.12)]"
                  style={{ background: 'rgba(5, 5, 25, 0.8)' }}
                >
                  <div className="text-[9px] font-mono tracking-wider text-[#7070AA] uppercase mb-2">Regulation Summary</div>
                  <p className="text-[11px] leading-relaxed text-[#C0C0E0]">
                    {snapA.regulation?.summary || 'No regulation data available.'}
                  </p>
                </div>
                <div
                  className="rounded-xl px-4 py-3 border border-[rgba(0,245,255,0.12)]"
                  style={{ background: 'rgba(5, 5, 25, 0.8)' }}
                >
                  <div className="text-[9px] font-mono tracking-wider text-[#7070AA] uppercase mb-2">Regulation Summary</div>
                  <p className="text-[11px] leading-relaxed text-[#C0C0E0]">
                    {snapB.regulation?.summary || 'No regulation data available.'}
                  </p>
                </div>
              </div>
            )}

            {/* Links to individual country pages */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <Link
                href={`/country/${snapA.iso2}`}
                className="flex items-center justify-center gap-2 py-2.5 rounded-lg border border-[rgba(0,245,255,0.15)] text-[10px] font-mono tracking-wider text-[#7070AA] hover:text-[#00F5FF] hover:border-[rgba(0,245,255,0.4)] transition-colors"
                style={{ background: 'rgba(5, 5, 25, 0.6)' }}
              >
                VIEW {snapA.name.toUpperCase()} PAGE
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href={`/country/${snapB.iso2}`}
                className="flex items-center justify-center gap-2 py-2.5 rounded-lg border border-[rgba(0,245,255,0.15)] text-[10px] font-mono tracking-wider text-[#7070AA] hover:text-[#00F5FF] hover:border-[rgba(0,245,255,0.4)] transition-colors"
                style={{ background: 'rgba(5, 5, 25, 0.6)' }}
              >
                VIEW {snapB.name.toUpperCase()} PAGE
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <p className="text-[8px] font-mono text-[#7070AA]/50 mt-4">
              *Exchanges contributing to volume. &quot;Available&quot; = total exchanges accessible in the country.
            </p>

            {/* Footer */}
            <div className="text-[10px] font-mono text-[#7070AA] leading-relaxed mt-6 border-t border-[rgba(0,245,255,0.08)] pt-4">
              Data from CoinGecko, DefiLlama, and Binance P2P. Premium = P2P median price vs official FX rate. Not financial advice.
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function CountrySelector({
  value,
  onChange,
  label,
  otherValue,
}: {
  value: string;
  onChange: (iso2: string) => void;
  label: string;
  otherValue: string;
}) {
  return (
    <div>
      <label className="text-[9px] font-mono tracking-wider text-[#7070AA] uppercase block mb-1.5">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2.5 rounded-lg text-sm font-mono text-[#E0E0FF] border border-[rgba(0,245,255,0.2)] focus:border-[rgba(0,245,255,0.5)] outline-none transition-colors cursor-pointer appearance-none"
        style={{ background: 'rgba(5, 5, 25, 0.9)' }}
      >
        {ALL_COUNTRIES.map((c) => (
          <option key={c.iso2} value={c.iso2} disabled={c.iso2 === otherValue}>
            {c.name}
          </option>
        ))}
      </select>
    </div>
  );
}

function CountryHeader({ snap }: { snap: CountrySnapshot }) {
  return (
    <div className="flex items-center gap-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://flagcdn.com/w80/${snap.flag}.png`}
        srcSet={`https://flagcdn.com/w160/${snap.flag}.png 2x`}
        alt={snap.name}
        width={40}
        height={30}
        className="rounded object-cover shadow-lg"
      />
      <div>
        <h2 className="text-base md:text-lg font-bold tracking-tight">{snap.name}</h2>
        {snap.regulation && (
          <span
            className="text-[9px] font-mono tracking-wider px-1.5 py-0.5 rounded border"
            style={{
              color: REGULATION_COLORS[snap.regulation.status],
              borderColor: `${REGULATION_COLORS[snap.regulation.status]}40`,
              backgroundColor: `${REGULATION_COLORS[snap.regulation.status]}12`,
            }}
          >
            {REGULATION_LABELS[snap.regulation.status].toUpperCase()}
          </span>
        )}
      </div>
    </div>
  );
}

function CompareRow({
  label,
  valueA,
  valueB,
  colorA,
  colorB,
  highlightA,
  highlightB,
  sublabelA,
  sublabelB,
  small,
}: {
  label: string;
  valueA: string;
  valueB: string;
  colorA?: string;
  colorB?: string;
  highlightA?: boolean;
  highlightB?: boolean;
  sublabelA?: string;
  sublabelB?: string;
  small?: boolean;
}) {
  return (
    <div
      className="rounded-lg border border-[rgba(0,245,255,0.08)] overflow-hidden"
      style={{ background: 'rgba(5, 5, 25, 0.6)' }}
    >
      <div className="text-[9px] font-mono tracking-wider text-[#7070AA] uppercase px-4 pt-2.5 pb-1">
        {label}
      </div>
      <div className="grid grid-cols-2 divide-x divide-[rgba(0,245,255,0.08)]">
        <div className="px-4 pb-2.5">
          <span
            className={`${small ? 'text-[11px]' : 'text-base'} font-mono font-bold`}
            style={{ color: colorA || (highlightA ? '#00F5FF' : '#E0E0FF') }}
          >
            {valueA}
          </span>
          {sublabelA && (
            <span className="text-[9px] font-mono text-[#7070AA] ml-1.5">{sublabelA}</span>
          )}
        </div>
        <div className="px-4 pb-2.5">
          <span
            className={`${small ? 'text-[11px]' : 'text-base'} font-mono font-bold`}
            style={{ color: colorB || (highlightB ? '#00F5FF' : '#E0E0FF') }}
          >
            {valueB}
          </span>
          {sublabelB && (
            <span className="text-[9px] font-mono text-[#7070AA] ml-1.5">{sublabelB}</span>
          )}
        </div>
      </div>
    </div>
  );
}
