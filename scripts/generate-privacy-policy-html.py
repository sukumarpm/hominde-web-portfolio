#!/usr/bin/env python3
"""Build a readable HTML privacy-policy page from Hominode's original PDF.

Formatting only: preserve the document's wording and order. A consistency check
rejects any extraction that drops or reorders substantive text.
"""
from __future__ import annotations

import html
import re
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PDF = ROOT / "public/assets/HOMINODE_Privacy_Policy_v1.0.pdf"
OUTPUT = ROOT / "public/policy.html"
PAGE_FURNITURE = re.compile(
    r"^(?:Page\s+\d+(?:\s+of\s+\d+)?|HOMINODE\s*\|\s*Marantrix)$", re.I
)
HEADING = re.compile(r"^([1-9]\d?(?:\.\d+)*)\.\s+(.{3,120})$")
# PDF extraction can render list markers as a striped-square glyph (▤),
# including several markers on a single line. Match the literal source glyphs,
# then represent each item with semantic HTML <li> tags.
BULLET_MARKER = re.compile(r"[•●▪■◾▫‣⁃▤▥▦▧▨▩☰\uf0a7\uf0b7]")
SOURCE_TITLE = {"hominode", "privacy policy"}


def normalize(text: str) -> str:
    return re.sub(r"\s+", " ", text).strip()


def extract_structure(pdf_text: str) -> list[tuple[str, str | list[str]]]:
    lines = [normalize(line.replace("\u00a0", " ")) for line in pdf_text.splitlines()]
    lines = [line for line in lines if not PAGE_FURNITURE.fullmatch(line)]

    # Website h1 replaces only the duplicated PDF-cover title, not its content.
    content: list[str] = []
    seen_section = False
    for line in lines:
        if HEADING.fullmatch(line):
            seen_section = True
        if not seen_section and line.lower() in SOURCE_TITLE:
            continue
        content.append(line)

    items: list[tuple[str, str | list[str]]] = []
    paragraph: list[str] = []
    bullets: list[str] = []

    def flush_paragraph() -> None:
        if paragraph:
            items.append(("paragraph", " ".join(paragraph)))
            paragraph.clear()

    def flush_bullets() -> None:
        if bullets:
            items.append(("bullets", bullets[:]))
            bullets.clear()

    for line in content:
        if not line:
            flush_paragraph()
            flush_bullets()
        elif HEADING.fullmatch(line):
            flush_paragraph()
            flush_bullets()
            items.append(("heading", line))
        elif BULLET_MARKER.search(line):
            # pdftotext -layout may combine multiple list entries on ONE
            # line, e.g. "▤ First item ▤ Second item ▤ Third item".
            # Split on each PDF marker instead of rendering the glyph inline.
            matches = list(BULLET_MARKER.finditer(line))
            prefix = line[:matches[0].start()].strip()
            if prefix:
                flush_bullets()
                paragraph.append(prefix)
            flush_paragraph()
            for index, match in enumerate(matches):
                end = matches[index + 1].start() if index + 1 < len(matches) else len(line)
                item = line[match.end():end].strip()
                if item:
                    bullets.append(item)
        elif bullets:
            bullets[-1] += " " + line  # Wrapped bullet continuation.
        else:
            paragraph.append(line)
    flush_paragraph()
    flush_bullets()

    # Bullets are presentation markers, not policy words. Compare the
    # substantive text before/after formatting to guard against omissions.
    source_words = normalize(BULLET_MARKER.sub(" ", " ".join(content)))
    recovered_words = normalize(BULLET_MARKER.sub(" ", " ".join(
        " ".join(value) if kind == "bullets" else str(value)
        for kind, value in items
    )))
    sections = sum(kind == "heading" for kind, _ in items)
    if source_words != recovered_words:
        raise ValueError("Policy text changed during formatting; refusing to publish")
    if len(source_words) < 1000 or sections < 3:
        raise ValueError("Policy extraction is incomplete; refusing to publish")
    return items


def body_markup(kind: str, value: str | list[str]) -> str:
    if kind == "paragraph":
        return "<p>" + html.escape(str(value)) + "</p>"
    if kind == "bullets":
        return "<ul>" + "".join(
            "<li>" + html.escape(line) + "</li>" for line in value
        ) + "</ul>"
    raise ValueError(f"Unsupported block type: {kind}")


