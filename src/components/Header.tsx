"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { nav } from "@/data/site";
import { clsx } from "@/lib/clsx";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const onDark = !scrolled;

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        className={clsx(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-navy-900/8 bg-white/92 py-2.5 backdrop-blur-xl shadow-[0_8px_30px_-18px_rgba(12,11,10,.35)]"
            : "border-b border-transparent bg-transparent py-4",
        )}
      >
        <div className="container-qd flex items-center justify-between gap-6">
          <Logo variant={onDark ? "light" : "dark"} size={scrolled ? "sm" : "md"} />

          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "relative rounded-lg px-3.5 py-2 text-[14.5px] font-medium transition-colors",
                  onDark
                    ? "text-white/75 hover:text-white"
                    : "text-navy-900/70 hover:text-navy-950",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className={clsx(
                "group hidden items-center gap-2 rounded-full px-5 py-2.5 text-[14px] font-semibold transition-all duration-300 sm:inline-flex",
                onDark
                  ? "bg-white text-navy-950 hover:bg-brand-300 hover:text-navy-950"
                  : "bg-navy-900 text-white hover:bg-brand-600",
              )}
            >
              Start a conversation
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className={clsx(
                "grid h-11 w-11 place-items-center rounded-xl border transition-colors lg:hidden",
                onDark
                  ? "border-white/20 text-white hover:bg-white/10"
                  : "border-navy-900/12 text-navy-900 hover:bg-navy-900/5",
              )}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] bg-navy-950 lg:hidden"
          >
            <div
              aria-hidden
              className="absolute inset-0 grid-lines opacity-40"
            />
            <div className="relative flex h-full flex-col">
              <div className="container-qd flex items-center justify-between py-4">
                <Logo variant="light" size={scrolled ? "sm" : "md"} />
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="grid h-11 w-11 place-items-center rounded-xl border border-white/20 text-white hover:bg-white/10"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="container-qd mt-6 flex flex-1 flex-col justify-center gap-1 pb-24">
                {nav.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 * i + 0.1, duration: 0.5 }}
                  >
                    <Link
                      href={item.href}
                      className="flex items-baseline gap-4 border-b border-white/10 py-5 font-display text-3xl font-semibold text-white transition-colors hover:text-brand-300"
                    >
                      <span className="font-sans text-xs text-accent-400">
                        0{i + 1}
                      </span>
                      {item.label}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="mt-8"
                >
                  <Link
                    href="/contact"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-4 font-semibold text-navy-950"
                  >
                    Start a conversation
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
