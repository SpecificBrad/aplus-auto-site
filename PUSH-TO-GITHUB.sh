#!/bin/bash
# Quick GitHub Push Script
# Run this from your aplus-auto-site folder

echo "═══════════════════════════════════════════"
echo "  Pushing to GitHub..."
echo "═══════════════════════════════════════════"
echo ""

# Check if we're in the right place
if [ ! -f "index.html" ]; then
    echo "Error: Run this script from the aplus-auto-site folder"
    exit 1
fi

# Check if remote exists
if ! git remote | grep -q origin; then
    echo "Adding GitHub remote..."
    git remote add origin https://github.com/SpecificBrad/aplus-auto-site.git
fi

# Push to GitHub
echo "Pushing to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✓ SUCCESS!"
    echo ""
    echo "Your site is now at:"
    echo "https://github.com/SpecificBrad/aplus-auto-site"
    echo ""
    echo "To enable GitHub Pages (free hosting):"
    echo "1. Go to: https://github.com/SpecificBrad/aplus-auto-site/settings/pages"
    echo "2. Under 'Source', select: main branch, / (root)"
    echo "3. Click Save"
    echo "4. Your site will be live at: https://specificbrad.github.io/aplus-auto-site/"
else
    echo ""
    echo "Push failed. You may need to:"
    echo "1. Create the repository first at: https://github.com/new"
    echo "2. Or authenticate with: gh auth login"
fi
