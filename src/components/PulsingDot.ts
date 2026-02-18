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

      // Outer expanding ring 1
      const outerRadius1 = maxOuter * t + innerRadius;
      ctx.beginPath();
      ctx.arc(center, center, outerRadius1, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 245, 255, ${0.2 * (1 - t)})`;
      ctx.fill();

      // Outer expanding ring 2 (offset phase)
      const t2 = ((performance.now() + 1000) % duration) / duration;
      const outerRadius2 = maxOuter * t2 + innerRadius;
      ctx.beginPath();
      ctx.arc(center, center, outerRadius2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 245, 255, ${0.12 * (1 - t2)})`;
      ctx.fill();

      // Inner glow gradient
      const gradient = ctx.createRadialGradient(
        center, center, 0,
        center, center, innerRadius * 4
      );
      gradient.addColorStop(0, 'rgba(0, 245, 255, 0.7)');
      gradient.addColorStop(0.4, 'rgba(0, 245, 255, 0.2)');
      gradient.addColorStop(1, 'rgba(0, 245, 255, 0)');
      ctx.beginPath();
      ctx.arc(center, center, innerRadius * 4, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Core white-hot dot
      ctx.beginPath();
      ctx.arc(center, center, innerRadius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.fill();

      // Thin cyan ring around core
      ctx.beginPath();
      ctx.arc(center, center, innerRadius + 2, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 245, 255, 0.6)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      this.data = ctx.getImageData(0, 0, size, size).data;
      map.triggerRepaint();
      return true;
    },
  };

  return pulsingDot;
}
