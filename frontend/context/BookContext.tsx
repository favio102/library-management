"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getBooks, createBook, updateBook as updateBookApi } from "@/utils/api";
import { BookProps, BookContextProps } from "@/types";

const BookContext = createContext<BookContextProps | undefined>(undefined);

export const BookProvider = ({ children }: { children: ReactNode }) => {
  const [books, setBooks] = useState<BookProps[]>([]);

  const fetchBooks = async () => {
    const fetchedBooks = await getBooks();
    setBooks(fetchedBooks);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const addBook = async (book: BookProps) => {
    try {
      const newBook = await createBook(book);
      setBooks((prevBooks) => [...prevBooks, newBook]);
    } catch (error) {
      console.error("Failed to add book", error);
    }
  };

  const updateBook = async (updatedBook: BookProps) => {
    try {
      const bookData = await updateBookApi(updatedBook.id, updatedBook);
      setBooks((prevBooks) =>
        prevBooks.map((book) => (book.id === updatedBook.id ? bookData : book))
      );
    } catch (error) {
      console.error("Failed to update book", error);
    }
  };

  return (
    <BookContext.Provider value={{ books, fetchBooks, addBook, updateBook }}>
      {children}
    </BookContext.Provider>
  );
};

export const useBooks = () => {
  const context = useContext(BookContext);
  if (context === undefined) {
    throw new Error("useBooks must be used within a BookProvider");
  }
  return context;
};
