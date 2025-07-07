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
      <body
        className={`${novaSquare.variable} antialiased`}
      >
        {children}
        <script defer src="https://cloud.umami.is/script.js" data-website-id="770296fb-0158-468b-909c-48e1880fcd1e"/>
      </body>
    </html>
  );
}
