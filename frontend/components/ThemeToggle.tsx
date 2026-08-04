"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { RiMoonLine, RiSunLine } from "react-icons/ri";

/* next-themes was already a dependency but no provider was ever mounted, so
 * every `dark:` class in the app was dead. This is the control that makes it
 * real.
 *
 * `resolvedTheme` is undefined during SSR and only settles on the client, so
 * EVERY attribute that reads it — the icon and the aria-label alike — has to
 * wait for mount. Gating just the icon leaves the label mismatched between
 * server and client and React throws a hydration error. */
const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      className="icon-btn"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={
        mounted
          ? isDark
            ? "Switch to light theme"
            : "Switch to dark theme"
          : "Switch theme"
      }
    >
      {/* The placeholder holds the icon's box so the masthead row doesn't
          reflow when the real glyph arrives. */}
      {mounted ? (
        isDark ? (
          <RiSunLine size={17} />
        ) : (
          <RiMoonLine size={17} />
        )
      ) : (
        <span style={{ width: 17, height: 17 }} aria-hidden="true" />
      )}
    </button>
  );
};

export default ThemeToggle;
