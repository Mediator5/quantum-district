import type { Metadata } from "next";
import Image from "next/image";
import { Clock, Mail, MapPin, Phone, ShieldCheck, Sparkles } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Motion";
import { Eyebrow } from "@/components/SectionHeading";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us about your challenge, initiative, or opportunity. Quantum District replies to every inquiry in under one business day.",
};

const assurances = [
  {
    icon: Clock,
    title: "A reply in under 1 business day",
    body: "A senior consultant reads every message — no ticket queue, no autoresponder loop.",
  },
  {
    icon: Sparkles,
    title: "AI-accelerated intake",
    body: "Our assistant can answer scoping questions immediately while your message reaches a person.",
  },
  {
    icon: ShieldCheck,
    title: "Confidential by default",
    body: "What you share stays with our consulting team. NDAs available before the first call.",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-navy-950 pt-36 pb-20 lg:pt-44 lg:pb-28">
        <Image
          src="https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?auto=format&fit=crop&w=2000&q=80"
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover opacity-[0.18]"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(125deg,#030b1c_5%,rgba(6,21,52,.95)_45%,rgba(19,48,99,.85)_100%)]"
        />
        <div aria-hidden className="absolute inset-0 -z-10 grid-lines opacity-45" />
        <div
          aria-hidden
          className="absolute -top-20 -right-20 -z-10 h-[28rem] w-[28rem] rounded-full bg-brand-600/22 blur-[130px] animate-float"
        />

        <div className="container-qd relative">
          <Reveal>
            <Eyebrow light>Let&apos;s Work Together</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 max-w-3xl font-display text-[2.4rem] leading-[1.08] font-bold text-white sm:text-[3.1rem] lg:text-[3.7rem]">
              Ready to Move Forward?
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-[17.5px] leading-relaxed text-white/65">
              Tell us about your challenge, initiative, or opportunity. Quantum
              District is ready to help you define the path forward.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Form + details */}
      <section className="relative bg-mist py-20 lg:py-28">
        <div aria-hidden className="absolute inset-0 grid-lines-dark opacity-35" />

        <div className="container-qd relative grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          {/* Left column */}
          <div>
            <Reveal>
              <h2 className="font-display text-[1.9rem] leading-tight font-bold text-navy-950">
                Start the conversation.
              </h2>
              <p className="mt-4 text-[16px] leading-relaxed text-navy-900/68">
                The more context you can share — the initiative, the constraint,
                the deadline — the more specific our first response will be.
              </p>
            </Reveal>

            <div className="mt-9 space-y-4">
              {assurances.map((a, i) => (
                <Reveal key={a.title} delay={0.08 * i}>
                  <div className="flex gap-4 rounded-2xl border border-navy-900/8 bg-white p-5">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-navy-950 text-white">
                      <a.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-[15.5px] font-semibold text-navy-950">
                        {a.title}
                      </h3>
                      <p className="mt-1.5 text-[14px] leading-relaxed text-navy-900/62">
                        {a.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.3}>
              <div className="mt-9 overflow-hidden rounded-2xl border border-navy-900/9 bg-navy-950 p-7">
                <h3 className="font-display text-[16.5px] font-semibold text-white">
                  Reach us directly
                </h3>
                <ul className="mt-5 space-y-4 text-[14.5px] text-white/65">
                  <li className="flex items-center gap-3">
                    <Mail className="h-4 w-4 shrink-0 text-accent-400" />
                    <a href={`mailto:${site.email}`} className="hover:text-white">
                      {site.email}
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone className="h-4 w-4 shrink-0 text-accent-400" />
                    <a
                      href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
                      className="hover:text-white"
                    >
                      {site.phone}
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 shrink-0 text-accent-400" />
                    {site.location}
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={0.12} y={36}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
