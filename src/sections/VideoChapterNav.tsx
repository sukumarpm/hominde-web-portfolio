/**
 * VideoChapterNav — Chapter navigation strip beneath the hero video.
 * 13 chapters. Horizontally scrollable on mobile.
 * When a chapter is selected, fires onChapterSelect(chapterId).
 */

import { useRef } from "react";
import { HOMINODE_DEMO_CHAPTERS } from "../assets/videos/videoConfig";

export interface VideoChapterNavProps {
  activeChapter?: number;
  onChapterSelect: (chapterId: number) => void;
}

const CHAPTER_ICONS: Record<number, string> = {
  1:  "▦",
  2:  "📱",
  3:  "🚗",
  4:  "🛡️",
  5:  "💳",
  6:  "🏊",
  7:  "🅿️",
  8:  "📢",
  9:  "🛒",
  10: "🔧",
  11: "👷",
  12: "⚙️",
  13: "🎨",
};

export default function VideoChapterNav({
  activeChapter = 1,
  onChapterSelect,
}: VideoChapterNavProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToChip = (id: number) => {
    const el = scrollRef.current?.querySelector(`[data-chapter="${id}"]`) as HTMLElement | null;
    el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  const handleSelect = (id: number) => {
    onChapterSelect(id);
    scrollToChip(id);
  };

  return (
    <div
      className="w-full py-4 theme-transition"
      style={{
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
      aria-label="Demo chapter navigation"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Label row */}
        <div className="flex items-center justify-between mb-3">
          <p
            className="text-[11px] font-semibold tracking-wider uppercase theme-transition"
            style={{ color: "var(--text-3)" }}
          >
            Chapter Navigation
          </p>
          <p
            className="text-[11px] theme-transition"
            style={{ color: "var(--text-4)" }}
          >
            {HOMINODE_DEMO_CHAPTERS.length} chapters · 3 min overview
          </p>
        </div>

        {/* Scrollable chips */}
        <div
          ref={scrollRef}
          className="flex items-center gap-2 overflow-x-auto"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
            paddingBottom: 4,
          }}
          role="tablist"
          aria-label="Demo chapters"
        >
          {HOMINODE_DEMO_CHAPTERS.map((chapter) => {
            const isActive = chapter.id === activeChapter;
            return (
              <button
                key={chapter.id}
                data-chapter={chapter.id}
                role="tab"
                aria-selected={isActive}
                aria-label={`Chapter ${chapter.id}: ${chapter.label}`}
                onClick={() => handleSelect(chapter.id)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl flex-shrink-0 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-1 theme-transition"
                style={{
                  background: isActive ? "var(--blue-bg)" : "var(--bg-3)",
                  border: `1px solid ${isActive ? "var(--blue-border)" : "var(--border)"}`,
                  color: isActive ? "var(--blue)" : "var(--text-3)",
                  fontWeight: isActive ? "600" : "400",
                  transform: isActive ? "translateY(-1px)" : "translateY(0)",
                  boxShadow: isActive ? "0 4px 12px var(--blue-soft)" : "none",
                }}
              >
                {/* Number badge */}
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0 transition-all duration-200"
                  style={{
                    background: isActive ? "var(--blue)" : "var(--border-2)",
                    color: isActive ? "#fff" : "var(--text-3)",
                  }}
                >
                  {String(chapter.id).padStart(2, "0")}
                </span>

                {/* Icon */}
                <span className="text-sm leading-none" aria-hidden="true">
                  {CHAPTER_ICONS[chapter.id] ?? "▸"}
                </span>

                {/* Label */}
                <span className="text-xs whitespace-nowrap">{chapter.label}</span>
              </button>
            );
          })}
        </div>

        {/* Hide scrollbar (webkit) */}
        <style>{`
          [aria-label="Demo chapters"]::-webkit-scrollbar { display: none; }
        `}</style>
      </div>
    </div>
  );
}
