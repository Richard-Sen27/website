import type { Metadata } from "next";
import { getCopy } from "copy-ink/server";

import ContactForm, { type ContactFormCopy } from "@/components/contact/ContactForm";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/motion/Reveal";
import { ExternalIcon, Eyebrow } from "@/components/ui";
import { getGlobal, objectList, type SocialLink } from "@/lib/content";
import { breadcrumbSchema } from "@/lib/jsonld";
import { metadataForScope } from "@/lib/seo";

const SCOPE = "contact";

export function generateMetadata(): Promise<Metadata> {
  return metadataForScope(SCOPE, "/contact");
}

export default async function ContactPage() {
  const [copy, global] = await Promise.all([
    getCopy({ scope: SCOPE }),
    getGlobal(),
  ]);

  const socials = objectList<SocialLink>(global, "socials");

  // The form is a client component, so its copy is read here and handed over
  // as a plain object rather than being pulled per-field on the client.
  const formCopy = copy.raw("form") as ContactFormCopy;

  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />

      <div className="container-page grid gap-16 py-20 md:grid-cols-[1fr_1.15fr] md:py-28">
        <Reveal className="flex h-fit flex-col gap-6 md:sticky md:top-24">
          <Eyebrow>{copy.get("hero.eyebrow")}</Eyebrow>
          <h1 className="text-(length:--text-h1)">{copy.get("hero.headline")}</h1>
          <p className="text-lg leading-relaxed text-ink-muted">
            {copy.get("hero.intro")}
          </p>

          <div className="mt-4 flex flex-col gap-3 border-t border-line pt-6">
            <h2 className="font-mono text-xs tracking-widest text-ink-faint uppercase">
              {copy.get("direct.heading")}
            </h2>
            <p className="text-sm text-ink-muted">{copy.get("direct.body")}</p>
            <a
              href={`mailto:${global.get("email")}`}
              className="w-fit text-sm text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent"
            >
              {global.get("email")}
            </a>
            <ul className="mt-2 flex flex-wrap gap-4">
              {socials.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer me"
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-ink-muted transition-colors hover:text-ink"
                  >
                    {social.label}
                    <ExternalIcon className="text-ink-faint" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ContactForm copy={formCopy} />
        </Reveal>
      </div>
    </>
  );
}
