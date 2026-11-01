import { useEffect, useRef, useState, type FormEvent } from "react";
import "./deletionRequestForm.css";

type Turnstile = {
  render: (element: HTMLElement, options: Record<string, unknown>) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};
declare global { interface Window { turnstile?: Turnstile } }

const ENDPOINT = import.meta.env.VITE_DELETION_REQUEST_API_URL ||
  "https://asia-southeast1-hominode-prod.cloudfunctions.net/submitPublicAccountDeletionRequest";
const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || "";

export default function DeletionRequestForm() {
  const captchaContainer = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const [captchaToken, setCaptchaToken] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");

  useEffect(() => {
    if (!SITE_KEY || !captchaContainer.current) return;
    let cancelled = false;
    let tries = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const render = () => {
      if (cancelled || !captchaContainer.current) return;
      if (window.turnstile) {
        widgetId.current = window.turnstile.render(captchaContainer.current, {
          sitekey: SITE_KEY, action: "account_deletion",
          callback: (token: string) => setCaptchaToken(token),
          "expired-callback": () => setCaptchaToken(""),
          "error-callback": () => setCaptchaToken(""),
        });
      } else if (tries++ < 80) timer = setTimeout(render, 150);
    };
    const scriptId = "hominode-turnstile-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
    render();
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
      if (widgetId.current && window.turnstile) window.turnstile.remove(widgetId.current);
      widgetId.current = null;
    };
  }, []);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (busy) return;
    if (!captchaToken) { setError("Complete the verification before submitting."); return; }
    setBusy(true);
    setError("");
    const form = event.currentTarget;
    const data = new FormData(form);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch(ENDPOINT, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"), email: data.get("email"), phone: data.get("phone"), contactPhone: data.get("contactPhone"),
          community: data.get("community"), unit: data.get("unit"),
          confirmed: data.get("confirmed") === "on", website: data.get("website"),
          captchaToken,
        }),
        signal: controller.signal,
      });
      const result: { error?: string; reference?: string } = await response.json();
      if (!response.ok || !result.reference) throw new Error(result.error || "Unable to submit request.");
      setReference(result.reference);
      form.reset();
    } catch (cause) {
      setError(cause instanceof Error && cause.name !== "AbortError"
        ? cause.message : "Submission timed out. Check your connection and try again.");
      setCaptchaToken("");
      if (widgetId.current && window.turnstile) window.turnstile.reset(widgetId.current);
    } finally {
      clearTimeout(timeout);
      setBusy(false);
    }
  };

  if (reference) return (
    <section className="deletion-request-form deletion-form-success" role="status" aria-live="polite">
      <div className="deletion-form-brand" aria-label="Hominode">
        <span className="deletion-form-brand-icon" aria-hidden="true"><img src="/logo.png" alt="" width="48" height="48" /></span>
        <span>HOMINODE</span>
      </div>
      <h2>Request submitted</h2>
      <p>We received your request for account deletion. Our team will review it and contact you to verify ownership before taking further action.</p>
      <p><strong>Reference number: <span className="deletion-ref">{reference}</span></strong></p>
      <p>Keep this number for follow-up. Your account has not been deleted yet.</p>
    </section>
  );

  return (
    <section className="deletion-request-form" aria-label="Request account deletion">
      <div className="deletion-form-brand" aria-label="Hominode">
        <span className="deletion-form-brand-icon" aria-hidden="true"><img src="/logo.png" alt="" width="48" height="48" /></span>
        <span>HOMINODE</span>
      </div>
      <h2>Request account deletion</h2>
      <p>Fill in this form to request deletion of your Hominode resident account. No email app is required.</p>
      <form onSubmit={submit}>
        <label>Full name <span aria-hidden="true">*</span><input name="name" type="text" autoComplete="name" minLength={2} maxLength={100} required /></label>
        <label>Contact email <span aria-hidden="true">*</span><input name="email" type="email" autoComplete="email" maxLength={254} required /></label>
        <label>Registered phone number <span aria-hidden="true">*</span><input name="phone" type="tel" autoComplete="off" inputMode="tel" maxLength={32} placeholder="Number used to register (even if inactive)" required /></label>
        <label>Current contact phone number <span aria-hidden="true">*</span><input name="contactPhone" type="tel" autoComplete="tel" inputMode="tel" maxLength={32} placeholder="e.g. +639991234567" required /><small className="deletion-field-hint">Number we can reach you on now. If it is the same as your registered number, enter it again.</small></label>
        <label>Community / society <span aria-hidden="true">*</span><input name="community" type="text" minLength={2} maxLength={120} required /></label>
        <label>Building / unit <span aria-hidden="true">*</span><input name="unit" type="text" minLength={2} maxLength={80} required /></label>
        <label className="deletion-honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
        <label className="deletion-confirm"><input type="checkbox" name="confirmed" required /><span>I confirm that I am requesting deletion of my Hominode resident account. I understand Hominode may need to verify ownership and retain records required by law or outstanding obligations.</span></label>
        {SITE_KEY ? <div ref={captchaContainer} className="deletion-turnstile" aria-label="Human verification" /> : <p className="deletion-form-error" role="alert">Form verification has not been configured yet.</p>}
        {error && <p className="deletion-form-error" role="alert">{error}</p>}
        <button type="submit" disabled={busy || !SITE_KEY || !captchaToken}>{busy ? "Submitting…" : "Submit request"}</button>
      </form>
      <p className="deletion-form-footnote">Submitting does not immediately delete your account. We will contact you using your current contact phone number or contact email.</p>
    </section>
  );
}
