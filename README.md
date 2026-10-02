# Full-Stack Engineering Portfolio & Capstone E-Commerce System

> Production-grade Web Development Capstone Project and Personal Portfolio of **Thalal Hasmi S** — AI & Data Science Engineer (B.Tech 3rd Year, Velammal College of Engineering and Technology).

---

## 🌟 Project Overview

This repository houses a comprehensive, production-ready Web Development Capstone application engineered to demonstrate modern frontend architecture, client-side routing, asynchronous REST API integration, state management, accessibility compliance, and performance optimization.

The project features a **Developer Hardware & AI Gear E-Commerce Catalog** as its central capstone feature, seamlessly unified with prior engineering assignments including an interactive client-side **To-Do Management System**, a real-time meteorological **Weather Dashboard**, and an accredited **Engineering Portfolio**.

---

## 🚀 Key Features

### 1. Developer E-Commerce Product Catalog (Capstone Feature)
- **Product Catalog Grid**: Realistic developer hardware, AI edge accelerators (NVIDIA Jetson, Google Coral), single-board computers, mechanical keyboards, 4K monitors, and technical engineering literature.
- **Search & Multi-Criteria Filtering**:
  - Instant text search across titles, brands, and technical descriptions with clear controls.
  - Category filtration (*AI & Edge Hardware*, *Developer Gear*, *Peripherals & Displays*, *Technical Literature*, *Storage & Power*).
  - Price slider filter ($40 – $600+) and customer rating filter (★ 4.5+, ★ 4.8+).
  - In-stock availability toggle.
  - Multi-option sorting (Featured, Price: Low to High, Price: High to Low, Rating, Alphabetical).
- **Dedicated Product Details Page (`/shop/product/:id`)**:
  - High-resolution interactive image gallery with thumbnails.
  - Live inventory status and stock level indicator.
  - Comprehensive hardware/system specifications table.
  - Key engineering features checklist.
  - Quantity selector with stock boundary clamping.
  - Frequently explored together / related product recommendations.
  - Graceful 404 handling for invalid or non-existent product IDs.
- **Real-Time Shopping Cart State Management (`/cart`)**:
  - Global `CartProvider` context with custom `useCart` hook.
  - Structured `window.localStorage` persistence (`portfolio_capstone_cart_v1`).
  - Add, remove, increment, and decrement item quantities.
  - Real-time calculations: subtotal, free shipping over $100, sales tax (8.25%), and order total.
  - Promotional discount engine with educational codes (`CAPSTONE20` for 20% off, `STUDENT` for 15% off, `DEAL10` for 10% off).
  - Interactive Express Checkout simulation modal with generated order ID and confirmation state.
  - Dynamic navbar cart counter badge updating across all pages.
  - Non-intrusive bottom-right toast notification on product addition with direct checkout action.

### 2. Client-Side Routing & SPA Architecture (React Router)
- Seamless navigation without full-page browser reloads using `react-router-dom`.
- Complete route manifest:
  - `/` — Portfolio Overview & Hero Landmark
  - `/about` — Biography, Academic Record & Degrees
  - `/skills` — Technical Capabilities, Programming Languages & Core Competencies
  - `/projects` — Featured Software & Machine Learning Projects
  - `/experience` — Practical Internships (Pydun Technology, SK Tech Forage)
  - `/certifications` — Accredited Credentials & Hackathon Awards
  - `/shop` — Developer E-Commerce Catalog
  - `/shop/product/:id` — Dedicated Product Detail View
  - `/cart` — Shopping Cart & Checkout System
  - `/weather` — Real-Time Meteorological Dashboard (REST API)
  - `/todo` — Client-Side To-Do Application (Vanilla JS)
  - `/contact` — Accessible Contact Form
  - `*` — Custom 404 Not Found Page with recovery navigation
- Legacy hash URL backward compatibility (`/#todo`, `/#weather`, `/#shop` automatically resolve to clean routes).

### 3. Asynchronous JavaScript & RESTful APIs (Weather Dashboard)
- Live weather telemetry retrieved from global meteorological stations via Open-Meteo REST APIs.
- Built using native browser `fetch()` and `async/await` syntax without hardcoded values.
- WMO meteorological weather code interpretation and dynamic SVG iconography.
- 2D CSS Grid telemetry cards: Relative Humidity, Wind Velocity & Direction, MSL Barometric Pressure, Precipitation, Cloud Cover, and Solar Horizon (Sunrise/Sunset).
- 7-Day synoptic weather forecast with high/low temperature projections.
- Browser Geolocation API (`navigator.geolocation`) with reverse geocoding.
- Temperature unit conversion (°C / °F) with `localStorage` persistence.
- Clickable recent search history chips.

