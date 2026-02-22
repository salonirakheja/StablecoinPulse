'use client';

import { Suspense, useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
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
import BlogContent from '@/components/BlogContent';
import AboutContent from '@/components/AboutContent';

// Dynamic import for GlobeMap to avoid SSR issues with mapbox-gl
const GlobeMap = dynamic(() => import('@/components/GlobeMap'), {
  ssr: false,
});

type ActiveView = 'globe' | 'blog' | 'about';

function getInitialView(searchParams: URLSearchParams): { activeView: ActiveView; viewMode: ViewMode } {
  const path = typeof window !== 'undefined' ? window.location.pathname : '/';
  if (path === '/blog') return { activeView: 'blog', viewMode: 'volume' };
  if (path === '/about') return { activeView: 'about', viewMode: 'volume' };
  const viewMode = searchParams.get('view') === 'regulation' ? 'regulation' : 'volume';
  return { activeView: 'globe', viewMode };
}

export default function Home() {
  return (
    <Suspense>
      <HomeContent />
    </Suspense>
  );
}

function HomeContent() {
  const searchParams = useSearchParams();
  const initial = getInitialView(searchParams);
  const [data, setData] = useState<VolumeApiResponse | null>(null);
  const [filter, setFilter] = useState<StablecoinFilter>('all');
  const [viewMode, setViewMode] = useState<ViewMode>(initial.viewMode);
  const [activeView, setActiveView] = useState<ActiveView>(initial.activeView);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);

  const navigateTo = useCallback((view: ActiveView, mode?: ViewMode) => {
    setActiveView(view);
    if (mode) setViewMode(mode);

    let url = '/';
    if (view === 'blog') url = '/blog';
    else if (view === 'about') url = '/about';
    else if (mode === 'regulation' || (!mode && viewMode === 'regulation')) url = '/?view=regulation';

    window.history.pushState({ view, mode: mode || viewMode }, '', url);
  }, [viewMode]);

  // Handle browser back/forward
  useEffect(() => {
    function handlePopState(e: PopStateEvent) {
      if (e.state?.view) {
        setActiveView(e.state.view);
        if (e.state.mode) setViewMode(e.state.mode);
      } else {
        // Fallback: parse from URL
        const path = window.location.pathname;
        if (path === '/blog') {
          setActiveView('blog');
        } else if (path === '/about') {
          setActiveView('about');
        } else {
          setActiveView('globe');
          const params = new URLSearchParams(window.location.search);
          setViewMode(params.get('view') === 'regulation' ? 'regulation' : 'volume');
        }
      }
    }
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

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

  const handleViewModeChange = useCallback((mode: ViewMode) => {
    setViewMode(mode);
    if (activeView !== 'globe') {
      setActiveView('globe');
    }
    const url = mode === 'regulation' ? '/?view=regulation' : '/';
    window.history.pushState({ view: 'globe', mode }, '', url);
  }, [activeView]);

  const isLoading = !data || !mapLoaded;

  const subtitleText = activeView === 'blog'
    ? 'BLOG'
    : activeView === 'about'
      ? 'ABOUT'
      : viewMode === 'volume'
        ? 'GLOBAL VOLUME HEATMAP'
        : 'REGULATION MAP';

  const navButtonClass = (view: ActiveView) =>
    `px-3 py-1.5 max-md:px-2.5 rounded-lg text-[10px] md:text-xs font-mono tracking-wider backdrop-blur-md border transition-all duration-200 cursor-pointer ${
      activeView === view
        ? 'border-[rgba(0,245,255,0.4)] text-[#00F5FF]'
        : 'border-[rgba(0,245,255,0.15)] text-[#7070AA] hover:text-[#00F5FF] hover:border-[rgba(0,245,255,0.3)]'
    }`;

  return (
    <main className="relative w-screen h-screen overflow-hidden">
      <LoadingScreen isLoading={!data} />
      <BackgroundGrid />

      {/* Globe container — stays mounted, hidden when blog/about active */}
      <div
        id="globe-container"
        className="absolute inset-0 z-10"
        style={{ display: activeView === 'globe' ? undefined : 'none' }}
      >
        {data && (
          <GlobeMap
            initialData={data}
            filter={filter}
            viewMode={viewMode}
            onMapLoaded={() => setMapLoaded(true)}
          />
        )}
      </div>

      {/* Globe UI overlays — only show when globe is active and loaded */}
      {activeView === 'globe' && !isLoading && data && (
        <>
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

      {/* Top bar — always visible */}
      {(!isLoading && data || activeView !== 'globe') && (
        <header className="fixed top-0 left-0 right-0 z-20 px-3 py-2 md:px-6 md:py-4
          max-md:flex max-md:flex-col max-md:items-center max-md:gap-1.5
          md:flex md:flex-row md:items-center md:justify-between">
          {/* Desktop: left group (logo + toggle) */}
          <div className="md:flex md:items-center md:gap-4 max-md:text-center">
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
                {subtitleText}
              </p>
            </div>
            {/* Desktop-only: toggle next to title */}
            <div className="max-md:hidden">
              <ViewModeToggle viewMode={viewMode} onViewModeChange={handleViewModeChange} inactive={activeView !== 'globe'} />
            </div>
          </div>

          {/* Mobile: all 4 nav buttons in one row below the title */}
          <div className="flex items-center gap-1.5 md:gap-3">
            {/* Mobile-only: toggle inline with nav */}
            <div className="md:hidden">
              <ViewModeToggle viewMode={viewMode} onViewModeChange={handleViewModeChange} inactive={activeView !== 'globe'} />
            </div>
            <button
              onClick={() => navigateTo('blog')}
              className={navButtonClass('blog')}
              style={{ background: 'rgba(5, 5, 25, 0.6)' }}
            >
              BLOG
            </button>
            <button
              onClick={() => navigateTo('about')}
              className={navButtonClass('about')}
              style={{ background: 'rgba(5, 5, 25, 0.6)' }}
            >
              ABOUT
            </button>
            {activeView === 'globe' && data && (
              <div className="max-md:hidden">
                <ShareButton
                  topCountries={data.topCountries}
                  globalVolume={data.globalVolume}
                />
              </div>
            )}
          </div>

          {/* Mobile-only: 24H Rolling indicator strip */}
          {activeView === 'globe' && viewMode === 'volume' && (
            <div className="md:hidden flex items-center justify-center gap-1.5 w-full py-1">
              <div
                className="w-1.5 h-1.5 rounded-full bg-[#00F5FF] flex-shrink-0"
                style={{ boxShadow: '0 0 6px #00F5FF' }}
              />
              <span className="text-[10px] tracking-widest text-[#7070AA] uppercase font-mono">
                24H Rolling Volume
              </span>
            </div>
          )}
        </header>
      )}

      {/* Blog content */}
      {activeView === 'blog' && (
        <div className="absolute inset-0 z-10 overflow-y-auto pt-16 md:pt-20">
          <BlogContent />
        </div>
      )}

      {/* About content */}
      {activeView === 'about' && (
        <div className="absolute inset-0 z-10 overflow-y-auto pt-16 md:pt-20">
          <AboutContent onNavigateGlobe={() => navigateTo('globe', 'volume')} />
        </div>
      )}
    </main>
  );
}
