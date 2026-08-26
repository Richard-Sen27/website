import { Geist, Geist_Mono } from "next/font/google";

/**
 * Geist is Vercel's typeface and the one Next.js ships its own surfaces in,
 * which makes it the right anchor for this design direction. next/font
 * self-hosts it, so no request leaves the origin.
 */
export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});
