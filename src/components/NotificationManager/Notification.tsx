import { Box, IconButton } from '@mui/material'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

import { memo } from 'react'
import { NotificationDTO, useNotifications } from './notificationsState'
import DeleteIcon from '@mui/icons-material/Delete'

const Notification = ({ notification }: { notification: NotificationDTO }) => {
  const { removeNotification } = useNotifications()

  function handleDelete(id: number) {
    removeNotification(id)
  }

  return (
    <Box sx={{ minWidth: 400 }} mt={3}>
      <Alert
        sx={{ opacity: 1.0 }}
        severity={notification.config.notificationType}
        action={
          <IconButton
            aria-label="delete"
            color="inherit"
            size="small"
            onClick={() => handleDelete(notification.id)}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        }
      >
        <AlertTitle>{notification.config.title}</AlertTitle>
        {notification.config.message}
      </Alert>
    </Box>
  )
}

export default memo(Notification)
