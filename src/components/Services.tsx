"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BarChart3,
  Compass,
  Cpu,
  KanbanSquare,
  Rocket,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { Reveal, Spotlight } from "@/components/Motion";
import { SectionHeading } from "@/components/SectionHeading";
import { services, type Service } from "@/data/site";

const icons: Record<Service["icon"], LucideIcon> = {
  compass: Compass,
  cpu: Cpu,
  kanban: KanbanSquare,
  chart: BarChart3,
  workflow: Workflow,
  rocket: Rocket,
};

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = icons[service.icon];

  return (
    <motion.article
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.09, ease: [0.16, 1, 0.3, 1] }}
      className="group h-full"
    >
      <Spotlight className="flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-navy-900/9 bg-white transition-all duration-500 hover:-translate-y-1.5 hover:border-navy-900/14 hover:shadow-lift-lg">
        {/* Image band */}
        <div className="relative h-44 overflow-hidden">
          <Image
            src={service.image}
            alt=""
            fill
            sizes="(max-width: 768px) 92vw, (max-width: 1280px) 46vw, 30vw"
            className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-108"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-navy-950/92 via-navy-950/45 to-navy-950/12 transition-opacity duration-500 group-hover:from-navy-950/85"
          />
          <span className="absolute top-4 left-5 font-display text-[13px] font-bold tracking-[0.16em] text-white/55">
            {service.number}
          </span>
          <span className="absolute bottom-4 left-5 grid h-11 w-11 place-items-center rounded-xl border border-white/20 bg-white/12 backdrop-blur-md">
            <Icon className="h-5 w-5 text-white" />
          </span>
          <span
            aria-hidden
            className="absolute right-0 bottom-0 h-[3px] w-0 bg-accent-500 transition-all duration-500 group-hover:w-full"
          />
        </div>

        {/* Body */}
        <div className="relative flex flex-1 flex-col p-7">
          <h3 className="font-display text-[1.3rem] leading-tight font-semibold text-navy-950">
            {service.title}
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-navy-900/65">
            {service.summary}
          </p>

          <ul className="mt-5 space-y-2.5 border-t border-navy-900/8 pt-5">
            {service.bullets.map((b) => (
              <li
                key={b}
                className="flex items-start gap-2.5 text-[14px] leading-snug text-navy-900/72"
              >
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                {b}
              </li>
            ))}
          </ul>

          <Link
            href="/contact"
            className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-semibold text-navy-950 transition-colors hover:text-brand-600"
          >
            Discuss this with us
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </Spotlight>
    </motion.article>
  );
}

export function Services() {
  return (
    <section id="services" className="relative bg-mist py-24 lg:py-32">
      <div aria-hidden className="absolute inset-0 grid-lines-dark opacity-40" />

      <div className="container-qd relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Our Services"
            title="Expertise Built Around Your Mission."
            intro="From strategic planning to technology implementation, Quantum District provides integrated support across the entire lifecycle of complex initiatives."
          />
          <Reveal delay={0.2}>
            <Link
              href="/contact"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-navy-950 px-6 py-3.5 text-[14.5px] font-semibold text-white transition-colors hover:bg-brand-600"
            >
              Scope your initiative
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
