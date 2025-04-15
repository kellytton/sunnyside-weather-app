import React from "react";
import { Container, Box } from "@mui/material";
import Navbar from "../components/navbar";
import LocationCard from "../components/LocationCard";

function Home() {
    return (
        <Container
            maxWidth="lg"
            disableGutters
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '95vh',
                pt: 2,
                color: 'black'
            }}
        >
            <Navbar/>
            <Box
                sx={{
                    backgroundColor: '#F7E1B3',
                    flexGrow: 1, // take remaining space
                    borderRadius: 3,
                    mt: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    pt: 3.5
                }}
            >
                <LocationCard>

                </LocationCard>
            </Box>
        </Container>
    );
}

export default Home;
