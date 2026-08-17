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

import { DEMO_VIDEO_URL } from "@/lib/video";

const BRAND = {
  name: "CNX247",
  primary: "#2e937d",
  accent: "#a9cf46",
  heading: "#111111",
  body: "#555555",
  border: "#e5e7eb",
  poweredBy: "Connexxion Telecoms",
  signature: "The CNX247 Team",
  // Overridable via TEASER_VIDEO_URL if a demo-specific teaser is cut later.
  teaserVideoUrl: DEMO_VIDEO_URL,
  portfolioUrl: "https://cnx247.com", // TODO: real portfolio download link
  pricingUrl: "https://cnx247.com/#pricing",
};

export type EmailContent = { subject: string; html: string; text: string };

export type Booking = {
  leadName: string;
  email: string;
  company?: string;
  topic?: string;
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

/**
 * Human-readable WAT datetime for emails, e.g. "Tuesday, 28 July 2026, 16:03 WAT".
 * Nigeria is UTC+1 year-round (no daylight saving), so this is unambiguous.
 */
export function formatWhenWat(iso: string): string {
  return (
    new Intl.DateTimeFormat("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Africa/Lagos",
    }).format(new Date(iso)) + " WAT"
  );
}

/* ------------------------------------------------------------------ */
/*  1. Internal Enquiry Alert  →  team inboxes                         */
/* ------------------------------------------------------------------ */

export function internalEnquiryAlert(b: Booking): EmailContent {
  const rows: [string, string][] = [
    ["Name", b.leadName],
    ["Email", b.email],
    ["Company", b.company || "—"],
    ["Topic", b.topic || "—"],
    ["Message", b.message || "—"],
  ];

  const detailHtml = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#9ca3af;font-size:13px;vertical-align:top;white-space:nowrap;">${k}</td><td style="padding:6px 0;color:${BRAND.heading};font-size:14px;">${escapeHtml(v)}</td></tr>`,
    )
    .join("");

  const inner = `
    ${heading("New Enquiry Received")}
    ${paragraph("Hi Team, a new enquiry has come in. Details below — please update the CRM and follow up. If it warrants a demo, schedule it from the admin dashboard.")}
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 4px;">${detailHtml}</table>
  `;

  const text = `New Enquiry Received

Hi Team, a new enquiry has come in. Please update the CRM and follow up. If it
warrants a demo, schedule it from the admin dashboard.

${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}

— ${BRAND.signature}`;

  return {
    subject: "New Enquiry Received",
    html: layout(inner),
    text,
  };
}

/* ------------------------------------------------------------------ */
/*  1b. Internal Demo Alert  →  team inboxes                           */
/* ------------------------------------------------------------------ */

/**
 * Sent when someone books through /book-demo. Unlike an enquiry, the slot is
 * already confirmed — the team needs to show up, not schedule it.
 */
export function internalDemoAlert(
  b: Booking & { meetingType?: string; when?: string },
): EmailContent {
  const rows: [string, string][] = [
    ["Name", b.leadName],
    ["Email", b.email],
    ["Company", b.company || "—"],
    ["Meeting type", b.meetingType || "—"],
    ["Demo time", b.when || "—"],
    ["Notes", b.message || "—"],
  ];

  const detailHtml = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#9ca3af;font-size:13px;vertical-align:top;white-space:nowrap;">${k}</td><td style="padding:6px 0;color:${BRAND.heading};font-size:14px;">${escapeHtml(v)}</td></tr>`,
    )
    .join("");

  const inner = `
    ${heading("New Demo Booked")}
    ${paragraph("Hi Team, a demo has been booked and the client has already been sent a confirmation for the slot below. Please add it to the calendar and update the CRM.")}
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 4px;">${detailHtml}</table>
    ${paragraph(`If it's a virtual session, add the meeting link in the admin dashboard so it reaches the client.`)}
  `;

  const text = `New Demo Booked

