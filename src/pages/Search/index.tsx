import { memo, useCallback, useMemo, useState } from 'react'
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
  CircularProgress,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import pracujPlIcon from '../../assets/pracujpl.png'
import noFluffJobsIcon from '../../assets/fluffjobs.jpeg'
import justJoinItIcon from '../../assets/justjoinit.png'
import bullDogJobIcon from '../../assets/bulldogjob.png'
import useSearchState from './searchState'
import TemplateSidebar from './TemplateSidebar'
import useAuthCallback from '../../components/Authentication/useAuthCallback'
import { NotificationType, useNotifications } from '../../components/NotificationManager/notificationsState'

type SupportedDomains = Readonly<
  Array<{
    domain: string
    name: string
    icon: string
    link: string
  }>
>

const supportedDomains: SupportedDomains = Object.freeze([
  {
    domain: 'pracuj.pl',
    name: 'Pracuj.pl',
    icon: pracujPlIcon,
    link: 'https://www.pracuj.pl/',
  },
  {
    domain: 'nofluffjobs.com',
    name: 'No Fluff Jobs',
    icon: noFluffJobsIcon,
    link: 'https://nofluffjobs.com/',
  },
  {
    domain: 'justjoin.it',
    name: 'JustJoin.It',
    icon: justJoinItIcon,
    link: 'https://justjoin.it/',
  },
  {
    domain: 'bulldogjob.com',
    name: 'BullDogJob',
    icon: bullDogJobIcon,
    link: 'https://bulldogjob.pl/',
  },
])

const Search = () => {
  const { search, template, setSearch } = useSearchState()

  const currentDomain = useMemo(() => {
    try {
      const url = new URL(search)
      return supportedDomains.find(domain =>
        url.hostname.endsWith(domain.domain),
      )
    } catch {
      return null
    }
  }, [search])

  const isValidURL = useMemo(() => {
    try {
      new URL(search)
      return true
    } catch {
      return false
    }
  }, [search])

  type SearchChange = React.ChangeEvent<HTMLInputElement>
  const handleSearchChange = useCallback(
    (event: SearchChange) => {
      const { value } = event.target
      setSearch(value)
    },
    [search],
  )

  const searchStatus = useMemo(() => {
    if (search.length === 0) return 'Enter a link to start'
    if (!isValidURL) return 'Invalid URL'
    if (!currentDomain) return 'Other website'
    return `Detected domain of ${currentDomain.name}!`
  }, [search, currentDomain, isValidURL])

  const searchStatusColor = useMemo(() => {
    if (search.length === 0) return 'text.secondary'
    if (!isValidURL) return 'error.main'
    if (!currentDomain) return 'info.main'
    return 'success.main'
  }, [search, currentDomain, isValidURL])

  const handleOpenWebsite = useCallback((link: string) => {
    window.open(link, '_blank')
  }, [currentDomain])

  const createResume = useAuthCallback({
    url: 'http://localhost:8080/api/processing/process',
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: {
      templateName: template ?? 'RESUME1',
      url: search,
    },
    text: true,
  })

  const { pushNotification } = useNotifications()

  const [pending, setPending] = useState(false)
  const [resume, setResume] = useState<string | null>(null)

  const handleCreateResume = useCallback(async () => {
    try {
    setPending(true)
    const { data, error } = await createResume()
    setPending(false)
    if (error) {
      pushNotification({ message: error, notificationType: NotificationType.ERROR, title: 'Error', timeout_ms: 2500 })
    } else {
        setResume(data)
      }
    } catch (error) {
      setPending(false)
      pushNotification({ message: 'An error occurred', notificationType: NotificationType.ERROR, title: 'Error', timeout_ms: 2500 })
    }
  }, [createResume, pushNotification])

  const handleGetResume = useCallback(() => {
    if (resume) {
      window.open(resume, '_blank')
    }
  }, [resume])

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: '100vw',
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ color: 'text.secondary' }}
        >
          Paste your job link here
        </Typography>
        <Box sx={{ display: 'flex', width: '80%', maxWidth: '600px' }}>
          <TextField
            value={search}
            onChange={handleSearchChange}
            variant="outlined"
            fullWidth
            placeholder="Search for jobs..."
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '24px 0 0 24px',
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            disabled={!isValidURL}
            sx={{
              borderRadius: '0 24px 24px 0',
              minWidth: '64px',
            }}
            onClick={handleCreateResume}
          >
            Go!
          </Button>
        </Box>

        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            sx={{ color: 'text.secondary' }}
          >
            Your dream job is at:
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 4,
            }}
          >
            {supportedDomains.map(domain => (
              <Tooltip title={domain.domain}>
                <Box
                  onClick={() => handleOpenWebsite(domain.link)}
                  key={domain.domain}
                  sx={{
                    display: 'flex',
                    cursor: 'pointer',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1,
                    padding: 1,
                    borderRadius: 1,
                    backgroundColor:
                      domain.domain === currentDomain?.domain
                        ? 'action.selected'
                        : 'transparent',
                  }}
                >
                  <img
                    src={domain.icon}
                    alt={domain.name}
                    style={{ width: 'auto', height: 40 }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight:
                        domain.domain === currentDomain?.domain
                          ? 'bold'
                          : 'normal',
                      color:
                        domain.domain === currentDomain?.domain
                          ? 'primary.main'
                          : 'text.primary',
                    }}
                  >
                    {domain.name}
                  </Typography>
                </Box>
              </Tooltip>
            ))}
          </Box>
          <Typography
            variant="body1"
            sx={{
              marginTop: 2,
              color: searchStatusColor,
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            {searchStatus}
          </Typography>
          {pending && (
            <CircularProgress sx={{ marginTop: 2 }} />
          )}
          {resume && (
            <Button
              variant="contained"
              sx={{ marginTop: 2 }}
              onClick={handleGetResume}
            >
              Get Resume
            </Button>
          )}
        </Box>
      </Box>
      <TemplateSidebar />
    </>
  )
}

export default memo(Search)
