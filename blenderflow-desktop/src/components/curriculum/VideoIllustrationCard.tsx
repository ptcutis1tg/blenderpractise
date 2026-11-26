import React, { useState } from 'react';
import { Play, ExternalLink, Clock, Video, ChevronDown, ChevronRight } from 'lucide-react';

export interface VideoChapterHint {
  label: string;
  startSeconds: number;
  timeText: string;
}

export interface VideoResourceItem {
  title: string;
  channel: string;
  youtubeId: string;
  startSeconds?: number;
  durationLabel: string;
  focusPoints: string[];
  chapters?: VideoChapterHint[];
}

interface VideoIllustrationCardProps {
  videos: VideoResourceItem[];
}

export const VideoIllustrationCard: React.FC<VideoIllustrationCardProps> = ({ videos }) => {
  const [expanded, setExpanded] = useState(false);
  const [selectedVideoIdx, setSelectedVideoIdx] = useState(0);
  const [activeStartSeconds, setActiveStartSeconds] = useState<number>(videos[0]?.startSeconds || 0);
  const [playerLoaded, setPlayerLoaded] = useState(false);

  if (!videos || videos.length === 0) return null;

  const activeVideo = videos[selectedVideoIdx] || videos[0];
  const watchUrl = `https://www.youtube.com/watch?v=${activeVideo.youtubeId}${
    activeStartSeconds > 0 ? `&t=${activeStartSeconds}s` : ''
  }`;
  const embedUrl = `https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?start=${activeStartSeconds}&autoplay=1&rel=0`;
  const thumbUrl = `https://i.ytimg.com/vi/${activeVideo.youtubeId}/hqdefault.jpg`;

  const handleSelectVideo = (idx: number) => {
    setSelectedVideoIdx(idx);
    setActiveStartSeconds(videos[idx]?.startSeconds || 0);
    setPlayerLoaded(false);
  };

  const handleJumpChapter = (sec: number) => {
    setActiveStartSeconds(sec);
    setPlayerLoaded(true);
  };

  return (
    <div className="my-5 rounded-2xl border border-[#222C42] bg-[#0F1422] overflow-hidden">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full px-4 py-3 flex items-center justify-between gap-3 hover:bg-[#151C2E] transition-colors cursor-pointer text-left"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0">
            <Video className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="text-[13px] font-bold text-white truncate">
              Video Minh họa Chuẩn ({activeVideo.channel})
            </div>
            <div className="text-[11px] text-gray-400 truncate">
              {activeVideo.title} • {activeVideo.durationLabel}
            </div>
          </div>
        </div>
        <span className="flex items-center gap-1 text-[11.5px] text-indigo-300 font-medium shrink-0">
          <span>{expanded ? 'Thu gọn' : 'Mở video'}</span>
          {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </span>
      </button>

      {expanded && (
        <div className="p-4 pt-2 border-t border-[#1D2538] space-y-3.5">
          {videos.length > 1 && (
            <div className="flex flex-wrap gap-1.5">
              {videos.map((v, idx) => (
                <button
                  key={`${v.youtubeId}-${idx}`}
                  type="button"
                  onClick={() => handleSelectVideo(idx)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium cursor-pointer border ${
                    idx === selectedVideoIdx
                      ? 'bg-[#1D263B] border-[#F97316] text-white'
                      : 'bg-[#0A0E18] border-[#1F273B] text-gray-400 hover:text-white'
                  }`}
                >
                  {v.channel}: {v.title.slice(0, 36)}
                </button>
              ))}
            </div>
          )}

          {/* Click-to-Load Facade or Active Embed Player */}
          <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-[#080B12] border border-[#222C42]">
            {playerLoaded ? (
              <iframe
                key={`${activeVideo.youtubeId}-${activeStartSeconds}`}
                src={embedUrl}
                title={activeVideo.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div
                onClick={() => setPlayerLoaded(true)}
                className="w-full h-full relative cursor-pointer group flex items-center justify-center bg-gradient-to-br from-[#121826] to-[#080B12]"
              >
                <img
                  src={thumbUrl}
                  alt={activeVideo.title}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                  }}
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-75 transition-opacity"
                />
                <div className="relative z-10 flex flex-col items-center gap-2 px-4 text-center">
                  <div className="w-14 h-14 rounded-full bg-[#F97316] group-hover:bg-[#EA580C] text-white flex items-center justify-center shadow-xl transition-transform group-hover:scale-105">
                    <Play className="w-6 h-6 ml-0.5 fill-white" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-black/75 text-white text-[11.5px] font-medium border border-white/10">
                    Bấm để phát video trực tiếp (hoặc chọn mốc giờ bên dưới)
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Chapter Timestamp Buttons + Open in External Browser Fallback */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-1.5">
              {activeVideo.chapters && activeVideo.chapters.length > 0 && (
                <>
                  <span className="text-[11px] text-gray-400 flex items-center gap-1 mr-1">
                    <Clock className="w-3 h-3" /> Mốc trọng tâm:
                  </span>
                  {activeVideo.chapters.map((ch, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleJumpChapter(ch.startSeconds)}
                      className={`px-2 py-1 rounded-md text-[11px] font-mono border cursor-pointer transition-colors ${
                        activeStartSeconds === ch.startSeconds && playerLoaded
                          ? 'bg-[#F97316]/20 border-[#F97316] text-orange-200'
                          : 'bg-[#141B2B] border-[#253047] text-gray-300 hover:text-white'
                      }`}
                    >
                      {ch.timeText} • {ch.label}
                    </button>
                  ))}
                </>
              )}
            </div>

            <a
              href={watchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#182032] hover:bg-[#222D45] border border-[#2B3752] text-gray-200 text-[11.5px] font-medium shrink-0"
            >
              <span>Mở trên YouTube</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Key Focus Points */}
          {activeVideo.focusPoints.length > 0 && (
            <div className="p-3 rounded-xl bg-[#0B0F19] border border-[#1B2335]">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                Điểm cần chú ý khi xem:
              </div>
              <ul className="space-y-1">
                {activeVideo.focusPoints.map((pt, i) => (
                  <li key={i} className="text-[12px] text-gray-300 flex items-start gap-2">
                    <span className="text-[#F97316] font-bold">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
