// react and hooks
import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { useTemperatureUnit } from "../hooks/useTemperatureUnit";

// MUI components
import {
    Container,
    Box,
    Grid
} from "@mui/material";

// custom components
import Navbar from "../components/Navbar";
import ToggleControls from "../components/ToggleControls";
import WeekForecastList from "../components/WeekForecastList";
import CurrentWeatherForecast from "../components/CurrentWeatherForecast";
import LocationOfForecast from "../components/LocationOfForecast";

// utilities
import stateAbbreviations from "../utils/stateAbbreviations";
import { getFoodSuggestion, getWind } from "../utils/weatherUtils";

// assets
import darkModeBg from "../assets/darkmode.png";
import lightModeBg from "../assets/lightmode.png";

function Forecast({ setPage }) {
    const theme = useTheme();
    const bgImage = theme.palette.mode === "dark" ? darkModeBg : lightModeBg;
    const [location, setLocation] = useState(null);  
    const [weather, setWeather] = useState(null);    
    const [temperatureLoading, setTemperatureLoading] = useState(true);
    const abbreviation = location ? stateAbbreviations[location.state] || location.state : '';
    const { unit } = useTemperatureUnit();

    // function to fetch location data
    const fetchLocation = async () => {
        try {
            const res = await fetch(`http://localhost:3001/api/locations/select`);
            const data = await res.json();
            setLocation(data);
            console.log("Selected location:", data);

            // fetch weather for the selected location
            fetchWeather(data.latitude, data.longitude);
        } catch (err) {
            console.log("Error fetching selected location:", err);
        }
    };

    // function to fetch weather data for the selected location
    const fetchWeather = async (latitude, longitude) => {
        try {
            const weatherRes = await fetch(`http://localhost:3001/api/weather?latitude=${latitude}&longitude=${longitude}`);
            const weatherData = await weatherRes.json();
            console.log("Weather data:", weatherData);
            setWeather(weatherData.current_weather);
            setTemperatureLoading(false);  // set loading to false once the temperature data is fetched
        } catch (err) {
            console.log("Error fetching weather data:", err);
            setTemperatureLoading(false);  // if there's an error, still stop the loading spinner
        }
    };

    // use effect to call fetchLocation when the component mounts
    useEffect(() => {
        fetchLocation();
    }, []);  // empty dependency array to run only once on component mount

    const getTemperature = () => {
        if (!weather) return null;
        const tempC = weather.temperature;
        return unit === "fahrenheit"
            ? Math.round((tempC * 9) / 5 + 32)
            : Math.round(tempC);
    };

    const unitSymbol = unit === "fahrenheit" ? "°F" : "°C";

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
                <Grid item size={8} sx={{ display: 'flex' }}>
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
                            <CurrentWeatherForecast
                                temperatureLoading={temperatureLoading}
                                temperature={getTemperature()}
                                unitSymbol={unitSymbol}
                                windInfo={getWind(weather, unit)}
                                foodSuggestion={weather ? getFoodSuggestion(weather.weathercode) : 'No suggestion available'}
                            />
                        </Box>

                        {/* Bottom Content */}
                        <LocationOfForecast location={location} abbreviation={abbreviation} />
                    </Box>
                </Grid>

                {/* Right Column - Weekly Forecast */}
                <Grid item size={4} sx={{ display: 'flex' }}>
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
                            }}
                        >
                            <ToggleControls />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Forecast;