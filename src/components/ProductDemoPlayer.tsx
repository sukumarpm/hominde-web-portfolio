/**
 * ProductDemoPlayer — Interactive animated demo replacing a real MP4.
 * Renders 17 scenes with transitions, mockups, stats, and workflow animations.
 * Designed so a real MP4 can replace it by setting HOMINODE_DEMO_VIDEO in videoConfig.ts.
 */

import { useState, useEffect, useRef, useCallback } from "react";

/* ─── scene list ──────────────────────────────────────────────────── */
const SCENES = [
  { id: 1,  title: "Intro",                   duration: 4 },
  { id: 2,  title: "Green Wave Overview",     duration: 8 },
  { id: 3,  title: "Resident App",            duration: 7 },
  { id: 4,  title: "Visitors & Gates",        duration: 8 },
  { id: 5,  title: "Billing & Payments",      duration: 8 },
  { id: 6,  title: "Amenities & Bookings",    duration: 7 },
  { id: 7,  title: "Parcels",                 duration: 7 },
  { id: 8,  title: "Events & Announcements",  duration: 7 },
  { id: 9,  title: "Complaints",              duration: 7 },
  { id: 10, title: "Security Operations",     duration: 7 },
  { id: 11, title: "Final",                   duration: 5 },
] as const;

/* ─── small helper components ─────────────────────────────────────── */
function SceneWrap({ children, bg = "#061C4C" }: { children: React.ReactNode; bg?: string }) {
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
          background: done ? "#059669" : active ? "#0E4778" : "rgba(255,255,255,0.06)",
          border: `1.5px solid ${done ? "#059669" : active ? "#0E4778" : "rgba(255,255,255,0.15)"}`,
          transform: active ? "scale(1.1)" : "scale(1)",
        }}>
        {done ? "✓" : icon}
      </div>
      <span className="text-xs font-medium transition-colors duration-300"
        style={{ color: done ? "#10B981" : active ? "#72C5DD" : "rgba(255,255,255,0.4)" }}>
        {text}
      </span>
    </div>
  );
}

/* ─── individual scenes ──────────────────────────────────────────── */

