"use client";

import React from "react";
import { CustomButton, CustomInput } from "@/components";

const Form = () => {
  return (
    <form className="max-w-[1440px] p-3 md:p-5 rounded-lg" onSubmit={() => {}}>
      <h2 className="text-xl md:text-2xl text-blue-500 tracking-wide font-bold my-1 uppercase">
        Book Info
      </h2>
      <p className="text-gray-400 text-sm font-light my-2">
        Please enter your Book information.
      </p>
      <div className="flex flex-col gap-6 md:gap-7">
        <div className="flex flex-col items-center w-full gap-1 md:gap-4">
          <CustomInput
            label="Title Book"
            name="BookTitle"
            placeholder="Book Title"
            value=""
            onChange={() => {}}
          />
          <CustomInput
            label="Author"
            name="author"
            placeholder="author"
            value=""
            onChange={() => {}}
          />
          <CustomInput
            label="Description"
            name="description"
            placeholder="description"
            value=""
            onChange={() => {}}
          />
        </div>

        <div className="flex flex-col md:flex-row items-center w-full gap-1 md:gap-4">
          <CustomInput
            label="Publication Year"
            name=""
            placeholder="Publication Year"
            btnType="number"
            value=""
            onChange={() => {}}
          />
          <CustomInput
            label="Edition"
            name="edition"
            placeholder="Edition"
            btnType="text"
            value=""
            onChange={() => {}}
          />
        </div>
        <div className="flex flex-col md:flex-row items-center w-full gap-1 md:gap-4">
          <CustomInput
            label="Language"
            name=""
            placeholder="Language"
            btnType="text"
            value=""
            onChange={() => {}}
          />
          <CustomInput
            label="Subjects/Keywords"
            name="subjects/Keywords"
            placeholder="Subjects/Keywords"
            btnType="text"
            value=""
            onChange={() => {}}
          />
        </div>
        <div className="flex flex-col md:flex-row items-center w-full gap-1 md:gap-4">
          <CustomInput
            label="Formats Available"
            name=""
            placeholder="Formats Available"
            btnType="number"
            value=""
            onChange={() => {}}
          />
          <CustomInput
            label="Available Status"
            name="available Status"
            placeholder="Available Status"
            btnType="number"
            value=""
            onChange={() => {}}
          />
        </div>

        <CustomButton
          title="Edit"
          btnType="submit"
          containerStyles="bg-blue-600 border text-white ml-auto mt-4 w-fit rounded-full  dark:border-slate-600"
        />
      </div>
    </form>
  );
};

export default Form;
