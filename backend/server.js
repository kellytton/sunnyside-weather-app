// file for fetching from API

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001; // you can use any port not already in use

app.use(cors());
app.use(express.json());

// Simple test route
app.get('/', (req, res) => {
    res.send('Backend server is running');
});

app.listen(PORT, () => {
    console.log(`Backend server is listening on http://localhost:${PORT}`);
});
