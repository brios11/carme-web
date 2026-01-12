import Stripe from "stripe";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getRequest, updateRequest } from "@/lib/requestsStore";
import { CARME } from "@/lib/carme";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const token = searchParams.get("token");

  if (!id || token !== process.env.ADMIN_TOKEN) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const r = await getRequest(id);
  if (!r) return new NextResponse("Not found", { status: 404 });

  // Calculate days
  const start = new Date(r.startDate);
  const end = new Date(r.endDate);
  const ms = 24 * 60 * 60 * 1000;
  const numDays = Math.round((end.getTime() - start.getTime()) / ms) + 1;

  const deliveryFeeUsd = r.delivery ? 100 : 0;
  const totalUsd = CARME.vehicle.dailyRateUsd * numDays + deliveryFeeUsd;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: totalUsd * 100,
          product_data: { name: CARME.vehicle.title },
        },
      },
    ],
    metadata: { requestId: r.id, renterEmail: r.email },
    success_url: `${process.env.APP_URL}/success`,
    cancel_url: `${process.env.APP_URL}/cars/m340i`,
  });

  const resend = new Resend(process.env.RESEND_API_KEY as string);

  await resend.emails.send({
    from: process.env.EMAIL_FROM as string,
    to: r.email,
    subject: `CarMe payment link: ${CARME.vehicle.title}`,
    html: `
      <p>Hi ${r.name},</p>
      <p>Your request was approved. Use this link to complete payment:</p>
      <p><a href="${session.url}">Pay now</a></p>
      <p>Dates: ${r.startDate} → ${r.endDate}</p>
      <p>Delivery: ${r.delivery ? "Yes (+$100)" : "No"}</p>
    `,
  });

  await updateRequest(r.id, { status: "approved", stripeUrl: session.url ?? undefined });

  return NextResponse.redirect(`${process.env.APP_URL}/admin/requested`, 303);
}
