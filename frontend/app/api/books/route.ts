import { forwardWrite } from "@/lib/auth";

/* Admin-only: create a book. Reads still go straight from the browser to the
 * Go API; only writes pass through here so the API key stays on the server. */
export async function POST(request: Request) {
  return forwardWrite(request, "POST", "/books");
}
