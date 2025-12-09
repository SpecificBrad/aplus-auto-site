/**
 * A+ Auto Centre - Backend API Server
 * Express server with SQLite database
 */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { initializeDatabase, getDatabase } = require('./database');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Initialize database
const db = initializeDatabase();

// Configure multer for image uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'uploads'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'vehicle-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|webp/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'));
        }
    }
});

// ============= API ROUTES =============

// GET all vehicles
app.get('/api/vehicles', (req, res) => {
    db.all('SELECT * FROM vehicles ORDER BY createdAt DESC', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // Parse JSON fields
        const vehicles = rows.map(row => ({
            ...row,
            certified: Boolean(row.certified),
            sale: Boolean(row.sale),
            features: row.features ? JSON.parse(row.features) : [],
            images: row.images ? JSON.parse(row.images) : []
        }));

        res.json(vehicles);
    });
});

// GET single vehicle
app.get('/api/vehicles/:id', (req, res) => {
    const { id } = req.params;

    db.get('SELECT * FROM vehicles WHERE id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: 'Vehicle not found' });
        }

        const vehicle = {
            ...row,
            certified: Boolean(row.certified),
            sale: Boolean(row.sale),
            features: row.features ? JSON.parse(row.features) : [],
            images: row.images ? JSON.parse(row.images) : []
        };

        res.json(vehicle);
    });
});

// POST new vehicle
app.post('/api/vehicles', (req, res) => {
    const {
        year, make, model, price, priceType, mileage, vin,
        transmission, fuelType, engine, bodyType, drivetrain,
        certified, sale, description, status, features, imageUrl, images
    } = req.body;

    const sql = `
        INSERT INTO vehicles (
            year, make, model, price, priceType, mileage, vin,
            transmission, fuelType, engine, bodyType, drivetrain,
            certified, sale, description, status, features, imageUrl, images
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
        year, make, model, price, priceType, mileage || 'N/A', vin || '',
        transmission, fuelType || 'Gasoline', engine || '', bodyType || '', drivetrain || '',
        certified ? 1 : 0, sale ? 1 : 0, description || '', status || 'available',
        JSON.stringify(features || []), imageUrl || '', JSON.stringify(images || [])
    ];

    db.run(sql, params, function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: this.lastID, message: 'Vehicle added successfully' });
    });
});

// PUT update vehicle
app.put('/api/vehicles/:id', (req, res) => {
    const { id } = req.params;
    const {
        year, make, model, price, priceType, mileage, vin,
        transmission, fuelType, engine, bodyType, drivetrain,
        certified, sale, description, status, features, imageUrl, images
    } = req.body;

    const sql = `
        UPDATE vehicles SET
            year = ?, make = ?, model = ?, price = ?, priceType = ?, mileage = ?, vin = ?,
            transmission = ?, fuelType = ?, engine = ?, bodyType = ?, drivetrain = ?,
            certified = ?, sale = ?, description = ?, status = ?, features = ?, imageUrl = ?, images = ?,
            updatedAt = CURRENT_TIMESTAMP
        WHERE id = ?
    `;

    const params = [
        year, make, model, price, priceType, mileage || 'N/A', vin || '',
        transmission, fuelType || 'Gasoline', engine || '', bodyType || '', drivetrain || '',
        certified ? 1 : 0, sale ? 1 : 0, description || '', status || 'available',
        JSON.stringify(features || []), imageUrl || '', JSON.stringify(images || []),
        id
    ];

    db.run(sql, params, function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Vehicle not found' });
        }
        res.json({ message: 'Vehicle updated successfully' });
    });
});

// DELETE vehicle
app.delete('/api/vehicles/:id', (req, res) => {
    const { id } = req.params;

    db.run('DELETE FROM vehicles WHERE id = ?', [id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Vehicle not found' });
        }
        res.json({ message: 'Vehicle deleted successfully' });
    });
});

// POST upload image
app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ imageUrl, filename: req.file.filename });
});

// GET export vehicle-data.js
app.get('/api/export/vehicle-data', (req, res) => {
    db.all('SELECT * FROM vehicles WHERE status = "available" ORDER BY createdAt DESC', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const vehicles = rows.map(row => ({
            id: row.id,
            year: row.year,
            make: row.make,
            model: row.model,
            price: row.price,
            priceType: row.priceType,
            mileage: row.mileage,
            vin: row.vin,
            transmission: row.transmission,
            fuelType: row.fuelType,
            engine: row.engine,
            bodyType: row.bodyType,
            drivetrain: row.drivetrain,
            certified: Boolean(row.certified),
            sale: Boolean(row.sale),
            features: row.features ? JSON.parse(row.features) : [],
            description: row.description,
            status: row.status,
            imageUrl: row.imageUrl,
            images: row.images ? JSON.parse(row.images) : []
        }));

        const jsContent = `/**
 * A+ Auto Centre - Vehicle Inventory Data
 * Last Updated: ${new Date().toLocaleDateString()}
 * Generated from database
 */

const vehicleInventory = ${JSON.stringify(vehicles, null, 4)};

// Export for use in inventory page
if (typeof module !== 'undefined' && module.exports) {
    module.exports = vehicleInventory;
}
`;

        res.setHeader('Content-Type', 'application/javascript');
        res.setHeader('Content-Disposition', 'attachment; filename="vehicle-data.js"');
        res.send(jsContent);
    });
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
    console.log(`\n🚗 A+ Auto Centre API Server`);
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`📊 Database: SQLite (vehicles.db)`);
    console.log(`📁 Uploads: backend/uploads/`);
    console.log(`\nAPI Endpoints:`);
    console.log(`  GET    /api/vehicles          - Get all vehicles`);
    console.log(`  GET    /api/vehicles/:id      - Get single vehicle`);
    console.log(`  POST   /api/vehicles          - Add new vehicle`);
    console.log(`  PUT    /api/vehicles/:id      - Update vehicle`);
    console.log(`  DELETE /api/vehicles/:id      - Delete vehicle`);
    console.log(`  POST   /api/upload            - Upload image`);
    console.log(`  GET    /api/export/vehicle-data - Export vehicle-data.js`);
    console.log(`\n`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('\n👋 Database connection closed');
        process.exit(0);
    });
});
