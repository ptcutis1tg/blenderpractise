import React, { useState } from 'react';
import { 
  Play, 
  Compass, 
  Flame, 
  Box, 
  Layers, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Sparkles,
  BookOpen,
  Keyboard,
  Search,
  Filter,
  GraduationCap
} from 'lucide-react';
import { Roadmap, UserStats } from '../types';
import { KeycapBadge } from '../components/common/KeycapBadge';

interface HomeDashboardViewProps {
  roadmaps: Roadmap[];
  userStats: UserStats;
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
  onNavigateHotkeys,
  onNavigateCurriculum,
}) => {
  const [statusFilter, setStatusFilter] = useState<RoadmapStatusFilter>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Primary active roadmap (in progress)
  const activeRoadmap = roadmaps.find((r) => r.progressPercent > 0 && r.progressPercent < 100) || roadmaps[0];

  const categories = ['All', 'Modeling', 'Shading', 'Lighting'];

  // Total completed lessons count
  const totalCompletedLessons = roadmaps.reduce((acc, r) => acc + r.completedLessons, 0);
  const totalLessons = roadmaps.reduce((acc, r) => acc + r.totalLessons, 0);
  const overallPercentage = totalLessons > 0 ? Math.round((totalCompletedLessons / totalLessons) * 100) : 0;

  // Filter roadmaps
  const filteredRoadmaps = roadmaps.filter((rm) => {
    // Status filter
    if (statusFilter === 'in_progress' && (rm.progressPercent === 0 || rm.progressPercent === 100)) return false;
    if (statusFilter === 'completed' && rm.progressPercent < 100) return false;

    // Category filter
    if (selectedCategory !== 'All' && rm.category !== selectedCategory) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = rm.title.toLowerCase().includes(q);
      const matchDesc = rm.description.toLowerCase().includes(q);
      const matchCategory = rm.category.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchCategory) return false;
    }

    return true;
  });

  return (
    <div className="flex-1 h-full overflow-y-auto bg-[#0B0F19] text-[#dfe2f1] p-6 lg:p-8 select-none">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        {/* Welcome & Overview Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#1F2637] pb-6">
          <div>
            <h1 className="font-['Space_Grotesk'] text-2xl lg:text-3xl font-bold text-white tracking-tight flex items-center gap-2.5">
              Welcome back to <span className="text-[#F97316]">BlenderFlow</span>
            </h1>
            <p className="text-[13px] text-gray-400 mt-1">
              Structured 3D curriculum, clean quad topology, and direct Blender 5.3 practice mode.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#141A28] border border-[#1F2637]">
              <Flame className="w-4 h-4 text-[#F97316]" />
              <span className="text-[12px] font-semibold text-gray-300">Streak:</span>
              <span className="text-[13px] font-bold font-mono text-[#F97316]">{userStats.streakDays} Days</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#141A28] border border-[#1F2637]">
              <Clock className="w-4 h-4 text-indigo-400" />
              <span className="text-[12px] font-semibold text-gray-300">Study:</span>
              <span className="text-[13px] font-bold font-mono text-white">{userStats.totalHoursStudied}h</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#141A28] border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-[12px] font-semibold text-emerald-400">{userStats.blenderVersion}</span>
            </div>
          </div>
        </div>

        {/* Hero Card: Resume Learning & 3D Practice */}
        {activeRoadmap && (
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#161D2B] via-[#121724] to-[#0A0E17] border border-[#232D42] p-6 lg:p-7 shadow-2xl shadow-black/40">
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-orange-500/10 via-indigo-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="flex-1 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#F97316]/15 text-[#FB923C] border border-[#F97316]/30 uppercase tracking-wide">
                    In Progress • {activeRoadmap.category}
                  </span>
                  <span className="text-[12px] text-gray-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {activeRoadmap.lastStudied}
                  </span>
                </div>

                <h2 className="font-['Space_Grotesk'] text-xl lg:text-2xl font-bold text-white tracking-tight">
                  {activeRoadmap.title}
                </h2>

                <p className="text-[13px] text-gray-300 max-w-2xl leading-relaxed">
                  Next Challenge: <strong className="text-white font-semibold">Challenge 04: Low-Poly Stylized Wooden Chair</strong>. Practice quads, loop cuts, and non-destructive beveling directly in Blender with side-by-side 3D reference.
                </p>

                {/* Focus Hotkeys Pills */}
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">Focus Hotkeys:</span>
                  <div className="flex items-center gap-1.5">
                    {['Tab', 'Ctrl + R', 'E', 'Ctrl + B'].map((hk, i) => (
                      <KeycapBadge key={i} keys={hk} variant="orange" size="sm" />
                    ))}
                  </div>
                </div>

                {/* Progress bar */}
                <div className="flex flex-col gap-1.5 max-w-md mt-2">
                  <div className="flex items-center justify-between text-[11px] font-semibold">
                    <span className="text-gray-400">Roadmap Progress</span>
                    <span className="text-indigo-400 font-mono">{activeRoadmap.progressPercent}% ({activeRoadmap.completedLessons}/{activeRoadmap.totalLessons} completed)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#0B0F19] overflow-hidden border border-[#1F2637]">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-[#F97316] rounded-full transition-all duration-300"
                      style={{ width: `${activeRoadmap.progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto shrink-0">
                <button
                  onClick={() => onOpenPracticeChallenge('task-chair-01')}
                  type="button"
                  className="py-3 px-6 rounded-xl bg-gradient-to-r from-[#F97316] to-[#EA580C] hover:from-[#FB923C] hover:to-[#F97316] text-white font-bold text-[13px] shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
                >
                  <Box className="w-4 h-4 fill-white" />
                  <span>Launch 50:50 Dual Practice</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onSelectRoadmap(activeRoadmap.id)}
                  type="button"
                  className="py-2.5 px-5 rounded-xl bg-[#1F2637] hover:bg-[#283248] text-gray-200 hover:text-white font-semibold text-[13px] flex items-center justify-center gap-2 transition-all border border-[#2B354D] cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-indigo-400" />
                  <span>Resume Curriculum</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Comprehensive Curriculum Encyclopedia Banner */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-950/60 via-[#141A28] to-[#161D2B] border border-indigo-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shrink-0 shadow-lg shadow-indigo-500/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-[14px] font-bold text-white">Blender 3D Curriculum Encyclopedia (Level 0 - 8)</h4>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-400 font-semibold border border-emerald-500/30">26 Bài học</span>
              </div>
              <p className="text-[12px] text-gray-400 mt-0.5">
                Kho tài liệu tổng hợp từ Blender Foundation, Blender Guru, CG Cookie, Josh Gambrell, Dikko, CGDive...
              </p>
            </div>
          </div>
          {onNavigateCurriculum && (
            <button
              type="button"
              onClick={onNavigateCurriculum}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-[12px] flex items-center gap-1.5 shadow-md shadow-indigo-600/30 shrink-0 transition-all cursor-pointer"
            >
              <span>Mở Giáo trình Toàn diện</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Learning Roadmaps Gallery with Filter Tabs */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white flex items-center gap-2">
                <Compass className="w-4 h-4 text-indigo-400" />
                My Roadmaps
              </h3>
              <p className="text-[12px] text-gray-400">Structured paths designed for non-destructive Blender 3D modeling.</p>
            </div>

            {/* Filter Tabs: All / In Progress / Completed */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-[#141A28] border border-[#1F2637]">
              <button
                onClick={() => setStatusFilter('all')}
                type="button"
                className={`px-3 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                  statusFilter === 'all'
                    ? 'bg-[#4F46E5] text-white shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                All ({roadmaps.length})
              </button>
              <button
                onClick={() => setStatusFilter('in_progress')}
                type="button"
                className={`px-3 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                  statusFilter === 'in_progress'
                    ? 'bg-[#4F46E5] text-white shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                In Progress ({roadmaps.filter((r) => r.progressPercent > 0 && r.progressPercent < 100).length})
              </button>
              <button
                onClick={() => setStatusFilter('completed')}
                type="button"
                className={`px-3 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                  statusFilter === 'completed'
                    ? 'bg-[#4F46E5] text-white shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Completed ({roadmaps.filter((r) => r.progressPercent === 100).length})
              </button>
            </div>
          </div>

          {/* Search & Category Pills */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  type="button"
                  className={`px-3 py-1 rounded-lg text-[11px] font-medium transition-all whitespace-nowrap cursor-pointer border ${
                    selectedCategory === cat
                      ? 'bg-[#1F2637] border-indigo-500/40 text-white font-semibold'
                      : 'bg-[#121622] border-[#1F2637] text-gray-400 hover:text-gray-200 hover:bg-[#161D2B]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search roadmaps..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-[#141A28] border border-[#1F2637] text-white text-[12px] focus:outline-none focus:border-indigo-500 placeholder-gray-500"
              />
            </div>
          </div>

          {/* Roadmaps Grid */}
          {filteredRoadmaps.length === 0 ? (
            <div className="p-8 rounded-xl bg-[#121622] border border-[#1F2637] text-center flex flex-col items-center justify-center gap-2">
              <p className="text-[13px] text-gray-400 font-medium">No roadmaps match the selected filter criteria.</p>
              <button
                onClick={() => {
                  setStatusFilter('all');
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="text-[12px] text-indigo-400 hover:underline font-semibold"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredRoadmaps.map((rm) => {
                const isSelected = rm.id === activeRoadmap?.id;
                return (
                  <div
                    key={rm.id}
                    onClick={() => onSelectRoadmap(rm.id)}
                    className={`rounded-xl border p-5 flex flex-col justify-between transition-all cursor-pointer group ${
                      isSelected
                        ? 'bg-[#141A28] border-indigo-500/40 shadow-lg shadow-indigo-900/10'
                        : 'bg-[#121622] border-[#1F2637] hover:border-[#2D384E] hover:bg-[#161D2B]'
                    }`}
                  >
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#1F2637] text-gray-300">
                          {rm.category}
                        </span>
                        <span className="text-[11px] font-mono text-gray-400">
                          {rm.completedLessons}/{rm.totalLessons} Lessons
                        </span>
                      </div>

                      <h4 className="font-['Space_Grotesk'] text-[15px] font-bold text-white group-hover:text-indigo-300 transition-colors">
                        {rm.title}
                      </h4>

                      <p className="text-[12px] text-gray-400 line-clamp-2 leading-relaxed">
                        {rm.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-[#1F2637] flex flex-col gap-2">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-gray-400">Progress</span>
                        <span className="font-mono font-bold text-white">{rm.progressPercent}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-[#0B0F19] overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-indigo-500 to-[#F97316] rounded-full"
                          style={{ width: `${rm.progressPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Daily Hotkey Muscle Memory Drills Card */}
        <div className="p-5 rounded-xl bg-[#121622] border border-[#1F2637] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
              <Keyboard className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-[14px] font-bold text-white">Daily Blender Hotkey Speed Drill</h4>
              <p className="text-[12px] text-gray-400">Practice Extrude (E), Inset (I), Bevel (Ctrl+B), and Edit Mode switching until it becomes muscle memory.</p>
            </div>
          </div>

          <button
            onClick={onNavigateHotkeys}
            type="button"
            className="px-4 py-2 rounded-lg bg-[#1F2637] hover:bg-[#2A344A] text-white text-[12px] font-semibold flex items-center gap-2 transition-all border border-[#2E3950] shrink-0 cursor-pointer"
          >
            <span>Launch Hotkey Drills</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
