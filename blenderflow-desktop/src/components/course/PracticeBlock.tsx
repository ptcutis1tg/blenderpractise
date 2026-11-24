import React from 'react';
import { 
  Box, 
  Keyboard, 
  FileCode, 
  Play, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2,
  Download
} from 'lucide-react';
import { PracticeTask } from '../../types';

interface PracticeBlockProps {
  practiceTasks: PracticeTask[];
  moduleTitle: string;
  onOpenChallenge: (taskId: string) => void;
  onLaunchHotkeyDrill: () => void;
  onOpenStarterBlend?: (fileName: string) => void;
}

export const PracticeBlock: React.FC<PracticeBlockProps> = ({
  practiceTasks,
  moduleTitle,
  onOpenChallenge,
  onLaunchHotkeyDrill,
  onOpenStarterBlend,
}) => {
  const challengeTask = practiceTasks.find((t) => t.type === '3d_challenge');
  const starterFileName = challengeTask?.blendFileName || 'starter_template.blend';

  return (
    <div className="mt-4 pt-3.5 border-t border-[#1F2637] flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-[11px] uppercase tracking-wider font-bold text-gray-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#F97316]" />
          Hands-On Module Practice ({practiceTasks.length} Exercises)
        </span>
        <span className="text-[10px] text-gray-500 font-mono">Recommended after completing lessons</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Card 1: Hotkey Speed Drill */}
        <div 
          onClick={onLaunchHotkeyDrill}
          className="p-3.5 rounded-xl bg-[#141A28] border border-[#1F2637] hover:border-indigo-500/40 hover:bg-[#1A2234] transition-all cursor-pointer flex flex-col justify-between group"
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <Keyboard className="w-3.5 h-3.5" />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded bg-indigo-500/15 text-indigo-300">
                Drill
              </span>
            </div>
            <h4 className="text-[13px] font-bold text-white group-hover:text-indigo-300 transition-colors">
              Hotkey Muscle Memory
            </h4>
            <p className="text-[11px] text-gray-400 line-clamp-2">
              Practice key combinations for this module with zero mouse clicks.
            </p>
          </div>

          <div className="mt-3 pt-2.5 border-t border-[#1F2637]/60 flex items-center justify-between text-[11px] text-indigo-400 font-semibold">
            <span>Start Speed Drill</span>
            <span className="text-gray-400 group-hover:translate-x-0.5 transition-transform">→</span>
          </div>
        </div>

        {/* Card 2: 3D Challenge (50:50 Dual-View) */}
        {challengeTask ? (
          <div 
            onClick={() => onOpenChallenge(challengeTask.id)}
            className="p-3.5 rounded-xl bg-gradient-to-br from-[#1E2538] to-[#141A28] border border-orange-500/35 hover:border-orange-500/60 shadow-lg shadow-orange-950/20 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="w-7 h-7 rounded-lg bg-[#F97316] flex items-center justify-center text-white shadow-md shadow-orange-500/25">
                  <Box className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded bg-orange-500/20 text-[#FB923C] border border-orange-500/30">
                  50:50 Dual-View
                </span>
              </div>
              <h4 className="text-[13px] font-bold text-white group-hover:text-orange-300 transition-colors line-clamp-1">
                {challengeTask.title}
              </h4>
              <p className="text-[11px] text-gray-400 line-clamp-2">
                Side-by-side 3D model inspector with task checklist & Blender bridge sync.
              </p>
            </div>

            <div className="mt-3 pt-2.5 border-t border-[#1F2637]/60 flex items-center justify-between text-[11px] text-[#F97316] font-bold">
              <span className="flex items-center gap-1">
                <Play className="w-3 h-3 fill-current" /> Launch 50:50 View
              </span>
              <span className="text-orange-300 group-hover:translate-x-0.5 transition-transform">→</span>
            </div>
          </div>
        ) : (
          <div className="p-3.5 rounded-xl bg-[#121622]/50 border border-[#1F2637]/50 flex flex-col justify-between opacity-60">
            <div className="flex flex-col gap-2">
              <div className="w-7 h-7 rounded-lg bg-gray-800 flex items-center justify-center text-gray-500">
                <Box className="w-3.5 h-3.5" />
              </div>
              <h4 className="text-[13px] font-bold text-gray-400">3D Challenge Coming Soon</h4>
              <p className="text-[11px] text-gray-500">Completed in subsequent modules.</p>
            </div>
          </div>
        )}

        {/* Card 3: Open Starter .blend */}
        <div 
          onClick={() => onOpenStarterBlend?.(starterFileName)}
          className="p-3.5 rounded-xl bg-[#141A28] border border-[#1F2637] hover:border-emerald-500/40 hover:bg-[#1A2234] transition-all cursor-pointer flex flex-col justify-between group"
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <FileCode className="w-3.5 h-3.5" />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded bg-emerald-500/15 text-emerald-300">
                Starter Asset
              </span>
            </div>
            <h4 className="text-[13px] font-bold text-white group-hover:text-emerald-300 transition-colors truncate">
              {starterFileName}
            </h4>
            <p className="text-[11px] text-gray-400 line-clamp-2">
              Pre-configured project file with correct scale units, reference cameras, and setup.
            </p>
          </div>

          <div className="mt-3 pt-2.5 border-t border-[#1F2637]/60 flex items-center justify-between text-[11px] text-emerald-400 font-semibold">
            <span className="flex items-center gap-1">
              <ExternalLink className="w-3 h-3" /> Open in Blender 5.3
            </span>
            <span className="text-gray-400 group-hover:translate-x-0.5 transition-transform">↗</span>
          </div>
        </div>
      </div>
    </div>
  );
};
