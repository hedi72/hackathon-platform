'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface AuthRedirectProps {
  children: React.ReactNode
  redirectTo?: string
  requireAuth?: boolean
}

export function AuthRedirect({ 
  children, 
  redirectTo = '/dashboard', 
  requireAuth = false 
}: AuthRedirectProps) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    // Rediriger les utilisateurs connectés vers le dashboard depuis les pages d'auth
    if (status === 'authenticated' && !requireAuth) {
      router.push(redirectTo)
      // Fallback pour garantir la redirection
      setTimeout(() => {
        if (window.location.pathname !== redirectTo) {
          window.location.href = redirectTo
        }
      }, 100)
    }
    
    // Rediriger les utilisateurs non connectés vers signin depuis les pages protégées
    if (status === 'unauthenticated' && requireAuth) {
      router.push('/auth/signin')
      setTimeout(() => {
        if (window.location.pathname !== '/auth/signin') {
          window.location.href = '/auth/signin'
        }
      }, 100)
    }
  }, [status, router, redirectTo, requireAuth])

  // Afficher un loader pendant la vérification de session
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  // Ne pas afficher le contenu si une redirection doit avoir lieu
  if (
    (status === 'authenticated' && !requireAuth) ||
    (status === 'unauthenticated' && requireAuth)
  ) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return <>{children}</>
}