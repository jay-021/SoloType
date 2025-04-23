'use client';

import HeroSection from '@/components/hero-section';
import FeaturesSection from '@/components/features-section';
import HowItWorks from '@/components/how-it-works';
import Testimonials from '@/components/testimonials';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <Testimonials />
    </div>
  );
}
