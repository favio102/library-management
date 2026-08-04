import { BookCoverProps } from "@/types";

/* Tier-A CSS art. Every book had the same placeholder PNG before; now each one
 * gets a typeset board whose cloth tint is derived from its own title, so a
 * screen of forty books reads as a shelf rather than a repeated tile. The six
 * tints are all capped at 0.030 chroma so the wall stays quiet. */
const BOARDS = 6;

const boardFor = (seed: string) => {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  }
  return (Math.abs(hash) % BOARDS) + 1;
};

const BookCover = ({ title, author, size = "sm" }: BookCoverProps) => (
  <div
    className={`board ${size === "lg" ? "board--lg" : ""}`.trim()}
    style={{ ["--board" as string]: `var(--board-${boardFor(title || author)})` }}
    aria-hidden="true"
  >
    <p className="board__title">{title}</p>
    <p className="board__author">{author}</p>
  </div>
);

export default BookCover;
