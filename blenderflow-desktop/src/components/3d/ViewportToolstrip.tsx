import React from 'react';
import { 
  RotateCw, 
  Compass
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
    <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-xl bg-[#0D111A]/90 backdrop-blur-md border border-[#1E2638] shadow-xl select-none max-w-full overflow-x-auto">
      {/* Shading Mode Pills */}
      <div className="flex items-center bg-[#141A28] rounded-lg p-0.5 border border-[#1F2637] shrink-0">
        {(['solid', 'wireframe', 'xray'] as ShadingMode[]).map((mode) => (
          <button
            key={mode}
            type="button"
            onClick={() => onSelectShading(mode)}
            className={`px-2 sm:px-2.5 py-1 rounded-md text-[10px] sm:text-[11px] font-medium transition-colors cursor-pointer ${
              shadingMode === mode ? 'bg-[#253048] text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            {mode === 'solid' ? 'Solid' : mode === 'wireframe' ? 'Wire' : 'X-Ray'}
          </button>
        ))}
      </div>

      <div className="w-[1px] h-4 bg-[#1E2638] shrink-0" />

      {/* Camera Presets */}
      <div className="flex items-center bg-[#141A28] rounded-lg p-0.5 border border-[#1F2637] shrink-0">
        {[
          { id: 'front' as CameraPreset, label: '1', title: 'Mặt trước (Numpad 1)' },
          { id: 'right' as CameraPreset, label: '3', title: 'Mặt bên (Numpad 3)' },
          { id: 'top' as CameraPreset, label: '7', title: 'Từ trên (Numpad 7)' },
          { id: 'perspective' as CameraPreset, label: '3D', title: 'Phối cảnh 3D (Numpad 5)' },
        ].map((cam) => (
          <button
            key={cam.id}
            type="button"
            onClick={() => onSelectCameraPreset(cam.id)}
            title={cam.title}
            className={`px-2 py-1 rounded text-[10px] sm:text-[11px] font-mono font-semibold transition-colors cursor-pointer ${
              activeCameraPreset === cam.id ? 'bg-[#F97316] text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            {cam.label}
          </button>
        ))}
      </div>

      <div className="w-[1px] h-4 bg-[#1E2638] shrink-0" />

      {/* Auto-rotate & Reset */}
      <button
        type="button"
        onClick={onToggleAutoRotate}
        title={autoRotate ? 'Tạm dừng xoay 360°' : 'Bật xoay 360°'}
        className={`p-1.5 rounded-lg border transition-colors cursor-pointer shrink-0 ${
          autoRotate
            ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
            : 'text-gray-400 hover:text-white bg-[#141A28] border-[#1F2637]'
        }`}
      >
        <RotateCw className="w-3.5 h-3.5" />
      </button>

      <button
        type="button"
        onClick={onResetCamera}
        title="Đặt lại góc nhìn"
        className="p-1.5 rounded-lg bg-[#141A28] border border-[#1F2637] text-gray-400 hover:text-white transition-colors cursor-pointer shrink-0"
      >
        <Compass className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
