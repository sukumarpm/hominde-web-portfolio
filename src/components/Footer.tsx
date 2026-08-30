const footerSections = [
  { title:"Product",   links:[{l:"Platform",href:"#product"},{l:"Features",href:"#features"},{l:"Security",href:"#security"},{l:"Pricing",href:"#pricing"}] },
  { title:"Solutions", links:[{l:"Apartments",href:"#how-it-works"},{l:"Gated Communities",href:"#how-it-works"},{l:"Property Managers",href:"#how-it-works"},{l:"Residential Towers",href:"#how-it-works"}] },
  { title:"Resources", links:[{l:"Documentation",href:"#"},{l:"Help Center",href:"#"},{l:"FAQs",href:"#faq"},{l:"Contact Us",href:"#contact"}] },
  { title:"Company",   links:[{l:"About",href:"#"},{l:"Careers",href:"#"},{l:"Contact",href:"#contact"}] },
  { title:"Legal",     links:[{l:"Privacy Policy",href:"#"},{l:"Terms of Service",href:"#"}] },
];

const socials = [
  { label:"LinkedIn",  path:"M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.5 6.5a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm-.5 2h-1v4h1V8.5zm2 0h-1v4h1v-2.5c0-.69.56-1.25 1.25-1.25.44 0 .75.31.75.75V12.5h1V9.75c0-.97-.78-1.75-1.75-1.75-.48 0-.91.19-1.25.5V8.5zm5.5 0h-1V12.5h1v-2.5c0-.69.56-1.25 1.25-1.25V8c-.7 0-1.3.4-1.6 1l-.15-.5z" },
  { label:"Instagram", path:"M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" },
  { label:"YouTube",   path:"M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z" },
];

function goNav(e: React.MouseEvent<HTMLAnchorElement>, href: string, onContact?: () => void) {
  if (href === "#contact" && onContact) {
    e.preventDefault();
    onContact();
    return;
  }
  if (href.startsWith("#") && href !== "#") {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
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
            <a href="#" className="flex items-center gap-2.5 mb-4 w-fit focus:outline-none" aria-label="Hominode home">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg,#2563EB,#6366F1)" }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <circle cx="9" cy="9" r="3" fill="white"/>
                  <circle cx="9" cy="2"  r="1.5" fill="white" opacity="0.7"/>
                  <circle cx="9" cy="16" r="1.5" fill="white" opacity="0.7"/>
                  <circle cx="2" cy="9"  r="1.5" fill="white" opacity="0.7"/>
                  <circle cx="16" cy="9" r="1.5" fill="white" opacity="0.7"/>
                  <line x1="9"   y1="3.5"  x2="9"   y2="6"    stroke="white" strokeWidth="1" opacity="0.5"/>
                  <line x1="9"   y1="12"   x2="9"   y2="14.5" stroke="white" strokeWidth="1" opacity="0.5"/>
                  <line x1="3.5" y1="9"    x2="6"   y2="9"    stroke="white" strokeWidth="1" opacity="0.5"/>
                  <line x1="12"  y1="9"    x2="14.5" y2="9"   stroke="white" strokeWidth="1" opacity="0.5"/>
                </svg>
              </div>
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
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white btn-primary mb-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              >
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                  <rect x="1" y="2" width="11" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
                  <path d="M1 4.5l5.5 4 5.5-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
                Book a Demo
              </button>
            )}

            <div
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
              style={{ background: "var(--blue-bg)", border: "1px solid var(--blue-border)", color: "var(--blue)" }}
            >
              <span className="w-1 h-1 rounded-full" style={{ background: "var(--blue)" }} aria-hidden="true"/>
              Connect. Manage. Live.
            </div>

            {/* Socials */}
            <div className="flex gap-2.5" role="list" aria-label="Social media links">
              {socials.map((s) => (
                <a
                  key={s.label} href="#"
                  aria-label={s.label}
                  className="w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-150 focus:outline-none theme-transition"
                  style={{ background: "var(--bg-3)", border: "1px solid var(--border)", color: "var(--text-2)" }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color      = "var(--blue)";
                    el.style.borderColor = "var(--blue-border)";
                    el.style.background  = "var(--blue-bg)";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color      = "var(--text-2)";
                    el.style.borderColor = "var(--border)";
                    el.style.background  = "var(--bg-3)";
                  }}
                  role="listitem"
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <path d={s.path}/>
                  </svg>
                </a>
              ))}
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
                      className="text-sm transition-colors duration-150 focus:outline-none"
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
            {["Privacy Policy", "Terms of Service"].map((t) => (
              <a
                key={t} href="#"
                className="text-xs transition-colors"
                style={{ color: "var(--text-3)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--blue)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--text-3)"; }}
              >
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
