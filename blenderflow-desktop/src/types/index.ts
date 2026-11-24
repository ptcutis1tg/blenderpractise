export type NavigationTab = 'home' | 'search' | 'my-roadmaps' | 'curriculum' | 'hotkeys' | 'settings';

export interface HotkeyItem {
  id: string;
  keyCombination: string;
  description: string;
  mode: 'Object Mode' | 'Edit Mode' | 'Sculpt Mode' | 'Shader Editor';
  category: string;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  orderIndex: number;
  readTime: string;
  hotkeys: string[];
  isCompleted: boolean;
  isActive?: boolean;
  isLocked?: boolean;
}

export interface PracticeTask {
  id: string;
  moduleId: string;
  title: string;
  type: '3d_challenge' | 'hotkey_drill' | 'starter_file';
  blendFileName?: string;
  expectedVertices?: number;
  expectedFaces?: number;
  modifiers?: string;
  isCompleted: boolean;
  checklist: {
    id: string;
    stepNumber: number;
    title: string;
    hotkeyHint: string;
    isDone: boolean;
  }[];
}

export interface CourseModule {
  id: string;
  roadmapId: string;
  title: string;
  orderIndex: number;
  description: string;
  progressPercent: number;
  isCompleted: boolean;
  isLocked: boolean;
  lessons: Lesson[];
  practiceTasks: PracticeTask[];
}

export interface Roadmap {
  id: string;
  title: string;
  category: 'Modeling' | 'Shading' | 'Lighting' | 'Animation';
  description: string;
  totalLessons: number;
  completedLessons: number;
  progressPercent: number;
  lastStudied: string;
  currentLessonId?: string;
  currentLessonTitle?: string;
  modules: CourseModule[];
}

export interface UserStats {
  streakDays: number;
  blenderConnected: boolean;
  blenderVersion: string;
  totalHoursStudied: number;
}
