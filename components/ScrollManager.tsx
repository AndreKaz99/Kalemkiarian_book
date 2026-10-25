"use client";

import { useEffect } from "react";

/**
 * Keeps a refresh at the top of the page.
 * — in-page links (#the-book, #author, …) scroll smoothly without writing the hash
 *   into the address bar, so reloading never jumps to the last section visited
 * — the browser's own scroll restoration is turned off, and any hash in the URL on
 *   arrival is cleared
 * Keyboard focus still moves to the chosen section, as an ordinary anchor would.
 */
export function ScrollManager() {
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    if (location.hash) history.replaceState(null, "", location.pathname + location.search);
    window.scrollTo(0, 0);

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      const id = link?.getAttribute("href")?.slice(1);
      const target = id ? document.getElementById(id) : null;
      if (!target) return;
      e.preventDefault();
      // Let React finish closing the mobile menu (which un-inerts the page) before moving
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
          if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
          target.focus({ preventScroll: true });
        })
      );
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
