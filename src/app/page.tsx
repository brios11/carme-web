import Link from "next/link";
import { CARME } from "@/lib/carme";
import Header from "@/components/Header";
import Footer from "@/components/Footer";


export default function Home() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <div className="mx-auto max-w-5xl px-6 py-14">
        <Header />

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
              CarMe is currently operating as a single-host pilot while we validate demand.
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
        {/* FAQ */}
        <section className="mt-24">
          <h2 className="text-2xl font-semibold">How it works</h2>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-zinc-200 p-6">
              <div className="text-sm text-zinc-500">Step 1</div>
              <h3 className="mt-2 font-medium">Request the car</h3>
              <p className="mt-2 text-sm text-zinc-700">
                Choose your dates and submit a rental request. This helps us confirm availability
                and ensure a good fit.
              </p>
            </div>

            <div className="rounded-3xl border border-zinc-200 p-6">
              <div className="text-sm text-zinc-500">Step 2</div>
              <h3 className="mt-2 font-medium">Confirm details</h3>
              <p className="mt-2 text-sm text-zinc-700">
                We’ll follow up to confirm eligibility, pickup details, and next steps.
                This is a direct, host-operated rental.
              </p>
            </div>

            <div className="rounded-3xl border border-zinc-200 p-6">
              <div className="text-sm text-zinc-500">Step 3</div>
              <h3 className="mt-2 font-medium">Pick up & drive</h3>
              <p className="mt-2 text-sm text-zinc-700">
                Once confirmed, complete the agreement and enjoy the car.
                Simple, transparent, and no marketplace games.
              </p>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </main>
  );
}
