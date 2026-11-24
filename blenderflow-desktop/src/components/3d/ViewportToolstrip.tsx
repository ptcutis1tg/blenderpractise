import React from 'react';
import { 
  RotateCw, 
  Compass, 
  Eye, 
  Layers, 
  Maximize2 
} from 'lucide-react';

export type ShadingMode = 'solid' | 'wireframe' | 'xray';
export type CameraPreset = 'perspective' | 'front' | 'right' | 'top';

interface ViewportToolstripProps {
  shadingMode: ShadingMode;
  onSelectShading: (mode: ShadingMode) => void;
  activeCameraPreset: CameraPreset;
  onSelectCameraPreset: (preset: CameraPreset) => void;
  autoRotate: boolean;
  onToggleAutoRotate: () => void;
  onResetCamera: () => void;
}

export const ViewportToolstrip: React.FC<ViewportToolstripProps> = ({
  shadingMode,
  onSelectShading,
  activeCameraPreset,
  onSelectCameraPreset,
  autoRotate,
  onToggleAutoRotate,
  onResetCamera,
}) => {
  return (
    <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#0F131D]/90 backdrop-blur-md border border-[#1F2637] shadow-xl select-none">
      {/* Shading Mode Pills */}
      <div className="flex items-center bg-[#141A28] rounded-lg p-0.5 border border-[#1F2637]">
        <button
          type="button"
          onClick={() => onSelectShading('solid')}
          className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
            shadingMode === 'solid'
              ? 'bg-[#4F46E5] text-white shadow-sm'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Solid
        </button>
        <button
          type="button"
          onClick={() => onSelectShading('wireframe')}
          className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
            shadingMode === 'wireframe'
              ? 'bg-[#4F46E5] text-white shadow-sm'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Wireframe
        </button>
        <button
          type="button"
          onClick={() => onSelectShading('xray')}
          className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
            shadingMode === 'xray'
              ? 'bg-[#4F46E5] text-white shadow-sm'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          X-Ray
        </button>
      </div>

      <div className="w-[1px] h-4 bg-[#1F2637]" />

      {/* Blender Numpad View Presets */}
      <div className="flex items-center bg-[#141A28] rounded-lg p-0.5 border border-[#1F2637]">
        <button
          type="button"
          onClick={() => onSelectCameraPreset('front')}
          title="Front Ortho View (Numpad 1)"
          className={`px-2 py-1 rounded text-[11px] font-mono font-bold transition-all cursor-pointer ${
            activeCameraPreset === 'front'
              ? 'bg-[#F97316] text-white shadow-sm'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Front (1)
        </button>
        <button
          type="button"
          onClick={() => onSelectCameraPreset('right')}
          title="Right Ortho View (Numpad 3)"
          className={`px-2 py-1 rounded text-[11px] font-mono font-bold transition-all cursor-pointer ${
            activeCameraPreset === 'right'
              ? 'bg-[#F97316] text-white shadow-sm'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Right (3)
        </button>
        <button
          type="button"
          onClick={() => onSelectCameraPreset('top')}
          title="Top Ortho View (Numpad 7)"
          className={`px-2 py-1 rounded text-[11px] font-mono font-bold transition-all cursor-pointer ${
            activeCameraPreset === 'top'
              ? 'bg-[#F97316] text-white shadow-sm'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Top (7)
        </button>
        <button
          type="button"
          onClick={() => onSelectCameraPreset('perspective')}
          title="Perspective Orbit (Numpad 5)"
          className={`px-2 py-1 rounded text-[11px] font-mono font-bold transition-all cursor-pointer ${
            activeCameraPreset === 'perspective'
              ? 'bg-[#4F46E5] text-white shadow-sm'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          3D (5)
        </button>
      </div>

      <div className="w-[1px] h-4 bg-[#1F2637]" />

      {/* Auto-rotate button */}
      <button
        type="button"
        onClick={onToggleAutoRotate}
        title={autoRotate ? 'Pause 360° Orbit' : 'Resume 360° Orbit'}
        className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
          autoRotate
            ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
            : 'text-gray-400 hover:text-white bg-[#141A28] border-[#1F2637]'
        }`}
      >
        <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} />
      </button>

      {/* Reset Camera button */}
      <button
        type="button"
        onClick={onResetCamera}
        title="Reset Camera View to Default"
        className="p-1.5 rounded-lg bg-[#141A28] border border-[#1F2637] text-gray-400 hover:text-white transition-all cursor-pointer"
      >
        <Compass className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
