import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET 
  })
  
  const isAuth = !!token
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth')
  const isDashboard = request.nextUrl.pathname.startsWith('/dashboard')
  
  console.log('🔧 Simple Middleware:', { 
    path: request.nextUrl.pathname, 
    isAuth, 
    hasToken: !!token,
    tokenSub: token?.sub,
    tokenEmail: token?.email
  })

  // Si utilisateur connecté essaie d'accéder aux pages d'auth, rediriger vers dashboard
  if (isAuthPage && isAuth) {
    console.log('🔄 Redirecting authenticated user from auth page to dashboard')
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Si utilisateur non connecté essaie d'accéder au dashboard, rediriger vers signin
  if (isDashboard && !isAuth) {
    console.log('🔒 Redirecting unauthenticated user to signin')
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }

  if (isDashboard && isAuth) {
    console.log('✅ Allowing authenticated access to dashboard')
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/auth/:path*',
    '/dashboard/:path*',
    '/events/:path*'
  ]
}