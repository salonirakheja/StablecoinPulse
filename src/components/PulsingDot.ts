import mapboxgl from 'mapbox-gl';

interface PulsingDotImage extends mapboxgl.StyleImageInterface {
  context: CanvasRenderingContext2D | null;
}

export function createPulsingDot(map: mapboxgl.Map): PulsingDotImage {
  const size = 160;

  const pulsingDot: PulsingDotImage = {
    width: size,
    height: size,
    data: new Uint8Array(size * size * 4),
    context: null,

    onAdd() {
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      this.context = canvas.getContext('2d');
    },

    render() {
      const ctx = this.context;
      if (!ctx) return false;

      const duration = 2000;
      const t = (performance.now() % duration) / duration;
      const center = size / 2;
      const innerRadius = size * 0.06;
      const maxOuter = size * 0.45;

      ctx.clearRect(0, 0, size, size);

      // Expanding stroke ring 1 — radar ping effect
      const outerRadius1 = maxOuter * t + innerRadius;
      ctx.beginPath();
      ctx.arc(center, center, outerRadius1, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(0, 245, 255, ${0.6 * (1 - t)})`;
      ctx.lineWidth = 2.5 * (1 - t) + 0.5;
      ctx.stroke();

      // Expanding stroke ring 2 (offset phase)
      const t2 = ((performance.now() + 1000) % duration) / duration;
      const outerRadius2 = maxOuter * t2 + innerRadius;
      ctx.beginPath();
      ctx.arc(center, center, outerRadius2, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(0, 245, 255, ${0.45 * (1 - t2)})`;
      ctx.lineWidth = 2 * (1 - t2) + 0.5;
      ctx.stroke();

      this.data = ctx.getImageData(0, 0, size, size).data;
      map.triggerRepaint();
      return true;
    },
  };

  return pulsingDot;
}
