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

  const requestHeaders = new Headers(request.headers);
  requestHeaders.delete("cookie");

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const proxyConfig = {
  matcher: ["/suvs"],
};
