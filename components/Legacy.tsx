"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { assets, site, withBasePath } from "@/lib/site";
import { ArchivePlaceholder, Reveal, ease } from "./primitives";

export function Legacy() {
  return (
    <section id="legacy" data-nav="light" aria-labelledby="legacy-heading" className="laid-paper relative overflow-clip text-aubergine">
      <CropMarks />

      {/* mirrored type, as it sits in the forme */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-[4vw] top-[6%] select-none font-press text-[34vw] leading-none text-aubergine/[0.045]"
        style={{ transform: "scaleX(-1)" }}
      >
        SM
      </span>

      <div className="page-x relative pb-28 pt-24 lg:pb-40 lg:pt-32">
        <div className="flex items-baseline justify-between">
          <Reveal y={10} className="flex items-baseline gap-3">
            <span className="font-display text-xl italic">04</span>
            <span className="eyebrow">Our Publishing Legacy</span>
          </Reveal>
          <Reveal y={10} className="eyebrow hidden text-aubergine/60 sm:block">
            An exhibit in two plates
          </Reveal>
        </div>

        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-8">
            <h2 id="legacy-heading" className="font-press text-[clamp(3.6rem,10.5vw,11.5rem)] leading-[0.86] tracking-[-0.02em]">
              A Legacy <br />
              <em className="pl-[8vw] text-violet">in Print</em>
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-4 lg:pb-4">
            <p className="font-press text-[1.55rem] leading-[1.4] first-letter:float-left first-letter:mr-3 first-letter:font-press first-letter:text-[4.6rem] first-letter:leading-[0.8] first-letter:text-violet">
              The roots of {site.publisher} trace back to the author&rsquo;s grandfather, who operated a printing press in
              Egypt called Sahag-Mesrob Press.
            </p>
          </Reveal>
        </div>

        <Plates />

        <div className="mt-24 grid gap-14 lg:mt-32 lg:grid-cols-12 lg:gap-10">
          <div className="body-copy space-y-6 text-aubergine/85 lg:col-span-5">
            <Reveal as="p">
              To honor and continue that family tradition, the family now publishes under the name Sahag-Mesrob Press
              West.
            </Reveal>
            <Reveal as="p" delay={0.05}>
              The publication of <em className="font-display text-[1.2em] text-aubergine">What I Want to Tell You Is...</em>{" "}
              carries forward a multigenerational connection to printing, storytelling, and the written word.
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <PressInteraction />
          </div>
        </div>
      </div>
    </section>
  );
}

/* Two framed plates joined by a line drawn as you scroll */
function Plates() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "center 0.45"] });
  const draw = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const labelOpacity = useTransform(scrollYProgress, [0.6, 1], [0, 1]);

  return (
    <div ref={ref} className="relative mt-20 grid items-start gap-6 lg:mt-28 lg:grid-cols-[1fr_minmax(8rem,14rem)_1fr] lg:gap-0">
      {/* Plate I */}
      <Plate
        numeral="I"
        title="Sahag-Mesrob Press"
        place="Egypt"
        note="The printing press operated by the author’s grandfather."
      >
        <ArchivePlaceholder className="aspect-[4/5] w-full" />
      </Plate>

      {/* Connector */}
      <div className="relative flex items-center justify-center py-4 lg:h-full lg:py-0" aria-hidden>
        <svg className="hidden h-[2px] w-full overflow-visible lg:block lg:-mt-[18%]" viewBox="0 0 100 2" preserveAspectRatio="none">
          <line x1="0" y1="1" x2="100" y2="1" stroke="rgba(52,27,80,0.18)" strokeWidth="1" vectorEffect="non-scaling-stroke" strokeDasharray="3 4" />
          <motion.line x1="0" y1="1" x2="100" y2="1" stroke="#8254DC" strokeWidth="2" vectorEffect="non-scaling-stroke" style={{ pathLength: draw }} />
        </svg>
        <svg className="h-24 w-[2px] overflow-visible lg:hidden" viewBox="0 0 2 100" preserveAspectRatio="none">
          <line x1="1" y1="0" x2="1" y2="100" stroke="rgba(52,27,80,0.18)" strokeWidth="1" vectorEffect="non-scaling-stroke" strokeDasharray="3 4" />
          <motion.line x1="1" y1="0" x2="1" y2="100" stroke="#8254DC" strokeWidth="2" vectorEffect="non-scaling-stroke" style={{ pathLength: draw }} />
        </svg>
        <motion.p
          style={{ opacity: labelOpacity }}
          className="absolute bg-paper px-3 text-center font-press text-base italic leading-tight text-violet lg:-mt-[18%]"
        >
          carried forward
        </motion.p>
      </div>

      {/* Plate II */}
      <Plate
        numeral="II"
        title="Sahag-Mesrob Press West"
        place="San Diego, California"
        note="The family imprint today, and the publisher of What I Want to Tell You Is..."
        offset
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#fbf9f4]">
          <Image
            src={withBasePath(assets.titlePage.src)}
            alt={assets.titlePage.alt}
            fill
            sizes="(max-width: 1024px) 90vw, 40vw"
            className="object-contain p-[8%] mix-blend-multiply"
          />
        </div>
      </Plate>
    </div>
  );
}

