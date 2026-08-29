/**
 * ProductDemoPlayer — Interactive animated demo replacing a real MP4.
 * Renders 17 scenes with transitions, mockups, stats, and workflow animations.
 * Designed so a real MP4 can replace it by setting HOMINODE_DEMO_VIDEO in videoConfig.ts.
 */

import { useState, useEffect, useRef, useCallback } from "react";

/* ─── scene list ──────────────────────────────────────────────────── */
const SCENES = [
  { id: 1,  title: "Intro",            duration: 5  },
  { id: 2,  title: "Dashboard",        duration: 10 },
  { id: 3,  title: "Resident App",     duration: 12 },
  { id: 4,  title: "Visitor Flow",     duration: 13 },
  { id: 5,  title: "Security",         duration: 12 },
  { id: 6,  title: "Maintenance",      duration: 12 },
  { id: 7,  title: "Amenities",        duration: 11 },
  { id: 8,  title: "Parking",          duration: 12 },
  { id: 9,  title: "Community",        duration: 12 },
  { id: 10, title: "Marketplace",      duration: 11 },
  { id: 11, title: "Complaints",       duration: 11 },
  { id: 12, title: "Staff",            duration: 11 },
  { id: 13, title: "Admin Control",    duration: 13 },
  { id: 14, title: "Real-time",        duration: 10 },
  { id: 15, title: "Security Layer",   duration: 10 },
  { id: 16, title: "White Label",      duration: 10 },
  { id: 17, title: "Final",            duration:  5 },
] as const;

/* ─── small helper components ─────────────────────────────────────── */
function SceneWrap({ children, bg = "#060D1F" }: { children: React.ReactNode; bg?: string }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden p-4 sm:p-8"
      style={{ background: bg }}>
      {children}
    </div>
  );
}

function SceneLabel({ text }: { text: string }) {
  return (
    <div className="absolute bottom-6 left-0 right-0 text-center px-4">
      <p className="text-base sm:text-lg font-semibold text-white/80" style={{ fontFamily: "Instrument Sans, sans-serif" }}>
        {text}
      </p>
    </div>
  );
}

function WorkflowStep({ icon, text, active, done }: { icon: string; text: string; active: boolean; done: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-sm transition-all duration-300"
        style={{
          background: done ? "#059669" : active ? "#2563EB" : "rgba(255,255,255,0.06)",
          border: `1.5px solid ${done ? "#059669" : active ? "#2563EB" : "rgba(255,255,255,0.15)"}`,
          transform: active ? "scale(1.1)" : "scale(1)",
        }}>
        {done ? "✓" : icon}
      </div>
      <span className="text-xs font-medium transition-colors duration-300"
        style={{ color: done ? "#10B981" : active ? "#60A5FA" : "rgba(255,255,255,0.4)" }}>
        {text}
      </span>
    </div>
  );
}

/* ─── individual scenes ──────────────────────────────────────────── */

function Scene01({ tick }: { tick: number }) {
  return (
    <SceneWrap bg="linear-gradient(135deg, #030812 0%, #060D1F 50%, #0A1628 100%)">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(37,99,235,0.18) 0%, transparent 70%)" }} />
      <div className="flex flex-col items-center gap-6" style={{ opacity: tick > 0 ? 1 : 0, transition: "opacity 0.8s ease" }}>
        {/* Logo mark */}
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{ background: "linear-gradient(135deg,#2563EB,#6366F1)", boxShadow: "0 0 40px rgba(37,99,235,0.5)" }}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <circle cx="16" cy="16" r="5" fill="white"/>
            <circle cx="16" cy="4" r="2.5" fill="white" opacity="0.7"/>
            <circle cx="16" cy="28" r="2.5" fill="white" opacity="0.7"/>
            <circle cx="4" cy="16" r="2.5" fill="white" opacity="0.7"/>
            <circle cx="28" cy="16" r="2.5" fill="white" opacity="0.7"/>
            <circle cx="7" cy="7" r="2" fill="white" opacity="0.4"/>
            <circle cx="25" cy="7" r="2" fill="white" opacity="0.4"/>
            <circle cx="7" cy="25" r="2" fill="white" opacity="0.4"/>
            <circle cx="25" cy="25" r="2" fill="white" opacity="0.4"/>
          </svg>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight" style={{ fontFamily: "Instrument Sans, sans-serif" }}>
          HOMINODE
        </h1>
        <p className="text-lg sm:text-2xl font-medium"
          style={{ color: "rgba(255,255,255,0.6)", opacity: tick > 1 ? 1 : 0, transition: "opacity 1s ease 0.5s" }}>
          Connect. Manage. Live.
        </p>
        <p className="text-sm text-center max-w-xs"
          style={{ color: "rgba(255,255,255,0.4)", opacity: tick > 2 ? 1 : 0, transition: "opacity 1s ease 1s" }}>
          Smart community management, all in one place.
        </p>
      </div>
    </SceneWrap>
  );
}

