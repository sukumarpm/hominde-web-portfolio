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
    :root { color-scheme: light; font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; scroll-behavior: smooth; }
    * { box-sizing: border-box; }
    body { margin: 0; color: #26374d; background: #f5f8fc; line-height: 1.72; -webkit-font-smoothing: antialiased; }
    a { color: #0e4778; text-underline-offset: 3px; }
    a:hover { color: #075e91; }
    .site-header { background: #fff; border-bottom: 1px solid #dde6ee; }
    .header-inner { max-width: 1030px; margin: auto; padding: 18px 24px; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px; }
    .brand { display: inline-flex; align-items: center; gap: 12px; font-weight: 800; font-size: 19px; text-decoration: none; color: #0e4778; letter-spacing: .03em; }
    .brand img { width: 38px; height: 38px; object-fit: contain; }
    .header-links { display: flex; flex-wrap: wrap; gap: 22px; font-size: 14px; font-weight: 600; }
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
    .policy-section { scroll-margin-top: 24px; border-top: 1px solid #e7edf4; padding-top: 25px; margin-top: 25px; }
    .policy-section:first-of-type { border-top: 0; padding-top: 0; margin-top: 0; }
    h2 { font-size: clamp(19px, 2.4vw, 23px); line-height: 1.42; color: #123d66; letter-spacing: -.015em; margin: 0 0 13px; font-weight: 750; }
    .policy-section p { font-size: 15px; line-height: 1.85; margin: 0 0 15px; overflow-wrap: anywhere; }
    .policy-section p:last-child { margin-bottom: 0; }
    .policy-section ul { margin: 8px 0 18px; padding-left: 28px; list-style-type: disc; list-style-position: outside; }
    .policy-section li::marker { color: #0e84aa; }
    .policy-section li { font-size: 15px; padding-left: 3px; margin-bottom: 9px; line-height: 1.8; }
    footer { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 12px 20px; margin: 29px 0 0; color: #64748b; font-size: 13px; }
    @media (max-width: 620px) { .header-inner { padding: 14px 18px; } .header-links { gap: 15px; } main { padding: 28px 14px 54px; } .toc-links { grid-template-columns: 1fr; } article { border-radius: 12px; } }
    @media print { body { background: white; } main { max-width: none; padding: 0; } article { border: 0; box-shadow: none; padding: 0; } .toc { display: none; } }
  </style>
</head>
<body>
  <header class="site-header"><div class="header-inner">
    <a class="brand" href="/" aria-label="Hominode home"><img src="/logo.png" alt="">HOMINODE</a>
    <nav class="header-links" aria-label="Legal navigation"><a href="/">Home</a><a href="/account-deletion">Account deletion</a></nav>
  </div></header>
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
