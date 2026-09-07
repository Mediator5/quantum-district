import Image from "next/image";
import { Target } from "lucide-react";
import { CountUp, Reveal, Stagger, StaggerItem } from "@/components/Motion";
import { Eyebrow } from "@/components/SectionHeading";
import { stats } from "@/data/site";

export function Mission() {
  return (
    <section id="mission" className="relative isolate overflow-hidden bg-navy-950 py-24 lg:py-32">
      <Image
        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2000&q=80"
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover opacity-[0.16]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(160deg,#030b1c_10%,rgba(6,21,52,.9)_55%,rgba(19,48,99,.85)_100%)]"
      />
      <div aria-hidden className="absolute inset-0 -z-10 grid-lines opacity-40" />
      <div
        aria-hidden
        className="absolute top-1/3 -left-24 -z-10 h-80 w-80 rounded-full bg-accent-600/14 blur-[120px]"
      />

      <div className="container-qd relative">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <span className="inline-grid h-14 w-14 place-items-center rounded-2xl border border-white/15 bg-white/[0.07] backdrop-blur-sm">
              <Target className="h-6 w-6 text-accent-400" />
            </span>
          </Reveal>

          <Reveal delay={0.08} className="mt-6 flex justify-center">
            <Eyebrow light>Our Mission</Eyebrow>
          </Reveal>

          <Reveal delay={0.14}>
            <h2 className="mt-6 font-display text-[2.1rem] leading-[1.12] font-bold text-white sm:text-[2.9rem] lg:text-[3.4rem]">
              To help organizations turn ambitious ideas into{" "}
              <span className="relative whitespace-nowrap">
                <span className="relative z-10 text-brand-300">meaningful,</span>
              </span>{" "}
              measurable outcomes.
            </h2>
          </Reveal>

          <Reveal delay={0.22}>
            <p className="mx-auto mt-7 max-w-2xl text-[17px] leading-relaxed text-white/62">
              At Quantum District, our mission is to bridge the gap between
              strategy and execution. We help organizations identify
              opportunities, solve complex challenges, leverage technology, and
              build sustainable solutions that deliver lasting value.
            </p>
          </Reveal>
        </div>

        {/* Stats */}
        <Stagger className="mt-20 grid gap-px overflow-hidden rounded-3xl border border-white/12 bg-white/12 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <StaggerItem key={s.label} className="bg-navy-950/85 backdrop-blur-sm">
              <div className="group h-full p-8 transition-colors duration-500 hover:bg-navy-900/70">
                <div className="flex items-baseline gap-1">
                  <CountUp
                    value={s.value}
                    suffix={s.suffix}
                    className="font-display text-[2.75rem] leading-none font-bold text-white"
                  />
                  <span className="ml-1 h-1.5 w-1.5 translate-y-[-14px] rounded-full bg-accent-500 transition-transform duration-500 group-hover:scale-150" />
                </div>
                <p className="mt-4 text-[14px] leading-snug text-white/55">
                  {s.label}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
