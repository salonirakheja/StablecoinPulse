declare namespace GeoJSON {
  interface Point {
    type: 'Point';
    coordinates: [number, number];
  }

  interface LineString {
    type: 'LineString';
    coordinates: [number, number][];
  }

  interface Feature {
    type: 'Feature';
    geometry: Point | LineString;
    properties: Record<string, unknown> | null;
  }

  interface FeatureCollection {
    type: 'FeatureCollection';
    features: Feature[];
  }
}
