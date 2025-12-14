import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const form = await req.formData();

  const payload = {
    name: String(form.get("name") || ""),
    email: String(form.get("email") || ""),
    startDate: String(form.get("startDate") || ""),
    endDate: String(form.get("endDate") || ""),
    createdAt: new Date().toISOString(),
  };

  // For now we just log it (later: store in DB / send email)
  console.log("NEW CARME REQUEST:", payload);

  return NextResponse.redirect("http://localhost:3000/requested", 303);
}
