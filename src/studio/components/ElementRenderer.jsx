import React from 'react';
import { RotateCw } from 'lucide-react';

export const ElementRenderer = ({
  element,
  isSelected,
  onSelect,
  onStartDrag,
  onStartResize,
  onRotateClick,
}) => {
  const pixelWidth = Math.max(40, element.width);
  const pixelHeight = Math.max(40, element.height);
  const pixelX = element.x;
  const pixelY = element.y;

  const handleClick = (e) => {
    e.stopPropagation();
    onSelect(element.id, e);
  };

  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    e.stopPropagation();
    onStartDrag(element.id, e);
  };

  const handleResizeMouseDown = (e, handle) => {
    if (e.button !== 0) return;
    e.stopPropagation();
    onStartResize(element.id, e, handle);
  };

  // Compute readable font size based on DIV dimensions
  const fontSize = Math.max(11, Math.min(15, Math.floor(Math.min(pixelWidth, pixelHeight) * 0.22)));

  return (
    <div
      id={`element-${element.id}`}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      className={`absolute cursor-move select-none transition-shadow ${
        isSelected ? 'z-50' : ''
      }`}
      style={{
        width: `${pixelWidth}px`,
        height: `${pixelHeight}px`,
        left: `${pixelX}px`,
        top: `${pixelY}px`,
        transform: `rotate(${element.rotation}deg)`,
        transformOrigin: 'center center',
        zIndex: isSelected ? 999 : (element.zIndex || 10),
      }}
    >
      {/* Object Box */}
      <div
        className={`w-full h-full relative rounded-lg flex flex-col items-center justify-center p-2 text-center transition-all ${
          isSelected
            ? 'ring-2 ring-[#2563eb] shadow-[0_0_18px_rgba(37,99,235,0.35)] border-2 border-[#2563eb]'
            : 'border-2 hover:border-[#2563eb]/70 hover:shadow-md shadow-xs'
        }`}
        style={{
          backgroundColor: element.color ? `${element.color}` : '#3b82f6',
          borderColor: isSelected ? '#1d4ed8' : (element.borderColor || '#1e40af'),
        }}
      >
        {/* Centered Object Name inside DIV */}
        <span
          className="font-bold tracking-wide text-white uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] select-none truncate max-w-[95%]"
          style={{
            fontSize: `${fontSize}px`,
            lineHeight: 1.2,
          }}
        >
          {element.name || element.label}
        </span>

        {/* Subtle secondary dimension tag inside DIV if room */}
        {pixelHeight >= 55 && pixelWidth >= 80 && (
          <span className="text-[10px] font-mono text-white/90 mt-0.5 pointer-events-none drop-shadow-xs">
            {Math.round(pixelWidth)} × {Math.round(pixelHeight)}
          </span>
        )}
      </div>

      {/* SELECTION OVERLAY & INTERACTIVE HANDLES */}
      {isSelected && (
        <>
          {/* Dimension Tag on Top */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#172554] text-white font-mono text-[11px] font-bold px-2.5 py-0.5 rounded-md border border-[#3b82f6] shadow-lg whitespace-nowrap pointer-events-none z-50 flex items-center gap-1.5">
            <span>{Math.round(pixelWidth)} × {Math.round(pixelHeight)} px</span>
            {element.rotation !== 0 && (
              <span className="text-[#93c5fd]">({element.rotation}°)</span>
            )}
          </div>

          {/* Quick Rotate Button Handle on Top Center */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRotateClick?.(element.id);
            }}
            className="absolute -top-5 -right-5 w-6 h-6 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white flex items-center justify-center shadow-md border-2 border-white cursor-pointer transition-transform hover:scale-110 z-50"
            title="Rotate 90° clockwise"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>

          {/* Bottom-Right Interactive Resize Handle */}
          <div
            onMouseDown={(e) => handleResizeMouseDown(e, 'se')}
            className="absolute -bottom-2 -right-2 w-4 h-4 bg-[#2563eb] border-2 border-white rounded-full cursor-se-resize shadow-md hover:scale-125 transition-transform z-50 flex items-center justify-center"
            title="Drag to resize Width & Height"
          >
            <div className="w-1.5 h-1.5 bg-white rounded-full" />
          </div>

          {/* Secondary Corner Handles for Visual Feedback */}
          <div
            onMouseDown={(e) => handleResizeMouseDown(e, 'e')}
            className="absolute top-1/2 -right-2 -translate-y-1/2 w-3 h-3 bg-[#2563eb] border-2 border-white rounded-full cursor-e-resize shadow-md hover:scale-125 transition-transform z-50"
            title="Drag to resize Width"
          />

          <div
            onMouseDown={(e) => handleResizeMouseDown(e, 's')}
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#2563eb] border-2 border-white rounded-full cursor-s-resize shadow-md hover:scale-125 transition-transform z-50"
            title="Drag to resize Height"
          />
        </>
      )}
    </div>
  );
};
