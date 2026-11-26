import { Roadmap, HotkeyItem, UserStats, PracticeTask, CourseModule, Lesson } from '../types';
import { BLENDER_CURRICULUM_MODULES, CurriculumService } from '../data/curriculumDatabase';

const STORAGE_KEYS = {
  ROADMAPS: 'blenderflow_roadmaps_v2',
  USER_STATS: 'blenderflow_stats_v2',
  LAST_ACTIVE_DATE: 'blenderflow_last_active_date_v2',
};

// Wipe legacy v1 mock seeds so upgraded browsers start clean at 0%
function purgeLegacyV1StorageOnce() {
  try {
    if (!localStorage.getItem(STORAGE_KEYS.ROADMAPS)) {
      localStorage.removeItem('blenderflow_roadmaps_v1');
      localStorage.removeItem('blenderflow_stats_v1');
      localStorage.removeItem('blenderflow_checklists_v1');
      localStorage.removeItem('blenderflow_last_active_date_v1');
      localStorage.removeItem('blenderflow_curriculum_completed_v1');
      localStorage.removeItem('blenderflow_curriculum_bookmarks_v1');
    }
  } catch {
    // Ignore storage access errors
  }
}

export const INITIAL_USER_STATS: UserStats = {
  streakDays: 0,
  blenderConnected: false,
  blenderVersion: 'Blender 5.3 LTS',
  totalHoursStudied: 0,
};

export const INITIAL_HOTKEYS: HotkeyItem[] = [
  { id: 'hk-1', keyCombination: 'Tab', description: 'Chuyển đổi Edit Mode / Object Mode', mode: 'Object Mode', category: 'Điều hướng' },
  { id: 'hk-2', keyCombination: 'G', description: 'Di chuyển đối tượng hoặc đỉnh (Grab)', mode: 'Object Mode', category: 'Transform' },
  { id: 'hk-3', keyCombination: 'R', description: 'Xoay đối tượng quanh trục (Rotate)', mode: 'Object Mode', category: 'Transform' },
  { id: 'hk-4', keyCombination: 'S', description: 'Thu phóng kích thước (Scale)', mode: 'Object Mode', category: 'Transform' },
  { id: 'hk-5', keyCombination: 'E', description: 'Đùn mặt hoặc cạnh theo pháp tuyến (Extrude)', mode: 'Edit Mode', category: 'Modeling' },
  { id: 'hk-6', keyCombination: 'I', description: 'Tạo mặt lồng viền giữ cạnh (Inset Faces)', mode: 'Edit Mode', category: 'Modeling' },
  { id: 'hk-7', keyCombination: 'Ctrl + B', description: 'Vát cạnh hoặc đỉnh (Bevel)', mode: 'Edit Mode', category: 'Modeling' },
  { id: 'hk-8', keyCombination: 'Ctrl + R', description: 'Cắt vòng lưới liên tục (Loop Cut)', mode: 'Edit Mode', category: 'Modeling' },
  { id: 'hk-9', keyCombination: 'Alt + Z', description: 'Bật/tắt chế độ nhìn xuyên thấu X-Ray', mode: 'Object Mode', category: 'Viewport' },
  { id: 'hk-10', keyCombination: 'Shift + A', description: 'Mở menu thêm Mesh / Light / Node mới', mode: 'Object Mode', category: 'Tạo khối' },
  { id: 'hk-11', keyCombination: 'Z', description: 'Menu chọn chế độ hiển thị Shading', mode: 'Object Mode', category: 'Viewport' },
  { id: 'hk-12', keyCombination: 'M', description: 'Di chuyển đối tượng vào Collection', mode: 'Object Mode', category: 'Organization' },
];

/**
 * Helper to derive Roadmap Lessons directly from the 26-lesson Curriculum Encyclopedia (Single Source of Truth)
 */
