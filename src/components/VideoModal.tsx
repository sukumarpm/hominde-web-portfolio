/**
 * VideoModal — Premium video lightbox for Hominode product demo.
 *
 * Supports:
 *  - Real MP4 via `src` prop  (full native controls)
 *  - Animated demo mode when src is null (renders children)
 *  - Keyboard: Space = play/pause, Escape = close, M = mute, F = fullscreen
 *  - ARIA roles, focus trap, prefers-reduced-motion
 *  - Click-outside-to-close, close button
 */

import {
  useEffect,
  useRef,
  useCallback,
  useState,
  type ReactNode,
  type KeyboardEvent,
} from "react";
import { HOMINODE_DEMO_VIDEO } from "../assets/videos/videoConfig";

/* ─────────────────────────────────────────────────────────── types */
export interface VideoModalProps {
  open: boolean;
  onClose: () => void;
  /** Override the configured video URL (optional) */
  src?: string | null;
  /** Content rendered when src is null (animated demo) */
  children?: ReactNode;
  /** Active chapter index for the chapter indicator */
  activeChapter?: number;
  /** Chapter label text */
  activeChapterLabel?: string;
}

/* ─────────────────────────────────────────────────────────── helpers */
function formatTime(s: number): string {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

/* ─────────────────────────────────────────────────────────── component */
export default function VideoModal({
  open,
  onClose,
  src,
  children,
  activeChapter,
  activeChapterLabel,
}: VideoModalProps) {
  const videoSrc = src !== undefined ? src : HOMINODE_DEMO_VIDEO;
  const hasRealVideo = !!videoSrc;

  /* refs */
  const overlayRef   = useRef<HTMLDivElement>(null);
  const videoRef     = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeBtnRef  = useRef<HTMLButtonElement>(null);

  /* state (only used when real video present) */
  const [playing,   setPlaying]   = useState(false);
  const [muted,     setMuted]     = useState(false);
  const [volume,    setVolume]    = useState(1);
  const [progress,  setProgress]  = useState(0);
  const [duration,  setDuration]  = useState(0);
  const [current,   setCurrent]   = useState(0);
  const [buffered,  setBuffered]  = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── mount / unmount */
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      // Focus close button after paint
      requestAnimationFrame(() => closeBtnRef.current?.focus());
    } else {
      document.body.style.overflow = "";
      setPlaying(false);
      setProgress(0);
      setCurrent(0);
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  /* ── keyboard handler */
  const handleKeyDown = useCallback(
    (e: globalThis.KeyboardEvent) => {
      if (!open) return;
      switch (e.key) {
        case "Escape": onClose(); break;
        case " ":
        case "k":
          e.preventDefault();
          if (hasRealVideo && videoRef.current) togglePlay();
          break;
        case "m":
        case "M":
          if (hasRealVideo && videoRef.current) toggleMute();
          break;
        case "f":
        case "F":
          if (hasRealVideo) toggleFullscreen();
          break;
        case "ArrowRight":
          if (hasRealVideo && videoRef.current) {
            videoRef.current.currentTime = Math.min(videoRef.current.currentTime + 10, duration);
          }
          break;
        case "ArrowLeft":
          if (hasRealVideo && videoRef.current) {
            videoRef.current.currentTime = Math.max(videoRef.current.currentTime - 10, 0);
          }
          break;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [open, hasRealVideo, duration]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  /* ── fullscreen change sync */
  useEffect(() => {
    const onFsChange = () => setFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  /* ── video event handlers */
  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play().catch(() => {}); setPlaying(true); }
    else          { v.pause(); setPlaying(false); }
  }, []);

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }, []);

  const toggleFullscreen = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  const handleTimeUpdate = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    setCurrent(v.currentTime);
    setProgress(v.duration ? (v.currentTime / v.duration) * 100 : 0);
    if (v.buffered.length > 0) {
      setBuffered((v.buffered.end(v.buffered.length - 1) / v.duration) * 100);
    }
  }, []);

  const handleSeek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    v.currentTime = pct * v.duration;
  }, []);

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const v = videoRef.current;
    if (!v) return;
    const val = parseFloat(e.target.value);
    v.volume = val;
    v.muted  = val === 0;
    setVolume(val);
    setMuted(val === 0);
  }, []);

  /* ── auto-hide controls */
  const resetHideTimer = useCallback(() => {
    setShowControls(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      if (playing) setShowControls(false);
    }, 2800);
  }, [playing]);

  useEffect(() => () => { if (hideTimer.current) clearTimeout(hideTimer.current); }, []);

  /* ── overlay click-outside */
  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === overlayRef.current) onClose();
    },
    [onClose]
  );

  /* ── tab trap */
  const handleTabTrap = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key !== "Tab") return;
      const focusable = containerRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last  = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    },
    []
  );

  if (!open) return null;

  /* ─────────────────────── render */
  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Hominode product demo video"
      className="fixed inset-0 z-[2000] flex items-center justify-center p-4 sm:p-6"
      style={{
        background: "rgba(0,0,0,0.88)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        animation: "fade-in-modal 0.2s ease forwards",
      }}
      onClick={handleOverlayClick}
      onKeyDown={handleTabTrap as unknown as React.KeyboardEventHandler<HTMLDivElement>}
    >
      {/* Modal container */}
      <div
        ref={containerRef}
        className="relative w-full max-w-5xl"
        style={{ animation: "slide-up-modal 0.25s cubic-bezier(0.16,1,0.3,1) forwards" }}
        onMouseMove={hasRealVideo ? resetHideTimer : undefined}
      >
        {/* Close button */}
        <button
          ref={closeBtnRef}
          onClick={onClose}
          aria-label="Close video modal"
          className="absolute -top-10 right-0 z-10 flex items-center gap-1.5 text-sm font-medium transition-opacity duration-150 hover:opacity-100 opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          style={{ color: "#fff" }}
        >
          <span>Close</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Chapter badge */}
        {activeChapterLabel && (
          <div
            className="absolute -top-10 left-0 flex items-center gap-2 text-xs font-medium"
            style={{ color: "rgba(255,255,255,0.7)" }}
            aria-live="polite"
          >
            <span
              className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
              style={{ background: "rgba(37,99,235,0.8)", color: "#fff" }}
            >
              {activeChapter !== undefined ? String(activeChapter).padStart(2, "0") : ""}
            </span>
            {activeChapterLabel}
          </div>
        )}

        {/* Video / demo area */}
        <div
          className="relative overflow-hidden"
          style={{
            borderRadius: "16px",
            background: "#060D1F",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)",
            aspectRatio: "16/9",
          }}
        >
          {hasRealVideo ? (
            /* ── REAL VIDEO ── */
            <>
              <video
                ref={videoRef}
                src={videoSrc!}
                className="w-full h-full object-cover"
                playsInline
                muted={muted}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={() => setDuration(videoRef.current?.duration ?? 0)}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onEnded={() => { setPlaying(false); setShowControls(true); }}
                onClick={togglePlay}
                style={{ cursor: "pointer", display: "block" }}
                aria-label="Hominode demo video"
              />

              {/* Center play overlay */}
              {!playing && (
                <button
                  onClick={togglePlay}
                  aria-label="Play video"
                  className="absolute inset-0 flex items-center justify-center focus:outline-none"
                >
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-110"
                    style={{
                      background: "rgba(255,255,255,0.15)",
                      backdropFilter: "blur(8px)",
                      border: "2px solid rgba(255,255,255,0.3)",
                    }}
                  >
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                      <path d="M11 8l14 8-14 8V8z" fill="white"/>
                    </svg>
                  </div>
                </button>
              )}

              {/* Controls bar */}
              <div
                className="absolute bottom-0 left-0 right-0 transition-opacity duration-300"
                style={{
                  opacity: showControls ? 1 : 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)",
                  padding: "32px 16px 16px",
                  pointerEvents: showControls ? "auto" : "none",
                }}
                aria-hidden={!showControls}
              >
                {/* Progress bar */}
                <div
                  className="relative w-full h-1 rounded-full mb-3 cursor-pointer group"
                  style={{ background: "rgba(255,255,255,0.2)" }}
                  onClick={handleSeek}
                  role="slider"
                  aria-label="Video progress"
                  aria-valuenow={Math.round(progress)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  tabIndex={0}
                  onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
                    const v = videoRef.current;
                    if (!v) return;
                    if (e.key === "ArrowRight") v.currentTime = Math.min(v.currentTime + 5, duration);
                    if (e.key === "ArrowLeft")  v.currentTime = Math.max(v.currentTime - 5, 0);
                  }}
                >
                  {/* Buffered */}
                  <div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{ width: `${buffered}%`, background: "rgba(255,255,255,0.15)" }}
                    aria-hidden="true"
                  />
                  {/* Played */}
                  <div
                    className="absolute inset-y-0 left-0 rounded-full transition-all duration-100"
                    style={{ width: `${progress}%`, background: "linear-gradient(90deg,#2563EB,#6366F1)" }}
                    aria-hidden="true"
                  />
                  {/* Thumb */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      left: `${progress}%`,
                      transform: "translate(-50%, -50%)",
                      background: "#fff",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
                    }}
                    aria-hidden="true"
                  />
                </div>

                {/* Controls row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Play/pause */}
                    <button
                      onClick={togglePlay}
                      aria-label={playing ? "Pause" : "Play"}
                      className="text-white opacity-80 hover:opacity-100 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
                    >
                      {playing ? (
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                          <rect x="5" y="4" width="3.5" height="12" rx="1" fill="currentColor"/>
                          <rect x="11.5" y="4" width="3.5" height="12" rx="1" fill="currentColor"/>
                        </svg>
                      ) : (
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                          <path d="M6 4l12 6-12 6V4z" fill="currentColor"/>
                        </svg>
                      )}
                    </button>

                    {/* Volume */}
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={toggleMute}
                        aria-label={muted ? "Unmute" : "Mute"}
                        className="text-white opacity-80 hover:opacity-100 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
                      >
                        {muted || volume === 0 ? (
                          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                            <path d="M9 4L5 8H2v4h3l4 4V4z" fill="currentColor"/>
                            <path d="M14 8l-4 4m0-4l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                          </svg>
                        ) : (
                          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                            <path d="M9 4L5 8H2v4h3l4 4V4z" fill="currentColor"/>
                            <path d="M13 7.5a4 4 0 010 5M15.5 5.5a7 7 0 010 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                          </svg>
                        )}
                      </button>
                      <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.05}
                        value={muted ? 0 : volume}
                        onChange={handleVolumeChange}
                        aria-label="Volume"
                        className="w-16 h-1 accent-blue-500 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
                        style={{ accentColor: "#3B82F6" }}
                      />
                    </div>

                    {/* Time */}
                    <span className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.7)" }}>
                      {formatTime(current)} / {formatTime(duration)}
                    </span>
                  </div>

                  {/* Fullscreen */}
                  <button
                    onClick={toggleFullscreen}
                    aria-label={fullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                    className="text-white opacity-80 hover:opacity-100 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
                  >
                    {fullscreen ? (
                      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                        <path d="M7 3v4H3M17 3l-4 4M3 17l4-4M17 17h-4v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                        <path d="M3 7V3h4M13 3h4v4M17 13v4h-4M7 17H3v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* ── ANIMATED DEMO ── */
            <div className="w-full h-full overflow-hidden">
              {children}
            </div>
          )}
        </div>

        {/* Keyboard hint */}
        <div
          className="mt-3 flex items-center justify-center gap-4 text-[11px]"
          style={{ color: "rgba(255,255,255,0.35)" }}
          aria-hidden="true"
        >
          {hasRealVideo && (
            <>
              <span><kbd className="font-mono">Space</kbd> play/pause</span>
              <span><kbd className="font-mono">M</kbd> mute</span>
              <span><kbd className="font-mono">F</kbd> fullscreen</span>
              <span>← → seek 10s</span>
            </>
          )}
          <span><kbd className="font-mono">Esc</kbd> close</span>
        </div>
      </div>

      {/* Keyframe styles */}
      <style>{`
        @keyframes fade-in-modal {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slide-up-modal {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="fade-in-modal"],
          [style*="slide-up-modal"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
