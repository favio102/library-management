
import React from "react";
import BookList from "@/components/BookList";
import { useBooks } from "@/context/BookContext";

const Home: React.FC = () => {
  const { books, updateBook, deleteBook } = useBooks();

  const handleEditClick = (id: string) => {
    console.log("Edit book with id:", id);
  };

  const handleDeleteClick = (id: string) => {
    deleteBook(id);
  };

  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share <br className="max-md:hidden" />{" "}
        <span className="blue_gradient text-center"> the best books.</span>
      </h1>
      <p className="desc text-center">
        This online library is for modern world to discover, create and share
        creative books.
      </p>
      <BookList
        books={books}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
      />
    </section>
  );
};

export default Home;
