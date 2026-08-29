/* ─────────────────────────────────────────────────────────────────
   Ecosystem — "One connected ecosystem."
   SVG is self-contained: viewBox="0 0 560 560", cx=cy=280, r=190.
   All 10 nodes sit perfectly on the orbit ring.
   Labels rendered inside the SVG for pixel-perfect alignment.
   Center badge is an absolutely-positioned div at 50%/50%.
───────────────────────────────────────────────────────────────── */

const nodes = [
  { label: "Residents",   icon: "👤", angle:   0, color: "#2563EB" },
  { label: "Admin",       icon: "⚙️",  angle:  36, color: "#7C3AED" },
  { label: "Security",    icon: "🛡️",  angle:  72, color: "#059669" },
  { label: "Staff",       icon: "👷",  angle: 108, color: "#D97706" },
  { label: "Buildings",   icon: "🏢", angle: 144, color: "#DB2777" },
  { label: "Visitors",    icon: "🚗", angle: 180, color: "#0D9488" },
  { label: "Amenities",   icon: "🏊", angle: 216, color: "#EA580C" },
  { label: "Parking",     icon: "🅿️",  angle: 252, color: "#4F46E5" },
  { label: "Community",   icon: "📢", angle: 288, color: "#65A30D" },
  { label: "Marketplace", icon: "🛒", angle: 324, color: "#EF4444" },
];

// Canvas dimensions — must match viewBox
const W = 560;
const CX = W / 2;   // 280
const CY = W / 2;   // 280
const R_ORBIT  = 190;   // main orbit radius
const R_LABEL  = 238;   // label radius (outside nodes)
const NODE_R   = 24;    // node circle radius

function toRad(deg: number) { return (deg * Math.PI) / 180; }
function px(angle: number, r: number) { return CX + r * Math.cos(toRad(angle)); }
function py(angle: number, r: number) { return CY + r * Math.sin(toRad(angle)); }

