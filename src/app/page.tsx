import { ClosingSection } from "@/components/closing-section";
import { DemoPipeline } from "@/components/demo-pipeline";
import { Hero } from "@/components/hero";
import { ManifestoSection } from "@/components/manifesto-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TrustSection } from "@/components/trust-section";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <DemoPipeline />
        <ManifestoSection />
        <TrustSection />
        <ClosingSection />
      </main>
      <SiteFooter />
    </>
  );
}
