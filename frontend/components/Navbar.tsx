"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import BookDetails from "./BookDetails";
import CustomButton from "./CustomButton";
import { usePathname } from "next/navigation";
import { deleteBook } from "@/utils/api";
import { BookProps } from "@/types";

const NavBar = () => {
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
              title="Delete Book"
              btnType="button"
              handleClick={handleDelete}
              containerStyles="text-white rounded-full bg-red-500 min-w-[130px] me-6"
            />
            <CustomButton
              title="Edit Book"
              btnType="button"
              handleClick={() =>
                handleOpenModal(true, pathname.split("/").pop()!)
              }
              containerStyles="text-primary-blue rounded-full bg-blue-200 min-w-[130px] me-6"
            />
          </>
        ) : (
          <CustomButton
            title="Add a New Book"
            btnType="button"
            handleClick={() => handleOpenModal(false)}
            containerStyles="text-primary-blue rounded-full bg-blue-200 min-w-[130px] me-6"
          />
        )}
      </div>
      <BookDetails
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        isEditing={isEditing}
        bookId={bookId}
        book={book}
        setBook={setBook}
      />
    </nav>
  );
};

export default NavBar;
