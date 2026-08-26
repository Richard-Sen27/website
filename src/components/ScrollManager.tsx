"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { ScrollTrigger } from "@/lib/motion";

/**
 * Keeps scroll sane across route changes.
 *
 * ScrollTrigger caches the document height and each trigger's start and end
 * offsets. After a navigation those measurements belong to the previous page,
 * and a stale trigger can move the scroll position while Next is still
 * settling it, which showed up as landing part way down a new page or, once,
 * scrolling away from the top entirely.
 *
 * Refreshing after paint re-measures everything against the page that is
 * actually on screen. Scroll position itself is left to Next, so back and
 * forward still restore where you were.
 */
export default function ScrollManager() {
  const pathname = usePathname();

  useEffect(() => {
    // Two frames: one for React to commit the new tree, one for layout to
    // settle before ScrollTrigger measures it.
    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => ScrollTrigger.refresh());
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
