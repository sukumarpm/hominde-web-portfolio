const visitorData     = [40,65,52,80,70,90,60,75,85,55,72,88];
const maintenanceData = [55,70,80,65,90,75,85,92,60,78,88,95];
const months          = ["J","F","M","A","M","J","J","A","S","O","N","D"];

const metrics = [
  { label:"Visitor Trends",         value:"+18%", sub:"vs last month",     color:"#2563EB" },
  { label:"Maintenance Collection", value:"92%",  sub:"collection rate",   color:"#059669" },
  { label:"Amenity Utilization",    value:"74%",  sub:"avg occupancy",     color:"#7C3AED" },
  { label:"Parking Utilization",    value:"78%",  sub:"slots occupied",    color:"#D97706" },
  { label:"Resident Engagement",    value:"98%",  sub:"active this month", color:"#DB2777" },
  { label:"Complaint Resolution",   value:"94%",  sub:"resolved on time",  color:"#0D9488" },
];

function MiniBarChart({ data, color }: { data:number[]; color:string }) {
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-1 h-14">
      {data.map((v,i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
          <div
            className="w-full rounded-sm"
            style={{
              height:`${(v/max)*100}%`,
              background: i===7 ? `linear-gradient(180deg,${color},${color}cc)` : `${color}20`,
              minHeight:"3px",
            }}
          />
          <span className="text-[6px]" style={{ color:"var(--text-3)" }}>{months[i]}</span>
        </div>
      ))}
    </div>
  );
}

function DonutChart({ value, color, size=64 }: { value:number; color:string; size?:number }) {
  const r=(size-8)/2, circ=2*Math.PI*r, dash=(value/100)*circ, cx=size/2, cy=size/2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform:"rotate(-90deg)" }}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--border)" strokeWidth="5"/>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth="5"
        strokeDasharray={`${dash} ${circ-dash}`} strokeLinecap="round"/>
    </svg>
  );
}

