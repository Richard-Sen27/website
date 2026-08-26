"use client";

import { useCallback, useRef, type ReactNode } from "react";

import { gsap, prefersReducedMotion } from "@/lib/motion";

interface SpotlightProps {
  children: ReactNode;
  className?: string;
  /** Adds the cursor-tracking hairline on top of the radial wash. */
  edge?: boolean;
}

/**
 * Card surface with a wash and hairline that follow the cursor.
 *
 * Position is written to --mx/--my and intensity to --spotlight-opacity; the
 * gradients themselves live in globals.css and read their colours from the
 * token layer, so nothing here needs to know a colour value.
 */
export default function Spotlight({
  children,
  className = "",
  edge = true,
}: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef<number>(0);

  const handleMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node) return;

    const { clientX, clientY } = event;

    // Pointer events outpace paint; coalesce to one write per frame.
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const rect = node.getBoundingClientRect();
      node.style.setProperty("--mx", `${clientX - rect.left}px`);
      node.style.setProperty("--my", `${clientY - rect.top}px`);
    });
  }, []);

  const fade = useCallback((to: number) => {
    const node = ref.current;
    if (!node) return;
    if (prefersReducedMotion()) {
      node.style.setProperty("--spotlight-opacity", String(to));
      return;
    }
    gsap.to(node, {
      "--spotlight-opacity": to,
      duration: 0.35,
      ease: "power2.out",
      overwrite: true,
    });
  }, []);

  const handleLeave = useCallback(() => {
    cancelAnimationFrame(frame.current);
    fade(0);
  }, [fade]);

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => fade(1)}
      onMouseLeave={handleLeave}
      className={`spotlight ${edge ? "edge-glow" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
