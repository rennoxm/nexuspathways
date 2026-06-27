import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { FeaturedOpps } from "@/components/home/FeaturedOpps";
import { CommunityCTA } from "@/components/home/CommunityCTA";
import { PartnerBanner } from "@/components/home/PartnerBanner";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Hero />
        {/*<CategoryGrid />*/}
        <FeaturedOpps />
        <CommunityCTA />
        <PartnerBanner />
      </main>
      <Footer />
    </div>
  );
}
