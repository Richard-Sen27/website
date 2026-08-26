import { ImageResponse } from "next/og";

import { tokens } from "@/design/tokens.generated";
import { OG_SIZE } from "./site";

/**
 * Shared Open Graph card.
 *
 * Satori resolves no cascade and understands no custom properties, so colours
 * come from the generated token mirror rather than from theme.css directly.
 * That keeps the card in step with the site whenever the palette is retuned.
 */
export function ogImage({
  eyebrow,
  title,
  meta,
}: {
  eyebrow: string;
  title: string;
  meta?: string;
}): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: tokens.surface,
          padding: 80,
          position: "relative",
        }}
      >
        {/* Accent wash, echoing the hero glow. Satori has no filter: blur(),
            so the falloff has to come from the gradient itself. */}
        <div
          style={{
            position: "absolute",
            top: -420,
            left: 60,
            width: 1080,
            height: 1080,
            background: `radial-gradient(circle, ${tokens.glow} 0%, ${tokens.surface} 62%)`,
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 9999,
              background: tokens.accent,
              display: "flex",
            }}
          />
          <span
            style={{
              fontSize: 24,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: tokens["ink-muted"],
            }}
          >
            {eyebrow}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <span
            style={{
              fontSize: title.length > 60 ? 62 : 78,
              lineHeight: 1.08,
              letterSpacing: -2.5,
              color: tokens.ink,
              maxWidth: 960,
            }}
          >
            {title}
          </span>
          {meta ? (
            <span style={{ fontSize: 26, color: tokens["ink-muted"] }}>{meta}</span>
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `1px solid ${tokens["line-strong"]}`,
            paddingTop: 28,
          }}
        >
          <span style={{ fontSize: 26, color: tokens.ink }}>Richard Senger</span>
          <span style={{ fontSize: 24, color: tokens["ink-faint"] }}>
            dev.richard-senger.com
          </span>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}

export const ogSize = OG_SIZE;
export const ogContentType = "image/png";
