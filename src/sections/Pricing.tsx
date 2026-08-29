import { useState } from "react";

const plans = [
  {
    name:"Starter",      tagline:"For small communities getting started",      highlight:false, badge:null,          note:"Per month, billed monthly",
    features:[
      {text:"1 building",           included:true},  {text:"Up to 100 flats",          included:true},
      {text:"2 Admin users",        included:true},  {text:"5 Security users",          included:true},
      {text:"Core modules",         included:true},  {text:"Visitor & maintenance",     included:true},
      {text:"Email support",        included:true},  {text:"Analytics dashboard",       included:false},
      {text:"White-label",          included:false}, {text:"Custom domain",             included:false},
      {text:"Custom branding",      included:false},
    ],
  },
  {
    name:"Professional", tagline:"For growing residential communities",        highlight:true,  badge:"Most Popular", note:"Per month, billed monthly",
    features:[
      {text:"Up to 5 buildings",    included:true},  {text:"Up to 500 flats",           included:true},
      {text:"10 Admin users",       included:true},  {text:"Unlimited security users",  included:true},
      {text:"All modules",          included:true},  {text:"Analytics & reporting",     included:true},
      {text:"Priority support",     included:true},  {text:"White-label",               included:true},
      {text:"Custom domain",        included:false}, {text:"Custom branding",           included:false},
      {text:"Dedicated onboarding", included:false},
    ],
  },
  {
    name:"Enterprise",   tagline:"For large organisations & property managers", highlight:false, badge:null,          note:null,
    features:[
      {text:"Unlimited buildings",  included:true},  {text:"Unlimited flats",           included:true},
      {text:"Unlimited admin users",included:true},  {text:"Unlimited security users",  included:true},
      {text:"All modules + custom features",included:true},{text:"Advanced analytics",  included:true},
      {text:"Dedicated support",    included:true},  {text:"Full white-label",          included:true},
      {text:"Custom domain",        included:true},  {text:"Full custom branding",      included:true},
      {text:"Dedicated onboarding", included:true},
    ],
  },
];

function CheckIcon({ included }: { included: boolean }) {
  if (included) return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true" className="flex-shrink-0">
      <circle cx="7.5" cy="7.5" r="6.5" fill="#ECFDF5"/><path d="M4.5 7.5l2 2 4-4" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true" className="flex-shrink-0">
      <circle cx="7.5" cy="7.5" r="6.5" fill="var(--bg-3)"/><path d="M5 5l5 5M10 5l-5 5" stroke="var(--text-3)" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export default function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="py-28 px-6 section-fade theme-transition" style={{ background:"var(--bg-2)" }} aria-labelledby="pricing-heading">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold tracking-wider uppercase mb-4" style={{ color:"var(--blue)" }}>Pricing</p>
          <h2 id="pricing-heading" className="text-4xl md:text-5xl font-bold leading-tight mb-4" style={{ color:"var(--text-1)" }}>
            Simple, transparent plans.
          </h2>
          <p className="text-lg max-w-lg mx-auto mb-8" style={{ color:"var(--text-2)" }}>
            Choose the plan that fits your community. All plans include full access to the core platform.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-1 p-1 rounded-xl theme-transition" style={{ background:"var(--bg-3)", border:"1px solid var(--border)" }}>
            <button
              onClick={() => setYearly(false)}
              className="px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 focus:outline-none"
              style={{ background:!yearly?"var(--blue)":"transparent", color:!yearly?"#fff":"var(--text-2)" }}
              aria-pressed={!yearly}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className="px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 focus:outline-none flex items-center gap-2"
              style={{ background:yearly?"var(--blue)":"transparent", color:yearly?"#fff":"var(--text-2)" }}
              aria-pressed={yearly}
            >
              Yearly
              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold" style={{ background:"#ECFDF5", color:"#059669" }}>Save 20%</span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="flex flex-col rounded-2xl overflow-hidden transition-all duration-200 theme-transition"
              style={{
                background: plan.highlight ? "var(--blue-bg)" : "var(--card)",
                border: plan.highlight ? `2px solid var(--blue)` : "1px solid var(--border)",
                boxShadow: plan.highlight ? "0 0 0 4px var(--blue-soft), var(--card-shadow)" : "var(--card-shadow)",
              }}
            >
              <div className="p-6 border-b theme-transition" style={{ borderColor:"var(--border)" }}>
                {plan.badge && (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold mb-3" style={{ background:"var(--blue)", color:"#fff" }}>
                    ✦ {plan.badge}
                  </div>
                )}
                <h3 className="text-xl font-bold mb-1" style={{ color:"var(--text-1)", fontFamily:"Instrument Sans,sans-serif" }}>{plan.name}</h3>
                <p className="text-sm mb-5" style={{ color:"var(--text-2)" }}>{plan.tagline}</p>
                <div className="mb-5">
                  <p className="text-2xl font-bold" style={{ color:"var(--text-1)", fontFamily:"Instrument Sans,sans-serif" }}>
                    {plan.name === "Enterprise" ? "Custom" : "Contact Sales"}
                  </p>
                  <p className="text-xs mt-1" style={{ color:"var(--text-3)" }}>
                    {plan.name === "Enterprise" ? "Tailored to your organisation" : yearly ? "Per month, billed annually" : plan.note}
                  </p>
                </div>
                <button
                  className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 focus:outline-none"
                  style={
                    plan.highlight
                      ? { background:"linear-gradient(135deg,#2563EB,#1D4ED8)", color:"#fff", boxShadow:"0 4px 16px rgba(37,99,235,0.4)" }
                      : plan.name === "Enterprise"
                      ? { background:"var(--bg-3)", border:"1.5px solid var(--blue)", color:"var(--blue)" }
                      : { background:"var(--bg-3)", border:"1px solid var(--border)", color:"var(--text-2)" }
                  }
                  onMouseEnter={(e) => { if(plan.highlight){ (e.currentTarget as HTMLElement).style.transform="translateY(-1px)"; } }}
                  onMouseLeave={(e) => { if(plan.highlight){ (e.currentTarget as HTMLElement).style.transform="translateY(0)"; } }}
                >
                  {plan.name === "Enterprise" ? "Talk to Sales" : "Get Started"}
                </button>
              </div>
              <div className="p-6 flex-1">
                <p className="text-[11px] font-semibold uppercase tracking-wider mb-4" style={{ color:"var(--text-3)" }}>What's included</p>
                <ul className="flex flex-col gap-3" role="list">
                  {plan.features.map((feat) => (
                    <li key={feat.text} className="flex items-center gap-2.5">
                      <CheckIcon included={feat.included}/>
                      <span className="text-sm" style={{ color: feat.included ? "var(--text-2)" : "var(--text-3)" }}>{feat.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-sm" style={{ color:"var(--text-2)" }}>
            Need a custom plan?{" "}
            <a href="#faq" className="font-semibold hover:underline underline-offset-2" style={{ color:"var(--blue)" }}>Talk to our team →</a>
          </p>
          <p className="text-xs mt-2" style={{ color:"var(--text-3)" }}>
            All plans include core platform access. Pricing is subject to your community size and requirements.
          </p>
        </div>
      </div>
    </section>
  );
}
