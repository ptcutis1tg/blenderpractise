import React, { useState } from 'react';
import { 
  Play, 
  CheckCircle2, 
  Circle, 
  ShieldCheck, 
  Cable, 
  Sparkles, 
  HelpCircle, 
  AlertCircle,
  FileCode,
  Flame,
  ArrowRight,
  ExternalLink,
  Award,
  RefreshCw
} from 'lucide-react';
import { PracticeTask } from '../../types';
import { KeycapBadge } from '../common/KeycapBadge';
import { BlenderBridgeService, VerificationResult } from '../../services/blenderBridge';

interface PracticeRightPanelProps {
  task: PracticeTask;
  bridgeConnected?: boolean;
  isWebMode?: boolean;
  onToggleStep: (stepId: string, currentStatus: boolean) => void;
  onLaunchBlender: () => void;
  onSubmitChallenge?: () => void;
}

export const PracticeRightPanel: React.FC<PracticeRightPanelProps> = ({
  task,
  bridgeConnected = false,
  isWebMode = false,
  onToggleStep,
  onLaunchBlender,
  onSubmitChallenge,
}) => {
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<VerificationResult | null>(null);

  const totalSteps = task.checklist.length;
  const completedSteps = task.checklist.filter((s) => s.isDone).length;
  const progressPercent = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;

  const handleValidateMesh = async () => {
    setIsValidating(true);
    const res = await BlenderBridgeService.verifyTopologyStrict(
      task.id,
      completedSteps,
      totalSteps,
      task.expectedVertices || 148,
      task.expectedFaces || 136
    );
    setIsValidating(false);
    setValidationResult(res);
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#0F131D] border-l border-[#1F2637] select-none overflow-y-auto">
      {/* Top Banner: Native Blender Launcher CTA */}
      <div className="p-4 border-b border-[#1F2637] bg-gradient-to-b from-[#161D2B] to-[#0F131D]">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${bridgeConnected ? 'bg-emerald-400 animate-pulse' : isWebMode ? 'bg-indigo-400' : 'bg-amber-400'}`} />
            <span className={`text-[12px] font-semibold flex items-center gap-1.5 ${bridgeConnected ? 'text-emerald-400' : isWebMode ? 'text-indigo-300' : 'text-amber-300'}`}>
              <Cable className="w-3.5 h-3.5" />
              {bridgeConnected
                ? 'Blender 5.3 Bridge Connected'
                : isWebMode
                ? 'Web / Mobile Companion Mode'
                : 'Local Bridge Offline'}
            </span>
          </div>
          {task.blendFileName && (
            <span className="text-[11px] font-mono text-gray-400 bg-[#0B0F19] px-2 py-0.5 rounded border border-[#1F2637] truncate max-w-[200px]">
              {task.blendFileName}
            </span>
          )}
        </div>

        {/* Direct Open in Blender Button (Shown when task uses a .blend starter asset) */}
        {task.blendFileName ? (
          <>
            <button
              onClick={onLaunchBlender}
              type="button"
              disabled={isWebMode}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#F97316] to-[#EA580C] hover:from-[#FB923C] hover:to-[#F97316] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-[13px] shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>
                {isWebMode
                  ? 'Chỉ mở trực tiếp Blender khi chạy trên Desktop Local'
                  : 'Launch & Work in Blender 5.3'}
              </span>
            </button>

            <p className="text-[11px] text-gray-400 text-center mt-2 flex items-center justify-center gap-1">
              <span>Opens Blender 5.3 with starter scene for "{task.title}"</span>
            </p>
          </>
        ) : (
          <div className="p-3 rounded-xl bg-[#0B0F19] border border-[#1F2637] text-[12px] text-gray-300">
            Chế độ bài tập thực hành tương tác ({task.type === 'hotkey_drill' ? 'Hotkey & Precision Drill' : '3D Topology Exercise'}). Tích hoàn thành từng bước bên dưới!
          </div>
        )}
      </div>

      {/* Main Checklist Section */}
      <div className="p-5 flex-1 flex flex-col gap-5">
        {/* Progress Bar & Header */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h3 className="font-['Space_Grotesk'] text-[16px] font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#F97316]" />
              Practice Checklist
            </h3>
            <span className="text-[12px] font-bold font-mono text-indigo-400">
              {completedSteps}/{totalSteps} Done ({progressPercent}%)
            </span>
          </div>

          <div className="w-full h-2 rounded-full bg-[#161D2B] overflow-hidden border border-[#1F2637]">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-[#F97316] transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Interactive Step Items with KeycapBadge */}
        <div className="flex flex-col gap-2.5">
          {task.checklist.map((step) => {
            return (
              <div
                key={step.id}
                onClick={() => onToggleStep(step.id, step.isDone)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                  step.isDone
                    ? 'bg-[#141A28]/80 border-emerald-500/30 text-gray-300'
                    : 'bg-[#141A28] border-[#1F2637] hover:border-indigo-500/50 hover:bg-[#1A2234]'
                }`}
              >
                <div className="mt-0.5 text-indigo-400">
                  {step.isDone ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-500 hover:text-indigo-400 transition-colors" />
                  )}
                </div>

                <div className="flex-1 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono uppercase font-bold text-gray-400">
                      Step {step.stepNumber}
                    </span>
                    {step.isDone && (
                      <span className="text-[10px] text-emerald-400 font-medium bg-emerald-500/10 px-1.5 py-0.2 rounded">
                        Completed
                      </span>
                    )}
                  </div>

                  <p
                    className={`text-[13px] leading-relaxed font-medium ${
                      step.isDone ? 'line-through text-gray-500' : 'text-gray-200'
                    }`}
                  >
                    {step.title}
                  </p>

                  {/* Hotkey hint pill with KeycapBadge */}
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[11px] text-gray-400">Hotkey:</span>
                    <KeycapBadge keys={step.hotkeyHint} variant="orange" size="sm" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Validation Widget */}
        <div className="mt-2 p-4 rounded-xl bg-[#141A28] border border-[#1F2637] flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-[13px] font-bold text-white">Mesh Topology Inspector</span>
            </div>
            <button
              onClick={handleValidateMesh}
              disabled={isValidating}
              type="button"
              className="px-3.5 py-1.5 rounded-lg bg-[#4F46E5] hover:bg-[#4338CA] text-white text-[12px] font-bold transition-all disabled:opacity-50 cursor-pointer flex items-center gap-1.5 shadow-md shadow-indigo-600/20"
            >
              {isValidating ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Inspecting Topology...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Validate Active Mesh</span>
                </>
              )}
            </button>
          </div>

          {validationResult && (
            <div
              className={`p-3.5 rounded-xl border text-[12px] leading-relaxed flex flex-col gap-2.5 ${
                validationResult.passed
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
                  : 'bg-amber-500/10 border-amber-500/30 text-amber-200'
              }`}
            >
              <div className="flex items-center justify-between font-semibold">
                <div className="flex items-center gap-2">
                  {validationResult.passed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-amber-400" />
                  )}
                  <span>{validationResult.message}</span>
                </div>
                <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-black/30">
                  Score: {validationResult.score}/100
                </span>
              </div>

              {/* Topology Comparison Specs */}
              <div className="grid grid-cols-3 gap-2 p-2 rounded-lg bg-black/25 text-[11px] font-mono text-center">
                <div>
                  <span className="text-gray-400 block text-[9px] uppercase">Vertices</span>
                  <span className="font-bold text-white">
                    {validationResult.metrics.actualVertices} / {validationResult.metrics.expectedVertices}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[9px] uppercase">Quads</span>
                  <span className="font-bold text-emerald-400">
                    {validationResult.metrics.actualQuads} / {validationResult.metrics.expectedQuads}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[9px] uppercase">N-Gons</span>
                  <span className="font-bold text-indigo-300">
                    {validationResult.metrics.ngons}
                  </span>
                </div>
              </div>

              {/* Suggestions */}
              {validationResult.suggestions.length > 0 && (
                <ul className="list-disc pl-4 text-[11px] space-y-0.5 text-gray-300">
                  {validationResult.suggestions.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              )}

              {/* Submit Challenge button when passed */}
              {validationResult.passed && (
                <button
                  type="button"
                  onClick={onSubmitChallenge}
                  className="mt-1 w-full py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[12px] flex items-center justify-center gap-1.5 shadow-md shadow-emerald-900/30 transition-all cursor-pointer"
                >
                  <Award className="w-4 h-4" />
                  <span>Submit Challenge & Claim Mastery Badge</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
