"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { BookProvider } from "@/context/BookContext";

/* Client boundary for the whole app. The layout stays a server component so
 * `metadata` is honoured — this is where the interactive shell begins. */
const Providers = ({ children }: { children: ReactNode }) => (
  /* Light is the default rather than "system": the Almanac palette is a paper
   * theme first, and a visitor whose OS is dark should still land on the
   * bright shelf. The masthead toggle still switches, and the choice is
   * remembered. `enableSystem={false}` is what stops the OS preference from
   * overriding that default. */
  <ThemeProvider
    attribute="class"
    defaultTheme="light"
    enableSystem={false}
    disableTransitionOnChange
  >
    <BookProvider>
      {children}
      <Toaster
        position="bottom-left"
        gutter={8}
        toastOptions={{
          duration: 6000,
          className: "lg-toast",
          style: {
            background: "var(--color-ink)",
            color: "var(--color-paper)",
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-sm)",
            borderRadius: "var(--radius-input)",
            padding: "var(--space-sm) var(--space-md)",
            maxWidth: "26rem",
            boxShadow: "var(--shadow-panel)",
          },
        }}
      />
    </BookProvider>
  </ThemeProvider>
);

export default Providers;
