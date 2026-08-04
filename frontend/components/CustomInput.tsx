"use client";

import React, { useId } from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import { CustomInputProps } from "@/types";

/* Label above, helper below, error replaces helper. The helper container keeps
 * a reserved line so validation never pushes the form down, and the border
 * width is constant across every state so nothing shifts on focus. */
const CustomInput = ({
  label,
  placeholder,
  name,
  inputType = "text",
  multiline = false,
  value = "",
  onChange,
  onBlur,
  required = false,
  error,
  help,
}: CustomInputProps) => {
  const id = useId();
  const describedBy = `${id}-help`;
  const invalid = Boolean(error);

  const shared = {
    id,
    name,
    value,
    onChange,
    onBlur,
    placeholder,
    required,
    className: "input",
    "aria-required": required || undefined,
    "aria-invalid": invalid || undefined,
    "aria-describedby": describedBy,
  };

  return (
    <div className="field">
      <label className="field__label" htmlFor={id}>
        {label}
        {required && (
          <span className="field__req" aria-hidden="true">
            {" "}
            *
          </span>
        )}
      </label>

      <div className="field__control">
        {multiline ? (
          <textarea rows={4} {...shared} />
        ) : (
          /* `type="text"` + numeric inputMode rather than `type="number"`:
             it keeps the mobile keypad without the spinner buttons, the
             scroll-wheel value changes, or the "e"/"+" the year field
             would otherwise accept. */
          <input
            type="text"
            inputMode={inputType === "number" ? "numeric" : undefined}
            {...shared}
          />
        )}
        {invalid && (
          <span className="field__glyph field__glyph--error" aria-hidden="true">
            <RiErrorWarningLine size={16} />
          </span>
        )}
      </div>

      <p
        id={describedBy}
        className={`field__help ${invalid ? "field__help--error" : ""}`.trim()}
      >
        {error ?? help ?? ""}
      </p>
    </div>
  );
};

export default CustomInput;
