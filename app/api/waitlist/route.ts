import { NextRequest, NextResponse } from "next/server";

/** In-memory waitlist for MVP. Replace with Supabase / KV in production. */
const entries: { email: string; ref: string | null; at: string; code: string }[] = [];

function codeFromEmail(email: string): string {
  let h = 0;
  for (let i = 0; i < email.length; i++) h = (Math.imul(31, h) + email.charCodeAt(i)) | 0;
  return `QF-${Math.abs(h).toString(36).toUpperCase().slice(0, 8)}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = String(body.email || "")
      .trim()
      .toLowerCase();
    const ref = body.ref ? String(body.ref).slice(0, 32) : null;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    const existing = entries.find((e) => e.email === email);
    if (existing) {
      return NextResponse.json({ ok: true, referralCode: existing.code, already: true });
    }

    if (entries.length > 5000) {
      return NextResponse.json({ error: "Waitlist temporarily full" }, { status: 429 });
    }

    const code = codeFromEmail(email);
    entries.push({ email, ref, at: new Date().toISOString(), code });

    return NextResponse.json({ ok: true, referralCode: code });
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({ count: entries.length });
}
