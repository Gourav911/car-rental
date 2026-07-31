import React from 'react';
import Hero from '../components/home/Hero';
import Stats from '../components/home/Stats';
import WhyChooseUs from '../components/home/WhyChooseUs';
import PopularDestinations from '../components/home/PopularDestinations';
import FeaturedVehicles from '../components/home/FeaturedVehicles';
import SpecialOffers from '../components/home/SpecialOffers';
import HowItWorks from '../components/home/HowItWorks';
import Testimonials from '../components/home/Testimonials';
import FAQSection from '../components/home/FAQSection';
import CTASection from '../components/home/CTASection';

const HomePage: React.FC = () => {
  return (
    <main>
      <Hero />
      <Stats />
      <WhyChooseUs />
      <PopularDestinations />
      <FeaturedVehicles />
      <HowItWorks />
      <SpecialOffers />
      <Testimonials />
      <FAQSection />
      <CTASection />
    </main>
  );
};

export default HomePage;
