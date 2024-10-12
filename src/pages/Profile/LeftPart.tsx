import { Autocomplete, Avatar, Box, TextField } from '@mui/material'
import { memo } from 'react'
import useProfileState from './profileState'
import PersonIcon from '@mui/icons-material/Person'
import { roles } from '../configuration'

const LeftPart = () => {
  const { username, role, phone, email, description } = useProfileState()

  return (
    <Box
      sx={{
        flex: 1,
        borderRight: '1px solid rgba(0, 0, 0, 0.12)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{ minWidth: 460, display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Avatar sx={{ width: 150, height: 150 }}>
            <PersonIcon sx={{ fontSize: 100 }} />
          </Avatar>
        </Box>
        <TextField label="Username" value={username} />
        <Autocomplete
          freeSolo
          options={roles}
          value={role}
          renderInput={params => <TextField {...params} label="Role" />}
        />
        <TextField label="Phone" value={phone} />
        <TextField label="Email" value={email} />
        <TextField label="Description" value={description} multiline rows={4} />
      </Box>
    </Box>
  )
}

export default memo(LeftPart)
