import { useState, useEffect } from "react";

const navLinks = [
  { label: "Product",   href: "#product"      },
  { label: "Solutions", href: "#how-it-works"  },
  { label: "Features",  href: "#features"      },
  { label: "Security",  href: "#security"      },
  { label: "Pricing",   href: "#pricing"       },
  { label: "Resources", href: "#faq"           },
];

function Logo() {
  return (
    <a href="#" className="flex items-center gap-2.5 group focus:outline-none" aria-label="Hominode home">
      <img 
        src="/logo.png" 
        alt="Hominode Logo" 
        className="w-8 h-8 object-contain transition-transform duration-200 group-hover:scale-105 flex-shrink-0"
      />
      <span className="text-[17px] font-bold tracking-tight theme-transition" style={{ fontFamily:"Instrument Sans,sans-serif", color:"var(--text-1)" }}>
        HOMINODE
      </span>
    </a>
  );
}

interface NavbarProps { dark: boolean; onToggleDark: () => void; onContact: () => void; }

export default function Navbar({ dark, onToggleDark, onContact }: NavbarProps) {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const go = (href: string) => {
    setMobileOpen(false);
    if (href === "#") return;
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 theme-transition"
      style={{
        background: scrolled ? "var(--navbar-bg)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid var(--navbar-border)` : "none",
        boxShadow: scrolled ? "0 1px 16px rgba(0,0,0,0.06)" : "none",
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between" aria-label="Main navigation">
        <Logo />

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="px-3.5 py-1.5 text-sm rounded-lg font-medium transition-all duration-150 focus:outline-none"
                style={{ color: "var(--text-2)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--text-1)";
                  (e.currentTarget as HTMLElement).style.background = "var(--bg-3)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--text-2)";
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
                onClick={(e) => { e.preventDefault(); go(link.href); }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right: CTAs + Theme toggle */}
        <div className="hidden md:flex items-center gap-2">
          {/* Theme toggle */}
          <button
            onClick={onToggleDark}
            className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 focus:outline-none"
            style={{ background: "var(--bg-3)", border: "1px solid var(--border)", color: "var(--text-2)" }}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            title={dark ? "Light mode" : "Dark mode"}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--blue)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-2)"; }}
          >
            {dark ? (
              /* Sun icon */
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1"  x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22"  y1="4.22"  x2="5.64"  y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1"  y1="12" x2="3"  y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22"  y1="19.78" x2="5.64"  y2="18.36"/>
                <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              /* Moon icon */
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>

          <a
            href="#"
            className="text-sm px-4 py-1.5 rounded-lg font-medium transition-colors focus:outline-none"
            style={{ color: "var(--text-2)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-1)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-2)"; }}
          >
            Login
          </a>
          <button
            className="text-sm px-4 py-2 rounded-xl font-semibold border-2 transition-all duration-150 focus:outline-none"
            style={{ borderColor: "var(--blue)", color: "var(--blue)", background: "transparent" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--blue-bg)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            onClick={onContact}
          >
            Book a Demo
          </button>
          <button
            className="text-sm px-5 py-2 rounded-xl font-semibold text-white btn-primary focus:outline-none"
            onClick={onContact}
          >
            Get Started
          </button>
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={onToggleDark}
            className="w-8 h-8 rounded-lg flex items-center justify-center focus:outline-none"
            style={{ background: "var(--bg-3)", color: "var(--text-2)" }}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {dark ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>
          <button
            className="p-2 rounded-lg focus:outline-none"
            style={{ color: "var(--text-2)" }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              {mobileOpen ? (
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
              ) : (
                <><rect y="3" width="20" height="2" rx="1"/><rect y="9" width="20" height="2" rx="1"/><rect y="15" width="20" height="2" rx="1"/></>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          className="md:hidden px-6 pb-6 pt-2 theme-transition"
          style={{ background: "var(--navbar-bg)", backdropFilter:"blur(20px)", borderBottom:`1px solid var(--navbar-border)` }}
        >
          <ul className="flex flex-col gap-1 mb-4">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="block px-3 py-2.5 text-sm font-medium rounded-lg transition-colors"
                  style={{ color:"var(--text-2)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background="var(--bg-3)"; (e.currentTarget as HTMLElement).style.color="var(--text-1)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background="transparent"; (e.currentTarget as HTMLElement).style.color="var(--text-2)"; }}
                  onClick={(e) => { e.preventDefault(); go(link.href); }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-2 pt-3 border-t theme-transition" style={{ borderColor:"var(--border)" }}>
            <a href="#" className="text-sm px-4 py-2.5 rounded-xl text-center font-medium transition-colors" style={{ color:"var(--text-2)", border:`1px solid var(--border)` }}>Login</a>
            <button className="text-sm px-4 py-2.5 rounded-xl text-center font-semibold border-2 transition-colors" style={{ borderColor:"var(--blue)", color:"var(--blue)" }} onClick={onContact}>Book a Demo</button>
            <button className="text-sm px-4 py-3 rounded-xl font-semibold text-center text-white btn-primary" onClick={onContact}>Get Started</button>
          </div>
        </div>
      )}
    </header>
  );
}
