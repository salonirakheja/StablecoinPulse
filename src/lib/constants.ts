export const COLORS = {
  CYAN: '#00F5FF',
  CYAN_DIM: '#00A5B0',
  MAGENTA: '#FF00FF',
  MAGENTA_DIM: '#AA00AA',
  ELECTRIC_BLUE: '#4D4DFF',
  NEON_GREEN: '#39FF14',
  HOT_PINK: '#FF1493',

  BG_PRIMARY: '#030308',
  BG_PANEL: 'rgba(5, 5, 25, 0.85)',
  BG_CARD: 'rgba(10, 10, 40, 0.70)',

  TEXT_PRIMARY: '#E0E0FF',
  TEXT_SECONDARY: '#7070AA',
  TEXT_ACCENT: '#00F5FF',
} as const;

export const STABLECOIN_WEIGHTS: Record<string, number> = {
  all: 0.90,
  usdt: 0.65,
  usdc: 0.22,
  dai: 0.03,
};

export const MAP_CONFIG = {
  style: 'mapbox://styles/mapbox/dark-v11',
  center: [20, 20] as [number, number],
  zoom: 1.5,
  minZoom: 1.2,
  maxZoom: 6,
  rotationSpeed: 0.005,
} as const;

export const FOG_CONFIG = {
  color: 'rgb(5, 5, 20)',
  'high-color': 'rgb(10, 5, 40)',
  'horizon-blend': 0.03,
  'space-color': 'rgb(2, 2, 8)',
  'star-intensity': 0.8,
} as const;

export const REVALIDATE_SECONDS = 900; // 15 minutes
