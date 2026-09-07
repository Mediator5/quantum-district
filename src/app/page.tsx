import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Mission } from "@/components/Mission";
import { Approach } from "@/components/Approach";
import { AiAdvantage } from "@/components/AiAdvantage";
import { Testimonials } from "@/components/Testimonials";
import { PartnerPortal } from "@/components/PartnerPortal";
import { Faq } from "@/components/Faq";
import { CtaBand } from "@/components/CtaBand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <About />
      <Services />
      <Mission />
      <Approach />
      <AiAdvantage />
      <Testimonials />
      <PartnerPortal />
      <Faq />
      <CtaBand />
    </>
  );
}
