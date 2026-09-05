import Reveal from "@/components/motion/Reveal";
import SplitHeadline from "@/components/motion/SplitHeadline";
import { ArrowIcon, ButtonLink, Eyebrow } from "@/components/ui";
import type { CopyReader } from "@/lib/content";

export default function Hero({ copy }: { copy: CopyReader }) {
  return (
    <section className="relative overflow-hidden">
      {/* Texture, faded out toward the fold so the grid never reads as a table. */}
      <div
        aria-hidden
        className="grid-texture fade-mask-b pointer-events-none absolute inset-0 -z-10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 size-[42rem] -translate-x-1/2 rounded-full bg-glow blur-[120px]"
      />

      <div className="container-page flex min-h-[calc(100svh-4rem)] flex-col justify-center py-24">
        <Reveal delay={0.1}>
          <Eyebrow>{copy.get("hero.eyebrow")}</Eyebrow>
        </Reveal>

        <SplitHeadline
          text={copy.get("hero.headline")}
          delay={0.2}
          className="mt-6 max-w-4xl text-(length:--text-display) leading-[1.02] font-semibold"
        />

        <Reveal delay={0.7} className="mt-8 max-w-xl">
          <p className="text-lg leading-relaxed text-ink-muted">
            {copy.get("hero.subheadline")}
          </p>
        </Reveal>

        <Reveal delay={0.85} stagger className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href={copy.get("hero.primaryCta.href")}>
            {copy.get("hero.primaryCta.label")}
            <ArrowIcon />
          </ButtonLink>
          <ButtonLink href={copy.get("hero.secondaryCta.href")} variant="secondary">
            {copy.get("hero.secondaryCta.label")}
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
