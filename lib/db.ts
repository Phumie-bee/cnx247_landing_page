import { neon } from "@neondatabase/serverless";

/**
 * Neon (PostgreSQL) client. Uses the HTTP driver, which is ideal for Vercel
 * serverless functions. Import `sql` and use it as a tagged template:
 *
 *   await sql`INSERT INTO bookings (name) VALUES (${name})`;
 *
 * Values interpolated via ${} are sent as parameters, not string-concatenated,
 * so this is safe from SQL injection.
 */
export const sql = neon(process.env.DATABASE_URL!);
