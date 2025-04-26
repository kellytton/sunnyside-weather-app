import React, { useEffect, useState } from "react";
import WeekForecastCard from "./WeekForecastCard";
import { Box } from "@mui/material";
import { useTemperatureUnit } from "../hooks/useTemperatureUnit";

function WeekForecastList() {
    const [forecastData, setForecastData] = useState([]);
    const { unit } = useTemperatureUnit(); // use the context here

    useEffect(() => {
        const fetchForecast = async () => {
            try {
                const res = await fetch("http://localhost:3001/api/forecast");
                const data = await res.json();
    
                console.log("Fetched forecast data:", data); // 🛑 ADD THIS
    
                const { time, temperature_2m_max, temperature_2m_min } = data.daily;
    
                const upcoming = time.map((date, i) => ({
                    date,
                    maxC: temperature_2m_max[i],
                    minC: temperature_2m_min[i],
                }));
    
                console.log("Formatted upcoming forecastData:", upcoming); // 🛑 AND THIS
    
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
    );
}

export default WeekForecastList;