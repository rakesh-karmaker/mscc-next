import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Only handle API routes
  if (request.nextUrl.pathname.startsWith("/api/")) {
    const token = request.headers.get("x-internal-token");

    // Strict validation
    if (!token || token !== process.env.INTERNAL_TOKEN) {
      const agent = request.headers.get("user-agent") || request;
      console.log("Blocked: Invalid or missing token:", agent);
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
