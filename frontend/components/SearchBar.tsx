"use client";

import React, { useEffect, useId, useState } from "react";
import { RiCloseLine, RiSearchLine } from "react-icons/ri";
import { SearchBarProps } from "@/types";

/* Search-as-you-type: filtering is instant, but the result count is announced
 * on a 400 ms settle so a screen reader isn't read a new number per keystroke.
 * The submit button is gone — there was nothing to submit to. */
const SearchBar = ({
  searchQuery,
  setSearchQuery,
  resultCount,
}: SearchBarProps) => {
  const id = useId();
  const [announced, setAnnounced] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnnounced(
        searchQuery
          ? `${resultCount} ${resultCount === 1 ? "book" : "books"} match “${searchQuery}”`
          : ""
      );
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery, resultCount]);

  return (
    <div className="search">
      <label className="visually-hidden" htmlFor={id}>
        Search the catalogue
      </label>
      <span className="search__icon" aria-hidden="true">
        <RiSearchLine size={17} />
      </span>
      <input
        id={id}
        type="search"
        className="search__input"
        placeholder="Title, author, year or subject"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
      />
      {searchQuery && (
        <button
          type="button"
          className="search__clear"
          onClick={() => setSearchQuery("")}
          aria-label="Clear search"
        >
          <RiCloseLine size={16} />
        </button>
      )}
      <span className="visually-hidden" role="status" aria-live="polite">
        {announced}
      </span>
    </div>
  );
};

export default SearchBar;
