import { Roadmap, HotkeyItem, UserStats, PracticeTask, CourseModule } from '../types';

const STORAGE_KEYS = {
  ROADMAPS: 'blenderflow_roadmaps_v1',
  USER_STATS: 'blenderflow_stats_v1',
  LAST_ACTIVE_DATE: 'blenderflow_last_active_date_v1',
};

export const INITIAL_USER_STATS: UserStats = {
  streakDays: 0,
  blenderConnected: false,
  blenderVersion: 'Blender 5.3 LTS',
  totalHoursStudied: 0,
};

export const INITIAL_HOTKEYS: HotkeyItem[] = [
  { id: 'hk-1', keyCombination: 'Tab', description: 'Toggle Edit Mode / Object Mode', mode: 'Object Mode', category: 'Navigation' },
  { id: 'hk-2', keyCombination: 'G', description: 'Grab / Move selected element', mode: 'Object Mode', category: 'Transform' },
  { id: 'hk-3', keyCombination: 'R', description: 'Rotate selected element', mode: 'Object Mode', category: 'Transform' },
  { id: 'hk-4', keyCombination: 'S', description: 'Scale selected element', mode: 'Object Mode', category: 'Transform' },
  { id: 'hk-5', keyCombination: 'E', description: 'Extrude region along normal', mode: 'Edit Mode', category: 'Modeling' },
  { id: 'hk-6', keyCombination: 'I', description: 'Inset faces', mode: 'Edit Mode', category: 'Modeling' },
  { id: 'hk-7', keyCombination: 'Ctrl + B', description: 'Bevel selected edges/vertices', mode: 'Edit Mode', category: 'Modeling' },
  { id: 'hk-8', keyCombination: 'Ctrl + R', description: 'Loop Cut and Slide', mode: 'Edit Mode', category: 'Modeling' },
  { id: 'hk-9', keyCombination: 'Alt + Z', description: 'Toggle X-Ray view mode', mode: 'Object Mode', category: 'Viewport' },
  { id: 'hk-10', keyCombination: 'Shift + A', description: 'Add new Object / Node menu', mode: 'Object Mode', category: 'Creation' },
  { id: 'hk-11', keyCombination: 'Z', description: 'Shading pie menu (Wireframe, Solid, Rendered)', mode: 'Object Mode', category: 'Viewport' },
  { id: 'hk-12', keyCombination: 'M', description: 'Move to New/Existing Collection', mode: 'Object Mode', category: 'Organization' },
];

