# dev.richard-senger.com

Personal site. Next.js 16 (App Router), React 19, Tailwind 4, GSAP, and
[copy-ink](https://richard-sen27.github.io/copy-ink/) for content.

```bash
npm install
npm run dev      # http://localhost:3000
```

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build. Runs `tokens` first via `prebuild` |
| `npm run check` | `lint:colors`, then `typecheck`, then `lint` |
| `npm run lint:colors` | Fails on any colour authored outside `theme.css` |
| `npm run tokens` | Regenerates the TS token mirror from `theme.css` |
| `npx copy-ink check` | Validates the content tree |

## Colour

**`src/app/theme.css` is the only file allowed to contain a literal colour
value.** It has three layers:

1. **Palette:** raw values such as `--palette-brand-400`. Never referenced by a component.
2. **Semantic:** roles such as `--accent`, `--ink-muted`, `--line`. This is what components use.
3. **`@theme inline`:** exposes layer 2 as Tailwind utilities like `bg-surface` and `text-ink-muted`.

Retuning the brand means editing layer 1. Changing where a colour gets used
means editing layer 2. Neither requires touching a component.

`npm run lint:colors` fails the build on any hex, `rgb()`, `hsl()`, `oklch()`
or Tailwind palette utility such as `text-zinc-500` found anywhere else.
Markdown code fences and inline code are exempt, since those are prose quoting
a value rather than styling anything.

Three places cannot read CSS custom properties: the contact email (mail clients
support neither custom properties nor oklch), `next/og` image generation, and
the `theme-color` meta tag. `scripts/gen-tokens.mjs` parses `theme.css`,
resolves the `var()` chains, composites alpha onto `--surface`, converts OKLCH
to sRGB and writes `src/design/tokens.generated.ts` for them. It runs on
`prebuild`, and CI fails if the committed mirror is stale.

GSAP tweens custom properties rather than colour literals, which keeps animated
states inside the system:

```ts
gsap.to(card, { "--spotlight-opacity": 1, duration: 0.35 });
```

## Content

Page copy and projects live in `content/`, laid out the way copy-ink expects,
which mirrors the App Router segments:

```
content/
  _global.yml               site name, socials, nav, footer, stack
  _index.yml                -> /
  about/_index.yml          -> /about
  projects/_index.yml       -> /projects
  _collections/projects/    one YAML file per project
posts/*.mdx                 blog posts, deliberately outside content/
```

Signing in at `/admin` with GitHub makes the copy editable in place, and the
changes commit back to the repo. The editor code is never sent to a visitor.

Each page YAML carries a `meta:` block that drives its `<title>`, description
and Open Graph card through `metadataForScope()` in `src/lib/seo.ts`.

`autoMetadata` is off deliberately. There is a comment explaining why in
`copy-ink.config.ts`.

### Why the blog is not in copy-ink

copy-ink's `richtext` is Markdown rendered by `marked`. That works well for the
short prose blocks on a project page, but a technical post wants code block
highlighting and MDX components, and writing long Markdown inside YAML block
scalars is unpleasant. Posts stay in `posts/*.mdx` with frontmatter.

Frontmatter needs `title`, `description` and `date`. Optional: `updated`,
`tags`, `draft`. Drafts render in development and are excluded from the build,
the sitemap and the feed.

## SEO

Per-route canonical URLs and Open Graph metadata, generated OG cards for the
home page and every project and post, `sitemap.xml`, `robots.txt`, an RSS feed
at `/blog/rss.xml`, and JSON-LD for `Person`, `WebSite`, `BlogPosting`,
`CreativeWork` and `BreadcrumbList`.

Every route except the API handlers and `/admin` is prerendered at build time.

## Motion

GSAP with ScrollTrigger, registered once in `src/lib/motion.ts`. The primitives
live in `src/components/motion/`: `Reveal`, `SplitHeadline` and `Spotlight`.

Every timeline checks `prefers-reduced-motion` and jumps to the end state
instead of animating towards it. Elements that start hidden are guarded by a
`.js` class, so visitors without JavaScript still see everything.

`SplitHeadline` splits words in the markup rather than using SplitText, so the
full sentence ends up in the server-rendered HTML where crawlers can read it.

## Deployment

Docker, with `output: 'standalone'`. The runtime image copies `content/`
explicitly, because Next traces the import graph rather than `fs.readFile`
paths and the `/admin` editor reads the YAML tree at runtime.

```bash
docker build -t website .
docker run -p 3000:3000 -e RESEND_API_KEY=... website
```

`RESEND_API_KEY` is the only required environment variable. Without it the
contact form returns a 500 and everything else works. See `.env.example`.

CI (`.github/workflows/ci.yml`) runs the colour lint, the token mirror
staleness check, `copy-ink check`, lint, typecheck, build, and a Docker build.
