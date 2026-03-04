# FrqBit AI — Vocab Memory AI Store

Selling page for **Vocab Memory AI** — an AI-powered vocabulary learning app with 15 science-backed methods. Stripe-enabled checkout.

**Live site:** [https://frqbitai.com](https://frqbitai.com)
**Product:** [https://vocab-memory-ai.vercel.app](https://vocab-memory-ai.vercel.app)

---

## 💳 Stripe Payment Setup (REQUIRED)

### Step 1: Create a Stripe Account
1. Go to [https://dashboard.stripe.com/register](https://dashboard.stripe.com/register)
2. Complete account verification

### Step 2: Get Your API Keys
1. Go to [https://dashboard.stripe.com/apikeys](https://dashboard.stripe.com/apikeys)
2. Copy your **Publishable Key** (starts with `pk_test_` or `pk_live_`)
3. Open `js/main.js` and replace the placeholder:
   ```js
   publishableKey: 'pk_test_XXXXXXXXXXXXXXXXXXXXXXXX',
   // Replace with your actual key:
   publishableKey: 'pk_live_YourActualKeyHere',
   ```

### Step 3: Create Products & Prices in Stripe
1. Go to [https://dashboard.stripe.com/products](https://dashboard.stripe.com/products)
2. Click **+ Add Product** and create:

   | Product Name | Price | Billing |
   |---|---|---|
   | Vocab Memory AI — Starter | $5.00 | Monthly recurring |
   | Vocab Memory AI — Pro | $12.00 | Monthly recurring |
   | Vocab Memory AI — Pro Annual | $84.00 | Yearly recurring |

3. After creating each price, copy the **Price ID** (starts with `price_`)
4. In `js/main.js`, replace the placeholder Price IDs:
   ```js
   priceIds: {
       starter_monthly: 'price_1Abc...',  // Your Starter price ID
       pro_monthly:     'price_1Def...',  // Your Pro price ID
       pro_annual:      'price_1Ghi...',  // Your Annual price ID
   },
   ```
5. Also update the `data-stripe-price` attributes in `index.html` pricing buttons

### Step 4: Configure Checkout Settings
1. In Stripe Dashboard → Settings → [Checkout](https://dashboard.stripe.com/settings/checkout)
2. Add your domain `frqbitai.com` to allowed domains
3. Enable "Customer emails" to send receipts

### Step 5: Go Live
1. Switch from Test to Live mode in Stripe Dashboard
2. Replace `pk_test_` key with `pk_live_` key in `js/main.js`
3. Replace test Price IDs with live Price IDs

> **💡 Simpler Alternative:** Use [Stripe Payment Links](https://dashboard.stripe.com/payment-links) — create payment links in Stripe Dashboard and replace the button `onclick` handlers with direct links. No API keys needed!

---

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
├── index.html       # Main selling page with pricing
├── success.html     # Post-checkout success page
├── css/
│   └── style.css    # All styles
├── js/
│   └── main.js      # Stripe checkout + interactions
├── CNAME            # Custom domain for GitHub Pages
├── .gitignore
└── README.md
```

## ✨ Features

- 🎨 Vibrant dark theme with purple/pink gradient accents
- 💳 Stripe Checkout integration for subscriptions
- 🧠 Vocab Memory AI product showcase with 15 learning methods
- 💰 4 pricing tiers (Free, Starter, Pro, Annual)
- 🛒 Shopping cart with localStorage persistence
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚡ Animated hero with floating particles
- ⏰ Countdown timer for promotions
- 📧 Newsletter subscription form
- 🔔 Toast notifications
- 🚀 Smooth scroll & scroll animations
- 🔒 Trust badges & secure checkout UI
