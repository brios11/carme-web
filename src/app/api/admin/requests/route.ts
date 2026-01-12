import { NextResponse } from "next/server";
import { getRequests } from "@/lib/requestsStore";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const token =
    req.headers.get("x-admin-token") || url.searchParams.get("token") || "";

  const expected = process.env.ADMIN_TOKEN || "";
  if (!expected) return unauthorized();
  if (token !== expected) return unauthorized();

  return NextResponse.json({ requests: getRequests() });
}
