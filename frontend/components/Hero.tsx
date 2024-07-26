"use client";
import React from "react";
import CustomButton from "./CustomButton";
import Image from "next/image";

const Hero = () => {
  const handleScroll = () => {};
  return (
    <div className="hero">
      <div className="flex-1 pt-36 padding-x">
        <h1 className="hero__title">
          Discover & Share books around the globe.
        </h1>

        <p className="hero__subtitle">
          Library Globe is an open-source application for modern world to
          discover, create and share variety of books.
        </p>
        <CustomButton
          title="Explore Library"
          containerStyles="bg-primary-blue text-white rounded-full mt-10"
          handleClick={handleScroll}
        />
      </div>
      <div className="hero__image-container">
        <div className="hero__image">
          <Image src='/library.png' alt="hero" fill className="object-contain"/>
        </div>

        <div className="hero__image-overlay" />
      </div>
    </div>
  );
};

export default Hero;
