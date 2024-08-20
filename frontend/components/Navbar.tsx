"use client";

import { useBooks } from "@/context/BookContext";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import BookDetails from "./BookDetails";
import CustomButton from "./CustomButton";
import { BookProps } from "@/types";
import { deleteBook } from "@/utils/api";

const NavBar = () => {
  const { fetchBooks, addBook, updateBook } = useBooks();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [bookId, setBookId] = useState<string | null>(null);
  const [book, setBook] = useState<BookProps>({
    id: "",
    title: "",
    author: "",
    description: "",
    year: "",
    edition: "",
    language: "",
    subject: "",
    format: "",
    publisher: "",
  });

  const isBookPage = /^\/books\/[^/]+$/.test(pathname);

  const handleOpenModal = (editing: boolean, id: string | null = null) => {
    setIsEditing(editing);
    setBookId(id);
    if (!editing) {
      setBook({
        id: "",
        title: "",
        author: "",
        description: "",
        year: "",
        edition: "",
        language: "",
        subject: "",
        format: "",
        publisher: "",
      });
    }
    setIsOpen(true);
  };

  const handleDelete = async () => {
    const id = pathname.split("/").pop();
    if (id) {
      const confirmed = window.confirm("Are you sure you want to delete?");
      if (confirmed) {
        try {
          await deleteBook(id);
          await fetchBooks();
          router.push("/");
        } catch (error) {
          console.error("Failed to delete book", error);
        }
      }
    }
  };

  return (
    <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4 bg-transparent">
      <Link href="/" className="flex justify-center items-center">
        <span className="text-xl md:text-3xl text-indigo-700 font-bold dark:text-dark">
          Library Globe
        </span>
      </Link>

      <div className="hidden md:flex items-center gap-3">
        {isBookPage ? (
          <>
            <CustomButton
              title='⫷ ❌ ⫸ Delete Book'
              btnType="button"
              handleClick={handleDelete}
              containerStyles="text-black rounded-lg bg-white hover:bg-red-200 hover:text-red-800 hover:font-bold min-w-[130px] me-6 border dark:border-red-200"
            />
            <CustomButton
              title="⫷ ✍🏻 ⫸ Edit Book"
              btnType="button"
              handleClick={() =>
                handleOpenModal(true, pathname.split("/").pop()!)
              }
              containerStyles="text-black bg-white hover:bg-blue-300 border dark:border-blue-300 rounded min-w-[130px] hover:text-blue-900 hover:font-bold me-6"
            />
          </>
        ) : (
          <></>
        )}
      </div>
      <BookDetails
        isOpen={isOpen}
        closeModal={() => {
          setIsOpen(false);
          fetchBooks();
        }}
        isEditing={isEditing}
        bookId={bookId}
        book={book}
        setBook={setBook}
        onAddBook={addBook}
        onUpdateBook={updateBook}
      />
    </nav>
  );
};

export default NavBar;
