/**
 * InquiryModal — Premium inquiry modal for Hominode.
 *
 * Features:
 *  - Dark blurred backdrop
 *  - Smooth slide-up animation
 *  - ESC key closes
 *  - Click-outside closes
 *  - Focus trap (Tab / Shift+Tab cycles inside)
 *  - Body scroll locked while open
 *  - Fully accessible (role="dialog", aria-modal, aria-labelledby)
 *  - Mobile responsive (full-screen on small devices)
 *  - Renders InquiryForm inside
 */

import { useEffect, useRef, useCallback, type KeyboardEvent } from "react";
import InquiryForm from "./InquiryForm";

export interface InquiryModalProps {
  open:    boolean;
  onClose: () => void;
}

export default function InquiryModal({ open, onClose }: InquiryModalProps) {
  const overlayRef   = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeBtnRef  = useRef<HTMLButtonElement>(null);

  /* ── body scroll lock ───────────────────────────────────────── */
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Focus close button after paint
    requestAnimationFrame(() => closeBtnRef.current?.focus());
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  /* ── ESC key ────────────────────────────────────────────────── */
  useEffect(() => {
    if (!open) return;
    const handler = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  /* ── click-outside ──────────────────────────────────────────── */
  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === overlayRef.current) onClose();
    },
    [onClose],
  );

  /* ── focus trap ─────────────────────────────────────────────── */
  const handleTabTrap = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key !== "Tab") return;
      const focusable = containerRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), ' +
        'textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last  = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [],
  );

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[900] flex items-end sm:items-center justify-center sm:p-4"
      style={{
        background:          "rgba(0,0,0,0.55)",
        backdropFilter:      "blur(6px)",
        WebkitBackdropFilter:"blur(6px)",
        animation:           "inq-overlay-in 0.2s ease forwards",
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="inq-modal-title"
      onClick={handleOverlayClick}
      onKeyDown={handleTabTrap}
    >
      {/* ── modal container ──────────────────────────────────── */}
      <div
        ref={containerRef}
        className="relative w-full sm:max-w-2xl max-h-[96vh] flex flex-col rounded-t-3xl sm:rounded-2xl overflow-hidden theme-transition"
        style={{
          background:  "var(--bg-1)",
          border:      "1px solid var(--border)",
          boxShadow:   "0 32px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.05)",
          animation:   "inq-modal-in 0.28s cubic-bezier(0.16,1,0.3,1) forwards",
        }}
      >
        {/* ── sticky header ──────────────────────────────────── */}
        <div
          className="sticky top-0 z-20 flex items-start justify-between gap-4 px-6 pt-5 pb-4 flex-shrink-0 theme-transition"
          style={{ background: "var(--bg-1)", borderBottom: "1px solid var(--border)" }}
        >
          {/* Branding + title */}
          <div className="flex items-start gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: "linear-gradient(135deg,#2563EB,#6366F1)" }}
              aria-hidden="true"
            >
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="3" fill="white"/>
                <circle cx="9" cy="2"  r="1.5" fill="white" opacity="0.75"/>
                <circle cx="9" cy="16" r="1.5" fill="white" opacity="0.75"/>
                <circle cx="2" cy="9"  r="1.5" fill="white" opacity="0.75"/>
                <circle cx="16" cy="9" r="1.5" fill="white" opacity="0.75"/>
                <line x1="9"   y1="3.5"  x2="9"   y2="6"    stroke="white" strokeWidth="1.2" opacity="0.5"/>
                <line x1="9"   y1="12"   x2="9"   y2="14.5" stroke="white" strokeWidth="1.2" opacity="0.5"/>
                <line x1="3.5" y1="9"    x2="6"   y2="9"    stroke="white" strokeWidth="1.2" opacity="0.5"/>
                <line x1="12"  y1="9"    x2="14.5" y2="9"   stroke="white" strokeWidth="1.2" opacity="0.5"/>
              </svg>
            </div>
            <div>
              <h2
                id="inq-modal-title"
                className="text-xl font-bold leading-tight"
                style={{ color: "var(--text-1)", fontFamily: "Instrument Sans,sans-serif" }}
              >
                Let's Build a Smarter Community
              </h2>
              <p className="text-sm mt-0.5" style={{ color: "var(--text-2)" }}>
                Tell us about your community — our team will get in touch within 24 hours.
              </p>
            </div>
          </div>

          {/* Close button */}
          <button
            ref={closeBtnRef}
            onClick={onClose}
            aria-label="Close inquiry form"
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 theme-transition"
            style={{ background: "var(--bg-3)", color: "var(--text-3)" }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = "var(--bg-2)";
              (e.currentTarget as HTMLElement).style.color      = "var(--text-1)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = "var(--bg-3)";
              (e.currentTarget as HTMLElement).style.color      = "var(--text-3)";
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* ── scrollable form body ────────────────────────────── */}
        <div className="overflow-y-auto flex-1 px-6 py-5">
          <InquiryForm compact onSuccess={onClose} />
        </div>

        {/* ── mobile drag-handle visual cue ──────────────────── */}
        <div
          className="sm:hidden absolute top-2.5 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full opacity-30 theme-transition"
          style={{ background: "var(--border-2)" }}
          aria-hidden="true"
        />
      </div>

      {/* ── keyframe styles ──────────────────────────────────── */}
      <style>{`
        @keyframes inq-overlay-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes inq-modal-in {
          from { opacity: 0; transform: translateY(28px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        @media (max-width: 639px) {
          @keyframes inq-modal-in {
            from { opacity: 0; transform: translateY(100%); }
            to   { opacity: 1; transform: translateY(0);    }
          }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes inq-overlay-in { from { opacity:1; } }
          @keyframes inq-modal-in   { from { opacity:1; transform:none; } }
        }
      `}</style>
    </div>
  );
}
