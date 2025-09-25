import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const isAuth = !!token
    const isAuthPage = req.nextUrl.pathname.startsWith('/auth')

    if (isAuthPage) {
      if (isAuth) {
        // If user is authenticated and tries to access auth pages, redirect to dashboard
        return NextResponse.redirect(new URL('/dashboard', req.url))
      }
      return null
    }

    if (!isAuth && req.nextUrl.pathname.startsWith('/dashboard')) {
      // If user is not authenticated and tries to access protected pages, redirect to signin
      return NextResponse.redirect(new URL('/auth/signin', req.url))
    }
  },
  {
    callbacks: {
      authorized: () => true, // Let the middleware function handle authorization
    },
  }
)

export const config = {
  matcher: ['/auth/:path*', '/dashboard/:path*', '/events/:path*']
}