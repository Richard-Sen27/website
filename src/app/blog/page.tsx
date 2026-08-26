import type { Metadata } from "next";
import { getCopy } from "copy-ink/server";

import JsonLd from "@/components/JsonLd";
import PostCard from "@/components/PostCard";
import Reveal from "@/components/motion/Reveal";
import { ButtonLink, Eyebrow } from "@/components/ui";
import { breadcrumbSchema } from "@/lib/jsonld";
import { getPosts } from "@/lib/posts";
import { metadataForScope } from "@/lib/seo";

const SCOPE = "blog";

export function generateMetadata(): Promise<Metadata> {
  return metadataForScope(SCOPE, "/blog");
}

export default async function BlogPage() {
  const [copy, posts] = await Promise.all([
    getCopy({ scope: SCOPE }),
    getPosts(),
  ]);

  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />

      <section className="container-page py-20 md:py-28">
        <Reveal className="flex flex-col items-start gap-6">
          <Eyebrow>{copy.get("hero.eyebrow")}</Eyebrow>
          <h1 className="text-(length:--text-h1)">{copy.get("hero.headline")}</h1>
          <p className="max-w-2xl text-lg leading-relaxed text-ink-muted">
            {copy.get("hero.intro")}
          </p>
          <ButtonLink href={copy.get("subscribe.href")} variant="secondary">
            {copy.get("subscribe.label")}
          </ButtonLink>
        </Reveal>
      </section>

      <section className="container-page border-t border-line py-16">
        {posts.length ? (
          <Reveal stagger className="flex flex-col">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </Reveal>
        ) : (
          <p className="py-12 text-sm text-ink-muted">{copy.get("emptyState")}</p>
        )}
      </section>
    </>
  );
}
