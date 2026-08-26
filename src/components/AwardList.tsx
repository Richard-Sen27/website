import Reveal from "@/components/motion/Reveal";
import { cx } from "@/components/ui";
import type { Award } from "@/lib/content";

/**
 * Competition record. First places get the accent treatment, because with four
 * of them, ranking every row equally would flatten the thing worth noticing.
 */
export default function AwardList({ awards }: { awards: Award[] }) {
  return (
    <Reveal stagger className="flex flex-col">
      {awards.map((award, index) => (
        <div
          key={`${award.date}-${index}`}
          className="grid gap-2 border-b border-line py-6 first:pt-0 last:border-0 md:grid-cols-[6rem_4rem_1fr] md:items-baseline md:gap-6"
        >
          <p className="font-mono text-xs text-ink-faint">{award.date}</p>

          <p
            className={cx(
              "w-fit rounded-md border px-2 py-0.5 font-mono text-xs",
              award.place === "1st"
                ? "border-accent-line bg-accent-soft text-accent"
                : "border-line bg-surface-raised text-ink-muted",
            )}
          >
            {award.place}
          </p>

          <div className="flex flex-col gap-1">
            <h3 className="text-base font-medium text-ink">{award.title}</h3>
            <p className="text-sm text-ink-muted">{award.org}</p>
            {award.note ? (
              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-ink-muted">
                {award.note}
              </p>
            ) : null}
          </div>
        </div>
      ))}
    </Reveal>
  );
}
