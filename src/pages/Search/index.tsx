import { memo, useCallback, useMemo } from 'react'
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import pracujPlIcon from '../../assets/pracujpl.png'
import noFluffJobsIcon from '../../assets/fluffjobs.jpeg'
import justJoinItIcon from '../../assets/justjoinit.png'
import bullDogJobIcon from '../../assets/bulldogjob.png'
import useSearchState from './searchState'

type SupportedDomains = Readonly<Array<{
  domain: string
  name: string
  icon: string
}>>

const supportedDomains: SupportedDomains = Object.freeze([
  {
    domain: 'pracuj.pl',
    name: 'Pracuj.pl',
    icon: pracujPlIcon,
  },
  {
    domain: 'nofluffjobs.com',
    name: 'No Fluff Jobs',
    icon: noFluffJobsIcon,
  },
  {
    domain: 'justjoin.it',
    name: 'Just Join It',
    icon: justJoinItIcon,
  },
  {
    domain: 'bulldogjob.com',
    name: 'Bull Dog Job',
    icon: bullDogJobIcon,
  },
])

const Search = () => {
  const { search, setSearch } = useSearchState()

  const currentDomain = useMemo(() => {
    try { 
      const url = new URL(search)
      return supportedDomains.find((domain) => url.hostname.endsWith(domain.domain))
    } catch {
      return null
    }
  }, [search])

  type SearchChange = React.ChangeEvent<HTMLInputElement>
  const handleSearchChange = useCallback((event: SearchChange) => {
    const { value } = event.target
    setSearch(value)
  }, [search])

  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100vw',
    }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'text.secondary' }}>
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
          disabled={!currentDomain}
          sx={{
            borderRadius: '0 24px 24px 0',
            minWidth: '64px',
          }}
        >
          Go!
        </Button>
      </Box>

      <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h6" component="h2" gutterBottom sx={{ color: 'text.secondary' }}>
          Supported websites
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 4 }}>
          {supportedDomains.map((domain) => (
            <Box
              key={domain.domain}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1,
                padding: 1,
                borderRadius: 1,
                backgroundColor: domain.domain === currentDomain?.domain ? 'action.selected' : 'transparent',
              }}
            >
              <img src={domain.icon} alt={domain.name} style={{ width: 'auto', height: 40 }} />
              <Typography
                variant="body2"
                sx={{
                  fontWeight: domain.domain === currentDomain?.domain ? 'bold' : 'normal',
                  color: domain.domain === currentDomain?.domain ? 'primary.main' : 'text.primary',
                }}
              >
                {domain.name}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

    </Box>
  )
}

export default memo(Search)
