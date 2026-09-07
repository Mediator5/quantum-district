import Link from "next/link";
import { ArrowUpRight, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/Logo";
import { services, site } from "@/data/site";

const company = [
  { label: "About", href: "/#about" },
  { label: "Our approach", href: "/#approach" },
  { label: "Quick answers", href: "/#faq" },
  { label: "Start a project", href: "/start" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-950 pt-20 pb-8">
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent"
      />
      <div aria-hidden className="absolute inset-0 grid-lines opacity-30" />
      <div
        aria-hidden
        className="absolute -bottom-40 left-1/2 h-80 w-[42rem] -translate-x-1/2 rounded-full bg-brand-600/14 blur-[120px]"
      />

      <div className="container-qd relative">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div>
            <Logo variant="light" size="md" />
            <p className="mt-6 max-w-xs text-[14.5px] leading-relaxed text-white/55">
              Strategic technology and consulting for organizations navigating
              transformation, modernization, and complex delivery.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="LinkedIn"
                className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 text-white/70 transition-colors hover:border-white/35 hover:bg-white/8 hover:text-white"
              >
                <Linkedin className="h-4.5 w-4.5" />
              </a>
              <a
                href={`mailto:${site.email}`}
                aria-label="Email Quantum District"
                className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 text-white/70 transition-colors hover:border-white/35 hover:bg-white/8 hover:text-white"
              >
                <Mail className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold tracking-[0.2em] text-white/40 uppercase">
              Services
            </h3>
            <ul className="mt-5 space-y-3">
              {services.map((s) => (
                <li key={s.id}>
                  <Link
                    href="/#services"
                    className="text-[14.5px] text-white/62 transition-colors hover:text-white"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold tracking-[0.2em] text-white/40 uppercase">
              Company
            </h3>
            <ul className="mt-5 space-y-3">
              {company.map((c) => (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    className="text-[14.5px] text-white/62 transition-colors hover:text-white"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold tracking-[0.2em] text-white/40 uppercase">
              Get in touch
            </h3>
            <ul className="mt-5 space-y-4 text-[14.5px] text-white/62">
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent-400" />
                <a href={`mailto:${site.email}`} className="hover:text-white">
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent-400" />
                <a
                  href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
                  className="hover:text-white"
                >
                  {site.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-400" />
                {site.location}
              </li>
            </ul>

            <Link
              href="/contact"
              className="group mt-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[14px] font-semibold text-navy-950 transition-colors hover:bg-brand-300"
            >
              Start a conversation
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 sm:flex-row">
          <p className="text-[13px] text-white/45">
            © {new Date().getFullYear()} Quantum District. All rights reserved.
          </p>
          <p className="flex items-center gap-2.5 text-[11px] font-medium tracking-[0.2em] text-white/35 uppercase">
            Technology
            <span className="h-1 w-1 rounded-full bg-accent-500" />
            Strategy
            <span className="h-1 w-1 rounded-full bg-accent-500" />
            Transformation
          </p>
        </div>
      </div>
    </footer>
  );
}
