'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { MAP_CONFIG, FOG_CONFIG } from '@/lib/constants';
import { VolumeApiResponse, StablecoinFilter, ViewMode } from '@/lib/types';
import { getCountryWeights } from '@/data/stablecoin-weights';
import {
  STABLECOIN_REGULATIONS,
  REGULATION_COLORS,
  REGULATION_LABELS,
  getRegulationByIso2,
} from '@/data/stablecoin-regulations';

interface GlobeMapProps {
  initialData: VolumeApiResponse;
  filter: StablecoinFilter;
  viewMode: ViewMode;
  onMapLoaded?: () => void;
}

function formatVolumeDetail(usd: number): string {
  if (usd >= 1e12) return `$${(usd / 1e12).toFixed(2)}T`;
  if (usd >= 1e9) return `$${(usd / 1e9).toFixed(2)}B`;
  if (usd >= 1e6) return `$${(usd / 1e6).toFixed(2)}M`;
  if (usd >= 1e3) return `$${(usd / 1e3).toFixed(1)}K`;
  return `$${usd.toFixed(0)}`;
}

// Volume layer IDs to toggle visibility
const VOLUME_LAYERS = [
  'volume-heatmap',
  'connections-glow',
  'connections-core',
  'volume-glow-outer',
  'volume-glow-mid',
  'volume-core',
];

const REGULATION_LAYERS = [
  'regulation-fills',
  'regulation-outlines',
];

type SelectedCountryVolume = {
  mode: 'volume';
  country: string;
  iso2: string;
  volumeUsd: number;
  volumeNormalized: number;
  exchangeCount: number;
  topExchange: string;
  hasData: boolean;
  x: number;
  y: number;
};

type SelectedCountryRegulation = {
  mode: 'regulation';
  country: string;
  iso2: string;
  status: string;
  statusColor: string;
  statusLabel: string;
  summary: string;
  keyLaw?: string;
  stablecoinsAllowed?: string[];
  notes?: string;
  hasData: boolean;
  x: number;
  y: number;
};

type SelectedCountryData = SelectedCountryVolume | SelectedCountryRegulation;

