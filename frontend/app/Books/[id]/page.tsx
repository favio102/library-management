import Image from "next/image";
import React from "react";

const page = () => {
  const book = true;
  return (
    <section className="relative max-w-[1440px] mx-auto pt-16 md:pt-24 p-1">
      {book ? (
        <div>
          <div className="flex flex-col md:flex-row gap-2 md:gap-6 w-full">
            <div className="bg-gray-100  md:w-1/2 rounded-2xl">
              <Image
                src=""
                alt="book"
                width={1024}
                height={1024}
                className="w-full h-full"
              />
            </div>
            <div className="flex flex-col w-full max-w-sm p-4">
              <h2 className="font-bold text-lg md:text-3xl">
                Title: The Electric Sheep Dreams of Androids
              </h2>
              <h5 className="font-bold text-lg md:text-3xl">
                Author: Philip K. Dick
              </h5>
              <p className="mt-1.5 text-gray-800 dark:text-gray-400 text-normal md:text-lg">
                In a world where humans have colonized other planets and
                androids are indistinguishable from humans, Rick Deckard, a
                bounty hunter, is tasked with "retiring" rogue androids. As he
                delves deeper into his assignments, Deckard begins to question
                the nature of reality, humanity, and the line between human and
                machine.
              </p>
              <div className="space-y-2 md:space-y-4 mt-4 md:mt-6 w-full">
                <div className="flex items-center justify-between w-full">
                  <div className="w-1/2">
                    <h4 className="md:text-lg font-semibold capitalize">
                      Publication Year
                    </h4>
                    <p className="font-normal">2059</p>
                  </div>
                  <div className="w-1/2">
                    <h4 className="md:text-lg font-semibold capitalize text-left">
                      Edition
                    </h4>
                    <p className="font-normal">First Edition</p>
                  </div>
                </div>
                <div className="flex items-center justify-between w-full">
                  <div className="w-1/2">
                    <h4 className="md:text-lg font-semibold capitalize">
                      Language
                    </h4>
                    <p className="font-normal">English</p>
                  </div>
                  <div className="w-1/2">
                    <h4 className="md:text-lg font-semibold capitalize">
                      Subjects/Keywords
                    </h4>
                    <p className="font-normal">
                      Science fiction, philosophy, artificial intelligence,
                      androids, empathy
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between w-full">
                  <div className="w-1/2">
                    <h4 className="md:text-lg font-semibold capitalize">
                      Formats Available
                    </h4>
                    <p className="font-normal">Print, eBook</p>
                  </div>
                  <div className="w-1/2">
                    <h4 className="md:text-lg font-semibold capitalize">
                      Availability Status{" "}
                    </h4>
                    <p className="font-normal">Available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default page;
