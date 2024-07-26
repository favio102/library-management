"use client";

import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          alt="logo"
          src="/assets/images/logo.jpg"
          width={30}
          height={30}
          className="object-contain"
        />
      </Link>
      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        <div className="flex gap-3 md:gap-5">
          <Link href="/create-book" className="black_btn">
            Add a new book
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
