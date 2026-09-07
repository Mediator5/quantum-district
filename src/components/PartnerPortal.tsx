import Link from "next/link";
import {
  ArrowUpRight,
  CalendarCheck,
  FileSignature,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/Motion";
import { SectionHeading } from "@/components/SectionHeading";
import { partnerConfig, partnerEnabled } from "@/lib/partner";

const steps = [
  {
    icon: CalendarCheck,
    title: "Discovery call",
    body: "A 30-minute working session — usually inside 48 hours — to define the challenge and confirm fit.",
  },
  {
    icon: Workflow,
    title: "Scoped proposal",
    body: "A written proposal with objectives, phases, deliverables, and pricing. No hourly guessing games.",
  },
  {
    icon: FileSignature,
    title: "Agreement & e-signature",
    body: `Your contract and statement of work are issued through our ${partnerConfig.label} — reviewed and signed in one place.`,
  },
  {
    icon: ShieldCheck,
    title: "Kickoff",
    body: "Milestone invoicing, a named delivery lead, and a schedule everyone has already agreed to.",
  },
];

export function PartnerPortal() {
  return (
    <section id="engage" className="relative bg-mist py-24 lg:py-32">
      <div aria-hidden className="absolute inset-0 grid-lines-dark opacity-30" />

      <div className="container-qd relative">
        <SectionHeading
          eyebrow="Partnership & Agreements"
          title="From first conversation to signed agreement — without the drag."
          intro={`Proposals, statements of work, agreements, e-signature, and milestone invoicing run through our secure ${partnerConfig.label}. You review everything in one place before anything is countersigned.`}
          align="center"
        />

        <Stagger className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((s, i) => (
            <StaggerItem key={s.title} className="h-full">
              <div className="group relative flex h-full flex-col rounded-2xl border border-navy-900/9 bg-white p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-navy-900/16 hover:shadow-lift">
                <span className="absolute top-6 right-6 font-display text-[13px] font-bold text-navy-900/15">
                  0{i + 1}
                </span>
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy-950 text-white transition-colors duration-500 group-hover:bg-brand-600">
                  <s.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-[17px] font-semibold text-navy-950">
                  {s.title}
                </h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-navy-900/65">
                  {s.body}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Embedded portal form / scheduler */}
        <Reveal delay={0.15}>
          <div className="mt-14 overflow-hidden rounded-[1.75rem] border border-navy-900/10 bg-mist">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-navy-900/8 bg-white px-6 py-5">
              <div>
                <p className="font-display text-[17px] font-semibold text-navy-950">
                  {partnerEnabled
                    ? `Start your project in the ${partnerConfig.label}`
                    : "Client portal"}
                </p>
                <p className="mt-1 text-[14px] text-navy-900/60">
                  Secure intake, proposals, agreements, and e-signature.
                </p>
              </div>

              {partnerConfig.agreementUrl ? (
                <a
                  href={partnerConfig.agreementUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex items-center gap-2 rounded-full bg-navy-950 px-5 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-brand-600"
                >
                  View proposal &amp; agreement
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ) : (
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-navy-950 px-5 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-brand-600"
                >
                  Request a proposal
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              )}
            </div>

            {partnerEnabled && partnerConfig.embedUrl ? (
              <iframe
                src={partnerConfig.embedUrl}
                title={`${partnerConfig.label} client intake form`}
                className="h-[760px] w-full border-0 bg-white"
                loading="lazy"
              />
            ) : (
              <div className="grid gap-6 px-6 py-12 text-center">
                <p className="mx-auto max-w-xl text-[15.5px] leading-relaxed text-navy-900/65">
                  Our onboarding portal is connected once your engagement is
                  scoped. Add your Dubsado or HoneyBook form URL to{" "}
                  <code className="rounded bg-white px-1.5 py-0.5 font-mono text-[13px] text-navy-900">
                    .env.local
                  </code>{" "}
                  and it will embed right here — until then, the contact form
                  below reaches our team just as fast.
                </p>
                <div>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full border border-navy-900/15 px-6 py-3.5 text-[14.5px] font-semibold text-navy-950 transition-colors hover:border-navy-900/35"
                  >
                    Tell us about your initiative
                  </Link>
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
