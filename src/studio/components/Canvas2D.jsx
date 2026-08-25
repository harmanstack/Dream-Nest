import React, { useRef, useState, useEffect } from 'react';
import { ElementRenderer } from './ElementRenderer';
import { snapToGridValue, constrainElementPosition } from '../utils/geometry';

export const Canvas2D = ({
  elements,
  selectedId,
  onSelect,
  onDropFromCatalog,
  onUpdateElementPosition,
  onCommitElementPosition,
  onUpdateElementDimensions,
  onCommitElementDimensions,
  onRotateClick,
  zoom,
  canvasWidth,
  canvasHeight,
  snapToGrid,
}) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // Dragging state for moving elements
  const [draggingId, setDraggingId] = useState(null);
  const dragStartRef = useRef({
    startX: 0,
    startY: 0,
    initialElemX: 0,
    initialElemY: 0,
    hasMoved: false,
  });

  // Resizing state for interactive mouse resize
  const [resizingId, setResizingId] = useState(null);
  const resizeStartRef = useRef({
    startX: 0,
    startY: 0,
    initialWidth: 0,
    initialHeight: 0,
    hasResized: false,
  });

  // Handle Drag & Drop from Catalog
  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const itemDataStr = e.dataTransfer.getData('application/json');
    if (!itemDataStr) return;

    try {
      const catalogItem = JSON.parse(itemDataStr);
      if (!canvasRef.current) return;

      const rect = canvasRef.current.getBoundingClientRect();
      let dropX = (e.clientX - rect.left) / zoom;
      let dropY = (e.clientY - rect.top) / zoom;

      if (snapToGrid) {
        dropX = snapToGridValue(dropX, 10);
        dropY = snapToGridValue(dropY, 10);
      }

      onDropFromCatalog(catalogItem, dropX, dropY);
    } catch (err) {
      console.error('Failed to parse dropped catalog item', err);
    }
  };

  // Start Dragging Element on Canvas
  const handleStartDrag = (id, e) => {
    const elem = elements.find((el) => el.id === id);
    if (!elem) return;

    onSelect(id);
    setDraggingId(id);
    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialElemX: elem.x,
      initialElemY: elem.y,
      hasMoved: false,
    };
  };

  // Start Resizing Handle
  const handleStartResize = (id, e, _handle) => {
    const elem = elements.find((el) => el.id === id);
    if (!elem) return;

    onSelect(id);
    setResizingId(id);
    resizeStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialWidth: elem.width,
      initialHeight: elem.height,
      hasResized: false,
    };
  };

  // Global Mouse Move / Up for Drag and Resize operations
  useEffect(() => {
    const handleMouseMove = (e) => {
      // 1. Moving Element
      if (draggingId) {
        const elem = elements.find((el) => el.id === draggingId);
        if (!elem) return;

        const deltaX = (e.clientX - dragStartRef.current.startX) / zoom;
        const deltaY = (e.clientY - dragStartRef.current.startY) / zoom;

        let rawX = dragStartRef.current.initialElemX + deltaX;
        let rawY = dragStartRef.current.initialElemY + deltaY;

        if (snapToGrid) {
          rawX = snapToGridValue(rawX, 10);
          rawY = snapToGridValue(rawY, 10);
        }

        const constrained = constrainElementPosition(
          rawX,
          rawY,
          elem.width,
          elem.height,
          canvasWidth,
          canvasHeight
        );

        dragStartRef.current.hasMoved = true;
        onUpdateElementPosition(draggingId, constrained.x, constrained.y);
      }

      // 2. Resizing Element
      if (resizingId) {
        const elem = elements.find((el) => el.id === resizingId);
        if (!elem) return;

        const deltaX = (e.clientX - resizeStartRef.current.startX) / zoom;
        const deltaY = (e.clientY - resizeStartRef.current.startY) / zoom;

        let newWidth = Math.max(40, resizeStartRef.current.initialWidth + deltaX);
        let newHeight = Math.max(40, resizeStartRef.current.initialHeight + deltaY);

        if (snapToGrid) {
          newWidth = snapToGridValue(newWidth, 10);
          newHeight = snapToGridValue(newHeight, 10);
        }

        // Constrain so it does not exceed canvas bounds
        newWidth = Math.min(canvasWidth - elem.x, newWidth);
        newHeight = Math.min(canvasHeight - elem.y, newHeight);

        resizeStartRef.current.hasResized = true;
        onUpdateElementDimensions(resizingId, Math.max(40, newWidth), Math.max(40, newHeight));
      }
    };

    const handleMouseUp = () => {
      if (draggingId) {
        const elem = elements.find((el) => el.id === draggingId);
        if (elem && dragStartRef.current.hasMoved) {
          onCommitElementPosition(draggingId, elem.x, elem.y);
        }
        setDraggingId(null);
      }

      if (resizingId) {
        const elem = elements.find((el) => el.id === resizingId);
        if (elem && resizeStartRef.current.hasResized) {
          onCommitElementDimensions(resizingId, elem.width, elem.height);
        }
        setResizingId(null);
      }
    };

    if (draggingId || resizingId) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [
    draggingId,
    resizingId,
    elements,
    zoom,
    snapToGrid,
    canvasWidth,
    canvasHeight,
    onUpdateElementPosition,
    onCommitElementPosition,
    onUpdateElementDimensions,
    onCommitElementDimensions,
  ]);

  // Click on empty canvas deselects
  const handleCanvasClick = (e) => {
    if (e.target === canvasRef.current || e.target.classList?.contains('grid-bg-layer')) {
      onSelect(null);
    }
  };

  return (
    <div
      ref={containerRef}
      onClick={handleCanvasClick}
      className="w-full h-full relative overflow-auto flex items-center justify-center p-8 select-none bg-[#f4f8ff]"
      style={{
        backgroundImage: 'radial-gradient(circle at center, #ffffff 0%, #eef4ff 100%)',
      }}
    >
      {/* Scaled Canvas Container */}
      <div
        ref={canvasRef}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="relative bg-white shadow-[0_10px_35px_rgba(37,99,235,0.08)] border-2 border-[#cbd5e1] rounded-2xl transition-transform origin-center shrink-0"
        style={{
          width: `${canvasWidth}px`,
          height: `${canvasHeight}px`,
          transform: `scale(${zoom})`,
        }}
      >
        {/* Architectural 20px / 100px Blueprint Grid Pattern (Crisp Light Theme) */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden grid-bg-layer"
          style={{
            backgroundImage: `
              linear-gradient(#f1f5f9 1px, transparent 1px),
              linear-gradient(90deg, #f1f5f9 1px, transparent 1px),
              linear-gradient(#dbeafe 1px, transparent 1px),
              linear-gradient(90deg, #dbeafe 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px, 20px 20px, 100px 100px, 100px 100px',
          }}
        />

        {/* Perimeter Rulers / Dimensions Tag */}
        <div className="absolute top-2 left-3 font-mono text-[10px] text-[#64748b] pointer-events-none uppercase tracking-wider flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#2563eb] animate-pulse" />
          <span>Origin (0,0) • 20px Grid • 10px Snap</span>
        </div>

        <div className="absolute bottom-2 right-3 font-mono text-[10px] text-[#64748b] pointer-events-none font-semibold">
          {canvasWidth} × {canvasHeight} px
        </div>

        {/* Render Floor Plan Elements (DIV boxes with full interactivity) */}
        {elements.map((element) => (
          <ElementRenderer
            key={element.id}
            element={element}
            isSelected={element.id === selectedId}
            onSelect={(id) => onSelect(id)}
            onStartDrag={handleStartDrag}
            onStartResize={handleStartResize}
            onRotateClick={onRotateClick}
          />
        ))}

        {/* Empty Canvas Prompt */}
        {elements.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-[#64748b] space-y-2">
            <div className="p-6 rounded-2xl bg-white/90 border border-[#dbeafe] text-center max-w-sm shadow-md">
              <h3 className="font-bold text-[#172554] text-sm mb-1">Canvas is empty</h3>
              <p className="text-xs text-[#64748b]">
                Drag and drop furniture or structural elements from the left panel onto this blueprint canvas.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
