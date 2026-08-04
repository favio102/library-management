import { BookProps } from "@/types";

/* Read the base URL lazily. A module-scope throw here would take the whole
 * client bundle down at import time instead of surfacing a readable error
 * state in the UI. */
const baseUrl = () => {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!url) {
    throw new Error(
      "NEXT_PUBLIC_API_BASE_URL is not set. Add it to frontend/.env and restart the dev server."
    );
  }
  return url.replace(/\/$/, "");
};

/* A hung socket — laptop woke from sleep, API is gone, Atlas is re-electing —
 * would otherwise leave the request pending forever and the UI stuck on
 * skeletons. Fail fast enough to show a retry instead. */
const TIMEOUT_MS = 12000;

const request = async <T>(path: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(`${baseUrl()}${path}`, {
    ...init,
    signal: init?.signal ?? AbortSignal.timeout(TIMEOUT_MS),
    headers: init?.body
      ? { "Content-Type": "application/json", ...init?.headers }
      : init?.headers,
  });

  if (!response.ok) {
    throw new Error(
      `${init?.method ?? "GET"} ${path} failed (${response.status})`
    );
  }

  if (response.status === 204) return undefined as T;

  const text = await response.text();
  return (text ? JSON.parse(text) : undefined) as T;
};

export const getBooks = () => request<BookProps[]>("/books");

export const getBookById = (id: string) =>
  request<BookProps>(`/books/${encodeURIComponent(id)}`);

export const createBook = (book: BookProps) =>
  request<BookProps>("/books", { method: "POST", body: JSON.stringify(book) });

export const updateBook = (id: string, book: BookProps) =>
  request<BookProps>(`/books/${encodeURIComponent(id)}`, {
    method: "PUT",
    body: JSON.stringify(book),
  });

export const deleteBook = (id: string) =>
  request<void>(`/books/${encodeURIComponent(id)}`, { method: "DELETE" });

/* Fired from `pagehide` so a delete still lands if the tab closes while its
 * Undo window is open. `keepalive` lets the request outlive the document. */
export const deleteBookOnUnload = (id: string) => {
  try {
    fetch(`${baseUrl()}/books/${encodeURIComponent(id)}`, {
      method: "DELETE",
      keepalive: true,
    });
  } catch {
    /* The document is going away; there is nobody left to tell. */
  }
};
