import Image from "next/image";
import { Quote } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/Motion";
import { SectionHeading } from "@/components/SectionHeading";
import { testimonials } from "@/data/site";

export function Testimonials() {
  return (
    <section className="relative bg-white py-24 lg:py-32">
      <div className="container-qd">
        <SectionHeading
          eyebrow="Client Outcomes"
          title="What partnership looks like in practice."
          intro="Engagement feedback shared with permission. Names withheld at client request."
          align="center"
        />

        <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <StaggerItem key={t.name} className="h-full">
              <figure className="group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-navy-900/9 bg-mist p-7 transition-all duration-500 hover:-translate-y-1.5 hover:bg-white hover:shadow-lift-lg">
                <span
                  aria-hidden
                  className="absolute top-0 left-7 h-[3px] w-12 bg-accent-500 transition-all duration-500 group-hover:w-20"
                />
                <Quote className="h-6 w-6 text-brand-500/45" />
                <blockquote className="mt-4 flex-1 text-[16px] leading-relaxed text-navy-900/80">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3.5 border-t border-navy-900/8 pt-5">
                  <span className="relative h-11 w-11 overflow-hidden rounded-full ring-2 ring-white">
                    <Image
                      src={t.avatar}
                      alt=""
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  </span>
                  <span>
                    <span className="block font-display text-[14.5px] font-semibold text-navy-950">
                      {t.name}
                    </span>
                    <span className="block text-[13px] text-navy-900/55">
                      {t.role}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
