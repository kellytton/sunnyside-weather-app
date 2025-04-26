const express = require('express');
const cors = require('cors');
const axios = require('axios');
const db = require('./db/database')

const app = express(); // Express application
const PORT = 3001;

app.use(cors());
app.use(express.json());

// GET preferences
app.get('/api/preferences', (req, res) => { // request object, response object
    const prefs = db.prepare('SELECT * FROM preferences WHERE id = 1').get();
    res.json(prefs);
});

// PATCH preferences
app.patch('/api/preferences', (req, res) => {
    const { unit, mode } = req.body;
    if (!unit && !mode) return res.status(400).json({ error: 'No valid fields provided' });

    const current = db.prepare('SELECT * FROM preferences WHERE id = 1').get();
    const updated = {
        unit: unit || current.unit,
        mode: mode || current.mode
    };

    db.prepare('UPDATE preferences SET unit = ?, mode = ? WHERE id = 1').run(updated.unit, updated.mode);

    if (current.unit !== updated.unit) {
        console.log(`✅ Temperature unit updated: ${current.unit} → ${updated.unit}`);
    }
    if (current.mode !== updated.mode) {
        console.log(`🌓 Theme mode updated: ${current.mode} → ${updated.mode}`);
    }
    res.json(updated);
});

// GET all locations
app.get('/api/locations', (req, res) => {
    const locations = db.prepare('SELECT * FROM locations').all();
    res.json(locations);
});

// GET selected location
app.get('/api/locations/select', (req, res) => {
    const location = db.prepare('SELECT * FROM locations WHERE selected = 1').get();
    res.json(location);
});

// POST new location
app.post('/api/locations', (req, res) => {
    const { name, state, country, latitude, longitude } = req.body;
    if (!name || !latitude || !longitude || !country) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    
    db.prepare(`
        INSERT INTO locations (name, state, country, latitude, longitude)
        VALUES (?, ?, ?, ?, ?)
    `).run(name, state || null, country, latitude, longitude); // ensure null for optional 'state'

    console.log(`Added new location: ${name}, ${state || 'N/A'}, ${country}`);

    res.status(201).json({ message: 'Location added successfully' });
});

// PATCH selected location
app.patch('/api/locations/select', (req, res) => {
    const { id } = req.body;
    if (!id) return res.status(400).json({ error: 'Location ID required' });

    // Unselect all
    db.prepare(`UPDATE locations SET selected = 0`).run();
    // Select one
    db.prepare(`UPDATE locations SET selected = 1 WHERE id = ?`).run(id);

    // Fetch the selected location's details
    const location = db.prepare(`SELECT name, state, country FROM locations WHERE id = ?`).get(id);

    if (location) {
        console.log(`New selected location: ${location.name}, ${location.state || 'N/A'}, ${location.country}`);
    } else {
        console.log(`Selected location with ID ${id} not found.`);
    }

    res.json({ message: 'Selected location updated' });
});

// Route to geocode a city name to lat/long (returns best match only)
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

        const location = results[0]; // Return best match
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

// Route to fetch weather using lat/long
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

// Route to fetch autocomplete suggestions (multiple matches)
app.get('/api/geocode/suggestions', async (req, res) => {
    const { name } = req.query;
    if (!name) return res.status(400).json({ error: 'City name is required' });

    try {
        const response = await axios.get('https://geocoding-api.open-meteo.com/v1/search', {
            params: { name }
        });

        const results = response.data.results;
        if (!results || results.length === 0) {
            return res.status(404).json({ error: 'No matching locations found' });
        }

        const locations = results.map(loc => ({
            name: loc.name,
            state: loc.admin1,
            country: loc.country,
            latitude: loc.latitude,
            longitude: loc.longitude
        }));

        res.json(locations);
    } catch (error) {
        console.error('Suggestion fetch error:', error.message);
        res.status(500).json({ error: 'Failed to fetch location suggestions' });
    }
});

// Route to fetch full forecast: current + daily for selected location
app.get('/api/forecast', async (req, res) => {
    const location = db.prepare('SELECT * FROM locations WHERE selected = 1').get();

    if (!location) {
        return res.status(404).json({ error: 'No selected location found' });
    }

    const { latitude, longitude } = location;

    try {
        const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
            params: {
                latitude,
                longitude,
                current_weather: true,
                daily: 'temperature_2m_max,temperature_2m_min',
                timezone: 'auto'
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error fetching forecast:', error.message);
        res.status(500).json({ error: 'Failed to fetch forecast' });
    }
});

app.listen(PORT, () => {
    console.log(`Backend server is listening on http://localhost:${PORT}`);
});