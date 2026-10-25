"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { coparentingTopics, site, themes } from "@/lib/site";
import { Lines, Reveal, ScrollWords, ease } from "./primitives";

/* ==================================================================== */
/* The Book — laid out as an open spread of a printed book              */
/* ==================================================================== */

export function AboutBook() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.25"] });
  const leftTilt = useTransform(scrollYProgress, [0, 1], [14, 0]);
  const rightTilt = useTransform(scrollYProgress, [0, 1], [-14, 0]);
  const lift = useTransform(scrollYProgress, [0, 1], [60, 0]);

  return (
    <section id="the-book" data-nav="light" aria-labelledby="the-book-heading" className="relative bg-lilac text-ink">
      <div className="page-x pb-24 pt-24 lg:pb-36 lg:pt-32">
        <div className="mb-12 flex items-baseline justify-between text-aubergine lg:mb-16">
          <Reveal y={10} className="flex items-baseline gap-3">
            <span className="font-display text-xl italic">01</span>
            <span className="eyebrow">The Book</span>
          </Reveal>
          <Reveal y={10} className="eyebrow hidden text-aubergine/75 sm:block">
            An open spread
          </Reveal>
        </div>

        {/* The spread */}
        <motion.div ref={ref} style={{ y: lift, perspective: "2200px" }} className="relative">
          <div aria-hidden className="absolute -bottom-6 left-[4%] right-[4%] h-16 rounded-[50%] bg-aubergine/25 blur-2xl" />
          <div className="relative grid lg:grid-cols-2" style={{ transformStyle: "preserve-3d" }}>
            {/* Verso */}
            <motion.article
              style={{ rotateY: leftTilt, transformOrigin: "right center" }}
              className="relative bg-ivory px-7 pb-14 pt-10 shadow-[0_1px_0_rgba(0,0,0,0.04)] sm:px-12 lg:px-[4.5vw] lg:pb-16 lg:pt-12"
            >
              <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 hidden w-24 bg-gradient-to-l from-aubergine/[0.13] to-transparent lg:block" />
              <RunningHead side="left">What I Want to Tell You Is...</RunningHead>
              <Lines
                id="the-book-heading"
                label="Divorce, as a child hears it."
                lines={["Divorce,", "as a child", <em key="h" className="text-violet">hears it.</em>]}
                className="mt-14 font-display text-[clamp(3.2rem,7.2vw,7rem)] leading-[0.9] tracking-[-0.03em] lg:mt-20"
              />
              <Reveal delay={0.15} className="mt-14 max-w-[30rem] lg:mt-20">
                <p className="font-display text-[1.75rem] italic leading-[1.25] text-aubergine sm:text-[2rem]">
                  &ldquo;I wrote these messages in the voices of children to help you see your divorce through your
                  child&rsquo;s eyes.&rdquo;
                </p>
                <p className="eyebrow mt-5 text-smoke">{site.author}</p>
              </Reveal>
              <Folio>i</Folio>
            </motion.article>

            {/* Recto */}
            <motion.article
              style={{ rotateY: rightTilt, transformOrigin: "left center" }}
              className="relative bg-[#FCFAF6] px-7 pb-14 pt-10 sm:px-12 lg:px-[4.5vw] lg:pb-16 lg:pt-12"
            >
              <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 hidden w-24 bg-gradient-to-r from-aubergine/[0.16] to-transparent lg:block" />
              <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-aubergine/10 lg:hidden" />
              <RunningHead side="right">{site.subtitle}</RunningHead>

              <div className="mt-12 grid gap-10 lg:mt-16 xl:grid-cols-[1fr_9.5rem] xl:gap-12">
                <div className="body-copy space-y-6 text-ink/80">
                  <Reveal as="p" className="first-letter:float-left first-letter:mr-3 first-letter:mt-[0.1em] first-letter:font-display first-letter:text-[5.2rem] first-letter:leading-[0.72] first-letter:text-violet">
                    For years, Sharon L. Kalemkiarian represented parents and children in family court. Later, as a
                    judge, she heard testimony directly from children and issued custody orders. She also experienced
                    divorce personally when her children were young.
                  </Reveal>
                  <Reveal as="p" delay={0.05}>
                    These experiences taught her that parents experiencing divorce can unintentionally allow their own
                    sadness, anxiety, and disappointment to affect their children.
                  </Reveal>
                  <Reveal as="p" delay={0.1}>
                    Children often struggle to express their feelings because they are confused, frightened, or afraid
                    of upsetting their parents. Sometimes, they communicate their emotions through their behavior
                    instead.
                  </Reveal>
                  <Reveal as="p" delay={0.15}>
                    Through messages written from a child&rsquo;s perspective, the book helps parents see the divorce
                    process through their children&rsquo;s eyes and make more compassionate decisions.
                  </Reveal>
                </div>

                {/* Marginalia */}
                <Reveal delay={0.2}>
                  <ul className="flex gap-8 border-t border-aubergine/15 pt-5 xl:flex-col xl:gap-7 xl:border-l xl:border-t-0 xl:pl-5 xl:pt-1">
                    {[
                      ["Advocate", "for parents & children in family court"],
                      ["Judge", "hearing directly from children"],
                      ["Parent", "through her own divorce"],
                    ].map(([role, note]) => (
                      <li key={role} className="flex-1">
                        <span className="block font-display text-[1.6rem] italic leading-none text-violet">{role}</span>
                        <span className="mt-2 block text-[0.82rem] leading-snug text-smoke">{note}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
              <Folio right>ii</Folio>
            </motion.article>
          </div>
        </motion.div>

        <ThroughTheirEyes />
      </div>
    </section>
  );
}

function RunningHead({ children, side }: { children: React.ReactNode; side: "left" | "right" }) {
  return (
    <p className={`text-[0.75rem] font-semibold uppercase tracking-[0.34em] text-smoke ${side === "right" ? "lg:text-right" : ""}`}>
      {children}
    </p>
  );
}

function Folio({ children, right = false }: { children: React.ReactNode; right?: boolean }) {
  return (
    <p aria-hidden className={`absolute bottom-6 font-display text-base italic text-smoke ${right ? "right-8 lg:right-[4.5vw]" : "left-8 lg:left-[4.5vw]"}`}>
      {children}
    </p>
  );
}

/* A contents page of the book's themes — summaries, never excerpts */
function ThroughTheirEyes() {
  const [openKey, setOpenKey] = useState<string | null>(null);
  return (
    <div className="mt-28 grid gap-14 lg:mt-40 lg:grid-cols-12 lg:gap-10 [&>*]:min-w-0">
      <div className="lg:col-span-5">
        <Lines
          as="h3"
          label="Through Their Eyes"
          lines={[
            "Through",
            <>
              <em className="text-violet">Their</em> Eyes
            </>,
          ]}
          className="font-display text-[clamp(3.4rem,7vw,7.4rem)] leading-[0.88] tracking-[-0.03em] text-aubergine"
        />
        <Reveal delay={0.15}>
          <p className="body-copy mt-8 max-w-sm text-ink/70">
            The book explores the common challenges of co-parenting and the emotional experiences of children caught
            between two households.
          </p>
        </Reveal>
      </div>

      <div className="lg:col-span-7">
        <Reveal>
          <p className="eyebrow mb-4 text-aubergine/75">Themes the book explores</p>
        </Reveal>
        <ul className="border-t border-aubergine/20">
          {themes.map((t, i) => {
            const isOpen = openKey === t.key;
            return (
              <Reveal as="li" key={t.key} delay={i * 0.06} className="border-b border-aubergine/20">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`theme-${t.key}`}
                  onClick={() => setOpenKey(isOpen ? null : t.key)}
                  className="group flex w-full items-baseline gap-4 py-6 text-left"
                >
                  <span
                    className={`font-display text-[1.9rem] leading-tight transition-colors duration-500 sm:text-[2.4rem] ${
                      isOpen ? "italic text-violet" : "text-ink group-hover:text-violet"
                    }`}
                  >
                    {t.title}
                  </span>
                  <span
                    aria-hidden
                    className={`mb-2 hidden flex-1 border-b border-dotted transition-colors duration-500 sm:block ${
                      isOpen ? "border-violet" : "border-aubergine/30 group-hover:border-violet/60"
                    }`}
                  />
                  <span
                    aria-hidden
                    className={`ml-auto font-display text-3xl leading-none text-violet transition-transform duration-500 ease-silk sm:ml-0 ${isOpen ? "rotate-45" : ""}`}
                  >
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`theme-${t.key}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.6, ease }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-3 pb-8 sm:grid-cols-[11rem_1fr] sm:gap-8">
                        <p className="eyebrow pt-1.5 text-aubergine/75">{t.summary}</p>
                        <p className="body-copy max-w-xl text-ink/75">{t.body}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            );
          })}
        </ul>
      </div>

      <Reveal delay={0.1} className="lg:col-span-12">
        <div className="border-t border-aubergine/20 pt-8">
          <p className="eyebrow mb-4 text-aubergine/75">Co-parenting, explored</p>
          <p className="font-display text-[1.45rem] leading-relaxed text-aubergine sm:text-[1.7rem] lg:whitespace-nowrap lg:text-[clamp(1.4rem,2.15vw,2.2rem)]">
            {coparentingTopics.map((t, i) => (
              <span key={t} className="inline-block whitespace-nowrap">
                <em>{t}</em>
                {i < coparentingTopics.length - 1 && <span aria-hidden className="mx-3 text-violet-deep lg:mx-5">/</span>}
              </span>
            ))}
          </p>
        </div>
      </Reveal>
    </div>
  );
}

/* ==================================================================== */
/* The heart of the book — a pinned, scroll-revealed line              */
/* ==================================================================== */

export function ConflictQuote() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const first = useTransform(scrollYProgress, [0.02, 0.42], [0, 1]);
  const second = useTransform(scrollYProgress, [0.45, 0.85], [0, 1]);
  const light = useTransform(scrollYProgress, [0, 0.9], [0.15, 0.6]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.04, 0.98]);

  return (
    <section
      data-nav="dark"
      aria-label="The heart of the book"
      ref={ref}
      className="relative h-[260vh] bg-midnight text-ivory"
    >
      <div className="grain sticky top-0 flex h-[100svh] items-center overflow-clip">
        <motion.div
          aria-hidden
          style={{ opacity: light }}
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] bg-[radial-gradient(60%_80%_at_50%_100%,rgba(130,84,220,0.45),transparent_70%)]"
        />
        <motion.blockquote style={{ scale }} className="page-x relative">
          <p className="font-display text-[clamp(3.3rem,10.4vw,11.5rem)] leading-[0.9] tracking-[-0.035em]">
            <ScrollWords text="Children just want the conflict to end," progress={first} accent={["conflict"]} />
          </p>
          <p className="mt-8 max-w-4xl font-display text-[clamp(1.9rem,4.2vw,4.4rem)] italic leading-[1.08] text-lavender lg:ml-[16vw] lg:mt-10">
            <ScrollWords
              text="and to be wrapped in the love that only you can offer."
              progress={second}
              accent={["love"]}
              accentClass="text-ivory"
            />
          </p>
          <p className="eyebrow mt-14 text-lavender/85 lg:ml-[16vw]">The heart of the book</p>
        </motion.blockquote>
      </div>
    </section>
  );
}
