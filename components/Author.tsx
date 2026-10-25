"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { assets, site } from "@/lib/site";
import { ImageSlot, Reveal, SectionLabel, WordReveal } from "./primitives";

const perspectives = ["Judge", "Attorney", "Educator", "Mother"];

export function Author() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);

  return (
    <section id="author" aria-labelledby="author-heading" className="relative bg-ivory">
      <div className="page-x py-28 lg:py-40">
        <SectionLabel index="03" label="About the Author" className="text-burgundy" />

        <div className="mt-12 grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Portrait */}
          <div ref={ref} className="lg:col-span-5">
            <motion.div
              className="relative"
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              whileInView={{ clipPath: "inset(0% 0 0 0)" }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
            >
              <div className="relative aspect-[40/27] overflow-hidden">
                <motion.div className="absolute inset-[-4%]" style={{ y: imgY }}>
                  <ImageSlot
                    src={assets.authorPortrait.src}
                    alt={assets.authorPortrait.alt}
                    label="Author portrait"
                    hint="Replace with a photograph of Sharon L. Kalemkiarian — set assets.authorPortrait.src in lib/site.ts (4:5 ratio)."
                    sizes="(max-width: 1024px) 90vw, 40vw"
                    className="h-full w-full"
                  />
                </motion.div>
              </div>
            </motion.div>
            <div className="mt-4 flex items-center justify-between text-[0.68rem] uppercase tracking-[0.25em] text-smoke">
              <span>{site.author}</span>
              <span>Judge · Author</span>
            </div>
          </div>

          {/* Biography */}
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-10">
            <Reveal>
              <p className="eyebrow text-smoke">Meet the Author</p>
            </Reveal>
            <WordReveal
              as="h2"
              id="author-heading"
              text="Sharon L. Kalemkiarian"
              className="mt-6 font-display text-[clamp(2.8rem,5.6vw,5.4rem)] font-light leading-[0.95] tracking-[-0.02em]"
            />

            <Reveal delay={0.1}>
              <ul className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 font-display text-xl italic text-burgundy sm:text-2xl" aria-label="Perspectives">
                {perspectives.map((p, i) => (
                  <li key={p} className="flex items-center gap-4">
                    {p}
                    {i < perspectives.length - 1 && <span className="h-1 w-1 rounded-full bg-burgundy/50" aria-hidden />}
                  </li>
                ))}
              </ul>
            </Reveal>

            <div className="mt-12 space-y-6 text-[1.05rem] leading-[1.85] text-ink/80">
              <Reveal as="p">
                Sharon L. Kalemkiarian was appointed to the California Superior Court in 2014. She has served in
                dependency and family court assignments since her appointment, striving in any matter involving children
                to see things through the eyes of the child.
              </Reveal>
              <Reveal as="p" delay={0.05}>
                Before her judicial appointment, she was a certified family law specialist and a partner at Ashworth,
                Blanchet, Christenson and Kalemkiarian.
              </Reveal>
              <Reveal as="p" delay={0.1}>
                She was a clinical professor of law at the Child Advocacy Clinic at the University of San Diego School
                of Law and has lectured extensively to lawyers and judges on all aspects of family law.
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <dl className="mt-14 grid grid-cols-2 border-t border-ink/15">
                <Fact term="Appointed" detail="California Superior Court, 2014" />
                <Fact term="Assignments" detail="Dependency & family court" />
                <Fact term="B.A." detail="Princeton University" />
                <Fact term="J.D." detail="University of San Diego" />
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Fact({ term, detail }: { term: string; detail: string }) {
  return (
    <div className="border-b border-ink/15 py-5 pr-4 odd:border-r odd:pr-6 even:pl-6">
      <dt className="eyebrow text-smoke">{term}</dt>
      <dd className="mt-2 font-display text-xl leading-snug sm:text-2xl">{detail}</dd>
    </div>
  );
}
