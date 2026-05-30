import { NextResponse, type NextRequest } from "next/server";

const SESSION_COOKIE = "portfolio_session";
const DEDUPE_COOKIE_PREFIX = "pv_";

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const response = NextResponse.next();
  let sessionId = request.cookies.get(SESSION_COOKIE)?.value;

  if (!sessionId) {
    sessionId = crypto.randomUUID();
    response.cookies.set(SESSION_COOKIE, sessionId, {
      maxAge: 60 * 60 * 24 * 30,
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });
  }

  const dedupeKey = `${DEDUPE_COOKIE_PREFIX}${pathname.replace(/\//g, "_")}`;
  const recentlyViewed = request.cookies.get(dedupeKey)?.value;

  if (!recentlyViewed) {
    response.cookies.set(dedupeKey, "1", {
      maxAge: 60 * 30,
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });

    const origin = request.nextUrl.origin;
    void fetch(`${origin}/api/visitor`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId,
        pathname,
        referrer: request.headers.get("referer"),
        country: request.headers.get("x-vercel-ip-country"),
      }),
    }).catch(() => undefined);
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|cv|diagrams).*)"],
};
