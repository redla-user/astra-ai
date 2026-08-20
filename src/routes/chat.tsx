import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { SendHorizonal, Atom, User } from "lucide-react";
import { Shell } from "@/components/astra/Shell";
import { demoConversation, toolStatuses, type DemoMessage } from "@/lib/demo-data";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "Chat — ASTRA Scientific Research Agent" },
      {
        name: "description",
        content:
          "Conversational console for the ASTRA research agent, with live tool and status indicators. Frontend prototype with demo responses.",
      },
      { property: "og:title", content: "Chat — ASTRA" },
      {
        property: "og:description",
        content: "Talk to the ASTRA research agent about mathematics, physics and astronomy.",
      },
    ],
  }),
  component: ChatPage,
});

function ChatPage() {
  const [messages, setMessages] = useState<DemoMessage[]>(demoConversation);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, status]);

  function send() {
    const text = input.trim();
    if (!text || status) return;
    setMessages((m) => [...m, { id: `u-${Date.now()}`, role: "user", content: text }]);
    setInput("");

    let step = 0;
    setStatus(toolStatuses[0]!);
    const timer = setInterval(() => {
      step += 1;
      if (step < toolStatuses.length) {
        setStatus(toolStatuses[step]!);
      } else {
        clearInterval(timer);
        setStatus(null);
        setMessages((m) => [
          ...m,
          {
            id: `a-${Date.now()}`,
            role: "astra",
            content:
              "Demo response — no model is connected in this prototype. Once the research agent is wired up, ASTRA will reason step by step, run calculations, cite the sources it inspected and store a scientific memory when a result is worth keeping.",
            tools: [...toolStatuses],
          },
        ]);
      }
    }, 750);
  }

  return (
    <Shell
      title="Chat"
      subtitle="Conversational interface with the ASTRA research agent. Responses are static demo text."
    >
      <div className="panel flex h-[calc(100vh-19rem)] min-h-[28rem] flex-col overflow-hidden">
        <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
          <span className="label-mono">Session · demo-0417</span>
          <span className="label-mono">Scope: math · physics · astronomy · space</span>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto px-4 py-6 sm:px-6">
          {messages.map((m) => (
            <Message key={m.id} message={m} />
          ))}

          {status && (
            <div className="flex gap-3">
              <Avatar role="astra" />
              <div className="flex items-center gap-2 rounded-md border border-border bg-surface-2 px-3 py-2">
                <span className="dot-pulse h-1.5 w-1.5 rounded-full bg-primary" />
                <span className="font-mono text-xs text-primary">{status}</span>
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        <div className="border-t border-border bg-surface-2/60 p-3 sm:p-4">
          <div className="flex items-end gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              rows={2}
              placeholder="Ask about a derivation, an orbit, a light curve…"
              className="min-h-[3rem] flex-1 resize-none rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary/60"
            />
            <button
              onClick={send}
              disabled={!input.trim() || !!status}
              className="flex h-11 items-center gap-2 rounded-md bg-primary px-4 font-mono text-xs uppercase tracking-[0.14em] text-primary-foreground transition-opacity disabled:opacity-40"
            >
              Send
              <SendHorizonal className="h-3.5 w-3.5" />
            </button>
          </div>
          <p className="label-mono mt-2">Enter to send · Shift+Enter for a new line</p>
        </div>
      </div>
    </Shell>
  );
}

function Avatar({ role }: { role: DemoMessage["role"] }) {
  return (
    <span
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border ${
        role === "astra" ? "bg-surface-2 text-primary" : "bg-secondary text-secondary-foreground"
      }`}
    >
      {role === "astra" ? <Atom className="h-4 w-4" /> : <User className="h-4 w-4" />}
    </span>
  );
}

function Message({ message }: { message: DemoMessage }) {
  const isUser = message.role === "user";
  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
      <Avatar role={message.role} />
      <div className={`max-w-[46rem] ${isUser ? "text-right" : ""}`}>
        <span className="label-mono">{isUser ? "Researcher" : "ASTRA"}</span>
        <div
          className={`mt-1.5 rounded-md border px-4 py-3 text-sm leading-relaxed ${
            isUser
              ? "border-border bg-secondary text-secondary-foreground"
              : "border-border bg-surface-2 text-foreground"
          }`}
        >
          {message.content}
        </div>
        {message.tools && (
          <div className={`mt-2 flex flex-wrap gap-1.5 ${isUser ? "justify-end" : ""}`}>
            {message.tools.map((t) => (
              <span
                key={t}
                className="rounded border border-border bg-background px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
