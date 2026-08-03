import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Car, ArrowRight, Globe, Clock } from 'lucide-react';
import { destinations } from '../data/destinations';
import CTASection from '../components/home/CTASection';

const additionalDestinations = [
  { city: 'New York', country: 'USA', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&q=80', carsAvailable: 2100, startingPrice: 40 },
  { city: 'Barcelona', country: 'Spain', image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600&q=80', carsAvailable: 560, startingPrice: 33 },
  { city: 'Miami', country: 'USA', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', carsAvailable: 890, startingPrice: 37 },
  { city: 'Bangkok', country: 'Thailand', image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=600&q=80', carsAvailable: 420, startingPrice: 22 },
];

const allDestinations = [...destinations, ...additionalDestinations as any];

const LocationsPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-surface pt-20">
      {/* Hero */}
      <div className="relative py-24 bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&q=80" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 text-center">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-xs font-semibold px-4 py-2 rounded-full mb-6">
            <Globe className="w-3.5 h-3.5" /> Global Coverage
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Cars Available in <span className="text-gradient-amber">600+ Cities</span>
          </h1>
          <p className="text-blue-100 text-lg max-w-xl mx-auto">
            From metropolitan hubs to island getaways  we've got your rental covered, wherever you land.
          </p>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 grid grid-cols-3 gap-8 text-center">
          {[
            { label: 'Countries', value: '60+' },
            { label: 'Cities', value: '600+' },
            { label: 'Airport Locations', value: '200+' },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-extrabold text-secondary-600">{s.value}</div>
              <div className="text-muted text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Destinations Grid */}
      <section className="section">
        <div className="container-wide">
          <h2 className="text-2xl font-bold text-primary-900 mb-8">Most Popular Destinations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {allDestinations.map((dest: any, i: number) => (
              <motion.div
                key={dest.city}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group relative rounded-3xl overflow-hidden cursor-pointer"
                style={{ aspectRatio: '4/3' }}
              >
                <img src={dest.image} alt={dest.city} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-900/30 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                    <Car className="w-3.5 h-3.5" /> {dest.carsAvailable?.toLocaleString() || '—'} cars
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-center gap-1.5 text-white/70 text-xs mb-1">
                    <MapPin className="w-3.5 h-3.5" /> {dest.country}
                  </div>
                  <h3 className="text-white text-xl font-bold mb-2">{dest.city}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-white text-sm">
                      From <span className="font-bold text-accent-400">${dest.startingPrice}</span>/day
                    </span>
                    <Link to="/cars" className="flex items-center gap-1 text-xs font-semibold text-white bg-white/20 hover:bg-secondary-600 px-3 py-1.5 rounded-xl backdrop-blur-sm transition-all">
                      Explore <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Airport Pickup Info */}
          <div className="bg-gradient-to-r from-secondary-50 to-blue-50 border border-secondary-100 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row gap-6 items-center">
            <div className="w-16 h-16 bg-secondary-600 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-primary-900 mb-2">Airport Pickup Available at 200+ Locations</h3>
              <p className="text-muted text-sm leading-relaxed">
                Land and drive. Book your airport pickup 48 hours ahead and your vehicle will be ready the moment you clear arrivals  with no extra waiting fees.
              </p>
            </div>
            <Link to="/cars" className="btn-primary flex-shrink-0">
              Book Airport Pickup <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
};

export default LocationsPage;
