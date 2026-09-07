# Quantum District — Website

Strategic Technology & Consulting. A high-conversion marketing site built with
**Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
Framer Motion**, with a **Nodemailer + Gmail** contact pipeline, an **AI Q&A
assistant**, and a switchable **Dubsado / HoneyBook** contracting portal.

---

## 1. Quick start

```bash
npm install
cp .env.example .env.local     # then fill in the values (see §3)
npm run dev                    # http://localhost:3000
```

Production:

```bash
npm run build
npm start
```

> **Windows / XAMPP note.** `node_modules` is platform-specific. If the folder
> was installed on a different OS, delete `node_modules` and `package-lock.json`
> and run `npm install` again from your own terminal before `npm run dev`.

---

## 2. What's in the site

| Route | Purpose |
| --- | --- |
| `/` | Full narrative: hero → trust bar → about → services → mission + stats → approach → AI advantage → testimonials → partnership portal → FAQ → closing CTA |
| `/contact` | Dedicated high-intent conversion page with the full lead form |
| `/start` | Engagement path: discovery → proposal → agreement → kickoff, plus the embedded client portal |
| `/api/contact` | Validated lead intake → Gmail via Nodemailer (internal alert + branded auto-reply) |
| `/api/chat` | AI assistant endpoint (Claude when configured, curated knowledge base otherwise) |

Also generated automatically: `/sitemap.xml`, `/robots.txt`, JSON-LD
`ProfessionalService` schema, Open Graph + Twitter metadata, and a custom 404.

### Conversion mechanics

- Above-the-fold CTA plus a persistent header CTA on every scroll position.
- Response-time promise ("under 1 business day") repeated at each decision point.
- Live-availability badge, animated proof stats, and social proof before the ask.
- Qualifying form fields (area, budget, timeline) so replies arrive pre-scoped.
- Floating AI assistant that answers instantly and hands off to the form.
- Honeypot field + per-IP rate limiting on both API routes.

### Motion

Scroll progress bar, word-by-word hero reveal, parallax imagery, staggered card
entrances, count-up statistics, a scroll-driven timeline rail, pointer-tracking
spotlight cards, and an animated mobile menu — all `prefers-reduced-motion`
aware via `globals.css`.

---

## 3. Environment variables

Everything lives in **`.env.local`** (already present, pre-commented). Never
commit it — `.gitignore` already excludes it. `.env.example` is the shareable
template.

### 3.1 Email — Nodemailer over Gmail (required for the contact form)

```env
GMAIL_USER=you@gmail.com
GMAIL_APP_PASSWORD=abcdefghijklmnop   # 16-char App Password, NOT your login password
MAIL_TO=leads@yourdomain.com          # where inquiries land (defaults to GMAIL_USER)
MAIL_FROM=Quantum District <you@gmail.com>
SEND_AUTOREPLY=true
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
```

**Getting the App Password**

1. <https://myaccount.google.com/security> → turn on **2-Step Verification**.
2. <https://myaccount.google.com/apppasswords> → name it "Quantum District
   Website" → **Create**.
3. Copy the 16-character password into `GMAIL_APP_PASSWORD` (drop the spaces).

Port 465 uses implicit TLS (`SMTP_SECURE=true`); port 587 uses STARTTLS
(`SMTP_SECURE=false`). Gmail allows ~500 sends/day (2,000 on Workspace) — to go
higher, point `SMTP_HOST` at a transactional provider; no code changes needed.

**What a submission does**

1. Validates with Zod (server-side) and drops honeypot/bot traffic silently.
2. Sends a branded internal alert to `MAIL_TO`, with `Reply-To` set to the lead
   so hitting reply answers them directly. Urgent timelines get a red
   **Priority** flag.
3. Sends the lead a branded confirmation with the three next steps.

### 3.2 AI assistant (optional)

```env
ANTHROPIC_API_KEY=sk-ant-...
ANTHROPIC_MODEL=claude-sonnet-4-5
```

- **With a key** — the floating assistant answers with Claude, grounded in
  `src/data/knowledge.ts` and constrained by the system prompt there (no invented
  prices, clients, or guarantees).
