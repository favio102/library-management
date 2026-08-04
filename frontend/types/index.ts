import { MouseEventHandler, ReactNode } from "react";

export type ButtonTone = "primary" | "quiet" | "danger" | "type";

export interface CustomButtonProps {
  title: string;
  tone?: ButtonTone;
  containerStyles?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  btnType?: "button" | "submit";
  disabled?: boolean;
  loading?: boolean;
  loadingTitle?: string;
  icon?: ReactNode;
  ariaLabel?: string;
}

export interface CustomInputProps {
  label: string;
  placeholder: string;
  name: string;
  inputType?: "text" | "number";
  multiline?: boolean;
  value?: string;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur?: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  required?: boolean;
  error?: string;
  help?: string;
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
  book: BookProps;
}

export interface BookCoverProps {
  title: string;
  author: string;
  /** `lg` is the record page's cover; the default is the catalogue tile. */
  size?: "sm" | "lg";
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
  onCancel: () => void;
  isEditing: boolean;
  submitting: boolean;
}

export interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  resultCount: number;
}

export type LoadStatus = "idle" | "loading" | "ready" | "error";

export interface BookContextProps {
  books: BookProps[];
  status: LoadStatus;
  error: string | null;
  fetchBooks: () => Promise<void>;
  addBook: (book: BookProps) => Promise<void>;
  updateBook: (updatedBook: BookProps) => Promise<void>;
  /** Optimistic delete. The request is held open for the Undo window. */
  removeBook: (id: string) => void;
}

/* ImageUploader is not mounted anywhere. Its dropzone was never wired to an
 * `onDrop`, and there is no upload endpoint on the API — it looked functional
 * while doing nothing. The component and this type are kept in place for when
 * cover upload is actually built. */
export interface ImageUploaderProps {
  files: File[];
  handleOnDrop: (acceptedFiles: File[]) => void;
}

export interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  body: ReactNode;
  confirmLabel: string;
  cancelLabel?: string;
  tone?: "danger" | "primary";
  busy?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export interface EmptyStateProps {
  title: string;
  body: string;
  mark?: ReactNode;
  action?: ReactNode;
}
