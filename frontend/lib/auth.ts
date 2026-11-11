/* Server-only helpers for the admin session and the write proxy.
 *
 * Imported only from `app/api/**` route handlers. Nothing here may be imported
 * by a client component: it reads ADMIN_PASSWORD, SESSION_SECRET and
 * API_WRITE_KEY, none of which carry the NEXT_PUBLIC_ prefix, so Next.js never
 * ships them to the browser. */

import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const SESSION_COOKIE = "lg_admin";
const SESSION_TTL_SECONDS = 8 * 60 * 60; // 8 hours

const requireEnv = (name: string) => {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not set in frontend/.env`);
  return value;
};

const sign = (payload: string) =>
  createHmac("sha256", requireEnv("SESSION_SECRET"))
    .update(payload)
    .digest("base64url");

const safeEqual = (a: string, b: string) => {
  /* Hash first so both buffers are the same length — timingSafeEqual throws
   * otherwise, and an early length check would leak the length. */
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
};

export const checkPassword = (attempt: string) =>
  safeEqual(attempt, requireEnv("ADMIN_PASSWORD"));

/* Token = "<expiry>.<hmac>". No user data inside, so nothing to leak; the
 * HMAC stops anyone from forging or extending it. */
export const createSessionToken = () => {
  const expires = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  return `${expires}.${sign(`admin.${expires}`)}`;
};

const verifySessionToken = (token: string | undefined) => {
  if (!token) return false;
  const [expires, mac] = token.split(".");
  if (!expires || !mac || !/^\d+$/.test(expires)) return false;
  if (Number(expires) < Date.now() / 1000) return false;
  return safeEqual(mac, sign(`admin.${expires}`));
};

export const isAdmin = async () => {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
};

export const sessionCookie = (value: string, maxAge = SESSION_TTL_SECONDS) => ({
  name: SESSION_COOKIE,
  value,
  httpOnly: true,
  /* Strict keeps the cookie off every cross-site request, which is what makes
   * cookie auth safe from CSRF here. */
  sameSite: "strict" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge,
});

/* Second CSRF layer: a browser always sends Origin on POST/PUT/DELETE, and it
 * must match the host serving this app. */
export const isSameOrigin = (request: Request) => {
  const origin = request.headers.get("origin");
  if (!origin) return true; // non-browser clients still need the cookie
  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
};

/* Very small brute-force brake for the login form: 5 wrong passwords per
 * client per 15 minutes. In-memory, so it resets on restart and is per
 * server instance — enough for a single-admin site. */
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const attempts = new Map<string, { count: number; resetAt: number }>();

const clientKey = (request: Request) =>
  request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";

export const isRateLimited = (request: Request) => {
  const entry = attempts.get(clientKey(request));
  return Boolean(
    entry && entry.resetAt > Date.now() && entry.count >= MAX_ATTEMPTS
  );
};

export const recordFailedLogin = (request: Request) => {
  const key = clientKey(request);
  const now = Date.now();
  const entry = attempts.get(key);
  if (!entry || entry.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
  } else {
    entry.count += 1;
  }
};

export const clearFailedLogins = (request: Request) => {
  attempts.delete(clientKey(request));
};

/* Forward an authorised write to the Go API with the server-held key. */
export const forwardWrite = async (
  request: Request,
  method: "POST" | "PUT" | "DELETE",
  path: string
) => {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const base = (
    process.env.API_BASE_URL ?? requireEnv("NEXT_PUBLIC_API_BASE_URL")
  ).replace(/\/$/, "");

  try {
    const upstream = await fetch(`${base}${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${requireEnv("API_WRITE_KEY")}`,
        ...(method === "DELETE" ? {} : { "Content-Type": "application/json" }),
      },
      body: method === "DELETE" ? undefined : await request.text(),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });

    return new NextResponse(await upstream.text(), {
      status: upstream.status,
      headers: {
        "Content-Type":
          upstream.headers.get("Content-Type") ?? "application/json",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "The catalogue API could not be reached." },
      { status: 502 }
    );
  }
};

/* MongoDB ObjectIDs are 24 hex characters. Checking here keeps arbitrary
 * strings out of the upstream URL. */
export const isValidBookId = (id: string) => /^[a-f0-9]{24}$/i.test(id);
