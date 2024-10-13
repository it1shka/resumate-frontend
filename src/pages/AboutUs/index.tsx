import { Box, Divider, Link, Typography } from "@mui/material";
import RegistrationImage from "../../assets/registration.png"
import JobSearch from "../../assets/job_search.png"


const photos = [
    {
        src : RegistrationImage,
        header: "Step 1: Credentials",
        text: "Provide your credentials to get started"
    },
    {
        src : JobSearch,
        header: "Step 2: Past job",
        text: "And AI will generate the best CV for you"
    },
    {
        src : RegistrationImage,
        header: "Step 3: Download CV",
        text: "Choosing the template you like"
    },
    {}
]

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
            
            {photos.map((val, index) => (<>{index % 2 == 0 ?
                <Box display={"flex"} flexDirection={"row"} sx={{
                    animation: 'fadeIn 0.5s ease-in-out 0.6s',
                    animationFillMode: 'forwards',
                    opacity: 0,
                }}>
                    {/* {index % 2 == 0 ?
                    
                    } */}
                    <Box flex={1} display={"flex"} sx={{
                        animation: `fadeIn 0.5s ease-in-out ${0.3 * index * 2}s`,
                        animationFillMode: 'forwards',
                        opacity: 0,
                    }}>
                        <img width={"100%"} src={val.src}/>
                    </Box>
                    <Divider orientation={"vertical"} flexItem sx={{margin: "0 30px"}}/>
                    <Box flex={1} display={"flex"} flexDirection={"column"} gap={1} sx={{
                        animation: `fadeIn 0.5s ease-in-out ${0.3 * 2 * index + 1}s`,
                        animationFillMode: 'forwards',
                        opacity: 0,
                    }}>
                        <Typography variant="h4">
                            {val.header}
                        </Typography>
                        <Typography variant="h6">
                            {val.text}
                        </Typography>
                    </Box>
                </Box>
                :
                <Box display={"flex"} flexDirection={"row"}>
             
                    
                    <Box flex={1} display={"flex"} flexDirection={"column"} gap={1} sx={{
                        animation: `fadeIn 0.5s ease-in-out ${0.3 * index * 2 + 1}s`,
                        animationFillMode: 'forwards',
                        opacity: 0,
                    }}>
                        <Typography variant="h4">
                            {val.header}
                        </Typography>
                        <Typography variant="h6">
                            {val.text}
                        </Typography>
                    </Box>
                    <Divider orientation={"vertical"} flexItem sx={{margin: "0 30px"}}/>

                    <Box flex={1} display={"flex"} sx={{
                        animation: `fadeIn 0.5s ease-in-out ${0.3 * index * 2 + 1}s`,
                        animationFillMode: 'forwards',
                        opacity: 0,
                    }}>
                        <img width={"100%"} src={val.src}/>
                    </Box>
                </Box>
            }</>))}

         


        </Box>
    );
}

export default AboutUs


