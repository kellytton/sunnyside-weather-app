import React, { useState } from "react";
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
    const [locations, setLocations] = useState([
        {
            name: "Miami",
            state: "Florida",
            country: "United States",
            latitude: 25.7617,
            longitude: -80.1918
        }
    ]);

    const [error, setError] = useState("");
    const { unit, toggleUnit } = useTemperatureUnit();

    const handleAddLocation = (location) => {
        const alreadyExists = locations.some(
            (loc) =>
                loc.name === location.name &&
                loc.state === location.state &&
                loc.country === location.country
        );

        if (!alreadyExists) {
            setLocations((prev) => [...prev, location]);
        }

        setError(""); // Clear error on successful add
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

                {/* Error on Search */}
                {error && (
                    <Typography color="error" textAlign="center">
                        {error}
                    </Typography>
                )}

                <LocationList locations={locations} />

                <ToggleControls unit={unit} toggleUnit={toggleUnit} toggleMode={toggleMode} />
            </Box>
        </Container>
    );
}

export default Home;