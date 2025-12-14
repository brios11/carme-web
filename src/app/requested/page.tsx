import Link from "next/link";

export default function Requested() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <div className="mx-auto max-w-3xl px-6 py-14">
        <h1 className="text-3xl font-semibold">Request received ✅</h1>
        <p className="mt-3 text-zinc-700">
          Thanks — we’ll review your request and follow up with confirmation and next steps.
        </p>
        <p className="mt-3 text-zinc-700">
          This is a request to rent — not a confirmed booking yet.
        </p>

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
