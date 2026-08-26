import { getItem, getSlugs } from "copy-ink/server";

import "~/copy-ink.setup";
import { field } from "@/lib/content";
import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Project";

export async function generateStaticParams() {
  return (await getSlugs("projects")).map((slug) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getItem("projects", slug);

  return ogImage({
    eyebrow: "Project",
    title: project ? field(project, "title") : "Project",
    meta: project
      ? [field(project, "year"), field(project, "role")].filter(Boolean).join(" · ")
      : undefined,
  });
}
