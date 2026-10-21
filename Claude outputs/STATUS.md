# Quantum District — Squarespace build status

Site: `hibiscus-impala-kbkw.squarespace.com` (Radian template, 7.1)
Trial ends in 14 days · everything below is **saved to the server**

---

## Done

**Foundation**
- Site renamed to Quantum District
- Full design system in Custom CSS (~13,500 characters): navy/white/red palette,
  Inter + Sora loaded via `@import`, section colour themes, buttons, eyebrow
  labels with the red rule, card hovers, form styling, FAQ accordion, footer,
  dark-section scrim
- Code Injection verified writable — but badged "Upgrade", so anything in it
  stays dormant until the client subscribes to **Core**

**Home — hero**
- Darkest theme, Unsplash glass-architecture background with navy scrim
- "Strategic Technology & Consulting" in Sora, tagline in brand blue,
  description, and a START A CONVERSATION button
- Two-column layout applied

**Home — services**
- All six cards written with their real titles and descriptions:
  Strategic Consulting · Technology Transformation · Program & Project
  Management · Data & Analytics · Process Optimization · Implementation Support
- Data & Analytics has a proper Unsplash image

**Contact page**
- Created at `/contact`, added to Main Navigation (which was empty)
- Heading "Ready to Move Forward?" + Quantum District intro copy
- Form built from Squarespace's contact template, carrying the stylesheet's
  card treatment
- Services question relabelled "What do you need help with?" with the first
  three real options

---

## Remaining

### Services cards
| Item | Note |
| --- | --- |
| Images on 5 cards | Two have none; three still show Radian's architecture photos. Search terms per card are in BUILD-GUIDE.md |
| Button text | Still "Read more" / "Click Here" → should be `Discuss this with us` |
| Button links | First three still point at the old project pages → should go to `/contact` |
| Section heading | "OUR SERVICES" eyebrow + "Expertise Built Around Your Mission." |

### Contact form
| Item | Current | Should be |
| --- | --- | --- |
| Service options 4–6 | missing | Data & Analytics · Process Optimization · Implementation Support · Not sure yet — need guidance |
| Budget | `< $500` / `$500–$1000` / `> $1000` | Under $25,000 · $25,000–$75,000 · $75,000–$250,000 · $250,000+ · To be determined |
| Project start date | date picker | Timeline dropdown: Immediately · Within 30 days · This quarter · Exploring options |
| Project Details | label | `Tell us about the challenge` |
| Organization | missing | add a text field |
| Submit button | `Submit` | `START A CONVERSATION` |

### Remaining homepage sections
About · Mission + stats · Approach · Speed/AI · Testimonials · Partnership ·
FAQ · Closing CTA — all copy and settings are written up in BUILD-GUIDE.md

---

## Worth knowing

**The form already emails `kevin@quantumdistrict.net`** — Squarespace picked
that up from the account. Confirm that's the right inbox before publishing.

**Three content decisions need the client**, flagged in BUILD-GUIDE.md:
- The stat figures (18+, 40+, 96%, 24h) are placeholders carried from the
  Next.js build and read as factual claims
- The testimonials were written as sample copy, not real client feedback
- The "AI-accelerated discovery" claim needs a real chatbot behind it or
  different wording

---

## Working notes for whoever continues

- **Browser zoom matters.** At 150% on a 1280×720 screen the Squarespace editor
  pushes its own panels off-screen and silently fails. Keep Chrome at 80–100%.
- **Triple-click selects a field's contents — don't add Ctrl+A.** Doing both
  escapes the input and selects the whole panel, and the typing goes nowhere.
- **A `renderer may be frozen` timeout usually still applied the change.**
  Check before retrying, or you'll double-type.
- **Panels go stale.** After several opens the ADD button and Edit Content stop
  responding, and panel content starts overlapping. Reloading the editor clears
  it.
