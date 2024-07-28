"use client";
import React, { Fragment, useEffect } from "react";
import Image from "next/image";
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import Form from "./Form";
import {
  createBook,
  getBookById,
  updateBook as updateBookApi,
} from "@/utils/api";
// import { useBooks } from "@/context/BookContext";
import { BookProps } from "@/types";

interface BookDetailsProps {
  isOpen: boolean;
  closeModal: () => void;
  isEditing: boolean;
  bookId: string | null;
  book: BookProps;
  setBook: (book: BookProps) => void;
  onAddBook: (book: BookProps) => Promise<void>;
  onUpdateBook: (updatedBook: BookProps) => Promise<void>;
}

const BookDetails = ({
  isOpen,
  closeModal,
  isEditing,
  bookId,
  book,
  setBook,
  onAddBook,
  onUpdateBook,
}: BookDetailsProps) => {
  // const { addBook, updateBook, fetchBooks } = useBooks();

  useEffect(() => {
    if (isEditing && bookId) {
      const fetchBook = async () => {
        try {
          const bookData = await getBookById(bookId);
          console.log("Fetched Book Details:", bookData);
          setBook(bookData);
        } catch (error) {
          console.error("Failed to fetch book details", error);
        }
      };
      fetchBook();
    }
  }, [isEditing, bookId]);

  const handleSubmit = async () => {
    try {
      if (isEditing) {
        if (bookId) {
          // const updatedBook = await updateBookApi(bookId, book);
          // console.log("Updated Book:", updatedBook);
          await onUpdateBook(book);
        }
      } else {
        await onAddBook(book);
        // const newBook = await createBook(book);
        // console.log("Created Book:", newBook);
        // onAddBook(newBook);
      }
      // await fetchBooks();
      closeModal();
    } catch (error) {
      console.error("Failed to submit book", error);
    }
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-out duration-300"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="relative w-full max-w-[700px] max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5">
                  <DialogTitle
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {isEditing ? "Edit Book" : "Add New Book"}
                  </DialogTitle>
                  <div className="mt-2">
                    <Form
                      book={book}
                      setBook={setBook}
                      onSubmit={handleSubmit}
                    />
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="absolute top-2 right-2 z-10 w-fit p-2 bg-primary-blue-100 rounded-full"
                      onClick={closeModal}
                    >
                      <Image
                        src="/close.svg"
                        alt="close"
                        width={20}
                        height={20}
                        className="object-contain"
                      />
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default BookDetails;
