Aa features Advertisers ane Hosts mate visible & usable hova joiye:

🎯 1. Public Landing + Discovery
Hero section with demo billboard preview
“How it works” (Advertiser / Host flow)
Featured locations (Mumbai, Ahmedabad, etc.)
Testimonials / case studies
Pricing overview (approx CPM / city-wise)
🗺️ 2. Smart Billboard Discovery
GPS Map (tamaro existing MapView 👍)
Filters:
City / Area
Budget range
Traffic volume
Billboard type (Unipole, Hoarding, Digital LED)
“Top Performing Locations” badge
🎨 3. Ad Designer Experience
Poster templates (festival, food, real estate)
AI slogan generator (already great idea)
Save drafts
Multi-size preview (different hoarding ratios)
🚗 4. 3D Preview Experience
Live preview (tamaro Three.js 🔥)
Add:
Different environments (city, highway, mall)
Weather modes (rain/fog optional future)
Share preview link (important for clients)
📊 5. Campaign Planning & ROI
Traffic analytics (existing)
Add:
Competitor density (optional future)
Suggested duration (AI-based)
Export proposal PDF
💳 6. Booking & Campaign Management
Checkout (mock → later real)
Campaign dashboard:
Active / Completed
Performance stats
Notifications:
Campaign live
Low performance alert
🤝 7. Host (Owner) Features (Front-facing login)
Add/edit billboard
Upload images
See booking requests
Earnings summary (basic view)
👤 8. Authentication & Profiles
Login/signup (Advertiser / Host)
Profile management
Saved campaigns & billboards



Landing Website
   ↓
Auth System (Login/Signup)
   ↓
-----------------------------------
| Advertiser Dashboard            |
| Host Dashboard                  |
-----------------------------------


# AdNazar — Public-Facing Features Implementation Plan

## Background

The existing app is a single-page Next.js app with three portals (Advertiser, Host/Owner, Admin) behind a simple tab switcher in the Navbar. There is no public landing page, no authentication system, and no user-facing login flow — the portals are directly accessible to anyone. The goal is to add a full public-facing experience with proper auth gates.

---

## User Review Required

> [!IMPORTANT]
> The current app has **no routing** — everything lives in `page.js` as `useState`-driven view switching. We have two options:
> - **Option A (Recommended)**: Keep the single-page architecture and add a `view` state (`'landing' | 'login' | 'advertiser' | 'host'`). This requires zero routing setup and is fast to build.
> - **Option B**: Add Next.js App Router pages (`/`, `/login`, `/advertiser`, `/host`). Cleaner but requires refactoring all existing portals into their own routes.
>
> **This plan uses Option A** — unless you prefer Option B.

> [!WARNING]
> Authentication is **mock-only** (no Firebase/backend). Users log in with hardcoded demo credentials. Real auth can be layered in later.

---

## Open Questions

> [!NOTE]
> For the **Pricing Overview** section: Should city-wise CPM pricing be shown as a static table, or as an interactive calculator (enter city + duration → see estimated cost)?

---

## Proposed Changes

### 1. Landing Page (`LandingPage.js`) — [NEW]

A full public-facing page shown before login. Sections:

#### [NEW] `src/components/LandingPage.js`
- **Hero Section** — Full-width billboard mockup preview, animated tagline, dual CTA buttons ("Find Billboards" → Advertiser login, "List Your Space" → Host login)
- **How It Works** — Two-column flow cards for Advertiser and Host journeys
- **Featured Locations** — Mumbai, Ahmedabad, Delhi-NCR, Bangalore — location cards with traffic stats and thumbnail
- **Testimonials** — 3 mock testimonial cards with avatar, name, company, quote
- **Pricing Overview** — City-wise CPM table with approx. monthly starting rates
- **Footer CTA** — "Join AdNazar Today" with sign-up prompt

---

### 2. Auth System (`AuthModal.js`) — [NEW]

#### [NEW] `src/components/AuthModal.js`
- Tabbed modal: **Login** / **Sign Up**
- Role selector: **Advertiser** or **Host (Billboard Owner)**
- Mock credentials:
  - Advertiser: `advertiser@demo.com` / `demo123`
  - Host: `host@demo.com` / `demo123`
