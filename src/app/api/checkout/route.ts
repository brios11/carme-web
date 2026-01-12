import Stripe from "stripe";
import { NextResponse } from "next/server";
import { CARME } from "@/lib/carme";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: Request) {
  const form = await req.formData();

  const startDate = String(form.get("startDate") || "");
  const endDate = String(form.get("endDate") || "");
  const delivery = form.get("delivery") === "yes";

  const start = new Date(startDate);
  const end = new Date(endDate);
  const ms = 24 * 60 * 60 * 1000;
  const numDays = Math.round((end.getTime() - start.getTime()) / ms) + 1;

  const deliveryFeeUsd = delivery ? 100 : 0;
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
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cars/m340i",
  });

  return NextResponse.redirect(session.url!, 303);
}
