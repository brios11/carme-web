import { NextResponse } from "next/server";
import { addRequest } from "@/lib/requestsStore";
import { Resend } from "resend";


export async function POST(req: Request) {
  const form = await req.formData();

  const payload = {
    id: crypto.randomUUID(),
    name: String(form.get("name") || ""),
    email: String(form.get("email") || ""),
    startDate: String(form.get("startDate") || ""),
    endDate: String(form.get("endDate") || ""),
    delivery: form.get("delivery") === "on",
    status: "pending" as const,
    createdAt: new Date().toISOString(),
  };

  console.log("NEW CARME REQUEST:", payload);
  addRequest(payload);
  
  const resend = new Resend(process.env.RESEND_API_KEY as string);

  const approveUrl =
    `${process.env.APP_URL}/api/admin/approve?id=${payload.id}&token=${process.env.ADMIN_TOKEN}`;

  await resend.emails.send({
    from: process.env.EMAIL_FROM as string,
    to: process.env.ADMIN_EMAIL as string,
    subject: `CarMe request: ${payload.name}`,
    html: `
      <p>${payload.name} requested ${payload.startDate} → ${payload.endDate}</p>
      <p>Delivery: ${payload.delivery ? "Yes (+$100)" : "No"}</p>
      <p><a href="${approveUrl}">Approve & send payment link</a></p>
    `,
  });


  const url = new URL("/requested", req.url);
  return NextResponse.redirect(url, 303);
}
