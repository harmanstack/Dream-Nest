import React from 'react';
import { X, Keyboard } from 'lucide-react';

export const KeyboardShortcutsModal = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const shortcuts = [
    { key: 'Delete / Backspace', desc: 'Delete selected element' },
    { key: 'Ctrl + D', desc: 'Duplicate selected element' },
    { key: 'R', desc: 'Rotate selected element 90°' },
    { key: 'Ctrl + Z', desc: 'Undo last change' },
    { key: 'Ctrl + Y', desc: 'Redo change' },
    { key: 'Arrow Keys', desc: 'Nudge element by 10px' },
    { key: 'Shift + Arrow', desc: 'Nudge element by 20px' },
    { key: 'Esc', desc: 'Deselect active element' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
      <div className="bg-white border border-[#dbeafe] rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-4 border-b border-[#e2e8f0]">
          <div className="flex items-center gap-2 text-[#172554]">
            <div className="p-1.5 rounded-lg bg-[#eff6ff] text-[#2563eb]">
              <Keyboard className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-base">Keyboard Shortcuts</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#64748b] hover:text-[#172554] hover:bg-[#f1f5f9] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-2">
          {shortcuts.map((item) => (
            <div
              key={item.key}
              className="flex items-center justify-between py-2 px-3 rounded-xl bg-[#f8fbff] border border-[#dbeafe] text-xs"
            >
              <span className="text-[#334155] font-medium">{item.desc}</span>
              <kbd className="px-2 py-1 rounded-md bg-white text-[#2563eb] font-mono font-bold border border-[#cbd5e1] shadow-xs text-[11px]">
                {item.key}
              </kbd>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-[#e2e8f0] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-xs transition-colors shadow-sm"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
