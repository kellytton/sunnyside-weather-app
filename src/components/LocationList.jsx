import React from "react";
import { Box } from "@mui/material";
import LocationCard from "./LocationCard";

function LocationList({ locations }) {
    return (
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
    );
}

export default LocationList;
