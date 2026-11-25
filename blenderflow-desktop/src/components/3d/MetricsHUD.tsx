import React from 'react';
import { 
  Box, 
  Layers, 
  CheckCircle2, 
  Info,
  ShieldCheck
} from 'lucide-react';

interface MetricsHUDProps {
  challengeTitle: string;
  expectedVertices: number;
  expectedFaces: number;
  expectedNgons?: number;
  modifiers: string;
  cameraDistance: number;
}

export const MetricsHUD: React.FC<MetricsHUDProps> = ({
  challengeTitle,
  expectedVertices,
  expectedFaces,
  expectedNgons = 0,
  modifiers,
  cameraDistance,
}) => {
  return (
    <>
      {/* Top Left Floating Target Badge */}
      <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 pointer-events-none z-10 select-none max-w-[calc(100%-20px)] sm:max-w-[45%]">
        <div className="pointer-events-auto flex items-center gap-2 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-xl bg-[#0F131D]/90 backdrop-blur-md border border-[#1F2637] shadow-xl">
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="text-[11px] sm:text-[12px] font-bold text-white tracking-wide truncate">
            {challengeTitle}
          </span>
          <span className="hidden md:inline-block text-[10px] px-2 py-0.5 bg-indigo-500/20 text-indigo-300 rounded-md border border-indigo-500/30 font-medium shrink-0">
            3D Reference Standard
          </span>
        </div>
      </div>

      {/* Bottom Floating Topology Spec HUD */}
      <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3 sm:left-3 sm:right-3 flex items-end justify-between gap-2 pointer-events-none z-10 select-none">
        {/* Topology Specs Card */}
        <div className="pointer-events-auto flex items-center gap-2.5 sm:gap-3.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-[#0F131D]/90 backdrop-blur-md border border-[#1F2637] shadow-2xl overflow-x-auto max-w-full">
          <div className="flex flex-col shrink-0">
            <span className="text-[9px] sm:text-[10px] uppercase font-bold text-gray-400 tracking-wider">
              Vertices
            </span>
            <span className="text-[12px] sm:text-[13px] font-bold font-mono text-white">
              {expectedVertices}
            </span>
          </div>

          <div className="w-[1px] h-5 sm:h-6 bg-[#1F2637] shrink-0" />

          <div className="flex flex-col shrink-0">
            <span className="text-[9px] sm:text-[10px] uppercase font-bold text-gray-400 tracking-wider">
              Quads
            </span>
            <span className="text-[12px] sm:text-[13px] font-bold font-mono text-emerald-400 flex items-center gap-1">
              <span>{expectedFaces}</span>
              <span className="hidden sm:inline text-[10px] text-emerald-500 font-semibold">(100%)</span>
            </span>
          </div>

          <div className="w-[1px] h-5 sm:h-6 bg-[#1F2637] shrink-0" />

          <div className="flex flex-col shrink-0">
            <span className="text-[9px] sm:text-[10px] uppercase font-bold text-gray-400 tracking-wider">
              N-Gons
            </span>
            <span className="text-[12px] sm:text-[13px] font-bold font-mono text-indigo-300">
              {expectedNgons}
            </span>
          </div>

          <div className="hidden sm:block w-[1px] h-6 bg-[#1F2637] shrink-0" />

          <div className="hidden sm:flex flex-col shrink-0">
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
              Target Modifiers
            </span>
            <span className="text-[11px] font-medium text-gray-300">
              {modifiers}
            </span>
          </div>
        </div>

        {/* Viewport Hints (Desktop only) */}
        <div className="hidden lg:flex pointer-events-auto px-3 py-1.5 rounded-lg bg-[#0F131D]/80 backdrop-blur-sm border border-[#1F2637] text-[11px] text-gray-400 items-center gap-2 shrink-0">
          <span>Drag: Orbit 360°</span>
          <span>•</span>
          <span>Wheel: Zoom ({cameraDistance}m)</span>
        </div>
      </div>
    </>
  );
};
