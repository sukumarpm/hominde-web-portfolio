const indicators = [
  { icon: "📱", label: "Mobile-first" },
  { icon: "⚡", label: "Real-time sync" },
  { icon: "☁️", label: "Cloud-based" },
  { icon: "🔒", label: "Secure" },
  { icon: "🎨", label: "White-label" },
  { icon: "📈", label: "Scalable" },
];

export default function TrustBar() {
  return (
    <section className="py-12 px-6 border-y section-fade theme-transition" style={{ background:"var(--surface)", borderColor:"var(--border)" }}>
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-sm mb-6" style={{ color:"var(--text-3)" }}>
          Everything your community needs, connected in one place.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {indicators.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 cursor-default theme-transition"
              style={{ background:"var(--bg-2)", border:"1px solid var(--border)", color:"var(--text-3)" }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "var(--blue-bg)";
                el.style.borderColor = "var(--blue-border)";
                el.style.color = "var(--blue)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "var(--bg-2)";
                el.style.borderColor = "var(--border)";
                el.style.color = "var(--text-3)";
              }}
            >
              <span role="img" aria-label={item.label}>{item.icon}</span>
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
