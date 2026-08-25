import { useState, useCallback, useMemo } from 'react';
import { INITIAL_ELEMENTS } from '../data/initialPlan';
import { generateId, snapToGridValue, constrainElementPosition } from '../utils/geometry';

export function useFloorPlan() {
  const [elements, setElements] = useState(INITIAL_ELEMENTS);
  const [selectedId, setSelectedId] = useState('sofa-1');

  // History stack for Undo / Redo
  const [history, setHistory] = useState([INITIAL_ELEMENTS]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const pushHistory = useCallback((newElements) => {
    setHistory(prev => {
      const trimmed = prev.slice(0, historyIndex + 1);
      return [...trimmed, newElements];
    });
    setHistoryIndex(prev => prev + 1);
  }, [historyIndex]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const nextIndex = historyIndex - 1;
      setHistoryIndex(nextIndex);
      setElements(history[nextIndex]);
    }
  }, [historyIndex, history]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      setHistoryIndex(nextIndex);
      setElements(history[nextIndex]);
    }
  }, [historyIndex, history]);

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  // Selected element derived directly from state
  const selectedElement = useMemo(() => {
    return elements.find(el => el.id === selectedId) || null;
  }, [elements, selectedId]);

  // Select an element or deselect
  const selectElement = useCallback((id) => {
    setSelectedId(id);
  }, []);

  // Add new element from catalog
  const addElement = useCallback((
    catalogItem,
    dropX,
    dropY,
    snap = true,
    canvasWidth = 1000,
    canvasHeight = 650
  ) => {
    let finalX = dropX - catalogItem.defaultWidth / 2;
    let finalY = dropY - catalogItem.defaultHeight / 2;

    if (snap) {
      finalX = snapToGridValue(finalX, 10);
      finalY = snapToGridValue(finalY, 10);
    }

    const constrained = constrainElementPosition(
      finalX,
      finalY,
      catalogItem.defaultWidth,
      catalogItem.defaultHeight,
      canvasWidth,
      canvasHeight
    );

    const maxZ = elements.reduce((max, el) => Math.max(max, el.zIndex || 0), 0);

    const newElement = {
      id: generateId(catalogItem.type),
      type: catalogItem.type,
      name: catalogItem.name,
      label: catalogItem.label,
      width: catalogItem.defaultWidth,
      height: catalogItem.defaultHeight,
      originalWidth: catalogItem.defaultWidth,
      originalHeight: catalogItem.defaultHeight,
      x: Math.max(0, constrained.x),
      y: Math.max(0, constrained.y),
      rotation: 0,
      color: catalogItem.color,
      borderColor: catalogItem.borderColor,
      textColor: catalogItem.textColor,
      zIndex: maxZ + 1,
    };

    setElements(prev => {
      const next = [...prev, newElement];
      pushHistory(next);
      return next;
    });

    setSelectedId(newElement.id);
    return newElement;
  }, [elements, pushHistory]);

  // Update element properties immediately without creating history step
  const updateElement = useCallback((id, updates) => {
    setElements(prev =>
      prev.map(el => {
        if (el.id === id) {
          return { ...el, ...updates };
        }
        return el;
      })
    );
  }, []);

  // Commit changes to history
  const commitUpdateElement = useCallback((id, updates) => {
    setElements(prev => {
      const next = prev.map(el => {
        if (el.id === id) {
          return { ...el, ...updates };
        }
        return el;
      });
      pushHistory(next);
      return next;
    });
  }, [pushHistory]);

  // Direct Width Adjuster (+/- delta in px)
  const adjustWidth = useCallback((id, delta = 10) => {
    setElements(prev => {
      const next = prev.map(el => {
        if (el.id === id) {
          const newWidth = Math.max(40, Math.min(800, el.width + delta));
          return { ...el, width: snapToGridValue(newWidth, 10) };
        }
        return el;
      });
      pushHistory(next);
      return next;
    });
  }, [pushHistory]);

  // Direct Set Width
  const setWidth = useCallback((id, newWidth) => {
    const val = Math.max(40, Math.min(800, Math.round(newWidth)));
    commitUpdateElement(id, { width: val });
  }, [commitUpdateElement]);

  // Direct Height Adjuster (+/- delta in px)
  const adjustHeight = useCallback((id, delta = 10) => {
    setElements(prev => {
      const next = prev.map(el => {
        if (el.id === id) {
          const newHeight = Math.max(40, Math.min(800, el.height + delta));
          return { ...el, height: snapToGridValue(newHeight, 10) };
        }
        return el;
      });
      pushHistory(next);
      return next;
    });
  }, [pushHistory]);

  // Direct Set Height
  const setHeight = useCallback((id, newHeight) => {
    const val = Math.max(40, Math.min(800, Math.round(newHeight)));
    commitUpdateElement(id, { height: val });
  }, [commitUpdateElement]);

  // Direct Rotation Adjuster
  const adjustRotation = useCallback((id, deltaDegrees) => {
    setElements(prev => {
      const next = prev.map(el => {
        if (el.id === id) {
          const newRot = (el.rotation + deltaDegrees + 360) % 360;
          return { ...el, rotation: newRot };
        }
        return el;
      });
      pushHistory(next);
      return next;
    });
  }, [pushHistory]);

  // Set absolute rotation
  const setRotation = useCallback((id, degrees) => {
    const norm = (degrees % 360 + 360) % 360;
    commitUpdateElement(id, { rotation: norm });
  }, [commitUpdateElement]);

  // Rotate 90 degrees clockwise
  const rotateElement90 = useCallback((id) => {
    const targetId = id || selectedId;
    if (!targetId) return;
    adjustRotation(targetId, 90);
  }, [selectedId, adjustRotation]);

  // Duplicate Element
  const duplicateElement = useCallback((id) => {
    const targetId = id || selectedId;
    if (!targetId) return null;

    const source = elements.find(el => el.id === targetId);
    if (!source) return null;

    const maxZ = elements.reduce((max, el) => Math.max(max, el.zIndex || 0), 0);

    const duplicated = {
      ...source,
      id: generateId(source.type),
      name: `${source.name} (Copy)`,
      x: snapToGridValue(Math.min(900, source.x + 30), 10),
      y: snapToGridValue(Math.min(550, source.y + 30), 10),
      zIndex: maxZ + 1
    };

    setElements(prev => {
      const next = [...prev, duplicated];
      pushHistory(next);
      return next;
    });

    setSelectedId(duplicated.id);
    return duplicated;
  }, [elements, selectedId, pushHistory]);

  // Delete Element
  const deleteElement = useCallback((id) => {
    const targetId = id || selectedId;
    if (!targetId) return;

    setElements(prev => {
      const next = prev.filter(el => el.id !== targetId);
      pushHistory(next);
      return next;
    });

    if (selectedId === targetId) {
      setSelectedId(null);
    }
  }, [selectedId, pushHistory]);

  // Bring to Front
  const bringToFront = useCallback((id) => {
    const targetId = id || selectedId;
    if (!targetId) return;

    const maxZ = elements.reduce((max, el) => Math.max(max, el.zIndex || 0), 0);
    commitUpdateElement(targetId, { zIndex: maxZ + 1 });
  }, [elements, selectedId, commitUpdateElement]);

  // Send to Back
  const sendToBack = useCallback((id) => {
    const targetId = id || selectedId;
    if (!targetId) return;

    const minZ = elements.reduce((min, el) => Math.min(min, el.zIndex || 0), 0);
    commitUpdateElement(targetId, { zIndex: Math.max(0, minZ - 1) });
  }, [elements, selectedId, commitUpdateElement]);

  // Bring Forward (1 step)
  const bringForward = useCallback((id) => {
    const targetId = id || selectedId;
    if (!targetId) return;
    const target = elements.find(el => el.id === targetId);
    if (target) {
      commitUpdateElement(targetId, { zIndex: (target.zIndex || 1) + 1 });
    }
  }, [elements, selectedId, commitUpdateElement]);

  // Send Backward (1 step)
  const sendBackward = useCallback((id) => {
    const targetId = id || selectedId;
    if (!targetId) return;
    const target = elements.find(el => el.id === targetId);
    if (target) {
      commitUpdateElement(targetId, { zIndex: Math.max(0, (target.zIndex || 1) - 1) });
    }
  }, [elements, selectedId, commitUpdateElement]);

  // Clear Plan
  const clearPlan = useCallback(() => {
    if (window.confirm('Are you sure you want to clear the entire canvas?')) {
      setElements([]);
      setSelectedId(null);
      pushHistory([]);
    }
  }, [pushHistory]);

  // Reset to initial starter plan
  const resetStarterPlan = useCallback(() => {
    if (window.confirm('Reset canvas to sample starter layout?')) {
      setElements(INITIAL_ELEMENTS);
      setSelectedId('sofa-1');
      pushHistory(INITIAL_ELEMENTS);
    }
  }, [pushHistory]);

  // Load custom plan
  const loadPlan = useCallback((loadedElements) => {
    setElements(loadedElements);
    setSelectedId(loadedElements[0]?.id || null);
    pushHistory(loadedElements);
  }, [pushHistory]);

  return {
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
  };
}
