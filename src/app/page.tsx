import HeroSection from "@/components/home/HeroSection";
import QuoteSection from "@/components/home/QuoteSection";
import TechStack from "@/components/home/TechStack";

export default function Home() {
  return (
    <main className="h-screen overflow-scroll bg-black snap-y snap-mandatory">
      <HeroSection />
      <QuoteSection />
      <TechStack />
    </main>
  );
}