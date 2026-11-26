import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  BLENDER_CURRICULUM_MODULES, 
  CurriculumLesson, 
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
  Box, 
  Clock, 
  FileText, 
  ChevronRight, 
  ChevronDown, 
  ChevronLeft,
  X, 
  Save, 
  Award
} from 'lucide-react';

interface CurriculumExplorerViewProps {
  isActive?: boolean;
  requestedTarget?: { moduleId: string; lessonId: string; nonce: number } | null;
  onOpenPracticeChallenge?: (taskId: string) => void;
  onNavigateHome?: () => void;
  onProgressChanged?: () => void;
}

interface PersistedCurriculumState {
  selectedModuleId?: string;
  activeLessonId?: string | null;
  selectedLevelFilter?: number | 'all' | 'resources';
  searchQuery?: string;
  onlyBookmarks?: boolean;
  notesExpanded?: boolean;
  leftScrollTop?: number;
  rightScrollTop?: number;
  handledSearchNonce?: number;
}

const CURRICULUM_UI_STATE_KEY = 'blenderflow_curriculum_ui_state';

function readPersistedCurriculumState(): PersistedCurriculumState {
  try {
    const raw = sessionStorage.getItem(CURRICULUM_UI_STATE_KEY);
    return raw ? (JSON.parse(raw) as PersistedCurriculumState) : {};
  } catch {
    return {};
  }
}

function writePersistedCurriculumState(patch: PersistedCurriculumState): void {
  try {
    const current = readPersistedCurriculumState();
    sessionStorage.setItem(CURRICULUM_UI_STATE_KEY, JSON.stringify({ ...current, ...patch }));
  } catch {
    // Ignore storage quota errors
  }
}

function findLessonById(lessonId: string | null | undefined): CurriculumLesson | null {
  if (!lessonId) return null;
  for (const mod of BLENDER_CURRICULUM_MODULES) {
    const found = mod.lessons.find((l) => l.id === lessonId);
    if (found) return found;
  }
  return null;
}

