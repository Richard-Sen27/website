import Image from "next/image";

import Reveal from "@/components/motion/Reveal";
import type { StackEntry } from "@/lib/content";

/**
 * Stack, grouped by where each tool sits. Icons come from public/tech and are
 * decorative — the name beside them carries the meaning, so they stay out of
 * the accessibility tree.
 */
export default function StackGrid({ stack }: { stack: StackEntry[] }) {
  const groups = stack.reduce<Record<string, StackEntry[]>>((acc, entry) => {
    (acc[entry.group] ??= []).push(entry);
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-10">
      {Object.entries(groups).map(([group, entries]) => (
        <div key={group} className="grid gap-4 md:grid-cols-[10rem_1fr] md:gap-8">
          <h3 className="pt-1.5 font-mono text-xs tracking-widest text-ink-faint uppercase">
            {group}
          </h3>
          <Reveal stagger className="flex flex-wrap gap-2">
            {entries.map((entry) => (
              <span
                key={entry.name}
                className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface-raised px-3 py-2 text-sm text-ink-muted transition-colors duration-200 hover:border-line-strong hover:text-ink"
              >
                <Image
                  src={`/tech/${entry.icon}.png`}
                  alt=""
                  width={16}
                  height={16}
                  className="size-4 object-contain"
                />
                {entry.name}
              </span>
            ))}
          </Reveal>
        </div>
      ))}
    </div>
  );
}
