import { NextResponse } from "next/server";
import { knowledgeBase, systemPrompt } from "@/data/knowledge";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Msg = { role: "user" | "assistant"; content: string };

/* ------------------------------------------------------------------ */
/*  Very small in-memory rate limiter (per IP, per instance)            */
/* ------------------------------------------------------------------ */
const hits = new Map<string, { count: number; reset: number }>();
const LIMIT = 25;
const WINDOW = 10 * 60 * 1000;

function rateLimited(ip: string) {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now > rec.reset) {
    hits.set(ip, { count: 1, reset: now + WINDOW });
    return false;
  }
  rec.count += 1;
  return rec.count > LIMIT;
}

/* ------------------------------------------------------------------ */
/*  Fallback: keyword retrieval over the curated knowledge base         */
/* ------------------------------------------------------------------ */

const STOP = new Set([
  "the", "a", "an", "and", "or", "is", "are", "do", "does", "you", "your",
  "we", "our", "i", "can", "with", "for", "to", "of", "in", "on", "how",
  "what", "it", "me", "my", "us", "have", "has", "would", "could", "about",
]);

function fallbackAnswer(question: string) {
  const q = question.toLowerCase();
  const words = q
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP.has(w));

  let best: { score: number; answer: string } | null = null;

  for (const entry of knowledgeBase) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (q.includes(kw)) score += kw.includes(" ") ? 4 : 3;
    }
    for (const w of words) {
      if (entry.keywords.some((kw) => kw.includes(w) || w.includes(kw))) score += 1;
      if (entry.question.toLowerCase().includes(w)) score += 1;
    }
    if (!best || score > best.score) best = { score, answer: entry.answer };
  }

  if (best && best.score >= 3) {
    return {
      reply: `${best.answer}\n\nIf you'd like this applied to your specific situation, send the details through our contact form — a consultant replies in under one business day.`,
      mode: "knowledge-base",
    };
  }

  return {
    reply:
      "That one deserves a real answer from a consultant rather than a guess from me. Send it through the contact form with a line of context and someone from our team will reply in under one business day — usually the same day.",
    mode: "handoff",
  };
}

/* ------------------------------------------------------------------ */

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "anon";

  if (rateLimited(ip)) {
    return NextResponse.json(
      {
        reply:
          "You've asked a lot of great questions — let's get you to a person. Send them through the contact form and we'll reply in under one business day.",
        mode: "rate-limited",
      },
      { status: 429 },
    );
  }

  let messages: Msg[] = [];
  try {
    const body = await req.json();
    messages = Array.isArray(body?.messages) ? body.messages : [];
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const clean = messages
    .filter(
      (m): m is Msg =>
        (m?.role === "user" || m?.role === "assistant") &&
        typeof m?.content === "string" &&
        m.content.trim().length > 0,
    )
    .slice(-10)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }));

  const lastUser = [...clean].reverse().find((m) => m.role === "user");
  if (!lastUser) {
    return NextResponse.json({ error: "No question provided" }, { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;

  /* ---- No key configured → curated knowledge base ---- */
  if (!apiKey) {
    return NextResponse.json(fallbackAnswer(lastUser.content));
  }

  /* ---- Live AI ---- */
  try {
    const { default: Anthropic } = await import("@anthropic-ai/sdk");
    const client = new Anthropic({ apiKey });

    const response = await client.messages.create({
      model: process.env.ANTHROPIC_MODEL || "claude-sonnet-4-5",
      max_tokens: 500,
      system: systemPrompt,
      messages: clean,
    });

    const reply = response.content
      .filter((b) => b.type === "text")
      .map((b) => (b as { text: string }).text)
      .join("\n")
      .trim();

    if (!reply) return NextResponse.json(fallbackAnswer(lastUser.content));

    return NextResponse.json({ reply, mode: "ai" });
  } catch (err) {
    console.error("[/api/chat] AI request failed:", err);
    return NextResponse.json(fallbackAnswer(lastUser.content));
  }
}
