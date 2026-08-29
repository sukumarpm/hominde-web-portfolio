const testimonials = [
  { quote:"Hominode brought our visitor management, maintenance billing and resident communication into one platform. What used to take hours now runs automatically.", name:"Sample Property Manager", role:"Operations Lead, Residential Community", initials:"PM", color:"#2563EB", tag:"Visitor Management" },
  { quote:"The QR-based visitor system has completely changed how we operate the gate. Security staff are more efficient and residents feel considerably safer.",       name:"Sample Community Admin",   role:"Admin, Gated Township",              initials:"CA", color:"#7C3AED", tag:"Security Platform"  },
  { quote:"We manage four buildings from a single Hominode dashboard. The building-level data separation is exactly what we needed as a property management company.", name:"Sample Property Director", role:"Director, Multi-property Portfolio",  initials:"PD", color:"#059669", tag:"Multi-Building"     },
];

export default function Testimonials() {
  return (
    <section className="py-28 px-6 section-fade theme-transition" style={{ background:"var(--bg-1)" }} aria-labelledby="testimonials-heading">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-wider uppercase mb-4" style={{ color:"var(--blue)" }}>What communities say</p>
          <h2 id="testimonials-heading" className="text-4xl md:text-5xl font-bold leading-tight mb-3" style={{ color:"var(--text-1)" }}>
            Trusted by communities.
          </h2>
          <p className="text-sm" style={{ color:"var(--text-3)" }}>
            Sample testimonials — illustrative of real-world use cases. Replace with actual reviews.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5" role="list">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="p-6 rounded-2xl flex flex-col transition-all duration-200 theme-transition"
              style={{ background:"var(--card)", border:"1px solid var(--border)", boxShadow:"var(--card-shadow)" }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = `${t.color}45`;
                el.style.transform = "translateY(-3px)";
                el.style.boxShadow = `0 12px 40px ${t.color}14`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--border)";
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "var(--card-shadow)";
              }}
              role="listitem"
            >
              {/* Stars + tag */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex gap-1" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_,i) => (
                    <svg key={i} width="13" height="13" viewBox="0 0 12 12" fill="#F59E0B" aria-hidden="true">
                      <path d="M6 1l1.3 2.6L10 4l-2 2 .5 2.8L6 7.5 3.5 8.8 4 6 2 4l2.7-.4L6 1z"/>
                    </svg>
                  ))}
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background:`${t.color}12`, color:t.color, border:`1px solid ${t.color}28` }}>{t.tag}</span>
              </div>

              {/* Quote mark */}
              <div className="text-5xl font-serif leading-none mb-2 select-none" style={{ color:`${t.color}22` }} aria-hidden="true">&ldquo;</div>

              <blockquote className="text-sm leading-relaxed mb-6 flex-1" style={{ color:"var(--text-2)" }}>
                {t.quote}
              </blockquote>

              <figcaption className="flex items-center gap-3 pt-4 border-t" style={{ borderColor:"var(--border)" }}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0" style={{ background:`${t.color}18`, color:t.color }} aria-hidden="true">{t.initials}</div>
                <div>
                  <p className="text-sm font-semibold" style={{ color:"var(--text-1)" }}>{t.name}</p>
                  <p className="text-xs" style={{ color:"var(--text-3)" }}>{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
