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
  icons: {
    icon: [{ url: "/code-icon_1024.png", type: "image/png", }],
    apple: [{ url: "/code-icon_1024.png", type: "image/png", }]
  },
  appleWebApp: {
    statusBarStyle: "black-translucent",
    capable: true,
    startupImage: [{ url: "/code-icon_1024.png", }]
  },
  openGraph: {
    title: "Richard Senger – Software Engineer",
    description:
      "Web Development · Machine Learning · Engineering Portfolio",
    url: "https://dev.richard-senger.com",
    siteName: "Richard Senger",
    images: [
      {
        url: "/code-icon_1024.png", // Place this image in your /public folder
        width: 1024,
        height: 1024,
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
    images: ["/code-icon_1024.png"],
    creator: "@RichardSen27",
  },
};