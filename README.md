# Beirut Dishes — أطباق بيروت

A premium, interactive website for **Beirut Dishes**, a Lebanese & Middle Eastern
restaurant in Taza, Morocco. It pairs a cinematic 3D hero, a fully localized
experience (English / Arabic / French with RTL) and a functional reservation
flow into a single, presentation-ready digital showroom.

---

## Overview

- **Immersive 3D hero** — a Moorish corridor with lanterns, spice particles and
  cinematic camera movement (React Three Fiber), with adaptive quality for mobile.
- **Multi-language** — EN / AR / FR with automatic RTL layout for Arabic.
- **Interactive menu** — localized dishes with cinematic modals.
- **Reservation flow** — date/time/guests, live floor-plan table selection,
  review step, success animation and one-tap WhatsApp confirmation.
- **Content sections** — virtual tour, chef's picks, offers, story, gallery,
  reviews, opening hours, services, contact + map.
- **Admin dashboard demo** — reservations (with filters, loading/empty/error
  states), menu management and analytics at `/admin`.
- **SEO ready** — metadata, Open Graph, Twitter cards, Restaurant JSON-LD schema,
  and a custom favicon.

## Tech stack

| Area           | Technology                                      |
| -------------- | ----------------------------------------------- |
| Framework      | Next.js 15 (App Router)                         |
| Language       | TypeScript                                      |
| Styling        | Tailwind CSS                                     |
| 3D             | React Three Fiber + Three.js + @react-three/drei|
| Animation      | Framer Motion                                   |
| Fonts          | Cormorant Garamond, Jost, Amiri (next/font)     |
| Database (opt) | Supabase / PostgreSQL                           |

## Project structure

```
src/
├─ app/                 # routes, layout, metadata, favicon, page transitions
│  ├─ admin/            # admin dashboard demo
│  ├─ layout.tsx        # fonts, SEO metadata, JSON-LD schema, providers
│  └─ page.tsx          # landing page composition
├─ components/
│  ├─ layout/           # navbar, footer, preloader, floating buttons
│  ├─ sections/         # hero, menu, reservation, gallery, etc.
│  ├─ three/            # 3D hero scene
│  └─ ui/               # logo, language switcher, buttons, headings
├─ data/                # restaurant.ts, menu.ts, gallery.ts, reviews.ts, tables.ts
├─ i18n/                # locales, dictionaries (en/ar/fr), LanguageProvider
├─ lib/                 # config.ts (env access), utils
└─ services/            # reservationService.ts (swappable storage backend)
public/
└─ images/              # logo, restaurant, food, events assets (see README there)
supabase/
└─ schema.sql           # reservations table + RLS policies
```

## Getting started

**Prerequisites:** Node.js 18.18+ (or 20+) and npm.

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env.local   # then edit values (all optional for the demo)

# 3. Run the dev server
npm run dev                  # http://localhost:3000
```

### Scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the development server         |
| `npm run build` | Production build                     |
| `npm run start` | Serve the production build           |
| `npm run lint`  | Run ESLint                           |

## Environment setup

Copy `.env.example` to `.env.local`. Every variable has a sensible default, so
the site runs with **zero configuration**.

| Variable                          | Scope   | Purpose                                              |
| --------------------------------- | ------- | ---------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`            | public  | Canonical URL for SEO / Open Graph / schema          |
| `NEXT_PUBLIC_WHATSAPP_NUMBER`     | public  | WhatsApp number for reservation & contact links      |
| `WHATSAPP_NUMBER`                 | server  | Same number for any server-side use                  |
| `NEXT_PUBLIC_RESERVATION_BACKEND` | public  | `demo` (default) or `supabase`                       |
| `DATABASE_URL`                    | server  | Postgres connection string (backend only)            |
| `NEXT_PUBLIC_SUPABASE_URL`        | public  | Supabase project URL (when using supabase backend)   |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`   | public  | Supabase anon key                                    |
| `SUPABASE_SERVICE_ROLE_KEY`       | server  | Privileged key — **never** expose to the browser     |

> Only variables prefixed with `NEXT_PUBLIC_` are available in the browser.
> All env access is centralized in `src/lib/config.ts`.

## Replacing content & images

- **Text & business info:** edit `src/data/restaurant.ts` and `src/data/menu.ts`.
- **Translations:** edit `src/i18n/en.ts`, `ar.ts`, `fr.ts`.
- **Images:** drop files into `public/images/{logo,food,restaurant,events}/`
  and point the `image`/`src` fields in the data files at e.g. `/images/food/shawarma.jpg`.
  See `public/images/README.md` for details.
- **Logo:** replace `public/images/logo/beirut-dishes.svg` to update it everywhere.

## Deployment

The app is a standard Next.js project and deploys anywhere Next.js is supported.

### Vercel (recommended)

1. Push the repository to GitHub/GitLab/Bitbucket.
2. Import the project into [Vercel](https://vercel.com/new).
3. Add the environment variables from `.env.example` in
   **Project → Settings → Environment Variables**.
4. Deploy — Vercel auto-detects Next.js (`npm run build`).

### Self-hosted / other providers

```bash
npm run build
npm run start   # serves on PORT (default 3000)
```

Any Node host (or a container) works. For remote images, keep the allowed hosts
in `next.config.mjs` (`images.remotePatterns`) up to date.

## Reservation architecture & backend integration

The UI talks only to four functions in `src/services/reservationService.ts`:
`createReservation`, `checkAvailability`, `getReservations`, `cancelReservation`.

Storage is provided by a swappable **`ReservationProvider`**, chosen at runtime
via `NEXT_PUBLIC_RESERVATION_BACKEND`:

- **`demo`** (default) — in-memory store, no database required.
- **`supabase`** — persist to PostgreSQL. A stub provider with step-by-step
  `TODO(backend)` comments is already in place.

**To go live with Supabase:**

1. Create a Supabase project and run `supabase/schema.sql` (SQL Editor or
   `psql "$DATABASE_URL" -f supabase/schema.sql`). This creates the
   `reservations` table (`id`, `customer_name`, `phone`, `email`, `date`, `time`,
   `guests`, `table_number`, `status`, `created_at`) with indexes and RLS policies.
2. `npm install @supabase/supabase-js`.
3. Implement `createSupabaseProvider()` in `reservationService.ts` (follow the
   inline TODOs) and wire the client using `config.supabase`.
4. Set `NEXT_PUBLIC_RESERVATION_BACKEND=supabase` and the Supabase env vars.

No component changes are required — the service layer keeps the same contract.

## License

Proprietary — built for Beirut Dishes. All rights reserved.
