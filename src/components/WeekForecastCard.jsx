// MUI
import { Box, Typography } from "@mui/material";

function WeekForecastCard({ day, high, low }) {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                height: "62px",
                width: "340px",
                backgroundColor: '',
                px: 2,
            }}
            className='forecast-glass'
        >
            <Typography variant="h6">{day}</Typography>
            <Typography variant="h6">
                {high}° / {low}°
            </Typography>
        </Box>
    );
}

export default WeekForecastCard;