import { Html, Head, Main, NextScript } from "next/document";
import { Fragment } from "react";
import { Footer, Navbar } from "@components";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Library Management System" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
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
