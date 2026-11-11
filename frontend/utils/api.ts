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

/* Thrown when a write is refused because the admin session is missing or has
 * expired, so the UI can say "sign in again" instead of a generic failure. */
export class UnauthorizedError extends Error {
  constructor() {
    super("Your admin session has ended. Sign in again to make changes.");
    this.name = "UnauthorizedError";
  }
}

/* Reads go straight to the Go API. Writes go to this app's own /api routes,
 * which check the admin cookie and add the server-held API key — the browser
 * never sees that key. */
const WRITE_BASE = "/api";

const request = async <T>(
  path: string,
  init?: RequestInit,
  base: string = baseUrl()
): Promise<T> => {
  const response = await fetch(`${base}${path}`, {
    ...init,
    signal: init?.signal ?? AbortSignal.timeout(TIMEOUT_MS),
    headers: init?.body
      ? { "Content-Type": "application/json", ...init?.headers }
      : init?.headers,
  });

  if (!response.ok) {
    if (response.status === 401) throw new UnauthorizedError();
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
  request<BookProps>(
    "/books",
    { method: "POST", body: JSON.stringify(book) },
    WRITE_BASE
  );

export const updateBook = (id: string, book: BookProps) =>
  request<BookProps>(
    `/books/${encodeURIComponent(id)}`,
    { method: "PUT", body: JSON.stringify(book) },
    WRITE_BASE
  );

export const deleteBook = (id: string) =>
  request<void>(
    `/books/${encodeURIComponent(id)}`,
    { method: "DELETE" },
    WRITE_BASE
  );

/* Fired from `pagehide` so a delete still lands if the tab closes while its
 * Undo window is open. `keepalive` lets the request outlive the document. */
export const deleteBookOnUnload = (id: string) => {
  try {
    fetch(`${WRITE_BASE}/books/${encodeURIComponent(id)}`, {
      method: "DELETE",
      keepalive: true,
    });
  } catch {
    /* The document is going away; there is nobody left to tell. */
  }
};

/* ── Admin session ─────────────────────────────────────────────────────── */

const authRequest = async (init?: RequestInit) => {
  const response = await fetch("/api/auth", {
    ...init,
    cache: "no-store",
    headers: init?.body ? { "Content-Type": "application/json" } : undefined,
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  const data = (await response.json().catch(() => ({}))) as {
    admin?: boolean;
    error?: string;
  };
  if (!response.ok) {
    throw new Error(data.error ?? `Sign-in failed (${response.status})`);
  }
  return Boolean(data.admin);
};

export const getSession = () => authRequest();

export const signIn = (password: string) =>
  authRequest({ method: "POST", body: JSON.stringify({ password }) });

export const signOut = () => authRequest({ method: "DELETE" });
