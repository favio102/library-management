import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchBook } from "@/utils/api";
import { Book } from "/../context/BookContext";

const BookDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    if (id) {
      const loadBook = async () => {
        const fetchedBook = await fetchBook(id as string);
        setBook(fetchedBook);
      };
      loadBook();
    }
  }, [id]);

  if (!book) return <p>Loading...</p>;

  return (
    <div>
      <h1>{book.title}</h1>
      <p>{book.author}</p>
      <p>{book.year}</p>
    </div>
  );
};

export default BookDetailsPage;
