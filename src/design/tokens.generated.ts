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
  "accent-line": "#1f364e",
  "accent-soft": "#080e13",
  "danger": "#ff5a60",
  "fade-out": "#000000",
  "focus-ring": "#62a9f3",
  "glow": "#101b27",
  "glow-strong": "#1f364e",
  "gradient-from": "#96c9fc",
  "gradient-to": "#20d3db",
  "gradient-via": "#62a9f3",
  "grid-line": "#0a0a0a",
  "ink": "#fafafa",
  "ink-faint": "#636363",
  "ink-inverse": "#000000",
  "ink-muted": "#9e9e9e",
  "line": "#141414",
  "line-faint": "#0a0a0a",
  "line-strong": "#292929",
  "mask-drop": "#000000",
  "mask-keep": "#000000",
  "scrim": "#000000",
  "scrollbar-thumb": "#1f1f1f",
  "scrollbar-thumb-hover": "#3d3d3d",
  "selection-bg": "#1f364e",
  "shadow-color": "#000000",
  "spotlight": "#0f0f0f",
  "success": "#4fd57f",
  "surface": "#000000",
  "surface-active": "#141414",
  "surface-hover": "#0a0a0a",
  "surface-inset": "#0d0d0d",
  "surface-overlay": "#020202",
  "surface-raised": "#060606",
  "surface-subtle": "#020202",
  "warning": "#f7be2b",
} as const;

export type TokenName = keyof typeof tokens;

/** Resolved hex for a semantic token, e.g. token("ink-muted"). */
export function token(name: TokenName): string {
  return tokens[name];
}
