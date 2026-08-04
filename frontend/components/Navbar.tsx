"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useBooks } from "@/context/BookContext";
import ThemeToggle from "./ThemeToggle";

/* N6 · Newspaper masthead. The issue line carries the one number a catalogue
 * actually has — how many books are on the shelf.
 *
 * The old navbar owned a second copy of the add/edit modal and mounted the
 * book page's Edit and Delete buttons globally. Both moved: the modal is owned
 * by whichever page opens it, and the record actions live on the record. */
const Navbar = () => {
  const pathname = usePathname();
  const { books, status } = useBooks();
  const isRecord = /^\/books\/[^/]+$/.test(pathname);

  /* Never report a count while the shelf is showing sample rows — the figure
     would read as real holdings. */
  const count =
    status === "ready"
      ? `${books.length} ${books.length === 1 ? "book" : "books"} on the shelf`
      : status === "error"
        ? "Catalogue unavailable"
        : "Loading…";

  return (
    <header className={`mast ${isRecord ? "mast--compact" : ""}`.trim()}>
      <div className="shell">
        <p className="mast__line">
          <span className="mast__edition">{count}</span>
          <ThemeToggle />
        </p>

        <Link href="/" className="mast__name">
          Library&nbsp;Globe
        </Link>

        <hr className="rule-double" aria-hidden="true" />
      </div>
    </header>
  );
};

export default Navbar;
