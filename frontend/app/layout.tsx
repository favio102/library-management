"use client";

import type { Metadata } from "next";
import { BookProvider } from "@/context/BookContext";
import "./globals.css";
import { Navbar, Footer } from "@/components";
import { Toaster } from "react-hot-toast";
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
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 5000,
              success: { style: { background: "orange", color: "white" } },
              error: { style: { background: "red", color: "white" } },
            }}
            reverseOrder={false}
          />
          {pathname === "/" && <Footer />}
        </body>
      </html>
    </BookProvider>
  );
}
