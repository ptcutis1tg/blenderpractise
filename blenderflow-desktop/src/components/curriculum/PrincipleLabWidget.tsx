import React, { useState, useEffect } from 'react';
import { Sliders, RotateCcw, Sparkles, AlertTriangle, CheckCircle2, Play, Pause } from 'lucide-react';

export type InteractiveLabId =
  | 'transform-scale'
  | 'quad-subdiv'
  | 'bevel-normals'
  | 'uv-net'
  | 'pbr-physics'
  | 'studio-lighting-fov'
  | 'animation-curves-ik'
  | 'geonodes-scatter';

interface PrincipleLabWidgetProps {
  labId: InteractiveLabId;
}

const LAB_HEADERS: Record<InteractiveLabId, { badge: string; title: string; subtitle: string }> = {
  'transform-scale': {
    badge: 'Thí nghiệm Nguyên lý • Transform & Pivot',
    title: 'Vì sao quên Apply Scale (Ctrl + A) làm méo Bevel?',
    subtitle: 'Kéo thanh tỷ lệ Scale hoặc bấm Apply Scale để quan sát hình dạng góc vát thực tế.',
  },
  'quad-subdiv': {
    badge: 'Thí nghiệm Nguyên lý • Topology',
    title: 'Quads vs N-gons dưới Subdivision Surface',
    subtitle: 'Bật Subdivision & chuyển đổi loại mặt lưới để thấy hiệu ứng nhăn góc (Pinching) và tác dụng của Inset Holding Loop.',
  },
  'bevel-normals': {
    badge: 'Thí nghiệm Nguyên lý • Shading & Normals',
    title: 'Khử lỗi loang bóng bằng Weighted Normals & Smooth Angle',
    subtitle: 'Điều chỉnh góc làm mịn và bật Weighted Normals để nắn lại hướng vector pháp tuyến.',
  },
  'uv-net': {
    badge: 'Thí nghiệm Nguyên lý • UV Unwrapping',
    title: 'Bản chất Cắt Seam & Chống Kéo Dãn Lưới UV 2D',
    subtitle: 'Kéo thanh bung khối 3D thành lưới 2D và so sánh bản đồ giãn (UV Stretch) khi đủ Seam vs thiếu Seam.',
  },
  'pbr-physics': {
    badge: 'Thí nghiệm Nguyên lý • Vật lý PBR',
    title: 'Khám phá Principled BSDF: Metallic, Roughness & IOR',
    subtitle: 'Thử kéo Metallic về 0 (phi kim), 1 (kim loại) hoặc 0.5 để hiểu bản chất phản xạ năng lượng.',
  },
  'studio-lighting-fov': {
    badge: 'Thí nghiệm Nguyên lý • Lighting & Camera',
    title: 'Thiết lập 3 Nguồn Sáng (Key / Fill / Rim) & Tiêu cự Camera',
    subtitle: 'Tinh chỉnh cường độ đèn, nhiệt độ Kelvin và đổi tiêu cự 24mm ↔ 85mm để thấy phối cảnh thay đổi.',
  },
  'animation-curves-ik': {
    badge: 'Thí nghiệm Nguyên lý • F-Curve & Rigging',
    title: 'Đường cong Gia tốc (Graph Editor) & Cơ chế FK vs IK',
    subtitle: 'So sánh chuyển động Linear với Bezier Ease In-Out và thử kéo khớp chân theo cơ chế IK.',
  },
  'geonodes-scatter': {
    badge: 'Thí nghiệm Nguyên lý • Geometry Nodes',
    title: 'Luồng Dữ liệu Thủ tục: Distribute → Instance on Points',
    subtitle: 'Thay đổi mật độ điểm, Random Seed và bộ lọc độ dốc để xem các hạt tự động phân bổ theo Field.',
  },
};

