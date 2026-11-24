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
      <div className="absolute top-3 left-3 pointer-events-none z-10 select-none">
        <div className="pointer-events-auto flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-[#0F131D]/90 backdrop-blur-md border border-[#1F2637] shadow-xl">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[12px] font-bold text-white tracking-wide">
            {challengeTitle}
          </span>
          <span className="text-[10px] px-2 py-0.5 bg-indigo-500/20 text-indigo-300 rounded-md border border-indigo-500/30 font-medium">
            3D Reference Standard
          </span>
        </div>
      </div>

      {/* Bottom Floating Topology Spec HUD */}
      <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between pointer-events-none z-10 select-none">
        {/* Topology Specs Card */}
        <div className="pointer-events-auto flex items-center gap-3.5 px-4 py-2 rounded-xl bg-[#0F131D]/90 backdrop-blur-md border border-[#1F2637] shadow-2xl">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
              Vertices
            </span>
            <span className="text-[13px] font-bold font-mono text-white">
              {expectedVertices}
            </span>
          </div>

          <div className="w-[1px] h-6 bg-[#1F2637]" />

          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
              Faces (Quads)
            </span>
            <span className="text-[13px] font-bold font-mono text-emerald-400 flex items-center gap-1">
              <span>{expectedFaces}</span>
              <span className="text-[10px] text-emerald-500 font-semibold">(100%)</span>
            </span>
          </div>

          <div className="w-[1px] h-6 bg-[#1F2637]" />

          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
              N-Gons
            </span>
            <span className="text-[13px] font-bold font-mono text-indigo-300">
              {expectedNgons}
            </span>
          </div>

          <div className="w-[1px] h-6 bg-[#1F2637]" />

          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
              Target Modifiers
            </span>
            <span className="text-[11px] font-medium text-gray-300">
              {modifiers}
            </span>
          </div>
        </div>

        {/* Viewport Hints */}
        <div className="pointer-events-auto px-3 py-1.5 rounded-lg bg-[#0F131D]/80 backdrop-blur-sm border border-[#1F2637] text-[11px] text-gray-400 flex items-center gap-2">
          <span>Drag: Orbit 360°</span>
          <span>•</span>
          <span>Wheel: Zoom ({cameraDistance}m)</span>
        </div>
      </div>
    </>
  );
};
