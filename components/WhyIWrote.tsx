"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { Lines, Reveal, ScrollWords, ease } from "./primitives";

const acts = [
  {
    word: "Advocate",
    place: "In the courtroom",
    text: "Sharon L. Kalemkiarian spent years representing parents and children in family court.",
  },
  {
    word: "Judge",
    place: "On the bench",
    text: "Following her appointment to the bench, she heard directly from children and made decisions involving custody and their well-being.",
  },
  {
    word: "Mother",
    place: "At home",
    text: "She also experienced divorce when her own children were young.",
  },
];

export function WhyIWrote() {
  return (
    <section id="why" data-nav="dark" aria-labelledby="why-heading" className="relative bg-aubergine text-ivory">
      {/* Opening */}
      <div className="grain">
        <div className="page-x relative pb-20 pt-28 lg:pb-28 lg:pt-40">
          <Reveal y={10} className="flex items-baseline gap-3 text-lavender">
            <span className="font-display text-xl italic">02</span>
            <span className="eyebrow">Why She Wrote It</span>
          </Reveal>
          <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:items-end">
            <Lines
              id="why-heading"
              label="Why I Wrote This Book"
              lines={[
                <>
                  <em className="text-lavender">Why</em> I Wrote
                </>,
                "This Book",
              ]}
              lineClassName={(i) => (i === 1 ? "pl-[12vw]" : "")}
              className="font-display text-[clamp(3.6rem,12vw,13.5rem)] leading-[0.84] tracking-[-0.04em] lg:col-span-9"
            />
            <Reveal delay={0.2} className="lg:col-span-3 lg:pb-6">
              <p className="body-copy text-lavender/90">
                Her perspective comes from three places at once &mdash; the counsel table, the bench, and her own
                family.
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      <Acts />

      {/* What she learned */}
      <Learned />
    </section>
  );
}

/* Three acts, travelled sideways on desktop, stacked on mobile */
function Acts() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0.05, 0.95], ["0%", "-66.6667%"]);

  return (
    <>
      {/* Desktop: pinned horizontal travel */}
      <div ref={ref} className="relative hidden h-[300vh] lg:block">
        <div className="sticky top-0 h-[100svh] overflow-clip border-y border-ivory/10 bg-midnight">
          <motion.div style={{ x }} className="flex h-full w-[300vw]">
            {acts.map((a, i) => (
              <ActPanel key={a.word} act={a} index={i} />
            ))}
          </motion.div>
          <ActProgress progress={scrollYProgress} />
        </div>
      </div>

      {/* Mobile & tablet */}
      <div className="border-y border-ivory/10 bg-midnight lg:hidden">
        {acts.map((a, i) => (
          <div key={a.word} className={`page-x relative overflow-hidden py-20 ${i > 0 ? "border-t border-ivory/10" : ""}`}>
            <span aria-hidden className="text-outline pointer-events-none absolute -right-4 top-6 select-none font-display text-[28vw] italic leading-none text-lavender/30">
              {a.word}
            </span>
            <Reveal className="relative">
              <p className="eyebrow text-lavender">
                {String(i + 1).padStart(2, "0")} — As {a.word === "Advocate" ? "an advocate" : `a ${a.word.toLowerCase()}`}
              </p>
              <h3 className="mt-5 font-display text-[3.2rem] italic leading-none">{a.place}</h3>
              <p className="body-copy mt-6 max-w-md text-ivory/80">{a.text}</p>
            </Reveal>
          </div>
        ))}
      </div>
    </>
  );
}

function ActPanel({ act, index }: { act: (typeof acts)[number]; index: number }) {
  return (
    <div className="relative flex h-full w-screen items-center">
      <span
        aria-hidden
        className="text-outline pointer-events-none absolute left-[6vw] top-1/2 -translate-y-1/2 select-none font-display text-[23vw] italic leading-none text-lavender/25"
      >
        {act.word}
      </span>
      <div className="relative ml-[46vw] max-w-[34rem] pr-14">
        <p className="eyebrow text-lavender">
          Act {["I", "II", "III"][index]} — As {act.word === "Advocate" ? "an advocate" : `a ${act.word.toLowerCase()}`}
        </p>
        <h3 className="mt-6 font-display text-[clamp(3.5rem,5.6vw,6.5rem)] italic leading-[0.95]">{act.place}</h3>
        <p className="mt-8 font-sans text-[1.25rem] leading-[1.7] text-ivory/80">{act.text}</p>
      </div>
    </div>
  );
}

function ActProgress({ progress }: { progress: MotionValue<number> }) {
  const width = useTransform(progress, [0.05, 0.95], ["0%", "100%"]);
  return (
    <div className="absolute inset-x-14 bottom-10 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-lavender/70">
      <div className="mb-4 flex justify-between">
        <span>I. Advocate</span>
        <span>II. Judge</span>
        <span>III. Mother</span>
      </div>
      <div className="relative h-px bg-ivory/15">
        <motion.span style={{ width }} className="absolute inset-y-0 left-0 bg-lavender" />
      </div>
    </div>
  );
}

function Learned() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.5"] });

  return (
    <div className="grain">
      <div className="page-x relative py-28 lg:py-44">
        <div ref={ref} className="max-w-[78rem]">
          <p className="font-display text-[clamp(2.2rem,5vw,5.2rem)] leading-[1.06] tracking-[-0.02em]">
            <ScrollWords
              text="Her personal and professional experiences showed her how easily a parent’s emotional pain can affect a child — even when the parent has the best intentions."
              progress={scrollYProgress}
              accent={["best", "intentions"]}
            />
          </p>
        </div>

        <div className="mt-24 grid gap-12 lg:mt-36 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="font-display text-[clamp(3rem,7vw,7rem)] leading-[0.95] tracking-[-0.03em]">
              <span className="relative inline-block text-ivory/45">
                Not to blame.
                <motion.span
                  aria-hidden
                  className="absolute left-[-2%] top-[55%] h-[3px] w-[104%] origin-left bg-lavender"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: "-20% 0px" }}
                  transition={{ duration: 1.1, ease, delay: 0.3 }}
                />
              </span>
            </p>
            <Reveal delay={0.4}>
              <p className="mt-6 font-display text-[clamp(2rem,4vw,3.8rem)] leading-[1.1]">
                But to offer <em className="text-lavender">understanding</em>, <em className="text-lavender">compassion</em>,
                and <em className="text-lavender">practical insight</em>.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="lg:col-span-4 lg:col-start-9 lg:self-end">
            <p className="body-copy border-l border-lavender/40 pl-6 text-ivory/80">
              She wrote the book to help parents recognize how divorce looks and feels from a child&rsquo;s perspective.
            </p>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
