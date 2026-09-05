"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import type { NavLink } from "@/lib/content";
import { cx } from "@/components/ui";

interface HeaderProps {
  links: NavLink[];
  siteName: string;
}

/**
 * Sticky header with a pill indicator that slides between the active links.
 *
 * The indicator is measured from the DOM rather than hard-coded, so it stays
 * correct whatever the nav labels are once they come from copy-ink.
 */
export default function Header({ links, siteName }: HeaderProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(
    null,
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation.
  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    if (menuOpen) {
      const onKey = (event: KeyboardEvent) => {
        if (event.key === "Escape") setMenuOpen(false);
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const measure = () => {
      const active = list.querySelector<HTMLElement>("[data-active='true']");
      if (!active) {
        setIndicator(null);
        return;
      }
      setIndicator({ left: active.offsetLeft, width: active.offsetWidth });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    return () => observer.disconnect();
  }, [pathname, links]);

  return (
    <header
      className={cx(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        scrolled || menuOpen
          ? "border-line bg-surface/80 backdrop-blur-xl"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="container-page">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 font-mono text-sm font-medium tracking-tight"
          >
            <span aria-hidden className="text-ink-faint">
              &lt;
            </span>
            <span className="text-gradient">RS</span>
            <span aria-hidden className="text-ink-faint">
              /&gt;
            </span>
            <span className="sr-only">{siteName} — home</span>
          </Link>

          {/* Desktop navigation */}
          <nav aria-label="Main" className="hidden md:block">
            <ul ref={listRef} className="relative flex items-center gap-1">
              {indicator ? (
                <li
                  aria-hidden
                  className="absolute inset-y-1 rounded-md bg-surface-active transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{ left: indicator.left, width: indicator.width }}
                />
              ) : null}
              {links.map((link) => (
                <li key={link.href} className="relative">
                  <Link
                    href={link.href}
                    data-active={isActive(link.href)}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={cx(
                      "block rounded-md px-3 py-1.5 text-sm transition-colors duration-200",
                      isActive(link.href)
                        ? "text-ink"
                        : "text-ink-muted hover:text-ink",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            className="-mr-2 grid size-10 place-items-center rounded-md text-ink-muted transition-colors hover:text-ink md:hidden"
          >
            <span className="sr-only">
              {menuOpen ? "Close menu" : "Open menu"}
            </span>
            <svg
              aria-hidden
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="size-5"
            >
              {menuOpen ? (
                <path d="m5 5 10 10M15 5 5 15" />
              ) : (
                <path d="M3 6h14M3 14h14" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      <nav
        id="mobile-nav"
        aria-label="Main"
        hidden={!menuOpen}
        className="border-t border-line bg-surface-overlay md:hidden"
      >
        <ul className="container-page flex flex-col py-2">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cx(
                  "block border-b border-line-faint py-3 text-sm last:border-0",
                  isActive(link.href) ? "text-ink" : "text-ink-muted",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
