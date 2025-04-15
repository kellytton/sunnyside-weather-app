import { Box, Typography } from "@mui/material";
import React from "react";
import locationIcon from '../assets/location.png';

function LocationCard() {
    return (
        <Box
            sx={{
                width: '1130px',
                height: '100px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center', // center vertically within card
                padding: '0.5rem',
                borderRadius: '8px',
            }}
            className="glass"
        >
            {/* Top row: icon + city on left, temp on right */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center', // center icon/text vertically in row
                }}
            >
                {/* Left: icon + city */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <img
                        src={locationIcon}
                        alt="Selected Location"
                        style={{ width: 24, height: 24, marginRight: 8 }}
                    />
                    <Typography variant="h4">Miami, FL</Typography>
                </Box>

                {/* Right: temperature */}
                <Typography variant="h4">96°</Typography>
            </Box>

            {/* Second row: weather description */}
            <Box
                sx={{
                    mt: 0.5,
                    display: 'flex',
                    alignItems: 'center', // optional for vertical centering
                }}
            >
                <Typography variant="subtitle1">Sunny</Typography>
            </Box>
        </Box>
    );
}

export default LocationCard;