import React, { useState, useEffect } from 'react';
import { DatabaseService } from './services/db';
import { BlenderBridgeService } from './services/blenderBridge';
import { AuthService, UserProfile } from './services/supabaseClient';
import { CloudSyncService } from './services/cloudSyncService';
import { NavigationTab, Roadmap, UserStats, PracticeTask } from './types';
import { NavigatorSidebar } from './components/layout/NavigatorSidebar';
import { DesktopTitlebar } from './components/layout/DesktopTitlebar';
import { HomeDashboardView } from './views/HomeDashboardView';
import { CourseWorkspaceView } from './views/CourseWorkspaceView';
import { SplitPracticeView } from './views/SplitPracticeView';
import { HotkeyCheatsheetView } from './views/HotkeyCheatsheetView';
import { SettingsView } from './views/SettingsView';
import { CurriculumExplorerView } from './views/CurriculumExplorerView';
import { AIAssistantModal } from './components/ai/AIAssistantModal';
import { AuthModal } from './components/auth/AuthModal';
import { Search, X, Box, CheckCircle2, AlertCircle, BookOpen } from 'lucide-react';

export function App() {
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>(() => DatabaseService.getRoadmaps());
  const [userStats, setUserStats] = useState<UserStats>(() => DatabaseService.getUserStats());
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCloudSyncing, setIsCloudSyncing] = useState(false);
  const [currentTab, setCurrentTab] = useState<NavigationTab>('home');
  const [activeRoadmapId, setActiveRoadmapId] = useState<string>('roadmap-hard-surface');
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'home' | 'course' | 'curriculum' | 'practice' | 'hotkeys' | 'settings'>('home');
  const [searchOpen, setSearchOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // 1. Listen to Supabase Auth state changes & sync
  useEffect(() => {
    // Check initial user session
    AuthService.getCurrentUser().then(async (user) => {
      if (user) {
        const profile = await AuthService.getUserProfile(user.id);
        setUserProfile(profile);
        await CloudSyncService.pullCloudData(user.id);
        setRoadmaps([...DatabaseService.getRoadmaps()]);
        setUserStats(DatabaseService.getUserStats());
      }
    });

    // Subscribe to auth state changes
    const { data: authListener } = AuthService.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        const profile = await AuthService.getUserProfile(session.user.id);
        setUserProfile(profile);
        showToast(`👋 Chào mừng ${profile?.displayName || 'bạn'}! Đang đồng bộ tiến độ...`);
        await CloudSyncService.mergeGuestDataOnLogin(session.user.id);
        setRoadmaps([...DatabaseService.getRoadmaps()]);
        setUserStats(DatabaseService.getUserStats());
        showToast('☁️ Đã đồng bộ toàn bộ tiến độ lên Supabase Cloud!');
      } else if (event === 'SIGNED_OUT') {
        setUserProfile(null);
        showToast('👋 Đã đăng xuất. Bạn đang ở chế độ Khách (Offline).');
      }
    });

    // Subscribe to sync status
    const unsubscribeSync = CloudSyncService.subscribeStatus((status) => {
      setIsCloudSyncing(status.isSyncing);
    });

    return () => {
      authListener?.subscription?.unsubscribe();
      unsubscribeSync();
    };
  }, []);

  // 2. Listen for Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleManualCloudSync = async () => {
    if (!userProfile) {
      setIsAuthModalOpen(true);
      return;
    }
    showToast('⏳ Đang đồng bộ tiến độ lên Supabase Cloud...');
    const success = await CloudSyncService.pushLocalDataToCloud(userProfile.id);
    if (success) {
      showToast('☁️ Đồng bộ Supabase Cloud hoàn tất!');
    } else {
      showToast('⚠️ Không thể đồng bộ. Vui lòng kiểm tra kết nối mạng.');
    }
  };

  const handleSignOut = async () => {
    try {
      await AuthService.signOut();
      setUserProfile(null);
      showToast('Đã đăng xuất tài khoản.');
    } catch (e: any) {
      showToast(`⚠️ Lỗi đăng xuất: ${e?.message}`);
    }
  };

  const handleSelectTab = (tab: NavigationTab) => {
    setCurrentTab(tab);
    if (tab === 'home') {
      setViewMode('home');
      setActiveTaskId(null);
    } else if (tab === 'curriculum') {
      setViewMode('curriculum');
      setActiveTaskId(null);
    } else if (tab === 'my-roadmaps') {
      setViewMode('course');
      setActiveTaskId(null);
    } else if (tab === 'hotkeys') {
      setViewMode('hotkeys');
      setActiveTaskId(null);
    } else if (tab === 'settings') {
      setViewMode('settings');
      setActiveTaskId(null);
    } else if (tab === 'search') {
      setSearchOpen(true);
    }
  };

  const handleSelectRoadmap = (roadmapId: string) => {
    setActiveRoadmapId(roadmapId);
    setCurrentTab('curriculum');
    setViewMode('curriculum');
    setActiveTaskId(null);
  };

  const handleOpenPracticeChallenge = (taskId: string) => {
    setActiveTaskId(taskId);
    setViewMode('practice');
  };

  const handleToggleStep = (stepId: string, currentStatus: boolean) => {
    if (!activeTaskId) return;
    const updated = DatabaseService.updateTaskChecklistStep(activeTaskId, stepId, !currentStatus);
    setRoadmaps([...updated]);
    CloudSyncService.debouncedPush(userProfile?.id);
  };

  const handleLaunchBlender = async () => {
    showToast('⏳ Sending launch request to Blender 5.3...');
    const res = await BlenderBridgeService.launchBlender();
    if (res.success) {
      showToast('🚀 ' + res.message);
    } else {
      showToast('⚠️ ' + res.message);
    }
  };

  // Find active practice task object
  const practiceContext = activeTaskId ? DatabaseService.findPracticeTask(activeTaskId) : null;
  const currentRoadmap = roadmaps.find((r) => r.id === activeRoadmapId) || roadmaps[0];

  // Compute breadcrumbs
  const getBreadcrumbs = () => {
    if (viewMode === 'practice' && practiceContext) {
      return [currentRoadmap.title, practiceContext.module.title, practiceContext.task.title];
    }
    if (viewMode === 'curriculum') {
      return ['Curriculum 3D', 'Blender 3D Encyclopedia'];
    }
    if (viewMode === 'course') {
      return ['Roadmaps', currentRoadmap.title];
    }
    if (viewMode === 'hotkeys') {
      return ['Hotkey Drills', 'Blender 5.3 Speed Training'];
    }
    if (viewMode === 'settings') {
      return ['Settings', 'Preferences & AI Configuration'];
    }
    return ['Dashboard', 'Home'];
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen overflow-hidden bg-[#0B0F19] text-[#dfe2f1]">
      {/* 1. Navigation Sidebar (Desktop Sidebar + Mobile Bottom Bar) */}
      <NavigatorSidebar
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        userStats={userStats}
        userProfile={userProfile}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onOpenPracticeChallenge={() => handleOpenPracticeChallenge('task-chair-01')}
      />

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden pb-14 md:pb-0">
        {/* Top Desktop Titlebar */}
        <DesktopTitlebar
          breadcrumbs={getBreadcrumbs()}
          userProfile={userProfile}
          onOpenSearch={() => setSearchOpen(true)}
          onOpenAuthModal={() => setIsAuthModalOpen(true)}
          onSignOut={handleSignOut}
          onManualCloudSync={handleManualCloudSync}
          isCloudSyncing={isCloudSyncing}
          onSyncBlender={async () => {
            showToast('⏳ Đang thăm dò telemetry từ Blender 5.3...');
            const data = await BlenderBridgeService.fetchTelemetry();
            if (data) {
              const name = data.object_name || data.objectName || 'Active Mesh';
              const quads = data.quads || 0;
              const verts = data.vertices || 0;
              const ngons = data.ngons || 0;
              const status = data.is_all_quads || ngons === 0 ? '100% Quads' : `${ngons} N-gons`;
              showToast(`🟢 Đã đồng bộ từ Blender: ${name} (${verts} Verts, ${quads} Quads, ${status})`);
            } else {
              showToast('⚠️ Chưa thấy dữ liệu! Hãy mở Blender 5.3 và bấm "Sync Mesh to BlenderFlow" trong tab N-Panel.');
            }
          }}
        />

        {/* Dynamic Views */}
        <div className="flex-1 overflow-hidden relative">
          {viewMode === 'home' && (
            <HomeDashboardView
              roadmaps={roadmaps}
              userStats={userStats}
              onSelectRoadmap={handleSelectRoadmap}
              onOpenPracticeChallenge={handleOpenPracticeChallenge}
              onNavigateHotkeys={() => {
                setCurrentTab('hotkeys');
                setViewMode('hotkeys');
              }}
              onNavigateCurriculum={() => {
                setCurrentTab('curriculum');
                setViewMode('curriculum');
              }}
            />
          )}

          {viewMode === 'curriculum' && (
            <CurriculumExplorerView
              onOpenPracticeChallenge={handleOpenPracticeChallenge}
              onNavigateHome={() => {
                setCurrentTab('home');
                setViewMode('home');
              }}
            />
          )}

          {viewMode === 'course' && (
            <CourseWorkspaceView
              roadmap={currentRoadmap}
              onBack={() => {
                setCurrentTab('home');
                setViewMode('home');
              }}
              onOpenPracticeChallenge={handleOpenPracticeChallenge}
              onToggleLessonCompleted={(lessonId) => {
                const updated = DatabaseService.toggleLessonCompleted(lessonId);
                setRoadmaps([...updated]);
                CloudSyncService.debouncedPush(userProfile?.id);
                showToast('Lesson progress updated!');
              }}
              onLaunchHotkeyDrill={() => {
                setCurrentTab('hotkeys');
                setViewMode('hotkeys');
              }}
              onOpenStarterBlend={(fileName) => {
                showToast(`🚀 Opening "${fileName}" in Blender 5.3...`);
              }}
            />
          )}

          {viewMode === 'practice' && practiceContext && (
            <SplitPracticeView
              task={practiceContext.task}
              roadmap={practiceContext.roadmap}
              onBack={() => setViewMode('course')}
              onToggleStep={handleToggleStep}
              onLaunchBlender={handleLaunchBlender}
              onSubmitChallenge={() => {
                showToast('🎉 Challenge 04 Submitted & Mastered! 100% Topology Score.');
                setTimeout(() => setViewMode('course'), 1200);
              }}
            />
          )}

          {viewMode === 'hotkeys' && <HotkeyCheatsheetView />}

          {viewMode === 'settings' && (
            <SettingsView
              onRoadmapsUpdated={() => setRoadmaps([...DatabaseService.getRoadmaps()])}
              showToast={showToast}
              userProfile={userProfile}
              onOpenAuthModal={() => setIsAuthModalOpen(true)}
              onSignOut={handleSignOut}
              onManualCloudSync={handleManualCloudSync}
              isCloudSyncing={isCloudSyncing}
            />
          )}
        </div>
      </div>

      {/* Floating 3D Topology Doctor Assistant */}
      <AIAssistantModal />

      {/* Global Search Modal (Ctrl+K) */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-[#141A28] border border-[#2B354D] rounded-2xl shadow-2xl p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-[#1F2637] pb-3">
              <div className="flex items-center gap-2 text-white font-bold text-[15px]">
                <Search className="w-4 h-4 text-indigo-400" />
                <span>Quick Search Lessons & 3D Challenges</span>
              </div>
              <button
                onClick={() => setSearchOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <div
                onClick={() => {
                  setCurrentTab('curriculum');
                  setViewMode('curriculum');
                  setSearchOpen(false);
                }}
                className="p-3 rounded-xl bg-[#0F131D] hover:bg-[#1C2436] border border-[#1F2637] cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <BookOpen className="w-4 h-4 text-indigo-400" />
                  <span className="text-[13px] font-medium text-white">Blender 3D Curriculum Encyclopedia (Level 0 - 8)</span>
                </div>
                <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded font-mono">Curriculum</span>
              </div>

              <div
                onClick={() => {
                  handleOpenPracticeChallenge('task-chair-01');
                  setSearchOpen(false);
                }}
                className="p-3 rounded-xl bg-[#0F131D] hover:bg-[#1C2436] border border-[#1F2637] cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <Box className="w-4 h-4 text-[#F97316]" />
                  <span className="text-[13px] font-medium text-white">Challenge 04: Low-Poly Stylized Chair</span>
                </div>
                <span className="text-[10px] bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded font-mono">50:50 Dual View</span>
              </div>

              <div
                onClick={() => {
                  handleSelectRoadmap('roadmap-hard-surface');
                  setSearchOpen(false);
                }}
                className="p-3 rounded-xl bg-[#0F131D] hover:bg-[#1C2436] border border-[#1F2637] cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-[13px] font-medium text-white">Hard-Surface & Low-Poly 3D Modeling</span>
                </div>
                <span className="text-[10px] text-gray-400">Roadmap</span>
              </div>

              <div
                onClick={() => {
                  setCurrentTab('hotkeys');
                  setViewMode('hotkeys');
                  setSearchOpen(false);
                }}
                className="p-3 rounded-xl bg-[#0F131D] hover:bg-[#1C2436] border border-[#1F2637] cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-indigo-400 text-[12px]">Ctrl + B</span>
                  <span className="text-[13px] font-medium text-white">Bevel selected edges/vertices</span>
                </div>
                <span className="text-[10px] text-gray-400">Shortcut</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Supabase Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={(msg) => showToast(msg)}
      />

      {/* Toast Notification (Top-Right to avoid overlapping bottom-right AI Assistant button) */}
      {toastMessage && (
        <div className="fixed top-14 right-5 z-50 px-4 py-3 rounded-xl bg-[#141A28] border border-orange-500/40 text-white text-[13px] font-medium shadow-2xl shadow-orange-500/20 flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
