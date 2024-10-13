import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

export type AuthState = {
  token: string | null
  authenticate: (token: string) => void
  logout: () => void
}

export const useAuthState = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      authenticate: (token: string) => {
        set({ token })
        localStorage.setItem('authToken', token)
      },
      logout: () => {
        set({ token: null })
        localStorage.removeItem('authToken')
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ token: state.token }),
    }
  )
)

export default useAuthState