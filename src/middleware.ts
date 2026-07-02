import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "fallback-secret-change-in-production-32chars!!"
);

const COOKIE_NAME = "cms-auth-token";

const PROTECTED_PATHS = ["/admin"];
const PROTECTED_API_PATHS = ["/api/admin"];
const LOGIN_PATH = "/admin/login";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect API admin routes
  if (PROTECTED_API_PATHS.some((p) => pathname.startsWith(p))) {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (!token) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    try {
      await jwtVerify(token, JWT_SECRET);
      return NextResponse.next();
    } catch {
      return NextResponse.json({ success: false, error: "Invalid or expired session" }, { status: 401 });
    }
  }

  // Protect admin routes (except login)
  if (PROTECTED_PATHS.some((p) => pathname.startsWith(p))) {
    if (pathname === LOGIN_PATH) {
      // If already logged in, redirect to admin home
      const token = request.cookies.get(COOKIE_NAME)?.value;
      if (token) {
        try {
          await jwtVerify(token, JWT_SECRET);
          return NextResponse.redirect(new URL("/admin", request.url));
        } catch {
          // Token invalid — let through to login
        }
      }
      return NextResponse.next();
    }

    // All other /admin/* routes require auth
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (!token) {
      return NextResponse.redirect(new URL(LOGIN_PATH, request.url));
    }
    try {
      await jwtVerify(token, JWT_SECRET);
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL(LOGIN_PATH, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
