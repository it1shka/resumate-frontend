import { TextField } from '@mui/material'
import { ChangeEvent, memo, useCallback } from 'react'
import { useAuthState } from '../formState'

const AuthInformation = () => {
  const authState = useAuthState()

  type InputChange = ChangeEvent<HTMLInputElement>

  const handleUsername = useCallback(
    (event: InputChange) => {
      const { value } = event.target
      authState.setUsername(value)
    },
    [authState],
  )

  const handlePassword = useCallback(
    (event: InputChange) => {
      const { value } = event.target
      authState.setPassword(value)
    },
    [authState],
  )

  const handleConfirmPassword = useCallback(
    (event: InputChange) => {
      const { value } = event.target
      authState.setConfirmPassword(value)
    },
    [authState],
  )

  return (
    <>
      <TextField
        value={authState.username}
        onChange={handleUsername}
        margin="normal"
        required
        fullWidth
        id="username"
        label="Username"
        name="username"
        autoComplete="username"
        autoFocus
      />
      <TextField
        value={authState.password}
        onChange={handlePassword}
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="new-password"
      />
      <TextField
        value={authState.confirmPassword}
        onChange={handleConfirmPassword}
        margin="normal"
        required
        fullWidth
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        id="confirmPassword"
        autoComplete="new-password"
      />
    </>
  )
}

export default memo(AuthInformation)
