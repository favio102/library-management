"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";
import toast from "react-hot-toast";
import {
  getBooks,
  createBook,
  updateBook as updateBookApi,
  deleteBook as deleteBookApi,
  deleteBookOnUnload,
  UnauthorizedError,
} from "@/utils/api";
import { useAuth } from "@/context/AuthContext";
import { fallbackBooks } from "@/constants";
import { BookProps, BookContextProps, LoadStatus } from "@/types";

const BookContext = createContext<BookContextProps | undefined>(undefined);

/* How long a removed book can be brought back before the DELETE is sent.
 * The request is genuinely deferred — Undo means the book was never deleted. */
const UNDO_WINDOW = 6000;

export const BookProvider = ({ children }: { children: ReactNode }) => {
  const { markSignedOut } = useAuth();

  const [books, setBooks] = useState<BookProps[]>([]);
  const [status, setStatus] = useState<LoadStatus>("loading");
  const [error, setError] = useState<string | null>(null);

  /* A mirror of `books` so delete can read the current list without making
   * every consumer re-subscribe. */
  const booksRef = useRef<BookProps[]>([]);
  useEffect(() => {
    booksRef.current = books;
  }, [books]);

  const pendingDeletes = useRef(
    new Map<string, ReturnType<typeof setTimeout>>()
  );

  const lastFetchedAt = useRef(0);

  /* `background: true` re-syncs without tearing the shelf down to skeletons —
   * used by the focus/online listeners below. A failed background refresh
   * keeps whatever is already on screen rather than replacing good data with
   * an error page. */
  const fetchBooks = useCallback(
    async ({ background = false }: { background?: boolean } = {}) => {
      if (!background) {
        setStatus("loading");
        setError(null);
      }
      try {
        const fetched = await getBooks();
        setBooks(Array.isArray(fetched) ? fetched : []);
        setStatus("ready");
        setError(null);
        lastFetchedAt.current = Date.now();
      } catch (cause) {
        const message =
          cause instanceof Error
            ? cause.message
            : "The catalogue could not be reached.";
        if (background) {
          /* Silent — the user still has the last good copy in front of them. */
          console.warn("[catalogue] background refresh failed:", message);
          return;
        }
        /* Fall back to sample rows so a dead API renders something
         * diagnosable instead of skeletons that never resolve. The UI flags
         * them and blocks writes — see SAMPLE_PREFIX. */
        setBooks(fallbackBooks);
        setError(message);
        setStatus("error");
      }
    },
    []
  );

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  /* Re-sync when the user comes back to the tab or the network returns.
   * Without this the catalogue is only ever as fresh as the moment the page
   * was opened — leave it open overnight and it still shows yesterday's shelf,
   * or stays stuck on an error from a backend that has since come back up. */
  useEffect(() => {
    const STALE_AFTER = 30_000;

    const resync = (force = false) => {
      if (document.visibilityState !== "visible") return;
      if (!force && Date.now() - lastFetchedAt.current < STALE_AFTER) return;
      fetchBooks({ background: lastFetchedAt.current > 0 });
    };

    const onVisibility = () => resync();
    const onOnline = () => resync(true);

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("focus", onVisibility);
    window.addEventListener("online", onOnline);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("focus", onVisibility);
      window.removeEventListener("online", onOnline);
    };
  }, [fetchBooks]);

  /* If the tab closes mid-Undo, send the held deletes rather than dropping
   * them. `pagehide` fires on navigation and on bfcache entry. */
  useEffect(() => {
    const pending = pendingDeletes.current;
    const flush = () => {
      pending.forEach((timer, id) => {
        clearTimeout(timer);
        deleteBookOnUnload(id);
      });
      pending.clear();
    };
    window.addEventListener("pagehide", flush);
    return () => window.removeEventListener("pagehide", flush);
  }, []);

  /* A 401 means the admin cookie expired mid-session: drop the edit controls
   * and let the caller show the error. */
  const guard = useCallback(
    async <T,>(write: () => Promise<T>) => {
      try {
        return await write();
      } catch (cause) {
        if (cause instanceof UnauthorizedError) markSignedOut();
        throw cause;
      }
    },
    [markSignedOut]
  );

  const addBook = useCallback(
    async (book: BookProps) => {
      const created = await guard(() => createBook(book));
      setBooks((prev) => [created ?? book, ...prev]);
    },
    [guard]
  );

  const updateBook = useCallback(
    async (updated: BookProps) => {
      const saved = await guard(() => updateBookApi(updated.id, updated));
      setBooks((prev) =>
        prev.map((book) => (book.id === updated.id ? saved ?? updated : book))
      );
    },
    [guard]
  );

  const removeBook = useCallback((id: string) => {
    const index = booksRef.current.findIndex((book) => book.id === id);
    if (index === -1) return;
    const removed = booksRef.current[index];

    /* Optimistic: the row leaves immediately. */
    setBooks((prev) => prev.filter((book) => book.id !== id));

    const restore = () =>
      setBooks((prev) => {
        if (prev.some((book) => book.id === id)) return prev;
        const next = [...prev];
        next.splice(Math.min(index, next.length), 0, removed);
        return next;
      });

    const timer = setTimeout(async () => {
      pendingDeletes.current.delete(id);
      try {
        await guard(() => deleteBookApi(id));
      } catch (cause) {
        restore();
        toast.error(
          cause instanceof UnauthorizedError
            ? cause.message
            : `“${removed.title}” could not be removed. The catalogue rejected the request — try again.`
        );
      }
    }, UNDO_WINDOW);

    pendingDeletes.current.set(id, timer);

    toast(
      (t) => (
        <span className="toast__row">
          <span className="toast__text">
            Removed <b>“{removed.title}”</b>
          </span>
          <button
            type="button"
            className="toast__undo"
            onClick={() => {
              const held = pendingDeletes.current.get(id);
              if (held) clearTimeout(held);
              pendingDeletes.current.delete(id);
              restore();
              toast.dismiss(t.id);
            }}
          >
            Undo
          </button>
        </span>
      ),
      { duration: UNDO_WINDOW }
    );
  }, [guard]);

  return (
    <BookContext.Provider
      value={{
        books,
        status,
        error,
        fetchBooks,
        addBook,
        updateBook,
        removeBook,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export const useBooks = () => {
  const context = useContext(BookContext);
  if (context === undefined) {
    throw new Error("useBooks must be used within a BookProvider");
  }
  return context;
};
