import type { Metadata, Viewport } from "next";
import { Fraunces, IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import { Navbar, Footer } from "@/components";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
});

const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-plex",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: {
    default: "Library Globe — an open shelf",
    template: "%s — Library Globe",
  },
  description:
    "An open catalogue of books anyone can read, add to and share. Search by title, author, year or subject.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${plex.variable} ${jetbrains.variable}`}
    >
      <body>
        <Providers>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
