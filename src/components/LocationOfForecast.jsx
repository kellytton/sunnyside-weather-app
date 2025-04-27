// MUI
import { Typography, Box } from "@mui/material";

function LocationOfForecast({ location, abbreviation }) {
    const getDayOfWeek = () => {
        const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const d = new Date();
        return weekday[d.getDay()];
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <Typography
                sx={{
                    fontFamily: 'Inria Serif'
                }}
            >
                {getDayOfWeek()} in
            </Typography>
            <Typography
                sx={{
                    fontSize: '36px',
                    fontFamily: 'Inria Serif'
                }}
            >
                {location ? `${location.name}, ${abbreviation}` : "Loading location..."}
            </Typography>
        </Box>
    );
}

export default LocationOfForecast;
