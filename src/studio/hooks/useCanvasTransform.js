import { useState, useCallback } from 'react';

export function useCanvasTransform(initialPpm = 40) {
  const [zoom, setZoom] = useState(1.0);
  const [pan, setPan] = useState({ x: 20, y: 20 });
  const pixelsPerMeter = initialPpm * zoom;

  const zoomIn = useCallback(() => {
    setZoom(prev => Math.min(2.5, Math.round((prev + 0.1) * 10) / 10));
  }, []);

  const zoomOut = useCallback(() => {
    setZoom(prev => Math.max(0.4, Math.round((prev - 0.1) * 10) / 10));
  }, []);

  const resetView = useCallback(() => {
    setZoom(1.0);
    setPan({ x: 20, y: 20 });
  }, []);

  return {
    zoom,
    setZoom,
    pan,
    setPan,
    pixelsPerMeter,
    basePpm: initialPpm,
    zoomIn,
    zoomOut,
    resetView
  };
}
