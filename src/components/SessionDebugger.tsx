'use client'

import { useSession } from 'next-auth/react'
import { useAuth } from '../hooks/useAuth'

export function SessionDebugger() {
  const { data: session, status } = useSession()
  const { user, isAuthenticated, isLoading } = useAuth()

  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-lg text-xs max-w-sm z-50">
      <h3 className="font-bold mb-2">Session Debug</h3>
      <div className="space-y-1">
        <div>Status: <span className="text-green-400">{status}</span></div>
        <div>Is Authenticated: <span className="text-green-400">{isAuthenticated ? 'true' : 'false'}</span></div>
        <div>Is Loading: <span className="text-yellow-400">{isLoading ? 'true' : 'false'}</span></div>
        <div>User Email: <span className="text-blue-400">{session?.user?.email || 'null'}</span></div>
        <div>User ID: <span className="text-blue-400">{session?.user?.id || 'null'}</span></div>
        <div>Token Sub: <span className="text-purple-400">{session?.user?.id || 'null'}</span></div>
      </div>
    </div>
  )
}