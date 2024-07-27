"use client";

import { useState } from "react";
import Image from "next/image";
import CustomButton from "./CustomButton";
import BookDetails from "./BookDetails";
import Link from "next/link";
import { BookCardProps } from "@/types";

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="book-card group">
      <div className="relative w-full h-40 my-3 object-contain">
        <Image
          src="/book.jpeg"
          alt="book"
          fill
          priority
          className="object-contain"
        />
      </div>
      <div className="flex flex-col items-center">
        <h2 className="book-card__content-title">{book.title}</h2>
        <p className="flex mt-1 text-[12px] font-extrabold">{book.author}</p>
        <p className="flex mt-1 text-[12px] font-extrabold">{book.year}</p>
      </div>

      <div className="relative flex flex-col w-full mt-2 group">
        <Link href={`/books/${book._id}`} className="book-card__btn-container">
          <CustomButton
            title="View Details..."
            containerStyles="w-full py-[16px] rounded-full bg-primary-blue"
            textStyles="text-white text-[14px] leading-[17px] font-bold"
            rightIcon="/right-arrow.svg"
            handleClick={() => setIsOpen(true)}
          />
        </Link>
      </div>

      {/* <BookDetails
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
      /> */}
    </div>
  );
};

export default BookCard;
