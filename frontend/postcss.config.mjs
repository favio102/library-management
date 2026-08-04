/** @type {import('postcss-load-config').Config} */
/* Tailwind v4 moved its PostCSS plugin into a separate package. The installed
 * tree is tailwindcss 4.x, so this must be `@tailwindcss/postcss` — the bare
 * `tailwindcss` entry throws at build time. */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
