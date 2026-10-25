"use client";

import { motion, useReducedMotion, useTransform, type MotionValue, type Variants } from "framer-motion";
import Image from "next/image";
import { AMAZON_URL, assets, withBasePath } from "@/lib/site";

export const ease = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/* Reveal — lifts and unmasks children into view once. Deliberately no  */
/* opacity fade, so text is never caught at low contrast mid-animation. */
/* ------------------------------------------------------------------ */

export function Reveal({
  children,
  delay = 0,
  y = 32,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "p" | "li" | "span";
}) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ y, clipPath: "inset(0% 0% 100% 0%)" }}
      whileInView={{ y: 0, clipPath: "inset(0% 0% 0% 0%)", transitionEnd: { clipPath: "none" } }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 1.1, ease, delay }}
    >
      {children}
    </Comp>
  );
}

/* ------------------------------------------------------------------ */
/* Lines — masked line-by-line reveal for display type                 */
/* ------------------------------------------------------------------ */

const lineParent: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const lineChild: Variants = {
  hidden: { y: "108%" },
  show: { y: "0%", transition: { duration: 1.15, ease } },
};

export function Lines({
  lines,
  className,
  lineClassName = "",
  as = "h2",
  id,
  label,
  immediate = false,
  delay = 0,
}: {
  lines: React.ReactNode[];
  className?: string;
  lineClassName?: string | ((i: number) => string);
  as?: "h1" | "h2" | "h3" | "p" | "div";
  id?: string;
  label: string;
  immediate?: boolean;
  delay?: number;
}) {
  const Comp = motion[as];
  const trigger = immediate
    ? { animate: "show" as const }
    : { whileInView: "show" as const, viewport: { once: true, margin: "-10% 0px" } };
  return (
    <Comp
      id={id}
      className={className}
      aria-label={label}
      variants={lineParent}
      initial="hidden"
      transition={{ delayChildren: delay }}
      {...trigger}
    >
      {lines.map((line, i) => (
        <span
          key={i}
          aria-hidden
          className={`-mb-[0.14em] block overflow-hidden pb-[0.14em] pr-[0.2em] ${
            typeof lineClassName === "function" ? lineClassName(i) : lineClassName
          }`}
        >
          <motion.span className="block will-change-transform" variants={lineChild}>
            {line}
          </motion.span>
        </span>
      ))}
    </Comp>
  );
}

/* ------------------------------------------------------------------ */
/* ScrollWords — words brighten one by one as the reader scrolls.      */
/* The resting state stays above 3:1, so the text is readable before    */
/* it lights up.                                                        */
/* ------------------------------------------------------------------ */

export function ScrollWords({
  text,
  progress,
  className = "",
  dim = 0.58,
  accent = [],
  accentClass = "text-lavender italic",
}: {
  text: string;
  progress: MotionValue<number>;
  className?: string;
  dim?: number;
  accent?: string[];
  accentClass?: string;
}) {
  const words = text.split(" ");
  const reduce = useReducedMotion();
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      {words.map((w, i) => (
        <Word
          key={i}
          progress={progress}
          range={[i / words.length, (i + 1) / words.length]}
          dim={reduce ? 1 : dim}
          className={accent.some((a) => w.toLowerCase().replace(/[^a-z]/g, "") === a) ? accentClass : ""}
        >
          {w}
        </Word>
      ))}
    </span>
  );
}

function Word({
  children,
  progress,
  range,
  dim,
  className,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  dim: number;
  className: string;
}) {
  const opacity = useTransform(progress, range, [dim, 1]);
  return (
    <motion.span aria-hidden style={{ opacity }} className={className}>
      {children}{" "}
    </motion.span>
  );
}

/* ------------------------------------------------------------------ */
/* Buttons & links                                                     */
/* ------------------------------------------------------------------ */

