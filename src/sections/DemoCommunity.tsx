const headlineStats = [
  { value: "4",   label: "Buildings",   icon: "🏢" },
  { value: "64",  label: "Homes",       icon: "🏠" },
  { value: "120", label: "Visitors",    icon: "🚗" },
  { value: "288", label: "Bills",       icon: "💳" },
  { value: "36",  label: "Complaints",  icon: "🔧" },
  { value: "24",  label: "Bookings",    icon: "🏊" },
] as const;

const operational = [
  { label: "Visitors", value: 120, color: "#0E4778" },
  { label: "Parcels", value: 60, color: "#3AA6C8" },
  { label: "Complaints", value: 36, color: "#F59E0B" },
  { label: "Bookings", value: 24, color: "#14B8A6" },
  { label: "Events", value: 12, color: "#72C5DD" },
] as const;

const household = [
  { label: "Homes", value: 64 },
  { label: "Resident users", value: 52 },
  { label: "Family members", value: 60 },
  { label: "Vehicles", value: 40 },
] as const;

const billing = [
  { label: "Billing periods", value: 6 },
  { label: "Bills", value: 288 },
  { label: "Settlements", value: 12 },
  { label: "Allocations", value: 56 },
] as const;

function HorizontalBars({
  data,
  max,
}: {
  data: readonly { label: string; value: number; color?: string }[];
  max: number;
}) {
  return (
    <div className="space-y-3">
      {data.map((item) => (
        <div key={item.label}>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span style={{ color: "var(--text-2)" }}>{item.label}</span>
            <span className="font-mono-data font-semibold" style={{ color: "var(--text-1)" }}>
              {item.value}
            </span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--bg-3)" }}>
            <div
              className="h-full rounded-full"
              style={{
                width: `${Math.max(8, (item.value / max) * 100)}%`,
                background: item.color ?? "linear-gradient(90deg,#0E4778,#3AA6C8)",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function Ring({ value, total, label }: { value: number; total: number; label: string }) {
  const size = 96;
  const r = 38;
  const c = 2 * Math.PI * r;
  const dash = (value / total) * c;
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle cx="48" cy="48" r={r} fill="none" stroke="var(--bg-3)" strokeWidth="8" />
          <circle
            cx="48"
            cy="48"
            r={r}
            fill="none"
            stroke="#3AA6C8"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${c - dash}`}
            transform="rotate(-90 48 48)"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono-data text-lg font-bold" style={{ color: "#0E4778" }}>
            {value}
          </span>
        </div>
      </div>
      <span className="text-[11px] text-center mt-1" style={{ color: "var(--text-3)" }}>{label}</span>
    </div>
  );
}

export default function DemoCommunity() {
  return (
    <section
      id="demo-community"
      className="py-20 md:py-24 px-6 section-fade theme-transition relative overflow-hidden"
      style={{ background: "var(--bg)" }}
      aria-labelledby="demo-community-heading"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(circle at 15% 15%, rgba(58,166,200,0.10), transparent 28%), radial-gradient(circle at 85% 20%, rgba(14,71,120,0.08), transparent 30%)",
        }}
      />

      <div className="max-w-6xl mx-auto relative">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
              style={{
                background: "rgba(58,166,200,0.12)",
                color: "#0E4778",
                border: "1px solid rgba(58,166,200,0.24)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#3AA6C8" }} />
              LIVE PRODUCT DATASET
            </div>
            <h2
              id="demo-community-heading"
              className="text-4xl md:text-5xl font-bold leading-tight mb-4"
              style={{ color: "var(--text-1)" }}
            >
              Meet Green Wave Residences.
            </h2>
            <p className="text-lg leading-relaxed max-w-2xl" style={{ color: "var(--text-2)" }}>
              A fully populated fictional community designed to show Hominode with realistic
              residents, gate traffic, facilities, complaints, billing and payment history.
            </p>
          </div>

          <div
            className="rounded-2xl px-5 py-4 min-w-[260px]"
            style={{
              background: "linear-gradient(135deg,#061C4C,#0E4778)",
              boxShadow: "0 20px 45px rgba(6,28,76,0.18)",
              border: "1px solid rgba(58,166,200,0.28)",
            }}
          >
            <p className="text-[11px] uppercase tracking-[0.18em] text-white/45">Community ID</p>
            <p className="text-xl font-semibold text-white mt-1">GREEN-WAVE</p>
            <p className="text-xs text-white/55 mt-1">Sample data only · safe for demonstrations</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          {headlineStats.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl p-4 theme-transition"
              style={{
                background: "color-mix(in srgb, var(--surface) 94%, transparent)",
                border: "1px solid var(--border)",
                boxShadow: "var(--card-shadow)",
              }}
            >
              <div className="flex items-center justify-between mb-5">
                <span className="text-xl" aria-hidden="true">{item.icon}</span>
                <span className="w-2 h-2 rounded-full" style={{ background: "#3AA6C8" }} />
              </div>
              <div className="text-2xl font-bold font-mono-data" style={{ color: "#0E4778" }}>
                {item.value}
              </div>
              <div className="text-xs mt-1" style={{ color: "var(--text-3)" }}>{item.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
          <article
            className="lg:col-span-5 rounded-3xl p-6 theme-transition"
            style={{ background: "var(--surface)", border: "1px solid var(--border)", boxShadow: "var(--card-shadow)" }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm font-semibold" style={{ color: "var(--text-1)" }}>Operational activity</p>
                <p className="text-xs mt-1" style={{ color: "var(--text-3)" }}>Seeded records across key workflows</p>
              </div>
              <span className="text-[10px] px-2.5 py-1 rounded-full" style={{ background: "var(--blue-bg)", color: "var(--blue)" }}>
                Demo dataset
              </span>
            </div>
            <HorizontalBars data={operational} max={120} />
          </article>

          <article
            className="lg:col-span-4 rounded-3xl p-6 theme-transition"
            style={{ background: "var(--surface)", border: "1px solid var(--border)", boxShadow: "var(--card-shadow)" }}
          >
            <div className="mb-5">
              <p className="text-sm font-semibold" style={{ color: "var(--text-1)" }}>Community footprint</p>
              <p className="text-xs mt-1" style={{ color: "var(--text-3)" }}>Household and resident profile coverage</p>
            </div>
            <HorizontalBars data={household} max={64} />
          </article>

          <article
            className="lg:col-span-3 rounded-3xl p-6 theme-transition"
            style={{
              background: "linear-gradient(160deg,rgba(6,28,76,0.98),rgba(14,71,120,0.96))",
              border: "1px solid rgba(58,166,200,0.28)",
              boxShadow: "0 18px 48px rgba(6,28,76,0.18)",
            }}
          >
            <p className="text-sm font-semibold text-white">Security coverage</p>
            <p className="text-xs text-white/45 mt-1 mb-4">Gate operations in the demo</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl p-4 text-center" style={{ background: "rgba(255,255,255,0.06)" }}>
                <p className="text-2xl font-bold text-white font-mono-data">4</p>
                <p className="text-[10px] text-white/50 mt-1">Gates</p>
              </div>
              <div className="rounded-2xl p-4 text-center" style={{ background: "rgba(255,255,255,0.06)" }}>
                <p className="text-2xl font-bold text-white font-mono-data">6</p>
                <p className="text-[10px] text-white/50 mt-1">Security staff</p>
              </div>
            </div>
            <div className="mt-3 rounded-2xl p-3" style={{ background: "rgba(20,184,166,0.11)", border: "1px solid rgba(20,184,166,0.22)" }}>
              <p className="text-[11px] font-medium" style={{ color: "#99F6E4" }}>Visitors + parcels + gate history</p>
            </div>
          </article>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <article
            className="lg:col-span-8 rounded-3xl p-6 theme-transition"
            style={{ background: "var(--surface)", border: "1px solid var(--border)", boxShadow: "var(--card-shadow)" }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <p className="text-sm font-semibold" style={{ color: "var(--text-1)" }}>Billing V2 footprint</p>
                <p className="text-xs mt-1" style={{ color: "var(--text-3)" }}>Realistic six-month billing and payment history</p>
              </div>
              <div className="flex gap-5">
                <Ring value={12} total={56} label="Settlements" />
                <Ring value={56} total={288} label="Allocations" />
              </div>
            </div>
            <HorizontalBars data={billing} max={288} />
          </article>

          <article
            className="lg:col-span-4 rounded-3xl p-6 theme-transition"
            style={{ background: "var(--surface)", border: "1px solid var(--border)", boxShadow: "var(--card-shadow)" }}
          >
            <p className="text-sm font-semibold mb-4" style={{ color: "var(--text-1)" }}>What you can demonstrate</p>
            <div className="space-y-2.5">
              {[
                "Resident & household profiles",
                "Visitor approval and gate flows",
                "Parcel intake and handover",
                "Amenities and booking records",
                "Complaint lifecycle tracking",
                "Events and announcements",
                "Bills, settlements and allocations",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-sm" style={{ color: "var(--text-2)" }}>
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-white" style={{ background: "#0E4778" }}>✓</span>
                  {item}
                </div>
              ))}
            </div>
          </article>
        </div>

        <p className="text-center text-xs mt-6" style={{ color: "var(--text-4)" }}>
          All people, records and transactions shown are fictional sample data created for product demonstration.
        </p>
      </div>
    </section>
  );
}
