import nodemailer, { type Transporter } from "nodemailer";

/* ------------------------------------------------------------------ */
/*  Gmail SMTP transport (nodemailer)                                   */
/*                                                                      */
/*  Uses a Google account + App Password. See .env.local / README.      */
/* ------------------------------------------------------------------ */

let cached: Transporter | null = null;

export function getTransporter(): Transporter {
  if (cached) return cached;

  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT || 465);
  const secure =
    process.env.SMTP_SECURE !== undefined
      ? process.env.SMTP_SECURE === "true"
      : port === 465;

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    throw new Error(
      "Email is not configured. Set GMAIL_USER and GMAIL_APP_PASSWORD in .env.local",
    );
  }

  cached = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    pool: true,
    maxConnections: 3,
    connectionTimeout: 15_000,
    greetingTimeout: 10_000,
  });

  return cached;
}

export const mailFrom = () =>
  process.env.MAIL_FROM || `Quantum District <${process.env.GMAIL_USER}>`;

export const mailTo = () =>
  process.env.MAIL_TO || process.env.GMAIL_USER || "";

export const isEmailConfigured = () =>
  Boolean(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD);

/* ------------------------------------------------------------------ */
/*  Branded HTML templates                                              */
/* ------------------------------------------------------------------ */

const NAVY = "#061534";
const NAVY_SOFT = "#0b2149";
const RED = "#e11d2e";
const BORDER = "#e7eefa";

