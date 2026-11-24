import React from 'react';
import { 
  Home, 
  Search, 
  Compass, 
  Keyboard, 
  Settings, 
  Box, 
  Flame, 
  Cable,
  CheckCircle2,
  BookOpen
} from 'lucide-react';
import { NavigationTab, UserStats } from '../../types';

interface NavigatorSidebarProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  userStats: UserStats;
  onOpenPracticeChallenge?: () => void;
}

export const NavigatorSidebar: React.FC<NavigatorSidebarProps> = ({
  currentTab,
  onSelectTab,
  userStats,
  onOpenPracticeChallenge,
}) => {
  const navItems: { id: NavigationTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home Dashboard', icon: <Home className="w-[18px] h-[18px]" /> },
    { id: 'curriculum', label: 'Curriculum & Roadmaps', icon: <BookOpen className="w-[18px] h-[18px]" /> },
    { id: 'search', label: 'Search & Explore', icon: <Search className="w-[18px] h-[18px]" /> },
    { id: 'hotkeys', label: 'Hotkey Drills', icon: <Keyboard className="w-[18px] h-[18px]" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-[18px] h-[18px]" /> },
  ];

  return (
    <>
      {/* 1. Desktop Fixed Navigation Sidebar (MD screens and up) */}
      <aside className="hidden md:flex w-[230px] h-screen bg-[#0F131D] border-r border-[#1F2637] flex-col justify-between shrink-0 select-none z-30">
        {/* App Brand Header */}
        <div className="flex flex-col">
          <div className="h-12 px-4 flex items-center justify-between border-b border-[#1F2637]/70 bg-[#0A0E17]/60">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#F97316] flex items-center justify-center shadow-lg shadow-orange-500/20">
                <Box className="w-4 h-4 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-['Space_Grotesk'] text-[15px] font-bold text-white tracking-tight flex items-center gap-1.5">
                  BlenderFlow
                  <span className="text-[10px] font-normal px-1 py-0.2 bg-[#F97316]/20 text-[#FB923C] rounded border border-[#F97316]/30">5.3</span>
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex flex-col gap-1 px-3 mt-4">
            <div className="px-3 pb-1.5 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
              Navigation
            </div>
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectTab(item.id)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-all ${
                    isActive
                      ? 'bg-[#4F46E5] text-white shadow-md shadow-indigo-600/25 font-semibold'
                      : 'text-gray-400 hover:text-white hover:bg-[#1E2538]'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Quick Launch Practice Mode Promo */}
          {onOpenPracticeChallenge && (
            <div className="mx-3 mt-5 p-3 rounded-xl bg-gradient-to-br from-[#1E2538] to-[#141A28] border border-indigo-500/30 shadow-inner">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-indigo-400 flex items-center gap-1">
                  <Box className="w-3.5 h-3.5 text-indigo-400" /> 3D Dual-View
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-mono font-medium">Ready</span>
              </div>
              <p className="text-[12px] text-gray-300 font-medium line-clamp-1 mb-2.5">
                Challenge 04: Wooden Chair
              </p>
              <button
                onClick={onOpenPracticeChallenge}
                type="button"
                className="w-full py-1.5 px-2.5 bg-[#4F46E5] hover:bg-[#4338CA] active:scale-[0.98] text-white rounded-lg text-[12px] font-semibold transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
              >
                <span>Launch 50:50 View</span>
                <span className="text-[10px] text-indigo-200">→</span>
              </button>
            </div>
          )}
        </div>

        {/* Bottom Live System Widgets */}
        <div className="p-3 border-t border-[#1F2637] flex flex-col gap-2 bg-[#0A0E17]/40">
          {/* Streak Counter */}
          <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#161D2B] border border-[#1F2637]">
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-[#F97316]" /> Learning Streak
            </span>
            <span className="text-[13px] font-bold text-[#F97316] font-mono">
              {userStats.streakDays} Days
            </span>
          </div>

          {/* Blender Bridge Status */}
          <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#161D2B] border border-emerald-500/20">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <div className="flex flex-col">
                <span className="text-[11px] font-semibold text-emerald-300 flex items-center gap-1">
                  <Cable className="w-3 h-3 text-emerald-400" /> {userStats.blenderVersion}
                </span>
                <span className="text-[9px] text-gray-400">Bridge Active (9876)</span>
              </div>
            </div>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
        </div>
      </aside>

      {/* 2. Mobile Bottom Navigation Bar (< MD screens) */}
      <nav className="flex md:hidden fixed bottom-0 left-0 right-0 h-14 bg-[#0A0E17]/95 backdrop-blur-xl border-t border-[#1F2637] z-40 items-center justify-around px-1 select-none">
        <button
          type="button"
          onClick={() => onSelectTab('home')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg transition-all ${
            currentTab === 'home' ? 'text-indigo-400' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-0.5">Home</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectTab('curriculum')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg transition-all ${
            currentTab === 'curriculum' ? 'text-indigo-400 font-semibold' : 'text-gray-400 hover:text-white'
          }`}
        >
          <BookOpen className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-0.5">Giáo trình</span>
        </button>

        {onOpenPracticeChallenge && (
          <button
            type="button"
            onClick={onOpenPracticeChallenge}
            className="flex flex-col items-center justify-center -mt-3.5 py-1 px-2.5 rounded-xl bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white shadow-lg shadow-orange-500/30 active:scale-95 transition-all"
          >
            <Box className="w-5 h-5 fill-white" />
            <span className="text-[9px] font-bold mt-0.5 uppercase tracking-tight">3D Dual</span>
          </button>
        )}

        <button
          type="button"
          onClick={() => onSelectTab('hotkeys')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg transition-all ${
            currentTab === 'hotkeys' ? 'text-indigo-400 font-semibold' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Keyboard className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-0.5">Phím tắt</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectTab('settings')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg transition-all ${
            currentTab === 'settings' ? 'text-indigo-400 font-semibold' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Settings className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-0.5">Cài đặt</span>
        </button>
      </nav>
    </>
  );
};
