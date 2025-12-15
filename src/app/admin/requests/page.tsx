"use client";

import { useEffect, useState } from "react";

type CarmeRequest = {
  name: string;
  email: string;
  startDate: string;
  endDate: string;
  createdAt: string;
};

export default function AdminRequestsPage() {
  const [token, setToken] = useState("");
  const [requests, setRequests] = useState<CarmeRequest[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("carme_admin_token");
    if (saved) setToken(saved);
  }, []);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      localStorage.setItem("carme_admin_token", token);

      const res = await fetch("/api/admin/requests", {
        headers: { "x-admin-token": token },
        cache: "no-store",
      });

      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.error || `Request failed (${res.status})`);
      }

      const data = (await res.json()) as { requests: CarmeRequest[] };
      setRequests(data.requests || []);
    } catch (e: any) {
      setError(e.message || "Failed to load");
      setRequests([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <div className="mx-auto max-w-5xl px-6 py-14">
        <h1 className="text-3xl font-semibold">Admin · Rental Requests</h1>
        <p className="mt-2 text-zinc-600">
          Protected by ADMIN_TOKEN. Don’t share this page.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Admin token"
            className="w-full rounded-2xl border border-zinc-200 px-4 py-3 outline-none"
          />
          <button
            onClick={load}
            className="rounded-2xl bg-zinc-900 px-5 py-3 text-white font-medium hover:opacity-90"
          >
            {loading ? "Loading…" : "Load"}
          </button>
        </div>

        {error && (
          <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="mt-8 rounded-3xl border border-zinc-200 p-6 shadow-sm">
          <div className="text-sm text-zinc-500">
            Requests ({requests.length})
          </div>

          <div className="mt-4 space-y-4">
            {requests.map((r, idx) => (
              <div key={idx} className="rounded-2xl bg-zinc-50 p-4">
                <div className="font-medium">{r.name}</div>
                <div className="text-sm text-zinc-700">{r.email}</div>
                <div className="mt-2 text-sm text-zinc-700">
                  {r.startDate} → {r.endDate}
                </div>
                <div className="mt-1 text-xs text-zinc-500">
                  {new Date(r.createdAt).toLocaleString()}
                </div>
              </div>
            ))}

            {requests.length === 0 && !error && (
              <div className="text-sm text-zinc-600">
                No requests yet. Submit one from the listing page to test.
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
