const steps = [
  "Resident creates visitor request",
  "Admin approval",
  "QR code generated",
  "Resident shares QR",
  "Security scans QR",
  "Visitor verified",
  "Mark In",
  "Mark Exit",
];

function VisitorCard() {
  return (
    <div
      className="rounded-2xl overflow-hidden theme-transition"
      style={{
        width: "320px",
        background: "var(--card)",
        border: "1px solid var(--border)",
        boxShadow: "var(--card-shadow)",
      }}
    >
      {/* Header */}
      <div
        className="px-4 py-3 flex items-center justify-between border-b theme-transition"
        style={{ background: "var(--bg-2)", borderColor: "var(--border)" }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center text-xs theme-transition"
            style={{ background: "var(--blue-bg)" }}
          >
            🛡️
          </div>
          <span className="text-xs font-semibold" style={{ color: "var(--text-2)" }}>
            Security Gate — Scan
          </span>
        </div>
        <div
          className="px-2 py-0.5 rounded-full text-[10px] font-semibold flex items-center gap-1"
          style={{ background: "rgba(5,150,105,0.12)", color: "#059669" }}
        >
          <span className="w-1 h-1 rounded-full animate-live" style={{ background: "#059669" }} />
          LIVE
        </div>
      </div>

      {/* QR area */}
      <div className="p-4 flex flex-col items-center theme-transition" style={{ background: "var(--card)" }}>
        <div
          className="w-24 h-24 rounded-xl flex items-center justify-center mb-4 theme-transition"
          style={{ background: "var(--blue-bg)", border: "1px solid var(--blue-border)" }}
        >
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            <rect x="4"  y="4"  width="22" height="22" rx="2" stroke="#2563EB" strokeWidth="1.5" fill="none"/>
            <rect x="10" y="10" width="10" height="10" rx="1" fill="#2563EB" fillOpacity="0.5"/>
            <rect x="34" y="4"  width="22" height="22" rx="2" stroke="#2563EB" strokeWidth="1.5" fill="none"/>
            <rect x="40" y="10" width="10" height="10" rx="1" fill="#2563EB" fillOpacity="0.5"/>
            <rect x="4"  y="34" width="22" height="22" rx="2" stroke="#2563EB" strokeWidth="1.5" fill="none"/>
            <rect x="10" y="40" width="10" height="10" rx="1" fill="#2563EB" fillOpacity="0.5"/>
            <rect x="34" y="34" width="4"  height="4"  fill="#2563EB" fillOpacity="0.35"/>
            <rect x="40" y="34" width="4"  height="4"  fill="#2563EB" fillOpacity="0.35"/>
            <rect x="46" y="34" width="10" height="4"  fill="#2563EB" fillOpacity="0.35"/>
            <rect x="34" y="40" width="10" height="4"  fill="#2563EB" fillOpacity="0.35"/>
            <rect x="46" y="42" width="4"  height="4"  fill="#2563EB" fillOpacity="0.35"/>
            <rect x="40" y="48" width="16" height="4"  fill="#2563EB" fillOpacity="0.35"/>
          </svg>
        </div>
        <p className="text-xs font-semibold mb-1" style={{ color: "#059669" }}>✓ QR Verified</p>

        {/* Visitor info table */}
        <div
          className="w-full rounded-xl p-3 mt-2 theme-transition"
          style={{ background: "var(--bg-2)", border: "1px solid var(--border)" }}
        >
          {[
            { label: "Name",     value: "Rajan Mehta" },
            { label: "Phone",    value: "+91 98765 43210" },
            { label: "Purpose",  value: "Family visit" },
            { label: "Flat",     value: "B-204, Tower B" },
            { label: "Expected", value: "2:00 PM – 6:00 PM" },
            { label: "Status",   value: "✓ Approved", isGreen: true },
          ].map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between py-1.5 border-b last:border-0 theme-transition"
              style={{ borderColor: "var(--border)" }}
            >
              <span className="text-[10px]" style={{ color: "var(--text-3)" }}>{row.label}</span>
              <span
                className="text-[10px] font-medium"
                style={{ color: row.isGreen ? "#059669" : "var(--text-2)" }}
              >
                {row.value}
              </span>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-2 w-full mt-3">
          <button
            className="py-2 rounded-lg text-xs font-semibold"
            style={{ background: "rgba(5,150,105,0.12)", color: "#059669", border: "1px solid rgba(5,150,105,0.3)" }}
          >
            Mark In ↓
          </button>
          <button
            className="py-2 rounded-lg text-xs font-semibold"
            style={{ background: "rgba(239,68,68,0.1)", color: "#EF4444", border: "1px solid rgba(239,68,68,0.3)" }}
          >
            Mark Exit ↑
          </button>
        </div>
      </div>
    </div>
  );
}

export default function VisitorFlow() {
  return (
    <section
      className="py-28 px-6 section-fade theme-transition"
      style={{ background: "var(--bg-2)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-wider uppercase mb-4" style={{ color: "var(--blue)" }}>
            Visitor Management
          </p>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4" style={{ color: "var(--text-1)" }}>
            Visitors, simplified.
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "var(--text-2)" }}>
            From resident request to verified gate entry — fully automated, QR-powered, and trackable.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-16 justify-center">
          {/* Flow steps */}
          <div className="flex flex-col gap-2 max-w-xs w-full">
            {steps.map((step, i) => (
              <div key={step} className="flex items-center gap-3">
                <div className="flex flex-col items-center">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-mono-data theme-transition"
                    style={{
                      background:  i >= steps.length - 2 ? "rgba(5,150,105,0.12)" : "var(--blue-bg)",
                      color:       i >= steps.length - 2 ? "#059669" : "var(--blue)",
                      border: `1px solid ${i >= steps.length - 2 ? "rgba(5,150,105,0.3)" : "var(--blue-border)"}`,
                    }}
                  >
                    {i + 1}
                  </div>
                  {i < steps.length - 1 && (
                    <div
                      className="w-px my-1"
                      style={{ background: "var(--blue-border)", height: "12px", opacity: 0.5 }}
                    />
                  )}
                </div>
                <span className="text-sm" style={{ color: "var(--text-2)" }}>{step}</span>
              </div>
            ))}
          </div>

          {/* Visitor card */}
          <div className="animate-float" style={{ animationDuration: "5s" }}>
            <VisitorCard />
          </div>
        </div>

        <div className="text-center mt-12">
          <button
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white btn-primary transition-all focus:outline-none"
          >
            Explore Visitor Management
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
