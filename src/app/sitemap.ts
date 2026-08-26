import type { MetadataRoute } from "next";
import { getSlugs } from "copy-ink/server";

import "~/copy-ink.setup";

import { getPosts } from "@/lib/posts";
import { absoluteUrl } from "@/lib/site";

/** Static routes, with the priorities that reflect how they actually rank. */
const STATIC_ROUTES: [path: string, priority: number, frequency: "monthly" | "weekly" | "yearly"][] =
  [
    ["/", 1, "monthly"],
    ["/projects", 0.9, "monthly"],
    ["/blog", 0.9, "weekly"],
    ["/about", 0.8, "monthly"],
    ["/contact", 0.7, "yearly"],
    ["/imprint", 0.2, "yearly"],
    ["/privacy", 0.2, "yearly"],
  ];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projectSlugs, posts] = await Promise.all([
    getSlugs("projects"),
    getPosts(),
  ]);

  const now = new Date();

  return [
    ...STATIC_ROUTES.map(([path, priority, changeFrequency]) => ({
      url: absoluteUrl(path),
      lastModified: now,
      changeFrequency,
      priority,
    })),
    ...projectSlugs.map((slug) => ({
      url: absoluteUrl(`/projects/${slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...posts
      .filter((post) => !post.draft)
      .map((post) => ({
        url: absoluteUrl(`/blog/${post.slug}`),
        lastModified: new Date(post.updated ?? post.date),
        changeFrequency: "yearly" as const,
        priority: 0.6,
      })),
  ];
}
