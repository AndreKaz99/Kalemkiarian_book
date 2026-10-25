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

## Images

All images live in `public/images/` and are referenced from `lib/site.ts` → `assets`:

| Image | File | Used in |
| --- | --- | --- |
| Front cover | `book-cover.jpg` | 3D book (hero), purchase section |
| Back cover | `book-back-cover.jpg` | 3D book's back, purchase section |
| Title page | `title-page.jpg` | first page revealed when the 3D book opens |
| Author portrait | `sharon-kalemkiarian.jpg` | About the Author |
| Archival press photo (optional) | not yet provided: set `assets.pressArchive.src` | Legacy section |

To swap an image, replace the file (same name) or point the `src` at a new file.

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
