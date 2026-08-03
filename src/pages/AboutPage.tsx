import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Globe, Award, Users, Sparkles } from 'lucide-react';
import CTASection from '../components/home/CTASection';

const stats = [
  { value: '2M+', label: 'Happy Travelers' },
  { value: '80+', label: 'Verified Partners' },
  { value: '600+', label: 'Cities Covered' },
  { value: '2019', label: 'Founded' },
];

const values = [
  { icon: Award, title: 'Transparency', desc: 'No hidden charges, no fine print surprises. Every fee shown upfront.' },
  { icon: Users, title: 'People First', desc: 'Our support team is trained to treat every traveler as a VIP.' },
  { icon: Globe, title: 'Global Reach', desc: 'Wherever your journey takes you, we\'re there with a verified fleet.' },
  { icon: Sparkles, title: 'Innovation', desc: 'We\'re constantly pushing the boundaries of what car rental can be.' },
];

const AboutPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-surface pt-20">
      {/* Hero */}
      <div className="relative py-28 bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1920&q=80" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 md:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
            Driven by a Passion<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-400 to-yellow-300">for the Open Road</span>
          </h1>
          <p className="text-xl text-blue-100 leading-relaxed">
            CarRentalDesk was built by travelers, for travelers. We believe that getting from A to B should be the best part of any trip.
          </p>
        </div>
      </div>

      {/* Story */}
      <section className="section bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full bg-secondary-50 text-secondary-600 mb-5">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-primary-900 mb-6">
                Built for the Modern Traveler
              </h2>
              <div className="space-y-4 text-muted leading-relaxed">
                <p>
                  In 2019, our founding team  frustrated by opaque rental pricing, hidden fees, and unreliable partners  set out to build the platform they wished existed.
                </p>
                <p>
                  Today, CarRentalDesk connects millions of travelers with 80+ vetted rental companies across 600 cities worldwide. We've processed over $500M in bookings and earned an industry-leading 4.9-star average.
                </p>
                <p>
                  But we're just getting started. Our mission remains the same: make car rental the most seamless, transparent, and enjoyable part of your trip.
                </p>
              </div>
              <div className="mt-8 space-y-3">
                {['B Corporation certified for ethical business practices', '100% carbon offset on all platform operations', 'Multi-lingual support in 14 languages'].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-success-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80"
                alt="Luxury car"
                className="rounded-3xl w-full object-cover aspect-square"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-card p-5 flex items-center gap-4">
                <div className="w-14 h-14 bg-success-50 rounded-2xl flex items-center justify-center">
                  <Award className="w-7 h-7 text-success-500" />
                </div>
                <div>
                  <p className="font-extrabold text-primary-900 text-xl">4.9★</p>
                  <p className="text-muted text-xs">Average Platform Rating</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section bg-surface">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl font-extrabold text-secondary-600 mb-2">{s.value}</div>
                <div className="text-muted text-sm">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-white">
        <div className="container-wide">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary-900">What We Stand For</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="card p-7 text-center"
                >
                  <div className="w-14 h-14 bg-secondary-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
                    <Icon className="w-7 h-7 text-secondary-600" />
                  </div>
                  <h3 className="font-bold text-primary-900 text-lg mb-2">{v.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{v.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
};

export default AboutPage;
