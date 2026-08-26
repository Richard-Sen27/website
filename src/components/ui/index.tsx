import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/** Joins class names, dropping falsy entries. */
export function cx(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}

/* -- Button ---------------------------------------------------------------- */

type ButtonVariant = "primary" | "secondary" | "ghost";

const BUTTON_BASE =
  "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium " +
  "transition-colors duration-200 whitespace-nowrap disabled:opacity-50 " +
  "disabled:pointer-events-none";

const BUTTON_VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-ink text-ink-inverse hover:bg-ink/90 px-4 h-10",
  secondary:
    "border border-line bg-surface-raised text-ink hover:bg-surface-hover " +
    "hover:border-line-strong px-4 h-10",
  ghost: "text-ink-muted hover:text-ink px-2 h-9",
};

interface ButtonLinkProps extends ComponentProps<typeof Link> {
  variant?: ButtonVariant;
}

export function ButtonLink({
  variant = "primary",
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cx(BUTTON_BASE, BUTTON_VARIANTS[variant], className)}
      {...props}
    />
  );
}

export function Button({
  variant = "primary",
  className,
  ...props
}: ComponentProps<"button"> & { variant?: ButtonVariant }) {
  return (
    <button
      className={cx(BUTTON_BASE, BUTTON_VARIANTS[variant], className)}
      {...props}
    />
  );
}

/* -- Badge ----------------------------------------------------------------- */

export function Badge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-md border border-line bg-surface-raised",
        "px-2 py-0.5 font-mono text-xs text-ink-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

/* -- Eyebrow --------------------------------------------------------------- */

/** The small label above a section heading, with the accent tick. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center gap-2 font-mono text-xs tracking-widest text-ink-muted uppercase">
      <span aria-hidden className="size-1 rounded-full bg-accent" />
      {children}
    </p>
  );
}

/* -- Section --------------------------------------------------------------- */

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cx("border-t border-line py-20 md:py-28", className)}>
      <div className="container-page">{children}</div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  heading,
  body,
  action,
}: {
  eyebrow?: string;
  heading: string;
  body?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div className="flex max-w-2xl flex-col gap-3">
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <h2 className="text-(length:--text-h2)">{heading}</h2>
        {body ? <p className="text-ink-muted">{body}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

/* -- Arrow ----------------------------------------------------------------- */

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cx("size-4", className)}
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

export function ExternalIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cx("size-3.5", className)}
    >
      <path d="M6 3h7v7M13 3 6.5 9.5M11 9.5V13H3V5h3.5" />
    </svg>
  );
}
