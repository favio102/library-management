"use client";
import React from "react";
import Image from "next/image";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form
      className="w-full flex flex-col md:flex-row items-center justify-center gap-2 max-w-3xl bg-white rounded border dark:border-slate-300 px-3"
      onSubmit={handleSearchSubmit}
    >
      <div className="flex items-center w-full py-3 relative md:border-r dark:border-slate-300 ">
        <input
          type="text"
          placeholder="Search by title, author, year of publication, subject ..."
          className="text-gray-400 flex-1 outline-none pl-4 text-ms bg-transparent"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <button type="submit">
        <Image
          src={"/search.svg"}
          alt="search"
          width={30}
          height={30}
          className="object-contain hidden md:flex"
        />
      </button>
    </form>
  );
};

export default SearchBar;
