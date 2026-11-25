import React, { useState, useEffect } from 'react';
import { 
  Keyboard, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  RotateCcw,
  BookOpen,
  Filter,
  Layers,
  HelpCircle,
  Laptop
} from 'lucide-react';
import { KeycapBadge } from '../components/common/KeycapBadge';
import { DatabaseService } from '../services/db';
import { HotkeyItem } from '../types';

export const HotkeyCheatsheetView: React.FC = () => {
  const hotkeys = DatabaseService.getHotkeys();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMode, setSelectedMode] = useState<string>('All');
  const [lastKeyPressed, setLastKeyPressed] = useState<string | null>(null);
  const keyTimerRef = React.useRef<number | null>(null);

  const modes = ['All', 'Object Mode', 'Edit Mode', 'Modeling', 'Transform', 'Viewport', 'Organization'];

  // Listen to user keyboard presses to highlight active hotkey!
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept when user is typing in search input
      if ((e.target as HTMLElement)?.tagName === 'INPUT' || (e.target as HTMLElement)?.tagName === 'TEXTAREA') {
        return;
      }
      let key = e.key.toUpperCase();
      if (key === 'ESCAPE') key = 'Esc';
      if (key === 'CONTROL') key = 'Ctrl';
      setLastKeyPressed(key);
      if (keyTimerRef.current) window.clearTimeout(keyTimerRef.current);
      keyTimerRef.current = window.setTimeout(() => setLastKeyPressed(null), 1200);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (keyTimerRef.current) window.clearTimeout(keyTimerRef.current);
    };
  }, []);

  const filtered = hotkeys.filter((hk) => {
    const matchesSearch =
      hk.keyCombination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hk.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hk.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMode =
      selectedMode === 'All' ||
      hk.mode === selectedMode ||
      hk.category === selectedMode;
    return matchesSearch && matchesMode;
  });

  return (
    <div className="flex-1 h-full overflow-y-auto bg-[#0B0F19] text-[#dfe2f1] p-6 lg:p-8 select-none">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        {/* Header with Live Keyboard Listener */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#1F2637] pb-6">
          <div>
            <h1 className="font-['Space_Grotesk'] text-2xl font-bold text-white flex items-center gap-2.5">
              <Keyboard className="w-6 h-6 text-[#F97316]" />
              Blender 5.3 Interactive Hotkey Cheatsheet
            </h1>
            <p className="text-[13px] text-gray-400 mt-1">
              Search by key combo or tool name. Press keys on your keyboard to test matches live.
            </p>
          </div>

          {/* Live Keypress Visualizer Banner */}
          <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-[#141A28] border border-[#232D42] shadow-inner">
            <Laptop className="w-4 h-4 text-indigo-400" />
            <span className="text-[11px] text-gray-400 font-medium">Physical Key:</span>
            {lastKeyPressed ? (
              <span className="font-mono font-bold text-emerald-400 text-[13px] bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30 animate-pulse">
                {lastKeyPressed}
              </span>
            ) : (
              <span className="text-[11px] text-gray-500 font-mono italic">Press any key...</span>
            )}
          </div>
        </div>

        {/* Search & Mode Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search shortcut (e.g., Tab, Ctrl+B, E, Inset, Bevel)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#141A28] border border-[#1F2637] text-white text-[13px] focus:outline-none focus:border-indigo-500 placeholder-gray-500"
            />
          </div>

          <div className="flex items-center gap-1 p-1 rounded-xl bg-[#141A28] border border-[#1F2637] overflow-x-auto">
            {modes.map((mode) => (
              <button
                key={mode}
                onClick={() => setSelectedMode(mode)}
                type="button"
                className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedMode === mode
                    ? 'bg-[#4F46E5] text-white shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Hotkey Cards Grid with KeycapBadge */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {filtered.map((hk) => {
            const isMatchLastKey =
              lastKeyPressed &&
              hk.keyCombination.toUpperCase().includes(lastKeyPressed);

            return (
              <div
                key={hk.id}
                className={`p-4 rounded-xl border transition-all flex items-center justify-between gap-4 ${
                  isMatchLastKey
                    ? 'bg-[#1C2538] border-emerald-400 shadow-lg shadow-emerald-900/20 ring-1 ring-emerald-400'
                    : 'bg-[#121622] border-[#1F2637] hover:border-indigo-500/40 hover:bg-[#161D2B]'
                }`}
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400">
                      {hk.mode}
                    </span>
                    <span className="text-gray-600">•</span>
                    <span className="text-[10px] uppercase font-semibold text-indigo-400">
                      {hk.category}
                    </span>
                  </div>
                  <p className="text-[13px] font-semibold text-white">
                    {hk.description}
                  </p>
                </div>

                <KeycapBadge
                  keys={hk.keyCombination}
                  variant={isMatchLastKey ? 'emerald' : 'orange'}
                  size="md"
                />
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="p-8 rounded-xl bg-[#121622] border border-[#1F2637] text-center flex flex-col items-center justify-center gap-2">
            <p className="text-[13px] text-gray-400 font-medium">No hotkey matches "{searchQuery}".</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedMode('All');
              }}
              className="text-[12px] text-indigo-400 hover:underline font-semibold"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
