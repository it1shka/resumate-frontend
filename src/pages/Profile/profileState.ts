import { create } from 'zustand'

export type ProfileStateFields = {
  username: string
  password: string
  firstName: string
  lastName: string
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
  setAll: (data: unknown) => void
}

const useProfileState = create<ProfileStateFields & ProfileStateMethods>()(
  set => ({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
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
    setAll: data => {
      if (typeof data === 'object' && data !== null) {
        const newState: Partial<ProfileStateFields> = {
          username: (data as any).username || '',
          firstName: (data as any).firstname || '',
          lastName: (data as any).lastname || '',
          description: (data as any).information || undefined,
          role: (data as any).specialization || undefined,
          phone: (data as any).phone || undefined,
          email: (data as any).email || undefined,
          experience: (data as any).experience || undefined,
          education: (data as any).education || undefined,
        }

        if ((data as any).skills) {
          const skills = (data as any).skills.split(';')
          newState.softSkills = skills.filter((skill: string) =>
            ['Adaptability'].includes(skill),
          )
          newState.hardSkills = skills.filter(
            (skill: string) => !['Adaptability'].includes(skill),
          )
        }

        set(newState)
      }
    },
  }),
)

export default useProfileState
