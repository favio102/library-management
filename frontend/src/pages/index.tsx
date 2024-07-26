import Link from "next/link";
import { useState } from "react";
import AddBookModal from "../components/AddBookModal";
import BookList from "../components/BookList";
import { useBooks } from "../context/BookContext";

const HomePage = () => {
  const { books } = useBooks();
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <h1>Library Management System</h1>
      <button onClick={() => setShowModal(true)}>Add New Book</button>
      {showModal && <AddBookModal />}
      <BookList books={books} />
    </div>
  );
};

export default HomePage;
