// MUI
import { Box, Typography } from "@mui/material";

function CurrentWeatherForecast({ temperatureLoading, temperature, unitSymbol, windInfo, foodSuggestion }) {
    return (
        <>
            <Box>
                <Typography
                    sx={{
                        fontSize: '100px',
                        lineHeight: 1
                    }}
                >
                    {temperatureLoading ? "..." : `${temperature}${unitSymbol}`}
                </Typography>
                <Typography>
                    {temperatureLoading ? "Loading..." : windInfo}
                </Typography>
            </Box>
            <Typography
                sx={{
                    width: '206px',
                    fontFamily: 'Inria Serif',
                    fontStyle: 'italic',
                }}
            >
                {temperatureLoading ? "Loading food suggestion..." : foodSuggestion}
            </Typography>
        </>
    );
}

export default CurrentWeatherForecast;
