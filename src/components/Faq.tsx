"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MessageSquareText, Plus } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/Motion";
import { SectionHeading } from "@/components/SectionHeading";
import { faqs, site } from "@/data/site";
import { openAssistant } from "@/components/assistantBus";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-white py-24 lg:py-32">
      <div aria-hidden className="absolute inset-0 grid-lines-dark opacity-35" />

      <div className="container-qd relative grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Quick Answers"
            title="Questions, answered fast."
            intro={`Anything not covered here gets a human reply in ${site.responseWindow}.`}
          />

          <Reveal delay={0.2}>
            <div className="mt-8 rounded-2xl border border-navy-900/10 bg-mist p-6">
              <MessageSquareText className="h-6 w-6 text-brand-600" />
              <p className="mt-3 font-display text-[16.5px] font-semibold text-navy-950">
                Still have a question?
              </p>
              <p className="mt-1.5 text-[14.5px] leading-relaxed text-navy-900/65">
                Ask our AI assistant — it answers instantly and routes anything it
                cannot resolve straight to a consultant.
              </p>
              <button
                type="button"
                onClick={() => openAssistant()}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-navy-950 px-5 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-brand-600"
              >
                Open the assistant
              </button>
            </div>
          </Reveal>
        </div>

        <div className="lg:pt-4">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={0.05 * i}>
                <div className="border-b border-navy-900/10">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-center justify-between gap-6 py-5 text-left"
                  >
                    <span
                      className={`font-display text-[17px] leading-snug font-semibold transition-colors ${
                        isOpen ? "text-brand-600" : "text-navy-950"
                      } group-hover:text-brand-600`}
                    >
                      {f.q}
                    </span>
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-400 ${
                        isOpen
                          ? "rotate-45 border-accent-500 bg-accent-500 text-white"
                          : "border-navy-900/15 text-navy-900/60 group-hover:border-navy-900/35"
                      }`}
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pr-12 pb-6 text-[15.5px] leading-relaxed text-navy-900/68">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
