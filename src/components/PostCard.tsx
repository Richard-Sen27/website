import Link from "next/link";

import { ArrowIcon } from "@/components/ui";
import { formatDate, type Post } from "@/lib/posts";

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col gap-2 border-b border-line py-6 transition-colors first:pt-0 hover:border-line-strong"
    >
      <div className="flex items-center gap-3 font-mono text-xs text-ink-faint">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span aria-hidden>·</span>
        <span>{post.readingMinutes} min read</span>
        {post.draft ? (
          <span className="rounded bg-surface-inset px-1.5 py-0.5 text-warning">
            draft
          </span>
        ) : null}
      </div>

      <h3 className="flex items-center gap-2 text-lg font-medium text-ink">
        {post.title}
        <ArrowIcon className="text-ink-faint transition-transform duration-300 group-hover:translate-x-1 group-hover:text-ink" />
      </h3>

      <p className="max-w-2xl text-sm leading-relaxed text-ink-muted">
        {post.description}
      </p>
    </Link>
  );
}
