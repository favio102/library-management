import Link from "next/link";
import BookCover from "./BookCover";
import { BookCardProps } from "@/types";

/* The whole card is the link. The old build hid a "View Details" button behind
 * `group-hover`, which left touch and keyboard users with no way into a book. */
const BookCard = ({ book }: BookCardProps) => (
  <Link href={`/books/${book.id}`} className="card">
    <BookCover title={book.title} author={book.author} />
    <div>
      <h3 className="card__title">{book.title}</h3>
      <p className="card__byline">{book.author}</p>
    </div>
    <p className="card__foot">
      <span className="card__year">{book.year || "Year unknown"}</span>
      {book.format && <span className="card__format">{book.format}</span>}
    </p>
  </Link>
);

export default BookCard;
