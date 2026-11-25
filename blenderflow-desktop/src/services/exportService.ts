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
    const curriculumBookmarks = CurriculumService.getBookmarks();
    const curriculumNotes = CurriculumService.getAllNotes();
    const aiConfig = AIService.getConfig();

    // Collect legacy individual notes if any remain
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
        return { success: false, message: 'Invalid backup file format: Missing roadmaps array.' };
      }

      DatabaseService.saveRoadmaps(data.roadmaps);
      if (data.userStats) {
        DatabaseService.saveUserStats(data.userStats);
      }

      if (data.notes) {
        Object.entries(data.notes).forEach(([k, v]) => {
          localStorage.setItem(k, v);
        });
      }

      if (Array.isArray(data.curriculumCompleted)) {
        CurriculumService.setCompletedLessonIds(data.curriculumCompleted);
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

      return {
        success: true,
        message: `Successfully restored ${data.roadmaps.length} roadmaps, curriculum progress, and notes!`,
        roadmapCount: data.roadmaps.length,
      };
    } catch (err: any) {
      return { success: false, message: `Failed to parse backup JSON: ${err.message}` };
    }
  }

  /**
   * Resets all local data to initial clean defaults
   */
  static resetToDefaults(): void {
    localStorage.removeItem('blenderflow_roadmaps_v1');
    localStorage.removeItem('blenderflow_stats_v1');
    localStorage.removeItem('blenderflow_last_active_date_v1');
    localStorage.removeItem('blenderflow_curriculum_completed_v1');
    localStorage.removeItem('blenderflow_curriculum_notes_v1');
    localStorage.removeItem('blenderflow_curriculum_bookmarks_v1');

    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith('blenderflow_notes_')) {
        keysToRemove.push(k);
      }
    }
    keysToRemove.forEach((k) => localStorage.removeItem(k));
  }
}
