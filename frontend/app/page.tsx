export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4">
      <div className="max-w-xl text-center space-y-4">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
          Project 25
        </p>

        <h1 className="text-3xl md:text-4xl font-semibold">
          Trade chokepoint risk, made legible.
        </h1>

        <p className="text-sm md:text-base text-slate-300">
          An experimental tool for exploring product-level import exposure.
        </p>

        <div className="pt-2">
          <a
            href="/product-risk"
            className="inline-flex items-center rounded-full border border-slate-600 px-4 py-2 text-sm hover:bg-slate-900 transition"
          >
            Explore product risk
          </a>
        </div>
      </div>
    </main>
  );
}
