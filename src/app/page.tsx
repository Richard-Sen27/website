import HeroSection from "@/components/home/HeroSection";
import QuoteSection from "@/components/home/QuoteSection";

export default function Home() {
  return (
    <main className="h-screen overflow-scroll bg-black snap-y snap-mandatory">
      <HeroSection />
      <QuoteSection />
    </main>
  );
}