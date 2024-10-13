import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip,
} from '@mui/material'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import LeftPart from './LeftPart'
import RightPart from './RightPart'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate } from 'react-router-dom'
import useAuthFetch from '../../components/Authentication/useAuthFetch'
import { useAuthState } from '../../components/Authentication/authState'
import useProfileState from './profileState'
import useAuthCallback from '../../components/Authentication/useAuthCallback'
import {
  NotificationType,
  useNotifications,
} from '../../components/NotificationManager/notificationsState'

enum DialogAction {
  Reset = 'reset',
  Logout = 'logout',
}

const Profile = () => {
  const { userId, logout } = useAuthState()

  const { data, pending, error } = useAuthFetch({
    url: `http://localhost:8080/api/user?username=${userId}`,
    method: 'GET',
  })

  const refreshCallback = useAuthCallback({
    url: `http://localhost:8080/api/user?username=${userId}`,
    method: 'GET',
  })

  const profile = useProfileState()

  const body = useMemo(() => {
    return {
      userId: (data as any)?.userId,
      username: profile.username,
      firstname: profile.firstName,
      lastname: profile.lastName,
      information: profile.description,
      specialization: profile.role,
      phone: profile.phone,
      email: profile.email,
      experience: [{ content: profile.experience }],
      education: [{ content: profile.education }],
      skills: [...profile.softSkills, ...profile.hardSkills].map(skill => ({
        content: skill,
      })),
    }
  }, [profile, data])

  const saveCallback = useAuthCallback({
    url: `http://localhost:8080/api/user/${(data as any)?.id}`,
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PUT',
    body,
  })

  const { pushNotification } = useNotifications()

  const handleSave = useCallback(() => {
    saveCallback().then(() => {
      pushNotification({
        message: 'Profile saved',
        notificationType: NotificationType.SUCCESS,
        timeout_ms: 2500,
        title: 'Success',
      })
    })
  }, [saveCallback, pushNotification])

  const { setAll } = useProfileState()

  const handleRefresh = useCallback(() => {
    refreshCallback().then(({ data }) => {
      if (data) setAll(data)
    })
  }, [refreshCallback, setAll])

  useEffect(() => {
    if (error || pending) return
    setAll(data)
  }, [data, error, pending, setAll])

  const [dialogState, setDialogState] = useState<{
    open: boolean
    action: DialogAction | null
    title: string
    content: string
  }>({ open: false, action: null, title: '', content: '' })

  const handleDialogOpen = useCallback(
    (action: DialogAction, title: string, content: string) => {
      setDialogState({ open: true, action, title, content })
    },
    [],
  )

  const handleDialogClose = useCallback(() => {
    setDialogState(prev => ({ ...prev, open: false }))
  }, [])

  const handleDialogConfirm = useCallback(() => {
    switch (dialogState.action) {
      case DialogAction.Reset:
        handleRefresh()
        break
      case DialogAction.Logout:
        logout()
        break
    }
    handleDialogClose()
  }, [dialogState.action, handleDialogClose, logout, handleRefresh])

  const navigate = useNavigate()
  const handleBackToSearch = useCallback(() => {
    navigate('/search')
  }, [navigate])

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        p: 2,
        display: 'flex',
        position: 'relative',
      }}
    >
      <Box sx={{ position: 'absolute', top: '0.5em', left: '0.5em' }}>
        <Tooltip title="Go to the search">
          <IconButton
            color="primary"
            aria-label="back to search"
            onClick={handleBackToSearch}
          >
            <ArrowBackIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <LeftPart />
      <RightPart />
      <Box
        sx={{
          display: 'flex',
          position: 'absolute',
          bottom: '0.5rem',
          right: '0.5rem',
          gap: 1,
        }}
      >
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() =>
            handleDialogOpen(
              DialogAction.Reset,
              'Confirm Reset',
              'Are you sure you want to reset? This will reset your profile to remote data.',
            )
          }
        >
          Reset
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={() =>
            handleDialogOpen(
              DialogAction.Logout,
              'Confirm Logout',
              'Are you sure you want to log out?',
            )
          }
        >
          Logout
        </Button>
      </Box>
      <Dialog
        open={dialogState.open}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{dialogState.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogState.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleDialogConfirm} color="error" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default memo(Profile)
