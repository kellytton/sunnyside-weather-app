import React from "react";
import { Box } from "@mui/material";

function ToggleControls({ unit, toggleUnit }) {
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
            <button className="toggle-buttons">M</button>
            <button
                className="toggle-buttons"
                onClick={toggleUnit}
            >
                {unit === "fahrenheit" ? "°F" : "°C"}
            </button>
        </Box>
    );
}

export default ToggleControls;
