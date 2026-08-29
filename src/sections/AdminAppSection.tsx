/* Admin App deep-dive section */

const adminModules = [
  { icon: "🏢", title: "Buildings & Flats",     desc: "Manage multiple buildings, towers, floors and flat assignments from one screen." },
  { icon: "👥", title: "Resident Management",   desc: "Add, edit and manage residents, family members and vehicle information." },
  { icon: "💳", title: "Maintenance Billing",   desc: "Create bills, track payments, send reminders and view collection reports." },
  { icon: "🚗", title: "Visitor Approvals",     desc: "Review pending visitor requests, approve or reject, and track entries." },
  { icon: "📢", title: "Announcements",         desc: "Send community-wide or building-specific notices, events and updates." },
  { icon: "🔧", title: "Complaint Management",  desc: "Receive complaints, assign to staff and track resolution end-to-end." },
  { icon: "👷", title: "Staff Management",      desc: "Manage all staff profiles, roles, QR ID cards and attendance records." },
  { icon: "📊", title: "Analytics Reports",     desc: "View visitor trends, maintenance collection, occupancy and complaint metrics." },
];

const kpis = [
  { label: "Buildings",      value: "4",     icon: "🏢", c: "#2563EB" },
  { label: "Total Flats",    value: "320",   icon: "🏠", c: "#7C3AED" },
  { label: "Residents",      value: "284",   icon: "👥", c: "#059669" },
  { label: "Pending Bills",  value: "₹1.2L", icon: "💳", c: "#D97706" },
  { label: "Open Complaints",value: "7",     icon: "🔧", c: "#EF4444" },
  { label: "Visitors Today", value: "12",    icon: "🚗", c: "#0D9488" },
];

function AdminMockup() {
  const mBars = [65,80,45,90,70,85,60,75,95,55,88,72];
  const months = ["J","F","M","A","M","J","J","A","S","O","N","D"];

  return (
    <div
      className="rounded-2xl overflow-hidden theme-transition"
      style={{ background: "var(--surface)", border: "1px solid var(--border)", boxShadow: "0 24px 60px rgba(0,0,0,0.12)" }}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-3 px-4 py-3 border-b theme-transition" style={{ background: "var(--surface-2)", borderColor: "var(--border)" }} aria-hidden="true">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-amber-400" />
          <div className="w-3 h-3 rounded-full bg-emerald-400" />
        </div>
        <div className="flex-1 h-5 rounded-lg px-3 flex items-center" style={{ background: "var(--bg-2)" }}>
          <span className="font-mono-data text-[10px]" style={{ color: "var(--text-4)" }}>admin.hominode.com</span>
        </div>
        <div className="flex gap-1.5">
          {["All Buildings","Today"].map((f) => (
            <div key={f} className="px-2 py-0.5 rounded text-[9px] theme-transition" style={{ background: "var(--blue-bg)", color: "var(--blue)", border: "1px solid var(--blue-border)" }}>{f} ▾</div>
          ))}
        </div>
      </div>

      <div className="p-4" aria-hidden="true">
        {/* KPI row */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-4">
          {kpis.map((k) => (
            <div key={k.label} className="p-2.5 rounded-xl theme-transition" style={{ background: `${k.c}0e`, border: `1px solid ${k.c}20` }}>
              <span className="text-base">{k.icon}</span>
              <p className="font-mono-data text-sm font-bold mt-1" style={{ color: k.c }}>{k.value}</p>
              <p className="text-[8px] mt-0.5" style={{ color: "var(--text-4)" }}>{k.label}</p>
            </div>
          ))}
        </div>

        {/* Chart + Activity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3 rounded-xl theme-transition" style={{ background: "var(--bg-2)", border: "1px solid var(--border)" }}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold" style={{ color: "var(--text-2)" }}>Maintenance Collection 2026</p>
              <span className="text-[9px] px-1.5 py-0.5 rounded-full" style={{ background: "var(--green-bg)", color: "var(--green)" }}>12 months</span>
            </div>
            <div className="flex items-end gap-1 h-16">
              {mBars.map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                  <div className="w-full rounded-t-sm" style={{ height: `${h}%`, background: i === 7 ? "linear-gradient(180deg,#60A5FA,#2563EB)" : "var(--blue-bg)", minHeight: "2px" }} />
                  <span className="text-[6px]" style={{ color: "var(--text-4)" }}>{months[i]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-xl theme-transition" style={{ background: "var(--bg-2)", border: "1px solid var(--border)" }}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold" style={{ color: "var(--text-2)" }}>Live Activity</p>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full animate-live" style={{ background: "var(--green)" }} />
                <span className="text-[9px]" style={{ color: "var(--green)" }}>Live</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {[
                { t:"Visitor approved: Rajan — B-204",   dot:"#059669", time:"2m" },
                { t:"Bill sent: All Tower C residents",   dot:"#2563EB", time:"12m"},
                { t:"Complaint resolved: 101A leakage",  dot:"#7C3AED", time:"28m"},
                { t:"New resident: Arjun added A-112",   dot:"#D97706", time:"1h" },
                { t:"Security alert cleared — Gate 2",   dot:"#0D9488", time:"3h" },
              ].map((a, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0" style={{ background: a.dot }} />
                  <p className="text-[9px] flex-1 truncate" style={{ color: "var(--text-3)" }}>{a.t}</p>
                  <p className="text-[8px]" style={{ color: "var(--text-4)" }}>{a.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminAppSection() {
  return (
    <section className="py-24 px-6 section-fade theme-transition" style={{ background: "var(--bg)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5" style={{ background: "var(--blue-bg)", border: "1px solid var(--blue-border)", color: "var(--blue)" }}>
            ⚙️ Admin App
          </div>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4" style={{ color: "var(--text-1)" }}>
            Complete community control,{" "}
            <span className="gradient-text">right from your phone.</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--text-2)" }}>
            The Admin App gives property managers and community administrators full oversight and control
            over every building, resident, operation and workflow — from anywhere.
          </p>
        </div>

        {/* Dashboard mockup */}
        <div className="mb-14">
          <AdminMockup />
        </div>

        {/* Module grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {adminModules.map((mod) => (
            <div
              key={mod.title}
              className="p-5 rounded-2xl transition-all duration-200 theme-transition"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--blue-border)";
                el.style.transform = "translateY(-2px)";
                el.style.boxShadow = "var(--card-shadow-hover)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--border)";
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "none";
              }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3" style={{ background: "var(--blue-bg)" }} aria-hidden="true">{mod.icon}</div>
              <h3 className="text-sm font-semibold mb-1" style={{ color: "var(--text-1)" }}>{mod.title}</h3>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-3)" }}>{mod.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
