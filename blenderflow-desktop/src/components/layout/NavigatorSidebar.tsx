import React from 'react';
import { 
  Home, 
  Keyboard, 
  Settings, 
  Box, 
  Cable,
  BookOpen
} from 'lucide-react';
import { NavigationTab, UserStats } from '../../types';

interface NavigatorSidebarProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  userStats: UserStats;
  bridgeConnected?: boolean;
  isWebMode?: boolean;
  onOpenPracticeChallenge?: () => void;
}

export const NavigatorSidebar: React.FC<NavigatorSidebarProps> = ({
  currentTab,
  onSelectTab,
  userStats,
  bridgeConnected = false,
  isWebMode = false,
  onOpenPracticeChallenge,
}) => {
  const isCurriculumActive = currentTab === 'curriculum' || currentTab === 'my-roadmaps';

  return (
    <>
      {/* 1. Desktop Minimal Sidebar (MD screens and up) */}
      <aside className="hidden md:flex w-[220px] h-screen bg-[#0D111A] border-r border-[#1C2333] flex-col justify-between shrink-0 select-none z-30">
        {/* Top Brand + Primary 4 Navigation Links */}
        <div className="flex flex-col">
          <div className="h-11 px-4 flex items-center gap-2.5 border-b border-[#1C2333]">
            <div className="w-6 h-6 rounded-md bg-[#F97316] flex items-center justify-center">
              <Box className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-['Space_Grotesk'] text-[14px] font-bold text-white tracking-tight flex items-center gap-1.5">
              BlenderFlow
              <span className="text-[10px] font-normal px-1.5 py-0.2 bg-[#1B2232] text-gray-400 rounded">5.3</span>
            </span>
          </div>

          <nav className="flex flex-col gap-1 px-2.5 mt-4">
            <button
              type="button"
              onClick={() => onSelectTab('home')}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors cursor-pointer ${
                currentTab === 'home'
                  ? 'bg-[#1D2537] text-white font-semibold'
                  : 'text-gray-400 hover:text-white hover:bg-[#151B29]'
              }`}
            >
              <Home className={`w-4 h-4 ${currentTab === 'home' ? 'text-[#F97316]' : ''}`} />
              <span>Tổng quan</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectTab('curriculum')}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors cursor-pointer ${
                isCurriculumActive
                  ? 'bg-[#1D2537] text-white font-semibold'
                  : 'text-gray-400 hover:text-white hover:bg-[#151B29]'
              }`}
            >
              <BookOpen className={`w-4 h-4 ${isCurriculumActive ? 'text-[#F97316]' : ''}`} />
              <span>Giáo trình & Lộ trình</span>
            </button>

            {onOpenPracticeChallenge && (
              <button
                type="button"
                onClick={onOpenPracticeChallenge}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium text-gray-400 hover:text-white hover:bg-[#151B29] transition-colors cursor-pointer"
              >
                <Box className="w-4 h-4" />
                <span>Thực hành 3D</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => onSelectTab('hotkeys')}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors cursor-pointer ${
                currentTab === 'hotkeys'
                  ? 'bg-[#1D2537] text-white font-semibold'
                  : 'text-gray-400 hover:text-white hover:bg-[#151B29]'
              }`}
            >
              <Keyboard className={`w-4 h-4 ${currentTab === 'hotkeys' ? 'text-[#F97316]' : ''}`} />
              <span>Phím tắt Blender</span>
            </button>
          </nav>
        </div>

        {/* Bottom Group: Settings & Single-Line Environment Status */}
        <div className="p-2.5 border-t border-[#1C2333] flex flex-col gap-2">
          <button
            type="button"
            onClick={() => onSelectTab('settings')}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors cursor-pointer ${
              currentTab === 'settings'
                ? 'bg-[#1D2537] text-white font-semibold'
                : 'text-gray-400 hover:text-white hover:bg-[#151B29]'
            }`}
          >
            <Settings className={`w-4 h-4 ${currentTab === 'settings' ? 'text-[#F97316]' : ''}`} />
            <span>Cài đặt</span>
          </button>

          {/* Subtle Single-Line Bridge Status (No blinking animations) */}
          <div className="flex items-center gap-2 px-3 py-1.5 text-[11px] text-gray-400">
            <span
              className={`w-2 h-2 rounded-full shrink-0 ${
                bridgeConnected ? 'bg-emerald-400' : isWebMode ? 'bg-indigo-400' : 'bg-amber-400'
              }`}
            />
            <Cable className="w-3 h-3 shrink-0 text-gray-500" />
            <span className="truncate">
              {bridgeConnected
                ? `${userStats.blenderVersion} Sẵn sàng`
                : isWebMode
                ? 'Chế độ Web / Di động'
                : 'Chưa kết nối Blender'}
            </span>
          </div>
        </div>
      </aside>

      {/* 2. Mobile Bottom Navigation Bar (< MD screens) */}
      <nav className="flex md:hidden fixed bottom-0 left-0 right-0 h-14 bg-[#0B0F19]/95 backdrop-blur-xl border-t border-[#1C2333] z-40 items-center justify-around px-1 select-none">
        <button
          type="button"
          onClick={() => onSelectTab('home')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg transition-colors ${
            currentTab === 'home' ? 'text-[#F97316] font-semibold' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Tổng quan</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectTab('curriculum')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg transition-colors ${
            isCurriculumActive ? 'text-[#F97316] font-semibold' : 'text-gray-400 hover:text-white'
          }`}
        >
          <BookOpen className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Giáo trình</span>
        </button>

        {onOpenPracticeChallenge && (
          <button
            type="button"
            onClick={onOpenPracticeChallenge}
            className="flex flex-col items-center justify-center -mt-3 py-1.5 px-3 rounded-xl bg-[#F97316] text-white shadow-md active:scale-95 transition-transform"
          >
            <Box className="w-4 h-4" />
            <span className="text-[9px] font-bold mt-0.5">3D Studio</span>
          </button>
        )}

        <button
          type="button"
          onClick={() => onSelectTab('hotkeys')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg transition-colors ${
            currentTab === 'hotkeys' ? 'text-[#F97316] font-semibold' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Keyboard className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Phím tắt</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectTab('settings')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg transition-colors ${
            currentTab === 'settings' ? 'text-[#F97316] font-semibold' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Settings className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Cài đặt</span>
        </button>
      </nav>
    </>
  );
};
