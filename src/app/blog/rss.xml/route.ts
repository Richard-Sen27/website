import { getCopy } from "copy-ink/server";

import "~/copy-ink.setup";

import { getGlobal } from "@/lib/content";
import { getPosts } from "@/lib/posts";
import { absoluteUrl, site } from "@/lib/site";

/** Escapes the five XML predefined entities. */
function escapeXml(value: string): string {
  return value.replace(/[<>&'"]/g, (char) => {
    switch (char) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      default:
        return "&quot;";
    }
  });
}

// Nothing here reads the request; the feed is a build artefact like any page.
export const dynamic = "force-static";

export async function GET() {
  const [copy, global, posts] = await Promise.all([
    getCopy({ scope: "blog" }),
    getGlobal(),
    getPosts(),
  ]);

  const published = posts.filter((post) => !post.draft);
  const feedUrl = absoluteUrl("/blog/rss.xml");
  const title = `${global.get("siteName")} Blog`;
  const description = copy.get("hero.intro");

  const items = published
    .map((post) => {
      const url = absoluteUrl(`/blog/${post.slug}`);
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate>
      <description>${escapeXml(post.description)}</description>
${(post.tags ?? []).map((tag) => `      <category>${escapeXml(tag)}</category>`).join("\n")}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(title)}</title>
    <link>${absoluteUrl("/blog")}</link>
    <description>${escapeXml(description)}</description>
    <language>en</language>
    <managingEditor>${global.get("email")} (${escapeXml(site.name)})</managingEditor>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "content-type": "application/rss+xml; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
