import { ChangeEvent, memo, useCallback, useState } from 'react'
import { Box, Button, TextField, Typography, Skeleton } from '@mui/material'
import { useLoginState } from './loginState'
import { useNavigate } from 'react-router-dom'
import { NotificationType, useNotifications } from '../../components/NotificationManager/notificationsState'
import useAuthState from '../../components/Authentication/authState'

const Login = () => {
  const loginState = useLoginState()
  const [isLoading, setIsLoading] = useState(false)

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

  const { authenticate } = useAuthState()
  const { pushNotification } = useNotifications()
  const navigate = useNavigate()

  const handleLogin = useCallback(async () => {
    setIsLoading(true)
    try {
      const body = JSON.stringify({
        username: loginState.username,
        password: loginState.password,
      });
      const response = await fetch('http://localhost:8080/api/auth/login', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body,
      })
      if (!response.ok) {
        const error = await response.json()
        const message = error.message ?? 'Failed to login'
        throw new Error(message)
      }
      const { token } = await response.json()
      authenticate(token, loginState.username)
      navigate('/search')
      pushNotification({
        message: 'Ready to rock!',
        notificationType: NotificationType.SUCCESS,
        timeout_ms: 2500,
        title: 'Success',
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error'
      pushNotification({
        message,
        notificationType: NotificationType.ERROR,
        timeout_ms: 2500,
        title: 'Error',
      })
    } finally {
      setIsLoading(false)
    }
  }, [loginState, pushNotification, navigate, authenticate])

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

        {isLoading ? (
          <>
            <Skeleton variant="rectangular" width="100%" height={56} sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" width="100%" height={56} sx={{ mb: 2 }} />
          </>
        ) : (
          <>
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
          </>
        )}

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            mt: 2,
          }}
        >
          {isLoading ? (
            <Skeleton variant="rectangular" width={85} height={36} />
          ) : (
            <Button variant="contained" color="primary" onClick={handleLogin}>
              Login
            </Button>
          )}
        </Box>
      </Box>
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Typography variant="body2">
          Don't have an account?{' '}
          {isLoading ? (
            <Skeleton variant="text" width={50} sx={{ display: 'inline-block' }} />
          ) : (
            <Button
              variant="text"
              color="primary"
              onClick={handleSignUp}
              sx={{ textTransform: 'none' }}
            >
              Sign up
            </Button>
          )}
        </Typography>
      </Box>
    </Box>
  )
}

export default memo(Login)
