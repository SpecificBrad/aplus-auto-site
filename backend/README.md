# A+ Auto Centre - Backend API

Node.js + Express + SQLite backend for vehicle inventory management.

## Features

- ✅ RESTful API for CRUD operations on vehicles
- ✅ SQLite database (no server required)
- ✅ Image upload support
- ✅ Export vehicle-data.js for website
- ✅ CORS enabled for local development

## Installation

1. Install dependencies:
```bash
npm install
```

## Running the Server

Start the backend server:
```bash
npm start
```

Server will run on: `http://localhost:3000`

## API Endpoints

### Vehicles

- **GET** `/api/vehicles` - Get all vehicles
- **GET** `/api/vehicles/:id` - Get single vehicle by ID
- **POST** `/api/vehicles` - Create new vehicle
- **PUT** `/api/vehicles/:id` - Update vehicle
- **DELETE** `/api/vehicles/:id` - Delete vehicle

### Upload

- **POST** `/api/upload` - Upload vehicle image

### Export

- **GET** `/api/export/vehicle-data` - Download vehicle-data.js file

### Health Check

- **GET** `/api/health` - Server health status

## Database

- **Type**: SQLite
- **File**: `backend/vehicles.db`
- **Auto-created** on first run

### Schema

```sql
CREATE TABLE vehicles (
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
```

## Usage with Admin Portal

1. Start the backend server: `npm start`
2. Open `admin.html` in browser
3. Update the script reference to use `admin-api.js`:
   ```html
   <script src="js/admin-api.js"></script>
   ```
4. Add, edit, and manage vehicles through the UI
5. Export vehicle-data.js when ready

## Deployment to Production

### For Hostinger (PHP + MySQL)

The Node.js backend is for **development only**. For production on Hostinger:

1. **Create MySQL database** in cPanel
2. **Convert to PHP backend** (see `backend-php/` for conversion)
3. **Upload to Hostinger**
4. **Update API_URL** in admin-api.js to point to your domain

### Converting SQLite to MySQL

Export data from SQLite:
```bash
sqlite3 backend/vehicles.db .dump > vehicles.sql
```

Then import to MySQL and adjust SQL syntax as needed.

## File Structure

```
backend/
├── server.js          # Express server and API routes
├── database.js        # SQLite database configuration
├── vehicles.db        # SQLite database file (auto-created)
├── uploads/           # Uploaded vehicle images
└── README.md          # This file
```

## Environment Variables

No environment variables required for development. All settings are in `server.js`.

For production, consider adding:
- `PORT` - Server port (default: 3000)
- `DATABASE_PATH` - Custom database location
- `UPLOAD_DIR` - Custom upload directory

## Troubleshooting

**Server won't start:**
- Check if port 3000 is available
- Run `npm install` to ensure dependencies are installed

**Can't connect from admin portal:**
- Ensure server is running (`npm start`)
- Check CORS settings if accessing from different domain
- Verify API_URL in admin-api.js matches server address

**Database errors:**
- Delete `vehicles.db` to reset (will lose data)
- Check file permissions on backend directory

## Development vs Production

| Feature | Development (Node.js) | Production (PHP) |
|---------|----------------------|------------------|
| Database | SQLite | MySQL |
| Server | Node.js + Express | Apache + PHP |
| Setup | `npm start` | Upload to hosting |
| Cost | Free | Hosting plan |
| Speed | Fast | Fast |
| Scalability | Limited | Good |

## Next Steps

1. ✅ Backend API running
2. ✅ Admin portal connected
3. ⬜ Test all CRUD operations
4. ⬜ Add authentication (if needed)
5. ⬜ Convert to PHP for production
6. ⬜ Deploy to Hostinger
