import { useState, useEffect } from "react";
import { useBooks } from "../context/BookContext";
import { updateBook, fetchBook } from "../utils/api";

const EditBookModal = ({ bookId, onClose }) => {
  const { updateBook: updateBookContext } = useBooks();
  const [book, setBook] = useState({ title: "", author: "", year: "" });

  useEffect(() => {
    const loadBook = async () => {
      const fetchedBook = await fetchBook(bookId);
      setBook(fetchedBook);
    };
    loadBook();
  }, [bookId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedBook = await updateBook(bookId, book);
    updateBookContext(updatedBook);
    onClose();
  };

  return (
    <div>
      <h2>Edit Book</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={book.title}
          onChange={(e) => setBook({ ...book, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={book.author}
          onChange={(e) => setBook({ ...book, author: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Year"
          value={book.year}
          onChange={(e) => setBook({ ...book, year: e.target.value })}
          required
        />
        <button type="submit">Update Book</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default EditBookModal;
