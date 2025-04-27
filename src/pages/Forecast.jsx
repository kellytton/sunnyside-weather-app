import React, { useEffect, useState } from "react";
import {
    Container,
    Box,
    Grid,
    Typography
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import Navbar from "../components/Navbar";
import ToggleControls from "../components/ToggleControls";
import WeekForecastList from "../components/WeekForecastList";
import stateAbbreviations from "../utils/stateAbbreviations";
import { getWeatherDescription, getFoodSuggestion } from "../utils/weatherUtils";

import darkModeBg from "../assets/darkmode.png";
import lightModeBg from "../assets/lightmode.png";

function Forecast({ setPage }) {
    const theme = useTheme();
    const bgImage = theme.palette.mode === "dark" ? darkModeBg : lightModeBg;
    const [location, setLocation] = useState('');
    const abbreviation = stateAbbreviations[location.state] || location.state;
    const [weather, setWeather] = useState(null);

    // fetch selected location
    useEffect(() => {
        const fetchSelectedLocation = async () => {
            try {
                const res = await fetch(`http://localhost:3001/api/locations/select`);
                const data = await res.json();
                setLocation(data);
                console.log("Selected location:", data);
            } catch (err) {
                console.log("Error fetching selected location:", err);
            }
        };

        fetchSelectedLocation();
    }, []);

    // get the day of the week
    const getDayOfWeek = () => {
        const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        const d = new Date();
        return weekday[d.getDay()];
    };
    
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
                            justifyContent: 'space-between',
                        }}
                    >   
                        {/* Top Content */}
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2
                            }}
                        >
                            <Box>
                                <Typography
                                    sx={{
                                        fontSize: '100px',
                                        lineHeight: 1
                                    }}
                                >
                                    98°F
                                </Typography>
                                <Typography>feels like 102°</Typography>
                            </Box>
                            <Typography
                                sx={{
                                    width: '206px',
                                    fontFamily: 'Inria Serif',
                                    fontStyle: 'italic',
                                }}
                            >
                                Perfect for a BBQ—grilled ribs and cold drinks under the sun.
                            </Typography>
                        </Box>

                        {/* Bottom Content */}
                        <Box>
                            <Typography>{getDayOfWeek()} in</Typography>
                            <Typography
                                sx={{
                                    fontSize: '36px',
                                    fontFamily: 'Inria Serif'
                                }}
                            >
                                {location.name}, {abbreviation}
                            </Typography>
                        </Box>
                    </Box>
                </Grid>

                {/* Right Column - Weekly Forecast */}
                <Grid item xs={4} sx={{ display: 'flex' }}>
                    <Box
                        sx={{
                            backgroundColor: theme.palette.background.paper,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            flexGrow: 1,
                            width: '406px',
                            borderRadius: 3,
                            p: 2,
                            pt: 6
                        }}
                    >
                        <WeekForecastList/>
                        <Box
                            sx={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'flex-end',
                                ml: 4,
                            }
                        }>
                            <ToggleControls />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Forecast;