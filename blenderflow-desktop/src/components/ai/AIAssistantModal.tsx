import React, { useState } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle,
  Lightbulb,
  Layers,
  ShieldAlert
} from 'lucide-react';
import { AIService } from '../../services/aiService';

export const AIAssistantModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'assistant'; text: string }>>([
    {
      sender: 'assistant',
      text: `👋 Chào bạn! Tôi là **BlenderFlow 3D Topology Doctor**. 
Tôi có thể chẩn đoán lỗi lưới (Normals, N-gons, dính đỉnh, Bevel méo) và hướng dẫn phím tắt Blender 5.3 chuẩn xác. Hãy chọn một câu hỏi mẫu hoặc nhập vấn đề của bạn bên dưới!`,
    },
  ]);

  const quickPrompts = [
    'Lật mặt lưới (Flipped Normals) sửa thế nào?',
    'Làm sao biến N-gons thành Quads?',
    'Tại sao vát cạnh Bevel bị méo dẹt?',
    'Khử trùng đỉnh (Double vertices) ở đâu?',
  ];

  const handleSend = async (userText: string) => {
    const textToSend = userText.trim();
    if (!textToSend || loading) return;

    setMessages((prev) => [...prev, { sender: 'user', text: textToSend }]);
    setQuery('');
    setLoading(true);

    const reply = await AIService.diagnoseIssue(textToSend);

    setMessages((prev) => [...prev, { sender: 'assistant', text: reply }]);
    setLoading(false);
  };

  return (
    <>
      {/* Floating Action Button at Bottom Right (Positioned above mobile bottom bar) */}
      <button
        onClick={() => setIsOpen(true)}
        type="button"
        className="fixed bottom-16 right-4 md:bottom-6 md:right-6 z-40 p-3 rounded-2xl bg-gradient-to-r from-[#F97316] to-[#EA580C] hover:from-[#FB923C] hover:to-[#F97316] active:scale-95 text-white shadow-2xl shadow-orange-500/35 border border-orange-400/40 flex items-center gap-2 transition-all cursor-pointer group"
        title="Open 3D Topology Doctor"
      >
        <Bot className="w-5 h-5 group-hover:rotate-12 transition-transform" />
        <span className="hidden sm:inline text-[12px] font-bold pr-1">3D Topology Doctor</span>
      </button>

      {/* Chat Dialog Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
          <div className="w-full max-w-2xl h-[85vh] sm:h-[620px] bg-[#121622] border border-[#263045] rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-[#1F2637] bg-[#141A28] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#F97316] flex items-center justify-center text-white shadow-md shadow-orange-500/25">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-white flex items-center gap-2">
                    BlenderFlow 3D Topology Doctor
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      100% Offline Ready
                    </span>
                  </h3>
                  <p className="text-[11px] text-gray-400">Blender 5.3 Hard-Surface & Quad Troubleshooting</p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                type="button"
                className="p-1.5 rounded-lg bg-[#182030] border border-[#2B354D] text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Conversation Log */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3.5 select-text">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[88%] p-3.5 rounded-2xl text-[13px] leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-[#4F46E5] text-white rounded-br-none shadow-md shadow-indigo-600/20'
                        : 'bg-[#182030] text-gray-200 border border-[#283348] rounded-bl-none shadow-inner'
                    }`}
                  >
                    <div className="whitespace-pre-line font-sans">
                      {m.text}
                    </div>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-[#182030] text-gray-400 text-[12px] max-w-[50%]">
                  <span className="w-3 h-3 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
                  <span>Analyzing topology issue...</span>
                </div>
              )}
            </div>

            {/* Quick Prompts Carousel */}
            <div className="px-4 py-2 border-t border-[#1F2637] bg-[#10141F] flex items-center gap-1.5 overflow-x-auto select-none">
              <span className="text-[10px] uppercase font-bold text-gray-500 whitespace-nowrap">
                Quick Ask:
              </span>
              {quickPrompts.map((p, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSend(p)}
                  className="px-2.5 py-1 rounded-lg bg-[#182030] hover:bg-[#202B40] text-[11px] text-gray-300 hover:text-white whitespace-nowrap border border-[#283348] transition-colors cursor-pointer"
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-3 border-t border-[#1F2637] bg-[#141A28] flex items-center gap-2">
              <input
                type="text"
                placeholder="Describe your Blender 3D topology error or ask for shortcuts..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend(query)}
                className="flex-1 px-4 py-2 rounded-xl bg-[#0B0F19] border border-[#1F2637] text-white text-[13px] focus:outline-none focus:border-indigo-500 placeholder-gray-500"
              />
              <button
                onClick={() => handleSend(query)}
                disabled={!query.trim() || loading}
                type="button"
                className="p-2.5 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white disabled:opacity-40 transition-all cursor-pointer shadow-md shadow-indigo-600/25"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
