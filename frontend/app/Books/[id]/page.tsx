"use client";

import { getBookById } from "@/utils/api";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BookProps } from "@/types";

const BookPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [book, setBook] = useState<BookProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchBook = async () => {
        try {
          const bookData = await getBookById(id as string);
          setBook(bookData);
        } catch (error) {
          setIsError(true);
        } finally {
          setIsLoading(false);
        }
      };
      fetchBook();
    }
  }, [id]);

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
    <section className="relative max-w-[1440px] mx-auto pt-16 md:pt-4 p-1">
      <div className="flex flex-col md:flex-row gap-2 md:gap-6 w-full">
        <div className="bg-gray-100 w-full md:w-1/4 rounded-2xl flex justify-center items-center">
          <Image
            src="/book.jpeg"
            alt="book"
            width={230}
            height={30}
            className="content-center"
          />
        </div>
        <div className="flex flex-col w-full md:w-3/4 p-4">
          <h2 className="font-bold text-lg md:text-3xl">Title: {book.title}</h2>
          <h5 className="font-bold text-lg md:text-3xl">
            Author: {book.author}
          </h5>
          <p className="mt-1.5 text-gray-800 dark:text-gray-400 text-normal md:text-lg">
            Description: {book.description}
          </p>
          <div className="space-y-2 md:space-y-4 mt-4 md:mt-6 w-full">
            <div className="flex items-center justify-between w-full">
              <div className="w-1/2">
                <h4 className="md:text-lg font-semibold capitalize">
                  Publication Year
                </h4>
                <p className="font-normal">{book.year}</p>
              </div>
              <div className="w-1/2">
                <h4 className="md:text-lg font-semibold capitalize text-left">
                  Edition
                </h4>
                <p className="font-normal">{book.edition}</p>
              </div>
            </div>
            <div className="flex items-center justify-between w-full">
              <div className="w-1/2">
                <h4 className="md:text-lg font-semibold capitalize">
                  Language
                </h4>
                <p className="font-normal">{book.language}</p>
              </div>
              <div className="w-1/2">
                <h4 className="md:text-lg font-semibold capitalize">
                  Subjects/Keywords
                </h4>
                <p className="font-normal">{book.subject}</p>
              </div>
            </div>
            <div className="flex items-center justify-between w-full">
              <div className="w-1/2">
                <h4 className="md:text-lg font-semibold capitalize">
                  Formats Available
                </h4>
                <p className="font-normal">{book.format}</p>
              </div>
              <div className="w-1/2">
                <h4 className="md:text-lg font-semibold capitalize">
                  Publisher
                </h4>
                <p className="font-normal">{book.publisher}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookPage;
