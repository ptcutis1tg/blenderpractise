import React from 'react';
import { 
  Minus, 
  Square, 
  X, 
  Search, 
  RefreshCw, 
  Layers, 
  ChevronRight,
  ExternalLink
} from 'lucide-react';

interface DesktopTitlebarProps {
  breadcrumbs: string[];
  onOpenSearch?: () => void;
  onSyncBlender?: () => void;
  isSyncing?: boolean;
}

export const DesktopTitlebar: React.FC<DesktopTitlebarProps> = ({
  breadcrumbs,
  onOpenSearch,
  onSyncBlender,
  isSyncing = false,
}) => {
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
      <div className="flex items-center gap-3">
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

        {/* Window Controls (Desktop only) */}
        <div className="hidden md:flex items-center ml-2 border-l border-[#1F2637] pl-2 gap-0.5">
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
