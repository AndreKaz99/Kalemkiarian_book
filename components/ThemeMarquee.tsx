const phrases = [
  "Through their eyes",
  "Parenting schedules",
  "Holidays",
  "Relocation",
  "Two households",
  "Learning to listen",
  "Safe & loved",
  "When the conflict ends",
];

/** A slow, quiet ribbon of the book's themes — a breath between hero and story. */
export function ThemeMarquee() {
  const row = [...phrases, ...phrases];
  return (
    <div aria-hidden className="relative overflow-hidden border-y border-ink/10 bg-charcoal py-5 text-ivory">
      <div className="marquee-track flex w-max">
        {row.map((p, i) => (
          <span key={i} className="flex items-center whitespace-nowrap font-display text-2xl italic sm:text-3xl">
            <span className="px-8">{p}</span>
            <span className="text-terracotta-soft">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
