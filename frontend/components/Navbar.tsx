"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import { useBooks } from "@/context/BookContext";
import { useAuth } from "@/context/AuthContext";
import ThemeToggle from "./ThemeToggle";

/* N6 · Newspaper masthead. The issue line carries the one number a catalogue
 * actually has — how many books are on the shelf.
 *
 * The old navbar owned a second copy of the add/edit modal and mounted the
 * book page's Edit and Delete buttons globally. Both moved: the modal is owned
 * by whichever page opens it, and the record actions live on the record. */
const Navbar = () => {
  const pathname = usePathname();
  const { books, status, waking } = useBooks();
  const { isAdmin, checked, logout } = useAuth();

  const handleSignOut = () =>
    logout().catch(() => toast.error("Sign-out failed. Try again."));
  const isRecord = /^\/books\/[^/]+$/.test(pathname);

  /* Never report a count while the shelf is showing sample rows — the figure
     would read as real holdings. */
  const count =
    status === "ready"
      ? `${books.length} ${books.length === 1 ? "book" : "books"} on the shelf`
      : status === "error"
        ? waking
          ? "Waking up the server…"
          : "Catalogue unavailable"
        : "Loading…";

  return (
    <header className={`mast ${isRecord ? "mast--compact" : ""}`.trim()}>
      <div className="shell">
        <p className="mast__line">
          <span className="mast__edition">{count}</span>
          <span className="mast__tools">
            {/* Wait for the session check so the link doesn't flash. */}
            {checked &&
              (isAdmin ? (
                <button
                  type="button"
                  className="mast__link mast__link--btn"
                  onClick={handleSignOut}
                >
                  Sign out
                </button>
              ) : (
                <Link
                  href="/login"
                  className="mast__link"
                  aria-current={pathname === "/login" ? "page" : undefined}
                >
                  Admin
                </Link>
              ))}
            <ThemeToggle />
          </span>
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
