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
import { memo, useCallback, useState } from 'react'
import LeftPart from './LeftPart'
import RightPart from './RightPart'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate } from 'react-router-dom'

enum DialogAction {
  Reset = 'reset',
  Logout = 'logout',
}

const Profile = () => {
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
        // Perform reset action here
        break
      case DialogAction.Logout:
        // Perform logout action here
        break
    }
    handleDialogClose()
  }, [dialogState.action, handleDialogClose])

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
        <Button variant="contained">Save</Button>
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
