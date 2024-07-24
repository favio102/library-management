import { Footer, Navbar } from "@/components";
import "../styles/global.css";

export const metadata = {
  title: "Library Management",
  description: "Library Management",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <main className="app">
          <Navbar />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
