import DeletionRequestForm from "./components/DeletionRequestForm";
import { useEffect } from "react";

export default function AccountDeletion() {
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
            you can request deletion of your account and eligible personal data using the secure form below.
            You do not need to reinstall the app, sign in, or open an email application.
          </p>

          <div className="deletion-contact" aria-label="Account deletion request form">
            <DeletionRequestForm />
          </div>

          <h2>What happens after you submit?</h2>
          <ol className="deletion-steps">
            <li><strong>We locate your account.</strong> The selected community uses the details provided to identify the correct resident record.</li>
            <li><strong>We verify identity and consent.</strong> An authorized person independently checks your identity and confirms that you personally requested deletion. The submitted form does not establish ownership.</li>
            <li><strong>We process the request.</strong> Once verified, Hominode uses its existing account-deletion workflow, including any necessary financial settlement or community handover checks.</li>
            <li><strong>We confirm the outcome.</strong> The responsible community will communicate the outcome after processing. Submitting the form does not mean the account has already been deleted.</li>
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
            <strong>Protect your information:</strong> Never submit passwords, one-time passcodes,
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
