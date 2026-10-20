"use client";

import { useState, useEffect } from "react";
import { generateReferralCode, getReferralFromUrl } from "@/lib/utils";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [refFrom, setRefFrom] = useState<string | null>(null);

  useEffect(() => {
    setRefFrom(getReferralFromUrl());
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || status === "loading") return;
    setStatus("loading");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), ref: refFrom }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setReferralCode(data.referralCode || generateReferralCode(email));
      setStatus("done");
    } catch {
      setReferralCode(generateReferralCode(email));
      setStatus("done");
    }
  }

  if (status === "done" && referralCode) {
    const shareUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}?ref=${referralCode}`
        : `https://quantumforge.app?ref=${referralCode}`;

    return (
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5 text-center space-y-3">
        <p className="text-emerald-400 font-medium">You&apos;re on the list</p>
        <p className="text-sm text-forge-muted">
          Your invite link \u2014 share to move up the queue
        </p>
        <code className="block text-xs sm:text-sm bg-black/40 rounded-lg px-3 py-2.5 break-all text-forge-glow font-mono">
          {shareUrl}
        </code>
        <button
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(shareUrl);
            } catch {}
            if (navigator.share) {
              try {
                await navigator.share({
                  title: "QuantumForge",
                  text: "Join me on the QuantumForge waitlist \u2014 AI apps from prompts.",
                  url: shareUrl,
                });
              } catch {}
            }
          }}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-forge-accent hover:bg-forge-accent-dim text-white text-sm font-medium transition-colors"
        >
          Copy & share invite
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col sm:flex-row gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@company.com"
        className="flex-1 rounded-xl border border-forge-border bg-forge-surface px-4 py-3 text-sm placeholder:text-forge-muted focus:outline-none focus:border-forge-accent/60"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="px-6 py-3 rounded-xl bg-forge-accent hover:bg-forge-accent-dim disabled:opacity-50 text-white text-sm font-semibold transition-colors shrink-0"
      >
        {status === "loading" ? "Joining\u2026" : "Join waitlist"}
      </button>
    </form>
  );
}
