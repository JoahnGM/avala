import { ConversationDemo } from "@/components/conversation-demo";
import { Hero } from "@/components/hero";
import { RiskSection } from "@/components/risk-section";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <RiskSection />
        <ConversationDemo />
      </main>
      <SiteFooter />
    </>
  );
}
