import { Link, useParams } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

function formatSteepTime(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins === 0) return `${secs}s`;
  return `${mins}m ${secs.toString().padStart(2, "0")}s`;
}

export function TeaDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const tea = useQuery(
    api.teas.getBySlug,
    slug ? { slug } : "skip",
  );

  if (!slug) {
    return (
      <div className="py-12">
        <p className="text-sm text-slate-500">No tea selected.</p>
      </div>
    );
  }

  if (tea === undefined) {
    return (
      <div className="flex flex-1 items-center justify-center py-16">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-amber-300 border-t-amber-700" />
          <p className="text-sm text-slate-500">
            Steeping the details for this tea…
          </p>
        </div>
      </div>
    );
  }

  if (!tea) {
    return (
      <div className="py-12 space-y-4">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm text-amber-700 hover:text-amber-900 dark:text-amber-300 dark:hover:text-amber-100"
        >
          ← Back to all teas
        </Link>
        <div className="rounded-xl border border-dashed border-slate-300 bg-white/60 p-6 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-300">
          We couldn&apos;t find that tea. It may have been renamed or removed.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        to="/"
        className="inline-flex items-center gap-1 text-sm text-amber-700 hover:text-amber-900 dark:text-amber-300 dark:hover:text-amber-100"
      >
        ← Back to all teas
      </Link>

      <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="md:w-1/2">
            <div className="relative h-64 w-full overflow-hidden bg-slate-100 md:h-full dark:bg-slate-900">
              <img
                src={tea.imageUrl}
                alt={tea.name}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">
            <header className="space-y-2">
              <p className="text-xs uppercase tracking-[0.2em] text-amber-700 dark:text-amber-300">
                Tea profile
              </p>
              <h1 className="text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
                {tea.name}
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-300">
                {tea.nameNative}
              </p>
              <div className="mt-2 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full bg-amber-100 px-3 py-1 text-amber-900 dark:bg-amber-900/40 dark:text-amber-100">
                  {tea.type}
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                  {tea.origin.region}, {tea.origin.country}
                </span>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-100">
                  Caffeine: {tea.caffeineLevel}
                </span>
              </div>
            </header>

            <section className="grid gap-4 rounded-xl bg-amber-50/70 p-4 text-sm md:grid-cols-2 dark:bg-amber-950/20">
              <div className="space-y-1">
                <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-800 dark:text-amber-200">
                  Brewing guide
                </h2>
                <p>
                  {tea.brewing.temperatureC}°C / {tea.brewing.temperatureF}°F
                </p>
                <p>Steep {formatSteepTime(tea.brewing.steepTimeSeconds)}</p>
                <p>Resteeps: {tea.brewing.resteeps}</p>
                <p>Ratio: {tea.brewing.ratio}</p>
              </div>
              <div className="space-y-1">
                <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-800 dark:text-amber-200">
                  Flavor & benefits
                </h2>
                <div className="flex flex-wrap gap-1">
                  {tea.flavor.map((note) => (
                    <span
                      key={note}
                      className="rounded-full bg-white/80 px-2 py-0.5 text-xs text-slate-700 shadow-sm dark:bg-slate-900/80 dark:text-slate-100"
                    >
                      {note}
                    </span>
                  ))}
                </div>
                {tea.benefits.length > 0 && (
                  <ul className="mt-1 list-disc space-y-0.5 pl-4 text-xs text-slate-600 dark:text-slate-300">
                    {tea.benefits.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            </section>

            <section className="space-y-3 text-sm leading-relaxed">
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-300">
                  Description
                </h2>
                <p className="mt-1 text-slate-700 dark:text-slate-100">
                  {tea.description}
                </p>
              </div>
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-300">
                  Cultural context
                </h2>
                <p className="mt-1 text-slate-700 dark:text-slate-100">
                  {tea.culturalContext}
                </p>
              </div>
              <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
                Provenance: {tea.provenance}
              </p>
            </section>
          </div>
        </div>
      </article>
    </div>
  );
}

