import Link from "next/link";

import Spotlight from "@/components/motion/Spotlight";
import { ArrowIcon, Badge } from "@/components/ui";
import { field, stringList, type CollectionItem } from "@/lib/content";

/**
 * Project card. `compact` drops the tag row for the homepage grid, where the
 * cards sit three-up and the tags become noise.
 */
export default function ProjectCard({
  item,
  compact = false,
}: {
  item: CollectionItem;
  compact?: boolean;
}) {
  const tags = stringList(item, "tags");
  const year = field(item, "year");
  const context = field(item, "context");

  return (
    <Spotlight className="h-full rounded-xl">
      <Link
        href={`/projects/${item.slug}`}
        className="group flex h-full flex-col rounded-xl border border-line bg-surface-raised p-6 transition-colors duration-300 hover:border-line-strong"
      >
        <div className="mb-4 flex items-baseline justify-between gap-4">
          <span className="font-mono text-xs text-ink-faint">{year}</span>
          <ArrowIcon className="shrink-0 text-ink-faint transition-transform duration-300 group-hover:translate-x-1 group-hover:text-ink" />
        </div>

        <h3 className="mb-2 text-lg font-medium text-ink">
          {field(item, "title")}
        </h3>

        {context && !compact ? (
          <p className="mb-3 font-mono text-xs text-ink-faint">{context}</p>
        ) : null}

        <p className="flex-1 text-sm leading-relaxed text-ink-muted">
          {field(item, "summary")}
        </p>

        {!compact && tags.length ? (
          <div className="mt-5 flex flex-wrap gap-1.5">
            {tags.slice(0, 4).map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
            {tags.length > 4 ? <Badge>+{tags.length - 4}</Badge> : null}
          </div>
        ) : null}
      </Link>
    </Spotlight>
  );
}
