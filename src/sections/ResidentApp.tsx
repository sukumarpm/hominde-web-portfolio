const appTabs = [
  { icon: "🏠", label: "Home" }, { icon: "🚗", label: "Visitors" }, { icon: "💳", label: "Bills" },
  { icon: "🏊", label: "Amenities" }, { icon: "🅿️", label: "Parking" }, { icon: "💬", label: "Messages" },
  { icon: "📢", label: "Community" }, { icon: "🛒", label: "Market" }, { icon: "🔧", label: "Complaints" }, { icon: "👤", label: "Profile" },
];
const notifications = [
  { title: "Visitor approved",   desc: "Rajan Mehta — expected at 2:00 PM",             color: "#059669", bg: "#ECFDF5", border: "#A7F3D0", icon: "✓" },
  { title: "Maintenance bill",   desc: "₹3,500 due for August — Flat B-204",              color: "#2563EB", bg: "#EFF6FF", border: "#BFDBFE", icon: "💳" },
  { title: "Amenity confirmed",  desc: "Badminton court booked — Sat 6 AM",              color: "#7C3AED", bg: "#F5F3FF", border: "#DDD6FE", icon: "🏸" },
  { title: "Package received",   desc: "Delivery at security — collected by guard",       color: "#D97706", bg: "#FFFBEB", border: "#FDE68A", icon: "📦" },
  { title: "Community notice",   desc: "Water supply off Sun 10 AM – 2 PM",              color: "#DB2777", bg: "#FDF2F8", border: "#FBCFE8", icon: "📢" },
];

function PhoneMockup() {
  return (
    <div className="relative w-[260px] flex-shrink-0" style={{ filter: "drop-shadow(0 24px 48px rgba(37,99,235,0.15))" }}>
      <div className="rounded-[40px] overflow-hidden" style={{ background: "#FFFFFF", border: "2px solid #E2E8F0" }}>
        <div className="px-6 pt-4 pb-2 flex items-center justify-between" style={{ background: "#F8FAFC" }}>
          <span className="text-[9px] font-semibold text-slate-400">9:41</span>
          <div className="w-16 h-4 rounded-full" style={{ background: "#E2E8F0" }} />
          <div className="flex gap-1">
            <div className="w-3 h-2 rounded-sm" style={{ background: "#2563EB" }} />
            <div className="w-1 h-2 rounded-sm" style={{ background: "#2563EB" }} />
          </div>
        </div>
        <div className="px-4 py-3 flex items-center justify-between border-b" style={{ background: "#F8FAFC", borderColor: "#E2E8F0" }}>
          <div>
            <p className="text-[9px] text-slate-400">Good morning,</p>
            <p className="text-xs font-bold" style={{ color: "#0F172A", fontFamily: "Instrument Sans,sans-serif" }}>Priya Sharma</p>
          </div>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ background: "linear-gradient(135deg,#2563EB,#8B5CF6)" }}>PS</div>
        </div>
        <div className="px-3 py-3 bg-white">
          <p className="text-[9px] mb-2 font-semibold text-slate-400">QUICK ACCESS</p>
          <div className="grid grid-cols-5 gap-1.5">
            {appTabs.slice(0,5).map((tab) => (
              <div key={tab.label} className="flex flex-col items-center gap-1 p-1.5 rounded-xl" style={{ background: "#F8FAFC" }}>
                <span className="text-base">{tab.icon}</span>
                <span className="text-[7px] text-slate-400">{tab.label}</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-5 gap-1.5 mt-1.5">
            {appTabs.slice(5).map((tab) => (
              <div key={tab.label} className="flex flex-col items-center gap-1 p-1.5 rounded-xl" style={{ background: "#F8FAFC" }}>
                <span className="text-base">{tab.icon}</span>
                <span className="text-[7px] text-slate-400">{tab.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="px-3 pb-4 bg-white">
          <p className="text-[9px] mb-2 font-semibold text-slate-400">RECENT ACTIVITY</p>
          <div className="flex flex-col gap-2">
            {notifications.slice(0,3).map((n) => (
              <div key={n.title} className="flex items-start gap-2.5 p-2 rounded-xl" style={{ background: n.bg, border: `1px solid ${n.border}` }}>
                <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] flex-shrink-0 bg-white" style={{ color: n.color, border: `1px solid ${n.border}` }}>{n.icon}</div>
                <div>
                  <p className="text-[9px] font-semibold" style={{ color: "#0F172A" }}>{n.title}</p>
                  <p className="text-[8px] text-slate-400">{n.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-around py-3 border-t" style={{ background: "#F8FAFC", borderColor: "#E2E8F0" }}>
          {[{ icon:"🏠",active:true},{icon:"🔔"},{icon:"💬"},{icon:"👤"}].map((item,i) => (
            <div key={i} className="p-1.5 rounded-lg" style={{ background: item.active ? "#EFF6FF" : "transparent" }}>
              <span className="text-base">{item.icon}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-center py-2" style={{ background: "#F8FAFC" }}>
          <div className="w-20 h-1 rounded-full" style={{ background: "#CBD5E1" }} />
        </div>
      </div>
    </div>
  );
}

export default function ResidentApp() {
  return (
    <section className="py-28 px-6 section-fade" style={{ background: "#FFFFFF" }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-shrink-0 flex justify-center animate-float" style={{ animationDuration: "6s" }}>
            <PhoneMockup />
          </div>
          <div className="flex-1 max-w-lg">
            <p className="text-sm font-semibold tracking-wider uppercase mb-4" style={{ color: "#2563EB" }}>Resident Experience</p>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6" style={{ color: "#0F172A" }}>
              Everything residents need, right from their phone.
            </h2>
            <p className="text-lg mb-8 leading-relaxed" style={{ color: "#475569" }}>
              One app for managing visitors, paying bills, booking amenities, messaging neighbours, and staying connected.
            </p>
            <div className="flex flex-col gap-3">
              {notifications.map((n) => (
                <div
                  key={n.title}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200"
                  style={{ background: "#FFFFFF", border: "1px solid #E2E8F0" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = n.bg; (e.currentTarget as HTMLElement).style.borderColor = n.border; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#FFFFFF"; (e.currentTarget as HTMLElement).style.borderColor = "#E2E8F0"; }}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0" style={{ background: n.bg, border: `1px solid ${n.border}` }}>{n.icon}</div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: "#0F172A" }}>{n.title}</p>
                    <p className="text-xs" style={{ color: "#475569" }}>{n.desc}</p>
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
