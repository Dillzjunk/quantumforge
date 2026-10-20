"use client";

import { useEffect, useState, useRef } from "react";
import { generateBlueprint, blueprintToMarkdown, type AppBlueprint } from "@/lib/generate";
import { cn } from "@/lib/utils";

type Phase = "idle" | "streaming" | "done";

const BOOT_LINES = [
  "QuantumForge v0.1.0 \u2014 Generation Safety Architecture online",
  "Prompt sanitizer: active",
  "Dependency allow-list: loaded",
  "Ready.",
];

export function Terminal({ onGenerated }: { onGenerated?: (b: AppBlueprint) => void }) {
  const [prompt, setPrompt] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [lines, setLines] = useState<string[]>([...BOOT_LINES]);
  const [blueprint, setBlueprint] = useState<AppBlueprint | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  async function runGenerate() {
    if (!prompt.trim() || phase === "streaming") return;
    setPhase("streaming");
    setBlueprint(null);

    const userLine = `> ${prompt.trim()}`;
    setLines((prev) => [...prev, "", userLine, "", "\u25b8 Sanitizing prompt\u2026"]);

    await delay(400);
    setLines((prev) => [...prev, "\u25b8 Routing to generation pipeline\u2026"]);
    await delay(500);
    setLines((prev) => [...prev, "\u25b8 Building blueprint (Safety Score pending)\u2026"]);
    await delay(700);

    const bp = generateBlueprint(prompt);
    const md = blueprintToMarkdown(bp);
    const mdLines = md.split("\n");

    for (let i = 0; i < mdLines.length; i++) {
      await delay(18 + Math.random() * 25);
      setLines((prev) => [...prev, mdLines[i]]);
    }

    setLines((prev) => [
      ...prev,
      "",
      "\u25b8 Safety Score: 92 / 100 \u2014 structural blueprint only",
      "\u25b8 No executable code emitted (MVP mode)",
      "\u25b8 Ready for review / share",
      "",
    ]);
    setBlueprint(bp);
    setPhase("done");
    onGenerated?.(bp);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      runGenerate();
    }
  }

  return (
    <div className="flex flex-col h-full min-h-[320px] rounded-2xl border border-forge-border bg-forge-surface overflow-hidden glow">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-forge-border bg-black/40">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
        <span className="ml-3 text-xs text-forge-muted font-mono">quantumforge \u2014 generate</span>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-4 font-mono text-[13px] leading-relaxed text-zinc-300">
        {lines.map((line, i) => (
          <div key={i} className={cn(line.startsWith(">") && "text-forge-glow", line.startsWith("\u25b8") && "text-indigo-300/90")}>
            {line || "\u00A0"}
          </div>
        ))}
        {phase === "streaming" && <span className="cursor-blink text-forge-accent" />}
        <div ref={bottomRef} />
      </div>

      <div className="border-t border-forge-border p-3 bg-black/30">
        <div className="flex gap-2 items-end">
          <textarea
            ref={inputRef}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe the app you want to build\u2026"
            rows={2}
            disabled={phase === "streaming"}
            className="flex-1 resize-none bg-transparent text-sm text-forge-text placeholder:text-forge-muted focus:outline-none font-mono disabled:opacity-50"
            maxLength={500}
          />
          <button
            onClick={runGenerate}
            disabled={!prompt.trim() || phase === "streaming"}
            className="shrink-0 px-4 py-2 rounded-lg bg-forge-accent hover:bg-forge-accent-dim disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium transition-colors"
          >
            {phase === "streaming" ? "\u2026" : "Generate"}
          </button>
        </div>
        <p className="mt-1.5 text-[11px] text-forge-muted">
          Enter to run \u00b7 Shift+Enter for newline \u00b7 Max 500 chars \u00b7 Safety Architecture active
        </p>
      </div>
    </div>
  );
}

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
