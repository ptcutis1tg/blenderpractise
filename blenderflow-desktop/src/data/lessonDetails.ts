import { CurriculumService, CurriculumLesson } from './curriculumDatabase';

export interface LessonSection {
  title: string;
  body: string[];
  keyTips?: string[];
  callout?: {
    type: 'tip' | 'warning' | 'important';
    text: string;
  };
  comparisonTable?: {
    headers: [string, string];
    rows: [string, string][];
  };
}

export interface DetailedLesson {
  id: string;
  moduleId: string;
  title: string;
  readTime: string;
  category: string;
  blenderHotkeys: string[];
  summary: string;
  sections: LessonSection[];
}

export const DETAILED_LESSONS: Record<string, DetailedLesson> = {
  'les-2-2': {
    id: 'les-2-2',
    moduleId: 'mod-2',
    title: '2.2 Loop Cuts, Inset, and Extrude with Precision',
    readTime: '8 min read',
    category: 'Mesh Topology & Modeling',
    blenderHotkeys: ['Ctrl + R', 'I', 'E', 'Alt + E'],
    summary: 'The holy trinity of polygon modeling in Blender 5.3: Loop Cut (Ctrl+R), Inset Faces (I), and Extrude Region (E). Mastering these ensures clean edge flow without messy poles or N-gons.',
    sections: [
      {
        title: '1. Loop Cut and Slide (Ctrl + R)',
        body: [
          'Loop Cut inserts an edge loop that cuts through contiguous four-sided faces (quads). When you hover over a mesh in Edit Mode and press Ctrl + R, Blender shows a bright magenta preview line.',
          'Scroll your mouse wheel up to add multiple cuts simultaneously (e.g., 2 cuts for symmetrical chair legs). Left-click once to commit the count, then slide along the edge loop, or Right-click to snap exactly to the 50% midpoint.'
        ],
        callout: {
          type: 'tip',
          text: 'Pro Tip: Press E while sliding a loop cut to make the cut parallel/even with one side of adjacent geometry, and F to flip the reference edge.'
        }
      },
      {
        title: '2. Insetting Faces with Precision (I)',
        body: [
          'The Inset tool offsets selected boundary edges inward, creating a protective "holding edge" perimeter. This is crucial before extruding recesses or holes to prevent shading artifacts under Subdivision Surface.',
          'Press I, move the cursor to adjust thickness. Press Ctrl while dragging to simultaneously offset depth (creating an immediate extrusion step).'
        ],
        comparisonTable: {
          headers: ['Standard Extrude (E)', 'Inset Faces First (I + E)'],
          rows: [
            ['Directly pulls faces out; creates sharp pinching at corners under subdivision.', 'Leaves a clean outer quad buffer ring; flawless sub-d reflections.'],
            ['Edges share corner vertices without stress relief.', 'Corners receive 45-degree quad bevel redirects.'],
            ['Causes shading artifacts on curved surfaces.', 'Maintains curvature continuity (G2 continuity).']
          ]
        }
      },
      {
        title: '3. Extrude Region and Extrude Manifold (E vs Alt + E)',
        body: [
          'Pressing E pulls selected faces out along their average vertex normal. To constrain to a single global axis, press the axis key immediately after (e.g., E then Z).',
          'Use Alt + E to open the Advanced Extrude Pie Menu: "Extrude Along Normals" (expands faces outward like a balloon) and "Extrude Individual Faces" (creates separate spikes/tiles).'
        ],
        callout: {
          type: 'warning',
          text: 'Watch out for Zero-Length Extrusions: If you press E and then cancel with Right-click, Blender cancels the MOVEMENT but LEAVES the duplicated vertices on top of each other! Always press Ctrl + Z to undo an accidental extrusion, or press M -> By Distance to clean up doubles.'
        }
      }
    ]
  },
  'les-2-3': {
    id: 'les-2-3',
    moduleId: 'mod-2',
    title: '2.3 Bevel Modifier vs Destructive Bevel Weights',
    readTime: '10 min read',
    category: 'Hard-Surface Modeling',
    blenderHotkeys: ['Ctrl + B', 'Ctrl + A', 'Shift + Ctrl + B'],
    summary: 'Hard-surface props require highlighted edge bevels to catch light. Learn when to use the non-destructive Bevel Modifier and when to use manual Bevel Weights in Blender 5.3.',
    sections: [
      {
        title: '1. The Destructive Bevel (Ctrl + B)',
        body: [
          'In Edit Mode, selecting edges and pressing Ctrl + B creates real geometric chamfers and fillets directly on the mesh.',
          'Destructive bevels are fast, but once you apply other modifiers or continue complex boolean cuts, modifying the bevel radius later is extremely painful.'
        ],
        callout: {
          type: 'important',
          text: 'CRITICAL RULE: Always apply your object scale with Ctrl + A -> Apply All Transforms before beveling! If your object scale is (1.0, 2.0, 0.5), bevels will stretch unevenly into skewed ovals instead of uniform 45-degree angles.'
        }
      },
      {
        title: '2. The Non-Destructive Bevel Modifier',
        body: [
          'The Bevel Modifier lets you change the bevel width (e.g., 0.02m) and segment count (2-4 segments) parametrically at any stage of production.',
          'Set the Limit Method to "Weight" or "Angle (30°)". Under Shading, check "Harden Normals" to automatically keep flat surfaces razor flat while rounding bevel corners smoothly without needing extra support loops.'
        ],
        comparisonTable: {
          headers: ['Destructive Bevel (Ctrl + B)', 'Bevel Modifier (Non-Destructive)'],
          rows: [
            ['Vertices permanently baked into mesh topology.', 'Parametric width: easily adjusted or animated anytime.'],
            ['Difficult to undo after multiple operations.', 'Can be toggled on/off with one viewport eye icon.'],
            ['File size increases with each baked segment.', 'Keeps base cage lightweight for UV unwrapping and rigging.']
          ]
        }
      }
    ]
  },
  'les-2-1': {
    id: 'les-2-1',
    moduleId: 'mod-2',
    title: '2.1 Edit Mode Selections: Vertex (1), Edge (2), Face (3)',
    readTime: '4 min read',
    category: 'Mesh Topology',
    blenderHotkeys: ['1', '2', '3', 'Alt + Click', 'Ctrl + L'],
    summary: 'Speed up your modeling workflow tenfold by mastering Blender 5.3 selection modes: Vertex (1), Edge (2), Face (3), Loop selection (Alt + Click), and Linked Islands (L).',
    sections: [
      {
        title: '1. Instant Selection Mode Switching',
        body: [
          'Never click the small top-left viewport icons with your mouse. Use top-row number keys: 1 for Vertex select, 2 for Edge select, 3 for Face select.',
          'Hold Shift while pressing 1, 2, or 3 to enable multiple selection modes simultaneously.'
        ]
      },
      {
        title: '2. Edge Loop and Ring Selection',
        body: [
          'Hold Alt and Left-Click near an edge to select the entire continuous Edge Loop.',
          'Hold Ctrl + Alt and Left-Click to select an Edge Ring (parallel edges). Combine with Shift to add more loops to the selection.'
        ],
        callout: {
          type: 'tip',
          text: 'Press Ctrl + I to invert selection, or Ctrl + Numpad Plus (+) to grow selection outward.'
        }
      }
    ]
  }
};

