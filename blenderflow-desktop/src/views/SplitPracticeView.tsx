import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Clock,
  Pause,
  Play
} from 'lucide-react';
import { PracticeTask, Roadmap } from '../types';
import { ModelInspector3D } from '../components/3d/ModelInspector3D';
import { PracticeRightPanel } from '../components/practice/PracticeRightPanel';
import { BlenderBridgeService } from '../services/blenderBridge';

interface SplitPracticeViewProps {
  task: PracticeTask;
  roadmap: Roadmap;
  bridgeConnected?: boolean;
  isWebMode?: boolean;
  onBack: () => void;
  onToggleStep: (stepId: string, currentStatus: boolean) => void;
  onLaunchBlender: (blendFileName?: string) => void;
  onSubmitChallenge?: () => void;
}

type SplitRatio = '50-50' | '65-35' | '35-65';

export const SplitPracticeView: React.FC<SplitPracticeViewProps> = ({
  task,
  roadmap,
  bridgeConnected = false,
  isWebMode = false,
  onBack,
  onToggleStep,
  onLaunchBlender,
  onSubmitChallenge,
}) => {
  const [splitRatio, setSplitRatio] = useState<SplitRatio>('50-50');
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [timerRunning, setTimerRunning] = useState<boolean>(true);

  useEffect(() => {
    setElapsedSeconds(0);
    setTimerRunning(true);
    BlenderBridgeService.setActiveTarget({
      taskId: task.id,
      title: task.title,
      expectedVertices: task.expectedVertices,
      expectedFaces: task.expectedFaces,
    });
  }, [task.id]);

  useEffect(() => {
    if (!timerRunning) return;
    const interval = window.setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => window.clearInterval(interval);
  }, [timerRunning]);

  const formatDuration = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Full static Tailwind classes so JIT compiler includes them in CSS bundle
  const getLeftPaneWidth = () => {
    switch (splitRatio) {
      case '65-35':
        return 'md:w-[65%]';
      case '35-65':
        return 'md:w-[35%]';
      case '50-50':
      default:
        return 'md:w-1/2';
    }
  };

  const getRightPaneWidth = () => {
    switch (splitRatio) {
      case '65-35':
        return 'md:w-[35%]';
      case '35-65':
        return 'md:w-[65%]';
      case '50-50':
      default:
        return 'md:w-1/2';
    }
  };

  return (
    <div className="flex-1 h-full flex flex-col bg-[#0A0E17] select-none overflow-hidden">
      {/* Top Practice Sub-Header Bar */}
      <div className="h-11 px-3 sm:px-4 bg-[#0F131D] border-b border-[#1F2637] flex items-center justify-between shrink-0 z-20 gap-2">
        {/* Left: Back & Breadcrumb */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button
            onClick={onBack}
            type="button"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#141A28] border border-[#1F2637] text-gray-300 hover:text-white hover:bg-[#1E2538] text-[12px] font-medium transition-all cursor-pointer shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Quay lại</span>
          </button>

          <div className="w-[1px] h-4 bg-[#1F2637] shrink-0" />

          <div className="flex items-center gap-2 min-w-0">
            <span className="text-[12px] font-bold text-white tracking-wide truncate">
              {task.title}
            </span>
            <span className="hidden md:inline-block text-[10px] font-semibold px-2 py-0.5 rounded bg-orange-500/15 text-orange-400 border border-orange-500/30 shrink-0">
              {roadmap.category} • Dual-View
            </span>
          </div>
        </div>

        {/* Center / Right: Layout Presets & Real Session Timer */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Split Ratio Presets (Desktop only) */}
          <div className="hidden md:flex items-center gap-0.5 p-0.5 rounded-lg bg-[#141A28] border border-[#1F2637]">
            <button
              onClick={() => setSplitRatio('50-50')}
              type="button"
              className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all cursor-pointer ${
                splitRatio === '50-50' ? 'bg-[#4F46E5] text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              50 : 50
            </button>
            <button
              onClick={() => setSplitRatio('65-35')}
              type="button"
              className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all cursor-pointer ${
                splitRatio === '65-35' ? 'bg-[#4F46E5] text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              65 : 35
            </button>
            <button
              onClick={() => setSplitRatio('35-65')}
              type="button"
              className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all cursor-pointer ${
                splitRatio === '35-65' ? 'bg-[#4F46E5] text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              35 : 65
            </button>
          </div>

          <div className="hidden md:block w-[1px] h-4 bg-[#1F2637]" />

          {/* Live Practice Session Timer */}
          <button
            type="button"
            onClick={() => setTimerRunning((prev) => !prev)}
            title={timerRunning ? 'Tạm dừng đồng hồ' : 'Tiếp tục đồng hồ'}
            className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono text-gray-300 bg-[#141A28] hover:bg-[#1B2234] px-2 sm:px-2.5 py-1 rounded-lg border border-[#1F2637] cursor-pointer transition-colors"
          >
            <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-indigo-400" />
            <span>{formatDuration(elapsedSeconds)}</span>
            {timerRunning ? (
              <Pause className="w-2.5 h-2.5 text-gray-400" />
            ) : (
              <Play className="w-2.5 h-2.5 text-emerald-400" />
            )}
          </button>
        </div>
      </div>

      {/* Main Dual-View Split Canvas Area: Vertical on Mobile (<md), Horizontal on Desktop (md+) */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden pb-14 md:pb-0">
        {/* Top/Left Pane: 3D Reference Inspector */}
        <div className={`w-full h-[42%] md:h-full ${getLeftPaneWidth()} relative transition-all duration-200 border-b md:border-b-0 md:border-r border-[#1F2637] shrink-0`}>
          <ModelInspector3D
            taskId={task.id}
            challengeTitle={task.title}
            expectedVertices={task.expectedVertices}
            expectedFaces={task.expectedFaces}
            modifiers={task.modifiers || 'None'}
          />
        </div>

        {/* Bottom/Right Pane: Native Blender Integration & Task Checklist */}
        <div className={`w-full h-[58%] md:h-full ${getRightPaneWidth()} relative transition-all duration-200 overflow-y-auto`}>
          <PracticeRightPanel
            task={task}
            bridgeConnected={bridgeConnected}
            isWebMode={isWebMode}
            onToggleStep={onToggleStep}
            onLaunchBlender={() => onLaunchBlender(task.blendFileName)}
            onSubmitChallenge={onSubmitChallenge}
          />
        </div>
      </div>
    </div>
  );
};
