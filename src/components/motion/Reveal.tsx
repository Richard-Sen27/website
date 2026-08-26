"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";

import { revealFrom } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  /** Staggers direct children instead of animating the wrapper as one block. */
  stagger?: boolean;
  as?: ElementType;
  className?: string;
  delay?: number;
  y?: number;
  start?: string;
}

/**
 * Scroll-triggered entrance.
 *
 * The data attributes set the pre-animation opacity in CSS so nothing flashes in
 * at full opacity before GSAP takes over. Both rules are scoped to `.js`, so
 * content stays visible without JavaScript and under prefers-reduced-motion.
 */
export default function Reveal({
  children,
  stagger = false,
  as: Tag = "div",
  className,
  delay = 0,
  y,
  start,
}: RevealProps) {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const targets = stagger ? Array.from(root.children) : root;
      if (Array.isArray(targets) && targets.length === 0) return;

      revealFrom(targets, { trigger: root, delay, y, start });
    },
    { scope, dependencies: [stagger, delay, y, start] },
  );

  const marker = stagger
    ? { "data-reveal-stagger": "" }
    : { "data-reveal": "" };

  return (
    <Tag ref={scope} className={className} {...marker}>
      {children}
    </Tag>
  );
}
