import { CTA } from "@/app/(marketing)/components/cta";
import { Features } from "@/app/(marketing)/components/features";
import { Hero } from "@/app/(marketing)/components/hero";
import { Pricing } from "@/app/(marketing)/components/pricing";

export default function Home() {
  return (
    <main className="">
      <Hero />
      <Features />
      {/* <Pricing /> */}
      {/* <CTA /> */}
    </main>
  );
}
