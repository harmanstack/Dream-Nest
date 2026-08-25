import React, { useState, useEffect, useCallback } from 'react';
import { useFloorPlan } from './hooks/useFloorPlan';
import { useCanvasTransform } from './hooks/useCanvasTransform';
import { Header } from './components/Header';
import { Toolbar } from './components/Toolbar';
import { Catalog } from './components/Catalog';
import { Canvas2D } from './components/Canvas2D';
import { PropertiesPanel } from './components/PropertiesPanel';
import { KeyboardShortcutsModal } from './components/KeyboardShortcutsModal';
import { snapToGridValue } from './utils/geometry';

export function StudioEditor() {
  const [snapToGrid, setSnapToGrid] = useState(true);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);

  const canvasWidth = 1000;
  const canvasHeight = 650;

  const {
    elements,
    selectedId,
    selectedElement,
    selectElement,
    addElement,
    updateElement,
    commitUpdateElement,
    adjustWidth,
    setWidth,
    adjustHeight,
    setHeight,
    adjustRotation,
    setRotation,
    rotateElement90,
    duplicateElement,
    deleteElement,
    bringToFront,
    sendToBack,
    bringForward,
    sendBackward,
    clearPlan,
    resetStarterPlan,
    loadPlan,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useFloorPlan();

  const {
    zoom,
    setZoom,
    zoomIn,
    zoomOut,
    resetView,
  } = useCanvasTransform(1.0);

  // Drag start from Catalog
  const handleCatalogDragStart = (e, item) => {
    e.dataTransfer.setData('application/json', JSON.stringify(item));
    e.dataTransfer.effectAllowed = 'copy';
  };

  // Add item when clicked in catalog
  const handleAddItemFromCatalog = (item, x = 300, y = 200) => {
    addElement(item, x, y, snapToGrid, canvasWidth, canvasHeight);
  };

  // Drag and drop onto canvas
  const handleDropOnCanvas = (catalogItem, x, y) => {
    addElement(catalogItem, x, y, snapToGrid, canvasWidth, canvasHeight);
  };

  // Update position while dragging on canvas
  const handleUpdateElementPosition = useCallback(
    (id, x, y) => {
      updateElement(id, { x, y });
    },
    [updateElement]
  );

  // Commit final position when mouse released
  const handleCommitElementPosition = useCallback(
    (id, x, y) => {
      commitUpdateElement(id, { x, y });
    },
    [commitUpdateElement]
  );

  // Update dimensions while resizing
  const handleUpdateElementDimensions = useCallback(
    (id, width, height) => {
      updateElement(id, { width, height });
    },
    [updateElement]
  );

  // Commit final dimensions when resize ends
  const handleCommitElementDimensions = useCallback(
    (id, width, height) => {
      commitUpdateElement(id, { width, height });
    },
    [commitUpdateElement]
  );

  // Keyboard shortcuts listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }

      // Delete / Backspace
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedId) {
          e.preventDefault();
          deleteElement(selectedId);
        }
      }

      // Ctrl + D -> Duplicate
      if ((e.ctrlKey || e.metaKey) && (e.key === 'd' || e.key === 'D')) {
        if (selectedId) {
          e.preventDefault();
          duplicateElement(selectedId);
        }
      }

      // Ctrl + Z -> Undo
      if ((e.ctrlKey || e.metaKey) && !e.shiftKey && (e.key === 'z' || e.key === 'Z')) {
        e.preventDefault();
        undo();
      }

      // Ctrl + Y or Ctrl + Shift + Z -> Redo
      if (
        ((e.ctrlKey || e.metaKey) && (e.key === 'y' || e.key === 'Y')) ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'z' || e.key === 'Z'))
      ) {
        e.preventDefault();
        redo();
      }

      // R -> Rotate 90
      if (e.key === 'r' || e.key === 'R') {
        if (selectedId) {
          e.preventDefault();
          rotateElement90(selectedId);
        }
      }

      // Escape -> Deselect
      if (e.key === 'Escape') {
        selectElement(null);
      }

      // Arrow keys to nudge selected element (10px step, 20px with shift)
      if (
        selectedElement &&
        ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)
      ) {
        e.preventDefault();
        const step = e.shiftKey ? 20 : 10;
        let deltaX = 0;
        let deltaY = 0;

        if (e.key === 'ArrowLeft') deltaX = -step;
        if (e.key === 'ArrowRight') deltaX = step;
        if (e.key === 'ArrowUp') deltaY = -step;
        if (e.key === 'ArrowDown') deltaY = step;

        const newX = snapToGridValue(
          Math.max(0, Math.min(canvasWidth - selectedElement.width, selectedElement.x + deltaX)),
          10
        );
        const newY = snapToGridValue(
          Math.max(0, Math.min(canvasHeight - selectedElement.height, selectedElement.y + deltaY)),
          10
        );

        commitUpdateElement(selectedElement.id, { x: newX, y: newY });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    selectedId,
    selectedElement,
    deleteElement,
    duplicateElement,
    undo,
    redo,
    rotateElement90,
    selectElement,
    commitUpdateElement,
    canvasWidth,
    canvasHeight,
  ]);

  return (
    <div className="flex flex-col h-screen w-screen bg-[#f4f8ff] text-[#172554] overflow-hidden select-none font-sans fixed inset-0 z-50">
      {/* Top Header */}
      <Header
        elements={elements}
        onClearPlan={clearPlan}
        onResetStarterPlan={resetStarterPlan}
        onOpenShortcuts={() => setIsShortcutsOpen(true)}
      />

      {/* Primary Toolbar */}
      <Toolbar
        zoom={zoom}
        onZoomChange={setZoom}
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        onResetView={resetView}
        onRotate={() => rotateElement90()}
        onDuplicate={() => duplicateElement()}
        onDelete={() => deleteElement()}
        hasSelection={!!selectedId}
        canUndo={canUndo}
        canRedo={canRedo}
        onUndo={undo}
        onRedo={redo}
        snapToGrid={snapToGrid}
        onToggleSnap={() => setSnapToGrid((prev) => !prev)}
        canvasWidth={canvasWidth}
        canvasHeight={canvasHeight}
      />

      {/* Main Studio Workspace Layout (LEFT Catalog, CENTER Canvas, RIGHT Properties) */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* LEFT: Element Library */}
        <Catalog
          onAddItem={handleAddItemFromCatalog}
          onDragStart={handleCatalogDragStart}
        />

        {/* CENTER: 2D Floor Plan Canvas */}
        <main className="flex-1 flex flex-col h-full relative overflow-hidden bg-[#f4f8ff]">
          <Canvas2D
            elements={elements}
            selectedId={selectedId}
            onSelect={selectElement}
            onDropFromCatalog={handleDropOnCanvas}
            onUpdateElementPosition={handleUpdateElementPosition}
            onCommitElementPosition={handleCommitElementPosition}
            onUpdateElementDimensions={handleUpdateElementDimensions}
            onCommitElementDimensions={handleCommitElementDimensions}
            onRotateClick={rotateElement90}
            zoom={zoom}
            canvasWidth={canvasWidth}
            canvasHeight={canvasHeight}
            snapToGrid={snapToGrid}
          />
        </main>

        {/* RIGHT: Properties Panel */}
        <PropertiesPanel
          selectedElement={selectedElement}
          onAdjustWidth={adjustWidth}
          onSetWidth={setWidth}
          onAdjustHeight={adjustHeight}
          onSetHeight={setHeight}
          onAdjustRotation={adjustRotation}
          onSetRotation={setRotation}
          onRotate90={rotateElement90}
          onUpdatePosition={(id, x, y) => commitUpdateElement(id, { x, y })}
          onDuplicate={duplicateElement}
          onDelete={deleteElement}
          onBringToFront={bringToFront}
          onSendToBack={sendToBack}
          onBringForward={bringForward}
          onSendBackward={sendBackward}
          onDeselect={() => selectElement(null)}
        />
      </div>

      {/* Keyboard Shortcuts Modal */}
      <KeyboardShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />
    </div>
  );
}

export default StudioEditor;
