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
| Title page | `title-page.jpg` | Publishing legacy section (Plate II) |
| Author portrait | `sharon-kalemkiarian.jpg` | About the Author |
| Archival press photo (optional) | not yet provided: set `assets.pressArchive.src` | Legacy section |

To swap an image, replace the file (same name) or point the `src` at a new file.

If you add a custom domain, update `site.url` in `lib/site.ts` (used for the canonical URL, sitemap and social previews).

## Editing content

- **Copy, links, nav, themes:** `lib/site.ts`
- **Sections (in page order):** `components/`: `Hero` (hero + prologue), `Book3D` (the interactive book), `AboutBook` (open-spread layout, themes, and the pinned "heart of the book" quote), `Author`, `WhyIWrote`, `Legacy`, `Purchase`, `Footer`, `Navigation`
- **Design system:** purple palette and fonts (Instrument Serif, Manrope, IM Fell English) in `tailwind.config.ts`, `app/layout.tsx` and `app/globals.css`
- **Shared pieces (buttons, reveal animations, placeholders):** `components/primitives.tsx`
- **SEO / social card:** `app/layout.tsx`, `app/opengraph-image.tsx`

## Notes

- Respects `prefers-reduced-motion` (Framer `MotionConfig reducedMotion="user"`; pointer tilt is disabled).
- The hero book tilts toward the pointer but does not open. The opening and page-turn interaction is still built into `Book3D` and can be switched back on with `<Book3D openable />`.
