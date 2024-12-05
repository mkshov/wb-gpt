// middleware.ts
import { NextRequest, NextResponse } from "next/server";

// Middleware function to check the token in cookies
export function middleware(req: NextRequest) {
  // Get the token from cookies
  const token = req.cookies.get("__wbp_token");

  // If the token is not present, redirect to the login page
  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // If the token is present, allow the request to proceed
  return NextResponse.next();
}

// Specify which routes to apply this middleware to
export const config = {
  matcher: ["/dashboard/:path*"], // Adjust these paths as needed
};