### 4. Client-Side State Management (Vanilla To-Do List)
- Pure Vanilla JavaScript engine mounted inside the React DOM tree.
- Full CRUD capabilities: Create, Read, Update (in-place inline editing), and Delete.
- Structured JSON persistence via `window.localStorage`.
- State filters: *All*, *Active*, and *Completed* tasks.
- Event delegation on dynamic DOM elements with memory-safe cleanup.

### 5. Advanced CSS3, Responsive Architecture & Accessibility
- **CSS Grid & Flexbox**: Two-dimensional card grids, localized component flex clusters, and responsive multi-column layouts.
- **CSS Variables & Theming**: Native Light Mode and Dark Mode with immediate contrast switching.
- **WCAG 2.2 AA Compliance**:
  - Semantic HTML5 landmarks (`<header role="banner">`, `<main role="main">`, `<footer role="contentinfo">`, `<nav>`, `<aside>`).
  - Screen reader announcements via ARIA live regions (`aria-live="polite"`).
  - Skip to Main Content and Skip to Navigation accessibility shortcuts.
  - Visible `focus-visible` focus rings on all interactive elements.
  - `prefers-reduced-motion` responsive support.
  - Custom Accessibility Auditor toolbar (high contrast mode, text magnification, focus highlighter).

---

## 🛠️ Technologies Used

| Category | Technologies |
|---|---|
| **Core Framework** | React 19, TypeScript 5+, Vite 8 |
| **Routing** | React Router (`react-router-dom` v7) |
| **Styling & Design** | Tailwind CSS v4, Advanced CSS3, CSS Custom Properties |
| **Icons & Visuals** | Lucide React, SVG Micro-illustrations |
| **Asynchronous APIs** | Native Browser Fetch API, `async/await`, Open-Meteo REST APIs, BigDataCloud Geocoding |
| **State Management** | React Context API, Custom Hooks (`useCart`), Vanilla JS State Objects |
| **Persistence** | `window.localStorage` (Cart, Theme, To-Do items, Weather history, Temperature units) |
| **Quality & Build** | TypeScript Compiler (`tsc --noEmit`), Vite Production Rollup Bundler, ESLint |

---

## 📁 Project Architecture & File Structure

