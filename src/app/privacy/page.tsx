import type { Metadata } from "next";
import { getCopy } from "copy-ink/server";

import JsonLd from "@/components/JsonLd";
import LegalPage, {
  DetailList,
  LegalSection,
  Paragraphs,
} from "@/components/legal/LegalPage";
import { breadcrumbSchema } from "@/lib/jsonld";
import { metadataForScope } from "@/lib/seo";

const SCOPE = "privacy";

export function generateMetadata(): Promise<Metadata> {
  return metadataForScope(SCOPE, "/privacy");
}

/** Sections that are prose plus an optional named processor. */
const PROCESSOR_SECTIONS = [
  "hosting",
  "contactForm",
  "analytics",
  "editor",
] as const;

export default async function PrivacyPage() {
  const copy = await getCopy({ scope: SCOPE });

  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Privacy policy", path: "/privacy" },
        ])}
      />

      <LegalPage copy={copy}>
        <LegalSection heading={copy.get("controller.heading")}>
          <Paragraphs text={copy.get("controller.body")} />
          <DetailList
            items={[
              ["Name", copy.get("controller.name")],
              ["Address", copy.get("controller.address")],
              ["Email", copy.get("controller.email")],
            ]}
          />
        </LegalSection>

        {PROCESSOR_SECTIONS.map((key) => (
          <LegalSection key={key} heading={copy.get(`${key}.heading`)}>
            <Paragraphs text={copy.get(`${key}.body`)} />
            {copy.has(`${key}.processor`) ? (
              <p className="text-sm text-ink-faint">
                Processor: {copy.get(`${key}.processor`)}
              </p>
            ) : null}
          </LegalSection>
        ))}

        <LegalSection heading={copy.get("rights.heading")}>
          <Paragraphs text={copy.get("rights.body")} />
          <p>
            <a
              href={copy.get("rights.authority")}
              target="_blank"
              rel="noopener noreferrer"
            >
              {copy.get("rights.authority")}
            </a>
          </p>
        </LegalSection>
      </LegalPage>
    </>
  );
}
