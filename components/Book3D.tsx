"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { AMAZON_URL, site } from "@/lib/site";
import { Arrow, CoverArt } from "./primitives";

/**
 * Interactive 3D hardcover.
 * — Tilts toward the pointer (fine pointers only, never with reduced motion)
 * — Hover lifts the book and lets the cover fall slightly ajar
 * — Click opens the cover, then turns the flyleaf, revealing an introduction + purchase link
 *
 * Geometry: --w is the book width, --d its thickness. Pages sit between the
 * covers; edges are four thin planes rotated into place.
 */

const turnEase = [0.65, 0, 0.35, 1] as const;

export function Book3D() {
  const reduce = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const [openScale, setOpenScale] = useState(1);
  // On narrow screens the spread can't fit legibly: keep full size and let the left page slide off-stage
  const [compact, setCompact] = useState(false);
  const [bookW, setBookW] = useState(0);
  const [closing, setClosing] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();

  const toggle = useCallback((next: boolean) => {
    setOpen(next);
    clearTimeout(closeTimer.current);
    if (!next) {
      setClosing(true);
      closeTimer.current = setTimeout(() => setClosing(false), 2000);
    } else {
      setClosing(false);
    }
  }, []);
  useEffect(() => () => clearTimeout(closeTimer.current), []);

  /* Pointer tilt -------------------------------------------------- */
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 70, damping: 18, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 70, damping: 18, mass: 0.6 });

  const baseY = open ? -4 : -24;
  const baseX = open ? 10 : 4;
  const rotateY = useTransform(sx, (v) => baseY + v * (open ? 6 : 14));
  const rotateX = useTransform(sy, (v) => baseX - v * (open ? 4 : 8));
  const glareX = useTransform(sx, [-1, 1], [10, 90]);
  const glare = useMotionTemplate`radial-gradient(120% 80% at ${glareX}% 20%, rgba(255,255,255,0.28), rgba(255,255,255,0) 55%)`;
  const shadowX = useTransform(sx, [-1, 1], [-30, 30]);

  useEffect(() => {
    if (reduce) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    const onMove = (e: PointerEvent) => {
      px.set((e.clientX / window.innerWidth) * 2 - 1);
      py.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [px, py, reduce]);

  /* Fit the open spread (2× width) inside the stage ---------------- */
  const measure = useCallback(() => {
    const stage = stageRef.current;
    const book = bookRef.current;
    if (!stage || !book) return;
    const w = book.offsetWidth;
    setBookW(w);
    const fit = Math.min(1, (stage.offsetWidth * 0.96) / (w * 2));
    setCompact(fit < 0.8);
    setOpenScale(fit < 0.8 ? 1 : fit);
  }, []);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (stageRef.current) ro.observe(stageRef.current);
    return () => ro.disconnect();
  }, [measure]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && toggle(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, toggle]);

  const coverAngle = open ? -178 : hover && !reduce && !closing ? -14 : 0;
  const leafAngle = open ? -175 : 0;

  return (
    <div className="flex w-full flex-col items-center">
      <div
        ref={stageRef}
        className="relative flex w-full items-center justify-center py-6"
        style={{ perspective: "2400px", perspectiveOrigin: "50% 40%" }}
      >
        {/* floor shadow */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-1/2 h-10 rounded-[50%] bg-ink/30 blur-2xl"
          style={{ x: shadowX, translateX: "-50%" }}
          animate={{ width: open ? (compact ? bookW * 1.4 : bookW * 2 * openScale) : bookW * 0.95, opacity: hover || open ? 0.55 : 0.4 }}
          transition={{ duration: 1.2, ease: turnEase }}
        />

        <motion.div
          className="relative"
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          animate={{
            x: open ? (compact ? bookW * 0.12 : (bookW / 2) * openScale) : 0,
            scale: open ? openScale : 1,
            z: hover && !open && !reduce ? 30 : 0,
          }}
          transition={{ duration: 1.3, ease: turnEase }}
          onHoverStart={() => setHover(true)}
          onHoverEnd={() => setHover(false)}
        >
          <div
            ref={bookRef}
            className="relative [--d:calc(var(--w)*0.085)] [--w:clamp(210px,62vw,300px)] sm:[--w:clamp(260px,30vw,360px)]"
            style={{ width: "var(--w)", height: "calc(var(--w) * 1.5)", transformStyle: "preserve-3d" }}
          >
            {/* Back cover */}
            <div
              className="absolute inset-0 rounded-r-[4px] rounded-l-[2px] bg-[#2b2622] shadow-2xl"
              style={{ transform: "translateZ(calc(var(--d) / -2))" }}
            />

            {/* Page edges — fore-edge, head, tail */}
            <div
              className="page-edges absolute top-[1.2%] h-[97.6%]"
              style={{
                width: "calc(var(--d) - 3px)",
                left: "calc(var(--w) - var(--d) / 2 - 3px)",
                transform: "rotateY(90deg)",
              }}
            />
            <div
              className="absolute left-[1px] bg-[#efe5d2]"
              style={{
                width: "calc(var(--w) - 5px)",
                height: "calc(var(--d) - 3px)",
                top: "calc(var(--d) / -2 + 4px)",
                transform: "rotateX(90deg)",
                backgroundImage: "repeating-linear-gradient(to bottom, #f4ecdc 0 1px, #e2d5bd 1px 2px)",
              }}
            />
            <div
              className="absolute left-[1px] bg-[#e2d5bd]"
              style={{
                width: "calc(var(--w) - 5px)",
                height: "calc(var(--d) - 3px)",
                bottom: "calc(var(--d) / -2 + 4px)",
                transform: "rotateX(-90deg)",
              }}
            />

            {/* Spine */}
            <div
              className="absolute top-0 flex h-full items-center justify-center bg-gradient-to-r from-[#1c1815] via-[#3a322c] to-[#1c1815]"
              style={{
                width: "var(--d)",
                left: "calc(var(--d) / -2)",
                transform: "rotateY(-90deg)",
              }}
            >
              <span
                className="whitespace-nowrap font-display text-[0.6rem] uppercase tracking-[0.25em] text-ivory/80"
                style={{ writingMode: "vertical-rl" }}
              >
                What I Want to Tell You Is... · Kalemkiarian
              </span>
            </div>

            {/* Right-hand page: introduction + purchase */}
            <div
              className="absolute right-[3px] top-[1.2%] h-[97.6%] w-[calc(100%-4px)] bg-[#f7f1e4]"
              style={{ transform: "translateZ(calc(var(--d) / 2 - 3px))", containerType: "inline-size" }}
            >
              <div className="pointer-events-none absolute inset-y-0 left-0 w-[12%] bg-gradient-to-r from-black/10 to-transparent" />
              <div
                className="flex h-full flex-col justify-between p-[11%] text-ink"
                aria-hidden={!open}
              >
                <div>
                  <p className="text-[3.4cqw] font-medium uppercase tracking-[0.3em] text-burgundy">An Introduction</p>
                  <p className="mt-[8%] font-display text-[7.4cqw] leading-[1.08]">
                    Divorce, seen through the eyes of a child.
                  </p>
                  <p className="mt-[7%] text-[4cqw] leading-[1.6] text-ink/75">
                    Written in the voices of children, these messages help parents hear what their children struggle to
                    say — and make more compassionate decisions on their behalf.
                  </p>
                </div>
                <div className="space-y-[6%]">
                  <a
                    href={AMAZON_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={open ? 0 : -1}
                    className="group flex w-full items-center justify-between rounded-full bg-burgundy px-[8%] py-[5.5%] text-[3.5cqw] font-medium uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-burgundy-deep"
                  >
                    Purchase on Amazon
                    <Arrow className="transition-transform group-hover:translate-x-1" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => toggle(false)}
                    tabIndex={open ? 0 : -1}
                    className="block w-full text-center text-[3.2cqw] uppercase tracking-[0.25em] text-ink/55 underline-offset-4 hover:text-ink hover:underline"
                  >
                    Close the book
                  </button>
                </div>
              </div>
            </div>

            {/* Flyleaf — turns second */}
            <div
              className="absolute right-[3px] top-[1.2%] h-[97.6%] w-[calc(100%-4px)]"
              style={{ transform: "translateZ(calc(var(--d) / 2 - 1.5px))", transformStyle: "preserve-3d" }}
            >
              <motion.div
                className="absolute inset-0 origin-left"
                style={{ transformStyle: "preserve-3d" }}
                animate={{ rotateY: leafAngle }}
                transition={{ duration: reduce ? 0 : 1.5, ease: turnEase, delay: open ? 0.45 : 0 }}
              >
                {/* recto: half-title */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center bg-[#f7f1e4] text-center"
                  style={{ backfaceVisibility: "hidden", containerType: "inline-size" }}
                >
                  <p className="font-display text-[6.5cqw] italic text-ink/80">What I Want to Tell You Is...</p>
                  <span className="mt-[6%] h-px w-[14%] bg-ink/30" />
                  <TurnShade open={open} delay={0.45} />
                </div>
                {/* verso: the author's own words */}
                <div
                  className="absolute inset-0 flex flex-col justify-center bg-[#f4ede0] p-[12%] text-ink"
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)", containerType: "inline-size" }}
                >
                  <div className="pointer-events-none absolute inset-y-0 right-0 w-[12%] bg-gradient-to-l from-black/10 to-transparent" />
                  <span className="font-display text-[22cqw] leading-none text-burgundy/25">“</span>
                  <p className="-mt-[6%] font-display text-[7.2cqw] italic leading-[1.22]">
                    I wrote these messages in the voices of children to help you see your divorce through your
                    child&rsquo;s eyes.
                  </p>
                  <p className="mt-[9%] text-[3.2cqw] font-medium uppercase tracking-[0.28em] text-ink/60">
                    — {site.author}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Front cover — turns first */}
            <div
              className="absolute inset-0"
              style={{ transform: "translateZ(calc(var(--d) / 2))", transformStyle: "preserve-3d" }}
            >
              <motion.div
                className="absolute inset-0 origin-left"
                style={{ transformStyle: "preserve-3d" }}
                animate={{ rotateY: coverAngle }}
                transition={{
                  duration: reduce ? 0 : open || closing ? 1.4 : 0.8,
                  ease: turnEase,
                  delay: closing ? 0.5 : 0,
                }}
              >
                {/* outside */}
                <div
                  className="absolute inset-0 overflow-hidden rounded-r-[4px] rounded-l-[2px] shadow-[inset_4px_0_6px_-2px_rgba(0,0,0,0.25)]"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <CoverArt priority sizes="(max-width: 640px) 62vw, 360px" />
                  {/* hinge groove + glare */}
                  <div className="pointer-events-none absolute inset-y-0 left-[3.5%] w-[2px] bg-gradient-to-r from-black/25 via-white/20 to-transparent" />
                  <motion.div className="pointer-events-none absolute inset-0" style={{ background: glare }} />
                  <TurnShade open={open} delay={0} />
                </div>
                {/* inside: endpaper */}
                <div
                  className="absolute inset-0 overflow-hidden rounded-l-[4px] bg-burgundy-deep"
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                  <svg className="absolute inset-0 h-full w-full opacity-20" aria-hidden>
                    <defs>
                      <pattern id="endpaper" width="22" height="22" patternUnits="userSpaceOnUse">
                        <circle cx="11" cy="11" r="1.2" fill="#FAF6EE" />
                        <path d="M0 11h4M18 11h4M11 0v4M11 18v4" stroke="#FAF6EE" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#endpaper)" />
                  </svg>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Click target when closed (keyboard accessible) */}
          {!open && (
            <button
              type="button"
              onClick={() => toggle(true)}
              aria-label="Open the book to read an introduction"
              className="absolute inset-0 z-10 cursor-pointer rounded-sm bg-transparent"
              style={{ transform: "translateZ(calc(var(--d, 30px) / 2 + 2px))" }}
            />
          )}
        </motion.div>
      </div>

      {/* Caption under the book */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[0.68rem] uppercase tracking-[0.28em] text-smoke">
        <button
          type="button"
          onClick={() => toggle(!open)}
          className="group inline-flex items-center gap-2 transition-colors hover:text-ink"
          aria-expanded={open}
        >
          <span className="relative flex h-2 w-2">
            {!open && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-burgundy/50 motion-reduce:animate-none" />
            )}
            <span className="relative inline-flex h-2 w-2 rounded-full bg-burgundy" />
          </span>
          {open ? "Close the book" : "Click the book to open"}
        </button>
        <span className="hidden h-3 w-px bg-smoke/30 sm:block" />
        <a
          href={AMAZON_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-smoke/30 underline-offset-[6px] transition-colors hover:text-burgundy hover:decoration-burgundy"
        >
          Shop on Amazon<span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
    </div>
  );
}

/** Darkens a page mid-turn, the way light falls off a curling sheet. */
function TurnShade({ open, delay }: { open: boolean; delay: number }) {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0 bg-gradient-to-l from-black/40 via-black/10 to-transparent"
      initial={false}
      animate={{ opacity: open ? [0, 0.9, 0] : 0 }}
      transition={{ duration: 1.4, delay, ease: "easeInOut" }}
    />
  );
}
