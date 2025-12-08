# Deployment Guide - A+ Auto Centre Website

## Quick Deploy to Netlify (Recommended)

### Method 1: Drag & Drop (Easiest)
1. Go to [netlify.com](https://netlify.com)
2. Sign up for free account (can use GitHub/Google)
3. Click "Add new site" → "Deploy manually"
4. Drag the entire `aplus-auto-site` folder onto the upload area
5. Wait ~30 seconds for deployment
6. You'll get a URL like: `https://random-name-123.netlify.app`
7. Can customize URL in site settings (e.g., `aplus-auto-demo.netlify.app`)

**That's it!** Site is live with HTTPS automatically.

### Method 2: GitHub Deploy (Better for updates)

#### Step 1: Create GitHub Repository
```bash
# In the project directory
git remote add origin https://github.com/YOUR-USERNAME/aplus-auto-site.git
git push -u origin main
```

#### Step 2: Connect to Netlify
1. Go to Netlify → "Add new site" → "Import an existing project"
2. Choose GitHub and authorize
3. Select your `aplus-auto-site` repository
4. Build settings:
   - Build command: (leave empty)
   - Publish directory: `/`
5. Click "Deploy site"

**Benefits:** Every git push automatically deploys updates!

---

## Deploy to Vercel (Alternative)

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "Add New" → "Project"
4. Import your GitHub repository
5. Framework preset: Other
6. Click "Deploy"

---

## Deploy to GitHub Pages

1. In your repository, go to Settings → Pages
2. Source: Deploy from a branch
3. Branch: `main` / `root`
4. Save
5. Site will be at: `https://YOUR-USERNAME.github.io/aplus-auto-site/`

**Note:** May take 2-3 minutes to go live

---

## Custom Domain Setup (After Owner Approves)

### If they want aplusautocentre.ca:

#### Option 1: Transfer to Netlify
1. Netlify Settings → Domain management
2. Add custom domain: `aplusautocentre.ca`
3. Follow DNS setup instructions
4. Netlify provides HTTPS certificate automatically

#### Option 2: Keep Current Registrar
1. Get Netlify's nameservers from site settings
2. Update domain registrar to point to Netlify
3. Wait 24-48 hours for DNS propagation

---

## Pre-Deployment Checklist

Before showing to client:
- [ ] Test on mobile device
- [ ] Test on different browsers
- [ ] Check all links work
- [ ] Verify phone number is clickable
- [ ] Map loads correctly
- [ ] No console errors
- [ ] Fast load time (<3 seconds)

---

## Post-Deployment Updates

### To update the site after deployment:

**If using Netlify drag & drop:**
1. Make changes locally
2. Drag updated folder to Netlify again
3. It replaces the old version

**If using GitHub + Netlify:**
1. Make changes locally
2. Commit: `git add . && git commit -m "Update description"`
3. Push: `git push`
4. Netlify auto-deploys in ~30 seconds

---

## Monitoring & Analytics

### Add Google Analytics (Optional):
1. Create GA4 property at analytics.google.com
2. Get measurement ID (G-XXXXXXXXXX)
3. Add to `<head>` of index.html:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Netlify Analytics:
- Built-in (costs $9/month)
- Shows: page views, top pages, sources
- No code changes needed

---

## Troubleshooting

### Site shows old version
- **Netlify:** Trigger deploy in dashboard
- **Browser:** Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- **Clear cache:** Netlify → Site settings → Build & deploy → Clear cache

### Map not loading
- Check Google Maps embed URL is correct
- Make sure iframe has proper permissions

### Mobile menu not working
- Check `js/main.js` is loading
- Look for errors in browser console (F12)

### Images not showing
- Verify image paths are correct (relative, not absolute)
- Check file names match exactly (case-sensitive)

---

## Performance Optimization (After Launch)

### Image optimization:
```bash
# If images are added later, compress them:
# Use tinypng.com or squoosh.app
# Target: < 200KB per vehicle image
```

### Lighthouse Audit:
1. Open site in Chrome
2. Press F12 → Lighthouse tab
3. Run audit
4. Target scores: 90+ on all metrics

---

## Maintenance Plan Offering

If owner wants you to maintain it:

### **$50/month maintenance package:**
- Update inventory (add/remove vehicles)
- Update pricing
- Add new photos
- Fix any bugs
- Monthly performance check
- Respond within 24 hours

### **$100/month maintenance + updates:**
- Everything in $50 plan
- Monthly content updates
- New features as requested
- Analytics reports
- SEO monitoring

---

## Emergency Contact

If something breaks:
1. Check Netlify status page
2. Roll back to previous deploy in Netlify dashboard
3. Check browser console for errors
4. Contact me: [your contact info]

---

## Next Phase Development

After demo approval, complete remaining pages:
1. Inventory page (4-5 hours)
2. Services page (2-3 hours)
3. About page (2 hours)
4. Contact page (2-3 hours)
5. Polish + testing (2 hours)

**Total:** ~12-15 additional hours

---

**Questions?** Everything is documented in the README.md and architecture docs.
