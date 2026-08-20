import { createFileRoute, Link } from "@tanstack/react-router";
import { Brain, Calculator, FlaskConical, Globe2, Target } from "lucide-react";
import { Shell } from "@/components/astra/Shell";
import { demoActivity, demoInvestigations, demoMemories } from "@/lib/demo-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ASTRA — Personal Scientific AI Research Laboratory" },
      {
        name: "description",
        content:
          "ASTRA dashboard: mission, scientific memories, investigations, research sources and calculations in one dark research console.",
      },
      { property: "og:title", content: "ASTRA — Scientific AI Research Laboratory" },
      {
        property: "og:description",
        content:
          "A dark, focused research console for mathematics, physics, astronomy and the universe.",
      },
    ],
  }),
  component: Home,
});

const stats = [
  {
    label: "Scientific Memories",
    value: demoMemories.length,
    hint: "6 categories indexed",
    icon: Brain,
    to: "/memory" as const,
  },
  {
    label: "Investigations",
    value: demoInvestigations.length,
    hint: "2 active · 1 paused",
    icon: FlaskConical,
    to: "/investigations" as const,
  },
  {
    label: "Research Sources",
    value: 12,
    hint: "9 open-licence",
    icon: Globe2,
    to: "/research" as const,
  },
  {
    label: "Calculations",
    value: 148,
    hint: "last 30 days",
    icon: Calculator,
    to: "/calculator" as const,
  },
];

const kindColor: Record<string, string> = {
  memory: "bg-primary",
  research: "bg-plasma",
  calc: "bg-warn",
  investigation: "bg-signal",
};

function Home() {
  return (
    <Shell
      title="Laboratory Dashboard"
      subtitle="Operational overview of the ASTRA research agent. All figures below are demo placeholders."
    >
      <section className="panel scan-line relative mb-8 overflow-hidden p-6 sm:p-8">
        <div className="flex items-center gap-2">
          <Target className="h-4 w-4 text-primary" />
          <span className="label-mono">Current mission</span>
        </div>
        <p className="mt-4 max-w-3xl font-display text-xl leading-relaxed text-foreground sm:text-2xl">
          “Understand mathematics and physics and investigate unclear or potentially new phenomena
          in the universe.”
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {["Mathematics", "Physics", "Astronomy", "Space", "Cosmology"].map((d) => (
            <span
              key={d}
              className="rounded-full border border-border bg-surface-2 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground"
            >
              {d}
            </span>
          ))}
        </div>
      </section>

      <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, hint, icon: Icon, to }) => (
          <Link
            key={label}
            to={to}
            className="panel group p-5 transition-colors hover:border-primary/50"
          >
            <div className="flex items-start justify-between">
              <span className="label-mono">{label}</span>
              <Icon className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
            </div>
            <p className="mt-4 font-mono text-3xl font-medium text-foreground">{value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
          </Link>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-5">
        <div className="panel p-6 lg:col-span-3">
          <h2 className="text-base font-semibold">Activity timeline</h2>
          <ol className="mt-5 space-y-0">
            {demoActivity.map((e, i) => (
              <li key={e.id} className="relative flex gap-4 pb-6 last:pb-0">
                <div className="flex flex-col items-center">
                  <span className={`mt-1.5 h-2 w-2 rounded-full ${kindColor[e.kind]}`} />
                  {i < demoActivity.length - 1 && (
                    <span className="mt-1 w-px flex-1 bg-border" aria-hidden="true" />
                  )}
                </div>
                <div className="-mt-0.5">
                  <p className="text-sm text-foreground">{e.label}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{e.detail}</p>
                </div>
                <span className="ml-auto font-mono text-[11px] text-muted-foreground">
                  {e.time}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="panel p-6 lg:col-span-2">
          <h2 className="text-base font-semibold">Latest memories</h2>
          <ul className="mt-5 space-y-4">
            {demoMemories.slice(-4).reverse().map((m) => (
              <li key={m.id} className="border-b border-border pb-4 last:border-0 last:pb-0">
                <p className="text-sm leading-snug text-foreground">{m.title}</p>
                <p className="label-mono mt-1.5">
                  {m.category} · confidence {Math.round(m.confidence * 100)}%
                </p>
              </li>
            ))}
          </ul>
          <Link
            to="/memory"
            className="mt-5 inline-block font-mono text-xs uppercase tracking-[0.14em] text-primary hover:underline"
          >
            Open memory index →
          </Link>
        </div>
      </section>
    </Shell>
  );
}