const TransformScaleLab: React.FC = () => {
  const [scaleX, setScaleX] = useState(2.1);
  const [scaleY, setScaleY] = useState(0.65);
  const [applied, setApplied] = useState(false);
  const [pivotMode, setPivotMode] = useState<'origin' | 'cursor'>('origin');
  const [rotation, setRotation] = useState(0);

  const effX = applied ? 1 : scaleX;
  const effY = applied ? 1 : scaleY;
  const bevelRx = Math.round(14 * effX);
  const bevelRy = Math.round(14 * effY);
  const pivotX = pivotMode === 'origin' ? 150 : 215;
  const pivotY = pivotMode === 'origin' ? 88 : 122;

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
      <div className="md:col-span-7 bg-[#090D16] border border-[#1E273B] rounded-xl p-3 flex flex-col items-center">
        <svg viewBox="0 0 300 176" className="w-full max-w-[320px] h-44">
          <defs>
            <pattern id="grid-tr" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#182135" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="300" height="176" fill="url(#grid-tr)" rx="8" />
          <line x1="20" y1="88" x2="280" y2="88" stroke="#ef4444" strokeOpacity="0.35" strokeWidth="1" />
          <line x1="150" y1="12" x2="150" y2="164" stroke="#22c55e" strokeOpacity="0.35" strokeWidth="1" />

          <g transform={`rotate(${rotation} ${pivotX} ${pivotY})`}>
            <rect
              x="75"
              y="46"
              width="150"
              height="84"
              rx={bevelRx}
              ry={bevelRy}
              fill="rgba(249,115,22,0.14)"
              stroke={applied ? '#34d399' : '#f97316'}
              strokeWidth="2.5"
            />
            <text x="150" y="92" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontFamily="monospace">
              {applied ? 'Bevel đều 45° (rx=ry)' : `Bevel dẹt (${bevelRx}×${bevelRy})`}
            </text>
          </g>

          {/* Object Origin (orange dot) */}
          <circle cx="150" cy="88" r="4.5" fill="#f97316" stroke="#fff" strokeWidth="1.5" />
          {/* 3D Cursor crosshair */}
          <g transform="translate(215,122)">
            <circle cx="0" cy="0" r="7" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
            <line x1="-10" y1="0" x2="10" y2="0" stroke="#e2e8f0" strokeWidth="1" />
            <line x1="0" y1="-10" x2="0" y2="10" stroke="#e2e8f0" strokeWidth="1" />
          </g>
        </svg>
        <div className="flex items-center justify-between w-full text-[11px] text-gray-400 px-2 mt-1">
          <span>Scale hiện tại: <code className="text-orange-300 font-mono">({effX.toFixed(2)}, {effY.toFixed(2)}, 1.00)</code></span>
          <span className={applied ? 'text-emerald-400 font-semibold' : 'text-amber-400 font-semibold'}>
            {applied ? '✓ Đạt chuẩn Ctrl+A' : '⚠ Lệch tỷ lệ'}
          </span>
        </div>
      </div>

      <div className="md:col-span-5 space-y-3 text-[12px]">
        <div>
          <div className="flex justify-between text-gray-300 mb-1">
            <span>Object Scale X</span>
            <span className="font-mono text-orange-300">{scaleX.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="2.5"
            step="0.05"
            value={scaleX}
            onChange={(e) => {
              setApplied(false);
              setScaleX(parseFloat(e.target.value));
            }}
            className="w-full accent-[#F97316]"
          />
        </div>

        <div>
          <div className="flex justify-between text-gray-300 mb-1">
            <span>Object Scale Y</span>
            <span className="font-mono text-orange-300">{scaleY.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="2.2"
            step="0.05"
            value={scaleY}
            onChange={(e) => {
              setApplied(false);
              setScaleY(parseFloat(e.target.value));
            }}
            className="w-full accent-[#F97316]"
          />
        </div>

        <div>
          <div className="flex justify-between text-gray-300 mb-1">
            <span>Góc xoay R ({rotation}°) quanh {pivotMode === 'origin' ? 'Origin' : '3D Cursor'}</span>
          </div>
          <input
            type="range"
            min="-45"
            max="45"
            step="5"
            value={rotation}
            onChange={(e) => setRotation(Number(e.target.value))}
            className="w-full accent-indigo-500"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setPivotMode(pivotMode === 'origin' ? 'cursor' : 'origin')}
            className="flex-1 py-1.5 px-2.5 rounded-lg bg-[#161D2C] hover:bg-[#1E273B] border border-[#27324A] text-gray-200 text-[11px] font-medium cursor-pointer"
          >
            Tâm: {pivotMode === 'origin' ? 'Origin' : '3D Cursor'}
          </button>
          <button
            type="button"
            onClick={() => setApplied(!applied)}
            className={`flex-1 py-1.5 px-2.5 rounded-lg font-semibold text-[11px] cursor-pointer transition-colors ${
              applied
                ? 'bg-emerald-600 text-white'
                : 'bg-[#F97316] hover:bg-[#EA580C] text-white'
            }`}
          >
            {applied ? '✓ Đã Ctrl + A' : 'Bấm Ctrl + A'}
          </button>
        </div>
      </div>
    </div>
  );
};

