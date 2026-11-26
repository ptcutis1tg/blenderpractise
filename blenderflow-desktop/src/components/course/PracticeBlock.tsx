import React from 'react';
import { 
  Box, 
  Keyboard, 
  FileCode, 
  Play, 
  ExternalLink,
  CheckCircle2
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
  onOpenChallenge,
  onLaunchHotkeyDrill,
  onOpenStarterBlend,
}) => {
  const starterTask = practiceTasks.find((t) => Boolean(t.blendFileName));

  return (
    <div className="mt-4 pt-3.5 border-t border-[#1C2333] flex flex-col gap-3">
      <span className="text-[11px] uppercase tracking-wider font-semibold text-gray-400">
        Thực hành 3D cho học phần ({practiceTasks.length} thử thách)
      </span>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Render ALL 3D practice challenges inside this module */}
        {practiceTasks.map((task) => (
          <div
            key={task.id}
            onClick={() => onOpenChallenge(task.id)}
            className="p-3.5 rounded-xl bg-[#141A28] border border-[#F97316]/35 hover:border-[#F97316] transition-colors cursor-pointer flex flex-col justify-between group"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <Box className="w-4 h-4 text-[#F97316]" />
                {task.isCompleted ? (
                  <span className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Hoàn thành
                  </span>
                ) : (
                  <span className="text-[10px] uppercase font-semibold text-[#F97316]">50:50 Dual-View</span>
                )}
              </div>
              <h4 className="text-[13px] font-bold text-white line-clamp-1">
                {task.title}
              </h4>
              <p className="text-[11px] text-gray-400 line-clamp-2">
                {task.checklist.length} bước thực hành • Mục tiêu {task.expectedVertices || 'tự do'} Verts
              </p>
            </div>

            <div className="mt-3 pt-2.5 border-t border-[#1C2333] flex items-center justify-between text-[11px] text-[#F97316] font-semibold">
              <span className="flex items-center gap-1">
                <Play className="w-3 h-3 fill-current" /> Vào phòng thực hành 3D
              </span>
              <span>→</span>
            </div>
          </div>
        ))}

        {/* Starter .blend Quick Card if module provides a starter asset */}
        {starterTask?.blendFileName && (
          <div
            onClick={() => onOpenStarterBlend?.(starterTask.blendFileName!)}
            className="p-3.5 rounded-xl bg-[#121723] border border-[#1E2638] hover:border-[#2C3752] transition-colors cursor-pointer flex flex-col justify-between group"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <FileCode className="w-4 h-4 text-emerald-400" />
                <span className="text-[10px] uppercase font-semibold text-emerald-400">File mẫu</span>
              </div>
              <h4 className="text-[13px] font-bold text-white truncate">
                {starterTask.blendFileName}
              </h4>
              <p className="text-[11px] text-gray-400 line-clamp-2">
                File .blend dựng sẵn camera, ánh sáng và đơn vị chuẩn hệ mét.
              </p>
            </div>

            <div className="mt-3 pt-2.5 border-t border-[#1C2333] flex items-center justify-between text-[11px] text-emerald-400 font-medium">
              <span className="flex items-center gap-1">
                <ExternalLink className="w-3 h-3" /> Mở trong Blender 5.3
              </span>
              <span>↗</span>
            </div>
          </div>
        )}

        {/* Hotkey Drill Quick Card */}
        <div
          onClick={onLaunchHotkeyDrill}
          className="p-3.5 rounded-xl bg-[#121723] border border-[#1E2638] hover:border-[#2C3752] transition-colors cursor-pointer flex flex-col justify-between group"
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Keyboard className="w-4 h-4 text-gray-400" />
              <span className="text-[10px] uppercase font-semibold text-gray-500">Phím tắt</span>
            </div>
            <h4 className="text-[13px] font-bold text-white group-hover:text-[#F97316] transition-colors">
              Tra cứu & Thử Phím tắt
            </h4>
            <p className="text-[11px] text-gray-400 line-clamp-2">
              Kiểm tra phản xạ gõ tổ hợp phím Blender 5.3 trực tiếp.
            </p>
          </div>

          <div className="mt-3 pt-2.5 border-t border-[#1C2333] flex items-center justify-between text-[11px] text-gray-300 font-medium">
            <span>Mở bảng phím tắt</span>
            <span>→</span>
          </div>
        </div>
      </div>
    </div>
  );
};
