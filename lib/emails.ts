/**
 * Email templates for the CNX247 automated demo feedback loop.
 *
 * Each builder returns { subject, html, text } so it works with ANY sender we
 * wire up later (Resend, SES, Nodemailer, …). This file is intentionally
 * framework-free and side-effect-free — no network calls, no secrets — so the
 * marketing copy can be edited here safely without touching sending logic.
 *
 * Copy mirrors the marketing brief ("Automated Feedback Loop - CNX 247").
 * Placeholders like [Lead_Name] are replaced by the typed params below.
 */

const BRAND = {
  name: "CNX247",
  primary: "#2e937d",
  accent: "#a9cf46",
  heading: "#111111",
  body: "#555555",
  border: "#e5e7eb",
  poweredBy: "Connexxion Telecoms",
  signature: "The CNX247 Team",
  // Update these once the assets exist:
  teaserVideoUrl: "https://cnx247.com", // TODO: real teaser video link
  portfolioUrl: "https://cnx247.com", // TODO: real portfolio download link
  pricingUrl: "https://cnx247.com/#pricing",
};

export type EmailContent = { subject: string; html: string; text: string };

export type Booking = {
  leadName: string;
  email: string;
  company?: string;
  topic?: string;
  meetingType?: string; // "Onsite" | "Virtual" | "No preference"
  preferredDate?: string;
  preferredTime?: string;
  message?: string;
};

/* ------------------------------------------------------------------ */
/*  Shared layout — email-safe inline styles                          */
/* ------------------------------------------------------------------ */

function layout(innerHtml: string): string {
  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f4f6f8;font-family:Arial,Helvetica,sans-serif;color:${BRAND.body};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f8;padding:24px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#ffffff;border:1px solid ${BRAND.border};border-radius:12px;overflow:hidden;">
            <tr>
              <td style="background:${BRAND.heading};padding:20px 28px;">
                <span style="color:#ffffff;font-size:20px;font-weight:bold;letter-spacing:-0.5px;">CNX<span style="color:${BRAND.accent};">247</span></span>
              </td>
            </tr>
            <tr>
              <td style="padding:28px;font-size:15px;line-height:1.65;color:${BRAND.body};">
                ${innerHtml}
              </td>
            </tr>
            <tr>
              <td style="padding:18px 28px;border-top:1px solid ${BRAND.border};font-size:12px;color:#9ca3af;">
                Powered by ${BRAND.poweredBy}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function heading(text: string): string {
  return `<h1 style="margin:0 0 16px;font-size:20px;line-height:1.3;color:${BRAND.heading};font-weight:bold;">${text}</h1>`;
}

function paragraph(text: string): string {
  return `<p style="margin:0 0 14px;">${text}</p>`;
}

function signoff(closing = "Cheers,"): string {
  return `<p style="margin:20px 0 0;">${closing}<br /><strong style="color:${BRAND.heading};">${BRAND.signature}</strong></p>`;
}

function button(label: string, href: string): string {
  return `<p style="margin:22px 0;"><a href="${href}" style="background:${BRAND.primary};color:#ffffff;text-decoration:none;padding:12px 22px;border-radius:8px;font-weight:bold;display:inline-block;">${label}</a></p>`;
}

/* ------------------------------------------------------------------ */
/*  1. Internal Booking Alert  →  team inboxes                         */
/* ------------------------------------------------------------------ */

export function internalBookingAlert(b: Booking): EmailContent {
  const rows: [string, string][] = [
    ["Name", b.leadName],
    ["Email", b.email],
    ["Company", b.company || "—"],
    ["Topic", b.topic || "—"],
    ["Meeting type", b.meetingType || "No preference"],
    ["Preferred date", b.preferredDate || "No preference"],
    ["Preferred time", b.preferredTime || "No preference"],
    ["Message", b.message || "—"],
  ];

  const detailHtml = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#9ca3af;font-size:13px;vertical-align:top;white-space:nowrap;">${k}</td><td style="padding:6px 0;color:${BRAND.heading};font-size:14px;">${escapeHtml(v)}</td></tr>`,
    )
    .join("");

  const inner = `
    ${heading("New Demo Booking Received")}
    ${paragraph("Hi Team, a new demo has been booked. Details below — please update the CRM accordingly.")}
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 4px;">${detailHtml}</table>
  `;

  const text = `New Demo Booking Received

Hi Team, a new demo has been booked. Please update the CRM accordingly.

${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}

— ${BRAND.signature}`;

  return {
    subject: "New Demo Booking Received",
    html: layout(inner),
    text,
  };
}

