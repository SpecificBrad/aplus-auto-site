# A+ Auto Centre - PHP API Backend

## 📁 Structure

```
api/
├── config/
│   └── database.php          # Database configuration
├── models/
│   └── Vehicle.php            # Vehicle model class
├── vehicles/
│   ├── read.php               # GET all vehicles
│   ├── create.php             # POST new vehicle
│   ├── update.php             # PUT update vehicle
│   ├── delete.php             # DELETE vehicle
│   └── export.php             # Export to vehicle-data.js
└── upload.php                 # Image upload handler
```

## 🔧 Configuration

1. **Update database credentials** in `api/config/database.php`:
   - Database name: `u948234398_inventory`
   - Username: `u948234398_admin`
   - Password: `YOUR_PASSWORD_HERE`

2. **Create uploads directory**:
   - Directory: `/uploads/`
   - Permissions: 755

## 🚀 API Endpoints

### Vehicles

- **GET** `/api/vehicles/read.php` - Get all vehicles
- **POST** `/api/vehicles/create.php` - Create new vehicle
- **PUT** `/api/vehicles/update.php` - Update vehicle
- **DELETE** `/api/vehicles/delete.php` - Delete vehicle
- **GET** `/api/vehicles/export.php` - Export to vehicle-data.js

### Upload

- **POST** `/api/upload.php` - Upload vehicle image

## 📤 Deployment to Hostinger

1. Upload entire `api/` folder to `/public_html/api/`
2. Create `/public_html/uploads/` directory with 755 permissions
3. Update database password in `api/config/database.php`
4. Test endpoints:
   - Visit: `https://aplusautonl.com/api/vehicles/read.php`

## 🔒 Security

- CORS headers configured for cross-origin requests
- Input sanitization on all endpoints
- PDO prepared statements to prevent SQL injection
- File upload validation (type, size)

## 📝 Usage Example

```javascript
// Fetch all vehicles
fetch('https://aplusautonl.com/api/vehicles/read.php')
    .then(response => response.json())
    .then(data => console.log(data));

// Create new vehicle
fetch('https://aplusautonl.com/api/vehicles/create.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        year: 2020,
        make: 'Honda',
        model: 'Civic',
        price: 18500,
        priceType: 'Firm',
        transmission: 'Automatic',
        // ... other fields
    })
});
```

## ✅ Testing Checklist

- [ ] Database connection successful
- [ ] Read all vehicles returns empty array
- [ ] Create vehicle works
- [ ] Update vehicle works
- [ ] Delete vehicle works
- [ ] Export generates vehicle-data.js
- [ ] Image upload works
