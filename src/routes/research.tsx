import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Globe2, ScanSearch } from "lucide-react";
import { Shell } from "@/components/astra/Shell";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Research — Source Inspection | ASTRA" },
      {
        name: "description",
        content:
          "Inspect a website and review source name, publisher, source type, scientific relevance, licence status and research status. Visual placeholders only.",
      },
      { property: "og:title", content: "Research — Source Inspection | ASTRA" },
      {
        property: "og:description",
        content: "Evaluate the credibility and licence of a scientific web source.",
      },
    ],
  }),
  component: ResearchPage,
});

const placeholderReport = {
  "Source name": "Open Astronomy Survey Archive",
  Publisher: "Demo Institute for Observational Astronomy",
  "Source type": "Primary data archive",
  "Scientific relevance": "High — peer-reviewed observational datasets",
  "License / usage": "CC BY 4.0 — attribution required",
  "Research status": "Queued for extraction",
};

const recent = [
  { url: "open-astronomy-archive.example", type: "Data archive", state: "Indexed" },
  { url: "mathematics-preprints.example", type: "Preprint server", state: "Reviewing" },
  { url: "physics-lecture-notes.example", type: "Course material", state: "Indexed" },
  { url: "space-agency-mission.example", type: "Mission page", state: "Queued" },
];

function ResearchPage() {
  const [url, setUrl] = useState("");
  const [inspected, setInspected] = useState(false);

  return (
    <Shell
      title="Research"
      subtitle="Point ASTRA at a website to evaluate its provenance and usability. This panel is a visual placeholder — nothing is fetched."
    >
      <div className="grid gap-4 lg:grid-cols-5">
        <div className="space-y-4 lg:col-span-3">
          <div className="panel p-5 sm:p-6">
            <span className="label-mono">Source URL</span>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <div className="flex flex-1 items-center gap-2 rounded-md border border-input bg-background px-3">
                <Globe2 className="h-4 w-4 shrink-0 text-muted-foreground" />
                <input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://open-astronomy-archive.example/survey"
                  className="h-11 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>
              <button
                onClick={() => setInspected(true)}
                className="flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-4 font-mono text-xs uppercase tracking-[0.14em] text-primary-foreground"
              >
                <ScanSearch className="h-4 w-4" />
                Inspect Source
              </button>
            </div>
          </div>

          <div className="panel p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold">Inspection report</h2>
              <span className="label-mono">{inspected ? "Demo result" : "Awaiting input"}</span>
            </div>
            <dl className="mt-5 divide-y divide-border">
              {Object.entries(placeholderReport).map(([k, v]) => (
                <div key={k} className="grid gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="label-mono sm:col-span-1">{k}</dt>
                  <dd
                    className={`text-sm sm:col-span-2 ${
                      inspected ? "text-foreground" : "text-muted-foreground/50"
                    }`}
                  >
                    {inspected ? v : "—"}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="panel p-5 sm:p-6 lg:col-span-2">
          <h2 className="text-base font-semibold">Recently inspected</h2>
          <ul className="mt-5 space-y-3">
            {recent.map((r) => (
              <li
                key={r.url}
                className="rounded-md border border-border bg-surface-2 px-3 py-3"
              >
                <p className="font-mono text-xs text-foreground">{r.url}</p>
                <p className="label-mono mt-1.5">
                  {r.type} · {r.state}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs text-muted-foreground">
            Demo entries. Source fetching and licence checks are not implemented in this prototype.
          </p>
        </div>
      </div>
    </Shell>
  );
}
