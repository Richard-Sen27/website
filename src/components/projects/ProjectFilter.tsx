"use client";

import { useMemo, useRef, useState, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";

import { cx } from "@/components/ui";
import { gsap, prefersReducedMotion } from "@/lib/motion";

export interface ProjectEntry {
  slug: string;
  category: string;
  /** The card, rendered on the server. This component only decides visibility. */
  card: ReactNode;
}

const ALL = "All";

/**
 * Category filter over the project grid.
 *
 * Filters on the single `category` field rather than on tags. Tags gave one
 * button per distinct tag, which came to 26 buttons for 7 projects, and most of
 * them narrowed the grid down to a single card. Categories are a short fixed
 * list defined in copy-ink.config.ts.
 *
 * Filtering re-flows the grid, so surviving cards get measured before the state
 * change and tweened from their old box to the new one. A FLIP rather than a
 * snap. Cards stay server-rendered and only their visibility is client state.
 */
export default function ProjectFilter({
  entries,
  emptyState,
}: {
  entries: ProjectEntry[];
  emptyState: string;
}) {
  const [active, setActive] = useState(ALL);
  const gridRef = useRef<HTMLDivElement>(null);
  const positions = useRef<Map<string, DOMRect>>(new Map());
  const firstRun = useRef(true);

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const entry of entries) {
      if (entry.category) {
        counts.set(entry.category, (counts.get(entry.category) ?? 0) + 1);
      }
    }
    // A filter row that cannot narrow anything is just noise.
    if (counts.size < 2) return [];
    return [
      ALL,
      ...[...counts.entries()]
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
        .map(([category]) => category),
    ];
  }, [entries]);

  const visible = useMemo(
    () =>
      active === ALL
        ? entries
        : entries.filter((entry) => entry.category === active),
    [active, entries],
  );

  /** Records where every card sits before React re-flows the grid. */
  const capture = () => {
    const grid = gridRef.current;
    if (!grid) return;
    positions.current = new Map(
      Array.from(grid.querySelectorAll<HTMLElement>("[data-slug]")).map(
        (node) => [node.dataset.slug ?? "", node.getBoundingClientRect()],
      ),
    );
  };

  useGSAP(
    () => {
      // Nothing has moved on mount, and the page-level reveal owns that frame.
      if (firstRun.current) {
        firstRun.current = false;
        return;
      }

      const grid = gridRef.current;
      if (!grid || prefersReducedMotion()) return;

      for (const card of grid.querySelectorAll<HTMLElement>("[data-slug]")) {
        const previous = positions.current.get(card.dataset.slug ?? "");

        if (!previous) {
          gsap.fromTo(
            card,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.4, ease: "expo.out" },
          );
          continue;
        }

        const next = card.getBoundingClientRect();
        const dx = previous.left - next.left;
        const dy = previous.top - next.top;
        if (dx === 0 && dy === 0) continue;

        gsap.fromTo(
          card,
          { x: dx, y: dy },
          { x: 0, y: 0, duration: 0.5, ease: "expo.out" },
        );
      }
    },
    { dependencies: [active], scope: gridRef },
  );

  return (
    <div className="flex flex-col gap-8">
      {categories.length ? (
        <div
          role="group"
          aria-label="Filter projects by category"
          className="flex flex-wrap gap-2"
        >
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              aria-pressed={active === category}
              onClick={() => {
                capture();
                setActive(category);
              }}
              className={cx(
                "rounded-md border px-3 py-1.5 font-mono text-xs transition-colors duration-200",
                active === category
                  ? "border-line-strong bg-surface-active text-ink"
                  : "border-line bg-surface-raised text-ink-muted hover:border-line-strong hover:text-ink",
              )}
            >
              {category}
            </button>
          ))}
        </div>
      ) : null}

      <div
        ref={gridRef}
        aria-live="polite"
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        {visible.map((entry) => (
          <div key={entry.slug} data-slug={entry.slug}>
            {entry.card}
          </div>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="py-12 text-center text-sm text-ink-muted">{emptyState}</p>
      ) : null}
    </div>
  );
}