const QuadSubdivLab: React.FC = () => {
  const [topoMode, setTopoMode] = useState<'ngon' | 'tri' | 'quad_hold'>('ngon');
  const [subdivOn, setSubdivOn] = useState(true);

  const infoMap = {
    ngon: {
      label: 'N-gon (>4 đỉnh)',
      status: 'Lỗi nhăn góc (Pinching) khi Subdivide vì thuật toán không biết cắt Loop qua đâu.',
      color: '#ef4444',
    },
    tri: {
      label: 'Tam giác (Triangles)',
      status: 'Loop Cut (Ctrl+R) bị ngắt giữa chừng; tụ đỉnh nhọn tạo gợn sóng ánh sáng.',
      color: '#f59e0b',
    },
    quad_hold: {
      label: 'Quads + Inset Holding Loop',
      status: 'Chuẩn công nghiệp! Vòng cạnh bảo vệ giữ góc vuông êm mượt và phản chiếu đều.',
      color: '#10b981',
    },
  }[topoMode];

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
      <div className="md:col-span-7 bg-[#090D16] border border-[#1E273B] rounded-xl p-3 flex flex-col items-center">
        <svg viewBox="0 0 300 170" className="w-full max-w-[320px] h-44">
          <rect x="45" y="22" width="210" height="126" rx={subdivOn ? (topoMode === 'quad_hold' ? 12 : 42) : 2} fill="#111827" stroke={infoMap.color} strokeWidth="2.5" />

          {topoMode === 'ngon' && (
            <g stroke="#64748b" strokeWidth="1.3">
              <polygon points="95,55 170,40 225,85 200,130 110,125 75,88" fill="rgba(239,68,68,0.14)" stroke="#ef4444" />
              {subdivOn && (
                <>
                  <circle cx="170" cy="40" r="8" fill="rgba(239,68,68,0.45)" stroke="none" />
                  <circle cx="225" cy="85" r="8" fill="rgba(239,68,68,0.45)" stroke="none" />
                  <text x="150" y="90" textAnchor="middle" fill="#fca5a5" fontSize="11">6 đỉnh → Nhăn bề mặt!</text>
                </>
              )}
            </g>
          )}

          {topoMode === 'tri' && (
            <g stroke="#f59e0b" strokeWidth="1.3">
              <line x1="45" y1="22" x2="255" y2="148" />
              <line x1="255" y1="22" x2="45" y2="148" />
              <line x1="150" y1="22" x2="150" y2="148" strokeDasharray="4 3" />
              <circle cx="150" cy="85" r="6" fill="rgba(245,158,11,0.5)" stroke="none" />
              <text x="150" y="138" textAnchor="middle" fill="#fcd34d" fontSize="10.5">Pole trung tâm ngắt Loop Cut</text>
            </g>
          )}

          {topoMode === 'quad_hold' && (
            <g stroke="#34d399" strokeWidth="1.4" fill="none">
              <rect x="64" y="38" width="172" height="94" rx={subdivOn ? 10 : 0} strokeDasharray={subdivOn ? 'none' : '4 3'} />
              <rect x="86" y="54" width="128" height="62" rx={subdivOn ? 6 : 0} fill="rgba(16,185,129,0.1)" />
              <line x1="45" y1="22" x2="86" y2="54" />
              <line x1="255" y1="22" x2="214" y2="54" />
              <line x1="45" y1="148" x2="86" y2="116" />
              <line x1="255" y1="148" x2="214" y2="116" />
              <text x="150" y="90" textAnchor="middle" fill="#6ee7b7" fontSize="11">100% Quads + Holding Loop</text>
            </g>
          )}
        </svg>
      </div>

      <div className="md:col-span-5 space-y-2.5 text-[12px]">
        <div className="flex flex-col gap-1.5">
          {(['ngon', 'tri', 'quad_hold'] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setTopoMode(mode)}
              className={`text-left px-3 py-2 rounded-lg border text-[12px] font-medium cursor-pointer transition-colors ${
                topoMode === mode
                  ? 'bg-[#1D263A] border-[#F97316] text-white'
                  : 'bg-[#111623] border-[#222B3F] text-gray-400 hover:text-white'
              }`}
            >
              {mode === 'ngon' && '1. Dùng N-gon (6 đỉnh)'}
              {mode === 'tri' && '2. Dùng Tam giác chéo (Tris)'}
              {mode === 'quad_hold' && '3. Dùng Quads + Inset (Phím I)'}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setSubdivOn(!subdivOn)}
          className={`w-full py-2 rounded-lg font-semibold text-[12px] cursor-pointer ${
            subdivOn ? 'bg-indigo-600 text-white' : 'bg-[#161D2C] border border-[#27324A] text-gray-300'
          }`}
        >
          Subdivision Surface: {subdivOn ? 'BẬT (Level 2)' : 'TẮT (Base Cage)'}
        </button>

        <p className="text-[11.5px] leading-relaxed p-2.5 rounded-lg bg-[#0D121E] border border-[#1E273B]" style={{ color: infoMap.color }}>
          {infoMap.status}
        </p>
      </div>
    </div>
  );
};

