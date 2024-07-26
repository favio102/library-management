import { Html, Head, Main, NextScript } from "next/document";
import { Footer, Navbar } from "@components";

export default function Document() {
  return (
    <Html lang="eng">
      <Head/>
      <body>
        <div className="app">
          <Navbar />
          <Main />
          <NextScript />
          <Footer />
        </div>
      </body>
    </Html>
  );
}
