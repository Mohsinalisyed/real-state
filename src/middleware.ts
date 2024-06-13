// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define public paths that do not require authentication
  const isPublicPath = ["/login", "/signup", "/verifyemail"].includes(path);

  const token = request.cookies.get("token")?.value || "";

  // If the user is authenticated and tries to access public paths, redirect to the home page
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  // If the user is not authenticated and tries to access protected paths, redirect to the login page
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  // If neither condition matches, continue to the next middleware or route handler
  return NextResponse.next();
}

// Config to specify which paths this middleware applies to
export const config = {
  matcher: ["/", "/profile", "/login", "/signup", "/verifyemail"],
};
