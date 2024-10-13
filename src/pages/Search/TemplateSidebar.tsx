import {
  Box,
  Icon,
  IconButton,
  List,
  ListItemButton,
  Tooltip,
  Typography,
} from '@mui/material'
import { memo, useCallback, useState } from 'react'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import useSearchState from './searchState'
import DescriptionIcon from '@mui/icons-material/Description'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import WorkIcon from '@mui/icons-material/Work'
import { useNavigate } from 'react-router-dom'

type Templates = Readonly<
  Array<{
    id: string
    name: string
    icon: string
  }>
>

const templates: Templates = Object.freeze([
  {
    id: 'RESUME1',
    name: 'Standard Template',
    icon: 'standard',
  },
  {
    id: 'RESUME2',
    name: 'Advanced Template',
    icon: 'advanced',
  },
  {
    id: 'RESUME3',
    name: 'Professional Template',
    icon: 'professional',
  },
  {
    id: 'RESUME4',
    name: 'Creative Template',
    icon: 'advanced',
  },
])

const iconMapping: Record<string, React.ElementType> = {
  standard: DescriptionIcon,
  advanced: AutoAwesomeIcon,
  professional: WorkIcon,
}

const TemplateSidebar = () => {
  const [isOpen, setIsOpen] = useState(true)
  const navigate = useNavigate()

  const handleToggleSidebar = useCallback(() => {
    setIsOpen(prev => !prev)
  }, [])

  const handleNavigateToProfile = useCallback(() => {
    navigate('/profile')
  }, [navigate])

  const { template, setTemplate } = useSearchState()

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        width: isOpen ? 400 : 0,
        bgcolor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
        transition: 'width 0.3s ease-in-out',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          left: -48,
          top: 16,
          zIndex: 1001,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        <Tooltip
          title={isOpen ? 'Close template panel' : 'Open template panel'}
        >
          <IconButton
            aria-label={isOpen ? 'close sidebar' : 'open sidebar'}
            onClick={handleToggleSidebar}
            sx={{
              backgroundColor: 'background.paper',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
              boxShadow: 1,
            }}
          >
            {isOpen ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </Tooltip>
        <Tooltip title="Go to profile">
          <IconButton
            aria-label="go to profile"
            onClick={handleNavigateToProfile}
            sx={{
              backgroundColor: 'background.paper',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
              boxShadow: 1,
            }}
          >
            <AccountCircleIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Box sx={{ color: 'white', p: 2 }}>
        <Typography variant="h6" sx={{ color: 'inherit', textAlign: 'end' }}>
          Templates
        </Typography>
        <List>
          {templates.map(({ id, name, icon }) => (
            <ListItemButton
              key={id}
              selected={id === template}
              onClick={() => setTemplate(id)}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                },
                '&.Mui-selected': {
                  backgroundColor: 'rgba(255, 255, 255, 0.16)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.24)',
                  },
                },
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Box
                component="div"
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  marginRight: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon
                  component={iconMapping[icon]}
                  sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                />
              </Box>
              <Typography sx={{ color: 'white' }}>{name}</Typography>
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Box>
  )
}

export default memo(TemplateSidebar)
