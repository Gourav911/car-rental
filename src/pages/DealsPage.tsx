import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Tag, Percent } from 'lucide-react';
import { offers } from '../data/offers';
import CTASection from '../components/home/CTASection';

const DealsPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-surface pt-20">
      {/* Hero */}
      <div className="relative py-24 bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&q=80" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 text-center">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-xs font-semibold px-4 py-2 rounded-full mb-6">
            <Percent className="w-3.5 h-3.5 text-accent-400" /> Limited Time Offers
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Exclusive Deals &{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-400 to-yellow-300">
              Promotions
            </span>
          </h1>
          <p className="text-blue-100 text-lg max-w-xl mx-auto">
            Save big on your next rental. These handpicked deals are available for a limited time only.
          </p>
        </div>
      </div>

      {/* Deals Grid */}
      <section className="section">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {offers.map((offer, i) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-3xl"
                style={{ minHeight: 280 }}
              >
                <img src={offer.image} alt={offer.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary-900/95 to-primary-900/60" />
                <div className="relative z-10 p-8 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <span className="badge badge-amber">{offer.badge}</span>
                    <div className="text-4xl font-extrabold text-accent-400">{offer.discount}</div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{offer.title}</h3>
                  <p className="text-blue-100 text-sm leading-relaxed flex-1">{offer.description}</p>
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center gap-2 text-blue-200 text-xs">
                      <Clock className="w-3.5 h-3.5" />
                      Valid until {new Date(offer.validUntil).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-blue-200 text-xs">
                        <Tag className="w-3.5 h-3.5" />
                        Code: <span className="font-bold text-white bg-white/20 px-2 py-0.5 rounded-lg ml-1">{offer.code}</span>
                      </div>
                      <Link to="/cars" className="flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-all">
                        Claim <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* How to Use Promo Codes */}
          <div className="bg-white border border-border rounded-3xl p-8 md:p-10">
            <h2 className="text-2xl font-bold text-primary-900 mb-6">How to Redeem Your Deal</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { step: '1', title: 'Browse & Select', desc: 'Find your desired vehicle and proceed to checkout.' },
                { step: '2', title: 'Enter Promo Code', desc: 'Paste your discount code in the promo field at checkout.' },
                { step: '3', title: 'Save Instantly', desc: 'Your discount is applied immediately to the total price.' },
              ].map((s) => (
                <div key={s.step} className="flex gap-4">
                  <div className="w-10 h-10 bg-secondary-600 text-white rounded-xl flex items-center justify-center font-extrabold text-lg flex-shrink-0">{s.step}</div>
                  <div>
                    <h3 className="font-bold text-primary-900 mb-1">{s.title}</h3>
                    <p className="text-muted text-sm">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
};

export default DealsPage;
