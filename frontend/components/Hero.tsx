"use client";
import React from "react";
import CustomButton from "./CustomButton";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  const handleScroll = () => {};
  return (
    <div className="hero">
      <div className="flex-1 pt-6 padding-x">
        <h1 className="hero__title">
          Discover & Share books.
        </h1>

        <Link href="#discover">
          <CustomButton
            title="Explore Library"
            containerStyles="bg-blue-800 hover:bg-blue-700 text-white rounded mt-10"
            handleClick={handleScroll}
          />
        </Link>
        <p className="hero__subtitle">
          Library Globe is an open-source application for modern world to
          discover, create and share variety of books.
        </p>
      </div>
      <div className="hero__image-container">
        <div className="hero__image">
          <Image
            src="/hero.png"
            alt="hero"
            // fill
            width={500}
            height={20}
            className="object-contain"
            style={{ width: "auto", height: "auto" }}
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
