"use client";

import { useState } from "react";

export default function ProductRiskPage() {
  const [hs6, setHs6] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  async function fetchProduct() {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/product/${hs6}`);

      if (!res.ok) {
        throw new Error("Product not found");
      }

      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 px-6 py-12">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
            Product Risk
          </p>

          <h1 className="text-2xl md:text-3xl font-semibold mt-2">
            Explore product-level import exposure
          </h1>

          <p className="text-slate-300 mt-2">
            Enter an HS6 code to fetch demo risk data from the backend.
          </p>
        </div>

        {/* Search box */}
        <div className="flex space-x-3">
          <input
            className="flex-1 rounded-lg bg-slate-900 border border-slate-700 px-4 py-2 text-slate-100"
            placeholder="Enter HS6 code e.g. 851712"
            value={hs6}
            onChange={(e) => setHs6(e.target.value)}
          />
          <button
            onClick={fetchProduct}
            className="rounded-lg bg-slate-800 border border-slate-600 px-4 py-2 hover:bg-slate-700 transition"
          >
            Search
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-slate-400 text-sm">Fetching product data…</p>
        )}

        {/* Error */}
        {error && <p className="text-red-400 text-sm font-medium">{error}</p>}

        {/* Result card */}
        {result && (
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 space-y-4">
            <h2 className="text-xl font-medium">
              HS {result.hs6} — {result.product}
            </h2>

            <div className="space-y-1 text-slate-300 text-sm leading-relaxed">
              <p className="font-semibold">Top suppliers:</p>
              {result.suppliers.map((s: any) => (
                <p key={s.country}>
                  {s.country}: {(s.share * 100).toFixed(0)}%
                </p>
              ))}
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              <strong>Chokepoint exposure:</strong> {result.notes}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