export const INITIAL_ROADMAPS: Roadmap[] = [
  {
    id: 'roadmap-hard-surface',
    title: 'Hard-Surface & Low-Poly 3D Modeling',
    category: 'Modeling',
    description: 'Master non-destructive quad modeling workflows, mesh topology rules, and bevel techniques in Blender 5.3.',
    totalLessons: 11,
    completedLessons: 0,
    progressPercent: 0,
    lastStudied: 'Not started',
    currentLessonId: 'task-chair-01',
    currentLessonTitle: 'Challenge 04: Low-Poly Stylized Wooden Chair',
    modules: [
      {
        id: 'mod-1',
        roadmapId: 'roadmap-hard-surface',
        title: 'Module 1: Viewport Navigation & Transform Mastery',
        orderIndex: 1,
        description: 'Blender 5.3 3D navigation, origin points, 3D Cursor, and precision snapping.',
        progressPercent: 0,
        isCompleted: false,
        isLocked: false,
        lessons: [
          { id: 'les-1-1', moduleId: 'mod-1', title: '1.1 Viewport Orbit, Pan, and Orthographic Projections', orderIndex: 1, readTime: '5 min', hotkeys: ['Middle Click', 'Shift + MMB', 'Numpad 1,3,7'], isCompleted: false },
          { id: 'les-1-2', moduleId: 'mod-1', title: '1.2 The Power of 3D Cursor and Transform Orientations', orderIndex: 2, readTime: '7 min', hotkeys: ['Shift + S', '.'], isCompleted: false },
          { id: 'les-1-3', moduleId: 'mod-1', title: '1.3 Precision Snapping to Vertices, Edges, and Grid', orderIndex: 3, readTime: '6 min', hotkeys: ['Shift + Tab', 'Ctrl'], isCompleted: false },
        ],
        practiceTasks: [
          {
            id: 'task-vp-01',
            moduleId: 'mod-1',
            title: 'Precision Align Drill',
            type: 'hotkey_drill',
            expectedVertices: 32,
            expectedFaces: 24,
            modifiers: 'None (Origin & Cursor)',
            isCompleted: false,
            checklist: [
              { id: 'c-1', stepNumber: 1, title: 'Align 4 cubes symmetrically around 3D Cursor', hotkeyHint: 'Shift + S -> Selection to Cursor', isDone: false },
              { id: 'c-2', stepNumber: 2, title: 'Snap vertices cleanly to grid bounds', hotkeyHint: 'Shift + Tab', isDone: false }
            ]
          }
        ]
      },
      {
        id: 'mod-2',
        roadmapId: 'roadmap-hard-surface',
        title: 'Module 2: Mesh Topology & Hard-Surface Tools',
        orderIndex: 2,
        description: 'Quad topology fundamentals, avoiding N-gons, loop cuts, and beveling.',
        progressPercent: 0,
        isCompleted: false,
        isLocked: false,
        lessons: [
          { id: 'les-2-1', moduleId: 'mod-2', title: '2.1 Edit Mode Selections: Vertex (1), Edge (2), Face (3)', orderIndex: 1, readTime: '4 min', hotkeys: ['1', '2', '3', 'Alt + Click'], isCompleted: false },
          { id: 'les-2-2', moduleId: 'mod-2', title: '2.2 Loop Cuts, Inset, and Extrude with Precision', orderIndex: 2, readTime: '8 min', hotkeys: ['Ctrl + R', 'I', 'E'], isCompleted: false },
          { id: 'les-2-3', moduleId: 'mod-2', title: '2.3 Bevel Modifier vs Destructive Bevel Weights', orderIndex: 3, readTime: '10 min', hotkeys: ['Ctrl + B', 'Ctrl + E'], isCompleted: false, isActive: true },
        ],
        practiceTasks: [
          {
            id: 'task-chair-01',
            moduleId: 'mod-2',
            title: 'Challenge 04: Low-Poly Stylized Wooden Chair',
            type: '3d_challenge',
            blendFileName: 'challenge_04_chair_starter.blend',
            expectedVertices: 148,
            expectedFaces: 136,
            modifiers: 'Mirror, Subdivision Surface, Bevel',
            isCompleted: false,
            checklist: [
              { id: 'step-1', stepNumber: 1, title: 'Add a Cube and scale down along Z-axis for Chair Seat', hotkeyHint: 'Shift + A -> Mesh -> Cube, S then Z', isDone: false },
              { id: 'step-2', stepNumber: 2, title: 'Enter Edit Mode, select bottom face and Inset with I', hotkeyHint: 'Tab, Face Mode (3), I', isDone: false },
              { id: 'step-3', stepNumber: 3, title: 'Add 2 Loop Cuts along X & Y to carve 4 equal corner leg roots', hotkeyHint: 'Ctrl + R -> Scroll Wheel 2', isDone: false },
              { id: 'step-4', stepNumber: 4, title: 'Extrude 4 corner faces downwards to create chair legs', hotkeyHint: 'E then -1.8 Z', isDone: false },
              { id: 'step-5', stepNumber: 5, title: 'Extrude rear top faces upward and bridge edges for Backrest', hotkeyHint: 'E, Ctrl + E -> Bridge Edge Loops', isDone: false },
              { id: 'step-6', stepNumber: 6, title: 'Apply Bevel modifier with 2 segments to soften wooden edges', hotkeyHint: 'Modifier Tab -> Add Bevel (0.02m)', isDone: false },
            ]
          }
        ]
      },
      {
        id: 'mod-3',
        roadmapId: 'roadmap-hard-surface',
        title: 'Module 3: Modifiers & Non-Destructive Workflow',
        orderIndex: 3,
        description: 'Harness Mirror, Array, Solidify, and Boolean modifiers for complex props.',
        progressPercent: 0,
        isCompleted: false,
        isLocked: false,
        lessons: [
          { id: 'les-3-1', moduleId: 'mod-3', title: '3.1 Mirror Modifier Mastery with Clipping & Merge', orderIndex: 1, readTime: '8 min', hotkeys: ['Ctrl + A -> Apply All Transforms'], isCompleted: false },
          { id: 'les-3-2', moduleId: 'mod-3', title: '3.2 Non-destructive Booleans without mesh artifacts', orderIndex: 2, readTime: '12 min', hotkeys: ['Fast / Exact Solver'], isCompleted: false },
        ],
        practiceTasks: [
          {
            id: 'task-sci-fi-crate',
            moduleId: 'mod-3',
            title: 'Challenge 05: Sci-Fi Military Storage Crate',
            type: '3d_challenge',
            blendFileName: 'challenge_05_scifi_crate.blend',
            expectedVertices: 420,
            expectedFaces: 398,
            modifiers: 'Mirror, Bevel, Weighted Normal',
            isCompleted: false,
            checklist: [
              { id: 'crate-1', stepNumber: 1, title: 'Bisect crate base and add X+Y Mirror Modifier with Clipping', hotkeyHint: 'Ctrl + R, Modifier -> Mirror', isDone: false },
              { id: 'crate-2', stepNumber: 2, title: 'Inset side panels and extrude recessed armor ribs', hotkeyHint: 'I then E', isDone: false },
              { id: 'crate-3', stepNumber: 3, title: 'Cut corner latches using Boolean Exact Solver', hotkeyHint: 'Modifier -> Boolean (Exact)', isDone: false },
              { id: 'crate-4', stepNumber: 4, title: 'Add Bevel (Angle 30°) + Weighted Normal (Keep Sharp)', hotkeyHint: 'Modifier -> Bevel + Weighted Normal', isDone: false },
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'roadmap-shading',
    title: 'Procedural Shading & Material Nodes',
    category: 'Shading',
    description: 'Learn shader math, PBR materials, procedural grunge maps, and displacement with Principled BSDF in Blender 5.3.',
    totalLessons: 2,
    completedLessons: 0,
    progressPercent: 0,
    lastStudied: 'Not started',
    currentLessonId: 'les-shade-01',
    currentLessonTitle: '1.1 Principled BSDF v2 Deep Dive',
    modules: [
      {
        id: 'mod-shade-1',
        roadmapId: 'roadmap-shading',
        title: 'Module 1: PBR Fundamentals & Node Wrangler',
        orderIndex: 1,
        description: 'Understand roughness, metallic, IOR, and speed up work with Node Wrangler.',
        progressPercent: 0,
        isCompleted: false,
        isLocked: false,
        lessons: [
          { id: 'les-shade-01', moduleId: 'mod-shade-1', title: '1.1 Principled BSDF v2 Deep Dive', orderIndex: 1, readTime: '10 min', hotkeys: ['Ctrl + T', 'Ctrl + Shift + Click'], isCompleted: false },
          { id: 'les-shade-02', moduleId: 'mod-shade-1', title: '1.2 Procedural Wood Grain & Bump Mapping', orderIndex: 2, readTime: '14 min', hotkeys: ['Wave Texture', 'ColorRamp', 'Bump Node'], isCompleted: false, isActive: true },
        ],
        practiceTasks: []
      }
    ]
  },
  {
    id: 'roadmap-lighting',
    title: 'Cinematic 3-Point Lighting & Cycles Rendering',
    category: 'Lighting',
    description: 'Master photographic light balance, HDRI studio rigs, light linking, and real-time Cycles viewport rendering.',
    totalLessons: 1,
    completedLessons: 0,
    progressPercent: 0,
    lastStudied: 'Not started',
    currentLessonId: 'les-light-01',
    currentLessonTitle: '1.1 Key, Fill, and Rim Light Ratios',
    modules: [
      {
        id: 'mod-light-1',
        roadmapId: 'roadmap-lighting',
        title: 'Module 1: Studio Lighting Setups',
        orderIndex: 1,
        description: 'Classic product and character lighting with area lights and softboxes.',
        progressPercent: 0,
        isCompleted: false,
        isLocked: false,
        lessons: [
          { id: 'les-light-01', moduleId: 'mod-light-1', title: '1.1 Key, Fill, and Rim Light Ratios', orderIndex: 1, readTime: '9 min', hotkeys: ['Shift + A -> Light -> Area'], isCompleted: false },
        ],
        practiceTasks: []
      }
    ]
  }
];

export class DatabaseService {
  /**
   * Recomputes module and roadmap completion metrics from actual lessons and tasks
   */
  static recalculateRoadmapMetrics(roadmaps: Roadmap[]): Roadmap[] {
    return roadmaps.map((rm) => {
      const updatedModules = rm.modules.map((mod, mIdx) => {
        const totalItems = mod.lessons.length + mod.practiceTasks.length;
        const completedItems =
          mod.lessons.filter((l) => l.isCompleted).length +
          mod.practiceTasks.filter((t) => t.isCompleted).length;
        const progressPercent = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
        const isCompleted = totalItems > 0 && progressPercent === 100;

        return {
          ...mod,
          progressPercent,
          isCompleted,
          isLocked: mIdx === 0 ? false : mod.isLocked,
        };
      });

      // Unlock next module whenever previous module is completed
      for (let i = 0; i < updatedModules.length - 1; i++) {
        if (updatedModules[i].isCompleted) {
          updatedModules[i + 1].isLocked = false;
        }
      }

      const rmTotal = updatedModules.reduce((acc, m) => acc + m.lessons.length + m.practiceTasks.length, 0);
      const rmDone = updatedModules.reduce(
        (acc, m) =>
          acc +
          m.lessons.filter((l) => l.isCompleted).length +
          m.practiceTasks.filter((t) => t.isCompleted).length,
        0
      );

      return {
        ...rm,
        modules: updatedModules,
        totalLessons: rmTotal,
        completedLessons: rmDone,
        progressPercent: rmTotal > 0 ? Math.round((rmDone / rmTotal) * 100) : 0,
      };
    });
  }

  static getRoadmaps(): Roadmap[] {
    const raw = localStorage.getItem(STORAGE_KEYS.ROADMAPS);
    if (!raw) {
      const seeded = this.recalculateRoadmapMetrics(INITIAL_ROADMAPS);
      localStorage.setItem(STORAGE_KEYS.ROADMAPS, JSON.stringify(seeded));
      return seeded;
    }
    try {
      const parsed = JSON.parse(raw);
      return this.recalculateRoadmapMetrics(parsed);
    } catch {
      return this.recalculateRoadmapMetrics(INITIAL_ROADMAPS);
    }
  }

  static saveRoadmaps(roadmaps: Roadmap[]): void {
    const normalized = this.recalculateRoadmapMetrics(roadmaps);
    localStorage.setItem(STORAGE_KEYS.ROADMAPS, JSON.stringify(normalized));
  }

  static saveUserStats(stats: UserStats): void {
    localStorage.setItem(STORAGE_KEYS.USER_STATS, JSON.stringify(stats));
  }

  static getRoadmapById(id: string): Roadmap | undefined {
    return this.getRoadmaps().find((r) => r.id === id);
  }

  static getUserStats(): UserStats {
    const raw = localStorage.getItem(STORAGE_KEYS.USER_STATS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.USER_STATS, JSON.stringify(INITIAL_USER_STATS));
      return INITIAL_USER_STATS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_USER_STATS;
    }
  }

  static recordStudyActivity(minutesAdded = 10): UserStats {
    const stats = this.getUserStats();
    const today = new Date().toISOString().slice(0, 10);
    const lastActive = localStorage.getItem(STORAGE_KEYS.LAST_ACTIVE_DATE);

    let nextStreak = stats.streakDays;
    if (!lastActive) {
      nextStreak = Math.max(1, nextStreak);
    } else if (lastActive !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      nextStreak = lastActive === yesterday ? nextStreak + 1 : 1;
    }

    const updatedStats: UserStats = {
      ...stats,
      streakDays: nextStreak,
      totalHoursStudied: Number((stats.totalHoursStudied + minutesAdded / 60).toFixed(2)),
    };

    localStorage.setItem(STORAGE_KEYS.LAST_ACTIVE_DATE, today);
    this.saveUserStats(updatedStats);
    return updatedStats;
  }

  static getHotkeys(): HotkeyItem[] {
    return INITIAL_HOTKEYS;
  }

  static getChecklistStateMap(): Record<string, boolean> {
    const map: Record<string, boolean> = {};
    for (const rm of this.getRoadmaps()) {
      for (const mod of rm.modules) {
        for (const task of mod.practiceTasks) {
          for (const step of task.checklist) {
            map[`${task.id}:${step.id}`] = step.isDone;
          }
        }
      }
    }
    return map;
  }

  static applyChecklistStateMap(stateMap: Record<string, boolean>): Roadmap[] {
    const roadmaps = this.getRoadmaps();
    for (const rm of roadmaps) {
      for (const mod of rm.modules) {
        for (const task of mod.practiceTasks) {
          for (const step of task.checklist) {
            const compositeKey = `${task.id}:${step.id}`;
            if (typeof stateMap[compositeKey] === 'boolean') {
              step.isDone = step.isDone || stateMap[compositeKey];
            } else if (typeof stateMap[step.id] === 'boolean') {
              step.isDone = step.isDone || stateMap[step.id];
            }
          }
          if (task.checklist.length > 0 && task.checklist.every((s) => s.isDone)) {
            task.isCompleted = true;
          }
        }
      }
    }
    const updated = this.recalculateRoadmapMetrics(roadmaps);
    localStorage.setItem(STORAGE_KEYS.ROADMAPS, JSON.stringify(updated));
    return updated;
  }

  static updateTaskChecklistStep(taskId: string, stepId: string, isDone: boolean): Roadmap[] {
    const roadmaps = this.getRoadmaps();
    for (const rm of roadmaps) {
      for (const mod of rm.modules) {
        for (const task of mod.practiceTasks) {
          if (task.id === taskId) {
            const step = task.checklist.find((s) => s.id === stepId);
            if (step) {
              step.isDone = isDone;
            }
            task.isCompleted = task.checklist.length > 0 && task.checklist.every((s) => s.isDone);
            rm.lastStudied = 'Just now';
          }
        }
      }
    }
    const updated = this.recalculateRoadmapMetrics(roadmaps);
    localStorage.setItem(STORAGE_KEYS.ROADMAPS, JSON.stringify(updated));
    if (isDone) {
      this.recordStudyActivity(5);
    }
    return updated;
  }

  static completePracticeTask(taskId: string): Roadmap[] {
    const roadmaps = this.getRoadmaps();
    for (const rm of roadmaps) {
      for (const mod of rm.modules) {
        const task = mod.practiceTasks.find((t) => t.id === taskId);
        if (task) {
          task.isCompleted = true;
          task.checklist.forEach((s) => {
            s.isDone = true;
          });
          rm.lastStudied = 'Just now';
        }
      }
    }
    const updated = this.recalculateRoadmapMetrics(roadmaps);
    localStorage.setItem(STORAGE_KEYS.ROADMAPS, JSON.stringify(updated));
    this.recordStudyActivity(20);
    return updated;
  }

  static toggleLessonCompleted(lessonId: string): Roadmap[] {
    const roadmaps = this.getRoadmaps();
    let markedCompleted = false;
    for (const rm of roadmaps) {
      for (const mod of rm.modules) {
        const lesson = mod.lessons.find((l) => l.id === lessonId);
        if (lesson) {
          lesson.isCompleted = !lesson.isCompleted;
          markedCompleted = lesson.isCompleted;
          rm.lastStudied = 'Just now';
          rm.currentLessonId = lesson.id;
          rm.currentLessonTitle = lesson.title;
        }
      }
    }
    const updated = this.recalculateRoadmapMetrics(roadmaps);
    localStorage.setItem(STORAGE_KEYS.ROADMAPS, JSON.stringify(updated));
    if (markedCompleted) {
      this.recordStudyActivity(10);
    }
    return updated;
  }

  static findPracticeTask(taskId: string): { task: PracticeTask; roadmap: Roadmap; module: CourseModule } | null {
    const roadmaps = this.getRoadmaps();
    for (const rm of roadmaps) {
      for (const mod of rm.modules) {
        const found = mod.practiceTasks.find((t) => t.id === taskId);
        if (found) {
          return { task: found, roadmap: rm, module: mod };
        }
      }
    }
    return null;
  }
}
