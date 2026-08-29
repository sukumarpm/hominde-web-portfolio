/* ─────────────────────────────────────────────
   AppsShowcase — Three apps overview
   Admin App  ·  Resident App  ·  Security App
───────────────────────────────────────────── */

const apps = [
  {
    id: "admin",
    label: "Admin App",
    badge: "Management",
    badgeColor: "#2563EB",
    badgeBg: "var(--blue-bg)",
    title: "Total community control — in one place.",
    desc: "Property managers and community administrators get a powerful mobile dashboard to oversee every building, resident, visitor, complaint, billing and announcement from their phone.",
    color: "#2563EB",
    emoji: "⚙️",
    features: [
      "Multi-building overview dashboard",
      "Resident & flat management",
      "Maintenance billing & collections",
      "Visitor approvals & tracking",
      "Staff management & attendance",
      "Complaint assignment & resolution",
      "Community announcements",
      "Analytics & reporting",
    ],
    screen: {
      title: "Admin Dashboard",
      subtitle: "Sunrise Residency · Aug 2026",
      kpis: [
        { label: "Residents",   value: "284", icon: "👥", c: "#2563EB", bg: "var(--blue-bg)" },
        { label: "Visitors",    value: "12",  icon: "🚗", c: "#059669", bg: "var(--green-bg)" },
        { label: "Collected",   value: "₹1.2L", icon: "💳", c: "#7C3AED", bg: "var(--purple-bg)" },
        { label: "Complaints",  value: "7",   icon: "🔧", c: "#D97706", bg: "var(--amber-bg)" },
      ],
    },
  },
  {
    id: "resident",
    label: "Resident App",
    badge: "For Residents",
    badgeColor: "#7C3AED",
    badgeBg: "var(--purple-bg)",
    title: "Everything a resident needs, on their phone.",
    desc: "Residents manage visitors, pay maintenance bills, book amenities, raise complaints, browse the community marketplace and stay connected — all from one beautifully simple mobile app.",
    color: "#7C3AED",
    emoji: "🏠",
    features: [
      "Visitor request & QR sharing",
      "Maintenance bill payment",
      "Amenity booking",
      "Parking slot management",
      "Community posts & events",
      "Marketplace (buy/sell)",
      "Resident-to-resident chat",
      "Complaint raising & tracking",
    ],
    screen: {
      title: "My Home",
      subtitle: "Priya Sharma · Flat B-204",
      kpis: [
        { label: "Visitors",   value: "2",    icon: "🚗", c: "#2563EB", bg: "var(--blue-bg)" },
        { label: "Due Bills",  value: "₹3.5K",icon: "💳", c: "#EF4444", bg: "var(--red-bg)" },
        { label: "Amenities",  value: "1",    icon: "🏊", c: "#7C3AED", bg: "var(--purple-bg)" },
        { label: "Notices",    value: "3",    icon: "📢", c: "#D97706", bg: "var(--amber-bg)" },
      ],
    },
  },
  {
    id: "security",
    label: "Security App",
    badge: "Gate Staff",
    badgeColor: "#059669",
    badgeBg: "var(--green-bg)",
    title: "A purpose-built tool for gate security staff.",
    desc: "Security teams at the gate get a dedicated app for scanning QR codes, verifying visitors, marking entry/exit, tracking staff attendance, handling tasks and responding to emergencies.",
    color: "#059669",
    emoji: "🛡️",
    features: [
      "QR code scanner & verification",
      "Mark in / Mark exit",
      "Live inside-visitors list",
      "Visitor history & logs",
      "Staff QR attendance",
      "Task assignment & tracking",
      "SOS & emergency alerts",
      "Gate complaint reporting",
    ],
    screen: {
      title: "Gate Dashboard",
      subtitle: "Gate 1 · Main Entrance",
      kpis: [
        { label: "Inside Now",    value: "8",  icon: "👥", c: "#2563EB", bg: "var(--blue-bg)" },
        { label: "Entries Today", value: "34", icon: "↓",  c: "#059669", bg: "var(--green-bg)" },
        { label: "Exits Today",   value: "26", icon: "↑",  c: "#D97706", bg: "var(--amber-bg)" },
        { label: "Staff Active",  value: "6",  icon: "👷", c: "#7C3AED", bg: "var(--purple-bg)" },
      ],
    },
  },
];

