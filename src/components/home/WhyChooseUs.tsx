import React from 'react';
import { motion } from 'framer-motion';
import { BadgeDollarSign, Zap, Headphones, ShieldCheck } from 'lucide-react';
import SectionHeader from '../shared/SectionHeader';

const features = [
  {
    icon: BadgeDollarSign,
    title: 'Best Prices, Guaranteed',
    description:
      'We scan over 80 trusted partners in real-time to surface the best available rates. Found a lower price? We\'ll match it, no questions asked.',
    color: 'from-secondary-600 to-blue-400',
    bg: 'bg-secondary-50',
    iconColor: 'text-secondary-600',
  },
  {
    icon: Zap,
    title: 'Instant Confirmation',
    description:
      'No waiting. No uncertainty. Your booking is confirmed the moment you complete checkout, with full details sent directly to your inbox.',
    color: 'from-accent-500 to-yellow-400',
    bg: 'bg-accent-50',
    iconColor: 'text-accent-500',
  },
  {
    icon: Headphones,
    title: '24/7 Dedicated Support',
    description:
      'Our multilingual support team is available around the clock via live chat, phone, or email — wherever your journey takes you.',
    color: 'from-success-500 to-emerald-400',
    bg: 'bg-success-50',
    iconColor: 'text-success-500',
  },
  {
    icon: ShieldCheck,
    title: 'Verified Rental Partners',
    description:
      'Every partner on CarRentalDesk is rigorously vetted and continuously reviewed. You\'re always in safe hands.',
    color: 'from-purple-600 to-violet-400',
    bg: 'bg-purple-50',
    iconColor: 'text-purple-600',
  },
];

const WhyChooseUs: React.FC = () => {
  return (
    <section className="section bg-surface">
      <div className="container-wide">
        <SectionHeader
          badge="Why CarRentalDesk"
          title="Everything You Need, "
          highlight="Nothing You Don't"
          subtitle="We've built the simplest, most transparent car rental experience on the planet — because travel should be exciting, not complicated."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group card p-7 hover:border-secondary-100"
              >
                <div className={`w-14 h-14 ${feature.bg} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-7 h-7 ${feature.iconColor}`} />
                </div>
                <h3 className="text-lg font-bold text-primary-900 mb-3">{feature.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
