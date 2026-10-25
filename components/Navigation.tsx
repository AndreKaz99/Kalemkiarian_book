"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { AMAZON_URL, nav, site } from "@/lib/site";

/**
 * Floating navigation. Reads the `data-nav` of the section beneath it and
 * switches between light-on-dark and dark-on-light; tucks away while
 * scrolling down, returns on the way up.
 */
export function Navigation() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    let lastY = window.scrollY;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      setScrolled(y > 30);
      setHidden(y > 500 && y > lastY + 2);
      if (y < lastY - 2 || y < 500) setHidden(false);
      lastY = y;
      const probe = 36;
      const sections = document.querySelectorAll<HTMLElement>("[data-nav]");
      for (const s of sections) {
        const r = s.getBoundingClientRect();
        if (r.top <= probe && r.bottom > probe) {
          setTheme(s.dataset.nav === "light" ? "light" : "dark");
          break;
        }
      }
      const mid = window.innerHeight * 0.45;
      for (const item of nav) {
        const el = document.getElementById(item.href.slice(1));
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= mid && r.bottom > mid) setActive(el.id);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const light = theme === "light" && !menuOpen;
  const surface = !scrolled || menuOpen ? "bg-transparent" : light ? "bg-ivory/85 backdrop-blur-md" : "bg-midnight/75 backdrop-blur-md";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,color] duration-500 ease-silk ${surface} ${
        light ? "text-ink" : "text-ivory"
      } ${hidden && !menuOpen ? "-translate-y-full" : "translate-y-0"}`}
    >
      <nav aria-label="Primary" className="page-x flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
        <a href="#home" onClick={() => setMenuOpen(false)} className="relative z-[60] font-display text-[1.35rem] leading-none tracking-tight">
          What I Want to Tell You <em className={light ? "text-violet" : "text-lavender"}>Is...</em>
          <span className="sr-only"> (home)</span>
        </a>

        <ul className="hidden items-center gap-7 xl:flex xl:gap-9">
          {nav.map((item) => {
            const on = active === item.href.slice(1);
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={on ? "location" : undefined}
                  className={`group relative block overflow-hidden py-1 text-[0.68rem] font-semibold uppercase tracking-[0.22em] transition-opacity duration-300 ${
                    on ? "opacity-100" : "opacity-60 hover:opacity-100"
                  }`}
                >
                  {/* rolling label */}
                  <span className="block transition-transform duration-500 ease-silk group-hover:-translate-y-full">{item.label}</span>
                  <span aria-hidden className="absolute left-0 top-full block py-1 transition-transform duration-500 ease-silk group-hover:-translate-y-full">
                    {item.label}
                  </span>
                  <span
                    className={`absolute bottom-0 left-0 h-px transition-all duration-500 ease-silk ${on ? "w-full" : "w-0"} ${
                      light ? "bg-violet" : "bg-lavender"
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={AMAZON_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative hidden overflow-hidden border px-5 py-2.5 text-[0.66rem] font-semibold uppercase tracking-[0.22em] transition-colors duration-500 sm:inline-flex ${
              light ? "border-ink/70 hover:text-ivory" : "border-ivory/60 hover:text-midnight"
            }`}
          >
            <span
              aria-hidden
              className={`absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 ease-silk group-hover:scale-y-100 ${
                light ? "bg-ink" : "bg-ivory"
              }`}
            />
            <span className="relative">Get the Book</span>
            <span className="sr-only"> on Amazon (opens in a new tab)</span>
          </a>
          <button
            type="button"
            className="relative z-[60] -mr-2 flex h-11 w-11 items-center justify-center xl:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className="relative block h-3 w-7">
              <span className={`absolute left-0 h-px w-full bg-current transition-all duration-500 ease-silk ${menuOpen ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute right-0 h-px bg-current transition-all duration-500 ease-silk ${menuOpen ? "top-1.5 w-full -rotate-45" : "top-3 w-1/2"}`} />
            </span>
          </button>
        </div>
      </nav>

      {/* reading progress */}
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className={`absolute bottom-0 left-0 h-px w-full origin-left ${light ? "bg-violet" : "bg-lavender"} ${scrolled ? "opacity-100" : "opacity-0"}`}
      />

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="grain fixed inset-0 z-50 flex flex-col overflow-y-auto bg-midnight text-ivory xl:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul className="page-x mt-24 flex flex-col">
              {nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.07, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="border-b border-ivory/10"
                >
                  <a
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-baseline gap-5 py-5 font-display text-[2.4rem] leading-none sm:text-6xl"
                  >
                    <span className="font-sans text-xs font-semibold text-lavender">0{i + 1}</span>
                    <span className="transition-colors group-hover:italic group-hover:text-lavender">{item.label}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.div
              className="page-x mt-auto pb-10 pt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <a
                href={AMAZON_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-between bg-violet px-6 py-5 text-xs font-semibold uppercase tracking-[0.22em] text-ivory"
              >
                Get the Book on Amazon <span aria-hidden>→</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <p className="mt-6 text-xs text-ivory/50">
                Judge {site.author} · {site.publisher}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
