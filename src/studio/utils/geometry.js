/**
 * Geometry and snapping utilities for Floor Plan Designer (Pixel based)
 */

export function snapToGridValue(value, step = 10) {
  if (step <= 0) return Math.round(value);
  const snapped = Math.round(value / step) * step;
  return snapped;
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Ensures element stays within canvas boundaries in pixels
 */
export function constrainElementPosition(
  x,
  y,
  width,
  height,
  canvasWidth = 1000,
  canvasHeight = 650
) {
  const minX = 0;
  const minY = 0;
  const maxX = Math.max(0, canvasWidth - width);
  const maxY = Math.max(0, canvasHeight - height);

  return {
    x: clamp(x, minX, maxX),
    y: clamp(y, minY, maxY),
  };
}

export function generateId(prefix = 'elem') {
  const cleanPrefix = prefix.toLowerCase().replace(/[^a-z0-9]/g, '-');
  return `${cleanPrefix}-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;
}

export function formatDimension(val) {
  return `${Math.round(val)} px`;
}
