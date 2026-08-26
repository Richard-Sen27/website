import { getCopy } from "copy-ink/server";

import "~/copy-ink.setup";
import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Richard Senger, Software Engineer";

export default async function Image() {
  const copy = await getCopy({ scope: "" });
  return ogImage({
    eyebrow: copy.get("hero.eyebrow"),
    title: copy.get("hero.headline"),
  });
}
