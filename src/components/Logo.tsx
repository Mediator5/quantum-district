import Link from "next/link";
import { clsx } from "@/lib/clsx";

type Props = {
  /** "light" = for dark backgrounds, "dark" = for white backgrounds */
  variant?: "light" | "dark";
  href?: string | null;
  showWordmark?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
};

const sizes = {
  sm: { tile: "h-9 w-9 text-[13px]", name: "text-[15px]", sub: "text-[8.5px]" },
  md: { tile: "h-11 w-11 text-[15px]", name: "text-[18px]", sub: "text-[9px]" },
  lg: { tile: "h-14 w-14 text-[19px]", name: "text-[23px]", sub: "text-[10px]" },
};

export function Logo({
  variant = "dark",
  href = "/",
  showWordmark = true,
  className,
  size = "md",
}: Props) {
  const light = variant === "light";
  const s = sizes[size];

  const inner = (
    <span className={clsx("group inline-flex items-center gap-3", className)}>
      {/* Monogram tile */}
      <span
        className={clsx(
          "relative grid shrink-0 place-items-center overflow-hidden rounded-xl font-display font-bold tracking-[0.08em] transition-transform duration-500 group-hover:scale-[1.06]",
          s.tile,
          light
            ? "bg-white/10 text-white ring-1 ring-white/25"
            : "bg-navy-900 text-white ring-1 ring-navy-900/10",
        )}
      >
        <span
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(120%_120%_at_20%_0%,rgba(95,150,255,.55),transparent_60%)] opacity-80"
        />
        <span
          aria-hidden
          className="absolute -right-3 -bottom-3 h-7 w-7 rotate-45 bg-accent-500/90"
        />
        <span className="relative">QD</span>
      </span>

      {showWordmark && (
        <span className="flex flex-col leading-none">
          <span
            className={clsx(
              "font-display font-bold tracking-[-0.02em]",
              s.name,
              light ? "text-white" : "text-navy-950",
            )}
          >
            Quantum{" "}
            <span className={light ? "text-brand-300" : "text-brand-600"}>
              District
            </span>
          </span>
          <span
            className={clsx(
              "mt-1.5 font-medium uppercase tracking-[0.24em]",
              s.sub,
              light ? "text-white/45" : "text-navy-900/45",
            )}
          >
            Strategy · Technology
          </span>
        </span>
      )}
    </span>
  );

  if (!href) return inner;

  return (
    <Link href={href} aria-label="Quantum District — home" className="inline-flex">
      {inner}
    </Link>
  );
}
