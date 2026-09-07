import { Reveal } from "@/components/Motion";
import { clsx } from "@/lib/clsx";

export function Eyebrow({
  children,
  light,
  className,
}: {
  children: React.ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.2em] uppercase",
        light ? "text-brand-300" : "text-brand-600",
        className,
      )}
    >
      <span
        aria-hidden
        className="h-px w-8 bg-current opacity-45"
      />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  light,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  light?: boolean;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={clsx(
        align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl",
        className,
      )}
    >
      <Reveal>
        <Eyebrow light={light}>{eyebrow}</Eyebrow>
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          className={clsx(
            "mt-5 font-display text-[2.1rem] leading-[1.1] font-bold sm:text-[2.75rem] lg:text-[3.1rem]",
            light ? "text-white" : "text-navy-950",
          )}
        >
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.16}>
          <div
            className={clsx(
              "mt-5 text-[16.5px] leading-relaxed",
              light ? "text-white/62" : "text-navy-900/68",
            )}
          >
            {intro}
          </div>
        </Reveal>
      )}
    </div>
  );
}
