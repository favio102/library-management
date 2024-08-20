"use client";

import { useBooks } from "@/context/BookContext";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BookProps } from "@/types";

const BookPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { books, updateBook } = useBooks();
  const [book, setBook] = useState<BookProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchBook = () => {
        const bookData = books.find((book) => book.id === id);
        if (bookData) {
          setBook(bookData);
        } else {
          setIsError(true);
        }
        setIsLoading(false);
      };
      fetchBook();
    }
  }, [id, books]);

  // useEffect(() => {
  //   if (typeof id === "string") {
  //     const fetchBook = async () => {
  //       try {
  //         const bookData = await getBookById(id);
  //         console.log(bookData)
  //         setBook(bookData);
  //       } catch (error) {
  //         setIsError(true);
  //         console.error("Failed to fetch book", error);
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     };
  //     fetchBook();
  //   } else {
  //     setIsError(true);
  //     setIsLoading(false);
  //   }
  // }, [id]);

  // const handleUpdateBook = async (updatedBook: BookProps) => {
  //   try {
  //     await updateBook(updatedBook);
  //     router.push(`/books/${updatedBook.id}`);
  //   } catch (error) {
  //     console.error("Failed to update book", error);
  //   }
  // };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading book details.</p>;
  }

  if (!book) {
    return <p>Book not found.</p>;
  }

  return (
    <section className="relative max-w-[1440px] mx-6 pt-16 md:pt-4 p-1">
      <div className="flex flex-col md:flex-row gap-2 md:gap-6 w-full">
        <div className="bg-gray-100 w-full md:w-1/4 rounded-2xl flex justify-center items-center">
          <Image
            src="/book-cover.png"
            alt="book"
            width={160}
            height={30}
            className="content-center"
          />
        </div>
        <div className="flex flex-col w-full md:w-3/4 p-4">
          <h4 className="md:text-lg capitalize text-gray-800 dark:text-gray-400">
            Title
          </h4>
          <h2 className="font-bold text-lg md:text-3xl">{book.title}</h2>
          <h4 className="md:text-lg capitalize text-gray-800 dark:text-gray-400">
            Author
          </h4>
          <h5 className="font-semibold text-lg md:text-3xl">{book.author}</h5>
          <h4 className="md:text-lg text-gray-800 dark:text-gray-400 capitalize">
            Description
          </h4>
          <p className="mt-1.5 font-semibold md:text-lg">{book.description}</p>
          <div className="space-y-2 md:space-y-4 mt-4 md:mt-6 w-full">
            <div className="flex items-center justify-between w-full">
              <div className="w-1/2">
                <h4 className="md:text-lg text-gray-800 dark:text-gray-400 capitalize">
                  Publication Year
                </h4>
                <p className="font-semibold">{book.year}</p>
              </div>
              <div className="w-1/2">
                <h4 className="md:text-lg text-gray-800 dark:text-gray-400 capitalize text-left">
                  Edition
                </h4>
                <p className="font-semibold">{book.edition}</p>
              </div>
            </div>
            <div className="flex items-center justify-between w-full">
              <div className="w-1/2">
                <h4 className="md:text-lg text-gray-800 dark:text-gray-400 capitalize">
                  Language
                </h4>
                <p className="font-semibold">{book.language}</p>
              </div>
              <div className="w-1/2">
                <h4 className="md:text-lg text-gray-800 dark:text-gray-400 capitalize">
                  Subjects/Keywords
                </h4>
                <p className="font-semibold">{book.subject}</p>
              </div>
            </div>
            <div className="flex items-center justify-between w-full">
              <div className="w-1/2">
                <h4 className="md:text-lg text-gray-800 dark:text-gray-400 capitalize">
                  Formats Available
                </h4>
                <p className="font-semibold">{book.format}</p>
              </div>
              <div className="w-1/2">
                <h4 className="md:text-lg text-gray-800 dark:text-gray-400 capitalize">
                  Publisher
                </h4>
                <p className="font-semibold">{book.publisher}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookPage;
