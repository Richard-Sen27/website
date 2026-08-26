import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { CopyInkScripts } from "copy-ink/server";

import "~/copy-ink.setup";
import "./globals.css";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollManager from "@/components/ScrollManager";
import { geistMono, geistSans } from "@/lib/fonts";
import { getGlobal, objectList, type NavLink } from "@/lib/content";
import { site } from "@/lib/site";
import { tokens } from "@/design/tokens.generated";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Software Engineer`,
    template: `%s | ${site.name}`,
  },
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: "/", types: { "application/rss+xml": "/blog/rss.xml" } },
  icons: {
    icon: [{ url: "/code-icon_1024.png", type: "image/png" }],
    apple: [{ url: "/code-icon_1024.png", type: "image/png" }],
  },
  verification: { google: site.googleSiteVerification },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  // The one place a raw colour reaches the browser outside CSS. Sourced from
  // the generated mirror so it still tracks theme.css.
  themeColor: tokens.surface,
  colorScheme: "dark",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const global = await getGlobal();
  const navLinks = objectList<NavLink>(global, "nav");

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-surface text-ink antialiased">
        {/* Motion primitives hide themselves only when JS can un-hide them. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-ink-inverse"
        >
          Skip to content
        </a>

        <ScrollManager />

        <Header links={navLinks} siteName={global.get("siteName")} />

        <main id="main" className="pt-16">
          {children}
        </main>

        <Footer />

        {/* Renders nothing at all for a visitor. The editor bundle only loads
            once a copy-ink session exists. */}
        <CopyInkScripts />

        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id={site.umamiId}
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
