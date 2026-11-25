import React, { useState, useRef, useEffect } from 'react';
import { 
  Minus, 
  Square, 
  X, 
  Search, 
  RefreshCw, 
  Layers, 
  ChevronRight,
  ExternalLink,
  Cloud,
  User as UserIcon,
  LogOut,
  CheckCircle2,
  CloudUpload
} from 'lucide-react';
import { UserProfile } from '../../services/supabaseClient';

interface DesktopTitlebarProps {
  breadcrumbs: string[];
  userProfile?: UserProfile | null;
  onOpenSearch?: () => void;
  onSyncBlender?: () => void;
  onOpenAuthModal?: () => void;
  onSignOut?: () => void;
  onManualCloudSync?: () => void;
  isSyncing?: boolean;
  isCloudSyncing?: boolean;
}

export const DesktopTitlebar: React.FC<DesktopTitlebarProps> = ({
  breadcrumbs,
  userProfile,
  onOpenSearch,
  onSyncBlender,
  onOpenAuthModal,
  onSignOut,
  onManualCloudSync,
  isSyncing = false,
  isCloudSyncing = false,
}) => {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowUserDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-11 bg-[#0F131D] border-b border-[#1F2637] flex items-center justify-between px-4 z-20 select-none">
      {/* Breadcrumb Context */}
      <div className="flex items-center gap-2 text-[13px] overflow-hidden whitespace-nowrap">
        <div className="flex items-center gap-1.5 text-gray-400">
          <Layers className="w-3.5 h-3.5 text-indigo-400" />
          <span className="font-semibold text-gray-300">BlenderFlow</span>
        </div>
        {breadcrumbs.map((crumb, idx) => (
          <React.Fragment key={idx}>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span
              className={`truncate max-w-[280px] ${
                idx === breadcrumbs.length - 1
                  ? 'text-white font-medium bg-[#1F2637]/60 px-2 py-0.5 rounded border border-[#2B354D]'
                  : 'text-gray-400 hover:text-gray-200 cursor-pointer'
              }`}
            >
              {crumb}
            </span>
          </React.Fragment>
        ))}
      </div>

      {/* Center / Action Area: Quick Search & Blender Actions */}
      <div className="flex items-center gap-2.5">
        {/* Global Search Trigger */}
        <button
          onClick={onOpenSearch}
          type="button"
          className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-[#161D2B] border border-[#1F2637] text-gray-400 hover:text-gray-200 hover:border-gray-600 text-[12px] transition-all"
        >
          <Search className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Search hotkeys & lessons...</span>
          <kbd className="px-1.5 py-0.2 bg-[#0B0F19] text-[10px] text-gray-400 rounded border border-[#1F2637]">
            Ctrl K
          </kbd>
        </button>

        {/* Sync Blender Button */}
        {onSyncBlender && (
          <button
            onClick={onSyncBlender}
            type="button"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#1E2538] hover:bg-[#252E45] text-indigo-300 border border-indigo-500/30 text-[12px] font-medium transition-all cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-orange-400' : 'text-indigo-400'}`} />
            <span className="hidden sm:inline">Sync Mesh</span>
          </button>
        )}

        {/* Supabase Auth / Profile Button */}
        {userProfile ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              type="button"
              className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-[#1A2338] hover:bg-[#222E4A] border border-indigo-500/30 text-white text-[12px] font-medium transition cursor-pointer"
            >
              <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white flex items-center justify-center text-[10px] font-bold">
                {userProfile.displayName ? userProfile.displayName.charAt(0).toUpperCase() : 'U'}
              </div>
              <span className="hidden sm:inline max-w-[110px] truncate">{userProfile.displayName}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-emerald-400/20" title="Cloud Sync Active" />
            </button>

            {/* Profile Dropdown */}
            {showUserDropdown && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl bg-[#111726] border border-[#273553] shadow-2xl py-1.5 z-50 animate-fade-in text-xs">
                <div className="px-3.5 py-2 border-b border-[#202B44]">
                  <p className="font-semibold text-white truncate">{userProfile.displayName}</p>
                  <p className="text-[11px] text-slate-400 truncate">{userProfile.email}</p>
                  <div className="flex items-center gap-1 text-[10px] text-emerald-400 mt-1">
                    <CheckCircle2 size={12} />
                    <span>Supabase Cloud Connected</span>
                  </div>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      setShowUserDropdown(false);
                      onManualCloudSync?.();
                    }}
                    className="w-full text-left px-3.5 py-2 text-slate-300 hover:text-white hover:bg-[#1E293B] flex items-center gap-2 transition"
                  >
                    <CloudUpload size={14} className={isCloudSyncing ? 'animate-spin text-indigo-400' : 'text-indigo-400'} />
                    <span>{isCloudSyncing ? 'Đang đồng bộ...' : 'Đồng bộ tiến độ lên Cloud'}</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowUserDropdown(false);
                      onSignOut?.();
                    }}
                    className="w-full text-left px-3.5 py-2 text-red-400 hover:bg-red-500/10 flex items-center gap-2 transition"
                  >
                    <LogOut size={14} />
                    <span>Đăng xuất tài khoản</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={onOpenAuthModal}
            type="button"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gradient-to-r from-blue-600/20 to-indigo-600/20 hover:from-blue-600/30 hover:to-indigo-600/30 border border-indigo-500/40 text-indigo-300 hover:text-white text-[12px] font-medium transition cursor-pointer"
          >
            <Cloud className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">Đăng nhập Cloud</span>
          </button>
        )}

        {/* Window Controls (Desktop only) */}
        <div className="hidden md:flex items-center ml-1 border-l border-[#1F2637] pl-2 gap-0.5">
          <button
            type="button"
            title="Minimize"
            className="w-7 h-7 flex items-center justify-center rounded text-gray-400 hover:text-white hover:bg-[#1E2538] transition-colors"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            title="Maximize"
            className="w-7 h-7 flex items-center justify-center rounded text-gray-400 hover:text-white hover:bg-[#1E2538] transition-colors"
          >
            <Square className="w-3 h-3" />
          </button>
          <button
            type="button"
            title="Close"
            className="w-7 h-7 flex items-center justify-center rounded text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
