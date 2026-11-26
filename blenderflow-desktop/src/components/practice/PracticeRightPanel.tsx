import React, { useState } from 'react';
import { 
  Play, 
  CheckCircle2, 
  Circle, 
  ShieldCheck, 
  Cable, 
  AlertCircle,
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
      task.expectedVertices,
      task.expectedFaces
    );
    setIsValidating(false);
    setValidationResult(res);
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#0D111A] select-none overflow-y-auto">
      {/* Top Action Bar: Native Blender Launcher */}
      <div className="p-4 border-b border-[#1C2333] bg-[#111623] flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2 text-[12px]">
          <span
            className={`flex items-center gap-1.5 font-medium ${
              bridgeConnected ? 'text-emerald-400' : isWebMode ? 'text-gray-400' : 'text-amber-300'
            }`}
          >
            <Cable className="w-3.5 h-3.5" />
            {bridgeConnected
              ? 'Blender 5.3 Bridge Sẵn sàng'
              : isWebMode
              ? 'Chế độ Web / Di động'
              : 'Chưa phát hiện Blender cục bộ'}
          </span>
          {task.blendFileName && (
            <span className="text-[11px] font-mono text-gray-400 truncate max-w-[190px]">
              {task.blendFileName}
            </span>
          )}
        </div>

        <button
          onClick={onLaunchBlender}
          type="button"
          disabled={isWebMode}
          className="w-full py-2.5 px-4 rounded-xl bg-[#F97316] hover:bg-[#EA580C] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-[13px] flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>
            {isWebMode
              ? 'Chỉ mở trực tiếp Blender trên máy tính Local'
              : task.blendFileName
              ? `Mở file mẫu (${task.blendFileName}) trong Blender 5.3`
              : 'Mở Blender 5.3 (Scene mới) để dựng bài'}
          </span>
        </button>
      </div>

      {/* Checklist Section */}
      <div className="p-5 flex-1 flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h3 className="font-['Space_Grotesk'] text-[15px] font-bold text-white">
              Các bước thực hiện
            </h3>
            <span className="text-[12px] font-mono text-gray-400">
              {completedSteps}/{totalSteps} ({progressPercent}%)
            </span>
          </div>

          <div className="w-full h-1.5 rounded-full bg-[#161D2B] overflow-hidden">
            <div
              className="h-full bg-[#F97316] transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Clean Checklist Items (No heavy nested borders) */}
        <div className="flex flex-col divide-y divide-[#1C2333] rounded-xl bg-[#121723] border border-[#1E2638] overflow-hidden">
          {task.checklist.map((step) => (
            <div
              key={step.id}
              onClick={() => onToggleStep(step.id, step.isDone)}
              className={`p-3.5 transition-colors cursor-pointer flex items-start gap-3 ${
                step.isDone ? 'bg-[#0E131D] text-gray-500' : 'hover:bg-[#171E2E] text-gray-200'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {step.isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Circle className="w-4 h-4 text-gray-500" />
                )}
              </div>

              <div className="flex-1 flex flex-col gap-1.5 min-w-0">
                <p className={`text-[13px] leading-snug ${step.isDone ? 'line-through text-gray-500' : 'text-gray-100'}`}>
                  <span className="font-mono text-[11px] text-gray-500 mr-1.5">#{step.stepNumber}</span>
                  {step.title}
                </p>

                <div className="flex items-center gap-1.5 flex-wrap">
                  <KeycapBadge keys={step.hotkeyHint} variant="default" size="sm" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Live Mesh Topology Verification */}
        <div className="mt-auto p-4 rounded-xl bg-[#121723] border border-[#1E2638] flex flex-col gap-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[13px] font-semibold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Kiểm tra Lưới Blender
            </span>
            <button
              onClick={handleValidateMesh}
              disabled={isValidating}
              type="button"
              className="px-3.5 py-1.5 rounded-lg bg-[#1E2638] hover:bg-[#27324A] text-white text-[12px] font-semibold transition-colors disabled:opacity-50 cursor-pointer flex items-center gap-1.5"
            >
              {isValidating ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Đang kiểm tra...</span>
                </>
              ) : (
                <span>Chấm điểm Topology</span>
              )}
            </button>
          </div>

          {validationResult && (
            <div
              className={`p-3 rounded-lg border text-[12px] leading-relaxed flex flex-col gap-2 ${
                validationResult.passed
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
                  : 'bg-amber-500/10 border-amber-500/30 text-amber-200'
              }`}
            >
              <div className="flex items-center justify-between font-semibold gap-2">
                <div className="flex items-center gap-2">
                  {validationResult.passed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  )}
                  <span>{validationResult.message}</span>
                </div>
                <span className="font-mono text-[11px] shrink-0">{validationResult.score}/100</span>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-gray-300 pt-1 border-t border-white/10">
                <span>Verts: {validationResult.metrics.actualVertices}/{validationResult.metrics.expectedVertices}</span>
                <span>Quads: {validationResult.metrics.actualQuads}/{validationResult.metrics.expectedQuads}</span>
                <span>N-Gons: {validationResult.metrics.ngons}</span>
              </div>

              {validationResult.suggestions.length > 0 && (
                <ul className="list-disc pl-4 text-[11px] space-y-0.5 text-gray-300">
                  {validationResult.suggestions.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              )}

              {validationResult.passed && (
                <button
                  type="button"
                  onClick={onSubmitChallenge}
                  className="mt-1 w-full py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-[12px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Award className="w-4 h-4" />
                  <span>Nộp bài & Lưu thành tích</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
