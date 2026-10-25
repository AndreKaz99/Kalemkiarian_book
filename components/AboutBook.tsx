"use client";

import { AnimatePresence, motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef, useState } from "react";
import { coparentingTopics, themes } from "@/lib/site";
import { Reveal, SectionLabel, WordReveal } from "./primitives";

export function AboutBook() {
  return (
    <section id="the-book" aria-labelledby="the-book-heading" className="relative bg-ivory">
      {/* ---- Intro ---------------------------------------------------- */}
      <div className="page-x pb-24 pt-28 lg:pb-32 lg:pt-40">
        <SectionLabel index="01" label="The Book" className="text-burgundy" />

        <div className="mt-12 grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <WordReveal
              as="h2"
              text="Divorce, as a child hears it."
              id="the-book-heading"
              className="font-display text-[clamp(2.8rem,6.5vw,6rem)] font-light leading-[0.95] tracking-[-0.02em]"
            />
          </div>
          <Reveal className="lg:col-span-4 lg:col-start-9 lg:pt-6" delay={0.2}>
            <p className="eyebrow text-smoke">What I Want to Tell You Is...</p>
            <p className="mt-5 font-display text-2xl italic leading-snug text-ink sm:text-[1.75rem]">
              &ldquo;I wrote these messages in the voices of children to help you see your divorce through your
              child&rsquo;s eyes.&rdquo;
            </p>
            <p className="mt-4 text-xs uppercase tracking-[0.25em] text-smoke">— Sharon L. Kalemkiarian</p>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-12 lg:mt-28 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-3">
            <div className="flex gap-10 lg:flex-col lg:gap-8">
              <Credential n="I" title="Advocate" text="Represented parents and children in family court." />
              <Credential n="II" title="Judge" text="Heard testimony directly from children and issued custody orders." />
              <Credential n="III" title="Parent" text="Experienced divorce when her own children were young." />
            </div>
          </Reveal>

          <div className="space-y-6 text-[1.05rem] leading-[1.85] text-ink/80 lg:col-span-8 lg:col-start-5 lg:columns-2 lg:gap-12 lg:space-y-0 [&>p]:mb-6 [&>p]:break-inside-avoid">
            <Reveal as="p" className="first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-display first-letter:text-[4.6rem] first-letter:leading-[0.8] first-letter:text-burgundy">
              For years, Sharon L. Kalemkiarian represented parents and children in family court. Later, as a judge,
              she heard testimony directly from children and issued custody orders. She also experienced divorce
              personally when her children were young.
            </Reveal>
            <Reveal as="p" delay={0.05}>
              These experiences taught her that parents experiencing divorce can unintentionally allow their own
              sadness, anxiety, and disappointment to affect their children.
            </Reveal>
            <Reveal as="p" delay={0.1}>
              Children often struggle to express their feelings because they are confused, frightened, or afraid of
              upsetting their parents. Sometimes, they communicate their emotions through their behavior instead.
            </Reveal>
            <Reveal as="p" delay={0.15}>
              Through messages written from a child&rsquo;s perspective, the book helps parents see the divorce
              process through their children&rsquo;s eyes &mdash; and make more compassionate decisions.
            </Reveal>
          </div>
        </div>
      </div>

      {/* ---- Scroll-lit quotation -------------------------------------- */}
      <ScrollQuote text="Children just want the conflict to end, and to be wrapped in the love that only you can offer." />

      {/* ---- Through Their Eyes ---------------------------------------- */}
      <ThroughTheirEyes />
    </section>
  );
}

function Credential({ n, title, text }: { n: string; title: string; text: string }) {
  return (
    <div className="flex-1 border-t border-ink/15 pt-4">
      <p className="font-display text-sm italic text-burgundy">{n}</p>
      <p className="mt-1 font-display text-2xl">{title}</p>
      <p className="mt-2 text-sm leading-relaxed text-smoke">{text}</p>
    </div>
  );
}

