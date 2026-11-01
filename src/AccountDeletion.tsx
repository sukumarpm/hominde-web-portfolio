import DeletionRequestForm from "./components/DeletionRequestForm";
import { useEffect, useState } from "react";

const SUPPORT_EMAIL = "hominodecare@gmail.com";
const SUBJECT = "Hominode Resident Account Deletion Request";
const BODY = [
  "I request deletion of my Hominode Resident account and associated personal data.",
  "",
  "Registered full name:",
  "Registered phone number (if known):",
  "Community name:",
  "Building and unit (if known):",
  "Alternative contact email:",
  "Can you access your registered phone? (Yes/No):",
  "",
  "Please contact me to independently verify my identity and deletion consent.",
  "I understand that sending this email does not itself verify my identity or complete deletion.",
].join("\n");
const REQUEST_EMAIL_URL = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(BODY)}`;

export default function AccountDeletion() {
  const [copyStatus, setCopyStatus] = useState("");

  useEffect(() => {
    const priorTitle = document.title;
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const priorCanonical = canonical?.href;
    document.title = "Request Resident Account Deletion | Hominode";
    canonical?.setAttribute("href", "https://hominode.com/account-deletion");
    return () => {
      document.title = priorTitle;
      if (priorCanonical) canonical?.setAttribute("href", priorCanonical);
    };
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SUPPORT_EMAIL);
      setCopyStatus("Email address copied.");
    } catch {
      setCopyStatus(`Copy not available. Please use ${SUPPORT_EMAIL}.`);
    }
  };

  return (
    <main className="deletion-page">
      <div className="deletion-layout">
        <header className="deletion-header">
          <a href="/" className="deletion-brand" aria-label="Hominode home">
            <span className="deletion-brand-mark" aria-hidden="true">
              <img src="/logo.png" alt="" width="48" height="48" />
            </span>
            <span>HOMINODE</span>
          </a>
          <a href="/" className="deletion-home-link">Back to home</a>
        </header>

        <section className="deletion-card" aria-labelledby="deletion-title">
          <p className="deletion-eyebrow">ACCOUNT PRIVACY</p>
          <h1 id="deletion-title">Request Resident account deletion</h1>
          <p className="deletion-intro">
            If you can no longer access your Hominode Resident app, phone, or registered SIM,
            you can request deletion of your account and associated personal data by email.
            You do not need to reinstall the app or sign in to make this request.
          </p>

          <div className="deletion-contact" aria-label="Deletion request contact">
            <p className="deletion-contact-label">Hominode Support</p>
            <a className="deletion-email" href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
            <div className="deletion-actions">
              <DeletionRequestForm />
              <button type="button" className="deletion-secondary-action" onClick={copyEmail}>
                Copy email address
              </button>
            </div>
            <p className="deletion-feedback" aria-live="polite">{copyStatus}</p>
            <p className="deletion-small">
              If no email app opens, copy the address and send your request from any email provider.
              Include your name, registered number (if known), community, and unit to help us locate your account.
            </p>
          </div>

          <h2>What happens after you email us?</h2>
          <ol className="deletion-steps">
            <li><strong>We locate your account.</strong> Support uses the details you provide to identify the correct Resident record and community.</li>
            <li><strong>We verify identity and consent.</strong> An authorized person independently checks your identity and confirms that you personally requested deletion. Email details alone do not establish ownership.</li>
            <li><strong>We process the request.</strong> Once verified, Hominode uses its existing account-deletion workflow, including any necessary financial settlement or community handover checks.</li>
            <li><strong>We confirm the outcome.</strong> Support will communicate the result after processing is complete. An email request is not confirmation that the account has already been deleted.</li>
          </ol>

          <div className="deletion-note">
            <h2>What happens to your data?</h2>
            <p>
              The deletion process removes the Resident account and associated personal data eligible
              for deletion. Some necessary billing, financial-transaction, audit, or security records
              may be retained for legal, regulatory, or security reasons as described in the
              <a href="/policy"> Hominode Privacy Policy</a>. We do not promise a fixed retention
              period or immediate deletion while required checks are pending.
            </p>
          </div>

          <p className="deletion-safety">
            <strong>Protect your information:</strong> Never email passwords, one-time passcodes,
            bank details, or copies of identity documents. Support will explain any secure
            identity-verification steps separately.
          </p>
          <nav className="deletion-links" aria-label="Additional information">
            <a href="/policy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
            <a href="/">Hominode home</a>
          </nav>
        </section>
      </div>
    </main>
  );
}
