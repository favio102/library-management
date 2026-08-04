import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  /* There is a stray package-lock.json in the repo root as well as this one,
   * so Turbopack inferred the parent directory as the workspace root and
   * resolved relative CSS `@import`s against it. Pinning the root to this
   * directory fixes that and silences the multiple-lockfile warning. */
  turbopack: {
    root: dirname(fileURLToPath(import.meta.url)),
  },

  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
};

export default nextConfig;
