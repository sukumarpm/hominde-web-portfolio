const kpis = [
  { label: "Buildings",      value: "4",     icon: "🏢", color: "#2563EB", bg: "#EFF6FF", border: "#BFDBFE" },
  { label: "Total Flats",    value: "320",   icon: "🏠", color: "#7C3AED", bg: "#F5F3FF", border: "#DDD6FE" },
  { label: "Residents",      value: "284",   icon: "👤", color: "#059669", bg: "#ECFDF5", border: "#A7F3D0" },
  { label: "Visitors Today", value: "12",    icon: "🚗", color: "#D97706", bg: "#FFFBEB", border: "#FDE68A" },
  { label: "Pending",        value: "5",     icon: "⏳", color: "#DB2777", bg: "#FDF2F8", border: "#FBCFE8" },
  { label: "Collected",      value: "₹1.2L", icon: "💳", color: "#0D9488", bg: "#F0FDFA", border: "#99F6E4" },
  { label: "Complaints",     value: "7",     icon: "🔧", color: "#EF4444", bg: "#FEF2F2", border: "#FECACA" },
  { label: "Parking",        value: "78%",   icon: "🅿️", color: "#4F46E5", bg: "#EEF2FF", border: "#C7D2FE" },
  { label: "Amenities",      value: "8",     icon: "🏊", color: "#EA580C", bg: "#FFF7ED", border: "#FED7AA" },
  { label: "Security",       value: "24",    icon: "🛡️", color: "#059669", bg: "#ECFDF5", border: "#A7F3D0" },
  { label: "Alerts",         value: "0",     icon: "🚨", color: "#64748B", bg: "#F8FAFC", border: "#E2E8F0" },
];
const maintenanceBars = [65,80,45,90,70,85,60,75,95,55,88,72];
const visitorBars     = [30,55,42,70,65,80,50,60,72,45,68,85];
const months          = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const activityItems   = [
  { text: "Visitor approved: Rajan Mehta — B-204",     time: "2m ago",  dot: "#059669" },
  { text: "Maintenance bill sent: All of Tower C",     time: "12m ago", dot: "#2563EB" },
  { text: "Complaint resolved: Water leakage 101A",    time: "28m ago", dot: "#7C3AED" },
  { text: "New resident: Arjun Gupta added to A-112",  time: "1h ago",  dot: "#D97706" },
  { text: "Amenity booking: Pool — Flat D-301",        time: "2h ago",  dot: "#DB2777" },
  { text: "Security alert cleared — Gate 2",           time: "3h ago",  dot: "#0D9488" },
];

export default function AdminDashboard() {
  return (
    <section className="py-28 px-6 section-fade" style={{ background: "#F8FAFC" }} aria-labelledby="admin-heading">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-wider uppercase mb-4" style={{ color: "#2563EB" }}>Admin Dashboard</p>
          <h2 id="admin-heading" className="text-4xl md:text-5xl font-bold leading-tight mb-4" style={{ color: "#0F172A" }}>
            Complete control. <span className="gradient-text">One intelligent dashboard.</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "#475569" }}>
            Every metric, every workflow, every team — visible and actionable from a single screen.
          </p>
        </div>

        {/* Dashboard mockup */}
        <div className="rounded-2xl overflow-hidden" style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", boxShadow: "0 4px 24px rgba(37,99,235,0.08), 0 1px 4px rgba(0,0,0,0.05)" }}>
          {/* Browser chrome */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200" style={{ background: "#F8FAFC" }} aria-hidden="true">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full" style={{ background: "#FF5F57" }} />
                <div className="w-3 h-3 rounded-full" style={{ background: "#FEBC2E" }} />
                <div className="w-3 h-3 rounded-full" style={{ background: "#28C840" }} />
              </div>
              <div className="h-5 px-3 rounded-md flex items-center bg-slate-100" style={{ minWidth: "200px" }}>
                <span className="font-mono-data text-[10px] text-slate-400">admin.hominode.com</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {["All Buildings","Today","All Status"].map((f) => (
                <div key={f} className="px-2.5 py-1 rounded-lg text-[10px] bg-slate-100 text-slate-500 border border-slate-200">{f} ▾</div>
              ))}
            </div>
          </div>

          <div className="p-5" aria-hidden="true">
            {/* KPI grid */}
            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-11 gap-2 mb-5">
              {kpis.map((kpi) => (
                <div key={kpi.label} className="p-2.5 rounded-xl min-w-0" style={{ background: kpi.bg, border: `1px solid ${kpi.border}` }}>
                  <div className="text-base mb-1">{kpi.icon}</div>
                  <p className="font-mono-data text-sm font-bold leading-none mb-1" style={{ color: kpi.color }}>{kpi.value}</p>
                  <p className="text-[8px] leading-tight text-slate-500">{kpi.label}</p>
                </div>
              ))}
            </div>

            {/* Charts + activity */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Maintenance chart */}
              <div className="md:col-span-1 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold text-slate-600">Maintenance Collection</p>
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">2026</span>
                </div>
                <div className="flex items-end gap-1 h-20">
                  {maintenanceBars.map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                      <div className="w-full rounded-t-sm" style={{ height:`${h}%`, background: i===7 ? "linear-gradient(180deg,#60A5FA,#2563EB)" : "#DBEAFE", minHeight:"2px" }} />
                      <span className="text-[6px] text-slate-400">{months[i].charAt(0)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visitor chart */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold text-slate-600">Visitor Traffic</p>
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-violet-50 text-violet-600 border border-violet-200">2026</span>
                </div>
                <div className="flex items-end gap-1 h-20">
                  {visitorBars.map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                      <div className="w-full rounded-t-sm" style={{ height:`${h}%`, background: i===7 ? "linear-gradient(180deg,#A78BFA,#7C3AED)" : "#EDE9FE", minHeight:"2px" }} />
                      <span className="text-[6px] text-slate-400">{months[i].charAt(0)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Activity feed */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold text-slate-600">Live Activity Feed</p>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full animate-live" style={{ background:"#059669" }} />
                    <span className="text-[9px] text-emerald-600">Live</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2.5">
                  {activityItems.map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background:item.dot }} />
                      <div className="flex-1 min-w-0">
                        <p className="text-[9px] leading-tight truncate text-slate-500">{item.text}</p>
                        <p className="text-[8px] mt-0.5 text-slate-400">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom strip */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                { label:"Parking utilization",  value:"78%", sub:"Slots occupied",   color:"#4F46E5", bg:"#EEF2FF", border:"#C7D2FE" },
                { label:"Complaint resolution",  value:"94%", sub:"Resolved on time", color:"#0D9488", bg:"#F0FDFA", border:"#99F6E4" },
                { label:"Security attendance",   value:"98%", sub:"This week",        color:"#059669", bg:"#ECFDF5", border:"#A7F3D0" },
              ].map((s) => (
                <div key={s.label} className="p-3 rounded-xl" style={{ background:s.bg, border:`1px solid ${s.border}` }}>
                  <p className="font-mono-data text-base font-bold" style={{ color:s.color }}>{s.value}</p>
                  <p className="text-[9px] font-medium text-slate-600">{s.label}</p>
                  <p className="text-[8px] text-slate-400">{s.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
