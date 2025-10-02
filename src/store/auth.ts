import { create } from 'zustand'
// Define User interface here or import from the correct module
interface User {
  id: string
  name: string
  email: string
  role?: string
  image?: string
  // Add other fields as needed
}

interface AuthState {
  user: User | null
  isLoading: boolean
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  updateUserImage: (imageUrl: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
  updateUserImage: (imageUrl) => set((state) => ({
    user: state.user ? { ...state.user, image: imageUrl } : state.user
  })),
  logout: () => set({ user: null, isLoading: false }),
}))