"use client";

import Link from "next/link";
import { useState } from "react";

import { Button, cx } from "@/components/ui";

export interface ContactFormCopy {
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  consentLabel: string;
  consentLinkLabel: string;
  submitLabel: string;
  submittingLabel: string;
  successHeading: string;
  successBody: string;
  errorGeneric: string;
  errorConsent: string;
}

type Status = "idle" | "submitting" | "sent" | "error";

const FIELD_CLASS =
  "w-full rounded-lg border border-line bg-surface-raised px-3.5 py-2.5 text-sm " +
  "text-ink placeholder:text-ink-faint transition-colors duration-200 " +
  "hover:border-line-strong focus:border-accent focus:outline-none";

export default function ContactForm({ copy }: { copy: ContactFormCopy }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    if (data.get("consent") !== "on") {
      setStatus("error");
      setError(copy.errorConsent);
      return;
    }

    setStatus("submitting");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
        }),
      });

      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(body.error || copy.errorGeneric);

      setStatus("sent");
      form.reset();
    } catch (caught) {
      setStatus("error");
      setError(caught instanceof Error ? caught.message : copy.errorGeneric);
    }
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        className="flex flex-col gap-2 rounded-xl border border-line bg-surface-raised p-8"
      >
        <p className="flex items-center gap-2 text-base font-medium text-ink">
          <span aria-hidden className="size-1.5 rounded-full bg-success" />
          {copy.successHeading}
        </p>
        <p className="text-sm text-ink-muted">{copy.successBody}</p>
      </div>
    );
  }

  const busy = status === "submitting";

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label={copy.nameLabel}>
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={100}
            autoComplete="name"
            placeholder={copy.namePlaceholder}
            className={FIELD_CLASS}
          />
        </Field>

        <Field id="email" label={copy.emailLabel}>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={100}
            autoComplete="email"
            placeholder={copy.emailPlaceholder}
            className={FIELD_CLASS}
          />
        </Field>
      </div>

      <Field id="message" label={copy.messageLabel}>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          maxLength={2000}
          placeholder={copy.messagePlaceholder}
          className={cx(FIELD_CLASS, "resize-y")}
        />
      </Field>

      <label className="flex items-start gap-3 text-sm text-ink-muted">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-0.5 size-4 shrink-0 rounded-sm border-line accent-accent"
        />
        <span>
          {copy.consentLabel}{" "}
          <Link
            href="/privacy"
            className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-accent"
          >
            {copy.consentLinkLabel}
          </Link>
        </span>
      </label>

      {status === "error" && error ? (
        <p role="alert" className="text-sm text-danger">
          {error}
        </p>
      ) : null}

      <Button type="submit" disabled={busy} className="w-fit">
        {busy ? copy.submittingLabel : copy.submitLabel}
      </Button>
    </form>
  );
}

function Field({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm text-ink">
        {label}
      </label>
      {children}
    </div>
  );
}
