import { AuthState, PersonalState, ResumeState, SkillsState } from './formState'

type FormStates = {
  auth: AuthState
  personal: PersonalState
  resume: ResumeState
  skills: SkillsState
}

const mergeTransform = ({ auth, personal, resume, skills }: FormStates) => {
  const { username, password } = auth
  const { firstName, lastName, role, description } = personal
  const { phone, email, education, experience } = resume
  const { soft, hard } = skills

  return Object.freeze({
    username,
    password,
    firstname: firstName ?? '',
    lastname: lastName ?? '',
    specialization: role ?? '',
    information: description ?? '',
    phone: phone ?? '',
    email: email ?? '',
    skills: [...soft, ...hard].map(skill => ({ content: skill })),
    education: education ? [{ content: education }] : [],
    experience: experience ? [{ content: experience }] : [],
  })
}

export default mergeTransform
