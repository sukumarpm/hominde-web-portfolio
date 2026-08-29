/* Resident App deep-dive section */
import { useState } from "react";

const tabs = [
  {
    id: "home",
    label: "Home",
    icon: "🏠",
    title: "Your community, at a glance.",
    desc: "Residents see pending bills, upcoming visitors, recent activity and quick shortcuts to every feature — all on one clean home screen.",
  },
  {
    id: "visitors",
    label: "Visitors",
    icon: "🚗",
    title: "Share a QR — gate handles the rest.",
    desc: "Create a visitor request, choose the expected time window, and share the auto-generated QR. Security scans it at the gate — no calls, no confusion.",
  },
  {
    id: "billing",
    label: "Bills",
    icon: "💳",
    title: "Pay maintenance bills instantly.",
    desc: "Receive bill notifications, view payment history, see due amounts and pay directly within the app. No chasing, no paperwork.",
  },
  {
    id: "amenities",
    label: "Amenities",
    icon: "🏊",
    title: "Book facilities in seconds.",
    desc: "Browse available slots for the pool, gym, badminton court and more. Capacity is managed automatically — no double-bookings.",
  },
  {
    id: "community",
    label: "Community",
    icon: "📢",
    title: "Stay connected with your neighbours.",
    desc: "Read announcements, join discussions, browse upcoming events and keep up with everything happening in your building.",
  },
];

const notifications = [
  { title: "Visitor QR generated",   desc: "Rajan Mehta — expires 6:00 PM today",      c: "#2563EB", bg: "var(--blue-bg)",   icon: "🎫" },
  { title: "Maintenance bill",        desc: "₹3,500 due for August · Flat B-204",        c: "#EF4444", bg: "var(--red-bg)",    icon: "💳" },
  { title: "Amenity booking confirmed",desc: "Badminton court · Sat 6:00–7:00 AM",       c: "#7C3AED", bg: "var(--purple-bg)", icon: "🏸" },
  { title: "Package collected",       desc: "Delivery received at security · 2:14 PM",   c: "#D97706", bg: "var(--amber-bg)",  icon: "📦" },
  { title: "Community notice",        desc: "Water supply off Sun 10 AM–2 PM",           c: "#059669", bg: "var(--green-bg)",  icon: "📢" },
];

