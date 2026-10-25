"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { site } from "@/lib/site";
import { AmazonButton, GhostLink } from "./primitives";
import { Book3D } from "./Book3D";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const ghostY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <section
      id="home"
      ref={ref}
      aria-label="What I Want to Tell You Is... — introduction"
      className="grain relative overflow-hidden pt-24 lg:min-h-[100svh] lg:pt-28"
    >
      {/* atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-[10%] h-[70vmax] w-[70vmax] rounded-full bg-[radial-gradient(circle,rgba(205,186,156,0.55)_0%,rgba(250,246,238,0)_62%)]"
      />
      <motion.span
        aria-hidden
        style={{ y: ghostY }}
        className="pointer-events-none absolute -bottom-[0.18em] right-[-0.04em] select-none font-display text-[38vw] italic leading-none text-sand/50 lg:text-[26vw]"
      >
        Is...
      </motion.span>

      {/* vertical rail */}
      <div className="absolute left-6 top-1/2 hidden -translate-y-1/2 xl:block" aria-hidden>
        <p
          className="text-[0.62rem] uppercase tracking-[0.4em] text-smoke/70"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          {site.publisher}
        </p>
      </div>

      <div className="page-x relative grid gap-12 pb-16 lg:min-h-[calc(100svh-7rem)] lg:grid-cols-12 lg:grid-rows-[1fr_auto_auto_1fr] lg:gap-x-8 lg:gap-y-0 lg:pb-10">
        <motion.div style={{ y: textY }} className="relative z-10 lg:col-span-6 lg:row-start-2">
          <motion.p
            className="eyebrow flex items-center gap-4 text-burgundy"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease, delay: 0.2 }}
          >
            <span className="h-px w-10 bg-burgundy" />A book by {site.author}
          </motion.p>

          <h1 className="mt-8 font-display font-light leading-[0.9] tracking-[-0.02em] text-ink">
            <span className="sr-only">
              {site.title} {site.subtitle}
            </span>
            <span aria-hidden className="block text-[clamp(3.2rem,8.4vw,7.6rem)]">
              {["What I Want", "to Tell You"].map((line, i) => (
                <span key={line} className="block overflow-hidden pb-[0.06em]">
                  <motion.span
                    className="block"
                    initial={{ y: "105%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 1.2, ease, delay: 0.3 + i * 0.12 }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
              <span className="block overflow-hidden pb-[0.1em]">
                <motion.em
                  className="block font-normal text-burgundy"
                  initial={{ y: "105%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.2, ease, delay: 0.54 }}
                >
                  Is...
                </motion.em>
              </span>
            </span>
            <motion.span
              aria-hidden
              className="mt-6 block max-w-md font-display text-[clamp(1.25rem,2.1vw,1.7rem)] font-normal italic leading-snug tracking-normal text-smoke"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease, delay: 0.85 }}
            >
              {site.subtitle}
            </motion.span>
          </h1>
        </motion.div>

        <motion.div style={{ y: textY }} className="relative z-10 lg:col-span-6 lg:row-start-3 lg:pt-10">
          <motion.div
            className="max-w-lg border-l border-burgundy/40 pl-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 1.05 }}
          >
            <p className="font-display text-[1.45rem] leading-snug text-ink sm:text-[1.6rem]">
              &ldquo;Sometimes, the most important voices are the ones we struggle to hear.&rdquo;
            </p>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-smoke">
              A powerful collection of messages that invites parents to experience divorce through the eyes of their
              children.
            </p>
          </motion.div>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 1.2 }}
          >
            <AmazonButton>Purchase on Amazon</AmazonButton>
            <GhostLink href="#the-book">Discover the Book</GhostLink>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative row-start-2 self-center lg:col-span-6 lg:col-start-7 lg:row-span-4 lg:row-start-1"
          initial={{ opacity: 0, y: 40, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 1.6, ease, delay: 0.4 }}
        >
          <Book3D />
        </motion.div>
      </div>

      <motion.a
        href="#the-book"
        aria-label="Scroll to The Book"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[0.6rem] uppercase tracking-[0.35em] text-smoke lg:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
      >
        Scroll
        <span className="relative block h-10 w-px overflow-hidden bg-ink/15">
          <motion.span
            className="absolute left-0 top-0 h-1/2 w-full bg-burgundy"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.a>
    </section>
  );
}
