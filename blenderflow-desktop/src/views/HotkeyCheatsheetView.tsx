import React, { useState, useEffect, useRef } from 'react';
import { 
  Keyboard, 
  Search, 
  Laptop
} from 'lucide-react';
import { KeycapBadge } from '../components/common/KeycapBadge';
import { DatabaseService } from '../services/db';

export const HotkeyCheatsheetView: React.FC = () => {
  const hotkeys = DatabaseService.getHotkeys();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMode, setSelectedMode] = useState<string>('Tất cả');
  const [lastKeyPressed, setLastKeyPressed] = useState<string | null>(null);
  const keyTimerRef = useRef<number | null>(null);

  const modes = [
    { id: 'Tất cả', label: 'Tất cả' },
    { id: 'Object Mode', label: 'Object Mode' },
    { id: 'Edit Mode', label: 'Edit Mode' },
    { id: 'Modeling', label: 'Modeling' },
    { id: 'Transform', label: 'Transform' },
    { id: 'Viewport', label: 'Viewport' },
    { id: 'Organization', label: 'Collections' },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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
      selectedMode === 'Tất cả' ||
      hk.mode === selectedMode ||
      hk.category === selectedMode;
    return matchesSearch && matchesMode;
  });

  return (
    <div className="flex-1 h-full overflow-y-auto bg-[#0B0F19] text-[#dfe2f1] p-6 lg:p-8 select-none">
      <div className="max-w-4xl mx-auto flex flex-col gap-6 pb-10">
        {/* Header with Live Keyboard Listener */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#1C2333] pb-5">
          <div>
            <h1 className="font-['Space_Grotesk'] text-2xl font-bold text-white flex items-center gap-2.5">
              <Keyboard className="w-5 h-5 text-[#F97316]" />
              Bảng Tra Cứu Phím Tắt Blender 5.3
            </h1>
            <p className="text-[13px] text-gray-400 mt-1">
              Tìm theo tổ hợp phím hoặc bấm trực tiếp phím trên bàn phím để kiểm tra khớp nhanh.
            </p>
          </div>

          <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-[#121723] border border-[#1E2638]">
            <Laptop className="w-4 h-4 text-gray-400" />
            <span className="text-[11px] text-gray-400">Phím vừa bấm:</span>
            {lastKeyPressed ? (
              <span className="font-mono font-bold text-emerald-400 text-[12px]">
                {lastKeyPressed}
              </span>
            ) : (
              <span className="text-[11px] text-gray-500 font-mono">Đang chờ phím...</span>
            )}
          </div>
        </div>

        {/* Search & Mode Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm phím tắt (VD: Tab, Ctrl+B, Extrude, Bevel)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#121723] border border-[#1E2638] text-white text-[13px] focus:outline-none focus:border-[#F97316] placeholder-gray-500"
            />
          </div>

          <div className="flex items-center gap-1 p-1 rounded-xl bg-[#121723] border border-[#1E2638] overflow-x-auto">
            {modes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => setSelectedMode(mode.id)}
                type="button"
                className={`px-2.5 py-1.5 rounded-lg text-[11px] font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  selectedMode === mode.id
                    ? 'bg-[#1F273B] text-white font-semibold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>

        {/* Clean Hotkey Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filtered.map((hk) => {
            const isMatchLastKey =
              lastKeyPressed && hk.keyCombination.toUpperCase().includes(lastKeyPressed);

            return (
              <div
                key={hk.id}
                className={`p-4 rounded-xl border transition-colors flex items-center justify-between gap-4 ${
                  isMatchLastKey
                    ? 'bg-[#182232] border-emerald-400'
                    : 'bg-[#121723] border-[#1E2638] hover:border-[#2C3752]'
                }`}
              >
                <div className="flex flex-col gap-1 min-w-0">
                  <span className="text-[10px] uppercase font-semibold tracking-wider text-gray-500">
                    {hk.mode} • {hk.category}
                  </span>
                  <p className="text-[13px] font-medium text-white truncate">
                    {hk.description}
                  </p>
                </div>

                <KeycapBadge
                  keys={hk.keyCombination}
                  variant={isMatchLastKey ? 'emerald' : 'default'}
                  size="md"
                />
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="p-8 rounded-xl bg-[#121723] border border-[#1E2638] text-center flex flex-col items-center justify-center gap-2">
            <p className="text-[13px] text-gray-400">Không tìm thấy phím tắt khớp với "{searchQuery}".</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedMode('Tất cả');
              }}
              className="text-[12px] text-[#F97316] hover:underline font-medium cursor-pointer"
            >
              Xóa bộ lọc
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
