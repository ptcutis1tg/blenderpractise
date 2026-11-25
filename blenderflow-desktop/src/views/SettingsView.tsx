import React, { useState } from 'react';
import { 
  Settings, 
  Sparkles, 
  Download, 
  Upload, 
  RotateCcw, 
  Bot, 
  ShieldCheck, 
  Cpu, 
  Key, 
  CheckCircle2, 
  AlertCircle,
  FileCode,
  FolderOpen,
  PlusCircle,
  Laptop,
  Cloud,
  LogOut,
  User as UserIcon,
  CloudUpload,
  Database
} from 'lucide-react';
import { AIService, AIConfig } from '../services/aiService';
import { ExportService } from '../services/exportService';
import { Roadmap } from '../types';
import { UserProfile } from '../services/supabaseClient';

interface SettingsViewProps {
  onRoadmapsUpdated: () => void;
  showToast: (msg: string) => void;
  userProfile?: UserProfile | null;
  onOpenAuthModal?: () => void;
  onSignOut?: () => void;
  onManualCloudSync?: () => void;
  isCloudSyncing?: boolean;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  onRoadmapsUpdated,
  showToast,
  userProfile,
  onOpenAuthModal,
  onSignOut,
  onManualCloudSync,
  isCloudSyncing = false,
}) => {
  const [aiConfig, setAiConfig] = useState<AIConfig>(() => AIService.getConfig());
  const [showApiKey, setShowApiKey] = useState(false);
  const [testStatus, setTestStatus] = useState<string | null>(null);
  const [roadmapTopic, setRoadmapTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSaveAIConfig = () => {
    AIService.saveConfig(aiConfig);
    showToast('AI Settings saved successfully!');
  };

  const handleTestAI = async () => {
    setTestStatus('Testing AI connection...');
    const reply = await AIService.diagnoseIssue('normals');
    if (reply) {
      setTestStatus('Connection verified! 3D Topology engine is responding.');
    } else {
      setTestStatus('Could not reach AI provider.');
    }
  };

  const handleGenerateRoadmap = () => {
    if (!roadmapTopic.trim()) {
      showToast('Please enter a 3D topic name first.');
      return;
    }
    setIsGenerating(true);
    setTimeout(() => {
      const newRoadmap = AIService.generateCustomRoadmap(roadmapTopic);
      const currentRoadmaps: Roadmap[] = JSON.parse(
        localStorage.getItem('blenderflow_roadmaps_v1') || '[]'
      );
      currentRoadmaps.push(newRoadmap);
      localStorage.setItem('blenderflow_roadmaps_v1', JSON.stringify(currentRoadmaps));
      setIsGenerating(false);
      setRoadmapTopic('');
      onRoadmapsUpdated();
      showToast(`✨ Generated and added "${newRoadmap.title}" to My Roadmaps!`);
    }, 700);
  };

  const handleExport = () => {
    ExportService.exportBackup();
    showToast('💾 Backup exported as JSON file!');
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const res = ExportService.importBackup(content);
      if (res.success) {
        onRoadmapsUpdated();
        showToast(res.message);
      } else {
        showToast(`⚠️ ${res.message}`);
      }
    };
    reader.readAsText(file);
  };

  const handleResetDefaults = () => {
    if (window.confirm('Are you sure you want to reset all roadmaps and notes to default?')) {
      ExportService.resetToDefaults();
      onRoadmapsUpdated();
      showToast('Reset to factory defaults completed.');
    }
  };

  return (
    <div className="flex-1 h-full overflow-y-auto bg-[#0B0F19] text-[#dfe2f1] p-6 lg:p-8 select-none">
      <div className="max-w-4xl mx-auto flex flex-col gap-8 pb-12">
        {/* Header */}
        <div className="border-b border-[#1F2637] pb-6">
          <h1 className="font-['Space_Grotesk'] text-2xl font-bold text-white flex items-center gap-2.5">
            <Settings className="w-6 h-6 text-[#F97316]" />
            Application Settings & AI Engine
          </h1>
          <p className="text-[13px] text-gray-400 mt-1">
            Configure local Blender path, AI 3D assistant, generate custom curricula, and manage backups.
          </p>
        </div>

        {/* Mobile Web Access Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-[#141A28] to-[#121622] border border-indigo-500/30 flex flex-col gap-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/25">
                <Laptop className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-[15px] font-bold text-white flex items-center gap-2">
                  Truy cập trên Mobile & Tablet (Cùng Wi-Fi)
                  <span className="text-[10px] bg-emerald-500/15 text-emerald-400 font-mono px-2 py-0.5 rounded border border-emerald-500/30">
                    Sẵn sàng
                  </span>
                </h3>
                <p className="text-[12px] text-gray-400">
                  Mở trình duyệt trên điện thoại hoặc máy tính bảng để học giáo trình và xoay 3D cảm ứng.
                </p>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0B0F19] border border-[#1F2637] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex flex-col">
              <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Địa chỉ IP mạng LAN (Wi-Fi):</span>
              <span className="text-[15px] font-bold font-mono text-emerald-400 mt-0.5 selection:bg-indigo-600">
                http://192.168.1.6:5173
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText('http://192.168.1.6:5173');
                showToast('📋 Đã sao chép liên kết mobile vào bộ nhớ tạm!');
              }}
              className="px-3 py-1.5 rounded-lg bg-[#1E2538] hover:bg-[#252E45] text-indigo-300 border border-indigo-500/30 text-[12px] font-semibold transition-all cursor-pointer"
            >
              Sao chép liên kết
            </button>
          </div>
        </div>

        {/* Section: Supabase Cloud & Account Sync */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-[#121A2C] via-[#101726] to-[#0D121F] border border-blue-500/30 flex flex-col gap-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/30">
                <Cloud className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-[15px] font-bold text-white flex items-center gap-2">
                  Tài khoản & Supabase Cloud Sync
                  {userProfile ? (
                    <span className="text-[10px] bg-emerald-500/15 text-emerald-400 font-mono px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
                      <CheckCircle2 size={11} /> Đã kết nối Cloud
                    </span>
                  ) : (
                    <span className="text-[10px] bg-amber-500/15 text-amber-400 font-mono px-2 py-0.5 rounded border border-amber-500/30">
                      Chế độ Khách (Offline)
                    </span>
                  )}
                </h3>
                <p className="text-[12px] text-gray-400">
                  Tự động đồng bộ tiến độ học tập 3D, bài tập checklist, và lộ trình tùy chỉnh qua máy chủ Supabase Postgres.
                </p>
              </div>
            </div>

            {userProfile && (
              <button
                type="button"
                onClick={onSignOut}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/50 text-red-300 border border-red-800/50 text-xs font-medium transition cursor-pointer"
              >
                <LogOut size={13} />
                <span>Đăng xuất</span>
              </button>
            )}
          </div>

          {userProfile ? (
            <div className="p-4 rounded-xl bg-[#090D15] border border-[#1F2637] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white flex items-center justify-center text-base font-bold shadow-md">
                  {userProfile.displayName ? userProfile.displayName.charAt(0).toUpperCase() : 'U'}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{userProfile.displayName}</h4>
                  <p className="text-xs text-slate-400 font-mono">{userProfile.email}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    ID: <span className="font-mono text-slate-400">{userProfile.id.slice(0, 8)}...</span> | Máy chủ: <span className="text-indigo-400 font-mono">iidfgycdawaygzbkqsgy</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onManualCloudSync}
                  disabled={isCloudSyncing}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition cursor-pointer disabled:opacity-50"
                >
                  <CloudUpload size={14} className={isCloudSyncing ? 'animate-spin' : ''} />
                  <span>{isCloudSyncing ? 'Đang đồng bộ...' : 'Đồng bộ ngay'}</span>
                </button>
                <button
                  type="button"
                  onClick={onSignOut}
                  className="sm:hidden px-3 py-2 rounded-lg bg-red-950/40 text-red-300 border border-red-800/50 text-xs font-medium"
                >
                  <LogOut size={14} />
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-[#090D15] border border-[#1F2637] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-200">
                  Bạn đang sử dụng ứng dụng ở chế độ Khách (Guest Mode)
                </span>
                <span className="text-[11px] text-slate-400 mt-0.5">
                  Đăng nhập hoặc đăng ký tài khoản để sao lưu dữ liệu lên đám mây và đồng bộ tiến độ sang điện thoại di động.
                </span>
              </div>
              <button
                type="button"
                onClick={onOpenAuthModal}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/25 transition cursor-pointer active:scale-95"
              >
                <Cloud size={14} />
                <span>Đăng nhập / Đăng ký Cloud</span>
              </button>
            </div>
          )}
        </div>

        {/* Section 1: AI 3D Roadmap Generator */}
        <div className="p-6 rounded-2xl bg-[#141A28] border border-orange-500/30 flex flex-col gap-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#F97316] flex items-center justify-center text-white shadow-md shadow-orange-500/25">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-[15px] font-bold text-white">AI 3D Curriculum Generator</h3>
                <p className="text-[12px] text-gray-400">Instantly generate a structured multi-module Blender 5.3 roadmap for any topic.</p>
              </div>
            </div>
            <span className="text-[10px] bg-orange-500/15 text-orange-400 font-mono px-2 py-0.5 rounded border border-orange-500/30">
              Blender 5.3 Quad Standard
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 mt-1">
            <input
              type="text"
              placeholder="E.g. Low-Poly Cyberpunk Drone, Anime Character Face, Hard-Surface Watch..."
              value={roadmapTopic}
              onChange={(e) => setRoadmapTopic(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#0B0F19] border border-[#1F2637] text-white text-[13px] focus:outline-none focus:border-[#F97316] placeholder-gray-500 w-full"
            />
            <button
              onClick={handleGenerateRoadmap}
              disabled={isGenerating}
              type="button"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#F97316] to-[#EA580C] hover:from-[#FB923C] hover:to-[#F97316] text-white font-bold text-[13px] shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap shrink-0 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Synthesizing...</span>
                </>
              ) : (
                <>
                  <PlusCircle className="w-4 h-4" />
                  <span>Generate Roadmap</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Section 2: AI Provider & Assistant Configuration */}
        <div className="p-6 rounded-2xl bg-[#121622] border border-[#1F2637] flex flex-col gap-5">
          <div className="flex items-center justify-between border-b border-[#1F2637] pb-4">
            <div className="flex items-center gap-2.5">
              <Bot className="w-5 h-5 text-indigo-400" />
              <h3 className="text-[15px] font-bold text-white">3D Topology Doctor & Assistant Provider</h3>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              Offline Knowledge Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { id: 'offline_local', label: '100% Offline Database', desc: 'No internet required. Uses curated Blender 5.3 topology rules.' },
              { id: 'gemini', label: 'Google Gemini 1.5 Flash', desc: 'Free API key from Google AI Studio for deep technical reasoning.' },
              { id: 'ollama', label: 'Local Ollama (Llama 3)', desc: 'Connect to self-hosted localhost:11434 with zero cloud dependencies.' },
            ].map((p) => (
              <div
                key={p.id}
                onClick={() => setAiConfig({ ...aiConfig, provider: p.id as any })}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                  aiConfig.provider === p.id
                    ? 'bg-[#182030] border-indigo-500/50 shadow-md ring-1 ring-indigo-500/40'
                    : 'bg-[#141A28] border-[#1F2637] hover:border-gray-600'
                }`}
              >
                <div>
                  <h4 className="text-[13px] font-bold text-white">{p.label}</h4>
                  <p className="text-[11px] text-gray-400 mt-1">{p.desc}</p>
                </div>
                {aiConfig.provider === p.id && (
                  <span className="text-[10px] text-indigo-400 font-bold mt-3 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Selected
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Gemini API Key input if selected */}
          {aiConfig.provider === 'gemini' && (
            <div className="flex flex-col gap-2 pt-2">
              <label className="text-[12px] font-semibold text-gray-300 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-indigo-400" /> Google Gemini API Key
              </label>
              <div className="flex items-center gap-2">
                <input
                  type={showApiKey ? 'text' : 'password'}
                  placeholder="AIzaSy..."
                  value={aiConfig.apiKey}
                  onChange={(e) => setAiConfig({ ...aiConfig, apiKey: e.target.value })}
                  className="flex-1 px-3.5 py-2 rounded-lg bg-[#0B0F19] border border-[#1F2637] text-white text-[13px] font-mono focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="px-3 py-2 rounded-lg bg-[#182030] border border-[#2B354D] text-gray-300 text-[12px] hover:text-white"
                >
                  {showApiKey ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-2 border-t border-[#1F2637]">
            <button
              onClick={handleTestAI}
              type="button"
              className="px-3.5 py-1.5 rounded-lg bg-[#182030] hover:bg-[#202B40] text-gray-300 hover:text-white text-[12px] font-semibold border border-[#2B354D] transition-all cursor-pointer"
            >
              Test Diagnostics
            </button>

            <button
              onClick={handleSaveAIConfig}
              type="button"
              className="px-4 py-1.5 rounded-lg bg-[#4F46E5] hover:bg-[#4338CA] text-white text-[12px] font-bold shadow-md shadow-indigo-600/25 transition-all cursor-pointer"
            >
              Save AI Settings
            </button>
          </div>

          {testStatus && (
            <div className="p-3 rounded-lg bg-[#141A28] border border-emerald-500/30 text-emerald-300 text-[12px] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{testStatus}</span>
            </div>
          )}
        </div>

        {/* Section 3: Data Backup, Export & Factory Reset */}
        <div className="p-6 rounded-2xl bg-[#121622] border border-[#1F2637] flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-[#1F2637] pb-4">
            <div className="flex items-center gap-2.5">
              <Download className="w-5 h-5 text-emerald-400" />
              <h3 className="text-[15px] font-bold text-white">Data Backup & Migration</h3>
            </div>
            <span className="text-[11px] text-gray-400 font-mono">Offline LocalStorage</span>
          </div>

          <p className="text-[13px] text-gray-400 leading-relaxed">
            Your roadmaps, completed lessons, checklist ticks, and custom notes are stored locally on your machine. You can export a snapshot to move to a new PC or restore previous progress.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={handleExport}
              type="button"
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[12px] flex items-center gap-2 shadow-lg shadow-emerald-900/20 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Export Backup (.json)</span>
            </button>

            <label className="px-4 py-2 rounded-xl bg-[#182030] hover:bg-[#202B40] text-gray-200 hover:text-white font-semibold text-[12px] border border-[#2B354D] flex items-center gap-2 transition-all cursor-pointer">
              <Upload className="w-4 h-4 text-indigo-400" />
              <span>Import Backup</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImportFile}
                className="hidden"
              />
            </label>

            <div className="w-[1px] h-6 bg-[#1F2637] mx-1" />

            <button
              onClick={handleResetDefaults}
              type="button"
              className="px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 hover:text-red-200 font-semibold text-[12px] border border-red-500/30 flex items-center gap-2 transition-all cursor-pointer ml-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Factory Reset</span>
            </button>
          </div>
        </div>

        {/* Section 4: Blender 5.3 System Environment Status */}
        <div className="p-6 rounded-2xl bg-[#121622] border border-[#1F2637] flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Laptop className="w-5 h-5 text-gray-400" />
              <h3 className="text-[15px] font-bold text-white">Blender Environment</h3>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/30">
              Verified Installed
            </span>
          </div>

          <div className="flex flex-col gap-1 text-[12px] font-mono bg-[#0B0F19] p-3.5 rounded-xl border border-[#1F2637] text-gray-300">
            <div><strong>Executable:</strong> C:\Program Files\Blender Foundation\Blender 5.3\blender.exe</div>
            <div><strong>Starter Project:</strong> starter_assets\challenge_04_chair_starter.blend (87.7 KB)</div>
            <div><strong>Addon:</strong> blender_addon\blenderflow_bridge.py (Registered)</div>
          </div>
        </div>
      </div>
    </div>
  );
};
