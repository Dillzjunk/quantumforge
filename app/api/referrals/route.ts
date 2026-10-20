import { NextRequest, NextResponse } from "next/server";

/** Simple referral ping counter for MVP viral loop tracking. */
const counts = new Map<string, number>();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const code = String(body.code || "").slice(0, 32);
    if (!code || !code.startsWith("QF-")) {
      return NextResponse.json({ error: "Invalid code" }, { status: 400 });
    }
    const next = (counts.get(code) || 0) + 1;
    counts.set(code, next);
    return NextResponse.json({ ok: true, count: next });
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  if (!code) return NextResponse.json({ error: "code required" }, { status: 400 });
  return NextResponse.json({ count: counts.get(code) || 0 });
}