Hi Team, a demo has been booked and the client has already been sent a
confirmation for the slot below. Please add it to the calendar and update the CRM.

${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}

If it's a virtual session, add the meeting link in the admin dashboard so it
reaches the client.

— ${BRAND.signature}`;

  return {
    subject: "New Demo Booked",
    html: layout(inner),
    text,
  };
}

/* ------------------------------------------------------------------ */
/*  2a. Enquiry Acknowledgement — sent immediately on form submit      */
/* ------------------------------------------------------------------ */

/**
 * Generic "we got your message" reply. The contact form no longer books demos,
 * so every submission gets this regardless of topic — never a demo confirmation.
 */
export function enquiryConfirmation(p: {
  leadName: string;
  topic?: string;
}): EmailContent {
  const about = p.topic ? ` about <strong>${escapeHtml(p.topic)}</strong>` : "";
  const aboutText = p.topic ? ` about ${p.topic}` : "";

  const inner = `
    ${heading("Thanks for getting in touch")}
    ${paragraph(`Hi ${escapeHtml(p.leadName)}, we've received your message${about} and a member of our team will get back to you shortly — usually within 2 business hours.`)}
    ${paragraph("In the meantime, feel free to browse our pricing:")}
    ${button("View pricing", BRAND.pricingUrl)}
    ${signoff()}
  `;

  const text = `Thanks for getting in touch

Hi ${p.leadName}, we've received your message${aboutText} and a member of our team
will get back to you shortly — usually within 2 business hours.

In the meantime, feel free to browse our pricing: ${BRAND.pricingUrl}

Cheers,
${BRAND.signature}`;

  return {
    subject: "We've received your message — CNX247",
    html: layout(inner),
    text,
  };
}

/* ------------------------------------------------------------------ */
/*  2b. Demo Confirmation — staff scheduled a demo for the first time  */
/* ------------------------------------------------------------------ */

export function leadConfirmation(p: {
  leadName: string;
  when: string; // human-readable, e.g. "Tuesday, 28 July 2026, 16:03 WAT"
  meetingType?: string; // "Onsite" | "Virtual"
  meetingLink?: string;
}): EmailContent {
  // A link means it's a virtual session even when meeting_type was never set.
  const nextHtml = p.meetingLink
    ? button("Join the meeting", p.meetingLink)
    : p.meetingType === "Virtual"
      ? paragraph("We'll send you a meeting link before the session.")
      : p.meetingType === "Onsite"
        ? paragraph(
            "Just let us know whether you'd like us to visit your office, or you'd prefer to visit ours.",
          )
        : paragraph("We'll be in touch with everything you need before we meet.");

  const inner = `
    ${heading("Your CNX247 Demo is Booked!")}
    ${paragraph(`Hi ${escapeHtml(p.leadName)}, your demo is confirmed for:`)}
    <p style="margin:0 0 16px;font-size:17px;font-weight:bold;color:${BRAND.heading};">${escapeHtml(p.when)}</p>
    ${nextHtml}
    ${signoff()}
  `;

  const nextText = p.meetingLink
    ? `Join the meeting: ${p.meetingLink}`
    : p.meetingType === "Virtual"
      ? "We'll send you a meeting link before the session."
      : p.meetingType === "Onsite"
        ? "Just let us know whether you'd like us to visit your office, or you'd prefer to visit ours."
        : "We'll be in touch with everything you need before we meet.";

  const text = `Your CNX247 Demo is Booked!

Hi ${p.leadName}, your demo is confirmed for:
${p.when}

