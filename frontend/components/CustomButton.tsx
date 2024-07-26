"use client";

import Image from "next/image";
import { CustomButtonProps } from "@/types";

const Button = ({ title, containerStyles, handleClick }: CustomButtonProps) => (
  <button
    disabled={false}
    type="button"
    className={`custom-btn ${containerStyles}`}
    onClick={handleClick}
  >
    <span className={`flex-1`}>{title}</span>
    {/* {rightIcon && (
      <div className="relative w-6 h-6">
        <Image
          src={rightIcon}
          alt="arrow_left"
          fill
          className="object-contain"
        />
      </div>
    )} */}
  </button>
);

export default Button;
