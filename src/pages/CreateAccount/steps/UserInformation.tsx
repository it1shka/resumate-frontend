import { Autocomplete, TextField } from '@mui/material'
import { ChangeEvent, memo, SyntheticEvent, useCallback } from 'react'
import { usePersonalState } from '../formState'
import { roles } from '../configuration'

const UserInformation = () => {
  const personalState = usePersonalState()

  const handleRoleChange = useCallback(
    (_: SyntheticEvent, newValue: string | null) => {
      personalState.setRole(newValue ?? undefined)
    },
    [personalState],
  )

  type DescriptionChange = ChangeEvent<HTMLInputElement>
  const handleDescriptionChange = useCallback(
    (event: DescriptionChange) => {
      const { value } = event.target
      personalState.setDescription(value)
    },
    [personalState],
  )

  return (
    <>
      <Autocomplete
        value={personalState.role ?? ''}
        options={roles}
        renderInput={params => (
          <TextField {...params} label="Role" fullWidth margin="normal" />
        )}
        fullWidth
        freeSolo
        onChange={handleRoleChange}
      />
      <TextField
        value={personalState.description ?? ''}
        label="Description"
        fullWidth
        multiline
        rows={4}
        margin="normal"
        onChange={handleDescriptionChange}
      />
    </>
  )
}

export default memo(UserInformation)
