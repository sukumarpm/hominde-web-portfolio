const securityModules = [
  { icon: "📱", label: "QR Scanner", desc: "Scan visitor QR codes instantly at the gate" },
  { icon: "✅", label: "Visitor Verification", desc: "Confirm identity before granting entry" },
  { icon: "↓", label: "Mark In", desc: "Log visitor entry with timestamp" },
  { icon: "↑", label: "Mark Exit", desc: "Record departure and close the visit" },
  { icon: "👥", label: "Inside Visitors", desc: "Live view of who's currently on premises" },
  { icon: "📋", label: "Visitor History", desc: "Full entry/exit log per visitor" },
  { icon: "👷", label: "Staff Attendance", desc: "Clock in/out via QR for all staff" },
  { icon: "📍", label: "Security Location", desc: "Log and track guard positions" },
  { icon: "📌", label: "Assigned Tasks", desc: "View and complete daily security tasks" },
  { icon: "🔧", label: "Gate Complaints", desc: "Raise and view complaints from the gate" },
  { icon: "🚨", label: "SOS & Emergency", desc: "Instantly alert residents and admin teams" },
];

function SecurityAppMockup() {
  return (
    <div
      className="rounded-2xl overflow-hidden flex-shrink-0"
      style={{
        width: "340px",
        background: "#FFFFFF",
        border: "1px solid #A7F3D0",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06), 0 8px 32px rgba(5,150,105,0.10)",
      }}
    >
      {/* App header */}
      <div
        className="px-4 py-3 flex items-center justify-between border-b"
        style={{ background: "#ECFDF5", borderColor: "#A7F3D0" }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-sm"
            style={{ background: "#D1FAE5" }}
          >
            🛡️
          </div>
          <div>
            <p className="text-xs font-bold" style={{ color: "#065F46", fontFamily: "Instrument Sans, sans-serif" }}>
              Security Gate
            </p>
            <p className="text-[9px]" style={{ color: "#6EE7B7" }}>Gate 1 — Main Entrance</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <div
            className="w-1.5 h-1.5 rounded-full animate-live"
            style={{ background: "#059669" }}
          />
          <span className="text-[9px] font-semibold" style={{ color: "#059669" }}>LIVE</span>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2 p-3">
        {[
          { label: "Inside Now", value: "8", color: "#2563EB", bg: "#EFF6FF", border: "#BFDBFE" },
          { label: "Entries Today", value: "34", color: "#059669", bg: "#ECFDF5", border: "#A7F3D0" },
          { label: "Exits Today", value: "26", color: "#D97706", bg: "#FFFBEB", border: "#FDE68A" },
        ].map((s) => (
          <div
            key={s.label}
            className="p-2 rounded-xl text-center"
            style={{ background: s.bg, border: `1px solid ${s.border}` }}
          >
            <p className="font-mono-data text-base font-bold" style={{ color: s.color }}>{s.value}</p>
            <p className="text-[8px] mt-0.5" style={{ color: "#475569" }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Scan area */}
      <div className="px-3 pb-3">
        <div
          className="rounded-xl p-3 flex items-center gap-3 mb-3"
          style={{
            background: "#EFF6FF",
            border: "1px solid #BFDBFE",
          }}
        >
          {/* QR frame */}
          <div
            className="w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "#DBEAFE", border: "1px solid #BFDBFE" }}
          >
            <svg width="40" height="40" viewBox="0 0 60 60" fill="none">
              <rect x="4" y="4" width="20" height="20" rx="2" stroke="#2563EB" strokeWidth="1.5" fill="none"/>
              <rect x="9" y="9" width="10" height="10" rx="1" fill="#2563EB" fillOpacity="0.5"/>
              <rect x="36" y="4" width="20" height="20" rx="2" stroke="#2563EB" strokeWidth="1.5" fill="none"/>
              <rect x="41" y="9" width="10" height="10" rx="1" fill="#2563EB" fillOpacity="0.5"/>
              <rect x="4" y="36" width="20" height="20" rx="2" stroke="#2563EB" strokeWidth="1.5" fill="none"/>
              <rect x="9" y="41" width="10" height="10" rx="1" fill="#2563EB" fillOpacity="0.5"/>
              <rect x="36" y="36" width="4" height="4" fill="#2563EB" fillOpacity="0.35"/>
              <rect x="42" y="36" width="4" height="4" fill="#2563EB" fillOpacity="0.35"/>
              <rect x="48" y="36" width="8" height="4" fill="#2563EB" fillOpacity="0.35"/>
              <rect x="36" y="42" width="8" height="4" fill="#2563EB" fillOpacity="0.35"/>
              <rect x="48" y="44" width="4" height="4" fill="#2563EB" fillOpacity="0.35"/>
              <rect x="36" y="50" width="16" height="4" fill="#2563EB" fillOpacity="0.35"/>
            </svg>
          </div>
          <div>
            <p className="text-xs font-semibold mb-1" style={{ color: "#059669" }}>✓ Verified</p>
            <p className="text-[10px] font-bold" style={{ color: "#0F172A" }}>Rajan Mehta</p>
            <p className="text-[9px]" style={{ color: "#475569" }}>Visiting: Flat B-204</p>
            <p className="text-[9px]" style={{ color: "#475569" }}>Expected: 2:00 PM</p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <button
            className="py-2 rounded-lg text-xs font-bold"
            style={{ background: "#ECFDF5", color: "#059669", border: "1px solid #A7F3D0" }}
          >
            ↓ Mark Entry
          </button>
          <button
            className="py-2 rounded-lg text-xs font-bold"
            style={{ background: "#FEF2F2", color: "#EF4444", border: "1px solid #FECACA" }}
          >
            ↑ Mark Exit
          </button>
        </div>

        {/* Recent log */}
        <div
          className="rounded-xl p-3"
          style={{ background: "#F8FAFC", border: "1px solid #E2E8F0" }}
        >
          <p className="text-[9px] font-semibold mb-2" style={{ color: "#94A3B8" }}>RECENT LOG</p>
          {[
            { name: "Meera Nair", action: "Entry", flat: "A-103", time: "1:42 PM", color: "#059669" },
            { name: "Delivery — Zomato", action: "Exit", flat: "C-301", time: "1:28 PM", color: "#D97706" },
            { name: "Suresh Kumar", action: "Entry", flat: "B-204", time: "12:55 PM", color: "#059669" },
          ].map((log, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-1.5 border-b last:border-0"
              style={{ borderColor: "#F1F5F9" }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: log.color }}
                />
                <div>
                  <p className="text-[9px] font-medium" style={{ color: "#475569" }}>{log.name}</p>
                  <p className="text-[8px]" style={{ color: "#94A3B8" }}>{log.flat}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[9px] font-semibold" style={{ color: log.color }}>{log.action}</p>
                <p className="text-[8px]" style={{ color: "#94A3B8" }}>{log.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom nav */}
      <div
        className="flex items-center justify-around px-4 py-2.5 border-t"
        style={{ background: "#F8FAFC", borderColor: "#E2E8F0" }}
      >
        {[
          { icon: "📱", label: "Scan", active: true },
          { icon: "👥", label: "Inside" },
          { icon: "📋", label: "History" },
          { icon: "🚨", label: "SOS" },
        ].map((item) => (
          <div key={item.label} className="flex flex-col items-center gap-0.5">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-sm"
              style={{ background: item.active ? "#ECFDF5" : "transparent" }}
            >
              {item.icon}
            </div>
            <span
              className="text-[7px]"
              style={{ color: item.active ? "#059669" : "#94A3B8" }}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SecurityPlatform() {
  return (
    <section
      id="security"
      className="py-28 px-6 section-fade"
      style={{ background: "#FFFFFF" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p
            className="text-sm font-semibold tracking-wider uppercase mb-4"
            style={{ color: "#059669" }}
          >
            Security Platform
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold leading-tight mb-4"
            style={{ color: "#0F172A" }}
          >
            Powerful tools for your security team.
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "#475569" }}>
            Give your gate staff everything they need — from QR scanning to real-time visitor
            tracking, attendance and emergency response — in one purpose-built interface.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-12 justify-center">
          {/* Security app mockup */}
          <div
            className="flex-shrink-0 flex justify-center w-full lg:w-auto animate-float"
            style={{ animationDuration: "5.5s" }}
          >
            <SecurityAppMockup />
          </div>

          {/* Module grid */}
          <div className="flex-1 max-w-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {securityModules.map((mod) => (
                <div
                  key={mod.label}
                  className="flex items-start gap-3 p-3.5 rounded-xl transition-all duration-150"
                  style={{
                    background: "rgba(5,150,105,0.03)",
                    border: "1px solid #D1FAE5",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "#ECFDF5";
                    (e.currentTarget as HTMLElement).style.borderColor = "#A7F3D0";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(5,150,105,0.03)";
                    (e.currentTarget as HTMLElement).style.borderColor = "#D1FAE5";
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0"
                    style={{ background: "#D1FAE5" }}
                  >
                    {mod.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-0.5" style={{ color: "#0F172A" }}>
                      {mod.label}
                    </p>
                    <p className="text-xs leading-snug" style={{ color: "#475569" }}>
                      {mod.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