const esc = (s: string) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function shell(inner: string, preheader: string) {
  return `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f8fd;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f8fd;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border:1px solid ${BORDER};border-radius:16px;overflow:hidden;">
        <tr><td style="background:${NAVY};padding:26px 32px;">
          <table role="presentation" cellpadding="0" cellspacing="0"><tr>
            <td style="padding-right:12px;">
              <div style="width:38px;height:38px;border-radius:10px;background:${NAVY_SOFT};border:1px solid rgba(255,255,255,.18);color:#fff;font-size:15px;font-weight:700;letter-spacing:1px;text-align:center;line-height:38px;">QD</div>
            </td>
            <td>
              <div style="color:#ffffff;font-size:17px;font-weight:700;letter-spacing:-0.2px;">Quantum District</div>
              <div style="color:#8fb4fb;font-size:11px;letter-spacing:1.6px;text-transform:uppercase;margin-top:3px;">Technology · Strategy · Transformation</div>
            </td>
          </tr></table>
        </td></tr>
        <tr><td style="height:3px;background:linear-gradient(90deg,${RED} 0%,${RED} 22%,${NAVY_SOFT} 22%);"></td></tr>
        <tr><td style="padding:32px;">${inner}</td></tr>
        <tr><td style="padding:20px 32px;background:#f5f8fd;border-top:1px solid ${BORDER};color:#5b6b88;font-size:12px;line-height:1.6;">
          © ${new Date().getFullYear()} Quantum District. All rights reserved.<br/>
          Turning complex challenges into measurable progress.
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

function row(label: string, value?: string) {
  if (!value) return "";
  return `<tr>
    <td style="padding:11px 0;border-bottom:1px solid ${BORDER};color:#5b6b88;font-size:12px;letter-spacing:.7px;text-transform:uppercase;width:38%;vertical-align:top;">${esc(label)}</td>
    <td style="padding:11px 0;border-bottom:1px solid ${BORDER};color:${NAVY};font-size:14px;line-height:1.6;">${esc(value)}</td>
  </tr>`;
}

export type Lead = {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  message: string;
  source?: string;
  pageUrl?: string;
};

export function internalEmail(lead: Lead) {
  const heat =
    lead.timeline === "Immediately" || lead.timeline === "Within 30 days"
      ? `<div style="display:inline-block;background:${RED};color:#fff;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:5px 10px;border-radius:99px;margin-bottom:14px;">Priority · ${esc(lead.timeline)}</div>`
      : "";

  const inner = `
    ${heat}
    <h1 style="margin:0 0 6px;color:${NAVY};font-size:22px;line-height:1.25;">New inquiry from ${esc(lead.name)}</h1>
    <p style="margin:0 0 22px;color:#5b6b88;font-size:14px;line-height:1.6;">
      Submitted via the Quantum District website${lead.source ? ` · ${esc(lead.source)}` : ""}.
      Reply within one business day to hold the response promise.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${BORDER};">
      ${row("Name", lead.name)}
      ${row("Email", lead.email)}
      ${row("Company", lead.company)}
      ${row("Phone", lead.phone)}
      ${row("Area of interest", lead.projectType)}
      ${row("Budget", lead.budget)}
      ${row("Timeline", lead.timeline)}
      ${row("Page", lead.pageUrl)}
    </table>
    <div style="margin-top:24px;padding:18px 20px;background:#f5f8fd;border-left:3px solid ${RED};border-radius:0 10px 10px 0;">
      <div style="color:#5b6b88;font-size:11px;letter-spacing:.9px;text-transform:uppercase;margin-bottom:8px;">The challenge</div>
      <div style="color:${NAVY};font-size:15px;line-height:1.7;white-space:pre-wrap;">${esc(lead.message)}</div>
    </div>
    <div style="margin-top:26px;">
      <a href="mailto:${esc(lead.email)}?subject=Re:%20Your%20inquiry%20to%20Quantum%20District"
         style="display:inline-block;background:${NAVY};color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;padding:13px 24px;border-radius:10px;">
         Reply to ${esc(lead.name.split(" ")[0])}
      </a>
    </div>`;

  return {
    subject: `New inquiry — ${lead.name}${lead.company ? ` · ${lead.company}` : ""}${lead.projectType ? ` · ${lead.projectType}` : ""}`,
    html: shell(inner, `${lead.name}: ${lead.message.slice(0, 120)}`),
    text:
      `New inquiry from ${lead.name}\n\n` +
      `Email: ${lead.email}\n` +
      (lead.company ? `Company: ${lead.company}\n` : "") +
      (lead.phone ? `Phone: ${lead.phone}\n` : "") +
      (lead.projectType ? `Area: ${lead.projectType}\n` : "") +
      (lead.budget ? `Budget: ${lead.budget}\n` : "") +
      (lead.timeline ? `Timeline: ${lead.timeline}\n` : "") +
      `\n${lead.message}\n`,
  };
}

export function autoReplyEmail(lead: Lead) {
  const first = esc(lead.name.split(" ")[0] || "there");
  const inner = `
    <h1 style="margin:0 0 14px;color:${NAVY};font-size:23px;line-height:1.25;">Thanks, ${first} — we have your message.</h1>
    <p style="margin:0 0 16px;color:#3a4a66;font-size:15px;line-height:1.75;">
      A senior consultant is reviewing what you sent and will reply personally
      <strong style="color:${NAVY};">in under one business day</strong> — with a point of view on your
      situation, not a brochure.
    </p>
    <div style="margin:22px 0;padding:18px 20px;background:#f5f8fd;border-radius:12px;border:1px solid ${BORDER};">
      <div style="color:#5b6b88;font-size:11px;letter-spacing:.9px;text-transform:uppercase;margin-bottom:8px;">What you told us</div>
      <div style="color:${NAVY};font-size:14px;line-height:1.7;white-space:pre-wrap;">${esc(lead.message)}</div>
    </div>
    <p style="margin:0 0 10px;color:#3a4a66;font-size:15px;line-height:1.75;">What happens next:</p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 22px;">
      <tr><td style="padding:6px 12px 6px 0;color:${RED};font-size:13px;font-weight:700;">01</td><td style="padding:6px 0;color:#3a4a66;font-size:14px;line-height:1.6;">We review your challenge and confirm fit.</td></tr>
      <tr><td style="padding:6px 12px 6px 0;color:${RED};font-size:13px;font-weight:700;">02</td><td style="padding:6px 0;color:#3a4a66;font-size:14px;line-height:1.6;">A 30-minute discovery call, usually within 48 hours.</td></tr>
      <tr><td style="padding:6px 12px 6px 0;color:${RED};font-size:13px;font-weight:700;">03</td><td style="padding:6px 0;color:#3a4a66;font-size:14px;line-height:1.6;">A scoped proposal and agreement through our client portal.</td></tr>
    </table>
    <p style="margin:0;color:#5b6b88;font-size:13px;line-height:1.7;">
      In the meantime, reply to this email if anything changes — it reaches our team directly.
    </p>`;

  return {
    subject: "We received your message — Quantum District",
    html: shell(inner, "A senior consultant will reply in under one business day."),
    text:
      `Thanks, ${lead.name.split(" ")[0]} — we have your message.\n\n` +
      `A senior consultant will reply personally in under one business day.\n\n` +
      `What you told us:\n${lead.message}\n\n` +
      `— Quantum District\nTechnology · Strategy · Transformation\n`,
  };
}
