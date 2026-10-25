"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { Reveal, SectionLabel, WordReveal } from "./primitives";

const chapters = [
  {
    place: "In the courtroom",
    role: "As an advocate",
    text: "Sharon L. Kalemkiarian spent years representing parents and children in family court.",
  },
  {
    place: "On the bench",
    role: "As a judge",
    text: "Following her appointment to the bench, she heard directly from children and made decisions involving custody and their well-being.",
  },
  {
    place: "At home",
    role: "As a mother",
    text: "She also experienced divorce when her own children were young.",
  },
];

export function WhyIWrote() {
  const trackRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start 0.7", "end 0.6"] });
  const line = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });

  return (
    <section id="why" aria-labelledby="why-heading" className="grain relative overflow-hidden bg-sand/60">
      <div className="page-x py-28 lg:py-40">
        <SectionLabel index="02" label="Why She Wrote It" className="text-burgundy" />

        <div className="mt-12 grid gap-16 lg:grid-cols-12 lg:gap-10">
          {/* Heading column */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <WordReveal
                as="h2"
                id="why-heading"
                text="Why I Wrote This Book"
                className="font-display text-[clamp(3rem,6.4vw,6.2rem)] font-light leading-[0.92] tracking-[-0.02em]"
              />
              <Reveal delay={0.2}>
                <p className="mt-10 max-w-sm text-[1.02rem] leading-[1.85] text-ink/75">
                  Few people have seen divorce from as many sides. Sharon&rsquo;s perspective comes from the counsel
                  table, the bench &mdash; and her own family.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Staggered chapters */}
          <div className="lg:col-span-6 lg:col-start-7">
            <ol ref={trackRef} className="relative space-y-20 pl-10 sm:pl-14 lg:space-y-28">
              <span aria-hidden className="absolute left-0 top-2 h-[calc(100%-1rem)] w-px bg-ink/15" />
              <motion.span
                aria-hidden
                className="absolute left-0 top-2 h-[calc(100%-1rem)] w-px origin-top bg-burgundy"
                style={{ scaleY: line }}
              />
              {chapters.map((c, i) => (
                <li key={c.place} className="relative">
                  <span
                    aria-hidden
                    className="absolute -left-10 top-3 h-2.5 w-2.5 -translate-x-1/2 rounded-full border border-burgundy bg-ivory sm:-left-14"
                  />
                  <Reveal className={i === 1 ? "lg:pl-16" : i === 2 ? "lg:pl-8" : ""}>
                    <p className="eyebrow text-burgundy">{c.role}</p>
                    <h3 className="mt-3 font-display text-4xl italic sm:text-5xl">{c.place}</h3>
                    <p className="mt-5 max-w-md text-[1.05rem] leading-[1.8] text-ink/75">{c.text}</p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* What she learned */}
        <div className="mt-28 grid gap-12 lg:mt-40 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-7">
            <p className="font-display text-[clamp(1.9rem,3.6vw,3.2rem)] font-light leading-[1.18]">
              Her personal and professional experiences showed her how easily a parent&rsquo;s emotional pain can
              affect a child &mdash; <em className="text-burgundy">even when the parent has the best intentions.</em>
            </p>
          </Reveal>
          <Reveal className="lg:col-span-4 lg:col-start-9 lg:self-end" delay={0.15}>
            <p className="text-[1.02rem] leading-[1.85] text-ink/75">
              She wrote the book to help parents recognize how divorce looks and feels from a child&rsquo;s
              perspective.
            </p>
          </Reveal>
        </div>

        {/* Purpose band */}
        <Reveal className="mt-24 lg:mt-32">
          <div className="grid border-y border-ink/20 sm:grid-cols-3">
            {[
              ["Not blame.", "The purpose is not to blame parents."],
              ["Understanding.", "To offer understanding and compassion."],
              ["Insight.", "And practical insight for the decisions ahead."],
            ].map(([word, line], i) => (
              <div
                key={word}
                className={`py-10 sm:px-8 ${i > 0 ? "border-t border-ink/20 sm:border-l sm:border-t-0" : ""} ${
                  i === 0 ? "sm:pl-0" : ""
                }`}
              >
                <p className={`font-display text-4xl lg:text-5xl ${i === 0 ? "text-ink/40 line-through decoration-burgundy/70 decoration-1" : "italic"}`}>
                  {word}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-smoke">{line}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
