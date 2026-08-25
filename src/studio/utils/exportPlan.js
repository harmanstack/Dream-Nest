/**
 * Download floor plan layout as a formatted JSON file
 */
export function exportPlanToJson(
  elements,
  filename = 'dreamnest-floorplan.json'
) {
  const data = JSON.stringify(
    {
      app: 'DreamNest Studio',
      version: '2.0.0',
      exportedAt: new Date().toISOString(),
      grid: {
        widthPx: 1000,
        heightPx: 650,
        unit: 'pixels',
      },
      stats: {
        totalElements: elements.length,
        types: Array.from(new Set(elements.map((e) => e.type))),
      },
      elements,
    },
    null,
    2
  );

  const blob = new Blob([data], { type: 'application/json' });
  triggerDownload(blob, filename);
}

/**
 * Generate and download high-resolution PNG blueprint image of the canvas
 */
export function exportPlanToPNG(
  elements,
  canvasWidth = 1000,
  canvasHeight = 650,
  filename = 'dreamnest-floorplan.png'
) {
  const padding = 40;
  const totalWidth = canvasWidth + padding * 2;
  const totalHeight = canvasHeight + padding * 2;

  const canvas = document.createElement('canvas');
  canvas.width = totalWidth;
  canvas.height = totalHeight;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Background
  ctx.fillStyle = '#090d16';
  ctx.fillRect(0, 0, totalWidth, totalHeight);

  // Blueprint grid
  ctx.save();
  ctx.translate(padding, padding);

  // Grid background
  ctx.fillStyle = '#0b101c';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // Subtle grid lines (every 20px)
  ctx.lineWidth = 0.5;
  ctx.strokeStyle = 'rgba(51, 65, 85, 0.3)';
  for (let x = 0; x <= canvasWidth; x += 20) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvasHeight);
    ctx.stroke();
  }
  for (let y = 0; y <= canvasHeight; y += 20) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvasWidth, y);
    ctx.stroke();
  }

  // Major grid lines (every 100px)
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'rgba(71, 85, 105, 0.5)';
  for (let x = 0; x <= canvasWidth; x += 100) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvasHeight);
    ctx.stroke();
  }
  for (let y = 0; y <= canvasHeight; y += 100) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvasWidth, y);
    ctx.stroke();
  }

  // Draw Elements sorted by zIndex
  const sorted = [...elements].sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0));

  sorted.forEach((el) => {
    ctx.save();
    const centerX = el.x + el.width / 2;
    const centerY = el.y + el.height / 2;
    ctx.translate(centerX, centerY);
    ctx.rotate((el.rotation * Math.PI) / 180);

    const w = el.width;
    const h = el.height;

    // Fill
    ctx.fillStyle = el.color || '#1e293b';
    ctx.fillRect(-w / 2, -h / 2, w, h);

    // Border
    ctx.strokeStyle = el.borderColor || '#475569';
    ctx.lineWidth = 2;
    ctx.strokeRect(-w / 2, -h / 2, w, h);

    // Centered Label inside DIV
    ctx.fillStyle = '#ffffff';
    ctx.font = `bold ${Math.max(11, Math.min(15, Math.min(w, h) * 0.25))}px "Inter", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
    ctx.shadowBlur = 4;
    ctx.fillText(el.name.toUpperCase() || el.label, 0, 0);

    ctx.restore();
  });

  // Perimeter border
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 2;
  ctx.strokeRect(0, 0, canvasWidth, canvasHeight);

  ctx.restore();

  // Header Title on Image
  ctx.fillStyle = '#f59e0b';
  ctx.font = 'bold 16px "Inter", sans-serif';
  ctx.fillText('DREAMNEST STUDIO - 2D FLOOR PLAN', padding, padding - 16);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '12px "JetBrains Mono", monospace';
  ctx.textAlign = 'right';
  ctx.fillText(
    `CANVAS: ${canvasWidth} × ${canvasHeight} px | Elements: ${elements.length}`,
    totalWidth - padding,
    padding - 16
  );

  // Trigger Download
  canvas.toBlob((blob) => {
    if (blob) {
      triggerDownload(blob, filename);
    }
  }, 'image/png');
}

/**
 * Generate and download SVG Vector Blueprint
 */
export function exportPlanToSVG(
  elements,
  canvasWidth = 1000,
  canvasHeight = 650,
  filename = 'dreamnest-floorplan.svg'
) {
  let svgContent = `<?xml version="1.0" standalone="no"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${canvasWidth}" height="${canvasHeight}" viewBox="0 0 ${canvasWidth} ${canvasHeight}">
  <rect width="${canvasWidth}" height="${canvasHeight}" fill="#090d16"/>
  <!-- Grid -->
  <defs>
    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(51, 65, 85, 0.3)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="${canvasWidth}" height="${canvasHeight}" fill="url(#grid)" />
`;

  const sorted = [...elements].sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0));

  sorted.forEach((el) => {
    const x = el.x;
    const y = el.y;
    const w = el.width;
    const h = el.height;
    const cx = x + w / 2;
    const cy = y + h / 2;

    svgContent += `  <g transform="rotate(${el.rotation}, ${cx}, ${cy})">
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="${el.color || '#1e293b'}" stroke="${el.borderColor || '#64748b'}" stroke-width="2"/>
    <text x="${cx}" y="${cy}" fill="#ffffff" font-family="sans-serif" font-size="${Math.max(11, Math.min(15, Math.min(w, h) * 0.25))}" font-weight="bold" text-anchor="middle" dominant-baseline="central">${el.name.toUpperCase() || el.label}</text>
  </g>
`;
  });

  svgContent += '</svg>';

  const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
  triggerDownload(blob, filename);
}

/**
 * Utility helper to trigger browser download
 */
function triggerDownload(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