export default function Analytics() {
  return (
    <section
      className="py-28 px-6 section-fade theme-transition"
      style={{ background:"var(--bg-2)" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-wider uppercase mb-4" style={{ color:"var(--blue)" }}>
            Analytics & Insights
          </p>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4" style={{ color:"var(--text-1)" }}>
            Know what's happening in your community.
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color:"var(--text-2)" }}>
            Real-time dashboards and trend reports give you a clear picture of every aspect of your community.
          </p>
        </div>

        {/* Analytics mockup */}
        <div
          className="rounded-2xl overflow-hidden theme-transition"
          style={{ background:"var(--card)", border:"1px solid var(--border)", boxShadow:"var(--card-shadow)" }}
          role="img"
          aria-label="Hominode analytics dashboard mockup"
        >
          {/* Browser chrome */}
          <div
            className="flex items-center gap-3 px-5 py-3 border-b theme-transition"
            style={{ background:"var(--bg-2)", borderColor:"var(--border)" }}
            aria-hidden="true"
          >
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full" style={{ background:"#FF5F57" }} />
              <div className="w-3 h-3 rounded-full" style={{ background:"#FEBC2E" }} />
              <div className="w-3 h-3 rounded-full" style={{ background:"#28C840" }} />
            </div>
            <div
              className="h-5 px-3 rounded-md flex items-center theme-transition"
              style={{ background:"var(--bg-3)", minWidth:"200px" }}
            >
              <span className="font-mono-data text-[10px]" style={{ color:"var(--text-3)" }}>
                admin.hominode.com/analytics
              </span>
            </div>
            <div className="flex-1"/>
            <div className="flex gap-2">
              {["This Month","Building A","Export"].map((f) => (
                <div
                  key={f}
                  className="px-2.5 py-1 rounded-lg text-[10px] theme-transition"
                  style={{ background:"var(--bg-3)", color:"var(--text-2)", border:"1px solid var(--border)" }}
                >
                  {f} ▾
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 theme-transition" style={{ background:"var(--card)" }} aria-hidden="true">
            {/* Metric cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-5">
              {metrics.map((m) => (
                <div
                  key={m.label}
                  className="p-3 rounded-xl text-center theme-transition"
                  style={{ background:`${m.color}10`, border:`1px solid ${m.color}25` }}
                >
                  <p className="font-mono-data text-xl font-bold leading-none mb-1" style={{ color:m.color }}>
                    {m.value}
                  </p>
                  <p className="text-[9px] font-semibold leading-tight" style={{ color:"var(--text-2)" }}>{m.label}</p>
                  <p className="text-[8px] mt-0.5" style={{ color:"var(--text-3)" }}>{m.sub}</p>
                </div>
              ))}
            </div>

            {/* Charts row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Visitor chart */}
              <div
                className="md:col-span-1 p-4 rounded-xl theme-transition"
                style={{ background:"var(--bg-2)", border:"1px solid var(--border)" }}
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold" style={{ color:"var(--text-2)" }}>Visitor Traffic</p>
                  <span className="text-[9px] px-2 py-0.5 rounded-full" style={{ background:"rgba(37,99,235,0.12)", color:"#2563EB" }}>2026</span>
                </div>
                <MiniBarChart data={visitorData} color="#2563EB"/>
              </div>

              {/* Maintenance chart */}
              <div
                className="md:col-span-1 p-4 rounded-xl theme-transition"
                style={{ background:"var(--bg-2)", border:"1px solid var(--border)" }}
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold" style={{ color:"var(--text-2)" }}>Maintenance Collection</p>
                  <span className="text-[9px] px-2 py-0.5 rounded-full" style={{ background:"rgba(5,150,105,0.12)", color:"#059669" }}>2026</span>
                </div>
                <MiniBarChart data={maintenanceData} color="#059669"/>
              </div>

              {/* Donut charts */}
              <div
                className="p-4 rounded-xl theme-transition"
                style={{ background:"var(--bg-2)", border:"1px solid var(--border)" }}
              >
                <p className="text-xs font-semibold mb-4" style={{ color:"var(--text-2)" }}>Utilization Rates</p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label:"Amenity",    value:74, color:"#7C3AED" },
                    { label:"Parking",    value:78, color:"#D97706" },
                    { label:"Complaints", value:94, color:"#0D9488" },
                  ].map((d) => (
                    <div key={d.label} className="flex flex-col items-center gap-1">
                      <div className="relative">
                        <DonutChart value={d.value} color={d.color} size={52}/>
                        <div className="absolute inset-0 flex items-center justify-center font-mono-data">
                          <span className="text-[9px] font-bold" style={{ color:d.color }}>{d.value}%</span>
                        </div>
                      </div>
                      <span className="text-[8px]" style={{ color:"var(--text-3)" }}>{d.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Security attendance */}
            <div
              className="mt-4 p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center gap-4 theme-transition"
              style={{ background:"var(--bg-2)", border:"1px solid var(--border)" }}
            >
              <div className="flex-shrink-0">
                <p className="text-xs font-semibold mb-1" style={{ color:"var(--text-2)" }}>
                  Security Attendance — Last 7 Days
                </p>
                <p className="text-[9px]" style={{ color:"var(--text-3)" }}>24 active staff · 98% attendance rate</p>
              </div>
              <div className="flex-1 flex items-end gap-1.5 h-12 w-full">
                {[92,100,88,96,100,92,98].map((v,i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                    <div
                      className="w-full rounded-sm"
                      style={{
                        height:`${v}%`,
                        background: v===100 ? "linear-gradient(180deg,#34D399,#059669)" : "rgba(5,150,105,0.25)",
                        minHeight:"3px",
                      }}
                    />
                    <span className="text-[7px]" style={{ color:"var(--text-3)" }}>
                      {["M","T","W","T","F","S","S"][i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
