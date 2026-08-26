import type { ReactNode } from "react";
import type { CopyReader } from "copy-ink/server";

import Reveal from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui";

/**
 * Shared shell for the imprint and privacy pages. Both are a heading plus a run
 * of titled blocks, so the layout lives here and each page supplies its blocks.
 */
export default function LegalPage({
  copy,
  children,
}: {
  copy: CopyReader;
  children: ReactNode;
}) {
  const updated = copy.has("hero.updated") ? copy.get("hero.updated") : "";

  return (
    <div className="container-prose py-20 md:py-28">
      <Reveal className="flex flex-col gap-5">
        <Eyebrow>{copy.get("hero.eyebrow")}</Eyebrow>
        <h1 className="text-(length:--text-h1)">{copy.get("hero.headline")}</h1>
        <p className="text-lg leading-relaxed text-ink-muted">
          {copy.get("hero.intro")}
        </p>
        {updated ? (
          <p className="font-mono text-xs text-ink-faint">Last updated: {updated}</p>
        ) : null}
      </Reveal>

      <div className="mt-14 flex flex-col gap-12">{children}</div>
    </div>
  );
}

export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <Reveal as="section" className="flex flex-col gap-4">
      <h2 className="text-(length:--text-h3)">{heading}</h2>
      <div className="prose-ink text-base">{children}</div>
    </Reveal>
  );
}

/**
 * Renders a copy block's paragraphs. YAML folded scalars separate paragraphs
 * with a blank line, which survives as "\n\n".
 */
export function Paragraphs({ text }: { text: string }) {
  return (
    <>
      {text
        .split(/\n{2,}/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean)
        .map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
    </>
  );
}

/** A labelled run of lines, e.g. an address block. Empty lines are dropped. */
export function DetailList({ items }: { items: [string, string][] }) {
  const present = items.filter(([, value]) => value);
  if (!present.length) return null;

  return (
    <ul className="flex flex-col gap-1 not-prose">
      {present.map(([label, value]) => (
        <li key={label} className="flex flex-wrap gap-x-2 text-base">
          <span className="text-ink-faint">{label}:</span>
          <span className="text-ink-muted">{value}</span>
        </li>
      ))}
    </ul>
  );
}
