import { DatabaseService } from './db';
import { CurriculumService } from '../data/curriculumDatabase';
import { AIService, AIConfig } from './aiService';
import { Roadmap, UserStats } from '../types';

export interface BackupData {
  version: string;
  exportedAt: string;
  roadmaps: Roadmap[];
  userStats: UserStats;
  notes: Record<string, string>;
  curriculumCompleted?: string[];
  curriculumMastered?: string[];
  curriculumBookmarks?: string[];
  curriculumNotes?: Record<string, string>;
  aiConfig?: AIConfig;
}

export class ExportService {
  /**
   * Serializes all learning progress, curriculum, and notes into a downloadable JSON file
   */
  static exportBackup(): string {
    const roadmaps = DatabaseService.getRoadmaps();
    const userStats = DatabaseService.getUserStats();
    const curriculumCompleted = CurriculumService.getCompletedLessonIds();
    const curriculumMastered = CurriculumService.getMasteredLessonIds();
    const curriculumBookmarks = CurriculumService.getBookmarks();
    const curriculumNotes = CurriculumService.getAllNotes();
    const aiConfig = AIService.getConfig();

    const notes: Record<string, string> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('blenderflow_notes_')) {
        notes[key] = localStorage.getItem(key) || '';
      }
    }

    const backup: BackupData = {
      version: '2.0.0',
      exportedAt: new Date().toISOString(),
      roadmaps,
      userStats,
      notes,
      curriculumCompleted,
      curriculumMastered,
      curriculumBookmarks,
      curriculumNotes,
      aiConfig,
    };

    const jsonString = JSON.stringify(backup, null, 2);

    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const dateStr = new Date().toISOString().slice(0, 10);
    link.href = url;
    link.download = `blenderflow_backup_${dateStr}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    return jsonString;
  }

  /**
   * Imports a backup file and restores database, curriculum progress, and notes
   */
  static importBackup(jsonString: string): { success: boolean; message: string; roadmapCount?: number } {
    try {
      const data = JSON.parse(jsonString) as BackupData;
      if (!data.roadmaps || !Array.isArray(data.roadmaps)) {
        return { success: false, message: 'Định dạng file sao lưu không hợp lệ: Thiếu danh sách lộ trình.' };
      }

      if (Array.isArray(data.curriculumCompleted)) {
        CurriculumService.setCompletedLessonIds(data.curriculumCompleted);
      }
      if (Array.isArray(data.curriculumMastered)) {
        CurriculumService.setMasteredLessonIds(data.curriculumMastered);
      }
      if (Array.isArray(data.curriculumBookmarks)) {
        CurriculumService.setBookmarks(data.curriculumBookmarks);
      }
      if (data.curriculumNotes) {
        CurriculumService.setAllNotes(data.curriculumNotes);
      }
      if (data.aiConfig) {
        AIService.saveConfig(data.aiConfig);
      }
      if (data.notes) {
        Object.entries(data.notes).forEach(([k, v]) => {
          localStorage.setItem(k, v);
        });
      }

      DatabaseService.saveRoadmaps(data.roadmaps);
      if (data.userStats) {
        DatabaseService.saveUserStats(data.userStats);
      }

      return {
        success: true,
        message: `Đã khôi phục thành công ${data.roadmaps.length} lộ trình, tiến độ giáo trình và ghi chú!`,
        roadmapCount: data.roadmaps.length,
      };
    } catch (err: any) {
      return { success: false, message: `Lỗi đọc file JSON: ${err.message}` };
    }
  }

  /**
   * Resets all v1 & v2 local data to clean 0% initial state
   */
  static resetToDefaults(): void {
    const keys = [
      'blenderflow_roadmaps_v1',
      'blenderflow_stats_v1',
      'blenderflow_checklists_v1',
      'blenderflow_last_active_date_v1',
      'blenderflow_curriculum_completed_v1',
      'blenderflow_curriculum_notes_v1',
      'blenderflow_curriculum_bookmarks_v1',
      'blenderflow_roadmaps_v2',
      'blenderflow_stats_v2',
      'blenderflow_last_active_date_v2',
      'blenderflow_curriculum_completed_v2',
      'blenderflow_curriculum_mastered_v2',
      'blenderflow_curriculum_notes_v2',
      'blenderflow_curriculum_bookmarks_v2',
    ];
    keys.forEach((k) => localStorage.removeItem(k));

    try {
      sessionStorage.removeItem('blenderflow_curriculum_ui_state');
      sessionStorage.removeItem('blenderflow_course_ui_state');
      sessionStorage.removeItem('blenderflow_active_roadmap_id');
    } catch {
      // Ignore storage access errors
    }

    const legacyNotes: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith('blenderflow_notes_')) {
        legacyNotes.push(k);
      }
    }
    legacyNotes.forEach((k) => localStorage.removeItem(k));
  }
}
