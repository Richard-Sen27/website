import type { Metadata } from "next";
import { getCopy, getList } from "copy-ink/server";

import Hero from "@/components/home/Hero";
import JsonLd from "@/components/JsonLd";
import PostCard from "@/components/PostCard";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/motion/Reveal";
import StackGrid from "@/components/StackGrid";
import { ArrowIcon, ButtonLink, Section, SectionHeader } from "@/components/ui";
import {
  flag,
  getGlobal,
  objectList,
  type SocialLink,
  type StackEntry,
} from "@/lib/content";
import { personSchema, websiteSchema } from "@/lib/jsonld";
import { getPosts } from "@/lib/posts";
import { metadataForScope } from "@/lib/seo";

interface Highlight {
  place: string;
  title: string;
  org: string;
}

export function generateMetadata(): Promise<Metadata> {
  return metadataForScope("", "/");
}

export default async function HomePage() {
  const [copy, global, projects, posts] = await Promise.all([
    getCopy({ scope: "" }),
    getGlobal(),
    getList("projects"),
    getPosts(),
  ]);

  const featured = projects.filter((project) => flag(project, "featured"));
  const stack = objectList<StackEntry>(global, "stack");
  const recognition = objectList<Highlight>(copy, "recognition.items");
  const socials = objectList<SocialLink>(global, "socials");
  const latest = posts.slice(0, 3);

  return (
    <>
      <JsonLd
        schema={personSchema({
          role: global.get("role"),
          description: global.get("tagline"),
          socials: socials.map((social) => social.href),
          location: global.get("location"),
        })}
      />
      <JsonLd schema={websiteSchema(global.get("tagline"))} />

      <Hero copy={copy} />

      <Section id="work">
        <SectionHeader
          eyebrow={copy.get("work.eyebrow")}
          heading={copy.get("work.heading")}
          body={copy.get("work.body")}
          action={
            <ButtonLink href={copy.get("work.cta.href")} variant="secondary">
              {copy.get("work.cta.label")}
              <ArrowIcon />
            </ButtonLink>
          }
        />
        <Reveal stagger className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {(featured.length ? featured : projects.slice(0, 3)).map((project) => (
            <ProjectCard key={project.slug} item={project} compact />
          ))}
        </Reveal>
      </Section>

      {recognition.length ? (
        <Section id="recognition">
          <SectionHeader
            eyebrow={copy.get("recognition.eyebrow")}
            heading={copy.get("recognition.heading")}
            body={copy.get("recognition.body")}
            action={
              <ButtonLink href={copy.get("recognition.cta.href")} variant="secondary">
                {copy.get("recognition.cta.label")}
                <ArrowIcon />
              </ButtonLink>
            }
          />
          <Reveal stagger className="grid gap-4 md:grid-cols-3">
            {recognition.map((item) => (
              <div
                key={item.title}
                className="flex flex-col gap-2 rounded-xl border border-line bg-surface-raised p-6"
              >
                <span className="w-fit rounded-md border border-accent-line bg-accent-soft px-2 py-0.5 font-mono text-xs text-accent">
                  {item.place}
                </span>
                <h3 className="mt-1 text-base font-medium text-ink">{item.title}</h3>
                <p className="text-sm text-ink-muted">{item.org}</p>
              </div>
            ))}
          </Reveal>
        </Section>
      ) : null}

      <Section id="stack">
        <SectionHeader
          eyebrow={copy.get("stack.eyebrow")}
          heading={copy.get("stack.heading")}
          body={copy.get("stack.body")}
        />
        <StackGrid stack={stack} />
      </Section>

      {latest.length ? (
        <Section id="writing">
          <SectionHeader
            eyebrow={copy.get("writing.eyebrow")}
            heading={copy.get("writing.heading")}
            body={copy.get("writing.body")}
            action={
              <ButtonLink href={copy.get("writing.cta.href")} variant="secondary">
                {copy.get("writing.cta.label")}
                <ArrowIcon />
              </ButtonLink>
            }
          />
          <Reveal stagger className="flex flex-col">
            {latest.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </Reveal>
        </Section>
      ) : null}

      <Section id="contact">
        <Reveal className="flex flex-col items-start gap-6 rounded-xl border border-line bg-surface-raised p-10 md:p-16">
          <h2 className="max-w-2xl text-(length:--text-h2)">
            {copy.get("contactCta.heading")}
          </h2>
          <p className="max-w-xl text-ink-muted">{copy.get("contactCta.body")}</p>
          <ButtonLink href={copy.get("contactCta.cta.href")}>
            {copy.get("contactCta.cta.label")}
            <ArrowIcon />
          </ButtonLink>
        </Reveal>
      </Section>
    </>
  );
}
