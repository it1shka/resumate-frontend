import { Box, Divider, Link, Typography } from "@mui/material";
import RegistrationImage from "../../assets/registration.png"
import JobSearch from "../../assets/job_search.png"

const AboutUs = () => {
    return (
        <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
        >
            <Link sx={{color: "inherit", textDecoration: "none", mb: 5}} href={"/"}>
                <Typography
                    sx={{
                        animation: 'fadeIn 0.5s ease-in-out',
                        animationFillMode: 'forwards',
                        opacity: 0,
                    }}
                    variant={"h3"}
                    mt={10}
                >
                    Resu
                    <Typography variant={"h3"} component={"span"} sx={{color: "primary.main"}}>Mate</Typography>
                </Typography>
            </Link>
           

            <Typography
                sx={{
                    animation: 'fadeIn 0.5s ease-in-out 0.3s',
                    animationFillMode: 'forwards',
                    opacity: 0,
                    mb: 10
                }}
                variant="h4"
            >
                Bringing AI to the Polish job market
            </Typography>


            <Box display={"flex"} flexDirection={"row"} sx={{
                animation: 'fadeIn 0.5s ease-in-out 0.6s',
                animationFillMode: 'forwards',
                opacity: 0,
            }}>
                <Box flex={1} display={"flex"} sx={{
                    animation: 'fadeIn 0.5s ease-in-out 0.9s',
                    animationFillMode: 'forwards',
                    opacity: 0,
                }}>
                    <img width={"100%"} src={RegistrationImage}/>
                </Box>
                <Divider orientation={"vertical"} flexItem sx={{margin: "0 30px"}}/>
                <Box flex={1} display={"flex"} flexDirection={"column"} gap={1} sx={{
                    animation: 'fadeIn 0.5s ease-in-out 1.2s',
                    animationFillMode: 'forwards',
                    opacity: 0,
                }}>
                    <Typography variant="h4">
                        Step 1: Credentials
                    </Typography>
                    <Typography variant="h6">
                        Provide your credentials to get started
                    </Typography>
                </Box>
            </Box>

            <Box display={"flex"} flexDirection={"row"}>
                
               
                <Box flex={1} display={"flex"} alignItems={"end"} justifyContent={"center"} flexDirection={"column"} gap={1} sx={{
                    animation: 'fadeIn 0.5s ease-in-out 1.8s',
                    animationFillMode: 'forwards',
                    opacity: 0,
                }}>
                    <Typography variant="h4">
                        Step 2: Past job
                    </Typography>
                    <Typography variant="h6">
                        And AI will generate the best CV for you
                    </Typography>
                </Box>
                <Divider orientation={"vertical"} flexItem sx={{margin: "0 30px"}}/>
                <Box flex={1} display={"flex"} sx={{
                    animation: 'fadeIn 0.5s ease-in-out 1.5s',
                    animationFillMode: 'forwards',
                    opacity: 0,
                }}>
                    <img width={"100%"} src={JobSearch}/>
                </Box>
            </Box>

            <Box display={"flex"} flexDirection={"row"} mb={10}>
                <Box flex={1} display={"flex"} sx={{
                    animation: 'fadeIn 0.5s ease-in-out 2.1s',
                    animationFillMode: 'forwards',
                    opacity: 0,
                }}>
                    <img width={"100%"} src={RegistrationImage}/>
                </Box>
                <Divider orientation={"vertical"} flexItem sx={{margin: "0 30px"}}/>
                <Box flex={1} display={"flex"} flexDirection={"column"} gap={1} justifyContent={"end"} sx={{
                    animation: 'fadeIn 0.5s ease-in-out 2.4s',
                    animationFillMode: 'forwards',
                    opacity: 0,
                }}>
                    <Typography variant="h4">
                        Step 3: Download CV
                    </Typography>
                    <Typography variant="h6">
                        Choosing the template you like
                    </Typography>
                </Box>
            </Box>


        </Box>
    );
}

export default AboutUs


