# FrqBit AI — E-Commerce Website

A vibrant, modern e-commerce website for selling digital products and more.

**Live site:** [https://frqbitai.com](https://frqbitai.com)

## 🚀 Deploy to GitHub Pages

### First-time setup:
```bash
git init
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git add .
git commit -m "Initial launch 🚀"
git branch -M main
git push -u origin main
```

Then go to **GitHub → Repository → Settings → Pages** and set:
- **Source:** Deploy from a branch
- **Branch:** `main` / `/ (root)`

### Subsequent updates:
```bash
git add .
git commit -m "Update site"
git push
```

### Custom Domain Setup:
1. In GitHub Pages settings, set custom domain to `frqbitai.com`
2. In your domain registrar's DNS, add:
   - **A Records** pointing to GitHub Pages IPs:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - **CNAME Record:** `www` → `YOUR_USERNAME.github.io`
3. Enable "Enforce HTTPS" in GitHub Pages settings

## 📁 Project Structure

```
my-webpage/
├── index.html       # Main webpage
├── css/
│   └── style.css    # All styles
├── js/
│   └── main.js      # Interactive features
├── CNAME            # Custom domain for GitHub Pages
├── .gitignore
└── README.md
```

## ✨ Features

- 🎨 Vibrant dark theme with purple/pink gradient accents
- 🛒 Shopping cart with localStorage persistence
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚡ Animated hero with floating particles
- 🏷️ Product filtering by category
- ⏰ Countdown timer for promotions
- 📧 Newsletter subscription form
- 🔔 Toast notifications
- 🚀 Smooth scroll & scroll animations
- 💳 Payment icons & checkout-ready UI
