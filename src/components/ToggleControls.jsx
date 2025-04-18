import React from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import Brightness4Icon from '@mui/icons-material/Brightness4'; // Moon/Sun toggle icon
import ThermostatIcon from '@mui/icons-material/Thermostat';   // Temp unit toggle
import { useTheme } from '@mui/material/styles';

function ToggleControls({ unit, toggleUnit, toggleMode }) {
    const theme = useTheme();

    return (
        <Box
            sx={{
                display: 'flex',
                alignSelf: "flex-end",
                mr: 4.4,
                gap: 1.5,
                mt: 'auto',
                pt: 2
            }}
        >
            {/* Theme Toggle Button */}
            <Tooltip title="Toggle Light/Dark Mode">
                <IconButton
                    onClick={toggleMode}
                    className="no-drag"
                    size="small"
                    sx={{
                        height: '36px',
                        width: '36px',
                        color: theme.palette.text.primary,
                        backgroundColor: theme.palette.custom.tertiary,
                        '&:hover': {
                            backgroundColor: theme.palette.custom.windowButtonHover,
                        }
                    }}
                >
                    <Brightness4Icon fontSize="small" />
                </IconButton>
            </Tooltip>

            {/* Temperature Unit Toggle Button */}
            <Tooltip title={`Switch to ${unit === "fahrenheit" ? "Celsius" : "Fahrenheit"}`}>
                <IconButton
                    onClick={toggleUnit}
                    className="no-drag"
                    size="small"
                    sx={{
                        height: '36px',
                        width: '36px',
                        color: theme.palette.text.primary,
                        backgroundColor: theme.palette.custom.tertiary,
                        '&:hover': {
                            backgroundColor: theme.palette.custom.windowButtonHover,
                        }
                    }}
                >
                    <ThermostatIcon fontSize="small" />
                </IconButton>
            </Tooltip>
        </Box>
    );
}

export default ToggleControls;