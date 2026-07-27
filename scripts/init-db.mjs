/**
 * One-time database setup: creates the `bookings` table in Neon.
 * Run with:  node scripts/init-db.mjs
 *
 * Reads DATABASE_URL from .env.local directly (no extra deps, works on any
 * recent Node version). Safe to run repeatedly — uses CREATE TABLE IF NOT EXISTS.
 */
import { readFileSync } from "node:fs";
import { neon } from "@neondatabase/serverless";

function loadDatabaseUrl() {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;
  const env = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
  const match = env.match(/^DATABASE_URL=(.*)$/m);
  if (!match) throw new Error("DATABASE_URL not found in .env.local");
  return match[1].trim().replace(/^["']|["']$/g, "");
}

const sql = neon(loadDatabaseUrl());

await sql`
  CREATE TABLE IF NOT EXISTS bookings (
    id             serial PRIMARY KEY,
    name           text NOT NULL,
    email          text NOT NULL,
    company        text,
    topic          text,
    meeting_type   text,
    preferred_date text,
    preferred_time text,
    message        text,
    status         text NOT NULL DEFAULT 'new',      -- new | confirmed | done | not_ready
    confirmed_at   timestamptz,                       -- actual demo time (set when a human confirms)
    reminder_sent  boolean NOT NULL DEFAULT false,    -- used by the 24h reminder cron
    created_at     timestamptz NOT NULL DEFAULT now()
  )
`;

// Added later: optional meeting link for virtual demos (safe to re-run).
await sql`ALTER TABLE bookings ADD COLUMN IF NOT EXISTS meeting_link text`;

const [{ count }] = await sql`SELECT count(*)::int AS count FROM bookings`;
console.log(`✓ 'bookings' table ready (currently ${count} rows)`);
