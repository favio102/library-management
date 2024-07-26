"use client";

import type { AppProps } from "next/app";
import { BookProvider } from "../context/BookContext";
import "@/styles/global.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <BookProvider>
      <Component {...pageProps} />
    </BookProvider>
  );
}

export default App;