```text
├── public/
│   ├── _redirects              # Netlify SPA redirect rules
│   ├── todo.html               # Standalone HTML5 To-Do application
│   ├── todo.js                 # Standalone Vanilla JS To-Do script
│   ├── todo.css                # Standalone CSS3 To-Do stylesheet
│   ├── weather.html            # Standalone HTML5 Weather Dashboard
│   ├── weather.js              # Standalone Vanilla JS Weather script
│   └── weather.css             # Standalone CSS3 Weather stylesheet
├── src/
│   ├── components/
│   │   ├── shop/
│   │   │   ├── CartToast.tsx       # Bottom-right cart notification
│   │   │   ├── ProductCard.tsx     # Reusable e-commerce card
│   │   │   ├── ProductFilter.tsx   # Category, price, rating filter panel
│   │   │   └── SearchBar.tsx       # Debounced catalog search input
│   │   ├── A11yAuditorBanner.tsx   # Top WCAG compliance bar
│   │   ├── AccessibilityToolbar.tsx# Accessibility configuration modal
│   │   ├── AriaLiveRegion.tsx      # Screen reader polite live announcer
│   │   ├── Footer.tsx              # Semantic footer landmark with links
│   │   ├── Header.tsx              # Sticky navbar with dynamic cart badge
│   │   ├── LoadingFallback.tsx     # Suspense code-splitting spinner
│   │   ├── SkipLink.tsx            # WCAG 2.4.1 skip navigation link
│   │   └── ThemeToggle.tsx         # Light / Dark mode toggle button
│   ├── context/
│   │   └── CartContext.tsx         # Cart state, calculations, promo codes & persistence
│   ├── data/
│   │   ├── portfolioData.ts        # Academic, internship, and project records
│   │   └── productsData.ts         # E-commerce hardware & technical literature catalog
│   ├── pages/
│   │   ├── AboutPage.tsx           # Academic biography and education milestones
│   │   ├── CartPage.tsx            # Shopping cart, promo codes & simulated checkout
│   │   ├── CertificationsPage.tsx  # Stanford, Prompt Engineering & Symposium honors
│   │   ├── ContactPage.tsx         # Accessible contact form with validation
│   │   ├── ExperiencePage.tsx      # Internships timeline (Pydun, SK Tech Forage)
│   │   ├── HomePage.tsx            # Portfolio hero, stats, and project showcases
│   │   ├── NotFoundPage.tsx        # 404 error page with route recovery links
│   │   ├── ProductDetailPage.tsx   # Dedicated product view with specs & gallery
│   │   ├── ProjectsPage.tsx        # SchemeSathiAI, Campus Echo, and full-stack systems
│   │   ├── ShopPage.tsx            # E-Commerce catalog with filters and search
│   │   ├── SkillsPage.tsx          # Dedicated technical skills inventory
│   │   ├── TodoPage.tsx            # Vanilla JS To-Do container mount
│   │   └── WeatherPage.tsx         # Vanilla JS Weather Dashboard container mount
│   ├── vanilla-todo/
│   │   └── todo.ts                 # Pure Vanilla JS CRUD & LocalStorage engine
│   ├── vanilla-weather/
│   │   └── weather.ts              # Pure Vanilla JS Fetch API & WMO weather engine
│   ├── App.tsx                     # Main layout, router configuration & code splitting
│   ├── index.css                   # Global Tailwind CSS and design tokens
│   ├── main.tsx                    # React DOM root entry point
│   └── types.ts                    # Application TypeScript interfaces & models
├── index.html                      # HTML5 entry with SEO and Open Graph metadata
├── metadata.json                   # AI Studio applet configuration
├── package.json                    # Dependencies and build scripts
├── tsconfig.json                   # TypeScript compiler options
├── vercel.json                     # Vercel SPA routing rewrite configuration
└── vite.config.ts                  # Vite build tooling and plugins
```

---

## 💻 Local Development Setup

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm (v9.0.0 or higher)

### 1. Clone the repository
```bash
git clone https://github.com/thalalhasmi/portfolio.git
cd portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start local development server
```bash
npm run dev
```
The application will launch at `http://localhost:3000` with instant Hot Module Reloading.

---

## 📦 Production Build

Compile the application for production deployment:

```bash
npm run build
```

This triggers:
1. `tsc --noEmit` — Type-checks all modules.
2. `vite build` — Bundles, tree-shakes, minifies, and code-splits pages into high-performance asset chunks under `/dist`.

To preview the production build locally:
```bash
npm run preview
```

---

## 🌐 Deployment Instructions

### Deploying to Vercel (Recommended)

1. Push your repository to **GitHub**.
2. Visit [Vercel Dashboard](https://vercel.com/new) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Set the Build and Output settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. The included `vercel.json` ensures all deep routes (`/shop`, `/shop/product/1`, `/cart`, `/weather`, `/todo`) properly rewrite to `index.html` without 404 errors.
6. Click **Deploy**.

### Deploying to Netlify

1. Link your repository in [Netlify Dashboard](https://app.netlify.com).
2. Configure settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
3. The included `public/_redirects` file (`/* /index.html 200`) ensures client-side routing functions cleanly after deployment.
4. Click **Deploy site**.

---

## 📸 Screenshots & Live Demo

- **Live Production URL**: [https://thalalhasmi.vercel.app](https://thalalhasmi.vercel.app) *(or your deployed Vercel URL)*
- **GitHub Repository**: [https://github.com/thalalhasmi/portfolio](https://github.com/thalalhasmi/portfolio)

---

## 👤 Developer Profile

- **Name**: Thalal Hasmi S
- **Role**: AI & Data Science Engineer
- **Institution**: Velammal College of Engineering & Technology, Madurai, India
- **Degree**: B.Tech Artificial Intelligence and Data Science (CGPA: 8.84)
- **Email**: thalalhasmi2006@gmail.com
- **LinkedIn**: [linkedin.com/in/thalal-hasmi-s-13aa75333](https://www.linkedin.com/in/thalal-hasmi-s-13aa75333)
- **GitHub**: [github.com/thalalhasmi](https://github.com/thalalhasmi)
