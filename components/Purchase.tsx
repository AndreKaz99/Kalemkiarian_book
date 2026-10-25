"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import Image from "next/image";
import { AMAZON_URL, assets, site, withBasePath } from "@/lib/site";
import { AmazonButton, CoverArt, Reveal, WordReveal } from "./primitives";

export function Purchase() {
  return (
    <section id="purchase" aria-labelledby="purchase-heading" className="bg-ivory py-6 sm:py-10">
      <div className="mx-auto max-w-[110rem] px-3 sm:px-6">
        <div className="grain grain-light relative overflow-hidden rounded-[2px] bg-burgundy-deep text-ivory">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-[20%] top-1/2 h-[120%] w-[70%] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(180,88,58,0.45)_0%,rgba(92,31,38,0)_65%)]"
          />
          <div className="relative grid items-center gap-16 px-6 py-24 sm:px-12 lg:grid-cols-12 lg:gap-10 lg:px-20 lg:py-36">
            <div className="flex justify-center lg:col-span-5">
              <TiltCover />
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <Reveal>
                <p className="eyebrow text-terracotta-soft">Available now</p>
              </Reveal>
              <WordReveal
                as="h2"
                id="purchase-heading"
                text="A Different Perspective Can Change Everything."
                className="mt-6 font-display text-[clamp(2.6rem,5.4vw,5.2rem)] font-light leading-[0.98] tracking-[-0.02em]"
              />
              <Reveal delay={0.15}>
                <p className="mt-8 max-w-lg text-[1.08rem] leading-[1.8] text-ivory/80">
                  Discover a compassionate perspective on divorce, co-parenting, and the voices of children who deserve
                  to be heard.
                </p>
              </Reveal>
              <Reveal delay={0.25}>
                <div className="mt-12 border-t border-ivory/20 pt-8">
                  <p className="font-display text-2xl italic leading-snug sm:text-[1.7rem]">
                    What I Want to Tell You Is... {site.subtitle}
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-[0.28em] text-ivory/60">by {site.author}</p>
                  <AmazonButton variant="light" size="lg" className="mt-10 w-full sm:w-auto">
                    Get the Book on Amazon
                  </AmazonButton>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** The cover, presented as an object — tilts under the pointer, links to Amazon. */
function TiltCover() {
  const reduce = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(-14);
  const srx = useSpring(rx, { stiffness: 120, damping: 16 });
  const sry = useSpring(ry, { stiffness: 120, damping: 16 });

  const onMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ry.set(-14 + x * 22);
    rx.set(-y * 14);
  };
  const reset = () => {
    rx.set(0);
    ry.set(-14);
  };

  return (
    <div style={{ perspective: "1600px" }} className="relative">
      {/* back cover, fanned behind */}
      <motion.div
        aria-hidden
        className="absolute inset-0 overflow-hidden rounded-r-[4px] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7)]"
        initial={{ opacity: 0, x: 0, rotate: 0 }}
        whileInView={{ opacity: 1, x: "-22%", rotate: -7 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      >
        <Image src={withBasePath(assets.bookBackCover.src)} alt="" fill sizes="(max-width: 1024px) 60vw, 320px" className="object-cover brightness-[0.8]" />
      </motion.div>
      <div aria-hidden className="absolute -bottom-8 left-1/2 h-8 w-3/4 -translate-x-1/2 rounded-[50%] bg-black/50 blur-2xl" />
      <motion.a
        href={AMAZON_URL}
        target="_blank"
        rel="noopener noreferrer"
        onPointerMove={onMove}
        onPointerLeave={reset}
        style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative block aspect-[2/3] w-[min(68vw,320px)] lg:w-[min(30vw,360px)]"
      >
        <span className="sr-only">Buy {site.title} on Amazon (opens in a new tab)</span>
        {/* page block */}
        <span
          aria-hidden
          className="page-edges absolute left-[calc(100%-14px)] top-[1.5%] h-[97%] w-6"
          style={{ transform: "translateZ(-12px) rotateY(90deg)" }}
        />
        <span aria-hidden className="absolute inset-0 bg-[#1c1815]" style={{ transform: "translateZ(-24px)" }} />
        <span className="absolute inset-0 block overflow-hidden rounded-r-[4px] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)]">
          <CoverArt sizes="(max-width: 1024px) 68vw, 360px" />
          <span aria-hidden className="pointer-events-none absolute inset-y-0 left-[3.5%] w-[2px] bg-gradient-to-r from-black/25 via-white/20 to-transparent" />
          <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/0 to-white/20" />
        </span>
      </motion.a>
    </div>
  );
}
