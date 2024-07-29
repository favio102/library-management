"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import CustomButton from "./CustomButton";
import Link from "next/link";
import { BookCardProps } from "@/types";

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  useEffect(() => {}, [book]);
  return (
    <div className="book-card group">
      <div className="relative w-full h-40 my-3 flex justify-center items-center">
        <Image
          src="/book.jpeg"
          alt="book"
          width={100}
          height={50}
          priority
          className="object-contain"
        />
      </div>
      <div className="flex flex-col items-center">
        <h4 className="book-card__content-title">{book.title}</h4>
        <p className="flex mt-1 text-[12px] font-extrabold">{book.author}</p>
        <p className="flex mt-1 text-[12px] font-extrabold">{book.year}</p>
      </div>

      <div className="relative flex flex-col w-full mt-2 group">
        <Link href={`/books/${book.id}`} className="book-card__btn-container">
          <CustomButton
            title="View Details..."
            containerStyles="w-full py-[16px] rounded-lg bg-violet-700"
            textStyles="text-white text-[14px] leading-[17px] font-bold"
          />
        </Link>
      </div>
    </div>
  );
};

export default BookCard;
