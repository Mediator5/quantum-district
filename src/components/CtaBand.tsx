import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Mail } from "lucide-react";
import { Reveal } from "@/components/Motion";
import { Eyebrow } from "@/components/SectionHeading";
import { site } from "@/data/site";

export function CtaBand() {
  return (
    <section id="contact-cta" className="relative isolate overflow-hidden bg-navy-950">
      <Image
        src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2000&q=80"
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover opacity-[0.2]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,#0c0b0a_0%,rgba(20,18,15,.94)_45%,rgba(43,39,32,.82)_100%)]"
      />
      <div aria-hidden className="absolute inset-0 -z-10 grid-lines opacity-45" />
      <div
        aria-hidden
        className="absolute -top-24 right-1/4 -z-10 h-96 w-96 rounded-full bg-brand-500/22 blur-[130px] animate-float"
      />

      <div className="container-qd relative py-24 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal className="flex justify-center">
            <Eyebrow light>Let&apos;s Work Together</Eyebrow>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="mt-6 font-display text-[2.3rem] leading-[1.08] font-bold text-white sm:text-[3rem] lg:text-[3.6rem]">
              Ready to Move Forward?
            </h2>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mx-auto mt-6 max-w-xl text-[17.5px] leading-relaxed text-white/65">
              Tell us about your challenge, initiative, or opportunity. Quantum
              District is ready to help you define the path forward.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-white px-8 py-4.5 text-[15px] font-bold tracking-wide text-navy-950 transition-all duration-300 hover:scale-[1.03] hover:bg-brand-300"
              >
                CONTACT QUANTUM DISTRICT
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-4.5 text-[15px] font-semibold text-white transition-colors hover:border-white/45 hover:bg-white/[0.07]"
              >
                <Mail className="h-4 w-4" />
                {site.email}
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.32}>
            <p className="mt-7 inline-flex items-center gap-2 text-[13.5px] text-white/45">
              <Clock className="h-4 w-4 text-accent-400" />
              Every inquiry receives a personal reply in {site.responseWindow}.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
