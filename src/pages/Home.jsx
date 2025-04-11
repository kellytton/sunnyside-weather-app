import React from "react";
import { Container, Box } from "@mui/material";
import Navbar from "../components/navbar";

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
                color: 'white'
            }}
        >
            <Navbar/>
            <Box
                sx={{
                    backgroundColor: '#6A7871',
                    flexGrow: 1, // take remaining space
                    borderRadius: 3,
                    mt: 1
                }}
            >
                To be continued...
            </Box>
        </Container>
    );
}

export default Home;
