import { Autocomplete, TextField } from '@mui/material'
import { memo, useCallback, ChangeEvent } from 'react'
import { education, experience, locations } from '../../configuration'
import { useResumeState } from '../formState'

const ResumeInformation = () => {
  const resumeState = useResumeState()

  const handlePhoneChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      resumeState.setPhone(event.target.value)
    },
    [resumeState],
  )

  const handleEmailChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      resumeState.setEmail(event.target.value)
    },
    [resumeState],
  )

  const handleLocationChange = useCallback(
    (_: any, newValue: string | null) => {
      resumeState.setLocation(newValue ?? undefined)
    },
    [resumeState],
  )

  const handleExperienceChange = useCallback(
    (_: any, newValue: string | null) => {
      resumeState.setExperience(newValue ?? undefined)
    },
    [resumeState],
  )

  const handleEducationChange = useCallback(
    (_: any, newValue: string | null) => {
      resumeState.setEducation(newValue ?? undefined)
    },
    [resumeState],
  )

  return (
    <>
      <TextField
        label="Phone Number"
        fullWidth
        margin="normal"
        value={resumeState.phone ?? ''}
        onChange={handlePhoneChange}
      />
      <TextField
        label="Email Address"
        fullWidth
        margin="normal"
        value={resumeState.email ?? ''}
        onChange={handleEmailChange}
      />
      <Autocomplete
        options={locations}
        renderInput={params => (
          <TextField {...params} label="Location" fullWidth margin="normal" />
        )}
        fullWidth
        freeSolo
        value={resumeState.location ?? null}
        onChange={handleLocationChange}
      />
      <Autocomplete
        options={experience}
        renderInput={params => (
          <TextField {...params} label="Experience" fullWidth margin="normal" />
        )}
        fullWidth
        freeSolo
        value={resumeState.experience ?? null}
        onChange={handleExperienceChange}
      />
      <Autocomplete
        options={education}
        renderInput={params => (
          <TextField {...params} label="Education" fullWidth margin="normal" />
        )}
        fullWidth
        freeSolo
        value={resumeState.education ?? null}
        onChange={handleEducationChange}
      />
    </>
  )
}

export default memo(ResumeInformation)
