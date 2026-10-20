"use client";

import { useState } from "react";

export function ShareButton({
  title = "QuantumForge \u2014 AI Application Generator",
  text = "Turn prompts into production apps. Join the waitlist:",
  url,
}: {
  title?: string;
  text?: string;
  url?: string;
}) {
  const [copied, setCopied] = useState(false);
  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "https://quantumforge.app");

  async function share() {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, text, url: shareUrl });
        return;
      } catch {
        /* user cancelled or not supported */
      }
    }
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }

  return (
    <button
      onClick={share}
      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-forge-border bg-forge-surface hover:border-forge-accent/50 text-sm font-medium transition-colors active:scale-[0.98]"
    >
      {copied ? "Link copied" : "Share"}
    </button>
  );
}
