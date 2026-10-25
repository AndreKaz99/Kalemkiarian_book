"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AMAZON_URL, nav, site } from "@/lib/site";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently in view
  useEffect(() => {
    const ids = nav.map((n) => n.href.slice(1));
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-silk ${
        scrolled && !menuOpen ? "border-b border-ink/[0.07] bg-ivory/90 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav aria-label="Primary" className="page-x flex h-16 items-center justify-between lg:h-20">
        <a href="#home" className="group relative z-[60] flex items-baseline gap-2" onClick={() => setMenuOpen(false)}>
          <span className="font-display text-xl italic leading-none tracking-tight lg:text-[1.35rem]">
            What I Want to Tell You <span className="text-burgundy">Is...</span>
          </span>
          <span className="sr-only">— home</span>
        </a>

        <ul className="hidden items-center gap-8 lg:flex xl:gap-10">
          {nav.map((item) => {
            const isActive = active === item.href.slice(1);
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={isActive ? "location" : undefined}
                  className={`group relative py-2 text-[0.72rem] uppercase tracking-[0.2em] transition-colors duration-300 ${
                    isActive ? "text-ink" : "text-smoke hover:text-ink"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-px bg-burgundy transition-all duration-500 ease-silk ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={AMAZON_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full border border-ink/80 px-5 py-2.5 text-[0.68rem] font-medium uppercase tracking-[0.22em] transition-all duration-500 ease-silk hover:border-burgundy hover:bg-burgundy hover:text-ivory sm:inline-flex"
          >
            Get the Book<span className="sr-only"> on Amazon (opens in a new tab)</span>
          </a>
          <button
            type="button"
            className="relative z-[60] -mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className="relative block h-3 w-7">
              <span
                className={`absolute left-0 h-px w-full bg-current transition-all duration-500 ease-silk ${
                  menuOpen ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 h-px bg-current transition-all duration-500 ease-silk ${
                  menuOpen ? "top-1.5 w-full -rotate-45" : "top-3 w-2/3"
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="grain fixed inset-0 z-50 flex flex-col bg-ivory lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul className="page-x mt-28 flex flex-col gap-1">
              {nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="border-b border-ink/10"
                >
                  <a
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-baseline justify-between py-4 font-display text-[2rem] leading-tight sm:text-5xl"
                  >
                    {item.label}
                    <span className="font-sans text-xs text-smoke">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.div
              className="page-x mt-auto pb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <a
                href={AMAZON_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center rounded-full bg-burgundy py-4 text-xs font-medium uppercase tracking-[0.22em] text-ivory"
              >
                Get the Book on Amazon<span className="sr-only"> (opens in a new tab)</span>
              </a>
              <p className="mt-6 text-center text-xs text-smoke">
                {site.author} · {site.publisher}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
