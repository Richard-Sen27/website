import type { Metadata } from "next";
import { rootMetadata } from "@/utils/rootMetaData";
import { novaSquare } from "@/utils/fonts";
import "./globals.css";

export const metadata: Metadata = rootMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="Sw_DWhQ-nzH2s1kwZQNhkV-tDoHeVH1mWAaMSLKvev4" />
      </head>
      <body
        className={`${novaSquare.variable} antialiased`}
      >
        {children}
        <script defer src="https://cloud.umami.is/script.js" data-website-id="770296fb-0158-468b-909c-48e1880fcd1e"/>
      </body>
    </html>
  );
}
