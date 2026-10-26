import { AMAZON_URL, INSTAGRAM_URL, nav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer data-nav="dark" className="relative overflow-clip bg-ink text-ivory">
      <div className="page-x grid gap-12 pb-10 pt-20 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="font-display text-4xl leading-none">
            What I Want to Tell You <em className="text-lavender">Is...</em>
          </div>
          <div className="mt-3 font-display text-xl italic text-ivory/60">{site.subtitle}</div>
        </div>
        <nav aria-label="Footer" className="lg:col-span-4">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="text-ivory/60 transition-colors hover:text-lavender">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="lg:col-span-3 lg:text-right">
          <a
            href={AMAZON_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-lavender underline decoration-lavender/30 underline-offset-[6px] transition-colors hover:decoration-lavender"
          >
            Get the Book on Amazon<span className="sr-only"> (opens in a new tab)</span> ↗
          </a>
          <p className="mt-5 text-sm text-ivory/65">
            Published by <span className="font-press text-base text-ivory/80">{site.publisher}</span>
          </p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram (opens in a new tab)"
            className="mt-6 inline-flex h-11 w-11 items-center justify-center rounded-full border border-ivory/25 text-ivory/80 transition-colors duration-300 hover:border-lavender hover:bg-lavender hover:text-midnight"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
            </svg>
          </a>
        </div>
      </div>

      <div className="page-x relative z-10 flex flex-col gap-2 border-t border-ivory/10 bg-ink py-6 text-xs text-ivory/60 sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.author}. All rights reserved.
        </p>
        <p>Purchases are fulfilled by Amazon.</p>
      </div>
    </footer>
  );
}
