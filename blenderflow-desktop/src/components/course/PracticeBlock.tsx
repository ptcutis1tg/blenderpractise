import React from 'react';
import { 
  Box, 
  Keyboard, 
  FileCode, 
  Play, 
  ExternalLink
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
  const challengeTask = practiceTasks.find((t) => t.type === '3d_challenge') || practiceTasks[0];
  const starterFileName = challengeTask?.blendFileName || 'challenge_04_chair_starter.blend';

  return (
    <div className="mt-4 pt-3.5 border-t border-[#1C2333] flex flex-col gap-3">
      <span className="text-[11px] uppercase tracking-wider font-semibold text-gray-400">
        Thực hành sau bài học ({practiceTasks.length} bài tập)
      </span>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Card 1: Luyện Phím Tắt */}
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
              Luyện Phản xạ Phím tắt
            </h4>
            <p className="text-[11px] text-gray-400 line-clamp-2">
              Tra cứu và kiểm tra gõ nhanh các phím tắt Blender 5.3.
            </p>
          </div>

          <div className="mt-3 pt-2.5 border-t border-[#1C2333] flex items-center justify-between text-[11px] text-gray-300 font-medium">
            <span>Mở bảng phím tắt</span>
            <span>→</span>
          </div>
        </div>

        {/* Card 2: Thực hành 3D 50:50 */}
        {challengeTask ? (
          <div 
            onClick={() => onOpenChallenge(challengeTask.id)}
            className="p-3.5 rounded-xl bg-[#141A28] border border-[#F97316]/35 hover:border-[#F97316] transition-colors cursor-pointer flex flex-col justify-between group"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <Box className="w-4 h-4 text-[#F97316]" />
                <span className="text-[10px] uppercase font-semibold text-[#F97316]">50:50 Dual-View</span>
              </div>
              <h4 className="text-[13px] font-bold text-white line-clamp-1">
                {challengeTask.title}
              </h4>
              <p className="text-[11px] text-gray-400 line-clamp-2">
                Đối chiếu mô hình 3D song song cùng checklist từng bước & chấm điểm lưới.
              </p>
            </div>

            <div className="mt-3 pt-2.5 border-t border-[#1C2333] flex items-center justify-between text-[11px] text-[#F97316] font-semibold">
              <span className="flex items-center gap-1">
                <Play className="w-3 h-3 fill-current" /> Vào phòng thực hành 3D
              </span>
              <span>→</span>
            </div>
          </div>
        ) : (
          <div className="p-3.5 rounded-xl bg-[#121723]/50 border border-[#1C2333] flex flex-col justify-between opacity-60">
            <div className="flex flex-col gap-2">
              <Box className="w-4 h-4 text-gray-500" />
              <h4 className="text-[13px] font-bold text-gray-400">Chưa có bài 3D riêng</h4>
              <p className="text-[11px] text-gray-500">Hoàn thành lý thuyết và thực hành tự do trong Blender.</p>
            </div>
          </div>
        )}

        {/* Card 3: Mở file mẫu .blend */}
        {challengeTask?.blendFileName ? (
          <div 
            onClick={() => onOpenStarterBlend?.(starterFileName)}
            className="p-3.5 rounded-xl bg-[#121723] border border-[#1E2638] hover:border-[#2C3752] transition-colors cursor-pointer flex flex-col justify-between group"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <FileCode className="w-4 h-4 text-emerald-400" />
                <span className="text-[10px] uppercase font-semibold text-emerald-400">File mẫu</span>
              </div>
              <h4 className="text-[13px] font-bold text-white truncate">
                {starterFileName}
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
        ) : (
          <div className="p-3.5 rounded-xl bg-[#121723]/50 border border-[#1C2333] flex flex-col justify-between opacity-60">
            <div className="flex flex-col gap-2">
              <FileCode className="w-4 h-4 text-gray-500" />
              <h4 className="text-[13px] font-bold text-gray-400">Không cần file mẫu</h4>
              <p className="text-[11px] text-gray-500">Khởi tạo scene mới mặc định trong Blender.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
