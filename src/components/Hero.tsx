"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, Clock, ShieldCheck, Sparkles } from "lucide-react";
import { useRef } from "react";
import { AnimatedWords } from "@/components/Motion";
import { site } from "@/data/site";

const EASE = [0.16, 1, 0.3, 1] as const;

const proof = [
  { icon: Clock, text: "Reply in under 1 business day" },
  { icon: Sparkles, text: "AI-accelerated discovery" },
  { icon: ShieldCheck, text: "Governance-ready delivery" },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-navy-950 pt-28 pb-20"
    >
      {/* Background image */}
      <motion.div style={{ y: imgY }} className="absolute inset-0 -z-20 scale-110">
        <Image
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=80"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-[0.28]"
        />
      </motion.div>

      {/* Wash + grid */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(115deg,#0c0b0a_0%,rgba(20,18,15,.94)_42%,rgba(43,39,32,.78)_100%)]"
      />
      <div aria-hidden className="absolute inset-0 -z-10 grid-lines opacity-[0.55]" />
      <div
        aria-hidden
        className="absolute -top-40 -left-40 -z-10 h-[36rem] w-[36rem] rounded-full bg-brand-600/25 blur-[130px] animate-float"
      />
      <div
        aria-hidden
        className="absolute -right-32 bottom-0 -z-10 h-[30rem] w-[30rem] rounded-full bg-accent-600/12 blur-[130px]"
      />

      <motion.div style={{ opacity: fade }} className="container-qd relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.06] py-1.5 pr-4 pl-1.5 backdrop-blur-sm"
            >
              <span className="rounded-full bg-accent-500 px-2.5 py-1 text-[10px] font-bold tracking-[0.14em] text-navy-950 uppercase">
                New
              </span>
              <span className="text-[13px] font-medium text-white/80">
                AI-assisted Q&amp;A — answers while you scroll
              </span>
            </motion.div>

            <h1 className="mt-7 font-display text-[2.6rem] leading-[1.05] font-bold text-white sm:text-6xl xl:text-[4.35rem]">
              <AnimatedWords text="Strategic Technology" delay={0.15} />
              <br />
              <AnimatedWords text="& Consulting" delay={0.32} highlight={["consulting"]} />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
              className="mt-6 max-w-xl font-display text-xl leading-snug font-medium text-brand-300 sm:text-2xl"
            >
              Turning Complex Challenges Into Measurable Progress.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.66, ease: EASE }}
              className="mt-5 max-w-xl text-[16.5px] leading-relaxed text-white/65"
            >
              {site.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.78, ease: EASE }}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full bg-white px-7 py-4 text-[15px] font-semibold text-navy-950 transition-transform duration-300 hover:scale-[1.02]"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-brand-300 to-white transition-transform duration-500 group-hover:translate-x-0"
                />
                <span className="relative">START A CONVERSATION</span>
                <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/#services"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-4 text-[15px] font-semibold text-white transition-colors duration-300 hover:border-white/45 hover:bg-white/[0.07]"
              >
                Explore our services
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.95 }}
              className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3"
            >
              {proof.map(({ icon: Icon, text }) => (
                <li
                  key={text}
                  className="flex items-center gap-2 text-[13px] font-medium text-white/55"
                >
                  <Icon className="h-4 w-4 text-accent-400" />
                  {text}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.35, ease: EASE }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-[4/4.4] w-full overflow-hidden rounded-[2rem] ring-1 ring-white/15">
              <Image
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1400&q=80"
                alt="Quantum District consultants working through a client roadmap"
                fill
                priority
                sizes="(max-width: 1024px) 0px, 45vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/25 to-transparent"
              />
            </div>

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, x: -28, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.9, delay: 0.9, ease: EASE }}
              className="absolute -bottom-7 -left-8 w-64 rounded-2xl border border-white/12 bg-navy-900/85 p-5 backdrop-blur-xl shadow-lift-lg"
            >
              <div className="flex items-baseline gap-2">
                <span className="font-display text-4xl font-bold text-white">96%</span>
                <span className="h-2 w-2 rounded-full bg-accent-500" />
              </div>
              <p className="mt-2 text-[13px] leading-snug text-white/60">
                of client initiatives delivered on schedule — because strategy
                ships with an owner.
              </p>
            </motion.div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 1.05, ease: EASE }}
              className="absolute -top-5 -right-6 flex items-center gap-2.5 rounded-full border border-white/15 bg-white/10 py-2.5 pr-5 pl-3 backdrop-blur-xl"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 animate-pulse-ring" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              <span className="text-[12.5px] font-semibold text-white">
                Taking new engagements
              </span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="text-[10px] font-medium tracking-[0.28em] text-white/35 uppercase">
          Scroll
        </span>
        <span className="relative h-11 w-px overflow-hidden bg-white/15">
          <motion.span
            className="absolute inset-x-0 top-0 h-4 bg-accent-400"
            animate={{ y: [-16, 44] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
