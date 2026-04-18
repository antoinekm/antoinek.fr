import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const accept = request.headers.get("accept") || "";

  if (!accept.includes("text/markdown")) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;
  const slug = pathname === "/" ? "index" : pathname.slice(1);

  const url = request.nextUrl.clone();
  url.pathname = `/api/md/${slug}`;

  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!api|_next|static|.*\\..*).*)"],
};
