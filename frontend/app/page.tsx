"use client";

import Image from "next/image";
import Hero from "@/components/Hero";
import {
  BookCard,
  BookDetails,
  CustomButton,
  SearchBar,
  BookCardSkeleton,
} from "@/components";
import { useBooks } from "@/context/BookContext";
import { useEffect, useState } from "react";
import { BookProps } from "@/types";

export default function Home() {
  const { books, fetchBooks, addBook, updateBook } = useBooks();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [bookId, setBookId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleBooksCount, setVisibleBooksCount] = useState(8);
  const [book, setBook] = useState<BookProps>({
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
  });

  const handleOpenModal = (editing: boolean, id: string | null = null) => {
    setIsEditing(editing);
    setBookId(id);
    if (!editing) {
      setBook({
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
      });
    }
    setIsOpen(true);
  };

  useEffect(() => {
    const loadBooks = async () => {
      try {
        await fetchBooks();
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    loadBooks();
  }, []);

  const filteredBooks = books.filter((book) => {
    const query = searchQuery.toLocaleLowerCase();
    return (
      book.title.toLocaleLowerCase().includes(query) ||
      book.author.toLocaleLowerCase().includes(query) ||
      book.year.toLocaleLowerCase().includes(query)
    );
  });

  const handleClick = () => {
    setVisibleBooksCount((prevCount) => prevCount + 8);
  };

  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="mx-auto flex justify-between items-center sm:px-16 px-6 py-4">
          <div className="flex justify-center items-center">
            <div className="home__text-container">
              <h1 className="text-4xl font-extrabold">Book Catalogue</h1>
              <p>
                Explore out books you might like or share a book to the world.
              </p>
            </div>
          </div>
        </div>
        <div className="home__filters">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <CustomButton
            title="✚ Add a New Book"
            btnType="button"
            handleClick={() => handleOpenModal(false)}
            containerStyles="text-fuchsia-400 rounded bg-white hover:bg-blue-100 min-w-[130px] me-6 border dark:border-slate-300 hover:text-blue-800 hover:font-bold"
          />
        </div>
        <BookDetails
          isOpen={isOpen}
          closeModal={() => {
            setIsOpen(false);
          }}
          isEditing={isEditing}
          bookId={bookId}
          book={book}
          setBook={setBook}
          onAddBook={addBook}
          onUpdateBook={updateBook}
        />

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4">
            {Array(8)
              .fill(0)
              .map((_, i) => (
                <BookCardSkeleton key={i} />
              ))}
          </div>
        ) : isError ? (
          <p>Error loading books.</p>
        ) : filteredBooks.length > 0 ? (
          <section>
            <div className="home__books-wrapper">
              {filteredBooks.slice(0, visibleBooksCount).map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">No Books Found.</h2>
          </div>
        )}
      </div>
      {visibleBooksCount < filteredBooks.length && (
        <CustomButton
          title="Show More"
          btnType="button"
          containerStyles="bg-white hover:bg-blue-700 text-black hover:text-white hover:font-bold rounded-lg mt-10 border dark:border-blue-600 mx-auto"
          handleClick={handleClick}
        />
      )}
    </main>
  );
}
