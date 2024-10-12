import { create } from 'zustand'

export interface LoginState {
  username: string
  password: string

  setUsername: (newUsername: string) => void
  setPassword: (newPassword: string) => void
}

export const useLoginState = create<LoginState>(set => ({
  username: '',
  password: '',
  setUsername: (newUsername: string) => set({ username: newUsername }),
  setPassword: (newPassword: string) => set({ password: newPassword }),
}))
