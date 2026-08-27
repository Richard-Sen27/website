import Entrance from "@/components/motion/Entrance";
import SplitHeadline from "@/components/motion/SplitHeadline";
import { ArrowIcon, ButtonLink, Eyebrow } from "@/components/ui";
import type { CopyReader } from "@/lib/content";

/**
 * Nothing here is a client component. The whole hero, animation included, is
 * server-rendered HTML plus CSS, so it paints and animates without waiting for
 * hydration.
 *
 * Spacing and type size are capped against viewport height as well as width.
 * Sized on width alone, the CTAs fell 79px below the fold on a 1280x800 laptop
 * and cleared a 13in MacBook Air by only 8px, which a bookmarks bar erases.
 */
export default function Hero({ copy }: { copy: CopyReader }) {
  return (
    <section className="relative overflow-hidden">
      {/* Texture, faded out toward the fold so the grid never reads as a table. */}
      <div
        aria-hidden
        className="grid-texture fade-mask-b pointer-events-none absolute inset-0 -z-10"
      />
      {/* A radial gradient rather than a blurred circle. A 120px blur over a
          672px element is one of the most expensive things you can ask a
          compositor to rasterise on first paint. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-1/3 left-1/2 -z-10 aspect-square w-[min(56rem,120vw)] -translate-x-1/2 [background:radial-gradient(circle,var(--glow),var(--fade-out)_62%)]"
      />

      <div className="container-page flex min-h-[calc(100svh-4rem)] flex-col justify-center py-[clamp(2.5rem,7vh,5rem)]">
        <Entrance delay={0.05}>
          <Eyebrow>{copy.get("hero.eyebrow")}</Eyebrow>
        </Entrance>

        <SplitHeadline
          text={copy.get("hero.headline")}
          delay={0.15}
          className="mt-[clamp(1rem,2.5vh,1.5rem)] max-w-4xl text-(length:--text-display) leading-[1.03] font-semibold"
        />

        <Entrance
          delay={0.55}
          className="mt-[clamp(1.25rem,3vh,2rem)] max-w-xl"
        >
          <p className="text-[clamp(1rem,0.9rem+0.3vw,1.125rem)] leading-relaxed text-ink-muted">
            {copy.get("hero.subheadline")}
          </p>
        </Entrance>

        <Entrance
          delay={0.7}
          className="mt-[clamp(1.5rem,3.5vh,2.5rem)] flex flex-wrap gap-3"
        >
          <ButtonLink href={copy.get("hero.primaryCta.href")}>
            {copy.get("hero.primaryCta.label")}
            <ArrowIcon />
          </ButtonLink>
          <ButtonLink href={copy.get("hero.secondaryCta.href")} variant="secondary">
            {copy.get("hero.secondaryCta.label")}
          </ButtonLink>
        </Entrance>
      </div>
    </section>
  );
}
