#!/usr/bin/env node
/**
 * Fails if a colour is authored anywhere except src/app/theme.css.
 *
 * Catches two classes of leak:
 *   1. Literal values      — #0a0a0a, rgb(...), hsl(...), oklch(...)
 *   2. Tailwind's palette  — text-zinc-500, bg-blue-600/50, border-slate-800
 *
 * Both bypass the token system, so both are build failures.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, relative, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const ROOTS = ["src", "content", "posts"];
const EXTENSIONS = /\.(tsx?|jsx?|css|mdx?|ya?ml)$/;

// The only file allowed to author colour, plus its generated mirror.
const ALLOWED = new Set(["src/app/theme.css", "src/design/tokens.generated.ts"]);

const TAILWIND_PALETTE =
  "slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|" +
  "teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose";
const TAILWIND_PREFIX =
  "bg|text|border|ring|outline|fill|stroke|from|via|to|decoration|shadow|accent|caret|divide|placeholder";

const RULES = [
  {
    id: "hex-literal",
    // Skips #RRGGBB inside a URL fragment or an id selector.
    pattern: /(?<![\w&#])#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g,
    hint: "use a semantic token (var(--ink), text-ink-muted)",
  },
  {
    id: "color-function",
    pattern: /\b(?:rgba?|hsla?|oklch|oklab|lab|lch|color-mix)\s*\(/g,
    hint: "add it to theme.css layer 1 and reference the semantic role",
  },
  {
    id: "tailwind-palette",
    pattern: new RegExp(
      String.raw`\b(?:${TAILWIND_PREFIX})-(?:${TAILWIND_PALETTE})-\d{2,3}\b`,
      "g",
    ),
    hint: "use a semantic utility (bg-surface-raised, text-ink-faint)",
  },
  {
    id: "tailwind-bw",
    pattern: new RegExp(
      String.raw`\b(?:${TAILWIND_PREFIX})-(?:white|black)\b(?!\/)`,
      "g",
    ),
    hint: "use bg-surface / text-ink instead of absolute black and white",
  },
];

function* walk(dir) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return;
  }
  for (const entry of entries) {
    if (entry === "node_modules" || entry.startsWith(".")) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) yield* walk(full);
    else if (EXTENSIONS.test(entry)) yield full;
  }
}

const violations = [];

for (const dir of ROOTS) {
  for (const file of walk(resolve(root, dir))) {
    const rel = relative(root, file).split("\\").join("/");
    if (ALLOWED.has(rel)) continue;

    const lines = readFileSync(file, "utf8").split("\n");
    lines.forEach((line, index) => {
      if (/lint-colors-disable-line/.test(line)) return;
      for (const rule of RULES) {
        rule.pattern.lastIndex = 0;
        const match = rule.pattern.exec(line);
        if (match) {
          violations.push({
            file: rel,
            line: index + 1,
            match: match[0],
            rule: rule.id,
            hint: rule.hint,
          });
          break;
        }
      }
    });
  }
}

if (violations.length === 0) {
  console.log("lint:colors — no hardcoded colours outside theme.css");
  process.exit(0);
}

console.error(
  `\nlint:colors — ${violations.length} hardcoded colour${violations.length === 1 ? "" : "s"} outside src/app/theme.css\n`,
);
for (const v of violations) {
  console.error(`  ${v.file}:${v.line}  ${v.match}`);
  console.error(`    ${v.rule} — ${v.hint}\n`);
}
process.exit(1);
