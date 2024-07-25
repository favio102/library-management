import { Footer, Navbar } from "@/components";
import "../styles/global.css";
import { Provider } from "@/components";

export const metadata = {
  title: "Library Management",
  description: "Library Management",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <main className="app">
            <Navbar />
            {children}
            <Footer />
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
