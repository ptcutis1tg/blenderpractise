import React, { useState } from 'react';
import { 
  Settings, 
  Sparkles, 
  Download, 
  Upload, 
  RotateCcw, 
  Bot, 
  Cpu, 
  Key, 
  CheckCircle2, 
  PlusCircle,
  Laptop,
  Cloud,
  LogOut,
  CloudUpload
} from 'lucide-react';
import { AIService, AIConfig } from '../services/aiService';
import { ExportService } from '../services/exportService';
import { DatabaseService } from '../services/db';
import { BridgeStatus } from '../services/blenderBridge';
import { UserProfile } from '../services/supabaseClient';

interface SettingsViewProps {
  onRoadmapsUpdated: () => void;
  showToast: (msg: string) => void;
  userProfile?: UserProfile | null;
  bridgeStatus?: BridgeStatus | null;
  onOpenAuthModal?: () => void;
  onSignOut?: () => void;
  onManualCloudSync?: () => void;
  isCloudSyncing?: boolean;
  onRoadmapCreated?: (roadmapId: string) => void;
}

type SettingsTab = 'account' | 'blender' | 'ai';

export const SettingsView: React.FC<SettingsViewProps> = ({
  onRoadmapsUpdated,
  showToast,
  userProfile,
  bridgeStatus,
  onOpenAuthModal,
  onSignOut,
  onManualCloudSync,
  isCloudSyncing = false,
  onRoadmapCreated,
}) => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('account');
  const [aiConfig, setAiConfig] = useState<AIConfig>(() => AIService.getConfig());
  const [showApiKey, setShowApiKey] = useState(false);
  const [testStatus, setTestStatus] = useState<string | null>(null);
  const [roadmapTopic, setRoadmapTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const mobileAccessUrl =
    bridgeStatus?.lanUrl || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173');

  const handleSaveAIConfig = () => {
    AIService.saveConfig(aiConfig);
    showToast('Đã lưu cài đặt AI!');
  };

  const handleTestAI = async () => {
    AIService.saveConfig(aiConfig);
    setTestStatus('Đang kiểm tra kết nối AI...');
    const reply = await AIService.diagnoseIssue('normals');
    if (reply) {
      setTestStatus(`Kết nối thành công (${aiConfig.provider})!`);
    } else {
      setTestStatus('Không thể kết nối tới nhà cung cấp AI.');
    }
  };

  const handleGenerateRoadmap = async () => {
    if (!roadmapTopic.trim()) {
      showToast('Vui lòng nhập tên chủ đề 3D trước.');
      return;
    }
    setIsGenerating(true);
    try {
      const newRoadmap = await AIService.generateCustomRoadmap(roadmapTopic);
      const currentRoadmaps = DatabaseService.getRoadmaps();
      currentRoadmaps.push(newRoadmap);
      DatabaseService.saveRoadmaps(currentRoadmaps);
      setRoadmapTopic('');
      onRoadmapsUpdated();
      showToast(`✨ Đã tạo lộ trình "${newRoadmap.title}"!`);
      onRoadmapCreated?.(newRoadmap.id);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExport = () => {
    ExportService.exportBackup();
    showToast('💾 Đã xuất file sao lưu JSON!');
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
    if (window.confirm('Bạn có chắc muốn xóa toàn bộ tiến độ, ghi chú và đưa dữ liệu về mặc định?')) {
      ExportService.resetToDefaults();
      onRoadmapsUpdated();
      showToast('Đã khôi phục dữ liệu về mặc định.');
    }
  };

  return (
    <div className="flex-1 h-full overflow-y-auto bg-[#0B0F19] text-[#dfe2f1] p-6 lg:p-8 select-none">
      <div className="max-w-3xl mx-auto flex flex-col gap-6 pb-12">
        {/* Header + 3 Clean Tabs */}
        <div className="flex flex-col gap-4 border-b border-[#1C2333] pb-4">
          <div>
            <h1 className="font-['Space_Grotesk'] text-2xl font-bold text-white flex items-center gap-2.5">
              <Settings className="w-5 h-5 text-[#F97316]" />
              Cài đặt Hệ thống
            </h1>
            <p className="text-[13px] text-gray-400 mt-1">
              Quản lý tài khoản đám mây, kết nối Blender 5.3 và cấu hình trợ lý AI.
            </p>
          </div>

          <div className="flex items-center gap-1 p-1 rounded-xl bg-[#121723] border border-[#1E2638] w-full sm:w-fit overflow-x-auto">
            {[
              { id: 'account' as SettingsTab, label: 'Tài khoản & Dữ liệu' },
              { id: 'blender' as SettingsTab, label: 'Blender & Di động' },
              { id: 'ai' as SettingsTab, label: 'Trợ lý AI & Lộ trình' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-lg text-[12px] font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#1F273B] text-white font-semibold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* TAB 1: Tài khoản & Sao lưu dữ liệu */}
        {activeTab === 'account' && (
          <div className="flex flex-col gap-5">
            {/* Supabase Cloud Account */}
            <div className="p-5 rounded-xl bg-[#121723] border border-[#1E2638] flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Cloud className="w-5 h-5 text-[#F97316]" />
                  <div>
                    <h3 className="text-[15px] font-bold text-white">Tài khoản Supabase Cloud</h3>
                    <p className="text-[12px] text-gray-400">
                      Đồng bộ tiến độ 26 bài giáo trình, lộ trình và ghi chú đa thiết bị.
                    </p>
                  </div>
                </div>
                {userProfile ? (
                  <span className="text-[11px] font-mono text-emerald-400">Đã kết nối</span>
                ) : (
                  <span className="text-[11px] font-mono text-gray-400">Chế độ Khách</span>
                )}
              </div>

              {userProfile ? (
                <div className="p-4 rounded-xl bg-[#0B0F19] border border-[#1C2333] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#F97316] text-white flex items-center justify-center text-sm font-bold shrink-0">
                      {userProfile.displayName ? userProfile.displayName.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{userProfile.displayName}</h4>
                      <p className="text-xs text-slate-400 font-mono">{userProfile.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={onManualCloudSync}
                      disabled={isCloudSyncing}
                      className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50"
                    >
                      <CloudUpload size={14} className={isCloudSyncing ? 'animate-spin' : ''} />
                      <span>{isCloudSyncing ? 'Đang đồng bộ...' : 'Đồng bộ ngay'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={onSignOut}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#1A2234] hover:bg-red-950/50 text-red-300 text-xs font-medium transition-colors cursor-pointer"
                    >
                      <LogOut size={13} />
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-[#0B0F19] border border-[#1C2333] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <p className="text-[12px] text-gray-400">
                    Đăng nhập bằng Email hoặc Google để lưu giữ toàn bộ quá trình học lên Cloud.
                  </p>
                  <button
                    type="button"
                    onClick={onOpenAuthModal}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-semibold transition-colors cursor-pointer shrink-0"
                  >
                    <Cloud size={14} />
                    <span>Đăng nhập / Đăng ký</span>
                  </button>
                </div>
              )}
            </div>

            {/* Backup & Reset */}
            <div className="p-5 rounded-xl bg-[#121723] border border-[#1E2638] flex flex-col gap-4">
              <div>
                <h3 className="text-[15px] font-bold text-white">Sao lưu & Khôi phục cục bộ</h3>
                <p className="text-[12px] text-gray-400 mt-0.5">
                  Xuất toàn bộ tiến độ, ghi chú và cấu hình thành tệp JSON dự phòng.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleExport}
                  type="button"
                  className="px-4 py-2 rounded-lg bg-[#1C2436] hover:bg-[#253048] text-white font-medium text-[12px] flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4 text-emerald-400" />
                  <span>Xuất sao lưu (.json)</span>
                </button>

                <label className="px-4 py-2 rounded-lg bg-[#1C2436] hover:bg-[#253048] text-white font-medium text-[12px] flex items-center gap-2 transition-colors cursor-pointer">
                  <Upload className="w-4 h-4 text-[#F97316]" />
                  <span>Nhập từ file JSON</span>
                  <input type="file" accept=".json" onChange={handleImportFile} className="hidden" />
                </label>

                <button
                  onClick={handleResetDefaults}
                  type="button"
                  className="px-4 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-300 font-medium text-[12px] border border-red-500/20 flex items-center gap-2 transition-colors cursor-pointer sm:ml-auto"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Khôi phục mặc định</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Blender Bridge & Mobile LAN Access */}
        {activeTab === 'blender' && (
          <div className="flex flex-col gap-5">
            <div className="p-5 rounded-xl bg-[#121723] border border-[#1E2638] flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h3 className="text-[15px] font-bold text-white flex items-center gap-2">
                  <Laptop className="w-4 h-4 text-[#F97316]" />
                  Môi trường Blender 5.3 Bridge
                </h3>
                <span className="text-[11px] font-mono text-gray-300">
                  {bridgeStatus?.blenderInstalled
                    ? 'Đã cài đặt (Local)'
                    : bridgeStatus?.isWebMode
                    ? 'Chế độ Web / Di động'
                    : 'Chưa tìm thấy Blender 5.3'}
                </span>
              </div>

              <div className="flex flex-col gap-1.5 text-[12px] font-mono bg-[#0B0F19] p-4 rounded-xl border border-[#1C2333] text-gray-300">
                <div>
                  <span className="text-gray-500">Server:</span>{' '}
                  {bridgeStatus?.serverAvailable ? 'Local Vite Bridge Đang chạy' : 'Static Web Host'}
                </div>
                <div>
                  <span className="text-gray-500">Đường dẫn Blender:</span>{' '}
                  {bridgeStatus?.serverAvailable
                    ? bridgeStatus.blenderPath || 'Chưa cấu hình'
                    : 'Chỉ khả dụng khi chạy trên máy tính cá nhân'}
                </div>
                <div>
                  <span className="text-gray-500">File mẫu (.blend):</span>{' '}
                  {bridgeStatus?.starterAssetExists
                    ? 'challenge_04_chair_starter.blend & challenge_05_scifi_crate.blend'
                    : 'Có sẵn trong thư mục desktop starter_assets'}
                </div>
                <div>
                  <span className="text-gray-500">Telemetry Addon:</span>{' '}
                  {bridgeStatus?.telemetryAvailable ? 'Đã nhận dữ liệu đồng bộ từ Blender' : 'Chưa có file telemetry'}
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-[#121723] border border-[#1E2638] flex flex-col gap-3">
              <div>
                <h3 className="text-[15px] font-bold text-white">Truy cập trên Điện thoại & Tablet</h3>
                <p className="text-[12px] text-gray-400 mt-0.5">
                  Mở liên kết dưới đây trên trình duyệt điện thoại cùng mạng Wi-Fi để học bài và xoay mô hình 3D bằng cảm ứng.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0B0F19] border border-[#1C2333] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <span className="text-[14px] font-bold font-mono text-emerald-400 truncate max-w-full">
                  {mobileAccessUrl}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(mobileAccessUrl);
                    showToast('📋 Đã sao chép đường dẫn truy cập!');
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-[#1C2436] hover:bg-[#253048] text-white text-[12px] font-medium transition-colors cursor-pointer shrink-0"
                >
                  Sao chép liên kết
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Trợ lý AI & Tạo Lộ trình */}
        {activeTab === 'ai' && (
          <div className="flex flex-col gap-5">
            {/* Custom Roadmap Generator */}
            <div className="p-5 rounded-xl bg-[#121723] border border-[#1E2638] flex flex-col gap-3.5">
              <div>
                <h3 className="text-[15px] font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#F97316]" />
                  Tạo Lộ trình Học tập Mới
                </h3>
                <p className="text-[12px] text-gray-400 mt-0.5">
                  Tự động tạo lộ trình nhiều học phần cho bất kỳ chủ đề Blender 3D nào bạn muốn luyện tập.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-2.5">
                <input
                  type="text"
                  placeholder="Ví dụ: Dựng Robot Sci-Fi, Nhân vật Anime, Cảnh nội thất..."
                  value={roadmapTopic}
                  onChange={(e) => setRoadmapTopic(e.target.value)}
                  className="flex-1 px-3.5 py-2 rounded-lg bg-[#0B0F19] border border-[#222B3F] text-white text-[13px] focus:outline-none focus:border-[#F97316] placeholder-gray-500 w-full"
                />
                <button
                  onClick={handleGenerateRoadmap}
                  disabled={isGenerating}
                  type="button"
                  className="w-full sm:w-auto px-4 py-2 rounded-lg bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold text-[13px] flex items-center justify-center gap-2 transition-colors cursor-pointer shrink-0 disabled:opacity-50"
                >
                  {isGenerating ? (
                    <span>Đang tạo...</span>
                  ) : (
                    <>
                      <PlusCircle className="w-4 h-4" />
                      <span>Tạo Lộ trình</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* AI Provider Settings */}
            <div className="p-5 rounded-xl bg-[#121723] border border-[#1E2638] flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-[#F97316]" />
                <h3 className="text-[15px] font-bold text-white">Nhà cung cấp Trợ lý AI</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'offline_local', label: 'Kho Tri thức Offline', desc: 'Không cần mạng, dùng sẵn dữ liệu sửa lỗi Blender 5.3.' },
                  { id: 'gemini', label: 'Google Gemini', desc: 'Dùng API Key miễn phí từ Google AI Studio.' },
                  { id: 'ollama', label: 'Local Ollama', desc: 'Chạy mô hình LLM cục bộ trên máy của bạn.' },
                ].map((p) => (
                  <div
                    key={p.id}
                    onClick={() => setAiConfig({ ...aiConfig, provider: p.id as any })}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-colors flex flex-col justify-between ${
                      aiConfig.provider === p.id
                        ? 'bg-[#182032] border-[#F97316]'
                        : 'bg-[#0B0F19] border-[#1C2333] hover:border-[#2C3752]'
                    }`}
                  >
                    <div>
                      <h4 className="text-[13px] font-bold text-white">{p.label}</h4>
                      <p className="text-[11px] text-gray-400 mt-1">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {aiConfig.provider === 'gemini' && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-medium text-gray-300 flex items-center gap-1.5">
                    <Key className="w-3.5 h-3.5 text-[#F97316]" /> Google Gemini API Key
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type={showApiKey ? 'text' : 'password'}
                      placeholder="AIzaSy..."
                      value={aiConfig.apiKey}
                      onChange={(e) => setAiConfig({ ...aiConfig, apiKey: e.target.value })}
                      className="flex-1 px-3.5 py-2 rounded-lg bg-[#0B0F19] border border-[#222B3F] text-white text-[13px] font-mono focus:outline-none focus:border-[#F97316]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="px-3 py-2 rounded-lg bg-[#1C2436] text-gray-300 text-[12px] hover:text-white cursor-pointer"
                    >
                      {showApiKey ? 'Ẩn' : 'Hiện'}
                    </button>
                  </div>
                </div>
              )}

              {aiConfig.provider === 'ollama' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-medium text-gray-300 flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-[#F97316]" /> Ollama Server URL
                    </label>
                    <input
                      type="text"
                      placeholder="http://localhost:11434"
                      value={aiConfig.ollamaEndpoint}
                      onChange={(e) => setAiConfig({ ...aiConfig, ollamaEndpoint: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg bg-[#0B0F19] border border-[#222B3F] text-white text-[13px] font-mono focus:outline-none focus:border-[#F97316]"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-medium text-gray-300 flex items-center gap-1.5">
                      <Bot className="w-3.5 h-3.5 text-[#F97316]" /> Tên Model
                    </label>
                    <input
                      type="text"
                      placeholder="llama3"
                      value={aiConfig.ollamaModel || 'llama3'}
                      onChange={(e) => setAiConfig({ ...aiConfig, ollamaModel: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg bg-[#0B0F19] border border-[#222B3F] text-white text-[13px] font-mono focus:outline-none focus:border-[#F97316]"
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-[#1C2333]">
                <button
                  onClick={handleTestAI}
                  type="button"
                  className="px-3.5 py-1.5 rounded-lg bg-[#1C2436] hover:bg-[#253048] text-gray-200 text-[12px] font-medium transition-colors cursor-pointer"
                >
                  Kiểm tra kết nối
                </button>

                <button
                  onClick={handleSaveAIConfig}
                  type="button"
                  className="px-4 py-1.5 rounded-lg bg-[#F97316] hover:bg-[#EA580C] text-white text-[12px] font-semibold transition-colors cursor-pointer"
                >
                  Lưu cài đặt AI
                </button>
              </div>

              {testStatus && (
                <div className="p-3 rounded-lg bg-[#0B0F19] border border-emerald-500/30 text-emerald-300 text-[12px] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{testStatus}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