function Scene02({ tick }: { tick: number }) {
  const stats = [
    { icon: "🏢", label: "Buildings",   value: "12",       color: "#2563EB" },
    { icon: "🏠", label: "Flats",       value: "480",      color: "#6366F1" },
    { icon: "👤", label: "Residents",   value: "1,240",    color: "#7C3AED" },
    { icon: "🚗", label: "Visitors",    value: "38",       color: "#059669" },
    { icon: "💳", label: "Collection",  value: "₹4.8L",    color: "#D97706" },
    { icon: "🔧", label: "Complaints",  value: "14",       color: "#DC2626" },
    { icon: "🅿️", label: "Parking %",  value: "72%",      color: "#4F46E5" },
    { icon: "🏊", label: "Bookings",    value: "22",       color: "#DB2777" },
  ];
  return (
    <SceneWrap bg="linear-gradient(160deg,#050B1A 0%,#08122A 100%)">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 50% 35% at 50% 20%, rgba(37,99,235,0.12) 0%, transparent 70%)" }} />
      {/* Browser chrome */}
      <div className="w-full max-w-lg rounded-xl overflow-hidden"
        style={{ border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
        <div className="flex items-center gap-2 px-3 py-2 border-b"
          style={{ background: "#0C1530", borderColor: "rgba(255,255,255,0.06)" }}>
          <div className="flex gap-1"><div className="w-2.5 h-2.5 rounded-full bg-red-400/60"/><div className="w-2.5 h-2.5 rounded-full bg-amber-400/60"/><div className="w-2.5 h-2.5 rounded-full bg-emerald-400/60"/></div>
          <div className="flex-1 mx-2 h-4 rounded flex items-center px-2" style={{ background: "rgba(255,255,255,0.04)" }}>
            <span className="text-[9px] text-white/30 font-mono">app.hominode.com/dashboard</span>
          </div>
          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full" style={{ background: "rgba(5,150,105,0.2)", border: "1px solid rgba(5,150,105,0.3)" }}>
            <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse"/>
            <span className="text-[8px] text-emerald-400">Live</span>
          </div>
        </div>
        <div className="p-4" style={{ background: "#080F22" }}>
          <p className="text-xs font-semibold text-white/40 mb-3">Overview — Sunrise Residency</p>
          <div className="grid grid-cols-4 gap-2">
            {stats.map((s, i) => (
              <div key={s.label}
                className="rounded-lg p-2.5 text-center transition-all duration-500"
                style={{
                  background: `${s.color}12`,
                  border: `1px solid ${s.color}25`,
                  opacity: tick > i * 0.5 ? 1 : 0,
                  transform: tick > i * 0.5 ? "translateY(0)" : "translateY(8px)",
                  transition: `opacity 0.4s ease ${i * 0.12}s, transform 0.4s ease ${i * 0.12}s`,
                }}>
                <div className="text-lg mb-0.5">{s.icon}</div>
                <div className="text-sm font-bold" style={{ color: s.color, fontFamily: "JetBrains Mono, monospace" }}>{s.value}</div>
                <div className="text-[8px] text-white/40 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <SceneLabel text="One intelligent dashboard for your entire community." />
    </SceneWrap>
  );
}

function Scene03({ tick }: { tick: number }) {
  const tabs = ["🏠 Home","🚗 Visitors","💳 Bills","🏊 Amenities","🅿️ Parking","💬 Messages","📢 Community","🛒 Market","🔧 Complaints","👤 Profile"];
  const activeTab = Math.min(Math.floor(tick * 0.7), tabs.length - 1);
  return (
    <SceneWrap bg="linear-gradient(160deg,#050B1A 0%,#0A0F28 100%)">
      {/* Phone */}
      <div className="relative" style={{ filter: "drop-shadow(0 20px 40px rgba(37,99,235,0.2))" }}>
        <div className="w-44 rounded-[28px] overflow-hidden" style={{ background: "#0C1530", border: "2px solid rgba(255,255,255,0.1)" }}>
          {/* Status bar */}
          <div className="flex justify-between items-center px-4 pt-3 pb-1" style={{ background: "#111D3D" }}>
            <span className="text-[8px] text-white/50">9:41</span>
            <div className="w-10 h-3 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}/>
            <span className="text-[8px] text-white/50">●●●</span>
          </div>
          {/* App header */}
          <div className="px-3 py-2 border-b" style={{ background: "#111D3D", borderColor: "rgba(255,255,255,0.06)" }}>
            <p className="text-[8px] text-white/40">Good morning,</p>
            <p className="text-[11px] font-bold text-white" style={{ fontFamily: "Instrument Sans,sans-serif" }}>Priya Sharma</p>
          </div>
          {/* Tabs grid */}
          <div className="p-2" style={{ background: "#080F22" }}>
            <div className="grid grid-cols-5 gap-1">
              {tabs.map((t, i) => (
                <div key={t} className="flex flex-col items-center p-1.5 rounded-lg text-center transition-all duration-300"
                  style={{
                    background: i === activeTab ? "rgba(37,99,235,0.25)" : "rgba(255,255,255,0.04)",
                    border: i === activeTab ? "1px solid rgba(37,99,235,0.5)" : "1px solid transparent",
                    transform: i === activeTab ? "scale(1.05)" : "scale(1)",
                  }}>
                  <span className="text-sm leading-none">{t.split(" ")[0]}</span>
                  <span className="text-[6px] text-white/40 mt-0.5 leading-tight">{t.split(" ").slice(1).join(" ")}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Bottom nav */}
          <div className="flex justify-around items-center py-2 border-t" style={{ background: "#111D3D", borderColor: "rgba(255,255,255,0.06)" }}>
            {["🏠","🔔","💬","👤"].map((ic, i) => (
              <div key={i} className="p-1 rounded-lg" style={{ background: i === 0 ? "rgba(37,99,235,0.25)" : "transparent" }}>
                <span className="text-sm">{ic}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-center py-1.5" style={{ background: "#111D3D" }}>
            <div className="w-12 h-0.5 rounded-full bg-white/10"/>
          </div>
        </div>
      </div>
      <SceneLabel text="Everything residents need, right from their phone." />
    </SceneWrap>
  );
}

function Scene04({ tick }: { tick: number }) {
  const steps = [
    { icon: "📤", text: "Visitor Request" },
    { icon: "✅", text: "Resident Approval" },
    { icon: "📱", text: "QR Generated" },
    { icon: "🔍", text: "Security Scan" },
    { icon: "✓",  text: "Visitor Verified" },
    { icon: "🔓", text: "Mark In" },
    { icon: "🔒", text: "Mark Exit" },
  ];
  const active = Math.min(Math.floor(tick * 0.7), steps.length - 1);
  return (
    <SceneWrap bg="linear-gradient(160deg,#050B1A 0%,#06101E 100%)">
      <div className="w-full max-w-xs space-y-2">
        <div className="text-center mb-4">
          <p className="text-[10px] font-semibold tracking-wider text-white/40 uppercase">Visitor Management</p>
          <div className="mt-2 p-3 rounded-xl" style={{ background: "rgba(37,99,235,0.1)", border: "1px solid rgba(37,99,235,0.2)" }}>
            <p className="text-xs font-semibold text-white/80">Rajan Mehta • 98XXXXXXXX</p>
            <p className="text-[9px] text-white/40">Purpose: Family Visit · Flat B-204 · 2:00 PM</p>
          </div>
        </div>
        {steps.map((s, i) => (
          <WorkflowStep key={s.text} icon={s.icon} text={s.text} active={i === active} done={i < active} />
        ))}
      </div>
      <SceneLabel text="Secure visitor management from invitation to exit." />
    </SceneWrap>
  );
}

function Scene05({ tick }: { tick: number }) {
  const features = ["QR Scanner","Visitor Verification","Inside Visitors","Entry / Exit","Staff Attendance","Tasks","Complaints","SOS","Emergency Alerts"];
  return (
    <SceneWrap bg="linear-gradient(160deg,#050B1A 0%,#08102A 100%)">
      <div className="w-full max-w-sm">
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3"
            style={{ background: "rgba(220,38,38,0.15)", border: "1px solid rgba(220,38,38,0.3)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"/>
            <span className="text-[10px] font-semibold text-red-400">Security Active</span>
          </div>
          <p className="text-lg font-bold text-white" style={{ fontFamily: "Instrument Sans,sans-serif" }}>Security App</p>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {features.map((f, i) => (
            <div key={f} className="rounded-xl p-2.5 text-center transition-all duration-400"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                opacity: tick > i * 0.4 ? 1 : 0,
                transform: tick > i * 0.4 ? "scale(1)" : "scale(0.9)",
                transition: `all 0.35s ease ${i * 0.1}s`,
              }}>
              <p className="text-[9px] font-medium text-white/70">{f}</p>
            </div>
          ))}
        </div>
      </div>
      <SceneLabel text="Give your security team the tools they need." />
    </SceneWrap>
  );
}

function Scene06({ tick }: { tick: number }) {
  const workflow = [
    { icon: "📄", text: "Bill Generated" },
    { icon: "🔔", text: "Resident Notified" },
    { icon: "💳", text: "Payment" },
    { icon: "🧾", text: "Receipt Generated" },
  ];
  const active = Math.min(Math.floor(tick * 0.5), workflow.length - 1);
  return (
    <SceneWrap bg="linear-gradient(160deg,#050B1A 0%,#08122A 100%)">
      <div className="w-full max-w-xs">
        <div className="rounded-xl p-4 mb-4" style={{ background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.2)" }}>
          <div className="flex justify-between items-center mb-3">
            <p className="text-xs font-semibold text-white/70">August Maintenance Bill</p>
            <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold" style={{ background: "rgba(217,119,6,0.2)", color: "#F59E0B", border: "1px solid rgba(217,119,6,0.3)" }}>Pending</span>
          </div>
          {[
            { l: "Monthly Maintenance", v: "₹2,500" },
            { l: "Water Charges",       v: "₹800"   },
            { l: "Sinking Fund",        v: "₹200"   },
          ].map(r => (
            <div key={r.l} className="flex justify-between text-[9px] py-1 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <span className="text-white/50">{r.l}</span>
              <span className="text-white/80 font-mono">{r.v}</span>
            </div>
          ))}
          <div className="flex justify-between text-xs font-bold pt-2">
            <span className="text-white/70">Total Due</span>
            <span style={{ color: "#F59E0B" }}>₹3,500</span>
          </div>
        </div>
        <div className="space-y-2">
          {workflow.map((s, i) => (
            <WorkflowStep key={s.text} icon={s.icon} text={s.text} active={i === active} done={i < active} />
          ))}
        </div>
      </div>
      <SceneLabel text="Make maintenance and community payments simple." />
    </SceneWrap>
  );
}

function Scene07({ tick }: { tick: number }) {
  const amenities = [
    { icon: "🏊", name: "Swimming Pool",  slots: "8 / 30", color: "#0EA5E9" },
    { icon: "💪", name: "Gym",           slots: "18 / 30", color: "#7C3AED" },
    { icon: "🎾", name: "Sports Court",  slots: "4 / 6",   color: "#059669" },
    { icon: "🎉", name: "Community Hall",slots: "1 / 2",   color: "#D97706" },
  ];
  const selected = Math.min(Math.floor(tick * 0.4), amenities.length - 1);
  const confirmed = tick > 8;
  return (
    <SceneWrap bg="linear-gradient(160deg,#050B1A 0%,#08112A 100%)">
      <div className="w-full max-w-xs">
        <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Amenity Booking</p>
        <div className="grid grid-cols-2 gap-2 mb-3">
          {amenities.map((a, i) => (
            <div key={a.name} className="rounded-xl p-2.5 transition-all duration-300"
              style={{
                background: i === selected ? `${a.color}18` : "rgba(255,255,255,0.03)",
                border: `1px solid ${i === selected ? a.color + "40" : "rgba(255,255,255,0.07)"}`,
                transform: i === selected ? "scale(1.03)" : "scale(1)",
              }}>
              <span className="text-xl">{a.icon}</span>
              <p className="text-[9px] font-medium text-white/70 mt-1">{a.name}</p>
              <p className="text-[8px] mt-0.5" style={{ color: i === selected ? a.color : "rgba(255,255,255,0.3)" }}>{a.slots} spots</p>
            </div>
          ))}
        </div>
        <div className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <p className="text-[9px] text-white/50 mb-2">Select Time Slot</p>
          {["8:00 AM – 9:00 AM","9:00 AM – 10:00 AM","5:00 PM – 6:00 PM"].map((slot, i) => (
            <div key={slot} className="flex justify-between items-center py-1.5 rounded-lg px-2 mb-1 text-[9px]"
              style={{ background: i === 0 ? "rgba(37,99,235,0.2)" : "transparent", border: i === 0 ? "1px solid rgba(37,99,235,0.3)" : "1px solid transparent" }}>
              <span style={{ color: i === 0 ? "#60A5FA" : "rgba(255,255,255,0.4)" }}>{slot}</span>
              <span style={{ color: "rgba(255,255,255,0.3)" }}>{["18 / 30","30 / 30","5 / 30"][i]}</span>
            </div>
          ))}
        </div>
        {confirmed && (
          <div className="mt-3 rounded-xl p-3 text-center" style={{ background: "rgba(5,150,105,0.15)", border: "1px solid rgba(5,150,105,0.3)", animation: "fadeInUp 0.4s ease" }}>
            <p className="text-xs font-bold text-emerald-400">✓ Booking Confirmed</p>
            <p className="text-[9px] text-white/50 mt-0.5">Swimming Pool · 8:00–9:00 AM · Tomorrow</p>
          </div>
        )}
      </div>
      <SceneLabel text="Smart amenity booking without conflicts." />
    </SceneWrap>
  );
}

function Scene08({ tick }: { tick: number }) {
  const parkingSlots = Array.from({ length: 24 }, (_, i) => ({
    id: i + 1,
    occupied: [1,3,4,5,8,10,11,12,14,15,17,18,19,21,22,23].includes(i + 1),
    highlight: i + 1 === 7,
  }));
  return (
    <SceneWrap bg="linear-gradient(160deg,#050B1A 0%,#080E22 100%)">
      <div className="w-full max-w-xs">
        <div className="flex gap-3 mb-4">
          {[
            { l: "Total", v: "24",  c: "#6366F1" },
            { l: "Occupied", v: "16", c: "#DC2626" },
            { l: "Available", v: "8", c: "#059669" },
          ].map(s => (
            <div key={s.l} className="flex-1 rounded-xl p-2.5 text-center"
              style={{ background: `${s.c}12`, border: `1px solid ${s.c}25` }}>
              <p className="text-sm font-bold" style={{ color: s.c, fontFamily: "JetBrains Mono,monospace" }}>{s.v}</p>
              <p className="text-[8px] text-white/40 mt-0.5">{s.l}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-8 gap-1 mb-4">
          {parkingSlots.map(slot => (
            <div key={slot.id} className="rounded aspect-square flex items-center justify-center text-[7px] font-mono transition-all duration-300"
              style={{
                background: slot.highlight
                  ? tick > 4 ? "rgba(37,99,235,0.6)" : "rgba(37,99,235,0.15)"
                  : slot.occupied ? "rgba(220,38,38,0.25)" : "rgba(5,150,105,0.2)",
                border: slot.highlight ? "1px solid #2563EB" : slot.occupied ? "1px solid rgba(220,38,38,0.3)" : "1px solid rgba(5,150,105,0.25)",
                color: slot.occupied ? "#f87171" : "#4ADE80",
                transform: slot.highlight && tick > 4 ? "scale(1.2)" : "scale(1)",
              }}>
              {slot.id}
            </div>
          ))}
        </div>
        <div className="rounded-xl p-3" style={{ background: "rgba(37,99,235,0.1)", border: "1px solid rgba(37,99,235,0.2)" }}>
          <p className="text-[9px] font-semibold text-white/70 mb-1">Slot B-07 — Assigned Vehicle</p>
          <div className="flex justify-between text-[9px]">
            <span className="text-white/40">Honda City · MH 04 AB 1234</span>
            <span className="text-blue-400">B-204</span>
          </div>
        </div>
      </div>
      <SceneLabel text="Know exactly who is parked where." />
    </SceneWrap>
  );
}

function Scene09({ tick }: { tick: number }) {
  const notifications = [
    { icon: "📢", title: "Water Supply Off", desc: "Sunday 10 AM – 2 PM", t: 0, c: "#DB2777" },
    { icon: "🎉", title: "Diwali Event",     desc: "Oct 20 · Community Hall", t: 2, c: "#D97706" },
    { icon: "💬", title: "New Message",      desc: "From Flat A-101", t: 4, c: "#2563EB" },
    { icon: "✅", title: "Complaint Resolved", desc: "Water leakage — Fixed", t: 6, c: "#059669" },
  ];
  return (
    <SceneWrap bg="linear-gradient(160deg,#050B1A 0%,#080F22 100%)">
      <div className="w-full max-w-xs">
        <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Community Feed</p>
        <div className="space-y-2">
          {notifications.map((n) => (
            <div key={n.title} className="flex items-start gap-3 rounded-xl p-3 transition-all duration-500"
              style={{
                background: `${n.c}10`,
                border: `1px solid ${n.c}25`,
                opacity: tick > n.t ? 1 : 0,
                transform: tick > n.t ? "translateX(0)" : "translateX(-16px)",
                transition: `all 0.5s ease ${n.t * 0.1}s`,
              }}>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                style={{ background: `${n.c}18`, border: `1px solid ${n.c}30` }}>
                {n.icon}
              </div>
              <div>
                <p className="text-[10px] font-semibold text-white/80">{n.title}</p>
                <p className="text-[9px] text-white/40">{n.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <SceneLabel text="Keep your community connected." />
    </SceneWrap>
  );
}

function Scene10({ tick }: { tick: number }) {
  const listed = tick > 5;
  return (
    <SceneWrap bg="linear-gradient(160deg,#050B1A 0%,#080F22 100%)">
      <div className="w-full max-w-xs">
        <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Resident Marketplace</p>
        <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="p-3" style={{ background: "rgba(255,255,255,0.04)" }}>
            <div className="flex gap-3">
              <div className="w-14 h-14 rounded-lg flex-shrink-0 flex items-center justify-center text-2xl"
                style={{ background: "rgba(37,99,235,0.15)", border: "1px solid rgba(37,99,235,0.2)" }}>🪑</div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-white/80">Wooden Chair — Good Condition</p>
                <p className="text-sm font-bold mt-0.5" style={{ color: "#60A5FA" }}>₹800</p>
                <p className="text-[9px] text-white/40 mt-0.5">Flat A-204 · Posted 2h ago</p>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <button className="flex-1 py-1.5 rounded-lg text-[10px] font-semibold" style={{ background: "rgba(37,99,235,0.2)", color: "#60A5FA", border: "1px solid rgba(37,99,235,0.3)" }}>💬 Chat</button>
              <button className="flex-1 py-1.5 rounded-lg text-[10px] font-semibold" style={{ background: "rgba(5,150,105,0.2)", color: "#10B981", border: "1px solid rgba(5,150,105,0.3)" }}>❤️ Interested</button>
            </div>
          </div>
          {listed && (
            <div className="p-2.5 border-t" style={{ background: "rgba(5,150,105,0.08)", borderColor: "rgba(5,150,105,0.2)" }}>
              <p className="text-[9px] font-semibold text-emerald-400">✓ Listing Active · 4 interested buyers</p>
            </div>
          )}
        </div>
        <div className="mt-2 flex gap-2">
          {["Furniture","Electronics","Books","Plants"].map(c => (
            <span key={c} className="px-2 py-1 rounded-full text-[9px] font-medium" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.08)" }}>{c}</span>
          ))}
        </div>
      </div>
      <SceneLabel text="Create a trusted marketplace within your community." />
    </SceneWrap>
  );
}

function Scene11({ tick }: { tick: number }) {
  const steps = [
    { icon: "📝", text: "Complaint Created",   status: "created"  },
    { icon: "👤", text: "Admin Assigned",       status: "assigned" },
    { icon: "👷", text: "Staff Assigned",        status: "staff"    },
    { icon: "⚙️", text: "In Progress",          status: "progress" },
    { icon: "✅", text: "Resolved",             status: "resolved" },
    { icon: "🔔", text: "Resident Notified",    status: "notified" },
  ];
  const active = Math.min(Math.floor(tick * 0.65), steps.length - 1);
  return (
    <SceneWrap bg="linear-gradient(160deg,#050B1A 0%,#080F22 100%)">
      <div className="w-full max-w-xs">
        <div className="rounded-xl p-3 mb-4" style={{ background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.2)" }}>
          <div className="flex justify-between items-start mb-1">
            <p className="text-xs font-semibold text-white/80">Water leakage in Block A</p>
            <span className="px-1.5 py-0.5 rounded text-[8px] font-semibold" style={{ background: "rgba(220,38,38,0.2)", color: "#F87171" }}>Open</span>
          </div>
          <p className="text-[9px] text-white/40">Flat A-204 · Reported 1h ago · Plumbing</p>
        </div>
        <div className="space-y-2">
          {steps.map((s, i) => (
            <WorkflowStep key={s.text} icon={s.icon} text={s.text} active={i === active} done={i < active} />
          ))}
        </div>
      </div>
      <SceneLabel text="Track every issue from request to resolution." />
    </SceneWrap>
  );
}

function Scene12({ tick }: { tick: number }) {
  const staff = [
    { name: "Ramesh K", role: "Housekeeping", status: "On duty", avatar: "RK", c: "#059669" },
    { name: "Suresh P", role: "Security",      status: "On duty", avatar: "SP", c: "#2563EB" },
    { name: "Meena R",  role: "Admin Staff",   status: "On duty", avatar: "MR", c: "#7C3AED" },
    { name: "Raj M",    role: "Maintenance",   status: "Off duty", avatar: "RM", c: "#D97706" },
  ];
  return (
    <SceneWrap bg="linear-gradient(160deg,#050B1A 0%,#08102A 100%)">
      <div className="w-full max-w-xs">
        <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Staff Dashboard</p>
        <div className="space-y-2">
          {staff.map((s, i) => (
            <div key={s.name} className="flex items-center gap-3 rounded-xl p-2.5 transition-all duration-500"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                opacity: tick > i * 0.7 ? 1 : 0,
                transform: tick > i * 0.7 ? "translateY(0)" : "translateY(8px)",
                transition: `all 0.4s ease ${i * 0.15}s`,
              }}>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0"
                style={{ background: `linear-gradient(135deg, ${s.c}, ${s.c}99)` }}>
                {s.avatar}
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-semibold text-white/80">{s.name}</p>
                <p className="text-[8px] text-white/40">{s.role}</p>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[8px] font-semibold"
                style={{
                  background: s.status === "On duty" ? "rgba(5,150,105,0.2)" : "rgba(255,255,255,0.06)",
                  color: s.status === "On duty" ? "#10B981" : "rgba(255,255,255,0.3)",
                }}>
                {s.status}
              </span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2 mt-3">
          {[{ l:"Tasks", v:"24" },{ l:"Present", v:"12" },{ l:"QR Scans", v:"8" }].map(s => (
            <div key={s.l} className="rounded-lg p-2 text-center" style={{ background: "rgba(37,99,235,0.1)", border: "1px solid rgba(37,99,235,0.2)" }}>
              <p className="text-xs font-bold" style={{ color: "#60A5FA", fontFamily: "JetBrains Mono,monospace" }}>{s.v}</p>
              <p className="text-[8px] text-white/40">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
      <SceneLabel text="Coordinate your community staff effortlessly." />
    </SceneWrap>
  );
}

function Scene13({ tick }: { tick: number }) {
  const modules = ["Buildings","Flats","Residents","Staff","Security","Amenities","Parking","Visitors","Maintenance","Complaints","Announcements","Posters","Marketplace","Messages","Settings"];
  return (
    <SceneWrap bg="linear-gradient(160deg,#050B1A 0%,#08122A 100%)">
      <div className="w-full max-w-sm">
        <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3 text-center">Admin Control Panel</p>
        <div className="flex flex-wrap gap-1.5 justify-center">
          {modules.map((m, i) => (
            <span key={m} className="px-2.5 py-1.5 rounded-xl text-[10px] font-medium transition-all duration-400"
              style={{
                background: tick > i * 0.4 ? "rgba(37,99,235,0.18)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${tick > i * 0.4 ? "rgba(37,99,235,0.35)" : "rgba(255,255,255,0.06)"}`,
                color: tick > i * 0.4 ? "#60A5FA" : "rgba(255,255,255,0.2)",
                opacity: tick > i * 0.3 ? 1 : 0,
                transform: tick > i * 0.3 ? "scale(1)" : "scale(0.85)",
                transition: `all 0.35s ease ${i * 0.08}s`,
              }}>
              {m}
            </span>
          ))}
        </div>
      </div>
      <SceneLabel text="Complete control. One platform." />
    </SceneWrap>
  );
}

function Scene14({ tick }: { tick: number }) {
  const nodes = [
    { label: "Residents",   angle: 0,   color: "#2563EB" },
    { label: "Admin",       angle: 45,  color: "#7C3AED" },
    { label: "Security",    angle: 90,  color: "#DC2626" },
    { label: "Staff",       angle: 135, color: "#D97706" },
    { label: "Visitors",    angle: 180, color: "#059669" },
    { label: "Buildings",   angle: 225, color: "#0EA5E9" },
    { label: "Amenities",   angle: 270, color: "#DB2777" },
    { label: "Parking",     angle: 315, color: "#4F46E5" },
  ];
  const r = 90;
  return (
    <SceneWrap bg="linear-gradient(160deg,#050B1A 0%,#08112A 100%)">
      <div className="relative" style={{ width: 260, height: 260 }}>
        {/* Center */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full flex items-center justify-center z-10"
          style={{ background: "linear-gradient(135deg,#2563EB,#6366F1)", boxShadow: "0 0 30px rgba(37,99,235,0.5)" }}>
          <span className="text-[9px] font-bold text-white text-center leading-tight" style={{ fontFamily: "Instrument Sans,sans-serif" }}>HOMI<br/>NODE</span>
        </div>
        {nodes.map((n, i) => {
          const rad = (n.angle * Math.PI) / 180;
          const x = 130 + r * Math.sin(rad);
          const y = 130 - r * Math.cos(rad);
          return (
            <div key={n.label}>
              {/* Line */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
                <line
                  x1="130" y1="130" x2={x} y2={y}
                  stroke={n.color}
                  strokeWidth="1"
                  strokeDasharray="4 3"
                  opacity={tick > i * 0.4 ? 0.4 : 0}
                  style={{ transition: `opacity 0.5s ease ${i * 0.1}s` }}
                />
              </svg>
              {/* Node */}
              <div className="absolute flex flex-col items-center gap-0.5 transition-all duration-500"
                style={{
                  left: x - 20, top: y - 20,
                  opacity: tick > i * 0.4 ? 1 : 0,
                  transform: tick > i * 0.4 ? "scale(1)" : "scale(0.5)",
                  transition: `all 0.4s ease ${i * 0.12}s`,
                }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-[8px] font-bold text-white"
                  style={{ background: `${n.color}30`, border: `1.5px solid ${n.color}60` }}>
                  <span style={{ color: n.color, fontSize: 8 }}>{n.label[0]}</span>
                </div>
                <span className="text-[7px] font-medium whitespace-nowrap" style={{ color: "rgba(255,255,255,0.5)" }}>{n.label}</span>
              </div>
            </div>
          );
        })}
      </div>
      <SceneLabel text="Everything stays connected in real time." />
    </SceneWrap>
  );
}

function Scene15({ tick }: { tick: number }) {
  const layers = [
    { label: "Role-based access control", icon: "🔐", c: "#2563EB" },
    { label: "Building-level permissions", icon: "🏢", c: "#7C3AED" },
    { label: "Secure authentication",      icon: "🛡️", c: "#059669" },
    { label: "Controlled permissions",     icon: "⚙️", c: "#D97706" },
    { label: "Real-time validation",       icon: "✓",  c: "#0EA5E9" },
    { label: "Activity tracking",          icon: "📋", c: "#DB2777" },
  ];
  return (
    <SceneWrap bg="linear-gradient(160deg,#050B1A 0%,#06101E 100%)">
      <div className="w-full max-w-xs space-y-2">
        <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Security Architecture</p>
        {layers.map((l, i) => (
          <div key={l.label} className="flex items-center gap-3 rounded-xl p-3 transition-all duration-500"
            style={{
              background: `${l.c}10`,
              border: `1px solid ${l.c}25`,
              opacity: tick > i * 0.5 ? 1 : 0,
              transform: tick > i * 0.5 ? "translateX(0)" : "translateX(-12px)",
              transition: `all 0.4s ease ${i * 0.12}s`,
            }}>
            <span className="text-lg">{l.icon}</span>
            <p className="text-[10px] font-medium text-white/70">{l.label}</p>
            {tick > i * 0.5 + 2 && (
              <div className="ml-auto px-1.5 py-0.5 rounded text-[8px] font-semibold" style={{ background: `${l.c}20`, color: l.c }}>Active</div>
            )}
          </div>
        ))}
      </div>
      <SceneLabel text="Built with security at every layer." />
    </SceneWrap>
  );
}

function Scene16({ tick }: { tick: number }) {
  const brands = [
    { name: "Sunrise Residency", color: "#2563EB", logo: "SR" },
    { name: "Green Valley",      color: "#059669", logo: "GV" },
    { name: "SkyView Towers",    color: "#7C3AED", logo: "SV" },
  ];
  const brand = brands[Math.min(Math.floor(tick / 3), brands.length - 1)];
  return (
    <SceneWrap bg="linear-gradient(160deg,#050B1A 0%,#080F22 100%)">
      <div className="w-full max-w-xs">
        <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">White Label Platform</p>
        <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 16px 40px rgba(0,0,0,0.4)" }}>
          {/* Customized header */}
          <div className="flex items-center gap-2 px-3 py-2.5 border-b transition-all duration-700"
            style={{ background: `${brand.color}18`, borderColor: `${brand.color}20` }}>
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold text-white transition-all duration-500"
              style={{ background: `linear-gradient(135deg, ${brand.color}, ${brand.color}aa)` }}>
              {brand.logo}
            </div>
            <span className="text-sm font-bold text-white/90 transition-all duration-500" style={{ fontFamily: "Instrument Sans,sans-serif" }}>
              {brand.name}
            </span>
          </div>
          <div className="p-3 space-y-2" style={{ background: "#080F22" }}>
            {["Dashboard","Residents","Visitors","Settings"].map(item => (
              <div key={item} className="flex items-center gap-2 px-2 py-1.5 rounded-lg" style={{ background: "rgba(255,255,255,0.04)" }}>
                <div className="w-1.5 h-1.5 rounded-full transition-colors duration-500" style={{ background: brand.color }}/>
                <span className="text-[10px] text-white/60">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-center text-[9px] text-white/30 mt-3">Powered by Hominode platform</p>
      </div>
      <SceneLabel text="Your brand. Your community. Your platform." />
    </SceneWrap>
  );
}

function Scene17({ tick, onCTA }: { tick: number; onCTA?: () => void }) {
  return (
    <SceneWrap bg="linear-gradient(135deg, #030812 0%, #060D1F 50%, #0A1628 100%)">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(37,99,235,0.2) 0%, transparent 70%)" }} />
      <div className="flex flex-col items-center gap-5 text-center"
        style={{ opacity: tick > 0 ? 1 : 0, transition: "opacity 1s ease" }}>
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
          style={{ background: "linear-gradient(135deg,#2563EB,#6366F1)", boxShadow: "0 0 40px rgba(37,99,235,0.5)" }}>
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <circle cx="16" cy="16" r="5" fill="white"/>
            <circle cx="16" cy="4" r="2.5" fill="white" opacity="0.7"/>
            <circle cx="16" cy="28" r="2.5" fill="white" opacity="0.7"/>
            <circle cx="4" cy="16" r="2.5" fill="white" opacity="0.7"/>
            <circle cx="28" cy="16" r="2.5" fill="white" opacity="0.7"/>
          </svg>
        </div>
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white" style={{ fontFamily: "Instrument Sans,sans-serif" }}>HOMINODE</h2>
          <p className="text-white/50 mt-1 text-sm">Connect. Manage. Live.</p>
        </div>
        <p className="text-lg font-semibold text-white/80" style={{ opacity: tick > 1 ? 1 : 0, transition: "opacity 0.8s ease 0.5s" }}>
          Build a smarter community today.
        </p>
        <button
          onClick={onCTA}
          className="px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          style={{
            background: "linear-gradient(135deg,#2563EB,#1D4ED8)",
            boxShadow: "0 8px 24px rgba(37,99,235,0.4)",
            opacity: tick > 2 ? 1 : 0,
            transition: "opacity 0.8s ease 1.2s, transform 0.2s ease",
          }}>
          Book a Demo →
        </button>
      </div>
    </SceneWrap>
  );
}

/* ─── ProductDemoPlayer ───────────────────────────────────────────── */
export interface ProductDemoPlayerProps {
  onCTA?: () => void;
  /** Jump directly to a scene (1-based) */
  jumpToScene?: number;
}

export default function ProductDemoPlayer({ onCTA, jumpToScene }: ProductDemoPlayerProps) {
  const [sceneIdx, setSceneIdx]   = useState(0);
  const [tick, setTick]       = useState(0);
  const [playing, setPlaying] = useState(true);
  const intervalRef           = useRef<ReturnType<typeof setInterval> | null>(null);
  const sceneDuration         = SCENES[sceneIdx].duration;

  /* total duration sum */
  const TOTAL = SCENES.reduce((a, sc) => a + sc.duration, 0);
  const cumulativeStart = SCENES.slice(0, sceneIdx).reduce((a, sc) => a + sc.duration, 0);

  /* timer */
  useEffect(() => {
    if (!playing) return;
    intervalRef.current = setInterval(() => {
      setTick(t => t + 0.5);
    }, 500);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [playing, sceneIdx]);

  /* advance scene */
  useEffect(() => {
    if (tick >= sceneDuration) {
      if (sceneIdx < SCENES.length - 1) {
        setSceneIdx(i => i + 1);
        setTick(0);
      } else {
        setPlaying(false);
      }
    }
  }, [tick, sceneDuration, sceneIdx]);

  /* external jump */
  useEffect(() => {
    if (jumpToScene !== undefined) {
      const idx = Math.max(0, Math.min(jumpToScene - 1, SCENES.length - 1));
      setSceneIdx(idx);
      setTick(0);
      setPlaying(true);
    }
  }, [jumpToScene]);

  const goToScene = useCallback((idx: number) => {
    setSceneIdx(idx);
    setTick(0);
    setPlaying(true);
  }, []);

  const togglePlay = useCallback(() => setPlaying(p => !p), []);

  const progressPct = TOTAL > 0 ? ((cumulativeStart + Math.min(tick, sceneDuration)) / TOTAL) * 100 : 0;

  const formatT = (s: number) => `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, "0")}`;

  return (
    <div className="w-full h-full flex flex-col" style={{ background: "#060D1F" }}>
      {/* Scene display */}
      <div className="flex-1 relative overflow-hidden">
        {sceneIdx === 0  && <Scene01 tick={tick} />}
        {sceneIdx === 1  && <Scene02 tick={tick} />}
        {sceneIdx === 2  && <Scene03 tick={tick} />}
        {sceneIdx === 3  && <Scene04 tick={tick} />}
        {sceneIdx === 4  && <Scene05 tick={tick} />}
        {sceneIdx === 5  && <Scene06 tick={tick} />}
        {sceneIdx === 6  && <Scene07 tick={tick} />}
        {sceneIdx === 7  && <Scene08 tick={tick} />}
        {sceneIdx === 8  && <Scene09 tick={tick} />}
        {sceneIdx === 9  && <Scene10 tick={tick} />}
        {sceneIdx === 10 && <Scene11 tick={tick} />}
        {sceneIdx === 11 && <Scene12 tick={tick} />}
        {sceneIdx === 12 && <Scene13 tick={tick} />}
        {sceneIdx === 13 && <Scene14 tick={tick} />}
        {sceneIdx === 14 && <Scene15 tick={tick} />}
        {sceneIdx === 15 && <Scene16 tick={tick} />}
        {sceneIdx === 16 && <Scene17 tick={tick} onCTA={onCTA} />}

        {/* Scene label top-left */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 pointer-events-none" aria-hidden="true">
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#2563EB" }}/>
          <span className="text-[9px] font-mono font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>
            {String(sceneIdx + 1).padStart(2, "0")} / {SCENES.length} — {SCENES[sceneIdx].title}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div style={{ background: "#080F22", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "10px 14px" }}>
        {/* Progress */}
        <div className="relative w-full h-1 rounded-full mb-2.5 cursor-pointer group"
          style={{ background: "rgba(255,255,255,0.1)" }}
          role="progressbar"
          aria-valuenow={Math.round(progressPct)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Demo progress">
          {/* Scene ticks */}
          {SCENES.map((_sc, i) => {
            const pct = (SCENES.slice(0, i).reduce((a, x) => a + x.duration, 0) / TOTAL) * 100;
            return i > 0 ? (
              <div key={i} className="absolute top-1/2 -translate-y-1/2 w-px h-2"
                style={{ left: `${pct}%`, background: "rgba(255,255,255,0.2)" }} aria-hidden="true"/>
            ) : null;
          })}
          <div className="absolute inset-y-0 left-0 rounded-full transition-all duration-300"
            style={{ width: `${progressPct}%`, background: "linear-gradient(90deg,#2563EB,#6366F1)" }} aria-hidden="true"/>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {/* Prev */}
            <button onClick={() => goToScene(Math.max(0, sceneIdx - 1))}
              aria-label="Previous scene"
              className="p-1 rounded-lg text-white/50 hover:text-white/90 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-white">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M10 3L4 7l6 4V3z" fill="currentColor"/><rect x="2" y="3" width="1.5" height="8" rx="0.75" fill="currentColor"/></svg>
            </button>
            {/* Play/pause */}
            <button onClick={togglePlay}
              aria-label={playing ? "Pause demo" : "Play demo"}
              className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-150 focus:outline-none focus-visible:ring-1 focus-visible:ring-white"
              style={{ background: "linear-gradient(135deg,#2563EB,#1D4ED8)" }}>
              {playing ? (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"><rect x="1.5" y="1.5" width="2.5" height="7" rx="0.5" fill="white"/><rect x="6" y="1.5" width="2.5" height="7" rx="0.5" fill="white"/></svg>
              ) : (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M2.5 1.5l7 3.5-7 3.5V1.5z" fill="white"/></svg>
              )}
            </button>
            {/* Next */}
            <button onClick={() => goToScene(Math.min(SCENES.length - 1, sceneIdx + 1))}
              aria-label="Next scene"
              className="p-1 rounded-lg text-white/50 hover:text-white/90 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-white">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M4 3l6 4-6 4V3z" fill="currentColor"/><rect x="10.5" y="3" width="1.5" height="8" rx="0.75" fill="currentColor"/></svg>
            </button>
            {/* Time */}
            <span className="text-[10px] font-mono" style={{ color: "rgba(255,255,255,0.35)" }}>
              {formatT(cumulativeStart + tick)} / {formatT(TOTAL)}
            </span>
          </div>
          {/* Scene dots */}
          <div className="hidden sm:flex items-center gap-1" aria-hidden="true">
            {SCENES.map((s, i) => (
              <button key={s.id} onClick={() => goToScene(i)}
                aria-label={`Go to scene: ${s.title}`}
                className="rounded-full transition-all duration-200 focus:outline-none"
                style={{
                  width:  i === sceneIdx ? 16 : 6,
                  height: 6,
                  background: i === sceneIdx ? "#2563EB" : i < sceneIdx ? "rgba(37,99,235,0.4)" : "rgba(255,255,255,0.12)",
                }} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
