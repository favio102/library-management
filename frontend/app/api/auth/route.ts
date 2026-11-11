import { NextResponse } from "next/server";
import {
  checkPassword,
  clearFailedLogins,
  createSessionToken,
  isAdmin,
  isRateLimited,
  isSameOrigin,
  recordFailedLogin,
  sessionCookie,
} from "@/lib/auth";

/* GET    → is the current visitor signed in as admin?
 * POST   → sign in with { password }
 * DELETE → sign out */

export async function GET() {
  return NextResponse.json(
    { admin: await isAdmin() },
    { headers: { "Cache-Control": "no-store" } }
  );
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }
  if (isRateLimited(request)) {
    return NextResponse.json(
      { error: "Too many attempts. Wait 15 minutes and try again." },
      { status: 429 }
    );
  }

  let password = "";
  try {
    const body = await request.json();
    if (typeof body?.password === "string") password = body.password;
  } catch {
    /* fall through with an empty password */
  }

  if (!password || !checkPassword(password)) {
    recordFailedLogin(request);
    return NextResponse.json(
      { error: "That password is not right." },
      { status: 401 }
    );
  }

  clearFailedLogins(request);
  const response = NextResponse.json({ admin: true });
  response.cookies.set(sessionCookie(createSessionToken()));
  return response;
}

export async function DELETE(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }
  const response = NextResponse.json({ admin: false });
  response.cookies.set(sessionCookie("", 0));
  return response;
}
