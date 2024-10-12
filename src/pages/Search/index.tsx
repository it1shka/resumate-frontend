import {  Box, createTheme, Divider, Grid2, InputAdornment, TextField, ThemeProvider, Typography } from "@mui/material";
import { memo, useCallback } from "react";
import {  Container} from '@mui/material';
import { create } from 'zustand';

import { extractDomain } from "../../utils/urls";

import SearchIcon from '@mui/icons-material/Search';


import PracujPlIcon from './assets/pracujpl.png'
import NoFluffJobsIcon from './assets/fluffjobs.jpeg'
import JustJoinItIcon from './assets/justjoinit.png'
import  BullDogJobIcon from './assets/bulldogjob.png'


enum SupportedDomains{
    PracujPl,
    NoFluffJobs,
    JustJoinIt ,
    BullDogJob
}

const domainsmMap = new Map<string, SupportedDomains>([
    ['pracuj.pl', SupportedDomains.PracujPl],
    ['nofluffjobs.com', SupportedDomains.NoFluffJobs],
    ['justjoin.it', SupportedDomains.JustJoinIt],
    ['bulldogjob.com', SupportedDomains.BullDogJob]
])

const logos =  new Map<SupportedDomains, string>([
    [SupportedDomains.PracujPl, PracujPlIcon],
    [SupportedDomains.NoFluffJobs, NoFluffJobsIcon],
    [SupportedDomains.JustJoinIt, JustJoinItIcon],
    [SupportedDomains.BullDogJob, BullDogJobIcon]
]);

const titles = new Map<SupportedDomains, string>([
    [SupportedDomains.PracujPl, "Pracuj.pl"],
    [SupportedDomains.NoFluffJobs, "No Fluff Jobs"],
    [SupportedDomains.JustJoinIt, "Just Join It"],
    [SupportedDomains.BullDogJob, "Bull Dog Job"]
]);


const theme = createTheme({
    palette: {
      primary: {
        light: '#757ce8',
        main: '#424874',
        dark: '#002884',
        contrastText: '#c3195d',
      }
    
    },
  });
  

interface LinkState {
    link : string,
    domain : SupportedDomains | null,
    isValid: boolean,
    setLink : (newLink : string) => void 
}

const useLink = create<LinkState>((set,) => ({
    link: "",
    domain: null,
    isValid: false,
    setLink: (newLink) => set({ 
        link : newLink,
        domain: domainsmMap.get(extractDomain(newLink)),
    }),

  }));

const Search = () => {


    const {link, setLink, domain} = useLink();

    type ChangeEvent = React.ChangeEvent<HTMLInputElement>;
    const handleChange = useCallback((event: ChangeEvent) => {
        setLink(event.target.value)
    }, [setLink])

    return (
        <ThemeProvider theme={theme}>

            <Container
                style={{
                    marginTop: '20%'
                }}
            >

                <Typography
                variant="h4"
                align="center"
                color="primary.main"
                sx={{
                    margin: "10px 0px",
                    fontFamily: "monospace",
                }}
                >
                Enter link to Job Post:
                </Typography>

                <TextField
                    variant="outlined"
                    placeholder="Enter job link"
                    value={link}
                    onChange={handleChange}
                    InputProps={{
                        endAdornment: (
                        <InputAdornment position="end">
                            <SearchIcon />
                        </InputAdornment>
                        ),
                    }}
                    sx={{
                        backgroundColor: '#ECE6F0',
                        borderRadius: '20px', // Add border radius for rounded corners
                        '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderRadius: '20px', // Ensure the input field itself has rounded corners
                        },
                        },
                    }}
                    fullWidth
                />
    

                
                <Box display="flex" justifyContent="center" alignItems="center"
                    style={{margin: "20px 0px", height: "50px"}}
                >

                   

                    {link !== ''  && domain == null && (
                        <Typography variant="h6" color="primary.contrastText" align="center"
                            fontWeight={"bold"}
                        >
                            Site is not supported
                        </Typography>
                    )}

                    {link !== ''  && domain != null && 
                        <Typography variant="h6" color="primary.main" align="center"
                            fontWeight={"bold"}
                        >
                            {titles.get(domain)}
                        </Typography>
                    }
                </Box>

                <Divider style={{margin: "20px 0"}}/>

                <Grid2 container spacing={15} 
                    justifyContent="center" 
                    alignItems="center"
                >
                    {Array.from(logos.keys()).map((company, index) => (
                        <Grid2 item xs={6} key={index} 
                            sx={{
                                border: domain === company ? `5px solid ${theme.palette.primary.main}` : "0px solid black",
                                borderRadius: "5px",
                                padding: "10px",
                            }}
                        >
                            <Box display="flex" flexDirection="column" alignItems="center">
                                <img
                                    height={70}
                                    src={logos.get(company as SupportedDomains)}
                                    alt={`${company} logo`}
                                />
                            <Typography variant="span" color={"primary.main"} 
                                fontSize="20px"
                                fontWeight={domain === company ? "bold" : "normal"}
                            >
                                {titles.get(company)}
                            </Typography>
                            </Box>
                        </Grid2>
                    ))}
                </Grid2>

                
            </Container>
            
                
         
        </ThemeProvider>
    );
}

export default memo(Search);