import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { faqs } from '../../data/faqs';
import SectionHeader from '../shared/SectionHeader';

const categories = ['All', 'Booking', 'Insurance', 'Cancellation', 'License', 'Payments'];

const FAQSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = activeCategory === 'All'
    ? faqs
    : faqs.filter((f) => f.category === activeCategory);

  return (
    <section className="section bg-surface">
      <div className="container-wide max-w-4xl">
        <SectionHeader
          badge="FAQ"
          title="Frequently Asked "
          highlight="Questions"
          subtitle="Everything you need to know about renting with CarRentalDesk."
        />

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setOpenId(null); }}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-secondary-600 text-white'
                  : 'bg-white text-gray-600 border border-border hover:border-secondary-200 hover:text-secondary-600'
              }`}
              id={`faq-tab-${cat.toLowerCase()}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {filtered.map((faq) => (
            <motion.div
              key={faq.id}
              layout
              className="bg-white border border-border rounded-2xl overflow-hidden hover:border-secondary-200 transition-colors"
            >
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="w-full flex items-center justify-between p-5 text-left gap-4"
                id={`faq-${faq.id}`}
              >
                <span className="font-semibold text-primary-900 text-sm md:text-base pr-4">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openId === faq.id ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex-shrink-0 w-8 h-8 bg-secondary-50 rounded-xl flex items-center justify-center"
                >
                  <ChevronDown className="w-4 h-4 text-secondary-600" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {openId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pt-0">
                      <div className="h-px bg-border mb-4" />
                      <p className="text-muted text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
