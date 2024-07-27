import Link from "next/link";
import Image from "next/image";

import CustomButton from "./CustomButton";

const NavBar = () => (
  // <header className='w-full  absolute z-10'>
  <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4 bg-transparent">
    <Link href="/" className="flex justify-center items-center">
      <span className="text-xl md:text-3xl text-indigo-700 font-bold dark:text-dark">
        Library Globe
      </span>
    </Link>

    <CustomButton
      title="Add a New Book"
      btnType="button"
      containerStyles="text-primary-blue rounded-full bg-blue-200 min-w-[130px] me-6"
    />
  </nav>
  // </header>
);

export default NavBar;
