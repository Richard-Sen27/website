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

const SCOPE = "imprint";

export function generateMetadata(): Promise<Metadata> {
  return metadataForScope(SCOPE, "/imprint");
}

export default async function ImprintPage() {
  const copy = await getCopy({ scope: SCOPE });

  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Imprint", path: "/imprint" },
        ])}
      />

      <LegalPage copy={copy}>
        <LegalSection heading={copy.get("operator.heading")}>
          <DetailList
            items={[
              ["Name", copy.get("operator.name")],
              ["Address", copy.get("operator.street")],
              [
                "City",
                [copy.get("operator.postcode"), copy.get("operator.city")]
                  .filter(Boolean)
                  .join(" "),
              ],
              ["Country", copy.get("operator.country")],
            ]}
          />
        </LegalSection>

        <LegalSection heading={copy.get("contact.heading")}>
          <DetailList
            items={[
              ["Email", copy.get("contact.email")],
              ["Phone", copy.get("contact.phone")],
            ]}
          />
        </LegalSection>

        <LegalSection heading={copy.get("businessDetails.heading")}>
          <DetailList
            items={[
              ["Purpose", copy.get("businessDetails.purpose")],
              ["VAT ID", copy.get("businessDetails.vatId")],
              ["Registration", copy.get("businessDetails.registration")],
              ["Supervisory authority", copy.get("businessDetails.authority")],
              ["Chamber", copy.get("businessDetails.chamber")],
            ]}
          />
        </LegalSection>

        <LegalSection heading={copy.get("disclaimer.heading")}>
          <Paragraphs text={copy.get("disclaimer.body")} />
        </LegalSection>

        <LegalSection heading={copy.get("dispute.heading")}>
          <Paragraphs text={copy.get("dispute.body")} />
          <p>
            <a href={copy.get("dispute.href")} target="_blank" rel="noopener noreferrer">
              {copy.get("dispute.href")}
            </a>
          </p>
        </LegalSection>
      </LegalPage>
    </>
  );
}
