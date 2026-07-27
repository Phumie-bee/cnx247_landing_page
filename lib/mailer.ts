import { Resend } from "resend";
import type { EmailContent } from "@/lib/emails";

/**
 * Central place for sending email via Resend. Keeps the API key, the sender
 * address, and the team recipients in one spot so routes and server actions
 * don't each re-declare them.
 */
const resend = new Resend(process.env.RESEND_API_KEY);

// Sender address — must be on a Resend-verified domain to actually deliver.
export const EMAIL_FROM = process.env.EMAIL_FROM || "CNX247 <noreply@cnx247.com>";
// Internal booking-alert recipients (both mailboxes per the marketing brief).
export const TEAM_EMAILS = ["info@cnx247.com", "info@connexxiontelecom.com"];

/** Send one prepared email. Returns Resend's { data, error } result. */
export function sendEmail(
  to: string | string[],
  content: EmailContent,
  opts?: { replyTo?: string },
) {
  return resend.emails.send({
    from: EMAIL_FROM,
    to,
    replyTo: opts?.replyTo,
    subject: content.subject,
    html: content.html,
    text: content.text,
  });
}
