import React, { useState, useEffect } from "react";
import {
    Container,
    Box,
    Typography
} from "@mui/material";

import Navbar from "../components/navbar";
import ToggleControls from "../components/ToggleControls";
import LocationList from "../components/LocationList";
import SearchBar from "../components/SearchBar";
import { useTemperatureUnit } from "../hooks/useTemperatureUnit";

function Home({ toggleMode }) {
    const [locations, setLocations] = useState([]);
    const [error, setError] = useState("");
    const { unit, toggleUnit } = useTemperatureUnit();

    // fetch locations when the component mounts
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const res = await fetch("http://localhost:3001/api/locations");
                const data = await res.json();
                setLocations(data);
            } catch (err) {
                console.error("Error fetching locations:", err);
            }
        };

        fetchLocations();
    }, []);

    const handleAddLocation = async (location) => {
        const alreadyExists = locations.some(
            (loc) =>
                loc.name === location.name &&
                loc.state === location.state &&
                loc.country === location.country
        );

        if (!alreadyExists) {
            // add to state immediately
            setLocations((prev) => [...prev, location]);

            try {
                // send to backend to add to the database
                const response = await fetch("http://localhost:3001/api/locations", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(location),
                });

                if (!response.ok) {
                    throw new Error("Failed to add location to the database");
                }

                const res = await fetch("http://localhost:3001/api/locations");
                const data = await res.json();
                setLocations(data);  // refresh state to include new location
            } catch (err) {
                console.error("Error adding location:", err);
                setError("Failed to add location");
            }
        } else {
            setError("Location already exists");
        }
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
                color: 'black',
            }}
        >
            <Navbar />

            <Box
                sx={(theme) => ({
                    backgroundColor: theme.palette.background.paper,
                    flexGrow: 1,
                    borderRadius: 3,
                    mt: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    pt: 3.5,
                    pb: 3.5,
                    px: 0,
                    mb: 2,
                    overflow: 'hidden',
                })}
            >
                <SearchBar onLocationSelect={handleAddLocation} />

                {/* error on Search */}
                {error && (
                    <Typography color="error" textAlign="center">
                        {error}
                    </Typography>
                )}

                {/* make LocationList scrollable when it overflows */}
                <Box
                    sx={{
                        flexGrow: 1,
                        overflowY: 'auto',  // make the list scrollable
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',  // center the location cards
                        justifyContent: 'flex-start',
                        width: '100%',
                        pt: 1.8,  // Top padding
                        pb: 1.8,  // Bottom padding
                    }}
                >
                    <LocationList key={locations.length} locations={locations} />
                </Box>

                <ToggleControls unit={unit} toggleUnit={toggleUnit} toggleMode={toggleMode} />
            </Box>
        </Container>
    );
}

export default Home;