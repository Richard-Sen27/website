/**
 * Values needed before content can be read: the metadataBase, the OG image
 * dimensions, the analytics id. Everything editorial lives in
 * `content/_global.yml` instead.
 */
export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://dev.richard-senger.com",
  name: "Richard Senger",
  locale: "en_US",
  twitter: "@RichardSen27",
  umamiId: "770296fb-0158-468b-909c-48e1880fcd1e",
  googleSiteVerification: "Sw_DWhQ-nzH2s1kwZQNhkV-tDoHeVH1mWAaMSLKvev4",
} as const;

export const OG_SIZE = { width: 1200, height: 630 } as const;

export function absoluteUrl(path = "/"): string {
  return new URL(path, site.url).toString();
}
