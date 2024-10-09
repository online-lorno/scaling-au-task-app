import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getTokenFromRequest } from "@/lib/utils/token";

// Middleware will only run on Edge Runtime(Vercel),
// this will not work when running in localhost
export function middleware(request: NextRequest) {
  const token = getTokenFromRequest(request);

  const protectedRoutes = ["/"];
  const authRoutes = ["/login", "/register"];

  // If the user is trying to access a protected route without a token
  if (protectedRoutes.includes(request.nextUrl.pathname) && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If the user is authenticated but tries to access the login or register pages
  if (authRoutes.includes(request.nextUrl.pathname) && token) {
    return NextResponse.redirect(new URL("/", request.url)); // Redirect to home page
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/register"],
};
