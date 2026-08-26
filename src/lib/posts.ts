import "server-only";

import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import readingTime from "reading-time";

/**
 * MDX blog posts.
 *
 * Deliberately outside copy-ink's `content/` tree. copy-ink's richtext is
 * Markdown rendered by marked, which gives up code block highlighting and MDX
 * components. Posts get written in an editor, whereas page copy and the
 * projects collection are what a browser based editor is actually for.
 */

const POSTS_DIR = join(process.cwd(), "posts");

export interface PostFrontmatter {
  title: string;
  description: string;
  /** ISO date, e.g. 2026-08-26. */
  date: string;
  updated?: string;
  tags?: string[];
  draft?: boolean;
}

export interface Post extends PostFrontmatter {
  slug: string;
  body: string;
  readingMinutes: number;
}

function assertFrontmatter(
  data: Record<string, unknown>,
  slug: string,
): PostFrontmatter {
  const missing = (["title", "description", "date"] as const).filter(
    (key) => typeof data[key] !== "string" || !data[key],
  );
  if (missing.length) {
    throw new Error(
      `posts/${slug}.mdx is missing frontmatter: ${missing.join(", ")}`,
    );
  }
  return data as unknown as PostFrontmatter;
}

export const getPost = cache(async (slug: string): Promise<Post | null> => {
  let raw: string;
  try {
    raw = await readFile(join(POSTS_DIR, `${slug}.mdx`), "utf8");
  } catch {
    return null;
  }

  const { data, content } = matter(raw);
  const frontmatter = assertFrontmatter(data, slug);

  return {
    ...frontmatter,
    slug,
    body: content,
    readingMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
  };
});

export const getPosts = cache(async (): Promise<Post[]> => {
  let filenames: string[];
  try {
    filenames = await readdir(POSTS_DIR);
  } catch {
    return [];
  }

  const posts = (
    await Promise.all(
      filenames
        .filter((name) => name.endsWith(".mdx"))
        .map((name) => getPost(name.replace(/\.mdx$/, ""))),
    )
  ).filter((post): post is Post => post !== null);

  return posts
    .filter((post) => !post.draft || process.env.NODE_ENV !== "production")
    .sort((a, b) => b.date.localeCompare(a.date));
});

export const getPostSlugs = cache(async (): Promise<string[]> =>
  (await getPosts()).map((post) => post.slug),
);

/** Formats an ISO date for display. Fixed locale so SSR and client agree. */
export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