/* ------------------------------------------------------------------ */
/*  2a. Lead Confirmation — Onsite                                     */
/* ------------------------------------------------------------------ */

export function leadConfirmationOnsite(p: { leadName: string }): EmailContent {
  const inner = `
    ${heading("Your CNX247 Demo is Booked!")}
    ${paragraph(`Hi ${escapeHtml(p.leadName)}, thanks for booking!`)}
    ${paragraph("Based on your preferred type, let us know whether you'd like us to visit your office, or you'd prefer to visit ours — and we'll lock in the details.")}
    ${signoff()}
  `;
  const text = `Your CNX247 Demo is Booked!

Hi ${p.leadName}, thanks for booking!

Based on your preferred type, let us know whether you'd like us to visit your office or you'd prefer to visit ours, and we'll lock in the details.

Cheers,
${BRAND.signature}`;
  return {
    subject: "Confirmation: Your CNX247 Demo is Booked!",
    html: layout(inner),
    text,
  };
}

/* ------------------------------------------------------------------ */
/*  2b. Lead Confirmation — Virtual                                    */
/* ------------------------------------------------------------------ */

export function leadConfirmationVirtual(p: { leadName: string }): EmailContent {
  const inner = `
    ${heading("Your CNX247 Demo is Booked!")}
    ${paragraph(`Hi ${escapeHtml(p.leadName)}, thanks for booking!`)}
    ${paragraph("Based on your preferred type, we'll send you a meeting link for the virtual session shortly.")}
    ${signoff()}
  `;
  const text = `Your CNX247 Demo is Booked!

Hi ${p.leadName}, thanks for booking!

Based on your preferred type, we'll send you a meeting link for the virtual session shortly.

Cheers,
${BRAND.signature}`;
  return {
    subject: "Confirmation: Your CNX247 Demo is Booked!",
    html: layout(inner),
    text,
  };
}

/* ------------------------------------------------------------------ */
/*  3. 24-Hour Reminder  →  lead + team                               */
/* ------------------------------------------------------------------ */

export function reminder24h(p: {
  leadName: string;
  teaserVideoUrl?: string;
}): EmailContent {
  const videoUrl = p.teaserVideoUrl || BRAND.teaserVideoUrl;
  const inner = `
    ${heading("Looking forward to our CNX247 demo tomorrow!")}
    ${paragraph(`Hi ${escapeHtml(p.leadName)}, just a reminder about our demo tomorrow.`)}
    ${paragraph("Here's a short teaser video to give you a preview of the product before we meet:")}
    ${button("Watch the teaser", videoUrl)}
    ${paragraph("See you soon!")}
    ${signoff("Regards,")}
  `;
  const text = `Looking forward to our CNX247 demo tomorrow!

Hi ${p.leadName}, just a reminder about our demo tomorrow.

Here's a short teaser video to preview the product: ${videoUrl}

See you soon!

Regards,
${BRAND.signature}`;
  return {
    subject: "Looking forward to our CNX247 demo tomorrow!",
    html: layout(inner),
    text,
  };
}

/* ------------------------------------------------------------------ */
/*  4. Post-Demo Action Plan  →  lead (manual trigger)                */
/* ------------------------------------------------------------------ */