def build_content(items: list[tuple[str, str | list[str]]]) -> tuple[str, str, str]:
    preface: list[tuple[str, str | list[str]]] = []
    sections: list[dict] = []
    for kind, value in items:
        if kind == "heading":
            sections.append({"heading": str(value), "blocks": [], "id": len(sections) + 1})
        elif sections:
            sections[-1]["blocks"].append((kind, value))
        else:
            preface.append((kind, value))
    intro = "".join(body_markup(k, v) for k, v in preface)
    toc = "".join(
        f'<a href="#section-{s["id"]}">{html.escape(s["heading"])}</a>'
        for s in sections
    )
    body = "".join(
        f'<section class="policy-section" id="section-{s["id"]}">'
        f'<h2>{html.escape(s["heading"])}</h2>'
        + "".join(body_markup(k, v) for k, v in s["blocks"])
        + "</section>"
        for s in sections
    )
    return intro, toc, body


TEMPLATE = """<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="index,follow">
  <meta name="description" content="Read Hominode's Privacy Policy, including personal data protection and deletion requests.">
  <link rel="canonical" href="https://hominode.com/policy">
  <link rel="icon" type="image/png" href="/logo.png">
  <title>Privacy Policy | Hominode</title>
  <style>
    @import url("https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap");
    :root { color-scheme: light; font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; scroll-behavior: smooth; }
    * { box-sizing: border-box; }
    body { margin: 0; color: #26374d; background: #f5f8fc; line-height: 1.72; -webkit-font-smoothing: antialiased; }
    a { color: #0e4778; text-underline-offset: 3px; }
    a:hover { color: #075e91; }
    /* Match the marketing homepage navigation while keeping the legal page static. */
    .site-header { position: sticky; top: 0; z-index: 100; background: rgba(255,255,255,.96); border-bottom: 1px solid #e4edf3; backdrop-filter: blur(20px); }
    .header-inner { max-width: 1280px; min-height: 64px; margin: auto; padding: 0 24px; display: flex; align-items: center; justify-content: space-between; gap: 20px; }
    .brand { display: inline-flex; align-items: center; gap: 8px; flex-shrink: 0; font: 700 17px/1.2 "Instrument Sans", Inter, sans-serif; letter-spacing: -.025em; text-decoration: none; color: #111e32; }
    .brand-icon { display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; flex-shrink: 0; overflow: hidden; border-radius: 12px; background: #04152f; }
    .brand img { width: 100%; height: 100%; object-fit: cover; transform: scale(1.3); }
    .header-nav, .header-actions { display: flex; align-items: center; }
    .header-nav { gap: 2px; }
    .header-nav a, .login-link { display: inline-flex; align-items: center; min-height: 36px; padding: 0 12px; border-radius: 8px; color: #46576d; font-size: 14px; font-weight: 500; text-decoration: none; white-space: nowrap; }
    .header-nav a:hover, .login-link:hover { color: #102c4e; background: #edf4f7; }
    .header-actions { gap: 8px; }
    .header-actions a { white-space: nowrap; }
    .theme-toggle, .menu-toggle { display: inline-grid; width: 36px; height: 36px; place-items: center; color: #46576d; background: #edf4f7; border: 1px solid #dde8ee; border-radius: 9px; cursor: pointer; font-size: 18px; }
    .theme-toggle:hover, .menu-toggle:hover { color: #0e4778; }
    .cta-outline, .cta-primary { display: inline-flex; align-items: center; justify-content: center; min-height: 36px; padding: 0 15px; border-radius: 10px; font-size: 14px; font-weight: 650; text-decoration: none; }
    .cta-outline { border: 2px solid #0e4778; background: transparent; color: #0e4778; }
    .cta-outline:hover { background: #eaf7fa; }
    .cta-primary { background: linear-gradient(110deg,#0e4778,#248db4); color: white; border: 1px solid transparent; box-shadow: 0 4px 12px rgba(14,71,120,.18); }
    .cta-primary:hover { filter: brightness(1.08); color: white; }
    .menu-toggle { display: none; }
    .mobile-menu { border-top: 1px solid #e4edf3; padding: 12px 24px 20px; background: inherit; }
    .mobile-menu[hidden] { display: none !important; }
    .mobile-links, .mobile-actions { display: flex; flex-wrap: wrap; gap: 8px; }
    .mobile-links { margin-bottom: 12px; }
    .mobile-links a { color: #46576d; padding: 8px 10px; border-radius: 8px; text-decoration: none; }
    .mobile-actions { padding-top: 12px; border-top: 1px solid #e4edf3; }
    .mobile-actions .login-link { padding: 0 12px; }
    a:focus-visible, button:focus-visible { outline: 3px solid #2d91bd; outline-offset: 3px; }
    @media (max-width: 1110px) {
      .header-nav, .header-actions > .login-link, .header-actions > .cta-outline, .header-actions > .cta-primary { display: none; }
      .menu-toggle { display: inline-grid; }
    }
    @media (max-width: 620px) { .header-inner { padding: 0 18px; } .mobile-menu { padding: 12px 18px 20px; } }
    html[data-theme="dark"] { color-scheme: dark; }
    html[data-theme="dark"] body { color: #dce8f6; background: #061c4c; }
    html[data-theme="dark"] .site-header, html[data-theme="dark"] .mobile-menu { background: rgba(4,21,47,.97); border-color: #284361; }
    html[data-theme="dark"] .brand { color: #f3f8fd; }
    html[data-theme="dark"] .header-nav a, html[data-theme="dark"] .login-link, html[data-theme="dark"] .mobile-links a { color: #c0d0e2; }
    html[data-theme="dark"] .header-nav a:hover, html[data-theme="dark"] .login-link:hover { color: white; background: #12395a; }
    html[data-theme="dark"] .theme-toggle, html[data-theme="dark"] .menu-toggle { color: #dce8f6; background: #082a46; border-color: #284361; }
    html[data-theme="dark"] .cta-outline { color: #6bc4e3; border-color: #6bc4e3; }
    html[data-theme="dark"] .cta-outline:hover { background: #12395a; }
    html[data-theme="dark"] .mobile-actions { border-color: #284361; }
    html[data-theme="dark"] h1, html[data-theme="dark"] h2, html[data-theme="dark"] .toc strong { color: #e2edf9; }
    html[data-theme="dark"] .subtitle, html[data-theme="dark"] footer { color: #adc1d7; }
    html[data-theme="dark"] article { background: #0b294a; border-color: #284361; }
    html[data-theme="dark"] .policy-preface, html[data-theme="dark"] .toc { background: #123451; border-color: #315777; color: #c0d0e2; }
    html[data-theme="dark"] .policy-section { border-color: #284361; }
    html[data-theme="dark"] a { color: #75c7e7; }
    html[data-theme="dark"] .brand { color: #f3f8fd; }
    html[data-theme="dark"] .cta-primary { color: white; }
    html[data-theme="dark"] .header-nav a, html[data-theme="dark"] .login-link { color: #c0d0e2; }
    main { max-width: 900px; margin: auto; padding: 42px 20px 70px; }
    .eyebrow { font-size: 12px; font-weight: 750; text-transform: uppercase; color: #087da4; letter-spacing: .12em; margin: 0 0 8px; }
    h1 { font-size: clamp(30px, 4.8vw, 42px); color: #102c4e; line-height: 1.17; letter-spacing: -.035em; margin: 0 0 10px; }
    .subtitle { font-size: 15px; color: #586b83; margin: 0 0 27px; }
    article { background: #fff; border: 1px solid #e0e7ef; border-radius: 16px; padding: clamp(24px, 5vw, 48px); box-shadow: 0 10px 34px rgba(18,49,85,.055); }
    .policy-preface { background: #f5f9fe; border-left: 3px solid #2d91bd; padding: 16px 20px; border-radius: 0 9px 9px 0; font-size: 14px; color: #455873; }
    .policy-preface p { margin: 0 0 9px; line-height: 1.65; }
    .policy-preface p:last-child { margin-bottom: 0; }
    .toc { background: #fafcff; border: 1px solid #e1ebf4; border-radius: 12px; margin: 25px 0 30px; padding: 19px 23px; }
    .toc strong { display: block; font-size: 14px; margin-bottom: 12px; color: #102c4e; }
    .toc-links { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 8px 22px; }
    .toc a { font-size: 13.5px; text-decoration: none; }
    .policy-section { scroll-margin-top: 84px; border-top: 1px solid #e7edf4; padding-top: 25px; margin-top: 25px; }
    .policy-section:first-of-type { border-top: 0; padding-top: 0; margin-top: 0; }
    h2 { font-size: clamp(19px, 2.4vw, 23px); line-height: 1.42; color: #123d66; letter-spacing: -.015em; margin: 0 0 13px; font-weight: 750; }
    .policy-section p { font-size: 15px; line-height: 1.85; margin: 0 0 15px; overflow-wrap: anywhere; }
    .policy-section p:last-child { margin-bottom: 0; }
    .policy-section ul { margin: 8px 0 18px; padding-left: 28px; list-style-type: disc; list-style-position: outside; }
    .policy-section li::marker { color: #0e84aa; }
    .policy-section li { font-size: 15px; padding-left: 3px; margin-bottom: 9px; line-height: 1.8; }
    footer { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 12px 20px; margin: 29px 0 0; color: #64748b; font-size: 13px; }
    @media (max-width: 620px) { main { padding: 28px 14px 54px; } .toc-links { grid-template-columns: 1fr; } article { border-radius: 12px; } }
    @media print { body { background: white; } .site-header { display: none; } main { max-width: none; padding: 0; } article { border: 0; box-shadow: none; padding: 0; } .toc { display: none; } }
  </style>
</head>
<body>
  <header class="site-header">
    <div class="header-inner">
      <a class="brand" href="/" aria-label="Hominode home">
        <span class="brand-icon" aria-hidden="true"><img src="/logo.png" alt=""></span>
        HOMINODE
      </a>
      <nav class="header-nav" aria-label="Main navigation">
        <a href="/#product">Product</a>
        <a href="/#how-it-works">Solutions</a>
        <a href="/#features">Features</a>
        <a href="/#security-platform">Security</a>
        <a href="/#pricing">Pricing</a>
        <a href="/#faq">Resources</a>
      </nav>
      <div class="header-actions">
        <button class="theme-toggle" type="button" aria-label="Switch to dark mode" title="Switch to dark mode">☾</button>
        <a class="login-link" href="/#login">Login</a>
        <a class="cta-outline" href="/#contact">Book a Demo</a>
        <a class="cta-primary" href="/#contact">Get Started</a>
        <button class="menu-toggle" type="button" aria-label="Open navigation menu" aria-expanded="false" aria-controls="privacy-mobile-menu">☰</button>
      </div>
    </div>
    <nav class="mobile-menu" id="privacy-mobile-menu" aria-label="Mobile navigation" hidden>
      <div class="mobile-links">
        <a href="/#product">Product</a><a href="/#how-it-works">Solutions</a>
        <a href="/#features">Features</a><a href="/#security-platform">Security</a>
        <a href="/#pricing">Pricing</a><a href="/#faq">Resources</a>
      </div>
      <div class="mobile-actions">
        <a class="login-link" href="/#login">Login</a>
        <a class="cta-outline" href="/#contact">Book a Demo</a>
        <a class="cta-primary" href="/#contact">Get Started</a>
      </div>
    </nav>
  </header>
  <main>
    <p class="eyebrow">Legal &amp; privacy</p>
    <h1>Privacy Policy</h1>
    <p class="subtitle">How Hominode handles personal information across its community services.</p>
    <article>
      <div class="policy-preface">{{PREFACE}}</div>
      <nav class="toc" aria-label="Privacy policy sections"><strong>On this page</strong><div class="toc-links">{{TOC}}</div></nav>
      {{CONTENT}}
    </article>
    <footer>
      <span>HOMINODE · Operated by Marantrix</span>
      <span><a href="/assets/HOMINODE_Privacy_Policy_v1.0.pdf">Download original PDF</a> · <a href="/account-deletion">Request account deletion</a></span>
    </footer>
  </main>
  <script>
    // Keep this legal document standalone; the homepage handles interactive login.
    (function () {
      const menuButton = document.querySelector(".menu-toggle");
      const menu = document.querySelector("#privacy-mobile-menu");
      menuButton.addEventListener("click", function () {
        const opening = menuButton.getAttribute("aria-expanded") !== "true";
        menuButton.setAttribute("aria-expanded", String(opening));
        menuButton.setAttribute("aria-label", opening ? "Close navigation menu" : "Open navigation menu");
        menu.hidden = !opening;
      });
      const toggle = document.querySelector(".theme-toggle");
      toggle.addEventListener("click", function () {
        const dark = document.documentElement.getAttribute("data-theme") !== "dark";
        document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
        toggle.textContent = dark ? "☀" : "☾";
        toggle.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
        toggle.setAttribute("title", dark ? "Switch to light mode" : "Switch to dark mode");
      });
    }());
  </script>
</body>
</html>
"""


def main() -> int:
    if not PDF.is_file():
        raise SystemExit(f"Missing policy source PDF: {PDF}")
    if shutil.which("pdftotext") is None:
        raise SystemExit("Install poppler to generate the policy (brew install poppler)")
    result = subprocess.run(
        ["pdftotext", "-layout", "-nopgbrk", str(PDF), "-"],
        capture_output=True,
        text=True,
        encoding="utf-8",
        check=False,
    )
    if result.returncode != 0:
        raise SystemExit("Policy PDF extraction failed: " + result.stderr.strip()[:300])
    items = extract_structure(result.stdout)
    preface, toc, body = build_content(items)
    page = TEMPLATE.replace("{{PREFACE}}", preface).replace("{{TOC}}", toc).replace("{{CONTENT}}", body)
    OUTPUT.write_text(page, encoding="utf-8")
    print(f"Generated formatted {OUTPUT.relative_to(ROOT)}; {sum(t == 'heading' for t, _ in items)} sections")
    return 0


if __name__ == "__main__":
    sys.exit(main())
