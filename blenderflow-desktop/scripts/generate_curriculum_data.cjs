const fs = require('fs');
const path = require('path');

const DB_DIR = path.resolve('c:/Users/Admin/Desktop/CODE/blender_curriculum_database');
const OUT_FILE = path.resolve('c:/Users/Admin/Desktop/CODE/blenderflow-desktop/src/data/curriculumDatabase.ts');

const MODULE_DEFS = [
  {
    folder: '',
    file: '00_TONG_QUAN_LO_TRINH_TOAN_DIEN.md',
    id: 'cur-mod-00',
    title: 'Master Roadmap & Strategy',
    vietnameseTitle: 'Lộ trình Tổng quan 24 Tuần & Chiến lược Học',
    level: 0,
    levelBadge: 'Level 0: Tổng quan',
    category: 'Roadmap & Strategy',
    description: 'Toàn cảnh lộ trình 24 tuần từ con số 0 đến 3D Artist chuyên nghiệp, 4 giai đoạn tâm lý và giải pháp phá vỡ Tutorial Hell.'
  },
  {
    folder: '01_nhap_mon_co_ban',
    id: 'cur-mod-01',
    title: 'Module 1: Getting Started & Viewport Navigation',
    vietnameseTitle: 'Nhập môn Cơ bản & Điều hướng Không gian 3D',
    level: 1,
    levelBadge: 'Level 1: Nhập môn',
    category: 'Basics & Viewport',
    description: 'Làm quen không gian 3 chiều, các chế độ hiển thị Viewport, hệ thống phím tắt sống còn G-R-S và quản lý Outliner/Collections.'
  },
  {
    folder: '02_dung_hinh_modeling_hard_surface',
    id: 'cur-mod-02',
    title: 'Module 2: Quad Modeling & Hard-Surface Workflows',
    vietnameseTitle: 'Dựng hình Modeling & Bề mặt cứng Hard-Surface',
    level: 2,
    levelBadge: 'Level 2: Dựng hình',
    category: 'Hard-Surface Modeling',
    description: 'Nguyên lý lưới Quad sạch, khử N-gons, công cụ Edit Mode và quy trình Booleans không phá hủy kết hợp Weighted Normals.'
  },
  {
    folder: '03_dieu_khac_sculpting_organic',
    id: 'cur-mod-03',
    title: 'Module 3: Sculpting & Organic Retopology',
    vietnameseTitle: 'Điêu khắc Sculpting & Tái cấu trúc lưới Retopology',
    level: 3,
    levelBadge: 'Level 3: Điêu khắc',
    category: 'Organic Sculpting',
    description: 'Nắm vững cọ điêu khắc cơ bản, Dyntopo, Voxel Remesh và quy trình dựng lưới lại (Retopology) vòng mặt chuẩn cho Animation.'
  },
  {
    folder: '04_trai_uv_va_vat_lieu_shading',
    id: 'cur-mod-04',
    title: 'Module 4: UV Unwrapping & PBR Shading Nodes',
    vietnameseTitle: 'Trải UV & Chất liệu Shading PBR',
    level: 4,
    levelBadge: 'Level 4: Vật liệu PBR',
    category: 'Shading & Texturing',
    description: 'Nguyên lý trải UV không biến dạng, vật lý PBR với Principled BSDF, làm chủ Shader Nodes thủ tục và nướng Texture Baking.'
  },
  {
    folder: '05_anh_sang_render_cycles_eevee',
    id: 'cur-mod-05',
    title: 'Module 5: Lighting & Cinematic Rendering',
    vietnameseTitle: 'Ánh sáng & Render Điện ảnh (Cycles vs EEVEE Next)',
    level: 5,
    levelBadge: 'Level 5: Ánh sáng & Render',
    category: 'Lighting & Rendering',
    description: 'Thiết lập ánh sáng 3 điểm kinh điển, so sánh ray-tracing Cycles và EEVEE Next, điều chỉnh Camera DOF và hậu kỳ Compositor.'
  },
  {
    folder: '06_rigging_va_hoat_hoa_animation',
    id: 'cur-mod-06',
    title: 'Module 6: Rigging Armatures & Animation',
    vietnameseTitle: 'Gắn xương Armatures & Diễn hoạt Animation',
    level: 6,
    levelBadge: 'Level 6: Rigging & Diễn hoạt',
    category: 'Rigging & Animation',
    description: 'Hệ thống xương phân cấp, cấu hình động học ngược Inverse Kinematics (IK), sơn trọng số Weight Painting và 12 nguyên lý hoạt hình.'
  },
  {
    folder: '07_geometry_nodes_va_simulation',
    id: 'cur-mod-07',
    title: 'Module 7: Geometry Nodes & Physics Simulations',
    vietnameseTitle: 'Geometry Nodes Thủ tục & Mô phỏng Vật lý',
    level: 7,
    levelBadge: 'Level 7: Nâng cao',
    category: 'Procedural & Physics',
    description: 'Kiến trúc dữ liệu Fields trong Geometry Nodes, rải đối tượng thủ tục (Scattering), động lực học vật rắn Rigid Body và vải vóc Cloth.'
  },
  {
    folder: '08_game_pipeline_va_xuat_file',
    id: 'cur-mod-08',
    title: 'Module 8: Game Asset Pipeline & Optimization',
    vietnameseTitle: 'Tối ưu hóa Game Pipeline & Xuất file (Unreal / Unity)',
    level: 8,
    levelBadge: 'Level 8: Chuyên nghiệp',
    category: 'Game Pipeline',
    description: 'Ngân sách đa giác Polycount, cạm bẫy Normal Map DirectX vs OpenGL, quy chuẩn lưới va chạm UCX và cấu hình xuất FBX/GLTF chuẩn.'
  },
  {
    folder: '',
    file: '09_KHO_TAI_NGUYEN_VA_KENH_HOC_TIN_CAY.md',
    id: 'cur-mod-09',
    title: 'Global Resources & Channel Directory',
    vietnameseTitle: 'Kho Tài nguyên CC0 & Danh mục Kênh học Uy tín Toàn cầu',
    level: 0,
    levelBadge: 'Tài nguyên & Addons',
    category: 'Resources & Addons',
    description: 'Tổng hợp kênh YouTube hàng đầu thế giới theo chuyên ngành, kho HDRI/PBR CC0 miễn phí, và các Addon thiết yếu tăng tốc 300% quy trình.'
  }
];

