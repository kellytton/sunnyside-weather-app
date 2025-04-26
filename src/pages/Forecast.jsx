import React from "react";
import {
    Container,
    Box,
    Grid
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import Navbar from "../components/Navbar";
import ToggleControls from "../components/ToggleControls";

import darkModeBg from "../assets/darkmode.png";
import lightModeBg from "../assets/lightmode.png";

function Forecast({ setPage }) {
    const theme = useTheme();
    const bgImage = theme.palette.mode === "dark" ? darkModeBg : lightModeBg;

    return (
        <Container
            maxWidth="lg"
            disableGutters
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '95vh',
                pt: 3,
            }}
        >
            <Navbar setPage={setPage}/>

            <Grid
                container
                spacing={3}
                sx={{
                    mt: 2,
                    mb: 1,
                    flexGrow: 1,
                    borderRadius: 3,
                }}
            >
                {/* Left Column - Current Weather with theme-dependent background */}
                <Grid item xs={8} sx={{ display: 'flex' }}>
                    <Box
                        sx={{
                            backgroundImage: `url(${bgImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            flexGrow: 1,
                            width: '770px',
                            borderRadius: 3,
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        {/* Add weather data here */}
                    </Box>
                </Grid>

                {/* Right Column - Weekly Forecast */}
                <Grid item xs={4} sx={{ display: 'flex' }}>
                    <Box
                        sx={{
                            backgroundColor: theme.palette.background.paper,
                            flexGrow: 1,
                            width: '406px',
                            borderRadius: 3,
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        {/* Add forecast cards here */}
                        <ToggleControls />
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Forecast;