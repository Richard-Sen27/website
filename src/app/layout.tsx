import type { Metadata } from "next";
import { Nova_Square } from "next/font/google";
import "./globals.css";

export const novaSquare = Nova_Square({
  variable: "--font-nova-square",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Richard Senger - Personal Website",
  description: "This is the personal website of Richard Senger, a software engineer and music enthusiast.",
};

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
      </body>
    </html>
  );
}
