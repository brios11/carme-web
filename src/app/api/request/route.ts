import { NextResponse } from "next/server";
import { addRequest } from "@/lib/requestStore";

export async function POST(req: Request) {
  const form = await req.formData();

  const payload = {
    name: String(form.get("name") || ""),
    email: String(form.get("email") || ""),
    startDate: String(form.get("startDate") || ""),
    endDate: String(form.get("endDate") || ""),
    createdAt: new Date().toISOString(),
  };

  console.log("NEW CARME REQUEST:", payload);
  addRequest(payload);

  const url = new URL("/requested", req.url);
  return NextResponse.redirect(url, 303);
}
