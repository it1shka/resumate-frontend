import { Box, Button, Typography } from '@mui/material'
import { memo } from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 1,
        height: '100vh',
      }}
    >
      <Typography
        variant="h2"
        sx={{ textAlign: 'center', animation: 'fadeIn 0.5s ease-in-out' }}
      >
        <Typography
          variant="h2"
          component="span"
          sx={{ color: 'primary.main' }}
        >
          404:
        </Typography>{' '}
        Not Found
      </Typography>

      <Typography
        variant="h4"
        sx={{
          textAlign: 'center',
          animation: 'fadeIn 0.5s ease-in-out 0.3s',
          animationFillMode: 'forwards',
          opacity: 0,
        }}
      >
        Page you requested does not exist 😢
      </Typography>

      <Button
        variant="contained"
        onClick={() => navigate('/')}
        sx={{
          animation: 'fadeIn 0.5s ease-in-out 0.6s',
          animationFillMode: 'forwards',
          opacity: 0,
          mt: 3,
        }}
      >
        Jump back
      </Button>
    </Box>
  )
}

export default memo(NotFound)
