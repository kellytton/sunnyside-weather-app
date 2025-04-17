/*
    file for fetching from API
*/

const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3001;

app.use(cors()); // allow frontend to connect to this server
app.use(express.json());

// route to geocode a city name to lat/long
app.get('/api/geocode', async (req, res) => {
    const { name } = req.query;
    if (!name) return res.status(400).json({ error: 'City name is required' });

    try {
        const response = await axios.get('https://geocoding-api.open-meteo.com/v1/search', {
            params: { name }
        });

        const results = response.data.results;
        if (!results || results.length === 0) {
            return res.status(404).json({ error: 'No matching location found' });
        }

        const location = results[0] // get best match
        res.json({
            name: location.name,
            state: location.admin1,
            country: location.country,
            latitude: location.latitude,
            longitude: location.longitude
        });
    } catch (error) {
        console.error('Geocoding error:', error.message);
        res.status(500).json({ error: 'Geocoding failed' });
    }
});

// route to fetch weather using lat/long
app.get('/api/weather', async (req, res) => {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
        return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    try {
        const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
            params: {
                latitude,
                longitude,
                current_weather: true
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error fetching weather:', error.message);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

app.listen(PORT, () => {
    console.log(`Backend server is listening on http://localhost:${PORT}`);
});
