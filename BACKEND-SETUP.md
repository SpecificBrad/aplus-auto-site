# Backend Setup Guide

## Quick Start (Development)

### 1. Start the Backend Server

```bash
npm start
```

You should see:
```
🚗 A+ Auto Centre API Server
✅ Server running on http://localhost:3000
📊 Database: SQLite (vehicles.db)
```

### 2. Open Admin Portal

Open `admin.html` in your web browser. The admin portal is now connected to the backend API.

### 3. Add Vehicles

1. Fill out the vehicle form
2. Upload up to 8 images
3. Click "Save Vehicle"
4. Data is saved to SQLite database

### 4. Export for Website

1. Click "Export Tools" tab
2. Click "Download" under "Website Data"
3. Upload the `vehicle-data.js` file to your `js/` folder

## File Versions

### Two Admin Versions Available

**1. admin.js (Demo - localStorage)**
- Saves data in browser only
- No backend required
- Good for testing/demo
- Data lost when browser cache clears

**2. admin-api.js (Production - Database)**
- Saves to SQLite database
- Requires backend server running
- Data persists permanently
- **Currently active** in admin.html

### Switch Between Versions

Edit `admin.html` line 722:

```html
<!-- For demo (no server needed): -->
<script src="js/admin.js"></script>

<!-- For database (server required): -->
<script src="js/admin-api.js"></script>
```

## Production Deployment

### For Hostinger with PHP + MySQL

The Node.js backend is for **development and testing only**.

For production on Hostinger, you'll need:

1. **PHP backend** (Node.js may not be available)
2. **MySQL database** (instead of SQLite)
3. **Image upload handling** (PHP)

### Migration Path

```
Development (Now)          Production (Hostinger)
─────────────────          ──────────────────────
Node.js + Express    →     Apache + PHP
SQLite database      →     MySQL database
localhost:3000       →     yourdomain.com/api
```

## Database Location

- **File**: `backend/vehicles.db`
- **Type**: SQLite (single file database)
- **Backup**: Just copy `vehicles.db` file

## Image Storage

- **Location**: `backend/uploads/`
- **Format**: Images stored as Base64 in database
- **For production**: Upload to server and store URLs

## API Testing

Test the API is working:

```bash
# Health check
curl http://localhost:3000/api/health

# Get all vehicles
curl http://localhost:3000/api/vehicles

# Get single vehicle
curl http://localhost:3000/api/vehicles/1
```

## Troubleshooting

**"Failed to load vehicles" error:**
- Make sure backend server is running (`npm start`)
- Check console for errors (F12 in browser)

**Can't upload images:**
- Check `backend/uploads/` folder exists
- Verify file size under 10MB

**Port 3000 already in use:**
- Stop other servers using port 3000
- Or change PORT in `backend/server.js`

## Next Steps

1. ✅ Backend running locally
2. ⬜ Test adding/editing/deleting vehicles
3. ⬜ Export vehicle-data.js and test on website
4. ⬜ Plan migration to PHP for Hostinger
5. ⬜ Add password protection to admin portal

## Architecture

```
┌─────────────────┐
│   admin.html    │  ← User interface
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  admin-api.js   │  ← Frontend logic
└────────┬────────┘
         │ HTTP requests
         ▼
┌─────────────────┐
│   Express API   │  ← Backend server
│  (server.js)    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ SQLite Database │  ← Data storage
│  (vehicles.db)  │
└─────────────────┘
```

## What You Have Now

✅ **Full working system** for development
✅ **Admin portal** connected to database
✅ **Image uploads** functional
✅ **Export tools** for Facebook, Kijiji, NL Classifieds
✅ **Vehicle-data.js** generator for website

## What's Next for Production

⬜ Convert Node.js API to PHP
⬜ Set up MySQL database on Hostinger
⬜ Upload PHP files to server
⬜ Update admin portal API URL
⬜ Test on live server
