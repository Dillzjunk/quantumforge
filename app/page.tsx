"use client";

import { useEffect, useState } from "react";
import { Terminal } from "@/components/Terminal";
import { WaitlistForm } from "@/components/WaitlistForm";
import { ShareButton } from "@/components/ShareButton";
import type { AppBlueprint } from "@/lib/generate";

const TIERS = [
  { name: "Free", price: "$0", period: "", features: ["3 generations / mo", "1 deploy", "Community support", "Safety Gate review"], highlight: false },
  { name: "Pro", price: "$29", period: "/mo", features: ["50 generations", "10 deploys", "3 custom domains", "Priority generation", "Email support"], highlight: true },
  { name: "Team", price: "$79", period: "/mo", features: ["200 generations", "50 deploys", "10 seats", "SSO ready", "API access", "4h SLA"], highlight: false },
];

export default function HomePage() {
  const [lastBlueprint, setLastBlueprint] = useState<AppBlueprint | null>(null);
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/waitlist").then((r) => r.json()).then((d) => setWaitlistCount(typeof d.count === "number" ? d.count : null)).catch(() => {});
  }, []);

  return (
    <div className="min-h-dvh flex flex-col">
      <header className="sticky top-0 z-40 border-b border-forge-border/80 bg-forge-bg/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <a href="#" className="font-semibold tracking-tight text-lg glow-text">
            Quantum<span className="text-forge-accent">Forge</span>
          </a>
          <nav className="flex items-center gap-3 text-sm">
            <a href="#generate" className="text-forge-muted hover:text-forge-text hidden sm:inline">Generate</a>
            <a href="#pricing" className="text-forge-muted hover:text-forge-text hidden sm:inline">Pricing</a>
            <a href="#waitlist" className="px-3 py-1.5 rounded-lg bg-forge-accent/15 text-forge-glow border border-forge-accent/30 hover:bg-forge-accent/25 transition-colors">Waitlist</a>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="max-w-5xl mx-auto px-4 pt-12 pb-10 sm:pt-16 sm:pb-14 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-forge-border bg-forge-surface px-3 py-1 text-xs text-forge-muted mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Generation Safety Architecture · v0.1 MVP
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.15] mb-4">
            From prompt to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-forge-accent">production app</span>
          </h1>
          <p className="text-forge-muted text-base sm:text-lg max-w-xl mx-auto mb-8">
            QuantumForge turns natural language into structured, deployable application blueprints with safety gates, viral growth, and a cinematic terminal.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="#generate" className="px-6 py-3 rounded-xl bg-forge-accent hover:bg-forge-accent-dim text-white font-semibold text-sm transition-colors">Try the terminal</a>
            <ShareButton />
          </div>
          {waitlistCount !== null && waitlistCount > 0 && (
            <p className="mt-6 text-xs text-forge-muted">{waitlistCount.toLocaleString()} founders already on the list</p>
          )}
        </section>

        <section id="generate" className="max-w-3xl mx-auto px-4 pb-16">
          <div className="h-[420px] sm:h-[480px]">
            <Terminal onGenerated={setLastBlueprint} />
          </div>
          {lastBlueprint && (
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              <ShareButton title={`${lastBlueprint.name} — built with QuantumForge`} text={`I just generated an app blueprint: ${lastBlueprint.tagline}`} />
              <a href="#waitlist" className="inline-flex items-center px-5 py-2.5 rounded-xl bg-forge-accent hover:bg-forge-accent-dim text-white text-sm font-medium transition-colors">Unlock full generation</a>
            </div>
          )}
        </section>

        <section className="border-y border-forge-border bg-forge-surface/40 py-14">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-center mb-10">How it works</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { step: "01", title: "Describe", body: "Type what you want to build in plain English. The terminal sanitizes and routes your prompt." },
                { step: "02", title: "Generate", body: "A structured blueprint streams back — stack, features, pages, and safety notes. No unsafe code ships by default." },
                { step: "03", title: "Share & scale", body: "Invite founders with your referral link. Climb the waitlist. Unlock full generate to deploy when Pro opens." },
              ].map((item) => (
                <div key={item.step} className="rounded-2xl border border-forge-border bg-forge-bg p-5">
                  <div className="text-forge-accent font-mono text-sm mb-2">{item.step}</div>
                  <h3 className="font-semibold mb-1.5">{item.title}</h3>
                  <p className="text-sm text-forge-muted leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="max-w-5xl mx-auto px-4 py-14">
          <h2 className="text-xl sm:text-2xl font-semibold text-center mb-2">Pricing</h2>
          <p className="text-center text-forge-muted text-sm mb-10">Join the waitlist now — tiers unlock at launch</p>
          <div className="grid sm:grid-cols-3 gap-4">
            {TIERS.map((tier) => (
              <div key={tier.name} className={`rounded-2xl border p-6 flex flex-col ${tier.highlight ? "border-forge-accent/50 bg-forge-accent/5 glow" : "border-forge-border bg-forge-surface"}`}>
                <div className="text-sm text-forge-muted mb-1">{tier.name}</div>
                <div className="flex items-baseline gap-0.5 mb-4">
                  <span className="text-3xl font-bold">{tier.price}</span>
                  <span className="text-forge-muted text-sm">{tier.period}</span>
                </div>
                <ul className="space-y-2 text-sm text-forge-muted flex-1 mb-6">
                  {tier.features.map((f) => (
                    <li key={f} className="flex gap-2"><span className="text-forge-accent shrink-0">✓</span>{f}</li>
                  ))}
                </ul>
                <a href="#waitlist" className={`block text-center py-2.5 rounded-xl text-sm font-medium transition-colors ${tier.highlight ? "bg-forge-accent hover:bg-forge-accent-dim text-white" : "border border-forge-border hover:border-forge-accent/40"}`}>Join waitlist</a>
              </div>
            ))}
          </div>
        </section>

        <section id="waitlist" className="border-t border-forge-border bg-forge-surface/30 py-14">
          <div className="max-w-lg mx-auto px-4 text-center">
            <h2 className="text-xl sm:text-2xl font-semibold mb-2">Get early access</h2>
            <p className="text-forge-muted text-sm mb-6">Join the waitlist. Share your invite link to move up. Referral fraud controls are active.</p>
            <WaitlistForm />
          </div>
        </section>
      </main>

      <footer className="border-t border-forge-border py-8 safe-bottom">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-forge-muted">
          <span>QuantumForge · Aligned with Blueprint v1.1 (Security Hardened)</span>
          <span>Generation treated as untrusted until Safety Gate · MVP</span>
        </div>
      </footer>
    </div>
  );
}
