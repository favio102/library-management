"use client";

import type { Metadata } from "next";
import { BookProvider } from "@/context/BookContext";
import "./globals.css";
import { Navbar, Footer } from "@/components";
import { usePathname } from "next/navigation";

const metadata: Metadata = {
  title: "Library Management",
  description: "Library Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  return (
    <BookProvider>
      <html lang="en">
        <body className="relative">
          <Navbar />
          {children}
          {pathname === "/" && <Footer />}
        </body>
      </html>
    </BookProvider>
  );
}
