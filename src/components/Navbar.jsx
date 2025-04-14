import { Box } from "@mui/material";
import React from "react";

function Navbar() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'relative',
            }}
        >
            {/* Title - Left */}
            <h1>zenweather.</h1>

            {/* Centered Nav */}
            <Box
                sx={{
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: "30px"
                }}
                className="nav glass "
            >
                <a href="Home" className="nav-buttons">Home</a>
                <a href="Forecast" className="nav-buttons">Forecast</a>
            </Box>

            {/* Window Buttons - Right */}
            <Box
                sx={{
                    display: 'flex',
                    gap: '15px'
                }}
            >
                <a href="" className="minimize-button">_</a>
                <a href="" className="exit-button">X</a>
            </Box>
        </Box>
    );
}

export default Navbar;
