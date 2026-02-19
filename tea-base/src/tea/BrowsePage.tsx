import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

type TeaType =
  | "green"
  | "black"
  | "oolong"
  | "white"
  | "puerh"
  | "yellow"
  | "herbal";

const TEA_TYPE_LABELS: Record<TeaType, string> = {
  green: "Green",
  black: "Black",
  oolong: "Oolong",
  white: "White",
  puerh: "Pu-erh",
  yellow: "Yellow",
  herbal: "Herbal",
};

const TYPE_BADGE_CLASSES: Record<TeaType, string> = {
  green:
    "bg-emerald-100 text-emerald-900 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-100 dark:border-emerald-700",
  oolong:
    "bg-amber-100 text-amber-900 border-amber-200 dark:bg-amber-900/30 dark:text-amber-100 dark:border-amber-700",
  black:
    "bg-red-100 text-red-900 border-red-200 dark:bg-red-900/30 dark:text-red-100 dark:border-red-700",
  white:
    "bg-slate-100 text-slate-900 border-slate-200 dark:bg-slate-900/30 dark:text-slate-100 dark:border-slate-700",
  puerh:
    "bg-amber-200 text-amber-900 border-amber-300 dark:bg-amber-950/40 dark:text-amber-100 dark:border-amber-800",
  yellow:
    "bg-yellow-100 text-yellow-900 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-100 dark:border-yellow-700",
  herbal:
    "bg-fuchsia-100 text-fuchsia-900 border-fuchsia-200 dark:bg-fuchsia-900/30 dark:text-fuchsia-100 dark:border-fuchsia-700",
};

const TYPE_PILLS: ({ value: TeaType | "all"; label: string })[] = [
  { value: "all", label: "All" },
  { value: "green", label: "Green" },
  { value: "oolong", label: "Oolong" },
  { value: "black", label: "Black" },
  { value: "white", label: "White" },
  { value: "puerh", label: "Pu-erh" },
  { value: "yellow", label: "Yellow" },
  { value: "herbal", label: "Herbal" },
];

function caffeineDots(level: string) {
  const normalized = level.toLowerCase();
  const total = 3;
  const filled =
    normalized === "none" ? 0 : normalized === "low" ? 1 : normalized === "medium" ? 2 : 3;

  return (
    <div className="flex items-center gap-1">
      {[...Array(total)].map((_, i) => (
        <span
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          className={`h-1.5 w-1.5 rounded-full ${
            i < filled ? "bg-amber-600" : "bg-amber-200 dark:bg-amber-900"
          }`}
        />
      ))}
    </div>
  );
}

export function TeaBrowsePage() {
  const [activeType, setActiveType] = useState<TeaType | "all">("all");
  const [search, setSearch] = useState("");

  const teas = useQuery(api.teas.list);
  const searchResults = useQuery(
    api.teas.search,
    search.trim().length > 0 ? { searchQuery: search } : "skip",
  );

  const isLoading = !teas || (search.trim() && searchResults === undefined);

  const displayedTeas = useMemo(() => {
    const base =
      search.trim().length > 0 && Array.isArray(searchResults)
        ? searchResults
        : teas ?? [];

    if (activeType === "all") return base;
    return base.filter((t) => t.type === activeType);
  }, [activeType, search, teas, searchResults]);

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center py-16">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-amber-300 border-t-amber-700" />
          <p className="text-sm text-slate-500">
            Warming the kettle and loading your teas…
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          Tea Base
        </h1>
        <p className="text-sm text-slate-500">
          A warm, living notebook for the teas you love — and the ones you
          haven&apos;t met yet.
        </p>
      </section>

      <section className="space-y-4 rounded-xl border border-amber-100 bg-amber-50/60 p-3 shadow-sm shadow-amber-100 dark:border-amber-900/40 dark:bg-amber-950/20 dark:shadow-amber-900/20">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <input
              type="search"
              placeholder="Search by tea name…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full border border-amber-100 bg-white/80 px-4 py-2 text-sm shadow-sm outline-none ring-0 placeholder:text-slate-400 focus:border-amber-300 focus:bg-white focus:ring-2 focus:ring-amber-200 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-50 dark:placeholder:text-amber-300 dark:focus:border-amber-500 dark:focus:ring-amber-700"
            />
          </div>
          <p className="text-xs text-slate-500 dark:text-amber-200">
            Start with a feeling:{" "}
            <span className="italic">calm, roasty, floral…</span>
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {TYPE_PILLS.map((pill) => (
            <button
              key={pill.value}
              type="button"
              onClick={() =>
                setActiveType(pill.value === "all" ? "all" : (pill.value as TeaType))
              }
              className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                activeType === pill.value
                  ? "border-amber-500 bg-amber-600 text-amber-50 shadow-sm shadow-amber-400/60 dark:border-amber-400 dark:bg-amber-500"
                  : "border-amber-100 bg-amber-50 text-amber-900 hover:border-amber-300 hover:bg-amber-100 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-100 dark:hover:border-amber-700 dark:hover:bg-amber-900/40"
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>
      </section>

      {displayedTeas.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-slate-300 bg-white/60 p-6 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-300">
          Nothing matches this mood yet. Try clearing filters or adjusting your
          search.
        </div>
      ) : (
        <section>
          <div className="mb-3 flex items-center justify-between text-xs text-slate-500">
            <span>{displayedTeas.length} teas</span>
            {activeType !== "all" && (
              <span>
                Filtered by{" "}
                <span className="font-medium">
                  {TEA_TYPE_LABELS[activeType as TeaType]}
                </span>
              </span>
            )}
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {displayedTeas.map((tea) => (
              <Link
                key={tea._id}
                to={`/tea/${tea.slug}`}
                className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-amber-300 hover:shadow-md hover:shadow-amber-100/70 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-amber-700 dark:hover:bg-slate-900"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
                  <img
                    src={tea.imageUrl}
                    alt={tea.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent" />
                  <div className="pointer-events-none absolute bottom-2 left-2 flex flex-wrap gap-1 text-[10px] font-medium text-amber-50">
                    <span
                      className={`rounded-full border px-2 py-0.5 backdrop-blur-sm ${TYPE_BADGE_CLASSES[tea.type as TeaType]}`}
                    >
                      {TEA_TYPE_LABELS[tea.type as TeaType]}
                    </span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-2 p-3">
                  <div>
                    <h2 className="text-sm font-semibold leading-snug text-slate-900 dark:text-slate-50">
                      {tea.name}
                    </h2>
                    <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                      {tea.nameNative}
                    </p>
                  </div>
                  <div className="mt-auto flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                    <span>
                      {tea.origin.region}, {tea.origin.country}
                    </span>
                    <div className="flex items-center gap-1">
                      {caffeineDots(tea.caffeineLevel)}
                      <span className="capitalize">
                        {tea.caffeineLevel.toLowerCase()}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