export function postDemoActionPlan(p: { leadName: string }): EmailContent {
  const steps = [
    "Review pricing",
    "Check the Feature Guide",
    "Agree on customizable modules",
    "Sign SLA, deployment and go-live",
  ];
  const stepsHtml = steps
    .map(
      (s, i) =>
        `<tr><td style="padding:4px 10px 4px 0;color:${BRAND.primary};font-weight:bold;vertical-align:top;">${i + 1}.</td><td style="padding:4px 0;color:${BRAND.heading};">${s}</td></tr>`,
    )
    .join("");
  const inner = `
    ${heading("Great connecting today! Next steps for CNX247")}
    ${paragraph(`Hi ${escapeHtml(p.leadName)}, thanks for chatting! Here are the next steps to set up your CNX247 platform:`)}
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 6px;">${stepsHtml}</table>
    ${button("Review pricing", BRAND.pricingUrl)}
    ${signoff()}
  `;
  const text = `Great connecting today! Next steps for CNX247

Hi ${p.leadName}, thanks for chatting! Here are the next steps to set up your CNX247 platform:

${steps.map((s, i) => `${i + 1}. ${s}`).join("\n")}

Cheers,
${BRAND.signature}`;
  return {
    subject: "Great connecting today! Next steps for CNX247",
    html: layout(inner),
    text,
  };
}

/* ------------------------------------------------------------------ */
/*  5. Post-Demo Follow-Up (Not Ready)  →  lead (manual trigger)      */
/* ------------------------------------------------------------------ */

export function postDemoFollowUpNotReady(p: {
  leadName: string;
  portfolioUrl?: string;
}): EmailContent {
  const portfolioUrl = p.portfolioUrl || BRAND.portfolioUrl;
  const inner = `
    ${heading("Staying in touch — CNX247")}
    ${paragraph(`Hi ${escapeHtml(p.leadName)}, we understand now might not be the right moment.`)}
    ${paragraph("Here's a portfolio you can download to keep on file:")}
    ${button("Download portfolio", portfolioUrl)}
    ${paragraph("We'll check back in soon.")}
    ${signoff()}
  `;
  const text = `Staying in touch — CNX247

Hi ${p.leadName}, we understand now might not be the right moment.

Here's a portfolio you can download: ${portfolioUrl}

We'll check back in soon.

Cheers,
${BRAND.signature}`;
  return {
    subject: "Staying in touch — CNX247",
    html: layout(inner),
    text,
  };
}

/* ------------------------------------------------------------------ */
/*  6. Demo Confirmed — sent when staff set the agreed date/time      */
/* ------------------------------------------------------------------ */

export function demoConfirmedTime(p: {
  leadName: string;
  when: string; // human-readable, e.g. "Tuesday, 28 July 2026, 16:03 WAT"
  meetingType?: string; // "Onsite" | "Virtual"
  meetingLink?: string; // optional join link for virtual demos
}): EmailContent {
  const isVirtual = p.meetingType === "Virtual";
  const detailHtml = isVirtual
    ? p.meetingLink
      ? button("Join the meeting", p.meetingLink)
      : paragraph("We'll send your meeting link ahead of the session.")
    : paragraph("We'll be in touch shortly to confirm the location.");

  const inner = `
    ${heading("Your CNX247 demo is confirmed")}
    ${paragraph(`Hi ${escapeHtml(p.leadName)}, your demo is confirmed for:`)}
    <p style="margin:0 0 16px;font-size:17px;font-weight:bold;color:${BRAND.heading};">${escapeHtml(p.when)}</p>
    ${detailHtml}
    ${paragraph("Looking forward to it!")}
    ${signoff()}
  `;

  const detailText = isVirtual
    ? p.meetingLink
      ? `Join the meeting: ${p.meetingLink}`
      : "We'll send your meeting link ahead of the session."
    : "We'll be in touch shortly to confirm the location.";

  const text = `Your CNX247 demo is confirmed

Hi ${p.leadName}, your demo is confirmed for:
${p.when}

${detailText}

Looking forward to it!

Cheers,
${BRAND.signature}`;

  return { subject: "Your CNX247 demo is confirmed", html: layout(inner), text };
}

/* ------------------------------------------------------------------ */
/*  util                                                              */
/* ------------------------------------------------------------------ */

/** Minimal HTML escaping for user-supplied values injected into templates. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
