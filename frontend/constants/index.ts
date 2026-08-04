/* Ft4 Dense colophon content.
 *
 * This replaces the previous four-column link block (About / Company /
 * Socials, twelve entries, every href "/"). A catalogue has no "Business
 * Relation" page — a colophon says what the thing is and what made it, which
 * is information the reader can actually use. Nothing here is invented: the
 * stack is what the repository ships. */

import { BookProps } from "@/types";

/* Shown only when the catalogue API cannot be reached, so a dead backend
 * renders a diagnosable page instead of skeletons that never resolve.
 *
 * Every id carries the SAMPLE_PREFIX — the UI keys off it to flag these cards
 * and to hide edit/remove, so placeholder rows can never be mistaken for real
 * records or written back to the database. The two entries are deliberately
 * different shapes: one short title, one long title with a long format list,
 * so the grid's wrapping and truncation stay testable while the API is down. */
export const SAMPLE_PREFIX = "sample-offline-";

export const fallbackBooks: BookProps[] = [
  {
    id: `${SAMPLE_PREFIX}1`,
    title: "The Cartographer’s Apprentice",
    author: "Elena Ruiz",
    year: "1994",
    description:
      "Placeholder record. The catalogue API did not respond, so this sample is being shown in its place.",
    edition: "First",
    language: "English",
    subject: "Sample data",
    format: "Paperback",
    publisher: "Hollow Press",
  },
  {
    id: `${SAMPLE_PREFIX}2`,
    title: "A Field Guide to the Coastal Lighthouses of the Northern Atlantic",
    author: "Marta Lindqvist",
    year: "2011",
    description:
      "Placeholder record. The catalogue API did not respond, so this sample is being shown in its place.",
    edition: "Second, revised",
    language: "English",
    subject: "Sample data",
    format: "Hardcover, Digital, Audiobook",
    publisher: "Northwind Editions",
  },
];

export const colophon = {
  what: "Library Globe is an open catalogue. Anyone can add a book, correct a record, or take one off the shelf.",
  build:
    "Frontend in Next.js and TypeScript. Catalogue API in Go, records in MongoDB.",
  covers:
    "Covers are typeset from each book’s own title — no cover artwork is stored or fetched.",
  type: "Set in Fraunces, IBM Plex Sans and JetBrains Mono.",
  rights: "© 2026 Library Globe. All rights reserved.",
} as const;
