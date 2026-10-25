# What I Want to Tell You Is... — Book Website

Official single-page website for **_What I Want to Tell You Is... Messages From Your Child About Divorce_** by Sharon L. Kalemkiarian, published by Sahag-Mesrob Press West.

Built with Next.js 14 (App Router), React 18, Tailwind CSS and Framer Motion. No backend: every purchase link goes to the [Amazon listing](https://www.amazon.com/What-Want-Tell-You-Messages/dp/B0HJ6VY2RB).

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Live site

**https://andrekaz99.github.io/Kalemkiarian_book/**

Hosted on GitHub Pages. Every push to `claude/clever-cori-b61vqh` rebuilds and republishes the site automatically (`.github/workflows/pages.yml`). Progress shows under the repository's **Actions** tab.

## Replacing the placeholder images

The site ships with clearly labelled placeholders. To use the real assets:

1. Put the files in `public/images/`.
2. Set the matching `src` in `lib/site.ts` → `assets`:

| Asset | Key | Recommended |
| --- | --- | --- |
| Book cover | `assets.bookCover.src` | 1600×2400 JPG/PNG (2:3) |
| Author portrait | `assets.authorPortrait.src` | 1200×1500 JPG (4:5) |
| Archival press photo (optional) | `assets.pressArchive.src` | landscape JPG |

```ts
bookCover: { src: "/images/book-cover.jpg", alt: "..." },
```

The cover is used in the hero 3D book and the purchase section; images are rendered with `next/image` (lazy-loaded, responsive sizes).

If you add a custom domain, update `site.url` in `lib/site.ts` (used for the canonical URL, sitemap and social previews).

## Editing content

- **Copy, links, nav, themes:** `lib/site.ts`
- **Sections:** `components/` — `Hero`, `Book3D`, `AboutBook`, `WhyIWrote`, `Author`, `Legacy`, `Purchase`, `Footer`, `Navigation`
- **Shared pieces (buttons, reveal animations, placeholders):** `components/primitives.tsx`
- **Colors & fonts:** `tailwind.config.ts`, `app/layout.tsx`
- **SEO / social card:** `app/layout.tsx`, `app/opengraph-image.tsx`

## Notes

- Respects `prefers-reduced-motion` (Framer `MotionConfig reducedMotion="user"`; pointer tilt and the page-turn animation are disabled).
- Pointer tilt only runs on fine pointers; on narrow screens the open book shows its right-hand page at full size.
- The open book shows the author's own description of the book and an introduction drawn from the book's description — no invented excerpts.
