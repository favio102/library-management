import Image from "next/image";
import Hero from "@/components/Hero";
import { BookCard, SearchBar } from "@/components";

export default function Home() {
  const isDataEmpty = false;
  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Book Catalogue</h1>
          <p>Explore out books you might like</p>
        </div>

        <div className="home__filters">
          <SearchBar />
        </div>

        {!isDataEmpty ? (
          <section>
            <div className="home__books-wrapper">
              <BookCard />
              <BookCard />
              <BookCard />
              <BookCard />
              <BookCard />
              <BookCard />
            </div>
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">Library is empty.</h2>
          </div>
        )}
      </div>
    </main>
  );
}
