import { NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/auth";

export default auth(async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const token = await auth();
  const isAuth = !!token;

  const unprotectedRoutes = ["/auth/sign-in", "/auth/sign-up", "/"];
  const isApiRoute = request.nextUrl.pathname.startsWith("/api");

  if (!isAuth && !unprotectedRoutes.includes(pathname) && !isApiRoute) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url), 302);
  }

  if (["/auth/sign-in", "/auth/sign-up"].includes(request.nextUrl.pathname)) {
    if (isAuth && token) {
      return NextResponse.redirect(new URL("/dashboard", request.url), 302);
    }
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)", "/api/:path*"],
};

// {
//   callbacks: {
//     async authorized() {
//       await Promise.resolve();
//       return true;
//     },
//   },
// },
//
