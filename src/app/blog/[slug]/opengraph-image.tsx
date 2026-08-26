import { ogContentType, ogImage, ogSize } from "@/lib/og";
import { formatDate, getPost, getPostSlugs } from "@/lib/posts";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Blog post";

export async function generateStaticParams() {
  return (await getPostSlugs()).map((slug) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  return ogImage({
    eyebrow: "Writing",
    title: post?.title ?? "Blog post",
    meta: post
      ? `${formatDate(post.date)} · ${post.readingMinutes} min read`
      : undefined,
  });
}
