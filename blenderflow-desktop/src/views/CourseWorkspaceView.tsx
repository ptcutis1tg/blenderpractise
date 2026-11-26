import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Circle, 
  Lock, 
  ChevronDown, 
  ChevronRight, 
  Clock, 
  Award
} from 'lucide-react';
import { Roadmap, CourseModule, Lesson } from '../types';
import { PracticeBlock } from '../components/course/PracticeBlock';
import { SlideOverReader } from '../components/course/SlideOverReader';
import { KeycapBadge } from '../components/common/KeycapBadge';

interface CourseWorkspaceViewProps {
  roadmap: Roadmap;
  isActive?: boolean;
  onBack: () => void;
  onOpenPracticeChallenge: (taskId: string) => void;
  onToggleLessonCompleted: (lessonId: string) => void;
  onLaunchHotkeyDrill: () => void;
  onOpenStarterBlend?: (fileName: string) => void;
}

interface PersistedCourseState {
  expandedModules?: Record<string, boolean>;
  readingLessonId?: string | null;
  activeModuleTitle?: string;
  activePracticeTaskId?: string;
  scrollTop?: number;
}

const COURSE_UI_STATE_KEY = 'blenderflow_course_ui_state';

function readPersistedCourseState(roadmapId: string): PersistedCourseState | null {
  try {
    const raw = sessionStorage.getItem(COURSE_UI_STATE_KEY);
    if (!raw) return null;
    const all = JSON.parse(raw) as Record<string, PersistedCourseState>;
    return all[roadmapId] || null;
  } catch {
    return null;
  }
}

function writePersistedCourseState(roadmapId: string, patch: PersistedCourseState): void {
  try {
    const raw = sessionStorage.getItem(COURSE_UI_STATE_KEY);
    const all: Record<string, PersistedCourseState> = raw ? JSON.parse(raw) : {};
    all[roadmapId] = { ...(all[roadmapId] || {}), ...patch };
    sessionStorage.setItem(COURSE_UI_STATE_KEY, JSON.stringify(all));
  } catch {
    // Ignore storage quota errors
  }
}

