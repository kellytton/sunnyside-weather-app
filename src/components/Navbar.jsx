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
                className="nav glass"
            >
                <a href="Home">Home</a>
                <a href="Forecast">Forecast</a>
            </Box>

            {/* Window Buttons - Right */}
            <Box>
                <h1>temp</h1>
            </Box>
        </Box>
    );
}

export default Navbar;
