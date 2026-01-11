import Link from "next/link";
import { CARME } from "@/lib/carme";

export default function M340iPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <div className="mx-auto max-w-5xl px-6 py-14">
        <header className="flex items-center justify-between">
          <Link href="/" className="text-sm text-zinc-600 hover:underline">
            ← Back
          </Link>
          <div className="text-sm text-zinc-600">Hosted by {CARME.legal}</div>
        </header>

        <h1 className="mt-6 text-4xl font-semibold tracking-tight">
          {CARME.vehicle.title}
        </h1>
        <p className="mt-2 text-zinc-700">
          ${CARME.vehicle.dailyRateUsd}/day • Direct rental
        </p>
        <p className="mt-2 text-sm text-zinc-500">
          Single-host pilot • Request-based availability
        </p>

        <section className="mt-10 grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-zinc-200 p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Rules</h2>
            <ul className="mt-4 space-y-2 text-zinc-700">
              <li>• Valid driver’s license required</li>
              <li>• No smoking</li>
              <li>• Return with same fuel level</li>
              <li>• Late returns may incur additional fees</li>
              <li>• Renter responsible for tickets/tolls</li>
            </ul>

            <div className="mt-6 rounded-2xl bg-zinc-50 p-4 text-sm text-zinc-700">
              No security deposit for now.
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-200 p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Request to rent</h2>

            <form action="/api/request" method="POST" className="mt-6 space-y-4">
              <input
                name="name"
                required
                placeholder="Full name"
                className="w-full rounded-2xl border border-zinc-200 px-4 py-3"
              />
              <input
                name="email"
                type="email"
                required
                placeholder="Email"
                className="w-full rounded-2xl border border-zinc-200 px-4 py-3"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  name="startDate"
                  type="date"
                  required
                  className="w-full rounded-2xl border border-zinc-200 px-4 py-3"
                />
                <input
                  name="endDate"
                  type="date"
                  required
                  className="w-full rounded-2xl border border-zinc-200 px-4 py-3"
                />
                <label className="flex items-start gap-3 text-sm text-zinc-700">
                  <input name="delivery" type="checkbox" />
                  <span>
                    Add NYC delivery (+$100). Pickup is Manhattan by default.
                  </span>
                </label>

              </div>



              <label className="flex gap-3 text-sm text-zinc-700">
                <input name="agree" type="checkbox" required />
                <span>
                  I agree to the <Link href="/terms" className="underline">terms</Link>.
                </span>
              </label>
              <div className="rounded-2xl bg-zinc-50 p-4 text-sm text-zinc-700 space-y-1">
                <div className="flex items-center justify-between">
                  <span>Daily rate</span>
                  <span className="font-medium">${CARME.vehicle.dailyRateUsd}/day</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Security deposit</span>
                  <span className="font-medium">$0 (v1)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Delivery (optional)</span>
                  <span className="font-medium">$100 (any NYC borough)</span>
                </div>
                <div className="pt-2 text-xs text-zinc-500">
                  Pickup is Manhattan by default. Delivery must be arranged after booking.
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-2xl bg-zinc-900 py-3 text-white font-medium"
              >
                Continue to payment
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