export default function ResidentAppSection() {
  const [active, setActive] = useState(0);
  const tab = tabs[active];

  return (
    <section className="py-24 px-6 section-fade theme-transition" style={{ background: "var(--bg-2)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5" style={{ background: "var(--purple-bg)", border: "1px solid var(--purple)25", color: "var(--purple)" }}>
            🏠 Resident App
          </div>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4" style={{ color: "var(--text-1)" }}>
            Everything a resident needs,{" "}
            <span className="gradient-text">right from their phone.</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--text-2)" }}>
            One app to manage visitors, pay bills, book amenities, chat with neighbours and stay connected with community life.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-10">
          {/* Tab selector + descriptions */}
          <div className="flex-1 max-w-lg">
            {/* Tab list */}
            <div className="flex gap-2 mb-8 flex-wrap">
              {tabs.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => setActive(i)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-150 theme-transition"
                  style={{
                    background: active === i ? "var(--purple-bg)" : "var(--surface)",
                    border: `1px solid ${active === i ? "var(--purple)" : "var(--border)"}`,
                    color: active === i ? "var(--purple)" : "var(--text-3)",
                  }}
                  aria-pressed={active === i}
                >
                  <span>{t.icon}</span>
                  {t.label}
                </button>
              ))}
            </div>

            {/* Active tab content */}
            <div className="mb-8" key={tab.id}>
              <h3 className="text-2xl font-bold mb-3" style={{ color: "var(--text-1)", fontFamily: "Instrument Sans,sans-serif" }}>
                {tab.title}
              </h3>
              <p className="text-base leading-relaxed" style={{ color: "var(--text-2)" }}>
                {tab.desc}
              </p>
            </div>

            {/* Notification feed */}
            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--text-4)" }}>Recent notifications</p>
            <div className="flex flex-col gap-2">
              {notifications.map((n) => (
                <div
                  key={n.title}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-150 theme-transition"
                  style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = n.bg; (e.currentTarget as HTMLElement).style.borderColor = `${n.c}30`; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--surface)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0" style={{ background: n.bg, border: `1px solid ${n.c}25` }}>{n.icon}</div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: "var(--text-1)" }}>{n.title}</p>
                    <p className="text-xs" style={{ color: "var(--text-3)" }}>{n.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Phone mockup */}
          <div className="flex-shrink-0 flex justify-center w-full lg:w-auto">
            <div className="animate-float" style={{ animationDuration: "5.5s" }}>
              <div
                className="rounded-[40px] overflow-hidden w-[260px] theme-transition"
                style={{
                  background: "var(--surface)",
                  border: "2px solid var(--border)",
                  boxShadow: "0 32px 80px rgba(0,0,0,0.15), 0 0 0 1px rgba(124,58,237,0.15)",
                }}
              >
                {/* Status bar */}
                <div className="px-6 pt-4 pb-1.5 flex items-center justify-between theme-transition" style={{ background: "var(--surface-2)" }}>
                  <span className="text-[8px] font-semibold" style={{ color: "var(--text-4)" }}>9:41</span>
                  <div className="w-14 h-3.5 rounded-full" style={{ background: "var(--border)" }} />
                  <div className="flex gap-1">
                    <div className="w-3 h-2 rounded-sm" style={{ background: "#7C3AED" }} />
                    <div className="w-1 h-2 rounded-sm" style={{ background: "#7C3AED" }} />
                  </div>
                </div>

                {/* Header */}
                <div className="px-4 py-2.5 flex items-center justify-between border-b theme-transition" style={{ background: "var(--surface-2)", borderColor: "var(--border)" }}>
                  <div>
                    <p className="text-[8px]" style={{ color: "var(--text-4)" }}>Good morning,</p>
                    <p className="text-xs font-bold" style={{ color: "var(--text-1)", fontFamily: "Instrument Sans,sans-serif" }}>Priya Sharma</p>
                  </div>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ background: "linear-gradient(135deg,#7C3AED,#2563EB)" }}>PS</div>
                </div>

                {/* Quick tiles */}
                <div className="px-3 py-3 theme-transition" style={{ background: "var(--bg-3)" }}>
                  <p className="text-[8px] font-semibold uppercase tracking-wide mb-2" style={{ color: "var(--text-4)" }}>Quick Access</p>
                  <div className="grid grid-cols-5 gap-1.5">
                    {["🏠","🚗","💳","🏊","🅿️","💬","📢","🛒","🔧","👤"].map((ic, i) => (
                      <div key={i} className="flex flex-col items-center gap-1 p-1.5 rounded-xl theme-transition" style={{ background: "var(--surface-2)" }}>
                        <span className="text-base">{ic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notifications */}
                <div className="px-3 pb-3 theme-transition" style={{ background: "var(--bg-3)" }}>
                  <p className="text-[8px] font-semibold uppercase tracking-wide mb-2" style={{ color: "var(--text-4)" }}>Recent Activity</p>
                  <div className="flex flex-col gap-1.5">
                    {notifications.slice(0, 3).map((n) => (
                      <div key={n.title} className="flex items-start gap-2 p-2 rounded-xl" style={{ background: n.bg, border: `1px solid ${n.c}20` }}>
                        <div className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] flex-shrink-0 bg-white" style={{ color: n.c }}>{n.icon}</div>
                        <div>
                          <p className="text-[8px] font-semibold" style={{ color: "var(--text-1)" }}>{n.title}</p>
                          <p className="text-[7px]" style={{ color: "var(--text-4)" }}>{n.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom nav */}
                <div className="flex items-center justify-around py-2.5 border-t theme-transition" style={{ background: "var(--surface-2)", borderColor: "var(--border)" }}>
                  {["🏠","🔔","💬","👤"].map((ic, i) => (
                    <div key={i} className="p-1.5 rounded-lg" style={{ background: i === 0 ? "rgba(124,58,237,0.12)" : "transparent" }}>
                      <span className="text-base">{ic}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center py-1.5 theme-transition" style={{ background: "var(--surface-2)" }}>
                  <div className="w-16 h-0.5 rounded-full" style={{ background: "var(--border-strong)" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
