import React from "react";
import {
    Box,
    Typography,
    IconButton,
    Tooltip
} from "@mui/material";
import MinimizeIcon from '@mui/icons-material/Minimize';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from "@mui/material/styles";

function Navbar({ setPage }) {
    const theme = useTheme();

    const handleMinimize = (e) => {
        e.preventDefault();
        window.electron.minimizeApp();
    };

    const handleClose = (e) => {
        e.preventDefault();
        window.electron.closeApp();
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'relative',
                padding: '8px 16px',
                backgroundColor: theme.palette.background.default,
            }}
            className="drag"
        >
            {/* Title - Left */}
            <Typography variant="h1" sx={{ color: theme.palette.text.primary }}> 
                sunnyside
            </Typography>

            {/* Centered Nav */}
            <Box
                sx={{
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: "30px",
                    backgroundColor: theme.palette.background.paper,
                }}
                className="nav"
            >
                <button
                    onClick={() => setPage("home")}
                    className="nav-buttons no-drag"
                >
                    <Typography
                        variant="h3"
                        sx={{
                            color: theme.palette.text.primary,
                        }}
                    >
                        Home
                    </Typography>
                </button>
                <button
                    onClick={() => setPage("forecast")}
                    className="nav-buttons no-drag"
                >
                    <Typography
                        variant="h3"
                        sx={{
                            color: theme.palette.text.primary
                        }}
                    >
                        Forecast
                    </Typography>
                </button>
            </Box>

            {/* Window Buttons - Right */}
            <Box
                sx={{
                    display: 'flex',
                    gap: 1
                }}
            >
                <Tooltip title="Minimize">
                    <IconButton
                        onClick={handleMinimize}
                        className="no-drag"
                        size="small"
                        sx={{
                            height: '36px',
                            width: '36px',
                            color: theme.palette.text.primary,
                            backgroundColor: theme.palette.background.paper,
                            '&:hover': {
                                backgroundColor: theme.palette.custom.windowButtonHover,
                            }
                        }}
                    >
                        <MinimizeIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Close">
                    <IconButton
                        onClick={handleClose}
                        className="no-drag"
                        size="small"
                        sx={{
                            height: '36px',
                            width: '36px',
                            color: theme.palette.text.primary,
                            backgroundColor: theme.palette.background.paper,
                            '&:hover': {
                                backgroundColor: theme.palette.error.main,
                                color: theme.palette.getContrastText(theme.palette.error.main),
                            }
                        }}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </Box>
        </Box>
    );
}

export default Navbar;