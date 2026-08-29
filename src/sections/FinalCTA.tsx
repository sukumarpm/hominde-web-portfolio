export default function FinalCTA() {
  const go = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior:"smooth" });

  return (
    <section className="py-28 px-6 relative overflow-hidden section-fade theme-transition" style={{ background:"var(--bg-2)" }} aria-labelledby="cta-heading">
      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-50" aria-hidden="true"/>

      {/* Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] pointer-events-none" style={{ background:"radial-gradient(ellipse, rgba(37,99,235,0.14) 0%, transparent 70%)", filter:"blur(70px)" }} aria-hidden="true"/>
      <div className="absolute top-0 left-0 w-72 h-72 pointer-events-none"     style={{ background:"radial-gradient(ellipse at top left, rgba(99,102,241,0.08) 0%, transparent 70%)" }} aria-hidden="true"/>
      <div className="absolute bottom-0 right-0 w-72 h-72 pointer-events-none" style={{ background:"radial-gradient(ellipse at bottom right, rgba(5,150,105,0.06) 0%, transparent 70%)" }} aria-hidden="true"/>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm mb-8" style={{ background:"var(--blue-bg)", border:"1px solid var(--blue-border)", color:"var(--blue)" }}>
          <span className="w-1.5 h-1.5 rounded-full animate-live" style={{ background:"var(--blue)" }} aria-hidden="true"/>
          Ready to get started?
        </div>

        <h2 id="cta-heading" className="text-4xl md:text-6xl font-bold leading-[1.08] tracking-tight mb-6" style={{ color:"var(--text-1)" }}>
          Build a smarter community{" "}
          <span className="gradient-text">with Hominode.</span>
        </h2>

        <p className="text-lg mb-10 leading-relaxed max-w-xl mx-auto" style={{ color:"var(--text-2)" }}>
          Bring residents, administrators, security teams and community operations together in one connected platform.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => go("#how-it-works")}
            className="flex items-center gap-2.5 px-8 py-4 rounded-xl text-base font-semibold text-white btn-primary focus:outline-none"
          >
            Book a Demo
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>

          <button
            onClick={() => go("#pricing")}
            className="px-8 py-4 rounded-xl text-base font-medium transition-all duration-200 focus:outline-none theme-transition"
            style={{ background:"var(--bg-3)", border:"1.5px solid var(--border)", color:"var(--text-1)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor="var(--blue)"; (e.currentTarget as HTMLElement).style.color="var(--blue)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor="var(--border)"; (e.currentTarget as HTMLElement).style.color="var(--text-1)"; }}
          >
            View Pricing
          </button>
        </div>

        {/* Trust chips */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-12">
          {["🔒 Secure","☁️ Cloud-based","⚡ Real-time","🎨 White-label Ready"].map((item) => (
            <div key={item} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium theme-transition" style={{ background:"var(--bg-3)", border:"1px solid var(--border)", color:"var(--text-2)" }}>
              {item}
            </div>
          ))}
        </div>

        <p className="mt-10 text-xs font-semibold tracking-[0.2em] uppercase" style={{ color:"var(--text-3)", fontFamily:"Instrument Sans,sans-serif" }}>
          Connect. Manage. Live.
        </p>
      </div>
    </section>
  );
}
