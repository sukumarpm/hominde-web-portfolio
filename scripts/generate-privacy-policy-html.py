#!/usr/bin/env python3
"""Generate a public HTML policy page from the version-controlled Hominode PDF.

The PDF remains the authoritative text source. Conversion does not paraphrase,
summarize, or silently add legal provisions. Run before Vite builds.
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

TEMPLATE = """<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="index,follow">
  <meta name="description" content="Read the Hominode Privacy Policy, including how personal data is handled and how to request account deletion.">
  <link rel="canonical" href="https://hominode.com/policy">
  <link rel="icon" type="image/png" href="/logo.png">
  <title>Privacy Policy | Hominode</title>
  <style>
    :root { color-scheme: light; font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
    * { box-sizing: border-box; }
    body { margin: 0; color: #172b4d; background: #f4f8fb; line-height: 1.7; }
    header { background: white; border-bottom: 1px solid #e2e8f0; }
    .top { max-width: 940px; margin: auto; padding: 19px 22px; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 14px; }
    .brand { display: inline-flex; align-items: center; gap: 12px; font-weight: 800; font-size: 19px; letter-spacing: .05em; text-decoration: none; color: #0e4778; }
    .brand img { width: 38px; height: 38px; object-fit: contain; }
    nav { display: flex; flex-wrap: wrap; gap: 16px; }
    a { color: #0e4778; }
    main { max-width: 940px; margin: 36px auto 70px; padding: 0 18px; }
    article { background: white; border: 1px solid #d9e6ef; border-radius: 16px; padding: clamp(18px, 5vw, 48px); box-shadow: 0 8px 30px #0e477812; }
    h1 { font-size: clamp(26px, 4vw, 36px); margin: 0 0 12px; line-height: 1.2; }
    .intro { color: #475569; margin: 0 0 28px; }
    .policy-text { white-space: pre-wrap; overflow-wrap: anywhere; font: inherit; line-height: 1.75; color: #26374d; margin: 0; }
    footer { margin-top: 22px; font-size: 14px; color: #475569; }
    @media (max-width: 500px) { main { margin-top: 18px; } .top { padding: 14px 18px; } }
  </style>
</head>
<body>
  <header>
    <div class="top">
      <a class="brand" href="/" aria-label="Hominode home"><img src="/logo.png" alt=""> HOMINODE</a>
      <nav aria-label="Legal links">
        <a href="/">Home</a>
        <a href="/account-deletion">Account deletion</a>
      </nav>
    </div>
  </header>
  <main>
    <article>
      <h1>Hominode Privacy Policy</h1>
      <p class="intro">The full policy text below is reproduced from Hominode's published privacy policy document.</p>
      <div class="policy-text">{{POLICY_TEXT}}</div>
      <footer>
        <a href="/assets/HOMINODE_Privacy_Policy_v1.0.pdf">Download PDF copy</a>
        &nbsp;·&nbsp; <a href="/account-deletion">Request account deletion</a>
      </footer>
    </article>
  </main>
</body>
</html>
"""


def main() -> int:
    if not PDF.is_file():
        raise SystemExit(f"Missing policy source PDF: {PDF}")
    if shutil.which("pdftotext") is None:
        raise SystemExit("The pdftotext command is required. On macOS: brew install poppler")

    result = subprocess.run(
        ["pdftotext", "-layout", "-nopgbrk", str(PDF), "-"],
        capture_output=True,
        text=True,
        encoding="utf-8",
        check=False,
    )
    if result.returncode != 0:
        raise SystemExit("Cannot extract policy PDF: " + result.stderr.strip()[:400])

    # Keep the full text, in document order, without paraphrasing or removing clauses.
    text = "\n".join(line.rstrip() for line in result.stdout.splitlines()).strip()
    if len(text) < 1000 or not re.search(r"privacy", text, re.IGNORECASE) or not re.search(r"hominode", text, re.IGNORECASE):
        raise SystemExit("PDF text extraction failed or seems incomplete; refusing to publish a partial policy.")

    OUTPUT.write_text(TEMPLATE.replace("{{POLICY_TEXT}}", html.escape(text)), encoding="utf-8")
    print(f"Generated {OUTPUT.relative_to(ROOT)} ({len(text)} policy-text characters) as HTML")
    return 0


if __name__ == "__main__":
    sys.exit(main())
