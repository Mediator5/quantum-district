"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "@/components/Motion";
import { SectionHeading } from "@/components/SectionHeading";
import { approach } from "@/data/site";

const stepImages = [
  "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=900&q=80",
];

export function Approach() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 60%"],
  });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="approach" className="relative bg-white py-24 lg:py-32">
      <div aria-hidden className="absolute inset-0 grid-lines-dark opacity-30" />

      <div className="container-qd relative">
        <SectionHeading
          eyebrow="Our Approach"
          title="Practical. Collaborative. Outcome-Driven."
          intro="Four disciplined phases that carry an initiative from first conversation to sustained results — with a named owner at every handoff."
          align="center"
        />

        <div ref={ref} className="relative mt-16">
          {/* Progress rail (desktop) */}
          <div
            aria-hidden
            className="absolute top-0 bottom-0 left-1/2 hidden w-px -translate-x-1/2 bg-navy-900/10 lg:block"
          >
            <motion.div
              style={{ height }}
              className="w-full bg-gradient-to-b from-brand-500 to-accent-500"
            />
          </div>

          <ol className="space-y-10 lg:space-y-20">
            {approach.map((step, i) => {
              const flip = i % 2 === 1;
              return (
                <li
                  key={step.step}
                  className="relative grid items-center gap-8 lg:grid-cols-2 lg:gap-16"
                >
                  {/* Node */}
                  <span
                    aria-hidden
                    className="absolute top-1/2 left-1/2 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white bg-navy-950 ring-1 ring-navy-900/15 lg:block"
                  />

                  <Reveal
                    x={flip ? 40 : -40}
                    y={20}
                    className={flip ? "lg:order-2 lg:pl-14" : "lg:pr-14"}
                  >
                    <div className="flex items-start gap-5">
                      <span className="font-display text-[2.6rem] leading-none font-bold text-navy-900/12">
                        {step.step}
                      </span>
                      <div>
                        <h3 className="font-display text-[1.6rem] leading-tight font-bold text-navy-950">
                          {step.title}
                        </h3>
                        <p className="mt-3 max-w-md text-[16px] leading-relaxed text-navy-900/68">
                          {step.body}
                        </p>
                      </div>
                    </div>
                  </Reveal>

                  <Reveal
                    delay={0.1}
                    x={flip ? -40 : 40}
                    y={20}
                    className={flip ? "lg:order-1 lg:pr-14" : "lg:pl-14"}
                  >
                    <div className="group relative aspect-[16/10] overflow-hidden rounded-[1.5rem] shadow-lift">
                      <Image
                        src={stepImages[i]}
                        alt={`${step.title} phase`}
                        fill
                        sizes="(max-width: 1024px) 92vw, 44vw"
                        className="object-cover transition-transform duration-[900ms] group-hover:scale-105"
                      />
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-tr from-navy-950/62 via-navy-950/12 to-transparent"
                      />
                      <span className="absolute bottom-4 left-5 rounded-full bg-white/12 px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.16em] text-white uppercase backdrop-blur-md">
                        Phase {step.step}
                      </span>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
