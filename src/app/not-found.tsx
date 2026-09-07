import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[80svh] items-center overflow-hidden bg-navy-950">
      <div aria-hidden className="absolute inset-0 grid-lines opacity-40" />
      <div
        aria-hidden
        className="absolute -top-24 left-1/3 h-96 w-96 rounded-full bg-brand-600/20 blur-[130px]"
      />
      <div className="container-qd relative py-24 text-center">
        <p className="font-display text-[6rem] leading-none font-bold text-white/10 sm:text-[9rem]">
          404
        </p>
        <h1 className="-mt-6 font-display text-3xl font-bold text-white sm:text-4xl">
          This page took a different path.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-[16px] leading-relaxed text-white/60">
          The page you were looking for isn&apos;t here — but the conversation
          can still start.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-[15px] font-semibold text-navy-950 transition-colors hover:bg-brand-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:border-white/45 hover:bg-white/[0.07]"
          >
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
