import Link from "next/link";
import { CARME } from "@/lib/carme";

export default function Success() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <div className="mx-auto max-w-3xl px-6 py-14">
        <h1 className="text-3xl font-semibold">Payment received ✅</h1>
        <p className="mt-3 text-zinc-700">
          You’re booked. Next step: we’ll send the rental agreement and pickup details.
        </p>

        <div className="mt-8 rounded-3xl border border-zinc-200 p-6 shadow-sm">
          <div className="text-sm text-zinc-500">Host</div>
          <div className="mt-1 font-medium">{CARME.legal}</div>

          <div className="mt-5 text-sm text-zinc-500">Vehicle</div>
          <div className="mt-1 font-medium">{CARME.vehicle.title}</div>
          <div className="mt-1 text-sm text-zinc-600">
            ${CARME.vehicle.dailyRateUsd}/day
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <Link
            href="/cars/m340i"
            className="rounded-2xl border border-zinc-200 px-5 py-3 font-medium hover:bg-zinc-50"
          >
            Back to listing
          </Link>
          <Link
            href="/"
            className="rounded-2xl bg-zinc-900 px-5 py-3 text-white font-medium hover:opacity-90"
          >
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}
