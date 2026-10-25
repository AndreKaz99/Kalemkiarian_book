"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import { assets, site } from "@/lib/site";
import { ImageSlot, Reveal, SectionLabel } from "./primitives";

const ease = [0.22, 1, 0.36, 1] as const;

export function Legacy() {
  return (
    <section
      id="legacy"
      aria-labelledby="legacy-heading"
      className="grain grain-light relative overflow-hidden bg-[#221d19] text-ivory"
    >
      {/* faint ruled lines, like a composing frame */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage: "repeating-linear-gradient(to bottom, #FAF6EE 0 1px, transparent 1px 64px)" }}
      />

      <div className="page-x relative py-28 lg:py-40">
        <SectionLabel index="04" label="Our Publishing Legacy" className="text-terracotta-soft" />

        <div className="mt-12 grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Reveal>
              <h2
                id="legacy-heading"
                className="font-press text-[clamp(3.2rem,8vw,7.5rem)] leading-[0.92] tracking-[-0.01em]"
              >
                A Legacy <br />
                <em className="text-terracotta-soft">in Print</em>
              </h2>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-4 lg:col-start-9 lg:self-end" delay={0.15}>
            <Seal />
          </Reveal>
        </div>

        {/* The connection: Egypt → West */}
        <Lineage />

        {/* Story + archive */}
        <div className="mt-24 grid gap-14 lg:mt-32 lg:grid-cols-12 lg:gap-10">
          <div className="space-y-6 text-[1.05rem] leading-[1.85] text-ivory/75 lg:col-span-5">
            <Reveal as="p" className="font-press text-[1.6rem] leading-[1.4] text-ivory first-letter:float-left first-letter:mr-3 first-letter:font-press first-letter:text-[4.4rem] first-letter:leading-[0.85] first-letter:text-terracotta-soft">
              The roots of Sahag-Mesrob Press West trace back to the author&rsquo;s grandfather, who operated a printing
              press in Egypt called Sahag-Mesrob Press.
            </Reveal>
            <Reveal as="p" delay={0.05}>
              To honor and continue that family tradition, the family now publishes under the name Sahag-Mesrob Press
              West.
            </Reveal>
            <Reveal as="p" delay={0.1}>
              The publication of <em className="font-display text-[1.15em] text-ivory">What I Want to Tell You Is...</em>{" "}
              carries forward a multigenerational connection to printing, storytelling, and the written word.
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <ImageSlot
                src={assets.pressArchive.src}
                alt={assets.pressArchive.alt}
                label="Archival photograph"
                hint="Optional: a historical photograph of the original Sahag-Mesrob Press — set assets.pressArchive.src in lib/site.ts."
                sizes="(max-width: 1024px) 90vw, 45vw"
                tone="dark"
                className="aspect-[4/3] w-full sepia-[0.3]"
              />
            </Reveal>
            <TypeSorts />
          </div>
        </div>
      </div>
    </section>
  );
}

/* Animated line connecting the original press to the imprint today */
function Lineage() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const reduce = useReducedMotion();
  const drawn = inView || !!reduce;

  return (
    <div ref={ref} className="relative mt-24 lg:mt-32">
      <div className="grid grid-cols-[auto_1fr] gap-x-6 sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-x-0">
        {/* Origin */}
        <Node
          className="col-start-2 row-start-1 sm:col-start-1"
          eyebrow="The original press"
          title="Sahag-Mesrob Press"
          place="Egypt"
          visible={drawn}
          delay={0}
        />

        {/* Connector — horizontal on desktop, vertical on mobile */}
        <div className="col-start-1 row-span-3 row-start-1 flex justify-center sm:col-start-2 sm:row-span-1 sm:w-[min(30vw,22rem)] sm:px-6">
          <svg
            className="hidden h-12 w-full overflow-visible sm:block"
            viewBox="0 0 300 40"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path d="M0 20 C 90 -6, 210 46, 300 20" stroke="rgba(250,246,238,0.15)" strokeWidth="1" fill="none" vectorEffect="non-scaling-stroke" />
            <motion.path
              d="M0 20 C 90 -6, 210 46, 300 20"
              stroke="#D08A6C"
              strokeWidth="1.5"
              fill="none"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: drawn ? 1 : 0 }}
              transition={{ duration: 2.2, ease, delay: 0.5 }}
            />
          </svg>
          <svg className="h-full min-h-[10rem] w-6 overflow-visible sm:hidden" viewBox="0 0 20 200" preserveAspectRatio="none" aria-hidden>
            <path d="M10 0 V200" stroke="rgba(250,246,238,0.15)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            <motion.path
              d="M10 0 V200"
              stroke="#D08A6C"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: drawn ? 1 : 0 }}
              transition={{ duration: 2, ease, delay: 0.4 }}
            />
            <circle cx="10" cy="2" r="4" fill="#D08A6C" />
            <motion.circle
              cx="10"
              cy="198"
              r="4"
              fill="#D08A6C"
              initial={{ scale: 0 }}
              animate={{ scale: drawn ? 1 : 0 }}
              transition={{ delay: 2.2, duration: 0.5 }}
            />
          </svg>
        </div>

        {/* Today */}
        <div className="col-start-2 row-start-2 h-10 sm:hidden" aria-hidden />
        <Node
          className="col-start-2 row-start-3 sm:col-start-3 sm:row-start-1 sm:text-right"
          eyebrow="The family imprint today"
          title={site.publisher}
          place="Carrying the tradition forward"
          visible={drawn}
          delay={2.2}
          accent
        />
      </div>
    </div>
  );
}

