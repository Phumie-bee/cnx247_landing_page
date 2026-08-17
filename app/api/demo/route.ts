import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import {
  internalDemoAlert,
  leadConfirmation,
  formatWhenWat,
  type Booking,
} from "@/lib/emails";
import { sendEmail, TEAM_EMAILS } from "@/lib/mailer";

// Touches the database + Resend, so it must run on the Node runtime and never
// be statically cached.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MEETING_TYPES = ["Onsite", "Virtual"];

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
  const company = (body.company ?? "").trim();
  const message = (body.message ?? "").trim();
  const meetingType = (body.meetingType ?? "").trim();
  const preferredDate = (body.preferredDate ?? "").trim();
  const preferredTime = (body.preferredTime ?? "").trim();

  // Server-side validation — the browser's `min` attribute and required fields
  // are conveniences, not guarantees. Anything can POST here directly.
  if (
    !name ||
    !email ||
    !isValidEmail(email) ||
    !MEETING_TYPES.includes(meetingType) ||
    !/^\d{4}-\d{2}-\d{2}$/.test(preferredDate) ||
    !/^\d{2}:\d{2}$/.test(preferredTime)
  ) {
    return NextResponse.json(
      { success: false, error: "Please complete the form correctly." },
      { status: 422 },
    );
  }

  // Nigeria is WAT (UTC+1, no daylight saving) — build an unambiguous instant.
  const confirmedAt = `${preferredDate}T${preferredTime}:00+01:00`;
  const slot = new Date(confirmedAt);

  if (Number.isNaN(slot.getTime())) {
    return NextResponse.json(
      { success: false, error: "That date and time isn't valid." },
      { status: 422 },
    );
  }

  // The slot is confirmed on submit, so it must genuinely be in the future —
  // otherwise we'd email someone a confirmation for a demo that already passed.
  if (slot.getTime() <= Date.now()) {
    return NextResponse.json(
      { success: false, error: "Please choose a date and time in the future." },
      { status: 422 },
    );
  }

  // 1) Save the booking first — the database is the source of truth. If email
  //    later fails, the booking is still captured.
  try {
    await sql`
      INSERT INTO bookings
        (name, email, company, topic, meeting_type, preferred_date,
         preferred_time, message, confirmed_at, status, kind)
      VALUES
        (${name}, ${email}, ${company || null}, 'Book a Demo', ${meetingType},
         ${preferredDate}, ${preferredTime}, ${message || null},
         ${confirmedAt}, 'confirmed', 'demo')
    `;
  } catch (err) {
    console.error("[demo] DB insert failed:", err);
    return NextResponse.json(
      {
        success: false,
        error: "Could not save your booking. Please try again.",
      },
      { status: 500 },
    );
  }

  // 2) Send emails — best-effort. A send failure must NOT tell the customer
  //    their booking failed, because it's already safely stored.
  const booking: Booking & { meetingType: string; when: string } = {
    leadName: name,
    email,
    company,
    topic: "Book a Demo",
    message,
    meetingType,
    when: formatWhenWat(confirmedAt),
  };

  const internal = internalDemoAlert(booking);
  const confirmation = leadConfirmation({
    leadName: name,
    when: booking.when,
    meetingType,
  });

  const results = await Promise.allSettled([
    sendEmail(TEAM_EMAILS, internal, { replyTo: email }),
    sendEmail(email, confirmation),
  ]);

  results.forEach((r, i) => {
    const which = i === 0 ? "internal alert" : "confirmation";
    if (r.status === "rejected") {
      console.error(`[demo] email ${which} failed:`, r.reason);
    } else if (r.value.error) {
      console.error(`[demo] email ${which} error:`, r.value.error);
    }
  });

  return NextResponse.json({ success: true });
}
