"use client";

import React, { Fragment, useEffect, useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import toast from "react-hot-toast";
import { RiCloseLine } from "react-icons/ri";
import Form from "./Form";
import { getBookById } from "@/utils/api";
import { BookDetailsProps } from "@/types";

/* Silent success: adding a book puts it at the top of the catalogue and
 * editing one updates the record in place, so the result is already on screen.
 * Only failures get a toast. */
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
  const [loadingRecord, setLoadingRecord] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen || !isEditing || !bookId) return;

    let cancelled = false;
    setLoadingRecord(true);

    getBookById(bookId)
      .then((record) => {
        if (!cancelled) setBook(record);
      })
      .catch(() => {
        if (!cancelled) {
          toast.error(
            "That record could not be loaded. Close the dialog and try again."
          );
        }
      })
      .finally(() => {
        if (!cancelled) setLoadingRecord(false);
      });

    return () => {
      cancelled = true;
    };
  }, [isOpen, isEditing, bookId, setBook]);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      if (isEditing && bookId) {
        await onUpdateBook(book);
      } else {
        await onAddBook(book);
      }
      closeModal();
    } catch {
      toast.error(
        isEditing
          ? "The changes were not saved. The catalogue rejected the request — try again."
          : "The book was not added. The catalogue rejected the request — try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative"
        style={{ zIndex: "var(--z-modal)" }}
        onClose={submitting ? () => undefined : closeModal}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-long"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-short"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="dialog__backdrop" aria-hidden="true" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-md">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-long"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-short"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="dialog__panel">
                <DialogTitle className="dialog__title">
                  {isEditing ? "Edit this record" : "Add a book"}
                </DialogTitle>
                <p className="dialog__note">
                  {isEditing
                    ? "Corrections are published to the shelf straight away."
                    : "Title, author and year are needed. Everything else can follow later."}
                </p>

                <button
                  type="button"
                  className="icon-btn dialog__close"
                  onClick={closeModal}
                  disabled={submitting}
                  aria-label="Close"
                >
                  <RiCloseLine size={18} />
                </button>

                <div style={{ marginTop: "var(--space-lg)" }}>
                  {loadingRecord ? (
                    <p className="field__help" role="status">
                      Loading the record…
                    </p>
                  ) : (
                    <Form
                      book={book}
                      setBook={setBook}
                      onSubmit={handleSubmit}
                      onCancel={closeModal}
                      isEditing={isEditing}
                      submitting={submitting}
                    />
                  )}
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default BookDetails;
