import React from "react";
import BookItem from "./BookItem";
import { Book } from "../context/BookContext";

interface BookListProps {
  books: Book[];
  onEditClick: (id: string) => void;
  onDeleteClick: (id: string) => void;
}

const BookList: React.FC<BookListProps> = ({ books, onEditClick, onDeleteClick }) => {
  return (
    <ul>
      {books.map((book) => (
        <BookItem 
          key={book.id} 
          book={book} 
          onEditClick={onEditClick} 
          onDeleteClick={onDeleteClick} 
        />
      ))}
    </ul>
  );
};

export default BookList;