/* Words brighten from faint to ink as the reader scrolls past. */
function ScrollQuote({ text }: { text: string }) {
  const ref = useRef<HTMLQuoteElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  return (
    <div className="grain relative overflow-hidden bg-cream py-28 lg:py-40">
      <span
        aria-hidden
        className="pointer-events-none absolute -left-4 -top-16 select-none font-display text-[22rem] leading-none text-sand lg:-top-24 lg:text-[34rem]"
      >
        &ldquo;
      </span>
      <div className="page-x relative">
        <blockquote
          ref={ref}
          className="mx-auto max-w-5xl text-center font-display text-[clamp(2rem,4.6vw,4.4rem)] font-light italic leading-[1.12] tracking-[-0.01em]"
        >
          <p aria-label={text}>
            {words.map((w, i) => (
              <QuoteWord key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
                {w}
              </QuoteWord>
            ))}
          </p>
        </blockquote>
        <Reveal className="mt-10 flex items-center justify-center gap-4">
          <span className="h-px w-12 bg-burgundy" />
          <span className="eyebrow text-burgundy">The heart of the book</span>
          <span className="h-px w-12 bg-burgundy" />
        </Reveal>
      </div>
    </div>
  );
}

function QuoteWord({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  const highlight = ["conflict", "love"].some((k) => children.toLowerCase().startsWith(k));
  return (
    <motion.span aria-hidden style={{ opacity }} className={highlight ? "text-burgundy" : undefined}>
      {children}{" "}
    </motion.span>
  );
}

/* Interactive index of the book's themes. Summaries, not excerpts. */
function ThroughTheirEyes() {
  const [active, setActive] = useState(0);
  const theme = themes[active];
  return (
    <div className="page-x py-28 lg:py-40">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow text-burgundy">Inside the book</p>
            <h3 className="mt-6 font-display text-[clamp(2.6rem,5vw,4.5rem)] font-light leading-[0.95] tracking-[-0.02em]">
              Through <em className="text-burgundy">Their</em> Eyes
            </h3>
            <p className="mt-6 max-w-md text-[1rem] leading-relaxed text-smoke">
              The book explores the common challenges of co-parenting and the emotional experiences of children caught
              between two households.
            </p>
          </Reveal>

          <ul className="mt-12 border-t border-ink/15" role="tablist" aria-label="Themes of the book">
            {themes.map((t, i) => {
              const on = i === active;
              return (
                <li key={t.key} className="border-b border-ink/15">
                  <button
                    type="button"
                    role="tab"
                    id={`theme-tab-${t.key}`}
                    aria-selected={on}
                    aria-controls="theme-panel"
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group flex w-full items-center gap-6 py-6 text-left"
                  >
                    <span className={`font-display text-sm italic transition-colors ${on ? "text-burgundy" : "text-smoke"}`}>
                      0{i + 1}
                    </span>
                    <span
                      className={`flex-1 font-display text-2xl transition-all duration-500 ease-silk sm:text-3xl ${
                        on ? "translate-x-2 text-ink" : "text-ink/45 group-hover:text-ink/70"
                      }`}
                    >
                      {t.title}
                    </span>
                    <span
                      aria-hidden
                      className={`h-px bg-burgundy transition-all duration-700 ease-silk ${on ? "w-10" : "w-0"}`}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <div
            id="theme-panel"
            role="tabpanel"
            aria-labelledby={`theme-tab-${theme.key}`}
            className="relative flex min-h-[26rem] flex-col justify-between overflow-hidden bg-charcoal p-10 text-ivory sm:p-14 lg:sticky lg:top-28 lg:min-h-[34rem]"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -right-6 -top-10 select-none font-display text-[16rem] italic leading-none text-ivory/[0.05]"
            >
              0{active + 1}
            </span>
            <AnimatePresence mode="wait">
              <motion.div
                key={theme.key}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <p className="eyebrow text-terracotta-soft">{theme.summary}</p>
                <p className="mt-8 font-display text-[clamp(1.6rem,2.6vw,2.3rem)] font-light leading-[1.3]">
                  {theme.body}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="relative mt-12">
              <p className="eyebrow text-ivory/50">Co-parenting challenges explored</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {coparentingTopics.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-ivory/20 px-4 py-2 text-xs tracking-wide text-ivory/80 transition-colors hover:border-terracotta-soft hover:text-ivory"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
