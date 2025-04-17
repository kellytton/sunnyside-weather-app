import { Box, Typography } from "@mui/material";
import React from "react";
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';

function LocationCard() {
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
                    <PlaceOutlinedIcon style={{ width: 24, height: 24, marginRight: 8 }} />
                    <Typography variant="h4">Miami, FL</Typography>
                </Box>

                {/* Right: temperature */}
                <Typography variant="h4">96°</Typography>
            </Box>

            {/* Second row: weather description (under city only) */}
            <Box
                sx={{
                    mt: 0.5,
                    display: 'flex',
                }}
            >
                {/* spacer to align under city */}
                <Box sx={{ width: 32, mr: 0.5 }} /> {/* width = icon + margin */}
                <Typography variant="subtitle1">Sunny</Typography>
            </Box>
        </Box>
    );
}

export default LocationCard;