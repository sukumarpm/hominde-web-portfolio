/**
 * InquiryForm — Hominode client inquiry form.
 *
 * Features:
 *  - 8 fields (name, email, phone, org, community type, units, features, message)
 *  - Inline validation with friendly messages
 *  - Multi-select interest checkboxes
 *  - Honeypot spam protection
 *  - Loading / success / error states
 *  - Submits to /api/inquiry (server-side), falls back to mailto
 *  - Fully theme-aware (CSS custom properties)
 *  - WCAG accessible: labels, aria-describedby, focus management
 */

import { useRef, useState, type FormEvent } from "react";

/* ─── constants ─────────────────────────────────────────────────── */

const COMMUNITY_TYPES = [
  "Apartment Community",
  "Gated Community",
  "Residential Tower",
  "Housing Association",
  "Property Management Company",
  "Multi-Building Community",
  "Other",
] as const;

const UNIT_RANGES = [
  "Under 50",
  "50–100",
  "100–250",
  "250–500",
  "500–1000",
  "1000+",
] as const;

const FEATURE_OPTIONS = [
  { id: "resident", label: "Resident Management" },
  { id: "visitor", label: "Visitor Management" },
  { id: "maintenance", label: "Maintenance & Billing" },
  { id: "parking", label: "Parking Management" },
  { id: "amenity", label: "Amenity Management" },
  { id: "security", label: "Security Management" },
  { id: "community", label: "Community Communication" },
  { id: "staff", label: "Staff Management" },
  { id: "whitelabel", label: "White-Label Platform" },
  { id: "complete", label: "Complete Hominode Platform" },
] as const;

/* ─── types ─────────────────────────────────────────────────────── */

interface FormData {
  name: string;
  email: string;
  phone: string;
  orgName: string;
  communityType: string;
  unitCount: string;
  features: string[];
  message: string;
  /** honeypot — must stay empty */
  _hp: string;
}

interface FieldErrors {
  name?: string;
  email?: string;
  phone?: string;
  orgName?: string;
  communityType?: string;
}

type Status = "idle" | "sending" | "sent" | "error";

/* ─── helpers ───────────────────────────────────────────────────── */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+\d][\d\s\-().]{6,19}$/;

function validate(data: FormData): FieldErrors {
  const e: FieldErrors = {};
  if (!data.name.trim()) e.name = "Please enter your full name.";
  if (!data.email.trim()) e.email = "Please enter your work email.";
  else if (!EMAIL_RE.test(data.email.trim()))
    e.email = "Please enter a valid work email.";
  if (!data.phone.trim()) e.phone = "Please enter your phone number.";
  else if (!PHONE_RE.test(data.phone.trim()))
    e.phone = "Please enter a valid phone number.";
  if (!data.orgName.trim()) e.orgName = "Please enter your community or organisation name.";
  if (!data.communityType) e.communityType = "Please select your community type.";
  return e;
}

/* ─── sub-components ────────────────────────────────────────────── */

function FieldWrapper({
  id, label, required, error, children,
}: {
  id: string; label: string; required?: boolean;
  error?: string; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-xs font-semibold"
        style={{ color: "var(--text-2)" }}
      >
        {label}
        {required && (
          <span className="ml-0.5" style={{ color: "#EF4444" }} aria-hidden="true">*</span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} role="alert" className="text-xs font-medium" style={{ color: "#EF4444" }}>
          {error}
        </p>
      )}
    </div>
  );
}

/* ─── shared input style helpers ───────────────────────────────── */

const BASE_CLS =
  "w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all duration-150 theme-transition";

const baseStyle = {
  background: "var(--bg-2)",
  border: "1.5px solid var(--border)",
  color: "var(--text-1)",
};

const errorStyle = {
  ...baseStyle,
  border: "1.5px solid #EF4444",
  boxShadow: "0 0 0 3px rgba(239,68,68,0.1)",
};

function useFocusHandlers() {
  return {
    onFocus(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
      (e.target as HTMLElement).style.borderColor = "var(--blue)";
      (e.target as HTMLElement).style.boxShadow = "0 0 0 3px var(--blue-soft)";
    },
    onBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
      (e.target as HTMLElement).style.borderColor = "var(--border)";
      (e.target as HTMLElement).style.boxShadow = "none";
    },
  };
}

/* ─── main component ────────────────────────────────────────────── */

export interface InquiryFormProps {
  /** Called when user clicks "Back to Hominode" on success in modal mode */
  onSuccess?: () => void;
  /** Compact mode = less padding, used inside modal */
  compact?: boolean;
}

