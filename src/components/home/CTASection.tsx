import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

const CTASection: React.FC = () => {
  return (
    <section className="relative py-28 px-4 md:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-cta z-0" />
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=1920&q=80"
          alt="Luxury car road"
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      {/* Decorative glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-secondary-600/20 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 bg-accent-500/15 rounded-full blur-2xl pointer-events-none z-0" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-xs font-bold px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-3.5 h-3.5 text-accent-400" />
            Book Today — Drive Tomorrow
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6">
            Ready for Your{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-400 to-yellow-300">
              Next Journey?
            </span>
          </h2>
          <p className="text-lg text-blue-100 leading-relaxed mb-10 max-w-xl mx-auto">
            Over 2 million travelers trust CarRentalDesk every year. Join them and experience the future of car rental.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/cars"
              className="btn-accent text-base py-4 px-10 gap-3 font-bold"
              id="cta-book-car"
            >
              Book Your Car Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/deals"
              className="flex items-center gap-2 text-white border border-white/30 hover:bg-white/10 font-semibold text-base py-4 px-8 rounded-2xl transition-all duration-200"
              id="cta-view-deals"
            >
              View Current Deals
            </Link>
          </div>

          <p className="mt-8 text-blue-200 text-sm">
            No registration required · Free cancellation · Instant confirmation
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
