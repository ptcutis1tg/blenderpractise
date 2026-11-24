import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Columns, 
  Maximize2, 
  Sparkles, 
  Clock, 
  ExternalLink,
  RotateCcw,
  Check
} from 'lucide-react';
import { PracticeTask, Roadmap } from '../types';
import { ModelInspector3D } from '../components/3d/ModelInspector3D';
import { PracticeRightPanel } from '../components/practice/PracticeRightPanel';

interface SplitPracticeViewProps {
  task: PracticeTask;
  roadmap: Roadmap;
  onBack: () => void;
  onToggleStep: (stepId: string, currentStatus: boolean) => void;
  onLaunchBlender: () => void;
  onSubmitChallenge?: () => void;
}

type SplitRatio = '50-50' | '65-35' | '35-65';

export const SplitPracticeView: React.FC<SplitPracticeViewProps> = ({
  task,
  roadmap,
  onBack,
  onToggleStep,
  onLaunchBlender,
  onSubmitChallenge,
}) => {
  const [splitRatio, setSplitRatio] = useState<SplitRatio>('50-50');

  // Compute pane width CSS classes
  const getLeftPaneWidth = () => {
    switch (splitRatio) {
      case '65-35':
        return 'w-[65%]';
      case '35-65':
        return 'w-[35%]';
      case '50-50':
      default:
        return 'w-1/2';
    }
  };

  const getRightPaneWidth = () => {
    switch (splitRatio) {
      case '65-35':
        return 'w-[35%]';
      case '35-65':
        return 'w-[65%]';
      case '50-50':
      default:
        return 'w-1/2';
    }
  };

  return (
    <div className="flex-1 h-full flex flex-col bg-[#0A0E17] select-none overflow-hidden">
      {/* Top Practice Sub-Header Bar */}
      <div className="h-11 px-4 bg-[#0F131D] border-b border-[#1F2637] flex items-center justify-between shrink-0 z-20">
        {/* Left: Back & Breadcrumb */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            type="button"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#141A28] border border-[#1F2637] text-gray-300 hover:text-white hover:bg-[#1E2538] text-[12px] font-medium transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Curriculum</span>
          </button>

          <div className="w-[1px] h-4 bg-[#1F2637]" />

          <div className="flex items-center gap-2">
            <span className="text-[12px] font-bold text-white tracking-wide">
              {task.title}
            </span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-orange-500/15 text-orange-400 border border-orange-500/30">
              50:50 Dual-View
            </span>
          </div>
        </div>

        {/* Center / Right: Layout Presets & Session Timer */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Split Ratio Presets (Desktop only) */}
          <div className="hidden sm:flex items-center gap-0.5 p-0.5 rounded-lg bg-[#141A28] border border-[#1F2637]">
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

          <div className="hidden sm:block w-[1px] h-4 bg-[#1F2637]" />

          {/* Practice Session Timer */}
          <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono text-gray-400 bg-[#141A28] px-2 sm:px-2.5 py-1 rounded-lg border border-[#1F2637]">
            <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-indigo-400" />
            <span>12:40</span>
          </div>
        </div>
      </div>

      {/* Main Dual-View Split Canvas Area: Vertical on Mobile (<md), Horizontal on Desktop (md+) */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden pb-14 md:pb-0">
        {/* Top/Left Pane: 3D Reference Inspector */}
        <div className={`w-full h-[42%] md:h-full md:${getLeftPaneWidth()} relative transition-all duration-200 border-b md:border-b-0 md:border-r border-[#1F2637] shrink-0`}>
          <ModelInspector3D
            challengeTitle={task.title}
            expectedVertices={task.expectedVertices || 148}
            expectedFaces={task.expectedFaces || 136}
            modifiers={task.modifiers || 'Mirror, Bevel'}
          />
        </div>

        {/* Bottom/Right Pane: Native Blender Integration & Task Checklist */}
        <div className={`w-full h-[58%] md:h-full md:${getRightPaneWidth()} relative transition-all duration-200 overflow-y-auto`}>
          <PracticeRightPanel
            task={task}
            onToggleStep={onToggleStep}
            onLaunchBlender={onLaunchBlender}
            onSubmitChallenge={onSubmitChallenge}
          />
        </div>
      </div>
    </div>
  );
};
