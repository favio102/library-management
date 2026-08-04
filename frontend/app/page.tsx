"use client";

import { useMemo, useState } from "react";
import { RiAddLine, RiBookLine, RiSearchLine } from "react-icons/ri";
import {
  BookCard,
  BookCardSkeleton,
  BookDetails,
  CustomButton,
  EmptyState,
  Hero,
  SearchBar,
} from "@/components";
import { useBooks } from "@/context/BookContext";
import { BookProps } from "@/types";

const PAGE_SIZE = 12;

const blankBook: BookProps = {
  id: "",
  title: "",
  author: "",
  description: "",
  year: "",
  edition: "",
  language: "",
  subject: "",
  format: "",
  publisher: "",
};

export default function Home() {
  const { books, status, addBook, updateBook } = useBooks();

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [draft, setDraft] = useState<BookProps>(blankBook);

  const filtered = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase();
    if (!query) return books;
    return books.filter((book) =>
      [book.title, book.author, book.year, book.subject, book.publisher]
        .filter(Boolean)
        .some((value) => value!.toLocaleLowerCase().includes(query))
    );
  }, [books, searchQuery]);

  const openAddDialog = () => {
    setDraft(blankBook);
    setIsOpen(true);
  };

  const visible = filtered.slice(0, visibleCount);
  const remaining = filtered.length - visible.length;

  return (
    <>
      <div className="shell">
        <Hero />
      </div>

      <hr className="rule-thick" aria-hidden="true" />

      <div className="shell">
        <section className="sect sect--tight" aria-labelledby="catalogue-heading">
          <div className="sect__head">
            <h2 id="catalogue-heading" className="sect__title">
              The catalogue
            </h2>
            <p className="sect__note">
              Every book on the shelf, newest first. Select one to read its
              record.
            </p>
          </div>

          <div className="toolbar">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              resultCount={filtered.length}
            />
            <CustomButton
              title="Add a book"
              tone="primary"
              icon={<RiAddLine size={16} />}
              handleClick={openAddDialog}
            />
          </div>

          {status === "loading" && (
            <div className="catalogue">
              {Array.from({ length: 8 }, (_, index) => (
                <BookCardSkeleton key={`skeleton-${index}`} />
              ))}
            </div>
          )}

          {status === "ready" && books.length === 0 && (
            <EmptyState
              mark={<RiBookLine size={18} />}
              title="The shelf is empty."
              body="Nothing has been catalogued yet. Add the first book and it will show up here straight away."
              action={
                <CustomButton
                  title="Add the first book"
                  tone="primary"
                  icon={<RiAddLine size={16} />}
                  handleClick={openAddDialog}
                />
              }
            />
          )}

          {status === "ready" && books.length > 0 && filtered.length === 0 && (
            <EmptyState
              mark={<RiSearchLine size={18} />}
              title={`Nothing matches “${searchQuery.trim()}”.`}
              body="No title, author, year, subject or publisher on the shelf contains that. Try a shorter search, or add the book yourself."
              action={
                <CustomButton
                  title="Clear the search"
                  tone="quiet"
                  handleClick={() => setSearchQuery("")}
                />
              }
            />
          )}

          {/* Also renders on `error`, where `visible` holds the sample rows. */}
          {status !== "loading" && visible.length > 0 && (
            <>
              <div className="catalogue">
                {visible.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>

              {remaining > 0 && (
                <div className="flex justify-start">
                  <CustomButton
                    title={`Show ${Math.min(remaining, PAGE_SIZE)} more · ${remaining} left`}
                    tone="type"
                    handleClick={() =>
                      setVisibleCount((count) => count + PAGE_SIZE)
                    }
                  />
                </div>
              )}
            </>
          )}
        </section>
      </div>

      <BookDetails
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        isEditing={false}
        bookId={null}
        book={draft}
        setBook={setDraft}
        onAddBook={addBook}
        onUpdateBook={updateBook}
      />
    </>
  );
}
