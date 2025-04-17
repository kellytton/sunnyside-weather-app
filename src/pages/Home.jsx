import React, { useState } from "react";
import {
    Container, Box, TextField, Button, Typography,
    InputAdornment
} from "@mui/material";
import Navbar from "../components/navbar";
import LocationCard from "../components/LocationCard";
import { useTemperatureUnit } from "../hooks/useTemperatureUnit";

// MUI icons
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

function Home() {
    const [searchInput, setSearchInput] = useState("");
    const [error, setError] = useState("");
    const [locations, setLocations] = useState([
        {
            name: "Miami",
            state: "FL",
            country: "United States",
            latitude: 25.7617,
            longitude: -80.1918
        }
    ]);

    const { unit, toggleUnit } = useTemperatureUnit();

    const handleSearch = async () => {
        const trimmed = searchInput.trim();
        if (!trimmed) return;

        try {
            const response = await fetch(`http://localhost:3001/api/geocode?name=${encodeURIComponent(trimmed)}`);
            const data = await response.json();

            if (response.ok) {
                const alreadyExists = locations.some(
                    (loc) =>
                        loc.name === data.name &&
                        loc.state === data.state &&
                        loc.country === data.country
                );

                if (!alreadyExists) {
                    setLocations((prev) => [...prev, data]);
                }

                setError("");
                setSearchInput("");
            } else {
                setError(data.error || "Location not found.");
            }
        } catch (err) {
            console.error("Geocode fetch failed:", err);
            setError("Failed to fetch location.");
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
            {/* Inner Box */}
            <Box
                sx={{
                    backgroundColor: '#F7E1B3',
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
                }}
            >
                {/* Search Feature */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        gap: 2,
                        mb: 2,
                        alignSelf: "flex-end",
                        mr: 4.4
                    }}
                >
                    <TextField
                        label="Search City..."
                        placeholder="e.g. Paris"
                        variant="outlined"
                        size="small"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchOutlinedIcon />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            '& .MuiInputBase-input': {
                                color: 'black',
                            },
                        }}
                    />
                    <Button
                        variant="contained"
                        onClick={handleSearch}
                    >
                        <AddOutlinedIcon />
                    </Button>
                </Box>

                {/* Error display */}
                {error && (
                    <Typography color="error" textAlign="center">
                        {error}
                    </Typography>
                )}

                {/* Scrollable, Centered Location Cards */}
                <Box
                    sx={{
                        flexGrow: 1,
                        width: '100%',
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '20px',
                        px: 4.4,
                        pt: 2.5,
                        pb: 2.5
                    }}
                >
                    {locations.map((loc, index) => (
                        <LocationCard key={index} location={loc} />
                    ))}
                </Box>

                {/* Toggle Buttons */}
                <Box
                    sx={{
                        display: 'flex',
                        alignSelf: "flex-end",
                        mr: 4.4,
                        gap: '15px',
                        mt: 'auto',
                        pt: 2
                    }}
                >
                    {/* Dark Mode and Light Mode */}
                    <button className="toggle-buttons">M</button>
                    {/* Celsius and Fahrenheit */}
                    <button
                        className="toggle-buttons"
                        onClick={toggleUnit}
                    >
                        {unit === "fahrenheit" ? "°F" : "°C"}
                    </button>
                </Box>
            </Box>
        </Container>
    );
}

export default Home;