${nextText}

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
  meetingLink?: string;
}): EmailContent {
  const videoUrl = p.teaserVideoUrl || BRAND.teaserVideoUrl;
  // Presence of a link is what matters — meeting_type is often unset.
  const joinHtml = p.meetingLink
    ? button("Join the meeting", p.meetingLink)
    : "";
  const joinText = p.meetingLink
    ? `\nJoin the meeting: ${p.meetingLink}\n`
    : "";

  const inner = `
    ${heading("Looking forward to our CNX247 demo tomorrow!")}
    ${paragraph(`Hi ${escapeHtml(p.leadName)}, reminder for tomorrow.`)}
    ${paragraph("Here's a teaser video to give you a preview of the product specs:")}
    ${button("Watch the teaser", videoUrl)}
    ${joinHtml}
    ${paragraph("See you soon!")}
    ${signoff("Regards,")}
  `;
  const text = `Looking forward to our CNX247 demo tomorrow!

Hi ${p.leadName}, reminder for tomorrow.

Here's a teaser video to give you a preview of the product specs: ${videoUrl}
${joinText}
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
    ${paragraph(`Hi ${escapeHtml(p.leadName)}, understood — now might not be the right moment.`)}
    ${paragraph("Here is a portfolio download:")}
    ${button("Download portfolio", portfolioUrl)}
    ${paragraph("We'll check back in soon.")}
    ${signoff()}
  `;
  const text = `Staying in touch — CNX247

Hi ${p.leadName}, understood — now might not be the right moment.

Here is a portfolio download: ${portfolioUrl}

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
/*  6a. Demo Rescheduled — staff changed the demo time                */
/* ------------------------------------------------------------------ */

export function demoRescheduled(p: {
  leadName: string;
  when: string; // human-readable, e.g. "Tuesday, 28 July 2026, 16:03 WAT"
  meetingType?: string; // "Onsite" | "Virtual"
  meetingLink?: string; // optional join link for virtual demos
}): EmailContent {
  // A link means it's a virtual session even when meeting_type was never set.
  const detailHtml = p.meetingLink
    ? button("Join the meeting", p.meetingLink)
    : p.meetingType === "Virtual"
      ? paragraph("We'll send your meeting link ahead of the session.")
      : paragraph("We'll be in touch about the location.");

  const inner = `
    ${heading("Your CNX247 demo has been rescheduled")}
    ${paragraph(`Hi ${escapeHtml(p.leadName)}, your demo has been moved to:`)}
    <p style="margin:0 0 16px;font-size:17px;font-weight:bold;color:${BRAND.heading};">${escapeHtml(p.when)}</p>
    ${detailHtml}
    ${paragraph("Apologies for any inconvenience — see you then!")}
    ${signoff()}
  `;

  const detailText = p.meetingLink
    ? `Join the meeting: ${p.meetingLink}`
    : p.meetingType === "Virtual"
      ? "We'll send your meeting link ahead of the session."
      : "We'll be in touch about the location.";

  const text = `Your CNX247 demo has been rescheduled

Hi ${p.leadName}, your demo has been moved to:
${p.when}

${detailText}

Apologies for any inconvenience — see you then!

Cheers,
${BRAND.signature}`;

  return {
    subject: "Your CNX247 demo has been rescheduled",
    html: layout(inner),
    text,
  };
}

/* ------------------------------------------------------------------ */
/*  6b. Demo Meeting Link — staff added/changed a virtual link        */
/* ------------------------------------------------------------------ */

export function demoMeetingLink(p: {
  leadName: string;
  when: string;
  meetingLink?: string;
}): EmailContent {
  const inner = `
    ${heading("Your CNX247 demo details")}
    ${paragraph(`Hi ${escapeHtml(p.leadName)}, here's the link to join your demo on <strong>${escapeHtml(p.when)}</strong>:`)}
    ${p.meetingLink ? button("Join the meeting", p.meetingLink) : ""}
    ${paragraph("See you then!")}
    ${signoff()}
  `;

  const text = `Your CNX247 demo details

Hi ${p.leadName}, here's the link to join your demo on ${p.when}:
${p.meetingLink ? p.meetingLink : ""}

See you then!

Cheers,
${BRAND.signature}`;

  return { subject: "Your CNX247 demo details", html: layout(inner), text };
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
