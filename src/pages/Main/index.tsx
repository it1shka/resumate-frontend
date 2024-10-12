import { Box, Button, Tooltip, Typography } from '@mui/material'
import { memo } from 'react'

const Main = () => {
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
        <Tooltip title="Access basic features without registration">
          <Button
            variant="outlined"
            color="primary"
            sx={{
              animation: 'fadeIn 0.5s ease-in-out 0.6s',
              opacity: 0,
              animationFillMode: 'forwards',
            }}
          >
            Start for free
          </Button>
        </Tooltip>
        <Tooltip title="Access the full power of our product">
          <Button
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
        </Tooltip>
      </Box>
    </Box>
  )
}

export default memo(Main)