/** Rectangular, ink-fill sweep on hover. No pills. */
export function AmazonButton({
  children = "Purchase on Amazon",
  tone = "light",
  className = "",
  large = false,
}: {
  children?: React.ReactNode;
  tone?: "light" | "dark" | "violet";
  className?: string;
  large?: boolean;
}) {
  const tones = {
    light: "bg-ivory text-midnight [--sweep:#8254DC] hover:text-ivory",
    dark: "bg-midnight text-ivory [--sweep:#8254DC]",
    violet: "bg-violet text-ivory [--sweep:#FAF7F2] hover:text-midnight",
  };
  return (
    <a
      href={AMAZON_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative inline-flex items-center justify-between gap-8 overflow-hidden font-sans font-semibold uppercase tracking-[0.22em] transition-colors duration-500 ease-silk ${
        large ? "px-9 py-6 text-[0.8rem]" : "px-7 py-[1.15rem] text-[0.75rem]"
      } ${tones[tone]} ${className}`}
    >
      <span
        aria-hidden
        className="absolute inset-0 origin-left scale-x-0 bg-[var(--sweep)] transition-transform duration-[650ms] ease-silk group-hover:scale-x-100"
      />
      <span className="relative">{children}</span>
      <Arrow className="relative transition-transform duration-500 ease-silk group-hover:translate-x-1.5" />
      <span className="sr-only">(opens Amazon in a new tab)</span>
    </a>
  );
}

export function TextLink({
  href,
  children,
  className = "",
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group inline-flex items-center gap-3 font-sans text-[0.75rem] font-semibold uppercase tracking-[0.22em] ${className}`}
    >
      <span className="relative pb-1">
        {children}
        <span className="absolute bottom-0 left-0 h-px w-full origin-right bg-current opacity-40 transition-transform duration-500 ease-silk group-hover:scale-x-0" />
        <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform delay-150 duration-500 ease-silk group-hover:scale-x-100" />
      </span>
      {external && <span className="sr-only">(opens in a new tab)</span>}
    </a>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg width="22" height="10" viewBox="0 0 22 10" fill="none" aria-hidden className={className}>
      <path d="M0 5h20M16 1l4 4-4 4" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

/** Small marginal label — "02 / Why she wrote it" */
export function Marker({ index, label, className = "" }: { index: string; label: string; className?: string }) {
  return (
    <Reveal y={10} className={`flex items-baseline gap-3 ${className}`}>
      <span className="font-display text-xl italic">{index}</span>
      <span className="eyebrow opacity-80">{label}</span>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/* Images                                                              */
/* ------------------------------------------------------------------ */

export function CoverImage({ priority = false, sizes = "(max-width: 768px) 70vw, 420px", back = false }: { priority?: boolean; sizes?: string; back?: boolean }) {
  const a = back ? assets.bookBackCover : assets.bookCover;
  return (
    <Image
      src={withBasePath(a.src as string)}
      alt={back ? "" : a.alt}
      fill
      priority={priority}
      sizes={sizes}
      className="object-cover"
    />
  );
}

/** Archival placeholder — used only while no historical photograph is supplied. */
export function ArchivePlaceholder({ className = "" }: { className?: string }) {
  if (assets.pressArchive.src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={withBasePath(assets.pressArchive.src)}
          alt={assets.pressArchive.alt}
          fill
          sizes="(max-width: 1024px) 90vw, 40vw"
          className="object-cover sepia-[0.25]"
        />
      </div>
    );
  }
  return (
    <div role="img" aria-label="Placeholder for an archival photograph of the original Sahag-Mesrob Press" className={`relative overflow-hidden bg-[#e7dfd2] ${className}`}>
      <div className="halftone absolute inset-0 opacity-70" />
      <div className="absolute inset-[7%] border border-aubergine/25" />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center text-aubergine">
        <span className="font-press text-5xl italic opacity-80">S·M</span>
        <span className="eyebrow mt-5 text-aubergine/80">Archival photograph</span>
        <span className="mt-2 max-w-[26ch] font-display text-lg italic leading-snug text-aubergine/75">
          Reserved for a photograph of the original press
        </span>
      </div>
    </div>
  );
}
