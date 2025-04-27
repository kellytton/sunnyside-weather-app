// react
import React from "react";

// MUI
import { Box, IconButton, Tooltip } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import ThermostatIcon from '@mui/icons-material/Thermostat';

// custom hooks
import { useTemperatureUnit } from '../hooks/useTemperatureUnit';
import { useThemeMode } from '../hooks/useThemeMode';

function ToggleControls() {
    const theme = useTheme(); // get current mui theme (light/dark)
    const { unit, toggleUnit } = useTemperatureUnit(); // access and toggle temperature unit
    const { toggleMode } = useThemeMode(); // access and toggle theme mode

    return (
        <Box
            sx={{
                display: 'flex',
                alignSelf: "flex-end", // position to the right
                gap: 1.5,              // spacing between icons
                mr: 4.4,               // right margin
                pt: 2                  // padding on top
            }}
        >
            {/* light/dark mode toggle button */}
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

            {/* temperature unit toggle button */}
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