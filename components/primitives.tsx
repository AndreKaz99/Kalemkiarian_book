"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { AMAZON_URL, assets, site, withBasePath } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/* Reveal — fades & lifts children into view once                      */
/* ------------------------------------------------------------------ */

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "p" | "li" | "span" | "figure" | "blockquote";
}) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1, ease, delay }}
    >
      {children}
    </Comp>
  );
}

/* ------------------------------------------------------------------ */
/* WordReveal — reveals a heading word by word                         */
/* ------------------------------------------------------------------ */

const wordParent: Variants = {
  hidden: {},
  show: (stagger: number) => ({ transition: { staggerChildren: stagger } }),
};
const wordChild: Variants = {
  hidden: { y: "110%", opacity: 0 },
  show: { y: "0%", opacity: 1, transition: { duration: 0.9, ease } },
};

export function WordReveal({
  text,
  className,
  as = "h2",
  stagger = 0.06,
  immediate = false,
  delay = 0,
  id,
}: {
  id?: string;
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  stagger?: number;
  immediate?: boolean;
  delay?: number;
}) {
  const Comp = motion[as];
  const words = text.split(" ");
  const trigger = immediate
    ? { animate: "show" as const }
    : { whileInView: "show" as const, viewport: { once: true, margin: "-10% 0px" } };
  return (
    <Comp
      id={id}
      className={className}
      aria-label={text}
      variants={wordParent}
      custom={stagger}
      initial="hidden"
      transition={{ delayChildren: delay }}
      {...trigger}
    >
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span className="inline-block will-change-transform" variants={wordChild}>
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Comp>
  );
}

/* ------------------------------------------------------------------ */
/* Buttons                                                             */
/* ------------------------------------------------------------------ */

export function AmazonButton({
  children = "Purchase on Amazon",
  variant = "solid",
  className = "",
  size = "md",
}: {
  children?: React.ReactNode;
  variant?: "solid" | "light" | "outline";
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = {
    sm: "px-5 py-2.5 text-[0.7rem]",
    md: "px-7 py-4 text-[0.75rem]",
    lg: "px-10 py-5 text-[0.8rem]",
  };
  const variants = {
    solid: "bg-burgundy text-ivory hover:bg-burgundy-deep",
    light: "bg-ivory text-ink hover:bg-cream",
    outline: "border border-ink/25 text-ink hover:border-ink",
  };
  return (
    <a
      href={AMAZON_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full font-medium uppercase tracking-[0.22em] transition-colors duration-500 ease-silk ${sizes[size]} ${variants[variant]} ${className}`}
    >
      <span className="relative">{children}</span>
      <Arrow className="relative transition-transform duration-500 ease-silk group-hover:translate-x-1" />
      <span className="sr-only">(opens Amazon in a new tab)</span>
    </a>
  );
}

export function GhostLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-3 text-[0.75rem] font-medium uppercase tracking-[0.22em] text-ink ${className}`}
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-100 bg-current transition-transform duration-500 ease-silk group-hover:scale-x-0" />
        <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-burgundy transition-transform delay-200 duration-500 ease-silk group-hover:scale-x-100" />
      </span>
    </a>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg width="18" height="10" viewBox="0 0 18 10" fill="none" aria-hidden className={className}>
      <path d="M0 5h16M12 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Section label — "01 — The Book"                                     */
/* ------------------------------------------------------------------ */

export function SectionLabel({
  index,
  label,
  className = "",
}: {
  index: string;
  label: string;
  className?: string;
}) {
  return (
    <Reveal className={`flex items-center gap-4 ${className}`} y={12}>
      <span className="font-display text-lg italic">{index}</span>
      <span className="h-px w-10 bg-current opacity-40" />
      <span className="eyebrow">{label}</span>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/* Cover art — real cover when provided, labelled placeholder otherwise */
/* ------------------------------------------------------------------ */

export function CoverArt({ priority = false, sizes = "(max-width: 768px) 70vw, 420px" }: { priority?: boolean; sizes?: string }) {
  if (assets.bookCover.src) {
    return (
      <Image
        src={withBasePath(assets.bookCover.src)}
        alt={assets.bookCover.alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
      />
    );
  }
  // Typographic placeholder — NOT the real cover. Replace via lib/site.ts → assets.bookCover.src
  return (
    <div
      role="img"
      aria-label="Book cover placeholder"
      className="absolute inset-0 flex flex-col justify-between bg-gradient-to-br from-[#efe6d4] via-[#e7dcc7] to-[#d9cab0] p-[9%] text-ink"
    >
      <div className="flex items-start justify-between">
        <span className="text-[0.5rem] font-medium uppercase tracking-[0.3em] text-ink/50 sm:text-[0.55rem]">
          Cover placeholder
        </span>
        <span className="h-[0.6rem] w-[0.6rem] rounded-full bg-burgundy/70" />
      </div>
      <div>
        <p className="font-display text-[clamp(1.4rem,3.4vw,2.35rem)] font-medium leading-[0.95]">
          What I Want <br />
          to Tell You <em className="font-normal text-burgundy">Is...</em>
        </p>
        <div className="my-[7%] h-px w-1/3 bg-ink/40" />
        <p className="font-display text-[clamp(0.7rem,1.4vw,0.95rem)] italic leading-snug text-ink/80">
          {site.subtitle}
        </p>
      </div>
      <div>
        <p className="text-[clamp(0.5rem,1vw,0.7rem)] font-medium uppercase tracking-[0.28em]">{site.author}</p>
        <p className="mt-2 text-[0.45rem] uppercase tracking-[0.2em] text-ink/40 sm:text-[0.5rem]">
          Replace with actual cover image
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Generic labelled image placeholder                                   */
/* ------------------------------------------------------------------ */

export function ImageSlot({
  src,
  alt,
  label,
  hint,
  sizes,
  tone = "light",
  className = "",
}: {
  src: string | null;
  alt: string;
  label: string;
  hint: string;
  sizes: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  if (src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image src={withBasePath(src)} alt={alt} fill sizes={sizes} className="object-cover" />
      </div>
    );
  }
  const dark = tone === "dark";
  return (
    <div
      role="img"
      aria-label={`${label} placeholder`}
      className={`relative flex items-end overflow-hidden ${
        dark ? "bg-[#3a332d] text-ivory/70" : "bg-sand text-ink/60"
      } ${className}`}
    >
      <svg className="absolute inset-0 h-full w-full opacity-[0.18]" aria-hidden>
        <defs>
          <pattern id={`hatch-${label.replace(/\s/g, "")}`} width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="10" stroke="currentColor" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#hatch-${label.replace(/\s/g, "")})`} />
      </svg>
      <div className={`relative m-5 border p-4 sm:m-6 ${dark ? "border-ivory/25" : "border-ink/20"}`}>
        <p className="eyebrow">{label}</p>
        <p className="mt-2 max-w-[24ch] text-xs leading-relaxed opacity-80">{hint}</p>
      </div>
    </div>
  );
}
