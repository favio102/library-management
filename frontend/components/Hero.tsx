"use client";

import { useMemo } from "react";
import { useBooks } from "@/context/BookContext";

/* Marquee Hero: typography is the visual, so the decorative hero.png is gone.
 * Every figure below is computed from the catalogue itself — nothing here is
 * a marketing number. When the shelf is empty the strip doesn't render. */
const Hero = () => {
  const { books, status } = useBooks();

  const stats = useMemo(() => {
    if (books.length === 0) return null;

    const authors = new Set(
      books.map((book) => book.author.trim().toLowerCase()).filter(Boolean)
    );

    /* Legacy records predate the year validation in the add form, so the
       catalogue still holds values like "2". Excluding them keeps the span
       honest instead of reporting "2–2115". */
    const years = books
      .map((book) => Number(book.year))
      .filter((year) => Number.isFinite(year) && year >= 1000);

    return {
      books: books.length,
      authors: authors.size,
      span:
        years.length > 0
          ? `${Math.min(...years)}–${Math.max(...years)}`
          : null,
    };
  }, [books]);

  return (
    <section className="hero">
      <div>
        <h1 className="hero__display">An open shelf, kept by everyone.</h1>
      </div>

      <div>
        <p className="hero__lede">
          Search what is already here, then add what is missing. Every record
          stays editable by whoever spots the mistake.
        </p>

        {status === "ready" && stats && (
          <dl className="hero__meta">
            <div className="hero__stat">
              <dt className="label">Catalogued</dt>
              <dd>{stats.books}</dd>
            </div>
            <div className="hero__stat">
              <dt className="label">Authors</dt>
              <dd>{stats.authors}</dd>
            </div>
            {stats.span && (
              <div className="hero__stat">
                <dt className="label">Years covered</dt>
                <dd>{stats.span}</dd>
              </div>
            )}
          </dl>
        )}
      </div>
    </section>
  );
};

export default Hero;
