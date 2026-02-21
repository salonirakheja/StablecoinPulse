'use client';

import { Suspense, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { StablecoinFilter, ViewMode, VolumeApiResponse } from '@/lib/types';
import BackgroundGrid from '@/components/BackgroundGrid';
import LoadingScreen from '@/components/LoadingScreen';
import GlobeControls from '@/components/GlobeControls';
import VolumePanel from '@/components/VolumePanel';
import RegulationPanel from '@/components/RegulationPanel';
import VolumeTicker from '@/components/VolumeTicker';
import ShareButton from '@/components/ShareButton';
import ViewModeToggle from '@/components/ViewModeToggle';

// Dynamic import for GlobeMap to avoid SSR issues with mapbox-gl
const GlobeMap = dynamic(() => import('@/components/GlobeMap'), {
  ssr: false,
});

export default function Home() {
  return (
    <Suspense>
      <HomeContent />
    </Suspense>
  );
}

function HomeContent() {
  const searchParams = useSearchParams();
  const initialView = searchParams.get('view') === 'regulation' ? 'regulation' : 'volume';
  const [data, setData] = useState<VolumeApiResponse | null>(null);
  const [filter, setFilter] = useState<StablecoinFilter>('all');
  const [viewMode, setViewMode] = useState<ViewMode>(initialView);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);

  // Fetch initial data
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/volume?filter=${filter}`);
        const json = await res.json();
        // Only set data if we got a valid response with geojson
        if (json.geojson?.features) {
          setData(json);
        } else {
          console.error('API returned invalid data:', json.error || 'missing geojson');
        }
      } catch (err) {
        console.error('Failed to fetch volume data:', err);
      }
    }
    fetchData();
  }, [filter]);

  // Auto-refresh every 15 minutes
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/volume?filter=${filter}`);
        const json = await res.json();
        if (json.geojson?.features) {
          setData(json);
        }
      } catch { /* silent refresh fail */ }
    }, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, [filter]);

  // Close panel when switching view modes
  useEffect(() => {
    setPanelOpen(false);
  }, [viewMode]);

  const isLoading = !data || !mapLoaded;

  return (
    <main className="relative w-screen h-screen overflow-hidden">
      <LoadingScreen isLoading={!data} />
      <BackgroundGrid />

      {/* Globe container for screenshot capture */}
      <div id="globe-container" className="absolute inset-0 z-10">
        {data && (
          <GlobeMap
            initialData={data}
            filter={filter}
            viewMode={viewMode}
            onMapLoaded={() => setMapLoaded(true)}
          />
        )}
      </div>

      {/* UI overlays — only show after map loads */}
      {!isLoading && data && (
        <>
          {/* Top bar */}
          <header className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between px-3 py-3 md:px-6 md:py-4">
            <div className="flex items-center gap-3 md:gap-4">
              <div>
                <h1
                  className="text-sm md:text-base font-bold tracking-[0.25em] text-[#E0E0FF]"
                  style={{
                    textShadow: '0 0 20px rgba(0,245,255,0.4), 0 0 40px rgba(0,245,255,0.15)',
                  }}
                >
                  STABLECOIN PULSE
                </h1>
                <p className="text-[9px] tracking-[0.15em] text-[#7070AA] mt-0.5">
                  {viewMode === 'volume' ? 'GLOBAL VOLUME HEATMAP' : 'REGULATION MAP'}
                </p>
              </div>
              <ViewModeToggle viewMode={viewMode} onViewModeChange={setViewMode} />
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <Link
                href="/blog"
                className="px-3 py-2 rounded-xl text-xs font-mono tracking-wider backdrop-blur-md border border-[rgba(0,245,255,0.15)] text-[#7070AA] hover:text-[#00F5FF] hover:border-[rgba(0,245,255,0.3)] transition-all duration-200"
                style={{ background: 'rgba(5, 5, 25, 0.6)' }}
              >
                BLOG
              </Link>
              <Link
                href="/about"
                className="px-3 py-2 rounded-xl text-xs font-mono tracking-wider backdrop-blur-md border border-[rgba(0,245,255,0.15)] text-[#7070AA] hover:text-[#00F5FF] hover:border-[rgba(0,245,255,0.3)] transition-all duration-200"
                style={{ background: 'rgba(5, 5, 25, 0.6)' }}
              >
                ABOUT
              </Link>
              <ShareButton
                topCountries={data.topCountries}
                globalVolume={data.globalVolume}
              />
            </div>
          </header>

          {/* Controls — hide stablecoin filter in regulation mode */}
          <GlobeControls
            filter={filter}
            onFilterChange={setFilter}
            viewMode={viewMode}
          />

          {/* Panel — conditionally render volume or regulation panel */}
          {viewMode === 'volume' ? (
            <VolumePanel
              topCountries={data.topCountries}
              globalVolume={data.globalVolume}
              lastUpdated={data.lastUpdated}
              isOpen={panelOpen}
              onToggle={() => setPanelOpen(!panelOpen)}
              stablecoinStats={data.stablecoinStats}
            />
          ) : (
            <RegulationPanel
              isOpen={panelOpen}
              onToggle={() => setPanelOpen(!panelOpen)}
            />
          )}

          {/* Bottom ticker */}
          <VolumeTicker globalVolume={data.globalVolume} viewMode={viewMode} />
        </>
      )}
    </main>
  );
}
