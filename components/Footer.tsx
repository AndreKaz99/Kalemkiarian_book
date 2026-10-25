import { AMAZON_URL, nav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-ivory">
      <div className="page-x grid gap-12 border-t border-ink/10 py-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="font-display text-3xl italic leading-tight">
            What I Want to Tell You <span className="text-burgundy">Is...</span>
          </p>
          <p className="mt-2 text-sm text-smoke">{site.subtitle}</p>
          <p className="mt-6 text-xs uppercase tracking-[0.28em] text-smoke">by {site.author}</p>
        </div>

        <nav aria-label="Footer" className="lg:col-span-4">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="text-smoke transition-colors hover:text-burgundy">
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
            className="inline-flex items-center gap-2 text-sm font-medium text-burgundy underline decoration-burgundy/30 underline-offset-4 transition-colors hover:decoration-burgundy"
          >
            Get the Book on Amazon<span className="sr-only"> (opens in a new tab)</span> ↗
          </a>
          <p className="mt-6 text-xs leading-relaxed text-smoke">
            Published by <span className="font-press text-sm text-ink">{site.publisher}</span>
          </p>
        </div>
      </div>
      <div className="page-x flex flex-col gap-2 border-t border-ink/10 py-6 text-[0.7rem] text-smoke sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} {site.author}. All rights reserved.</p>
        <p>Purchases are fulfilled by Amazon.</p>
      </div>
    </footer>
  );
}
