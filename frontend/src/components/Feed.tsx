import React from "react";
import BookItem from "./BookItem";

const Feed = () => {
  const BookList = () => {
    return (
      <div className="mt-4 card_layout">
        <BookItem />
      </div>
    );
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value=""
          // onChange={}
          required
          className="search_input peer"
        />
      </form>
      <BookList />
    </section>
  );
};

export default Feed;
