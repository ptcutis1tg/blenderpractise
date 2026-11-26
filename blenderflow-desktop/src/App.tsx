import React, { useState, useEffect, useRef, useMemo } from 'react';
import { DatabaseService } from './services/db';
import { BlenderBridgeService, BridgeStatus } from './services/blenderBridge';
import { AuthService, UserProfile } from './services/supabaseClient';
import { CloudSyncService } from './services/cloudSyncService';
import { BLENDER_CURRICULUM_MODULES } from './data/curriculumDatabase';
import { NavigationTab, Roadmap, UserStats } from './types';
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
import { Search, X, Box, CheckCircle2, BookOpen, Keyboard } from 'lucide-react';

export function App() {
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>(() => DatabaseService.getRoadmaps());
  const [userStats, setUserStats] = useState<UserStats>(() => DatabaseService.getUserStats());
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [bridgeStatus, setBridgeStatus] = useState<BridgeStatus | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCloudSyncing, setIsCloudSyncing] = useState(false);
  const [currentTab, setCurrentTab] = useState<NavigationTab>('home');
  const [activeRoadmapId, setActiveRoadmapId] = useState<string>('roadmap-hard-surface');
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'home' | 'course' | 'curriculum' | 'practice' | 'hotkeys' | 'settings'>('home');
  const [previousViewMode, setPreviousViewMode] = useState<'home' | 'course' | 'curriculum'>('home');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setToastMessage(null), 3500);
  };

  // 1. Check real Blender Bridge availability & Supabase Auth state on mount
  useEffect(() => {
    BlenderBridgeService.checkBridgeStatus().then((status) => {
      setBridgeStatus(status);
      setUserStats((prev) => ({
        ...prev,
        blenderConnected: status.serverAvailable && status.blenderInstalled,
      }));
    });

    AuthService.getCurrentUser().then(async (user) => {
      if (user) {
        const profile = await AuthService.getUserProfile(user.id);
        setUserProfile(profile);
        await CloudSyncService.pullCloudData(user.id);
        setRoadmaps([...DatabaseService.getRoadmaps()]);
        setUserStats(DatabaseService.getUserStats());
      }
    });

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

    const unsubscribeSync = CloudSyncService.subscribeStatus((status) => {
      setIsCloudSyncing(status.isSyncing);
    });

    return () => {
      authListener?.subscription?.unsubscribe();
      unsubscribeSync();
      if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    };
  }, []);

  // 2. Listen for Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setSearchOpen(false);
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
    if (tab === 'search') {
      setSearchOpen(true);
      return;
    }
    setCurrentTab(tab);
    setActiveTaskId(null);
    if (tab === 'home') {
      setViewMode('home');
    } else if (tab === 'curriculum') {
      setViewMode('curriculum');
    } else if (tab === 'my-roadmaps') {
      setViewMode('course');
    } else if (tab === 'hotkeys') {
      setViewMode('hotkeys');
    } else if (tab === 'settings') {
      setViewMode('settings');
    }
  };

  // Selecting a Roadmap card opens its CourseWorkspaceView directly (works for standard & AI roadmaps)
  const handleSelectRoadmap = (roadmapId: string) => {
    setActiveRoadmapId(roadmapId);
    setCurrentTab('my-roadmaps');
    setViewMode('course');
    setActiveTaskId(null);
  };

  const handleOpenPracticeChallenge = (taskId: string) => {
    if (viewMode === 'home' || viewMode === 'course' || viewMode === 'curriculum') {
      setPreviousViewMode(viewMode);
    }
    setActiveTaskId(taskId);
    setViewMode('practice');
  };

  const handleBackFromPractice = () => {
    setActiveTaskId(null);
    setViewMode(previousViewMode);
    if (previousViewMode === 'home') setCurrentTab('home');
    else if (previousViewMode === 'curriculum') setCurrentTab('curriculum');
    else setCurrentTab('my-roadmaps');
  };

  const handleToggleStep = (stepId: string, currentStatus: boolean) => {
    if (!activeTaskId) return;
    const updated = DatabaseService.updateTaskChecklistStep(activeTaskId, stepId, !currentStatus);
    setRoadmaps([...updated]);
    setUserStats(DatabaseService.getUserStats());
    CloudSyncService.debouncedPush(userProfile?.id);
  };

  const handleLaunchBlender = async (blendFileName?: string) => {
    showToast('⏳ Đang gửi lệnh mở Blender 5.3...');
    const res = await BlenderBridgeService.launchBlender(blendFileName);
    if (res.success) {
      showToast('🚀 ' + res.message);
    } else {
      showToast('⚠️ ' + res.message);
    }
  };

  const handleSubmitPracticeChallenge = () => {
    if (activeTaskId) {
      const updated = DatabaseService.completePracticeTask(activeTaskId);
      setRoadmaps([...updated]);
      setUserStats(DatabaseService.getUserStats());
      CloudSyncService.debouncedPush(userProfile?.id);
    }
    showToast('🎉 Đã nộp bài & đạt chuẩn Topology 100%! Tiến độ đã được lưu.');
    setTimeout(() => handleBackFromPractice(), 1200);
  };

  // Global search results across curriculum lessons, roadmaps, and hotkeys
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const allLessons = BLENDER_CURRICULUM_MODULES.flatMap((m) =>
      m.lessons.map((l) => ({ ...l, moduleTitle: m.vietnameseTitle }))
    );
    const hotkeys = DatabaseService.getHotkeys();

    if (!q) {
      return {
        roadmaps: roadmaps.slice(0, 2),
        lessons: allLessons.slice(0, 3),
        hotkeys: hotkeys.slice(0, 2),
      };
    }

    return {
      roadmaps: roadmaps.filter(
        (r) => r.title.toLowerCase().includes(q) || r.category.toLowerCase().includes(q)
      ),
      lessons: allLessons
        .filter(
          (l) =>
            l.title.toLowerCase().includes(q) ||
            l.summary.toLowerCase().includes(q) ||
            l.keyShortcuts.some((s) => s.toLowerCase().includes(q))
        )
        .slice(0, 6),
      hotkeys: hotkeys
        .filter(
          (h) =>
            h.keyCombination.toLowerCase().includes(q) ||
            h.description.toLowerCase().includes(q)
        )
        .slice(0, 4),
    };
  }, [searchQuery, roadmaps]);

  // Find active practice task object
  const practiceContext = activeTaskId ? DatabaseService.findPracticeTask(activeTaskId) : null;
  const currentRoadmap = roadmaps.find((r) => r.id === activeRoadmapId) || roadmaps[0];
  const bridgeConnected = Boolean(bridgeStatus?.serverAvailable && bridgeStatus?.blenderInstalled);
  const isWebMode = Boolean(bridgeStatus?.isWebMode);

  // Compute Vietnamese breadcrumbs
  const getBreadcrumbs = () => {
    if (viewMode === 'practice' && practiceContext) {
      return [practiceContext.roadmap.title, practiceContext.module.title, practiceContext.task.title];
    }
    if (viewMode === 'curriculum') {
      return ['Giáo trình 3D', 'Thư viện 26 Bài'];
    }
    if (viewMode === 'course') {
      return ['Lộ trình học', currentRoadmap.title];
    }
    if (viewMode === 'hotkeys') {
      return ['Phím tắt Blender 5.3'];
    }
    if (viewMode === 'settings') {
      return ['Cài đặt Hệ thống'];
    }
    return ['Tổng quan'];
  };

  const isZenMode = viewMode === 'practice';

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen overflow-hidden bg-[#0B0F19] text-[#dfe2f1]">
      {/* 1. Navigation Sidebar (Hidden in Zen Mode 3D Practice for 100% focus) */}
      {!isZenMode && (
        <NavigatorSidebar
          currentTab={currentTab}
          onSelectTab={handleSelectTab}
          userStats={userStats}
          bridgeConnected={bridgeConnected}
          isWebMode={isWebMode}
          onOpenPracticeChallenge={() => handleOpenPracticeChallenge('task-chair-01')}
        />
      )}

      {/* 2. Main Content Area */}
      <div className={`flex-1 flex flex-col h-full overflow-hidden ${!isZenMode ? 'pb-14 md:pb-0' : ''}`}>
        {/* Top Desktop Titlebar (Hidden in Zen Mode) */}
        {!isZenMode && (
          <DesktopTitlebar
            breadcrumbs={getBreadcrumbs()}
            userProfile={userProfile}
            onOpenSearch={() => setSearchOpen(true)}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
            onSignOut={handleSignOut}
            onManualCloudSync={handleManualCloudSync}
            isCloudSyncing={isCloudSyncing}
          />
        )}

        {/* Dynamic Views */}
        <div className="flex-1 overflow-hidden relative">
          {viewMode === 'home' && (
            <HomeDashboardView
              roadmaps={roadmaps}
              userStats={userStats}
              bridgeConnected={bridgeConnected}
              isWebMode={isWebMode}
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
              key={userProfile?.id || 'guest'}
              onOpenPracticeChallenge={handleOpenPracticeChallenge}
              onNavigateHome={() => {
                setCurrentTab('home');
                setViewMode('home');
              }}
              onProgressChanged={() => {
                const updatedStats = DatabaseService.recordStudyActivity(5);
                setUserStats(updatedStats);
                setRoadmaps([...DatabaseService.getRoadmaps()]);
                CloudSyncService.debouncedPush(userProfile?.id);
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
                setUserStats(DatabaseService.getUserStats());
                CloudSyncService.debouncedPush(userProfile?.id);
                showToast('Đã cập nhật tiến độ bài học!');
              }}
              onLaunchHotkeyDrill={() => {
                setCurrentTab('hotkeys');
                setViewMode('hotkeys');
              }}
              onOpenStarterBlend={(fileName) => {
                handleLaunchBlender(fileName);
              }}
            />
          )}

          {viewMode === 'practice' && practiceContext && (
            <SplitPracticeView
              task={practiceContext.task}
              roadmap={practiceContext.roadmap}
              bridgeConnected={bridgeConnected}
              isWebMode={isWebMode}
              onBack={handleBackFromPractice}
              onToggleStep={handleToggleStep}
              onLaunchBlender={handleLaunchBlender}
              onSubmitChallenge={handleSubmitPracticeChallenge}
            />
          )}

          {viewMode === 'hotkeys' && <HotkeyCheatsheetView />}

          {viewMode === 'settings' && (
            <SettingsView
              onRoadmapsUpdated={() => {
                setRoadmaps([...DatabaseService.getRoadmaps()]);
                setUserStats(DatabaseService.getUserStats());
                CloudSyncService.debouncedPush(userProfile?.id);
              }}
              showToast={showToast}
              userProfile={userProfile}
              bridgeStatus={bridgeStatus}
              onOpenAuthModal={() => setIsAuthModalOpen(true)}
              onSignOut={handleSignOut}
              onManualCloudSync={handleManualCloudSync}
              isCloudSyncing={isCloudSyncing}
              onRoadmapCreated={(newId) => {
                CloudSyncService.debouncedPush(userProfile?.id);
                handleSelectRoadmap(newId);
              }}
            />
          )}
        </div>
      </div>

      {/* Floating 3D Topology Doctor Assistant */}
      <AIAssistantModal />

      {/* Global Search Modal (Ctrl+K) with Live Filtering */}
      {searchOpen && (
        <div
          onClick={() => setSearchOpen(false)}
          className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl bg-[#141A28] border border-[#2B354D] rounded-2xl shadow-2xl p-5 flex flex-col gap-4 max-h-[80vh]"
          >
            <div className="flex items-center gap-3 border-b border-[#1F2637] pb-3">
              <Search className="w-4 h-4 text-indigo-400 shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Tìm nhanh bài học (Level 0-8), Roadmap hoặc phím tắt (VD: Bevel, UV, Ctrl+R)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-white text-[13px] focus:outline-none placeholder-gray-500"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-gray-400 hover:text-white text-xs"
                >
                  Xóa
                </button>
              )}
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col gap-2 overflow-y-auto pr-1">
              {/* Roadmaps matches */}
              {searchResults.roadmaps.map((rm) => (
                <div
                  key={rm.id}
                  onClick={() => {
                    handleSelectRoadmap(rm.id);
                    setSearchOpen(false);
                  }}
                  className="p-3 rounded-xl bg-[#0F131D] hover:bg-[#1C2436] border border-[#1F2637] cursor-pointer flex items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-[13px] font-medium text-white truncate">{rm.title}</span>
                  </div>
                  <span className="text-[10px] bg-emerald-500/15 text-emerald-300 px-2 py-0.5 rounded shrink-0">
                    Roadmap ({rm.progressPercent}%)
                  </span>
                </div>
              ))}

              {/* Practice Challenge quick launch */}
              {(!searchQuery.trim() || 'chair challenge 04 3d'.includes(searchQuery.toLowerCase())) && (
                <div
                  onClick={() => {
                    handleOpenPracticeChallenge('task-chair-01');
                    setSearchOpen(false);
                  }}
                  className="p-3 rounded-xl bg-[#0F131D] hover:bg-[#1C2436] border border-[#1F2637] cursor-pointer flex items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-3">
                    <Box className="w-4 h-4 text-[#F97316] shrink-0" />
                    <span className="text-[13px] font-medium text-white">Challenge 04: Low-Poly Stylized Chair</span>
                  </div>
                  <span className="text-[10px] bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded font-mono shrink-0">
                    50:50 Dual View
                  </span>
                </div>
              )}

              {/* Curriculum lesson matches */}
              {searchResults.lessons.map((les) => (
                <div
                  key={les.id}
                  onClick={() => {
                    setCurrentTab('curriculum');
                    setViewMode('curriculum');
                    setSearchOpen(false);
                  }}
                  className="p-3 rounded-xl bg-[#0F131D] hover:bg-[#1C2436] border border-[#1F2637] cursor-pointer flex items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <BookOpen className="w-4 h-4 text-indigo-400 shrink-0" />
                    <div className="flex flex-col min-w-0">
                      <span className="text-[13px] font-medium text-white truncate">{les.title}</span>
                      <span className="text-[10px] text-gray-500 truncate">{les.moduleTitle}</span>
                    </div>
                  </div>
                  <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded font-mono shrink-0">
                    Curriculum
                  </span>
                </div>
              ))}

              {/* Hotkeys matches */}
              {searchResults.hotkeys.map((hk) => (
                <div
                  key={hk.id}
                  onClick={() => {
                    setCurrentTab('hotkeys');
                    setViewMode('hotkeys');
                    setSearchOpen(false);
                  }}
                  className="p-3 rounded-xl bg-[#0F131D] hover:bg-[#1C2436] border border-[#1F2637] cursor-pointer flex items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Keyboard className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="font-mono text-indigo-400 text-[12px] shrink-0">{hk.keyCombination}</span>
                    <span className="text-[13px] font-medium text-white truncate">{hk.description}</span>
                  </div>
                  <span className="text-[10px] text-gray-400 shrink-0">Shortcut</span>
                </div>
              ))}

              {searchResults.roadmaps.length === 0 &&
                searchResults.lessons.length === 0 &&
                searchResults.hotkeys.length === 0 && (
                  <p className="text-center text-xs text-gray-500 py-6">
                    Không tìm thấy kết quả phù hợp cho "{searchQuery}".
                  </p>
                )}
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
        <div className="fixed top-14 right-5 z-50 px-4 py-3 rounded-xl bg-[#141A28] border border-orange-500/40 text-white text-[13px] font-medium shadow-2xl shadow-orange-500/20 flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-200 max-w-md">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
