import { Box, IconButton } from "@mui/material"
import { memo, useCallback, useState } from "react"
import Tooltip from '@mui/material/Tooltip'
import useSearchState from "./searchState"
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

const WebPreview = () => {

  const [isOpen, setIsOpen] = useState(false)

  const handleTogglePreview = useCallback(() => {
    setIsOpen(prev => !prev)
  }, [])

  const { search } = useSearchState()

  return (
    <Box sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      bottom: 0,
      width: isOpen ? 400 : 0,
      bgcolor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1000,
      transition: 'width 0.3s ease-in-out',
    }}>
      <Box
        sx={{
          position: 'absolute',
          right: -48,
          top: 16,
          zIndex: 1001,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          transition: 'right 0.3s ease-in-out',
        }}
      >
        <Tooltip
          title={isOpen ? 'Close web preview' : 'Open web preview'}
        >
          <IconButton
            aria-label={isOpen ? 'close sidebar' : 'open sidebar'}
            onClick={handleTogglePreview}
            sx={{
              backgroundColor: 'background.paper',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
              boxShadow: 1,
            }}
          >
            {isOpen ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </IconButton>
        </Tooltip>
      </Box>

      <iframe
        src={search}
        title="Web Preview"
        width="100%"
        height="100%"
      />
    </Box>
  )

}

export default memo(WebPreview)