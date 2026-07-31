"use client";

import { useEffect, useState } from "react";
import { updateBooking } from "./actions";

export type BookingRow = {
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
  return {
    date: wat.toISOString().slice(0, 10),
    time: wat.toISOString().slice(11, 16),
  };
}

export default function BookingsTable({ bookings }: { bookings: BookingRow[] }) {
  const [active, setActive] = useState<BookingRow | null>(null);

  // Close the modal once the server action (and its revalidation) completes.
  async function handleSubmit(formData: FormData) {
    await updateBooking(formData);
    setActive(null);
  }

  return (
    <>
      <div className="overflow-x-auto rounded-xl border border-border bg-white">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="border-b border-border bg-subtle text-[12px] uppercase tracking-wide text-body">
            <tr>
              <th className="px-4 py-3 font-semibold">Received</th>
              <th className="px-4 py-3 font-semibold">Lead</th>
              <th className="px-4 py-3 font-semibold">Topic / Meeting</th>
              <th className="px-4 py-3 font-semibold">Preferred</th>
              <th className="px-4 py-3 font-semibold">Confirmed</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 text-right font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {bookings.map((b) => (
              <tr key={b.id} className="align-middle hover:bg-subtle/40">
                <td className="whitespace-nowrap px-4 py-3 text-body">
                  {fmtWat(b.created_at)}
                </td>
                <td className="px-4 py-3">
                  <div className="font-semibold text-heading">{b.name}</div>
                  <div className="break-all text-[13px] text-body">{b.email}</div>
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <div className="text-heading">{b.topic || "—"}</div>
                  <div className="text-[13px] text-body">
                    {b.meeting_type || "—"}
                  </div>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-body">
                  {b.preferred_date || "—"}
                  {b.preferred_time ? ` · ${b.preferred_time}` : ""}
                </td>
                <td className="whitespace-nowrap px-4 py-3 font-medium text-heading">
                  {fmtWat(b.confirmed_at)}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={b.status} />
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    type="button"
                    onClick={() => setActive(b)}
                    className="rounded-md border border-border px-3 py-1.5 text-[13px] font-semibold text-heading transition-colors hover:border-primary hover:text-primary"
                  >
                    Manage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {active && (
        <ManageModal
          booking={active}
          onClose={() => setActive(null)}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
}

function ManageModal({
  booking,
  onClose,
  onSubmit,
}: {
  booking: BookingRow;
  onClose: () => void;
  onSubmit: (formData: FormData) => void | Promise<void>;
}) {
  const { date, time } = watParts(booking.confirmed_at);

  // Close on Escape.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-heading/50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Manage booking from ${booking.name}`}
    >
      <div
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="text-lg font-bold text-heading">{booking.name}</h2>
            <a
              href={`mailto:${booking.email}`}
              className="break-all text-[13px] text-body hover:text-primary"
            >
              {booking.email}
            </a>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 rounded-md p-1.5 text-body hover:bg-subtle hover:text-heading"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Details */}
        <dl className="mb-5 grid grid-cols-2 gap-x-4 gap-y-3 rounded-xl bg-subtle p-4 text-[13px]">
          <div>
            <dt className="text-muted">Status</dt>
            <dd className="mt-1">
              <StatusBadge status={booking.status} />
            </dd>
          </div>
          <div>
            <dt className="text-muted">Received</dt>
            <dd className="mt-1 text-heading">{fmtWat(booking.created_at)}</dd>
          </div>
          <div>
            <dt className="text-muted">Company</dt>
            <dd className="mt-1 break-words text-heading">
              {booking.company || "—"}
            </dd>
          </div>
          <div>
            <dt className="text-muted">Topic</dt>
            <dd className="mt-1 text-heading">{booking.topic || "—"}</dd>
          </div>
          <div>
            <dt className="text-muted">Meeting type</dt>
            <dd className="mt-1 text-heading">{booking.meeting_type || "—"}</dd>
          </div>
          <div>
            <dt className="text-muted">Preferred</dt>
            <dd className="mt-1 text-heading">
              {booking.preferred_date || "—"}
              {booking.preferred_time ? ` · ${booking.preferred_time}` : ""}
            </dd>
          </div>
        </dl>

        {booking.message && (
          <div className="mb-5">
            <p className="text-[11px] uppercase tracking-wide text-muted">
              Message
            </p>
            <p className="mt-1 break-words text-[14px] leading-relaxed text-body">
              {booking.message}
            </p>
          </div>
        )}

        {/* Controls */}
        <form action={onSubmit} className="space-y-4 border-t border-border pt-5">
          <input type="hidden" name="id" value={booking.id} />
          <div className="grid grid-cols-2 gap-3">
            <label className="flex flex-col text-[12px] font-medium text-body">
              Confirmed date
              <input
                type="date"
                name="confirmedDate"
                defaultValue={date}
                className="mt-1 rounded-lg border border-border px-3 py-2 text-[14px] text-heading"
              />
            </label>
            <label className="flex flex-col text-[12px] font-medium text-body">
              Time
              <input
                type="time"
                name="confirmedTime"
                defaultValue={time}
                className="mt-1 rounded-lg border border-border px-3 py-2 text-[14px] text-heading"
              />
            </label>
          </div>
          <label className="flex flex-col text-[12px] font-medium text-body">
            Meeting link (Virtual)
            <input
              type="url"
              name="meetingLink"
              defaultValue={booking.meeting_link ?? ""}
              placeholder="https://…"
              className="mt-1 rounded-lg border border-border px-3 py-2 text-[14px] text-heading"
            />
          </label>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              type="submit"
              name="intent"
              value="save"
              className="rounded-lg bg-heading px-5 py-2 text-[14px] font-semibold text-white hover:bg-primary"
            >
              Save &amp; confirm
            </button>
            <button
              type="submit"
              name="intent"
              value="done"
              className="rounded-lg border border-border px-4 py-2 text-[14px] font-semibold text-body hover:border-primary hover:text-primary"
            >
              Mark done
            </button>
            <button
              type="submit"
              name="intent"
              value="not_ready"
              className="rounded-lg border border-border px-4 py-2 text-[14px] font-semibold text-body hover:border-red-400 hover:text-red-500"
            >
              Mark not ready
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
