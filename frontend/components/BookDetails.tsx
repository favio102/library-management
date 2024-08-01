"use client";
import React, { Fragment, useEffect } from "react";
import Image from "next/image";
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
} from "@headlessui/react";
import Form from "./Form";
import { getBookById } from "@/utils/api";
import { BookDetailsProps } from "@/types";

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
  }, [isEditing, bookId, setBook]);

  const handleSubmit = async () => {
    try {
      if (isEditing) {
        if (bookId) {
          await onUpdateBook(book);
        }
      } else {
        await onAddBook(book);
      }
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
                  <div>
                    {isEditing ? (
                      <h2 className="text-xl md:text-2xl text-blue-500 tracking-wide font-bold my-1 uppercase">
                        Edit Book
                      </h2>
                    ) : (
                      <h2 className="text-xl md:text-2xl text-blue-500 tracking-wide font-bold my-1 uppercase">
                        Add New Book
                      </h2>
                    )}
                    <Form
                      book={book}
                      setBook={setBook}
                      onSubmit={handleSubmit}
                    />
                  </div>
                  <div className="mt-0">
                    <button
                      type="button"
                      className="absolute top-5 right-2 z-10 w-fit p-2 bg-primary-blue-100 rounded-full"
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
