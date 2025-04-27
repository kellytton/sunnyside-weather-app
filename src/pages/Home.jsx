import React, { useState, useEffect } from "react";
import {
    Container,
    Box,
    Typography
} from "@mui/material";

import Navbar from "../components/Navbar";
import ToggleControls from "../components/ToggleControls";
import LocationList from "../components/LocationList";
import SearchBar from "../components/SearchBar";

function Home({ setPage }) {
    const [locations, setLocations] = useState([]);
    const [error, setError] = useState("");

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
            setLocations((prev) => [...prev, location]);

            try {
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
                setLocations(data);
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
            <Navbar setPage={setPage} />

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
                    mb: 1,
                    overflow: 'hidden',
                })}
            >
                <SearchBar onLocationSelect={handleAddLocation} />

                {error && (
                    <Typography color="error" textAlign="center">
                        {error}
                    </Typography>
                )}

                <Box
                    sx={{
                        flexGrow: 1,
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        width: '100%',
                        pt: 1.8,
                        pb: 1.8,
                    }}
                >
                    <LocationList key={locations.length} locations={locations} />
                </Box>
                <ToggleControls/>
            </Box>
        </Container>
    );
}

export default Home;