import { useEffect, useRef, useState } from "react";

interface ContactModalProps {
  onClose: () => void;
}

const INTEREST_OPTIONS = [
  "Apartment Community",
  "Gated Community",
  "Residential Tower",
  "Property Management",
  "Multi-Building Campus",
  "Housing Association",
  "Other",
];

export default function ContactModal({ onClose }: ContactModalProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    organisation: "",
    interest: "",
    units: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Focus first input on open
  useEffect(() => {
    firstInputRef.current?.focus();
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Prevent body scroll while modal open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const set = (field: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.interest) return;
    setStatus("sending");

    // Build mailto link as fallback (no backend needed)
    const subject = encodeURIComponent(`Hominode Enquiry — ${form.organisation || form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\n` +
      `Email: ${form.email}\n` +
      `Phone: ${form.phone || "—"}\n` +
      `Organisation: ${form.organisation || "—"}\n` +
      `Community Type: ${form.interest}\n` +
      `Approx. Units: ${form.units || "—"}\n\n` +
      `Message:\n${form.message || "—"}`
    );

    // Open the user's default mail client
    window.location.href = `mailto:hominodecare@gmail.com?subject=${subject}&body=${body}`;

    // Show sent state after short delay
    setTimeout(() => setStatus("sent"), 600);
  };

  const inputCls = "w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all duration-150 theme-transition";
  const inputStyle = {
    background: "var(--bg-2)",
    border: "1.5px solid var(--border)",
    color: "var(--text-1)",
  };
  const inputFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    (e.target as HTMLElement).style.borderColor = "var(--blue)";
    (e.target as HTMLElement).style.boxShadow = "0 0 0 3px var(--blue-soft)";
  };
  const inputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    (e.target as HTMLElement).style.borderColor = "var(--border)";
    (e.target as HTMLElement).style.boxShadow = "none";
  };

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl theme-transition"
        style={{
          background: "var(--bg-1)",
          border: "1px solid var(--border)",
          boxShadow: "0 24px 80px rgba(0,0,0,0.25)",
        }}
      >
        {/* Header */}
        <div
          className="sticky top-0 z-10 flex items-start justify-between px-6 pt-6 pb-4 theme-transition"
          style={{ background: "var(--bg-1)", borderBottom: "1px solid var(--border)" }}
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: "linear-gradient(135deg,#2563EB,#6366F1)" }}
              >
                <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                  <circle cx="9" cy="9" r="3" fill="white" />
                  <circle cx="9" cy="2" r="1.5" fill="white" opacity="0.7" />
                  <circle cx="9" cy="16" r="1.5" fill="white" opacity="0.7" />
                  <circle cx="2" cy="9" r="1.5" fill="white" opacity="0.7" />
                  <circle cx="16" cy="9" r="1.5" fill="white" opacity="0.7" />
                </svg>
              </div>
              <span
                className="text-sm font-bold tracking-tight"
                style={{ fontFamily: "Instrument Sans,sans-serif", color: "var(--text-1)" }}
              >
                HOMINODE
              </span>
            </div>
            <h2 id="contact-modal-title" className="text-xl font-bold" style={{ color: "var(--text-1)", fontFamily: "Instrument Sans,sans-serif" }}>
              Get in touch
            </h2>
            <p className="text-sm mt-0.5" style={{ color: "var(--text-2)" }}>
              Tell us about your community — we'll reach out within 24 hours.
            </p>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ml-4 transition-colors theme-transition focus:outline-none"
            style={{ background: "var(--bg-3)", color: "var(--text-2)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--bg-2)"; (e.currentTarget as HTMLElement).style.color = "var(--text-1)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--bg-3)"; (e.currentTarget as HTMLElement).style.color = "var(--text-2)"; }}
            aria-label="Close"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Body */}
        {status === "sent" ? (
          /* ── Success state ── */
          <div className="px-6 py-12 text-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ background: "rgba(5,150,105,0.12)" }}
            >
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M5 14l6 6 12-12" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2" style={{ color: "var(--text-1)", fontFamily: "Instrument Sans,sans-serif" }}>
              Your message is ready!
            </h3>
            <p className="text-sm mb-6" style={{ color: "var(--text-2)" }}>
              Your email client should have opened with your details pre-filled.
              Send it to <strong style={{ color: "var(--blue)" }}>hominodecare@gmail.com</strong> and
              we'll get back to you within 24 hours.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white btn-primary focus:outline-none"
            >
              Done
            </button>
          </div>
        ) : (
          /* ── Form ── */
          <form onSubmit={handleSubmit} className="px-6 py-6 flex flex-col gap-4" noValidate>
            {/* Row: Name + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold" style={{ color: "var(--text-2)" }}>
                  Full Name <span style={{ color: "#EF4444" }}>*</span>
                </label>
                <input
                  ref={firstInputRef}
                  type="text"
                  placeholder="Priya Sharma"
                  required
                  value={form.name}
                  onChange={set("name")}
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                  className={inputCls}
                  style={inputStyle}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold" style={{ color: "var(--text-2)" }}>
                  Work Email <span style={{ color: "#EF4444" }}>*</span>
                </label>
                <input
                  type="email"
                  placeholder="you@organisation.com"
                  required
                  value={form.email}
                  onChange={set("email")}
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                  className={inputCls}
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Row: Phone + Organisation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold" style={{ color: "var(--text-2)" }}>Phone</label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={form.phone}
                  onChange={set("phone")}
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                  className={inputCls}
                  style={inputStyle}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold" style={{ color: "var(--text-2)" }}>Organisation</label>
                <input
                  type="text"
                  placeholder="Sunrise Residency"
                  value={form.organisation}
                  onChange={set("organisation")}
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                  className={inputCls}
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Row: Community Type + Units */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold" style={{ color: "var(--text-2)" }}>
                  Community Type <span style={{ color: "#EF4444" }}>*</span>
                </label>
                <select
                  required
                  value={form.interest}
                  onChange={set("interest")}
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                  className={inputCls}
                  style={{ ...inputStyle, appearance: "none", backgroundImage: "none" }}
                >
                  <option value="">Select type…</option>
                  {INTEREST_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold" style={{ color: "var(--text-2)" }}>Approx. Units / Flats</label>
                <input
                  type="number"
                  placeholder="e.g. 120"
                  min="1"
                  value={form.units}
                  onChange={set("units")}
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                  className={inputCls}
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold" style={{ color: "var(--text-2)" }}>Message</label>
              <textarea
                rows={3}
                placeholder="Tell us what you need, any specific features, or questions…"
                value={form.message}
                onChange={set("message")}
                onFocus={inputFocus}
                onBlur={inputBlur}
                className={inputCls}
                style={{ ...inputStyle, resize: "vertical", minHeight: "80px" }}
              />
            </div>

            {/* Privacy note */}
            <p className="text-xs" style={{ color: "var(--text-3)" }}>
              By submitting, you agree to our{" "}
              <a
                href="/policy"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onClose();
                  window.location.href = "/policy";
                }}
                style={{ color: "var(--blue)" }}
                className="hover:underline underline-offset-2 cursor-pointer"
              >
                Privacy Policy
              </a>
              . We don't share your information with third parties.
            </p>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "sending" || !form.name || !form.email || !form.interest}
              className="w-full py-3 rounded-xl text-sm font-semibold text-white btn-primary focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {status === "sending" ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  Opening email client…
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Send Message
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M1 7h12M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              )}
            </button>

            {/* Alt contact */}
            <div className="flex items-center gap-3 pt-1">
              <div className="flex-1 h-px theme-transition" style={{ background: "var(--border)" }} />
              <span className="text-xs" style={{ color: "var(--text-3)" }}>or email us directly</span>
              <div className="flex-1 h-px theme-transition" style={{ background: "var(--border)" }} />
            </div>
            <a
              href="mailto:hominodecare@gmail.com"
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all theme-transition"
              style={{ background: "var(--bg-2)", border: "1px solid var(--border)", color: "var(--text-2)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--blue)";
                (e.currentTarget as HTMLElement).style.color = "var(--blue)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLElement).style.color = "var(--text-2)";
              }}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <rect x="1" y="3" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.4" />
                <path d="M1 5l7 5 7-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              hominodecare@gmail.com
            </a>
          </form>
        )}
      </div>
    </div>
  );
}