/**
 * Maps Roadmap Lesson IDs directly to the comprehensive 26-lesson Curriculum Encyclopedia
 */
export const CURRICULUM_LESSON_LINK_MAP: Record<string, string> = {
  'les-1-1': 'les-cur-mod-01-01',
  'les-1-2': 'les-cur-mod-01-02',
  'les-1-3': 'les-cur-mod-01-03',
  'les-2-1': 'les-cur-mod-02-01',
  'les-2-2': 'les-cur-mod-02-02',
  'les-2-3': 'les-cur-mod-02-04',
  'les-3-1': 'les-cur-mod-02-03',
  'les-3-2': 'les-cur-mod-02-04',
  'les-shade-01': 'les-cur-mod-04-02',
  'les-shade-02': 'les-cur-mod-04-03',
  'les-light-01': 'les-cur-mod-05-01',
};

export function getLinkedCurriculumLesson(lessonId: string): CurriculumLesson | null {
  const directMatch = CurriculumService.findLessonById(lessonId);
  if (directMatch) return directMatch;
  const mappedId = CURRICULUM_LESSON_LINK_MAP[lessonId];
  if (!mappedId) return null;
  return CurriculumService.findLessonById(mappedId);
}

const UNIFIED_NOTES_KEY = 'blenderflow_curriculum_notes_v2';
const LEGACY_NOTES_PREFIX = 'blenderflow_notes_';

export class NotesService {
  static getNote(lessonId: string): string {
    try {
      const allNotes = JSON.parse(localStorage.getItem(UNIFIED_NOTES_KEY) || '{}');
      if (typeof allNotes[lessonId] === 'string') {
        return allNotes[lessonId];
      }
      const legacy = localStorage.getItem(LEGACY_NOTES_PREFIX + lessonId);
      if (legacy) {
        allNotes[lessonId] = legacy;
        localStorage.setItem(UNIFIED_NOTES_KEY, JSON.stringify(allNotes));
        return legacy;
      }
      return '';
    } catch {
      return '';
    }
  }

  static saveNote(lessonId: string, content: string): void {
    try {
      const allNotes = JSON.parse(localStorage.getItem(UNIFIED_NOTES_KEY) || '{}');
      allNotes[lessonId] = content;
      localStorage.setItem(UNIFIED_NOTES_KEY, JSON.stringify(allNotes));
    } catch (e) {
      console.error('Failed to save note', e);
    }
  }
}
