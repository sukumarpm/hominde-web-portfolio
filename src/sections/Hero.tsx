import { useEffect, useRef } from "react";

const floatingCards = [
  { icon:"👥", label:"Visitors Today",        value:"12",     delta:"+3 from yesterday", c:"#2563EB", pos:{ top:"16px",   left:"-28px" },  delay:"0s",   dur:"4s"   },
  { icon:"💰", label:"Maintenance Collected",  value:"₹48,500",delta:"This month",        c:"#059669", pos:{ top:"16px",   right:"-28px" }, delay:"1s",   dur:"4.5s" },
  { icon:"📊", label:"Resident Engagement",   value:"98%",    delta:"+2% this week",     c:"#7C3AED", pos:{ bottom:"60px",left:"-28px" },  delay:"0.5s", dur:"3.8s" },
  { icon:"🛡️", label:"Security Staff Active", value:"24",     delta:"On duty now",       c:"#D97706", pos:{ bottom:"60px",right:"-28px" }, delay:"1.5s", dur:"4.2s" },
];

function DashboardMockup() {
  return (
    <div
      className="w-full rounded-2xl overflow-hidden theme-transition"
      role="img"
      aria-label="Hominode admin dashboard preview"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        boxShadow: "0 24px 80px rgba(0,0,0,0.15), 0 4px 24px rgba(37,99,235,0.08)",
      }}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b theme-transition" style={{ background: "var(--surface-2)", borderColor: "var(--border)" }} aria-hidden="true">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-amber-400" />
          <div className="w-3 h-3 rounded-full bg-emerald-400" />
        </div>
        <div className="flex-1 mx-3 h-5 rounded-md flex items-center px-3 theme-transition" style={{ background: "var(--bg-2)" }}>
          <span className="font-mono-data text-[10px]" style={{ color: "var(--text-4)" }}>app.hominode.com/dashboard</span>
        </div>
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full" style={{ background: "var(--green-bg)", border: "1px solid var(--green-border)" }}>
          <span className="w-1.5 h-1.5 rounded-full animate-live" style={{ background: "var(--green)" }} />
          <span className="text-[9px] font-semibold" style={{ color: "var(--green)" }}>Live</span>
        </div>
      </div>

      {/* App body */}
      <div className="flex" style={{ height: "360px" }}>
        {/* Sidebar */}
        <div className="w-40 flex-shrink-0 flex flex-col py-3 px-2 gap-0.5 border-r theme-transition" style={{ background: "var(--bg-2)", borderColor: "var(--border)" }} aria-hidden="true">
          <div className="px-2 mb-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#2563EB,#6366F1)" }}>
                <svg width="12" height="12" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="3" fill="white"/><circle cx="9" cy="2" r="1.5" fill="white" opacity="0.7"/><circle cx="9" cy="16" r="1.5" fill="white" opacity="0.7"/><circle cx="2" cy="9" r="1.5" fill="white" opacity="0.7"/><circle cx="16" cy="9" r="1.5" fill="white" opacity="0.7"/></svg>
              </div>
              <span className="text-[10px] font-bold" style={{ color: "var(--text-2)", fontFamily:"Instrument Sans,sans-serif" }}>HOMINODE</span>
            </div>
          </div>
          {[
            { ic:"▦", lb:"Dashboard", a:true },
            { ic:"👤", lb:"Residents" },
            { ic:"🚗", lb:"Visitors" },
            { ic:"🛡️", lb:"Security" },
            { ic:"💳", lb:"Maintenance" },
            { ic:"🏊", lb:"Amenities" },
            { ic:"🅿️", lb:"Parking" },
            { ic:"📢", lb:"Community" },
          ].map((item) => (
            <div key={item.lb} className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-[11px] theme-transition" style={{ background: item.a ? "var(--blue-bg)" : "transparent", color: item.a ? "var(--blue)" : "var(--text-4)", fontWeight: item.a ? "600":"400" }}>
              <span className="text-sm leading-none">{item.ic}</span>
              {item.lb}
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="flex-1 p-4 overflow-hidden theme-transition" style={{ background: "var(--surface)" }} aria-hidden="true">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs font-semibold" style={{ color:"var(--text-1)", fontFamily:"Instrument Sans,sans-serif" }}>Overview — Sunrise Residency</p>
              <p className="text-[9px] mt-0.5" style={{ color:"var(--text-4)" }}>Today, 22 Aug 2026</p>
            </div>
            <div className="flex items-center gap-1.5">
              {["All Buildings","Today"].map((f) => (
                <div key={f} className="px-2 py-0.5 rounded text-[9px] theme-transition" style={{ background:"var(--blue-bg)", color:"var(--blue)" }}>{f} ▾</div>
              ))}
            </div>
          </div>

          {/* KPI row */}
          <div className="grid grid-cols-4 gap-2 mb-3">
            {[
              { label:"Residents",   value:"284",  change:"+6", c:"#2563EB", icon:"👤" },
              { label:"Visitors",    value:"12",   change:"+3", c:"#059669", icon:"🚗" },
              { label:"Maintenance", value:"₹1.2L",change:"92%",c:"#7C3AED", icon:"💳" },
              { label:"Complaints",  value:"7",    change:"-2", c:"#D97706", icon:"🔧" },
            ].map((kpi) => (
              <div key={kpi.label} className="rounded-xl p-2 theme-transition" style={{ background:`${kpi.c}0e`, border:`1px solid ${kpi.c}20` }}>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-[7px]" style={{ color:"var(--text-4)" }}>{kpi.label}</p>
                  <span className="text-[9px]">{kpi.icon}</span>
                </div>
                <p className="font-mono-data text-sm font-bold" style={{ color:kpi.c }}>{kpi.value}</p>
                <p className="text-[7px] mt-0.5" style={{ color:"var(--text-4)" }}>{kpi.change} this week</p>
              </div>
            ))}
          </div>

          {/* Chart + activity */}
          <div className="grid grid-cols-5 gap-2 mb-2">
            <div className="col-span-3 rounded-xl p-2.5 theme-transition" style={{ background:"var(--bg-2)", border:"1px solid var(--border)" }}>
              <p className="text-[8px] font-medium mb-2" style={{ color:"var(--text-3)" }}>Visitor Traffic — This Week</p>
              <div className="flex items-end gap-1.5 h-12">
                {[60,85,45,90,70,95,55].map((h,i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                    <div className="w-full rounded-t-sm" style={{ height:`${h}%`, background: i===5 ? "linear-gradient(180deg,#60A5FA,#2563EB)" : "var(--blue-bg)" }} />
                    <span className="text-[6px]" style={{ color:"var(--text-4)" }}>{["M","T","W","T","F","S","S"][i]}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-span-2 rounded-xl p-2.5 theme-transition" style={{ background:"var(--bg-2)", border:"1px solid var(--border)" }}>
              <p className="text-[8px] font-medium mb-1.5" style={{ color:"var(--text-3)" }}>Live Activity</p>
              <div className="flex flex-col gap-1.5">
                {[
                  { text:"Visitor approved: Rajan",dot:"#059669",time:"2m" },
                  { text:"Bill sent: Flat 204B",   dot:"#2563EB",time:"8m" },
                  { text:"Complaint: 101A",         dot:"#D97706",time:"15m"},
                  { text:"Pool booking: D-301",     dot:"#7C3AED",time:"32m"},
                ].map((a,i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background:a.dot }} />
                    <p className="text-[7px] flex-1 truncate" style={{ color:"var(--text-3)" }}>{a.text}</p>
                    <p className="text-[6px]" style={{ color:"var(--text-4)" }}>{a.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom strip */}
          <div className="grid grid-cols-4 gap-1.5">
            {[
              { label:"Parking",  value:"78%",      ic:"🅿️", c:"#4F46E5" },
              { label:"Security", value:"24 active", ic:"🛡️", c:"#059669" },
              { label:"Amenities",value:"8 booked",  ic:"🏊", c:"#DB2777" },
              { label:"Staff",    value:"16 on duty",ic:"👷", c:"#EA580C" },
            ].map((item) => (
              <div key={item.label} className="rounded-xl p-2 flex items-center gap-1.5 theme-transition" style={{ background:`${item.c}0a`, border:`1px solid ${item.c}18` }}>
                <span className="text-sm">{item.ic}</span>
                <div>
                  <p className="text-[7px]" style={{ color:"var(--text-4)" }}>{item.label}</p>
                  <p className="text-[9px] font-semibold" style={{ color:item.c }}>{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.04 }
    );
    ref.current?.querySelectorAll(".section-fade").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-6 overflow-hidden theme-transition"
      style={{ background: "var(--bg)" }}
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 dot-grid opacity-50" aria-hidden="true" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(37,99,235,0.15) 0%, transparent 70%)", filter: "blur(60px)" }} aria-hidden="true" />

      <div className="relative z-10 max-w-6xl mx-auto w-full text-center">
        {/* Badge */}
        <div className="section-fade inline-flex items-center gap-2 mb-7" style={{ transitionDelay:"0s" }}>
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium" style={{ background:"var(--blue-bg)", border:"1px solid var(--blue-border)", color:"var(--blue)" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-live" style={{ background:"var(--blue)" }} aria-hidden="true" />
            Smart Community Management Platform — Mobile Apps
          </div>
        </div>

        {/* Headline */}
        <h1
          id="hero-heading"
          className="section-fade text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-6"
          style={{ transitionDelay:"0.1s" }}
        >
          <span style={{ color:"var(--text-1)" }}>One Platform.</span>
          <br />
          <span className="gradient-text">Every Part of Community Living.</span>
        </h1>

        <p className="section-fade text-lg md:text-xl max-w-2xl mx-auto mb-3 leading-relaxed" style={{ color:"var(--text-2)", transitionDelay:"0.15s" }}>
          Hominode delivers three purpose-built mobile apps — for administrators, residents and security staff — all connected in real time through one intelligent platform.
        </p>
        <p className="section-fade text-sm mb-10" style={{ color:"var(--text-4)", transitionDelay:"0.2s" }}>
          Admin App · Resident App · Security App
        </p>

        {/* CTAs */}
        <div className="section-fade flex flex-col sm:flex-row items-center justify-center gap-4 mb-20" style={{ transitionDelay:"0.25s" }}>
          <button
            className="flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-base font-semibold text-white btn-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
            style={{ background:"linear-gradient(135deg,#2563EB,#1D4ED8)" }}
            onClick={() => document.querySelector("#apps")?.scrollIntoView({ behavior:"smooth" })}
          >
            Explore the Apps
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <button
            className="flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-base font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 theme-transition"
            style={{ background:"var(--surface)", border:"1px solid var(--border)", color:"var(--text-1)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border-strong)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
            onClick={() => document.querySelector("#pricing")?.scrollIntoView({ behavior:"smooth" })}
          >
            View Pricing
          </button>
        </div>

        {/* Dashboard mockup */}
        <div className="section-fade relative max-w-4xl mx-auto" style={{ transitionDelay:"0.35s" }}>
          {floatingCards.map((card) => (
            <div
              key={card.label}
              className="absolute z-20 hidden lg:flex"
              style={{ ...card.pos, animation:`float ${card.dur} ease-in-out infinite`, animationDelay:card.delay }}
              aria-hidden="true"
            >
              <div
                className="flex items-start gap-2.5 px-3.5 py-3 rounded-2xl text-left theme-transition"
                style={{ background:"var(--surface)", border:`1px solid ${card.c}25`, boxShadow:`0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)`, minWidth:"168px" }}
              >
                <span className="text-xl">{card.icon}</span>
                <div>
                  <p className="text-sm font-bold leading-none mb-0.5" style={{ color:card.c }}>{card.value}</p>
                  <p className="text-[10px] font-medium" style={{ color:"var(--text-1)" }}>{card.label}</p>
                  <p className="text-[9px] mt-0.5" style={{ color:"var(--text-4)" }}>{card.delta}</p>
                </div>
              </div>
            </div>
          ))}

          <div className="absolute -inset-6 rounded-3xl pointer-events-none" style={{ background:"radial-gradient(ellipse at center, rgba(37,99,235,0.1) 0%, transparent 70%)", filter:"blur(24px)" }} aria-hidden="true" />
          <DashboardMockup />

          <div className="flex justify-center mt-10">
            <button
              className="flex flex-col items-center gap-1.5 opacity-40 hover:opacity-70 transition-opacity focus:outline-none"
              aria-label="Scroll to explore"
              onClick={() => document.querySelector("#apps")?.scrollIntoView({ behavior:"smooth" })}
            >
              <span className="text-xs" style={{ color:"var(--text-4)" }}>Scroll to explore</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="animate-bounce-sm" aria-hidden="true"><path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color:"var(--text-4)" }}/></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
