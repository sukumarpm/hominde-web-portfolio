/* Security App deep-dive section */

const secModules = [
  { icon: "📱", title: "QR Scanner",          desc: "Scan visitor QR codes instantly — verified identity in under 2 seconds." },
  { icon: "✅", title: "Visitor Verification", desc: "View full visitor details, resident name, flat and approved time window." },
  { icon: "⬇️", title: "Mark Entry",           desc: "Log gate entry with a single tap — timestamp recorded automatically." },
  { icon: "⬆️", title: "Mark Exit",            desc: "Close a visit and record departure time for audit trail." },
  { icon: "👥", title: "Inside Visitors",      desc: "Live real-time list of all visitors currently on premises." },
  { icon: "📋", title: "Visitor History",      desc: "Full searchable log of all past visitors, entries and exits." },
  { icon: "👷", title: "Staff Attendance",     desc: "All staff clock in and out via QR — attendance auto-logged." },
  { icon: "🚨", title: "SOS & Emergency",      desc: "Trigger emergency alerts that instantly notify admin and all security staff." },
];

const recentLog = [
  { name:"Rajan Mehta",        flat:"B-204", action:"Entry", time:"2:05 PM", c:"#059669" },
  { name:"Meera Nair",         flat:"A-103", action:"Entry", time:"1:42 PM", c:"#059669" },
  { name:"Delivery · Swiggy",  flat:"C-301", action:"Exit",  time:"1:28 PM", c:"#D97706" },
  { name:"Suresh Kumar",       flat:"B-204", action:"Entry", time:"12:55 PM",c:"#059669" },
  { name:"Plumber · Ravi",     flat:"D-401", action:"Exit",  time:"12:10 PM",c:"#EF4444" },
];

