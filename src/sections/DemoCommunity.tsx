const headlineStats = [
  { value: "4",   label: "Buildings",   icon: "🏢" },
  { value: "64",  label: "Homes",       icon: "🏠" },
  { value: "120", label: "Visitors",    icon: "🚗" },
  { value: "288", label: "Bills",       icon: "💳" },
  { value: "36",  label: "Complaints",  icon: "🔧" },
  { value: "24",  label: "Bookings",    icon: "🏊" },
] as const;

const groups = [
  {
    title: "Residents & households",
    icon: "👨‍👩‍👧",
    stats: ["52 resident users", "60 family members", "40 vehicles", "64 homes"],
  },
  {
    title: "Gate & security",
    icon: "🛡️",
    stats: ["4 gates", "6 security staff", "120 visitor records", "60 parcel records"],
  },
  {
    title: "Community operations",
    icon: "🏘️",
    stats: ["36 complaints", "6 amenities", "24 bookings", "12 events & announcements"],
  },
  {
    title: "Billing & payments",
    icon: "💳",
    stats: ["6 billing periods", "288 bills", "12 settlements", "56 payment allocations"],
  },
] as const;

export default function DemoCommunity() {
  return (
    <section
      id="demo-community"
      className="py-24 px-6 section-fade theme-transition"
      style={{ background: "var(--bg)" }}
      aria-labelledby="demo-community-heading"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p
            className="text-sm font-semibold tracking-wider uppercase mb-4"
            style={{ color: "#0E4778" }}
          >
            Demo Community
          </p>
          <h2
            id="demo-community-heading"
            className="text-4xl md:text-5xl font-bold leading-tight mb-4"
            style={{ color: "var(--text-1)" }}
          >
            See Hominode in action.
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: "var(--text-2)" }}
          >
            Green Wave Residences is a fully populated fictional community built to demonstrate
            realistic Hominode workflows across Resident, Admin and Security experiences.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {headlineStats.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl p-4 text-center theme-transition"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                boxShadow: "var(--card-shadow)",
              }}
            >
              <div className="text-xl mb-1" aria-hidden="true">{item.icon}</div>
              <div
                className="text-2xl font-bold"
                style={{ color: "#0E4778", fontFamily: "JetBrains Mono, monospace" }}
              >
                {item.value}
              </div>
              <div className="text-xs mt-1" style={{ color: "var(--text-3)" }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {groups.map((group) => (
            <article
              key={group.title}
              className="rounded-2xl p-6 theme-transition"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                  style={{ background: "rgba(58,166,200,0.12)", border: "1px solid rgba(58,166,200,0.24)" }}
                  aria-hidden="true"
                >
                  {group.icon}
                </div>
                <h3 className="text-base font-semibold" style={{ color: "var(--text-1)" }}>
                  {group.title}
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {group.stats.map((stat) => (
                  <div
                    key={stat}
                    className="rounded-xl px-3 py-2 text-sm"
                    style={{
                      background: "var(--bg-2)",
                      color: "var(--text-2)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    {stat}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div
          className="rounded-2xl p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-4 md:gap-6"
          style={{
            background: "linear-gradient(135deg, rgba(6,28,76,0.97), rgba(14,71,120,0.95))",
            border: "1px solid rgba(58,166,200,0.28)",
          }}
        >
          <div className="flex-1">
            <p className="text-white font-semibold mb-1">Built for demonstration, not decoration.</p>
            <p className="text-sm text-white/65 leading-relaxed">
              The sample data covers resident profiles, visitors, parcels, complaints, amenities,
              events, Billing V2 and payment history so product flows can be explored end to end.
            </p>
          </div>
          <div
            className="px-4 py-2.5 rounded-xl text-xs font-semibold"
            style={{
              background: "rgba(58,166,200,0.16)",
              color: "#A8DCEB",
              border: "1px solid rgba(58,166,200,0.32)",
            }}
          >
            All records are fictional sample data
          </div>
        </div>
      </div>
    </section>
  );
}
