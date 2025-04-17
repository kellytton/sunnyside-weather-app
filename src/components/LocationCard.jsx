import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import { getWeatherDescription } from "../utils/weatherUtils";

function LocationCard({ location }) {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/weather?latitude=${location.latitude}&longitude=${location.longitude}`);
                const data = await response.json();
                setWeather(data.current_weather);
            } catch (error) {
                console.error("Weather fetch failed:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [location]);

    return (
        <Box
            sx={{
                width: '1130px',
                height: '100px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                px: '1.2rem',
                borderRadius: '8px',
                boxSizing: 'border-box',
            }}
            className="glass"
        >
            {/* First row: icon + city on left, temp on right */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                {/* Left: icon + city */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PlaceOutlinedIcon style={{ width: 24, height: 24, marginRight: 8 }} />
                    <Typography variant="h4">
                        {location.name}, {location.state || location.country}
                    </Typography>
                </Box>

                {/* Right: temperature */}
                <Typography variant="h4">
                    {loading ? "..." : `${Math.round(weather?.temperature)}°`}
                </Typography>
            </Box>

            {/* Second row: weather description */}
            <Box sx={{ mt: 0.5, display: 'flex' }}>
                <Box sx={{ width: 32, mr: 0.5 }} /> {/* spacer to align under icon */}
                <Typography variant="subtitle1">
                    {loading
                        ? "Fetching weather..."
                        : getWeatherDescription(weather?.weathercode)}
                </Typography>
            </Box>
        </Box>
    );
}

export default LocationCard;