function Scene01({ tick }: { tick: number }) {
  const apps = [
    {
      name: "Resident",
      icon: "🏠",
      accent: "#3AA6C8",
      header: "Resident App",
      rows: ["Visitors", "Bills", "Amenities"],
      footer: "Home   Updates   Profile",
    },
    {
      name: "Admin",
      icon: "⚙️",
      accent: "#0E4778",
      header: "Admin App",
      rows: ["Dashboard", "Residents", "Payments"],
      footer: "Home   Manage   Reports",
    },
    {
      name: "Security",
      icon: "🛡️",
      accent: "#14B8A6",
      header: "Security App",
      rows: ["Verify Visitor", "Parcels", "Gate Activity"],
      footer: "Gate   Scan   Alerts",
    },
  ];

  const showIntro = tick < 1.55;
  const showApps = tick >= 1.1;

  return (
    <SceneWrap bg="linear-gradient(135deg, #030A1B 0%, #061C4C 55%, #0E4778 100%)">
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(circle at 22% 35%, rgba(58,166,200,0.16), transparent 28%), radial-gradient(circle at 80% 28%, rgba(20,184,166,0.12), transparent 26%)",
        }}
      />

      <div
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 transition-all duration-500"
        style={{
          opacity: showIntro ? 1 : 0,
          transform: showIntro ? "scale(1)" : "scale(0.94) translateY(-10px)",
          pointerEvents: "none",
        }}
      >
        <img
          src="/hominode-mark.svg"
          alt=""
          className="w-20 h-20 sm:w-24 sm:h-24 object-contain mb-3"
          style={{ filter: "drop-shadow(0 0 20px rgba(58,166,200,0.32))" }}
        />
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          HOMINODE
        </h1>
        <p className="text-base sm:text-lg text-white/60 mt-1">Smart place. Better lives.</p>
      </div>

      <div
        className="w-full max-w-2xl flex flex-col items-center text-center transition-all duration-500"
        style={{
          opacity: showApps ? 1 : 0,
          transform: showApps ? "translateY(0)" : "translateY(14px)",
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <img src="/hominode-mark.svg" alt="" className="w-7 h-7 object-contain" />
          <span className="text-xs font-bold tracking-wide text-white/80">HOMINODE</span>
        </div>

        <h2 className="text-lg sm:text-xl font-bold text-white mb-1">
          Three purpose-built mobile apps.
        </h2>
        <p className="text-[11px] sm:text-xs text-white/50 mb-3">
          Resident · Admin · Security — one connected platform
        </p>

        <div className="flex items-end justify-center gap-3 sm:gap-5">
          {apps.map((app, i) => {
            const visible = tick > 1.2 + i * 0.18;
            const middle = i === 1;
            return (
              <div
                key={app.name}
                className="relative transition-all duration-500"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible
                    ? `translateY(${middle ? "-5px" : "0"}) scale(${middle ? 1.04 : 0.96})`
                    : "translateY(16px) scale(0.92)",
                }}
              >
                <div
                  className="w-[92px] sm:w-[110px] h-[176px] sm:h-[206px] rounded-[22px] sm:rounded-[26px] p-[4px]"
                  style={{
                    background: "linear-gradient(160deg,rgba(255,255,255,0.40),rgba(255,255,255,0.08))",
                    boxShadow: middle
                      ? "0 18px 44px rgba(0,0,0,0.42)"
                      : "0 12px 32px rgba(0,0,0,0.32)",
                  }}
                >
                  <div
                    className="w-full h-full rounded-[19px] sm:rounded-[23px] overflow-hidden relative"
                    style={{
                      background:
                        app.name === "Security"
                          ? "linear-gradient(180deg,#063D35 0%,#082822 100%)"
                          : "linear-gradient(180deg,#0A2A4A 0%,#06182E 100%)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-8 sm:w-10 h-2.5 sm:h-3 rounded-full bg-black/55" />

                    <div className="pt-5 sm:pt-6 px-2.5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[7px] sm:text-[8px] text-white/45">9:41</span>
                        <span className="text-[7px] sm:text-[8px] text-white/45">●●●</span>
                      </div>

                      <div
                        className="rounded-xl p-2 mb-2 text-left"
                        style={{
                          background: `${app.accent}18`,
                          border: `1px solid ${app.accent}35`,
                        }}
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm">{app.icon}</span>
                          <div>
                            <p className="text-[8px] sm:text-[9px] font-bold text-white">{app.header}</p>
                            <p className="text-[6px] sm:text-[7px] text-white/40">Green Wave</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        {app.rows.map((row, rowIndex) => (
                          <div
                            key={row}
                            className="rounded-lg px-2 py-1.5 text-left transition-all"
                            style={{
                              background:
                                tick > 1.7 + rowIndex * 0.18
                                  ? `${app.accent}16`
                                  : "rgba(255,255,255,0.04)",
                              border:
                                tick > 1.7 + rowIndex * 0.18
                                  ? `1px solid ${app.accent}28`
                                  : "1px solid rgba(255,255,255,0.04)",
                            }}
                          >
                            <p className="text-[6.5px] sm:text-[7.5px] font-medium text-white/70">{row}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div
                      className="absolute bottom-0 left-0 right-0 px-2 py-2 border-t"
                      style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.12)" }}
                    >
                      <p className="text-[5px] sm:text-[6px] text-white/35 text-center">{app.footer}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-2 flex items-center justify-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: app.accent }} />
                  <span className="text-[9px] sm:text-[10px] font-semibold text-white/65">{app.name}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <SceneLabel text={showIntro ? "Smart place. Better lives." : "Resident. Admin. Security. One Hominode ecosystem."} />
    </SceneWrap>
  );
}

function Scene02({ tick }: { tick: number }) {
  const stats = [
    { icon: "🏢", label: "Buildings",   value: "4",   color: "#3AA6C8" },
    { icon: "🏠", label: "Homes",       value: "64",  color: "#72C5DD" },
    { icon: "👤", label: "Residents",   value: "52",  color: "#3AA6C8" },
    { icon: "🚗", label: "Visitors",    value: "120", color: "#10B981" },
    { icon: "💳", label: "Bills",       value: "288", color: "#F59E0B" },
    { icon: "🔧", label: "Complaints",  value: "36",  color: "#F87171" },
    { icon: "📦", label: "Parcels",     value: "60",  color: "#72C5DD" },
    { icon: "🏊", label: "Bookings",    value: "24",  color: "#3AA6C8" },
  ];
  return (
    <SceneWrap bg="linear-gradient(160deg,#030A1B 0%,#061C4C 100%)">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 55% 38% at 50% 18%, rgba(58,166,200,0.16) 0%, transparent 70%)" }} />
      <div className="w-full max-w-lg rounded-xl overflow-hidden"
        style={{ border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 20px 60px rgba(0,0,0,0.45)" }}>
        <div className="flex items-center gap-2 px-3 py-2 border-b"
          style={{ background: "#08233F", borderColor: "rgba(255,255,255,0.07)" }}>
          <div className="flex gap-1"><div className="w-2.5 h-2.5 rounded-full bg-red-400/60"/><div className="w-2.5 h-2.5 rounded-full bg-amber-400/60"/><div className="w-2.5 h-2.5 rounded-full bg-emerald-400/60"/></div>
          <div className="flex-1 mx-2 h-4 rounded flex items-center px-2" style={{ background: "rgba(255,255,255,0.05)" }}>
            <span className="text-[9px] text-white/35 font-mono">admin.hominode.com/dashboard</span>
          </div>
          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full" style={{ background: "rgba(16,185,129,0.14)", border: "1px solid rgba(16,185,129,0.28)" }}>
            <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse"/>
            <span className="text-[8px] text-emerald-300">Demo</span>
          </div>
        </div>
        <div className="p-4" style={{ background: "#06182E" }}>
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs font-semibold text-white/85">Green Wave Residences</p>
              <p className="text-[9px] text-white/40">Fully populated fictional demo community</p>
            </div>
            <span className="px-2 py-1 rounded-full text-[8px] font-semibold" style={{ background: "rgba(58,166,200,0.14)", color: "#72C5DD", border: "1px solid rgba(58,166,200,0.28)" }}>GREEN-WAVE</span>
          </div>
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
                <div className="text-[8px] text-white/45 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <SceneLabel text="Real workflows. Rich sample data. One connected community." />
    </SceneWrap>
  );
}

function Scene03({ tick }: { tick: number }) {
  const tabs = ["🏠 Home","🚗 Visitors","📦 Parcels","💳 Bills","🏊 Amenities","🔧 Complaints","📢 Events","👤 Profile"];
  const activeTab = Math.min(Math.floor(tick * 0.65), tabs.length - 1);
  return (
    <SceneWrap bg="linear-gradient(160deg,#030A1B 0%,#071D3A 100%)">
      <div className="relative" style={{ filter: "drop-shadow(0 20px 40px rgba(58,166,200,0.18))" }}>
        <div className="w-44 rounded-[28px] overflow-hidden" style={{ background: "#08233F", border: "2px solid rgba(255,255,255,0.11)" }}>
          <div className="flex justify-between items-center px-4 pt-3 pb-1" style={{ background: "#0A2A4A" }}>
            <span className="text-[8px] text-white/55">9:41</span>
            <div className="w-10 h-3 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}/>
            <span className="text-[8px] text-white/55">●●●</span>
          </div>
          <div className="px-3 py-2 border-b" style={{ background: "#0A2A4A", borderColor: "rgba(255,255,255,0.07)" }}>
            <p className="text-[8px] text-white/45">Green Wave Residences</p>
            <p className="text-[11px] font-bold text-white">Resident Home</p>
          </div>
          <div className="p-2" style={{ background: "#06182E" }}>
            <div className="grid grid-cols-4 gap-1.5">
              {tabs.map((t, i) => (
                <div key={t} className="flex flex-col items-center p-1.5 rounded-lg text-center transition-all duration-300"
                  style={{
                    background: i === activeTab ? "rgba(58,166,200,0.20)" : "rgba(255,255,255,0.04)",
                    border: i === activeTab ? "1px solid rgba(58,166,200,0.44)" : "1px solid transparent",
                    transform: i === activeTab ? "scale(1.05)" : "scale(1)",
                  }}>
                  <span className="text-sm leading-none">{t.split(" ")[0]}</span>
                  <span className="text-[6px] text-white/45 mt-0.5 leading-tight">{t.split(" ").slice(1).join(" ")}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="px-3 py-2 border-t" style={{ background: "#0A2A4A", borderColor: "rgba(255,255,255,0.06)" }}>
            <p className="text-[8px] text-white/45">Bills, visitors, bookings and community updates stay in sync.</p>
          </div>
        </div>
      </div>
      <SceneLabel text="Residents get everyday community services in one app." />
    </SceneWrap>
  );
}

function Scene04({ tick }: { tick: number }) {
  const steps = [
    { icon: "📤", text: "Visitor Request" },
    { icon: "✅", text: "Resident Approval" },
    { icon: "📱", text: "QR / Entry Reference" },
    { icon: "🛡️", text: "Security Verification" },
    { icon: "🚪", text: "Gate Entry" },
    { icon: "✓",  text: "Mark Exit" },
  ];
  const active = Math.min(Math.floor(tick * 0.9), steps.length - 1);
  return (
    <SceneWrap bg="linear-gradient(160deg,#030A1B 0%,#061C4C 100%)">
      <div className="w-full max-w-xs space-y-2">
        <div className="text-center mb-4">
          <p className="text-[10px] font-semibold tracking-wider text-white/45 uppercase">Visitors & Gates</p>
          <div className="mt-2 p-3 rounded-xl" style={{ background: "rgba(58,166,200,0.10)", border: "1px solid rgba(58,166,200,0.24)" }}>
            <p className="text-xs font-semibold text-white/85">120 seeded visitor records</p>
            <p className="text-[9px] text-white/45">4 gates · approvals · entry/exit history</p>
          </div>
        </div>
        {steps.map((s, i) => (
          <WorkflowStep key={s.text} icon={s.icon} text={s.text} active={i === active} done={i < active} />
        ))}
      </div>
      <SceneLabel text="From resident approval to gate verification and exit tracking." />
    </SceneWrap>
  );
}

function Scene05({ tick }: { tick: number }) {
  const features = ["4 Gates","6 Security Staff","Visitor Verification","Inside Visitors","Entry / Exit","Parcel Handover","Complaints","Emergency Records","Activity History"];
  return (
    <SceneWrap bg="linear-gradient(160deg,#021612 0%,#063D35 100%)">
      <div className="w-full max-w-sm">
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3"
            style={{ background: "rgba(20,184,166,0.14)", border: "1px solid rgba(20,184,166,0.30)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-teal-300 animate-pulse"/>
            <span className="text-[10px] font-semibold text-teal-200">Security App</span>
          </div>
          <p className="text-lg font-bold text-white">Green Wave gate operations</p>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {features.map((f, i) => (
            <div key={f} className="rounded-xl p-2.5 text-center transition-all duration-400"
              style={{
                background: "rgba(255,255,255,0.045)",
                border: "1px solid rgba(255,255,255,0.09)",
                opacity: tick > i * 0.4 ? 1 : 0,
                transform: tick > i * 0.4 ? "scale(1)" : "scale(0.9)",
                transition: `all 0.35s ease ${i * 0.1}s`,
              }}>
              <p className="text-[9px] font-medium text-white/75">{f}</p>
            </div>
          ))}
        </div>
      </div>
      <SceneLabel text="A focused Security app with its own emerald identity." />
    </SceneWrap>
  );
}

function Scene06({ tick }: { tick: number }) {
  const workflow = [
    { icon: "📄", text: "Monthly Batch Generated" },
    { icon: "🏠", text: "Bills Assigned to Homes" },
    { icon: "💳", text: "Payment Recorded" },
    { icon: "🧾", text: "Allocation & Receipt History" },
  ];
  const active = Math.min(Math.floor(tick * 0.8), workflow.length - 1);
  return (
    <SceneWrap bg="linear-gradient(160deg,#030A1B 0%,#061C4C 100%)">
      <div className="w-full max-w-xs">
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { l: "Billing periods", v: "6" },
            { l: "Bills", v: "288" },
            { l: "Assignments", v: "288" },
          ].map((s, i) => (
            <div key={s.l} className="rounded-xl p-2.5 text-center transition-all"
              style={{ background: "rgba(58,166,200,0.10)", border: "1px solid rgba(58,166,200,0.22)", opacity: tick > i * 0.6 ? 1 : 0 }}>
              <p className="text-sm font-bold" style={{ color: "#72C5DD", fontFamily: "JetBrains Mono,monospace" }}>{s.v}</p>
              <p className="text-[8px] text-white/45">{s.l}</p>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          {workflow.map((s, i) => (
            <WorkflowStep key={s.text} icon={s.icon} text={s.text} active={i === active} done={i < active} />
          ))}
        </div>
      </div>
      <div className="mt-3 flex gap-2">
        {[
          { l: "Settlements", v: "12" },
          { l: "Allocations", v: "56" },
        ].map((item) => (
          <div key={item.l} className="flex-1 rounded-lg px-3 py-2 text-center"
            style={{ background: "rgba(16,185,129,0.10)", border: "1px solid rgba(16,185,129,0.22)" }}>
            <p className="text-xs font-bold text-emerald-300">{item.v}</p>
            <p className="text-[8px] text-white/40">{item.l}</p>
          </div>
        ))}
      </div>
      <SceneLabel text="Six months of billing plus settlement and allocation history." />
    </SceneWrap>
  );
}

function Scene07({ tick }: { tick: number }) {
  const amenities = [
    { icon: "🏊", name: "Pool",       meta: "Capacity & slots" },
    { icon: "💪", name: "Fitness",    meta: "Resident booking" },
    { icon: "🏢", name: "Co-working", meta: "Shared facility" },
    { icon: "⚡", name: "EV",         meta: "Bookable resource" },
    { icon: "🎉", name: "Hall",       meta: "Event ready" },
    { icon: "🎾", name: "Recreation", meta: "Timed access" },
  ];
  const selected = Math.min(Math.floor(tick * 0.75), amenities.length - 1);
  return (
    <SceneWrap bg="linear-gradient(160deg,#030A1B 0%,#071D3A 100%)">
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold text-white/45 uppercase tracking-wider">Amenities</p>
          <span className="text-[9px] px-2 py-1 rounded-full" style={{ background: "rgba(58,166,200,0.12)", color: "#72C5DD" }}>6 facilities · 24 bookings</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {amenities.map((a, i) => (
            <div key={a.name} className="rounded-xl p-2.5 text-center transition-all duration-300"
              style={{
                background: i === selected ? "rgba(58,166,200,0.18)" : "rgba(255,255,255,0.035)",
                border: i === selected ? "1px solid rgba(58,166,200,0.42)" : "1px solid rgba(255,255,255,0.08)",
                transform: i === selected ? "translateY(-2px)" : "translateY(0)",
              }}>
              <span className="text-xl">{a.icon}</span>
              <p className="text-[9px] font-semibold text-white/75 mt-1">{a.name}</p>
              <p className="text-[7px] text-white/35 mt-0.5">{a.meta}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-xl p-3" style={{ background: "rgba(16,185,129,0.10)", border: "1px solid rgba(16,185,129,0.22)" }}>
          <p className="text-[10px] font-semibold text-emerald-300">✓ Booking and slot records included</p>
          <p className="text-[8px] text-white/40 mt-1">Demonstrates availability, capacity and conflict-aware booking flows.</p>
        </div>
      </div>
      <SceneLabel text="Residents can discover facilities and book available slots." />
    </SceneWrap>
  );
}

function Scene08({ tick }: { tick: number }) {
  const parcels = [
    { icon:"📦", label:"Received at gate", value:"60", color:"#72C5DD" },
    { icon:"🔔", label:"Resident notified", value:"✓", color:"#10B981" },
    { icon:"🪪", label:"Handover tracked", value:"✓", color:"#3AA6C8" },
  ];
  const stages = ["Received", "Logged", "Resident notified", "Collected"];
  const active = Math.min(Math.floor(tick * 0.8), stages.length - 1);
  return (
    <SceneWrap bg="linear-gradient(160deg,#030A1B 0%,#061C4C 100%)">
      <div className="w-full max-w-xs">
        <p className="text-xs font-semibold text-white/45 uppercase tracking-wider mb-3">Parcel Management</p>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {parcels.map((p,i) => (
            <div key={p.label} className="rounded-xl p-2.5 text-center"
              style={{ background: `${p.color}12`, border: `1px solid ${p.color}28`, opacity: tick > i * 0.7 ? 1 : 0 }}>
              <div className="text-lg">{p.icon}</div>
              <p className="text-sm font-bold mt-1" style={{ color:p.color, fontFamily:"JetBrains Mono,monospace" }}>{p.value}</p>
              <p className="text-[7px] text-white/40">{p.label}</p>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          {stages.map((s,i) => <WorkflowStep key={s} icon={i===3?"✓":"📦"} text={s} active={i===active} done={i<active} />)}
        </div>
      </div>
      <SceneLabel text="60 parcel records demonstrate the full gate-to-resident handover flow." />
    </SceneWrap>
  );
}

function Scene09({ tick }: { tick: number }) {
  const items = [
    { icon:"📢", title:"Community Announcement", desc:"Important update for all residents", t:0, c:"#3AA6C8" },
    { icon:"🎉", title:"Resident Event", desc:"Date, time, venue and capacity", t:2, c:"#F59E0B" },
    { icon:"🖼️", title:"Event Gallery", desc:"Multiple images supported", t:4, c:"#72C5DD" },
    { icon:"🔔", title:"Instant Update", desc:"Visible across resident channels", t:6, c:"#10B981" },
  ];
  return (
    <SceneWrap bg="linear-gradient(160deg,#030A1B 0%,#071D3A 100%)">
      <div className="w-full max-w-xs">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold text-white/45 uppercase tracking-wider">Events & Announcements</p>
          <span className="text-[9px] text-white/45">12 records</span>
        </div>
        <div className="space-y-2">
          {items.map(n => (
            <div key={n.title} className="flex items-start gap-3 rounded-xl p-3 transition-all duration-500"
              style={{
                background: `${n.c}10`,
                border: `1px solid ${n.c}25`,
                opacity: tick > n.t ? 1 : 0,
                transform: tick > n.t ? "translateX(0)" : "translateX(-16px)",
              }}>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-lg flex-shrink-0" style={{ background:`${n.c}18` }}>{n.icon}</div>
              <div>
                <p className="text-[10px] font-semibold text-white/80">{n.title}</p>
                <p className="text-[9px] text-white/40">{n.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <SceneLabel text="Share notices, events and rich community updates instantly." />
    </SceneWrap>
  );
}

function Scene10({ tick }: { tick: number }) {
  const rows = [
    { label:"Settlements", value:"12", icon:"✓" },
    { label:"Transactions", value:"12", icon:"↔" },
    { label:"Allocations", value:"56", icon:"▦" },
  ];
  const paid = tick > 5;
  return (
    <SceneWrap bg="linear-gradient(160deg,#030A1B 0%,#061C4C 100%)">
      <div className="w-full max-w-xs">
        <p className="text-xs font-semibold text-white/45 uppercase tracking-wider mb-3">Billing V2 Payment History</p>
        <div className="grid grid-cols-3 gap-2 mb-3">
          {rows.map((r,i) => (
            <div key={r.label} className="rounded-xl p-2.5 text-center"
              style={{ background:"rgba(58,166,200,0.10)", border:"1px solid rgba(58,166,200,0.22)", opacity:tick>i*0.7?1:0 }}>
              <div className="text-sm text-white/55">{r.icon}</div>
              <p className="text-sm font-bold" style={{ color:"#72C5DD", fontFamily:"JetBrains Mono,monospace" }}>{r.value}</p>
              <p className="text-[7px] text-white/40">{r.label}</p>
            </div>
          ))}
        </div>
        <div className="rounded-xl p-3" style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)" }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-semibold text-white/80">Resident payment</p>
              <p className="text-[8px] text-white/40">Full, partial and multi-month examples</p>
            </div>
            <span className="px-2 py-1 rounded-full text-[8px] font-semibold"
              style={{ background: paid?"rgba(16,185,129,0.16)":"rgba(245,158,11,0.14)", color:paid?"#6EE7B7":"#FBBF24", border:paid?"1px solid rgba(16,185,129,0.28)":"1px solid rgba(245,158,11,0.25)" }}>
              {paid ? "Allocated ✓" : "Processing"}
            </span>
          </div>
        </div>
      </div>
      <SceneLabel text="See exactly how payments are recorded and allocated against bills." />
    </SceneWrap>
  );
}

function Scene11({ tick }: { tick: number }) {
  const steps = [
    { icon: "📝", text: "Complaint Raised" },
    { icon: "👤", text: "Admin Reviews" },
    { icon: "👷", text: "Assigned for Action" },
    { icon: "⚙️", text: "In Progress" },
    { icon: "✅", text: "Resolved" },
  ];
  const active = Math.min(Math.floor(tick * 0.7), steps.length - 1);
  return (
    <SceneWrap bg="linear-gradient(160deg,#030A1B 0%,#071D3A 100%)">
      <div className="w-full max-w-xs">
        <div className="rounded-xl p-3 mb-4" style={{ background:"rgba(248,113,113,0.08)", border:"1px solid rgba(248,113,113,0.20)" }}>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-white/80">36 complaint records</p>
              <p className="text-[9px] text-white/40 mt-1">Different categories and workflow states</p>
            </div>
            <span className="px-2 py-0.5 rounded text-[8px] font-semibold" style={{ background:"rgba(58,166,200,0.14)", color:"#72C5DD" }}>Demo</span>
          </div>
        </div>
        <div className="space-y-2">
          {steps.map((s,i)=><WorkflowStep key={s.text} icon={s.icon} text={s.text} active={i===active} done={i<active}/>)}
        </div>
      </div>
      <SceneLabel text="Residents and admins can follow every issue through resolution." />
    </SceneWrap>
  );
}

function Scene12({ tick }: { tick: number }) {
  const householdStats = [
    { icon:"👤", label:"Resident users", value:"52" },
    { icon:"👨‍👩‍👧", label:"Family members", value:"60" },
    { icon:"🚘", label:"Vehicles", value:"40" },
    { icon:"🏠", label:"Homes", value:"64" },
  ];
  return (
    <SceneWrap bg="linear-gradient(160deg,#030A1B 0%,#061C4C 100%)">
      <div className="w-full max-w-sm">
        <p className="text-xs font-semibold text-white/45 uppercase tracking-wider mb-3 text-center">Resident & Household Data</p>
        <div className="grid grid-cols-2 gap-2.5">
          {householdStats.map((s,i)=>(
            <div key={s.label} className="rounded-xl p-4 text-center transition-all duration-500"
              style={{
                background:"rgba(58,166,200,0.09)",
                border:"1px solid rgba(58,166,200,0.20)",
                opacity:tick>i*0.7?1:0,
                transform:tick>i*0.7?"translateY(0)":"translateY(8px)"
              }}>
              <div className="text-xl">{s.icon}</div>
              <p className="text-xl font-bold mt-1" style={{ color:"#72C5DD", fontFamily:"JetBrains Mono,monospace" }}>{s.value}</p>
              <p className="text-[9px] text-white/45">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
      <SceneLabel text="Profiles, family members, homes and vehicles stay organized together." />
    </SceneWrap>
  );
}

function Scene13({ tick }: { tick: number }) {
  const modules = ["Dashboard","Buildings","Homes","Residents","Visitors","Parcels","Security","Amenities","Bookings","Billing","Payments","Complaints","Events","Announcements","Reports"];
  return (
    <SceneWrap bg="linear-gradient(160deg,#030A1B 0%,#061C4C 100%)">
      <div className="w-full max-w-sm">
        <p className="text-xs font-semibold text-white/45 uppercase tracking-wider mb-3 text-center">Admin Control</p>
        <div className="flex flex-wrap gap-1.5 justify-center">
          {modules.map((m, i) => (
            <span key={m} className="px-2.5 py-1.5 rounded-xl text-[10px] font-medium transition-all duration-400"
              style={{
                background: tick > i * 0.35 ? "rgba(58,166,200,0.16)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${tick > i * 0.35 ? "rgba(58,166,200,0.34)" : "rgba(255,255,255,0.06)"}`,
                color: tick > i * 0.35 ? "#72C5DD" : "rgba(255,255,255,0.2)",
                opacity: tick > i * 0.25 ? 1 : 0,
                transform: tick > i * 0.25 ? "scale(1)" : "scale(0.85)",
              }}>
              {m}
            </span>
          ))}
        </div>
      </div>
      <SceneLabel text="Admin teams manage the entire community from one connected workspace." />
    </SceneWrap>
  );
}

function Scene14({ tick }: { tick: number }) {
  const apps = [
    { title:"Resident", subtitle:"Everyday community life", icon:"🏠", color:"#3AA6C8" },
    { title:"Admin", subtitle:"Operations & finance", icon:"⚙️", color:"#0E4778" },
    { title:"Security", subtitle:"Gate & safety workflows", icon:"🛡️", color:"#14B8A6" },
  ];
  return (
    <SceneWrap bg="linear-gradient(160deg,#030A1B 0%,#061C4C 100%)">
      <div className="w-full max-w-md">
        <p className="text-xs font-semibold text-white/45 uppercase tracking-wider mb-4 text-center">Connected Hominode Apps</p>
        <div className="grid grid-cols-3 gap-3">
          {apps.map((a,i)=>(
            <div key={a.title} className="rounded-2xl p-4 text-center transition-all duration-500"
              style={{
                background:`${a.color}18`,
                border:`1px solid ${a.color}40`,
                opacity:tick>i*1.2?1:0,
                transform:tick>i*1.2?"translateY(0)":"translateY(12px)"
              }}>
              <div className="text-2xl">{a.icon}</div>
              <p className="text-xs font-bold text-white/85 mt-2">{a.title}</p>
              <p className="text-[8px] text-white/40 mt-1">{a.subtitle}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <span className="inline-flex px-3 py-1.5 rounded-full text-[9px] font-semibold"
            style={{ background:"rgba(58,166,200,0.12)", color:"#72C5DD", border:"1px solid rgba(58,166,200,0.24)" }}>
            Shared community data · role-specific experiences
          </span>
        </div>
      </div>
      <SceneLabel text="Resident, Admin and Security experiences stay synchronized." />
    </SceneWrap>
  );
}

function Scene15({ tick }: { tick: number }) {
  const layers = [
    { label: "Role-based access control", icon: "🔐", c: "#0E4778" },
    { label: "Building-level permissions", icon: "🏢", c: "#3AA6C8" },
    { label: "Secure authentication",      icon: "🛡️", c: "#059669" },
    { label: "Controlled permissions",     icon: "⚙️", c: "#D97706" },
    { label: "Real-time validation",       icon: "✓",  c: "#3AA6C8" },
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
  const stats = [
    ["4","Buildings"],["64","Homes"],["120","Visitors"],["60","Parcels"],
    ["36","Complaints"],["24","Bookings"],["288","Bills"],["12","Settlements"],
  ];
  return (
    <SceneWrap bg="linear-gradient(160deg,#030A1B 0%,#061C4C 100%)">
      <div className="w-full max-w-sm text-center">
        <p className="text-xs font-semibold text-white/45 uppercase tracking-wider mb-2">Green Wave Residences</p>
        <h3 className="text-xl font-bold text-white mb-4">A demo that feels lived in.</h3>
        <div className="grid grid-cols-4 gap-2">
          {stats.map(([v,l],i)=>(
            <div key={l} className="rounded-xl p-2.5 transition-all duration-500"
              style={{
                background:"rgba(58,166,200,0.09)",
                border:"1px solid rgba(58,166,200,0.20)",
                opacity:tick>i*0.45?1:0
              }}>
              <p className="text-sm font-bold" style={{ color:"#72C5DD", fontFamily:"JetBrains Mono,monospace" }}>{v}</p>
              <p className="text-[7px] text-white/40">{l}</p>
            </div>
          ))}
        </div>
        <p className="text-[9px] text-white/35 mt-4">All people, records and transactions shown are fictional sample data created for product demonstration.</p>
      </div>
      <SceneLabel text="Explore realistic data without exposing real resident information." />
    </SceneWrap>
  );
}

function Scene17({ tick, onCTA }: { tick: number; onCTA?: () => void }) {
  return (
    <SceneWrap bg="linear-gradient(135deg, #030A1B 0%, #061C4C 52%, #0E4778 100%)">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 42% at 50% 50%, rgba(58,166,200,0.22) 0%, transparent 70%)" }} />
      <div className="flex flex-col items-center gap-5 text-center"
        style={{ opacity: tick > 0 ? 1 : 0, transition: "opacity 0.8s ease" }}>
        <img src="/hominode-mark.svg" alt="" className="w-16 h-16 object-contain" style={{ filter:"drop-shadow(0 0 20px rgba(58,166,200,0.35))" }} />
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">HOMINODE</h2>
          <p className="text-white/55 mt-1 text-sm">Smart place. Better lives.</p>
        </div>
        <p className="text-lg font-semibold text-white/85" style={{ opacity: tick > 1 ? 1 : 0, transition: "opacity 0.8s ease 0.4s" }}>
          See a connected community in action.
        </p>
        <button
          onClick={onCTA}
          className="px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          style={{
            background: "linear-gradient(135deg,#3AA6C8,#0E4778)",
            boxShadow: "0 8px 24px rgba(14,71,120,0.38)",
            opacity: tick > 2 ? 1 : 0,
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
    <div className="w-full h-full min-h-0 flex flex-col" style={{ background: "#061C4C" }}>
      {/* Scene display */}
      <div className="flex-1 min-h-0 relative overflow-hidden">
        {sceneIdx === 0  && <Scene01 tick={tick} />}
        {sceneIdx === 1  && <Scene02 tick={tick} />}
        {sceneIdx === 2  && <Scene03 tick={tick} />}
        {sceneIdx === 3  && <Scene04 tick={tick} />}
        {sceneIdx === 4  && <Scene06 tick={tick} />}
        {sceneIdx === 5  && <Scene07 tick={tick} />}
        {sceneIdx === 6  && <Scene08 tick={tick} />}
        {sceneIdx === 7  && <Scene09 tick={tick} />}
        {sceneIdx === 8  && <Scene11 tick={tick} />}
        {sceneIdx === 9  && <Scene05 tick={tick} />}
        {sceneIdx === 10 && <Scene17 tick={tick} onCTA={onCTA} />}

        {/* Scene label top-left */}
        <div className="absolute top-3 left-3 right-14 sm:right-auto flex items-center gap-1.5 pointer-events-none" aria-hidden="true">
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#0E4778" }}/>
          <span className="truncate text-[9px] font-mono font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>
            {String(sceneIdx + 1).padStart(2, "0")} / {SCENES.length} — {SCENES[sceneIdx].title}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="demo-player-controls" style={{ background: "#06182E", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "10px 14px" }}>
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
            style={{ width: `${progressPct}%`, background: "linear-gradient(90deg,#0E4778,#3AA6C8)" }} aria-hidden="true"/>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex min-w-0 items-center gap-2 sm:gap-2.5">
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
              style={{ background: "linear-gradient(135deg,#0E4778,#061C4C)" }}>
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
            <span className="whitespace-nowrap text-[9px] sm:text-[10px] font-mono" style={{ color: "rgba(255,255,255,0.35)" }}>
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
                  background: i === sceneIdx ? "#0E4778" : i < sceneIdx ? "rgba(14,71,120,0.4)" : "rgba(255,255,255,0.12)",
                }} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .demo-player-controls {
          padding-bottom: max(10px, env(safe-area-inset-bottom)) !important;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
