import { ChangeEvent, memo, useCallback } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import { useLoginState } from './loginState'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const loginState = useLoginState()

  type InputChange = ChangeEvent<HTMLInputElement>

  const handleUsername = useCallback(
    (event: InputChange) => {
      const { value } = event.target
      loginState.setUsername(value)
    },
    [loginState],
  )

  const handlePassword = useCallback(
    (event: InputChange) => {
      const { value } = event.target
      loginState.setPassword(value)
    },
    [loginState],
  )

  const handleLogin = () => {
    // TODO: Implement login logic
  }

  const navigate = useNavigate()

  const handleSignUp = useCallback(() => {
    navigate('/auth/create-account')
  }, [navigate])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Box
        component="form"
        sx={{
          width: '100%',
          maxWidth: 460,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h3" sx={{ mb: 2 }}>
          Login
        </Typography>

        <TextField
          value={loginState.username}
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
          value={loginState.password}
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

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            mt: 2,
          }}
        >
          <Button variant="contained" color="primary" onClick={handleLogin}>
            Login
          </Button>
        </Box>
      </Box>
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Typography variant="body2">
          Don't have an account?{' '}
          <Button
            variant="text"
            color="primary"
            onClick={handleSignUp}
            sx={{ textTransform: 'none' }}
          >
            Sign up
          </Button>
        </Typography>
      </Box>
    </Box>
  )
}

export default memo(Login)
