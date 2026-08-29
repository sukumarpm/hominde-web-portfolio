import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import ContactModal from "./components/ContactModal";

/* ── Hero + video experience ── */
import Hero from "./sections/Hero";
import QuickFeatureCards from "./sections/QuickFeatureCards";
import VideoChapterNav from "./sections/VideoChapterNav";

/* ── Platform sections ── */
import TrustBar from "./sections/TrustBar";
import ProblemSolution from "./sections/ProblemSolution";
import CorePlatform from "./sections/CorePlatform";
import ResidentApp from "./sections/ResidentApp";
import AdminDashboard from "./sections/AdminDashboard";
import VisitorFlow from "./sections/VisitorFlow";
import SecurityPlatform from "./sections/SecurityPlatform";
import Ecosystem from "./sections/Ecosystem";
import WhiteLabel from "./sections/WhiteLabel";
import Automation from "./sections/Automation";
import SecurityPrivacy from "./sections/SecurityPrivacy";
import Analytics from "./sections/Analytics";
import HowItWorks from "./sections/HowItWorks";
import Testimonials from "./sections/Testimonials";
import Pricing from "./sections/Pricing";
import FAQ from "./sections/FAQ";
import FinalCTA from "./sections/FinalCTA";
import Footer from "./components/Footer";

export default function App() {
  const [dark, setDark]               = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [activeChapter, setActiveChapter] = useState(1);

  /* ── Apply theme ── */
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  }, [dark]);

  /* ── Scroll-reveal for all section-fade elements ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        }),
      { threshold: 0.06, rootMargin: "0px 0px -30px 0px" }
    );
    document.querySelectorAll(".section-fade").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* ── Global "Book a Demo" / "Get Started" event listeners ── */
  useEffect(() => {
    const handleOpen = () => setContactOpen(true);
    window.addEventListener("hominode:openContact", handleOpen);
    return () => window.removeEventListener("hominode:openContact", handleOpen);
  }, []);

  return (
    <div className="min-h-screen theme-transition" style={{ background: "var(--bg-1)" }}>
      <Navbar
        dark={dark}
        onToggleDark={() => setDark((d) => !d)}
        onContact={() => setContactOpen(true)}
      />

      <main>
        {/*
         * ════════════════════════════════════════
         *  MARKETING FLOW
         * ════════════════════════════════════════
         *  1.  HERO + PRODUCT VIDEO
         *  2.  VIDEO CHAPTER NAV
         *  3.  QUICK FEATURE CARDS
         *  4.  TRUST / VALUE BAR
         *  5.  COMMUNITY PROBLEM → SOLUTION
         *  6.  HOMINODE PLATFORM
         *  7.  RESIDENT APP
         *  8.  ADMIN DASHBOARD
         *  9.  VISITOR MANAGEMENT
         * 10.  SECURITY
         * 11.  ECOSYSTEM (real-time nodes)
         * 12.  WHITE LABEL
         * 13.  AUTOMATION
         * 14.  ANALYTICS
         * 15.  SECURITY & PRIVACY
         * 16.  HOW IT WORKS
         * 17.  TESTIMONIALS
         * 18.  PRICING
         * 19.  FAQ
         * 20.  FINAL CTA
         * ════════════════════════════════════════
         */}

        {/* 1 — Hero with split layout + video preview */}
        <Hero onContact={() => setContactOpen(true)} />

        {/* 2 — Chapter navigation (connects video to deeper sections) */}
        <VideoChapterNav
          activeChapter={activeChapter}
          onChapterSelect={(id) => setActiveChapter(id)}
        />

        {/* 3 — 6 quick feature cards */}
        <QuickFeatureCards />

        {/* 4 — Trust bar */}
        <TrustBar />

        {/* 5 — Problem → Solution */}
        <ProblemSolution />

        {/* 6 — Core platform overview */}
        <CorePlatform />

        {/* 7 — Resident App */}
        <ResidentApp />

        {/* 8 — Admin Dashboard */}
        <AdminDashboard />

        {/* 9 — Visitor Management */}
        <VisitorFlow />

        {/* 10 — Security */}
        <SecurityPlatform />

        {/* 11 — Ecosystem (real-time connected nodes) */}
        <Ecosystem />

        {/* 12 — White Label */}
        <WhiteLabel />

        {/* 13 — Automation */}
        <Automation />

        {/* 14 — Analytics */}
        <Analytics />

        {/* 15 — Security & Privacy */}
        <SecurityPrivacy />

        {/* 16 — How It Works */}
        <HowItWorks />

        {/* 17 — Testimonials */}
        <Testimonials />

        {/* 18 — Pricing */}
        <Pricing />

        {/* 19 — FAQ */}
        <FAQ />

        {/* 20 — Final CTA */}
        <FinalCTA />
      </main>

      <Footer />

      {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}
    </div>
  );
}
