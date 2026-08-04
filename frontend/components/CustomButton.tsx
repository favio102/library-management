"use client";

import { CustomButtonProps } from "@/types";

const toneClass = {
  primary: "btn--primary",
  quiet: "btn--quiet",
  danger: "btn--danger",
  type: "btn--type",
} as const;

/* All eight states live in `.btn` and its tone modifiers in globals.css:
 * default · hover · focus-visible · active · disabled · loading · error ·
 * success. Loading swaps the label rather than adding a second signal. */
const Button = ({
  title,
  tone = "quiet",
  containerStyles = "",
  handleClick,
  btnType = "button",
  disabled = false,
  loading = false,
  loadingTitle,
  icon,
  ariaLabel,
}: CustomButtonProps) => (
  <button
    type={btnType}
    className={`btn ${toneClass[tone]} ${containerStyles}`.trim()}
    onClick={handleClick}
    disabled={disabled || loading}
    aria-label={ariaLabel}
    aria-busy={loading || undefined}
    data-state={loading ? "loading" : undefined}
  >
    {loading ? (
      <span className="btn__spinner" aria-hidden="true" />
    ) : (
      icon && <span aria-hidden="true">{icon}</span>
    )}
    <span>{loading ? loadingTitle ?? title : title}</span>
  </button>
);

export default Button;
