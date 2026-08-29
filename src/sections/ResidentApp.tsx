const appTabs = [
  { icon:"🏠", label:"Home" }, { icon:"🚗", label:"Visitors" }, { icon:"💳", label:"Bills" },
  { icon:"🏊", label:"Amenities" }, { icon:"🅿️", label:"Parking" }, { icon:"💬", label:"Messages" },
  { icon:"📢", label:"Community" }, { icon:"🛒", label:"Market" }, { icon:"🔧", label:"Complaints" }, { icon:"👤", label:"Profile" },
];

const notifications = [
  { title:"Visitor approved",  desc:"Rajan Mehta — expected at 2:00 PM",            color:"#059669", bg:"rgba(5,150,105,0.1)",   border:"rgba(5,150,105,0.25)",   icon:"✓"  },
  { title:"Maintenance bill",  desc:"₹3,500 due for August — Flat B-204",             color:"#2563EB", bg:"rgba(37,99,235,0.1)",   border:"rgba(37,99,235,0.25)",   icon:"💳" },
  { title:"Amenity confirmed", desc:"Badminton court booked — Sat 6 AM",             color:"#7C3AED", bg:"rgba(124,58,237,0.1)",  border:"rgba(124,58,237,0.25)",  icon:"🏸" },
  { title:"Package received",  desc:"Delivery at security — collected by guard",      color:"#D97706", bg:"rgba(217,119,6,0.1)",   border:"rgba(217,119,6,0.25)",   icon:"📦" },
  { title:"Community notice",  desc:"Water supply off Sun 10 AM – 2 PM",             color:"#DB2777", bg:"rgba(219,39,119,0.1)",  border:"rgba(219,39,119,0.25)",  icon:"📢" },
];

function PhoneMockup() {
  return (
    <div
      className="relative w-[260px] flex-shrink-0"
      style={{ filter: "drop-shadow(0 24px 48px rgba(37,99,235,0.15))" }}
    >
      <div
        className="rounded-[40px] overflow-hidden theme-transition"
        style={{ background: "var(--card)", border: "2px solid var(--border)" }}
      >
        {/* Status bar */}
        <div
          className="px-6 pt-4 pb-2 flex items-center justify-between theme-transition"
          style={{ background: "var(--bg-2)" }}
        >
          <span className="text-[9px] font-semibold" style={{ color: "var(--text-3)" }}>9:41</span>
          <div className="w-16 h-4 rounded-full theme-transition" style={{ background: "var(--bg-3)" }} />
          <div className="flex gap-1">
            <div className="w-3 h-2 rounded-sm" style={{ background: "var(--blue)" }} />
            <div className="w-1 h-2 rounded-sm" style={{ background: "var(--blue)" }} />
          </div>
        </div>

        {/* App header */}
        <div
          className="px-4 py-3 flex items-center justify-between border-b theme-transition"
          style={{ background: "var(--bg-2)", borderColor: "var(--border)" }}
        >
          <div>
            <p className="text-[9px]" style={{ color: "var(--text-3)" }}>Good morning,</p>
            <p className="text-xs font-bold" style={{ color: "var(--text-1)", fontFamily: "Instrument Sans,sans-serif" }}>
              Priya Sharma
            </p>
          </div>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
            style={{ background: "linear-gradient(135deg,#2563EB,#8B5CF6)" }}
          >
            PS
          </div>
        </div>

        {/* Quick tiles */}
        <div className="px-3 py-3 theme-transition" style={{ background: "var(--card)" }}>
          <p className="text-[9px] mb-2 font-semibold" style={{ color: "var(--text-3)" }}>QUICK ACCESS</p>
          <div className="grid grid-cols-5 gap-1.5">
            {appTabs.slice(0,5).map((tab) => (
              <div
                key={tab.label}
                className="flex flex-col items-center gap-1 p-1.5 rounded-xl theme-transition"
                style={{ background: "var(--bg-2)" }}
              >
                <span className="text-base">{tab.icon}</span>
                <span className="text-[7px]" style={{ color: "var(--text-3)" }}>{tab.label}</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-5 gap-1.5 mt-1.5">
            {appTabs.slice(5).map((tab) => (
              <div
                key={tab.label}
                className="flex flex-col items-center gap-1 p-1.5 rounded-xl theme-transition"
                style={{ background: "var(--bg-2)" }}
              >
                <span className="text-base">{tab.icon}</span>
                <span className="text-[7px]" style={{ color: "var(--text-3)" }}>{tab.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="px-3 pb-4 theme-transition" style={{ background: "var(--card)" }}>
          <p className="text-[9px] mb-2 font-semibold" style={{ color: "var(--text-3)" }}>RECENT ACTIVITY</p>
          <div className="flex flex-col gap-2">
            {notifications.slice(0,3).map((n) => (
              <div
                key={n.title}
                className="flex items-start gap-2.5 p-2 rounded-xl"
                style={{ background: n.bg, border: `1px solid ${n.border}` }}
              >
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] flex-shrink-0 theme-transition"
                  style={{ background: "var(--card)", color: n.color, border: `1px solid ${n.border}` }}
                >
                  {n.icon}
                </div>
                <div>
                  <p className="text-[9px] font-semibold" style={{ color: "var(--text-1)" }}>{n.title}</p>
                  <p className="text-[8px]" style={{ color: "var(--text-3)" }}>{n.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom nav */}
        <div
          className="flex items-center justify-around py-3 border-t theme-transition"
          style={{ background: "var(--bg-2)", borderColor: "var(--border)" }}
        >
          {[{icon:"🏠",active:true},{icon:"🔔"},{icon:"💬"},{icon:"👤"}].map((item,i) => (
            <div
              key={i}
              className="p-1.5 rounded-lg theme-transition"
              style={{ background: item.active ? "var(--blue-bg)" : "transparent" }}
            >
              <span className="text-base">{item.icon}</span>
            </div>
          ))}
        </div>

        {/* Home indicator */}
        <div className="flex justify-center py-2 theme-transition" style={{ background: "var(--bg-2)" }}>
          <div className="w-20 h-1 rounded-full theme-transition" style={{ background: "var(--border)" }} />
        </div>
      </div>
    </div>
  );
}

export default function ResidentApp() {
  return (
    <section
      className="py-28 px-6 section-fade theme-transition"
      style={{ background: "var(--bg-1)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-shrink-0 flex justify-center animate-float" style={{ animationDuration: "6s" }}>
            <PhoneMockup />
          </div>

          <div className="flex-1 max-w-lg">
            <p className="text-sm font-semibold tracking-wider uppercase mb-4" style={{ color: "var(--blue)" }}>
              Resident Experience
            </p>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6" style={{ color: "var(--text-1)" }}>
              Everything residents need, right from their phone.
            </h2>
            <p className="text-lg mb-8 leading-relaxed" style={{ color: "var(--text-2)" }}>
              One app for managing visitors, paying bills, booking amenities, messaging neighbours,
              and staying connected with the community.
            </p>

            <div className="flex flex-col gap-3">
              {notifications.map((n) => (
                <div
                  key={n.title}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 theme-transition"
                  style={{ background: "var(--card)", border: "1px solid var(--border)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = n.bg;
                    (e.currentTarget as HTMLElement).style.borderColor = n.border;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "var(--card)";
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0"
                    style={{ background: n.bg, border: `1px solid ${n.border}` }}
                  >
                    {n.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: "var(--text-1)" }}>{n.title}</p>
                    <p className="text-xs" style={{ color: "var(--text-2)" }}>{n.desc}</p>
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
