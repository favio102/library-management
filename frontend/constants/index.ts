/* Ft4 Dense colophon content.
 *
 * This replaces the previous four-column link block (About / Company /
 * Socials, twelve entries, every href "/"). A catalogue has no "Business
 * Relation" page — a colophon says what the thing is and what made it, which
 * is information the reader can actually use. Nothing here is invented: the
 * stack is what the repository ships. */

export const colophon = {
  what: "Library Globe is an open catalogue. Anyone can add a book, correct a record, or take one off the shelf.",
  build:
    "Frontend in Next.js and TypeScript. Catalogue API in Go, records in MongoDB.",
  covers:
    "Covers are typeset from each book’s own title — no cover artwork is stored or fetched.",
  type: "Set in Fraunces, IBM Plex Sans and JetBrains Mono.",
  rights: "© 2026 Library Globe. All rights reserved.",
} as const;