- On success → sets `currentUser` state in `page.js` and routes to appropriate portal
- Sign up form captures: Name, Email, Phone, Role → mock success toast

---

### 3. Navbar — [MODIFY]

#### [MODIFY] [Navbar.js](file:///Users/jnc/learn/Outdoor-marketing%20/src/components/Navbar.js)
- **Pre-login state**: Show "Login" and "Sign Up" buttons (no portal tabs visible)
- **Post-login state**: Show portal tabs + user avatar + logout button
- Replace hardcoded "Amit Sharma" with dynamic `currentUser.name`
- Add "Back to Home" link visible when logged in
- Logo click → always goes to Landing

---

### 4. Advertiser Portal Enhancements — [MODIFY]

#### [MODIFY] [AdvertiserPortal.js](file:///Users/jnc/learn/Outdoor-marketing%20/src/components/AdvertiserPortal.js)
- Add **Advanced Map Filters** panel above `MapView`:
  - City / Area dropdown
  - Budget range slider (₹10K–₹500K)
  - Daily traffic volume filter
  - Billboard type filter (Unipole / Hoarding / Digital LED)
- Add **"Top Performing"** badge on billboards with `visibilityScore > 93`
- Add **Export Proposal PDF** button on active billboard detail view (mock download)
- Saved Billboards: heart-icon toggle on billboard cards, "Saved" tab in campaigns tracker
- Campaign notification toasts: "Campaign is Live!" on booking success, "⚠️ Low Performance" if CTR < 1.0%

---

### 5. Host (Owner) Portal Enhancements — [MODIFY]

#### [MODIFY] [OwnerPortal.js](file:///Users/jnc/learn/Outdoor-marketing%20/src/components/OwnerPortal.js)
- Add **Booking Requests** panel — table of pending booking requests with Accept / Decline actions
- Improve **Earnings Summary** — add month-by-month earnings chart (mock bar chart using CSS/SVG)
- Add **Billboard type** field to the Add Billboard form (Unipole / Hoarding / Digital LED)

---

### 6. Page Orchestration — [MODIFY]

#### [MODIFY] [page.js](file:///Users/jnc/learn/Outdoor-marketing%20/src/app/page.js)
- Add `view` state: `'landing' | 'app'`
- Add `currentUser` state: `null` (logged out) or `{ name, email, role: 'advertiser'|'host' }`
- `showAuthModal` state for auth modal visibility
- On login success → set `currentUser`, switch `view` to `'app'`, set `activePortal` to user's role
- On logout → clear `currentUser`, switch `view` to `'landing'`
- Pass `currentUser`, `onLogout`, `onShowAuth` props to `Navbar`

---

### 7. Mock Data Additions — [MODIFY]

#### [MODIFY] [mockData.js](file:///Users/jnc/learn/Outdoor-marketing%20/src/utils/mockData.js)
- Add `CITY_PRICING` export — city-wise CPM and min/max monthly rates
- Add `TESTIMONIALS` export — 3 mock testimonials
- Add `HOW_IT_WORKS` steps for Advertiser and Host flows
- Add `billboardType` field to all existing billboards (`'Unipole'` / `'Hoarding'` / `'Digital LED'`)

---

## Verification Plan

### Automated Tests
- `npm run build` — ensure no TypeScript/ESLint errors
- `npm run dev` — visual check all views render

### Manual Verification

| Flow | Steps | Expected |
|---|---|---|
| Landing page | Load app | Hero + sections visible, no portals |
| Advertiser login | Click "Find Billboards" → login form | Portal loads with map |
| Host login | Click "List Your Space" → login form | Host dashboard loads |
| Logout | Click logout in navbar | Returns to landing page |
| Map filters | Toggle city/budget/type | Billboard list + map pins update |
| Booking request | Host dashboard | Shows pending booking table |
| Top performing badge | Advertiser map card | Badges on high-score boards |
| Export PDF | Click export on billboard | Mock download toast |
| Saved billboards | Heart icon on card | Saved list persists in session |

