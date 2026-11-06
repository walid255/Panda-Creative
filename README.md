# Panda Creative - Photo & Cinematography PWA with CMS Admin Panel

An award-winning, luxury Photographer and Videographer Progressive Web App (PWA) with a full client-side CMS Admin Panel, built with **React**, **HTML5**, **Tailwind CSS**, and optimized for **Cloudflare Pages** hosting.

---

## 🐼 Brand Identity & Design System
- **Panda Colors**:
  - Panda Rich Black: `#0c0d0f` / `#121316` / `#18181b`
  - Crisp Pure White: `#ffffff`
  - Charcoal Slate: `#27272a`
  - Bamboo Emerald Accents: `#10b981` (and `#059669`)
- **Typography**: Plus Jakarta Sans, Cinzel (editorial serif), JetBrains Mono.
- **Logos & Icons**:
  - Vector Camera Lens + Panda Emblem Logo: `/public/logo.svg`
  - Favicon & Aperture Shutter Icon: `/public/favicon.svg`
  - High-res PWA PNG icons: `icon-192.png`, `icon-512.png`, `icon-maskable.png`, `apple-touch-icon.png`

---

## 🚀 Key Features

### 1. Navigation & Pages
- **Home (`/`)**: Cinematic hero with 4K showreel trigger, featured photo masterpieces, 4K YouTube cinema reel showcase, service highlights, client praise reviews, expandable FAQ accordion, and booking CTA.
- **About Us (`/about`)**: Studio philosophy, creative director bios, cinema gear breakdown (Sony FX6, Canon R5 C, RED Komodo, DJI Inspire 3 Drone, Cooke Cine Primes).
  - *Includes an interactive **Dropdown Menu** in the header navigation that directly links to **Portfolio**!*
- **Portfolio (`/portfolio`)**: Curated showcase with category filtering, photo lightbox with camera specs, YouTube cinema embeds, and a print stylesheet button.
- **Services (`/services`)**: In-depth breakdown of wedding cinematography, commercial brand films, drone aerials, editorial portraits, music videos, and DaVinci Resolve color grading.
- **Pricing (`/pricing`)**: Transparent pricing tiers (Silver Essential, Gold Signature [Most Popular], Platinum VIP), add-on options, and print-ready investment sheet.
- **Gallery (`/gallery`)**:
  - Filter by **All Media**, **Fine-Art Photos**, or **YouTube 4K Films**.
  - Category filters: Weddings, Commercial, Fashion, Drone, Cinematic.
  - Interactive photo lightbox with zoom and metadata.
  - Responsive 16:9 YouTube video players and cinema theater modal.
- **Contacts (`/contacts`)**: Comprehensive booking form capturing event date, budget, and automatic **UTM campaign tracking**, plus studio address, direct phone/email copy buttons, and WhatsApp chat.
- **Backlink Strategy (`/backlink-strategy`)**: Full SEO backlink blueprint detailing 5 high-DA pillars, target directories, and outreach pitch templates.
- **Custom 404 (`*`)**: Clean, helpful page with panda shutter animation and search integration.

---

### 2. Admin CMS Panel (`/admin`)
> **Crucial Rule Implemented**: The admin login panel is located **ONLY in the footer** (discrete lock icon link in the bottom copyright bar) and nowhere in the main navigation.
- **Password Visibility Toggle**: Show/hide password eye icon toggle on login.
- **Default Passcode**: `panda` (can be changed anytime in Site Settings).
- **Dashboard Overview**: Metrics on total photos, YouTube videos, client inquiries, and newsletter VIPs.
- **Gallery Manager**: Add, edit, or delete fine-art photos and YouTube cinema films.
- **Social Networks Manager**: Fully manage profile links, handles, follower counts, and visibility for **Instagram, YouTube, TikTok, Facebook, Twitter/X, Pinterest, LinkedIn, and WhatsApp**.
- **Site Settings & SEO**: Edit studio brand name, email, phone, address, meta tags, and Google Search Console verification code.
- **Inquiries & UTM Inbox**: Review received client booking inquiries with referral campaign tags and export to CSV.
- **Newsletter Subscribers**: View subscribers and export contact lists.
- **Backup & Reset**: Download JSON database backups, restore from file, or reset to demo defaults with confirmation modal.

---

### 3. Google SEO & Technical Optimization
- **Header Hierarchy**: Strictly **Only 1 `<h1>` tag per page**.
- **Meta Titles & Descriptions**: Dynamically updated on every route change.
- **Canonical Tags**: Automatic `<link rel="canonical">` updating per page.
- **XML Sitemap**: Comprehensive `/public/sitemap.xml` with image namespaces.
- **Robots.txt**: Complete `/public/robots.txt` disallowing `/admin` from indexing.
- **Google Search Console**: Meta tag verification and `/google4e92a83bd0a39a9c.html` file.
- **Structured Data (Schema.org JSON-LD)**:
  - `LocalBusiness` / `Photographer` / `ProfessionalService`
  - `WebSite` with Sitelinks SearchAction
- **Force HTTPS & Cloudflare Headers**: `_headers` file with HSTS preloading, CSP, and MIME types.
- **Clean URL Slugs**: Hyphenated, lowercase slugs with Cloudflare Pages `_redirects` (`/* /index.html 200`).
- **All Images Optimized**: High-res compressed WebP formats with descriptive, keyword-rich `alt` text.

---

### 4. Interactive Web Features
- **Mobile Menu**: Smooth sliding drawer with backdrop blur.
- **Dark Mode Toggle**: Persistent theme switcher with smooth transition.
- **Scroll Back to Top**: Animated button appearing after 300px scroll.
- **Hover States on Buttons**: Micro-interactions, tactile scaling, and glow effects.
- **Full-Site Search**: Instant modal search (`Ctrl+K` / `⌘K`) indexing all pages, gallery items, videos, services, pricing, and FAQs.
- **Floating Contact Button**: Quick drawer for instant WhatsApp, phone, email, and booking.
- **Sticky Help**: Expandable FAQ assistant in the bottom corner.
- **Newsletter Signup**: Validated form with toast feedback.
- **Cookie Banner**: GDPR compliant with Accept All, Decline, and Custom Preferences.
- **Confirmation Modals**: Accessible modals for destructive actions.
- **Print Stylesheet**: Clean `@media print` formatting for quotes and portfolio.
- **UTM Tracking**: Preserves marketing campaign parameters across sessions.
- **Copy to Clipboard Buttons**: One-click copying for phone, email, address, and links.

---

## 🛠️ Development & Production Build

### Install Dependencies
```bash
npm install
```

### Run Local Development Server
```bash
npm run dev
```

### Build for Production (Cloudflare Pages)
```bash
npm run build
```
Outputs static files to `dist/`, fully compiled, minified, and ready for instant deployment.

---

## ☁️ Cloudflare Pages Deployment
1. Connect your repository to **Cloudflare Pages**.
2. Set **Build command**: `npm run build`
3. Set **Build output directory**: `dist`
4. Deploy! Cloudflare Pages will automatically respect `_redirects` for SPA routing and `_headers` for Force HTTPS and security headers.
