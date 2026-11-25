import { supabase } from './supabaseClient';
import { DatabaseService } from './db';
import { Roadmap, UserStats } from '../types';

export interface SyncStatus {
  lastSyncedAt: Date | null;
  isSyncing: boolean;
  error: string | null;
}

export class CloudSyncService {
  private static debounceTimer: any = null;
  private static statusListeners: ((status: SyncStatus) => void)[] = [];
  private static currentStatus: SyncStatus = {
    lastSyncedAt: null,
    isSyncing: false,
    error: null,
  };

  static getStatus(): SyncStatus {
    return { ...this.currentStatus };
  }

  static subscribeStatus(callback: (status: SyncStatus) => void) {
    this.statusListeners.push(callback);
    callback(this.getStatus());
    return () => {
      this.statusListeners = this.statusListeners.filter((cb) => cb !== callback);
    };
  }

  private static setStatus(patch: Partial<SyncStatus>) {
    this.currentStatus = { ...this.currentStatus, ...patch };
    this.statusListeners.forEach((cb) => cb(this.getStatus()));
  }

  /**
   * Pull progress, stats, and custom roadmaps from Supabase into LocalStorage
   */
  static async pullCloudData(userId: string): Promise<boolean> {
    this.setStatus({ isSyncing: true, error: null });
    try {
      // 1. Fetch user_progress
      const { data: progressData } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      // 2. Fetch profile stats
      const { data: profileData } = await supabase
        .from('profiles')
        .select('streak_days, total_hours_studied')
        .eq('id', userId)
        .maybeSingle();

      // 3. Fetch custom roadmaps
      const { data: customRoadmapsData } = await supabase
        .from('custom_roadmaps')
        .select('roadmap_data')
        .eq('user_id', userId);

      // Merge into local storage
      const localRoadmaps = DatabaseService.getRoadmaps();
      const completedLessons: string[] = progressData?.completed_lessons || [];
      const checklistsState: Record<string, boolean> = progressData?.checklists_state || {};

      // Update checklists
      if (Object.keys(checklistsState).length > 0) {
        const storedChecklists = JSON.parse(localStorage.getItem('blenderflow_checklists_v1') || '{}');
        const mergedChecklists = { ...storedChecklists, ...checklistsState };
        localStorage.setItem('blenderflow_checklists_v1', JSON.stringify(mergedChecklists));
      }

      // Update roadmaps completion status
      if (completedLessons.length > 0) {
        const updated = localRoadmaps.map((rm) => {
          const updatedModules = rm.modules.map((mod) => {
            const updatedLessons = mod.lessons.map((les) => ({
              ...les,
              isCompleted: les.isCompleted || completedLessons.includes(les.id),
            }));
            const completedCount = updatedLessons.filter((l) => l.isCompleted).length;
            const progress = updatedLessons.length > 0 ? Math.round((completedCount / updatedLessons.length) * 100) : 0;
            return {
              ...mod,
              lessons: updatedLessons,
              progressPercent: progress,
              isCompleted: progress === 100,
            };
          });

          const totalLessons = updatedModules.reduce((acc, m) => acc + m.lessons.length, 0);
          const totalCompleted = updatedModules.reduce(
            (acc, m) => acc + m.lessons.filter((l) => l.isCompleted).length,
            0
          );
          const percent = totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0;

          return {
            ...rm,
            modules: updatedModules,
            completedLessons: totalCompleted,
            progressPercent: percent,
          };
        });

        // Add custom roadmaps from cloud if not present locally
        if (customRoadmapsData && customRoadmapsData.length > 0) {
          customRoadmapsData.forEach((item) => {
            const rm: Roadmap = item.roadmap_data;
            if (!updated.some((existing) => existing.id === rm.id)) {
              updated.push(rm);
            }
          });
        }

        DatabaseService.saveRoadmaps(updated);
      }

      // Update User Stats
      if (profileData) {
        const localStats = DatabaseService.getUserStats();
        const mergedStats: UserStats = {
          ...localStats,
          streakDays: Math.max(localStats.streakDays, profileData.streak_days || 0),
          totalHoursStudied: Math.max(localStats.totalHoursStudied, Number(profileData.total_hours_studied) || 0),
        };
        DatabaseService.saveUserStats(mergedStats);
      }

      this.setStatus({ isSyncing: false, lastSyncedAt: new Date(), error: null });
      return true;
    } catch (e: any) {
      console.error('[CloudSync] Pull error:', e);
      this.setStatus({ isSyncing: false, error: e?.message || 'Sync failed' });
      return false;
    }
  }

  /**
   * Push current LocalStorage data up to Supabase
   */
  static async pushLocalDataToCloud(userId: string): Promise<boolean> {
    this.setStatus({ isSyncing: true, error: null });
    try {
      const roadmaps = DatabaseService.getRoadmaps();
      const stats = DatabaseService.getUserStats();
      const checklists: Record<string, boolean> = JSON.parse(
        localStorage.getItem('blenderflow_checklists_v1') || '{}'
      );

      // Collect completed lesson IDs
      const completedLessons: string[] = [];
      const completedTasks: string[] = [];
      const customRoadmaps: Roadmap[] = [];

      const STANDARD_ROADMAP_IDS = ['roadmap-hard-surface', 'roadmap-organic-sculpt', 'roadmap-shading-lighting'];

      roadmaps.forEach((rm) => {
        if (!STANDARD_ROADMAP_IDS.includes(rm.id)) {
          customRoadmaps.push(rm);
        }
        rm.modules.forEach((mod) => {
          mod.lessons.forEach((les) => {
            if (les.isCompleted) completedLessons.push(les.id);
          });
          mod.practiceTasks.forEach((tsk) => {
            if (tsk.isCompleted) completedTasks.push(tsk.id);
          });
        });
      });

      // 1. Upsert Profile Stats
      await supabase
        .from('profiles')
        .update({
          streak_days: stats.streakDays,
          total_hours_studied: stats.totalHoursStudied,
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId);

      // 2. Upsert user_progress
      await supabase
        .from('user_progress')
        .upsert(
          {
            user_id: userId,
            completed_lessons: completedLessons,
            completed_tasks: completedTasks,
            checklists_state: checklists,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'user_id' }
        );

      // 3. Upsert Custom Roadmaps
      for (const crm of customRoadmaps) {
        await supabase
          .from('custom_roadmaps')
          .upsert(
            {
              id: crm.id,
              user_id: userId,
              roadmap_data: crm,
            },
            { onConflict: 'id' }
          );
      }

      this.setStatus({ isSyncing: false, lastSyncedAt: new Date(), error: null });
      return true;
    } catch (e: any) {
      console.error('[CloudSync] Push error:', e);
      this.setStatus({ isSyncing: false, error: e?.message || 'Sync failed' });
      return false;
    }
  }

  /**
   * On User Login / Registration:
   * Merge guest local progress into cloud and pull down any prior cloud progress
   */
  static async mergeGuestDataOnLogin(userId: string): Promise<void> {
    this.setStatus({ isSyncing: true, error: null });
    try {
      // 1. Pull cloud data first to combine
      await this.pullCloudData(userId);
      // 2. Push combined result back to ensure cloud has latest guest achievements
      await this.pushLocalDataToCloud(userId);
    } catch (e: any) {
      console.error('[CloudSync] Merge on login error:', e);
    }
  }

  /**
   * Debounced sync triggered whenever user makes progress
   */
  static debouncedPush(userId: string | null | undefined, delayMs = 1500) {
    if (!userId) return;
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.pushLocalDataToCloud(userId);
    }, delayMs);
  }
}
