# Admin Portal - Two Versions Guide

## ✅ Fixed! GitHub Pages Demo Now Works

The admin portal now works on GitHub Pages with pre-loaded demo data.

## Two Versions Available

### 1. **localStorage Version (admin.js)** ← Currently Active
**Best for:** GitHub Pages demo, testing, no backend needed

**How it works:**
- Saves data in browser localStorage
- Pre-loads 5 existing vehicles automatically on first visit
- All edits saved to browser only
- No server or database required

**Limitations:**
- Data only in that browser/device
- Lost if browser cache is cleared
- Can't sync across devices

**Currently used by:** GitHub Pages (https://specificbrad.github.io)

---

### 2. **Database Version (admin-api.js)**
**Best for:** Local development with persistent database

**How it works:**
- Connects to Node.js backend API
- Saves to SQLite database
- Persistent storage
- Full CRUD operations

**Requirements:**
- Backend server must be running (`npm start`)
- Only works on localhost

**Used for:** Local vehicle management by owner

---

## How to Switch Between Versions

Edit `admin.html` line 724-725:

**For GitHub Pages / Demo (No Backend):**
```html
<script src="js/vehicle-data.js"></script>
<script src="js/admin.js"></script>
```

**For Local Development (With Backend):**
```html
<!-- <script src="js/vehicle-data.js"></script> -->
<script src="js/admin-api.js"></script>
```

---

## Recommended Workflow

### For Owner (Managing Real Inventory)

1. **Work Locally with Database:**
   ```bash
   # Switch to database version
   # Edit admin.html to use admin-api.js
   npm start  # Start backend
   # Open admin.html locally
   # Add/edit vehicles
   ```

2. **Export to Website:**
   - Click "Export Tools" → "Website Data"
   - Download `vehicle-data.js`
   - Replace `js/vehicle-data.js` in repository
   - Commit and push to update live site

3. **Live Site Updates Automatically:**
   - GitHub Pages serves updated vehicle-data.js
   - Inventory page shows new vehicles
   - Admin demo also shows updated vehicles

### For Demonstration (GitHub Pages)

- ✅ Works out of the box
- ✅ Pre-loaded with 5 vehicles
- ✅ Fully functional (add/edit/delete)
- ❌ Changes not permanent (localStorage only)

---

## Current Configuration

| Component | Version | Location | Works Where |
|-----------|---------|----------|-------------|
| Admin Portal | localStorage | GitHub Pages | ✅ Online demo |
| Admin Portal | Database | Local dev | ✅ Owner's computer |
| Backend API | Node.js | Local | ✅ Development |
| Website | Static | GitHub Pages | ✅ Live site |

---

## What's Been Fixed

✅ **Before:** Admin portal showed "Error loading vehicles" on GitHub Pages
✅ **After:** Admin portal works with pre-loaded demo data
✅ **Bonus:** Automatically loads 5 existing vehicles on first visit

---

## Testing the Fix

Visit: https://specificbrad.github.io/admin.html

**You should see:**
- No error message
- 5 vehicles in "Manage Vehicles" tab
- Fully functional add/edit/delete
- Working export tools

---

## Future Production Options

When ready for full production on Hostinger:

**Option A: PHP Backend (Recommended for Hostinger)**
- Convert Node.js to PHP
- Use MySQL instead of SQLite
- Upload to Hostinger
- Full database-backed admin online

**Option B: Keep Current Hybrid**
- Owner manages locally with database
- Exports vehicle-data.js periodically
- Manual but functional

**Option C: Cloud Backend**
- Deploy Node.js to Railway/Render
- Update API URL in admin-api.js
- Database admin works online

---

## Quick Reference

**Start Backend (Local):**
```bash
npm start
```

**Import Existing Vehicles:**
```bash
node backend/import-vehicles.js
```

**Switch to Database Version:**
Edit admin.html line 724-725, change to admin-api.js

**Switch to Demo Version:**
Edit admin.html line 724-725, change to admin.js

---

## Summary

✅ **GitHub Pages (Live):** localStorage version with demo data
✅ **Local Development:** Database version for real management
✅ **Both working** and ready to use!
