import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export type AuthState = {
  token: string | null
  userId: string | null
  authenticate: (token: string, userId: string) => void
  logout: () => void
}

export const useAuthState = create<AuthState>()(
  persist(
    set => ({
      token: null,
      userId: null,
      authenticate: (token: string, userId: string) => {
        set({ token, userId })
        localStorage.setItem('authToken', token)
      },
      logout: () => {
        set({ token: null, userId: null })
        localStorage.removeItem('authToken')
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({ token: state.token, userId: state.userId }),
    },
  ),
)

export default useAuthState
