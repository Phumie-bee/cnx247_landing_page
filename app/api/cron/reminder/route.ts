import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { reminder24h } from "@/lib/emails";
import { sendEmail, TEAM_EMAILS } from "@/lib/mailer";

// Triggered by Vercel Cron (see vercel.json). Runs on Node, never cached.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type DueBooking = {
  id: number;
  name: string;
  email: string;
  meeting_type: string | null;
  meeting_link: string | null;
};

export async function GET(req: NextRequest) {
  // Vercel Cron attaches `Authorization: Bearer <CRON_SECRET>` when the env var
  // is set. Reject anything else so the endpoint can't be triggered publicly.
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.get("authorization") !== `Bearer ${secret}`) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // Confirmed demos happening within the next 24h that haven't been reminded.
  const due = (await sql`
    SELECT id, name, email, meeting_type, meeting_link
    FROM bookings
    WHERE status = 'confirmed'
      AND reminder_sent = false
      AND confirmed_at IS NOT NULL
      AND confirmed_at BETWEEN now() AND now() + interval '24 hours'
  `) as DueBooking[];

  const teaserVideoUrl = process.env.TEASER_VIDEO_URL;
  let sent = 0;
  const failures: number[] = [];

  for (const b of due) {
    const content = reminder24h({
      leadName: b.name,
      teaserVideoUrl,
      meetingType: b.meeting_type ?? undefined,
      meetingLink: b.meeting_link ?? undefined,
    });
    try {
      // Reminder to the client; the team gets a quiet copy via BCC.
      const res = await sendEmail(b.email, content, { bcc: TEAM_EMAILS });
      if (res.error) {
        console.error(`[cron] reminder error for booking ${b.id}:`, res.error);
        failures.push(b.id);
        continue; // leave reminder_sent = false so it retries next run
      }
      await sql`UPDATE bookings SET reminder_sent = true WHERE id = ${b.id}`;
      sent++;
    } catch (err) {
      console.error(`[cron] reminder threw for booking ${b.id}:`, err);
      failures.push(b.id);
    }
  }

  return NextResponse.json({ ok: true, due: due.length, sent, failures });
}
