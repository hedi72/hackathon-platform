import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

export function useAuthRedirect(redirectTo: string = '/dashboard') {
  const router = useRouter()
  const { data: session, status } = useSession()

  const redirectToPage = (page: string) => {
    // Utiliser router.push d'abord pour une navigation côté client plus fluide
    router.push(page)
    
    // Fallback avec window.location.href pour garantir la redirection
    setTimeout(() => {
      if (window.location.pathname !== page) {
        window.location.href = page
      }
    }, 100)
  }

  // Rediriger automatiquement si l'utilisateur est connecté
  useEffect(() => {
    if (status === 'authenticated' && session) {
      redirectToPage(redirectTo)
    }
  }, [status, session, redirectTo])

  return {
    isAuthenticated: status === 'authenticated',
    isLoading: status === 'loading',
    redirectToPage,
    session
  }
}