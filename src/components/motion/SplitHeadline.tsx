"use client";

import { Fragment, useRef, type ElementType } from "react";
import { useGSAP } from "@gsap/react";

import { EASE, gsap, prefersReducedMotion } from "@/lib/motion";

interface SplitHeadlineProps {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
}

/**
 * Word-by-word headline entrance.
 *
 * Splits in the markup rather than with SplitText so the full sentence is in the
 * server-rendered HTML. A headline assembled by client JS is a headline a crawler
 * may not see. Each word gets an overflow-clipped wrapper so the rise reads as a
 * reveal rather than a slide.
 */
export default function SplitHeadline({
  text,
  as: Tag = "h1",
  className = "",
  delay = 0,
}: SplitHeadlineProps) {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const words = scope.current?.querySelectorAll("[data-word]");
      if (!words?.length) return;

      if (prefersReducedMotion()) {
        gsap.set(words, { yPercent: 0, opacity: 1 });
        return;
      }

      gsap.fromTo(
        words,
        { yPercent: 115, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          ease: EASE.out,
          stagger: 0.055,
          delay,
        },
      );
    },
    { scope, dependencies: [text, delay] },
  );

  const words = text.split(" ");

  return (
    <Tag ref={scope} className={className}>
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          {/* The clip wrapper turns the rise into a reveal. The space sits
              outside it, or it gets swallowed at the clip edge. */}
          <span className="inline-block overflow-hidden pb-[0.12em] align-bottom">
            <span data-word className="inline-block will-change-transform">
              {word}
            </span>
          </span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}
