/**
 * Partnership / contract-agreement platform integration.
 *
 * Quantum District issues proposals, statements of work, agreements, and
 * e-signature requests through a client portal. Both Dubsado and HoneyBook are
 * supported — flip `NEXT_PUBLIC_PARTNER_PLATFORM` and the whole site follows.
 *
 *   NEXT_PUBLIC_PARTNER_PLATFORM = dubsado | honeybook | none
 *
 * Each platform gives you an embeddable lead-capture / scheduler URL and a
 * public smart-file (or proposal) link. Paste those into .env.local.
 */

export type PartnerPlatform = "dubsado" | "honeybook" | "none";

const raw = (process.env.NEXT_PUBLIC_PARTNER_PLATFORM || "none")
  .trim()
  .toLowerCase();

export const partnerPlatform: PartnerPlatform =
  raw === "dubsado" || raw === "honeybook" ? raw : "none";

export const partnerConfig = {
  platform: partnerPlatform,

  /** Embeddable form / scheduler iframe URL. */
  embedUrl:
    partnerPlatform === "dubsado"
      ? process.env.NEXT_PUBLIC_DUBSADO_FORM_URL || ""
      : partnerPlatform === "honeybook"
        ? process.env.NEXT_PUBLIC_HONEYBOOK_FORM_URL || ""
        : "",

  /** Public link to the proposal / contract smart file. */
  agreementUrl:
    partnerPlatform === "dubsado"
      ? process.env.NEXT_PUBLIC_DUBSADO_PROPOSAL_URL || ""
      : partnerPlatform === "honeybook"
        ? process.env.NEXT_PUBLIC_HONEYBOOK_SMART_FILE_URL || ""
        : "",

  /** Optional scheduler link (Dubsado scheduler / HoneyBook session). */
  schedulerUrl:
    partnerPlatform === "dubsado"
      ? process.env.NEXT_PUBLIC_DUBSADO_SCHEDULER_URL || ""
      : partnerPlatform === "honeybook"
        ? process.env.NEXT_PUBLIC_HONEYBOOK_SCHEDULER_URL || ""
        : "",

  label:
    partnerPlatform === "dubsado"
      ? "Dubsado"
      : partnerPlatform === "honeybook"
        ? "HoneyBook"
        : "client portal",
} as const;

export const partnerEnabled =
  partnerPlatform !== "none" &&
  Boolean(partnerConfig.embedUrl || partnerConfig.agreementUrl);
