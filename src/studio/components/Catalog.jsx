import React, { useState } from 'react';
import { CATALOG_ITEMS, CATEGORIES } from '../data/catalogItems';
import {
  Square,
  DoorOpen,
  Maximize2,
  Armchair,
  Tv,
  Columns,
  Disc,
  Grid,
  Flower2,
  BedDouble,
  ChefHat,
  Bath,
  Search,
  Plus,
  Layers,
  Box,
} from 'lucide-react';

export const Catalog = ({ onAddItem, onDragStart }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const getIcon = (iconName, className = 'w-5 h-5') => {
    switch (iconName) {
      case 'Square':
        return <Square className={className} />;
      case 'DoorOpen':
        return <DoorOpen className={className} />;
      case 'Maximize2':
        return <Maximize2 className={className} />;
      case 'Armchair':
        return <Armchair className={className} />;
      case 'Tv':
        return <Tv className={className} />;
      case 'Columns':
        return <Columns className={className} />;
      case 'Disc':
        return <Disc className={className} />;
      case 'Grid':
        return <Grid className={className} />;
      case 'Flower2':
        return <Flower2 className={className} />;
      case 'BedDouble':
        return <BedDouble className={className} />;
      case 'ChefHat':
        return <ChefHat className={className} />;
      case 'Bath':
        return <Bath className={className} />;
      case 'Box':
        return <Box className={className} />;
      default:
        return <Layers className={className} />;
    }
  };

  const filteredItems = CATALOG_ITEMS.filter((item) => {
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    const matchesQuery =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.label.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <aside className="w-80 bg-white border-r border-[#dbeafe] flex flex-col h-full z-20 select-none shrink-0 shadow-xs">
      {/* Catalog Header */}
      <div className="p-4 border-b border-[#dbeafe] bg-[#f8fbff]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#eff6ff] border border-[#bfdbfe] text-[#2563eb]">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-[#172554] uppercase tracking-wider">ELEMENTS</h2>
              <p className="text-[11px] text-[#64748b]">Drag items to canvas</p>
            </div>
          </div>
          <span className="text-[11px] font-bold font-mono px-2.5 py-0.5 rounded-full bg-white text-[#1e40af] border border-[#dbeafe] shadow-xs">
            {filteredItems.length} items
          </span>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
          <input
            type="text"
            placeholder="Search furniture, doors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-[#cbd5e1] rounded-xl pl-9 pr-3 py-1.5 text-xs text-[#1e293b] placeholder-[#94a3b8] focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100 transition-all font-sans shadow-xs"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="p-3 border-b border-[#dbeafe] flex items-center gap-1.5 overflow-x-auto no-scrollbar bg-white">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeCategory === cat.id
                ? 'bg-[#2563eb] text-white shadow-xs'
                : 'bg-[#f8fbff] text-[#475569] hover:text-[#1e40af] hover:bg-[#eff6ff] border border-[#e2e8f0]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Item Grid List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5 custom-scrollbar bg-white">
        {filteredItems.map((item) => {
          return (
            <div
              key={item.type}
              draggable
              onDragStart={(e) => onDragStart(e, item)}
              onClick={() => onAddItem(item, 320, 220)}
              className="group p-2.5 rounded-xl bg-white hover:bg-[#f8fbff] border border-[#e2e8f0] hover:border-[#bfdbfe] transition-all cursor-grab active:cursor-grabbing hover:shadow-md relative overflow-hidden"
            >
              <div className="flex items-center gap-3">
                {/* Element preview icon block */}
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center border transition-transform group-hover:scale-105 shadow-xs"
                  style={{
                    backgroundColor: `${item.color}15`,
                    borderColor: `${item.borderColor}50`,
                    color: item.borderColor,
                  }}
                >
                  {getIcon(item.iconName, 'w-5 h-5')}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-[#172554] group-hover:text-[#2563eb] transition-colors truncate">
                      {item.name}
                    </h4>
                    <span className="text-[10px] font-mono font-medium text-[#64748b] bg-[#f8fbff] px-1.5 py-0.5 rounded border border-[#e2e8f0]">
                      {item.defaultWidth} × {item.defaultHeight}
                    </span>
                  </div>

                  <p className="text-[11px] text-[#64748b] truncate mt-0.5">
                    {item.description || `${item.category} item`}
                  </p>
                </div>

                {/* Quick Add Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddItem(item, 320, 220);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg bg-[#2563eb] text-white hover:bg-[#1d4ed8] transition-all shadow-xs"
                  title="Click to place on canvas"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Subtle left category indicator accent */}
              <div
                className="absolute left-0 top-0 bottom-0 w-1 opacity-80 group-hover:opacity-100"
                style={{ backgroundColor: item.borderColor }}
              />
            </div>
          );
        })}

        {filteredItems.length === 0 && (
          <div className="p-8 text-center text-[#94a3b8] text-xs">
            <p>No elements found for "{searchQuery}"</p>
          </div>
        )}
      </div>

      {/* Quick instructions in catalog footer */}
      <div className="p-3 bg-[#f8fbff] border-t border-[#dbeafe] text-[11px] text-[#64748b] flex items-center justify-between font-mono">
        <span>💡 Drag or click [+] to add</span>
      </div>
    </aside>
  );
};