export default function InquiryForm({ onSuccess, compact = false }: InquiryFormProps) {
  const [form, setForm] = useState<FormData>({
    name: "", email: "", phone: "", orgName: "",
    communityType: "", unitCount: "", features: [],
    message: "", _hp: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouch] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const firstRef = useRef<HTMLInputElement>(null);
  const { onFocus, onBlur } = useFocusHandlers();

  /* field setters */
  const set = <K extends keyof FormData>(k: K) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(p => ({ ...p, [k]: (e.target as HTMLInputElement).value }));

  const touch = (k: string) => () => setTouch(p => ({ ...p, [k]: true }));

  const toggleFeature = (id: string) =>
    setForm(p => ({
      ...p,
      features: p.features.includes(id)
        ? p.features.filter(f => f !== id)
        : [...p.features, id],
    }));

  /* live validation on touched fields */
  const liveErrors: FieldErrors = touched && Object.keys(touched).length ? validate(form) : {};

  /* submit */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    /* honeypot check */
    if (form._hp) return;

    const errs = validate(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      /* focus first errored field */
      firstRef.current?.focus();
      return;
    }
    setErrors({});
    setStatus("sending");
    setErrorMsg("");

    const payload = {
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      phone: form.phone.trim(),
      orgName: form.orgName.trim(),
      communityType: form.communityType,
      unitCount: form.unitCount || "Not specified",
      features: form.features.length
        ? form.features
          .map(id => FEATURE_OPTIONS.find(f => f.id === id)?.label ?? id)
          .join(", ")
        : "Not specified",
      message: form.message.trim() || "—",
    };

    try {
      /* ── Primary: server-side API ── */
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || `HTTP ${res.status}`);
      }

      setStatus("sent");

    } catch (err) {
      console.warn("[InquiryForm] API failed, using mailto fallback:", err);

      /* ── Fallback: mailto ── */
      const subject = encodeURIComponent(
        `New Hominode Client Inquiry — ${payload.orgName || payload.name}`
      );
      const body = encodeURIComponent(
        `NEW HOMINODE INQUIRY\n` +
        `--------------------------------\n\n` +
        `CLIENT DETAILS\n` +
        `Name:          ${payload.name}\n` +
        `Work Email:    ${payload.email}\n` +
        `Phone:         ${payload.phone}\n` +
        `Organisation:  ${payload.orgName}\n` +
        `Community Type:${payload.communityType}\n` +
        `Number of Units:${payload.unitCount}\n\n` +
        `INTERESTED FEATURES\n${payload.features}\n\n` +
        `MESSAGE\n${payload.message}\n\n` +
        `--------------------------------\n` +
        `Submitted from: Hominode Website\n` +
        `Submission Date: ${new Date().toLocaleString("en-IN")}`
      );
      window.open(`mailto:hominodecare@gmail.com?subject=${subject}&body=${body}`);
      setStatus("sent");
    }
  };

  /* reset */
  const handleReset = () => {
    setForm({ name: "", email: "", phone: "", orgName: "", communityType: "", unitCount: "", features: [], message: "", _hp: "" });
    setErrors({}); setTouch({}); setStatus("idle"); setErrorMsg("");
    onSuccess?.();
  };

  const py = compact ? "py-5" : "py-10";

  /* ─── SUCCESS STATE ─────────────────────────────────────────── */
  if (status === "sent") {
    return (
      <div className={`flex flex-col items-center text-center px-6 ${py} gap-5`}>
        {/* animated checkmark */}
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{
            background: "rgba(5,150,105,0.1)",
            border: "2px solid rgba(5,150,105,0.25)",
            animation: "scale-in 0.4s cubic-bezier(0.16,1,0.3,1) forwards",
          }}
        >
          <svg
            width="36" height="36" viewBox="0 0 36 36" fill="none"
            style={{ animation: "draw-check 0.5s ease 0.2s forwards", strokeDasharray: 40, strokeDashoffset: 40 }}
          >
            <path d="M7 18l7 7 15-15" stroke="#059669" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <h3
            className="text-2xl font-bold mb-2"
            style={{ color: "var(--text-1)", fontFamily: "Instrument Sans, sans-serif" }}
          >
            Thank you for reaching out!
          </h3>
          <p className="text-base leading-relaxed max-w-sm mx-auto" style={{ color: "var(--text-2)" }}>
            Your inquiry has been received. Our team will contact you within{" "}
            <strong style={{ color: "var(--text-1)" }}>24 hours</strong>.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          <button
            onClick={handleReset}
            className="px-7 py-3 rounded-xl text-sm font-semibold text-white btn-primary focus:outline-none"
          >
            Back to Hominode
          </button>
          <a
            href="mailto:hominodecare@gmail.com"
            className="px-7 py-3 rounded-xl text-sm font-medium transition-all theme-transition"
            style={{ background: "var(--bg-3)", border: "1px solid var(--border)", color: "var(--text-2)" }}
          >
            Email us directly
          </a>
        </div>
        <style>{`
          @keyframes scale-in {
            from { transform: scale(0.6); opacity: 0; }
            to   { transform: scale(1);   opacity: 1; }
          }
          @keyframes draw-check {
            to { stroke-dashoffset: 0; }
          }
        `}</style>
      </div>
    );
  }

  /* ─── FORM ──────────────────────────────────────────────────── */
  const fieldStyle = (k: keyof FieldErrors) =>
    (errors[k] ?? liveErrors[k]) ? errorStyle : baseStyle;

  const ariaDesc = (k: keyof FieldErrors) =>
    (errors[k] ?? liveErrors[k]) ? `${k}-err` : undefined;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-5"
      aria-label="Hominode client inquiry form"
    >
      {/* ── honeypot (hidden from real users) ── */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }}>
        <label htmlFor="_hp">Leave this empty</label>
        <input
          id="_hp" name="_hp" type="text" tabIndex={-1}
          value={form._hp} onChange={set("_hp")} autoComplete="off"
        />
      </div>

      {/* ── Row 1: Name + Email ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FieldWrapper id="inq-name" label="Full Name" required error={errors.name ?? liveErrors.name}>
          <input
            ref={firstRef}
            id="inq-name" name="name" type="text"
            placeholder="Enter your full name"
            required autoComplete="name"
            value={form.name}
            onChange={set("name")}
            onBlur={touch("name")}
            onFocus={onFocus}
            className={BASE_CLS}
            style={fieldStyle("name")}
            aria-required="true"
            aria-describedby={ariaDesc("name")}
            aria-invalid={!!(errors.name ?? liveErrors.name)}
          />
        </FieldWrapper>

        <FieldWrapper id="inq-email" label="Work Email" required error={errors.email ?? liveErrors.email}>
          <input
            id="inq-email" name="email" type="email"
            placeholder="you@company.com"
            required autoComplete="email"
            value={form.email}
            onChange={set("email")}
            onBlur={touch("email")}
            onFocus={onFocus}
            className={BASE_CLS}
            style={fieldStyle("email")}
            aria-required="true"
            aria-describedby={ariaDesc("email")}
            aria-invalid={!!(errors.email ?? liveErrors.email)}
          />
        </FieldWrapper>
      </div>

      {/* ── Row 2: Phone + Org Name ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FieldWrapper id="inq-phone" label="Phone Number" required error={errors.phone ?? liveErrors.phone}>
          <input
            id="inq-phone" name="phone" type="tel"
            placeholder="+91 XXXXX XXXXX"
            required autoComplete="tel"
            value={form.phone}
            onChange={set("phone")}
            onBlur={touch("phone")}
            onFocus={onFocus}
            className={BASE_CLS}
            style={fieldStyle("phone")}
            aria-required="true"
            aria-describedby={ariaDesc("phone")}
            aria-invalid={!!(errors.phone ?? liveErrors.phone)}
          />
        </FieldWrapper>

        <FieldWrapper id="inq-org" label="Organisation / Community Name" required error={errors.orgName ?? liveErrors.orgName}>
          <input
            id="inq-org" name="orgName" type="text"
            placeholder="Enter your apartment or organization name"
            required autoComplete="organization"
            value={form.orgName}
            onChange={set("orgName")}
            onBlur={touch("orgName")}
            onFocus={onFocus}
            className={BASE_CLS}
            style={fieldStyle("orgName")}
            aria-required="true"
            aria-describedby={ariaDesc("orgName")}
            aria-invalid={!!(errors.orgName ?? liveErrors.orgName)}
          />
        </FieldWrapper>
      </div>

      {/* ── Row 3: Community Type + Units ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FieldWrapper id="inq-type" label="Community Type" required error={errors.communityType ?? liveErrors.communityType}>
          <div className="relative">
            <select
              id="inq-type" name="communityType"
              required
              value={form.communityType}
              onChange={set("communityType")}
              onBlur={touch("communityType")}
              onFocus={onFocus}
              className={BASE_CLS}
              style={{
                ...fieldStyle("communityType"),
                appearance: "none",
                paddingRight: "2.5rem",
              }}
              aria-required="true"
              aria-describedby={ariaDesc("communityType")}
              aria-invalid={!!(errors.communityType ?? liveErrors.communityType)}
            >
              <option value="">Select community type…</option>
              {COMMUNITY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
              width="14" height="14" viewBox="0 0 14 14" fill="none"
              aria-hidden="true"
              style={{ color: "var(--text-3)" }}
            >
              <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </FieldWrapper>

        <FieldWrapper id="inq-units" label="Number of Flats / Units">
          <div className="relative">
            <select
              id="inq-units" name="unitCount"
              value={form.unitCount}
              onChange={set("unitCount")}
              onFocus={onFocus}
              onBlur={onBlur}
              className={BASE_CLS}
              style={{ ...baseStyle, appearance: "none", paddingRight: "2.5rem" }}
            >
              <option value="">Select range…</option>
              {UNIT_RANGES.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
              width="14" height="14" viewBox="0 0 14 14" fill="none"
              aria-hidden="true"
              style={{ color: "var(--text-3)" }}
            >
              <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </FieldWrapper>
      </div>

      {/* ── Multi-select: Interested Features ── */}
      <fieldset>
        <legend className="text-xs font-semibold mb-3" style={{ color: "var(--text-2)" }}>
          What are you interested in?
          <span className="ml-1 font-normal" style={{ color: "var(--text-3)" }}>(Select all that apply)</span>
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {FEATURE_OPTIONS.map(({ id, label }) => {
            const checked = form.features.includes(id);
            return (
              <label
                key={id}
                htmlFor={`feat-${id}`}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-150 select-none theme-transition"
                style={{
                  background: checked ? "var(--blue-bg)" : "var(--bg-2)",
                  border: `1.5px solid ${checked ? "var(--blue-border)" : "var(--border)"}`,
                  color: checked ? "var(--blue)" : "var(--text-2)",
                }}
              >
                <input
                  id={`feat-${id}`}
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleFeature(id)}
                  className="w-4 h-4 rounded flex-shrink-0 accent-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                  aria-label={label}
                />
                <span className="text-sm font-medium">{label}</span>
                {checked && (
                  <svg className="ml-auto flex-shrink-0" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M2 7l4 4 6-6" stroke="var(--blue)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* ── Message ── */}
      <FieldWrapper id="inq-msg" label="Message">
        <textarea
          id="inq-msg" name="message"
          rows={3}
          placeholder="Tell us briefly about what you need…"
          value={form.message}
          onChange={set("message")}
          onFocus={onFocus}
          onBlur={onBlur}
          className={BASE_CLS}
          style={{ ...baseStyle, resize: "vertical", minHeight: "90px" }}
          aria-label="Optional message"
        />
      </FieldWrapper>

      {/* ── API error banner ── */}
      {status === "error" && errorMsg && (
        <div
          role="alert"
          className="flex items-start gap-3 px-4 py-3 rounded-xl text-sm"
          style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)", color: "#DC2626" }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="flex-shrink-0 mt-0.5" aria-hidden="true">
            <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.5" />
            <path d="M9 5v5M9 12.5h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          {errorMsg}
        </div>
      )}

      {/* ── Privacy note ── */}
      <p className="text-xs leading-relaxed" style={{ color: "var(--text-3)" }}>
        By submitting, you agree to our{" "}
        <a
          href="/policy"
          style={{ color: "var(--blue)" }}
          className="hover:underline underline-offset-2"
        >
          Privacy Policy
        </a>.
        {" "}We never share your information with third parties.
      </p>

      {/* ── Submit button ── */}
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full py-3.5 rounded-xl text-sm font-semibold text-white btn-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
        aria-busy={status === "sending"}
      >
        {status === "sending" ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
              <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round" />
            </svg>
            Sending…
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            Send Inquiry
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
              <path d="M1.5 7.5h12M8.5 3l4.5 4.5L8.5 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        )}
      </button>

      {/* ── Alt direct email ── */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
        <span className="text-xs" style={{ color: "var(--text-3)" }}>or reach us directly</span>
        <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
      </div>
      <a
        href="mailto:hominodecare@gmail.com"
        className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all theme-transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
        style={{ background: "var(--bg-2)", border: "1px solid var(--border)", color: "var(--text-2)" }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.borderColor = "var(--blue)";
          (e.currentTarget as HTMLElement).style.color = "var(--blue)";
        }}
        onMouseLeave={e => {
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
  );
}
