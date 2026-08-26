import { absoluteUrl, site } from "./site";
import type { Post } from "./posts";

/**
 * Structured data, emitted through a <script type="application/ld+json"> in the
 * relevant layout or page. This is what Google reads for rich results.
 */

type Json = Record<string, unknown>;

export function personSchema(options: {
  role: string;
  description: string;
  socials: string[];
  location: string;
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: absoluteUrl("/"),
    jobTitle: options.role,
    description: options.description,
    sameAs: options.socials,
    address: {
      "@type": "PostalAddress",
      addressCountry: options.location,
    },
  };
}

export function websiteSchema(description: string): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: absoluteUrl("/"),
    description,
    inLanguage: "en",
  };
}

export function blogPostingSchema(post: Post): Json {
  const url = absoluteUrl(`/blog/${post.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: { "@type": "Person", name: site.name, url: absoluteUrl("/") },
    publisher: { "@type": "Person", name: site.name },
    image: absoluteUrl(`/blog/${post.slug}/opengraph-image`),
    keywords: post.tags?.join(", "),
  };
}

export function creativeWorkSchema(options: {
  name: string;
  description: string;
  slug: string;
  year: string;
  keywords: string[];
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: options.name,
    description: options.description,
    url: absoluteUrl(`/projects/${options.slug}`),
    dateCreated: options.year,
    keywords: options.keywords.join(", "),
    creator: { "@type": "Person", name: site.name, url: absoluteUrl("/") },
  };
}

export function breadcrumbSchema(
  trail: { name: string; path: string }[],
): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}
