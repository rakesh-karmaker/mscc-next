"use server"

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "./lib/session";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Only handle API routes
  if (path.startsWith("/api/")) {
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

  // Check the auth routes
  if (path.startsWith("/auth/")) {
    const cookie = request.cookies.get("session")?.value;
    const session = await decrypt(cookie);
    if (session?.userId) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }


  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*", "/auth/:path*"],
};
