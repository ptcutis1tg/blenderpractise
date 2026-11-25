import React, { useState } from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Circle, 
  Lock, 
  ChevronDown, 
  ChevronRight, 
  Play, 
  Box, 
  Clock, 
  Layers, 
  FileText,
  Sparkles,
  Award,
  BookOpen
} from 'lucide-react';
import { Roadmap, CourseModule, Lesson, PracticeTask } from '../types';
import { PracticeBlock } from '../components/course/PracticeBlock';
import { SlideOverReader } from '../components/course/SlideOverReader';
import { KeycapBadge } from '../components/common/KeycapBadge';

interface CourseWorkspaceViewProps {
  roadmap: Roadmap;
  onBack: () => void;
  onOpenPracticeChallenge: (taskId: string) => void;
  onToggleLessonCompleted: (lessonId: string) => void;
  onLaunchHotkeyDrill: () => void;
  onOpenStarterBlend?: (fileName: string) => void;
}

export const CourseWorkspaceView: React.FC<CourseWorkspaceViewProps> = ({
  roadmap,
  onBack,
  onOpenPracticeChallenge,
  onToggleLessonCompleted,
  onLaunchHotkeyDrill,
  onOpenStarterBlend,
}) => {
  // Dynamically expand the first unlocked, incomplete module (fallback to first module)
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});
  const [readingLesson, setReadingLesson] = useState<Lesson | null>(null);
  const [activeModuleTitle, setActiveModuleTitle] = useState<string>('');
  const [activePracticeTaskId, setActivePracticeTaskId] = useState<string | undefined>(undefined);

  React.useEffect(() => {
    const firstActive =
      roadmap.modules.find((m) => !m.isLocked && !m.isCompleted) || roadmap.modules[0];
    const initialMap: Record<string, boolean> = {};
    roadmap.modules.forEach((m) => {
      initialMap[m.id] = firstActive ? m.id === firstActive.id : false;
    });
    setExpandedModules(initialMap);
  }, [roadmap.id]);

  const toggleModule = (modId: string) => {
    setExpandedModules((prev) => ({ ...prev, [modId]: !prev[modId] }));
  };

  const handleOpenReader = (lesson: Lesson, mod: CourseModule) => {
    setReadingLesson(lesson);
    setActiveModuleTitle(mod.title);
    const challenge = mod.practiceTasks.find((t) => t.type === '3d_challenge') || mod.practiceTasks[0];
    setActivePracticeTaskId(challenge?.id);
  };

  return (
    <div className="flex-1 h-full overflow-y-auto bg-[#0B0F19] text-[#dfe2f1] p-6 lg:p-8 select-none relative">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        {/* Navigation & Header */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            type="button"
            className="p-2 rounded-lg bg-[#141A28] border border-[#1F2637] text-gray-400 hover:text-white hover:bg-[#1E2538] transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2 text-[12px] text-gray-400">
            <span>Roadmaps</span>
            <span>/</span>
            <span className="text-white font-medium">{roadmap.title}</span>
          </div>
        </div>

        {/* Course Header Banner */}
        <div className="p-6 rounded-2xl bg-[#141A28] border border-[#1F2637] flex flex-col gap-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {roadmap.category}
                </span>
                <span className="text-[12px] text-gray-400">{roadmap.totalLessons} Total Lessons & Challenges</span>
              </div>
              <h1 className="font-['Space_Grotesk'] text-2xl font-bold text-white">
                {roadmap.title}
              </h1>
              <p className="text-[13px] text-gray-400 mt-1 max-w-2xl leading-relaxed">
                {roadmap.description}
              </p>
            </div>

            <div className="w-full md:w-56 flex flex-col gap-1.5 p-3 rounded-xl bg-[#0F131D] border border-[#1F2637] shrink-0">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-gray-400">Overall Progress</span>
                <span className="font-mono font-bold text-emerald-400">{roadmap.progressPercent}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#161D2B] overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full transition-all duration-300"
                  style={{ width: `${roadmap.progressPercent}%` }}
                />
              </div>
              <span className="text-[10px] text-gray-500 text-right mt-0.5">
                {roadmap.completedLessons} of {roadmap.totalLessons} completed
              </span>
            </div>
          </div>
        </div>

        {/* Module List with Accordion & Nested Lessons */}
        <div className="flex flex-col gap-4">
          {roadmap.modules.map((mod) => {
            const isExpanded = expandedModules[mod.id] ?? false;

            return (
              <div
                key={mod.id}
                className={`rounded-xl border transition-all overflow-hidden ${
                  mod.isLocked
                    ? 'bg-[#0E121C]/60 border-[#1B2232] opacity-75'
                    : 'bg-[#121622] border-[#1F2637]'
                }`}
              >
                {/* Module Header Bar */}
                <div
                  onClick={() => !mod.isLocked && toggleModule(mod.id)}
                  className={`p-4 flex items-center justify-between cursor-pointer ${
                    mod.isLocked ? 'cursor-not-allowed' : 'hover:bg-[#161D2B]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {mod.isLocked ? (
                      <div className="w-7 h-7 rounded-lg bg-[#1B2232] flex items-center justify-center text-gray-500">
                        <Lock className="w-4 h-4" />
                      </div>
                    ) : mod.isCompleted ? (
                      <div className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-lg bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-mono text-[12px] font-bold">
                        {mod.orderIndex}
                      </div>
                    )}

                    <div>
                      <h3 className="text-[14px] font-bold text-white flex items-center gap-2">
                        {mod.title}
                        {mod.isCompleted && (
                          <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.2 rounded font-medium flex items-center gap-1">
                            <Award className="w-3 h-3" /> Mastered
                          </span>
                        )}
                        {!mod.isCompleted && !mod.isLocked && (
                          <span className="text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-1.5 py-0.2 rounded font-mono font-medium">
                            ACTIVE
                          </span>
                        )}
                      </h3>
                      <p className="text-[11px] text-gray-400">{mod.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono font-semibold text-gray-400">
                      {mod.progressPercent}%
                    </span>
                    {!mod.isLocked && (
                      isExpanded ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronRight className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                </div>

                {/* Module Body: Lessons and Practice Block */}
                {isExpanded && !mod.isLocked && (
                  <div className="border-t border-[#1F2637] p-4 flex flex-col gap-2.5 bg-[#0D111A]">
                    {/* Lessons list */}
                    <div className="flex flex-col gap-2">
                      {mod.lessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          className={`p-3 rounded-lg border flex items-center justify-between gap-3 transition-colors group cursor-pointer ${
                            lesson.isActive
                              ? 'bg-[#182030] border-indigo-500/40 text-white shadow-sm'
                              : 'bg-[#121622] border-[#1C2333] text-gray-300 hover:bg-[#161D2B] hover:border-[#283248]'
                          }`}
                        >
                          <div 
                            className="flex items-center gap-3 flex-1"
                            onClick={() => handleOpenReader(lesson, mod)}
                          >
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onToggleLessonCompleted(lesson.id);
                              }}
                              className="text-gray-400 hover:text-emerald-400 transition-colors cursor-pointer"
                              title="Toggle lesson completion"
                            >
                              {lesson.isCompleted ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                              ) : (
                                <Circle className="w-4 h-4 text-gray-500 hover:text-indigo-400" />
                              )}
                            </button>
                            <span className={`text-[13px] font-medium group-hover:text-white transition-colors ${lesson.isCompleted ? 'text-gray-400 line-through' : 'text-gray-200'}`}>
                              {lesson.title}
                            </span>
                            {lesson.isActive && (
                              <span className="text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-1.5 py-0.2 rounded font-mono">
                                In Progress
                              </span>
                            )}
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
                            <span className="text-gray-500 group-hover:text-indigo-400 transition-colors text-[12px] font-semibold flex items-center gap-0.5">
                              <span>Read</span>
                              <span>→</span>
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Integrated Practice Block for this module */}
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

      {/* Focus Reader 80% Slide-Over Drawer */}
      <SlideOverReader
        lesson={readingLesson}
        moduleTitle={activeModuleTitle}
        practiceTaskId={activePracticeTaskId}
        isOpen={Boolean(readingLesson)}
        onClose={() => setReadingLesson(null)}
        onToggleComplete={(lessonId) => {
          onToggleLessonCompleted(lessonId);
          // Update local reading lesson state
          if (readingLesson && readingLesson.id === lessonId) {
            setReadingLesson({ ...readingLesson, isCompleted: !readingLesson.isCompleted });
          }
        }}
        onOpenChallenge={onOpenPracticeChallenge}
      />
    </div>
  );
};
