# Hostinger Deployment Instructions

## 📦 Deployment Package Ready

A ready-to-upload package has been created: `hostinger-deployment.zip` (41KB)

---

## 🚀 Quick Deployment Steps

### Method 1: File Manager (Easiest)

**1. Download the Deployment Package**
- The file `hostinger-deployment.zip` contains everything needed
- Download it from your repository

**2. Login to Hostinger**
- Go to: https://hpanel.hostinger.com
- Navigate to your website

**3. Open File Manager**
- Click on "File Manager" in hPanel
- Navigate to `public_html/` (or your domain folder)

**4. Upload & Extract**
- Click "Upload" button
- Upload `hostinger-deployment.zip`
- Right-click the uploaded zip → "Extract"
- Delete the zip file after extraction

**5. Done!**
- Visit your domain to see the live site
- All pages should work immediately

---

### Method 2: FTP Upload

**1. Get FTP Credentials**
- In Hostinger hPanel → "FTP Accounts"
- Create FTP account or use existing
- Note: Host, Username, Password, Port

**2. Connect with FTP Client**
Using FileZilla or any FTP client:
```
Host: ftp.yourdomain.com
Username: your-ftp-username@yourdomain.com
Password: your-password
Port: 21
```

**3. Upload Files**
- Connect to server
- Navigate to `public_html/`
- Upload contents of `hostinger-deploy/` folder
- Wait for upload to complete

**4. Verify**
- Visit your domain
- Check all pages load correctly

---

## 📁 What's Included in Package

✅ **Website Files:**
- index.html (Homepage)
- inventory.html (Vehicle listings)
- services.html (Services page)
- about.html (About page)
- contact.html (Contact form)
- admin.html (Admin portal - localStorage version)

✅ **Assets:**
- css/ (All stylesheets)
- js/ (All scripts including vehicle-data.js)
- images/ (All images)
- .nojekyll (GitHub Pages compatibility)

❌ **NOT Included (Not Needed):**
- backend/ (Node.js - won't work on shared hosting)
- node_modules/
- package.json
- Development files

---

## ⚙️ Post-Deployment Setup

### 1. Test Everything
- [ ] Homepage loads
- [ ] All navigation links work
- [ ] Inventory page displays vehicles
- [ ] Services page loads
- [ ] About page loads
- [ ] Contact page loads
- [ ] Images display correctly
- [ ] Mobile responsive works

### 2. SSL Certificate
- In Hostinger hPanel → SSL
- Enable free SSL certificate
- Wait 15-30 minutes for activation

### 3. Set Up Email (Optional)
- Create email accounts (contact@yourdomain.com)
- Configure email forwarding

### 4. Domain Configuration
- Ensure domain points to Hostinger nameservers
- Check DNS settings

---

## 🔒 Admin Portal Considerations

The `admin.html` file is included but uses **localStorage only** (no database).

### Security Recommendations:

**Option A: Password Protect Admin Folder**
Create `.htaccess` in same folder as admin.html:
```apache
AuthType Basic
AuthName "Admin Access Only"
AuthUserFile /path/to/.htpasswd
Require valid-user
```

**Option B: Move Outside Public Directory**
- Keep admin.html on your computer only
- Don't upload to Hostinger
- Manage inventory locally

**Option C: Remove Admin from Public Site**
- Delete admin.html after upload
- Use local version for inventory management
- Upload updated vehicle-data.js when needed

---

## 🔄 Updating the Site

### When Inventory Changes:

**1. Update Locally**
- Run backend locally: `npm start`
- Open admin.html
- Update vehicles
- Export vehicle-data.js

**2. Upload New Data**
- Via File Manager: Upload new `js/vehicle-data.js`
- Or via FTP: Replace existing file
- Changes appear immediately

### When Pages Change:
- Update files in repository
- Download changed files
- Upload to Hostinger
- Refresh browser

---

## 🆘 Troubleshooting

**Site shows old content:**
- Clear browser cache (Ctrl + Shift + R)
- Check you uploaded to correct folder

**Images not loading:**
- Verify images/ folder uploaded
- Check file paths are correct
- Ensure filenames match (case-sensitive on Linux)

**CSS not working:**
- Verify css/ folder uploaded
- Check browser console for 404 errors

**Contact form not sending emails:**
- Form currently shows alert only
- Need to add PHP email handler (separate task)

---

## 📊 File Structure on Hostinger

```
public_html/
├── index.html
├── inventory.html
├── services.html
├── about.html
├── contact.html
├── admin.html
├── .nojekyll
├── css/
│   └── styles.css
├── js/
│   ├── main.js
│   ├── vehicle-data.js
│   ├── admin.js
│   └── admin-api.js
└── images/
    └── vehicles/
```

---

## ✅ Deployment Checklist

**Before Upload:**
- [ ] Download hostinger-deployment.zip
- [ ] Have Hostinger login credentials ready
- [ ] Know your domain folder location

**During Upload:**
- [ ] Connect to Hostinger
- [ ] Navigate to public_html/
- [ ] Upload and extract files
- [ ] Verify all files present

**After Upload:**
- [ ] Test website on domain
- [ ] Check all pages work
- [ ] Enable SSL certificate
- [ ] Remove or secure admin.html
- [ ] Test on mobile devices

---

## 🎯 Next Steps After Deployment

1. **Enable SSL** - Free HTTPS certificate
2. **Set up email** - contact@yourdomain.com
3. **Configure contact form** - Add PHP email handler
4. **SEO setup** - Submit to Google Search Console
5. **Analytics** - Add Google Analytics (optional)
6. **Backup** - Set up automatic backups in Hostinger

---

## 💡 Need Help?

**Hostinger Support:**
- 24/7 Live Chat in hPanel
- Knowledge Base: https://support.hostinger.com

**Common Hostinger Docs:**
- File Manager: https://support.hostinger.com/en/articles/1583261
- FTP Setup: https://support.hostinger.com/en/articles/1583187
- SSL Setup: https://support.hostinger.com/en/articles/1583256

---

## 📝 Summary

✅ **Website ready to deploy**
✅ **All files packaged**
✅ **No API needed - manual upload only**
✅ **Should take 10-15 minutes total**

The site will work immediately on Hostinger with full functionality (except database-backed admin, which requires PHP conversion).
