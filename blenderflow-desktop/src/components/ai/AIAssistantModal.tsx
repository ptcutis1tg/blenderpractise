import React, { useState } from 'react';
import { 
  Bot, 
  X, 
  Send
} from 'lucide-react';
import { AIService } from '../../services/aiService';

export const AIAssistantModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'assistant'; text: string }>>([
    {
      sender: 'assistant',
      text: `Chào bạn! Tôi là **Trợ lý Topology 3D**. 
Tôi có thể chẩn đoán lỗi lưới (Normals, N-gons, trùng đỉnh, Bevel méo) và gợi ý phím tắt Blender 5.3. Hãy chọn câu hỏi mẫu hoặc nhập vấn đề của bạn bên dưới.`,
    },
  ]);

  const quickPrompts = [
    'Sửa lỗi lật mặt (Flipped Normals)?',
    'Chuyển N-gons thành Quads thế nào?',
    'Tại sao vát cạnh Bevel bị méo?',
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
      {/* Compact Floating Icon Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        type="button"
        className="fixed bottom-16 right-4 md:bottom-5 md:right-5 z-40 w-11 h-11 rounded-xl bg-[#F97316] hover:bg-[#EA580C] active:scale-95 text-white shadow-lg shadow-orange-950/40 flex items-center justify-center transition-all cursor-pointer group"
        title="Trợ lý Topology 3D"
      >
        <Bot className="w-5 h-5" />
        <span className="hidden md:block pointer-events-none opacity-0 group-hover:opacity-100 absolute right-13 whitespace-nowrap px-2.5 py-1 rounded-lg bg-[#141A28] border border-[#273553] text-xs font-medium text-white shadow-lg transition-opacity">
          Trợ lý Topology 3D
        </span>
      </button>

      {/* Chat Dialog Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-2xl h-[85vh] sm:h-[600px] bg-[#111623] border border-[#253048] rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-[#1E2638] bg-[#141A28] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#F97316] flex items-center justify-center text-white">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-white">Trợ lý Topology 3D</h3>
                  <p className="text-[11px] text-gray-400">Chẩn đoán lỗi lưới & Phím tắt Blender 5.3</p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                type="button"
                className="p-1.5 rounded-lg bg-[#182030] border border-[#2B354D] text-gray-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Conversation Log */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 select-text">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[88%] p-3.5 rounded-2xl text-[13px] leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-[#F97316] text-white rounded-br-none'
                        : 'bg-[#171E2E] text-gray-200 border border-[#253048] rounded-bl-none'
                    }`}
                  >
                    <div className="whitespace-pre-line font-sans">{m.text}</div>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-[#171E2E] text-gray-400 text-[12px] max-w-[55%]">
                  <span className="w-3 h-3 border-2 border-[#F97316] border-t-transparent rounded-full animate-spin" />
                  <span>Đang phân tích lỗi lưới...</span>
                </div>
              )}
            </div>

            {/* Quick Prompts */}
            <div className="px-4 py-2 border-t border-[#1E2638] bg-[#0F1420] flex items-center gap-1.5 overflow-x-auto select-none">
              <span className="text-[10px] uppercase font-bold text-gray-500 whitespace-nowrap">Hỏi nhanh:</span>
              {quickPrompts.map((p, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSend(p)}
                  className="px-2.5 py-1 rounded-lg bg-[#171E2E] hover:bg-[#202B40] text-[11px] text-gray-300 hover:text-white whitespace-nowrap border border-[#253048] transition-colors cursor-pointer"
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-3 border-t border-[#1E2638] bg-[#141A28] flex items-center gap-2">
              <input
                type="text"
                placeholder="Mô tả lỗi lưới Blender 3D hoặc hỏi phím tắt..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend(query)}
                className="flex-1 px-4 py-2 rounded-xl bg-[#0B0F19] border border-[#1E2638] text-white text-[13px] focus:outline-none focus:border-[#F97316] placeholder-gray-500"
              />
              <button
                onClick={() => handleSend(query)}
                disabled={!query.trim() || loading}
                type="button"
                className="p-2.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white disabled:opacity-40 transition-colors cursor-pointer"
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
