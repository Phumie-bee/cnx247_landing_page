"use server";

import { sql } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { sendEmail } from "@/lib/mailer";
import {
  demoRescheduled,
  demoMeetingLink,
  postDemoActionPlan,
  postDemoFollowUpNotReady,
} from "@/lib/emails";

/** Human-readable WAT datetime for emails, e.g. "Tuesday, 28 July 2026, 16:03 WAT". */
function formatWhenWat(iso: string): string {
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

/** "Save" updates the confirmed time / meeting link (and auto-confirms);
 *  "done"/"not_ready" set those statuses directly and send the post-demo email. */
export async function updateBooking(formData: FormData) {
  const id = Number(formData.get("id"));
  const intent = String(formData.get("intent") || "save");

  // Manual outcome buttons: set the status and send the matching post-demo email.
  if (intent === "done" || intent === "not_ready") {
    const [current] = (await sql`
      SELECT name, email, status FROM bookings WHERE id = ${id}
    `) as { name: string; email: string; status: string }[];
    if (!current) return;

    await sql`UPDATE bookings SET status = ${intent} WHERE id = ${id}`;

    // Only email on an actual status change, so re-clicking won't re-send.
    if (current.status !== intent) {
      const content =
        intent === "done"
          ? postDemoActionPlan({ leadName: current.name })
          : postDemoFollowUpNotReady({ leadName: current.name });
      try {
        await sendEmail(current.email, content);
      } catch (err) {
        console.error(`[admin] ${intent} email failed:`, err);
      }
    }

    revalidatePath("/admin");
    return;
  }

  const date = String(formData.get("confirmedDate") || "").trim();
  const time = String(formData.get("confirmedTime") || "").trim();
  const meetingLink = String(formData.get("meetingLink") || "").trim();

  // Nigeria is WAT (UTC+1, no daylight saving) — build an unambiguous instant.
  const newConfirmedAt = date && time ? `${date}T${time}:00+01:00` : null;

  const [current] = (await sql`
    SELECT name, email, meeting_type, status, confirmed_at, meeting_link, reminder_sent
    FROM bookings WHERE id = ${id}
  `) as {
    name: string;
    email: string;
    meeting_type: string | null;
    status: string;
    confirmed_at: string | null;
    meeting_link: string | null;
    reminder_sent: boolean;
  }[];
  if (!current) return;

  // Setting a time auto-confirms; clearing it reverts a confirmed booking to new.
  const status = newConfirmedAt
    ? "confirmed"
    : current.status === "confirmed"
      ? "new"
      : current.status;

  // Did the confirmed time change to a new value? Drives the email + reminder reset.
  const prevMs = current.confirmed_at
    ? new Date(current.confirmed_at).getTime()
    : null;
  const newMs = newConfirmedAt ? new Date(newConfirmedAt).getTime() : null;
  const timeChanged = newMs !== null && newMs !== prevMs;
  const linkChanged = (meetingLink || null) !== (current.meeting_link || null);

  const reminderSent =
    !newConfirmedAt || timeChanged ? false : current.reminder_sent;

  await sql`
    UPDATE bookings
    SET status = ${status},
        confirmed_at = ${newConfirmedAt},
        meeting_link = ${meetingLink || null},
        reminder_sent = ${reminderSent}
    WHERE id = ${id}
  `;

  // Notify the client when something they care about changed. A time change is
  // a reschedule; a link-only change just delivers the meeting link.
  if (newConfirmedAt && (timeChanged || linkChanged)) {
    const when = formatWhenWat(newConfirmedAt);
    const content = timeChanged
      ? demoRescheduled({
          leadName: current.name,
          when,
          meetingType: current.meeting_type ?? undefined,
          meetingLink: meetingLink || undefined,
        })
      : demoMeetingLink({
          leadName: current.name,
          when,
          meetingLink: meetingLink || undefined,
        });
    try {
      await sendEmail(current.email, content);
    } catch (err) {
      console.error("[admin] client notification email failed:", err);
    }
  }

  revalidatePath("/admin");
}
