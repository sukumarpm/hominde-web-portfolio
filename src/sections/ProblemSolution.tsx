const problems = [
  { icon:"📞", text:"Manual visitor approvals via phone calls" },
  { icon:"📄", text:"Paper-based maintenance records and receipts" },
  { icon:"🔗", text:"Communication gaps between residents and admin" },
  { icon:"🅿️", text:"Parking confusion and untracked assignments" },
  { icon:"🛡️", text:"Security coordination issues at the gate" },
  { icon:"🏊", text:"Amenity booking conflicts and overbooking" },
  { icon:"👷", text:"Staff attendance tracked on paper registers" },
  { icon:"📣", text:"Scattered announcements across WhatsApp groups" },
];
const before = [
  { icon:"📱", text:"Multiple disconnected apps and groups" },
  { icon:"📄", text:"Paper records and spreadsheets" },
  { icon:"📞", text:"Manual approvals via phone calls" },
  { icon:"🔇", text:"Delayed, fragmented communication" },
];
const after = [
  { icon:"⬡", text:"One unified platform for every workflow" },
  { icon:"📊", text:"Real-time data and live dashboards" },
  { icon:"⚡", text:"Automated smart workflows" },
  { icon:"🌐", text:"Connected community ecosystem" },
];

export default function ProblemSolution() {
  return (
    <section id="product" className="py-24 px-6 section-fade theme-transition" style={{ background:"var(--bg-2)" }} aria-labelledby="problem-heading">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold tracking-wider uppercase mb-4" style={{ color:"#EF4444" }}>The Problem</p>
          <h2 id="problem-heading" className="text-4xl md:text-5xl font-bold mb-4 leading-tight" style={{ color:"var(--text-1)" }}>
            Community management shouldn&apos;t feel complicated.
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color:"var(--text-2)" }}>
            Most communities rely on scattered tools, manual processes and endless WhatsApp threads — wasting time every day.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-16" role="list">
          {problems.map((p) => (
            <div key={p.text} className="flex items-start gap-3 px-4 py-3.5 rounded-xl theme-transition" style={{ background:"var(--red-bg)", border:"1px solid rgba(239,68,68,0.18)" }} role="listitem">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm flex-shrink-0 mt-0.5" style={{ background:"rgba(239,68,68,0.15)" }} aria-hidden="true">{p.icon}</div>
              <span className="text-sm leading-snug" style={{ color:"var(--text-2)" }}>{p.text}</span>
            </div>
          ))}
        </div>

        <div className="text-center mb-12">
          <p className="text-sm font-semibold tracking-wider uppercase mb-4" style={{ color:"var(--green)" }}>The Solution</p>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-2" style={{ color:"var(--text-1)" }}>
            Hominode brings everything together.
          </h2>
          <p className="text-base" style={{ color:"var(--text-2)" }}>One platform. Three apps. Every team. Connected.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto">
          <div className="p-6 rounded-2xl theme-transition" style={{ background:"var(--red-bg)", border:"1px solid rgba(239,68,68,0.2)" }}>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background:"rgba(239,68,68,0.15)" }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 3l6 6M9 3l-6 6" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </div>
              <span className="font-semibold text-sm" style={{ color:"#DC2626" }}>Before Hominode</span>
            </div>
            <ul className="flex flex-col gap-3.5" role="list">
              {before.map((item) => (
                <li key={item.text} className="flex items-center gap-3">
                  <span className="text-xl w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background:"rgba(239,68,68,0.12)" }} aria-hidden="true">{item.icon}</span>
                  <span className="text-sm" style={{ color:"var(--text-2)" }}>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-2xl relative overflow-hidden theme-transition" style={{ background:"var(--blue-bg)", border:"1px solid var(--blue-border)" }}>
            <div className="absolute top-0 right-0 w-40 h-40 pointer-events-none" style={{ background:"radial-gradient(ellipse at top right, rgba(37,99,235,0.12) 0%, transparent 70%)" }} aria-hidden="true" />
            <div className="relative z-10">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background:"var(--green-bg)", border:"1px solid var(--green-border)" }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <span className="font-semibold text-sm" style={{ color:"var(--green)" }}>After Hominode</span>
              </div>
              <ul className="flex flex-col gap-3.5" role="list">
                {after.map((item) => (
                  <li key={item.text} className="flex items-center gap-3">
                    <span className="text-xl w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background:"var(--surface)" }} aria-hidden="true">{item.icon}</span>
                    <span className="text-sm font-medium" style={{ color:"var(--text-1)" }}>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
