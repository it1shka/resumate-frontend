import { Autocomplete, Box, TextField, Typography } from '@mui/material'
import { memo } from 'react'
import useProfileState from './profileState'
import {
  education as educationOptions,
  experience as experienceOptions,
  locations,
} from '../configuration'
import ListInput from '../../components/ListInput'
import BuildIcon from '@mui/icons-material/Build'
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople'

const RightPart = () => {
  const {
    education: profileEducation,
    experience: profileExperience,
    location,
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
        <Autocomplete
          freeSolo
          options={locations}
          value={location}
          renderInput={params => <TextField {...params} label="Location" />}
          sx={{ width: '100%' }}
        />
      </Box>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          width: '100%',
          mt: 2,
          borderTop: '1px solid rgba(0, 0, 0, 0.12)',
        }}
      >
        <Box
          sx={{ flex: 1, borderRight: '1px solid rgba(0, 0, 0, 0.12)', p: 2 }}
        >
          <Typography
            variant="h6"
            sx={{
              textAlign: 'center',
              // border: '1px solid rgba(0, 0, 0, 0.12)',
              mb: 1,
              p: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'primary.light',
              color: 'white',
            }}
          >
            <BuildIcon sx={{ mr: 1 }} /> Hard Skills
          </Typography>
          {/* TODO: Add onChange */}
          <ListInput value={hardSkills} onChange={() => {}} />
        </Box>
        <Box sx={{ flex: 1, p: 2 }}>
          <Typography
            variant="h6"
            sx={{
              textAlign: 'center',
              // border: '1px solid rgba(0, 0, 0, 0.12)',
              mb: 1,
              p: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'primary.light',
              color: 'white',
            }}
          >
            <EmojiPeopleIcon sx={{ mr: 1 }} /> Soft Skills
          </Typography>
          {/* TODO: Add onChange */}
          <ListInput value={softSkills} onChange={() => {}} />
        </Box>
      </Box>
    </Box>
  )
}

export default memo(RightPart)
