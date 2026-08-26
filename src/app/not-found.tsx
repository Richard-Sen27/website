import { ArrowIcon, ButtonLink } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60svh] flex-col items-start justify-center py-24">
      <p className="font-mono text-sm text-ink-faint">404</p>
      <h1 className="mt-4 max-w-xl text-(length:--text-h1)">
        This page does not exist.
      </h1>
      <p className="mt-4 max-w-md text-ink-muted">
        The link may be out of date, or the page may have moved.
      </p>
      <ButtonLink href="/" className="mt-8">
        Back to home
        <ArrowIcon />
      </ButtonLink>
    </div>
  );
}
