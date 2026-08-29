const steps = [
  { step:"01", title:"Configure your community",  desc:"Add buildings, flats, residents, staff and facilities. Hominode structures everything into a clean hierarchy that mirrors your actual community layout.",          icon:"🏗️", color:"#2563EB" },
  { step:"02", title:"Customize your platform",   desc:"Apply your logo, brand colors, app name and enable only the modules your community needs. White-label it to match your organisation's identity.",                  icon:"🎨", color:"#7C3AED" },
  { step:"03", title:"Launch and connect",         desc:"Residents, administrators and security teams start using the platform. Onboarding is simple — residents receive an invite and set up their profile in minutes.", icon:"🚀", color:"#059669" },
];

const useCases = [
  { title:"Apartment Communities",        desc:"Multi-floor apartment buildings with shared amenities, managed billing and seamless resident communication.",               icon:"🏢", color:"#2563EB" },
  { title:"Gated Communities",            desc:"Controlled-access communities with QR-based visitor management and security team coordination.",                            icon:"🔐", color:"#7C3AED" },
  { title:"Residential Towers",           desc:"High-rise towers with large resident bases, multiple floors and complex maintenance requirements.",                         icon:"🏙️", color:"#059669" },
  { title:"Property Management Companies",desc:"Manage multiple properties from one platform with building-level data isolation and unified reporting.",                   icon:"🏦", color:"#D97706" },
  { title:"Multi-Building Communities",   desc:"Campuses or societies with multiple buildings, shared facilities and one unified management layer.",                       icon:"🌆", color:"#DB2777" },
  { title:"Housing Associations",         desc:"Democratically-run housing organisations needing transparent governance and community features.",                           icon:"🤝", color:"#0D9488" },
];

export default function HowItWorks() {
  return (
    <>
      {/* ── How it works ── */}
      <section id="how-it-works" className="py-28 px-6 section-fade theme-transition" style={{ background:"var(--bg-1)" }} aria-labelledby="hiw-heading">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold tracking-wider uppercase mb-4" style={{ color:"var(--blue)" }}>Getting Started</p>
            <h2 id="hiw-heading" className="text-4xl md:text-5xl font-bold leading-tight mb-4" style={{ color:"var(--text-1)" }}>
              Get your community connected in three steps.
            </h2>
            <p className="text-lg max-w-xl mx-auto" style={{ color:"var(--text-2)" }}>
              From initial setup to a fully running community platform — faster than you'd expect.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 relative">
            {/* Connector line */}
            <div
              className="hidden md:block absolute top-[52px] left-[calc(16.66%+24px)] right-[calc(16.66%+24px)] h-px"
              style={{ background:"linear-gradient(90deg,#2563EB55,#7C3AED55,#05966955)" }}
              aria-hidden="true"
            />
            {steps.map((step, i) => (
              <div
                key={step.step}
                className="relative p-6 rounded-2xl transition-all duration-200 theme-transition"
                style={{ background:"var(--card)", border:"1px solid var(--border)", boxShadow:"var(--card-shadow)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = step.color;
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px ${step.color}18`;
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "var(--card-shadow)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold font-mono-data mb-5" style={{ background:`${step.color}14`, border:`1.5px solid ${step.color}`, color:step.color }} aria-label={`Step ${i+1}`}>
                  {step.step}
                </div>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl mb-5" style={{ background:`${step.color}10` }} aria-hidden="true">
                  {step.icon}
                </div>
                <h3 className="text-lg font-semibold mb-3" style={{ color:"var(--text-1)", fontFamily:"Instrument Sans,sans-serif" }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color:"var(--text-2)" }}>{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-base font-semibold text-white btn-primary focus:outline-none"
              onClick={() => document.querySelector("#pricing")?.scrollIntoView({ behavior:"smooth" })}
            >
              Get Started Today
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </div>
      </section>

      {/* ── Use Cases ── */}
      <section className="py-28 px-6 section-fade theme-transition" style={{ background:"var(--bg-2)" }} aria-labelledby="usecases-heading">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold tracking-wider uppercase mb-4" style={{ color:"var(--blue)" }}>Use Cases</p>
            <h2 id="usecases-heading" className="text-4xl md:text-5xl font-bold leading-tight mb-4" style={{ color:"var(--text-1)" }}>
              Built for every residential format.
            </h2>
            <p className="text-lg max-w-xl mx-auto" style={{ color:"var(--text-2)" }}>
              Whether you manage one building or fifty, Hominode scales to your community.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" role="list">
            {useCases.map((uc) => (
              <div
                key={uc.title}
                className="p-6 rounded-2xl transition-all duration-200 theme-transition"
                style={{ background:"var(--card)", border:"1px solid var(--border)", boxShadow:"var(--card-shadow)" }}
                role="listitem"
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = uc.color;
                  el.style.transform = "translateY(-3px)";
                  el.style.boxShadow = `0 12px 40px ${uc.color}18`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--border)";
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "var(--card-shadow)";
                }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5" style={{ background:`${uc.color}12` }} aria-hidden="true">{uc.icon}</div>
                <h3 className="text-base font-semibold mb-2" style={{ color:"var(--text-1)" }}>{uc.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color:"var(--text-2)" }}>{uc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
