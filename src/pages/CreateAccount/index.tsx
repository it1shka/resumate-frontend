import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  Typography,
  Skeleton,
} from '@mui/material'
import { memo, useCallback, useMemo, useState } from 'react'
import AuthInformation from './steps/AuthInformation'
import UserInformation from './steps/UserInformation'
import ResumeInformation from './steps/ResumeInformation'
import {
  useAuthState,
  usePersonalState,
  useResumeState,
  useSkillsState,
} from './formState'
import SkillsInformation from './steps/SkillsInformation'
import { useNavigate } from 'react-router-dom'
import mergeTransform from './mergeState'
import {
  NotificationType,
  useNotifications,
} from '../../components/NotificationManager/notificationsState'

type FormSchema = Readonly<
  Array<{
    label: string
    component: React.ReactNode
  }>
>

const formSchema: FormSchema = Object.freeze([
  {
    label: 'Required',
    component: <AuthInformation />,
  },
  {
    label: 'Personal',
    component: <UserInformation />,
  },
  {
    label: 'Resume',
    component: <ResumeInformation />,
  },
  {
    label: 'Skills',
    component: <SkillsInformation />,
  },
])

const CreateAccount = () => {
  const [step, setStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const authState = useAuthState()
  const personalState = usePersonalState()
  const resumeState = useResumeState()
  const skillsState = useSkillsState()

  const handleClear = useCallback(() => {
    authState.clear()
    personalState.clear()
    resumeState.clear()
    skillsState.clear()
  }, [authState, personalState, resumeState, skillsState])

  const isStepValid = useMemo(() => {
    switch (step) {
      case 0:
        return authState.isComplete()
      case 2:
        return resumeState.isComplete()
      default:
        return true
    }
  }, [step, authState, resumeState])

  const handleNextStep = useCallback(() => {
    if (!isStepValid) return
    setStep(prev => Math.min(prev + 1, formSchema.length - 1))
  }, [isStepValid])

  const handlePrevStep = useCallback(() => {
    setStep(prev => Math.max(prev - 1, 0))
  }, [])

  const isLastStep = useMemo(() => step >= formSchema.length - 1, [step])

  const navigate = useNavigate()

  const { pushNotification } = useNotifications()

  const handleSubmit = useCallback(() => {
    if (!isLastStep || !isStepValid) return
    ;(async () => {
      setIsLoading(true)
      try {
        const mergedState = mergeTransform({
          auth: authState,
          personal: personalState,
          resume: resumeState,
          skills: skillsState,
        })
        const body = JSON.stringify(mergedState)
        const response = await fetch(
          'http://localhost:8080/api/auth/register',
          {
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
            body,
          },
        )
        if (!response.ok) {
          const error = await response.json()
          const message = error.message ?? 'Failed to create account'
          throw new Error(message)
        }
        handleClear()
        navigate('/auth/login')
        pushNotification({
          message: 'Success! Now, try to login:',
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
    })()
  }, [
    navigate,
    handleClear,
    isLastStep,
    isStepValid,
    authState,
    personalState,
    resumeState,
    skillsState,
    pushNotification,
  ])

  const handleLogin = useCallback(() => {
    navigate('/auth/login')
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
          Create Account
        </Typography>
        <Stepper activeStep={step}>
          {formSchema.map(({ label }, index) => (
            <Step key={`${label}:${index}`}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {isLoading ? (
          <Skeleton
            variant="rectangular"
            width="100%"
            height={200}
            sx={{ my: 2 }}
          />
        ) : (
          formSchema[step].component
        )}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mt: 2,
            width: '100%',
          }}
        >
          {isLoading ? (
            <>
              <Skeleton variant="rectangular" width={85} height={36} />
              <Skeleton variant="rectangular" width={85} height={36} />
            </>
          ) : (
            <>
              <Button
                variant="outlined"
                color="primary"
                onClick={handlePrevStep}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={isLastStep ? handleSubmit : handleNextStep}
                disabled={!isStepValid}
              >
                {isLastStep ? "Let's go!" : 'Next'}
              </Button>
            </>
          )}
        </Box>
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="body2">
            Already have an account?{' '}
            {isLoading ? (
              <Skeleton
                variant="text"
                width={50}
                sx={{ display: 'inline-block' }}
              />
            ) : (
              <Button
                variant="text"
                color="primary"
                onClick={handleLogin}
                sx={{ textTransform: 'none' }}
              >
                Log in
              </Button>
            )}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default memo(CreateAccount)
