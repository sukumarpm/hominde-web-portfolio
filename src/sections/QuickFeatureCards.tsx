/**
 * QuickFeatureCards — 6 feature cards immediately below the hero.
 * "Everything your community needs."
 * Each card links/scrolls to its corresponding detailed section.
 */

const features = [
  {
    icon: "👤",
    title: "Resident Management",
    desc: "Onboard residents, manage profiles, and track activity across every flat.",
    color: "#0E4778",
    anchor: "#resident-app",
    bg: "rgba(14,71,120,0.08)",
    border: "rgba(14,71,120,0.18)",
    hoverBorder: "rgba(14,71,120,0.45)",
  },
  {
    icon: "🚗",
    title: "Visitor Management",
    desc: "Invite, approve, and track every visitor with QR-based entry and exit.",
    color: "#059669",
    anchor: "#visitor-management",
    bg: "rgba(5,150,105,0.08)",
    border: "rgba(5,150,105,0.18)",
    hoverBorder: "rgba(5,150,105,0.45)",
  },
  {
    icon: "💳",
    title: "Billing & Payments",
    desc: "Generate bills, collect payments, and issue digital receipts automatically.",
    color: "#3AA6C8",
    anchor: "#admin-dashboard",
    bg: "rgba(58,166,200,0.08)",
    border: "rgba(58,166,200,0.18)",
    hoverBorder: "rgba(58,166,200,0.45)",
  },
  {
    icon: "🏊",
    title: "Amenities",
    desc: "Smart booking for pools, gyms, courts, and halls with real-time availability.",
    color: "#DB2777",
    anchor: "#demo-community",
    bg: "rgba(219,39,119,0.08)",
    border: "rgba(219,39,119,0.18)",
    hoverBorder: "rgba(219,39,119,0.45)",
  },
  {
    icon: "🅿️",
    title: "Security Operations",
    desc: "Give gate teams fast visitor verification, parcel handling, and activity tracking.",
    color: "#0E4778",
    anchor: "#security-platform",
    bg: "rgba(14,71,120,0.08)",
    border: "rgba(14,71,120,0.18)",
    hoverBorder: "rgba(14,71,120,0.45)",
  },
  {
    icon: "📢",
    title: "Community",
    desc: "Announcements, events, messaging, and a resident marketplace — all in one place.",
    color: "#D97706",
    anchor: "#demo-community",
    bg: "rgba(217,119,6,0.08)",
    border: "rgba(217,119,6,0.18)",
    hoverBorder: "rgba(217,119,6,0.45)",
  },
] as const;

function FeatureCard({
  icon, title, desc, color, anchor, bg, border, hoverBorder,
}: (typeof features)[number]) {
  return (
    <a
      href={anchor}
      onClick={(e) => {
        e.preventDefault();
        document.querySelector(anchor)?.scrollIntoView({ behavior: "smooth" });
      }}
      className="group flex flex-col gap-4 p-6 rounded-2xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 theme-transition"
      style={{
        background: "var(--card)",
        border: `1px solid var(--border)`,
        boxShadow: "var(--card-shadow)",
        textDecoration: "none",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.background = bg;
        el.style.borderColor = hoverBorder;
        el.style.boxShadow = `0 8px 32px ${color}18, 0 2px 8px rgba(0,0,0,0.06)`;
        el.style.transform = "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.background = "var(--card)";
        el.style.borderColor = "var(--border)";
        el.style.boxShadow = "var(--card-shadow)";
        el.style.transform = "translateY(0)";
      }}
      aria-label={`${title} — scroll to section`}
    >
      {/* Icon */}
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
        style={{ background: bg, border: `1px solid ${border}` }}
      >
        <span role="img" aria-hidden="true">{icon}</span>
      </div>

      {/* Text */}
      <div>
        <h3
          className="text-base font-semibold mb-1.5 theme-transition"
          style={{ color: "var(--text-1)", fontFamily: "Instrument Sans,sans-serif" }}
        >
          {title}
        </h3>
        <p className="text-sm leading-relaxed theme-transition" style={{ color: "var(--text-2)" }}>
          {desc}
        </p>
      </div>

      {/* Arrow */}
      <div
        className="mt-auto flex items-center gap-1 text-xs font-semibold transition-all duration-200 group-hover:gap-2"
        style={{ color }}
      >
        Learn more
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M2 7h10M8 3.5l3.5 3.5L8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </a>
  );
}

export default function QuickFeatureCards() {
  return (
    <section
      id="quick-features"
      className="py-20 px-6 section-fade theme-transition"
      style={{ background: "var(--section-shade)" }}
      aria-labelledby="quick-features-heading"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2
            id="quick-features-heading"
            className="text-3xl sm:text-4xl font-bold mb-4 theme-transition"
            style={{ color: "var(--text-1)", fontFamily: "Instrument Sans,sans-serif" }}
          >
            Everything your community needs.
          </h2>
          <p className="text-base max-w-lg mx-auto theme-transition" style={{ color: "var(--text-2)" }}>
            One platform covering every aspect of modern residential community management.
          </p>
        </div>

        {/* 6-card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
}
