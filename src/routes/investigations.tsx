import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/astra/Shell";
import { demoInvestigations, type Investigation } from "@/lib/demo-data";

export const Route = createFileRoute("/investigations")({
  head: () => ({
    meta: [
      { title: "Investigations — ASTRA" },
      {
        name: "description",
        content:
          "Open scientific investigations with observations, calculations, hypotheses, predictions and status. Demo data only.",
      },
      { property: "og:title", content: "Investigations — ASTRA" },
      {
        property: "og:description",
        content: "Track open questions the research agent is working through.",
      },
    ],
  }),
  component: InvestigationsPage,
});

const statusClass: Record<Investigation["status"], string> = {
  Active: "border-signal/50 text-signal",
  Paused: "border-warn/50 text-warn",
  Concluded: "border-border text-muted-foreground",
};

function InvestigationsPage() {
  const [selectedId, setSelectedId] = useState(demoInvestigations[0]!.id);
  const selected = demoInvestigations.find((i) => i.id === selectedId)!;

  return (
    <Shell
      title="Investigations"
      subtitle="Structured research threads. Each demo investigation records observations, calculations, hypotheses and predictions."
    >
      <div className="grid gap-4 lg:grid-cols-5">
        <div className="space-y-3 lg:col-span-2">
          {demoInvestigations.map((inv) => (
            <button
              key={inv.id}
              onClick={() => setSelectedId(inv.id)}
              className={`panel w-full p-4 text-left transition-colors ${
                inv.id === selectedId ? "border-primary/60" : "hover:border-primary/30"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[11px] text-muted-foreground">{inv.id}</span>
                <span
                  className={`rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] ${statusClass[inv.status]}`}
                >
                  {inv.status}
                </span>
              </div>
              <p className="mt-2 text-sm leading-snug text-foreground">{inv.question}</p>
              <p className="label-mono mt-2">Updated {inv.updatedAt}</p>
            </button>
          ))}
        </div>

        <article className="panel p-5 lg:col-span-3 sm:p-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="label-mono">{selected.id}</span>
            <span
              className={`rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] ${statusClass[selected.status]}`}
            >
              {selected.status}
            </span>
            <span className="label-mono ml-auto">Updated {selected.updatedAt}</span>
          </div>

          <h2 className="mt-4 font-display text-xl leading-snug text-foreground">
            {selected.question}
          </h2>

          <Section title="Observations" items={selected.observations} />
          <Section title="Calculations" items={selected.calculations} mono />
          <Section title="Hypotheses" items={selected.hypotheses} />
          <Section title="Predictions" items={selected.predictions} />

          <p className="mt-8 border-t border-border pt-4 text-xs text-muted-foreground">
            Demo investigation record — no data is stored or computed in this prototype.
          </p>
        </article>
      </div>
    </Shell>
  );
}

function Section({ title, items, mono }: { title: string; items: string[]; mono?: boolean }) {
  return (
    <section className="mt-7">
      <h3 className="label-mono">{title}</h3>
      <ul className="mt-3 space-y-2">
        {items.map((it) => (
          <li
            key={it}
            className={`rounded-md border border-border bg-surface-2 px-3 py-2.5 text-sm leading-relaxed ${
              mono ? "font-mono text-xs text-primary" : "text-foreground"
            }`}
          >
            {it}
          </li>
        ))}
      </ul>
    </section>
  );
}
