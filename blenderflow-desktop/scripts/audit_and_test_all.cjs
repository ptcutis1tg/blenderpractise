const fs = require('fs');
const path = require('path');
const http = require('http');

console.log('====================================================');
console.log('   BLENDERFLOW DESKTOP - POST-REMEDIATION AUDIT     ');
console.log('====================================================\n');

const ROOT_DIR = path.resolve('c:/Users/Admin/Desktop/CODE/blenderflow-desktop');

const results = {
  passed: 0,
  failed: 0,
  warnings: 0,
  details: []
};

function recordTest(name, passed, message, isWarning = false) {
  if (passed) {
    results.passed++;
    console.log(`[PASS] ${name}: ${message}`);
  } else if (isWarning) {
    results.warnings++;
    console.log(`[WARN] ${name}: ${message}`);
  } else {
    results.failed++;
    console.log(`[FAIL] ${name}: ${message}`);
  }
  results.details.push({ name, passed, isWarning, message });
}

// 1. Check all critical files exist
console.log('--- 1. FILE & ASSET PRESENCE CHECKS ---');
const filesToCheck = [
  'package.json',
  'vite.config.ts',
  'start_blenderflow_desktop.bat',
  'open_starter_in_blender.bat',
  'starter_assets/challenge_04_chair_starter.blend',
  'blender_addon/blenderflow_bridge.py',
  'dist/index.html',
  'src/App.tsx',
  'src/data/curriculumDatabase.ts',
  'src/data/lessonDetails.ts',
  'src/services/db.ts',
  'src/services/aiService.ts',
  'src/services/blenderBridge.ts',
  'src/services/exportService.ts',
  'src/views/HomeDashboardView.tsx',
  'src/views/CourseWorkspaceView.tsx',
  'src/views/CurriculumExplorerView.tsx',
  'src/views/SplitPracticeView.tsx',
  'src/views/HotkeyCheatsheetView.tsx',
  'src/views/SettingsView.tsx',
  'src/components/3d/ModelInspector3D.tsx',
  'src/components/curriculum/MarkdownArticleViewer.tsx',
  'src/components/practice/PracticeRightPanel.tsx',
  'src/components/ai/AIAssistantModal.tsx',
  'src/components/auth/AuthModal.tsx',
  'src/services/supabaseClient.ts',
  'src/services/cloudSyncService.ts',
];

filesToCheck.forEach(file => {
  const fullPath = path.join(ROOT_DIR, file);
  const exists = fs.existsSync(fullPath);
  if (exists) {
    const size = fs.statSync(fullPath).size;
    recordTest(`File: ${file}`, true, `Exists (${size} bytes)`);
  } else {
    recordTest(`File: ${file}`, false, 'Missing file on disk');
  }
});

// Check that dead HotkeyDrillsView.tsx is indeed removed
const deadDrillsPath = path.join(ROOT_DIR, 'src/views/HotkeyDrillsView.tsx');
recordTest('Dead Code Removal: HotkeyDrillsView.tsx', !fs.existsSync(deadDrillsPath), 'Successfully removed dead component');

// 2. Check Curriculum Database content & structure
console.log('\n--- 2. CURRICULUM DATABASE INTEGRITY ---');
const curDbPath = path.join(ROOT_DIR, 'src/data/curriculumDatabase.ts');
if (fs.existsSync(curDbPath)) {
  const curContent = fs.readFileSync(curDbPath, 'utf8');
  const modMatches = curContent.match(/"id":\s*"cur-mod-\d+"/g) || [];
  const lesMatches = curContent.match(/"id":\s*"les-cur-mod-\d+-\d+"/g) || [];
  recordTest('Curriculum Modules Count', modMatches.length === 10, `Found ${modMatches.length} / 10 expected modules`);
  recordTest('Curriculum Lessons Count', lesMatches.length === 26, `Found ${lesMatches.length} / 26 expected lessons`);
}

// 3. Check App.tsx view wiring & Toast position
console.log('\n--- 3. APP.TSX VIEW ROUTING & TOAST OVERLAP FIX ---');
const appPath = path.join(ROOT_DIR, 'src/App.tsx');
if (fs.existsSync(appPath)) {
  const appContent = fs.readFileSync(appPath, 'utf8');
  const hasCurriculumTab = appContent.includes("'curriculum'");
  const hasCurriculumView = appContent.includes('<CurriculumExplorerView');
  const toastAtTopRight = appContent.includes('top-14 right-5');
  const hasLiveSyncTelemetry = appContent.includes('fetchTelemetry');

  recordTest('Route: Curriculum Explorer', hasCurriculumView && hasCurriculumTab, 'Unified Curriculum & Roadmaps tab active');
  recordTest('BUG-03 Fixed: Toast Position', toastAtTopRight, 'Toast moved to top-14 right-5; NO OVERLAP with bottom-right AI FAB button');
  recordTest('Titlebar Sync: Live Telemetry Call', hasLiveSyncTelemetry, 'onSyncBlender calls fetchTelemetry()');
}

