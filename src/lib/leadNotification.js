import nodemailer from "nodemailer";

function clean(value, max = 500) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getSmtpConfig() {
  const host = clean(process.env.SMTP_HOST, 255);
  const user = clean(process.env.SMTP_USER, 320);
  const pass = process.env.SMTP_PASSWORD || "";
  const recipient = clean(process.env.CONTACT_NOTIFICATION_EMAIL, 320);
  const port = Number(process.env.SMTP_PORT || 587);

  if (!host || !user || !pass || !recipient || !Number.isFinite(port)) {
    return null;
  }

  const secure = process.env.SMTP_SECURE
    ? process.env.SMTP_SECURE === "true"
    : port === 465;

  return {
    host,
    port,
    secure,
    user,
    pass,
    recipient,
    fromEmail: clean(process.env.SMTP_FROM_EMAIL, 320) || user,
    fromName: clean(process.env.SMTP_FROM_NAME, 120) || "ODA-AZ-ADÓ weboldal",
    adminUrl: clean(process.env.ADMIN_PUBLIC_URL, 500),
  };
}

export function smtpNotificationConfigured() {
  return Boolean(getSmtpConfig());
}

function detailRow(label, value) {
  return `
    <tr>
      <td style="padding:10px 0;color:#64748b;font-size:13px;vertical-align:top;width:180px;">${escapeHtml(label)}</td>
      <td style="padding:10px 0;color:#0f172a;font-size:14px;font-weight:600;vertical-align:top;">${escapeHtml(value || "–")}</td>
    </tr>`;
}

function buildHtml(lead, adminUrl) {
  const adminButton = adminUrl
    ? `<a href="${escapeHtml(adminUrl)}" style="display:inline-block;margin-top:24px;padding:12px 18px;background:#0f172a;color:#ffffff;text-decoration:none;border-radius:8px;font-size:13px;font-weight:700;">Lead megnyitása az adminban</a>`
    : "";

  return `<!doctype html>
<html lang="hu">
  <body style="margin:0;padding:0;background:#f3f6fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;color:#0f172a;">
    <div style="padding:32px 16px;">
      <div style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:14px;overflow:hidden;">
        <div style="padding:28px 32px;border-bottom:1px solid #e2e8f0;">
          <div style="font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#64748b;font-weight:700;">ODA-AZ-ADÓ · új érdeklődő</div>
          <h1 style="margin:8px 0 0;font-size:24px;line-height:1.3;color:#0f172a;">${escapeHtml(lead.company)}</h1>
          <p style="margin:8px 0 0;color:#64748b;font-size:14px;">${escapeHtml(lead.name)} ajánlatkérést küldött a weboldalról.</p>
        </div>
        <div style="padding:24px 32px;">
          <table role="presentation" style="width:100%;border-collapse:collapse;">
            ${detailRow("Kapcsolattartó", lead.name)}
            ${detailRow("E-mail", lead.email)}
            ${detailRow("Telefon", lead.phone)}
            ${detailRow("Adószám", lead.tax_id)}
            ${detailRow("Érdeklődés oka", lead.reason)}
            ${detailRow("Tervezett kezdés", lead.planned_start)}
            ${detailRow("Havi bizonylatszám", lead.monthly_documents)}
            ${detailRow("Bankszámlák", lead.bank_accounts)}
            ${detailRow("Munkavállalók", lead.employees)}
            ${detailRow("Külföldi / EU-s ügyletek", lead.foreign_transactions)}
          </table>
          <div style="margin-top:20px;padding-top:20px;border-top:1px solid #e2e8f0;">
            <div style="font-size:12px;color:#64748b;font-weight:700;text-transform:uppercase;letter-spacing:.06em;">Üzenet</div>
            <div style="margin-top:8px;white-space:pre-wrap;font-size:14px;line-height:1.7;color:#334155;">${escapeHtml(lead.message || "Nem adott meg külön megjegyzést.")}</div>
          </div>
          ${adminButton}
        </div>
        <div style="padding:16px 32px;background:#f8fafc;border-top:1px solid #e2e8f0;color:#64748b;font-size:12px;line-height:1.6;">
          Ez az üzenet automatikusan érkezett az odaazado.hu ajánlatkérő űrlapjáról. A teljes lead az adminfelületen kezelhető.
        </div>
      </div>
    </div>
  </body>
</html>`;
}

function buildText(lead, adminUrl) {
  return [
    `Új ajánlatkérés – ${lead.company}`,
    "",
    `Kapcsolattartó: ${lead.name}`,
    `E-mail: ${lead.email}`,
    `Telefon: ${lead.phone}`,
    `Adószám: ${lead.tax_id}`,
    `Érdeklődés oka: ${lead.reason}`,
    `Tervezett kezdés: ${lead.planned_start}`,
    `Havi bizonylatszám: ${lead.monthly_documents}`,
    `Bankszámlák: ${lead.bank_accounts}`,
    `Munkavállalók: ${lead.employees}`,
    `Külföldi / EU-s ügyletek: ${lead.foreign_transactions}`,
    "",
    "Üzenet:",
    lead.message || "Nem adott meg külön megjegyzést.",
    adminUrl ? `\nAdmin: ${adminUrl}` : "",
  ].filter(Boolean).join("\n");
}

export async function sendLeadNotification(lead) {
  const config = getSmtpConfig();
  if (!config) {
    const error = new Error("SMTP notification is not configured.");
    error.code = "smtp_not_configured";
    throw error;
  }

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 20000,
  });

  const adminUrl = config.adminUrl
    ? `${config.adminUrl.replace(/\/$/, "")}/admin?lead=${encodeURIComponent(lead.id)}`
    : "";

  const info = await transporter.sendMail({
    from: `"${config.fromName.replaceAll('"', "")}" <${config.fromEmail}>`,
    to: config.recipient,
    replyTo: lead.email,
    subject: `Új ajánlatkérés – ${lead.company}`,
    text: buildText(lead, adminUrl),
    html: buildHtml(lead, adminUrl),
  });

  return {
    messageId: info.messageId || "",
    recipient: config.recipient,
  };
}
