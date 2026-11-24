import { DatabaseService } from './db';
import { Roadmap, UserStats } from '../types';

export interface BackupData {
  version: string;
  exportedAt: string;
  roadmaps: Roadmap[];
  userStats: UserStats;
  notes: Record<string, string>;
}

export class ExportService {
  /**
   * Serializes all learning progress and notes into a downloadable JSON file
   */
  static exportBackup(): string {
    const roadmaps = DatabaseService.getRoadmaps();
    const userStats = DatabaseService.getUserStats();

    // Collect all student notes from localStorage
    const notes: Record<string, string> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('blenderflow_notes_')) {
        notes[key] = localStorage.getItem(key) || '';
      }
    }

    const backup: BackupData = {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      roadmaps,
      userStats,
      notes,
    };

    const jsonString = JSON.stringify(backup, null, 2);

    // Trigger browser file download
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
   * Imports a backup file and restores database and notes
   */
  static importBackup(jsonString: string): { success: boolean; message: string; roadmapCount?: number } {
    try {
      const data = JSON.parse(jsonString) as BackupData;
      if (!data.roadmaps || !Array.isArray(data.roadmaps)) {
        return { success: false, message: 'Invalid backup file format: Missing roadmaps array.' };
      }

      // Save to localStorage
      localStorage.setItem('blenderflow_roadmaps_v1', JSON.stringify(data.roadmaps));
      if (data.userStats) {
        localStorage.setItem('blenderflow_stats_v1', JSON.stringify(data.userStats));
      }

      // Restore notes if present
      if (data.notes) {
        Object.entries(data.notes).forEach(([k, v]) => {
          localStorage.setItem(k, v);
        });
      }

      return {
        success: true,
        message: `Successfully restored ${data.roadmaps.length} roadmaps and user statistics!`,
        roadmapCount: data.roadmaps.length,
      };
    } catch (err: any) {
      return { success: false, message: `Failed to parse backup JSON: ${err.message}` };
    }
  }

  /**
   * Resets local data to initial seeds
   */
  static resetToDefaults(): void {
    localStorage.removeItem('blenderflow_roadmaps_v1');
    localStorage.removeItem('blenderflow_stats_v1');
    // Clear notes
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
