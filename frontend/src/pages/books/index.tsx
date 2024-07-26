import { useEffect, useState } from 'react';
import BookList from '@/components/BookList';
import AddBookModal from '@/components/AddBookModal';
import { fetchBooks, deleteBook } from '@/utils/api';

const BooksPage = () => {
  const [books, setBooks] = useState<any[]>([]);

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

  const handleDelete = async (id: string) => {
    try {
      await deleteBook(id);
      setBooks(books.filter((book) => book.id !== id));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleEdit = (id: string) => {
    // Implement edit functionality here if needed
    console.log('Edit book with id:', id);
  };

  useEffect(() => {
    loadBooks();
  }, []);

  return (
    <div>
      <h1>Books</h1>
      <AddBookModal />
      <BookList
        books={books}
        onEditClick={handleEdit}
        onDeleteClick={handleDelete}
      />
    </div>
  );
};

export default BooksPage;
