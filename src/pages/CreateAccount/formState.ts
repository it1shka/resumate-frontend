import { create } from 'zustand'

export type AuthState = {
  username: string
  password: string
  confirmPassword: string

  setUsername: (newUsername: string) => void
  setPassword: (newPassword: string) => void
  setConfirmPassword: (newConfirmPassword: string) => void

  isComplete: () => boolean
  clear: () => void
}

export const useAuthState = create<AuthState>((set, get) => ({
  username: '',
  password: '',
  confirmPassword: '',

  setUsername: (newUsername: string) => {
    set(prev => ({
      ...prev,
      username: newUsername,
    }))
  },
  setPassword: (newPassword: string) => {
    set(prev => ({ ...prev, password: newPassword }))
  },
  setConfirmPassword: (newConfirmPassword: string) => {
    set(prev => ({ ...prev, confirmPassword: newConfirmPassword }))
  },

  isComplete: () => {
    const { username, password, confirmPassword } = get()
    return (
      username.length >= 4 &&
      password === confirmPassword &&
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password)
    )
  },

  clear: () => {
    set({ username: '', password: '', confirmPassword: '' })
  },
}))

export type PersonalState = {
  firstName?: string
  lastName?: string
  role?: string
  description?: string

  setFirstName: (newFirstName?: string) => void
  setLastName: (newLastName?: string) => void
  setRole: (newRole?: string) => void
  setDescription: (newDescription?: string) => void
  clear: () => void
}

export const usePersonalState = create<PersonalState>(set => ({
  firstName: undefined,
  lastName: undefined,
  role: undefined,
  description: undefined,

  setFirstName: (newFirstName?: string) => {
    set(prev => ({ ...prev, firstName: newFirstName }))
  },
  setLastName: (newLastName?: string) => {
    set(prev => ({ ...prev, lastName: newLastName }))
  },
  setRole: (newRole?: string) => {
    set(prev => ({ ...prev, role: newRole }))
  },
  setDescription: (newDescription?: string) => {
    set(prev => ({ ...prev, description: newDescription }))
  },

  clear: () => {
    set({ firstName: undefined, lastName: undefined, role: undefined, description: undefined })
  },
}))

export type ResumeState = {
  phone?: string
  email?: string
  location?: string
  experience?: string
  education?: string

  setPhone: (newPhone?: string) => void
  setEmail: (newEmail?: string) => void
  setLocation: (newLocation?: string) => void
  setExperience: (newExperience?: string) => void
  setEducation: (newEducation?: string) => void

  isComplete: () => boolean
  clear: () => void
}

export const useResumeState = create<ResumeState>((set, get) => ({
  phone: undefined,
  email: undefined,
  location: undefined,
  experience: undefined,
  education: undefined,

  setPhone: (newPhone?: string) => {
    set(prev => ({ ...prev, phone: newPhone }))
  },
  setEmail: (newEmail?: string) => {
    set(prev => ({ ...prev, email: newEmail }))
  },
  setLocation: (newLocation?: string) => {
    set(prev => ({ ...prev, location: newLocation }))
  },
  setExperience: (newExperience?: string) => {
    set(prev => ({ ...prev, experience: newExperience }))
  },
  setEducation: (newEducation?: string) => {
    set(prev => ({ ...prev, education: newEducation }))
  },

  isComplete: () => {
    // TODO: add phone validation
    // const { phone, email } = get()
    const { email } = get()
    return (
      // (!phone || /^(?:\+1)?\s?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/.test(phone)) &&
      !email || /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)
    )
  },

  clear: () => {
    set({ phone: undefined, email: undefined, location: undefined, experience: undefined, education: undefined })
  },
}))

export type SkillsState = {
  soft: string[]
  hard: string[]

  setSoftSkill: (newSoftSkill: string[]) => void
  setHardSkill: (newHardSkill: string[]) => void
  clear: () => void
}

export const useSkillsState = create<SkillsState>(set => ({
  soft: [],
  hard: [],

  setSoftSkill: (newSoftSkill: string[]) => {
    set(prev => ({ ...prev, soft: newSoftSkill }))
  },
  setHardSkill: (newHardSkill: string[]) => {
    set(prev => ({ ...prev, hard: newHardSkill }))
  },

  clear: () => {
    set({ soft: [], hard: [] })
  },
}))
