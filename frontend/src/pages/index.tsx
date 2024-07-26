// src/pages/index.tsx (Home Page)
import { Feed } from "@components";
import React from "react";
// import BookList from "@/components/BookList";
// import { useBooks } from "@/context/BookContext";
// import { BookItem, Feed } from "@components";

const Home: React.FC = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share <br className="max-md:hidden" />{" "}
        <span className="blue_gradient text-center"> the best books.</span>
      </h1>
      <p className="desc text-center">
        This online library is for the modern world to discover, create and
        share creative books.
      </p>
      <Feed />
    </section>
  );
};

export default Home;