export const CurriculumExplorerView: React.FC<CurriculumExplorerViewProps> = ({
  isActive = true,
  requestedTarget,
  onOpenPracticeChallenge,
  onProgressChanged,
}) => {
  const initialPersisted = useMemo(() => readPersistedCurriculumState(), []);
  const leftListRef = useRef<HTMLDivElement | null>(null);
  const rightReaderRef = useRef<HTMLDivElement | null>(null);

  const [selectedModuleId, setSelectedModuleId] = useState<string>(
    () => initialPersisted.selectedModuleId ?? 'cur-mod-00'
  );
  const [activeLesson, setActiveLesson] = useState<CurriculumLesson | null>(() => {
    if (initialPersisted.activeLessonId === null) return null;
    if (initialPersisted.activeLessonId) {
      return findLessonById(initialPersisted.activeLessonId) || BLENDER_CURRICULUM_MODULES[0]?.lessons[0] || null;
    }
    return BLENDER_CURRICULUM_MODULES[0]?.lessons[0] || null;
  });
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<number | 'all' | 'resources'>(
    () => initialPersisted.selectedLevelFilter ?? 'all'
  );
  const [searchQuery, setSearchQuery] = useState(() => initialPersisted.searchQuery ?? '');
  const [completedIds, setCompletedIds] = useState<string[]>(() => CurriculumService.getCompletedLessonIds());
  const [bookmarks, setBookmarks] = useState<string[]>(() => CurriculumService.getBookmarks());
  const [onlyBookmarks, setOnlyBookmarks] = useState(() => initialPersisted.onlyBookmarks ?? false);

  // Inline collapsible personal notes state (no 4th column squeezing the reader)
  const [noteContent, setNoteContent] = useState('');
  const [isNoteSaved, setIsNoteSaved] = useState(false);
  const [notesExpanded, setNotesExpanded] = useState(() => initialPersisted.notesExpanded ?? false);

  // Persist core navigation & filter state whenever it changes
  useEffect(() => {
    writePersistedCurriculumState({
      selectedModuleId,
      activeLessonId: activeLesson ? activeLesson.id : null,
      selectedLevelFilter,
      searchQuery,
      onlyBookmarks,
      notesExpanded,
    });
  }, [selectedModuleId, activeLesson?.id, selectedLevelFilter, searchQuery, onlyBookmarks, notesExpanded]);

  // Refresh completion/bookmarks and restore scroll positions when view becomes active
  useEffect(() => {
    if (!isActive) return;
    setCompletedIds(CurriculumService.getCompletedLessonIds());
    setBookmarks(CurriculumService.getBookmarks());

    const persisted = readPersistedCurriculumState();
    requestAnimationFrame(() => {
      if (leftListRef.current && persisted.leftScrollTop && leftListRef.current.scrollTop === 0) {
        leftListRef.current.scrollTop = persisted.leftScrollTop;
      }
      if (rightReaderRef.current && persisted.rightScrollTop && rightReaderRef.current.scrollTop === 0) {
        rightReaderRef.current.scrollTop = persisted.rightScrollTop;
      }
    });
  }, [isActive]);

  // Handle direct jump requests (e.g. from Ctrl+K Global Search)
  useEffect(() => {
    if (!requestedTarget) return;
    const persisted = readPersistedCurriculumState();
    if (persisted.handledSearchNonce === requestedTarget.nonce) return;

    const found = findLessonById(requestedTarget.lessonId);
    if (found) {
      setSelectedModuleId(requestedTarget.moduleId);
      setActiveLesson(found);
      setSelectedLevelFilter('all');
      setOnlyBookmarks(false);
      setSearchQuery('');
      writePersistedCurriculumState({
        rightScrollTop: 0,
        handledSearchNonce: requestedTarget.nonce,
      });
      requestAnimationFrame(() => {
        if (rightReaderRef.current) rightReaderRef.current.scrollTop = 0;
      });
    }
  }, [requestedTarget?.nonce]);

  useEffect(() => {
    if (activeLesson) {
      const saved = CurriculumService.getLessonNote(activeLesson.id);
      setNoteContent(saved);
      setIsNoteSaved(false);
    }
  }, [activeLesson?.id]);

  const handleToggleComplete = (lessonId: string) => {
    CurriculumService.toggleLessonCompleted(lessonId);
    setCompletedIds(CurriculumService.getCompletedLessonIds());
    onProgressChanged?.();
  };

  const handleToggleBookmark = (lessonId: string) => {
    CurriculumService.toggleBookmark(lessonId);
    setBookmarks(CurriculumService.getBookmarks());
    onProgressChanged?.();
  };

  const handleSaveNote = () => {
    if (!activeLesson) return;
    CurriculumService.saveLessonNote(activeLesson.id, noteContent);
    setIsNoteSaved(true);
    onProgressChanged?.();
    setTimeout(() => setIsNoteSaved(false), 2000);
  };

  const filteredModules = useMemo(() => {
    return BLENDER_CURRICULUM_MODULES.filter((mod) => {
      if (selectedLevelFilter === 'resources' && mod.id !== 'cur-mod-09') return false;
      if (typeof selectedLevelFilter === 'number' && mod.level !== selectedLevelFilter) return false;

      if (onlyBookmarks) {
        const hasBookmarkedLesson = mod.lessons.some((l) => bookmarks.includes(l.id));
        if (!hasBookmarkedLesson) return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const modMatch =
          mod.title.toLowerCase().includes(q) ||
          mod.vietnameseTitle.toLowerCase().includes(q) ||
          mod.description.toLowerCase().includes(q);
        const lessonMatch = mod.lessons.some(
          (l) =>
            l.title.toLowerCase().includes(q) ||
            l.summary.toLowerCase().includes(q) ||
            l.keyShortcuts.some((s) => s.toLowerCase().includes(q))
        );
        if (!modMatch && !lessonMatch) return false;
      }

      return true;
    });
  }, [selectedLevelFilter, onlyBookmarks, searchQuery, bookmarks]);

  const totalCompletedCount = completedIds.length;
  const progressPercent = Math.min(100, Math.round((totalCompletedCount / TOTAL_CURRICULUM_LESSONS) * 100));

  return (
    <div className="flex-1 h-full overflow-hidden bg-[#0B0F19] text-[#dfe2f1] flex flex-col select-none">
      {/* 1. Unified Single-Bar Header & Filter Toolbar */}
      <div className="px-4 lg:px-6 py-2.5 bg-[#0E121D] border-b border-[#1C2333] flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <h1 className="font-['Space_Grotesk'] text-[16px] font-bold text-white tracking-tight">
            Thư viện Giáo trình 3D
          </h1>
          <span className="text-[12px] font-mono text-gray-400">
            {totalCompletedCount}/{TOTAL_CURRICULUM_LESSONS} bài ({progressPercent}%)
          </span>
        </div>

        {/* Search + Dropdown Level Selector + Saved Toggle */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-52">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm bài học, phím tắt..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#141A28] border border-[#222B3F] rounded-lg pl-8 pr-7 py-1.5 text-[12px] text-white placeholder-gray-500 focus:outline-none focus:border-[#F97316]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          <select
            value={String(selectedLevelFilter)}
            onChange={(e) => {
              const val = e.target.value;
              if (val === 'all' || val === 'resources') setSelectedLevelFilter(val);
              else setSelectedLevelFilter(Number(val));
            }}
            aria-label="Chọn cấp độ giáo trình"
            className="bg-[#141A28] border border-[#222B3F] rounded-lg px-2.5 py-1.5 text-[12px] text-gray-200 focus:outline-none focus:border-[#F97316] cursor-pointer"
          >
            <option value="all">Tất cả cấp độ</option>
            <option value="0">Level 0: Tổng quan</option>
            <option value="1">Level 1: Nhập môn</option>
            <option value="2">Level 2: Dựng hình</option>
            <option value="3">Level 3: Sculpting</option>
            <option value="4">Level 4: PBR Shading</option>
            <option value="5">Level 5: Ánh sáng & Render</option>
            <option value="6">Level 6: Rigging</option>
            <option value="7">Level 7: Geometry Nodes</option>
            <option value="8">Level 8: Game Pipeline</option>
            <option value="resources">Tài nguyên & Addons</option>
          </select>

          <button
            type="button"
            onClick={() => setOnlyBookmarks(!onlyBookmarks)}
            title="Lọc bài đã lưu"
            className={`px-2.5 py-1.5 rounded-lg border text-[12px] font-medium flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 ${
              onlyBookmarks
                ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
                : 'bg-[#141A28] border-[#222B3F] text-gray-400 hover:text-white'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${onlyBookmarks ? 'fill-amber-400 text-amber-400' : ''}`} />
            <span className="hidden md:inline">Đã lưu ({bookmarks.length})</span>
          </button>
        </div>
      </div>

      {/* 2. Clean Two-Pane Workspace: Module Directory + Wide Reader Canvas */}
      <div className="flex-1 flex overflow-hidden pb-14 md:pb-0">
        {/* Left Directory Tree */}
        <div
          ref={leftListRef}
          onScroll={(e) => {
            writePersistedCurriculumState({ leftScrollTop: e.currentTarget.scrollTop });
          }}
          className={`${activeLesson ? 'hidden md:flex' : 'flex'} w-full md:w-[300px] border-r border-[#1C2333] bg-[#0C1019] overflow-y-auto shrink-0 flex-col`}
        >
          <div className="flex-1 p-2.5 space-y-1.5">
            {filteredModules.map((mod) => {
              const isSelected = selectedModuleId === mod.id;
              const completedInMod = mod.lessons.filter((l) => completedIds.includes(l.id)).length;
              const isModCompleted = completedInMod === mod.lessons.length && mod.lessons.length > 0;

              return (
                <div
                  key={mod.id}
                  className={`rounded-xl border transition-colors overflow-hidden ${
                    isSelected ? 'border-[#2D3852] bg-[#131926]' : 'border-transparent bg-[#0E131F] hover:bg-[#121826]'
                  }`}
                >
                  <div
                    onClick={() => setSelectedModuleId(isSelected ? '' : mod.id)}
                    className="p-3 flex items-start justify-between cursor-pointer gap-2"
                  >
                    <div className="flex items-start gap-2.5 min-w-0">
                      <div
                        className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5 text-[11px] font-mono font-bold ${
                          isModCompleted
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : isSelected
                            ? 'bg-[#F97316] text-white'
                            : 'bg-[#1A2234] text-gray-400'
                        }`}
                      >
                        {isModCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : mod.level}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <h3 className="text-[13px] font-semibold text-white leading-snug">
                          {mod.vietnameseTitle}
                        </h3>
                        <span className="text-[11px] text-gray-500 mt-0.5">
                          {completedInMod}/{mod.lessons.length} bài hoàn thành
                        </span>
                      </div>
                    </div>

                    <div className="text-gray-500 mt-1 shrink-0">
                      {isSelected ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </div>
                  </div>

                  {isSelected && (
                    <div className="px-2 pb-2 pt-1 border-t border-[#1C2333]/60 space-y-1">
                      {mod.lessons.map((les) => {
                        const isCurrentActive = activeLesson?.id === les.id;
                        const isDone = completedIds.includes(les.id);
                        const isBookmarked = bookmarks.includes(les.id);

                        return (
                          <div
                            key={les.id}
                            onClick={() => setActiveLesson(les)}
                            className={`p-2 rounded-lg cursor-pointer transition-colors flex items-start justify-between gap-2 ${
                              isCurrentActive
                                ? 'bg-[#1E2638] text-white'
                                : 'hover:bg-[#161D2C] text-gray-300'
                            }`}
                          >
                            <div className="flex items-start gap-2 min-w-0">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleToggleComplete(les.id);
                                }}
                                className="mt-0.5 text-gray-500 hover:text-emerald-400 transition-colors shrink-0 cursor-pointer"
                              >
                                {isDone ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                ) : (
                                  <Circle className="w-4 h-4 text-gray-500" />
                                )}
                              </button>
                              <div className="flex flex-col min-w-0">
                                <span
                                  className={`text-[12px] leading-tight ${
                                    isCurrentActive ? 'text-white font-semibold' : 'text-gray-300'
                                  }`}
                                >
                                  {les.title}
                                </span>
                                <span className="text-[10px] text-gray-500 mt-1 flex items-center gap-1.5">
                                  <span>{les.readTime}</span>
                                  {les.challengeRef && (
                                    <span className="text-[#F97316] font-medium">• Thực hành 3D</span>
                                  )}
                                </span>
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

        {/* Right Wide Reader Canvas */}
        <div className={`${!activeLesson ? 'hidden md:flex' : 'flex'} flex-1 flex-col h-full overflow-hidden bg-[#0B0F19]`}>
          {activeLesson ? (
            <div className="flex-1 flex flex-col h-full overflow-hidden">
              {/* Reader Action Bar */}
              <div className="px-4 lg:px-8 py-2.5 bg-[#0F131E] border-b border-[#1C2333] flex items-center justify-between gap-2.5 shrink-0">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveLesson(null)}
                    className="md:hidden p-1.5 rounded-lg bg-[#182030] border border-[#273248] text-gray-300 hover:text-white flex items-center gap-1 text-[11px] cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Mục lục</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleToggleComplete(activeLesson.id)}
                    className={`px-3 py-1.5 rounded-lg text-[12px] font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                      completedIds.includes(activeLesson.id)
                        ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                        : 'bg-[#161D2C] text-gray-300 hover:text-white border border-[#242E44]'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="hidden sm:inline">
                      {completedIds.includes(activeLesson.id) ? 'Đã hoàn thành' : 'Đánh dấu đã học'}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleToggleBookmark(activeLesson.id)}
                    className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                      bookmarks.includes(activeLesson.id)
                        ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
                        : 'bg-[#161D2C] border-[#242E44] text-gray-400 hover:text-white'
                    }`}
                    title="Lưu bài học"
                  >
                    <Bookmark className={`w-4 h-4 ${bookmarks.includes(activeLesson.id) ? 'fill-amber-400 text-amber-400' : ''}`} />
                  </button>
                </div>

                {activeLesson.challengeRef && onOpenPracticeChallenge && (
                  <button
                    type="button"
                    onClick={() => onOpenPracticeChallenge(activeLesson.challengeRef!)}
                    className="px-3.5 py-1.5 rounded-lg bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold text-[12px] flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Box className="w-3.5 h-3.5" />
                    <span>Thực hành 3D</span>
                  </button>
                )}
              </div>

              {/* Wide Scrollable Article Content + Collapsible Inline Notes */}
              <div
                ref={rightReaderRef}
                onScroll={(e) => {
                  writePersistedCurriculumState({ rightScrollTop: e.currentTarget.scrollTop });
                }}
                className="flex-1 overflow-y-auto p-6 lg:p-10 select-text"
              >
                <div className="max-w-3xl mx-auto space-y-6 pb-10">
                  {/* Minimal Metadata Line */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#1C2333] text-[12px] text-gray-400">
                    <div className="flex items-center gap-2">
                      <span className="text-[#F97316] font-semibold">{activeLesson.category}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {activeLesson.readTime}
                      </span>
                    </div>

                    {activeLesson.keyShortcuts && activeLesson.keyShortcuts.length > 0 && (
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {activeLesson.keyShortcuts.slice(0, 4).map((sc, i) => (
                          <KeycapBadge key={i} keys={sc} variant="default" size="sm" />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Markdown Body */}
                  <MarkdownArticleViewer content={activeLesson.contentMarkdown} />

                  {/* Collapsible Personal Notes Block (Inline, no 4th column clutter) */}
                  <div className="mt-8 rounded-xl bg-[#111623] border border-[#1E2638] overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setNotesExpanded(!notesExpanded)}
                      className="w-full px-4 py-3 flex items-center justify-between text-[13px] font-semibold text-gray-200 hover:bg-[#151B2A] transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[#F97316]" />
                        <span>Ghi chú cá nhân {noteContent.trim() ? '(Đã có nội dung)' : ''}</span>
                      </span>
                      {notesExpanded ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronRight className="w-4 h-4 text-gray-400" />}
                    </button>

                    {notesExpanded && (
                      <div className="p-4 pt-2 border-t border-[#1C2333] flex flex-col gap-3">
                        <textarea
                          value={noteContent}
                          onChange={(e) => setNoteContent(e.target.value)}
                          placeholder="Ghi lại phím tắt khó nhớ hoặc lưu ý thực hành cho bài này..."
                          rows={4}
                          className="w-full p-3 rounded-lg bg-[#0B0F19] border border-[#222B3F] text-[13px] text-gray-200 placeholder-gray-500 focus:outline-none focus:border-[#F97316] resize-none font-sans leading-relaxed"
                        />
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] text-gray-400">
                            {isNoteSaved ? '✓ Đã lưu & sẵn sàng đồng bộ Cloud' : 'Tự động đồng bộ khi bấm Lưu'}
                          </span>
                          <button
                            type="button"
                            onClick={handleSaveNote}
                            className="px-3.5 py-1.5 rounded-lg bg-[#1E2638] hover:bg-[#27324A] text-white text-[12px] font-medium flex items-center gap-1.5 cursor-pointer transition-colors"
                          >
                            <Save className="w-3.5 h-3.5" />
                            <span>Lưu ghi chú</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Clean Completion Footer */}
                  <div className="p-5 rounded-xl bg-[#121723] border border-[#1E2638] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Award className="w-6 h-6 text-emerald-400 shrink-0" />
                      <div>
                        <h4 className="text-[14px] font-bold text-white">Hoàn thành bài học này?</h4>
                        <p className="text-[12px] text-gray-400">Đánh dấu để lưu tiến độ vào tài khoản của bạn.</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleToggleComplete(activeLesson.id)}
                      className={`px-4 py-2 rounded-lg text-[13px] font-semibold transition-colors cursor-pointer shrink-0 ${
                        completedIds.includes(activeLesson.id)
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#F97316] hover:bg-[#EA580C] text-white'
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
              <BookOpen className="w-10 h-10 text-gray-600 mb-3" />
              <p className="text-sm">Chọn một bài học ở danh mục bên trái để bắt đầu.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
