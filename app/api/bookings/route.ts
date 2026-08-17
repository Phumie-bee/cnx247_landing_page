import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import {
  internalEnquiryAlert,
  enquiryConfirmation,
  type Booking,
} from "@/lib/emails";
import { sendEmail, TEAM_EMAILS } from "@/lib/mailer";

// This route touches the database + Resend, so it must run on the Node runtime
// and never be statically cached.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request." },
      { status: 400 },
    );
  }

  // Spam honeypot — a filled hidden field means a bot. Pretend success.
  if (body.botcheck) {
    return NextResponse.json({ success: true });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const message = (body.message ?? "").trim();
  const topic = (body.topic ?? "").trim();
  const company = (body.company ?? "").trim();

  // Server-side validation (never trust the client alone). The message is
  // optional — an enquiry with just a name, email and topic is still a lead.
  if (!name || !email || !isValidEmail(email) || !topic) {
    return NextResponse.json(
      { success: false, error: "Please complete the form correctly." },
      { status: 422 },
    );
  }

  // The form captures enquiries only — it no longer books demos, so nothing
  // arrives pre-scheduled. Staff schedule a demo from /admin, which sets
  // confirmed_at and moves the row to "confirmed".
  //
  // 1) Save the lead first — the database is the source of truth. If email
  //    later fails, the lead is still captured.
  try {
    await sql`
      INSERT INTO bookings
        (name, email, company, topic, message, status, kind)
      VALUES
        (${name}, ${email}, ${company || null}, ${topic}, ${message || null}, 'new', 'enquiry')
    `;
  } catch (err) {
    console.error("[bookings] DB insert failed:", err);
    return NextResponse.json(
      {
        success: false,
        error: "Could not save your request. Please try again.",
      },
      { status: 500 },
    );
  }

  // 2) Send emails — best-effort. A send failure must NOT tell the customer
  //    their request failed, because it's already safely stored.
  const booking: Booking = {
    leadName: name,
    email,
    company,
    topic,
    message,
  };

  const internal = internalEnquiryAlert(booking);
  const confirmation = enquiryConfirmation({ leadName: name, topic });

  const results = await Promise.allSettled([
    sendEmail(TEAM_EMAILS, internal, { replyTo: email }),
    sendEmail(email, confirmation),
  ]);

  results.forEach((r, i) => {
    if (r.status === "rejected") {
      console.error(
        `[bookings] email ${i === 0 ? "internal alert" : "confirmation"} failed:`,
        r.reason,
      );
    } else if (r.value.error) {
      console.error(
        `[bookings] email ${i === 0 ? "internal alert" : "confirmation"} error:`,
        r.value.error,
      );
    }
  });

  return NextResponse.json({ success: true });
}
