import { defineConfig } from "copy-ink/config";

export default defineConfig({
  contentDir: "content",
  publicDir: "public",
  defaultLocale: "en",
  locales: ["en"],

  // Every page YAML carries a `meta:` block and pages build their metadata from
  // it via getMetadata(), which reads `meta` regardless of this flag.
  //
  // Left off deliberately: in 0.2.0 the `meta-conflict` rule in
  // core/naming.js fires on *any* root `meta` key whenever autoMetadata is on,
  // so `copy-ink check` exits 1 on the documented happy path. The hint ("meta
  // must hold title/description — not your own data") suggests it should only
  // fire when meta carries keys beyond title/description/openGraph.
  autoMetadata: false,

  // Loud in development, silent in production: an unfilled key renders its own
  // path while the content is still being written, and nothing once shipped.
  missingField: process.env.NODE_ENV === "production" ? "empty" : "key",
  localeFallback: "default",

  auth: {
    provider: "github",
    allowlist: ["Richard-Sen27"],
  },

  backend: {
    type: "github",
    repo: "Richard-Sen27/website",
    branch: "main",
  },

  images: {
    maxUploadBytes: 8 * 1024 * 1024,
  },

  collections: {
    projects: {
      label: "Projects",
      path: "_collections/projects",
      slugFrom: "title",
      route: "/projects/[slug]",
      orderBy: { field: "year", direction: "desc" },
      fields: {
        title: { type: "text", label: "Title", required: true },
        summary: {
          type: "text",
          label: "Card summary",
          multiline: true,
          maxLength: 240,
          required: true,
        },
        year: { type: "text", label: "Year", required: true },
        role: { type: "text", label: "Role" },
        context: {
          type: "text",
          label: "Context",
          description: "Client, course or event this was built for",
        },
        featured: { type: "boolean", label: "Show on homepage" },
        // Drives the filter on /projects. Deliberately a short fixed list:
        // filtering by raw tags produced 26 buttons for 7 projects, most of
        // which isolated a single card.
        category: {
          type: "select",
          label: "Category",
          required: true,
          options: [
            { label: "AI & machine learning", value: "AI & ML" },
            { label: "Web platforms", value: "Web platforms" },
            { label: "Open source", value: "Open source" },
          ],
        },
        cover: { type: "image", label: "Cover image" },
        liveUrl: { type: "text", label: "Live URL" },
        codeUrl: { type: "text", label: "Source URL" },
        problem: { type: "richtext", label: "The problem" },
        approach: { type: "richtext", label: "The approach" },
        outcome: { type: "richtext", label: "The outcome" },
      },
    },
  },
});
