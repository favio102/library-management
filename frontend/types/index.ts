import { MouseEventHandler } from "react";

export interface CustomButtonProps {
  title: string;
  containerStyles?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  btnType?: "button" | "submit";
  textStyles?: string;
  rightIcon?: string;
}

export interface CustomInputProps {
  label: string;
  placeholder: string;
  name: string;
  btnType?: "text" | "number" | "radio" | "number";
  value?: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface BookProps {
  _id: string;
  title: string;
  author: string;
  year: string;
  description?: string;
  edition?: string;
  language?: string;
  subject?: string;
  publisher?: string;
  format?: string;
}

export interface BookCardProps {
  book: {
    _id: string;
    title: string;
    author: string;
    year: string;
    description?: string;
    edition?: string;
    language?: string;
    subject?: string;
    publisher?: string;
    format?: string;
  };
}
