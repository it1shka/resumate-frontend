import { Box, Button, Typography } from '@mui/material'
import { memo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

const Main = () => {
  const navigate = useNavigate()

  const handleCreateAccount = useCallback(() => {
    navigate('/auth/create-account')
  }, [navigate])

  const handleStartForFree = useCallback(() => {
    navigate('/auth/login')
  }, [navigate])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Typography variant="h1">
        <Box
          component="span"
          sx={{
            display: 'inline-block',
            animation: 'fadeIn 0.5s ease-in-out',
          }}
        >
          Resu
          <Box component="span" sx={{ color: 'primary.main' }}>
            Mate
          </Box>
        </Box>
      </Typography>
      <Typography
        variant="h5"
        sx={{
          textAlign: 'center',
          color: 'text.secondary',
          animation: 'fadeIn 0.5s ease-in-out 0.3s',
          opacity: 0,
          animationFillMode: 'forwards',
        }}
      >
        Your AI-powered companion for crafting the perfect resume
      </Typography>
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button
          onClick={handleStartForFree}
          variant="outlined"
          color="primary"
          sx={{
            animation: 'fadeIn 0.5s ease-in-out 0.6s',
            opacity: 0,
            animationFillMode: 'forwards',
            minWidth: '191px',
          }}
        >
          Login
        </Button>
        <Button
          onClick={handleCreateAccount}
          variant="contained"
          color="primary"
          sx={{
            animation: 'fadeIn 0.5s ease-in-out 0.9s',
            opacity: 0,
            animationFillMode: 'forwards',
          }}
        >
          Create an account
        </Button>
      </Box>
    </Box>
  )
}

export default memo(Main)
