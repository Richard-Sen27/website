import Link from "next/link";

import { getGlobal, objectList, type FooterColumn, type SocialLink } from "@/lib/content";
import { ExternalIcon } from "@/components/ui";

const isExternal = (href: string) => /^https?:\/\//.test(href);

export default async function Footer() {
  const global = await getGlobal();
  const columns = objectList<FooterColumn>(global, "footer.columns");
  const socials = objectList<SocialLink>(global, "socials");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="container-page py-16">
        <div className="grid gap-12 md:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div className="flex flex-col gap-3">
            <p className="font-mono text-sm">
              <span aria-hidden className="text-ink-faint">
                &lt;
              </span>
              <span className="text-gradient">RS</span>
              <span aria-hidden className="text-ink-faint">
                /&gt;
              </span>
            </p>
            <p className="max-w-xs text-sm text-ink-muted">
              {global.get("tagline")}
            </p>
            <a
              href={`mailto:${global.get("email")}`}
              className="w-fit text-sm text-ink-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-ink hover:decoration-accent"
            >
              {global.get("email")}
            </a>
          </div>

          {columns.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h2 className="mb-4 font-mono text-xs tracking-widest text-ink-faint uppercase">
                {column.heading}
              </h2>
              <ul className="flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    {isExternal(link.href) ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-ink"
                      >
                        {link.label}
                        <ExternalIcon className="text-ink-faint" />
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-ink-muted transition-colors hover:text-ink"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ink-faint">
            © {year} {global.get("siteName")}. {global.get("footer.note")}
          </p>
          <ul className="flex items-center gap-4">
            {socials.map((social) => (
              <li key={social.href}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="font-mono text-xs text-ink-faint transition-colors hover:text-ink"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
