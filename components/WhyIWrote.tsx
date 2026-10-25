"use client";

import { motion, useScroll } from "framer-motion";
import { useRef } from "react";
import { Lines, Reveal, ScrollWords, ease } from "./primitives";

const vantages = [
  {
    role: "Advocate",
    place: "In the courtroom",
    text: "Sharon L. Kalemkiarian spent years representing parents and children in family court.",
  },
  {
    role: "Judge",
    place: "On the bench",
    text: "Following her appointment to the bench, she heard directly from children and made decisions involving custody and their well-being.",
  },
  {
    role: "Mother",
    place: "At home",
    text: "She also experienced divorce when her own children were young.",
  },
];

export function WhyIWrote() {
  return (
    <section id="why" data-nav="dark" aria-labelledby="why-heading" className="grain relative bg-aubergine text-ivory">
      <div className="page-x relative pb-24 pt-28 lg:pb-32 lg:pt-40">
        <Reveal y={10} className="flex items-baseline gap-3 text-lavender">
          <span className="font-display text-xl italic">03</span>
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
              Her perspective comes from three places at once: the counsel table, the bench, and her own family.
            </p>
          </Reveal>
        </div>

        <Vantages />
      </div>

      <Learned />
    </section>
  );
}

/* Three vantage points, read along a single ruled line */
function Vantages() {
  return (
    <div className="relative mt-20 lg:mt-28">
      <motion.span
        aria-hidden
        className="absolute left-0 top-0 hidden h-px w-full origin-left bg-lavender/50 lg:block"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 1.6, ease }}
      />
      <ol className="grid lg:grid-cols-3">
        {vantages.map((v, i) => (
          <Reveal
            as="li"
            key={v.role}
            delay={0.25 + i * 0.15}
            className={`relative border-t border-ivory/15 py-8 lg:border-t-0 lg:pt-10 ${i > 0 ? "lg:pl-10" : ""} ${i < 2 ? "lg:pr-10" : ""}`}
          >
            <span aria-hidden className="absolute -top-[5px] left-0 hidden h-[9px] w-[9px] rounded-full bg-lavender lg:block" style={{ left: i > 0 ? "2.5rem" : 0 }} />
            <p className="eyebrow text-lavender/80">{v.place}</p>
            <h3 className="mt-3 font-display text-[clamp(2.6rem,4vw,3.8rem)] italic leading-none">{v.role}</h3>
            <p className="body-copy mt-5 max-w-sm text-ivory/80">{v.text}</p>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}

function Learned() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.5"] });

  return (
    <div className="border-t border-ivory/10">
      <div className="page-x relative py-24 lg:py-36">
        <div ref={ref} className="max-w-[78rem]">
          <p className="font-display text-[clamp(2.2rem,5vw,5.2rem)] leading-[1.06] tracking-[-0.02em]">
            <ScrollWords
              text="Her personal and professional experiences showed her how easily a parent’s emotional pain can affect a child, even when the parent has the best intentions."
              progress={scrollYProgress}
              accent={["best", "intentions"]}
            />
          </p>
        </div>

        <div className="mt-20 grid gap-12 lg:mt-28 lg:grid-cols-12">
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
