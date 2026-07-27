import { NextRequest, NextResponse } from "next/server";

/**
 * Protects the /admin dashboard with HTTP Basic Auth.
 * Credentials come from ADMIN_USER / ADMIN_PASSWORD env vars.
 * Fails closed: if no password is configured, access is blocked.
 */
export const config = { matcher: ["/admin", "/admin/:path*"] };

export function middleware(req: NextRequest) {
  const expectedUser = process.env.ADMIN_USER || "admin";
  const expectedPass = process.env.ADMIN_PASSWORD;

  if (!expectedPass) {
    return new NextResponse("Admin access is not configured.", { status: 503 });
  }

  const header = req.headers.get("authorization");
  if (header?.startsWith("Basic ")) {
    try {
      const decoded = atob(header.slice(6));
      const sep = decoded.indexOf(":");
      const user = decoded.slice(0, sep);
      const pass = decoded.slice(sep + 1);
      if (user === expectedUser && pass === expectedPass) {
        return NextResponse.next();
      }
    } catch {
      // malformed header — fall through to challenge
    }
  }

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="CNX247 Admin"' },
  });
}
