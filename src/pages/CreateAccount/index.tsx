import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material'
import { memo, useCallback, useMemo, useState } from 'react'
import AuthInformation from './steps/AuthInformation'
import UserInformation from './steps/UserInformation'
import ResumeInformation from './steps/ResumeInformation'
import { useAuthState, useResumeState } from './formState'

type FormSchema = Readonly<
  Array<{
    label: string
    component: React.ReactNode
  }>
>

const formSchema: FormSchema = Object.freeze([
  {
    label: 'Required Information',
    component: <AuthInformation />,
  },
  {
    label: 'Personal Profile',
    component: <UserInformation />,
  },
  {
    label: 'Resume Information',
    component: <ResumeInformation />,
  },
])

const CreateAccount = () => {
  const [step, setStep] = useState(0)

  const authState = useAuthState()
  const resumeState = useResumeState()

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

  const handleSubmit = useCallback(() => {
    if (!isLastStep || !isStepValid) return
    // TODO: submit form
  }, [isLastStep, isStepValid])

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
        {formSchema[step].component}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mt: 2,
            width: '100%',
          }}
        >
          <Button variant="outlined" color="primary" onClick={handlePrevStep}>
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
        </Box>
      </Box>
    </Box>
  )
}

export default memo(CreateAccount)
