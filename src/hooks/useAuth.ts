import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useAuthStore } from '../store/auth'

export function useAuth() {
  const { data: session, status } = useSession()
  const { user, isLoading, setUser, setLoading } = useAuthStore()

  useEffect(() => {
    if (status === 'loading') {
      setLoading(true)
    } else {
      setLoading(false)
      setUser(session?.user as any || null)
    }
  }, [session, status, setUser, setLoading])

  return {
    user,
    isLoading: status === 'loading' || isLoading,
    isAuthenticated: !!session,
    session,
  }
}