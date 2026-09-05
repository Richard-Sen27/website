import Image from "next/image";
import type { Metadata } from "next";
import { getCopy } from "copy-ink/server";

import AwardList from "@/components/AwardList";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/motion/Reveal";
import StackGrid from "@/components/StackGrid";
import { Eyebrow, Section, SectionHeader } from "@/components/ui";
import {
  getGlobal,
  image,
  objectList,
  type Award,
  type SocialLink,
  type StackEntry,
} from "@/lib/content";
import { breadcrumbSchema, personSchema } from "@/lib/jsonld";
import { metadataForScope } from "@/lib/seo";

const SCOPE = "about";

interface Pillar {
  title: string;
  body: string;
}

interface TimelineEntry {
  period: string;
  title: string;
  org: string;
  body: string;
}

interface Language {
  name: string;
  level: string;
}

export function generateMetadata(): Promise<Metadata> {
  return metadataForScope(SCOPE, "/about");
}

export default async function AboutPage() {
  const [copy, global] = await Promise.all([
    getCopy({ scope: SCOPE }),
    getGlobal(),
  ]);

  const portrait = image(copy, "portrait");
  const pillars = objectList<Pillar>(copy, "pillars.items");
  const experience = objectList<TimelineEntry>(copy, "experience.items");
  const education = objectList<TimelineEntry>(copy, "education.items");
  const awards = objectList<Award>(copy, "awards.items");
  const languages = objectList<Language>(copy, "languages.items");
  const stack = objectList<StackEntry>(global, "stack");
  const socials = objectList<SocialLink>(global, "socials");

  return (
    <>
      <JsonLd
        schema={personSchema({
          role: global.get("role"),
          description: copy.get("hero.intro"),
          socials: socials.map((social) => social.href),
          location: global.get("location"),
        })}
      />
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

      <section className="container-page py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-[1fr_auto] md:items-start md:gap-16">
          <Reveal className="flex flex-col gap-6">
            <Eyebrow>{copy.get("hero.eyebrow")}</Eyebrow>
            <h1 className="max-w-2xl text-(length:--text-h1)">
              {copy.get("hero.headline")}
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-ink-muted">
              {copy.get("hero.intro")}
            </p>
          </Reveal>

          {portrait ? (
            <Reveal delay={0.15} className="order-first md:order-0">
              <Image
                src={portrait.src}
                alt={portrait.alt ?? ""}
                width={portrait.width ?? 320}
                height={portrait.height ?? 320}
                priority
                className="size-40 rounded-xl border border-line object-cover md:size-56"
              />
            </Reveal>
          ) : null}
        </div>
      </section>

      <Section>
        <SectionHeader heading={copy.get("bio.heading")} />
        <Reveal className="prose-ink max-w-2xl">
          <Paragraphs text={copy.get("bio.body")} />
        </Reveal>
      </Section>

      <Section>
        <SectionHeader heading={copy.get("pillars.heading")} />
        <Reveal stagger className="grid gap-4 md:grid-cols-3">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="flex flex-col gap-3 rounded-xl border border-line bg-surface-raised p-6"
            >
              <h3 className="text-base font-medium text-ink">{pillar.title}</h3>
              <p className="text-sm leading-relaxed text-ink-muted">
                {pillar.body}
              </p>
            </div>
          ))}
        </Reveal>
      </Section>

      {experience.length ? (
        <Section>
          <SectionHeader heading={copy.get("experience.heading")} />
          <Timeline entries={experience} />
        </Section>
      ) : null}

      {awards.length ? (
        <Section>
          <SectionHeader
            heading={copy.get("awards.heading")}
            body={copy.get("awards.body")}
          />
          <AwardList awards={awards} />
        </Section>
      ) : null}

      {education.length ? (
        <Section>
          <SectionHeader heading={copy.get("education.heading")} />
          <Timeline entries={education} />
        </Section>
      ) : null}

      <Section>
        <SectionHeader
          heading={copy.get("stack.heading")}
          body={copy.get("stack.body")}
        />
        <StackGrid stack={stack} />
      </Section>

      {languages.length ? (
        <Section>
          <SectionHeader heading={copy.get("languages.heading")} />
          <Reveal stagger className="flex flex-wrap gap-2">
            {languages.map((language) => (
              <span
                key={language.name}
                className="inline-flex items-baseline gap-2 rounded-lg border border-line bg-surface-raised px-3 py-2 text-sm text-ink"
              >
                {language.name}
                <span className="font-mono text-xs text-ink-faint">
                  {language.level}
                </span>
              </span>
            ))}
          </Reveal>
        </Section>
      ) : null}
    </>
  );
}

function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <Reveal stagger className="flex flex-col">
      {entries.map((entry, index) => (
        <div
          key={`${entry.period}-${index}`}
          className="grid gap-2 border-b border-line py-8 first:pt-0 last:border-0 md:grid-cols-[12rem_1fr] md:gap-8"
        >
          <p className="font-mono text-xs text-ink-faint">{entry.period}</p>
          <div className="flex flex-col gap-1.5">
            <h3 className="text-base font-medium text-ink">{entry.title}</h3>
            <p className="text-sm text-ink-muted">{entry.org}</p>
            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-ink-muted">
              {entry.body}
            </p>
          </div>
        </div>
      ))}
    </Reveal>
  );
}

/** YAML folded scalars separate paragraphs with a blank line. */
function Paragraphs({ text }: { text: string }) {
  return (
    <>
      {text
        .split(/\n{2,}/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean)
        .map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
    </>
  );
}
