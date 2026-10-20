# QuantumForge

AI-powered application generator — lean viral PWA MVP.

Built from the **QuantumForge Hyper-Enterprise Project Blueprint v1.1 (Security Hardened)**.

## What this MVP includes

- **Cinematic terminal** — prompt → structured app blueprint with streaming output
- **Generation Safety Architecture (MVP)** — prompt length limits, structural-only output, safety notes, no untrusted executable code shipped
- **Waitlist + referral loop** — unique invite codes, share sheet, climb-the-queue mechanics
- **Pricing table** — Free / Pro / Team (waitlist-gated)
- **Mobile-first PWA** — installable, dark UI, touch-friendly
- **Share / Open Graph** ready metadata

## Viral loop

1. User joins waitlist → receives unique `?ref=QF-…` link  
2. Shares link → friends join → referrer moves up  
3. After generating a blueprint → native share encourages more invites  

## Stack

- Next.js 14 (App Router) + TypeScript  
- Tailwind CSS  
- Route handlers for waitlist / referrals (in-memory for MVP)  

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

Connected to Vercel via GitHub. Push to `main` triggers production deploy.

## Assumptions (from blueprint)

- Full OpenAI generation pipeline, multi-tenant Supabase, and Stripe billing are **Phase 2+**
- This ship prioritizes the viral core and a safe, reviewable generation experience
- In-memory waitlist is demo-grade; replace with Supabase/KV before public scale

## Security posture (v1.1 alignment)

- Generated output is structural blueprints only  
- No service credentials exposed to client  
- Referral codes validated; soft rate limits on waitlist  
- Security headers set in `next.config.js`  

---

Blueprint: `QuantumForge-Blueprint-v1.1-Security-Hardened.docx`
