# Beirut Dishes — Client Presentation Checklist

A step-by-step guide for showcasing the site to the client. Everything below
has been verified against the current build.

---

## 1. Before the demo (5 minutes)

- [ ] Pull the latest code and install: `npm install`
- [ ] Build & run the production version (best performance for a live demo):
  ```bash
  npm run build
  npx next start -p 3005      # then open http://localhost:3005
  ```
  _(or `npm run dev` for a quick local run)_
- [ ] Open in a **Chromium browser**, full-screen, at 100% zoom.
- [ ] Have a phone ready (or use browser device toolbar) for the mobile view.
- [ ] Sound on is optional — the site is silent, animation-driven.
- [ ] Close other heavy apps so the 3D hero runs smoothly (>50 FPS target).

## 2. Guided walkthrough (suggested order)

1. **Loading screen** — logo + gold shimmer, ~2s, then reveals the hero.
2. **Hero (Homepage)** — 3D Moroccan corridor, lanterns, spice particles;
   headline, "Reserve Your Table" / "Explore Menu" CTAs.
3. **Language switch** — top-right selector: English → **العربية (RTL flips the
   whole layout)** → Français. Point out the Amiri Arabic typography.
4. **Virtual Experience** — click through the four spaces (hall, terrace,
   family, private) with the hotspots.
5. **Chef Recommends** — rotating signature dishes.
6. **Menu** — filter categories, open a dish for the full-screen story modal.
7. **Special Offers** — mezze night, oud nights, family Sunday.
8. **Reservation** — pick date/time/guests → select a table on the live floor
   plan → **Review** → **Confirm** → success animation → WhatsApp hand-off.
9. **Private Dining CTA**, **Story**, **Gallery** (lightbox), **Reviews**.
10. **Opening Hours** (shows live open/closed), **Services**, **Contact** (map).
11. **Floating buttons** — WhatsApp (bottom-right) and Reserve (appears on scroll).
12. **Admin demo** — footer → "Admin Demo" (`/admin`): reservations with
    filters/loading/empty states, menu management, analytics.

## 3. Pages verified

| Page / Section | Status | Notes                                        |
| -------------- | ------ | -------------------------------------------- |
| Homepage       | ✅     | 3D hero, all sections render                 |
| Menu           | ✅     | Filters + localized dish modals              |
| Reservation    | ✅     | Full flow → WhatsApp confirmation            |
| Gallery        | ✅     | Filter + lightbox, lazy-loaded images        |
| Contact        | ✅     | Details, socials, embedded map               |
| Admin (`/admin`)| ✅    | Filters, loading / empty / error states      |

## 4. Talking points

- **Trilingual + RTL** — one codebase serving EN / AR / FR, Arabic fully
  right-to-left with authentic typography.
- **Immersive 3D** — bespoke WebGL scene, adaptive quality (scales down on
  mobile, pauses when off-screen to save battery).
- **Real reservation flow** — table selection + instant WhatsApp booking; the
  service layer is ready to connect to a real database (see README).
- **SEO & sharing** — rich metadata, Open Graph preview, and Google-friendly
  Restaurant schema (rating, hours, location) for search visibility.
- **Content-managed** — all text, dishes, hours and images live in structured
  data files; easy to update without touching components.

## 5. Technical verification (all passing)

- [x] **Production build** — `npm run build` compiles with no errors/warnings.
- [x] **No debug output** — no `console.log`, debug UI, or placeholder text.
- [x] **Environment** — runs with zero config; `.env.example` documents all vars
      (`NEXT_PUBLIC_SITE_URL`, `WHATSAPP_NUMBER`, `DATABASE_URL`, backend switch).
- [x] **SEO** — `<title>`, Open Graph, Twitter card, canonical, `theme-color`,
      and Restaurant JSON-LD (with `aggregateRating` + `openingHoursSpecification`).
- [x] **Favicon** — custom crest served at `/icon.svg`.
- [x] **Routes** — `/`, `/admin`, `/icon.svg` all return HTTP 200.
- [x] **Accessibility** — keyboard focus rings, `prefers-reduced-motion` respected.
- [x] **Mobile** — responsive across breakpoints; below-the-fold images lazy-load.

## 6. Demo-mode notes (for the presenter)

- Reservations use **in-memory demo storage** — bookings reset on reload, and
  nothing is sent anywhere except the WhatsApp draft the guest chooses to send.
- The admin dashboard shows **sample data** (labelled "Admin Demo").
- Photography currently uses high-quality stock images; swap the client's real
  photos into `public/images/` and update the paths in `src/data/` (see the
  README in that folder).

## 7. Post-demo / go-live (optional)

- [ ] Replace stock images with the restaurant's real photography.
- [ ] Set real environment variables on the host (e.g. Vercel).
- [ ] Connect the reservation backend (Supabase schema in `supabase/schema.sql`).
- [ ] Point the domain and confirm `NEXT_PUBLIC_SITE_URL`.
