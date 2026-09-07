import type { Metadata } from "next";
import Image from "next/image";
import { PartnerPortal } from "@/components/PartnerPortal";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Motion";
import { Eyebrow } from "@/components/SectionHeading";
import { partnerConfig } from "@/lib/partner";

export const metadata: Metadata = {
  title: "Start a Project",
  description:
    "Discovery call, scoped proposal, agreement and e-signature, kickoff. Here's exactly how an engagement with Quantum District begins.",
};

export default function StartPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-navy-950 pt-36 pb-20 lg:pt-44 lg:pb-28">
        <Image
          src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=2000&q=80"
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover opacity-[0.16]"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(125deg,#030b1c_5%,rgba(6,21,52,.95)_48%,rgba(19,48,99,.85)_100%)]"
        />
        <div aria-hidden className="absolute inset-0 -z-10 grid-lines opacity-45" />

        <div className="container-qd relative">
          <Reveal>
            <Eyebrow light>Partnership &amp; Agreements</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 max-w-3xl font-display text-[2.4rem] leading-[1.08] font-bold text-white sm:text-[3.1rem] lg:text-[3.6rem]">
              Start a project with Quantum District.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-[17.5px] leading-relaxed text-white/65">
              Discovery, proposal, agreement, kickoff — four steps, run through
              our {partnerConfig.label} so nothing stalls in an inbox.
            </p>
          </Reveal>
        </div>
      </section>

      <PartnerPortal />

      <section className="relative bg-white py-20 lg:py-28">
        <div aria-hidden className="absolute inset-0 grid-lines-dark opacity-35" />
        <div className="container-qd relative mx-auto max-w-3xl">
          <Reveal>
            <h2 className="text-center font-display text-[1.9rem] leading-tight font-bold text-navy-950">
              Or just tell us what you&apos;re working on.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-[16px] leading-relaxed text-navy-900/68">
              We&apos;ll come back within one business day with a point of view
              and a recommended first step.
            </p>
          </Reveal>
          <Reveal delay={0.12} y={34} className="mt-10">
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
