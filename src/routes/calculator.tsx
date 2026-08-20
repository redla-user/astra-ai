import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/astra/Shell";

export const Route = createFileRoute("/calculator")({
  head: () => ({
    meta: [
      { title: "Scientific Calculator — ASTRA" },
      {
        name: "description",
        content:
          "Scientific calculator console with powers, roots, logarithms, trigonometry and parentheses. Frontend demo functionality.",
      },
      { property: "og:title", content: "Scientific Calculator — ASTRA" },
      {
        property: "og:description",
        content: "Run quick scientific calculations inside the ASTRA laboratory.",
      },
    ],
  }),
  component: CalculatorPage,
});

type Key = { label: string; insert?: string; action?: "clear" | "back" | "equals"; kind?: string };

const keys: Key[] = [
  { label: "sin", insert: "sin(", kind: "fn" },
  { label: "cos", insert: "cos(", kind: "fn" },
  { label: "tan", insert: "tan(", kind: "fn" },
  { label: "ln", insert: "ln(", kind: "fn" },
  { label: "log", insert: "log(", kind: "fn" },

  { label: "√", insert: "sqrt(", kind: "fn" },
  { label: "xʸ", insert: "^", kind: "fn" },
  { label: "x²", insert: "^2", kind: "fn" },
  { label: "π", insert: "pi", kind: "fn" },
  { label: "e", insert: "e", kind: "fn" },

  { label: "(", insert: "(", kind: "op" },
  { label: ")", insert: ")", kind: "op" },
  { label: "C", action: "clear", kind: "danger" },
  { label: "⌫", action: "back", kind: "op" },
  { label: "÷", insert: "/", kind: "op" },

  { label: "7", insert: "7" },
  { label: "8", insert: "8" },
  { label: "9", insert: "9" },
  { label: "%", insert: "%", kind: "op" },
  { label: "×", insert: "*", kind: "op" },

  { label: "4", insert: "4" },
  { label: "5", insert: "5" },
  { label: "6", insert: "6" },
  { label: "!", insert: "!", kind: "op" },
  { label: "−", insert: "-", kind: "op" },

  { label: "1", insert: "1" },
  { label: "2", insert: "2" },
  { label: "3", insert: "3" },
  { label: "E", insert: "e", kind: "op" },
  { label: "+", insert: "+", kind: "op" },

  { label: "0", insert: "0" },
  { label: ".", insert: "." },
  { label: "±", insert: "-", kind: "op" },
  { label: "=", action: "equals", kind: "equals" },
];

function factorial(n: number): number {
  if (n < 0 || !Number.isInteger(n)) return NaN;
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}

function evaluateExpression(raw: string): string {
  // Handle factorial first (postfix, e.g. "5!" -> "factorial(5)")
  let expr = raw.replace(/(\d+(?:\.\d+)?)!/g, "factorial($1)");

  const js = expr
    .replace(/π|pi/g, "Math.PI")
    .replace(/\bE\b/g, "Math.E")
    .replace(/\be\b/g, "Math.E")
    .replace(/sqrt\(/g, "Math.sqrt(")
    .replace(/sin\(/g, "Math.sin(")
    .replace(/cos\(/g, "Math.cos(")
    .replace(/tan\(/g, "Math.tan(")
    .replace(/ln\(/g, "Math.log(")
    .replace(/log\(/g, "Math.log10(")
    .replace(/\^/g, "**")
    .replace(/(\d+(?:\.\d+)?)%/g, "($1/100)");

  if (!/^[0-9+\-*/(). MathPIEsqrtincoglwfactrial*]*$/.test(js.replace(/Math\.[a-z0-9]+/gi, ""))) {
    return "Error";
  }

  try {
    // eslint-disable-next-line no-new-func
    const result = Function(`"use strict"; return (${js});`)();
    if (typeof result !== "number" || !isFinite(result)) return "Error";
    return String(Number(result.toPrecision(12)));
  } catch {
    return "Error";
  }
}
}

const kindClass: Record<string, string> = {
  fn: "bg-surface-2 text-accent-foreground",
  op: "bg-secondary text-secondary-foreground",
  danger: "bg-secondary text-destructive",
  equals: "bg-primary text-primary-foreground col-span-2",
};

function CalculatorPage() {
  const [expr, setExpr] = useState("");
  const [result, setResult] = useState("0");
  const [history, setHistory] = useState<{ expr: string; value: string }[]>([
    { expr: "sqrt(2*6.674e-11*6.4e23/3.39e6)", value: "5017.6" },
    { expr: "-2.5*log(0.982)", value: "0.019708" },
  ]);

  function press(k: Key) {
    if (k.action === "clear") {
      setExpr("");
      setResult("0");
      return;
    }
    if (k.action === "back") {
      setExpr((e) => e.slice(0, -1));
      return;
    }
    if (k.action === "equals") {
      if (!expr) return;
      const value = evaluateExpression(expr);
      setResult(value);
      if (value !== "Error") setHistory((h) => [{ expr, value }, ...h].slice(0, 8));
      return;
    }
    setExpr((e) => e + (k.insert ?? ""));
  }

  return (
    <Shell
      title="Scientific Calculator"
      subtitle="Frontend-only calculation console. Factorials and ± are visual placeholders in this prototype."
    >
      <div className="grid gap-4 lg:grid-cols-5">
        <div className="panel p-5 lg:col-span-3 sm:p-6">
          <div className="rounded-md border border-border bg-background px-4 py-4">
            <input
              value={expr}
              onChange={(e) => setExpr(e.target.value)}
              placeholder="Type or use the keypad"
              className="w-full bg-transparent text-right font-mono text-sm text-muted-foreground outline-none"
            />
            <p className="mt-2 break-all text-right font-mono text-3xl text-foreground sm:text-4xl">
              {result}
            </p>
          </div>

          <div className="mt-5 grid grid-cols-5 gap-2">
            {keys.map((k) => (
              <button
                key={k.label}
                onClick={() => press(k)}
                className={`h-12 rounded-md border border-border font-mono text-sm transition-colors hover:border-primary/50 ${
                  kindClass[k.kind ?? ""] ?? "bg-surface-2 text-foreground"
                }`}
              >
                {k.label}
              </button>
            ))}
          </div>
        </div>

        <div className="panel p-5 lg:col-span-2 sm:p-6">
          <h2 className="text-base font-semibold">Calculation log</h2>
          <ul className="mt-5 space-y-3">
            {history.map((h, i) => (
              <li key={`${h.expr}-${i}`} className="rounded-md border border-border bg-surface-2 p-3">
                <p className="break-all font-mono text-xs text-muted-foreground">{h.expr}</p>
                <p className="mt-1 break-all font-mono text-sm text-primary">= {h.value}</p>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs text-muted-foreground">
            The first two entries are demo calculations from earlier investigations.
          </p>
        </div>
      </div>
    </Shell>
  );
}
