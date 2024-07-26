"use client";
import React from "react";
import SearchButton from "./SearchButton";

const SearchBar = () => {
  const handleSearch = () => {};
  return (
    <form className="searchbar" onSubmit={handleSearch}>
      <div className="searchbar__item">
        <input type="text" placeholder="Look for books" />
        <SearchButton otherClasses="sm:hidden" />
      </div>

    </form>
  );
};

export default SearchBar;