function Node({
  eyebrow,
  title,
  place,
  visible,
  delay,
  accent = false,
  className = "",
}: {
  eyebrow: string;
  title: string;
  place: string;
  visible: boolean;
  delay: number;
  accent?: boolean;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease, delay }}
    >
      <p className="eyebrow text-ivory/50">{eyebrow}</p>
      <p className={`mt-3 font-press text-[clamp(1.9rem,3.2vw,3rem)] leading-[1.05] ${accent ? "text-terracotta-soft" : ""}`}>
        {title}
      </p>
      <p className="mt-2 font-display text-lg italic text-ivory/60">{place}</p>
    </motion.div>
  );
}

/* Circular imprint seal */
function Seal() {
  return (
    <div className="relative mx-auto h-44 w-44 sm:h-52 sm:w-52 lg:ml-auto lg:mr-0">
      <svg viewBox="0 0 200 200" className="h-full w-full motion-safe:animate-[spin_40s_linear_infinite]" aria-hidden>
        <defs>
          <path id="seal-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <circle cx="100" cy="100" r="96" fill="none" stroke="rgba(250,246,238,0.25)" />
        <circle cx="100" cy="100" r="60" fill="none" stroke="rgba(250,246,238,0.25)" />
        <text className="fill-ivory/80 font-press" fontSize="13" letterSpacing="3">
          <textPath href="#seal-circle">SAHAG-MESROB PRESS WEST · A FAMILY IMPRINT ·</textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="font-press text-4xl italic text-terracotta-soft">S·M</span>
        <span className="mt-1 text-[0.55rem] uppercase tracking-[0.35em] text-ivory/60">Press West</span>
      </div>
      <span className="sr-only">Sahag-Mesrob Press West — a family imprint</span>
    </div>
  );
}

/* Movable-type sorts: mirrored, as set in a press — hover or tap to "print" them readable */
function TypeSorts() {
  const [printed, setPrinted] = useState(false);
  const word = "SAHAG-MESROB".split("");
  return (
    <Reveal className="mt-10" delay={0.1}>
      <button
        type="button"
        onMouseEnter={() => setPrinted(true)}
        onMouseLeave={() => setPrinted(false)}
        onClick={() => setPrinted((p) => !p)}
        aria-pressed={printed}
        aria-label="Sahag-Mesrob, set in movable type. Press to make an impression."
        className="group block w-full text-left"
      >
        <span className="flex flex-wrap gap-1 sm:gap-1.5" aria-hidden>
          {word.map((ch, i) => (
            <motion.span
              key={i}
              className="flex h-11 w-8 items-center justify-center rounded-[2px] border border-ivory/15 bg-gradient-to-b from-[#3a322b] to-[#2b2520] font-press text-xl text-ivory/90 shadow-[inset_0_-3px_0_rgba(0,0,0,0.35)] sm:h-14 sm:w-10 sm:text-2xl"
              animate={{ rotateY: printed ? 0 : 180, color: printed ? "#D08A6C" : "#FAF6EE" }}
              transition={{ duration: 0.6, ease, delay: i * 0.035 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {ch}
            </motion.span>
          ))}
        </span>
        <span className="mt-4 block text-[0.65rem] uppercase tracking-[0.3em] text-ivory/45 transition-colors group-hover:text-ivory/70">
          {printed ? "An impression, as it would appear on the page" : "Set in reverse, as type sits in the press — hover or tap"}
        </span>
      </button>
    </Reveal>
  );
}