export default function Ecosystem() {
  return (
    <section
      className="py-24 px-6 overflow-hidden section-fade theme-transition"
      style={{ background: "var(--bg-2)" }}
      aria-labelledby="ecosystem-heading"
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-wider uppercase mb-4" style={{ color: "var(--blue)" }}>
            Platform Architecture
          </p>
          <h2
            id="ecosystem-heading"
            className="text-4xl md:text-5xl font-bold leading-tight mb-4"
            style={{ color: "var(--text-1)" }}
          >
            One connected ecosystem.
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "var(--text-2)" }}>
            Every role, every workflow and every interaction stays connected through
            one intelligent platform.
          </p>
        </div>

        {/* Diagram wrapper — scales down on small screens */}
        <div className="flex justify-center items-center overflow-hidden" style={{ minHeight: "260px" }}>
          <div
            id="ecosystem-diagram"
            className="relative flex-shrink-0"
            style={{
              width: `${W}px`,
              height: `${W}px`,
              transformOrigin: "center top",
            }}
          >
            {/* ── SVG: rings, spokes, node circles, labels ── */}
            <svg
              width={W}
              height={W}
              viewBox={`0 0 ${W} ${W}`}
              xmlns="http://www.w3.org/2000/svg"
              className="absolute inset-0"
              aria-hidden="true"
            >
              {/* Outer dashed hint ring */}
              <circle
                cx={CX} cy={CY} r={R_ORBIT + 38}
                fill="none"
                stroke="var(--blue)"
                strokeWidth="1"
                strokeOpacity="0.08"
                strokeDasharray="4 10"
              />

              {/* Main orbit ring */}
              <circle
                cx={CX} cy={CY} r={R_ORBIT}
                fill="none"
                stroke="var(--border)"
                strokeWidth="1.5"
              />

              {/* Inner ring (decorative) */}
              <circle
                cx={CX} cy={CY} r={R_ORBIT * 0.52}
                fill="none"
                stroke="var(--border)"
                strokeWidth="1"
                strokeOpacity="0.5"
              />

              {/* Spokes from center to each node */}
              {nodes.map((node) => (
                <line
                  key={`spoke-${node.label}`}
                  x1={CX} y1={CY}
                  x2={px(node.angle, R_ORBIT - NODE_R - 2)}
                  y2={py(node.angle, R_ORBIT - NODE_R - 2)}
                  stroke={node.color}
                  strokeWidth="1.2"
                  strokeOpacity="0.22"
                  strokeDasharray="4 5"
                />
              ))}

              {/* Node backgrounds (white/surface fill so they sit on top of spoke) */}
              {nodes.map((node) => (
                <circle
                  key={`bg-${node.label}`}
                  cx={px(node.angle, R_ORBIT)}
                  cy={py(node.angle, R_ORBIT)}
                  r={NODE_R + 2}
                  fill="var(--bg-1)"
                  stroke="var(--border)"
                  strokeWidth="1"
                />
              ))}

              {/* Coloured node circles */}
              {nodes.map((node) => (
                <circle
                  key={`fill-${node.label}`}
                  cx={px(node.angle, R_ORBIT)}
                  cy={py(node.angle, R_ORBIT)}
                  r={NODE_R}
                  fill={`${node.color}14`}
                  stroke={node.color}
                  strokeWidth="1.5"
                  strokeOpacity="0.45"
                />
              ))}

              {/* Emoji icons — centered on each node */}
              {nodes.map((node) => (
                <text
                  key={`icon-${node.label}`}
                  x={px(node.angle, R_ORBIT)}
                  y={py(node.angle, R_ORBIT) + 6}
                  textAnchor="middle"
                  fontSize="16"
                  dominantBaseline="auto"
                  style={{ userSelect: "none" }}
                >
                  {node.icon}
                </text>
              ))}

              {/* Labels outside the orbit ring */}
              {nodes.map((node) => {
                const lx = px(node.angle, R_LABEL);
                const ly = py(node.angle, R_LABEL);
                // Nudge label anchor based on position to avoid clipping
                const anchor =
                  Math.abs(lx - CX) < 8
                    ? "middle"
                    : lx < CX
                    ? "end"
                    : "start";
                return (
                  <text
                    key={`lbl-${node.label}`}
                    x={lx}
                    y={ly + 4}
                    textAnchor={anchor}
                    fontSize="10.5"
                    fontWeight="600"
                    fontFamily="Inter, sans-serif"
                    fill="var(--text-2)"
                    style={{ userSelect: "none" }}
                  >
                    {node.label}
                  </text>
                );
              })}
            </svg>

            {/* ── Center badge (HTML div, absolutely positioned) ── */}
            <div
              className="absolute flex flex-col items-center justify-center rounded-full animate-orbit-pulse"
              style={{
                width:  "110px",
                height: "110px",
                top:    "50%",
                left:   "50%",
                transform: "translate(-50%, -50%)",
                background: "linear-gradient(135deg, #2563EB, #4F46E5)",
                zIndex: 10,
              }}
              aria-hidden="true"
            >
              <svg width="24" height="24" viewBox="0 0 18 18" fill="none" className="mb-1">
                <circle cx="9" cy="9" r="3" fill="white"/>
                <circle cx="9" cy="2"  r="1.5" fill="white" opacity="0.75"/>
                <circle cx="9" cy="16" r="1.5" fill="white" opacity="0.75"/>
                <circle cx="2" cy="9"  r="1.5" fill="white" opacity="0.75"/>
                <circle cx="16" cy="9" r="1.5" fill="white" opacity="0.75"/>
                <line x1="9"   y1="3.5"  x2="9"   y2="6"    stroke="white" strokeWidth="1.2" opacity="0.5"/>
                <line x1="9"   y1="12"   x2="9"   y2="14.5" stroke="white" strokeWidth="1.2" opacity="0.5"/>
                <line x1="3.5" y1="9"    x2="6"   y2="9"    stroke="white" strokeWidth="1.2" opacity="0.5"/>
                <line x1="12"  y1="9"    x2="14.5" y2="9"   stroke="white" strokeWidth="1.2" opacity="0.5"/>
              </svg>
              <span
                className="text-[9px] font-bold tracking-widest text-white"
                style={{ fontFamily: "Instrument Sans, sans-serif" }}
              >
                HOMINODE
              </span>
            </div>
          </div>
        </div>

        {/* Responsive scale via CSS (targets the diagram div id) */}
        <style>{`
          #ecosystem-diagram { transform: scale(1); }
          @media (max-width: 1023px) { #ecosystem-diagram { transform: scale(0.78); margin-top: -${Math.round(W*0.22/2)}px; margin-bottom: -${Math.round(W*0.22/2)}px; } }
          @media (max-width: 767px)  { #ecosystem-diagram { transform: scale(0.56); margin-top: -${Math.round(W*0.44/2)}px; margin-bottom: -${Math.round(W*0.44/2)}px; } }
          @media (max-width: 479px)  { #ecosystem-diagram { transform: scale(0.42); margin-top: -${Math.round(W*0.58/2)}px; margin-bottom: -${Math.round(W*0.58/2)}px; } }
        `}</style>

        {/* Mobile fallback grid (shown below lg) */}
        <div className="mt-0 lg:hidden grid grid-cols-3 sm:grid-cols-5 gap-2.5 max-w-lg mx-auto">
          {nodes.map((node) => (
            <div
              key={node.label}
              className="flex flex-col items-center gap-1.5 p-3 rounded-2xl text-center theme-transition"
              style={{ background: `${node.color}0c`, border: `1px solid ${node.color}22` }}
            >
              <span className="text-2xl">{node.icon}</span>
              <span className="text-[10px] font-semibold" style={{ color: "var(--text-2)" }}>
                {node.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
