import { useEffect, useState } from "react";
import InquiryModal from "./components/InquiryModal";
import Navbar from "./components/Navbar";

/* ── Hero + video experience ── */
import Hero from "./sections/Hero";
import QuickFeatureCards from "./sections/QuickFeatureCards";
import VideoChapterNav from "./sections/VideoChapterNav";

/* ── Platform sections ── */
import Footer from "./components/Footer";
import AdminDashboard from "./sections/AdminDashboard";
import Analytics from "./sections/Analytics";
import Automation from "./sections/Automation";
import ContactSection from "./sections/ContactSection";
import CorePlatform from "./sections/CorePlatform";
import Ecosystem from "./sections/Ecosystem";
import FAQ from "./sections/FAQ";
import FinalCTA from "./sections/FinalCTA";
import HowItWorks from "./sections/HowItWorks";
import Pricing from "./sections/Pricing";
import ProblemSolution from "./sections/ProblemSolution";
import ResidentApp from "./sections/ResidentApp";
import SecurityPlatform from "./sections/SecurityPlatform";
import SecurityPrivacy from "./sections/SecurityPrivacy";
import Testimonials from "./sections/Testimonials";
import TrustBar from "./sections/TrustBar";
import VisitorFlow from "./sections/VisitorFlow";
import WhiteLabel from "./sections/WhiteLabel";
import ResidentAccess from "./components/ResidentAccess";

/* ── Legal components ── */
import Policy from "./components/Policy";
import Terms from "./components/Terms";

export default function App() {
  const [dark, setDark] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [activeChapter, setActiveChapter] = useState(1);

  // Simple route check
  const path = window.location.pathname;
  if (path === "/policy") return <Policy />;
  if (path === "/terms") return <Terms />;
  if (path === "/resident") return <ResidentAccess />;

  const openInquiry = () => setInquiryOpen(true);
  const closeInquiry = () => setInquiryOpen(false);

  /* ── Apply theme ─────────────────────────────────────────────── */
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  }, [dark]);

  /* ── Scroll-reveal ───────────────────────────────────────────── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.06, rootMargin: "0px 0px -30px 0px" },
    );
    document.querySelectorAll(".section-fade").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* ── Global event bus (used by deep CTAs) ────────────────────── */
  useEffect(() => {
    const handler = () => openInquiry();
    window.addEventListener("hominode:openInquiry", handler);
    return () => window.removeEventListener("hominode:openInquiry", handler);
  }, []);

  return (
    <div className="min-h-screen theme-transition" style={{ background: "var(--bg-1)" }}>
      <Navbar
        dark={dark}
        onToggleDark={() => setDark(d => !d)}
        onContact={openInquiry}
      />

      <main>
        {/* 1 — Hero */}
        <Hero onContact={openInquiry} />

        {/* 2 — Chapter navigation */}
        <VideoChapterNav
          activeChapter={activeChapter}
          onChapterSelect={id => setActiveChapter(id)}
        />

        {/* 3 — Quick feature cards */}
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

        {/* 11 — Ecosystem */}
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
        <HowItWorks onContact={openInquiry} />

        {/* 17 — Testimonials */}
        <Testimonials />

        {/* 18 — Pricing */}
        <Pricing onContact={openInquiry} />

        {/* 19 — Contact / Inquiry form (inline) */}
        <ContactSection />

        {/* 20 — FAQ */}
        <FAQ />

        {/* 21 — Final CTA */}
        <FinalCTA onContact={openInquiry} />
      </main>

      <Footer onContact={openInquiry} />

      {/* ── Inquiry modal (Book a Demo / Get Started) ── */}
      <InquiryModal open={inquiryOpen} onClose={closeInquiry} />
    </div>
  );
}