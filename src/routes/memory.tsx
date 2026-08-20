import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Shell } from "@/components/astra/Shell";
import { demoMemories, memoryCategories, type MemoryCategory } from "@/lib/demo-data";

export const Route = createFileRoute("/memory")({
  head: () => ({
    meta: [
      { title: "Scientific Memory — ASTRA" },
      {
        name: "description",
        content:
          "Searchable index of ASTRA's scientific memories across mathematics, physics, astronomy, space, methods and hypotheses.",
      },
      { property: "og:title", content: "Scientific Memory — ASTRA" },
      {
        property: "og:description",
        content: "Browse what the research agent has learned, with source and confidence.",
      },
    ],
  }),
  component: MemoryPage,
});

function MemoryPage() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<MemoryCategory | "All">("All");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return demoMemories.filter(
      (m) =>
        (active === "All" || m.category === active) &&
        (!q ||
          m.title.toLowerCase().includes(q) ||
          m.description.toLowerCase().includes(q) ||
          m.source.toLowerCase().includes(q)),
    );
  }, [query, active]);

  return (
    <Shell
      title="Scientific Memory"
      subtitle="Everything ASTRA has retained, with provenance and confidence. All entries below are demo data."
    >
      <div className="panel mb-6 p-4 sm:p-5">
        <div className="flex items-center gap-2 rounded-md border border-input bg-background px-3">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search memories, sources, concepts…"
            className="h-11 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {(["All", ...memoryCategories] as const).map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors ${
                active === c
                  ? "border-primary/60 bg-accent text-accent-foreground"
                  : "border-border text-muted-foreground hover:bg-surface-2"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <p className="label-mono mb-4">
        {results.length} memor{results.length === 1 ? "y" : "ies"} · demo dataset
      </p>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {results.map((m) => (
          <article key={m.id} className="panel flex flex-col p-5">
            <div className="flex items-center justify-between gap-2">
              <span className="rounded border border-border bg-surface-2 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-accent-foreground">
                {m.category}
              </span>
              <span className="font-mono text-[11px] text-muted-foreground">{m.learnedAt}</span>
            </div>
            <h2 className="mt-3 text-sm font-semibold leading-snug text-foreground">{m.title}</h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
              {m.description}
            </p>
            <div className="mt-4 border-t border-border pt-3">
              <p className="label-mono">Source</p>
              <p className="mt-1 text-xs text-foreground">{m.source}</p>
              <div className="mt-3 flex items-center gap-3">
                <div className="h-1 flex-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${Math.round(m.confidence * 100)}%` }}
                  />
                </div>
                <span className="font-mono text-[11px] text-primary">
                  {Math.round(m.confidence * 100)}%
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {results.length === 0 && (
        <div className="panel p-10 text-center text-sm text-muted-foreground">
          No demo memories match that query.
        </div>
      )}
    </Shell>
  );
}
