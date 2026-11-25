import React, { useState } from 'react';
import { 
  Compass, 
  Box, 
  Clock, 
  ArrowRight, 
  BookOpen
} from 'lucide-react';
import { Roadmap, UserStats } from '../types';
import { KeycapBadge } from '../components/common/KeycapBadge';

interface HomeDashboardViewProps {
  roadmaps: Roadmap[];
  userStats: UserStats;
  bridgeConnected?: boolean;
  isWebMode?: boolean;
  onSelectRoadmap: (roadmapId: string) => void;
  onOpenPracticeChallenge: (taskId: string) => void;
  onNavigateHotkeys: () => void;
  onNavigateCurriculum?: () => void;
}

type RoadmapStatusFilter = 'all' | 'in_progress' | 'completed';

export const HomeDashboardView: React.FC<HomeDashboardViewProps> = ({
  roadmaps,
  userStats,
  onSelectRoadmap,
  onOpenPracticeChallenge,
  onNavigateCurriculum,
}) => {
  const [statusFilter, setStatusFilter] = useState<RoadmapStatusFilter>('all');

  const activeRoadmap = roadmaps.find((r) => r.progressPercent > 0 && r.progressPercent < 100) || roadmaps[0];
  const activeTasks = activeRoadmap?.modules.flatMap((m) => m.practiceTasks) || [];
  const nextPracticeTask = activeTasks.find((t) => !t.isCompleted) || activeTasks[0];
  const fallbackTaskId = nextPracticeTask?.id || 'task-chair-01';
  const nextChallengeTitle = nextPracticeTask?.title || activeRoadmap?.currentLessonTitle || 'Challenge 04: Low-Poly Stylized Wooden Chair';

  const totalCompletedLessons = roadmaps.reduce((acc, r) => acc + r.completedLessons, 0);
  const totalLessons = roadmaps.reduce((acc, r) => acc + r.totalLessons, 0);
  const overallPercentage = totalLessons > 0 ? Math.round((totalCompletedLessons / totalLessons) * 100) : 0;

  const filteredRoadmaps = roadmaps.filter((rm) => {
    if (statusFilter === 'in_progress') return rm.progressPercent > 0 && rm.progressPercent < 100;
    if (statusFilter === 'completed') return rm.progressPercent === 100;
    return true;
  });

  return (
    <div className="flex-1 h-full overflow-y-auto bg-[#0B0F19] text-[#dfe2f1] p-6 lg:p-8 select-none">
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        {/* Clean Minimal Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#1C2333] pb-5">
          <div>
            <h1 className="font-['Space_Grotesk'] text-2xl font-bold text-white tracking-tight">
              Tổng quan Học tập
            </h1>
            <p className="text-[13px] text-gray-400 mt-1">
              Lộ trình thực hành Blender 5.3 theo chuẩn Quad Topology.
            </p>
          </div>
          <div className="text-[12px] text-gray-400 font-mono">
            Tiến độ tổng: <span className="text-white font-semibold">{overallPercentage}%</span> • Chuỗi học:{' '}
            <span className="text-[#F97316] font-semibold">{userStats.streakDays} ngày</span>
          </div>
        </div>

        {/* 1. Primary Hero Card: Continue Learning */}
        {activeRoadmap && (
          <div className="rounded-2xl bg-[#121723] border border-[#222B3F] p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex-1 flex flex-col gap-3">
              <div className="flex items-center gap-2.5 text-[12px] text-gray-400">
                <span className="font-semibold text-[#F97316]">{activeRoadmap.category}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {activeRoadmap.lastStudied}
                </span>
              </div>

              <h2 className="font-['Space_Grotesk'] text-xl font-bold text-white tracking-tight">
                {activeRoadmap.title}
              </h2>

              <p className="text-[13px] text-gray-300 max-w-xl leading-relaxed">
                Bài thực hành tiếp theo: <strong className="text-white font-semibold">{nextChallengeTitle}</strong>.
              </p>

              <div className="flex items-center gap-2 pt-0.5 flex-wrap">
                <span className="text-[11px] text-gray-400">Phím tắt trọng tâm:</span>
                {['Tab', 'Ctrl + R', 'E', 'Ctrl + B'].map((hk, i) => (
                  <KeycapBadge key={i} keys={hk} variant="default" size="sm" />
                ))}
              </div>

              <div className="flex flex-col gap-1.5 max-w-md mt-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-gray-400">Tiến độ lộ trình</span>
                  <span className="text-gray-200 font-mono">
                    {activeRoadmap.progressPercent}% ({activeRoadmap.completedLessons}/{activeRoadmap.totalLessons})
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#0B0F19] overflow-hidden">
                  <div
                    className="h-full bg-[#F97316] rounded-full transition-all duration-300"
                    style={{ width: `${activeRoadmap.progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Single Primary Orange CTA + Neutral Secondary CTA */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 w-full lg:w-auto shrink-0">
              <button
                onClick={() => onOpenPracticeChallenge(fallbackTaskId)}
                type="button"
                className="py-2.5 px-5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold text-[13px] flex items-center justify-center gap-2 transition-colors active:scale-[0.98] cursor-pointer"
              >
                <Box className="w-4 h-4" />
                <span>Tiếp tục Thực hành 3D</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onSelectRoadmap(activeRoadmap.id)}
                type="button"
                className="py-2.5 px-5 rounded-xl bg-[#1A2234] hover:bg-[#232D44] text-gray-200 hover:text-white font-medium text-[13px] flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-gray-400" />
                <span>Xem chi tiết Lộ trình</span>
              </button>
            </div>
          </div>
        )}

        {/* 2. Roadmaps Grid */}
        <div className="flex flex-col gap-4 pb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <h3 className="font-['Space_Grotesk'] text-[16px] font-bold text-white flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#F97316]" />
                Lộ trình của tôi
              </h3>
              {onNavigateCurriculum && (
                <button
                  type="button"
                  onClick={onNavigateCurriculum}
                  className="text-[12px] text-gray-400 hover:text-[#F97316] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>• Mở Giáo trình 26 bài</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Clean Filter Pills */}
            <div className="flex items-center gap-1 p-1 rounded-lg bg-[#121723] border border-[#1C2333]">
              {[
                { id: 'all', label: `Tất cả (${roadmaps.length})` },
                { id: 'in_progress', label: 'Đang học' },
                { id: 'completed', label: 'Hoàn thành' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setStatusFilter(tab.id as RoadmapStatusFilter)}
                  type="button"
                  className={`px-3 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                    statusFilter === tab.id
                      ? 'bg-[#1F273B] text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {filteredRoadmaps.length === 0 ? (
            <div className="p-8 rounded-xl bg-[#121723] border border-[#1C2333] text-center flex flex-col items-center justify-center gap-2">
              <p className="text-[13px] text-gray-400">Không có lộ trình nào ở trạng thái này.</p>
              <button
                type="button"
                onClick={() => setStatusFilter('all')}
                className="text-[12px] text-[#F97316] hover:underline font-medium cursor-pointer"
              >
                Hiển thị tất cả
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredRoadmaps.map((rm) => (
                <div
                  key={rm.id}
                  onClick={() => onSelectRoadmap(rm.id)}
                  className="rounded-xl bg-[#121723] border border-[#1E2638] hover:border-[#344260] p-5 flex flex-col justify-between transition-colors cursor-pointer group"
                >
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-gray-400 uppercase tracking-wider">
                        {rm.category}
                      </span>
                      <span className="font-mono text-gray-500">
                        {rm.completedLessons}/{rm.totalLessons} bài
                      </span>
                    </div>

                    <h4 className="font-['Space_Grotesk'] text-[15px] font-bold text-white group-hover:text-[#F97316] transition-colors">
                      {rm.title}
                    </h4>

                    <p className="text-[12px] text-gray-400 line-clamp-2 leading-relaxed">
                      {rm.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3.5 border-t border-[#1C2333] flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-gray-500">Tiến độ</span>
                      <span className="font-mono font-semibold text-gray-200">{rm.progressPercent}%</span>
                    </div>
                    <div className="w-full h-1 rounded-full bg-[#0B0F19] overflow-hidden">
                      <div
                        className="h-full bg-[#F97316] rounded-full transition-all"
                        style={{ width: `${rm.progressPercent}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
