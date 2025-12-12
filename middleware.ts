import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;  
  const isAuth = !!token;
  const isAuthPage = req.nextUrl.pathname.startsWith('/auth');

  if (isAuthPage && isAuth) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  if (!isAuth && req.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/auth/:path*', '/dashboard/:path*', '/events/:path*']
};
