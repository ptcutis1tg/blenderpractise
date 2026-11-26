import React, { useState, useEffect } from 'react';
import { 
  X, 
  Maximize2, 
  Minimize2, 
  CheckCircle2, 
  Circle, 
  BookOpen, 
  Clock, 
  Lightbulb, 
  AlertTriangle, 
  Info, 
  Save, 
  ArrowRight,
  Box,
  Layers,
  Sparkles
} from 'lucide-react';
import { KeycapBadge } from '../common/KeycapBadge';
import { RichLessonBody } from '../curriculum/RichLessonBody';
import { MarkdownArticleViewer } from '../curriculum/MarkdownArticleViewer';
import { DETAILED_LESSONS, NotesService, DetailedLesson, getLinkedCurriculumLesson } from '../../data/lessonDetails';
import { CurriculumService } from '../../data/curriculumDatabase';
import { Lesson } from '../../types';

interface SlideOverReaderProps {
  lesson: Lesson | null;
  moduleTitle: string;
  practiceTaskId?: string;
  isOpen: boolean;
  onClose: () => void;
  onToggleComplete: (lessonId: string) => void;
  onOpenChallenge?: (taskId: string) => void;
}

type TextSize = 'compact' | 'standard' | 'comfortable';

export const SlideOverReader: React.FC<SlideOverReaderProps> = ({
  lesson,
  moduleTitle,
  practiceTaskId,
  isOpen,
  onClose,
  onToggleComplete,
  onOpenChallenge,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [textSize, setTextSize] = useState<TextSize>('standard');
  const [noteContent, setNoteContent] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  // Load existing note when lesson ID changes
  useEffect(() => {
    if (lesson) {
      setNoteContent(NotesService.getNote(lesson.id));
      setIsSaved(false);
    }
  }, [lesson?.id]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !lesson) return null;

  // Resolve either curated detailed lesson or linked 26-lesson Encyclopedia article
  const linkedCurriculum = getLinkedCurriculumLesson(lesson.id);
  const structuredDetailed: DetailedLesson | undefined = DETAILED_LESSONS[lesson.id];

  const categoryLabel = structuredDetailed?.category || linkedCurriculum?.category || 'Blender 5.3 Workflow';
  const readTimeLabel = structuredDetailed?.readTime || linkedCurriculum?.readTime || lesson.readTime || '8 phút đọc';
  const summaryText =
    structuredDetailed?.summary ||
    linkedCurriculum?.summary ||
    `Hướng dẫn trọng tâm cho bài "${lesson.title}" thuộc học phần ${moduleTitle}.`;
  const hotkeysList =
    structuredDetailed?.blenderHotkeys ||
    (linkedCurriculum?.keyShortcuts?.length ? linkedCurriculum.keyShortcuts : lesson.hotkeys) ||
    [];

  // Build concise Markdown guide for dynamically AI-generated lessons if not mapped statically
  const dynamicLessonMarkdown = !structuredDetailed && !linkedCurriculum
    ? `## Hướng dẫn Thực hành: ${lesson.title}\n\n- **Học phần:** ${moduleTitle}\n- **Phím tắt trọng tâm:** ${
        hotkeysList.length > 0 ? hotkeysList.map((k) => `\`${k}\``).join(', ') : '`Tab`, `G`, `R`, `S`'
      }\n\n### Quy trình thao tác chuẩn trong Blender 5.3\n1. Kiểm tra tỷ lệ đối tượng ở **Object Mode** và bấm \`Ctrl + A\` $\\rightarrow$ *Apply All Transforms* trước khi dựng chi tiết.\n2. Sử dụng phím \`Tab\` chuyển sang **Edit Mode**, ưu tiên lưới **Quads (4 đỉnh)** và tránh để lại N-gons.\n3. Khi áp dụng **Bevel** hoặc **Mirror Modifier**, bật *Clipping* để ghép mép đối xứng chuẩn xác.\n\n> 💡 Bạn có thể mở **Bách khoa toàn thư 26 bài** để xem thêm lý thuyết chuyên sâu hoặc hỏi **3D Topology Doctor** ở góc dưới bên phải.`
    : null;

  const handleNoteChange = (text: string) => {
    setNoteContent(text);
    NotesService.saveNote(lesson.id, text);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const getTextClass = () => {
    switch (textSize) {
      case 'compact':
        return 'text-[13px] leading-relaxed';
      case 'comfortable':
        return 'text-[16px] leading-loose';
      case 'standard':
      default:
        return 'text-[14px] leading-relaxed';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* Backdrop blur with click to close */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity animate-fadeIn cursor-pointer"
      />

      {/* Slide-over Drawer Panel */}
      <div
        className={`absolute top-0 right-0 h-full bg-[#0F131D] border-l border-[#263045] shadow-2xl flex flex-col transition-all duration-300 ease-out z-10 ${
          isFullscreen ? 'w-full' : 'w-[80vw] max-w-5xl'
        }`}
      >
        {/* Top Header Bar */}
        <div className="h-14 px-6 border-b border-[#1F2637] bg-[#121622] flex items-center justify-between shrink-0">
          {/* Breadcrumbs & Title */}
          <div className="flex items-center gap-3 overflow-hidden">
            <button
              onClick={onClose}
              type="button"
              className="p-1.5 rounded-lg bg-[#182030] border border-[#2B354D] text-gray-400 hover:text-white hover:bg-[#202B40] transition-colors cursor-pointer"
              title="Close (Esc)"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 text-[12px] text-gray-400 truncate">
              <span>{moduleTitle}</span>
              <span>/</span>
              <span className="text-white font-medium truncate">{lesson.title}</span>
            </div>
          </div>

          {/* Controls: Font Sizer, Fullscreen, Close */}
          <div className="flex items-center gap-2.5">
            {/* Font Size Toggle Aa */}
            <div className="flex items-center bg-[#182030] rounded-lg border border-[#2B354D] p-0.5">
              <button
                type="button"
                onClick={() => setTextSize('compact')}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all ${
                  textSize === 'compact' ? 'bg-[#4F46E5] text-white' : 'text-gray-400 hover:text-white'
                }`}
                title="Compact font size"
              >
                A-
              </button>
              <button
                type="button"
                onClick={() => setTextSize('standard')}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all ${
                  textSize === 'standard' ? 'bg-[#4F46E5] text-white' : 'text-gray-400 hover:text-white'
                }`}
                title="Standard font size"
              >
                Aa
              </button>
              <button
                type="button"
                onClick={() => setTextSize('comfortable')}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all ${
                  textSize === 'comfortable' ? 'bg-[#4F46E5] text-white' : 'text-gray-400 hover:text-white'
                }`}
                title="Comfortable large font size"
              >
                A+
              </button>
            </div>

            <div className="w-[1px] h-4 bg-[#2B354D]" />

            {/* Fullscreen Toggle */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              type="button"
              className="p-1.5 rounded-lg bg-[#182030] border border-[#2B354D] text-gray-400 hover:text-white hover:bg-[#202B40] transition-colors cursor-pointer"
              title={isFullscreen ? '80% Width View' : '100% Fullscreen'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Scrollable Reader Body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 select-text">
          <div className="max-w-3xl mx-auto flex flex-col gap-8 pb-12">
            {/* Lesson Title & Summary */}
            <div className="flex flex-col gap-3 border-b border-[#1F2637] pb-6">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {categoryLabel}
                </span>
                <span className="text-[12px] text-gray-400 flex items-center gap-1 font-mono">
                  <Clock className="w-3.5 h-3.5 text-indigo-400" /> {readTimeLabel}
                </span>
              </div>

              <h1 className="font-['Space_Grotesk'] text-2xl md:text-3xl font-bold text-white tracking-tight">
                {lesson.title}
              </h1>

              <p className="text-[14px] text-gray-300 leading-relaxed font-normal">
                {summaryText}
              </p>

              {/* Hotkeys Section */}
              {hotkeysList.length > 0 && (
                <div className="flex items-center gap-2 pt-2 flex-wrap">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                    Key Shortcuts:
                  </span>
                  <div className="flex items-center gap-2 flex-wrap">
                    {hotkeysList.map((hk, i) => (
                      <KeycapBadge key={i} keys={hk} variant="orange" size="md" />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Unified Vietnamese Rich Lesson Content (Interactive Lab + Markdown + Concept Checks + Video) */}
            {linkedCurriculum ? (
              <div className="pt-2 border-t border-[#1F2637]/70">
                <RichLessonBody
                  lesson={linkedCurriculum}
                  isMastered={CurriculumService.getMasteredLessonIds().includes(linkedCurriculum.id)}
                  onLessonMastered={(id) => CurriculumService.markLessonMastered(id)}
                />
              </div>
            ) : (
              <>
                {structuredDetailed?.sections.map((section, idx) => (
                  <div key={idx} className="flex flex-col gap-4">
                    <h2 className="font-['Space_Grotesk'] text-lg md:text-xl font-bold text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#F97316]" />
                      {section.title}
                    </h2>
                    <div className={`flex flex-col gap-3 text-gray-300 ${getTextClass()}`}>
                      {section.body.map((p, pIdx) => (
                        <p key={pIdx}>{p}</p>
                      ))}
                    </div>
                  </div>
                ))}
                {dynamicLessonMarkdown && (
                  <div className="pt-2 border-t border-[#1F2637]/70">
                    <MarkdownArticleViewer content={dynamicLessonMarkdown} />
                  </div>
                )}
              </>
            )}

            {/* Student Personal Study Notes Area */}
            <div className="mt-6 p-5 rounded-2xl bg-[#141A28] border border-[#232D42] flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-bold text-white flex items-center gap-2">
                  <Save className="w-4 h-4 text-[#F97316]" />
                  Ghi chú cá nhân cho bài học này
                </span>
                {isSaved && (
                  <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Đã lưu tự động
                  </span>
                )}
              </div>
              <textarea
                value={noteContent}
                onChange={(e) => handleNoteChange(e.target.value)}
                placeholder="Ghi lại các phím tắt cần nhớ hoặc nhận xét cá nhân..."
                rows={4}
                className="w-full p-3.5 rounded-xl bg-[#0B0F19] border border-[#1F2637] text-white text-[13px] leading-relaxed focus:outline-none focus:border-[#F97316] placeholder-gray-500 resize-none font-sans"
              />
            </div>
          </div>
        </div>

        {/* Bottom Floating Action Bar */}
        <div className="h-16 px-6 border-t border-[#1F2637] bg-[#121622] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[12px] text-gray-400">Trạng thái:</span>
            {lesson.isCompleted ? (
              <span className="text-[12px] font-bold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Đã hoàn thành
              </span>
            ) : (
              <span className="text-[12px] font-bold text-gray-400 flex items-center gap-1">
                <Circle className="w-4 h-4" /> Đang học
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {onOpenChallenge && practiceTaskId && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenChallenge(practiceTaskId);
                }}
                className="px-4 py-2 rounded-xl bg-[#1E2538] hover:bg-[#252E45] text-gray-200 border border-[#2D3852] text-[12px] font-semibold transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Box className="w-4 h-4 text-[#F97316]" />
                <span>Thực hành 3D (50:50)</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => onToggleComplete(lesson.id)}
              className={`px-5 py-2 rounded-xl font-semibold text-[13px] transition-colors flex items-center gap-2 cursor-pointer ${
                lesson.isCompleted
                  ? 'bg-[#182030] text-gray-300 hover:text-white border border-[#2B354D]'
                  : 'bg-[#F97316] hover:bg-[#EA580C] text-white'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{lesson.isCompleted ? 'Bỏ đánh dấu hoàn thành' : 'Đánh dấu hoàn thành'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
