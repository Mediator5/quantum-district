import { NextResponse } from "next/server";
import { z } from "zod";
import {
  autoReplyEmail,
  getTransporter,
  internalEmail,
  isEmailConfigured,
  mailFrom,
  mailTo,
  type Lead,
} from "@/lib/mailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const schema = z.object({
  name: z.string().trim().min(2, "Please share your name.").max(120),
  email: z.string().trim().email("Please enter a valid email address.").max(200),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  phone: z.string().trim().max(60).optional().or(z.literal("")),
  projectType: z.string().trim().max(120).optional().or(z.literal("")),
  budget: z.string().trim().max(80).optional().or(z.literal("")),
  timeline: z.string().trim().max(80).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more — at least a sentence or two.")
    .max(5000),
  pageUrl: z.string().trim().max(300).optional().or(z.literal("")),
  /** honeypot — real people never fill this in */
  website: z.string().max(300).optional().or(z.literal("")),
});

const hits = new Map<string, { count: number; reset: number }>();
const LIMIT = 6;
const WINDOW = 15 * 60 * 1000;

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

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "anon";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Please email us directly." },
      { status: 429 },
    );
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 },
    );
  }

  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return NextResponse.json(
      { ok: false, error: "Please check the highlighted fields.", fieldErrors },
      { status: 422 },
    );
  }

  const data = parsed.data;

  // Silently accept bot submissions so they don't retry.
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  if (!isEmailConfigured()) {
    console.warn(
      "[/api/contact] GMAIL_USER / GMAIL_APP_PASSWORD are not set. Submission logged only:",
      { name: data.name, email: data.email },
    );
    return NextResponse.json(
      {
        ok: false,
        error:
          "Our contact system is not configured yet. Please email us directly and we'll respond right away.",
      },
      { status: 503 },
    );
  }

  const lead: Lead = {
    name: data.name,
    email: data.email,
    company: data.company || undefined,
    phone: data.phone || undefined,
    projectType: data.projectType || undefined,
    budget: data.budget || undefined,
    timeline: data.timeline || undefined,
    message: data.message,
    source: "quantumdistrict.com",
    pageUrl: data.pageUrl || undefined,
  };

  try {
    const transporter = getTransporter();
    const internal = internalEmail(lead);

    await transporter.sendMail({
      from: mailFrom(),
      to: mailTo(),
      replyTo: `${lead.name} <${lead.email}>`,
      subject: internal.subject,
      html: internal.html,
      text: internal.text,
    });

    if (process.env.SEND_AUTOREPLY !== "false") {
      const reply = autoReplyEmail(lead);
      transporter
        .sendMail({
          from: mailFrom(),
          to: `${lead.name} <${lead.email}>`,
          replyTo: mailTo(),
          subject: reply.subject,
          html: reply.html,
          text: reply.text,
        })
        .catch((e) => console.error("[/api/contact] auto-reply failed:", e));
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/contact] send failed:", err);
    return NextResponse.json(
      {
        ok: false,
        error:
          "We couldn't send your message just now. Please email us directly — we'll get right back to you.",
      },
      { status: 502 },
    );
  }
}
