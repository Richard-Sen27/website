// AUTO-GENERATED. DO NOT EDIT.
// Source: src/app/theme.css · Regenerate: npm run tokens
//
// Semantic colour tokens flattened to opaque sRGB hex, for the surfaces that
// cannot read CSS custom properties: the contact email template, next/og
// image generation, and the theme-color meta tag. Alpha tokens are
// composited onto --surface.

export const tokens = {
  "accent": "#62a9f3",
  "accent-hover": "#96c9fc",
  "accent-ink": "#000000",
  "accent-line": "#2a415b",
  "accent-soft": "#161d25",
  "danger": "#ff5a60",
  "fade-out": "#0f1113",
  "focus-ring": "#62a9f3",
  "glow": "#1c2937",
  "glow-strong": "#2a415b",
  "gradient-from": "#96c9fc",
  "gradient-to": "#20d3db",
  "gradient-via": "#62a9f3",
  "grid-line": "#1d1f21",
  "ink": "#fafafa",
  "ink-faint": "#8a8c8f",
  "ink-inverse": "#000000",
  "ink-muted": "#a9abad",
  "line": "#27282b",
  "line-faint": "#1d1f21",
  "line-strong": "#3f4042",
  "mask-drop": "#0f1113",
  "mask-keep": "#000000",
  "scrim": "#040505",
  "scrollbar-thumb": "#2c2d2f",
  "scrollbar-thumb-hover": "#484a4c",
  "selection-bg": "#2a415b",
  "shadow-color": "#08090a",
  "spotlight": "#222426",
  "success": "#4fd57f",
  "surface": "#0f1113",
  "surface-active": "#222426",
  "surface-hover": "#181a1d",
  "surface-inset": "#26292d",
  "surface-overlay": "#15171a",
  "surface-raised": "#1d1f23",
  "surface-subtle": "#15171a",
  "warning": "#f7be2b",
} as const;

export type TokenName = keyof typeof tokens;

/** Resolved hex for a semantic token, e.g. token("ink-muted"). */
export function token(name: TokenName): string {
  return tokens[name];
}
