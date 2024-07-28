"use client";

import Image from "next/image";
import Hero from "@/components/Hero";
import { BookCard, CustomButton, SearchBar } from "@/components";
import { useBooks } from "@/context/BookContext";
import { useEffect, useState } from "react";

export default function Home() {
  const { books, fetchBooks } = useBooks();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

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

  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="mx-auto flex justify-between items-center sm:px-16 px-6 py-4">
          <div className="flex justify-center items-center">
            <div className="home__text-container">
              <h1 className="text-4xl font-extrabold">Book Catalogue</h1>
              <p>Explore out books you might like or add a new book.</p>
            </div>
          </div>
            <CustomButton
              title="Add a New Book"
              btnType="button"
              handleClick={() => handleOpenModal(false)}
              containerStyles="text-primary-blue rounded-full bg-blue-200 min-w-[130px] me-6"
            />
        </div>
        {/* <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Book Catalogue</h1>
          <p>Explore out books you might like</p>
          <CustomButton
            title="Add a New Book"
            btnType="button"
            handleClick={() => handleOpenModal(false)}
            containerStyles="text-primary-blue rounded-full bg-blue-200 min-w-[130px] me-6"
          />
        </div> */}

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
                <BookCard key={book.id} book={book} />
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