function Plate({
  numeral,
  title,
  place,
  note,
  children,
  offset = false,
}: {
  numeral: string;
  title: string;
  place: string;
  note: string;
  children: React.ReactNode;
  offset?: boolean;
}) {
  return (
    <Reveal className={offset ? "lg:mt-24" : ""}>
      <figure>
        <div className="border border-aubergine/25 bg-[#efe8dc] p-3 shadow-[0_30px_60px_-40px_rgba(52,27,80,0.6)] sm:p-4">
          {children}
        </div>
        <figcaption className="mt-6 grid grid-cols-[2.5rem_1fr] gap-x-4">
          <span className="font-press text-3xl italic leading-none text-violet">{numeral}.</span>
          <span>
            <span className="block font-press text-[1.7rem] leading-tight sm:text-[2rem]">{title}</span>
            <span className="eyebrow mt-2 block text-aubergine/60">{place}</span>
            <span className="mt-3 block max-w-sm font-display text-lg italic leading-snug text-aubergine/75">{note}</span>
          </span>
        </figcaption>
      </figure>
    </Reveal>
  );
}

/* Movable type: set in reverse, pulled through the press to make a readable impression */
function PressInteraction() {
  const [pressed, setPressed] = useState(false);
  const word = "SAHAG-MESROB".split("");
  return (
    <Reveal>
      <div className="border border-aubergine/20 bg-[#ece4d6]/60 p-6 sm:p-8">
        <div className="flex items-baseline justify-between">
          <p className="eyebrow text-aubergine/70">The forme</p>
          <p className="font-display text-sm italic text-aubergine/60">type is set in reverse</p>
        </div>

        {/* composing stick */}
        <div className="relative mt-6">
          <motion.div
            aria-hidden
            className="absolute -top-3 left-0 right-0 z-10 h-3 bg-aubergine"
            initial={false}
            animate={{ y: pressed ? [0, 22, 0] : 0, opacity: pressed ? [0, 1, 0] : 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
          <div className="flex flex-wrap gap-[3px] sm:gap-1" aria-hidden>
            {word.map((ch, i) => (
              <span
                key={i}
                className="flex h-12 w-[1.9rem] items-center justify-center bg-gradient-to-b from-[#4a3166] to-[#2c1843] font-press text-2xl text-lilac shadow-[inset_0_-4px_0_rgba(0,0,0,0.35)] sm:h-14 sm:w-9 sm:text-[1.7rem]"
                style={{ transform: "scaleX(-1)" }}
              >
                {ch}
              </span>
            ))}
          </div>
        </div>

        {/* impression */}
        <div className="relative mt-6 flex h-20 items-center justify-center overflow-hidden border border-dashed border-aubergine/25 bg-[#fbf8f2]">
          <AnimatePresence>
            {pressed ? (
              <motion.p
                key="print"
                className="font-press text-[clamp(1.6rem,4.4vw,2.6rem)] tracking-[0.06em] text-aubergine"
                initial={{ opacity: 0, filter: "blur(6px)", scale: 1.04 }}
                animate={{ opacity: 0.92, filter: "blur(0px)", scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease, delay: 0.35 }}
              >
                SAHAG-MESROB
              </motion.p>
            ) : (
              <motion.p key="blank" className="eyebrow text-aubergine/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                Blank sheet
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <button
          type="button"
          onClick={() => setPressed((p) => !p)}
          aria-pressed={pressed}
          className="group mt-6 inline-flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-violet"
        >
          <span className="relative pb-1">
            {pressed ? "Reset the sheet" : "Pull an impression"}
            <span className="absolute bottom-0 left-0 h-px w-full origin-left bg-current transition-transform duration-500 ease-silk group-hover:scale-x-50" />
          </span>
        </button>
      </div>
    </Reveal>
  );
}

function CropMarks() {
  const mark = (
    <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden>
      <circle cx="17" cy="17" r="7" fill="none" stroke="currentColor" strokeWidth="0.8" />
      <path d="M17 0v34M0 17h34" stroke="currentColor" strokeWidth="0.8" />
    </svg>
  );
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 text-aubergine/30">
      <span className="absolute left-4 top-4 sm:left-6 sm:top-6">{mark}</span>
      <span className="absolute right-4 top-4 sm:right-6 sm:top-6">{mark}</span>
      <span className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">{mark}</span>
      <span className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6">{mark}</span>
    </div>
  );
}
