import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Copy } from "copy-ink";
import { getItem, getList, getSlugs } from "copy-ink/server";

import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/motion/Reveal";
import { ArrowIcon, Badge, ExternalIcon, Eyebrow } from "@/components/ui";
import { field, stringList } from "@/lib/content";
import { breadcrumbSchema, creativeWorkSchema } from "@/lib/jsonld";
import { absoluteUrl } from "@/lib/site";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return (await getSlugs("projects")).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getItem("projects", slug);
  if (!project) return {};

  const title = field(project, "title");
  const description = field(project, "summary");
  const url = absoluteUrl(`/projects/${slug}`);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "article", title, description, url },
    twitter: { card: "summary_large_image", title, description },
  };
}

const SECTIONS = [
  { field: "problem", heading: "The problem" },
  { field: "approach", heading: "The approach" },
  { field: "outcome", heading: "The outcome" },
] as const;

export default async function ProjectPage({ params }: { params: Params }) {
  const { slug } = await params;
  const [project, all] = await Promise.all([
    getItem("projects", slug),
    getList("projects"),
  ]);

  if (!project) notFound();

  const tags = stringList(project, "tags");
  const liveUrl = field(project, "liveUrl");
  const codeUrl = field(project, "codeUrl");
  const context = field(project, "context");
  const role = field(project, "role");

  const index = all.findIndex((item) => item.slug === slug);
  const next = all[(index + 1) % all.length];

  return (
    <>
      <JsonLd
        schema={creativeWorkSchema({
          name: field(project, "title"),
          description: field(project, "summary"),
          slug,
          year: field(project, "year"),
          keywords: tags,
        })}
      />
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
          { name: field(project, "title"), path: `/projects/${slug}` },
        ])}
      />

      {/* Scopes the subtree to this item so <Copy.Rich> resolves against it and
          the fields stay editable in place once signed in. */}
      <Copy.Item collection="projects" item={slug}>
        <article>
          <header className="container-page border-b border-line py-20 md:py-24">
            <Reveal className="flex flex-col gap-6">
              <Link
                href="/projects"
                className="group inline-flex w-fit items-center gap-2 font-mono text-xs text-ink-faint transition-colors hover:text-ink"
              >
                <ArrowIcon className="rotate-180 transition-transform group-hover:-translate-x-1" />
                All projects
              </Link>

              <Eyebrow>{field(project, "year")}</Eyebrow>

              <h1 className="max-w-3xl text-(length:--text-h1)">
                <Copy field="title" />
              </h1>

              <p className="max-w-2xl text-lg leading-relaxed text-ink-muted">
                <Copy field="summary" />
              </p>

              {tags.length ? (
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
              ) : null}
            </Reveal>
          </header>

          <div className="container-page grid gap-12 py-16 md:grid-cols-[16rem_1fr] md:gap-16">
            <Reveal as="aside" className="flex h-fit flex-col gap-6 md:sticky md:top-24">
              {role ? <Meta label="Role" value={role} /> : null}
              {context ? <Meta label="Context" value={context} /> : null}

              {liveUrl || codeUrl ? (
                <div className="flex flex-col gap-2 border-t border-line pt-6">
                  {liveUrl ? <OutboundLink href={liveUrl} label="Visit site" /> : null}
                  {codeUrl ? <OutboundLink href={codeUrl} label="View source" /> : null}
                </div>
              ) : null}
            </Reveal>

            <div className="flex flex-col gap-12">
              {SECTIONS.map((section) => (
                <Reveal key={section.field} className="flex flex-col gap-4">
                  <h2 className="text-(length:--text-h3)">{section.heading}</h2>
                  <div className="prose-ink">
                    <Copy.Rich field={section.field} />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </article>
      </Copy.Item>

      {next && next.slug !== slug ? (
        <nav aria-label="Next project" className="border-t border-line">
          <Link
            href={`/projects/${next.slug}`}
            className="group container-page flex items-center justify-between gap-6 py-12"
          >
            <span className="flex flex-col gap-1.5">
              <span className="font-mono text-xs text-ink-faint">Next project</span>
              <span className="text-(length:--text-h3) text-ink">
                {field(next, "title")}
              </span>
            </span>
            <ArrowIcon className="size-6 shrink-0 text-ink-faint transition-transform duration-300 group-hover:translate-x-1 group-hover:text-ink" />
          </Link>
        </nav>
      ) : null}
    </>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="font-mono text-xs tracking-widest text-ink-faint uppercase">
        {label}
      </p>
      <p className="text-sm text-ink-muted">{value}</p>
    </div>
  );
}

function OutboundLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex w-fit items-center gap-2 text-sm text-ink transition-colors hover:text-accent"
    >
      {label}
      <ExternalIcon />
    </a>
  );
}