const BevelNormalsLab: React.FC = () => {
  const [smoothAngle, setSmoothAngle] = useState(30);
  const [weightedNormals, setWeightedNormals] = useState(false);

  const flatSurfaceClean = weightedNormals || smoothAngle <= 35;

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
      <div className="md:col-span-7 bg-[#090D16] border border-[#1E273B] rounded-xl p-3 flex flex-col items-center">
        <svg viewBox="0 0 300 170" className="w-full max-w-[320px] h-44">
          <defs>
            <linearGradient id="artifactGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="50%" stopColor="#64748b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
          </defs>
          {/* Cross section surface */}
          <path
            d="M 40 120 L 40 65 L 70 42 L 230 42 L 260 65 L 260 120 Z"
            fill={flatSurfaceClean ? '#334155' : 'url(#artifactGrad)'}
            stroke="#94a3b8"
            strokeWidth="2"
          />
          {/* Top face normals */}
          {[95, 150, 205].map((x) => (
            <g key={x}>
              <line
                x1={x}
                y1="42"
                x2={weightedNormals ? x : x + (x === 150 ? 0 : x < 150 ? -16 : 16)}
                y2="14"
                stroke={flatSurfaceClean ? '#34d399' : '#f87171'}
                strokeWidth="2"
              />
              <circle cx={x} cy="42" r="3" fill="#fff" />
            </g>
          ))}
          <text x="150" y="92" textAnchor="middle" fill="#e2e8f0" fontSize="11.5" fontWeight="600">
            {flatSurfaceClean ? '✓ Pháp tuyến thẳng đứng → Phản chiếu phẳng' : '⚠ Pháp tuyến bị kéo nghiêng → Loang bóng đen'}
          </text>
        </svg>
      </div>

      <div className="md:col-span-5 space-y-3 text-[12px]">
        <div>
          <div className="flex justify-between text-gray-300 mb-1">
            <span>Auto Smooth Angle</span>
            <span className="font-mono text-indigo-300">{smoothAngle}°</span>
          </div>
          <input
            type="range"
            min="15"
            max="75"
            step="5"
            value={smoothAngle}
            onChange={(e) => setSmoothAngle(Number(e.target.value))}
            className="w-full accent-indigo-500"
          />
        </div>

        <button
          type="button"
          onClick={() => setWeightedNormals(!weightedNormals)}
          className={`w-full py-2 px-3 rounded-lg font-semibold text-[12px] cursor-pointer transition-colors ${
            weightedNormals
              ? 'bg-emerald-600 text-white'
              : 'bg-[#161D2C] border border-[#27324A] text-gray-300 hover:text-white'
          }`}
        >
          Weighted Normal Modifier: {weightedNormals ? 'BẬT (Keep Sharp)' : 'TẮT'}
        </button>

        <p className="text-[11.5px] text-gray-400 leading-relaxed">
          Khi thêm <strong className="text-white">Bevel Modifier</strong> sau Boolean, các mặt lớn cần hướng pháp tuyến (Normals) ưu tiên vuông góc thay vì bị kéo xiên sang góc vát nhỏ.
        </p>
      </div>
    </div>
  );
};

