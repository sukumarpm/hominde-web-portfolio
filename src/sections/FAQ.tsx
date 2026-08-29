import { useState } from "react";

const faqs = [
  { q:"What is Hominode?",                          a:"Hominode is an all-in-one smart residential community management platform. It connects residents, administrators, security teams, staff and property managers into a single intelligent ecosystem — covering everything from visitor management and maintenance billing to amenity bookings and community communication." },
  { q:"Who can use Hominode?",                      a:"Hominode is designed for apartment communities, gated communities, residential towers, property management companies, housing associations, and any multi-unit residential organisation that needs to manage residents, operations and communications efficiently." },
  { q:"Can Hominode support multiple buildings?",   a:"Yes. Hominode is built for multi-building organisations. Each building maintains its own data isolation while the administrator has a unified view across the entire organisation." },
  { q:"Is Hominode white-label?",                   a:"Yes. Hominode can be deployed as a fully white-labeled platform under your organisation's brand. You can apply your logo, colors, app name and domain." },
  { q:"Can we customise the branding?",             a:"Absolutely. You can configure your organisation's logo, primary brand color, app name and choose which modules are visible to your users — creating a tailored experience for your community." },
  { q:"Can residents use a mobile app?",            a:"Yes. Residents access Hominode through a mobile-first web application that covers visitors, bills, amenity bookings, community, messaging, marketplace and more — from their phone." },
  { q:"Can security teams use Hominode?",           a:"Yes. Hominode includes a dedicated security interface with QR scanning, visitor verification, mark in/out, real-time visitor tracking, staff attendance and emergency response tools." },
  { q:"How does visitor QR management work?",       a:"A resident creates a visitor request. Once approved, a unique QR code is generated and shared with the visitor. At the gate, security scans the QR to verify the visitor, and marks them in on arrival and out on departure — all tracked in real time." },
  { q:"How does maintenance billing work?",         a:"Administrators create maintenance bills for individual flats or entire buildings. Residents receive notifications, and payments are tracked within the platform. Admins can view collection status, pending dues and payment history from the dashboard." },
  { q:"Can we manage parking and amenities?",       a:"Yes. Hominode includes dedicated modules for parking slot management and amenity bookings, including capacity limits, time slots and automated conflict prevention." },
  { q:"How is community data protected?",           a:"Hominode applies role-based access control, Firestore security rules, building-level data isolation and encrypted communication. Every action is timestamped for audit purposes. We do not claim absolute security — we design defensively and update controls continuously." },
  { q:"How does community messaging work?",         a:"Hominode includes real-time messaging between residents, and between residents and administrators. Residents can message each other directly, raise queries to management, and receive important announcements through the same interface — keeping all community communication in one place." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number|null>(null);

  return (
    <section id="faq" className="py-28 px-6 section-fade theme-transition" style={{ background:"var(--bg-1)" }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold tracking-wider uppercase mb-4" style={{ color:"var(--blue)" }}>FAQ</p>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight" style={{ color:"var(--text-1)" }}>
            Frequently asked questions.
          </h2>
        </div>

        <div className="flex flex-col gap-2">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden theme-transition"
              style={{
                background: open===i ? "var(--blue-bg)" : "var(--card)",
                border: open===i ? `1.5px solid var(--blue-border)` : "1px solid var(--border)",
                transition: "all 0.2s ease",
              }}
            >
              <button
                className="w-full flex items-center justify-between px-5 py-4 text-left focus:outline-none"
                onClick={() => setOpen(open===i ? null : i)}
                aria-expanded={open===i}
              >
                <span className="text-sm font-medium pr-4" style={{ color: open===i ? "var(--text-1)" : "var(--text-2)" }}>
                  {faq.q}
                </span>
                <svg
                  width="16" height="16" viewBox="0 0 16 16" fill="none"
                  className="flex-shrink-0 transition-transform duration-200"
                  style={{ transform: open===i ? "rotate(45deg)" : "rotate(0deg)", color: open===i ? "var(--blue)" : "var(--text-3)" }}
                >
                  <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
              {open===i && (
                <div className="px-5 pb-5">
                  <p className="text-sm leading-relaxed" style={{ color:"var(--text-2)" }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
