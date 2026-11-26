import React from 'react';
import { KeycapBadge } from '../common/KeycapBadge';
import { 
  Lightbulb, 
  AlertTriangle, 
  Info, 
  Copy, 
  Check, 
  ExternalLink,
  ArrowRight
} from 'lucide-react';

interface MarkdownArticleViewerProps {
  content: string;
}

export const MarkdownArticleViewer: React.FC<MarkdownArticleViewerProps> = ({ content }) => {
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);

  const handleCopyCode = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Normalize simple inline LaTeX tokens ($X$, $\rightarrow$, $(0,0,0)$) cleanly into readable typography
  const sanitizeMathTokens = (raw: string): string => {
    return raw
      .replace(/\$\s*\\rightarrow\s*\$/g, '→')
      .replace(/\$\s*\\leftrightarrow\s*\$/g, '↔')
      .replace(/\\rightarrow/g, '→')
      .replace(/\\leftrightarrow/g, '↔')
      .replace(/\$([^$]+)\$/g, (_, inner: string) => inner.trim());
  };

  // Helper to parse inline styles (bold, code, links, keycaps)
  const renderInline = (text: string): React.ReactNode => {
    const cleanText = sanitizeMathTokens(text);
    const tokens = cleanText.split(/(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^\)]+\))/g);

    return tokens.map((token, i) => {
      if (!token) return null;

      // Inline backtick code / keycap
      if (token.startsWith('`') && token.endsWith('`')) {
        const inner = token.slice(1, -1);
        const isKeycap = inner.includes('+') || ['G', 'R', 'S', 'E', 'I', 'M', 'Z', 'K', 'J', 'F', 'A', 'X', 'H', 'Tab', 'Space', 'Shift', 'Ctrl', 'Alt', 'C'].includes(inner);
        if (isKeycap) {
          return <span key={i} className="inline-block mx-0.5"><KeycapBadge keys={inner} size="sm" /></span>;
        }
        return (
          <code key={i} className="px-1.5 py-0.5 rounded bg-[#1A2234] text-orange-300 font-mono text-[12px] border border-[#2A344A]">
            {inner}
          </code>
        );
      }

      // Bold text
      if (token.startsWith('**') && token.endsWith('**')) {
        return <strong key={i} className="text-white font-semibold">{token.slice(2, -2)}</strong>;
      }

      // Markdown Link [Text](URL)
      const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        return (
          <a
            key={i}
            href={linkMatch[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2 inline-flex items-center gap-1 font-medium"
          >
            {linkMatch[1]}
            <ExternalLink className="w-3 h-3 inline" />
          </a>
        );
      }

      return token;
    });
  };

  // Render Mermaid flowchart text cleanly as visual connected cards instead of raw code
  const renderMermaidFlow = (mermaidText: string, idx: number) => {
    const nodeLabels: string[] = [];
    const matches = [...mermaidText.matchAll(/[A-Za-z0-9_]+\["([^"]+)"\]/g)];
    for (const m of matches) {
      const cleanLabel = m[1].replace(/<br\s*\/?>/gi, ' — ');
      if (!nodeLabels.includes(cleanLabel)) {
        nodeLabels.push(cleanLabel);
      }
    }

    if (nodeLabels.length > 0) {
      return (
        <div key={`mermaid-${idx}`} className="my-4 p-4 rounded-xl border border-[#232D42] bg-[#0E1320]">
          <div className="text-[11px] font-mono uppercase tracking-wider text-indigo-300 mb-3">
            Sơ đồ Quy trình (Workflow Diagram)
          </div>
          <div className="flex flex-col md:flex-row md:flex-wrap items-stretch md:items-center gap-2">
            {nodeLabels.map((lbl, nIdx) => (
              <React.Fragment key={nIdx}>
                <div className="flex-1 min-w-[170px] p-3 rounded-xl bg-[#141B2D] border border-[#2A3652] text-[12px] text-gray-200 leading-snug">
                  <span className="inline-block text-[10px] font-mono font-bold text-[#F97316] mr-1.5">
                    0{nIdx + 1}
                  </span>
                  {lbl}
                </div>
                {nIdx < nodeLabels.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-gray-500 shrink-0 hidden md:block" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      );
    }

    return null;
  };

  // Process blocks
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeBlockContent: string[] = [];
  let codeBlockLang = '';
  let inTable = false;
  let tableRows: string[][] = [];
  let codeBlockCounter = 0;

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    // Code blocks toggle
    if (trimmed.startsWith('```')) {
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeBlockLang = trimmed.slice(3).trim();
        codeBlockContent = [];
      } else {
        inCodeBlock = false;
        const currentIdx = codeBlockCounter++;
        const fullCode = codeBlockContent.join('\n');
        if (codeBlockLang.toLowerCase() === 'mermaid') {
          const mermaidNode = renderMermaidFlow(fullCode, currentIdx);
          if (mermaidNode) {
            elements.push(mermaidNode);
            continue;
          }
        }
        elements.push(
          <div key={`code-${currentIdx}`} className="my-4 rounded-xl overflow-hidden border border-[#232D42] bg-[#0A0D15]">
            <div className="flex items-center justify-between px-4 py-2 bg-[#121622] border-b border-[#232D42] text-[11px] text-gray-400">
              <span className="font-mono uppercase tracking-wider">{codeBlockLang || 'CODE / WORKFLOW'}</span>
              <button
                type="button"
                onClick={() => handleCopyCode(fullCode, currentIdx)}
                className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#1B2232] hover:bg-[#252F46] text-gray-300 hover:text-white transition-all text-[11px]"
              >
                {copiedIndex === currentIdx ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 text-[12.5px] font-mono text-gray-300 overflow-x-auto leading-relaxed">
              <code>{fullCode}</code>
            </pre>
          </div>
        );
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockContent.push(rawLine);
      continue;
    }

    // Markdown Table handling
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      if (!inTable) {
        inTable = true;
        tableRows = [];
      }
      // Check if separator line
      if (trimmed.includes('---')) {
        continue;
      }
      const cells = trimmed
        .slice(1, -1)
        .split('|')
        .map((c) => c.trim());
      tableRows.push(cells);
      continue;
    } else if (inTable) {
      // Flush table
      inTable = false;
      if (tableRows.length > 0) {
        const headerRow = tableRows[0];
        const bodyRows = tableRows.slice(1);
        elements.push(
          <div key={`table-${i}`} className="my-4 overflow-x-auto rounded-xl border border-[#232D42]">
            <table className="w-full text-left text-[13px] border-collapse bg-[#0E121D]">
              <thead>
                <tr className="bg-[#141B2B] border-b border-[#232D42]">
                  {headerRow.map((h, hIdx) => (
                    <th key={hIdx} className="px-4 py-2.5 font-semibold text-white tracking-wide">
                      {renderInline(h)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1D2537]">
                {bodyRows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-[#151C2C]/50 transition-colors">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="px-4 py-2.5 text-gray-300 leading-normal">
                        {renderInline(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
    }

    // Empty lines
    if (!trimmed) {
      continue;
    }

    // Headings
    if (trimmed.startsWith('# ')) {
      elements.push(
        <h1 key={i} className="text-2xl font-bold font-['Space_Grotesk'] text-white mt-6 mb-3 pb-2 border-b border-[#232D42]">
          {renderInline(trimmed.replace(/^#\s+/, ''))}
        </h1>
      );
    } else if (trimmed.startsWith('## ')) {
      elements.push(
        <h2 key={i} className="text-xl font-bold text-white mt-5 mb-2.5 flex items-center gap-2">
          <span className="w-1.5 h-4 rounded-full bg-[#F97316]" />
          {renderInline(trimmed.replace(/^##\s+/, ''))}
        </h2>
      );
    } else if (trimmed.startsWith('### ')) {
      elements.push(
        <h3 key={i} className="text-[15px] font-semibold text-indigo-300 mt-4 mb-2">
          {renderInline(trimmed.replace(/^###\s+/, ''))}
        </h3>
      );
    } else if (trimmed.startsWith('> [!TIP]')) {
      const rest = trimmed.replace('> [!TIP]', '').trim();
      elements.push(
        <div key={i} className="my-3 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-[13px] text-emerald-200 leading-relaxed">
            <strong className="font-semibold block text-emerald-300 mb-0.5">Lời khuyên (Pro Tip):</strong>
            {renderInline(rest)}
          </div>
        </div>
      );
    } else if (trimmed.startsWith('> [!WARNING]') || trimmed.startsWith('> [!CAUTION]')) {
      const rest = trimmed.replace(/> \[(WARNING|CAUTION)\]/, '').trim();
      elements.push(
        <div key={i} className="my-3 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div className="text-[13px] text-rose-200 leading-relaxed">
            <strong className="font-semibold block text-rose-300 mb-0.5">Cảnh báo quan trọng:</strong>
            {renderInline(rest)}
          </div>
        </div>
      );
    } else if (trimmed.startsWith('> [!IMPORTANT]') || trimmed.startsWith('> [!NOTE]')) {
      const rest = trimmed.replace(/> \[(IMPORTANT|NOTE)\]/, '').trim();
      elements.push(
        <div key={i} className="my-3 p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-start gap-3">
          <Info className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
          <div className="text-[13px] text-indigo-200 leading-relaxed">
            <strong className="font-semibold block text-indigo-300 mb-0.5">Lưu ý then chốt:</strong>
            {renderInline(rest)}
          </div>
        </div>
      );
    } else if (trimmed.startsWith('> ')) {
      const rest = trimmed.slice(2).trim();
      const isWarningQuote = rest.includes('⚠️') || rest.toLowerCase().includes('lỗi') || rest.toLowerCase().includes('chú ý');
      elements.push(
        <div
          key={i}
          className={`my-3 p-3.5 rounded-xl border flex items-start gap-3 ${
            isWarningQuote
              ? 'bg-amber-500/10 border-amber-500/30 text-amber-100'
              : 'bg-indigo-500/10 border-indigo-500/30 text-indigo-100'
          }`}
        >
          {isWarningQuote ? (
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          ) : (
            <Lightbulb className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          )}
          <div className="text-[13px] leading-relaxed">{renderInline(rest)}</div>
        </div>
      );
    } else if (trimmed.startsWith('- [ ] ') || trimmed.startsWith('- [x] ')) {
      const isChecked = trimmed.startsWith('- [x] ');
      const checkText = trimmed.slice(6);
      elements.push(
        <div key={i} className="flex items-center gap-2.5 my-1.5 pl-2 text-[13px] text-gray-300">
          <div className={`w-4 h-4 rounded border flex items-center justify-center ${isChecked ? 'bg-indigo-600 border-indigo-500 text-white' : 'border-gray-500 bg-[#161D2B]'}`}>
            {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
          </div>
          <span className={isChecked ? 'line-through text-gray-500' : ''}>{renderInline(checkText)}</span>
        </div>
      );
    } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      elements.push(
        <li key={i} className="ml-5 list-disc text-[13px] text-gray-300 my-1 leading-relaxed">
          {renderInline(trimmed.replace(/^[-*]\s+/, ''))}
        </li>
      );
    } else if (/^\d+\.\s+/.test(trimmed)) {
      elements.push(
        <div key={i} className="flex items-start gap-2.5 ml-2 my-1.5 text-[13px] text-gray-300 leading-relaxed">
          <span className="font-mono text-indigo-400 font-semibold shrink-0">
            {trimmed.match(/^\d+\./)?.[0]}
          </span>
          <div>{renderInline(trimmed.replace(/^\d+\.\s+/, ''))}</div>
        </div>
      );
    } else if (trimmed.startsWith('---')) {
      elements.push(<hr key={i} className="my-4 border-[#1F2637]" />);
    } else {
      elements.push(
        <p key={i} className="text-[13px] text-gray-300 leading-relaxed my-2">
          {renderInline(rawLine)}
        </p>
      );
    }
  }

  // Flush any lingering table
  if (inTable && tableRows.length > 0) {
    const headerRow = tableRows[0];
    const bodyRows = tableRows.slice(1);
    elements.push(
      <div key="table-end" className="my-4 overflow-x-auto rounded-xl border border-[#232D42]">
        <table className="w-full text-left text-[13px] border-collapse bg-[#0E121D]">
          <thead>
            <tr className="bg-[#141B2B] border-b border-[#232D42]">
              {headerRow.map((h, hIdx) => (
                <th key={hIdx} className="px-4 py-2.5 font-semibold text-white tracking-wide">
                  {renderInline(h)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1D2537]">
            {bodyRows.map((row, rIdx) => (
              <tr key={rIdx} className="hover:bg-[#151C2C]/50 transition-colors">
                {row.map((cell, cIdx) => (
                  <td key={cIdx} className="px-4 py-2.5 text-gray-300 leading-normal">
                    {renderInline(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return <div className="space-y-1">{elements}</div>;
};
