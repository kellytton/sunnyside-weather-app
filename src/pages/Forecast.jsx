import React from "react";
import React, { useState } from "react";
import {
    Container,
    Box,
    Typography
} from "@mui/material";

import Navbar from "../components/navbar";
import ToggleControls from "../components/ToggleControls";
import { useTemperatureUnit } from "../hooks/useTemperatureUnit";

function Forecast({ unit, toggleUnit, toggleMode }) {
    return (
        <Container
            maxWidth="lg"
            disableGutters
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '95vh',
                pt: 3,
                color: 'black'
            }}
        >
            <Navbar/>
            {/* Current Weather Block */}
            <Box
                sx={(theme) => ({
                    backgroundColor: theme.palette.background.paper,
                    width: '770px',
                    height: '610px'
                })}
            >
            </Box>
            {/* Weekly Forecast */}
            <Box
                sx={(theme) => ({
                    backgroundColor: theme.palette.background.paper,
                    width: '420px',
                    height: '610px',
                })}
            >
                <ToggleControls unit={unit} toggleUnit={toggleUnit} />
            </Box>
        </Container>
    );
}

export default Forecast;
