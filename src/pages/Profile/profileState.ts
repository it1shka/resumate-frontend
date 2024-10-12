import { create } from 'zustand'

export type ProfileStateFields = {
  username: string
  password: string
  role?: string
  description?: string
  phone?: string
  email?: string
  location?: string
  experience?: string
  education?: string
  softSkills: string[]
  hardSkills: string[]
}

type ProfileStateMethods = {
  setField: <K extends keyof ProfileStateFields>(
    field: K,
    value: ProfileStateFields[K],
  ) => void
}

const useProfileState = create<ProfileStateFields & ProfileStateMethods>()(
  set => ({
    username: '',
    password: '',
    role: undefined,
    description: undefined,
    phone: undefined,
    email: undefined,
    location: undefined,
    experience: undefined,
    education: undefined,
    softSkills: [],
    hardSkills: [],

    setField: (field, value) => set({ [field]: value }),
  }),
)

export default useProfileState
