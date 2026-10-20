export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function generateReferralCode(seed?: string): string {
  const base = seed || Math.random().toString(36).slice(2, 10);
  return `QF-${base.toUpperCase().slice(0, 8)}`;
}

export function getReferralFromUrl(): string | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  return params.get("ref");
}
