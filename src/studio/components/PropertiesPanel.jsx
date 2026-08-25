import React, { useState, useEffect } from 'react';
import {
  SlidersHorizontal,
  Plus,
  Minus,
  RotateCw,
  Copy,
  Trash2,
  Move,
  Layers,
  ArrowUp,
  ArrowDown,
  Info,
  Maximize,
  Compass,
} from 'lucide-react';

export const PropertiesPanel = ({
  selectedElement,
  onAdjustWidth,
  onSetWidth,
  onAdjustHeight,
  onSetHeight,
  onAdjustRotation,
  onSetRotation,
  onRotate90,
  onUpdatePosition,
  onDuplicate,
  onDelete,
  onBringToFront,
  onSendToBack,
}) => {
  // Local input state for smooth direct typing
  const [localWidth, setLocalWidth] = useState('');
  const [localHeight, setLocalHeight] = useState('');
  const [localX, setLocalX] = useState('');
  const [localY, setLocalY] = useState('');
  const [localRotation, setLocalRotation] = useState('');

  useEffect(() => {
    if (selectedElement) {
      setLocalWidth(Math.round(selectedElement.width).toString());
      setLocalHeight(Math.round(selectedElement.height).toString());
      setLocalX(Math.round(selectedElement.x).toString());
      setLocalY(Math.round(selectedElement.y).toString());
      setLocalRotation(Math.round(selectedElement.rotation).toString());
    }
  }, [selectedElement]);

  if (!selectedElement) {
    return (
      <aside className="w-80 bg-white border-l border-[#dbeafe] flex flex-col h-full z-20 select-none p-6 shrink-0 shadow-xs">
        <div className="flex items-center gap-2 pb-4 border-b border-[#dbeafe] text-[#172554]">
          <SlidersHorizontal className="w-4 h-4 text-[#2563eb]" />
          <h2 className="text-sm font-extrabold uppercase tracking-wider">PROPERTIES</h2>
        </div>

        {/* Empty state */}
        <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
          <div className="w-16 h-16 rounded-2xl bg-[#eff6ff] border border-[#bfdbfe] flex items-center justify-center mb-4 text-[#2563eb] shadow-xs">
            <Info className="w-8 h-8 opacity-80 text-[#2563eb]" />
          </div>
          <h3 className="text-sm font-bold text-[#172554] mb-1">No element selected</h3>
          <p className="text-xs text-[#64748b] max-w-[220px] leading-relaxed">
            Click an element on the canvas to inspect its dimensions or drag a new one from the Element Library.
          </p>

          <div className="mt-8 p-3.5 rounded-xl bg-[#f8fbff] border border-[#dbeafe] text-left w-full space-y-2">
            <div className="text-[11px] font-bold text-[#1e40af] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb]" />
              Quick Controls
            </div>
            <ul className="text-[11px] text-[#475569] space-y-1.5 pl-3 list-disc">
              <li>Drag & drop furniture elements</li>
              <li>Drag corner handle (●) to resize</li>
              <li>Type exact Width / Height in pixels</li>
              <li>Use [+] and [−] buttons (10px step)</li>
              <li>Clone, Rotate, or Delete items</li>
            </ul>
          </div>
        </div>
      </aside>
    );
  }

  // Handle Dimension Commit on Enter or Blur
  const handleWidthCommit = () => {
    const parsed = parseInt(localWidth, 10);
    if (!isNaN(parsed) && parsed >= 40 && parsed <= 800) {
      onSetWidth(selectedElement.id, parsed);
    } else {
      setLocalWidth(Math.round(selectedElement.width).toString());
    }
  };

  const handleHeightCommit = () => {
    const parsed = parseInt(localHeight, 10);
    if (!isNaN(parsed) && parsed >= 40 && parsed <= 800) {
      onSetHeight(selectedElement.id, parsed);
    } else {
      setLocalHeight(Math.round(selectedElement.height).toString());
    }
  };

  const handlePositionCommit = () => {
    const x = parseInt(localX, 10);
    const y = parseInt(localY, 10);
    if (!isNaN(x) && !isNaN(y)) {
      onUpdatePosition(selectedElement.id, Math.max(0, x), Math.max(0, y));
    }
  };

  const handleRotationCommit = () => {
    const parsed = parseInt(localRotation, 10);
    if (!isNaN(parsed)) {
      onSetRotation(selectedElement.id, parsed);
    } else {
      setLocalRotation(Math.round(selectedElement.rotation).toString());
    }
  };

  return (
    <aside className="w-80 bg-white border-l border-[#dbeafe] flex flex-col h-full z-20 select-none overflow-y-auto shrink-0 custom-scrollbar shadow-xs">
      {/* Header with Title & Badge */}
      <div className="p-4 border-b border-[#dbeafe] bg-[#f8fbff] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[#eff6ff] border border-[#bfdbfe] text-[#2563eb]">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-extrabold text-[#172554] uppercase tracking-wider">PROPERTIES</h2>
            <p className="text-[11px] text-[#64748b] font-mono">ID: {selectedElement.id}</p>
          </div>
        </div>
      </div>

      {/* Selected Element Overview Card */}
      <div className="p-4 border-b border-[#dbeafe] bg-[#f8fbff]/60">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl border flex items-center justify-center font-bold text-xs uppercase shadow-xs"
            style={{
              backgroundColor: `${selectedElement.color}20`,
              borderColor: selectedElement.borderColor || '#2563eb',
              color: selectedElement.borderColor || '#2563eb',
            }}
          >
            {selectedElement.type.substring(0, 3)}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-[#172554] truncate">{selectedElement.name}</h3>
            <p className="text-xs text-[#2563eb] font-semibold capitalize">
              {selectedElement.type.replace('_', ' ')} Component
            </p>
          </div>
        </div>
      </div>

      {/* Main Controls Section */}
      <div className="p-4 space-y-5 flex-1 bg-white">
        {/* ========================================================================= */}
        {/* 1. DIMENSIONS: WIDTH & HEIGHT WITH DIRECT INPUTS & +/- 10px BUTTONS       */}
        {/* ========================================================================= */}
        <div className="space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#172554] uppercase tracking-wider">
              <Maximize className="w-3.5 h-3.5 text-[#2563eb]" />
              <span>Dimensions (px)</span>
            </div>
            <span className="text-[10px] text-[#64748b] font-mono">Step: 10px</span>
          </div>

          {/* Width Control */}
          <div className="bg-[#f8fbff] p-3 rounded-xl border border-[#dbeafe] space-y-1.5">
            <div className="flex items-center justify-between text-xs text-[#334155]">
              <span className="font-semibold text-[#172554]">Width</span>
              <span className="text-[#2563eb] font-mono text-[11px] font-bold">
                {Math.round(selectedElement.width)} px
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Decrease by 10px */}
              <button
                type="button"
                onClick={() => onAdjustWidth(selectedElement.id, -10)}
                disabled={selectedElement.width <= 40}
                className="p-1.5 rounded-lg bg-white hover:bg-[#eff6ff] disabled:opacity-40 text-[#1e40af] border border-[#cbd5e1] hover:border-[#2563eb] transition-all active:scale-95 shadow-xs"
                title="Decrease width by 10px"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>

              {/* Direct Numeric Input */}
              <div className="relative flex-1">
                <input
                  type="number"
                  min="40"
                  max="800"
                  step="10"
                  value={localWidth}
                  onChange={(e) => setLocalWidth(e.target.value)}
                  onBlur={handleWidthCommit}
                  onKeyDown={(e) => e.key === 'Enter' && handleWidthCommit()}
                  className="w-full bg-white border border-[#cbd5e1] rounded-lg px-2.5 py-1 text-center text-xs font-mono text-[#172554] font-bold focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Increase by 10px */}
              <button
                type="button"
                onClick={() => onAdjustWidth(selectedElement.id, 10)}
                disabled={selectedElement.width >= 800}
                className="p-1.5 rounded-lg bg-white hover:bg-[#eff6ff] disabled:opacity-40 text-[#1e40af] border border-[#cbd5e1] hover:border-[#2563eb] transition-all active:scale-95 shadow-xs"
                title="Increase width by 10px"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Height Control */}
          <div className="bg-[#f8fbff] p-3 rounded-xl border border-[#dbeafe] space-y-1.5">
            <div className="flex items-center justify-between text-xs text-[#334155]">
              <span className="font-semibold text-[#172554]">Height</span>
              <span className="text-[#2563eb] font-mono text-[11px] font-bold">
                {Math.round(selectedElement.height)} px
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Decrease by 10px */}
              <button
                type="button"
                onClick={() => onAdjustHeight(selectedElement.id, -10)}
                disabled={selectedElement.height <= 40}
                className="p-1.5 rounded-lg bg-white hover:bg-[#eff6ff] disabled:opacity-40 text-[#1e40af] border border-[#cbd5e1] hover:border-[#2563eb] transition-all active:scale-95 shadow-xs"
                title="Decrease height by 10px"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>

              {/* Direct Numeric Input */}
              <div className="relative flex-1">
                <input
                  type="number"
                  min="40"
                  max="800"
                  step="10"
                  value={localHeight}
                  onChange={(e) => setLocalHeight(e.target.value)}
                  onBlur={handleHeightCommit}
                  onKeyDown={(e) => e.key === 'Enter' && handleHeightCommit()}
                  className="w-full bg-white border border-[#cbd5e1] rounded-lg px-2.5 py-1 text-center text-xs font-mono text-[#172554] font-bold focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Increase by 10px */}
              <button
                type="button"
                onClick={() => onAdjustHeight(selectedElement.id, 10)}
                disabled={selectedElement.height >= 800}
                className="p-1.5 rounded-lg bg-white hover:bg-[#eff6ff] disabled:opacity-40 text-[#1e40af] border border-[#cbd5e1] hover:border-[#2563eb] transition-all active:scale-95 shadow-xs"
                title="Increase height by 10px"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. ROTATION & ORIENTATION CONTROLS (90° STEP & DIRECT DEGREES)           */}
        {/* ========================================================================= */}
        <div className="space-y-2.5 pt-2 border-t border-[#e2e8f0]">
          <div className="flex items-center justify-between text-xs font-bold text-[#172554] uppercase tracking-wider">
            <div className="flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[#2563eb]" />
              <span>Rotation</span>
            </div>
            <span className="text-[#2563eb] font-mono text-[11px] font-bold">
              {Math.round(selectedElement.rotation)}°
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => onRotate90(selectedElement.id)}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#f8fbff] hover:bg-[#eff6ff] border border-[#dbeafe] text-xs font-semibold text-[#1e40af] transition-all active:scale-95 shadow-xs"
              title="Rotate 90° Clockwise"
            >
              <RotateCw className="w-3.5 h-3.5 text-[#2563eb]" />
              <span>+90° Turn</span>
            </button>

            <button
              type="button"
              onClick={() => onAdjustRotation(selectedElement.id, 45)}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#f8fbff] hover:bg-[#eff6ff] border border-[#dbeafe] text-xs font-semibold text-[#1e40af] transition-all active:scale-95 shadow-xs"
              title="Rotate 45°"
            >
              <RotateCw className="w-3.5 h-3.5 text-[#2563eb]" />
              <span>+45° Turn</span>
            </button>
          </div>

          {/* Direct angle slider */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="range"
              min="0"
              max="359"
              step="5"
              value={selectedElement.rotation}
              onChange={(e) => onSetRotation(selectedElement.id, parseInt(e.target.value, 10))}
              className="w-full accent-[#2563eb] cursor-pointer h-1.5 bg-[#e2e8f0] rounded-lg"
            />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. POSITION COORDINATES (X, Y) IN PIXELS                                 */}
        {/* ========================================================================= */}
        <div className="space-y-2.5 pt-2 border-t border-[#e2e8f0]">
          <div className="flex items-center justify-between text-xs font-bold text-[#172554] uppercase tracking-wider">
            <div className="flex items-center gap-1.5">
              <Move className="w-3.5 h-3.5 text-[#2563eb]" />
              <span>Position (px)</span>
            </div>
            <span className="text-[10px] text-[#64748b] font-mono">X, Y from top-left</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#f8fbff] p-2 rounded-xl border border-[#dbeafe] flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold text-[#64748b] pl-1">X:</span>
              <input
                type="number"
                step="10"
                value={localX}
                onChange={(e) => setLocalX(e.target.value)}
                onBlur={handlePositionCommit}
                onKeyDown={(e) => e.key === 'Enter' && handlePositionCommit()}
                className="w-20 bg-white border border-[#cbd5e1] rounded-lg px-2 py-0.5 text-right text-xs font-mono text-[#172554] font-bold focus:outline-none focus:border-[#2563eb]"
              />
            </div>

            <div className="bg-[#f8fbff] p-2 rounded-xl border border-[#dbeafe] flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold text-[#64748b] pl-1">Y:</span>
              <input
                type="number"
                step="10"
                value={localY}
                onChange={(e) => setLocalY(e.target.value)}
                onBlur={handlePositionCommit}
                onKeyDown={(e) => e.key === 'Enter' && handlePositionCommit()}
                className="w-20 bg-white border border-[#cbd5e1] rounded-lg px-2 py-0.5 text-right text-xs font-mono text-[#172554] font-bold focus:outline-none focus:border-[#2563eb]"
              />
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. LAYERING CONTROLS (BRING TO FRONT / SEND TO BACK)                     */}
        {/* ========================================================================= */}
        <div className="space-y-2 pt-2 border-t border-[#e2e8f0]">
          <div className="flex items-center justify-between text-xs font-bold text-[#172554] uppercase tracking-wider">
            <div className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#2563eb]" />
              <span>Layering (Z-Index)</span>
            </div>
            <span className="text-[10px] text-[#2563eb] font-bold font-mono">{selectedElement.zIndex || 1}</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => onBringToFront(selectedElement.id)}
              className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-[#f8fbff] hover:bg-[#eff6ff] border border-[#dbeafe] text-xs font-semibold text-[#1e40af] transition-colors shadow-xs"
              title="Bring to top layer"
            >
              <ArrowUp className="w-3.5 h-3.5 text-[#2563eb]" />
              <span>Front</span>
            </button>

            <button
              type="button"
              onClick={() => onSendToBack(selectedElement.id)}
              className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-[#f8fbff] hover:bg-[#eff6ff] border border-[#dbeafe] text-xs font-semibold text-[#1e40af] transition-colors shadow-xs"
              title="Send to bottom layer"
            >
              <ArrowDown className="w-3.5 h-3.5 text-[#2563eb]" />
              <span>Back</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 5. PRIMARY ACTIONS: DUPLICATE & DELETE                                    */}
        {/* ========================================================================= */}
        <div className="space-y-2 pt-3 border-t border-[#e2e8f0]">
          <button
            type="button"
            onClick={() => onDuplicate(selectedElement.id)}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-xs transition-all hover:shadow-md active:scale-98 shadow-sm"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Duplicate Element (Ctrl+D)</span>
          </button>

          <button
            type="button"
            onClick={() => onDelete(selectedElement.id)}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#fef2f2] hover:bg-[#fee2e2] text-[#dc2626] font-bold text-xs border border-[#fecaca] transition-all active:scale-98"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete Element (Del)</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
