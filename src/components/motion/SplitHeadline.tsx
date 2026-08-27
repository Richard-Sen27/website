import { Fragment, type ElementType } from "react";

/**
 * Word-by-word headline entrance.
 *
 * Split in the markup rather than with SplitText so the full sentence is in the
 * server-rendered HTML. A headline assembled by client JS is a headline a
 * crawler may not see.
 *
 * The animation is CSS, so this is a server component and the entrance begins
 * at first paint rather than after hydration. Each word gets an
 * overflow-clipped wrapper so the rise reads as a reveal rather than a slide.
 */
export default function SplitHeadline({
  text,
  as: Tag = "h1",
  className = "",
  delay = 0,
  stagger = 0.055,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  /** Seconds before the first word moves. */
  delay?: number;
  /** Seconds between consecutive words. */
  stagger?: number;
}) {
  const words = text.split(" ");

  return (
    <Tag className={className}>
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          {/* The clip wrapper turns the rise into a reveal. The space sits
              outside it, or it gets swallowed at the clip edge. */}
          <span className="inline-block overflow-hidden pb-[0.12em] align-bottom">
            <span
              className="entrance-word"
              style={{ animationDelay: `${delay + index * stagger}s` }}
            >
              {word}
            </span>
          </span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}
