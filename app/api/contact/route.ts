import { NextResponse } from "next/server";
import { sendContactEmail, missingMailEnv } from "@/lib/mailer";

export const runtime = "nodejs";

const LIMITS = { name: 100, email: 200, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Crude per-instance throttle. Enough to blunt a script hammering the form;
// swap for a shared store (Redis, Upstash) if this ever runs on more than one
// instance, since each instance keeps its own counter.
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 3;
const hits = new Map<string, number[]>();

function recentHits(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.set(ip, recent);
  return recent;
}

function isRateLimited(ip: string) {
  return recentHits(ip).length >= MAX_PER_WINDOW;
}

// Only called once a submission is valid enough to actually send, so a visitor
// mistyping their email three times doesn't lock themselves out.
function recordSendAttempt(ip: string) {
  recentHits(ip).push(Date.now());
  if (hits.size > 5000) hits.clear();
}

function clientIp(req: Request) {
  const forwarded = req.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0].trim() || "unknown";
}

export async function POST(req: Request) {
  const missing = missingMailEnv();
  if (missing.length) {
    console.error(`Contact form not configured. Missing: ${missing.join(", ")}`);
    return NextResponse.json(
      { error: "Email is not configured on this server." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { name, email, message, company } = (body ?? {}) as Record<
    string,
    unknown
  >;

  // Honeypot: hidden in the form, so anything filling it in is a bot. Return
  // success so it has no signal that the message was dropped.
  if (typeof company === "string" && company.trim()) {
    return NextResponse.json({ ok: true });
  }

  const fields = { name, email, message };
  for (const [key, value] of Object.entries(fields)) {
    if (typeof value !== "string" || !value.trim()) {
      return NextResponse.json(
        { error: `Please fill in your ${key}.` },
        { status: 400 },
      );
    }
    if (value.length > LIMITS[key as keyof typeof LIMITS]) {
      return NextResponse.json(
        { error: `Your ${key} is too long.` },
        { status: 400 },
      );
    }
  }

  const trimmed = {
    name: (name as string).trim(),
    email: (email as string).trim(),
    message: (message as string).trim(),
  };

  if (!EMAIL_RE.test(trimmed.email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  // Header injection guard — a newline in name or email would let a sender
  // append their own SMTP headers.
  if (/[\r\n]/.test(trimmed.name) || /[\r\n]/.test(trimmed.email)) {
    return NextResponse.json({ error: "Invalid input." }, { status: 400 });
  }

  const ip = clientIp(req);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many messages. Please try again in a minute." },
      { status: 429 },
    );
  }
  recordSendAttempt(ip);

  try {
    await sendContactEmail(trimmed);
    return NextResponse.json({ ok: true });
  } catch (err) {
    // Don't surface provider internals (keys, domain errors) to the client.
    console.error("Contact email failed:", err);
    return NextResponse.json(
      { error: "Could not send your message. Please try again later." },
      { status: 502 },
    );
  }
}