export default function GlobeMap({ initialData, filter, viewMode, onMapLoaded }: GlobeMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const dataRef = useRef(initialData);
  dataRef.current = initialData;
  const filterRef = useRef(filter);
  filterRef.current = filter;
  const viewModeRef = useRef(viewMode);
  viewModeRef.current = viewMode;
  const [selectedCountry, setSelectedCountry] = useState<SelectedCountryData | null>(null);

  // Recompute geojson when filter changes (per-country weighting)
  const getFilteredGeojson = useCallback((data: VolumeApiResponse, selectedFilter: StablecoinFilter): GeoJSON.FeatureCollection => {
    if (selectedFilter === 'all') return data.geojson;

    // Reweight each country using its specific stablecoin shares
    const reweighted = data.geojson.features.map(f => {
      const country = f.properties?.country as string;
      const weights = getCountryWeights(country);
      const allWeight = weights['all'];
      const coinWeight = weights[selectedFilter];
      const ratio = allWeight > 0 ? coinWeight / allWeight : 0;
      return {
        ...f,
        properties: {
          ...f.properties,
          volume_usd: ((f.properties?.volume_usd as number) || 0) * ratio,
        },
      };
    }) as GeoJSON.Feature[];

    reweighted.sort((a, b) =>
      ((b.properties?.volume_usd as number) || 0) - ((a.properties?.volume_usd as number) || 0)
    );
    const maxVol = (reweighted[0]?.properties?.volume_usd as number) || 1;
    for (const f of reweighted) {
      if (f.properties) {
        f.properties.volume_normalized = (f.properties.volume_usd as number) / maxVol;
      }
    }

    return { ...data.geojson, features: reweighted };
  }, []);

  // Clear selected country when view mode changes
  useEffect(() => {
    setSelectedCountry(null);
  }, [viewMode]);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    let map: mapboxgl.Map;
    let animationId: number;
    let userInteracting = false;

    async function initMap() {
      const mapboxgl = (await import('mapbox-gl')).default;
      // @ts-expect-error - CSS import for side effects
      await import('mapbox-gl/dist/mapbox-gl.css');

      if (!process.env.NEXT_PUBLIC_MAPBOX_TOKEN) {
        console.error('NEXT_PUBLIC_MAPBOX_TOKEN is not set');
        return;
      }
      mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

      map = new mapboxgl.Map({
        container: mapContainerRef.current!,
        style: MAP_CONFIG.style,
        projection: 'globe',
        center: MAP_CONFIG.center,
        zoom: MAP_CONFIG.zoom,
        minZoom: MAP_CONFIG.minZoom,
        maxZoom: MAP_CONFIG.maxZoom,
        attributionControl: false,
        preserveDrawingBuffer: true,
        antialias: true,
      });

      mapRef.current = map;

      map.on('style.load', () => {
        // Electric atmosphere
        map.setFog(FOG_CONFIG as mapboxgl.FogSpecification);

        const geojson = getFilteredGeojson(initialData, filter);

        // Main data source
        map.addSource('country-volumes', {
          type: 'geojson',
          data: geojson,
        });

        // Connection lines between top 5
        const top5 = geojson.features.slice(0, 5);
        const connectionFeatures: GeoJSON.Feature[] = [];
        for (let i = 0; i < top5.length; i++) {
          for (let j = i + 1; j < top5.length; j++) {
            const coords1 = (top5[i].geometry as GeoJSON.Point).coordinates;
            const coords2 = (top5[j].geometry as GeoJSON.Point).coordinates;
            connectionFeatures.push({
              type: 'Feature',
              geometry: {
                type: 'LineString',
                coordinates: [coords1, coords2],
              },
              properties: {
                volume: Math.min(
                  top5[i].properties?.volume_normalized || 0,
                  top5[j].properties?.volume_normalized || 0
                ),
              },
            });
          }
        }
        map.addSource('connection-lines', {
          type: 'geojson',
          data: { type: 'FeatureCollection', features: connectionFeatures },
        });

        // ===== LAYER STACK (bottom to top) =====

        // Layer 0: Invisible interactive country fill (for clicking any country)
        map.addSource('country-fills', {
          type: 'vector',
          url: 'mapbox://mapbox.country-boundaries-v1',
        });
        map.addLayer({
          id: 'country-fills',
          type: 'fill',
          source: 'country-fills',
          'source-layer': 'country_boundaries',
          paint: {
            'fill-color': 'rgba(0,0,0,0)',
            'fill-outline-color': 'rgba(0,0,0,0)',
          },
        });
        // Subtle highlight on hover
        map.addLayer({
          id: 'country-fills-hover',
          type: 'fill',
          source: 'country-fills',
          'source-layer': 'country_boundaries',
          paint: {
            'fill-color': 'rgba(0, 245, 255, 0.06)',
            'fill-outline-color': 'rgba(0, 245, 255, 0.15)',
          },
          filter: ['==', 'iso_3166_1', ''],
        });

        // ===== REGULATION LAYERS (initially hidden) =====

        // Build a match expression for regulation fill colors
        // ['match', ['get', 'iso_3166_1'], 'DE', 'rgba(57,255,20,0.25)', 'CN', 'rgba(255,20,147,0.25)', ...]
        const fillColorMatch: (string | string[])[] = ['match', ['get', 'iso_3166_1']];
        const outlineColorMatch: (string | string[])[] = ['match', ['get', 'iso_3166_1']];

        // Convert hex to rgba string
        function hexToRgba(hex: string, alpha: number): string {
          const r = parseInt(hex.slice(1, 3), 16);
          const g = parseInt(hex.slice(3, 5), 16);
          const b = parseInt(hex.slice(5, 7), 16);
          return `rgba(${r},${g},${b},${alpha})`;
        }

        for (const reg of STABLECOIN_REGULATIONS) {
          const baseColor = REGULATION_COLORS[reg.status];
          fillColorMatch.push(reg.iso2);
          outlineColorMatch.push(reg.iso2);

          // Fill: low opacity for subtle effect
          const fillOpacity = reg.status === 'regulated' ? 0.20
            : reg.status === 'partial' ? 0.18
            : reg.status === 'restricted' ? 0.22
            : 0.10;
          fillColorMatch.push(hexToRgba(baseColor, fillOpacity));

          // Outline: higher opacity for glow
          outlineColorMatch.push(hexToRgba(baseColor, 0.56));
        }
        // Default for untracked countries: transparent
        fillColorMatch.push('rgba(0,0,0,0)');
        outlineColorMatch.push('rgba(0,0,0,0)');

        map.addLayer({
          id: 'regulation-fills',
          type: 'fill',
          source: 'country-fills',
          'source-layer': 'country_boundaries',
          paint: {
            'fill-color': fillColorMatch as unknown as mapboxgl.ExpressionSpecification,
            'fill-outline-color': 'rgba(0,0,0,0)',
          },
          layout: {
            visibility: 'none',
          },
        });

        map.addLayer({
          id: 'regulation-outlines',
          type: 'line',
          source: 'country-fills',
          'source-layer': 'country_boundaries',
          paint: {
            'line-color': outlineColorMatch as unknown as mapboxgl.ExpressionSpecification,
            'line-width': [
              'interpolate', ['linear'], ['zoom'],
              1, 0.5,
              4, 1.5,
            ],
            'line-opacity': 0.6,
          },
          layout: {
            visibility: 'none',
          },
        });

        // ===== VOLUME LAYERS =====

        // Layer 1: Heatmap
        map.addLayer({
          id: 'volume-heatmap',
          type: 'heatmap',
          source: 'country-volumes',
          maxzoom: 5,
          paint: {
            'heatmap-weight': [
              'interpolate', ['linear'],
              ['get', 'volume_normalized'],
              0, 0,
              1, 1,
            ],
            'heatmap-intensity': [
              'interpolate', ['linear'], ['zoom'],
              1, 0.6,
              5, 1.2,
            ],
            'heatmap-radius': [
              'interpolate', ['linear'], ['zoom'],
              1, 40,
              5, 80,
            ],
            'heatmap-color': [
              'interpolate', ['linear'], ['heatmap-density'],
              0, 'rgba(0, 0, 0, 0)',
              0.1, 'rgba(10, 5, 40, 0.3)',
              0.3, 'rgba(77, 0, 160, 0.5)',
              0.5, 'rgba(0, 100, 255, 0.6)',
              0.7, 'rgba(0, 200, 255, 0.7)',
              0.9, 'rgba(0, 245, 255, 0.8)',
              1.0, 'rgba(255, 255, 255, 0.9)',
            ],
            'heatmap-opacity': [
              'interpolate', ['linear'], ['zoom'],
              1, 0.7,
              5, 0.3,
            ],
          },
        });

        // Connection lines glow
        map.addLayer({
          id: 'connections-glow',
          type: 'line',
          source: 'connection-lines',
          paint: {
            'line-color': '#00F5FF',
            'line-opacity': 0.12,
            'line-width': 4,
            'line-blur': 4,
          },
        });

        // Connection lines core
        map.addLayer({
          id: 'connections-core',
          type: 'line',
          source: 'connection-lines',
          paint: {
            'line-color': '#00F5FF',
            'line-opacity': 0.3,
            'line-width': 1,
            'line-blur': 0,
            'line-dasharray': [2, 4],
          },
        });

        // Layer 2: Outer glow circles
        map.addLayer({
          id: 'volume-glow-outer',
          type: 'circle',
          source: 'country-volumes',
          paint: {
            'circle-radius': [
              'interpolate', ['linear'],
              ['get', 'volume_normalized'],
              0, 8,
              0.3, 20,
              0.7, 40,
              1, 60,
            ],
            'circle-color': [
              'interpolate', ['linear'],
              ['get', 'volume_normalized'],
              0, '#4D4DFF',
              0.5, '#00F5FF',
              1, '#FF00FF',
            ],
            'circle-blur': 3,
            'circle-opacity': 0.15,
          },
        });

        // Layer 3: Mid glow circles
        map.addLayer({
          id: 'volume-glow-mid',
          type: 'circle',
          source: 'country-volumes',
          paint: {
            'circle-radius': [
              'interpolate', ['linear'],
              ['get', 'volume_normalized'],
              0, 4,
              0.3, 10,
              0.7, 22,
              1, 35,
            ],
            'circle-color': [
              'interpolate', ['linear'],
              ['get', 'volume_normalized'],
              0, '#4D4DFF',
              0.5, '#00F5FF',
              1, '#FF00FF',
            ],
            'circle-blur': 1.5,
            'circle-opacity': 0.35,
          },
        });

        // Layer 4: Core circles (sharp, bright)
        map.addLayer({
          id: 'volume-core',
          type: 'circle',
          source: 'country-volumes',
          paint: {
            'circle-radius': [
              'interpolate', ['linear'],
              ['get', 'volume_normalized'],
              0, 2,
              0.3, 5,
              0.7, 10,
              1, 18,
            ],
            'circle-color': [
              'interpolate', ['linear'],
              ['get', 'volume_normalized'],
              0, '#8080FF',
              0.5, '#00F5FF',
              1, '#FFFFFF',
            ],
            'circle-blur': 0,
            'circle-opacity': 0.9,
            'circle-stroke-width': 1,
            'circle-stroke-color': [
              'interpolate', ['linear'],
              ['get', 'volume_normalized'],
              0, 'rgba(77, 77, 255, 0.3)',
              1, 'rgba(0, 245, 255, 0.6)',
            ],
          },
        });


        // ===== INTERACTIONS =====

        // Helper: look up volume data for a country ISO2 code
        function findVolumeData(iso2: string) {
          const geojson = getFilteredGeojson(dataRef.current, filterRef.current);
          const feature = geojson.features.find(
            f => f.properties?.iso2 === iso2
          );
          return feature?.properties || null;
        }

        // Hover on dots
        map.on('mouseenter', 'volume-core', () => {
          map.getCanvas().style.cursor = 'pointer';
        });
        map.on('mouseleave', 'volume-core', () => {
          map.getCanvas().style.cursor = '';
          setHoveredCountry(null);
        });
        map.on('mousemove', 'volume-core', (e) => {
          if (e.features && e.features[0]) {
            const props = e.features[0].properties;
            setHoveredCountry(props?.country || null);
          }
        });

        // Hover on country fills (highlight + label)
        map.on('mouseenter', 'country-fills', () => {
          map.getCanvas().style.cursor = 'pointer';
        });
        map.on('mouseleave', 'country-fills', () => {
          map.getCanvas().style.cursor = '';
          setHoveredCountry(null);
          map.setFilter('country-fills-hover', ['==', 'iso_3166_1', '']);
        });
        map.on('mousemove', 'country-fills', (e) => {
          if (e.features && e.features[0]) {
            const props = e.features[0].properties;
            const name = props?.name_en || props?.name || '';
            const iso = props?.iso_3166_1 || '';
            setHoveredCountry(name as string);
            map.setFilter('country-fills-hover', ['==', 'iso_3166_1', iso]);
          }
        });

        // Click on volume dots (has data) — only in volume mode
        map.on('click', 'volume-core', (e) => {
          if (viewModeRef.current !== 'volume') return;
          e.preventDefault();
          if (e.features && e.features[0]) {
            const props = e.features[0].properties;
            if (!props) return;
            setSelectedCountry({
              mode: 'volume',
              country: props.country as string,
              iso2: props.iso2 as string,
              volumeUsd: props.volume_usd as number,
              volumeNormalized: props.volume_normalized as number,
              exchangeCount: props.exchange_count as number,
              topExchange: props.top_exchange as string,
              hasData: true,
              x: e.point.x,
              y: e.point.y,
            });
          }
        });

        // Click on any country fill (may or may not have data)
        map.on('click', 'country-fills', (e) => {
          if (e.defaultPrevented) return;
          if (e.features && e.features[0]) {
            const props = e.features[0].properties;
            if (!props) return;
            const iso2 = (props.iso_3166_1 as string) || '';
            const countryName = (props.name_en as string) || (props.name as string) || 'Unknown';

            if (viewModeRef.current === 'regulation') {
              // Show regulation card
              const reg = getRegulationByIso2(iso2);
              if (reg) {
                setSelectedCountry({
                  mode: 'regulation',
                  country: reg.country,
                  iso2: reg.iso2,
                  status: reg.status,
                  statusColor: REGULATION_COLORS[reg.status],
                  statusLabel: REGULATION_LABELS[reg.status],
                  summary: reg.summary,
                  keyLaw: reg.keyLaw,
                  stablecoinsAllowed: reg.stablecoinsAllowed,
                  notes: reg.notes,
                  hasData: true,
                  x: e.point.x,
                  y: e.point.y,
                });
              } else {
                setSelectedCountry({
                  mode: 'regulation',
                  country: countryName,
                  iso2,
                  status: 'unclear',
                  statusColor: '#7070AA',
                  statusLabel: 'Not Tracked',
                  summary: '',
                  hasData: false,
                  x: e.point.x,
                  y: e.point.y,
                });
              }
            } else {
              // Volume mode: show volume card
              const volumeData = findVolumeData(iso2);
              if (volumeData) {
                setSelectedCountry({
                  mode: 'volume',
                  country: volumeData.country as string,
                  iso2: volumeData.iso2 as string,
                  volumeUsd: volumeData.volume_usd as number,
                  volumeNormalized: volumeData.volume_normalized as number,
                  exchangeCount: volumeData.exchange_count as number,
                  topExchange: volumeData.top_exchange as string,
                  hasData: true,
                  x: e.point.x,
                  y: e.point.y,
                });
              } else {
                setSelectedCountry({
                  mode: 'volume',
                  country: countryName,
                  iso2,
                  volumeUsd: 0,
                  volumeNormalized: 0,
                  exchangeCount: 0,
                  topExchange: '',
                  hasData: false,
                  x: e.point.x,
                  y: e.point.y,
                });
              }
            }
          }
        });

        // Click on empty space (ocean/space) to dismiss
        map.on('click', (e) => {
          const countryFeatures = map.queryRenderedFeatures(e.point, { layers: ['country-fills'] });
          const dotFeatures = map.queryRenderedFeatures(e.point, { layers: ['volume-core'] });
          if (!countryFeatures.length && !dotFeatures.length) {
            setSelectedCountry(null);
          }
        });

        // Apply initial viewMode visibility (useEffect may have fired before map was ready)
        const isRegulation = viewModeRef.current === 'regulation';
        if (isRegulation) {
          for (const layerId of VOLUME_LAYERS) {
            if (map.getLayer(layerId)) {
              map.setLayoutProperty(layerId, 'visibility', 'none');
            }
          }
          for (const layerId of REGULATION_LAYERS) {
            if (map.getLayer(layerId)) {
              map.setLayoutProperty(layerId, 'visibility', 'visible');
            }
          }
        }

        onMapLoaded?.();
      });

      // Auto-rotation
      function spinGlobe() {
        if (!userInteracting && map) {
          const center = map.getCenter();
          center.lng += MAP_CONFIG.rotationSpeed;
          map.easeTo({ center, duration: 0, easing: (t: number) => t });
        }
        animationId = requestAnimationFrame(spinGlobe);
      }

      map.on('mousedown', () => { userInteracting = true; });
      map.on('mouseup', () => { userInteracting = false; });
      map.on('touchstart', () => { userInteracting = true; });
      map.on('touchend', () => {
        setTimeout(() => { userInteracting = false; }, 2000);
      });
      map.on('dragstart', () => { userInteracting = true; });
      map.on('dragend', () => {
        setTimeout(() => { userInteracting = false; }, 3000);
      });

      map.on('load', () => {
        spinGlobe();
      });
    }

    initMap();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update data when filter changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.isStyleLoaded()) return;

    const geojson = getFilteredGeojson(initialData, filter);
    const source = map.getSource('country-volumes') as mapboxgl.GeoJSONSource;
    if (source) {
      source.setData(geojson);
    }
  }, [filter, initialData, getFilteredGeojson]);

  // Toggle layer visibility when viewMode changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.isStyleLoaded()) return;

    const isRegulation = viewMode === 'regulation';

    // Toggle volume layers
    for (const layerId of VOLUME_LAYERS) {
      if (map.getLayer(layerId)) {
        map.setLayoutProperty(layerId, 'visibility', isRegulation ? 'none' : 'visible');
      }
    }

    // Toggle regulation layers
    for (const layerId of REGULATION_LAYERS) {
      if (map.getLayer(layerId)) {
        map.setLayoutProperty(layerId, 'visibility', isRegulation ? 'visible' : 'none');
      }
    }
  }, [viewMode]);

  // Render the appropriate detail card based on mode
  function renderDetailCard() {
    if (!selectedCountry) return null;

    if (selectedCountry.mode === 'regulation') {
      return renderRegulationCard(selectedCountry);
    }
    return renderVolumeCard(selectedCountry);
  }

  function renderRegulationCard(data: SelectedCountryRegulation) {
    return (
      <div
        className="w-56 md:w-64 p-3 md:p-4 rounded-xl backdrop-blur-xl
          border border-[rgba(0,245,255,0.25)]
          shadow-[0_0_30px_rgba(0,245,255,0.15),0_0_60px_rgba(0,245,255,0.05)]"
        style={{ background: 'rgba(5, 5, 25, 0.92)' }}
      >
        {/* Close button */}
        <button
          onClick={() => setSelectedCountry(null)}
          className="absolute top-1.5 right-1.5 w-10 h-10 flex items-center justify-center
            rounded-full text-[#7070AA] hover:text-[#00F5FF] hover:bg-[rgba(0,245,255,0.1)]
            transition-colors text-sm"
        >
          ✕
        </button>

        {/* Country header */}
        <div className="flex items-center gap-2 mb-3">
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{
              background: data.statusColor,
              boxShadow: `0 0 8px ${data.statusColor}80`,
            }}
          />
          <h3
            className="text-sm font-bold text-[#E0E0FF] tracking-wide"
            style={{ textShadow: '0 0 10px rgba(0,245,255,0.3)' }}
          >
            {data.country}
          </h3>
        </div>

        {data.hasData ? (
          <>
            {/* Status badge */}
            <div className="mb-3">
              <span
                className="inline-block px-2 py-1 rounded text-[10px] font-mono tracking-wider uppercase"
                style={{
                  color: data.statusColor,
                  backgroundColor: `${data.statusColor}18`,
                  border: `1px solid ${data.statusColor}40`,
                }}
              >
                {data.statusLabel}
              </span>
            </div>

            {/* Summary */}
            <p className="text-[11px] text-[#E0E0FF]/80 leading-relaxed mb-3">
              {data.summary}
            </p>

            {/* Key law */}
            {data.keyLaw && (
              <div className="mb-2 p-2 rounded-lg bg-[rgba(0,245,255,0.04)] border border-[rgba(0,245,255,0.08)]">
                <p className="text-[8px] tracking-widest text-[#7070AA] uppercase">Key Legislation</p>
                <p className="text-[11px] font-mono text-[#E0E0FF] mt-0.5">{data.keyLaw}</p>
              </div>
            )}

            {/* Stablecoins allowed */}
            {data.stablecoinsAllowed && data.stablecoinsAllowed.length > 0 && (
              <div className="mb-2">
                <p className="text-[8px] tracking-widest text-[#7070AA] uppercase mb-1">Available Stablecoins</p>
                <div className="flex flex-wrap gap-1">
                  {data.stablecoinsAllowed.map(coin => (
                    <span
                      key={coin}
                      className="px-1.5 py-0.5 rounded text-[9px] font-mono text-[#00F5FF]
                        bg-[rgba(0,245,255,0.08)] border border-[rgba(0,245,255,0.15)]"
                    >
                      {coin}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Notes */}
            {data.notes && (
              <p className="text-[9px] text-[#7070AA] leading-relaxed italic mt-2">
                {data.notes}
              </p>
            )}
          </>
        ) : (
          <div className="text-center py-2">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full mb-2"
              style={{ background: 'rgba(112, 112, 170, 0.1)', border: '1px solid rgba(112,112,170,0.2)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7070AA" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <p className="text-xs text-[#7070AA] mb-1">No regulation data</p>
            <p className="text-[9px] text-[#7070AA]/60 leading-relaxed">
              This country is not yet tracked in our regulation database.
            </p>
          </div>
        )}
      </div>
    );
  }

  function renderVolumeCard(data: SelectedCountryVolume) {
    return (
      <div
        className="w-56 md:w-60 p-3 md:p-4 rounded-xl backdrop-blur-xl
          border border-[rgba(0,245,255,0.25)]
          shadow-[0_0_30px_rgba(0,245,255,0.15),0_0_60px_rgba(0,245,255,0.05)]"
        style={{ background: 'rgba(5, 5, 25, 0.92)' }}
      >
        {/* Close button */}
        <button
          onClick={() => setSelectedCountry(null)}
          className="absolute top-1.5 right-1.5 w-10 h-10 flex items-center justify-center
            rounded-full text-[#7070AA] hover:text-[#00F5FF] hover:bg-[rgba(0,245,255,0.1)]
            transition-colors text-sm"
        >
          ✕
        </button>

        {/* Country header */}
        <div className="flex items-center gap-2 mb-3">
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{
              background: !data.hasData ? '#7070AA'
                : data.volumeNormalized > 0.7 ? '#FF00FF'
                : data.volumeNormalized > 0.3 ? '#00F5FF' : '#4D4DFF',
              boxShadow: !data.hasData ? '0 0 8px rgba(112,112,170,0.4)'
                : `0 0 8px ${data.volumeNormalized > 0.7 ? 'rgba(255,0,255,0.6)'
                : 'rgba(0,245,255,0.6)'}`,
            }}
          />
          <h3
            className="text-sm font-bold text-[#E0E0FF] tracking-wide"
            style={{ textShadow: '0 0 10px rgba(0,245,255,0.3)' }}
          >
            {data.country}
          </h3>
        </div>

        {data.hasData ? (
          <>
            {/* Volume */}
            <div className="mb-3">
              <p className="text-[9px] tracking-[0.15em] text-[#7070AA] uppercase mb-0.5">
                24H Volume
              </p>
              <p
                className="text-lg font-mono font-bold text-[#00F5FF]"
                style={{ textShadow: '0 0 10px rgba(0,245,255,0.5)' }}
              >
                {formatVolumeDetail(data.volumeUsd)}
              </p>
              {/* Volume bar */}
              <div className="w-full h-1.5 rounded-full bg-[rgba(0,245,255,0.08)] mt-1.5 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.max(data.volumeNormalized * 100, 3)}%`,
                    background: 'linear-gradient(90deg, #4D4DFF, #00F5FF, #FF00FF)',
                    boxShadow: '0 0 6px rgba(0,245,255,0.4)',
                  }}
                />
              </div>
              <p className="text-[9px] text-[#7070AA] mt-1">
                {(data.volumeNormalized * 100).toFixed(1)}% of top country
              </p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 rounded-lg bg-[rgba(0,245,255,0.04)] border border-[rgba(0,245,255,0.08)]">
                <p className="text-[8px] tracking-widest text-[#7070AA] uppercase">Exchanges</p>
                <p className="text-sm font-mono text-[#E0E0FF] mt-0.5">{data.exchangeCount}</p>
              </div>
              <div className="p-2 rounded-lg bg-[rgba(0,245,255,0.04)] border border-[rgba(0,245,255,0.08)]">
                <p className="text-[8px] tracking-widest text-[#7070AA] uppercase">Top Exchange</p>
                <p className="text-sm font-mono text-[#E0E0FF] mt-0.5 truncate">{data.topExchange}</p>
              </div>
            </div>
          </>
        ) : (
          /* No data state */
          <div className="text-center py-2">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full mb-2"
              style={{ background: 'rgba(112, 112, 170, 0.1)', border: '1px solid rgba(112,112,170,0.2)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7070AA" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <p className="text-xs text-[#7070AA] mb-1">No exchange data tracked</p>
            <p className="text-[9px] text-[#7070AA]/60 leading-relaxed">
              No major exchanges registered in this country yet, or volume is below tracking threshold.
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainerRef} className="w-full h-full" />
      {/* Hover label */}
      {hoveredCountry && !selectedCountry && (
        <div className="pointer-events-none fixed top-4 max-md:top-24 left-1/2 -translate-x-1/2 z-50
          px-4 py-2 rounded-lg backdrop-blur-md
          bg-[rgba(5,5,25,0.85)] border border-[rgba(0,245,255,0.3)]
          text-[#00F5FF] text-sm font-mono
          shadow-[0_0_20px_rgba(0,245,255,0.2)]">
          {hoveredCountry}
        </div>
      )}

      {/* Click detail card */}
      {selectedCountry && (
        <div
          className={`z-50 pointer-events-auto ${
            typeof window !== 'undefined' && window.innerWidth < 768
              ? 'fixed bottom-16 left-4 right-4 flex justify-center'
              : 'absolute'
          }`}
          style={
            typeof window !== 'undefined' && window.innerWidth < 768
              ? undefined
              : {
                  left: Math.min(
                    Math.max(selectedCountry.x - 120, 8),
                    (typeof window !== 'undefined' ? window.innerWidth : 800) - 272
                  ),
                  top: Math.min(
                    Math.max(selectedCountry.y - 200, 10),
                    (typeof window !== 'undefined' ? window.innerHeight : 600) - 350
                  ),
                }
          }
        >
          {renderDetailCard()}
        </div>
      )}
    </div>
  );
}
