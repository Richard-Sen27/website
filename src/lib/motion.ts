"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

/**
 * Single GSAP registration point. Importing gsap directly elsewhere risks
 * animating before ScrollTrigger exists. registerPlugin is idempotent, so the
 * module being evaluated more than once is harmless.
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export { gsap, ScrollTrigger };

export const DURATION = {
  fast: 0.35,
  base: 0.6,
  slow: 0.9,
} as const;

export const EASE = {
  out: "expo.out",
  inOut: "power3.inOut",
} as const;

/**
 * True when the visitor asked for less motion. Every timeline checks this and
 * jumps to the end state rather than animating towards it. The content still
 * arrives, it just does not move on the way in.
 */
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Resolves a semantic colour token to a concrete value, for the rare tween that
 * needs one. Prefer animating a custom property directly, which keeps the colour
 * in theme.css where the lint rule can see it.
 */
export function readToken(name: string): string {
  if (typeof window === "undefined") return "";
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name.startsWith("--") ? name : `--${name}`)
    .trim();
}

/**
 * The site's standard entrance: a short rise and fade, staggered across
 * siblings, fired when the element enters the viewport.
 */
export function revealFrom(
  targets: gsap.TweenTarget,
  options: {
    trigger?: Element | null;
    y?: number;
    stagger?: number;
    delay?: number;
    start?: string;
  } = {},
): gsap.core.Tween {
  const { trigger, y = 24, stagger = 0.08, delay = 0, start = "top 85%" } = options;

  if (prefersReducedMotion()) {
    return gsap.set(targets, { opacity: 1, y: 0 }) as gsap.core.Tween;
  }

  return gsap.fromTo(
    targets,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration: DURATION.base,
      ease: EASE.out,
      stagger,
      delay,
      ...(trigger ? { scrollTrigger: { trigger, start, once: true } } : {}),
    },
  );
}
