"use client";

import React, { useMemo, useState } from "react";
import CustomButton from "./CustomButton";
import CustomInput from "./CustomInput";
import { BookProps, FormProps } from "@/types";

type FieldName = "title" | "author" | "year";

const THIS_YEAR = 2026;

/* Errors follow the three-beat rule: what broke, why, what to do.
 * Only title, author and year are required — the previous build marked all ten
 * fields required, which made adding a book you only half-know impossible. */
const validate = (book: BookProps): Partial<Record<FieldName, string>> => {
  const errors: Partial<Record<FieldName, string>> = {};

  if (!book.title.trim()) errors.title = "A record needs a title to be found by.";
  if (!book.author.trim()) errors.author = "Add the author, or write “Unknown”.";

  const year = book.year.trim();
  if (!year) {
    errors.year = "Add the year of publication.";
  } else if (!/^\d{1,4}$/.test(year)) {
    errors.year = "Use digits only — 1968, not “circa 1968”.";
  } else {
    const value = Number(year);
    if (value < 1000 || value > THIS_YEAR + 1) {
      errors.year = `Publication years run from 1000 to ${THIS_YEAR + 1}.`;
    }
  }

  return errors;
};

const Form = ({
  book,
  setBook,
  onSubmit,
  onCancel,
  isEditing,
  submitting,
}: FormProps) => {
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const errors = useMemo(() => validate(book), [book]);

  /* Validate on blur, then keep revalidating that field as it changes. */
  const errorFor = (name: FieldName) =>
    touched[name] || submitAttempted ? errors[name] : undefined;

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setBook({ ...book, [event.target.name]: event.target.value });

  const handleBlur = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setTouched((prev) => ({ ...prev, [event.target.name]: true }));

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitAttempted(true);
    if (Object.keys(errors).length > 0) {
      const first = document.querySelector<HTMLElement>('[aria-invalid="true"]');
      first?.focus();
      return;
    }
    onSubmit();
  };

  const field = {
    onChange: handleChange,
    onBlur: handleBlur,
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="form__grid">
        <CustomInput
          label="Title"
          name="title"
          placeholder="The Left Hand of Darkness"
          value={book.title}
          required
          error={errorFor("title")}
          {...field}
        />
        <CustomInput
          label="Author"
          name="author"
          placeholder="Ursula K. Le Guin"
          value={book.author}
          required
          error={errorFor("author")}
          {...field}
        />
        <CustomInput
          label="Description"
          name="description"
          placeholder="What the book is about, in a sentence or two."
          value={book.description ?? ""}
          multiline
          help="Optional. Shown on the book’s record page."
          {...field}
        />
      </div>

      <div className="form__grid form__grid--two" style={{ marginTop: "var(--space-md)" }}>
        <CustomInput
          label="Publication year"
          name="year"
          placeholder="1969"
          inputType="number"
          value={book.year}
          required
          error={errorFor("year")}
          {...field}
        />
        <CustomInput
          label="Edition"
          name="edition"
          placeholder="First"
          value={book.edition ?? ""}
          {...field}
        />
        <CustomInput
          label="Language"
          name="language"
          placeholder="English"
          value={book.language ?? ""}
          {...field}
        />
        <CustomInput
          label="Subjects"
          name="subject"
          placeholder="Science fiction, gender"
          value={book.subject ?? ""}
          {...field}
        />
        <CustomInput
          label="Format"
          name="format"
          placeholder="Paperback"
          value={book.format ?? ""}
          {...field}
        />
        <CustomInput
          label="Publisher"
          name="publisher"
          placeholder="Ace Books"
          value={book.publisher ?? ""}
          {...field}
        />
      </div>

      <div className="form__actions">
        <CustomButton
          title="Cancel"
          tone="quiet"
          handleClick={onCancel}
          disabled={submitting}
        />
        <CustomButton
          title={isEditing ? "Save changes" : "Add to the shelf"}
          loadingTitle={isEditing ? "Saving…" : "Adding…"}
          tone="primary"
          btnType="submit"
          loading={submitting}
        />
      </div>
    </form>
  );
};

export default Form;
