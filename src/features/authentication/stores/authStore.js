import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      error: null,

      // Setters
      setUser: (user) => set({ user, error: null }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      clearAuth: () => set({ user: null, error: null }),

      // Getters computados
      isAuthenticated: () => !!get().user,
    }),
    {
      name: 'auth-storage', // LocalStorage key
      partialize: (state) => ({ user: state.user }) // Persist solo el usuario
    }
  )
)
