import React, { useState, useEffect } from 'react';
import { HelpCircle, CheckCircle2, XCircle, ChevronRight, Award } from 'lucide-react';

export interface ConceptCheckItem {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface ConceptCheckDeckProps {
  lessonId: string;
  checks: ConceptCheckItem[];
  isAlreadyMastered?: boolean;
  onMastered?: (lessonId: string) => void;
}

export const ConceptCheckDeck: React.FC<ConceptCheckDeckProps> = ({
  lessonId,
  checks,
  isAlreadyMastered = false,
  onMastered,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedByCheck, setSelectedByCheck] = useState<Record<string, number>>({});

  useEffect(() => {
    setActiveIndex(0);
    setSelectedByCheck({});
  }, [lessonId]);

  if (!checks || checks.length === 0) return null;

  const currentCheck = checks[activeIndex] || checks[0];
  const chosenOption = selectedByCheck[currentCheck.id];
  const isAnswered = typeof chosenOption === 'number';
  const isCorrect = isAnswered && chosenOption === currentCheck.correctIndex;

  const solvedCount = checks.filter((c) => selectedByCheck[c.id] === c.correctIndex).length;
  const allCorrectNow = solvedCount === checks.length;

  const handleSelectOption = (optionIndex: number) => {
    const next = { ...selectedByCheck, [currentCheck.id]: optionIndex };
    setSelectedByCheck(next);
    const nextSolvedCount = checks.filter((c) => next[c.id] === c.correctIndex).length;
    if (nextSolvedCount === checks.length && onMastered) {
      onMastered(lessonId);
    }
  };

  return (
    <div className="my-6 rounded-2xl border border-[#242E44] bg-[#101624] p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3.5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#F97316]/15 border border-[#F97316]/30 flex items-center justify-center text-[#F97316]">
            <HelpCircle className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-[14px] font-bold text-white flex items-center gap-2">
              <span>Kiểm tra Hiểu Bản Chất (Concept Check)</span>
              {(isAlreadyMastered || allCorrectNow) && (
                <span className="inline-flex items-center gap-1 text-[10.5px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  <Award className="w-3 h-3" /> Đã nắm nguyên lý
                </span>
              )}
            </h3>
            <p className="text-[11px] text-gray-400">
              Dự đoán kết quả trước khi xem giải thích — câu {activeIndex + 1}/{checks.length}
            </p>
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex items-center gap-1.5">
          {checks.map((c, idx) => {
            const ans = selectedByCheck[c.id];
            const right = ans === c.correctIndex;
            const wrong = typeof ans === 'number' && !right;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  idx === activeIndex ? 'w-6' : 'w-2'
                } ${
                  right
                    ? 'bg-emerald-400'
                    : wrong
                    ? 'bg-rose-400'
                    : idx === activeIndex
                    ? 'bg-[#F97316]'
                    : 'bg-[#2A354D]'
                }`}
                title={`Câu ${idx + 1}`}
              />
            );
          })}
        </div>
      </div>

      {/* Question Prompt */}
      <p className="text-[13.5px] font-medium text-gray-100 leading-relaxed mb-3.5">
        {currentCheck.prompt}
      </p>

      {/* Options */}
      <div className="space-y-2">
        {currentCheck.options.map((opt, idx) => {
          const isPicked = chosenOption === idx;
          const isRightAnswer = idx === currentCheck.correctIndex;

          let cardClass =
            'bg-[#0B0F19] border-[#212A3E] text-gray-200 hover:border-[#3A4A6D] hover:bg-[#131A29]';
          if (isAnswered) {
            if (isRightAnswer) {
              cardClass = 'bg-emerald-500/15 border-emerald-500/50 text-emerald-100';
            } else if (isPicked) {
              cardClass = 'bg-rose-500/15 border-rose-500/50 text-rose-100';
            } else {
              cardClass = 'bg-[#0B0F19]/60 border-[#1A2132] text-gray-500';
            }
          }

          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectOption(idx)}
              className={`w-full text-left p-3 rounded-xl border text-[13px] transition-all flex items-start gap-2.5 cursor-pointer ${cardClass}`}
            >
              <span className="font-mono text-[11px] font-bold px-1.5 py-0.5 rounded bg-[#182032] text-gray-300 shrink-0 mt-0.5">
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="flex-1 leading-relaxed">{opt}</span>
              {isAnswered && isRightAnswer && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />}
              {isAnswered && isPicked && !isRightAnswer && <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />}
            </button>
          );
        })}
      </div>

      {/* Instant Principle Explanation */}
      {isAnswered && (
        <div
          className={`mt-3.5 p-3.5 rounded-xl border text-[12.5px] leading-relaxed ${
            isCorrect
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-100'
              : 'bg-amber-500/10 border-amber-500/30 text-amber-100'
          }`}
        >
          <div className="font-semibold mb-1">
            {isCorrect ? '✓ Chính xác! Bản chất vấn đề:' : '→ Gợi ý để nhớ bản chất:'}
          </div>
          <p className="text-gray-200">{currentCheck.explanation}</p>

          {activeIndex < checks.length - 1 && (
            <button
              type="button"
              onClick={() => setActiveIndex(activeIndex + 1)}
              className="mt-2.5 inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#1A2234] hover:bg-[#243049] text-white text-[12px] font-medium cursor-pointer"
            >
              <span>Câu tiếp theo</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
