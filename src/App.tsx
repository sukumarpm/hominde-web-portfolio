import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import TrustBar from "./sections/TrustBar";
import ProblemSolution from "./sections/ProblemSolution";
import CorePlatform from "./sections/CorePlatform";
import VisitorFlow from "./sections/VisitorFlow";
import ResidentApp from "./sections/ResidentApp";
import AdminDashboard from "./sections/AdminDashboard";
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
  const [dark, setDark] = useState(false);

  // Apply theme to document root
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  }, [dark]);

  // Scroll-reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.06, rootMargin: "0px 0px -30px 0px" }
    );
    document.querySelectorAll(".section-fade").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen theme-transition" style={{ background: "var(--bg-1)" }}>
      <Navbar dark={dark} onToggleDark={() => setDark((d) => !d)} />
      <main>
        <Hero />
        <TrustBar />
        <ProblemSolution />
        <CorePlatform />
        <VisitorFlow />
        <ResidentApp />
        <AdminDashboard />
        <SecurityPlatform />
        <Ecosystem />
        <WhiteLabel />
        <Automation />
        <SecurityPrivacy />
        <Analytics />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
