import { Box, Typography } from "@mui/material";
import React from "react";
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';

function LocationCard({ location }) {
    const { name, state, country } = location;

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
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PlaceOutlinedIcon style={{ width: 24, height: 24, marginRight: 8 }} />
                    <Typography variant="h4">
                        {name}{state ? `, ${state}` : ''}{country ? `, ${country}` : ''}
                    </Typography>
                </Box>

                <Typography variant="h4">--°</Typography> {/* Placeholder for weather */}
            </Box>

            <Box sx={{ mt: 0.5, display: 'flex' }}>
                <Box sx={{ width: 32, mr: 0.5 }} />
                <Typography variant="subtitle1">Fetching weather...</Typography>
            </Box>
        </Box>
    );
}

export default LocationCard;