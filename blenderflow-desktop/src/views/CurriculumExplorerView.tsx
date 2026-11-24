import React, { useState, useMemo } from 'react';
import { 
  BLENDER_CURRICULUM_MODULES, 
  CurriculumLesson, 
  CurriculumModule, 
  CurriculumService,
  TOTAL_CURRICULUM_LESSONS 
} from '../data/curriculumDatabase';
import { MarkdownArticleViewer } from '../components/curriculum/MarkdownArticleViewer';
import { KeycapBadge } from '../components/common/KeycapBadge';
import { 
  BookOpen, 
  Search, 
  CheckCircle2, 
  Circle, 
  Bookmark, 
  Sparkles, 
  Box, 
  Clock, 
  Layers, 
  FileText, 
  ChevronRight, 
  ChevronDown, 
  ChevronLeft,
  X, 
  Save, 
  RotateCcw,
  ExternalLink,
  Award,
  Filter
} from 'lucide-react';

interface CurriculumExplorerViewProps {
  onOpenPracticeChallenge?: (taskId: string) => void;
  onNavigateHome?: () => void;
}

export const CurriculumExplorerView: React.FC<CurriculumExplorerViewProps> = ({
  onOpenPracticeChallenge,
  onNavigateHome,
}) => {
  const [selectedModuleId, setSelectedModuleId] = useState<string>('cur-mod-00');
  const [activeLesson, setActiveLesson] = useState<CurriculumLesson | null>(() => {
    return BLENDER_CURRICULUM_MODULES[0]?.lessons[0] || null;
  });
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<number | 'all' | 'resources'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [completedIds, setCompletedIds] = useState<string[]>(() => CurriculumService.getCompletedLessonIds());
  const [bookmarks, setBookmarks] = useState<string[]>(() => CurriculumService.getBookmarks());
  const [onlyBookmarks, setOnlyBookmarks] = useState(false);

  // Lesson note state
  const [noteContent, setNoteContent] = useState('');
  const [isNoteSaved, setIsNoteSaved] = useState(false);
  const [showNotesDrawer, setShowNotesDrawer] = useState(false);

  // Load note when active lesson changes
  React.useEffect(() => {
    if (activeLesson) {
      setNoteContent(CurriculumService.getLessonNote(activeLesson.id));
      setIsNoteSaved(false);
    }
  }, [activeLesson]);

  // Handle toggle completion
  const handleToggleComplete = (lessonId: string) => {
    CurriculumService.toggleLessonCompleted(lessonId);
    setCompletedIds(CurriculumService.getCompletedLessonIds());
  };

  // Handle toggle bookmark
  const handleToggleBookmark = (lessonId: string) => {
    CurriculumService.toggleBookmark(lessonId);
    setBookmarks(CurriculumService.getBookmarks());
  };

  // Handle save note
  const handleSaveNote = () => {
    if (!activeLesson) return;
    CurriculumService.saveLessonNote(activeLesson.id, noteContent);
    setIsNoteSaved(true);
    setTimeout(() => setIsNoteSaved(false), 2000);
  };

  // Filter modules
  const filteredModules = useMemo(() => {
    return BLENDER_CURRICULUM_MODULES.filter((mod) => {
      // Level filter
      if (selectedLevelFilter === 'resources' && mod.id !== 'cur-mod-09') return false;
      if (typeof selectedLevelFilter === 'number' && mod.level !== selectedLevelFilter) return false;

      // Bookmark only filter
      if (onlyBookmarks) {
        const hasBookmarkedLesson = mod.lessons.some((l) => bookmarks.includes(l.id));
        if (!hasBookmarkedLesson) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const modMatch = mod.title.toLowerCase().includes(q) || mod.vietnameseTitle.toLowerCase().includes(q) || mod.description.toLowerCase().includes(q);
        const lessonMatch = mod.lessons.some((l) => 
          l.title.toLowerCase().includes(q) || 
          l.summary.toLowerCase().includes(q) ||
          l.keyShortcuts.some(s => s.toLowerCase().includes(q))
        );
        if (!modMatch && !lessonMatch) return false;
      }

      return true;
    });
  }, [selectedLevelFilter, onlyBookmarks, searchQuery, bookmarks]);

  // Progress computation
  const totalCompletedCount = completedIds.length;
  const progressPercent = Math.min(100, Math.round((totalCompletedCount / TOTAL_CURRICULUM_LESSONS) * 100));

  return (
    <div className="flex-1 h-full overflow-hidden bg-[#0B0F19] text-[#dfe2f1] flex flex-col select-none">
      {/* 1. Top Curriculum Header Bar */}
      <div className="p-4 lg:px-6 bg-[#0E121D] border-b border-[#1F2637] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-['Space_Grotesk'] text-lg font-bold text-white tracking-tight">
                Blender 3D Curriculum Encyclopedia
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                100% Curated
              </span>
            </div>
            <p className="text-[12px] text-gray-400">
              Giáo trình tiêu chuẩn quốc tế từ Level 0 đến Level 8 (26 bài học chuyên sâu).
            </p>
          </div>
        </div>

        {/* Global Progress and Quick Filters */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#141A28] border border-[#1F2637]">
            <div className="flex flex-col text-right">
              <span className="text-[10px] text-gray-400 uppercase font-semibold">Tiến độ bài học</span>
              <span className="text-[12px] font-bold font-mono text-indigo-300">
                {totalCompletedCount} / {TOTAL_CURRICULUM_LESSONS} ({progressPercent}%)
              </span>
            </div>
            <div className="w-16 h-2 rounded-full bg-[#1F2637] overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOnlyBookmarks(!onlyBookmarks)}
            className={`px-3 py-1.5 rounded-xl border text-[12px] font-medium flex items-center gap-1.5 transition-all ${
              onlyBookmarks
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-300 font-semibold'
                : 'bg-[#141A28] border-[#1F2637] text-gray-400 hover:text-white'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${onlyBookmarks ? 'fill-amber-400 text-amber-400' : ''}`} />
            <span>Đã lưu ({bookmarks.length})</span>
          </button>
        </div>
      </div>

      {/* 2. Level Filters & Search Toolbar */}
      <div className="px-4 lg:px-6 py-2.5 bg-[#0A0D15] border-b border-[#1F2637] flex items-center gap-3 overflow-x-auto shrink-0 scrollbar-none">
        <div className="relative shrink-0 w-56">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm bài học, phím tắt..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#121622] border border-[#1F2637] rounded-lg pl-8 pr-3 py-1.5 text-[12px] text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        <div className="h-4 w-[1px] bg-[#1F2637] shrink-0" />

        {/* Level Filter Pills */}
        <div className="flex items-center gap-1.5 shrink-0">
          {[
            { id: 'all', label: 'Tất cả' },
            { id: 0, label: 'Lvl 0: Lộ trình' },
            { id: 1, label: 'Lvl 1: Nhập môn' },
            { id: 2, label: 'Lvl 2: Dựng hình' },
            { id: 3, label: 'Lvl 3: Sculpting' },
            { id: 4, label: 'Lvl 4: PBR Shading' },
            { id: 5, label: 'Lvl 5: Ánh sáng & Render' },
            { id: 6, label: 'Lvl 6: Rigging' },
            { id: 7, label: 'Lvl 7: Geo Nodes' },
            { id: 8, label: 'Lvl 8: Game Pipeline' },
            { id: 'resources', label: 'Tài nguyên & Addons' },
          ].map((pill) => {
            const isActive = selectedLevelFilter === pill.id;
            return (
              <button
                key={String(pill.id)}
                type="button"
                onClick={() => setSelectedLevelFilter(pill.id as any)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                    : 'bg-[#141A28] border border-[#1F2637] text-gray-400 hover:text-white hover:bg-[#1A2234]'
                }`}
              >
                {pill.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Main Workspace Area: Split Module Explorer + Full Article Viewer */}
      <div className="flex-1 flex overflow-hidden pb-14 md:pb-0">
        {/* Left Side: Module & Lesson Directory Tree (330px on desktop, full width on mobile when no lesson selected) */}
        <div className={`${activeLesson ? 'hidden md:flex' : 'flex'} w-full md:w-[330px] border-r border-[#1F2637] bg-[#0C101A] overflow-y-auto shrink-0 flex-col`}>
          <div className="p-3 border-b border-[#1F2637] flex items-center justify-between text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
            <span>Danh mục ({filteredModules.length} Modules)</span>
            <span className="text-gray-500">{filteredModules.reduce((acc, m) => acc + m.lessons.length, 0)} Bài</span>
          </div>

          <div className="flex-1 p-2 space-y-2">
            {filteredModules.map((mod) => {
              const isSelected = selectedModuleId === mod.id;
              const completedInMod = mod.lessons.filter((l) => completedIds.includes(l.id)).length;
              const isModCompleted = completedInMod === mod.lessons.length && mod.lessons.length > 0;

              return (
                <div
                  key={mod.id}
                  className={`rounded-xl border transition-all overflow-hidden ${
                    isSelected
                      ? 'border-indigo-500/50 bg-[#141B2B]'
                      : 'border-[#1B2232] bg-[#0E121E] hover:border-[#273248]'
                  }`}
                >
                  {/* Module Accordion Header */}
                  <div
                    onClick={() => setSelectedModuleId(isSelected ? '' : mod.id)}
                    className="p-3 flex items-start justify-between cursor-pointer"
                  >
                    <div className="flex items-start gap-2.5">
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 text-[11px] font-mono font-bold ${
                        isModCompleted
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : isSelected
                          ? 'bg-indigo-600 text-white'
                          : 'bg-[#182030] text-gray-400'
                      }`}>
                        {isModCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : mod.level}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-semibold uppercase text-indigo-400">
                          {mod.levelBadge}
                        </span>
                        <h3 className="text-[13px] font-semibold text-white leading-snug">
                          {mod.vietnameseTitle}
                        </h3>
                        <span className="text-[11px] text-gray-500 mt-0.5">
                          {completedInMod}/{mod.lessons.length} bài đã hoàn thành
                        </span>
                      </div>
                    </div>

                    <div className="text-gray-400 mt-1">
                      {isSelected ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </div>
                  </div>

                  {/* Nested Lesson List */}
                  {isSelected && (
                    <div className="px-2 pb-2 pt-1 border-t border-[#1F2637]/60 space-y-1">
                      {mod.lessons.map((les) => {
                        const isCurrentActive = activeLesson?.id === les.id;
                        const isDone = completedIds.includes(les.id);
                        const isBookmarked = bookmarks.includes(les.id);

                        return (
                          <div
                            key={les.id}
                            onClick={() => setActiveLesson(les)}
                            className={`p-2 rounded-lg cursor-pointer transition-all flex items-start justify-between gap-2 ${
                              isCurrentActive
                                ? 'bg-indigo-600/20 border border-indigo-500/40 text-white'
                                : 'hover:bg-[#161D2C] text-gray-300'
                            }`}
                          >
                            <div className="flex items-start gap-2">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleToggleComplete(les.id);
                                }}
                                className="mt-0.5 text-gray-500 hover:text-emerald-400 transition-colors"
                              >
                                {isDone ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-500/20" />
                                ) : (
                                  <Circle className="w-4 h-4 text-gray-500" />
                                )}
                              </button>
                              <div className="flex flex-col">
                                <span className={`text-[12px] font-medium leading-tight ${
                                  isCurrentActive ? 'text-indigo-200 font-semibold' : 'text-gray-200'
                                }`}>
                                  {les.title}
                                </span>
                                <div className="flex items-center gap-2 mt-1 text-[10px] text-gray-400">
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> {les.readTime}
                                  </span>
                                  {les.challengeRef && (
                                    <span className="px-1.5 py-0.2 rounded bg-orange-500/20 text-orange-400 font-medium border border-orange-500/30">
                                      3D Practice
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            {isBookmarked && (
                              <Bookmark className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0 mt-0.5" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Reader Canvas & Action Bar (Hidden on mobile if no lesson selected) */}
        <div className={`${!activeLesson ? 'hidden md:flex' : 'flex'} flex-1 flex-col h-full overflow-hidden bg-[#0B0F19]`}>
          {activeLesson ? (
            <div className="flex-1 flex flex-col h-full overflow-hidden">
              {/* Article Top Action Bar */}
              <div className="px-4 lg:px-6 py-2.5 bg-[#101422] border-b border-[#1F2637] flex items-center justify-between gap-2.5 shrink-0 overflow-x-auto">
                <div className="flex items-center gap-2">
                  {/* Mobile Back Button to Lesson List */}
                  <button
                    type="button"
                    onClick={() => setActiveLesson(null)}
                    className="md:hidden p-1.5 rounded-lg bg-[#182030] border border-[#273248] text-gray-300 hover:text-white flex items-center gap-1 text-[11px] cursor-pointer shrink-0"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Bài học</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleToggleComplete(activeLesson.id)}
                    className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold flex items-center gap-1.5 transition-all shrink-0 ${
                      completedIds.includes(activeLesson.id)
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                        : 'bg-[#182030] text-gray-300 hover:text-white border border-[#273248]'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="hidden sm:inline">{completedIds.includes(activeLesson.id) ? 'Đã hoàn thành' : 'Đánh dấu đã học'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleToggleBookmark(activeLesson.id)}
                    className={`p-1.5 rounded-lg border text-gray-300 transition-all ${
                      bookmarks.includes(activeLesson.id)
                        ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                        : 'bg-[#182030] border-[#273248] hover:text-white'
                    }`}
                    title="Lưu vào mục yêu thích"
                  >
                    <Bookmark className={`w-4 h-4 ${bookmarks.includes(activeLesson.id) ? 'fill-amber-400 text-amber-400' : ''}`} />
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowNotesDrawer(!showNotesDrawer)}
                    className={`px-3 py-1.5 rounded-lg border text-[12px] font-medium flex items-center gap-1.5 transition-all ${
                      showNotesDrawer || noteContent
                        ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300'
                        : 'bg-[#182030] border-[#273248] text-gray-300 hover:text-white'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Ghi chú {noteContent ? '•' : ''}</span>
                  </button>
                </div>

                {/* 3D Practice Quick Button */}
                {activeLesson.challengeRef && onOpenPracticeChallenge && (
                  <button
                    type="button"
                    onClick={() => onOpenPracticeChallenge(activeLesson.challengeRef!)}
                    className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#F97316] to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold text-[12px] flex items-center gap-1.5 shadow-md shadow-orange-500/20 active:scale-[0.98] transition-all"
                  >
                    <Box className="w-3.5 h-3.5" />
                    <span>Mở Chế độ Thực hành 3D (Dual-View)</span>
                    <span className="text-[11px] opacity-80">→</span>
                  </button>
                )}
              </div>

              {/* Scrollable Article Body */}
              <div className="flex-1 overflow-y-auto p-6 lg:p-10">
                <div className="max-w-4xl mx-auto space-y-6">
                  {/* Article Metadata Card */}
                  <div className="p-4 rounded-xl bg-[#121724] border border-[#1F2637] flex flex-wrap items-center justify-between gap-3 text-[12px] text-gray-400">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-semibold uppercase text-[10px] border border-indigo-500/30">
                        {activeLesson.category}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-gray-400" /> {activeLesson.readTime}
                      </span>
                    </div>

                    {/* Key shortcuts chips */}
                    {activeLesson.keyShortcuts && activeLesson.keyShortcuts.length > 0 && (
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] text-gray-400 font-medium">Phím tắt then chốt:</span>
                        {activeLesson.keyShortcuts.slice(0, 4).map((sc, i) => (
                          <KeycapBadge key={i} keys={sc} size="sm" />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Markdown Rendered Content */}
                  <MarkdownArticleViewer content={activeLesson.contentMarkdown} />

                  {/* End of article completion banner */}
                  <div className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-[#141B2B] to-[#0E1320] border border-[#232D42] flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                        <Award className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-[14px] font-bold text-white">Bạn đã đọc xong bài học này?</h4>
                        <p className="text-[12px] text-gray-400">Đánh dấu hoàn thành để ghi nhận tiến độ vào biểu đồ học tập của bạn.</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleToggleComplete(activeLesson.id)}
                      className={`px-4 py-2 rounded-xl text-[13px] font-semibold transition-all ${
                        completedIds.includes(activeLesson.id)
                          ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/30'
                      }`}
                    >
                      {completedIds.includes(activeLesson.id) ? '✓ Đã hoàn thành' : 'Đánh dấu hoàn thành'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-gray-500">
              <BookOpen className="w-12 h-12 text-gray-600 mb-3" />
              <p className="text-sm font-medium">Vui lòng chọn một bài học từ danh mục bên trái.</p>
            </div>
          )}

          {/* Quick Sliding Notes Drawer */}
          {showNotesDrawer && activeLesson && (
            <div className="w-80 border-l border-[#1F2637] bg-[#0E1320] p-4 flex flex-col justify-between shrink-0 animate-in slide-in-from-right duration-200">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between border-b border-[#1F2637] pb-2">
                  <span className="text-[12px] font-bold text-white flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-indigo-400" />
                    Ghi chú cá nhân
                  </span>
                  <button onClick={() => setShowNotesDrawer(false)} className="text-gray-400 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-[11px] text-gray-400">
                  Ghi lại các phím tắt khó nhớ hoặc suy nghĩ cá nhân cho bài này. Dữ liệu tự động lưu cục bộ.
                </p>
                <textarea
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  placeholder="Gõ ghi chú tại đây..."
                  rows={14}
                  className="w-full p-2.5 rounded-lg bg-[#141A28] border border-[#1F2637] text-[12px] text-gray-200 placeholder-gray-500 focus:outline-none focus:border-indigo-500 resize-none font-mono leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#1F2637]">
                <span className="text-[10px] text-gray-500 font-mono">
                  {isNoteSaved ? '✓ Đã lưu thành công' : 'Chưa lưu'}
                </span>
                <button
                  type="button"
                  onClick={handleSaveNote}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-semibold flex items-center gap-1 shadow-sm"
                >
                  <Save className="w-3 h-3" />
                  <span>Lưu ghi chú</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
