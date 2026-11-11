import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const isDev = process.env.NODE_ENV !== "production";

/* The browser reads books straight from the Go API, so its origin has to be
 * allowed in connect-src. Everything else (fonts, scripts, styles) is served
 * from this app. */
const apiOrigin = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_API_BASE_URL ?? "").origin;
  } catch {
    return "";
  }
})();

/* 'unsafe-inline' scripts are needed for Next.js's inline bootstrap and the
 * next-themes no-flash script; a nonce-based CSP would remove it but forces
 * every page to render dynamically. The dev server additionally needs eval
 * and a websocket for hot reload. */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self' ${apiOrigin}${isDev ? " ws: wss:" : ""}`.trim(),
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  ...(isDev
    ? []
    : [
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains",
        },
      ]),
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },

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
