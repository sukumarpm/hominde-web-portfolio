/**
 * Hero — Premium split-layout hero with interactive product demo video.
 * Left: badge, heading, description, CTAs
 * Right: video preview card with play button → opens VideoModal
 */

import { useState, useEffect, useRef } from "react";
import VideoModal from "../components/VideoModal";
import ProductDemoPlayer from "../components/ProductDemoPlayer";
import { HOMINODE_DEMO_VIDEO, HOMINODE_DEMO_TITLE } from "../assets/videos/videoConfig";

interface HeroProps {
  onContact: () => void;
}

/* ── Fallback static dashboard preview (shown when video fails or as poster) ── */
function DashboardPreview() {
  return (
    <div
      className="w-full h-full flex flex-col overflow-hidden"
      style={{ background: "#080F22" }}
      aria-hidden="true"
    >
      {/* Browser chrome */}
      <div
        className="flex items-center gap-2 px-3 py-2 flex-shrink-0"
        style={{ background: "#0C1530", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="flex gap-1">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/60" />
        </div>
        <div
          className="flex-1 mx-2 h-4 rounded flex items-center px-2"
          style={{ background: "rgba(255,255,255,0.04)" }}
        >
          <span className="text-[9px] font-mono" style={{ color: "rgba(255,255,255,0.25)" }}>
            app.hominode.com/dashboard
          </span>
        </div>
        <div
          className="flex items-center gap-1 px-1.5 py-0.5 rounded-full"
          style={{ background: "rgba(5,150,105,0.2)", border: "1px solid rgba(5,150,105,0.3)" }}
        >
          <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[8px] text-emerald-400 font-semibold">Live</span>
        </div>
      </div>

      {/* Dashboard body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className="w-28 flex-shrink-0 flex flex-col gap-0.5 py-3 px-2"
          style={{ background: "#0A1425", borderRight: "1px solid rgba(255,255,255,0.04)" }}
        >
          <div className="flex items-center gap-1.5 px-2 mb-3">
            <div
              className="w-5 h-5 rounded-md flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#2563EB,#6366F1)" }}
            >
              <svg width="10" height="10" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="3" fill="white" />
                <circle cx="9" cy="2" r="1.5" fill="white" opacity="0.7" />
                <circle cx="9" cy="16" r="1.5" fill="white" opacity="0.7" />
                <circle cx="2" cy="9" r="1.5" fill="white" opacity="0.7" />
                <circle cx="16" cy="9" r="1.5" fill="white" opacity="0.7" />
              </svg>
            </div>
            <span
              className="text-[9px] font-bold"
              style={{ color: "rgba(255,255,255,0.7)", fontFamily: "Instrument Sans,sans-serif" }}
            >
              HOMINODE
            </span>
          </div>
          {[
            { ic: "▦",  lb: "Dashboard",   a: true  },
            { ic: "👤", lb: "Residents"             },
            { ic: "🚗", lb: "Visitors"              },
            { ic: "🛡️",lb: "Security"              },
            { ic: "💳", lb: "Maintenance"           },
            { ic: "🏊", lb: "Amenities"             },
            { ic: "🅿️",lb: "Parking"               },
          ].map((item) => (
            <div
              key={item.lb}
              className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-[9px]"
              style={{
                background: item.a ? "rgba(37,99,235,0.2)" : "transparent",
                color: item.a ? "#60A5FA" : "rgba(255,255,255,0.3)",
                fontWeight: item.a ? "600" : "400",
              }}
            >
              <span className="text-xs leading-none">{item.ic}</span>
              {item.lb}
            </div>
          ))}
        </div>

        {/* Main */}
        <div className="flex-1 p-3 overflow-hidden" style={{ background: "#080F22" }}>
          <p className="text-[9px] font-semibold mb-2" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "Instrument Sans,sans-serif" }}>
            Overview — Sunrise Residency
          </p>
          {/* KPI row */}
          <div className="grid grid-cols-4 gap-1.5 mb-2">
            {[
              { label: "Residents",   value: "284",    c: "#2563EB", icon: "👤" },
              { label: "Visitors",    value: "12",     c: "#059669", icon: "🚗" },
              { label: "Maintenance", value: "₹1.2L",  c: "#7C3AED", icon: "💳" },
              { label: "Complaints",  value: "7",      c: "#D97706", icon: "🔧" },
            ].map((kpi) => (
              <div
                key={kpi.label}
                className="rounded-lg p-2"
                style={{ background: `${kpi.c}12`, border: `1px solid ${kpi.c}25` }}
              >
                <div className="flex items-center justify-between mb-1">
                  <p className="text-[7px]" style={{ color: "rgba(255,255,255,0.4)" }}>{kpi.label}</p>
                  <span className="text-[10px]">{kpi.icon}</span>
                </div>
                <p
                  className="text-xs font-bold"
                  style={{ color: kpi.c, fontFamily: "JetBrains Mono,monospace" }}
                >
                  {kpi.value}
                </p>
              </div>
            ))}
          </div>
          {/* Chart row */}
          <div className="grid grid-cols-5 gap-1.5 mb-2">
            <div
              className="col-span-3 rounded-lg p-2"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <p className="text-[7px] mb-1.5" style={{ color: "rgba(255,255,255,0.3)" }}>Visitor Traffic</p>
              <div className="flex items-end gap-1 h-10">
                {[60, 85, 45, 90, 70, 95, 55].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-sm"
                    style={{
                      height: `${h}%`,
                      background: i === 5
                        ? "linear-gradient(180deg,#60A5FA,#2563EB)"
                        : "rgba(37,99,235,0.25)",
                    }}
                  />
                ))}
              </div>
            </div>
            <div
              className="col-span-2 rounded-lg p-2"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <p className="text-[7px] mb-1.5" style={{ color: "rgba(255,255,255,0.3)" }}>Live Activity</p>
              {[
                { text: "Visitor approved", dot: "#059669" },
                { text: "Bill sent: 204B",   dot: "#2563EB" },
                { text: "Complaint: 101A",   dot: "#D97706" },
              ].map((a, i) => (
                <div key={i} className="flex items-center gap-1 mb-1">
                  <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: a.dot }} />
                  <p className="text-[7px] truncate" style={{ color: "rgba(255,255,255,0.3)" }}>{a.text}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Bottom strip */}
          <div className="grid grid-cols-4 gap-1.5">
            {[
              { label: "Parking",  value: "78%",       ic: "🅿️", c: "#4F46E5" },
              { label: "Security", value: "24 active",  ic: "🛡️", c: "#059669" },
              { label: "Amenities",value: "8 booked",   ic: "🏊", c: "#DB2777" },
              { label: "Staff",    value: "16 on duty", ic: "👷", c: "#EA580C" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-lg p-1.5 flex items-center gap-1"
                style={{ background: `${item.c}0a`, border: `1px solid ${item.c}18` }}
              >
                <span className="text-[10px]">{item.ic}</span>
                <div>
                  <p className="text-[6px]" style={{ color: "rgba(255,255,255,0.3)" }}>{item.label}</p>
                  <p className="text-[8px] font-semibold" style={{ color: item.c }}>{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Video preview card ── */
function VideoPreviewCard({ onPlay }: { onPlay: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative w-full group"
      style={{
        borderRadius: 24,
        overflow: "hidden",
        border: "1.5px solid rgba(37,99,235,0.25)",
        boxShadow: hovered
          ? "0 32px 80px rgba(0,0,0,0.45), 0 0 0 1px rgba(37,99,235,0.3), 0 8px 32px rgba(37,99,235,0.15)"
          : "0 24px 64px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.06)",
        transition: "box-shadow 0.3s ease",
        aspectRatio: "16/9",
        background: "#060D1F",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Dashboard preview (slightly zooms on hover) */}
      <div
        className="w-full h-full transition-transform duration-500"
        style={{ transform: hovered ? "scale(1.02)" : "scale(1)" }}
      >
        <DashboardPreview />
      </div>

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, transparent 40%, rgba(6,13,31,0.7) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Play button overlay */}
      <button
        onClick={onPlay}
        aria-label="Play Hominode product demo"
        className="absolute inset-0 flex flex-col items-center justify-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      >
        {/* Glow ring */}
        <div
          className="absolute inset-0 pointer-events-none rounded-full"
          style={{
            background: "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(37,99,235,0.18) 0%, transparent 70%)",
            opacity: hovered ? 1 : 0.6,
            transition: "opacity 0.3s ease",
          }}
          aria-hidden="true"
        />

        {/* Circle play button */}
        <div
          className="relative z-10 flex flex-col items-center gap-2"
          style={{
            transform: hovered ? "scale(1.08)" : "scale(1)",
            transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        >
          <div
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "2px solid rgba(255,255,255,0.25)",
              boxShadow: hovered
                ? "0 8px 32px rgba(37,99,235,0.5), 0 0 0 8px rgba(37,99,235,0.12)"
                : "0 4px 20px rgba(0,0,0,0.4)",
              transition: "box-shadow 0.3s ease",
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              aria-hidden="true"
            >
              <path d="M10 6l14 8-14 8V6z" fill="white" />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-white">See Hominode in action</p>
            <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>
              2-minute platform overview
            </p>
          </div>
        </div>
      </button>

      {/* Bottom badges */}
      <div
        className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold"
          style={{
            background: "rgba(6,13,31,0.8)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(37,99,235,0.3)",
            color: "#60A5FA",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: "#3B82F6" }}
          />
          Live Product Demo
        </div>
        <div
          className="px-3 py-1.5 rounded-full text-[10px] font-medium"
          style={{
            background: "rgba(6,13,31,0.8)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.6)",
          }}
        >
          Resident + Admin + Security
        </div>
      </div>
    </div>
  );
}

/* ── Main Hero export ── */
export default function Hero({ onContact }: HeroProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);

  /* scroll-reveal for section-fade children */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        }),
      { threshold: 0.04 }
    );
    ref.current?.querySelectorAll(".section-fade").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const openModal  = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <section
        ref={ref}
        id="hero"
        className="relative pt-24 pb-16 px-6 overflow-hidden theme-transition"
        style={{ background: "var(--bg)" }}
        aria-labelledby="hero-heading"
      >
        {/* Background decorations */}
        <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" aria-hidden="true" />
        <div
          className="absolute top-0 left-1/4 w-[500px] h-[500px] pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-6xl mx-auto w-full">
          {/* ── Split layout ── */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

            {/* ── LEFT: Content ── */}
            <div className="flex-1 max-w-xl lg:max-w-none lg:flex-[0_0_44%]">
              {/* Badge */}
              <div
                className="section-fade inline-flex items-center gap-2 mb-7"
                style={{ transitionDelay: "0s" }}
              >
                <div
                  className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide"
                  style={{
                    background: "var(--blue-bg)",
                    border: "1px solid var(--blue-border)",
                    color: "var(--blue)",
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-live"
                    style={{ background: "var(--blue)" }}
                    aria-hidden="true"
                  />
                  SMART COMMUNITY MANAGEMENT PLATFORM
                </div>
              </div>

              {/* Heading */}
              <h1
                id="hero-heading"
                className="section-fade text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.06] tracking-tight mb-6"
                style={{ transitionDelay: "0.08s" }}
              >
                <span style={{ color: "var(--text-1)" }}>One Platform.</span>
                <br />
                <span className="gradient-text">Every Part of</span>
                <br />
                <span className="gradient-text">Community Living.</span>
              </h1>

              {/* Description */}
              <p
                className="section-fade text-lg leading-relaxed mb-8"
                style={{ color: "var(--text-2)", transitionDelay: "0.14s", maxWidth: 480 }}
              >
                Hominode connects residents, administrators, security teams and property managers
                through one intelligent community management platform.
              </p>

              {/* CTA buttons */}
              <div
                className="section-fade flex flex-col sm:flex-row gap-3 mb-10"
                style={{ transitionDelay: "0.2s" }}
              >
                <button
                  onClick={onContact}
                  className="flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-base font-semibold text-white btn-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
                  style={{ background: "linear-gradient(135deg,#2563EB,#1D4ED8)" }}
                >
                  Book a Demo
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  onClick={() => document.querySelector("#apps")?.scrollIntoView({ behavior: "smooth" })}
                  className="flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-base font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 theme-transition"
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    color: "var(--text-1)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border-strong)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                  }}
                >
                  Explore Hominode
                </button>
              </div>

              {/* Social proof strip */}
              <div
                className="section-fade flex flex-wrap items-center gap-x-6 gap-y-2 text-sm"
                style={{ color: "var(--text-3)", transitionDelay: "0.26s" }}
              >
                {[
                  { icon: "✓", text: "Residents · Admins · Security" },
                  { icon: "✓", text: "Real-time sync" },
                  { icon: "✓", text: "White-label ready" },
                ].map(({ icon, text }) => (
                  <span key={text} className="flex items-center gap-1.5">
                    <span style={{ color: "var(--blue)" }}>{icon}</span>
                    {text}
                  </span>
                ))}
              </div>
            </div>

            {/* ── RIGHT: Video preview ── */}
            <div
              className="section-fade w-full lg:flex-1 lg:max-w-[56%]"
              style={{ transitionDelay: "0.3s" }}
            >
              {/* Frame label */}
              <div
                className="flex items-center justify-between mb-3 px-1"
                aria-hidden="true"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: "var(--blue)" }}
                  />
                  <span
                    className="text-xs font-medium"
                    style={{ color: "var(--text-3)" }}
                  >
                    {HOMINODE_DEMO_TITLE}
                  </span>
                </div>
                <span
                  className="text-[11px] font-mono"
                  style={{ color: "var(--text-4)" }}
                >
                  16:9
                </span>
              </div>

              {/* The card */}
              <VideoPreviewCard onPlay={openModal} />

              {/* Scroll cue */}
              <div className="flex justify-center mt-6">
                <button
                  className="flex flex-col items-center gap-1.5 opacity-40 hover:opacity-70 transition-opacity focus:outline-none"
                  aria-label="Scroll to explore features"
                  onClick={() =>
                    document.querySelector("#quick-features")?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  <span className="text-xs" style={{ color: "var(--text-4)" }}>
                    Scroll to explore
                  </span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="animate-bounce-sm"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 6l4 4 4-4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ color: "var(--text-4)" }}
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video modal */}
      <VideoModal
        open={modalOpen}
        onClose={closeModal}
        src={HOMINODE_DEMO_VIDEO}
      >
        <ProductDemoPlayer
          onCTA={() => {
            closeModal();
            onContact();
          }}
        />
      </VideoModal>
    </>
  );
}
