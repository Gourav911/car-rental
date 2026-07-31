import React from 'react';
import FAQSection from '../components/home/FAQSection';
import CTASection from '../components/home/CTASection';

const FAQPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-surface pt-20">
      <div className="bg-gradient-hero py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Frequently Asked Questions</h1>
        <p className="text-blue-100 text-lg max-w-xl mx-auto px-4">
          Everything you need to know before, during, and after your rental.
        </p>
      </div>
      <FAQSection />
      <CTASection />
    </main>
  );
};

export default FAQPage;
