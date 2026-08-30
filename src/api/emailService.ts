/**
 * emailService.ts — Hominode Email Service Abstraction
 *
 * Supports: Resend (recommended), SendGrid, Nodemailer/SMTP
 * Switch provider by changing VITE_EMAIL_PROVIDER in .env
 *
 * Environment variables (server-side only — never expose in client):
 *   CONTACT_EMAIL       = hominodecare@gmail.com
 *   RESEND_API_KEY      = re_xxxxxxxxxxxx
 *   SENDGRID_API_KEY    = SG.xxxxxxxxxx
 *   SMTP_HOST           = smtp.example.com
 *   SMTP_PORT           = 587
 *   SMTP_USER           = noreply@hominode.com
 *   SMTP_PASS           = your-smtp-password
 *   EMAIL_FROM_NAME     = Hominode
 *   EMAIL_FROM_ADDRESS  = noreply@hominode.com
 */

export interface InquiryPayload {
  name: string;
  email: string;
  phone: string;
  orgName: string;
  communityType: string;
  unitCount: string;
  features: string;
  message: string;
}

/* ─── Email HTML template ─────────────────────────────────────── */
export function buildEmailHTML(data: InquiryPayload): string {
  const submittedAt = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    year: "numeric", month: "long", day: "numeric",
    hour: "2-digit", minute: "2-digit",
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>New Hominode Client Inquiry</title>
</head>
<body style="margin:0;padding:0;background:#F1F5F9;font-family:'Inter','Helvetica Neue',Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F1F5F9;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- HEADER -->
        <tr>
          <td style="background:linear-gradient(135deg,#1D4ED8,#4F46E5);border-radius:16px 16px 0 0;padding:32px 40px;text-align:center;">
            <table cellpadding="0" cellspacing="0" align="center">
              <tr>
                <td style="background:rgba(255,255,255,0.15);border-radius:12px;padding:10px 14px;">
                  <span style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:20px;font-weight:800;color:#FFFFFF;letter-spacing:-0.5px;">HOMINODE</span>
                </td>
              </tr>
            </table>
            <p style="margin:16px 0 4px;font-size:22px;font-weight:700;color:#FFFFFF;">New Client Inquiry</p>
            <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.75);">Submitted from the Hominode website</p>
          </td>
        </tr>

        <!-- BODY -->
        <tr>
          <td style="background:#FFFFFF;padding:36px 40px;border-left:1px solid #E2E8F0;border-right:1px solid #E2E8F0;">

            <!-- Section: Client Details -->
            <p style="margin:0 0 16px;font-size:11px;font-weight:700;color:#64748B;letter-spacing:1px;text-transform:uppercase;">Client Details</p>

            ${detailRow("👤 Full Name", data.name)}
            ${detailRow("✉️  Work Email", `<a href="mailto:${data.email}" style="color:#2563EB;text-decoration:none;">${data.email}</a>`)}
            ${detailRow("📞 Phone", data.phone)}
            ${detailRow("🏢 Organisation", data.orgName)}
            ${detailRow("🏘️  Community Type", data.communityType)}
            ${detailRow("🏠 No. of Units", data.unitCount)}

            <div style="height:1px;background:#F1F5F9;margin:24px 0;"></div>

            <!-- Section: Interested Features -->
            <p style="margin:0 0 12px;font-size:11px;font-weight:700;color:#64748B;letter-spacing:1px;text-transform:uppercase;">Interested Features</p>
            <div style="background:#EFF6FF;border:1px solid #BFDBFE;border-radius:10px;padding:14px 16px;">
              <p style="margin:0;font-size:14px;color:#1E40AF;line-height:1.7;">${data.features}</p>
            </div>

            <div style="height:1px;background:#F1F5F9;margin:24px 0;"></div>

            <!-- Section: Message -->
            <p style="margin:0 0 12px;font-size:11px;font-weight:700;color:#64748B;letter-spacing:1px;text-transform:uppercase;">Message</p>
            <div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:10px;padding:16px;">
              <p style="margin:0;font-size:14px;color:#334155;line-height:1.7;">${data.message || "—"}</p>
            </div>

          </td>
        </tr>

        <!-- REPLY CTA -->
        <tr>
          <td style="background:#F8FAFC;padding:24px 40px;border:1px solid #E2E8F0;border-top:none;text-align:center;">
            <p style="margin:0 0 12px;font-size:13px;color:#64748B;">
              Hit <strong>Reply</strong> to respond directly to the client at
              <a href="mailto:${data.email}" style="color:#2563EB;text-decoration:none;"> ${data.email}</a>
            </p>
            <a href="mailto:${data.email}?subject=Re: Hominode Inquiry — ${encodeURIComponent(data.orgName)}"
               style="display:inline-block;background:linear-gradient(135deg,#2563EB,#1D4ED8);color:#FFFFFF;text-decoration:none;font-size:14px;font-weight:600;padding:12px 28px;border-radius:10px;">
              Reply to Client →
            </a>
          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td style="background:#F1F5F9;padding:20px 40px;border-radius:0 0 16px 16px;text-align:center;">
            <p style="margin:0;font-size:11px;color:#94A3B8;">
              Hominode · Smart Community Management Platform<br/>
              Inquiry submitted on ${submittedAt} (IST)
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function detailRow(label: string, value: string): string {
  return `
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:10px;">
      <tr>
        <td width="160" valign="top" style="font-size:12px;font-weight:600;color:#64748B;padding:8px 0;">${label}</td>
        <td valign="top" style="font-size:14px;color:#0F172A;font-weight:500;padding:8px 0;">${value}</td>
      </tr>
    </table>`;
}

