'use client';

import Hero from "@/components/sections/Hero";
import DonationBar from "@/components/sections/DonationBar";
import ServicesGrid from "@/components/sections/ServicesGrid";
import Campaigns from "@/components/sections/Campaigns";
import { Newsletter } from "@/components/sections/Newsletter";
import { ZakatCalculator } from "@/components/sections/ZakatCalculator";
import AboutSection from "@/components/sections/AboutSection";
import ImpactSection from "@/components/sections/ImpactSection";
import '@/lib/i18n';

export default function Home() {
  return (
    <div className="space-y-0">
      <Hero />
      <DonationBar />
      <AboutSection />
      <ServicesGrid />
      <Campaigns />
      <ZakatCalculator />
      <Newsletter />
      <ImpactSection />
    </div>
  );
}