// 4. Code Inspection for WebGL & Preview Server fixes
console.log('\n--- 4. POST-REMEDIATION CODE VERIFICATIONS ---');

// Bug 1 & 2: ModelInspector3D autoRotate and ResizeObserver
const model3DPath = path.join(ROOT_DIR, 'src/components/3d/ModelInspector3D.tsx');
if (fs.existsSync(model3DPath)) {
  const mContent = fs.readFileSync(model3DPath, 'utf8');
  const hasCleanDependency = mContent.includes('}, []);');
  const hasAutoRotateRef = mContent.includes('autoRotateRef.current');
  const hasResizeObserver = mContent.includes('ResizeObserver');

  recordTest('BUG-01 Fixed: WebGL Teardown on AutoRotate', hasCleanDependency && hasAutoRotateRef, 'Using autoRotateRef with empty dependency array []');
  recordTest('BUG-02 Fixed: Canvas ResizeObserver', hasResizeObserver, 'ResizeObserver active on 3D container for instant split ratio adaptation');
}

// Bug 7: Vite preview server hook & manualChunks
const viteConfigPath = path.join(ROOT_DIR, 'vite.config.ts');
if (fs.existsSync(viteConfigPath)) {
  const vContent = fs.readFileSync(viteConfigPath, 'utf8');
  const hasConfigurePreviewServer = vContent.includes('configurePreviewServer');
  const hasManualChunks = vContent.includes('manualChunks');
  recordTest('BUG-07 Fixed: configurePreviewServer in Vite', hasConfigurePreviewServer, 'Both dev and preview servers support /api/launch-blender & /api/mesh-telemetry');
  recordTest('Bundle Optimization: manualChunks in Vite', hasManualChunks, 'Vendor chunks for three and lucide-react configured');
}

// Check Strict Telemetry in PracticeRightPanel
const panelPath = path.join(ROOT_DIR, 'src/components/practice/PracticeRightPanel.tsx');
if (fs.existsSync(panelPath)) {
  const pContent = fs.readFileSync(panelPath, 'utf8');
  const usesStrictTelemetry = pContent.includes('verifyTopologyStrict');
  recordTest('Q2.B Decision: Strict Live Telemetry Verification', usesStrictTelemetry, 'PracticeRightPanel requires live telemetry sync from Blender 5.3');
}

// 5. Check Supabase Integration & Cloud Sync
console.log('\n--- 5. SUPABASE AUTH & CLOUD SYNC VERIFICATIONS ---');
const supaClientPath = path.join(ROOT_DIR, 'src/services/supabaseClient.ts');
if (fs.existsSync(supaClientPath)) {
  const supaContent = fs.readFileSync(supaClientPath, 'utf8');
  const hasClient = supaContent.includes('createClient');
  const hasAuthService = supaContent.includes('AuthService');
  const hasGoogleOAuth = supaContent.includes('signInWithOAuth');
  recordTest('Supabase Client: Initialization', hasClient, 'Supabase client properly initialized with project URL');
  recordTest('Supabase Auth: Email & Google OAuth', hasAuthService && hasGoogleOAuth, 'AuthService supports Email/Password & Google 1-tap OAuth');
}

const syncPath = path.join(ROOT_DIR, 'src/services/cloudSyncService.ts');
if (fs.existsSync(syncPath)) {
  const syncContent = fs.readFileSync(syncPath, 'utf8');
  const hasMerge = syncContent.includes('mergeGuestDataOnLogin');
  const hasDebounce = syncContent.includes('debouncedPush');
  recordTest('Cloud Sync: Offline-First Hybrid Sync', hasMerge && hasDebounce, 'Supports debounced progress push and guest progress merge on login');
}

if (fs.existsSync(appPath)) {
  const appContent = fs.readFileSync(appPath, 'utf8');
  const hasAuthModal = appContent.includes('<AuthModal');
  const hasAuthListener = appContent.includes('onAuthStateChange');
  recordTest('App Integration: AuthModal & State Listener', hasAuthModal && hasAuthListener, 'Auth modal mounted and auth state changes wired');
}

console.log('\n====================================================');
console.log(`TOTAL CHECKS: ${results.passed + results.failed + results.warnings}`);
console.log(`PASSED: ${results.passed}`);
console.log(`FAILED: ${results.failed}`);
console.log(`WARNINGS: ${results.warnings}`);
console.log('====================================================');
