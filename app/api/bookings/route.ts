import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import {
  internalBookingAlert,
  leadConfirmation,
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
  const meetingType = (body.meetingType ?? body.meeting_type ?? "").trim();
  const preferredDate = (
    body.preferredDate ??
    body.preferred_date ??
    ""
  ).trim();
  const preferredTime = (
    body.preferredTime ??
    body.preferred_time ??
    ""
  ).trim();

  // Server-side validation (never trust the client alone).
  if (
    !name ||
    !email ||
    !isValidEmail(email) ||
    !topic ||
    message.length < 15
  ) {
    return NextResponse.json(
      { success: false, error: "Please complete the form correctly." },
      { status: 422 },
    );
  }

  // Honour the client's chosen time — the demo is confirmed at booking.
  // Staff only step in for the rare reschedule.
  const confirmedAt =
    preferredDate && preferredTime
      ? `${preferredDate}T${preferredTime}:00+01:00`
      : null;
  const status = confirmedAt ? "confirmed" : "new";

  // 1) Save the lead first — the database is the source of truth. If email
  //    later fails, the lead is still captured.
  try {
    await sql`
      INSERT INTO bookings
        (name, email, company, topic, meeting_type, preferred_date, preferred_time, message, confirmed_at, status)
      VALUES
        (${name}, ${email}, ${company || null}, ${topic}, ${meetingType || null},
         ${preferredDate || null}, ${preferredTime || null}, ${message}, ${confirmedAt}, ${status})
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
    meetingType,
    preferredDate,
    preferredTime,
    message,
  };

  const internal = internalBookingAlert(booking);
  const confirmation = leadConfirmation({
    leadName: name,
    meetingType,
    preferredDate,
    preferredTime,
  });

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
