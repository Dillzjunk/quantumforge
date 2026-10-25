# QuantumForge pre-launch deploy checklist

### 1) Deploy trigger
- [ ] `main` is up to date
- [ ] Latest commit pushed:
  ```bash
  git add .
  git commit -m "Deploy"
  git push origin main
  ```
- [ ] Vercel production deployment status = **Ready**

### 2) Build/runtime sanity
- [ ] No build errors in Vercel logs
- [ ] No runtime 500s on homepage
- [ ] `README` assumptions still true (in-memory waitlist is intentional for MVP)

### 3) Core funnel checks
- [ ] User can join waitlist successfully
- [ ] Unique referral code is generated (`QF-...`)
- [ ] `?ref=QF-...` is accepted and attributed
- [ ] Referral climb logic updates queue position correctly
- [ ] Native share action appears after blueprint generation

### 4) Pricing + gating
- [ ] Free / Pro / Team cards render correctly
- [ ] Waitlist-gated CTAs do not bypass intended flow
- [ ] No payment links exposed if Stripe is Phase 2+

### 5) PWA checks (mobile + desktop)
- [ ] `manifest` is valid and linked
- [ ] App icons (192px + 512px) exist and load
- [ ] Theme/background colors are set
- [ ] Install prompt works (where supported)
- [ ] Launched app has standalone behavior and correct app name

### 6) SEO / social preview
- [ ] `<title>` + meta description present
- [ ] Open Graph title/description/image set
- [ ] Twitter card tags set
- [ ] Preview renders correctly when sharing URL in chat apps

### 7) Security baseline
- [ ] Security headers active (`next.config.js`): CSP (reasonable), `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`/`frame-ancestors`
- [ ] No secrets exposed in client bundle (`NEXT_PUBLIC_*` audited)
- [ ] API routes validate input (`ref`, waitlist payloads)
- [ ] Soft rate limits active on waitlist/referral endpoints
- [ ] Referral code format + bounds checking enforced

### 8) Performance sanity
- [ ] Lighthouse mobile pass is acceptable for MVP
- [ ] First load JS not obviously bloated
- [ ] Hero/above-the-fold assets optimized

### 9) Observability & rollback
- [ ] Vercel analytics/log access confirmed
- [ ] Error monitoring path defined (even if lightweight)
- [ ] Rollback plan: redeploy last known good build

### 10) Final go/no-go
- [ ] Test on iOS Safari + Android Chrome + desktop Chrome
- [ ] One full referral loop completed end-to-end
- [ ] Share preview validated with production URL
- [ ] Launch decision recorded
