#!/usr/bin/env python3
"""Regression test for converting PDF list glyphs into HTML bullets."""
import importlib.util
import sys
import unittest
from pathlib import Path

script = Path(__file__).with_name("generate-privacy-policy-html.py")
spec = importlib.util.spec_from_file_location("hominode_policy_generator", script)
generator = importlib.util.module_from_spec(spec)
sys.modules[spec.name] = generator
spec.loader.exec_module(generator)


class PdfBulletFormattingTests(unittest.TestCase):
    def test_static_legal_header_matches_marketing_navigation(self):
        page = generator.TEMPLATE
        for label, target in (
            ("Product", "/#product"),
            ("Solutions", "/#how-it-works"),
            ("Features", "/#features"),
            ("Security", "/#security-platform"),
            ("Pricing", "/#pricing"),
            ("Resources", "/#faq"),
            ("Login", "/#login"),
            ("Book a Demo", "/#contact"),
            ("Get Started", "/#contact"),
        ):
            self.assertIn(f'href="{target}">{label}</a>', page)
        self.assertIn('class="brand-icon"', page)
        self.assertIn('src="/logo.png"', page)
        self.assertIn('aria-expanded="false"', page)
        self.assertIn('class="theme-toggle"', page)
        self.assertNotIn('class="header-links"', page)

    def test_inline_pdf_markers_become_individual_list_items(self):
        sample = (
            "HOMINODE | Marantrix\n"
            "HOMINODE\nPrivacy Policy\n"
            "Effective Date: 28 August 2026 | Version 1.0\n\n"
            "1. Information We Collect\n"
            + ("Some policy information is collected to support the community. " * 7)
            + "\n\n"
            "▤ Complaints and service requests ▤ Maintenance requests "
            "▤ Amenities and facility bookings\n\n"
            "2. How We Use Information\n"
            + ("Information is used to provide relevant community services. " * 7)
            + "\n\n"
            "▤ Create and manage user accounts ▤ Verify community membership "
            "▤ Assign residents to apartments\n\n"
            "3. Data Security\n"
            + ("Security controls protect information where applicable. " * 7)
            + "\n"
        )
        items = generator.extract_structure(sample)
        groups = [value for kind, value in items if kind == "bullets"]
        self.assertEqual(
            groups,
            [
                ["Complaints and service requests", "Maintenance requests",
                 "Amenities and facility bookings"],
                ["Create and manage user accounts", "Verify community membership",
                 "Assign residents to apartments"],
            ],
        )
        preface, toc, body = generator.build_content(items)
        self.assertEqual(body.count("<li>"), 6)
        self.assertNotIn("▤", body)
        self.assertIn('id="section-1"', body)
        self.assertIn("Effective Date", preface)
        self.assertIn("3. Data Security", toc)


if __name__ == "__main__":
    unittest.main()
