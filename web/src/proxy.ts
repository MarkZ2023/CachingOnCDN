import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { COOKIE_STRIP_ROUTE } from "@/lib/cache-routes";

function isSuvsRoute(pathname: string): boolean {
  return (
    pathname === COOKIE_STRIP_ROUTE ||
    pathname.startsWith(`${COOKIE_STRIP_ROUTE}/`)
  );
}

// Strip cookies on /suvs so the CDN can serve one shared HTML response.
export function proxy(request: NextRequest) {
  if (!isSuvsRoute(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const cookieWasSent = request.headers.has("cookie");

  const requestHeaders = new Headers(request.headers);
  requestHeaders.delete("cookie");

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  response.headers.set("x-cookie-stripped", "true");
  response.headers.set("x-cookie-was-sent", cookieWasSent ? "true" : "false");

  return response;
}

export const proxyConfig = {
  matcher: ["/suvs"],
};
