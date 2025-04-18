import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import { getWeatherDescription } from "../utils/weatherUtils";
import { useTemperatureUnit } from "../hooks/useTemperatureUnit";

function LocationCard({ location }) {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);

    const { unit } = useTemperatureUnit();

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

    const getTemperature = () => {
        if (!weather) return null;
        const tempC = weather.temperature;
        return unit === "fahrenheit"
            ? Math.round((tempC * 9) / 5 + 32)
            : Math.round(tempC);
    };

    const unitSymbol = unit === "fahrenheit" ? "°F" : "°C";

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
                pb: 2,
                pt: 2
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
                <PlaceOutlinedIcon
                    sx={(theme) => ({
                        width: 24,
                        height: 24,
                        mr: 1, // you can also use spacing units (1 = 8px)
                        color: theme.palette.text.primary,
                    })}
                />
                    <Typography 
                        variant="h4"
                        sx={(theme) => ({
                            color: theme.palette.text.primary
                        })}
                    >
                        {location.name}, {location.state || location.country}
                    </Typography>
                </Box>

                {/* Right: temperature */}
                <Typography 
                        variant="h4"
                        sx={(theme) => ({
                            color: theme.palette.text.primary
                        })}
                >
                    {loading ? "..." : `${getTemperature()}${unitSymbol}`}
                </Typography>
            </Box>

            {/* Second row: weather description */}
            <Box sx={{ mt: 0.5, display: 'flex' }}>
                <Box sx={{ width: 32, mr: 0.5 }} /> {/* spacer to align under icon */}
                <Typography 
                        variant="subtitle"
                        sx={(theme) => ({
                            color: theme.palette.text.primary
                        })}
                >
                    {loading
                        ? "Fetching weather..."
                        : getWeatherDescription(weather?.weathercode)}
                </Typography>
            </Box>
        </Box>
    );
}

export default LocationCard;