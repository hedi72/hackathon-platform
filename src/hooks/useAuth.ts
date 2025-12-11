// import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useAuthStore } from '../store/auth'

export function useAuth() {
  // const { data: session, status } = useSession()
  const { user, isLoading, setUser, setLoading, updateUserImage } = useAuthStore()

  useEffect(() => {
    if (status === 'loading') {
      setLoading(true)
    } else {
      setLoading(false)
      // setUser(session?.user as any || null)
    }
  }, [ status, setUser, setLoading])

  return {
    user,
    isLoading: status === 'loading' || isLoading,
     isAuthenticated: false,
    // session,
    updateUserImage,
  }
}