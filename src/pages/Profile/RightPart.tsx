import { Autocomplete, Box, TextField, Typography } from '@mui/material'
import { memo } from 'react'
import useProfileState from './profileState'
import {
  education as educationOptions,
  experience as experienceOptions,
} from '../configuration'
import ListInput from '../../components/ListInput'

const RightPart = () => {
  const {
    education: profileEducation,
    experience: profileExperience,
    hardSkills,
    softSkills,
  } = useProfileState()

  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          minWidth: 460,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          mt: 2,
        }}
      >
        <Autocomplete
          freeSolo
          options={educationOptions}
          value={profileEducation}
          renderInput={params => <TextField {...params} label="Education" />}
          sx={{ width: '100%' }}
        />
        <Autocomplete
          freeSolo
          options={experienceOptions}
          value={profileExperience}
          renderInput={params => <TextField {...params} label="Experience" />}
          sx={{ width: '100%' }}
        />
      </Box>
      <Box sx={{ flex: 1, display: 'flex', width: '100%', mt: 2 }}>
        <Box sx={{ flex: 1, borderRight: '1px solid rgba(0, 0, 0, 0.12)', p: 2 }}>
          <Typography variant="h6" sx={{ textAlign: 'center' }}>
            Hard Skills
          </Typography>
          {/* TODO: Add onChange */}
          <ListInput value={hardSkills} onChange={() => {}} />
        </Box>
        <Box sx={{ flex: 1, p: 2 }}>
          <Typography variant="h6" sx={{ textAlign: 'center' }}>
            Soft Skills
          </Typography>
          {/* TODO: Add onChange */}
          <ListInput value={softSkills} onChange={() => {}} />
        </Box>
      </Box>
    </Box>
  )
}

export default memo(RightPart)
