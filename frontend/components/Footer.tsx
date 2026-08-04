import Link from "next/link";
import { colophon } from "@/constants";

/* Ft4 · Dense typographic colophon. One block of small mono prose that closes
 * the page, rather than four columns cataloguing a sitemap that doesn't exist. */
const Footer = () => (
  <footer className="colophon">
    <div className="shell">
      <p className="colophon__body">
        <b>Library Globe.</b> {colophon.what} {colophon.build}{" "}
        {colophon.covers} {colophon.type} Start from the{" "}
        <Link href="/" className="colophon__link">
          catalogue
        </Link>
        . {colophon.rights}
      </p>
    </div>
  </footer>
);

export default Footer;