const UvNetLab: React.FC = () => {
  const [unfold, setUnfold] = useState(100);
  const [goodSeams, setGoodSeams] = useState(true);
  const t = unfold / 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
      <div className="md:col-span-7 bg-[#090D16] border border-[#1E273B] rounded-xl p-3 flex flex-col items-center">
        <svg viewBox="0 0 300 176" className="w-full max-w-[320px] h-44">
          {/* UV Grid Tile */}
          <rect x="20" y="10" width="260" height="156" fill="#0B111E" stroke="#1E293B" strokeDasharray="3 3" rx="6" />
          {/* Center Front face */}
          <rect x="128" y="66" width="44" height="44" fill={goodSeams ? 'rgba(59,130,246,0.22)' : 'rgba(239,68,68,0.28)'} stroke={goodSeams ? '#60a5fa' : '#f87171'} strokeWidth="2" />
          {/* Top */}
          <rect
            x="128"
            y={66 - 44 * t}
            width={goodSeams ? 44 : 44 - 16 * t}
            height="44"
            fill={goodSeams ? 'rgba(59,130,246,0.18)' : 'rgba(239,68,68,0.28)'}
            stroke={goodSeams ? '#60a5fa' : '#f87171'}
            strokeWidth="1.8"
          />
          {/* Bottom */}
          <rect x="128" y={66 + 44 * t} width="44" height="44" fill="rgba(59,130,246,0.18)" stroke="#60a5fa" strokeWidth="1.8" />
          {/* Left */}
          <rect x={128 - 44 * t} y="66" width="44" height="44" fill="rgba(59,130,246,0.18)" stroke="#60a5fa" strokeWidth="1.8" />
          {/* Right */}
          <rect
            x={128 + 44 * t}
            y="66"
            width={goodSeams ? 44 : 74 * t + 44 * (1 - t)}
            height={goodSeams ? 44 : 28}
            fill={goodSeams ? 'rgba(59,130,246,0.18)' : 'rgba(239,68,68,0.34)'}
            stroke={goodSeams ? '#60a5fa' : '#ef4444'}
            strokeWidth="1.8"
          />
          {/* Mark Seam red edge lines */}
          {goodSeams && (
            <line x1="128" y1="66" x2="172" y2="66" stroke="#ef4444" strokeWidth="2.5" />
          )}
          <text x="150" y="92" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontFamily="monospace">
            {t < 0.2 ? '3D Box' : goodSeams ? 'Đảo UV vuông vức' : 'Bị kéo giãn (Stretch!)'}
          </text>
        </svg>
      </div>

      <div className="md:col-span-5 space-y-3 text-[12px]">
        <div>
          <div className="flex justify-between text-gray-300 mb-1">
            <span>Trải khối 3D → Phẳng 2D</span>
            <span className="font-mono text-indigo-300">{unfold}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={unfold}
            onChange={(e) => setUnfold(Number(e.target.value))}
            className="w-full accent-indigo-500"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setGoodSeams(true)}
            className={`flex-1 py-2 px-2.5 rounded-lg font-semibold text-[11px] cursor-pointer ${
              goodSeams ? 'bg-emerald-600 text-white' : 'bg-[#161D2C] text-gray-300 border border-[#27324A]'
            }`}
          >
            ✓ Đủ Mark Seam
          </button>
          <button
            type="button"
            onClick={() => setGoodSeams(false)}
            className={`flex-1 py-2 px-2.5 rounded-lg font-semibold text-[11px] cursor-pointer ${
              !goodSeams ? 'bg-rose-600 text-white' : 'bg-[#161D2C] text-gray-300 border border-[#27324A]'
            }`}
          >
            ✗ Thiếu Seam
          </button>
        </div>

        <p className="text-[11.5px] text-gray-400 leading-relaxed">
          Đường <strong className="text-rose-400">Mark Seam (Ctrl+E)</strong> giống đường rạch dao rọc giấy. Thiếu seam khiến mặt texture bị kéo méo khi ép lên 2D.
        </p>
      </div>
    </div>
  );
};