/* ─── Plain-text fallback ─────────────────────────────────────── */
export function buildEmailText(data: InquiryPayload): string {
  const submittedAt = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  return [
    "NEW HOMINODE INQUIRY",
    "================================",
    "",
    "CLIENT DETAILS",
    `Name:           ${data.name}`,
    `Work Email:     ${data.email}`,
    `Phone:          ${data.phone}`,
    `Organisation:   ${data.orgName}`,
    `Community Type: ${data.communityType}`,
    `No. of Units:   ${data.unitCount}`,
    "",
    "INTERESTED FEATURES",
    data.features,
    "",
    "MESSAGE",
    data.message || "—",
    "",
    "================================",
    "Submitted from: Hominode Website",
    `Submission Date: ${submittedAt} (IST)`,
  ].join("\n");
}

/* ─── Resend provider ────────────────────────────────────────── */
export async function sendViaResend(
  payload: InquiryPayload,
  env: {
    RESEND_API_KEY: string;
    CONTACT_EMAIL: string;
    EMAIL_FROM_ADDRESS: string;
    EMAIL_FROM_NAME: string;
  }
): Promise<void> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `${env.EMAIL_FROM_NAME} <${env.EMAIL_FROM_ADDRESS}>`,
      to: [env.CONTACT_EMAIL],
      reply_to: payload.email,
      subject: `New Hominode Client Inquiry — ${payload.orgName}`,
      html: buildEmailHTML(payload),
      text: buildEmailText(payload),
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(`Resend error ${res.status}: ${JSON.stringify(err)}`);
  }
}

/* ─── SendGrid provider ──────────────────────────────────────── */
export async function sendViaSendGrid(
  payload: InquiryPayload,
  env: {
    SENDGRID_API_KEY: string;
    CONTACT_EMAIL: string;
    EMAIL_FROM_ADDRESS: string;
    EMAIL_FROM_NAME: string;
  }
): Promise<void> {
  const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${env.SENDGRID_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      personalizations: [{
        to: [{ email: env.CONTACT_EMAIL }],
        subject: `New Hominode Client Inquiry — ${payload.orgName}`,
      }],
      from: { email: env.EMAIL_FROM_ADDRESS, name: env.EMAIL_FROM_NAME },
      reply_to: { email: payload.email, name: payload.name },
      content: [
        { type: "text/plain", value: buildEmailText(payload) },
        { type: "text/html", value: buildEmailHTML(payload) },
      ],
    }),
  });

  if (!res.ok) {
    const err = await res.text().catch(() => "");
    throw new Error(`SendGrid error ${res.status}: ${err}`);
  }
}
