"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { assets, withBasePath } from "@/lib/site";
import { Reveal, ease } from "./primitives";

const perspectives = ["a judge", "an attorney", "an educator", "a mother"];

const record = [
  {
    label: "Bench",
    items: ["California Superior Court, appointed 2014", "Dependency and family court assignments"],
  },
  {
    label: "Practice",
    items: ["Certified family law specialist", "Partner, Ashworth, Blanchet, Christenson and Kalemkiarian"],
  },
  {
    label: "Teaching",
    items: [
      "Clinical professor of law, Child Advocacy Clinic, University of San Diego School of Law",
      "Lectured extensively to lawyers and judges on all aspects of family law",
    ],
  },
  { label: "Education", items: ["B.A., Princeton University", "J.D., University of San Diego"] },
];

export function Author() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const nameX = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);

  return (
    <section id="author" data-nav="light" aria-labelledby="author-heading" className="relative overflow-clip bg-ivory text-ink">
      <div ref={ref} className="page-x relative pb-28 pt-24 lg:pb-40 lg:pt-32">
        <div className="flex items-baseline justify-between text-aubergine">
          <Reveal y={10} className="flex items-baseline gap-3">
            <span className="font-display text-xl italic">03</span>
            <span className="eyebrow">Meet the Author</span>
          </Reveal>
          <Reveal y={10} className="eyebrow hidden text-aubergine/60 sm:block">
            Profile
          </Reveal>
        </div>

        {/* Name, set enormous */}
        <h2 id="author-heading" className="relative z-0 mt-12 lg:mt-16">
          <Reveal y={20}>
            <span className="block font-display text-[clamp(2.2rem,5vw,5rem)] italic leading-none text-violet">Sharon L.</span>
          </Reveal>
          <motion.span
            style={{ x: nameX }}
            className="block overflow-visible whitespace-nowrap font-display text-[16.2vw] leading-[0.82] tracking-[-0.045em] text-aubergine 2xl:text-[15rem]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.3, ease }}
          >
            Kalemkiarian
          </motion.span>
        </h2>

        <div className="relative grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Portrait overlaps the name */}
          <div className="relative z-10 order-1 -mt-[4vw] lg:order-2 lg:col-span-6 lg:col-start-7 lg:-mt-[7vw]">
            <motion.figure style={{ y: photoY }} className="relative ml-auto max-w-[560px]">
              <div className="relative">
              <div aria-hidden className="absolute -bottom-4 -left-4 h-full w-full border border-violet/60" />
              <motion.div
                className="relative aspect-[40/27] overflow-hidden bg-lilac"
                initial={{ clipPath: "inset(0 0 100% 0)" }}
                whileInView={{ clipPath: "inset(0 0 0% 0)" }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
              >
                <Image
                  src={withBasePath(assets.authorPortrait.src as string)}
                  alt={assets.authorPortrait.alt}
                  fill
                  sizes="(max-width: 1024px) 92vw, 560px"
                  className="object-cover transition-transform duration-[1.6s] ease-silk hover:scale-[1.03]"
                />
              </motion.div>
              </div>
              <figcaption className="mt-7 flex items-baseline justify-between text-[0.66rem] font-semibold uppercase tracking-[0.3em] text-smoke">
                <span>Judge Sharon L. Kalemkiarian</span>
                <span className="text-violet">Author</span>
              </figcaption>
            </motion.figure>
          </div>

          {/* Lead + perspectives */}
          <div className="order-2 lg:order-1 lg:col-span-6 lg:pt-16">
            <Perspective />
            <Reveal delay={0.1}>
              <p className="mt-10 font-display text-[1.75rem] leading-[1.3] text-ink sm:text-[2.05rem]">
                Sharon L. Kalemkiarian was appointed to the California Superior Court in 2014. She has served in
                dependency and family court assignments since her appointment,{" "}
                <em className="text-violet">
                  striving in any matter involving children to see things through the eyes of the child.
                </em>
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-20 grid gap-14 lg:mt-28 lg:grid-cols-12 lg:gap-10">
          <div className="body-copy space-y-6 text-ink/75 lg:col-span-5">
            <Reveal as="p">
              Before her judicial appointment, she was a certified family law specialist and a partner at Ashworth,
              Blanchet, Christenson and Kalemkiarian.
            </Reveal>
            <Reveal as="p" delay={0.05}>
              She was a clinical professor of law at the Child Advocacy Clinic at the University of San Diego School of
              Law and has lectured extensively to lawyers and judges on all aspects of family law.
            </Reveal>
            <Reveal as="p" delay={0.1}>
              Judge Kalemkiarian holds a B.A. from Princeton University and a J.D. from the University of San Diego.
            </Reveal>
          </div>

          {/* The record, set like a colophon */}
          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <dl className="border-t border-aubergine/20">
              {record.map((r) => (
                <div key={r.label} className="grid grid-cols-[6.5rem_1fr] gap-6 border-b border-aubergine/20 py-5 sm:grid-cols-[8rem_1fr]">
                  <dt className="eyebrow pt-1.5 text-violet">{r.label}</dt>
                  <dd className="space-y-1.5 font-display text-[1.3rem] leading-snug text-ink sm:text-[1.45rem]">
                    {r.items.map((it) => (
                      <p key={it}>{it}</p>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* "A perspective shaped as a judge / an attorney / an educator / a mother" */
function Perspective() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((n) => (n + 1) % perspectives.length), 2200);
    return () => clearInterval(id);
  }, []);
  return (
    <Reveal>
      <p className="font-display text-[clamp(2rem,3.4vw,3.2rem)] leading-tight text-aubergine">
        <span className="sr-only">A perspective shaped as a judge, an attorney, an educator, and a mother.</span>
        <span aria-hidden>
          A perspective shaped as{" "}
          <span className="relative inline-flex h-[1.15em] overflow-hidden align-bottom">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.em
                key={perspectives[i]}
                className="block whitespace-nowrap text-violet"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.7, ease }}
              >
                {perspectives[i]}.
              </motion.em>
            </AnimatePresence>
          </span>
        </span>
      </p>
    </Reveal>
  );
}