const PbrPhysicsLab: React.FC = () => {
  const [metallic, setMetallic] = useState(0);
  const [roughness, setRoughness] = useState(0.25);
  const [ior, setIor] = useState(1.5);

  const highlightSize = 10 + roughness * 42;
  const highlightOpacity = Math.max(0.12, 1 - roughness * 0.85);
  const fresnelAlpha = Math.min(0.85, (ior - 1) * 0.45);
  const isHybridWarning = metallic > 0.05 && metallic < 0.95;

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
      <div className="md:col-span-6 bg-[#090D16] border border-[#1E273B] rounded-xl p-4 flex flex-col items-center justify-center">
        <svg viewBox="0 0 200 165" className="w-48 h-40">
          <defs>
            <radialGradient id="sphere-base" cx="35%" cy="32%" r="70%">
              <stop offset="0%" stopColor={metallic > 0.5 ? '#fde68a' : '#fb923c'} />
              <stop offset="55%" stopColor={metallic > 0.5 ? '#b45309' : '#9a3412'} />
              <stop offset="100%" stopColor="#0f172a" />
            </radialGradient>
            <radialGradient id="spec-hl" cx="34%" cy="30%" r={`${highlightSize}%`}>
              <stop offset="0%" stopColor="#ffffff" stopOpacity={highlightOpacity} />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="100" cy="146" rx="54" ry="10" fill="rgba(0,0,0,0.65)" />
          <circle cx="100" cy="78" r="58" fill="url(#sphere-base)" />
          <circle cx="100" cy="78" r="58" fill="url(#spec-hl)" />
          <circle
            cx="100"
            cy="78"
            r="56.5"
            fill="none"
            stroke="#e0f2fe"
            strokeOpacity={fresnelAlpha}
            strokeWidth="3"
          />
        </svg>
        <div className="text-[11px] font-mono text-gray-300 mt-1">
          {metallic === 1 ? 'Kim loại dẫn điện (Specular có màu)' : metallic === 0 ? 'Phi kim Dielectric (Specular trắng)' : 'Vùng lai bất vật lý'}
        </div>
      </div>

      <div className="md:col-span-6 space-y-2.5 text-[12px]">
        <div>
          <div className="flex justify-between text-gray-300 mb-1">
            <span>Metallic (Khuyên dùng: 0 hoặc 1)</span>
            <span className="font-mono text-amber-300">{metallic.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={metallic}
            onChange={(e) => setMetallic(parseFloat(e.target.value))}
            className="w-full accent-amber-500"
          />
        </div>

        <div>
          <div className="flex justify-between text-gray-300 mb-1">
            <span>Roughness (Độ nhám bề mặt)</span>
            <span className="font-mono text-indigo-300">{roughness.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0.05"
            max="0.95"
            step="0.05"
            value={roughness}
            onChange={(e) => setRoughness(parseFloat(e.target.value))}
            className="w-full accent-indigo-500"
          />
        </div>

        <div>
          <div className="flex justify-between text-gray-300 mb-1">
            <span>IOR (Chiết suất viền Fresnel)</span>
            <span className="font-mono text-cyan-300">{ior.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="1.0"
            max="2.4"
            step="0.05"
            value={ior}
            onChange={(e) => setIor(parseFloat(e.target.value))}
            className="w-full accent-cyan-500"
          />
        </div>

        {isHybridWarning && (
          <div className="flex items-start gap-1.5 text-[11px] text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded-lg p-2">
            <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
            <span>Ngoài đời thực vật chất thuần là 0 hoặc 1 (trừ bề mặt dính bụi gỉ mới dùng mask 0–1).</span>
          </div>
        )}
      </div>
    </div>
  );
};

const StudioLightingFovLab: React.FC = () => {
  const [keyPower, setKeyPower] = useState(85);
  const [fillPower, setFillPower] = useState(30);
  const [rimPower, setRimPower] = useState(75);
  const [focalLength, setFocalLength] = useState<24 | 50 | 85>(50);

  const fovSpread = focalLength === 24 ? 105 : focalLength === 50 ? 60 : 34;

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
      <div className="md:col-span-7 bg-[#090D16] border border-[#1E273B] rounded-xl p-3 flex flex-col items-center">
        <svg viewBox="0 0 300 170" className="w-full max-w-[320px] h-44">
          {/* Camera FOV Cone */}
          <polygon
            points={`150,152 ${150 - fovSpread},22 ${150 + fovSpread},22`}
            fill="rgba(99,102,241,0.12)"
            stroke="rgba(129,140,248,0.45)"
            strokeDasharray="4 3"
          />
          {/* Subject Sphere */}
          <circle cx="150" cy="80" r="24" fill="#1e293b" stroke="#cbd5e1" strokeWidth="1.5" />
          {/* Key Light glow (Left Front) */}
          <circle cx="62" cy="116" r={10 + keyPower * 0.2} fill="#fb923c" fillOpacity={keyPower / 180} />
          <circle cx="62" cy="116" r="6" fill="#f97316" />
          <text x="62" y="138" textAnchor="middle" fill="#fdba74" fontSize="10">Key ({keyPower}%)</text>

          {/* Fill Light glow (Right Front) */}
          <circle cx="242" cy="118" r={8 + fillPower * 0.2} fill="#60a5fa" fillOpacity={fillPower / 180} />
          <circle cx="242" cy="118" r="5" fill="#3b82f6" />
          <text x="242" y="138" textAnchor="middle" fill="#93c5fd" fontSize="10">Fill ({fillPower}%)</text>

          {/* Rim Light glow (Back) */}
          <circle cx="204" cy="28" r={8 + rimPower * 0.18} fill="#fde047" fillOpacity={rimPower / 180} />
          <circle cx="204" cy="28" r="5" fill="#eab308" />
          <text x="234" y="31" fill="#fef08a" fontSize="10">Rim ({rimPower}%)</text>

          {/* Camera icon */}
          <rect x="140" y="148" width="20" height="12" rx="2" fill="#818cf8" />
          <text x="150" y="168" textAnchor="middle" fill="#c7d2fe" fontSize="9.5">Camera {focalLength}mm</text>
        </svg>
      </div>

      <div className="md:col-span-5 space-y-2.5 text-[12px]">
        <div>
          <div className="flex justify-between text-gray-300"><span>Key Light (Chính)</span><span className="font-mono">{keyPower}%</span></div>
          <input type="range" min="10" max="100" value={keyPower} onChange={(e) => setKeyPower(Number(e.target.value))} className="w-full accent-[#F97316]" />
        </div>
        <div>
          <div className="flex justify-between text-gray-300"><span>Fill Light (Bù bóng)</span><span className="font-mono">{fillPower}%</span></div>
          <input type="range" min="0" max="100" value={fillPower} onChange={(e) => setFillPower(Number(e.target.value))} className="w-full accent-blue-500" />
        </div>
        <div>
          <div className="flex justify-between text-gray-300"><span>Rim Light (Tách viền)</span><span className="font-mono">{rimPower}%</span></div>
          <input type="range" min="0" max="100" value={rimPower} onChange={(e) => setRimPower(Number(e.target.value))} className="w-full accent-yellow-500" />
        </div>
        <div className="flex gap-1.5 pt-1">
          {([24, 50, 85] as const).map((mm) => (
            <button
              key={mm}
              type="button"
              onClick={() => setFocalLength(mm)}
              className={`flex-1 py-1.5 rounded-lg text-[11px] font-mono cursor-pointer ${
                focalLength === mm ? 'bg-indigo-600 text-white font-bold' : 'bg-[#161D2C] text-gray-400'
              }`}
            >
              {mm}mm
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const AnimationCurvesIkLab: React.FC = () => {
  const [curve, setCurve] = useState<'linear' | 'ease' | 'overshoot'>('ease');
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    let start = performance.now();
    const loop = (now: number) => {
      const elapsed = ((now - start) % 1800) / 1800;
      setProgress(elapsed);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  const evalCurve = (t: number) => {
    if (curve === 'linear') return t;
    if (curve === 'ease') return t * t * (3 - 2 * t);
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  };

  const yPos = evalCurve(progress);
  const ballX = 40 + yPos * 190;

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
      <div className="md:col-span-7 bg-[#090D16] border border-[#1E273B] rounded-xl p-3 flex flex-col items-center">
        <svg viewBox="0 0 300 165" className="w-full max-w-[320px] h-40">
          {/* Graph Curve Preview */}
          <rect x="35" y="15" width="230" height="90" fill="#0E1422" stroke="#1E293B" rx="4" />
          <path
            d={
              curve === 'linear'
                ? 'M 40 100 L 260 22'
                : curve === 'ease'
                ? 'M 40 100 C 120 100, 180 22, 260 22'
                : 'M 40 100 C 130 100, 195 5, 260 22'
            }
            fill="none"
            stroke="#f97316"
            strokeWidth="2.5"
          />
          <line x1="40" y1="138" x2="260" y2="138" stroke="#334155" strokeWidth="2" />
          <circle cx={Math.max(30, Math.min(272, ballX))} cy="138" r="10" fill="#38bdf8" stroke="#fff" strokeWidth="1.5" />
          <text x="150" y="158" textAnchor="middle" fill="#94a3b8" fontSize="10">
            {curve === 'linear' && 'Linear: Tốc độ đều (Cảm giác robot cứng nhắc)'}
            {curve === 'ease' && 'Bezier Ease In-Out: Chậm hai đầu, mượt tự nhiên'}
            {curve === 'overshoot' && 'Overshoot: Vọt lố rồi hồi về (Sinh động kiểu Pixar)'}
          </text>
        </svg>
      </div>

      <div className="md:col-span-5 space-y-2 text-[12px]">
        {(['linear', 'ease', 'overshoot'] as const).map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCurve(c)}
            className={`w-full text-left px-3 py-2 rounded-lg border cursor-pointer ${
              curve === c ? 'bg-[#1D263A] border-[#F97316] text-white font-semibold' : 'bg-[#111623] border-[#222B3F] text-gray-400'
            }`}
          >
            {c === 'linear' ? '1. Linear (Không gia tốc)' : c === 'ease' ? '2. Bezier Ease In-Out' : '3. Back / Overshoot'}
          </button>
        ))}

        <button
          type="button"
          onClick={() => setPlaying(!playing)}
          className="w-full py-1.5 rounded-lg bg-[#161D2C] border border-[#27324A] text-gray-200 text-[11.5px] flex items-center justify-center gap-1.5 cursor-pointer"
        >
          {playing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span>{playing ? 'Tạm dừng Graph' : 'Chạy mô phỏng'}</span>
        </button>
      </div>
    </div>
  );
};

const GeoNodesScatterLab: React.FC = () => {
  const [density, setDensity] = useState(14);
  const [seed, setSeed] = useState(1);
  const [slopeFilter, setSlopeFilter] = useState(false);

  const points = Array.from({ length: density }, (_, idx) => {
    const hash = Math.sin((idx + 1) * 12.9898 + seed * 78.233) * 43758.5453;
    const rx = hash - Math.floor(hash);
    const ry = ((hash * 7.13) % 1 + 1) % 1;
    const x = 35 + rx * 230;
    const hillY = 112 - Math.sin(((x - 35) / 230) * Math.PI) * 48;
    const slope = Math.abs(Math.cos(((x - 35) / 230) * Math.PI));
    const visible = !slopeFilter || slope < 0.72;
    return { x, y: hillY + (ry - 0.5) * 10, scale: 0.7 + ry * 0.65, visible };
  });

  const activeCount = points.filter((p) => p.visible).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
      <div className="md:col-span-7 bg-[#090D16] border border-[#1E273B] rounded-xl p-3 flex flex-col items-center">
        <svg viewBox="0 0 300 165" className="w-full max-w-[320px] h-40">
          <path d="M 25 128 Q 150 28 275 128 L 275 148 L 25 148 Z" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
          {points.map((p, i) =>
            p.visible ? (
              <g key={i} transform={`translate(${p.x},${p.y}) scale(${p.scale})`}>
                <polygon points="0,-16 -6,0 6,0" fill="#10b981" />
                <rect x="-1.5" y="0" width="3" height="5" fill="#92400e" />
              </g>
            ) : null
          )}
          <text x="150" y="159" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">
            Active Instances: {activeCount} cây / {density} điểm (Seed #{seed})
          </text>
        </svg>
      </div>

      <div className="md:col-span-5 space-y-2.5 text-[12px]">
        <div>
          <div className="flex justify-between text-gray-300 mb-1">
            <span>Density (Distribute Points)</span>
            <span className="font-mono text-emerald-400">{density}</span>
          </div>
          <input
            type="range"
            min="5"
            max="32"
            value={density}
            onChange={(e) => setDensity(Number(e.target.value))}
            className="w-full accent-emerald-500"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setSeed((s) => s + 1)}
            className="flex-1 py-1.5 px-2.5 rounded-lg bg-[#161D2C] hover:bg-[#1E273B] border border-[#27324A] text-gray-200 text-[11px] flex items-center justify-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" /> Đổi Seed ({seed})
          </button>
          <button
            type="button"
            onClick={() => setSlopeFilter(!slopeFilter)}
            className={`flex-1 py-1.5 px-2.5 rounded-lg text-[11px] font-semibold cursor-pointer ${
              slopeFilter ? 'bg-emerald-600 text-white' : 'bg-[#161D2C] text-gray-300 border border-[#27324A]'
            }`}
          >
            Lọc độ dốc: {slopeFilter ? 'BẬT' : 'TẮT'}
          </button>
        </div>

        <p className="text-[11px] text-gray-400">
          Field Toán học chạy song song trên từng điểm để quyết định vị trí và tỷ lệ cây mà không làm nặng mesh gốc.
        </p>
      </div>
    </div>
  );
};

export const PrincipleLabWidget: React.FC<PrincipleLabWidgetProps> = ({ labId }) => {
  const header = LAB_HEADERS[labId];

  return (
    <div className="my-5 rounded-2xl border border-[#27324A] bg-gradient-to-br from-[#111726] to-[#0B0F19] p-4 sm:p-5 shadow-lg">
      <div className="flex items-start justify-between gap-3 mb-3.5">
        <div>
          <span className="inline-flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-wider text-indigo-300 bg-indigo-500/15 border border-indigo-500/30 px-2.5 py-0.5 rounded-full">
            <Sliders className="w-3 h-3" />
            {header.badge}
          </span>
          <h3 className="text-[15px] font-bold text-white mt-2">{header.title}</h3>
          <p className="text-[12px] text-gray-400 mt-0.5">{header.subtitle}</p>
        </div>
        <Sparkles className="w-4 h-4 text-[#F97316] shrink-0 mt-1" />
      </div>

      {labId === 'transform-scale' && <TransformScaleLab />}
      {labId === 'quad-subdiv' && <QuadSubdivLab />}
      {labId === 'bevel-normals' && <BevelNormalsLab />}
      {labId === 'uv-net' && <UvNetLab />}
      {labId === 'pbr-physics' && <PbrPhysicsLab />}
      {labId === 'studio-lighting-fov' && <StudioLightingFovLab />}
      {labId === 'animation-curves-ik' && <AnimationCurvesIkLab />}
      {labId === 'geonodes-scatter' && <GeoNodesScatterLab />}

      <div className="mt-3 pt-2.5 border-t border-[#1C2437] flex items-center gap-1.5 text-[11px] text-emerald-400">
        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
        <span>Kéo thả trực tiếp các thông số phía trên để kiểm chứng nguyên lý trước khi mở Blender.</span>
      </div>
    </div>
  );
};
