import { NextResponse } from "next/server";
import { forwardWrite, isValidBookId } from "@/lib/auth";

type Context = { params: Promise<{ id: string }> };

const handle = async (
  request: Request,
  { params }: Context,
  method: "PUT" | "DELETE"
) => {
  const { id } = await params;
  if (!isValidBookId(id)) {
    return NextResponse.json({ error: "invalid book id" }, { status: 400 });
  }
  return forwardWrite(request, method, `/books/${id}`);
};

/* Admin-only: update or delete one book. */
export async function PUT(request: Request, context: Context) {
  return handle(request, context, "PUT");
}

export async function DELETE(request: Request, context: Context) {
  return handle(request, context, "DELETE");
}
