"use client";

import { useState } from "react";
import Image from "next/image";
import CustomButton from "./CustomButton";

const BookCard = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="book-card group">
      <div className="relative w-full h-40 my-3 object-contain">
        <Image
          src="/book.jpeg"
          alt="car model"
          fill
          priority
          className="object-contain"
        />
      </div>
      <div className="flex flex-col items-center">
        <h2 className="book-card__content-title">Title Book</h2>
        <p className="flex mt-1 text-[12px] font-extrabold">Author</p>
        <p className="flex mt-1 text-[12px] font-extrabold">Year</p>
      </div>

      <div className="relative flex w-full mt-2">
        <div className="book-card__btn-container">
          <CustomButton
            title="View More...."
            containerStyles="w-full py-[16px] rounded-full bg-primary-blue"
            textStyles="text-white text-[14px] leading-[17px] font-bold"
            rightIcon="/right-arrow.svg"
            handleClick={() => setIsOpen(true)}
          />
        </div>
      </div>

      {/* <CarDetails
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        car={car}
      /> */}
    </div>
  );
};

export default BookCard;
