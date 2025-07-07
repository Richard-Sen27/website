import { Metadata } from "next/types";

export const rootMetadata: Metadata = {
  title: "Richard Senger – Software Engineer",
  description:
    "Software Engineer specializing in Web Development and Machine Learning. Based in Austria. Portfolio and links.",
  authors: [{ name: "Richard Senger", url: "https://dev.richard-senger.com" }],
  keywords: [
    "Richard Senger",
    "Software Engineer",
    "Web Developer",
    "Machine Learning",
    "Portfolio",
  ],
  metadataBase: new URL("https://dev.richard-senger.com"),
  openGraph: {
    title: "Richard Senger – Software Engineer",
    description:
      "Web Development · Machine Learning · Engineering Portfolio",
    url: "https://dev.richard-senger.com",
    siteName: "Richard Senger",
    images: [
      {
        url: "/black-white-face.webp", // Place this image in your /public folder
        width: 1474,
        height: 1476,
        alt: "Richard Senger – Software Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Richard Senger – Software Engineer",
    description:
      "Web Development · Machine Learning · Engineering Portfolio",
    images: ["/black-white-face.webp"],
    creator: "@RichardSen27",
  },
  themeColor: "#000000",
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
};