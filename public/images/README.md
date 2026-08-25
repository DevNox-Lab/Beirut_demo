# Beirut Dishes — Image Assets

Drop the restaurant's real photography here, then update the matching `src`
paths in the data files. Everything on the site reads image paths from
`src/data/`, so replacement is a one-line change per image.

## Structure

```
public/images/
├─ logo/        → brand logo & favicon source (beirut-dishes.svg is used site-wide)
├─ restaurant/  → interior, terrace, majlis, exterior shots
├─ food/        → dish photography (referenced in src/data/menu.ts)
└─ events/      → offers & event imagery (referenced in src/i18n & gallery)
```

## How to replace a placeholder

1. Add the file, e.g. `public/images/food/shawarma.jpg`.
2. In `src/data/menu.ts`, set the dish `image` to `/images/food/shawarma.jpg`.
3. Local paths (starting with `/`) are served automatically by Next.js —
   no need to touch `next.config.mjs` (that only whitelists remote hosts).

## Recommended sizes

- Logo: square SVG (vector) or 512×512 PNG.
- Food: 1400×1050 (4:3), JPwith quality ~80.
- Gallery / restaurant: 1200px on the long edge.
- Open Graph preview: 1200×630 → `public/images/og.jpg`.
