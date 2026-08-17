import { sql } from "@/lib/db";
import BookingsTable, { type BookingRow } from "./BookingsTable";

// Always fetch fresh data; never cache the bookings list.
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const bookings = (await sql`
    SELECT id, name, email, company, topic, meeting_type, preferred_date,
           preferred_time, message, status, kind, confirmed_at, meeting_link,
           created_at
    FROM bookings
    ORDER BY created_at DESC
  `) as BookingRow[];

  return (
    <main className="min-h-screen bg-subtle p-6 md:p-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-heading">
            Demos &amp; Enquiries
          </h1>
          <p className="mt-1 text-sm text-body">{bookings.length} total</p>
        </header>

        {bookings.length === 0 ? (
          <div className="rounded-xl border border-border bg-white p-10 text-center text-body">
            No bookings yet.
          </div>
        ) : (
          <BookingsTable bookings={bookings} />
        )}
      </div>
    </main>
  );
}
