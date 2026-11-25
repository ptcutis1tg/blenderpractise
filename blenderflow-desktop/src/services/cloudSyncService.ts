import { supabase } from './supabaseClient';
import { DatabaseService } from './db';
import { CurriculumService } from '../data/curriculumDatabase';
import { Roadmap, UserStats } from '../types';

export interface SyncStatus {
  lastSyncedAt: Date | null;
  isSyncing: boolean;
  error: string | null;
}

interface CloudChecklistsPayload {
  steps?: Record<string, boolean>;
  curriculumCompleted?: string[];
  curriculumBookmarks?: string[];
  curriculumNotes?: Record<string, string>;
}

const STANDARD_ROADMAP_IDS = ['roadmap-hard-surface', 'roadmap-shading', 'roadmap-lighting'];

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
   * Pull progress, curriculum state, stats, and custom roadmaps from Supabase into LocalStorage
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

      let roadmaps = DatabaseService.getRoadmaps();
      const completedLessons: string[] = progressData?.completed_lessons || [];
      const completedTasks: string[] = progressData?.completed_tasks || [];
      const rawChecklistsState = progressData?.checklists_state || {};

      // Normalize structured payload vs flat legacy checklist state
      const payload: CloudChecklistsPayload =
        rawChecklistsState && typeof rawChecklistsState === 'object' && ('steps' in rawChecklistsState || 'curriculumCompleted' in rawChecklistsState)
          ? (rawChecklistsState as CloudChecklistsPayload)
          : { steps: rawChecklistsState as Record<string, boolean> };

      // Apply checklist step states
      if (payload.steps && Object.keys(payload.steps).length > 0) {
        roadmaps = DatabaseService.applyChecklistStateMap(payload.steps);
      }

      // Merge Curriculum 26 lessons completion, bookmarks, and notes
      if (payload.curriculumCompleted && payload.curriculumCompleted.length > 0) {
        const localCur = CurriculumService.getCompletedLessonIds();
        CurriculumService.setCompletedLessonIds([...localCur, ...payload.curriculumCompleted]);
      }
      if (payload.curriculumBookmarks && payload.curriculumBookmarks.length > 0) {
        const localBm = CurriculumService.getBookmarks();
        CurriculumService.setBookmarks([...localBm, ...payload.curriculumBookmarks]);
      }
      if (payload.curriculumNotes && Object.keys(payload.curriculumNotes).length > 0) {
        const localNotes = CurriculumService.getAllNotes();
        CurriculumService.setAllNotes({ ...payload.curriculumNotes, ...localNotes });
      }

      // Merge custom roadmaps regardless of completedLessons length
      if (customRoadmapsData && customRoadmapsData.length > 0) {
        customRoadmapsData.forEach((item) => {
          const rm: Roadmap = item.roadmap_data;
          if (rm && !roadmaps.some((existing) => existing.id === rm.id)) {
            roadmaps.push(rm);
          }
        });
      }

      // Apply completed lessons & tasks to roadmaps
      if (completedLessons.length > 0 || completedTasks.length > 0) {
        roadmaps = roadmaps.map((rm) => ({
          ...rm,
          modules: rm.modules.map((mod) => ({
            ...mod,
            lessons: mod.lessons.map((les) => ({
              ...les,
              isCompleted: les.isCompleted || completedLessons.includes(les.id),
            })),
            practiceTasks: mod.practiceTasks.map((tsk) => ({
              ...tsk,
              isCompleted: tsk.isCompleted || completedTasks.includes(tsk.id),
            })),
          })),
        }));
      }

      DatabaseService.saveRoadmaps(roadmaps);

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
   * Push current LocalStorage data (Roadmaps, Checklist steps, Curriculum 26 lessons, Bookmarks, Notes) to Supabase
   */
  static async pushLocalDataToCloud(userId: string): Promise<boolean> {
    this.setStatus({ isSyncing: true, error: null });
    try {
      const roadmaps = DatabaseService.getRoadmaps();
      const stats = DatabaseService.getUserStats();
      const checklistStepsMap = DatabaseService.getChecklistStateMap();

      const completedLessons: string[] = [];
      const completedTasks: string[] = [];
      const customRoadmaps: Roadmap[] = [];

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

      const structuredPayload: CloudChecklistsPayload = {
        steps: checklistStepsMap,
        curriculumCompleted: CurriculumService.getCompletedLessonIds(),
        curriculumBookmarks: CurriculumService.getBookmarks(),
        curriculumNotes: CurriculumService.getAllNotes(),
      };

      // 1. Update Profile Stats
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
            checklists_state: structuredPayload,
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
      await this.pullCloudData(userId);
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
