import React from 'react';
import {
  RotateCw,
  Copy,
  Trash2,
  Undo2,
  Redo2,
  ZoomIn,
  ZoomOut,
  Maximize,
  Magnet,
} from 'lucide-react';

export const Toolbar = ({
  zoom,
  onZoomIn,
  onZoomOut,
  onResetView,
  onRotate,
  onDuplicate,
  onDelete,
  hasSelection,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  snapToGrid,
  onToggleSnap,
}) => {
  return (
    <div className="h-12 bg-[#f8fbff] border-b border-[#dbeafe] px-5 flex items-center justify-between z-20 select-none shrink-0">
      {/* Left tools: Snap & History */}
      <div className="flex items-center gap-2.5">
        {/* Snap to Grid Toggle */}
        <button
          type="button"
          onClick={onToggleSnap}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
            snapToGrid
              ? 'bg-[#2563eb] text-white border-[#2563eb] shadow-xs'
              : 'bg-white text-[#64748b] border-[#cbd5e1] hover:bg-[#eff6ff] hover:text-[#1e40af]'
          }`}
          title="Toggle 10px Grid Snapping"
        >
          <Magnet className="w-3.5 h-3.5" />
          <span>Grid Snap (10px)</span>
        </button>

        <div className="h-5 w-[1px] bg-[#dbeafe]" />

        {/* Undo / Redo */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            title="Undo (Ctrl+Z)"
            disabled={!canUndo}
            onClick={onUndo}
            className={`p-1.5 rounded-lg text-xs border transition-colors ${
              canUndo
                ? 'bg-white hover:bg-[#eff6ff] text-[#1e40af] border-[#dbeafe] shadow-xs'
                : 'opacity-40 bg-[#f1f5f9] text-[#94a3b8] border-transparent cursor-not-allowed'
            }`}
          >
            <Undo2 className="w-4 h-4" />
          </button>

          <button
            type="button"
            title="Redo (Ctrl+Y)"
            disabled={!canRedo}
            onClick={onRedo}
            className={`p-1.5 rounded-lg text-xs border transition-colors ${
              canRedo
                ? 'bg-white hover:bg-[#eff6ff] text-[#1e40af] border-[#dbeafe] shadow-xs'
                : 'opacity-40 bg-[#f1f5f9] text-[#94a3b8] border-transparent cursor-not-allowed'
            }`}
          >
            <Redo2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Center/Right tools: Context actions & Zoom */}
      <div className="flex items-center gap-3">
        {hasSelection && (
          <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-xl border border-[#bfdbfe] shadow-xs animate-in fade-in duration-150">
            <span className="text-[11px] font-bold text-[#1e40af] px-1 hidden md:inline">
              Selected Element:
            </span>

            {/* Quick Rotate */}
            <button
              type="button"
              onClick={onRotate}
              className="px-2 py-1 rounded-lg bg-[#eff6ff] hover:bg-[#dbeafe] text-[#1e40af] text-xs font-semibold flex items-center gap-1 transition-colors"
              title="Rotate 90° (R)"
            >
              <RotateCw className="w-3.5 h-3.5 text-[#2563eb]" />
              <span className="hidden sm:inline">Rotate 90°</span>
            </button>

            {/* Quick Duplicate */}
            <button
              type="button"
              onClick={onDuplicate}
              className="px-2 py-1 rounded-lg bg-[#eff6ff] hover:bg-[#dbeafe] text-[#1e40af] text-xs font-semibold flex items-center gap-1 transition-colors"
              title="Duplicate (Ctrl+D)"
            >
              <Copy className="w-3.5 h-3.5 text-[#2563eb]" />
              <span className="hidden sm:inline">Duplicate</span>
            </button>

            {/* Quick Delete */}
            <button
              type="button"
              onClick={onDelete}
              className="px-2 py-1 rounded-lg bg-[#fef2f2] hover:bg-[#fee2e2] text-[#dc2626] text-xs font-semibold flex items-center gap-1 transition-colors"
              title="Delete element (Del)"
            >
              <Trash2 className="w-3.5 h-3.5 text-[#dc2626]" />
              <span className="hidden sm:inline">Delete</span>
            </button>
          </div>
        )}

        <div className="h-5 w-[1px] bg-[#dbeafe]" />

        {/* Zoom Controls */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-[#dbeafe] shadow-xs">
          <button
            type="button"
            onClick={onZoomOut}
            className="p-1.5 rounded-lg text-[#64748b] hover:text-[#172554] hover:bg-[#f1f5f9] transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>

          <span className="font-mono text-xs text-[#1e40af] font-bold px-2 min-w-[42px] text-center">
            {Math.round(zoom * 100)}%
          </span>

          <button
            type="button"
            onClick={onZoomIn}
            className="p-1.5 rounded-lg text-[#64748b] hover:text-[#172554] hover:bg-[#f1f5f9] transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={onResetView}
            className="p-1.5 rounded-lg text-[#64748b] hover:text-[#2563eb] hover:bg-[#eff6ff] transition-colors"
            title="Reset Canvas View (100%)"
          >
            <Maximize className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
