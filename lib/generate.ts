/** Lightweight blueprint generator — simulated for MVP (no external LLM required).
 *  Aligns with Generation Safety Architecture: output is structured, bounded, and reviewable.
 */

export type AppBlueprint = {
  name: string;
  tagline: string;
  stack: string[];
  features: string[];
  pages: string[];
  safetyNotes: string[];
  estimatedBuild: string;
};

const STACKS = [
  ["Next.js 14", "Tailwind CSS", "Supabase", "Stripe"],
  ["Next.js 14", "tRPC", "PostgreSQL", "Vercel"],
  ["Expo", "React Native", "Supabase Auth", "Stripe"],
  ["Next.js", "Prisma", "Redis", "Resend"],
];

const FEATURE_POOL = [
  "User authentication (OAuth + magic links)",
  "Dashboard with live metrics",
  "Stripe subscriptions + billing portal",
  "Referral tracking with unique invite links",
  "Real-time notifications",
  "Admin panel with role-based access",
  "File upload to object storage",
  "Email sequences via Resend",
  "Public share pages with Open Graph",
  "Waitlist + early access gating",
  "API rate limiting per tier",
  "PWA offline shell",
];

export function generateBlueprint(prompt: string): AppBlueprint {
  const cleaned = prompt.trim().slice(0, 500);
  const words = cleaned.split(/\s+/).filter(Boolean);
  const nameHint = words.slice(0, 3).join(" ") || "My App";
  const name = nameHint
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ")
    .slice(0, 40);

  const stack = STACKS[Math.abs(hash(cleaned)) % STACKS.length];
  const featureCount = 4 + (Math.abs(hash(cleaned + "f")) % 4);
  const features = shuffle(FEATURE_POOL, hash(cleaned)).slice(0, featureCount);

  const pages = [
    "Landing / Marketing",
    "Auth (login / signup)",
    "Dashboard",
    ...(features.includes("Admin panel with role-based access") ? ["Admin"] : []),
    "Settings / Billing",
  ];

  return {
    name,
    tagline: cleaned.length > 80 ? cleaned.slice(0, 77) + "\u2026" : cleaned || "A production-ready application",
    stack,
    features,
    pages,
    safetyNotes: [
      "Generated blueprint is structural only \u2014 no executable code shipped without Safety Gate",
      "Dependencies restricted to curated allow-list in full pipeline",
      "Auth and payment surfaces require human review before production deploy",
    ],
    estimatedBuild: featureCount <= 5 ? "2\u20134 weeks (MVP)" : "4\u20138 weeks (full feature set)",
  };
}

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return h;
}

function shuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  let s = Math.abs(seed) || 1;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 16807) % 2147483647;
    const j = s % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function blueprintToMarkdown(b: AppBlueprint): string {
  return [
    `# ${b.name}`,
    ``,
    `> ${b.tagline}`,
    ``,
    `## Stack`,
    ...b.stack.map((s) => `- ${s}`),
    ``,
    `## Features`,
    ...b.features.map((f) => `- ${f}`),
    ``,
    `## Pages`,
    ...b.pages.map((p) => `- ${p}`),
    ``,
    `## Safety`,
    ...b.safetyNotes.map((n) => `- ${n}`),
    ``,
    `**Estimated build:** ${b.estimatedBuild}`,
  ].join("\n");
}