export const CourseWorkspaceView: React.FC<CourseWorkspaceViewProps> = ({
  roadmap,
  isActive = true,
  onBack,
  onOpenPracticeChallenge,
  onToggleLessonCompleted,
  onLaunchHotkeyDrill,
  onOpenStarterBlend,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>(() => {
    const persisted = readPersistedCourseState(roadmap.id);
    if (persisted?.expandedModules) return persisted.expandedModules;
    const firstActive = roadmap.modules.find((m) => !m.isLocked && !m.isCompleted) || roadmap.modules[0];
    const initialMap: Record<string, boolean> = {};
    roadmap.modules.forEach((m) => {
      initialMap[m.id] = firstActive ? m.id === firstActive.id : false;
    });
    return initialMap;
  });

  const [readingLessonId, setReadingLessonId] = useState<string | null>(() => {
    return readPersistedCourseState(roadmap.id)?.readingLessonId || null;
  });
  const [activeModuleTitle, setActiveModuleTitle] = useState<string>(() => {
    return readPersistedCourseState(roadmap.id)?.activeModuleTitle || '';
  });
  const [activePracticeTaskId, setActivePracticeTaskId] = useState<string | undefined>(() => {
    return readPersistedCourseState(roadmap.id)?.activePracticeTaskId;
  });

  // Load persisted state when switching to a different roadmap
  useEffect(() => {
    const persisted = readPersistedCourseState(roadmap.id);
    if (persisted?.expandedModules) {
      setExpandedModules(persisted.expandedModules);
    } else {
      const firstActive =
        roadmap.modules.find((m) => !m.isLocked && !m.isCompleted) || roadmap.modules[0];
      const initialMap: Record<string, boolean> = {};
      roadmap.modules.forEach((m) => {
        initialMap[m.id] = firstActive ? m.id === firstActive.id : false;
      });
      setExpandedModules(initialMap);
    }

    setReadingLessonId(persisted?.readingLessonId || null);
    setActiveModuleTitle(persisted?.activeModuleTitle || '');
    setActivePracticeTaskId(persisted?.activePracticeTaskId);

    requestAnimationFrame(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = persisted?.scrollTop || 0;
      }
    });
  }, [roadmap.id]);

  // Restore scroll position when returning to visible view
  useEffect(() => {
    if (!isActive) return;
    const persisted = readPersistedCourseState(roadmap.id);
    if (persisted?.scrollTop && scrollContainerRef.current && scrollContainerRef.current.scrollTop === 0) {
      requestAnimationFrame(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTop = persisted.scrollTop || 0;
        }
      });
    }
  }, [isActive, roadmap.id]);

  const readingLesson = useMemo<Lesson | null>(() => {
    if (!readingLessonId) return null;
    for (const mod of roadmap.modules) {
      const found = mod.lessons.find((l) => l.id === readingLessonId);
      if (found) return found;
    }
    return null;
  }, [readingLessonId, roadmap]);

  const toggleModule = (modId: string) => {
    setExpandedModules((prev) => {
      const next = { ...prev, [modId]: !prev[modId] };
      writePersistedCourseState(roadmap.id, { expandedModules: next });
      return next;
    });
  };

  const handleOpenReader = (lesson: Lesson, mod: CourseModule) => {
    const challenge = mod.practiceTasks.find((t) => t.type === '3d_challenge') || mod.practiceTasks[0];
    setReadingLessonId(lesson.id);
    setActiveModuleTitle(mod.title);
    setActivePracticeTaskId(challenge?.id);
    writePersistedCourseState(roadmap.id, {
      readingLessonId: lesson.id,
      activeModuleTitle: mod.title,
      activePracticeTaskId: challenge?.id,
    });
  };

  const handleCloseReader = () => {
    setReadingLessonId(null);
    writePersistedCourseState(roadmap.id, { readingLessonId: null });
  };

  return (
    <div
      ref={scrollContainerRef}
      onScroll={(e) => {
        writePersistedCourseState(roadmap.id, { scrollTop: e.currentTarget.scrollTop });
      }}
      className="flex-1 h-full overflow-y-auto bg-[#0B0F19] text-[#dfe2f1] p-6 lg:p-8 select-none relative"
    >
      <div className="max-w-4xl mx-auto flex flex-col gap-6 pb-12">
        {/* Navigation & Header */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            type="button"
            className="px-3 py-1.5 rounded-lg bg-[#141A28] border border-[#222B3F] text-gray-300 hover:text-white text-[12px] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Quay lại</span>
          </button>
          <span className="text-[12px] text-gray-500">/ {roadmap.category}</span>
        </div>

        {/* Course Header Banner */}
        <div className="p-6 rounded-2xl bg-[#121723] border border-[#1E2638] flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div>
            <h1 className="font-['Space_Grotesk'] text-xl lg:text-2xl font-bold text-white">
              {roadmap.title}
            </h1>
            <p className="text-[13px] text-gray-400 mt-1.5 max-w-2xl leading-relaxed">
              {roadmap.description}
            </p>
          </div>

          <div className="w-full md:w-52 flex flex-col gap-1.5 p-3 rounded-xl bg-[#0B0F19] border border-[#1C2333] shrink-0">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-gray-400">Tiến độ lộ trình</span>
              <span className="font-mono font-bold text-white">{roadmap.progressPercent}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#161D2B] overflow-hidden">
              <div
                className="h-full bg-[#F97316] rounded-full transition-all duration-300"
                style={{ width: `${roadmap.progressPercent}%` }}
              />
            </div>
            <span className="text-[10px] text-gray-500 text-right">
              {roadmap.completedLessons} / {roadmap.totalLessons} mục hoàn thành
            </span>
          </div>
        </div>

        {/* Module Accordion List */}
        <div className="flex flex-col gap-3.5">
          {roadmap.modules.map((mod) => {
            const isExpanded = expandedModules[mod.id] ?? false;

            return (
              <div
                key={mod.id}
                className={`rounded-xl border transition-colors overflow-hidden ${
                  mod.isLocked
                    ? 'bg-[#0E121C]/60 border-[#1B2232] opacity-70'
                    : 'bg-[#121723] border-[#1E2638]'
                }`}
              >
                <div
                  onClick={() => !mod.isLocked && toggleModule(mod.id)}
                  className={`p-4 flex items-center justify-between ${
                    mod.isLocked ? 'cursor-not-allowed' : 'hover:bg-[#151C2B] cursor-pointer'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {mod.isLocked ? (
                      <div className="w-7 h-7 rounded-lg bg-[#1B2232] flex items-center justify-center text-gray-500">
                        <Lock className="w-4 h-4" />
                      </div>
                    ) : mod.isCompleted ? (
                      <div className="w-7 h-7 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-400">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-lg bg-[#1C2436] flex items-center justify-center text-[#F97316] font-mono text-[12px] font-bold">
                        {mod.orderIndex}
                      </div>
                    )}

                    <div>
                      <h3 className="text-[14px] font-bold text-white flex items-center gap-2">
                        <span>{mod.title}</span>
                        {mod.isCompleted && <Award className="w-4 h-4 text-emerald-400" />}
                      </h3>
                      <p className="text-[12px] text-gray-400">{mod.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono text-gray-400">{mod.progressPercent}%</span>
                    {!mod.isLocked &&
                      (isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      ))}
                  </div>
                </div>

                {isExpanded && !mod.isLocked && (
                  <div className="border-t border-[#1C2333] p-4 flex flex-col gap-2.5 bg-[#0D111A]">
                    <div className="flex flex-col gap-2">
                      {mod.lessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          className="p-3 rounded-lg border border-[#1C2333] bg-[#121723] hover:border-[#2C3752] flex items-center justify-between gap-3 transition-colors group cursor-pointer"
                        >
                          <div
                            className="flex items-center gap-3 flex-1 min-w-0"
                            onClick={() => handleOpenReader(lesson, mod)}
                          >
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onToggleLessonCompleted(lesson.id);
                              }}
                              className="text-gray-400 hover:text-emerald-400 transition-colors cursor-pointer shrink-0"
                              title="Đánh dấu hoàn thành"
                            >
                              {lesson.isCompleted ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                              ) : (
                                <Circle className="w-4 h-4 text-gray-500" />
                              )}
                            </button>
                            <span
                              className={`text-[13px] font-medium truncate ${
                                lesson.isCompleted ? 'text-gray-500 line-through' : 'text-gray-200 group-hover:text-white'
                              }`}
                            >
                              {lesson.title}
                            </span>
                          </div>

                          <div
                            className="flex items-center gap-3 shrink-0"
                            onClick={() => handleOpenReader(lesson, mod)}
                          >
                            {lesson.hotkeys.length > 0 && (
                              <div className="hidden sm:flex items-center gap-1.5">
                                {lesson.hotkeys.slice(0, 2).map((hk, i) => (
                                  <KeycapBadge key={i} keys={hk} size="sm" variant="default" />
                                ))}
                              </div>
                            )}
                            <span className="text-[11px] text-gray-500 flex items-center gap-1 font-mono">
                              <Clock className="w-3 h-3" /> {lesson.readTime}
                            </span>
                            <span className="text-gray-400 group-hover:text-[#F97316] transition-colors text-[12px] font-medium">
                              Đọc bài →
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {mod.practiceTasks.length > 0 && (
                      <PracticeBlock
                        practiceTasks={mod.practiceTasks}
                        moduleTitle={mod.title}
                        onOpenChallenge={onOpenPracticeChallenge}
                        onLaunchHotkeyDrill={onLaunchHotkeyDrill}
                        onOpenStarterBlend={onOpenStarterBlend}
                      />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Focus Reader Slide-Over */}
      <SlideOverReader
        lesson={readingLesson}
        moduleTitle={activeModuleTitle}
        practiceTaskId={activePracticeTaskId}
        isOpen={Boolean(readingLesson)}
        onClose={handleCloseReader}
        onToggleComplete={(lessonId) => {
          onToggleLessonCompleted(lessonId);
        }}
        onOpenChallenge={onOpenPracticeChallenge}
      />
    </div>
  );
};
