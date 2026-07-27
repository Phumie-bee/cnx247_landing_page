import { sql } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { sendEmail } from "@/lib/mailer";
import {
  demoConfirmedTime,
  postDemoActionPlan,
  postDemoFollowUpNotReady,
} from "@/lib/emails";

// Always fetch fresh data; never cache the bookings list.
export const dynamic = "force-dynamic";

type BookingRow = {
  id: number;
  name: string;
  email: string;
  company: string | null;
  topic: string | null;
  meeting_type: string | null;
  preferred_date: string | null;
  preferred_time: string | null;
  message: string | null;
  status: string;
  confirmed_at: string | null;
  meeting_link: string | null;
  created_at: string;
};

const STATUS_LABELS: Record<string, string> = {
  new: "New",
  confirmed: "Confirmed",
  done: "Done",
  not_ready: "Not ready",
};

const STATUS_BADGE: Record<string, string> = {
  new: "bg-border text-body",
  confirmed: "bg-primary/15 text-primary",
  done: "bg-accent/25 text-heading",
  not_ready: "bg-red-100 text-red-600",
};

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-[12px] font-semibold ${STATUS_BADGE[status] || STATUS_BADGE.new}`}
    >
      {STATUS_LABELS[status] || status}
    </span>
  );
}

/** Server Action — "Save" updates the confirmed time / meeting link (and
 *  auto-confirms); "done"/"not_ready" set those statuses directly. */
async function updateBooking(formData: FormData) {
  "use server";
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
    SELECT name, email, meeting_type, status, confirmed_at, reminder_sent
    FROM bookings WHERE id = ${id}
  `) as {
    name: string;
    email: string;
    meeting_type: string | null;
    status: string;
    confirmed_at: string | null;
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

  // Email the client only when a new/changed confirmed time is set.
  if (timeChanged && newConfirmedAt) {
    const content = demoConfirmedTime({
      leadName: current.name,
      when: formatWhenWat(newConfirmedAt),
      meetingType: current.meeting_type ?? undefined,
      meetingLink: meetingLink || undefined,
    });
    try {
      await sendEmail(current.email, content);
    } catch (err) {
      console.error("[admin] confirmation-time email failed:", err);
    }
  }

  revalidatePath("/admin");
}

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

/** Format a stored UTC timestamp for display in WAT (+1h). */
function fmtWat(iso: string | null): string {
  if (!iso) return "—";
  const wat = new Date(new Date(iso).getTime() + 60 * 60 * 1000);
  return wat.toISOString().slice(0, 16).replace("T", " ") + " WAT";
}

/** Split a stored UTC timestamp into WAT date/time strings for input prefills. */
function watParts(iso: string | null): { date: string; time: string } {
  if (!iso) return { date: "", time: "" };
  const wat = new Date(new Date(iso).getTime() + 60 * 60 * 1000);
  return { date: wat.toISOString().slice(0, 10), time: wat.toISOString().slice(11, 16) };
}

export default async function AdminPage() {
  const bookings = (await sql`
    SELECT id, name, email, company, topic, meeting_type, preferred_date,
           preferred_time, message, status, confirmed_at, meeting_link, created_at
    FROM bookings
    ORDER BY created_at DESC
  `) as BookingRow[];

  const counts = bookings.reduce<Record<string, number>>((acc, b) => {
    acc[b.status] = (acc[b.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <main className="min-h-screen bg-subtle p-6 md:p-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-heading">Demo Bookings</h1>
          <p className="mt-1 text-sm text-body">
            {bookings.length} total · New: {counts.new || 0} · Confirmed:{" "}
            {counts.confirmed || 0} · Done: {counts.done || 0} · Not ready:{" "}
            {counts.not_ready || 0}
          </p>
        </header>

        {bookings.length === 0 ? (
          <div className="rounded-xl border border-border bg-white p-10 text-center text-body">
            No bookings yet.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-border bg-white">
            <table className="w-full min-w-[1000px] text-left text-sm">
              <thead className="border-b border-border bg-subtle text-[12px] uppercase tracking-wide text-body">
                <tr>
                  <th className="px-4 py-3 font-semibold">Received</th>
                  <th className="px-4 py-3 font-semibold">Lead</th>
                  <th className="px-4 py-3 font-semibold">Topic / Meeting</th>
                  <th className="px-4 py-3 font-semibold">Preferred</th>
                  <th className="px-4 py-3 font-semibold">Confirmed</th>
                  <th className="px-4 py-3 font-semibold">Manage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {bookings.map((b) => {
                  const { date, time } = watParts(b.confirmed_at);
                  return (
                    <tr key={b.id} className="align-top">
                      <td className="px-4 py-4 whitespace-nowrap text-body">
                        {fmtWat(b.created_at)}
                      </td>
                      <td className="px-4 py-4">
                        <div className="font-semibold text-heading">{b.name}</div>
                        <div className="text-body break-all">
                          <a
                            href={`mailto:${b.email}`}
                            className="hover:text-primary"
                          >
                            {b.email}
                          </a>
                        </div>
                        {b.company && (
                          <div className="text-[13px] text-muted break-words">
                            {b.company}
                          </div>
                        )}
                        {b.message && (
                          <p className="mt-1 max-w-xs break-words text-[13px] leading-snug text-body">
                            {b.message}
                          </p>
                        )}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-heading">{b.topic || "—"}</div>
                        <div className="text-body">{b.meeting_type || "—"}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-body">
                        {b.preferred_date || "—"}
                        {b.preferred_time ? ` · ${b.preferred_time}` : ""}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap font-medium text-heading">
                        {fmtWat(b.confirmed_at)}
                      </td>
                      <td className="px-4 py-4">
                        <div className="mb-2">
                          <StatusBadge status={b.status} />
                        </div>
                        <form action={updateBooking} className="space-y-2">
                          <input type="hidden" name="id" value={b.id} />
                          <div className="flex flex-wrap items-end gap-2">
                            <label className="flex flex-col text-[11px] text-muted">
                              Confirmed date
                              <input
                                type="date"
                                name="confirmedDate"
                                defaultValue={date}
                                className="mt-0.5 rounded-md border border-border px-2 py-1.5 text-[13px] text-heading"
                              />
                            </label>
                            <label className="flex flex-col text-[11px] text-muted">
                              Time
                              <input
                                type="time"
                                name="confirmedTime"
                                defaultValue={time}
                                className="mt-0.5 rounded-md border border-border px-2 py-1.5 text-[13px] text-heading"
                              />
                            </label>
                            <label className="flex flex-col text-[11px] text-muted">
                              Meeting link (Virtual)
                              <input
                                type="url"
                                name="meetingLink"
                                defaultValue={b.meeting_link ?? ""}
                                placeholder="https://…"
                                className="mt-0.5 w-44 rounded-md border border-border px-2 py-1.5 text-[13px] text-heading"
                              />
                            </label>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <button
                              type="submit"
                              name="intent"
                              value="save"
                              className="rounded-md bg-heading px-4 py-1.5 text-[13px] font-semibold text-white hover:bg-primary"
                            >
                              Save
                            </button>
                            <button
                              type="submit"
                              name="intent"
                              value="done"
                              className="rounded-md border border-border px-3 py-1.5 text-[13px] font-semibold text-body hover:border-primary hover:text-primary"
                            >
                              Mark done
                            </button>
                            <button
                              type="submit"
                              name="intent"
                              value="not_ready"
                              className="rounded-md border border-border px-3 py-1.5 text-[13px] font-semibold text-body hover:border-red-400 hover:text-red-500"
                            >
                              Mark not ready
                            </button>
                          </div>
                        </form>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