function SecurityMockup() {
  return (
    <div
      className="rounded-[36px] overflow-hidden w-[260px] animate-float theme-transition"
      style={{
        background: "var(--surface)",
        border: "2px solid var(--green-border)",
        boxShadow: "0 32px 80px rgba(0,0,0,0.15), 0 0 40px rgba(5,150,105,0.1)",
        animationDuration: "5s",
      }}
    >
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between border-b theme-transition" style={{ background: "var(--green-bg)", borderColor: "var(--green-border)" }}>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "var(--green-border)" }}>🛡️</div>
          <div>
            <p className="text-xs font-bold" style={{ color: "var(--text-1)", fontFamily: "Instrument Sans,sans-serif" }}>Security Gate</p>
            <p className="text-[8px]" style={{ color: "var(--text-4)" }}>Gate 1 · Main Entrance</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full animate-live" style={{ background: "var(--green)" }} />
          <span className="text-[8px] font-semibold" style={{ color: "var(--green)" }}>LIVE</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-1.5 p-2.5 theme-transition" style={{ background: "var(--bg-3)" }}>
        {[
          { label:"Inside", value:"8",  c:"#2563EB" },
          { label:"Entries",value:"34", c:"#059669" },
          { label:"Exits",  value:"26", c:"#D97706" },
        ].map((s) => (
          <div key={s.label} className="p-2 rounded-xl text-center" style={{ background: `${s.c}0e`, border: `1px solid ${s.c}20` }}>
            <p className="font-mono-data text-base font-bold" style={{ color: s.c }}>{s.value}</p>
            <p className="text-[7px] mt-0.5" style={{ color: "var(--text-4)" }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Scan area */}
      <div className="px-2.5 pb-2.5 theme-transition" style={{ background: "var(--bg-3)" }}>
        <div className="rounded-xl p-3 flex items-center gap-3 mb-2" style={{ background: "var(--blue-bg)", border: "1px solid var(--blue-border)" }}>
          <div className="w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "var(--surface)", border: "1px solid var(--blue-border)" }}>
            <svg width="36" height="36" viewBox="0 0 60 60" fill="none">
              <rect x="4" y="4" width="20" height="20" rx="2" stroke="#2563EB" strokeWidth="1.5" fill="none"/>
              <rect x="9" y="9" width="10" height="10" rx="1" fill="#2563EB" fillOpacity="0.5"/>
              <rect x="36" y="4" width="20" height="20" rx="2" stroke="#2563EB" strokeWidth="1.5" fill="none"/>
              <rect x="41" y="9" width="10" height="10" rx="1" fill="#2563EB" fillOpacity="0.5"/>
              <rect x="4" y="36" width="20" height="20" rx="2" stroke="#2563EB" strokeWidth="1.5" fill="none"/>
              <rect x="9" y="41" width="10" height="10" rx="1" fill="#2563EB" fillOpacity="0.5"/>
              <rect x="36" y="36" width="4" height="4" fill="#2563EB" fillOpacity="0.4"/>
              <rect x="42" y="36" width="4" height="4" fill="#2563EB" fillOpacity="0.4"/>
              <rect x="48" y="36" width="8" height="4" fill="#2563EB" fillOpacity="0.4"/>
              <rect x="36" y="42" width="8" height="4" fill="#2563EB" fillOpacity="0.4"/>
              <rect x="36" y="50" width="16" height="4" fill="#2563EB" fillOpacity="0.4"/>
            </svg>
          </div>
          <div>
            <p className="text-[9px] font-semibold mb-0.5" style={{ color: "var(--green)" }}>✓ Verified</p>
            <p className="text-[10px] font-bold" style={{ color: "var(--text-1)" }}>Rajan Mehta</p>
            <p className="text-[8px]" style={{ color: "var(--text-3)" }}>Flat B-204 · till 6:00 PM</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-1.5 mb-2">
          <button className="py-1.5 rounded-lg text-[10px] font-bold" style={{ background: "var(--green-bg)", color: "var(--green)", border: "1px solid var(--green-border)" }}>⬇ Mark Entry</button>
          <button className="py-1.5 rounded-lg text-[10px] font-bold" style={{ background: "var(--red-bg)", color: "var(--red)", border: "1px solid rgba(239,68,68,0.25)" }}>⬆ Mark Exit</button>
        </div>

        {/* Log */}
        <div className="rounded-xl p-2.5 theme-transition" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <p className="text-[7px] font-semibold uppercase tracking-wide mb-1.5" style={{ color: "var(--text-4)" }}>Recent Log</p>
          {recentLog.slice(0,4).map((l, i) => (
            <div key={i} className="flex items-center justify-between py-1 border-b last:border-0" style={{ borderColor: "var(--border)" }}>
              <div className="flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: l.c }} />
                <div>
                  <p className="text-[8px] font-medium" style={{ color: "var(--text-2)" }}>{l.name}</p>
                  <p className="text-[7px]" style={{ color: "var(--text-4)" }}>{l.flat}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[8px] font-semibold" style={{ color: l.c }}>{l.action}</p>
                <p className="text-[7px]" style={{ color: "var(--text-4)" }}>{l.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom nav */}
      <div className="flex items-center justify-around px-3 py-2 border-t theme-transition" style={{ background: "var(--surface-2)", borderColor: "var(--border)" }}>
        {[{ic:"📱",a:true},{ic:"👥"},{ic:"📋"},{ic:"🚨"}].map((item,i) => (
          <div key={i} className="flex flex-col items-center gap-0.5">
            <div className="w-6 h-6 rounded-lg flex items-center justify-center text-sm" style={{ background: item.a ? "var(--green-bg)" : "transparent" }}>{item.ic}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SecurityAppSection() {
  return (
    <section id="security" className="py-24 px-6 section-fade theme-transition" style={{ background: "var(--bg)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5" style={{ background: "var(--green-bg)", border: "1px solid var(--green-border)", color: "var(--green)" }}>
            🛡️ Security App
          </div>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4" style={{ color: "var(--text-1)" }}>
            Powerful gate tools,{" "}
            <span className="gradient-text">built for security staff.</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--text-2)" }}>
            Give your security team everything they need to verify visitors, track entries and exits,
            log attendance and respond to emergencies — in a purpose-built interface.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-12 justify-center">
          {/* Phone */}
          <div className="flex-shrink-0 flex justify-center w-full lg:w-auto">
            <SecurityMockup />
          </div>

          {/* Module grid */}
          <div className="flex-1 max-w-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {secModules.map((mod) => (
                <div
                  key={mod.title}
                  className="flex items-start gap-3 p-3.5 rounded-xl transition-all duration-150 theme-transition"
                  style={{ background: "var(--green-bg)", border: "1px solid var(--green-border)" }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "translateY(-2px)";
                    el.style.boxShadow = "0 6px 20px rgba(5,150,105,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "translateY(0)";
                    el.style.boxShadow = "none";
                  }}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0" style={{ background: "var(--surface)", border: "1px solid var(--green-border)" }}>{mod.icon}</div>
                  <div>
                    <p className="text-sm font-semibold mb-0.5" style={{ color: "var(--text-1)" }}>{mod.title}</p>
                    <p className="text-xs leading-snug" style={{ color: "var(--text-3)" }}>{mod.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-6 p-4 rounded-2xl theme-transition" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
              <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-1)" }}>Mobile-first, always-on.</p>
              <p className="text-xs mb-3" style={{ color: "var(--text-3)" }}>
                Security staff access Hominode entirely from their phone — no desktop required. Works on any Android or iOS device.
              </p>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--green)" }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" fill="var(--green-bg)"/><path d="M4 7l2 2 4-4" stroke="var(--green)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Works offline for QR scanning
                </div>
                <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--green)" }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" fill="var(--green-bg)"/><path d="M4 7l2 2 4-4" stroke="var(--green)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Real-time sync
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
