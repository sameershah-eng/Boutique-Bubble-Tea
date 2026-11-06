import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { MarqueeSection } from '../components/MarqueeSection';
import { BestSellersSection } from '../components/BestSellersSection';
import { WhyHydorSection } from '../components/WhyHydorSection';
import { BuildTeaserSection } from '../components/BuildTeaserSection';
import { OurStorySection } from '../components/OurStorySection';
import { ReviewsSection } from '../components/ReviewsSection';
import { InstagramSection } from '../components/InstagramSection';
import { VisitUsSection } from '../components/VisitUsSection';

export const Home: React.FC = () => {
  return (
    <div className="w-full">
      <HeroSection />
      <MarqueeSection />
      <BestSellersSection />
      <WhyHydorSection />
      <BuildTeaserSection />
      <OurStorySection />
      <ReviewsSection />
      <InstagramSection />
      <VisitUsSection />
    </div>
  );
};
