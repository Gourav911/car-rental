import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { offers } from '../../data/offers';
import SectionHeader from '../shared/SectionHeader';

const SpecialOffers: React.FC = () => {
  return (
    <section className="section bg-white">
      <div className="container-wide">
        <SectionHeader
          badge="Limited Time Deals"
          title="Exclusive Offers & "
          highlight="Promotions"
          subtitle="Lock in the best rates before they're gone. These deals are updated weekly."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {offers.map((offer, i) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-3xl cursor-pointer"
              style={{ minHeight: 220 }}
            >
              {/* Background Image */}
              <img
                src={offer.image}
                alt={offer.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-900/50" />

              {/* Content */}
              <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="badge badge-amber mb-3">{offer.badge}</span>
                    <h3 className="text-2xl font-bold text-white mb-2">{offer.title}</h3>
                    <p className="text-blue-100 text-sm leading-relaxed max-w-xs">{offer.description}</p>
                  </div>
                  <div className="text-right ml-4 flex-shrink-0">
                    <div className="text-3xl font-extrabold text-accent-400">{offer.discount}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-6">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-blue-200 text-xs">
                      <Clock className="w-3.5 h-3.5" />
                      Valid until {new Date(offer.validUntil).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                    <div className="flex items-center gap-2 text-blue-200 text-xs">
                      <Tag className="w-3.5 h-3.5" />
                      Code: <span className="font-bold text-white bg-white/15 px-2 py-0.5 rounded-md ml-1">{offer.code}</span>
                    </div>
                  </div>
                  <Link
                    to="/cars"
                    className="flex items-center gap-2 bg-white text-primary-900 hover:bg-accent-500 hover:text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-all duration-200 group/btn"
                    id={`claim-${offer.id}`}
                  >
                    Claim Deal
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;
