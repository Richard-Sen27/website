import { Inter, Nova_Square, Milonga } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const novaSquare = Nova_Square({
  variable: "--font-nova-square",
  subsets: ["latin"],
  weight: "400",
});

const milonga = Milonga({
  variable: "--font-milonga",
  subsets: ["latin"],
  weight: "400",
});

export { inter, novaSquare, milonga };