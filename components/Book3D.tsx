"use client";

import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AMAZON_URL, assets, site, withBasePath } from "@/lib/site";
import { Arrow, CoverImage } from "./primitives";

/**
 * A collectible hardcover, built from planes in CSS 3D.
 *
 * — follows the pointer with spring physics; light and shadow move with it
 * — hover lifts the book (and, when openable, lets the cover fall ajar)
 * — when `openable`, a click swings the cover open and the title page turns with a
 *   real curl (the leaf is a chain of hinged strips, each bending a little behind the
 *   last), revealing the author's words and a way to buy the book
 *
 * --w is the book's width, --d its thickness.
 */

const STRIPS = 7;
const swing = [0.7, 0, 0.25, 1] as const;
const LEAF_DELAY = 1.05;

export function Book3D({ openable = false, onOpenChange }: { openable?: boolean; onOpenChange?: (open: boolean) => void }) {
  const reduce = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [hover, setHover] = useState(false);
  const [fine, setFine] = useState(false);
  const [bookW, setBookW] = useState(0);
  const [fit, setFit] = useState({ scale: 1, compact: false, x: 0 });
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();

  const toggle = useCallback(
    (next: boolean) => {
      setOpen(next);
      onOpenChange?.(next);
      clearTimeout(closeTimer.current);
      setClosing(!next);
      if (!next) closeTimer.current = setTimeout(() => setClosing(false), 2600);
    },
    [onOpenChange]
  );
  useEffect(() => () => clearTimeout(closeTimer.current), []);

  /* Pointer: tilt, light and the contextual cursor --------------------- */
  const nx = useMotionValue(0);
  const ny = useMotionValue(0);
  const sx = useSpring(nx, { stiffness: 60, damping: 16, mass: 0.7 });
  const sy = useSpring(ny, { stiffness: 60, damping: 16, mass: 0.7 });
  const baseY = open ? -2 : -26;
  const baseX = open ? 14 : 5;
  const rotateY = useTransform(sx, (v) => baseY + v * (open ? 7 : 18));
  const rotateX = useTransform(sy, (v) => baseX - v * (open ? 5 : 11));
  const lightX = useTransform(sx, [-1, 1], [85, 15]);
  const lightY = useTransform(sy, [-1, 1], [10, 70]);
  const glare = useMotionTemplate`radial-gradient(90% 70% at ${lightX}% ${lightY}%, rgba(255,255,255,0.32), rgba(255,255,255,0) 60%)`;
  const shadowX = useTransform(sx, [-1, 1], [40, -40]);

  const cx = useMotionValue(-200);
  const cy = useMotionValue(-200);
  const cursorX = useSpring(cx, { stiffness: 500, damping: 40 });
  const cursorY = useSpring(cy, { stiffness: 500, damping: 40 });
  const [side, setSide] = useState<"left" | "right">("right");

  useEffect(() => {
    if (reduce) return;
    const isFine = window.matchMedia("(pointer: fine)").matches;
    setFine(isFine);
    if (!isFine) return;
    const onMove = (e: PointerEvent) => {
      const r = bookRef.current?.getBoundingClientRect();
      if (r) {
        const cxBook = r.left + r.width / 2;
        const cyBook = r.top + r.height / 2;
        nx.set(Math.max(-1, Math.min(1, (e.clientX - cxBook) / (window.innerWidth / 2))));
        ny.set(Math.max(-1, Math.min(1, (e.clientY - cyBook) / (window.innerHeight / 2))));
        setSide(e.clientX < r.left ? "left" : "right");
      }
      cx.set(e.clientX);
      cy.set(e.clientY);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, nx, ny, cx, cy]);

  /* Fit the open spread inside the stage ------------------------------- */
  const measure = useCallback(() => {
    const stage = stageRef.current;
    const book = bookRef.current;
    if (!stage || !book) return;
    const w = book.offsetWidth;
    setBookW(w);
    const room = window.innerWidth * 0.94;
    const s = Math.min(1, room / (w * 2));
    if (s >= 0.78) {
      setFit({ scale: s, compact: false, x: (w / 2) * s });
    } else {
      // Phones: enlarge the right-hand page to fill the width; the left page waits off-stage.
      const stageW = stage.offsetWidth;
      const cs = Math.min(1.18, (stageW - 28) / w);
      setFit({ scale: cs, compact: true, x: 14 + (w * cs) / 2 - stageW / 2 });
    }
  }, []);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (stageRef.current) ro.observe(stageRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && toggle(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, toggle]);

  const ajar = openable && hover && !open && !closing && !reduce;
  const coverAngle = open ? -178.5 : ajar ? -16 : 0;
  const t = (d: number) => (reduce ? 0 : d);
  const showCursor = openable && fine && hover && (!open || (open && side === "left" && !fit.compact));


  return (
    <div className="relative flex w-full flex-col items-center">
      <div
        ref={stageRef}
        className="relative flex w-full items-center justify-center py-8"
        style={{ perspective: "2600px", perspectiveOrigin: "50% 35%" }}
      >
        {/* floor shadow */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-1/2 h-12 rounded-[50%] bg-black blur-2xl"
          style={{ x: shadowX, translateX: "-50%" }}
          animate={{
            width: open ? (fit.compact ? bookW * 1.3 : bookW * 2.1 * fit.scale) : bookW * (hover ? 1.15 : 0.95),
            opacity: open ? 0.75 : hover ? 0.55 : 0.7,
            scaleY: hover && !open ? 1.4 : 1,
          }}
          transition={{ duration: 1.2, ease: swing }}
        />

        <motion.div
          className={`relative ${openable && fine && !open ? "[@media(pointer:fine)]:!cursor-none" : ""}`}
          animate={{
            x: open ? fit.x : 0,
            scale: open ? fit.scale : 1,
            z: hover && !open && !reduce ? 50 : 0,
            y: hover && !open && !reduce ? -10 : 0,
          }}
          transition={{ duration: t(1.4), ease: swing }}
          onPointerEnter={() => setHover(true)}
          onPointerLeave={() => setHover(false)}
          onClick={(e) => {
            // The ajar cover can sit in front of the hit targets, so the whole book listens.
            if (!openable || (e.target as HTMLElement).closest("a, button")) return;
            if (!open) toggle(true);
            else if (e.clientX < (bookRef.current?.getBoundingClientRect().left ?? 0)) toggle(false);
          }}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d", cursor: openable && !open ? "pointer" : "auto" }}
        >
          <div
            ref={bookRef}
            className="relative [--d:calc(var(--w)*0.075)] [--w:clamp(220px,62vw,300px)] lg:[--w:clamp(290px,25vw,400px)]"
            style={{ width: "var(--w)", height: "calc(var(--w) * 1.5)", transformStyle: "preserve-3d" }}
          >
            {/* Back cover */}
            <div
              className="absolute inset-0 overflow-hidden rounded-[3px] bg-dusk"
              style={{ transform: "translateZ(calc(var(--d) / -2)) rotateY(180deg)" }}
            >
              <CoverImage back sizes="(max-width: 1024px) 62vw, 400px" />
            </div>

            {/* Page block: fore-edge, head, tail */}
            <div
              className="page-edges absolute top-[1.5%] h-[97%]"
              style={{
                width: "calc(var(--d) - 3px)",
                left: "calc(var(--w) - var(--d) / 2 - 2.5px)",
                transform: "rotateY(90deg)",
              }}
            />
            <div
              className="page-edges-h absolute left-[1px]"
              style={{
                width: "calc(var(--w) - 5px)",
                height: "calc(var(--d) - 3px)",
                top: "calc(var(--d) / -2 + 1.5px + 1.5%)",
                transform: "rotateX(90deg)",
              }}
            />
            <div
              className="page-edges-h absolute left-[1px]"
              style={{
                width: "calc(var(--w) - 5px)",
                height: "calc(var(--d) - 3px)",
                bottom: "calc(var(--d) / -2 + 1.5px + 1.5%)",
                transform: "rotateX(-90deg)",
              }}
            />

            {/* Spine */}
            <div
              className="absolute top-0 flex h-full items-center justify-center overflow-hidden bg-gradient-to-r from-[#3c3768] via-[#6a64a0] to-[#3c3768]"
              style={{ width: "var(--d)", left: "calc(var(--d) / -2)", transform: "rotateY(-90deg)" }}
            >
              <span
                className="whitespace-nowrap font-sans text-[0.75rem] font-semibold uppercase tracking-[0.3em] text-ivory/90"
                style={{ writingMode: "vertical-rl" }}
              >
                What I Want to Tell You Is... &nbsp;·&nbsp; Kalemkiarian
              </span>
            </div>

            {/* Pages only exist when the book can be opened; closed, the cover hides them anyway */}
            {openable && (
              <>
            {/* Right-hand page — the introduction */}
            <div
              className="absolute right-[3px] top-[1.5%] h-[97%] w-[calc(100%-4px)] bg-[#f8f4ec]"
              style={{ transform: "translateZ(calc(var(--d) / 2 - 3px))", containerType: "inline-size" }}
            >
              <div className="pointer-events-none absolute inset-y-0 left-0 w-[14%] bg-gradient-to-r from-black/15 to-transparent" />
              <div className="flex h-full flex-col p-[11%] text-ink" aria-hidden={!open}>
                <p className="text-[3.1cqw] font-semibold uppercase tracking-[0.32em] text-violet">An introduction</p>
                <p className="mt-[9%] font-display text-[9.4cqw] leading-[1.02]">
                  Divorce, seen through <em className="text-violet">the eyes of a child.</em>
                </p>
                <p className="mt-[8%] text-[4.1cqw] leading-[1.6] text-ink/75">
                  Written in the voices of children, these messages help parents hear what their children struggle to
                  say, and make more compassionate decisions on their behalf.
                </p>
                <div className="mt-auto space-y-[5%]">
                  <a
                    href={AMAZON_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={open ? 0 : -1}
                    className="group relative flex w-full items-center justify-between overflow-hidden bg-midnight px-[8%] py-[6%] text-[3.4cqw] font-semibold uppercase tracking-[0.2em] text-ivory"
                  >
                    <span className="absolute inset-0 origin-left scale-x-0 bg-violet transition-transform duration-500 ease-silk group-hover:scale-x-100" />
                    <span className="relative">Purchase on Amazon</span>
                    <Arrow className="relative transition-transform group-hover:translate-x-1" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => toggle(false)}
                    tabIndex={open ? 0 : -1}
                    className="block w-full text-center text-[3cqw] font-semibold uppercase tracking-[0.28em] text-ink/50 transition-colors hover:text-violet"
                  >
                    Close the book
                  </button>
                </div>
              </div>
            </div>

            {/* The turning leaf: title page (recto) / the author's words (verso) */}
            <div
              className="pointer-events-none absolute right-[3px] top-[1.5%] h-[97%] w-[calc(100%-4px)]"
              style={{ transform: "translateZ(calc(var(--d) / 2 - 1.5px))", transformStyle: "preserve-3d" }}
            >
              <motion.div
                className="absolute inset-0"
                style={{ transformStyle: "preserve-3d" }}
                initial={false}
                animate={{ z: open ? 4 : 0 }}
                transition={{ duration: 0.01, delay: open ? t(0.9) : t(1.6) }}
              >
                <LeafStrip i={0} open={open} reduce={!!reduce} />
              </motion.div>
            </div>

              </>
            )}

            {/* Front cover — purely visual; clicks fall through to the targets beneath */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{ transform: "translateZ(calc(var(--d) / 2))", transformStyle: "preserve-3d" }}
            >
              <motion.div
                className="absolute inset-0 origin-left"
                style={{ transformStyle: "preserve-3d" }}
                animate={{ rotateY: coverAngle }}
                transition={{
                  duration: t(open || closing ? 1.5 : 0.9),
                  ease: swing,
                  delay: closing ? t(1.25) : 0,
                }}
              >
                <div
                  className="absolute inset-0 overflow-hidden rounded-r-[3px] rounded-l-[1px]"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <CoverImage priority sizes="(max-width: 1024px) 62vw, 400px" />
                  {/* hinge groove, edge highlight, moving light */}
                  <div className="pointer-events-none absolute inset-y-0 left-[3.2%] w-[3px] bg-gradient-to-r from-black/30 via-white/25 to-transparent" />
                  <div className="pointer-events-none absolute inset-y-0 left-0 w-[3.2%] bg-gradient-to-r from-black/35 to-black/5" />
                  <motion.div
                    className="pointer-events-none absolute inset-0 mix-blend-soft-light"
                    style={{ background: glare }}
                    animate={{ opacity: hover ? 1 : 0.55 }}
                  />
                  <motion.div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-gradient-to-l from-black/50 to-black/0"
                    initial={false}
                    animate={{ opacity: open ? [0, 0.8, 0.8] : [0.8, 0.8, 0] }}
                    transition={{ duration: t(1.5), delay: closing ? t(1.25) : 0, ease: "easeInOut" }}
                  />
                </div>
                {/* inside: endpaper */}
                <div
                  className="absolute inset-0 overflow-hidden rounded-l-[3px] bg-midnight"
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                  <div
                    className="absolute inset-0 opacity-25"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(45deg, #C8ACEF 0 1px, transparent 1px 14px), repeating-linear-gradient(-45deg, #C8ACEF 0 1px, transparent 1px 14px)",
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-midnight px-4 py-2 font-press text-2xl italic text-lavender">S·M</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Interaction targets */}
          {!openable ? null : !open ? (
            <button
              type="button"
              onClick={() => toggle(true)}
              aria-label="Open the book"
              className="absolute inset-0 z-10 cursor-pointer [@media(pointer:fine)]:cursor-none"
              style={{ transform: "translateZ(calc(var(--d, 24px) / 2 + 4px))" }}
            />
          ) : (
            !fit.compact && (
              <button
                type="button"
                onClick={() => toggle(false)}
                aria-label="Close the book"
                className="absolute inset-y-0 right-full z-10 w-full cursor-pointer [@media(pointer:fine)]:cursor-none"
                style={{ transform: "translateZ(40px)" }}
              />
            )
          )}
        </motion.div>
      </div>

      {/* caption */}
      {openable && (
      <div className="relative z-10 mt-6 flex items-center gap-5 text-[0.75rem] font-semibold uppercase tracking-[0.3em] text-lavender/80">
        <button
          type="button"
          onClick={() => toggle(!open)}
          aria-expanded={open}
          className="group inline-flex items-center gap-3 transition-colors hover:text-ivory"
        >
          <span className="relative h-px w-8 overflow-hidden bg-lavender/30">
            <span className="absolute inset-0 origin-left animate-[pulse_2.4s_ease-in-out_infinite] bg-lavender motion-reduce:animate-none" />
          </span>
          {open ? "Close the book" : fine ? "Click the book to open" : "Tap the book to open"}
        </button>
      </div>
      )}

      {/* contextual cursor */}
      <AnimatePresence>
        {showCursor && (
          <motion.div
            aria-hidden
            className="pointer-events-none fixed left-0 top-0 z-[80] flex h-[88px] w-[88px] items-center justify-center rounded-full bg-ivory font-sans text-[0.75rem] font-semibold uppercase tracking-[0.28em] text-midnight"
            style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {open ? "Close" : "Open"}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * One hinged strip of the turning page. Strip 0 hinges on the spine and carries the
 * main rotation; each child hinges on its parent's outer edge and lags slightly,
 * so the sheet curls as it turns and settles flat when it lands.
 */
function LeafStrip({ i, open, reduce }: { i: number; open: boolean; reduce: boolean }) {
  const isBase = i === 0;
  const bend = 7.5;
  const animate = isBase ? { rotateY: open ? -176 : 0 } : { rotateY: open ? [0, bend, 0] : [0, -bend, 0] };
  const transition = {
    duration: reduce ? 0 : 1.6,
    ease: isBase ? swing : ("easeInOut" as const),
    delay: open && !reduce ? LEAF_DELAY : 0,
    times: isBase ? undefined : [0, 0.5, 1],
  };
  const shade = 0.08 + (i / STRIPS) * 0.3;

  return (
    <motion.div
      className="absolute top-0 h-full origin-left"
      style={{
        left: isBase ? 0 : "calc(100% - 1.5px)",
        width: isBase ? `calc(${100 / STRIPS}% + 1.5px)` : "100%",
        transformStyle: "preserve-3d",
      }}
      initial={false}
      animate={animate}
      transition={transition}
    >
      {/* recto */}
      <div className="absolute inset-0 overflow-hidden bg-[#f8f4ec]" style={{ backfaceVisibility: "hidden" }}>
        <div className="absolute top-0 h-full" style={{ width: `${STRIPS * 100}%`, left: `-${i * 100}%` }}>
          <Image
            src={withBasePath(assets.titlePage.src)}
            alt={i === 0 ? assets.titlePage.alt : ""}
            fill
            sizes="(max-width: 1024px) 62vw, 400px"
            className="object-contain px-[6%] py-[5%] mix-blend-multiply"
          />
        </div>
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-black"
          initial={false}
          animate={{ opacity: open ? [0, shade, 0] : [0, shade, 0] }}
          transition={{ duration: reduce ? 0 : 1.6, delay: open && !reduce ? LEAF_DELAY : 0 }}
        />
      </div>
      {/* verso */}
      <div
        className="absolute inset-0 overflow-hidden bg-[#f5f0e6]"
        style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
      >
        <div
          className="absolute top-0 h-full"
          style={{ width: `${STRIPS * 100}%`, left: `-${(STRIPS - 1 - i) * 100}%`, containerType: "inline-size" }}
          aria-hidden={i > 0 || !open}
        >
          <Verso />
        </div>
      </div>
      {i < STRIPS - 1 && <LeafStrip i={i + 1} open={open} reduce={reduce} />}
    </motion.div>
  );
}

function Verso() {
  return (
    <div className="relative flex h-full flex-col justify-center p-[13%] text-ink">
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[14%] bg-gradient-to-l from-black/12 to-transparent" />
      <span className="font-display text-[26cqw] leading-[0.6] text-violet/30">&ldquo;</span>
      <p className="mt-[4%] font-display text-[8.4cqw] italic leading-[1.16]">
        I wrote these messages in the voices of children to help you see your divorce through your child&rsquo;s eyes.
      </p>
      <p className="mt-[10%] text-[3cqw] font-semibold uppercase tracking-[0.3em] text-ink/55">{site.author}</p>
    </div>
  );
}
