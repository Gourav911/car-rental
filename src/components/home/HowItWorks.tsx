import React from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, Car } from 'lucide-react';
import SectionHeader from '../shared/SectionHeader';

const steps = [
  {
    icon: Search,
    step: '01',
    title: 'Search & Compare',
    description:
      'Enter your pickup location and travel dates. We instantly compare rates from 80+ verified partners to surface the best deals available.',
    color: 'from-secondary-600 to-blue-400',
    bg: 'bg-secondary-50',
    iconColor: 'text-secondary-600',
  },
  {
    icon: SlidersHorizontal,
    step: '02',
    title: 'Choose & Customize',
    description:
      'Filter by vehicle type, features, price, and rating. Add extras like GPS, child seats, or full insurance — all in a single checkout.',
    color: 'from-accent-500 to-yellow-400',
    bg: 'bg-accent-50',
    iconColor: 'text-accent-500',
  },
  {
    icon: Car,
    step: '03',
    title: 'Arrive & Drive',
    description:
      'Present your booking confirmation and license at pickup — your vehicle will be ready and waiting. No hidden fees. Just open roads ahead.',
    color: 'from-success-500 to-emerald-400',
    bg: 'bg-success-50',
    iconColor: 'text-success-500',
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section className="section bg-surface relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-secondary-50/50 to-transparent" />
      </div>

      <div className="container-wide relative z-10">
        <SectionHeader
          badge="How It Works"
          title="Three Steps to Your "
          highlight="Perfect Drive"
          subtitle="We've made car rental as effortless as ordering a coffee. Here's how it works."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-12 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px bg-gradient-to-r from-secondary-100 via-accent-100 to-success-100" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative text-center"
              >
                {/* Step Number + Icon */}
                <div className="relative inline-block mb-6">
                  <div className={`w-24 h-24 ${step.bg} rounded-3xl flex items-center justify-center mx-auto relative`}>
                    <Icon className={`w-10 h-10 ${step.iconColor}`} />
                    <span className="absolute -top-2 -right-2 w-8 h-8 bg-primary-900 text-white text-xs font-extrabold rounded-xl flex items-center justify-center">
                      {step.step}
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-primary-900 mb-3">{step.title}</h3>
                <p className="text-muted text-sm leading-relaxed max-w-xs mx-auto">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
