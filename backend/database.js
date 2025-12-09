/**
 * A+ Auto Centre - Database Configuration
 * SQLite database setup and initialization
 */

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = path.join(__dirname, 'vehicles.db');

// Create and initialize database
function initializeDatabase() {
    const db = new sqlite3.Database(DB_PATH, (err) => {
        if (err) {
            console.error('Error opening database:', err.message);
        } else {
            console.log('Connected to SQLite database');
        }
    });

    // Create vehicles table
    db.run(`
        CREATE TABLE IF NOT EXISTS vehicles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            year INTEGER NOT NULL,
            make TEXT NOT NULL,
            model TEXT NOT NULL,
            price INTEGER NOT NULL,
            priceType TEXT NOT NULL,
            mileage TEXT,
            vin TEXT,
            transmission TEXT NOT NULL,
            fuelType TEXT,
            engine TEXT,
            bodyType TEXT,
            drivetrain TEXT,
            certified INTEGER DEFAULT 0,
            sale INTEGER DEFAULT 0,
            description TEXT,
            status TEXT DEFAULT 'available',
            features TEXT,
            imageUrl TEXT,
            images TEXT,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `, (err) => {
        if (err) {
            console.error('Error creating table:', err.message);
        } else {
            console.log('Vehicles table ready');
        }
    });

    return db;
}

// Get database connection
function getDatabase() {
    return new sqlite3.Database(DB_PATH);
}

module.exports = {
    initializeDatabase,
    getDatabase
};
