import "server-only";

import type { Metadata } from "next";
import { getMetadata } from "copy-ink/server";

import { absoluteUrl, site } from "./site";

/**
 * Builds a page's Metadata from its `meta:` block.
 *
 * copy-ink's getMetadata() returns title and description; canonical URLs, the
 * OG image and Twitter card are layered on here so every route gets them
 * without repeating the boilerplate.
 */
export async function metadataForScope(
  scope: string,
  path: string,
  overrides: Metadata = {},
): Promise<Metadata> {
  const meta = await getMetadata({ scope });
  const title = meta.title ?? site.name;
  const description = meta.description ?? "";
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: site.locale,
      url,
      title: meta.openGraph?.title ?? title,
      description: meta.openGraph?.description ?? description,
      // `images` is deliberately absent: Next fills it from the segment's
      // opengraph-image file convention. Setting it here would override that.
    },
    twitter: {
      card: "summary_large_image",
      creator: site.twitter,
      title,
      description,
    },
    ...overrides,
  };
}
