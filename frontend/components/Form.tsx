"use client";

import React, { useState } from "react";
import { CustomButton, CustomInput } from "@/components";
import { FormProps } from "@/types";

const Form = ({ book, setBook, onSubmit }: FormProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  return (
    <form
      className="max-w-[1440px] p-3 md:p-5 rounded-lg"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <p className="text-gray-400 text-sm font-light my-2">
        Please enter your Book information.
      </p>
      <div className="flex flex-col gap-6 md:gap-7">
        <div className="flex flex-col items-center w-full gap-1 md:gap-4">
          <CustomInput
            label="Title Book"
            name="title"
            placeholder="Book Title"
            value={book.title}
            onChange={handleChange}
            required
          />
          <CustomInput
            label="Author"
            name="author"
            placeholder="Author"
            value={book.author}
            onChange={handleChange}
            required
          />
          <CustomInput
            label="Description"
            name="description"
            placeholder="Description"
            value={book.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col md:flex-row items-center w-full gap-1 md:gap-4">
          <CustomInput
            label="Publication Year"
            name="year"
            placeholder="Publication Year"
            btnType="number"
            value={book.year}
            onChange={handleChange}
            required
          />
          <CustomInput
            label="Edition"
            name="edition"
            placeholder="Edition"
            btnType="text"
            value={book.edition}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col md:flex-row items-center w-full gap-1 md:gap-4">
          <CustomInput
            label="Language"
            name="language"
            placeholder="Language"
            btnType="text"
            value={book.language}
            onChange={handleChange}
            required
          />
          <CustomInput
            label="Subjects/Keywords"
            name="subject"
            placeholder="Subjects/Keywords"
            btnType="text"
            value={book.subject}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col md:flex-row items-center w-full gap-1 md:gap-4">
          <CustomInput
            label="Formats Available"
            name="format"
            placeholder="Formats Available"
            btnType="text"
            value={book.format}
            onChange={handleChange}
            required
          />
          <CustomInput
            label="Publisher"
            name="publisher"
            placeholder="Publisher"
            btnType="text"
            value={book.publisher}
            onChange={handleChange}
            required
          />
        </div>
        <CustomButton
          title="Submit"
          btnType="submit"
          containerStyles="bg-white hover:bg-blue-700 border text-black hover:text-white ml-auto mt-4 w-fit rounded-lg hover:font-bold dark:border-blue-600"
        />
      </div>
    </form>
  );
};

export default Form;
