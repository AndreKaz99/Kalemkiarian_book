"use client";

import { MotionConfig } from "framer-motion";

/** Honors the visitor's reduced-motion preference across every Framer Motion component. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
