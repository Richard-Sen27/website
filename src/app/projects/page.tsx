import type { Metadata } from "next";
import { getCopy, getList } from "copy-ink/server";

import JsonLd from "@/components/JsonLd";
import ProjectCard from "@/components/ProjectCard";
import ProjectFilter from "@/components/projects/ProjectFilter";
import Reveal from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui";
import { field } from "@/lib/content";
import { breadcrumbSchema } from "@/lib/jsonld";
import { metadataForScope } from "@/lib/seo";

const SCOPE = "projects";

export function generateMetadata(): Promise<Metadata> {
  return metadataForScope(SCOPE, "/projects");
}

export default async function ProjectsPage() {
  const [copy, projects] = await Promise.all([
    getCopy({ scope: SCOPE }),
    getList("projects"),
  ]);

  const entries = projects.map((project) => ({
    slug: project.slug,
    category: field(project, "category"),
    card: <ProjectCard item={project} />,
  }));

  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
        ])}
      />

      <section className="container-page py-20 md:py-28">
        <Reveal className="flex flex-col gap-6">
          <Eyebrow>{copy.get("hero.eyebrow")}</Eyebrow>
          <h1 className="text-(length:--text-h1)">{copy.get("hero.headline")}</h1>
          <p className="max-w-2xl text-lg leading-relaxed text-ink-muted">
            {copy.get("hero.intro")}
          </p>
        </Reveal>
      </section>

      <section className="container-page pb-24">
        <ProjectFilter entries={entries} emptyState={copy.get("emptyState")} />
      </section>
    </>
  );
}
