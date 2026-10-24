import Link from "next/link";
import { useId } from "react";
import { clsx } from "@/lib/clsx";
import {
  BOXES,
  QD_DISTRICT,
  QD_MARK,
  QD_QUANTUM,
  QD_TAGLINE,
} from "@/components/brand-paths";

type Layout = "horizontal" | "stacked" | "mark";

type Props = {
  /** "light" = gold for dark backgrounds, "dark" = deep gold for light backgrounds */
  variant?: "light" | "dark";
  /**
   * horizontal — monogram beside the wordmark (header, footer, menus)
   * stacked    — the master lockup: monogram over the wordmark
   * mark       — the QD monogram on its own
   */
  layout?: Layout;
  /** Stacked layout only: include "Government | Business | Innovation". */
  tagline?: boolean;
  href?: string | null;
  size?: "xs" | "sm" | "md" | "lg";
  /** One glint of light across the gold on load and on hover. */
  sheen?: boolean;
  className?: string;
};

/* ------------------------------------------------------------------
   Geometry (master artboard units — see brand-paths.ts)
------------------------------------------------------------------- */
const [MX, MY, MW, MH] = BOXES.mark;
const [WX, WY, WW, WH] = BOXES.wordmark;
const [TX, TY, TW, TH] = BOXES.tagline;

// Horizontal lockup: monogram a touch taller than the two-line wordmark,
// both centred on the same axis.
const H_MARK = Math.round(WH * 1.2);
const H_SCALE = H_MARK / MH;
const H_MARK_W = Math.round(MW * H_SCALE);
const H_GAP = Math.round(WH * 0.3);
const H_W = H_MARK_W + H_GAP + WW;

const PAD = 4;
const stackedRight = (withTag: boolean) =>
  Math.max(MX + MW, WX + WW, withTag ? TX + TW : 0);
const stackedBottom = (withTag: boolean) => (withTag ? TY + TH : WY + WH);

function geometry(layout: Layout, withTag: boolean) {
  if (layout === "mark") {
    return { viewBox: `${MX - PAD} ${MY - PAD} ${MW + PAD * 2} ${MH + PAD * 2}` };
  }
  if (layout === "stacked") {
    const x = Math.min(MX, WX, withTag ? TX : Infinity) - PAD;
    const y = MY - PAD;
    const w = stackedRight(withTag) + PAD - x;
    const h = stackedBottom(withTag) + PAD - y;
    return { viewBox: `${x} ${y} ${w} ${h}` };
  }
  return {
    viewBox: `${-PAD} ${-PAD} ${H_W + PAD * 2} ${H_MARK + PAD * 2}`,
    mark: `matrix(${H_SCALE} 0 0 ${H_SCALE} ${-MX * H_SCALE} ${-MY * H_SCALE})`,
    word: `translate(${H_MARK_W + H_GAP - WX} ${(H_MARK - WH) / 2 - WY})`,
  };
}

/* Heights per layout; width follows the artwork's proportions. */
const heights: Record<Layout, Record<NonNullable<Props["size"]>, string>> = {
  horizontal: { xs: "h-6", sm: "h-8", md: "h-10", lg: "h-12" },
  stacked: { xs: "h-14", sm: "h-20", md: "h-28", lg: "h-40" },
  mark: { xs: "h-[18px]", sm: "h-6", md: "h-8", lg: "h-12" },
};

/* Metallic gold, tuned to the site palette (accent / brand tokens). */
const GOLD = {
  light: [
    ["0", "#f6e2a0"],
    ["0.2", "#e3bf5f"],
    ["0.42", "#b88a2e"],
    ["0.6", "#e8c96f"],
    ["0.8", "#c79b3e"],
    ["1", "#f2d98e"],
  ],
  dark: [
    ["0", "#9a7428"],
    ["0.3", "#7c5f1e"],
    ["0.55", "#a7802f"],
    ["0.8", "#6e5216"],
    ["1", "#8f6c23"],
  ],
} as const;

export function Logo({
  variant = "dark",
  layout = "horizontal",
  tagline = false,
  href = "/",
  size = "md",
  sheen = true,
  className,
}: Props) {
  const uid = "qd" + useId().replace(/[^a-zA-Z0-9]/g, "");
  const light = variant === "light";
  const withTag = layout === "stacked" && tagline;
  const g = geometry(layout, withTag);
  const [, , vw, vh] = g.viewBox.split(" ").map(Number);

  const art = (
    <>
      {layout !== "horizontal" ? (
        <>
          <path d={QD_MARK} />
          {layout === "stacked" && (
            <>
              <path d={QD_QUANTUM} />
              <path d={QD_DISTRICT} />
              {withTag && <path d={QD_TAGLINE} />}
            </>
          )}
        </>
      ) : (
        <>
          <path d={QD_MARK} transform={g.mark} />
          <g transform={g.word}>
            <path d={QD_QUANTUM} />
            <path d={QD_DISTRICT} />
          </g>
        </>
      )}
    </>
  );

  const svg = (
    <svg
      id={`${uid}-root`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={g.viewBox}
      width={Math.round((vw / vh) * 40)}
      height={40}
      role="img"
      aria-label="Quantum District"
      className={clsx(
        "block w-auto shrink-0 overflow-visible transition-[height] duration-500 ease-[cubic-bezier(.16,1,.3,1)]",
        heights[layout][size],
        className,
      )}
    >
      <title>Quantum District</title>
      <defs>
        <linearGradient id={`${uid}-gold`} x1="0" y1="0" x2="1" y2="1">
          {GOLD[variant].map(([o, c]) => (
            <stop key={o} offset={o} stopColor={c} />
          ))}
        </linearGradient>
        {sheen && (
          <linearGradient
            id={`${uid}-sheen`}
            x1="0"
            y1="0"
            x2="1"
            y2="0.4"
            gradientTransform="translate(-1 0)"
          >
            <stop offset="0.38" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.5" stopColor="#fff" stopOpacity={light ? 0.7 : 0.45} />
            <stop offset="0.62" stopColor="#fff" stopOpacity="0" />
            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              values="-1 0; 1 0"
              dur="1.5s"
              begin={`1.6s; ${uid}-root.mouseenter`}
              fill="freeze"
              calcMode="spline"
              keyTimes="0; 1"
              keySplines="0.45 0 0.2 1"
            />
          </linearGradient>
        )}
        <g id={`${uid}-art`} fillRule="evenodd">
          {art}
        </g>
      </defs>
      <use href={`#${uid}-art`} fill={`url(#${uid}-gold)`} />
      {sheen && (
        <use
          href={`#${uid}-art`}
          fill={`url(#${uid}-sheen)`}
          className="motion-reduce:hidden"
        />
      )}
    </svg>
  );

  if (!href) return svg;

  return (
    <Link
      href={href}
      aria-label="Quantum District — home"
      className="inline-flex shrink-0 items-center rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-500"
    >
      {svg}
    </Link>
  );
}

/**
 * The QD monogram drawn as a hairline outline — a quiet background motif
 * for dark sections (colour comes from `currentColor`).
 */
export function LogoWatermark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox={`${MX - PAD} ${MY - PAD} ${MW + PAD * 2} ${MH + PAD * 2}`}
      fill="none"
      className={className}
    >
      <path
        d={QD_MARK}
        stroke="currentColor"
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
        strokeLinejoin="round"
      />
    </svg>
  );
}
