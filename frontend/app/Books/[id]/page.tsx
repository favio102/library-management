"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  RiArrowLeftLine,
  RiBookLine,
  RiCloudOffLine,
  RiDeleteBinLine,
  RiPencilLine,
} from "react-icons/ri";
import {
  BookCover,
  BookDetails,
  ConfirmDialog,
  CustomButton,
  EmptyState,
} from "@/components";
import { useBooks } from "@/context/BookContext";
import { getBookById } from "@/utils/api";
import { SAMPLE_PREFIX } from "@/constants";
import { BookProps } from "@/types";

const SPEC_FIELDS: { key: keyof BookProps; label: string }[] = [
  { key: "year", label: "Published" },
  { key: "edition", label: "Edition" },
  { key: "language", label: "Language" },
  { key: "subject", label: "Subjects" },
  { key: "format", label: "Format" },
  { key: "publisher", label: "Publisher" },
];

const BookPage = () => {
  const params = useParams();
  const router = useRouter();
  const { books, status, updateBook, addBook, removeBook } = useBooks();

  const id = typeof params.id === "string" ? params.id : params.id?.[0];

  const contextBook = useMemo(
    () => books.find((entry) => entry.id === id),
    [books, id]
  );

  /* The previous build read `books.find()` on first paint — before the
   * catalogue had loaded — and latched `isError` permanently, so a hard
   * refresh on this URL always showed "Error loading book details". The
   * lookup now waits for the context, then falls back to the API directly. */
  const [fetched, setFetched] = useState<BookProps | null>(null);
  const [lookup, setLookup] = useState<"idle" | "loading" | "missing">("idle");
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (!id || contextBook || status !== "ready" || leaving) return;

    let cancelled = false;
    setLookup("loading");

    getBookById(id)
      .then((record) => {
        if (cancelled) return;
        setFetched(record);
        setLookup("idle");
      })
      .catch(() => {
        if (!cancelled) setLookup("missing");
      });

    return () => {
      cancelled = true;
    };
  }, [id, contextBook, status, leaving]);

  const book = contextBook ?? fetched;
  const isSample = Boolean(book?.id.startsWith(SAMPLE_PREFIX));

  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<BookProps | null>(null);

  const [confirmingRemove, setConfirmingRemove] = useState(false);

  const handleDelete = () => {
    if (!book) return;
    setConfirmingRemove(false);
    setLeaving(true);
    removeBook(book.id);
    router.push("/");
  };

  const backLink = (
    <Link href="/" className="backlink">
      <RiArrowLeftLine size={15} aria-hidden="true" />
      Back to the catalogue
    </Link>
  );

  /* Guarded on `!book` so a sample row still opens while the API is down —
     without it, every offline record dead-ends here. */
  if (status === "error" && !book) {
    return (
      <div className="shell">
        <EmptyState
          mark={<RiCloudOffLine size={18} />}
          title="The catalogue could not be reached."
          body="This record could not be loaded because the books API did not respond. Check that it is running, then try again."
          action={backLink}
        />
      </div>
    );
  }

  if (lookup === "missing") {
    return (
      <div className="shell">
        <EmptyState
          mark={<RiBookLine size={18} />}
          title="No book has that reference."
          body="It may have been removed from the shelf, or the address may be mistyped."
          action={backLink}
        />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="shell">
        <div className="record" aria-busy="true">
          <div className="record__aside">
            <div className="skel__board" />
          </div>
          <div className="skel" style={{ gap: "var(--space-md)" }}>
            <div className="skel__line" style={{ width: "70%", height: "2rem" }} />
            <div className="skel__line" style={{ width: "40%" }} />
            <div className="skel__line" style={{ width: "92%" }} />
            <div className="skel__line" style={{ width: "84%" }} />
          </div>
        </div>
        <p className="visually-hidden" role="status">
          Loading the record…
        </p>
      </div>
    );
  }

  return (
    <div className="shell">
      <div style={{ paddingTop: "var(--space-lg)" }}>{backLink}</div>

      <article className="record">
        <div className="record__aside">
          <BookCover title={book.title} author={book.author} size="lg" />
        </div>

        <div>
          <h1 className="record__title">{book.title}</h1>
          <p className="record__byline">{book.author}</p>

          {book.description && (
            <p className="prose record__lede">{book.description}</p>
          )}

          <dl className="spec">
            {SPEC_FIELDS.map(({ key, label }) => {
              const value = book[key];
              return (
                <div className="spec__row" key={key}>
                  <dt className="spec__key">{label}</dt>
                  <dd
                    className={`spec__val ${
                      value ? "" : "spec__val--empty"
                    }`.trim()}
                  >
                    {value || "Not recorded"}
                  </dd>
                </div>
              );
            })}
          </dl>

          {/* Sample rows exist only because the API is down — there is nothing
              on the server to edit or delete, so the actions are withheld. */}
          {isSample ? (
            <div className="notice" role="alert">
              <p className="notice__head">
                <RiCloudOffLine size={17} aria-hidden="true" />
                Sample record
              </p>
              <p className="notice__body">
                This is placeholder data shown because the catalogue API is not
                responding. It does not exist in the database and cannot be
                edited or removed.
              </p>
            </div>
          ) : (
            <div className="record__actions">
              <CustomButton
                title="Edit record"
                tone="quiet"
                icon={<RiPencilLine size={15} />}
                handleClick={() => {
                  setDraft(book);
                  setIsEditing(true);
                }}
              />
              <CustomButton
                title="Remove from shelf"
                tone="danger"
                icon={<RiDeleteBinLine size={15} />}
                handleClick={() => setConfirmingRemove(true)}
              />
            </div>
          )}
        </div>
      </article>

      <ConfirmDialog
        isOpen={confirmingRemove}
        title="Remove this book?"
        body={
          <>
            <b>“{book.title}”</b> by {book.author} will be taken off the shelf
            and its record deleted from the catalogue.
            <span className="confirm__note">
              You will get a few seconds to undo this before it is final.
            </span>
          </>
        }
        confirmLabel="Remove book"
        cancelLabel="Keep it"
        tone="danger"
        onConfirm={handleDelete}
        onCancel={() => setConfirmingRemove(false)}
      />

      {draft && (
        <BookDetails
          isOpen={isEditing}
          closeModal={() => setIsEditing(false)}
          isEditing
          bookId={book.id}
          book={draft}
          setBook={setDraft}
          onAddBook={addBook}
          onUpdateBook={updateBook}
        />
      )}
    </div>
  );
};

export default BookPage;