function PhoneFrame({ app }: { app: typeof apps[0] }) {
  return (
    <div
      className="rounded-[36px] overflow-hidden w-[220px] flex-shrink-0"
      style={{
        background: "var(--bg-3)",
        border: "2px solid var(--border)",
        boxShadow: `0 24px 60px rgba(0,0,0,0.15), 0 0 0 1px ${app.color}20`,
      }}
    >
      {/* Status bar */}
      <div className="px-5 pt-3 pb-1.5 flex items-center justify-between" style={{ background: "var(--bg-4)" }}>
        <span className="text-[8px] font-semibold" style={{ color: "var(--text-4)" }}>9:41</span>
        <div className="w-10 h-3 rounded-full" style={{ background: "var(--border)" }} />
        <div className="flex gap-0.5">
          <div className="w-2 h-1.5 rounded-sm" style={{ background: app.color }} />
          <div className="w-1 h-1.5 rounded-sm" style={{ background: app.color }} />
        </div>
      </div>

      {/* App header */}
      <div className="px-3 py-2.5 flex items-center justify-between border-b" style={{ background: "var(--surface-2)", borderColor: "var(--border)" }}>
        <div>
          <p className="text-[8px]" style={{ color: "var(--text-4)" }}>{app.screen.subtitle}</p>
          <p className="text-[11px] font-bold" style={{ color: "var(--text-1)", fontFamily: "Instrument Sans,sans-serif" }}>{app.screen.title}</p>
        </div>
        <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm" style={{ background: `${app.color}18`, border: `1px solid ${app.color}25` }}>
          {app.emoji}
        </div>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-2 gap-1.5 p-2.5" style={{ background: "var(--bg-3)" }}>
        {app.screen.kpis.map((kpi) => (
          <div key={kpi.label} className="p-2 rounded-xl" style={{ background: kpi.bg, border: `1px solid ${kpi.c}20` }}>
            <div className="flex items-center gap-1 mb-1">
              <span className="text-xs">{kpi.icon}</span>
              <span className="text-[7px]" style={{ color: "var(--text-4)" }}>{kpi.label}</span>
            </div>
            <p className="font-mono-data text-sm font-bold leading-none" style={{ color: kpi.c }}>{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Navigation bar */}
      <div className="flex items-center justify-around px-3 py-2 border-t" style={{ background: "var(--surface-2)", borderColor: "var(--border)" }}>
        {["🏠","🔔","💬","👤"].map((icon, i) => (
          <div key={i} className="p-1.5 rounded-lg" style={{ background: i === 0 ? `${app.color}15` : "transparent" }}>
            <span className="text-sm">{icon}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-center py-1.5" style={{ background: "var(--surface-2)" }}>
        <div className="w-16 h-0.5 rounded-full" style={{ background: "var(--border-strong)" }} />
      </div>
    </div>
  );
}

export default function AppsShowcase() {
  return (
    <section id="apps" className="py-24 px-6 section-fade theme-transition" style={{ background: "var(--bg-2)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-5"
            style={{ background: "var(--blue-bg)", border: "1px solid var(--blue-border)", color: "var(--blue)" }}
          >
            📱 Mobile-first platform
          </div>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4" style={{ color: "var(--text-1)" }}>
            Three powerful apps.{" "}
            <span className="gradient-text">One connected platform.</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--text-2)" }}>
            Hominode delivers purpose-built mobile apps for every role in your community —
            administrators, residents and security staff — all connected in real time.
          </p>
        </div>

        {/* App cards */}
        <div className="flex flex-col gap-6">
          {apps.map((app, idx) => (
            <div
              key={app.id}
              className="rounded-2xl overflow-hidden theme-transition"
              style={{ background: "var(--surface)", border: "1px solid var(--border)", boxShadow: "var(--card-shadow)" }}
            >
              <div className={`flex flex-col ${idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-0`}>
                {/* Phone preview column */}
                <div
                  className="w-full lg:w-72 flex-shrink-0 flex items-center justify-center py-10 px-8"
                  style={{ background: `${app.color}06`, borderRight: idx % 2 === 0 ? "1px solid var(--border)" : "none", borderLeft: idx % 2 !== 0 ? "1px solid var(--border)" : "none" }}
                >
                  <div className="animate-float" style={{ animationDuration: "5s", animationDelay: `${idx * 0.5}s` }}>
                    <PhoneFrame app={app} />
                  </div>
                </div>

                {/* Content column */}
                <div className="flex-1 p-8 lg:p-10">
                  {/* Badge */}
                  <div className="flex items-center gap-2 mb-4">
                    <div
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
                      style={{ background: app.badgeBg, color: app.badgeColor, border: `1px solid ${app.badgeColor}25` }}
                    >
                      <span>{app.emoji}</span>
                      {app.label}
                    </div>
                    <span
                      className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold"
                      style={{ background: "var(--blue-bg)", color: "var(--blue)", border: "1px solid var(--blue-border)" }}
                    >
                      {app.badge}
                    </span>
                  </div>

                  <h3
                    className="text-2xl md:text-3xl font-bold leading-tight mb-3"
                    style={{ color: "var(--text-1)", fontFamily: "Instrument Sans,sans-serif" }}
                  >
                    {app.title}
                  </h3>
                  <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-2)" }}>
                    {app.desc}
                  </p>

                  {/* Feature list */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {app.features.map((f) => (
                      <div key={f} className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${app.color}14` }}>
                          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
                            <path d="M1.5 4l1.5 1.5 3-3" stroke={app.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <span className="text-sm" style={{ color: "var(--text-2)" }}>{f}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    className="mt-7 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150"
                    style={{ background: `${app.color}12`, border: `1px solid ${app.color}25`, color: app.color }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = `${app.color}20`; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = `${app.color}12`; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
                  >
                    Explore {app.label}
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
