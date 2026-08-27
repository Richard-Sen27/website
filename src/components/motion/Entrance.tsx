import type { ElementType, ReactNode } from "react";

import { cx } from "@/components/ui";

/**
 * CSS entrance for above-the-fold content.
 *
 * A server component with no JavaScript behind it. Unlike `Reveal`, which waits
 * for hydration so GSAP can drive a ScrollTrigger, this starts at first paint
 * and runs on the compositor. That matters only for the hero, where the
 * animation always fires on a cold load and would otherwise be competing with
 * hydration for the main thread.
 */
export default function Entrance({
  children,
  as: Tag = "div",
  className,
  delay = 0,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Seconds. */
  delay?: number;
}) {
  return (
    <Tag
      className={cx("entrance", className)}
      style={delay ? { animationDelay: `${delay}s` } : undefined}
    >
      {children}
    </Tag>
  );
}
