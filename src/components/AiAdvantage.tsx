"use client";

import { motion } from "framer-motion";
import { Bot, FileSignature, Gauge, Sparkles } from "lucide-react";
import { Reveal } from "@/components/Motion";
import { SectionHeading } from "@/components/SectionHeading";
import { differentiators } from "@/data/site";
import { openAssistant } from "@/components/assistantBus";

const icons = [Sparkles, Gauge, FileSignature];

const demo = [
  { role: "user", text: "Can you help modernize a 12-year-old case management system?" },
  {
    role: "bot",
    text: "Yes — that sits in Technology Transformation. We'd start with a 2–3 week assessment of the current architecture and data, then sequence a migration your team can absorb.",
  },
  { role: "user", text: "How fast could we start?" },
  {
    role: "bot",
    text: "Discovery call within 48 hours, scoped proposal through our client portal after that. Want me to pass this to a consultant?",
  },
];

export function AiAdvantage() {
  return (
    <section className="relative overflow-hidden bg-mist py-24 lg:py-32">
      <div aria-hidden className="absolute inset-0 grid-lines-dark opacity-35" />
      <div
        aria-hidden
        className="absolute -right-24 -bottom-24 h-96 w-96 rounded-full bg-brand-500/8 blur-[120px]"
      />

      <div className="container-qd relative grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="Why clients move faster with us"
            title={
              <>
                Answers in minutes.
                <br />
                Momentum in days.
              </>
            }
            intro="Most consulting relationships lose two weeks before the first real conversation. We removed that gap with AI-assisted intake, a same-day response standard, and contracting that happens in one place."
          />

          <div className="mt-10 space-y-5">
            {differentiators.map((d, i) => {
              const Icon = icons[i];
              return (
                <Reveal key={d.title} delay={0.08 * i}>
                  <div className="group flex gap-4 rounded-2xl border border-navy-900/8 bg-white p-5 transition-all duration-400 hover:border-navy-900/14 hover:shadow-lift">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-navy-950 text-white transition-colors duration-400 group-hover:bg-brand-600">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-[16.5px] font-semibold text-navy-950">
                        {d.title}
                      </h3>
                      <p className="mt-1.5 text-[14.5px] leading-relaxed text-navy-900/65">
                        {d.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.3}>
            <button
              type="button"
              onClick={() => openAssistant()}
              className="group mt-9 inline-flex items-center gap-2.5 rounded-full bg-navy-950 px-6 py-3.5 text-[14.5px] font-semibold text-white transition-colors hover:bg-brand-600"
            >
              <Bot className="h-4.5 w-4.5" />
              Ask the assistant a question now
            </button>
          </Reveal>
        </div>

        {/* Chat mock */}
        <Reveal delay={0.15} y={40}>
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-brand-500/12 via-transparent to-accent-500/10 blur-xl"
            />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-navy-900/10 bg-white shadow-lift-lg">
              <div className="flex items-center gap-3 border-b border-navy-900/8 bg-navy-950 px-5 py-4">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/12">
                  <Bot className="h-4.5 w-4.5 text-brand-300" />
                </span>
                <div className="flex-1">
                  <p className="text-[14px] font-semibold text-white">
                    Quantum District Assistant
                  </p>
                  <p className="flex items-center gap-1.5 text-[11.5px] text-white/50">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Online · answers instantly
                  </p>
                </div>
                <span className="rounded-full bg-accent-500/90 px-2.5 py-1 text-[9.5px] font-bold tracking-[0.12em] text-white uppercase">
                  AI
                </span>
              </div>

              <div className="space-y-3.5 bg-white p-5">
                {demo.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.55, delay: 0.18 * i }}
                    className={
                      m.role === "user" ? "flex justify-end" : "flex justify-start"
                    }
                  >
                    <p
                      className={
                        m.role === "user"
                          ? "max-w-[85%] rounded-2xl rounded-br-md bg-navy-950 px-4 py-3 text-[14px] leading-relaxed text-white"
                          : "max-w-[88%] rounded-2xl rounded-bl-md border border-navy-900/8 bg-mist px-4 py-3 text-[14px] leading-relaxed text-navy-900/85"
                      }
                    >
                      {m.text}
                    </p>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.95 }}
                  className="flex items-center gap-2 pt-1"
                >
                  <span className="flex gap-1 rounded-full border border-navy-900/8 bg-mist px-3.5 py-2.5">
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        className="h-1.5 w-1.5 rounded-full bg-navy-900/35"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                          delay: d * 0.18,
                        }}
                      />
                    ))}
                  </span>
                  <span className="text-[12px] text-navy-900/40">
                    A consultant is reviewing this thread
                  </span>
                </motion.div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
