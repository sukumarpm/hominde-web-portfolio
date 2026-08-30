/**
 * ContactSection — Full two-column contact / inquiry section.
 *
 * Left column : headline, description, benefit bullets, direct contact info.
 * Right column: inline InquiryForm (not inside a modal — embedded).
 *
 * Used on the /contact page and as a standalone section.
 */

import InquiryForm from "../components/InquiryForm";

const BENEFITS = [
  "Complete community management platform",
  "Residents · Admins · Security — all in one",
  "Customizable workflows for any community",
  "White-label options for property managers",
  "Scalable from 50 to 5,000+ units",
];

const CONTACT_INFO = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <rect x="1" y="3.5" width="16" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M1 6l8 5.5L17 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    label: "Email us",
    value: "hello@hominode.com",
    href:  "mailto:hello@hominode.com",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M3 3.5C3 2.67 3.67 2 4.5 2h2l1.5 4L6.5 7.5a10 10 0 0 0 4 4l1.5-1.5 4 1.5v2c0 .83-.67 1.5-1.5 1.5C7.16 16 2 10.84 2 4.5A1.5 1.5 0 0 1 3 3.5z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: "Call us",
    value: "+91 XXXXX XXXXX",
    href:  "tel:+91XXXXXXXXXX",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <circle cx="9" cy="7.5" r="2.5" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M9 1.5C5.96 1.5 3.5 3.96 3.5 7c0 4.5 5.5 9.5 5.5 9.5s5.5-5 5.5-9.5c0-3.04-2.46-5.5-5.5-5.5z" stroke="currentColor" strokeWidth="1.4"/>
      </svg>
    ),
    label: "Based in",
    value: "India",
    href:  undefined,
  },
];

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="py-24 px-6 section-fade theme-transition"
      style={{ background: "var(--bg-2)" }}
      aria-labelledby="contact-section-heading"
    >
      <div className="max-w-6xl mx-auto">

        {/* Section label */}
        <div className="text-center mb-14">
          <p
            className="text-sm font-semibold tracking-wider uppercase mb-3"
            style={{ color: "var(--blue)" }}
          >
            Get in Touch
          </p>
          <h2
            id="contact-section-heading"
            className="text-4xl md:text-5xl font-bold leading-tight mb-4"
            style={{ color: "var(--text-1)", fontFamily: "Instrument Sans,sans-serif" }}
          >
            Let's Build a Smarter Community
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "var(--text-2)" }}>
            Tell us a little about your community and our team will get in touch with you.
          </p>
        </div>

        {/* ── Two-column grid ─────────────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* ── LEFT ──────────────────────────────────────────── */}
          <div className="flex flex-col gap-8">
            <div>
              <h3
                className="text-2xl md:text-3xl font-bold mb-4 leading-snug"
                style={{ color: "var(--text-1)", fontFamily: "Instrument Sans,sans-serif" }}
              >
                Let's talk about your{" "}
                <span className="gradient-text">community.</span>
              </h3>
              <p className="text-base leading-relaxed" style={{ color: "var(--text-2)" }}>
                Whether you're managing a residential community, multiple buildings,
                or a growing property portfolio, Hominode can help you bring everything
                together in one intelligent platform.
              </p>
            </div>

            {/* Benefits list */}
            <ul className="flex flex-col gap-3" aria-label="Platform benefits">
              {BENEFITS.map(benefit => (
                <li key={benefit} className="flex items-center gap-3">
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "var(--blue-bg)", border: "1px solid var(--blue-border)" }}
                    aria-hidden="true"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="var(--blue)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span className="text-sm font-medium" style={{ color: "var(--text-1)" }}>
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>

            {/* Direct contact info */}
            <div
              className="rounded-2xl p-5 flex flex-col gap-4 theme-transition"
              style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "var(--card-shadow)" }}
            >
              <p className="text-xs font-semibold tracking-wider uppercase" style={{ color: "var(--text-3)" }}>
                Direct Contact
              </p>
              {CONTACT_INFO.map(({ icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "var(--blue-bg)", color: "var(--blue)" }}
                  >
                    {icon}
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold" style={{ color: "var(--text-3)" }}>
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="text-sm font-medium transition-colors hover:underline underline-offset-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
                        style={{ color: "var(--text-1)" }}
                        onMouseEnter={e => (e.currentTarget.style.color = "var(--blue)")}
                        onMouseLeave={e => (e.currentTarget.style.color = "var(--text-1)")}
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium" style={{ color: "var(--text-1)" }}>{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Response time badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl w-fit"
              style={{ background: "rgba(5,150,105,0.08)", border: "1px solid rgba(5,150,105,0.22)" }}
            >
              <span
                className="w-2 h-2 rounded-full animate-live flex-shrink-0"
                style={{ background: "#059669" }}
                aria-hidden="true"
              />
              <span className="text-sm font-medium" style={{ color: "#059669" }}>
                We respond within 24 hours
              </span>
            </div>
          </div>

          {/* ── RIGHT: Inline form ─────────────────────────────── */}
          <div
            className="rounded-2xl p-6 sm:p-8 theme-transition"
            style={{
              background:  "var(--card)",
              border:      "1px solid var(--border)",
              boxShadow:   "var(--card-shadow)",
            }}
          >
            <InquiryForm />
          </div>
        </div>
      </div>
    </section>
  );
}
