/**
 * The CNX247 product demo video, in one place.
 *
 * Referenced by the /book-demo lightbox (needs the bare ID to build an embed
 * URL) and by the 24-hour reminder email (needs a plain shareable link).
 * Keep them in sync by changing only the ID.
 */
export const DEMO_VIDEO_ID = "4Fmw7odzLnw";

/** Shareable link — safe for email, where iframes don't work. */
export const DEMO_VIDEO_URL = `https://youtu.be/${DEMO_VIDEO_ID}`;
