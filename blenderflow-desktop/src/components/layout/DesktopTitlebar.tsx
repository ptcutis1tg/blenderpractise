import React, { useState, useRef, useEffect } from 'react';
import { 
  Square, 
  Search, 
  Layers, 
  ChevronRight,
  Cloud,
  LogOut,
  CheckCircle2,
  CloudUpload
} from 'lucide-react';
import { UserProfile } from '../../services/supabaseClient';

interface DesktopTitlebarProps {
  breadcrumbs: string[];
  userProfile?: UserProfile | null;
  onOpenSearch?: () => void;
  onOpenAuthModal?: () => void;
  onSignOut?: () => void;
  onManualCloudSync?: () => void;
  isCloudSyncing?: boolean;
}

export const DesktopTitlebar: React.FC<DesktopTitlebarProps> = ({
  breadcrumbs,
  userProfile,
  onOpenSearch,
  onOpenAuthModal,
  onSignOut,
  onManualCloudSync,
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
    <header className="h-11 bg-[#0D111A] border-b border-[#1C2333] flex items-center justify-between px-4 z-20 select-none shrink-0">
      {/* 1. Breadcrumb Context */}
      <div className="flex items-center gap-2 text-[13px] overflow-hidden whitespace-nowrap">
        <div className="flex items-center gap-1.5 text-gray-400 md:hidden">
          <Layers className="w-3.5 h-3.5 text-[#F97316]" />
          <span className="font-semibold text-gray-200">BlenderFlow</span>
        </div>
        {breadcrumbs.map((crumb, idx) => (
          <React.Fragment key={idx}>
            {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-gray-500 shrink-0" />}
            <span
              className={`truncate max-w-[240px] ${
                idx === breadcrumbs.length - 1
                  ? 'text-white font-medium'
                  : 'text-gray-400 hidden sm:inline'
              }`}
            >
              {crumb}
            </span>
          </React.Fragment>
        ))}
      </div>

      {/* 2. Search + 3. Cloud Account */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={onOpenSearch}
          type="button"
          className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-[#141A28] border border-[#222B40] text-gray-400 hover:text-white hover:border-gray-600 text-[12px] transition-colors cursor-pointer"
        >
          <Search className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Tìm bài học, phím tắt...</span>
          <kbd className="px-1.5 py-0.2 bg-[#0B0F19] text-[10px] text-gray-400 rounded border border-[#1F2637]">
            Ctrl K
          </kbd>
        </button>

        {userProfile ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              type="button"
              className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-[#141A28] hover:bg-[#1B2234] border border-[#253048] text-white text-[12px] font-medium transition-colors cursor-pointer"
            >
              <div className="w-5 h-5 rounded-full bg-[#F97316] text-white flex items-center justify-center text-[10px] font-bold">
                {userProfile.displayName ? userProfile.displayName.charAt(0).toUpperCase() : 'U'}
              </div>
              <span className="hidden sm:inline max-w-[110px] truncate">{userProfile.displayName}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" title="Đã kết nối Supabase Cloud" />
            </button>

            {showUserDropdown && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl bg-[#111726] border border-[#273553] shadow-2xl py-1.5 z-50 text-xs">
                <div className="px-3.5 py-2 border-b border-[#202B44]">
                  <p className="font-semibold text-white truncate">{userProfile.displayName}</p>
                  <p className="text-[11px] text-slate-400 truncate">{userProfile.email}</p>
                  <div className="flex items-center gap-1 text-[10px] text-emerald-400 mt-1">
                    <CheckCircle2 size={12} />
                    <span>Đã đồng bộ Supabase</span>
                  </div>
                </div>

                <div className="py-1">
                  <button
                    type="button"
                    onClick={() => {
                      setShowUserDropdown(false);
                      onManualCloudSync?.();
                    }}
                    className="w-full text-left px-3.5 py-2 text-slate-300 hover:text-white hover:bg-[#1E293B] flex items-center gap-2 transition cursor-pointer"
                  >
                    <CloudUpload size={14} className={isCloudSyncing ? 'animate-spin text-[#F97316]' : 'text-[#F97316]'} />
                    <span>{isCloudSyncing ? 'Đang đồng bộ...' : 'Đồng bộ tiến độ ngay'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowUserDropdown(false);
                      onSignOut?.();
                    }}
                    className="w-full text-left px-3.5 py-2 text-red-400 hover:bg-red-500/10 flex items-center gap-2 transition cursor-pointer"
                  >
                    <LogOut size={14} />
                    <span>Đăng xuất</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={onOpenAuthModal}
            type="button"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#141A28] hover:bg-[#1B2336] border border-[#253048] text-gray-200 hover:text-white text-[12px] font-medium transition-colors cursor-pointer"
          >
            <Cloud className="w-3.5 h-3.5 text-[#F97316]" />
            <span className="hidden sm:inline">Đăng nhập Cloud</span>
          </button>
        )}

        <button
          type="button"
          title="Toàn màn hình"
          onClick={() => {
            if (!document.fullscreenElement) {
              document.documentElement.requestFullscreen().catch(() => {});
            } else {
              document.exitFullscreen().catch(() => {});
            }
          }}
          className="hidden md:flex w-7 h-7 items-center justify-center rounded text-gray-400 hover:text-white hover:bg-[#1B2234] transition-colors cursor-pointer"
        >
          <Square className="w-3 h-3" />
        </button>
      </div>
    </header>
  );
};
