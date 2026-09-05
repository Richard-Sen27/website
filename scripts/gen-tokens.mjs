#!/usr/bin/env node
/**
 * Parses src/app/theme.css and emits src/design/tokens.generated.ts.
 *
 * Some surfaces cannot read CSS custom properties: the Resend email template
 * (mail clients have no CSS var support and no oklch support), next/og image
 * generation (Satori resolves no cascade), and the theme-color meta tag. They
 * import the generated mirror instead, so there is still exactly one place
 * where a colour is authored.
 *
 * Runs on `prebuild`. CI additionally runs it and then `git diff --exit-code`,
 * so a stale mirror fails the build rather than silently drifting.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE = resolve(root, "src/app/theme.css");
const TARGET = resolve(root, "src/design/tokens.generated.ts");

/* -- parse ---------------------------------------------------------------- */

const css = readFileSync(SOURCE, "utf8");
// Strip comments so `/* --foo: bar */` never registers as a declaration.
const withoutComments = css.replace(/\/\*[\s\S]*?\*\//g, "");

const declarations = new Map();
for (const [, name, value] of withoutComments.matchAll(
  /(--[\w-]+)\s*:\s*([^;{}]+);/g,
)) {
  // Later declarations win, matching the cascade within a single file.
  declarations.set(name, value.trim());
}

/* -- resolve var() chains ------------------------------------------------- */

function resolveVars(value, seen = new Set()) {
  return value.replace(/var\(\s*(--[\w-]+)\s*\)/g, (whole, name) => {
    if (seen.has(name)) {
      throw new Error(`Circular custom property reference at ${name}`);
    }
    const next = declarations.get(name);
    if (next === undefined) return whole;
    return resolveVars(next, new Set([...seen, name]));
  });
}

/* -- colour conversion ---------------------------------------------------- */

const clamp01 = (n) => Math.min(1, Math.max(0, n));
const toHexPair = (n) =>
  Math.round(clamp01(n) * 255)
    .toString(16)
    .padStart(2, "0");

/** OKLab → linear sRGB → gamma-encoded sRGB. */
function oklchToRgb(L, C, hDeg) {
  const h = (hDeg * Math.PI) / 180;
  const a = C * Math.cos(h);
  const b = C * Math.sin(h);

  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;

  const l = l_ ** 3;
  const m = m_ ** 3;
  const s = s_ ** 3;

  const lin = [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];

  return lin.map((v) =>
    v <= 0.0031308 ? 12.92 * v : 1.055 * Math.abs(v) ** (1 / 2.4) - 0.055,
  );
}

const NUMBER = String.raw`[-+]?[\d.]+%?`;
const OKLCH = new RegExp(
  String.raw`^oklch\(\s*(${NUMBER})\s+(${NUMBER})\s+(${NUMBER})\s*(?:/\s*(${NUMBER})\s*)?\)$`,
  "i",
);
const RGB = new RegExp(
  String.raw`^rgba?\(\s*(${NUMBER})\s*[,\s]\s*(${NUMBER})\s*[,\s]\s*(${NUMBER})\s*(?:[,/]\s*(${NUMBER})\s*)?\)$`,
  "i",
);

const asNumber = (raw, scale = 1) =>
  raw.endsWith("%") ? parseFloat(raw) / 100 : parseFloat(raw) / scale;

/**
 * Flattens a colour onto an opaque backdrop. Mail clients and Satori handle
 * alpha inconsistently, so alpha tokens are composited against the page
 * surface and emitted as solid hex.
 */
function composite(fg, alpha, bg) {
  return fg.map((c, i) => c * alpha + bg[i] * (1 - alpha));
}

function parseColor(value) {
  const oklch = value.match(OKLCH);
  if (oklch) {
    const [, l, c, h, a] = oklch;
    return {
      rgb: oklchToRgb(asNumber(l), parseFloat(c), parseFloat(h)),
      alpha: a === undefined ? 1 : asNumber(a),
    };
  }

  const rgb = value.match(RGB);
  if (rgb) {
    const [, r, g, b, a] = rgb;
    return {
      rgb: [asNumber(r, 255), asNumber(g, 255), asNumber(b, 255)],
      alpha: a === undefined ? 1 : asNumber(a),
    };
  }

  return null;
}

/* -- build ---------------------------------------------------------------- */

// Everything with alpha is flattened onto --surface, which is what these
// consumers actually render against.
const surface = parseColor(resolveVars("var(--surface)"));
if (!surface) throw new Error("Could not resolve --surface from theme.css");
const backdrop = surface.rgb;

const tokens = {};
const skipped = [];

for (const name of declarations.keys()) {
  if (name.startsWith("--color-")) continue; // Tailwind exposure layer
  if (name.startsWith("--shiki-")) continue; // consumed by Shiki, not JS
  if (name.startsWith("--palette-")) continue; // layer 1 is not public API

  const resolved = resolveVars(declarations.get(name));
  const parsed = parseColor(resolved);
  if (!parsed) {
    skipped.push(name);
    continue;
  }

  const rgb =
    parsed.alpha === 1
      ? parsed.rgb
      : composite(parsed.rgb, parsed.alpha, backdrop);

  tokens[name.slice(2)] = `#${rgb.map(toHexPair).join("")}`;
}

const entries = Object.entries(tokens).sort(([a], [b]) => a.localeCompare(b));

const body = `// AUTO-GENERATED — DO NOT EDIT.
// Source: src/app/theme.css · Regenerate: npm run tokens
//
// Semantic colour tokens flattened to opaque sRGB hex, for the surfaces that
// cannot read CSS custom properties: the contact email template, next/og
// image generation, and the theme-color meta tag. Alpha tokens are
// composited onto --surface.

export const tokens = {
${entries.map(([k, v]) => `  ${JSON.stringify(k)}: ${JSON.stringify(v)},`).join("\n")}
} as const;

export type TokenName = keyof typeof tokens;

/** Resolved hex for a semantic token, e.g. token("ink-muted"). */
export function token(name: TokenName): string {
  return tokens[name];
}
`;

writeFileSync(TARGET, body);

console.log(
  `tokens: wrote ${entries.length} tokens → src/design/tokens.generated.ts`,
);
if (skipped.length) {
  console.log(`tokens: skipped ${skipped.length} non-colour (${skipped.join(", ")})`);
}
