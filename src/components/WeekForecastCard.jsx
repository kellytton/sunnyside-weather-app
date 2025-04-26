import { Box, Typography } from "@mui/material";

function WeekForecastCard() {
    return(
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '70px',
                width: '340px'
            }}
        >
            <Typography>
                Sunday
            </Typography>
            <Typography>
                88° / 66°
            </Typography>
        </Box>
    );
}

export default WeekForecastCard;