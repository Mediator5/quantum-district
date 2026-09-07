"use client";

import { industries } from "@/data/site";

export function TrustBar() {
  const items = [...industries, ...industries];

  return (
    <section className="relative border-y border-navy-900/8 bg-mist py-7">
      <div className="container-qd mb-5 flex items-center justify-center">
        <p className="text-[11px] font-semibold tracking-[0.22em] text-navy-900/40 uppercase">
          Trusted across mission-critical sectors
        </p>
      </div>

      <div className="mask-fade-x overflow-hidden">
        <div className="flex w-max animate-marquee items-center gap-3 will-change-transform">
          {items.map((label, i) => (
            <span
              key={`${label}-${i}`}
              className="flex items-center gap-3 rounded-full border border-navy-900/10 bg-white px-6 py-3 text-[14px] font-medium whitespace-nowrap text-navy-900/75"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
