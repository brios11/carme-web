import Link from "next/link";
import { CARME } from "@/lib/carme";

export default function Terms() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <div className="mx-auto max-w-3xl px-6 py-14">
        <Link href="/" className="text-sm text-zinc-600 hover:underline">
          ← Back
        </Link>

        <h1 className="mt-6 text-3xl font-semibold">Terms & Rules</h1>
        <div className="mt-6 space-y-4 text-zinc-700">
          <p><b>Driver:</b> Valid license required.</p>
          <p><b>Use:</b> No smoking or illegal activity.</p>
          <p><b>Fuel:</b> Return with same fuel level.</p>
          <p><b>Tickets/tolls:</b> Renter responsible.</p>
          <p><b>Agreement:</b> Must be signed before pickup.</p>
          <p><b>Deposit:</b> None for now (may change).</p>
        </div>
      </div>
    </main>
  );
}
