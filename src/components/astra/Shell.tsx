import { Link } from "@tanstack/react-router";
import {
  Atom,
  Calculator,
  FlaskConical,
  Globe2,
  LayoutDashboard,
  MessageSquare,
  Brain,
} from "lucide-react";
import type { ReactNode } from "react";

const nav = [
  { to: "/", label: "Home", icon: LayoutDashboard },
  { to: "/chat", label: "Chat", icon: MessageSquare },
  { to: "/research", label: "Research", icon: Globe2 },
  { to: "/memory", label: "Memory", icon: Brain },
  { to: "/calculator", label: "Calculator", icon: Calculator },
  { to: "/investigations", label: "Investigations", icon: FlaskConical },
] as const;

export function Shell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="glow flex h-8 w-8 items-center justify-center rounded-md bg-surface-2">
              <Atom className="h-4 w-4 text-primary" />
            </span>
            <span className="font-display text-lg font-semibold tracking-[0.22em] text-foreground">
              ASTRA
            </span>
          </Link>
          <span className="label-mono hidden sm:inline">Research Laboratory</span>
          <span className="ml-auto flex items-center gap-2">
            <span className="dot-pulse h-1.5 w-1.5 rounded-full bg-signal" />
            <span className="label-mono">Prototype · demo data</span>
          </span>
        </div>

        <nav className="mx-auto max-w-7xl overflow-x-auto px-2 sm:px-6">
          <ul className="flex min-w-max items-center gap-1 pb-2">
            {nav.map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <Link
                  to={to}
                  activeOptions={{ exact: to === "/" }}
                  activeProps={{
                    className:
                      "border-primary/50 bg-accent text-accent-foreground",
                  }}
                  inactiveProps={{
                    className: "border-transparent text-muted-foreground hover:bg-surface-2",
                  }}
                  className="flex items-center gap-2 rounded-md border px-3 py-1.5 font-mono text-xs uppercase tracking-[0.12em] transition-colors"
                >
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold sm:text-3xl">{title}</h1>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{subtitle}</p>
        </div>
        {children}
      </main>

      <footer className="mx-auto max-w-7xl px-4 pb-10 sm:px-6">
        <p className="label-mono border-t border-border pt-4">
          ASTRA frontend prototype — all values shown are demo placeholders
        </p>
      </footer>
    </div>
  );
}
