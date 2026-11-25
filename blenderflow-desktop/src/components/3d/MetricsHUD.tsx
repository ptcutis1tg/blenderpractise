import React from 'react';

interface MetricsHUDProps {
  challengeTitle: string;
  expectedVertices: number;
  expectedFaces: number;
  expectedNgons?: number;
  isPreviewStats?: boolean;
  modifiers?: string;
  cameraDistance?: number;
}

export const MetricsHUD: React.FC<MetricsHUDProps> = ({
  challengeTitle,
  expectedVertices,
  expectedFaces,
  isPreviewStats = false,
}) => {
  return (
    <div className="absolute top-3 left-3 pointer-events-none z-10 select-none max-w-[calc(100%-24px)]">
      <div className="pointer-events-auto inline-flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-[#0D111A]/85 backdrop-blur-md border border-[#1E2638] text-[12px]">
        <span className="w-2 h-2 rounded-full bg-[#F97316] shrink-0" />
        <span className="font-semibold text-white truncate max-w-[180px] sm:max-w-[260px]">
          {challengeTitle}
        </span>
        <span className="text-gray-600">•</span>
        <span className="font-mono text-[11px] text-gray-300 shrink-0">
          {expectedVertices} {isPreviewStats ? 'Verts (mẫu)' : 'Verts'} • {expectedFaces}{' '}
          {isPreviewStats ? 'Tris' : 'Quads'}
        </span>
      </div>
    </div>
  );
};
