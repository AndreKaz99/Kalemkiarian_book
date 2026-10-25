"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { site } from "@/lib/site";
import { AmazonButton, ScrollWords, TextLink, ease } from "./primitives";
import { Book3D } from "./Book3D";

const titleSize = "text-[clamp(4.1rem,17.5vw,7.5rem)] lg:text-[clamp(6rem,10.6vw,12.5rem)]";

function MaskLine({ children, delay, className = "" }: { children: React.ReactNode; delay: number; className?: string }) {
  return (
    <span className={`-mb-[0.12em] block overflow-hidden pb-[0.12em] ${className}`}>
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.3, ease, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const lightOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      data-nav="dark"
      aria-label="What I Want to Tell You Is..."
      className="grain relative overflow-clip bg-midnight text-ivory lg:h-[100svh] lg:min-h-[760px]"
    >
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />

      {/* Editorial column rules */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
        {[25, 50, 75].map((x) => (
          <span key={x} className="absolute inset-y-0 w-px bg-ivory/[0.05]" style={{ left: `${x}%` }} />
        ))}
      </div>

      <h1 className="sr-only">
        {site.title} {site.subtitle}, by {site.author}
      </h1>

      <div className="page-x relative h-full pb-14 pt-28 lg:pb-0 lg:pt-0">
        {/* top meta row */}
        <motion.div
          className="relative z-20 flex items-start justify-between text-lavender lg:absolute lg:inset-x-14 lg:top-[7.5rem]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        >
          <p className="eyebrow">
            <a href="#author" className="underline decoration-lavender/40 underline-offset-[5px] transition-colors hover:text-ivory hover:decoration-ivory">
              A book by Judge {site.author}
            </a>
          </p>
          <p className="eyebrow hidden text-right lg:block">{site.publisher}</p>
        </motion.div>

        {/* Title, lines one to three */}
        <motion.div
          aria-hidden
          style={{ y: titleY }}
          className={`relative z-10 mt-10 font-display leading-[0.84] tracking-[-0.035em] lg:absolute lg:left-14 lg:top-[18vh] lg:mt-0 ${titleSize}`}
        >
          <MaskLine delay={0.25}>What I</MaskLine>
          <MaskLine delay={0.37} className="pl-[11vw] lg:pl-[8.5vw]">
            Want <em className="text-lavender">to</em>
          </MaskLine>
          <MaskLine delay={0.49}>Tell You</MaskLine>
          <MaskLine delay={0.61} className="pl-[30vw] italic text-lavender lg:hidden">
            Is...
          </MaskLine>
        </motion.div>

        {/* The book */}
        <div className="relative z-20 mt-6 lg:absolute lg:right-[4vw] lg:top-[53%] lg:mt-0 lg:w-[44vw] lg:-translate-y-1/2">
          {/* Stage lighting: one soft violet cone, centred on the book it showcases */}
          <motion.div aria-hidden style={{ opacity: lightOpacity }} className="pointer-events-none absolute inset-x-0 bottom-[6%] top-[-100vh]">
            <motion.div
              className="absolute inset-y-0 left-1/2 w-[170%] -translate-x-1/2 bg-gradient-to-b from-violet/35 via-violet/12 to-transparent blur-3xl lg:w-[130%]"
              style={{ clipPath: "polygon(44% 0, 56% 0, 100% 100%, 0 100%)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2.4, delay: 0.6 }}
            />
          </motion.div>
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 80, rotateZ: 4 }}
            animate={{ opacity: 1, y: 0, rotateZ: 0 }}
            transition={{ duration: 1.8, ease, delay: 0.55 }}
          >
            <Book3D />
          </motion.div>
        </div>

        {/* "Is..." — sits in front of the book on desktop */}
        <motion.span
          aria-hidden
          className={`pointer-events-none absolute bottom-[7vh] left-[40vw] z-30 hidden font-display italic leading-none tracking-[-0.03em] text-lavender lg:block ${titleSize}`}
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.3, ease, delay: 0.95 }}
          style={{ fontSize: "clamp(8rem, 15vw, 17rem)" }}
        >
          Is...
        </motion.span>

        {/* Subtitle + actions */}
        <motion.div
          className="relative z-20 mt-12 max-w-md lg:absolute lg:bottom-[9vh] lg:left-14 lg:mt-0 lg:max-w-[30vw]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease, delay: 1.1 }}
        >
          <div className="font-display text-[1.9rem] italic leading-[1.1] text-ivory sm:text-[2.2rem]">
            Messages From Your Child About Divorce
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-5">
            <AmazonButton tone="light">Purchase on Amazon</AmazonButton>
            <TextLink href="#the-book" className="text-ivory">
              Discover the Book
            </TextLink>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/** A quiet, dark interlude between the hero and the book. */
export function Prologue() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.55"] });
  return (
    <section data-nav="dark" aria-label="Prologue" className="grain relative bg-midnight pb-28 pt-20 text-ivory lg:pb-44 lg:pt-28">
      <div className="page-x grid gap-12 lg:grid-cols-12">
        <div ref={ref} className="lg:col-span-10">
          <p className="font-display text-[clamp(2.4rem,6vw,6.2rem)] leading-[1.02] tracking-[-0.02em]">
            <ScrollWords
              text="“Sometimes, the most important voices are the ones we struggle to hear.”"
              progress={scrollYProgress}
              accent={["voices", "hear"]}
            />
          </p>
        </div>
        <div className="flex items-end lg:col-span-4 lg:col-start-9">
          <p className="body-copy border-t border-ivory/15 pt-6 text-lavender/90">
            A powerful collection of messages that invites parents to experience divorce through the eyes of their
            children.
          </p>
        </div>
      </div>
    </section>
  );
}
