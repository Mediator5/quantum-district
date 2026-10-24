import Image from "next/image";
import { Quote } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Parallax, Reveal } from "@/components/Motion";
import { SectionHeading } from "@/components/SectionHeading";

export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-white py-24 lg:py-32">
      <div
        aria-hidden
        className="absolute inset-0 grid-lines-dark opacity-[0.35]"
      />
      <div
        aria-hidden
        className="absolute -top-24 right-0 h-96 w-96 rounded-full bg-brand-500/6 blur-[110px]"
      />

      <div className="container-qd relative">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Imagery */}
          <div className="relative order-2 lg:order-1">
            <Parallax strength={34} className="relative">
              <div className="relative aspect-[4/3.3] overflow-hidden rounded-[1.75rem] shadow-lift-lg">
                <Image
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80"
                  alt="A Quantum District team working through an organizational assessment"
                  fill
                  sizes="(max-width: 1024px) 92vw, 46vw"
                  className="object-cover"
                />
              </div>
            </Parallax>

            <Reveal delay={0.15} y={40}>
              <div className="relative -mt-16 ml-auto w-[62%] overflow-hidden rounded-[1.5rem] ring-8 ring-white shadow-lift-lg lg:-mt-24">
                <div className="relative aspect-[4/3]">
                  <Image
                    src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=80"
                    alt="Detail of a delivery roadmap being reviewed"
                    fill
                    sizes="(max-width: 1024px) 60vw, 28vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="absolute -bottom-6 left-0 hidden items-center gap-3 rounded-2xl border border-navy-900/8 bg-white px-5 py-4 shadow-lift sm:flex">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy-950">
                  <Logo layout="mark" variant="light" size="xs" href={null} sheen={false} />
                </span>
                <div>
                  <p className="font-display text-[15px] font-semibold text-navy-950">
                    Strategy that ships
                  </p>
                  <p className="text-[12.5px] text-navy-900/55">
                    Ideas → implementation → impact
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Copy */}
          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow="About Quantum District"
              title="Clarity for Complex Problems."
              intro={
                <>
                  <p>
                    Quantum District is a forward-thinking consulting firm focused
                    on helping organizations make smarter decisions, modernize
                    operations, and execute initiatives that matter.
                  </p>
                  <p className="mt-4">
                    We combine strategic thinking, technology expertise, and
                    disciplined execution to create solutions that are practical,
                    scalable, and aligned with organizational goals.
                  </p>
                </>
              }
            />

            <Reveal delay={0.22}>
              <figure className="mt-10 rounded-2xl border-l-[3px] border-accent-500 bg-mist p-7">
                <Quote className="h-6 w-6 text-accent-500/70" />
                <p className="mt-3 font-display text-[1.35rem] leading-snug font-semibold text-navy-950">
                  Strategy is only valuable when it creates action.
                </p>
                <figcaption className="mt-3 text-[15px] leading-relaxed text-navy-900/65">
                  We work alongside our clients to move from ideas and requirements
                  to implementation, outcomes, and lasting impact.
                </figcaption>
                <span className="mt-4 block text-[11px] font-semibold tracking-[0.2em] text-navy-900/40 uppercase">
                  Our Promise
                </span>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
