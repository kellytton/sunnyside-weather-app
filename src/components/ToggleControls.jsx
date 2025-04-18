import React from "react";
import { Box, Button } from "@mui/material";

function ToggleControls({ unit, toggleUnit, toggleMode }) {
    return (
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
            <Button
                variant="contained"
                onClick={toggleMode}
                sx={{ minWidth: 36 }}
            >
                🌓
            </Button>

            <Button
                variant="contained"
                onClick={toggleUnit}
                sx={{ minWidth: 48 }}
            >
                {unit === "fahrenheit" ? "°F" : "°C"}
            </Button>
        </Box>
    );
}

export default ToggleControls;