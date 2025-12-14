import Link from "next/link";
import { CARME } from "@/lib/carme";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <div className="mx-auto max-w-5xl px-6 py-14">
        <header className="flex items-center justify-between">
          <div className="font-semibold text-xl">{CARME.brand}</div>
          <div className="text-sm text-zinc-600">Hosted by {CARME.legal}</div>
        </header>

        <section className="mt-14 grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight">
              Premium car rentals — direct, simple, legitimate.
            </h1>
            <p className="mt-4 text-lg text-zinc-700">
              Book directly with {CARME.brand}. Clear rules, Stripe checkout, no marketplace chaos.
            </p>

            <div className="mt-8 flex gap-3">
              <Link
                href="/cars/m340i"
                className="rounded-2xl bg-zinc-900 px-5 py-3 text-white font-medium shadow-sm hover:opacity-90"
              >
                View the car
              </Link>
              <Link
                href="/terms"
                className="rounded-2xl border border-zinc-200 px-5 py-3 font-medium hover:bg-zinc-50"
              >
                Terms & rules
              </Link>
            </div>

            <p className="mt-6 text-sm text-zinc-500">
              CarMe v1 is single-host while we validate demand.
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-200 p-6 shadow-sm">
            <div className="text-sm text-zinc-500">Featured vehicle</div>
            <div className="mt-2 text-2xl font-semibold">{CARME.vehicle.title}</div>
            <div className="mt-1 text-zinc-700">${CARME.vehicle.dailyRateUsd}/day</div>

            <div className="mt-6 grid gap-3 text-sm text-zinc-700">
              <div className="rounded-2xl bg-zinc-50 p-4">✅ Stripe checkout</div>
              <div className="rounded-2xl bg-zinc-50 p-4">✅ No security deposit (for now)</div>
              <div className="rounded-2xl bg-zinc-50 p-4">✅ Agreement required before pickup</div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
