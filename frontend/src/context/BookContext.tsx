// src/context/BookContext.tsx
"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { fetchBooks } from "../utils/api"; // Adjust the path if necessary

interface Book {
  id: string;
  title: string;
  author: string;
  year: string;
}

interface BookContextProps {
  books: Book[];
  addBook: (book: Book) => void;
  updateBook: (book: Book) => void;
  deleteBook: (id: string) => void;
}

const BookContext = createContext<BookContextProps | undefined>(undefined);

export const BookProvider = ({ children }: { children: ReactNode }) => {
  const [books, setBooks] = useState<Book[]>([]);

  const loadBooks = async () => {
    try {
      const fetchedBooks = await fetchBooks();
      if (Array.isArray(fetchedBooks)) {
        setBooks(fetchedBooks);
      } else {
        console.error('Fetched data is not an array:', fetchedBooks);
      }
    } catch (error) {
      console.error('Error loading books:', error);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const addBook = (book: Book) => {
    setBooks([...books, book]);
  };

  const updateBook = (updatedBook: Book) => {
    setBooks(
      books.map((book) => (book.id === updatedBook.id ? updatedBook : book))
    );
  };

  const deleteBook = (id: string) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  return (
    <BookContext.Provider value={{ books, addBook, updateBook, deleteBook }}>
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
