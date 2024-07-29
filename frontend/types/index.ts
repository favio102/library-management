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
  required: boolean;
}

export interface BookProps {
  id: string;
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
    id: string;
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

export interface BookDetailsProps {
  isOpen: boolean;
  closeModal: () => void;
  isEditing: boolean;
  bookId: string | null;
  book: BookProps;
  setBook: (book: BookProps) => void;
  onAddBook: (book: BookProps) => Promise<void>;
  onUpdateBook: (updatedBook: BookProps) => Promise<void>;
}

export interface FormProps {
  book: BookProps;
  setBook: (book: BookProps) => void;
  onSubmit: () => void;
}

export interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export interface BookContextProps {
  books: BookProps[];
  fetchBooks: () => Promise<void>;
  addBook: (book: BookProps) => Promise<void>;
  updateBook: (updatedBook: BookProps) => Promise<void>;
}
