// src/components/BookItem.tsx
import React from "react";
import { Book } from "../context/BookContext";

interface BookItemProps {
  book: Book;
  onEditClick: (id: string) => void;
  onDeleteClick: (id: string) => void;
}

const BookItem: React.FC<BookItemProps> = ({ book, onEditClick, onDeleteClick }) => {
  return (
    <li>
      <h3>{book.title}</h3>
      <p>{book.author}</p>
      <p>{book.year}</p>
      <button onClick={() => onEditClick(book.id)}>Edit</button>
      <button onClick={() => onDeleteClick(book.id)}>Delete</button>
    </li>
  );
};

export default BookItem;