- **Without a key** — it automatically falls back to keyword retrieval over the
  same knowledge base, and offers an email handoff for anything unmatched.

The site is fully functional either way. To change what the assistant knows,
edit `src/data/knowledge.ts` — one file drives both modes.

### 3.3 Partnership / contract platform (Dubsado or HoneyBook)

```env
NEXT_PUBLIC_PARTNER_PLATFORM=dubsado        # dubsado | honeybook | none

NEXT_PUBLIC_DUBSADO_FORM_URL=
NEXT_PUBLIC_DUBSADO_SCHEDULER_URL=
NEXT_PUBLIC_DUBSADO_PROPOSAL_URL=

NEXT_PUBLIC_HONEYBOOK_FORM_URL=
NEXT_PUBLIC_HONEYBOOK_SCHEDULER_URL=
NEXT_PUBLIC_HONEYBOOK_SMART_FILE_URL=
```

One switch drives the whole site. Set the platform and paste the URLs; the
`/start` page and the homepage partnership section embed the intake form and
link the proposal/contract smart file. With `none`, those areas fall back to the
in-house contact form — nothing breaks.

Where to find the URLs:

- **Dubsado** — Forms → Lead Capture form → Share → direct link · Scheduler →
  share link · Templates → Proposal → public link.
- **HoneyBook** — Tools → Contact Form → Share → copy link · Scheduler → session
  link · Templates → Proposal/Contract → public link.

### 3.4 Site details

```env
NEXT_PUBLIC_SITE_URL=https://quantumdistrict.com
NEXT_PUBLIC_CONTACT_EMAIL=hello@quantumdistrict.com
NEXT_PUBLIC_CONTACT_PHONE=+1 (202) 555-0147
```

---

## 4. Project structure

```
src/
├── app/
│   ├── layout.tsx           # fonts, metadata, JSON-LD, header/footer/assistant
│   ├── page.tsx             # homepage section composition
│   ├── globals.css          # design tokens, utilities, keyframes
│   ├── contact/page.tsx
│   ├── start/page.tsx
│   ├── not-found.tsx
│   ├── sitemap.ts · robots.ts
│   └── api/
│       ├── contact/route.ts # Zod validation + Nodemailer
│       └── chat/route.ts    # Claude with knowledge-base fallback
├── components/              # Hero, Services, Approach, AiAssistant, Footer, …
├── data/
│   ├── site.ts              # ALL copy, services, stats, FAQs, form options
│   └── knowledge.ts         # assistant knowledge base + system prompt
└── lib/
    ├── mailer.ts            # transport + branded HTML email templates
    ├── partner.ts           # Dubsado / HoneyBook switch
    └── clsx.ts
```

**To edit copy, start in `src/data/site.ts`.** Services, stats, testimonials,
FAQs, industries, and the contact form's dropdown options all live there.

---

## 5. Design system

| Token | Value | Use |
| --- | --- | --- |
| `navy-950` | `#030b1c` | Page-dark backgrounds, primary buttons |
| `navy-900` | `#061534` | Body text, dark surfaces |
| `brand-500 / 600` | `#2f6ce5` / `#1d52c4` | Links, hovers, interactive accents |
| `accent-500` | `#e11d2e` | Red hints — badges, dots, underlines, dividers |
| `mist` | `#f5f8fd` | Alternating light section background |

Type: **Sora** for display headings, **Inter** for body (loaded from Google
Fonts in `layout.tsx`). Red is used sparingly by design — it marks the eye's
next stop rather than filling areas.

Images come from Unsplash and are served through `next/image`; the allowed hosts
are declared in `next.config.ts`. Swap any `https://images.unsplash.com/...` URL
in `src/data/site.ts` (or the component that holds it) for your own photography
when it's ready.

---

## 6. Deploying

Works as-is on any Node host (Vercel, Render, Railway, a VPS, or `npm start`
behind nginx). Set every variable from `.env.local` in the host's environment
settings, and point `NEXT_PUBLIC_SITE_URL` at the production domain so metadata,
sitemap, and Open Graph URLs resolve correctly.

Because `/api/contact` and `/api/chat` are server routes, a static export
(`next export`) will not work — deploy as a Node application.
