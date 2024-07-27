"use client";

import Image from "next/image";
import Hero from "@/components/Hero";
import { BookCard, SearchBar } from "@/components";
import { useEffect, useState } from "react";
import { getBooks as fetchBooks } from "../utils/api";
import { BookProps } from "@/types";

export default function Home() {
  const [books, setBooks] = useState<BookProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await fetchBooks();
        setBooks(data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    loadBooks();
  }, []);

  const isDataEmpty = false;
  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Book Catalogue</h1>
          <p>Explore out books you might like</p>
        </div>

        <div className="home__filters">
          <SearchBar />
        </div>

        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>Error loading books.</p>
        ) : books.length > 0 ? (
          <section>
            <div className="home__books-wrapper">
              {books.map((book) => (
                <BookCard key={book._id} book={book} />
              ))}
            </div>
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">Library is empty.</h2>
          </div>
        )}
      </div>
    </main>
  );
}
