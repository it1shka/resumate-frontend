import { Box, Button, Divider, Typography } from '@mui/material'
import RegistrationImage from '../../assets/registration.png'
import JobSearch from '../../assets/job_search.png'
import { useNavigate } from 'react-router-dom'
import { useCallback } from 'react'
import Logo from '../../assets/logo.svg'

const photos = [
  {
    src: RegistrationImage,
    header: 'Step 1: Create Your Account',
    text: 'Begin your journey by providing your credentials. This simple step allows us to personalize your experience and securely store your information for future use.',
  },
  {
    src: JobSearch,
    header: 'Step 2: Input Your Work History',
    text: 'Share details about your past jobs and experiences. Our advanced AI algorithms will analyze this information to generate a tailored, professional CV that highlights your strengths and achievements.',
  },
  {
    src: RegistrationImage,
    header: 'Step 3: Customize and Download Your CV',
    text: 'Review the AI-generated CV and select from a variety of professionally designed templates. Customize the layout and style to match your preferences, then download your polished, ready-to-use CV.',
  },
]

const AboutUs = () => {
  const navigate = useNavigate()

  const handleGetStarted = useCallback(() => {
    navigate('/')
  }, [navigate])

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Box
        component="img"
        src={Logo}
        alt="ResuMate Logo"
        sx={{
          width: 200,
          height: 200,
          mt: 12,
          animation: 'fadeIn 0.5s ease-in-out',
        }}
      />

      <Typography variant="h3" sx={{ 
        mt: 4,
        animation: 'fadeIn 0.5s ease-in-out',
        animationDelay: '0.3s',
        opacity: 0,
          animationFillMode: 'forwards',
        }}
      >
        Resu
        <Typography
          variant="h3"
          component="span"
          sx={{ color: 'primary.main' }}
        >
          Mate
        </Typography>
      </Typography>

      <Typography variant="h5" sx={{ 
        animation: 'fadeIn 0.5s ease-in-out',
        animationDelay: '0.6s',
        opacity: 0,
        animationFillMode: 'forwards',
      }}>
        Bringing AI to the Polish job market
      </Typography>

      <Button
        variant="outlined"
        color="primary"
        sx={{
          mt: 3,
          mb: 10,
          animation: 'fadeIn 0.5s ease-in-out',
          animationDelay: '0.9s',
          opacity: 0,
          animationFillMode: 'forwards',
        }}
        onClick={handleGetStarted}
      >
        Get Started
      </Button>
      {photos.map((photo, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            flexDirection: index % 2 === 0 ? 'row' : 'row-reverse',
            animation: 'fadeIn 0.5s ease-in-out',
            animationDelay: `${1.2 + index * 0.3}s`,
            opacity: 0,
            animationFillMode: 'forwards',
          }}
        >
          <Box sx={{ flex: 1, display: 'flex', p: 4 }}>
            <img style={{ width: '100%' }} src={photo.src} alt={photo.header} />
          </Box>
          <Divider orientation="vertical" flexItem sx={{ margin: '0 30px' }} />
          <Box
            sx={{
              p: 4,
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 1,
            }}
          >
            <Typography
              variant="h4"
              sx={{ textAlign: index % 2 !== 0 ? 'right' : 'left' }}
            >
              {photo.header}
            </Typography>
            <Typography
              variant="h6"
              sx={{ textAlign: index % 2 !== 0 ? 'right' : 'left' }}
            >
              {photo.text}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  )
}

export default AboutUs
