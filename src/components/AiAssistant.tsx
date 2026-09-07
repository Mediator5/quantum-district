"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, Bot, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { suggestedQuestions } from "@/data/knowledge";
import { ASSISTANT_OPEN_EVENT } from "@/components/assistantBus";

type Msg = { role: "user" | "assistant"; content: string };

const GREETING: Msg = {
  role: "assistant",
  content:
    "Hi — I'm the Quantum District assistant. Ask me about our services, timelines, or how engagements start. Anything I can't answer goes straight to a consultant, who replies in under one business day.",
};

export function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [nudge, setNudge] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  /* open via global event */
  useEffect(() => {
    const handler = (e: Event) => {
      setOpen(true);
      const seed = (e as CustomEvent<string | undefined>).detail;
      if (seed) setInput(seed);
      setTimeout(() => inputRef.current?.focus(), 350);
    };
    window.addEventListener(ASSISTANT_OPEN_EVENT, handler);
    return () => window.removeEventListener(ASSISTANT_OPEN_EVENT, handler);
  }, []);

  /* gentle attention nudge once */
  useEffect(() => {
    const t = setTimeout(() => setNudge(true), 9000);
    const t2 = setTimeout(() => setNudge(false), 19000);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, busy]);

  async function send(text?: string) {
    const question = (text ?? input).trim();
    if (!question || busy) return;

    const next = [...messages, { role: "user" as const, content: question }];
    setMessages(next);
    setInput("");
    setBusy(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.slice(-10).map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });
      const data = await res.json();
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            data?.reply ||
            "I hit a snag on that one. Send it through the contact form and a consultant will reply in under one business day.",
        },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "I couldn't reach our system just now. Please use the contact form — your message goes straight to our team.",
        },
      ]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      {/* Launcher */}
      <div className="fixed right-5 bottom-5 z-[65] flex flex-col items-end gap-3 sm:right-7 sm:bottom-7">
        <AnimatePresence>
          {nudge && !open && (
            <motion.button
              type="button"
              onClick={() => setOpen(true)}
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              className="max-w-[16rem] rounded-2xl rounded-br-md border border-navy-900/10 bg-white px-4 py-3 text-left text-[13.5px] leading-snug text-navy-900/80 shadow-lift-lg"
            >
              <span className="font-semibold text-navy-950">
                Have a question?
              </span>{" "}
              Ask me — I answer instantly.
            </motion.button>
          )}
        </AnimatePresence>

        <motion.button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close assistant" : "Open the Quantum District assistant"}
          whileTap={{ scale: 0.94 }}
          className="relative grid h-15 w-15 place-items-center rounded-full bg-navy-950 text-white shadow-lift-lg transition-colors hover:bg-brand-600"
        >
          {!open && (
            <span
              aria-hidden
              className="absolute inset-0 rounded-full bg-brand-500/45 animate-pulse-ring"
            />
          )}
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="x"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-6 w-6" />
              </motion.span>
            ) : (
              <motion.span
                key="bot"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Bot className="h-6 w-6" />
              </motion.span>
            )}
          </AnimatePresence>
          <span className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-navy-950 bg-accent-500" />
        </motion.button>
      </div>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-4 bottom-24 z-[66] flex max-h-[74svh] flex-col overflow-hidden rounded-[1.5rem] border border-navy-900/10 bg-white shadow-lift-lg sm:inset-x-auto sm:right-7 sm:bottom-28 sm:w-[25rem]"
          >
            {/* Header */}
            <div className="flex items-center gap-3 bg-navy-950 px-5 py-4">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/12">
                <Sparkles className="h-4.5 w-4.5 text-brand-300" />
              </span>
              <div className="flex-1">
                <p className="text-[14.5px] font-semibold text-white">
                  Quantum District Assistant
                </p>
                <p className="flex items-center gap-1.5 text-[11.5px] text-white/50">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Instant answers · human follow-up in 1 business day
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close assistant"
                className="grid h-8 w-8 place-items-center rounded-lg text-white/60 hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto bg-mist px-4 py-4"
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
                >
                  <p
                    className={
                      m.role === "user"
                        ? "max-w-[85%] rounded-2xl rounded-br-md bg-navy-950 px-4 py-2.5 text-[14px] leading-relaxed text-white"
                        : "max-w-[90%] rounded-2xl rounded-bl-md border border-navy-900/8 bg-white px-4 py-2.5 text-[14px] leading-relaxed whitespace-pre-wrap text-navy-900/85"
                    }
                  >
                    {m.content}
                  </p>
                </div>
              ))}

              {busy && (
                <div className="flex justify-start">
                  <span className="flex gap-1 rounded-2xl rounded-bl-md border border-navy-900/8 bg-white px-4 py-3.5">
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        className="h-1.5 w-1.5 rounded-full bg-navy-900/35"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.1, repeat: Infinity, delay: d * 0.16 }}
                      />
                    ))}
                  </span>
                </div>
              )}

              {messages.length <= 1 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {suggestedQuestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => send(q)}
                      className="rounded-full border border-navy-900/12 bg-white px-3.5 py-2 text-[12.5px] font-medium text-navy-900/75 transition-colors hover:border-brand-500 hover:text-brand-600"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Composer */}
            <div className="border-t border-navy-900/8 bg-white p-3">
              <div className="flex items-end gap-2 rounded-2xl border border-navy-900/12 bg-mist px-3 py-2 focus-within:border-brand-500">
                <textarea
                  ref={inputRef}
                  rows={1}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      send();
                    }
                  }}
                  placeholder="Ask about services, timelines, pricing…"
                  className="max-h-28 flex-1 resize-none bg-transparent py-1.5 text-[14px] text-navy-950 placeholder:text-navy-900/40 focus:outline-none"
                />
                <button
                  onClick={() => send()}
                  disabled={busy || !input.trim()}
                  aria-label="Send"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-navy-950 text-white transition-colors hover:bg-brand-600 disabled:opacity-35"
                >
                  <ArrowUp className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-2 px-1 text-center text-[11px] text-navy-900/40">
                Need a person?{" "}
                <Link
                  href="/contact"
                  className="font-semibold text-brand-600 hover:underline"
                >
                  Send us the details
                </Link>{" "}
                — reply in under 1 business day.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
