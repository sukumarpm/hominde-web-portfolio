const features = [
  { icon:"👤", title:"Resident Management",   desc:"Manage residents, flats, family members and building assignments from one place.",                               color:"#2563EB", tag:"Core"       },
  { icon:"🚗", title:"Visitor Management",    desc:"Digital visitor requests, approvals, QR verification and entry/exit tracking.",                                  color:"#7C3AED", tag:"Core"       },
  { icon:"🛡️", title:"Security Management",   desc:"Give security teams powerful tools for visitor verification, attendance, tasks and emergency response.",          color:"#059669", tag:"Core"       },
  { icon:"💳", title:"Maintenance & Billing", desc:"Create maintenance bills, track payments and manage community collections.",                                      color:"#D97706", tag:"Finance"    },
  { icon:"🏊", title:"Amenities",             desc:"Manage facilities, time slots, capacity and resident bookings with automatic conflict prevention.",               color:"#DB2777", tag:"Facilities" },
  { icon:"🅿️", title:"Parking Management",   desc:"Manage vehicles, parking slots and resident parking assignments without confusion.",                              color:"#0D9488", tag:"Facilities" },
  { icon:"📢", title:"Community",             desc:"Share announcements, posts, events and important community information with all residents.",                      color:"#EA580C", tag:"Social"     },
  { icon:"🛒", title:"Marketplace",           desc:"Allow residents to safely buy, sell and exchange products within their community.",                              color:"#4F46E5", tag:"Social"     },
  { icon:"💬", title:"Messaging",             desc:"Real-time resident-to-resident and resident-to-admin communication.",                                             color:"#2563EB", tag:"Social"     },
  { icon:"👷", title:"Staff Management",      desc:"Manage staff profiles, attendance, assignments, QR identification and daily tasks.",                             color:"#65A30D", tag:"Operations" },
  { icon:"🔧", title:"Complaints",            desc:"Residents raise complaints while administrators assign, track and resolve them end-to-end.",                     color:"#EF4444", tag:"Operations" },
  { icon:"🚨", title:"Emergency & SOS",       desc:"Quickly communicate emergencies and coordinate security response across the community.",                          color:"#DC2626", tag:"Safety"     },
];

export default function CorePlatform() {
  return (
    <section id="features" className="py-24 px-6 section-fade theme-transition" style={{ background:"var(--bg)" }} aria-labelledby="platform-heading">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold tracking-wider uppercase mb-4" style={{ color:"var(--blue)" }}>Core Platform</p>
          <h2 id="platform-heading" className="text-4xl md:text-5xl font-bold leading-tight mb-4" style={{ color:"var(--text-1)" }}>
            Everything your community needs.
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color:"var(--text-2)" }}>
            Twelve powerful modules across three apps — covering every workflow your community depends on.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" role="list">
          {features.map((feat) => (
            <div
              key={feat.title}
              className="p-5 rounded-2xl cursor-default transition-all duration-200 theme-transition"
              style={{ background:"var(--surface)", border:"1px solid var(--border)" }}
              role="listitem"
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = `${feat.color}40`;
                el.style.transform = "translateY(-3px)";
                el.style.boxShadow = "var(--card-shadow-hover)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--border)";
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "none";
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background:`${feat.color}12` }} aria-hidden="true">{feat.icon}</div>
                <span className="px-2 py-0.5 rounded-md text-[9px] font-semibold tracking-wide uppercase" style={{ background:`${feat.color}10`, color:feat.color, border:`1px solid ${feat.color}22` }}>{feat.tag}</span>
              </div>
              <h3 className="text-sm font-semibold mb-2" style={{ color:"var(--text-1)" }}>{feat.title}</h3>
              <p className="text-xs leading-relaxed" style={{ color:"var(--text-3)" }}>{feat.desc}</p>
              <div className="mt-4 h-px w-8 rounded-full" style={{ background:`${feat.color}35` }} aria-hidden="true" />
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm mb-4" style={{ color:"var(--text-4)" }}>All modules are available across Admin, Resident and Security apps — no integrations required.</p>
          <button
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-150 theme-transition focus:outline-none"
            style={{ background:"var(--blue-bg)", border:"1px solid var(--blue-border)", color:"var(--blue)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
            onClick={() => document.querySelector("#how-it-works")?.scrollIntoView({ behavior:"smooth" })}
          >
            See how it works
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </div>
    </section>
  );
}