function pickCurriculumLessons(curriculumModuleIds: string[], targetModuleId: string): Lesson[] {
  const lessons: Lesson[] = [];
  let order = 1;
  for (const cModId of curriculumModuleIds) {
    const cMod = BLENDER_CURRICULUM_MODULES.find((m) => m.id === cModId);
    if (!cMod) continue;
    for (const cLes of cMod.lessons) {
      lessons.push({
        id: cLes.id,
        moduleId: targetModuleId,
        title: cLes.title,
        orderIndex: order++,
        readTime: cLes.readTime,
        hotkeys: cLes.keyShortcuts,
        isCompleted: false,
      });
    }
  }
  return lessons;
}

export const INITIAL_ROADMAPS: Roadmap[] = [
  {
    id: 'roadmap-hard-surface',
    title: 'Dựng hình Hard-Surface & Điêu khắc 3D',
    category: 'Modeling',
    description: 'Làm chủ giao diện 3D, phím tắt G-R-S, nguyên lý Quads Topology, Modifiers phi phá hủy và điêu khắc cơ bản.',
    totalLessons: 17,
    completedLessons: 0,
    progressPercent: 0,
    lastStudied: 'Chưa bắt đầu',
    currentLessonId: 'task-chair-01',
    currentLessonTitle: 'Thử thách 04: Ghế Gỗ Low-Poly Chuẩn Quads',
    modules: [
      {
        id: 'mod-1',
        roadmapId: 'roadmap-hard-surface',
        title: 'Học phần 1: Lộ trình 24 Tuần & Nhập môn Viewport 3D',
        orderIndex: 1,
        description: 'Chiến lược học đúng đắn, điều hướng không gian 3D, 3D Cursor và phím tắt G-R-S.',
        progressPercent: 0,
        isCompleted: false,
        isLocked: false,
        lessons: pickCurriculumLessons(['cur-mod-00', 'cur-mod-01'], 'mod-1'),
        practiceTasks: [
          {
            id: 'task-vp-01',
            moduleId: 'mod-1',
            title: 'Thử thách 01: Căn chỉnh 4 Khối & 3D Cursor',
            type: '3d_challenge',
            expectedVertices: 32,
            expectedFaces: 24,
            modifiers: 'Không dùng (Origin & Cursor)',
            isCompleted: false,
            checklist: [
              { id: 'c-1', stepNumber: 1, title: 'Đặt 4 khối Cube đối xứng quanh tâm 3D Cursor', hotkeyHint: 'Shift + S -> Selection to Cursor', isDone: false },
              { id: 'c-2', stepNumber: 2, title: 'Bắt dính các đỉnh chuẩn theo lưới tọa độ', hotkeyHint: 'Shift + Tab', isDone: false },
              { id: 'c-3', stepNumber: 3, title: 'Đưa vật thể vào chung một Collection "Scene_01"', hotkeyHint: 'M -> New Collection', isDone: false }
            ]
          },
          {
            id: 'task-table-02',
            moduleId: 'mod-1',
            title: 'Thử thách 02: Bàn Học Isometric Tối Giản',
            type: '3d_challenge',
            expectedVertices: 104,
            expectedFaces: 96,
            modifiers: 'Apply Scale (Ctrl+A)',
            isCompleted: false,
            checklist: [
              { id: 'tbl-1', stepNumber: 1, title: 'Tạo Cube mặt bàn tỷ lệ 1.6m x 0.8m x 0.08m và Apply Scale', hotkeyHint: 'S rồi Ctrl + A -> Scale', isDone: false },
              { id: 'tbl-2', stepNumber: 2, title: 'Nhân bản liên kết 4 chân bàn đối xứng ở 4 góc', hotkeyHint: 'Alt + D rồi G -> X/Y', isDone: false },
              { id: 'tbl-3', stepNumber: 3, title: 'Đặt thêm kệ màn hình và khối màn hình phẳng trên mặt bàn', hotkeyHint: 'Shift + A -> Cube', isDone: false }
            ]
          }
        ]
      },
      {
        id: 'mod-2',
        roadmapId: 'roadmap-hard-surface',
        title: 'Học phần 2: Quad Topology & Công cụ Edit Mode',
        orderIndex: 2,
        description: 'Hiểu bản chất lưới 4 đỉnh (Quads), tránh N-gons, cắt Loop Cut và đùn khối chuẩn.',
        progressPercent: 0,
        isCompleted: false,
        isLocked: false,
        lessons: pickCurriculumLessons(['cur-mod-02'], 'mod-2').slice(0, 2),
        practiceTasks: [
          {
            id: 'task-mug-03',
            moduleId: 'mod-2',
            title: 'Thử thách 03: Cốc Cà Phê Quai Cầm Chuẩn Quads',
            type: '3d_challenge',
            expectedVertices: 192,
            expectedFaces: 184,
            modifiers: 'Subdivision Surface, Solidify',
            isCompleted: false,
            checklist: [
              { id: 'mug-1', stepNumber: 1, title: 'Tạo Cylinder 16 cạnh, xóa mặt nắp trên và làm rỗng lòng cốc', hotkeyHint: 'Shift + A -> Cylinder (16), X -> Faces', isDone: false },
              { id: 'mug-2', stepNumber: 2, title: 'Cắt 2 Loop Cut ngang trên thân cốc để định vị 2 đầu quai', hotkeyHint: 'Ctrl + R -> Lăn chuột 2', isDone: false },
              { id: 'mug-3', stepNumber: 3, title: 'Chọn 2 mặt bên hông, Extrude ra và dùng Bridge Edge Loops nối quai', hotkeyHint: 'E rồi Ctrl + E -> Bridge Edge Loops', isDone: false },
              { id: 'mug-4', stepNumber: 4, title: 'Thêm Solidify + Subdivision Surface Level 2 mượt mà', hotkeyHint: 'Ctrl + 2', isDone: false }
            ]
          },
          {
            id: 'task-chair-01',
            moduleId: 'mod-2',
            title: 'Thử thách 04: Ghế Gỗ Low-Poly Chuẩn Quads',
            type: '3d_challenge',
            blendFileName: 'challenge_04_chair_starter.blend',
            expectedVertices: 148,
            expectedFaces: 136,
            modifiers: 'Mirror, Subdivision Surface, Bevel',
            isCompleted: false,
            checklist: [
              { id: 'step-1', stepNumber: 1, title: 'Thêm Cube và nén theo trục Z tạo mặt đệm ghế', hotkeyHint: 'Shift + A -> Mesh -> Cube, S rồi Z', isDone: false },
              { id: 'step-2', stepNumber: 2, title: 'Vào Edit Mode, chọn mặt đáy và Inset tạo viền giữ cạnh', hotkeyHint: 'Tab, Phím 3 (Face), I', isDone: false },
              { id: 'step-3', stepNumber: 3, title: 'Cắt 2 Loop Cut theo trục X & Y để chia 4 gốc chân ghế đều nhau', hotkeyHint: 'Ctrl + R -> Lăn chuột 2', isDone: false },
              { id: 'step-4', stepNumber: 4, title: 'Đùn 4 ô góc mặt dưới xuống để tạo 4 chân ghế', hotkeyHint: 'E rồi -1.8 Z', isDone: false },
              { id: 'step-5', stepNumber: 5, title: 'Đùn 2 trụ tựa lưng phía sau lên trên và nối thanh ngang', hotkeyHint: 'E, Ctrl + E -> Bridge Edge Loops', isDone: false },
              { id: 'step-6', stepNumber: 6, title: 'Thêm Bevel Modifier (2 segments) để bo mềm cạnh gỗ', hotkeyHint: 'Modifier Tab -> Add Bevel (0.02m)', isDone: false },
            ]
          }
        ]
      },
      {
        id: 'mod-3',
        roadmapId: 'roadmap-hard-surface',
        title: 'Học phần 3: Modifiers Phi Phá Hủy & Hard-Surface',
        orderIndex: 3,
        description: 'Làm chủ Mirror, Array, Solidify, Boolean Exact và Weighted Normal.',
        progressPercent: 0,
        isCompleted: false,
        isLocked: false,
        lessons: pickCurriculumLessons(['cur-mod-02'], 'mod-3').slice(2, 4),
        practiceTasks: [
          {
            id: 'task-sci-fi-crate',
            moduleId: 'mod-3',
            title: 'Thử thách 05: Hòm Quân Sự Sci-Fi',
            type: '3d_challenge',
            blendFileName: 'challenge_05_scifi_crate.blend',
            expectedVertices: 420,
            expectedFaces: 398,
            modifiers: 'Mirror, Bevel, Weighted Normal',
            isCompleted: false,
            checklist: [
              { id: 'crate-1', stepNumber: 1, title: 'Chia đôi thân hòm và bật Mirror Modifier X+Y có Clipping', hotkeyHint: 'Ctrl + R, Modifier -> Mirror', isDone: false },
              { id: 'crate-2', stepNumber: 2, title: 'Dùng Inset và Extrude tạo các rãnh sườn bọc thép', hotkeyHint: 'I rồi E', isDone: false },
              { id: 'crate-3', stepNumber: 3, title: 'Cắt khóa chốt góc bằng Boolean Solver Exact', hotkeyHint: 'Modifier -> Boolean (Exact)', isDone: false },
              { id: 'crate-4', stepNumber: 4, title: 'Thêm Bevel (Angle 30°) + Weighted Normal (Keep Sharp)', hotkeyHint: 'Modifier -> Bevel + Weighted Normal', isDone: false },
            ]
          }
        ]
      },
      {
        id: 'mod-4',
        roadmapId: 'roadmap-hard-surface',
        title: 'Học phần 4: Điêu khắc Hữu cơ & Retopology',
        orderIndex: 4,
        description: 'Sculpt Mode, Dyntopo vs Voxel Remesh và làm lại lưới nhẹ chuẩn hoạt họa.',
        progressPercent: 0,
        isCompleted: false,
        isLocked: false,
        lessons: pickCurriculumLessons(['cur-mod-03'], 'mod-4'),
        practiceTasks: [
          {
            id: 'task-sculpt-totem',
            moduleId: 'mod-4',
            title: 'Thử thách 06: Tượng Đá Monolith & Retopology Quads',
            type: '3d_challenge',
            expectedVertices: 260,
            expectedFaces: 248,
            modifiers: 'Remesh, Shrinkwrap, Mirror',
            isCompleted: false,
            checklist: [
              { id: 'scp-1', stepNumber: 1, title: 'Khởi tạo khối đầu cơ bản và chạy Voxel Remesh (0.03m)', hotkeyHint: 'Ctrl + R (Sculpt Mode)', isDone: false },
              { id: 'scp-2', stepNumber: 2, title: 'Dùng cọ Clay Strips và Crease tạo hốc mắt, sống mũi, hàm', hotkeyHint: 'Bấm C / Shift + C', isDone: false },
              { id: 'scp-3', stepNumber: 3, title: 'Tạo Plane mới + bật Snap Face Project + Shrinkwrap đi vòng lưới mắt', hotkeyHint: 'Shift + Tab (Face Project)', isDone: false }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'roadmap-shading',
    title: 'Trải UV, Vật liệu PBR & Ánh sáng Điện ảnh',
    category: 'Shading',
    description: 'Mở lưới UV chuẩn, vật liệu Principled BSDF, Shader Nodes thủ tục và thiết lập ánh sáng Cycles / EEVEE Next.',
    totalLessons: 10,
    completedLessons: 0,
    progressPercent: 0,
    lastStudied: 'Chưa bắt đầu',
    currentLessonId: 'task-uv-chest',
    currentLessonTitle: 'Thử thách 07: Trải UV & PBR Rương Báu Gỗ-Kim Loại',
    modules: [
      {
        id: 'mod-shade-1',
        roadmapId: 'roadmap-shading',
        title: 'Học phần 1: Trải UV, PBR Shading & Texture Baking',
        orderIndex: 1,
        description: 'Đặt Seam, kiểm soát Texel Density, Node Wrangler và nướng map PBR.',
        progressPercent: 0,
        isCompleted: false,
        isLocked: false,
        lessons: pickCurriculumLessons(['cur-mod-04'], 'mod-shade-1'),
        practiceTasks: [
          {
            id: 'task-uv-chest',
            moduleId: 'mod-shade-1',
            title: 'Thử thách 07: Trải UV & PBR Rương Báu Gỗ-Kim Loại',
            type: '3d_challenge',
            expectedVertices: 280,
            expectedFaces: 264,
            modifiers: 'Bevel, UV Unwrap',
            isCompleted: false,
            checklist: [
              { id: 'uv-1', stepNumber: 1, title: 'Dựng hộp rương nắp vòm và chọn các cạnh góc cứng để Mark Seam', hotkeyHint: 'Ctrl + E -> Mark Seam', isDone: false },
              { id: 'uv-2', stepNumber: 2, title: 'Trải lưới UV bằng U -> Unwrap và xếp gọn không chồng đè', hotkeyHint: 'U -> Unwrap', isDone: false },
              { id: 'uv-3', stepNumber: 3, title: 'Gán vật liệu Gỗ (Metallic = 0) và Đai Sắt (Metallic = 1) qua Principled BSDF', hotkeyHint: 'Ctrl + T (Node Wrangler)', isDone: false }
            ]
          }
        ]
      },
      {
        id: 'mod-shade-2',
        roadmapId: 'roadmap-shading',
        title: 'Học phần 2: Ánh sáng Studio, Render & Compositor',
        orderIndex: 2,
        description: 'Ánh sáng 3 điểm, so sánh Cycles vs EEVEE Next, bố cục Camera và hậu kỳ.',
        progressPercent: 0,
        isCompleted: false,
        isLocked: false,
        lessons: pickCurriculumLessons(['cur-mod-05'], 'mod-shade-2'),
        practiceTasks: [
          {
            id: 'task-studio-lamp',
            moduleId: 'mod-shade-2',
            title: 'Thử thách 08: Dựng Bục Trưng Bày & Ánh Sáng 3 Điểm',
            type: '3d_challenge',
            expectedVertices: 224,
            expectedFaces: 210,
            modifiers: 'Subdivision Surface, Glare Compositor',
            isCompleted: false,
            checklist: [
              { id: 'lgt-1', stepNumber: 1, title: 'Dựng bệ trưng bày + khối cầu Shader Ball + backdrop cong vô cực', hotkeyHint: 'Shift + A -> Mesh', isDone: false },
              { id: 'lgt-2', stepNumber: 2, title: 'Đặt 3 Area Light: Key (ấm 3500K), Fill (lạnh), Rim tách viền lưng', hotkeyHint: 'Shift + A -> Light -> Area', isDone: false },
              { id: 'lgt-3', stepNumber: 3, title: 'Đặt Camera tiêu cự 85mm và bật Glare Fog Glow trong Compositor', hotkeyHint: 'Numpad 0, F12 Render', isDone: false }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'roadmap-lighting',
    title: 'Rigging, Geometry Nodes & Game Pipeline',
    category: 'Animation',
    description: 'Hoạt họa 12 nguyên tắc, hệ thống xương IK/FK, dựng hình thủ tục Geometry Nodes và xuất asset sang Unreal/Unity.',
    totalLessons: 9,
    completedLessons: 0,
    progressPercent: 0,
    lastStudied: 'Chưa bắt đầu',
    currentLessonId: 'task-robo-arm',
    currentLessonTitle: 'Thử thách 09: Cánh Tay Robot Khớp IK/FK',
    modules: [
      {
        id: 'mod-rig-1',
        roadmapId: 'roadmap-lighting',
        title: 'Học phần 1: Gắn xương Armatures & Hoạt họa',
        orderIndex: 1,
        description: 'Keyframing, hệ thống xương cha-con, ràng buộc IK/FK và Weight Painting.',
        progressPercent: 0,
        isCompleted: false,
        isLocked: false,
        lessons: pickCurriculumLessons(['cur-mod-06'], 'mod-rig-1'),
        practiceTasks: [
          {
            id: 'task-robo-arm',
            moduleId: 'mod-rig-1',
            title: 'Thử thách 09: Cánh Tay Robot Khớp IK/FK',
            type: '3d_challenge',
            expectedVertices: 312,
            expectedFaces: 296,
            modifiers: 'Armature (IK Constraint)',
            isCompleted: false,
            checklist: [
              { id: 'rig-1', stepNumber: 1, title: 'Dựng bệ xoay, 2 đốt tay robot và kẹp gắp đối xứng', hotkeyHint: 'Shift + A -> Cylinder / Cube', isDone: false },
              { id: 'rig-2', stepNumber: 2, title: 'Thêm Armature gồm 3 xương nối tiếp và gắn từng đốt vào xương', hotkeyHint: 'Shift + A -> Armature, Ctrl + P -> Bone', isDone: false },
              { id: 'rig-3', stepNumber: 3, title: 'Thêm Inverse Kinematics Constraint (Chain Length = 2) và đặt Keyframe I', hotkeyHint: 'Pose Mode -> Shift + I', isDone: false }
            ]
          }
        ]
      },
      {
        id: 'mod-geo-2',
        roadmapId: 'roadmap-lighting',
        title: 'Học phần 2: Geometry Nodes, Vật lý & Game Export',
        orderIndex: 2,
        description: 'Tạo cảnh quan thủ tục, mô phỏng va chạm/vải, tối ưu Game Asset & kho tài nguyên.',
        progressPercent: 0,
        isCompleted: false,
        isLocked: false,
        lessons: pickCurriculumLessons(['cur-mod-07', 'cur-mod-08', 'cur-mod-09'], 'mod-geo-2'),
        practiceTasks: [
          {
            id: 'task-geo-island',
            moduleId: 'mod-geo-2',
            title: 'Thử thách 10: Đảo Nổi Geometry Nodes & Xuất Game .GLTF',
            type: '3d_challenge',
            expectedVertices: 340,
            expectedFaces: 320,
            modifiers: 'Geometry Nodes, Triangulate',
            isCompleted: false,
            checklist: [
              { id: 'geo-1', stepNumber: 1, title: 'Dựng bệ đảo Low-Poly và khối tinh thể / cây cối mẫu để rải', hotkeyHint: 'Shift + A -> Icosphere', isDone: false },
              { id: 'geo-2', stepNumber: 2, title: 'Mở Geometry Nodes: dùng Distribute Points on Faces + Instance on Points', hotkeyHint: 'Geometry Nodes Editor', isDone: false },
              { id: 'geo-3', stepNumber: 3, title: 'Realize Instances, Apply Scale và xuất ra chuẩn .glb / .fbx', hotkeyHint: 'File -> Export -> glTF 2.0', isDone: false }
            ]
          }
        ]
      }
    ]
  }
];

export class DatabaseService {
  /**
   * Synchronizes lesson completions from CurriculumService (Single Source of Truth)
   * and computes exact module/roadmap progress percentages.
   */
  static recalculateRoadmapMetrics(roadmaps: Roadmap[]): Roadmap[] {
    const completedCurriculumIds = CurriculumService.getCompletedLessonIds();

    return roadmaps.map((rm) => {
      const updatedModules = rm.modules.map((mod, mIdx) => {
        const syncedLessons = mod.lessons.map((l) => {
          const isCurriculumId = l.id.startsWith('les-cur-mod-');
          return {
            ...l,
            isCompleted: isCurriculumId ? completedCurriculumIds.includes(l.id) : l.isCompleted,
          };
        });

        const totalItems = syncedLessons.length + mod.practiceTasks.length;
        const completedItems =
          syncedLessons.filter((l) => l.isCompleted).length +
          mod.practiceTasks.filter((t) => t.isCompleted).length;
        const progressPercent = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
        const isCompleted = totalItems > 0 && progressPercent === 100;

        return {
          ...mod,
          lessons: syncedLessons,
          progressPercent,
          isCompleted,
          isLocked: mIdx === 0 ? false : mod.isLocked,
        };
      });

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

  /**
   * Ensures newly added standard modules or 3D practice challenges from INITIAL_ROADMAPS
   * are seamlessly merged into existing stored user roadmaps without losing user progress.
   */
  private static mergeStandardChallenges(loaded: Roadmap[]): Roadmap[] {
    return loaded.map((rm) => {
      const seedRm = INITIAL_ROADMAPS.find((s) => s.id === rm.id);
      if (!seedRm) return rm;

      const updatedModules = rm.modules.map((mod) => {
        const seedMod = seedRm.modules.find((sm) => sm.id === mod.id);
        if (!seedMod) return mod;

        const mergedTasks = [...mod.practiceTasks];
        for (const seedTask of seedMod.practiceTasks) {
          if (!mergedTasks.some((t) => t.id === seedTask.id)) {
            mergedTasks.push(seedTask);
          }
        }
        return { ...mod, practiceTasks: mergedTasks };
      });

      return { ...rm, modules: updatedModules };
    });
  }

  static getRoadmaps(): Roadmap[] {
    purgeLegacyV1StorageOnce();
    const raw = localStorage.getItem(STORAGE_KEYS.ROADMAPS);
    if (!raw) {
      const seeded = this.recalculateRoadmapMetrics(INITIAL_ROADMAPS);
      localStorage.setItem(STORAGE_KEYS.ROADMAPS, JSON.stringify(seeded));
      return seeded;
    }
    try {
      const parsed: Roadmap[] = JSON.parse(raw);
      return this.recalculateRoadmapMetrics(this.mergeStandardChallenges(parsed));
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
    purgeLegacyV1StorageOnce();
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
            rm.lastStudied = 'Vừa xong';
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
          rm.lastStudied = 'Vừa xong';
        }
      }
    }
    const updated = this.recalculateRoadmapMetrics(roadmaps);
    localStorage.setItem(STORAGE_KEYS.ROADMAPS, JSON.stringify(updated));
    this.recordStudyActivity(20);
    return updated;
  }

  static toggleLessonCompleted(lessonId: string): Roadmap[] {
    // Update Single Source of Truth in CurriculumService when toggling a curriculum lesson
    let isNowCompleted = false;
    if (lessonId.startsWith('les-cur-mod-')) {
      isNowCompleted = CurriculumService.toggleLessonCompleted(lessonId);
    }

    const roadmaps = this.getRoadmaps();
    for (const rm of roadmaps) {
      for (const mod of rm.modules) {
        const lesson = mod.lessons.find((l) => l.id === lessonId);
        if (lesson) {
          if (!lessonId.startsWith('les-cur-mod-')) {
            lesson.isCompleted = !lesson.isCompleted;
            isNowCompleted = lesson.isCompleted;
          } else {
            lesson.isCompleted = isNowCompleted;
          }
          rm.lastStudied = 'Vừa xong';
          rm.currentLessonId = lesson.id;
          rm.currentLessonTitle = lesson.title;
        }
      }
    }
    const updated = this.recalculateRoadmapMetrics(roadmaps);
    localStorage.setItem(STORAGE_KEYS.ROADMAPS, JSON.stringify(updated));
    if (isNowCompleted) {
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
