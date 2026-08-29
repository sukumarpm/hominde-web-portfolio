const features = [
  { icon:"🔑", title:"Role-based Access",          desc:"Every user sees only what their role permits. Fine-grained control per building and organisation." },
  { icon:"🔐", title:"Secure Authentication",       desc:"Multi-factor authentication and session management keep accounts protected." },
  { icon:"📋", title:"Firestore Security Rules",    desc:"Data access is enforced at the database level — not just the application layer." },
  { icon:"🏢", title:"Building-level Isolation",    desc:"Data from one building is never accessible to another within the same organisation." },
  { icon:"⚡", title:"Real-time Access Validation", desc:"Permissions are validated in real time — changes apply instantly without cache delay." },
  { icon:"🔒", title:"Encrypted Communication",     desc:"All data in transit uses TLS. Sensitive fields are encrypted at rest." },
  { icon:"👮", title:"Controlled Permissions",      desc:"Administrators operate within clearly defined boundaries set by the organisation." },
  { icon:"📝", title:"Audit-friendly Workflows",    desc:"Every action is timestamped and traceable — visitor approvals, billing, and complaints included." },
];

export default function SecurityPrivacy() {
  return (
    <section id="security" className="py-28 px-6 section-fade theme-transition" style={{ background:"var(--bg-1)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-wider uppercase mb-4" style={{ color:"#059669" }}>Security & Privacy</p>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4" style={{ color:"var(--text-1)" }}>
            Built with security at every layer.
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color:"var(--text-2)" }}>
            Community data is sensitive. Hominode is designed with layered controls, isolation, and auditability from the ground up.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feat) => (
            <div
              key={feat.title}
              className="p-5 rounded-2xl transition-all duration-200 theme-transition"
              style={{ background:"rgba(5,150,105,0.05)", border:"1px solid rgba(5,150,105,0.2)" }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "rgba(5,150,105,0.1)";
                el.style.borderColor = "rgba(5,150,105,0.35)";
                el.style.transform = "translateY(-3px)";
                el.style.boxShadow = "0 8px 28px rgba(5,150,105,0.12)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "rgba(5,150,105,0.05)";
                el.style.borderColor = "rgba(5,150,105,0.2)";
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "none";
              }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-4" style={{ background:"rgba(5,150,105,0.12)" }}>
                {feat.icon}
              </div>
              <h3 className="text-sm font-semibold mb-2" style={{ color:"var(--text-1)" }}>{feat.title}</h3>
              <p className="text-xs leading-relaxed" style={{ color:"var(--text-2)" }}>{feat.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-xs mb-5" style={{ color:"var(--text-3)" }}>
            Security is an ongoing commitment. We design defensively and update continuously.
          </p>
          <a
            href="#faq"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
            style={{ background:"rgba(5,150,105,0.1)", border:"1px solid rgba(5,150,105,0.3)", color:"#059669" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(5,150,105,0.18)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(5,150,105,0.1)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
          >
            Explore Security
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </div>
      </div>
    </section>
  );
}
