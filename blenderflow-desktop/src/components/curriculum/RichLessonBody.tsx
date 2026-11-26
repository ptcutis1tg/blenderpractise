import React from 'react';
import { CurriculumLesson } from '../../data/curriculumDatabase';
import { MarkdownArticleViewer } from './MarkdownArticleViewer';
import { PrincipleLabWidget } from './PrincipleLabWidget';
import { ConceptCheckDeck } from './ConceptCheckDeck';
import { VideoIllustrationCard } from './VideoIllustrationCard';

interface RichLessonBodyProps {
  lesson: CurriculumLesson;
  isMastered?: boolean;
  onLessonMastered?: (lessonId: string) => void;
}

export const RichLessonBody: React.FC<RichLessonBodyProps> = ({
  lesson,
  isMastered = false,
  onLessonMastered,
}) => {
  return (
    <div className="space-y-4">
      {/* 1. Interactive Brilliant-style Visual Principle Lab (when applicable) */}
      {lesson.interactiveLabId && <PrincipleLabWidget labId={lesson.interactiveLabId} />}

      {/* 2. Core Structured Lesson Markdown */}
      <MarkdownArticleViewer content={lesson.contentMarkdown} />

      {/* 3. Concept Check Micro-Quizzes */}
      {lesson.conceptChecks && lesson.conceptChecks.length > 0 && (
        <ConceptCheckDeck
          lessonId={lesson.id}
          checks={lesson.conceptChecks}
          isAlreadyMastered={isMastered}
          onMastered={onLessonMastered}
        />
      )}

      {/* 4. Curated & Verified YouTube Video Illustration Facade */}
      {lesson.videoResources && lesson.videoResources.length > 0 && (
        <VideoIllustrationCard videos={lesson.videoResources} />
      )}
    </div>
  );
};
