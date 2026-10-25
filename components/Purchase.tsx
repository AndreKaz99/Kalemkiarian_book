"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { site } from "@/lib/site";
import { AmazonButton, CoverImage, Lines, Reveal } from "./primitives";

export function Purchase() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const glow = useTransform(scrollYProgress, [0.2, 1], [0, 1]);

  return (
    <section
      id="purchase"
      ref={ref}
      data-nav="dark"
      aria-labelledby="purchase-heading"
      className="grain relative overflow-clip bg-midnight text-ivory"
    >
      <motion.div
        aria-hidden
        style={{ opacity: glow }}
        className="pointer-events-none absolute bottom-0 right-0 h-[80%] w-full bg-[radial-gradient(45%_60%_at_74%_70%,rgba(130,84,220,0.4),transparent_70%)] lg:w-[70%]"
      />

      {/* poster frame & marginalia */}
      <div aria-hidden className="pointer-events-none absolute inset-3 border border-ivory/10 sm:inset-6" />
      <div className="relative">
        <div className="page-x flex justify-between pt-12 text-[0.75rem] font-semibold uppercase tracking-[0.3em] text-lavender/80 sm:pt-14">
          <span>{site.publisher}</span>
          <span className="hidden sm:inline">Available on Amazon</span>
        </div>

        <div className="page-x grid items-center gap-16 py-20 lg:grid-cols-12 lg:gap-6 lg:py-24">
          <div className="order-2 lg:order-1 lg:col-span-7">
            <Lines
              id="purchase-heading"
              label="A Different Perspective Can Change Everything."
              lines={[
                "A Different",
                "Perspective",
                <span key="c" className="pl-[6vw]">
                  Can Change
                </span>,
                <em key="e" className="text-lavender">
                  Everything.
                </em>,
              ]}
              className="font-display text-[clamp(3.4rem,9.2vw,10rem)] leading-[0.98] tracking-[-0.04em]"
            />
            <Reveal delay={0.2}>
              <p className="body-copy mt-12 max-w-xl text-ivory/80">
                Discover a compassionate perspective on divorce, co-parenting, and the voices of children who deserve to
                be heard.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-12 flex flex-col gap-8 border-t border-ivory/15 pt-8 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="font-display text-[1.7rem] italic leading-tight">
                    What I Want to Tell You Is...
                    <br />
                    <span className="text-lavender">{site.subtitle}</span>
                  </p>
                  <p className="eyebrow mt-3 text-ivory/55">by Judge {site.author}</p>
                </div>
                <AmazonButton tone="violet" large className="w-full shrink-0 whitespace-nowrap !px-6 !text-[0.75rem] sm:w-auto sm:!px-9 sm:!text-[0.8rem]">
                  Get the Book on Amazon
                </AmazonButton>
              </div>
            </Reveal>
          </div>

          <div className="order-1 flex justify-center lg:order-2 lg:col-span-5">
            <PosterBook />
          </div>
        </div>

        <div className="page-x flex justify-between pb-12 text-[0.75rem] font-semibold uppercase tracking-[0.3em] text-lavender/80 sm:pb-14">
          <span>Messages From Your Child About Divorce</span>
          <span className="hidden sm:inline">Judge {site.author}</span>
        </div>
      </div>
    </section>
  );
}

/** The book as an object: front cover tilting under the pointer, back cover fanned behind. Not a link: the button beside it already goes to Amazon. */
function PosterBook() {
  const reduce = useReducedMotion();
  const rx = useMotionValue(4);
  const ry = useMotionValue(-20);
  const srx = useSpring(rx, { stiffness: 110, damping: 16 });
  const sry = useSpring(ry, { stiffness: 110, damping: 16 });

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(-20 + ((e.clientX - r.left) / r.width - 0.5) * 26);
    rx.set(4 - ((e.clientY - r.top) / r.height - 0.5) * 16);
  };
  const reset = () => {
    rx.set(4);
    ry.set(-20);
  };

  return (
    <div className="relative" style={{ perspective: "1800px" }}>
      <div aria-hidden className="absolute -bottom-10 left-1/2 h-10 w-[90%] -translate-x-1/2 rounded-[50%] bg-black/70 blur-2xl" />
      {/* back cover, fanned */}
      <motion.div
        aria-hidden
        className="absolute inset-0 overflow-hidden rounded-r-[3px]"
        initial={{ x: 0, rotate: 0, opacity: 0 }}
        whileInView={{ x: "-24%", rotate: -8, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
      >
        <CoverImage back sizes="(max-width: 1024px) 64vw, 380px" />
        <div className="absolute inset-0 bg-midnight/30" />
      </motion.div>

      <motion.div
        onPointerMove={onMove}
        onPointerLeave={reset}
        style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
        role="img"
        aria-label={`${site.title}, front and back covers`}
        className="group relative block aspect-[2/3] w-[min(64vw,330px)] lg:w-[min(28vw,400px)]"
      >
        <span
          aria-hidden
          className="page-edges absolute left-[calc(100%-15px)] top-[1.5%] h-[97%] w-[26px]"
          style={{ transform: "translateZ(-13px) rotateY(90deg)" }}
        />
        <span aria-hidden className="absolute inset-0 bg-[#2a2550]" style={{ transform: "translateZ(-26px)" }} />
        <span className="absolute inset-0 block overflow-hidden rounded-r-[3px] shadow-[0_50px_90px_-30px_rgba(0,0,0,0.85)]">
          <CoverImage sizes="(max-width: 1024px) 64vw, 400px" />
          <span aria-hidden className="pointer-events-none absolute inset-y-0 left-[3.2%] w-[3px] bg-gradient-to-r from-black/30 via-white/25 to-transparent" />
          <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/25 opacity-60 transition-opacity duration-700 group-hover:opacity-100" />
        </span>
      </motion.div>
    </div>
  );
}
