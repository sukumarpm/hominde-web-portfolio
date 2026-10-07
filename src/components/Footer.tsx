import React from "react";

const footerSections = [
  {
    title: "Product",
    links: [
      { l: "Platform", href: "#product" },
      { l: "Features", href: "#features" },
      { l: "Demo Community", href: "#demo-community" },
      { l: "Security", href: "#security-platform" },
      { l: "Pricing", href: "#pricing" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { l: "Resident App", href: "#resident-app" },
      { l: "Admin Dashboard", href: "#admin-dashboard" },
      { l: "Visitor Management", href: "#visitor-management" },
      { l: "Automation", href: "#automation" },
    ],
  },
  {
    title: "Resources",
    links: [
      { l: "Analytics", href: "#analytics" },
      { l: "How It Works", href: "#how-it-works" },
      { l: "FAQs", href: "#faq" },
      { l: "Contact Us", href: "#contact" },
    ],
  },
  {
    title: "Company",
    links: [
      { l: "About Hominode", href: "#product" },
      { l: "Book a Demo", href: "#contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { l: "Privacy Policy", href: "/policy" },
      { l: "Terms of Service", href: "/terms" },
    ],
  },
];

function goNav(e: React.MouseEvent<HTMLAnchorElement>, href: string, onContact?: () => void) {
  // Prevent default jumping for empty or placeholder hashes
  if (href === "#") {
    e.preventDefault();
    return;
  }

  // Handle direct page paths
  if (href.startsWith("/")) {
    e.preventDefault();
    window.location.href = href;
    return;
  }

  // Handle contact modal trigger
  if (href === "#contact" && onContact) {
    e.preventDefault();
    onContact();
    return;
  }

  // Handle smooth scroll anchor links
  if (href.startsWith("#")) {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }
}

interface FooterProps { onContact?: () => void; }

export default function Footer({ onContact }: FooterProps) {
  const year = new Date().getFullYear();
  return (
    <footer
      className="pt-16 pb-8 px-6 border-t theme-transition"
      style={{ background: "var(--bg-2)", borderColor: "var(--border)" }}
      aria-label="Site footer"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 mb-14">

          {/* ── Brand column ── */}
          <div className="col-span-2 sm:col-span-3 md:col-span-2">
            <a
              href="/"
              onClick={(e) => { e.preventDefault(); window.location.href = "/"; }}
              className="flex items-center gap-2.5 mb-4 w-fit focus:outline-none"
              aria-label="Hominode home"
            >
              <img
                src="/hominode-mark.svg"
                alt=""
                className="w-8 h-8 object-contain flex-shrink-0"
              />
              <span
                className="text-base font-bold tracking-tight theme-transition"
                style={{ fontFamily: "Instrument Sans,sans-serif", color: "var(--text-1)" }}
              >
                HOMINODE
              </span>
            </a>

            <p className="text-sm leading-relaxed mb-4 max-w-xs" style={{ color: "var(--text-2)" }}>
              One smart platform for your entire residential community.
            </p>

            {/* Book a demo CTA in footer */}
            {onContact && (
              <button
                onClick={onContact}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white btn-primary mb-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 cursor-pointer"
              >
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                  <rect x="1" y="2" width="11" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
                  <path d="M1 4.5l5.5 4 5.5-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
                Book a Demo
              </button>
            )}

            <div
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
              style={{ background: "var(--blue-bg)", border: "1px solid var(--blue-border)", color: "var(--blue)" }}
            >
              <span className="w-1 h-1 rounded-full" style={{ background: "var(--blue)" }} aria-hidden="true" />
              Connect. Manage. Live.
            </div>

          </div>

          {/* ── Link columns ── */}
          {footerSections.map((sec) => (
            <div key={sec.title}>
              <p className="text-xs font-semibold tracking-wider uppercase mb-4" style={{ color: "var(--text-3)" }}>
                {sec.title}
              </p>
              <ul className="flex flex-col gap-2.5" role="list">
                {sec.links.map((link) => (
                  <li key={link.l}>
                    <a
                      href={link.href}
                      className="text-sm transition-colors duration-150 focus:outline-none cursor-pointer"
                      style={{ color: "var(--text-2)" }}
                      onClick={e => goNav(e, link.href, onContact)}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--blue)"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--text-2)"; }}
                    >
                      {link.l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom bar ── */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t theme-transition"
          style={{ borderColor: "var(--border)" }}
        >
          <p className="text-xs" style={{ color: "var(--text-3)" }}>
            &copy; {year} Hominode. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {[
              { title: "Privacy Policy", url: "/policy" },
              { title: "Terms of Service", url: "/terms" }
            ].map((item) => (
              <a
                key={item.title}
                href={item.url}
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = item.url;
                }}
                className="text-xs transition-colors cursor-pointer"
                style={{ color: "var(--text-3)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--blue)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--text-3)" }}
              >
                {item.title}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}