// react and hooks
import React, { useEffect, useState } from "react";

// custom components
import WeekForecastCard from "./WeekForecastCard";

// MUI components
import { Box, Skeleton, Fade } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// custom hooks
import { useTemperatureUnit } from "../hooks/useTemperatureUnit";


function WeekForecastList() {
    const [forecastData, setForecastData] = useState([]);
    const { unit } = useTemperatureUnit();
    const theme = useTheme();
    const isLoading = forecastData.length === 0;

    useEffect(() => {
        const fetchForecast = async () => {
            try {
                const res = await fetch("http://localhost:3001/api/forecast");
                const data = await res.json();
    
                console.log("Fetched forecast data:", data);
    
                const { time, temperature_2m_max, temperature_2m_min } = data.daily;
    
                const upcoming = time.map((date, i) => ({
                    date,
                    maxC: temperature_2m_max[i],
                    minC: temperature_2m_min[i],
                }));
    
                console.log("Formatted upcoming forecastData:", upcoming);
    
                setForecastData(upcoming);
            } catch (err) {
                console.error("Failed to fetch weekly forecast:", err);
            }
        };
    
        fetchForecast();
    }, []);

    // helper to convert and format temperatures
    const formatTemp = (celsiusTemp) => {
        if (unit === "fahrenheit") {
            return Math.round((celsiusTemp * 9) / 5 + 32);
        }
        return Math.round(celsiusTemp);
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {isLoading ? (
                Array.from({ length: 6 }).map((_, index) => (
                    <Skeleton
                        key={index}
                        variant="rectangular"
                        animation="wave"
                        height={62}
                        width={340}
                        sx={{
                            borderRadius: 2,
                            backgroundColor: theme.palette.mode === "dark"
                                ? "rgba(255, 255, 255, 0.1)"
                                : "rgba(0, 0, 0, 0.1)"
                        }}
                    />
                ))
            ) : (
                <Fade in={!isLoading} timeout={600}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        {forecastData.slice(1,7).map((dayData, index) => {
                            const dayName = new Date(dayData.date + "T12:00:00").toLocaleDateString("en-US", {
                                weekday: "long",
                            });

                            return (
                                <WeekForecastCard
                                    key={index}
                                    day={dayName}
                                    high={formatTemp(dayData.maxC)}
                                    low={formatTemp(dayData.minC)}
                                />
                            );
                        })}
                    </Box>
                </Fade>
            )}
        </Box>
    );
}

export default WeekForecastList;