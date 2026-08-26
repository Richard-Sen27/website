import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import JsonLd from "@/components/JsonLd";
import MdxContent from "@/components/MdxContent";
import Reveal from "@/components/motion/Reveal";
import { ArrowIcon, Badge } from "@/components/ui";
import { blogPostingSchema, breadcrumbSchema } from "@/lib/jsonld";
import { formatDate, getPost, getPostSlugs } from "@/lib/posts";
import { absoluteUrl } from "@/lib/site";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return (await getPostSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  const url = absoluteUrl(`/blog/${slug}`);

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function PostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <>
      <JsonLd schema={blogPostingSchema(post)} />
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${slug}` },
        ])}
      />

      <article className="container-prose py-20 md:py-24">
        <Reveal className="flex flex-col gap-5">
          <Link
            href="/blog"
            className="group inline-flex w-fit items-center gap-2 font-mono text-xs text-ink-faint transition-colors hover:text-ink"
          >
            <ArrowIcon className="rotate-180 transition-transform group-hover:-translate-x-1" />
            All posts
          </Link>

          <div className="flex items-center gap-3 font-mono text-xs text-ink-faint">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden>·</span>
            <span>{post.readingMinutes} min read</span>
          </div>

          <h1 className="text-(length:--text-h1)">{post.title}</h1>

          <p className="text-lg leading-relaxed text-ink-muted">
            {post.description}
          </p>

          {post.tags?.length ? (
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          ) : null}
        </Reveal>

        <hr className="my-12 border-line" />

        <div className="prose-ink">
          <MdxContent source={post.body} />
        </div>
      </article>
    </>
  );
}
