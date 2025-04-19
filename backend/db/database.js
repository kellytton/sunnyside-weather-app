const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

// ensure the database folder exists
const dbFolder = path.join(__dirname, 'data');
if (!fs.existsSync(dbFolder)) {
    fs.mkdirSync(dbFolder);
}

// path to the local sqlite file
const dbPath = path.join(dbFolder, 'weather.db');

// connect to sqlite database
const db = new Database(dbPath);

// create preferences table (only 1 row )
db.prepare(`
    CREATE TABLE IF NOT EXISTS preferences (
        id INTEGER PRIMARY KEY CHECK (id = 1),
        unit TEXT NOT NULL DEFAULT 'celsius',
        mode TEXT NOT NULL DEFAULT 'light'
    )
`).run();

// insert default preferences if not present
const existingPreferences = db.prepare(`SELECT * FROM preferences WHERE id = 1`).get();
if (!existingPreferences) {
    db.prepare(`INSERT INTO preferences (id, unit, mode) VALUES (1, 'celsius', 'light')`).run();
}

// create locations table
db.prepare(`
    CREATE TABLE IF NOT EXISTS locations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        state TEXT,
        country TEXT NOT NULL,
        latitude REAL NOT NULL,
        longitude REAL NOT NULL,
        selected INTEGER DEFAULT 0
    )
`).run();

// ensure default location (Miami, FL) exists
const defaultExists = db.prepare(`SELECT * FROM locations WHERE name = 'Miami' AND state = 'Florida'`).get();
if (!defaultExists) {
    db.prepare(`
        INSERT INTO locations (name, state, country, latitude, longitude, selected)
        VALUES ('Miami', 'Florida', 'United States', 25.7617, -80.1918, 1)
    `).run();
}

module.exports = db;