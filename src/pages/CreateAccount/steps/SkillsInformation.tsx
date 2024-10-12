import { ChangeEvent, memo, useCallback } from 'react'
import { TextField } from '@mui/material'
import { useSkillsState } from '../formState'

const SkillsInformation = () => {
  const skillsState = useSkillsState()

  const handleSoftSkillChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      skillsState.setSoftSkill(event.target.value)
    },
    [skillsState],
  )

  const handleHardSkillChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      skillsState.setHardSkill(event.target.value)
    },
    [skillsState],
  )

  return (
    <>
      <TextField
        label="Soft skills"
        value={skillsState.soft ?? ''}
        onChange={handleSoftSkillChange}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
      <TextField
        label="Hard skills"
        value={skillsState.hard ?? ''}
        onChange={handleHardSkillChange}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
    </>
  )
}

export default memo(SkillsInformation)