function extractLessonInfo(filePath, relativePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  let title = path.basename(filePath, '.md');
  let summary = '';
  const shortcuts = [];
  const tags = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('# ')) {
      title = line.replace('# ', '').trim();
      break;
    }
  }

  // Extract key shortcuts mentioned in bold or backticks
  const hkMatches = content.match(/(`[A-Z0-9\+\s\-\.]+`)/g) || [];
  const uniqueHk = Array.from(new Set(hkMatches.map(m => m.replace(/`/g, '')))).filter(h => 
    h.includes('+') || ['G', 'R', 'S', 'E', 'I', 'M', 'Z', 'Tab', 'Space', 'Shift', 'Ctrl', 'Alt'].includes(h)
  ).slice(0, 6);

  // Extract a brief summary (first non-header paragraph)
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line && !line.startsWith('#') && !line.startsWith('---') && !line.startsWith('|') && line.length > 20) {
      summary = line.replace(/[\*\_\[\]]/g, '').slice(0, 180) + '...';
      break;
    }
  }

  // Estimate read time (words / 200 wpm)
  const words = content.split(/\s+/).length;
  const readMins = Math.max(3, Math.ceil(words / 180));
  const readTime = `${readMins} phút đọc`;

  return {
    title,
    summary,
    readTime,
    shortcuts: uniqueHk,
    content,
  };
}

const modules = [];

for (const def of MODULE_DEFS) {
  const modObj = {
    id: def.id,
    title: def.title,
    vietnameseTitle: def.vietnameseTitle,
    level: def.level,
    levelBadge: def.levelBadge,
    category: def.category,
    description: def.description,
    lessons: []
  };

  if (def.file) {
    const filePath = path.join(DB_DIR, def.file);
    if (fs.existsSync(filePath)) {
      const info = extractLessonInfo(filePath, def.file);
      modObj.lessons.push({
        id: `les-${def.id}-01`,
        moduleId: def.id,
        title: info.title,
        readTime: info.readTime,
        summary: info.summary,
        keyShortcuts: info.shortcuts,
        contentMarkdown: info.content,
        category: def.category,
        level: def.level,
      });
    }
  } else if (def.folder) {
    const dirPath = path.join(DB_DIR, def.folder);
    if (fs.existsSync(dirPath)) {
      const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.md')).sort();
      files.forEach((f, idx) => {
        const filePath = path.join(dirPath, f);
        const info = extractLessonInfo(filePath, `${def.folder}/${f}`);
        let challengeRef;
        if (f.includes('04_quy_trinh_hard_surface') || f.includes('02_bo_cong_cu_edit_mode')) {
          challengeRef = 'task-chair-01';
        } else if (f.includes('02_he_thong_phim_tat')) {
          challengeRef = 'task-vp-01';
        }

        modObj.lessons.push({
          id: `les-${def.id}-${String(idx + 1).padStart(2, '0')}`,
          moduleId: def.id,
          title: info.title,
          readTime: info.readTime,
          summary: info.summary,
          keyShortcuts: info.shortcuts,
          contentMarkdown: info.content,
          category: def.category,
          level: def.level,
          challengeRef
        });
      });
    }
  }

  modules.push(modObj);
}

const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);

const tsCode = `// Auto-generated from c:\\Users\\Admin\\Desktop\\CODE\\blender_curriculum_database\\
// Comprehensive Blender 3D Curriculum Database

export interface CurriculumLesson {
  id: string;
  moduleId: string;
  title: string;
  readTime: string;
  summary: string;
  keyShortcuts: string[];
  contentMarkdown: string;
  category: string;
  level: number;
  challengeRef?: string;
}

export interface CurriculumModule {
  id: string;
  title: string;
  vietnameseTitle: string;
  level: number;
  levelBadge: string;
  category: string;
  description: string;
  lessons: CurriculumLesson[];
}

export const BLENDER_CURRICULUM_MODULES: CurriculumModule[] = ${JSON.stringify(modules, null, 2)};

export const TOTAL_CURRICULUM_LESSONS = ${totalLessons};

export class CurriculumService {
  private static STORAGE_COMPLETED_KEY = 'blenderflow_curriculum_completed_v1';
  private static STORAGE_NOTES_KEY = 'blenderflow_curriculum_notes_v1';
  private static STORAGE_BOOKMARKS_KEY = 'blenderflow_curriculum_bookmarks_v1';

  static getCompletedLessonIds(): string[] {
    try {
      const data = localStorage.getItem(this.STORAGE_COMPLETED_KEY);
      return data ? JSON.parse(data) : ['les-cur-mod-00-01', 'les-cur-mod-01-01'];
    } catch {
      return ['les-cur-mod-00-01', 'les-cur-mod-01-01'];
    }
  }

  static toggleLessonCompleted(lessonId: string): boolean {
    const list = this.getCompletedLessonIds();
    const index = list.indexOf(lessonId);
    let isNowCompleted = false;
    if (index >= 0) {
      list.splice(index, 1);
    } else {
      list.push(lessonId);
      isNowCompleted = true;
    }
    try {
      localStorage.setItem(this.STORAGE_COMPLETED_KEY, JSON.stringify(list));
    } catch (e) {
      console.error('Failed to save completed lessons', e);
    }
    return isNowCompleted;
  }

  static isLessonCompleted(lessonId: string): boolean {
    return this.getCompletedLessonIds().includes(lessonId);
  }

  static getLessonNote(lessonId: string): string {
    try {
      const allNotes = JSON.parse(localStorage.getItem(this.STORAGE_NOTES_KEY) || '{}');
      return allNotes[lessonId] || '';
    } catch {
      return '';
    }
  }

  static saveLessonNote(lessonId: string, note: string): void {
    try {
      const allNotes = JSON.parse(localStorage.getItem(this.STORAGE_NOTES_KEY) || '{}');
      allNotes[lessonId] = note;
      localStorage.setItem(this.STORAGE_NOTES_KEY, JSON.stringify(allNotes));
    } catch (e) {
      console.error('Failed to save note', e);
    }
  }

  static getBookmarks(): string[] {
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_BOOKMARKS_KEY) || '[]');
    } catch {
      return [];
    }
  }

  static toggleBookmark(lessonId: string): boolean {
    const list = this.getBookmarks();
    const index = list.indexOf(lessonId);
    let bookmarked = false;
    if (index >= 0) {
      list.splice(index, 1);
    } else {
      list.push(lessonId);
      bookmarked = true;
    }
    localStorage.setItem(this.STORAGE_BOOKMARKS_KEY, JSON.stringify(list));
    return bookmarked;
  }

  static findLessonById(lessonId: string): CurriculumLesson | null {
    for (const mod of BLENDER_CURRICULUM_MODULES) {
      for (const les of mod.lessons) {
        if (les.id === lessonId) return les;
      }
    }
    return null;
  }
}
`;

fs.writeFileSync(OUT_FILE, tsCode, 'utf8');
console.log(`Successfully generated ${OUT_FILE}`);
console.log(`Modules: ${modules.length}, Total Lessons: ${totalLessons}`);
