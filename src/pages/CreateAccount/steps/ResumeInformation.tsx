import { Autocomplete, TextField } from '@mui/material'
import { memo, useCallback, ChangeEvent } from 'react'
import { education, experience } from '../configuration'
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
    (event: ChangeEvent<HTMLInputElement>) => {
      resumeState.setLocation(event.target.value)
    },
    [resumeState],
  )

  const handleExperienceChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      resumeState.setExperience(event.target.value)
    },
    [resumeState],
  )

  const handleEducationChange = useCallback(
    (_: any, newValue: string | null) => {
      resumeState.setEducation(newValue || undefined)
    },
    [resumeState],
  )

  return (
    <>
      <TextField
        label="Phone Number"
        fullWidth
        margin="normal"
        value={resumeState.phone || ''}
        onChange={handlePhoneChange}
      />
      <TextField
        label="Email Address"
        fullWidth
        margin="normal"
        value={resumeState.email || ''}
        onChange={handleEmailChange}
      />
      <TextField
        label="Location"
        fullWidth
        margin="normal"
        value={resumeState.location || ''}
        onChange={handleLocationChange}
      />
      <Autocomplete
        options={experience}
        renderInput={(params) => (
          <TextField {...params} label="Experience" fullWidth margin="normal" />
        )}
        fullWidth
        freeSolo
        value={resumeState.experience || null}
        onChange={(_, newValue) => resumeState.setExperience(newValue || undefined)}
      />
      <Autocomplete
        options={education}
        renderInput={params => (
          <TextField {...params} label="Education" fullWidth margin="normal" />
        )}
        fullWidth
        freeSolo
        value={resumeState.education || null}
        onChange={handleEducationChange}
      />
    </>
  )
}

export default memo(ResumeInformation)
