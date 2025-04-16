import React from "react";
import { Container, Box } from "@mui/material";
import Navbar from "../components/navbar";
import LocationCard from "../components/LocationCard";

function Forecast() {
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
            <Box
                sx={{
                    backgroundColor: '#F7E1B3',
                    flexGrow: 1, // take remaining space
                    borderRadius: 3,
                    mt: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '20px',
                    pt: 3.5
                }}
            >
            </Box>
        </Container>
    );
}

export default Forecast;
