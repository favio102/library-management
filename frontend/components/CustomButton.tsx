"use client";

import Image from "next/image";
import { CustomButtonProps } from "@/types";

const Button = ({
  title,
  containerStyles,
  handleClick,
  btnType,
  textStyles,
  rightIcon,
}: CustomButtonProps) => (
  <button
    disabled={false}
    type={btnType}
    className={`custom-btn ${containerStyles} ${textStyles}`}
    onClick={handleClick}
  >
    <span className={`flex-1`}>{title}</span>
    {rightIcon && (
      <div className="relative w-6 h-6">
        <Image
          src={rightIcon}
          alt="arrow_left"
          fill
          className="object-contain"
        />
      </div>
    )}
  </button>
);

export default Button;
