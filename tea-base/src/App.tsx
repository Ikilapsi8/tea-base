"use client";

import { Authenticated, Unauthenticated, useConvexAuth } from "convex/react";
import { api } from "../convex/_generated/api";
import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <>
      <header className="sticky top-0 z-10 bg-light dark:bg-dark p-4 border-b-2 border-slate-200 dark:border-slate-800">
        Tea Base
        <SignOutButton />
      </header>
      <main className="p-4 sm:p-6">
        <Authenticated>
          <div className="mx-auto flex max-w-5xl flex-col gap-8">
            <Outlet />
          </div>
        </Authenticated>
        <Unauthenticated>
          <SignInForm />
        </Unauthenticated>
      </main>
    </>
  );
}

function SignOutButton() {
  const { isAuthenticated } = useConvexAuth();
  const { signOut } = useAuthActions();
  return (
    <>
      {isAuthenticated && (
        <button
          className="bg-slate-200 dark:bg-slate-800 text-dark dark:text-light rounded-md px-2 py-1"
          onClick={() => void signOut()}
        >
          Sign out
        </button>
      )}
    </>
  );
}

function SignInForm() {
  const { signIn } = useAuthActions();
  const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
  const [error, setError] = useState<string | null>(null);
  return (
    <div className="flex flex-col gap-8 w-full max-w-md mx-auto py-16">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">
          Tea Base
        </h1>
        <p className="text-sm text-slate-500">
          Log in to save your tastings, collections, and tea memories.
        </p>
      </div>
      <form
        className="flex flex-col gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          formData.set("flow", flow);
          void signIn("password", formData).catch((error) => {
            setError(error.message);
          });
        }}
      >
        <input
          className="bg-light dark:bg-dark text-dark dark:text-light rounded-md p-2 border-2 border-slate-200 dark:border-slate-800"
          type="email"
          name="email"
          placeholder="Email"
        />
        <input
          className="bg-light dark:bg-dark text-dark dark:text-light rounded-md p-2 border-2 border-slate-200 dark:border-slate-800"
          type="password"
          name="password"
          placeholder="Password"
        />
        <button
          className="bg-dark dark:bg-light text-light dark:text-dark rounded-md"
          type="submit"
        >
          {flow === "signIn" ? "Sign in" : "Sign up"}
        </button>
        <div className="flex flex-row gap-2">
          <span>
            {flow === "signIn"
              ? "Don't have an account?"
              : "Already have an account?"}
          </span>
          <span
            className="text-dark dark:text-light underline hover:no-underline cursor-pointer"
            onClick={() => setFlow(flow === "signIn" ? "signUp" : "signIn")}
          >
            {flow === "signIn" ? "Sign up instead" : "Sign in instead"}
          </span>
        </div>
        {error && (
          <div className="bg-red-500/20 border-2 border-red-500/50 rounded-md p-2">
            <p className="text-dark dark:text-light font-mono text-xs">
              Error signing in: {error}
            </p>
          </div>
        )}
      </form>
    </div>
  );
}

function Content() {
  // Core tea queries from Convex
  const teas = useQuery(api.teas.list);
  const featuredTea = useQuery(api.teas.getBySlug, { slug: "long-jing" });
  const greenTeas = useQuery(api.teas.listByType, { type: "green" });
  const searchResults = useQuery(api.teas.search, {
    searchQuery: "dragon",
  });

  // While any of the queries are loading, Convex returns undefined
  if (!teas || !featuredTea || !greenTeas || !searchResults) {
    return (
      <div className="mx-auto text-center py-16">
        <p className="text-lg">Steeping your teas…</p>
        <p className="text-sm text-slate-500">
          Fetching tea stories and tasting notes from the cloud.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-12 max-w-4xl mx-auto">
      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">All teas</h2>
        <p className="text-sm text-slate-500">
          Browse everything in your Tea Base collection.
        </p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {teas.map((t) => (
            <li
              key={t._id}
              className="rounded-lg border border-slate-200 dark:border-slate-800 p-3"
            >
              <div className="font-medium">{t.name}</div>
              <div className="text-xs text-slate-500">
                {t.origin.country} · {t.type}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Featured tea</h2>
        <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-4 dark:border-amber-900/60 dark:bg-amber-900/20">
          <div className="text-lg font-semibold">{featuredTea.name}</div>
          <div className="text-xs uppercase tracking-wide text-amber-700 dark:text-amber-200 mt-1">
            {featuredTea.origin.country} · {featuredTea.type}
          </div>
          <p className="mt-3 text-sm leading-relaxed">
            {featuredTea.culturalContext}
          </p>
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Green teas</h2>
        <p className="text-sm text-slate-500">
          Calm, focused energy and fresh, verdant profiles.
        </p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {greenTeas.map((t) => (
            <li
              key={t._id}
              className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-900 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-100"
            >
              {t.name}
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Search: “dragon”</h2>
        <p className="text-sm text-slate-500">
          A tiny glimpse of how search will feel in Tea Base.
        </p>
        {searchResults.length === 0 ? (
          <p className="text-sm text-slate-500 italic">
            No teas found yet – try seeding your database.
          </p>
        ) : (
          <ul className="mt-3 space-y-1">
            {searchResults.map((t) => (
              <li key={t._id} className="text-sm">
                {t.name}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function ResourceCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <div className="flex flex-col gap-2 bg-slate-200 dark:bg-slate-800 p-4 rounded-md h-28 overflow-auto">
      <a href={href} className="text-sm underline hover:no-underline">
        {title}
      </a>
      <p className="text-xs">{description}</p>
    </div>
  );
}
