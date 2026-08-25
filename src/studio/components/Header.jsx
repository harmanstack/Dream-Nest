import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Home,
  RefreshCw,
  Trash2,
  HelpCircle,
  Sparkles,
  Layers,
  ArrowLeft,
} from 'lucide-react';

export const Header = ({
  elements,
  onClearPlan,
  onResetStarterPlan,
  onOpenShortcuts,
}) => {
  const navigate = useNavigate();

  return (
    <header className="h-16 bg-white border-b border-[#dbeafe] px-5 flex items-center justify-between z-30 select-none shrink-0 shadow-sm">
      {/* Brand logo & title */}
      <div className="flex items-center gap-3">
        {/* Back to website button */}
        <button
          type="button"
          onClick={() => navigate('/')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#eff6ff] hover:bg-[#dbeafe] text-[#1e40af] text-xs font-semibold border border-[#bfdbfe] transition-colors shadow-xs"
          title="Back to DreamNest Homepage"
        >
          <ArrowLeft className="w-4 h-4 text-[#2563eb]" />
          <span>Home</span>
        </button>

        <div className="h-6 w-[1px] bg-[#dbeafe] mx-1" />

        <div
          onClick={() => navigate('/')}
          className="flex items-center gap-2.5 cursor-pointer group"
          title="Go to Homepage"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#2563eb] to-[#1d4ed8] text-white flex items-center justify-center font-black shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Home className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-sm tracking-tight text-[#172554] flex items-center gap-1">
                DreamNest <span className="text-[#2563eb]">STUDIO</span>
              </h1>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#eff6ff] text-[#2563eb] border border-[#bfdbfe]">
                2D Floor Plan
              </span>
            </div>
            <p className="text-[10px] text-[#64748b]">Smart Room & Furniture Designer</p>
          </div>
        </div>
      </div>

      {/* Center stats */}
      <div className="hidden lg:flex items-center gap-3 text-xs text-[#334155]">
        <div className="flex items-center gap-1.5 bg-[#f8fbff] px-3 py-1 rounded-lg border border-[#dbeafe]">
          <Layers className="w-3.5 h-3.5 text-[#2563eb]" />
          <span>Elements: <strong className="text-[#172554]">{elements.length}</strong></span>
        </div>
        <div className="flex items-center gap-1.5 bg-[#f8fbff] px-3 py-1 rounded-lg border border-[#dbeafe]">
          <Sparkles className="w-3.5 h-3.5 text-[#2563eb]" />
          <span>Canvas: <strong className="text-[#172554]">1000 × 650 px</strong></span>
        </div>
      </div>

      {/* Right project actions */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onResetStarterPlan}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#f8fbff] hover:bg-[#eff6ff] text-[#1e40af] text-xs font-semibold border border-[#dbeafe] hover:border-[#bfdbfe] transition-colors"
          title="Reset to starter layout"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#2563eb]" />
          <span className="hidden sm:inline">Sample Plan</span>
        </button>

        <button
          type="button"
          onClick={onClearPlan}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#fef2f2] hover:bg-[#fee2e2] text-[#dc2626] text-xs font-medium border border-[#fecaca] transition-colors"
          title="Clear all canvas items"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Clear</span>
        </button>

        <button
          type="button"
          onClick={onOpenShortcuts}
          className="p-2 rounded-lg bg-[#f8fbff] hover:bg-[#eff6ff] text-[#64748b] hover:text-[#2563eb] border border-[#dbeafe] transition-colors"
          title="Keyboard shortcuts & help"
        >
          <HelpCircle className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
